# dsh-filelens

English | [中文](README.zh.md)

**FileLens** — a right-column file explorer for the DeepSeek Harness web UI.
Browse a lazy directory tree, preview many formats, search file names and
contents, open multiple tabs, and inline-edit text files — with containment
guards and version-guarded writes built in.

A single npm package ships both halves:

- **Host half** — the `filelens` Remote service (`root` / `list` / `search` /
  `grep` / `read` / `readMore` / `readHex` / `write` / `readImage`) over the
  host `fs` service. Invocation definitions are registered into the Host
  Typert registry at runtime (`typert.local`) — no generated artifacts, no
  decorator markers, install-shape agnostic.
- **Browser half** — the details-column UI, wired to the Host through the same
  `/api` Remote transport the built-in client connection uses. No
  `ctx.remote` namespace injection is needed, so there is nothing to deadlock
  or misconfigure.

## Features

- **Lazy directory tree** — expand/collapse, hidden-dotfile toggle, breadcrumb
  navigation, drag-resizable column, and **every entry is shown** (no per
  directory cap). Refresh keeps your open tabs. The tree and open previews
  **auto-sync with the disk** (~2.5 s poll): added/removed entries appear and
  disappear, and previews reload when file content changes.
- **Multi-tab preview** — drag-sortable tabs, `Ctrl+Tab` / `Ctrl+Shift+Tab`
  cycling; per-tab "pretty/raw" and word-wrap preferences.
- **Typed rendering**
  - Markdown: headings, lists, task lists, quotes, aligned tables, fenced
    code with syntax highlighting and a copy button, auto TOC, blue links
    (URL scheme whitelisted).
  - Images: zoom 0.2–8×, rotate, 1:1 reset, download, pixel dimensions.
  - JSON (pretty + highlighted), CSV/TSV tables, diff/log coloring.
  - 30+ languages syntax-highlighted with line numbers and cross-line block
    comment handling.
  - Binary files get a hex view (offset + hex + ASCII).
- **Large files** — 256 KB head preview with incremental "load more" (the Host
  continues the same stream — no re-read from the start), virtual scrolling
  beyond 800 lines.
- **Search** — recursive filename search (depth 8 / 3000 dirs / 300 results),
  content grep (≤256 KB text files, 5 hits per file, click to jump to line),
  `Ctrl+P` quick-open palette. Searches are cancelable per family, so
  keystrokes never pile up heavy scans on the shared host.
- **Conversation links** — clicking a file mention in a conversation switches
  the tree to that file's **own folder** and highlights the file row.
- **Workspace awareness** — the panel is a `session`-scoped details seat: it
  resolves the current session's workspace on open, so switching between
  sessions with different workspaces re-roots the panel automatically.
- **Inline editing** — text files edit in place; saves write through the host
  `fs` service with a version guard (see Security).
- **Right-click menu** — copy path / open in system / reveal in folder / open
  in new tab.
- **State persistence** — expanded dirs and open tabs survive reloads via
  `localStorage` (key `dsh-filex-state`); the root always follows the current
  workspace, never a stale stored one.

## Install

### Prerequisites

- A running DeepSeek Harness installation (the `dsh` CLI).
- A profile to install into — the default deployment boots the `web` profile
  (`dsh web` is its alias). The examples below use `web`; any name works and
  the first `add` initializes it.

### Option A — from the GitHub repository

```sh
dsh plugin --profile web add github:Han-Yao94/dsh-filelens
```

### Option B — from the release tarball (no build step)

