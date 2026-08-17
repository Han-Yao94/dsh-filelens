// FileLens — DeepSeek Harness bundle plugin (host half)
//
// A static Cordis plugin registered as the `filelens` Service. The browser half
// reaches it through the Typert Remote gateway. Invocation definitions are
// registered at runtime into the Host Typert registry (typert.local) — no
// generated artifacts and no decorator markers required.
//
// Remote methods (wire = single `args` object per method):
//   root / list / search / grep / read / readMore / readHex / write / readImage
//
// Security invariants (carried over from the dynamic-plugin pkg-24 hardening):
//   - containment guard is fail-closed whenever a root is supplied;
//   - file.write REQUIRES an explicit root and is version-guarded
//     (FS_STALE_VERSION -> kind 'stale');
//   - search/grep are cancelable per family (new request aborts the walk);
//   - readMore continues a cached stream instead of re-reading from the start.
import { TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol';
const MIME = {
    png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif',
    webp: 'image/webp', svg: 'image/svg+xml', ico: 'image/x-icon', bmp: 'image/bmp',
};
export class FileLensService extends TypertRemoteService {
    constructor(ctx) {
        super(ctx, 'filelens');
        this.MAX_PREVIEW = 256 * 1024;
        this.MAX_IMAGE = 4 * 1024 * 1024;
        this.MAX_HEX = 256 * 1024;
        this.MORE_CACHE_MAX = 8;
        this.moreCache = new Map();
        this.activeSearches = new Map();
        this.fs = ctx.get('fs');
        this.sandboxPolicy = ctx.get('sandboxPolicy');
        // Register the strict invocation definitions into the Host Typert registry
        // (typert.local). This deliberately does NOT rely on the @Remote decorator
        // markers: those live in a module-private WeakMap inside the typert-protocol
        // package, so an out-of-tree bundle resolving a different copy of the
        // package would split the marker table and the gateway would never see the
        // endpoints. Runtime registration is instance-agnostic and works for any
        // install shape (npm / git / tarball).
        const invocations = ['root', 'list', 'stat', 'search', 'grep', 'read', 'readMore', 'readHex', 'write', 'readImage']
            .map((method) => ({
            id: 'dsh-filelens#filelens/' + method,
            service: 'filelens',
            namespace: 'filelens',
            method,
            invocation: { kind: 'direct' },
            parameters: [{
                    name: 'args',
                    wire: 'args',
                    source: 'json',
                    codec: { mode: 'src-json' },
                }],
            result: { mode: 'src-json' },
        }));
        // register() is a public method on the TypertRegistry service class; the
        // minimal TypertRegistryContract interface intentionally omits it, so the
        // call goes through a narrow structural assertion.
        const typert = ctx.typert;
        typert.register({
            package: 'dsh-filelens',
            face: 'host',
            schemas: [],
            model: { services: [], events: [], objects: [] },
            invocations,
        });
    }
    // ---- containment ----
    async guard(root, target) {
        if (!root)
            return;
        const rootTarget = await this.fs.resolve(root);
        if (!rootTarget || !this.fs.contains(rootTarget, target)) {
            const err = new Error('path is outside the explorer root');
            err.kind = 'outside-root';
            throw err;
        }
    }
    kindOf(err) {
        const e = err;
        const code = e && e.code;
        if (code === 'FS_TOO_LARGE')
            return 'too-large';
        if (code === 'FS_NOT_TEXT')
            return 'binary';
        if (code === 'FS_NOT_FOUND')
            return 'missing';
        if (code === 'FS_NOT_REGULAR_FILE' || code === 'FS_NOT_DIRECTORY')
            return 'not-file';
        if (code === 'FS_STALE_VERSION')
            return 'stale';
        if (code === 'FS_PERMISSION_DENIED' || code === 'FS_SANDBOX_DENIED')
            return 'denied';
        if (code === 'FS_ABORTED')
            return 'aborted';
        const hay = ((e && e.kind) || '') + ' ' + ((e && e.message) || '');
        if (/too[_ -]?large/i.test(hay))
            return 'too-large';
        if (/binary|not utf|decode|invalid character/i.test(hay))
            return 'binary';
        if (/not found|no such/i.test(hay))
            return 'missing';
        return 'error';
    }
    errOf(err) {
        const e = err;
        return { kind: this.kindOf(err), message: (e && e.message) || String(err) };
    }
    fail(err) {
        const e = this.errOf(err);
        return { ok: false, kind: e.kind, message: e.message };
    }
    // ---- incremental-read stream cache ----
    async readFrom(iter, skip, max) {
        let text = '';
        let consumed = 0;
        let eof = false;
        while (text.length < max) {
            const r = await iter.next();
            if (r.done) {
                eof = true;
                break;
            }
            const len = r.value.length;
            if (skip >= len) {
                skip -= len;
                consumed += len;
                continue;
            }
            text += r.value.slice(skip);
            consumed += len;
            skip = 0;
            if (text.length >= max) {
                text = text.slice(0, max);
                break;
            }
        }
        return { text, consumed, eof };
    }
    cacheMore(key, version, iter, pos) {
        const old = this.moreCache.get(key);
        if (old && old.iter !== iter)
            void old.iter.return?.();
        this.moreCache.set(key, { version, iter, pos });
        if (this.moreCache.size > this.MORE_CACHE_MAX) {
            const first = this.moreCache.keys().next().value;
            if (first !== undefined) {
                const evicted = this.moreCache.get(first);
                if (evicted)
                    void evicted.iter.return?.();
                this.moreCache.delete(first);
            }
        }
    }
    dropMore(key) {
        const entry = this.moreCache.get(key);
        if (entry) {
            void entry.iter.return?.();
            this.moreCache.delete(key);
        }
    }
    // ---- session root ----
    sessionCwd() {
        try {
            const agents = this.ctx.get('agents');
            const initiator = agents && typeof agents.currentInitiator === 'function' ? agents.currentInitiator() : undefined;
            const c = initiator && initiator.session && initiator.session.header && initiator.session.header.cwd;
            if (typeof c === 'string' && c)
                return c;
        }
        catch { /* ignore */ }
        try {
            const sessions = this.ctx.get('sessions');
            const all = sessions && typeof sessions.list === 'function' ? sessions.list() : [];
            for (const s of all) {
                const c = s && s.header && s.header.cwd;
                if (typeof c === 'string' && c)
                    return c;
            }
        }
        catch { /* ignore */ }
        return null;
    }
    defaultRoot() {
        return this.sessionCwd()
            || (this.sandboxPolicy && typeof this.sandboxPolicy.workspaceRoot === 'string'
                ? this.sandboxPolicy.workspaceRoot
                : null);
    }
    toPlain(entries) {
        return entries
            .map((e) => ({
            name: e.name,
            type: e.type,
            size: typeof e.size === 'number' ? e.size : null,
            path: e.target.displayPath,
        }))
            .sort((a, b) => {
            const ad = a.type === 'directory' ? 0 : 1;
            const bd = b.type === 'directory' ? 0 : 1;
            if (ad !== bd)
                return ad - bd;
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        });
    }
    // ---- Remote methods ----
    async root(args) {
        // When the browser tells us which session this details column belongs to,
        // resolve THAT session's workspace; falling back to the generic scan.
        const a = args && typeof args === 'object' ? args : {};
        if (typeof a.sessionId === 'string' && a.sessionId) {
            try {
                const sessions = this.ctx.get('sessions');
                const session = sessions && typeof sessions.get === 'function' ? sessions.get(a.sessionId) : undefined;
                const cwd = session && session.header && session.header.cwd;
                if (typeof cwd === 'string' && cwd)
                    return { root: cwd };
            }
            catch { /* ignore */ }
        }
        return { root: this.defaultRoot() };
    }
    async list(args) {
        const a = args && typeof args === 'object' ? args : {};
        if (typeof a.path !== 'string' || !a.path) {
            return { ok: false, kind: 'error', message: 'missing path' };
        }
        const root = typeof a.root === 'string' && a.root ? a.root : null;
        try {
            const target = await this.fs.resolve(a.path);
            await this.guard(root, target);
            const entries = await this.fs.listDir(target);
            return { ok: true, path: a.path, entries: this.toPlain(entries) };
        }
        catch (err) {
            return this.fail(err);
        }
    }
    async stat(args) {
        // Lightweight existence/version probe for the client auto-refresh poll:
        // returns type/size/version without reading any content. The version
        // token is the same one `read`/`readHex`/`readImage` return, so the client
        // can detect "content changed on disk" and reload only then.
        const a = args && typeof args === 'object' ? args : {};
        if (typeof a.path !== 'string' || !a.path) {
            return { ok: false, kind: 'error', message: 'missing path' };
        }
        const root = typeof a.root === 'string' && a.root ? a.root : null;
        try {
            const target = await this.fs.resolve(a.path);
            await this.guard(root, target);
            const info = await this.fs.stat(target);
            if (!info)
                return { ok: false, kind: 'missing', message: 'file not found' };
            return {
                ok: true,
                path: a.path,
                type: info.type,
                size: typeof info.size === 'number' ? info.size : null,
                version: info.version,
            };
        }
        catch (err) {
            return this.fail(err);
        }
    }
    async search(args) {
        const a = args && typeof args === 'object' ? args : {};
        const root = typeof a.root === 'string' && a.root ? a.root : null;
        const query = typeof a.query === 'string' ? a.query.trim().toLowerCase() : '';
        if (!root || !query)
            return { ok: false, kind: 'error', message: 'missing root/query' };
        const family = typeof a.family === 'string' && a.family ? a.family : 'search:' + root;
        const prev = this.activeSearches.get(family);
        if (prev)
            prev.abort();
        const ctrl = new AbortController();
        this.activeSearches.set(family, ctrl);
        const signal = ctrl.signal;
        const maxDepth = 8;
        const dirCap = 3000;
        const resultCap = 300;
        const results = [];
        const seen = new Set();
        let dirsScanned = 0;
        let aborted = false;
        const walk = async (dirPath, depth) => {
            if (aborted || depth > maxDepth || dirsScanned > dirCap || results.length >= resultCap)
                return;
            let target;
            try {
                target = await this.fs.resolve(dirPath, { signal });
                if (seen.has(target.targetKey))
                    return;
                seen.add(target.targetKey);
            }
            catch {
                if (signal.aborted)
                    aborted = true;
                return;
            }
            let entries;
            try {
                entries = await this.fs.listDir(target, signal);
            }
            catch {
                if (signal.aborted)
                    aborted = true;
                return;
            }
            dirsScanned++;
            for (const e of entries) {
                if (aborted || results.length >= resultCap)
                    return;
                const name = e.name;
                if (name.startsWith('.'))
                    continue;
                if (name === 'node_modules' || name === '.git' || name === '.dsh')
                    continue;
                if (e.type === 'directory') {
                    await walk(e.target.displayPath, depth + 1);
                }
                else if (e.type === 'file' && name.toLowerCase().includes(query)) {
                    results.push({ path: e.target.displayPath, name });
                }
            }
        };
        try {
            await walk(root, 0);
            if (signal.aborted || aborted)
                return { ok: false, kind: 'aborted', message: 'aborted' };
            return { ok: true, results, truncated: results.length >= resultCap || dirsScanned > dirCap };
        }
        catch (err) {
            if (signal.aborted)
                return { ok: false, kind: 'aborted', message: 'aborted' };
            return this.fail(err);
        }
        finally {
            if (this.activeSearches.get(family) === ctrl)
                this.activeSearches.delete(family);
        }
    }
    async grep(args) {
        const a = args && typeof args === 'object' ? args : {};
        const root = typeof a.root === 'string' && a.root ? a.root : null;
        const query = typeof a.query === 'string' ? a.query.trim().toLowerCase() : '';
        if (!root || !query)
            return { ok: false, kind: 'error', message: 'missing root/query' };
        const family = typeof a.family === 'string' && a.family ? a.family : 'grep:' + root;
        const prev = this.activeSearches.get(family);
        if (prev)
            prev.abort();
        const ctrl = new AbortController();
        this.activeSearches.set(family, ctrl);
        const signal = ctrl.signal;
        const maxDepth = 8;
        const dirCap = 2000;
        const fileCap = 400;
        const perFileCap = 5;
        const resultCap = 300;
        const results = [];
        const seen = new Set();
        let dirsScanned = 0;
        let filesScanned = 0;
        let aborted = false;
        const walk = async (dirPath, depth) => {
            if (aborted || depth > maxDepth || dirsScanned > dirCap || results.length >= resultCap || filesScanned > fileCap)
                return;
            let target;
            try {
                target = await this.fs.resolve(dirPath, { signal });
                if (seen.has(target.targetKey))
                    return;
                seen.add(target.targetKey);
            }
            catch {
                if (signal.aborted)
                    aborted = true;
                return;
            }
            let entries;
            try {
                entries = await this.fs.listDir(target, signal);
            }
            catch {
                if (signal.aborted)
                    aborted = true;
                return;
            }
            dirsScanned++;
            for (const e of entries) {
                if (aborted || results.length >= resultCap || filesScanned > fileCap)
                    return;
                const name = e.name;
                if (name.startsWith('.'))
                    continue;
                if (name === 'node_modules' || name === '.git' || name === '.dsh')
                    continue;
                if (e.type === 'directory') {
                    await walk(e.target.displayPath, depth + 1);
                }
                else if (e.type === 'file') {
                    filesScanned++;
                    try {
                        const info = await this.fs.stat(e.target, signal);
                        if (!info || info.type !== 'file')
                            continue;
                        if (typeof info.size === 'number' && info.size > this.MAX_PREVIEW)
                            continue;
                        const text = await this.fs.readText(e.target, signal);
                        const ls = text.split('\n');
                        let hits = 0;
                        for (let li = 0; li < ls.length && hits < perFileCap; li++) {
                            if (ls[li].toLowerCase().includes(query)) {
                                results.push({ path: e.target.displayPath, name, line: li + 1, text: ls[li].trim().slice(0, 200) });
                                hits++;
                                if (results.length >= resultCap)
                                    break;
                            }
                        }
                    }
                    catch {
                        if (signal.aborted)
                            aborted = true;
                        /* binary or unreadable: skip */
                    }
                }
            }
        };
        try {
            await walk(root, 0);
            if (signal.aborted || aborted)
                return { ok: false, kind: 'aborted', message: 'aborted' };
            return {
                ok: true,
                results,
                truncated: results.length >= resultCap || dirsScanned > dirCap || filesScanned > fileCap,
            };
        }
        catch (err) {
            if (signal.aborted)
                return { ok: false, kind: 'aborted', message: 'aborted' };
            return this.fail(err);
        }
        finally {
            if (this.activeSearches.get(family) === ctrl)
                this.activeSearches.delete(family);
        }
    }
    async read(args) {
        const a = args && typeof args === 'object' ? args : {};
        if (typeof a.path !== 'string' || !a.path) {
            return { ok: false, kind: 'error', message: 'missing path' };
        }
        const root = typeof a.root === 'string' && a.root ? a.root : null;
        try {
            const target = await this.fs.resolve(a.path);
            await this.guard(root, target);
            const info = await this.fs.stat(target);
            if (!info)
                return { ok: false, kind: 'missing', message: 'file not found' };
            if (info.type !== 'file')
                return { ok: false, kind: 'not-file', message: 'not a regular file' };
            const size = typeof info.size === 'number' ? info.size : null;
            if (size === null || size > this.MAX_PREVIEW) {
                const iter = await this.fs.streamText(target);
                const { text, consumed, eof } = await this.readFrom(iter[Symbol.asyncIterator](), 0, this.MAX_PREVIEW);
                if (!eof)
                    this.cacheMore(target.targetKey, info.version, iter[Symbol.asyncIterator](), consumed);
                return { ok: true, text, truncated: !eof, size, version: info.version };
            }
            const text = await this.fs.readText(target);
            return { ok: true, text, truncated: false, size, version: info.version };
        }
        catch (err) {
            return this.fail(err);
        }
    }
    async readMore(args) {
        const a = args && typeof args === 'object' ? args : {};
        if (typeof a.path !== 'string' || !a.path) {
            return { ok: false, kind: 'error', message: 'missing path' };
        }
        const root = typeof a.root === 'string' && a.root ? a.root : null;
        const offset = typeof a.offset === 'number' && a.offset > 0 ? Math.floor(a.offset) : 0;
        try {
            const target = await this.fs.resolve(a.path);
            await this.guard(root, target);
            const key = target.targetKey;
            const info = await this.fs.stat(target);
            let entry = this.moreCache.get(key);
            if (entry && (!info || entry.version !== info.version)) {
                this.dropMore(key);
                entry = undefined;
            }
            let iter;
            let pos = 0;
            if (entry) {
                iter = entry.iter;
                pos = entry.pos;
            }
            else {
                iter = (await this.fs.streamText(target))[Symbol.asyncIterator]();
            }
            const skip = Math.max(0, offset - pos);
            const { text, consumed, eof } = await this.readFrom(iter, skip, this.MAX_PREVIEW);
            pos += consumed;
            if (eof) {
                this.dropMore(key);
            }
            else {
                this.cacheMore(key, (info && info.version) || '', iter, pos);
            }
            return { ok: true, text, newOffset: offset + text.length, eof };
        }
        catch (err) {
            return this.fail(err);
        }
    }
    async readHex(args) {
        const a = args && typeof args === 'object' ? args : {};
        if (typeof a.path !== 'string' || !a.path) {
            return { ok: false, kind: 'error', message: 'missing path' };
        }
        const root = typeof a.root === 'string' && a.root ? a.root : null;
        try {
            const target = await this.fs.resolve(a.path);
            await this.guard(root, target);
            const info = await this.fs.stat(target);
            if (!info)
                return { ok: false, kind: 'missing', message: 'file not found' };
            if (info.type !== 'file')
                return { ok: false, kind: 'not-file', message: 'not a regular file' };
            const size = typeof info.size === 'number' ? info.size : null;
            if (size !== null && size > this.MAX_HEX)
                return { ok: false, kind: 'too-large', message: 'binary larger than 256KB' };
            const bytes = await this.fs.readBytes(target, undefined, size || this.MAX_HEX);
            const truncated = size !== null ? size > bytes.length : bytes.length >= this.MAX_HEX;
            return { ok: true, bytes: Array.from(bytes), size, truncated, version: info.version };
        }
        catch (err) {
            return this.fail(err);
        }
    }
    async write(args) {
        const a = args && typeof args === 'object' ? args : {};
        if (typeof a.path !== 'string' || !a.path || typeof a.text !== 'string') {
            return { ok: false, kind: 'error', message: 'missing path/text' };
        }
        // Writes always require an explicit root: link-open/restored tabs may read
        // without one by explicit user intent, but a write must stay inside the
        // current explorer root.
        const root = typeof a.root === 'string' && a.root ? a.root : null;
        if (!root)
            return { ok: false, kind: 'error', message: 'write requires an explicit root' };
        try {
            const target = await this.fs.resolve(a.path);
            await this.guard(root, target);
            const expected = typeof a.expectedVersion === 'string' && a.expectedVersion
                ? { kind: 'replaceIfVersion', version: a.expectedVersion }
                : undefined;
            const outcome = await this.fs.writeText(target, a.text, expected);
            this.dropMore(target.targetKey);
            return { ok: true, version: outcome.version };
        }
        catch (err) {
            return this.fail(err);
        }
    }
    async readImage(args) {
        const a = args && typeof args === 'object' ? args : {};
        if (typeof a.path !== 'string' || !a.path) {
            return { ok: false, kind: 'error', message: 'missing path' };
        }
        const root = typeof a.root === 'string' && a.root ? a.root : null;
        try {
            const target = await this.fs.resolve(a.path);
            await this.guard(root, target);
            const info = await this.fs.stat(target);
            if (!info)
                return { ok: false, kind: 'missing', message: 'file not found' };
            if (info.type !== 'file')
                return { ok: false, kind: 'not-file', message: 'not a regular file' };
            const size = typeof info.size === 'number' ? info.size : null;
            if (size !== null && size > this.MAX_IMAGE)
                return { ok: false, kind: 'too-large', message: 'image larger than 4MB' };
            const bytes = await this.fs.readBytes(target, undefined, this.MAX_IMAGE);
            let bin = '';
            for (let i = 0; i < bytes.length; i += 0x8000) {
                bin += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + 0x8000)));
            }
            const ext = (a.path.match(/\.([^.]+)$/) || [, ''])[1].toLowerCase();
            const mime = MIME[ext] || 'application/octet-stream';
            return { ok: true, dataUrl: 'data:' + mime + ';base64,' + btoa(bin), size, version: info.version };
        }
        catch (err) {
            return this.fail(err);
        }
    }
}
FileLensService.inject = ['fs', 'typert'];
export default FileLensService;