Download `dsh-filelens-1.0.0.tgz` from the
[releases page](https://github.com/Han-Yao94/dsh-filelens/releases), then:

```sh
dsh plugin --profile web add ./dsh-filelens-1.0.0.tgz
```

### Option C — from npm (once published)

```sh
dsh plugin --profile web add dsh-filelens
```

### Web GUI bundle

If the profile does not exist yet, the first `add` initializes it with
`@deepseek-ai/dsh-base`; the browser GUI additionally needs the web-app
bundle:

```sh
dsh plugin --profile web add @deepseek-ai/dsh-web-app
```

Then boot with `dsh --profile web` (or `dsh web`).

### Git installs and build scripts

The package ships a `prepare` script that builds `lib/` from source, and the
`lib/` artifacts are committed as well, so a clone works either way. pnpm ≥10
refuses to run a git dependency's `prepare` script until it is explicitly
allowed — if the first `add` fails, copy the exact package key pnpm printed
into the profile's `pnpm-workspace.yaml` and re-run:

```yaml
allowBuilds:
  dsh-filelens: true
```

That allowance executes the package's build code on your machine at install
time; only allow packages whose source you trust, and prefer pinning a
commit: `github:Han-Yao94/dsh-filelens#<sha>`.

### Verify the install

```sh
dsh --profile web --dump-config   # look for a "# == dsh-filelens" layer
```

## Usage

Open the panel with the folder icon in the conversation header (or the
details column), then:

| Action | How |
| --- | --- |
| Navigate the tree | click, or `↑` / `↓` / `←` / `→` / `Enter` |
| Open a file | click its row (preview tab opens) |
| Open a file's folder | click a file mention in a conversation |
| Close back to the tree | `Esc` |
| Search names / contents | search box; toggle 文件名/内容 (name/content) mode |
| Quick open | `Ctrl+P`, type to filter, `Enter` to open |
| Find in file | `Ctrl+F`, `Enter` / `Shift+Enter` next / previous, `Esc` to close |
| Switch tabs | click, `Ctrl+Tab`, `Ctrl+Shift+Tab`, `Ctrl+W` closes |
| Edit a text file | the pencil button (disabled until the file is fully loaded) |
| Save / cancel | `Ctrl+S` or the 保存 button / 取消 |
| Zoom an image | 0.2–8× buttons, rotate, 1:1, download |
| Copy code | copy button on fenced code blocks |

## Security model

| Layer | Enforcement |
| --- | --- |
| Explorer root | every read/write is containment-guarded against an explicit root; the guard is **fail-closed** (a root that cannot resolve, or a target outside it, rejects the call) |
| Writes | `file.write` **requires an explicit root** — link-opened or restored tabs may read without one by explicit user intent, but never write |
| Version guard | saves carry the `FsVersion` observed at read time; a file changed elsewhere rejects the save with `stale` instead of silently overwriting |
| Truncation guard | files not fully loaded (>256 KB) cannot be edited, so a save can never truncate the rest of the file |
| Host sandbox | the underlying `fs` sandbox (e.g. `workspace-write`) remains the outermost boundary |
| Markdown | link/image URLs are scheme-whitelisted (`javascript:`/`data:` render inert) |

Failures are never silent: save / load-more / root-pick errors surface in an
in-panel notice.

## Architecture

- **One package, two halves.** The Loader row (`id: filelens`) loads the Host
  service; the browser half is picked up automatically from the `dsh.client`
  declaration.
- **No generated artifacts.** The Host registers its nine invocation
  definitions into `typert.local` at service construction (src-json codecs,
  zero extra dependencies), so the gateway resolves them in any install shape.
- **Direct transport.** The browser half POSTs the same `client-request`
  envelope to `/api` that the built-in connection uses — no `ctx.remote`
  namespace injection, no mount-order pitfalls.
- **Host-side engineering.** Incremental reads continue a cached stream
  (O(n) per session instead of O(n²)); search/grep walks abort on a new
  request via AbortController; errors map to structured `FsError` codes.
- **Zero runtime npm dependencies** beyond the `@deepseek-ai/cordis` /
  `@deepseek-ai/dsh-typert-protocol` peers the harness already provides.

## Notes

- The column width drag range inherits the host's details-column constants
  (stock hosts allow a narrower range than the development layout; FileLens
  works with both).
- Editing **writes to disk** — review the content before saving; the version
  guard protects against concurrent external changes.
- The `details` seat is `session`-scoped: each session gets its own panel
  state, and switching sessions re-roots to that session's workspace.

## Development

```sh
npm install
npm run build                       # tsc (host half) + esbuild (browser bundle)
node scripts/make-client.mjs        # regenerate src/client from ../client.js
```

The UI logic source of truth is `../client.js` (the dynamic-plugin edition);
`make-client.mjs` transforms it into the static client half.

## License

MIT. The SVG icon paths in the UI are derived from the Lucide icon set (ISC)
— see `LICENSE` for the full notices.
