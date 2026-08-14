// GENERATED from ../client.js by scripts/make-client.mjs — edit the source
// file, then re-run `node scripts/make-client.mjs`. Static client half: the
// FileLens UI in the details column, reaching the host over the /api Remote
// transport (the same wire the client-connection package uses). The host
// endpoint is registered by the FileLens service at construction, so no
// ctx.remote namespace injection is needed — the cordis inject guard and the
// mount-order deadlock cannot interfere.

import React from 'react'

// Replaces callRemote(...) from the dynamic-plugin edition: POSTs a
// client-request envelope to the /api bridge (identical shape to the
// client-connection rpc.call) and unwraps the server response. The host
// method always takes one plain-object `args` argument.
async function callRemote(method, args) {
  const endpoint = method.slice(5)
  const rpcId = (typeof crypto !== 'undefined' && crypto.randomUUID)
    ? crypto.randomUUID()
    : 'id-' + Math.random().toString(36).slice(2)
  let res
  try {
    res = await fetch('/api/filelens/' + endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        type: 'client-request',
        rpcId,
        method: 'filelens/' + endpoint,
        payload: { args: { args } },
      }),
    })
  } catch (err) {
    const e = new Error('filelens transport failure: ' + ((err && err.message) || String(err)))
    e.kind = 'transport'
    throw e
  }
  if (!res.ok) throw new Error('filelens transport failure: HTTP ' + res.status)
  let full
  try { full = await res.json() } catch (err) { throw new Error('filelens transport failure: bad response') }
  if (full.rpcId !== rpcId) throw new Error('filelens transport failure: rpcId mismatch')
  const result = full.result
  if (!result || result.ok !== true) {
    const err = new Error((result && result.error && result.error.message) || ('remote ' + method + ' failed'))
    err.kind = result && result.error && result.error.code
    throw err
  }
  return result.value
}

// FileLens — DeepSeek Harness dynamic Cordis plugin
// Client half (code.client). This is the exact body of the running plugin
// (filex-1 / pkg-23). The host half lives in host.js.
//
// Plain JS only (no JSX/TS/import): React arrives as the `React` closure
// symbol; the browser page global `document` is used for a few additive
// listeners and DOM lookups. All file I/O goes through callRemote(...).
//
// Slots contributed:
//   details (priority -1)                -> the FileLens panel (right column)
//   conversation.session.header.actions  -> the toggle button (id file-explorer-toggle)
//   shell.overlay (not used since pkg-12 reverted to the real column)

export async function apply(ctx) {
    const slots = ctx.get('slots')
    const layout = ctx.get('layout')
    const workspaces = ctx.get('workspaces')
    const timer = ctx.get('timer')
    if (slots === undefined) return

    // styles.insert may be absent in a static client runtime; fall back to a
    // plain style tag so the panel always gets its CSS.
    const stylesService = ctx.get('styles')
    const styles = stylesService || {
      insert(css) {
        if (typeof document === 'undefined' || !document.head) return undefined
        let tag = document.getElementById('dsh-filelens-styles')
        if (!tag) {
          tag = document.createElement('style')
          tag.id = 'dsh-filelens-styles'
          document.head.appendChild(tag)
        }
        tag.textContent = css
        return undefined
      },
    }

    const store = { open: false, listeners: new Set(), pendingFile: null, fileListeners: new Set(), keyListeners: new Set() }
    const setOpen = (v) => {
      store.open = v
      store.listeners.forEach((fn) => fn())
    }
    const basenameOf = (p) => {
      const s = String(p)
      const i = Math.max(s.lastIndexOf('/'), s.lastIndexOf('\\'))
      return i === -1 ? s : s.slice(i + 1)
    }
    const parentOf = (p) => {
      const s = String(p)
      const i = Math.max(s.lastIndexOf('/'), s.lastIndexOf('\\'))
      return i > 0 ? s.slice(0, i) : s
    }

    // ---- shared constants (mirror the caps in host.js) ----
    const LINE_H = 19
    const VIRTUAL_THRESHOLD = 800
    const TABLE_SLICE = 1000
    const PREVIEW_KB = 256

    // Escape a path for use inside a CSS attribute selector string. Raw
    // backslashes/quotes in a selector string are CSS escapes, so a Windows
    // path like C:\files\a.txt silently breaks an unescaped query.
    const escAttr = (s) => (typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(s) : String(s).replace(/["\\]/g, '\\$&'))

    // ---- conversation file links (code button[title]) open in FileLens ----
    const looksLikePath = (s) => /^[A-Za-z]:[\\/]/.test(s) || /^\\\\/.test(s) || /^\/[^/]/.test(s)
    const requestOpenFile = (path) => {
      store.pendingFile = path
      setOpen(true)
      if (layout) layout.openDetails()
      store.fileListeners.forEach((fn) => fn(path))
    }
    ctx.effect(() => {
      if (typeof document === 'undefined' || !document.addEventListener) return
      const onDocClick = (event) => {
        const target = event && event.target
        const btn = target && typeof target.closest === 'function'
          ? target.closest('code button[title]')
          : null
        if (!btn) return
        const title = btn.getAttribute && btn.getAttribute('title')
        if (typeof title !== 'string' || !looksLikePath(title)) return
        event.preventDefault()
        event.stopPropagation()
        requestOpenFile(title)
      }
      document.addEventListener('click', onDocClick, true)
      return () => document.removeEventListener('click', onDocClick, true)
    })

    // ---- panel-scoped keyboard shortcuts: Esc / arrows / Ctrl+F / Ctrl+P / Ctrl+Tab ----
    ctx.effect(() => {
      if (typeof document === 'undefined' || !document.addEventListener) return
      const onKey = (e) => {
        if (!store.open) return
        const t = e.target
        const inPanel = t && typeof t.closest === 'function' && t.closest('.fex-panel')
        if (!inPanel) return
        const k = e.key
        const ctrl = e.ctrlKey || e.metaKey
        const relevant = k === 'Escape' || k.startsWith('Arrow') || (ctrl && ['f', 't', 'p'].includes(k.toLowerCase()))
        if (!relevant) return
        let handled = false
        store.keyListeners.forEach((fn) => { try { if (fn(e)) handled = true } catch (err) { /* ignore */ } })
        if (handled) { e.preventDefault(); e.stopPropagation() }
      }
      document.addEventListener('keydown', onKey, true)
      return () => document.removeEventListener('keydown', onKey, true)
    })

    // ---- Markdown renderer (dependency-free) ----
    const parseMarkdown = (src) => {
      const lines = String(src).split(/\r?\n/)
      const blocks = []
      let i = 0
      while (i < lines.length) {
        const line = lines[i]
        const fence = /^(`{3,}|~{3,})/.exec(line)
        if (fence) {
          const lang = line.slice(fence[0].length).trim()
          const buf = []
          i++
          while (i < lines.length && !/^(`{3,}|~{3,})/.test(lines[i])) { buf.push(lines[i]); i++ }
          i++
          blocks.push({ type: 'code', lang, text: buf.join('\n') })
          continue
        }
        if (/^\s*$/.test(line)) { i++; continue }
        const h = /^(#{1,6})\s+(.*)$/.exec(line)
        if (h) { blocks.push({ type: 'heading', level: h[1].length, text: h[2] }); i++; continue }
        if (/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) { blocks.push({ type: 'hr' }); i++; continue }
        if (/^\s*>\s?/.test(line)) {
          const buf = []
          while (i < lines.length && /^\s*>\s?/.test(lines[i])) { buf.push(lines[i].replace(/^\s*>\s?/, '')); i++ }
          blocks.push({ type: 'quote', text: buf.join('\n') })
          continue
        }
        if (/^\s*[-*+]\s+/.test(line)) {
          const items = []
          while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
            let it = lines[i].replace(/^\s*[-*+]\s+/, '')
            const tm = /^\[([ xX])\]\s+/.exec(it)
            items.push(tm ? { checked: tm[1].toLowerCase() === 'x', text: it.slice(tm[0].length) } : { checked: null, text: it })
            i++
          }
          blocks.push({ type: 'ul', items })
          continue
        }
        if (/^\s*\d+[.)]\s+/.test(line)) {
          const items = []
          while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) {
            let it = lines[i].replace(/^\s*\d+[.)]\s+/, '')
            const tm = /^\[([ xX])\]\s+/.exec(it)
            items.push(tm ? { checked: tm[1].toLowerCase() === 'x', text: it.slice(tm[0].length) } : { checked: null, text: it })
            i++
          }
          blocks.push({ type: 'ol', items })
          continue
        }
        if (line.includes('|') && i + 1 < lines.length) {
          const sep = lines[i + 1]
          if (sep.includes('-') && /^\s*\|?[\s:|-]+\|?\s*$/.test(sep)) {
            const split = (s) => s.split('|').map((x) => x.trim()).filter((x, idx, arr) => !(idx === 0 && x === '') && !(idx === arr.length - 1 && x === ''))
            const header = split(line)
            const align = split(sep).map((c) => (c.startsWith(':') && c.endsWith(':') ? 'center' : c.endsWith(':') ? 'right' : c.startsWith(':') ? 'left' : null))
            const body = []
            i += 2
            while (i < lines.length && lines[i].includes('|') && !/^\s*$/.test(lines[i])) { body.push(split(lines[i])); i++ }
            blocks.push({ type: 'table', header, body, align })
            continue
          }
        }
        const buf = [line]
        i++
        while (
          i < lines.length &&
          !/^\s*$/.test(lines[i]) &&
          !/^(#{1,6})\s/.test(lines[i]) &&
          !/^(`{3,}|~{3,})/.test(lines[i]) &&
          !/^\s*>\s?/.test(lines[i]) &&
          !/^\s*[-*+]\s+/.test(lines[i]) &&
          !/^\s*\d+[.)]\s+/.test(lines[i])
        ) { buf.push(lines[i]); i++ }
        blocks.push({ type: 'para', text: buf.join('\n') })
      }
      return blocks
    }

    // Inline parse: the regex MUST be a function-local variable (recursion-safe)
    // URL scheme whitelists: markdown content is untrusted, so javascript:/
    // data: links/images render inert instead of clickable/loadable.
    const SAFE_HREF = /^(https?:|mailto:|#|\/|\.{0,2}\/)/i
    const SAFE_SRC = /^(https?:|data:image\/|\/|\.{0,2}\/)/i
    const inline = (text) => {
      const RE = /(`[^`\n]+`)|(\*\*[^*\n]+\*\*)|(\*[^*\n]+\*)|(~~[^~\n]+~~)|(!\[([^\]]*)\]\(([^)\s]+\)))|(\[([^\]]+)\]\(([^)\s]+\)))/g
      const out = []
      let last = 0
      let m
      while ((m = RE.exec(text))) {
        if (m.index > last) out.push(text.slice(last, m.index))
        if (m[1]) out.push(React.createElement('code', { key: out.length, className: 'fex-md-ic' }, m[1].slice(1, -1)))
        else if (m[2]) out.push(React.createElement('strong', { key: out.length }, inline(m[2].slice(2, -2))))
        else if (m[3]) out.push(React.createElement('em', { key: out.length }, inline(m[3].slice(1, -1))))
        else if (m[4]) out.push(React.createElement('del', { key: out.length }, inline(m[4].slice(2, -2))))
        else if (m[5]) out.push(React.createElement('img', { key: out.length, src: SAFE_SRC.test(m[7]) ? m[7] : undefined, alt: m[6] || '', style: { maxWidth: '100%' } }))
        else if (m[8]) out.push(React.createElement('a', { key: out.length, href: SAFE_HREF.test(m[10]) ? m[10] : undefined, target: '_blank', rel: 'noreferrer' }, inline(m[9])))
        last = RE.lastIndex
      }
      if (last < text.length) out.push(text.slice(last))
      return out
    }

    const FENCE_ALIAS = {
      js:'js', javascript:'js', jsx:'js', mjs:'js', cjs:'js', node:'js',
      ts:'ts', typescript:'ts', tsx:'ts',
      py:'py', python:'py', sh:'sh', bash:'sh', shell:'sh', zsh:'sh',
      ps1:'ps1', powershell:'ps1', bat:'bat', batch:'bat',
      rs:'rs', rust:'rs', go:'go', golang:'go', java:'java', kt:'kt', kotlin:'kt',
      swift:'swift', c:'c', cpp:'cpp', cxx:'cpp', h:'c', hpp:'cpp',
      cs:'cs', csharp:'cs', php:'php', rb:'rb', ruby:'rb', lua:'lua', dart:'dart',
      sql:'sql', json:'json', yaml:'yaml', yml:'yaml', toml:'toml', ini:'ini', cfg:'ini', conf:'conf',
      xml:'xml', html:'xml', svg:'xml', vue:'vue', svelte:'svelte',
      css:'css', scss:'css', less:'css',
      text:'text', plain:'text', plaintext:'text', txt:'text', md:'text', markdown:'text',
    }

    const CodeCopy = (props) => {
      const [done, setDone] = React.useState(false)
      const onCopy = () => {
        try {
          const p = navigator && navigator.clipboard && navigator.clipboard.writeText
            ? navigator.clipboard.writeText(props.text)
            : Promise.reject(new Error('no clipboard'))
          p.then(() => { setDone(true); if (timer) timer.timeout(() => setDone(false), 1200) }).catch(() => {})
        } catch (err) { /* ignore */ }
      }
      return React.createElement('button', {
        className: 'fex-md-copy' + (done ? ' done' : ''), type: 'button',
        onClick: onCopy, title: '复制代码',
      }, done ? '✓' : '复制')
    }

    const MdToc = (props) => {
      const [open, setOpen] = React.useState(false)
      const scrollTo = (anchor) => {
        const el = document.querySelector('[data-fex-anchor="' + anchor + '"]')
        if (el && el.scrollIntoView) el.scrollIntoView({ block: 'start' })
      }
      return React.createElement('div', { className: 'fex-md-toc' },
        React.createElement('button', { className: 'fex-md-toc-toggle', type: 'button', onClick: () => setOpen(!open) },
          '📑 目录 (' + props.headings.length + ')' + (open ? ' ▾' : ' ▸')),
        open ? React.createElement('ul', { className: 'fex-md-toc-list' },
          props.headings.map((h) => React.createElement('li', { key: h.key, style: { paddingLeft: (h.level - 1) * 12 } },
            React.createElement('a', { href: '#', onClick: (e) => { e.preventDefault(); scrollTo(h.anchor) } }, inline(h.text)),
          )),
        ) : null,
      )
    }

    const renderBlock = (b, k) => {
      switch (b.type) {
        case 'code': {
          const lang = String(b.lang || '').trim().toLowerCase()
          const lk = FENCE_ALIAS[lang] || langKeyOf(lang)
          const hl = lk !== 'text'
          const head = React.createElement('div', { key: 'h', className: 'fex-md-codehead' },
            React.createElement('span', { className: 'fex-md-codehead-lang' }, lang || ''),
            React.createElement(CodeCopy, { text: b.text }),
          )
          const pre = React.createElement('pre', { key: 'p', className: 'fex-md-pre' + (hl ? ' fex-hl' : '') },
            React.createElement('code', { className: 'fex-md-code' }, hl ? highlight(b.text, lk) : b.text))
          return React.createElement('div', { key: k, className: 'fex-md-pre-wrap' }, head, pre)
        }
        case 'heading':
          return React.createElement('h' + Math.min(b.level, 6), {
            key: k,
            className: 'fex-md-h fex-md-h' + Math.min(b.level, 6),
            'data-fex-anchor': b.anchor,
          }, inline(b.text))
        case 'hr':
          return React.createElement('hr', { key: k, className: 'fex-md-hr' })
        case 'quote':
          return React.createElement('blockquote', { key: k, className: 'fex-md-quote' }, renderBlocks(b.text))
        case 'ul':
          return React.createElement('ul', { key: k, className: 'fex-md-list' },
            b.items.map((it, j) => React.createElement('li', { key: j },
              it.checked !== null
                ? React.createElement(React.Fragment, null,
                    React.createElement('span', { className: 'fex-md-check' + (it.checked ? ' on' : '') }, it.checked ? '☑' : '☐'),
                    inline(it.text),
                  )
                : inline(it.text),
            )),
          )
        case 'ol':
          return React.createElement('ol', { key: k, className: 'fex-md-list' },
            b.items.map((it, j) => React.createElement('li', { key: j },
              it.checked !== null
                ? React.createElement(React.Fragment, null,
                    React.createElement('span', { className: 'fex-md-check' + (it.checked ? ' on' : '') }, it.checked ? '☑' : '☐'),
                    inline(it.text),
                  )
                : inline(it.text),
            )),
          )
        case 'table':
          return React.createElement('table', { key: k, className: 'fex-md-table' },
            React.createElement('thead', null, React.createElement('tr', null, b.header.map((c, j) => React.createElement('th', { key: j, style: b.align && b.align[j] ? { textAlign: b.align[j] } : undefined }, inline(c))))),
            React.createElement('tbody', null, b.body.map((r, j) => React.createElement('tr', { key: j }, b.header.map((c, idx) => React.createElement('td', { key: idx, style: b.align && b.align[idx] ? { textAlign: b.align[idx] } : undefined }, inline(r[idx] || '')))))),
          )
        case 'para':
        default:
          return React.createElement('p', { key: k, className: 'fex-md-p' }, inline(b.text))
      }
    }
    const renderBlocks = (text) => parseMarkdown(text).map((b, k) => renderBlock(b, k))
    const renderMarkdown = (text) => {
      const blocks = parseMarkdown(text)
      const headings = []
      blocks.forEach((b, k) => {
        if (b.type === 'heading') {
          b.anchor = headings.length
          headings.push({ level: b.level, text: b.text, anchor: b.anchor, key: k })
        }
      })
      const toc = headings.length >= 2 ? React.createElement(MdToc, { headings }) : null
      const body = blocks.map((b, k) => renderBlock(b, k))
      return React.createElement(React.Fragment, null, toc, body)
    }

    // ---- lightweight syntax highlighter (per-line with cross-line block comments) ----
    const def = (o) => Object.assign({
      str: true, line: [], block: null, kw: [], types: false, fnCall: false,
      backtick: false, hex: false, xml: false, ident: /[A-Za-z_$]/,
    }, o)
    const LANGS = {
      text: def({ str: false, kw: null }),
      json: def({ kw: ['true','false','null'] }),
      js: def({ backtick: true, line: ['//'], block: ['/*','*/'], types: true, fnCall: true, kw: ['const','let','var','function','return','if','else','for','while','do','switch','case','break','continue','new','class','extends','import','export','from','default','async','await','try','catch','finally','throw','typeof','instanceof','this','super','null','undefined','true','false','in','of','delete','void','yield','static','get','set'] }),
      ts: def({ backtick: true, line: ['//'], block: ['/*','*/'], types: true, fnCall: true, kw: ['const','let','var','function','return','if','else','for','while','do','switch','case','break','continue','new','class','extends','implements','import','export','from','default','async','await','try','catch','finally','throw','typeof','instanceof','this','super','null','undefined','true','false','in','of','delete','void','yield','static','interface','type','enum','namespace','declare','readonly','public','private','protected','abstract','as','keyof','infer','satisfies'] }),
      py: def({ line: ['#'], types: true, fnCall: true, kw: ['def','return','if','elif','else','for','while','in','not','and','or','import','from','as','class','try','except','finally','raise','with','lambda','None','True','False','pass','break','continue','yield','global','nonlocal','del','is','assert','async','await','match','case'] }),
      go: def({ line: ['//'], block: ['/*','*/'], types: true, fnCall: true, kw: ['package','import','func','var','const','type','struct','interface','return','if','else','for','range','switch','case','break','continue','default','defer','go','chan','map','select','fallthrough','true','false','nil'] }),
      rs: def({ line: ['//'], block: ['/*','*/'], types: true, fnCall: true, kw: ['fn','let','mut','const','struct','enum','impl','trait','use','mod','pub','return','if','else','for','while','loop','match','break','continue','async','await','move','ref','in','true','false','self','Self'] }),
      java: def({ line: ['//'], block: ['/*','*/'], types: true, fnCall: true, kw: ['public','private','protected','class','interface','extends','implements','return','if','else','for','while','switch','case','break','continue','new','static','final','void','int','long','double','boolean','char','byte','short','float','try','catch','finally','throw','throws','package','import','this','super','null','true','false','abstract','enum'] }),
      c: def({ line: ['//'], block: ['/*','*/'], types: true, fnCall: true, kw: ['include','define','ifdef','ifndef','endif','if','else','for','while','return','void','int','char','float','double','long','short','unsigned','signed','struct','typedef','enum','union','static','extern','const','switch','case','break','continue','sizeof','true','false','NULL'] }),
      cpp: def({ line: ['//'], block: ['/*','*/'], types: true, fnCall: true, kw: ['include','define','ifdef','ifndef','endif','if','else','for','while','return','void','int','char','float','double','long','short','unsigned','signed','struct','typedef','enum','union','static','extern','const','switch','case','break','continue','sizeof','true','false','NULL','class','public','private','protected','namespace','using','template','typename','virtual','override','new','delete','this','nullptr','bool','auto'] }),
      cs: def({ line: ['//'], block: ['/*','*/'], types: true, fnCall: true, kw: ['public','private','protected','internal','class','interface','namespace','using','return','if','else','for','foreach','while','switch','case','break','continue','new','static','void','int','long','double','bool','string','var','try','catch','finally','throw','this','base','null','true','false','async','await','readonly'] }),
      php: def({ line: ['//','#'], block: ['/*','*/'], types: true, fnCall: true, kw: ['echo','print','if','else','elseif','for','foreach','while','function','return','class','public','private','protected','static','new','try','catch','finally','throw','require','include','true','false','null','namespace','use','extends','implements','interface','abstract','final','switch','case','break','continue','default','global','this'] }),
      rb: def({ line: ['#'], types: true, fnCall: true, kw: ['def','end','if','elsif','else','unless','while','until','for','in','do','return','yield','module','class','require','puts','print','true','false','nil','and','or','not','self','case','when','break','next','rescue','ensure','begin','raise'] }),
      sh: def({ line: ['#'], kw: ['if','then','else','elif','fi','for','do','done','while','until','case','esac','function','echo','exit','return','set','local','export','read','test','true','false'] }),
      ps1: def({ line: ['#'], types: true, fnCall: true, kw: ['if','else','elseif','for','foreach','while','switch','function','return','param','begin','process','end','try','catch','finally','throw','new','true','false','null','filter','until','do','in'] }),
      bat: def({ str: false, kw: ['echo','set','if','else','for','do','goto','call','exit','rem','cd','dir','copy','move','del','errorlevel','not','exist'] }),
      lua: def({ line: ['--'], types: false, fnCall: true, kw: ['function','end','if','then','else','elseif','for','while','do','repeat','until','return','local','nil','true','false','and','or','not','break','in'] }),
      kt: def({ line: ['//'], block: ['/*','*/'], types: true, fnCall: true, kw: ['fun','val','var','class','object','interface','return','if','else','when','for','while','break','continue','import','package','public','private','protected','internal','open','override','abstract','sealed','data','null','true','false','this','try','catch','finally','throw','is','in','as','companion','lateinit','init'] }),
      swift: def({ line: ['//'], block: ['/*','*/'], types: true, fnCall: true, kw: ['func','let','var','class','struct','enum','protocol','extension','import','return','if','else','guard','for','while','repeat','switch','case','break','continue','public','private','internal','open','override','static','self','nil','true','false','try','catch','throw','throws','defer','in','as','is','where'] }),
      dart: def({ line: ['//'], block: ['/*','*/'], types: true, fnCall: true, kw: ['class','extends','implements','mixin','void','int','double','bool','String','var','final','const','return','if','else','for','while','switch','case','break','continue','import','export','library','part','of','new','this','super','null','true','false','try','catch','finally','throw','async','await','enum','typedef','abstract'] }),
      sql: def({ line: ['--'], types: true, kw: ['select','from','where','insert','into','values','update','set','delete','create','table','index','view','join','left','right','inner','outer','on','group','by','order','having','limit','offset','as','and','or','not','null','primary','key','foreign','references','distinct','count','sum','avg','min','max','asc','desc','drop','alter','add','column'] }),
      yaml: def({ line: ['#'] }),
      toml: def({ line: ['#'] }),
      ini: def({ line: [';','#'] }),
      conf: def({ line: ['#'] }),
      vue: def({ block: ['<!--','-->'], xml: true }),
      svelte: def({ block: ['<!--','-->'], xml: true }),
      xml: def({ block: ['<!--','-->'], xml: true }),
      css: def({ block: ['/*','*/'], hex: true, ident: /[A-Za-z_-]/ }),
    }
    const EXT_TO_LANG = {
      js:'js', mjs:'js', cjs:'js', jsx:'js', ts:'ts', tsx:'ts',
      py:'py', go:'go', rs:'rs', java:'java', c:'c', h:'c', cpp:'cpp', hpp:'cpp', cc:'cpp',
      cs:'cs', php:'php', rb:'rb', sh:'sh', bash:'sh', zsh:'sh', ps1:'ps1', bat:'bat',
      kt:'kt', swift:'swift', lua:'lua', dart:'dart', sql:'sql',
      yaml:'yaml', yml:'yaml', toml:'toml', ini:'ini', cfg:'ini', conf:'conf',
      xml:'xml', html:'xml', svg:'xml', vue:'vue', svelte:'svelte',
      css:'css', scss:'css', less:'css',
    }
    const langKeyOf = (ext) => EXT_TO_LANG[ext] || 'text'

    const highlight = (text, lang) => {
      const d = LANGS[lang] || LANGS.text
      const out = []
      let buf = ''
      const flush = () => { if (buf) { out.push(buf); buf = '' } }
      const emit = (cls, s) => { flush(); out.push(React.createElement('span', { key: out.length, className: 'fex-hl-' + cls }, s)) }
      let i = 0
      while (i < text.length) {
        const ch = text[i]
        if (d.str && (ch === '"' || ch === "'" || (ch === '`' && d.backtick))) {
          const q = ch
          let j = i + 1
          let s = q
          while (j < text.length) {
            const c = text[j]
            if (c === '\\') { s += c; if (j + 1 < text.length) { s += text[j + 1]; j += 2 } else { j++ } continue }
            s += c
            j++
            if (c === q) break
            if (c === '\n' && q !== '`') break
          }
          emit('str', s)
          i = j
          continue
        }
        if (d.line) {
          const hit = d.line.find((c) => text.startsWith(c, i))
          if (hit) {
            const nl = text.indexOf('\n', i)
            const end = nl === -1 ? text.length : nl
            emit('com', text.slice(i, end))
            i = end
            continue
          }
        }
        if (d.block) {
          const open = d.block[0]
          const close = d.block[1]
          if (text.startsWith(open, i)) {
            const ci = text.indexOf(close, i + open.length)
            const end = ci === -1 ? text.length : ci + close.length
            emit('com', text.slice(i, end))
            i = end
            continue
          }
        }
        if (d.xml && ch === '<') {
          const m = /^<\/?[A-Za-z][A-Za-z0-9-]*/.exec(text.slice(i))
          if (m) { emit('tag', m[0]); i += m[0].length; continue }
        }
        if (d.xml && ch === '>') { emit('tag', '>'); i++; continue }
        if (d.xml && /[A-Za-z-]/.test(ch)) {
          const m = /^[A-Za-z-]+(?=\s*=)/.exec(text.slice(i))
          if (m) { emit('attr', m[0]); i += m[0].length; continue }
        }
        if (d.hex && ch === '#') {
          const m = /^#[0-9a-fA-F]{3,8}\b/.exec(text.slice(i))
          if (m) { emit('num', m[0]); i += m[0].length; continue }
        }
        if (/[0-9]/.test(ch)) {
          const m = /^[0-9]+(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?/.exec(text.slice(i))
          emit('num', m[0])
          i += m[0].length
          continue
        }
        if (d.ident.test(ch)) {
          const m = /^[A-Za-z_$][A-Za-z0-9_$]*/.exec(text.slice(i))
          const word = m[0]
          if (d.kw && d.kwSet && d.kwSet.has(word)) emit('kw', word)
          else if (d.types && /^[A-Z]/.test(word)) emit('type', word)
          else if (d.fnCall && /^\s*\(/.test(text.slice(i + word.length))) emit('fn', word)
          else buf += word
          i += word.length
          continue
        }
        buf += ch
        i++
      }
      flush()
      return out
    }

    // Per-line highlight with cross-line block-comment state
    const highlightLine = (line, lang, state) => {
      const d = LANGS[lang] || LANGS.text
      const out = []
      let buf = ''
      const flush = () => { if (buf) { out.push(buf); buf = '' } }
      const emit = (cls, s) => { flush(); out.push(React.createElement('span', { key: out.length, className: 'fex-hl-' + cls }, s)) }
      let i = 0
      if (d.block && state && state.inComment) {
        const close = d.block[1]
        const ci = line.indexOf(close)
        if (ci === -1) { emit('com', line); return out }
        emit('com', line.slice(0, ci + close.length))
        state.inComment = false
        i = ci + close.length
      }
      while (i < line.length) {
        const ch = line[i]
        if (d.str && (ch === '"' || ch === "'" || (ch === '`' && d.backtick))) {
          const q = ch
          let j = i + 1
          let s = q
          while (j < line.length) {
            const c = line[j]
            if (c === '\\') { s += c; if (j + 1 < line.length) { s += line[j + 1]; j += 2 } else { j++ } continue }
            s += c
            j++
            if (c === q) break
            if (c === '\n' && q !== '`') break
          }
          emit('str', s)
          i = j
          continue
        }
        if (d.line) {
          const hit = d.line.find((c) => line.startsWith(c, i))
          if (hit) { emit('com', line.slice(i)); return out }
        }
        if (d.block) {
          const open = d.block[0]
          const close = d.block[1]
          if (line.startsWith(open, i)) {
            const ci = line.indexOf(close, i + open.length)
            if (ci === -1) { emit('com', line.slice(i)); if (state) state.inComment = true; return out }
            emit('com', line.slice(i, ci + close.length))
            i = ci + close.length
            continue
          }
        }
        if (d.xml && ch === '<') {
          const m = /^<\/?[A-Za-z][A-Za-z0-9-]*/.exec(line.slice(i))
          if (m) { emit('tag', m[0]); i += m[0].length; continue }
        }
        if (d.xml && ch === '>') { emit('tag', '>'); i++; continue }
        if (d.xml && /[A-Za-z-]/.test(ch)) {
          const m = /^[A-Za-z-]+(?=\s*=)/.exec(line.slice(i))
          if (m) { emit('attr', m[0]); i += m[0].length; continue }
        }
        if (d.hex && ch === '#') {
          const m = /^#[0-9a-fA-F]{3,8}\b/.exec(line.slice(i))
          if (m) { emit('num', m[0]); i += m[0].length; continue }
        }
        if (/[0-9]/.test(ch)) {
          const m = /^[0-9]+(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?/.exec(line.slice(i))
          emit('num', m[0])
          i += m[0].length
          continue
        }
        if (d.ident.test(ch)) {
          const m = /^[A-Za-z_$][A-Za-z0-9_$]*/.exec(line.slice(i))
          const word = m[0]
          if (d.kw && d.kwSet && d.kwSet.has(word)) emit('kw', word)
          else if (d.types && /^[A-Z]/.test(word)) emit('type', word)
          else if (d.fnCall && /^\s*\(/.test(line.slice(i + word.length))) emit('fn', word)
          else buf += word
          i += word.length
          continue
        }
        buf += ch
        i++
      }
      flush()
      return out
    }
    const computeCommentState = (lines, lang) => {
      const d = LANGS[lang]
      const states = []
      let inC = false
      if (d && d.block) {
        const open = d.block[0]
        const close = d.block[1]
        for (const l of lines) {
          states.push(inC)
          if (inC) {
            if (l.indexOf(close) !== -1) inC = false
          } else if (l.indexOf(open) !== -1) {
            const oi = l.indexOf(open)
            if (l.indexOf(close, oi + open.length) === -1) inC = true
          }
        }
      } else {
        lines.forEach(() => states.push(false))
      }
      return states
    }

    Object.keys(LANGS).forEach((k) => {
      if (LANGS[k].kw) LANGS[k].kwSet = new Set(LANGS[k].kw)
    })

    // ---- CSV / line rendering (virtual scrolling + cross-line highlight) ----
    const parseCsv = (text, sep) => {
      const rows = []
      let row = []
      let field = ''
      let inQ = false
      for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        if (inQ) {
          if (ch === '"') {
            if (text[i + 1] === '"') { field += '"'; i++ } else inQ = false
          } else field += ch
        } else if (ch === '"') inQ = true
        else if (ch === sep) { row.push(field); field = '' }
        else if (ch === '\n' || ch === '\r') {
          if (ch === '\r' && text[i + 1] === '\n') i++
          row.push(field); rows.push(row); row = []; field = ''
        } else field += ch
      }
      if (field !== '' || row.length) { row.push(field); rows.push(row) }
      return rows
    }
    const renderTable = (text, sep) => {
      const all = parseCsv(text, sep)
      const rows = all.slice(0, TABLE_SLICE)
      if (!rows.length) return React.createElement('div', { className: 'fex-note' }, '空文件')
      const header = rows[0]
      const table = React.createElement('div', { className: 'fex-table-wrap' },
        React.createElement('table', { className: 'fex-md-table' },
          React.createElement('thead', null, React.createElement('tr', null, header.map((c, j) => React.createElement('th', { key: j }, c)))),
          React.createElement('tbody', null, rows.slice(1).map((r, k) => React.createElement('tr', { key: k }, header.map((c, j) => React.createElement('td', { key: j }, r[j] || ''))))),
        ),
      )
      if (all.length > rows.length) {
        return React.createElement(React.Fragment, null,
          table,
          React.createElement('div', { className: 'fex-note' }, '仅显示前 ' + rows.length + ' 行（共 ' + all.length + ' 行）'),
        )
      }
      return table
    }
    const lineRow = (k, l, wrapCls, lang, mark, commentState) => {
      let content
      if (mark && k === mark.line && mark.len > 0) {
        const before = l.slice(0, mark.col)
        const mid = l.slice(mark.col, mark.col + mark.len)
        const after = l.slice(mark.col + mark.len)
        content = [before, React.createElement('mark', { key: 'm', className: 'fex-mark' }, mid), after]
      } else {
        content = lang && lang !== 'text' ? highlightLine(l, lang, { inComment: !!(commentState && commentState[k]) }) : l
      }
      return React.createElement('div', {
        key: k,
        className: 'fex-ln' + (mark && k === mark.line ? ' fex-ln-found' : ''),
        'data-ln': k,
      },
        React.createElement('span', { className: 'fex-ln-g' }, String(k + 1)),
        React.createElement('span', { className: 'fex-ln-c ' + wrapCls }, content),
      )
    }
    const VirtualLines = (props) => {
      const [start, setStart] = React.useState(0)
      const [count, setCount] = React.useState(80)
      React.useEffect(() => {
        const m = props.mark
        if (!m || !props.lines.length) return
        if (m.line < start || m.line >= start + count) setStart(Math.max(0, m.line - 30))
      }, [props.mark])
      const onScroll = (e) => {
        const el = e.currentTarget
        setStart(Math.max(0, Math.floor(el.scrollTop / LINE_H) - 30))
        setCount(Math.ceil(el.clientHeight / LINE_H) + 60)
      }
      const end = Math.min(props.lines.length, start + count)
      return React.createElement('div', {
        className: 'fex-lines', 'data-fex-path': props.dataPath || '', onScroll,
      },
        React.createElement('div', { className: 'fex-vspacer', style: { height: start * LINE_H } }),
        props.lines.slice(start, end).map((l, k) => lineRow(start + k, l, props.wrapCls, props.lang, props.mark, props.commentState)),
        React.createElement('div', { className: 'fex-vspacer', style: { height: (props.lines.length - end) * LINE_H } }),
      )
    }
    const renderLines = (text, wrapCls, lang, mark, dataPath) => {
      const lines = String(text).split('\n')
      const st = lang && lang !== 'text' ? computeCommentState(lines, lang) : null
      if (lines.length > VIRTUAL_THRESHOLD && wrapCls === 'fex-wrap-off') {
        return React.createElement(VirtualLines, { lines, wrapCls, lang, mark, dataPath, commentState: st })
      }
      return React.createElement('div', { className: 'fex-lines', 'data-fex-path': dataPath || '' },
        lines.map((l, k) => lineRow(k, l, wrapCls, lang, mark, st)),
      )
    }
    const renderDiff = (text, wrapCls, dataPath) => {
      const lines = String(text).split('\n')
      return React.createElement('div', { className: 'fex-lines', 'data-fex-path': dataPath || '' },
        lines.map((l, k) => {
          let cls = null
          if (l.startsWith('+') && !l.startsWith('+++')) cls = 'fex-diff-add'
          else if (l.startsWith('-') && !l.startsWith('---')) cls = 'fex-diff-del'
          else if (l.startsWith('@@') || l.startsWith('diff ') || l.startsWith('index ') || l.startsWith('--- ') || l.startsWith('+++ ')) cls = 'fex-diff-meta'
          return React.createElement('div', { key: k, className: 'fex-ln', 'data-ln': k },
            React.createElement('span', { className: 'fex-ln-g' }, String(k + 1)),
            React.createElement('span', { className: 'fex-ln-c ' + wrapCls + (cls ? ' ' + cls : '') }, l || '\u00a0'),
          )
        }),
      )
    }
    const renderLog = (text, wrapCls, dataPath) => {
      const lines = String(text).split('\n')
      return React.createElement('div', { className: 'fex-lines', 'data-fex-path': dataPath || '' },
        lines.map((l, k) => {
          let cls = null
          if (/\b(ERROR|FATAL|CRITICAL|错误|异常)\b/.test(l)) cls = 'fex-log-error'
          else if (/\b(WARN|WARNING|警告)\b/.test(l)) cls = 'fex-log-warn'
          else if (/\b(INFO|信息)\b/.test(l)) cls = 'fex-log-info'
          return React.createElement('div', { key: k, className: 'fex-ln', 'data-ln': k },
            React.createElement('span', { className: 'fex-ln-g' }, String(k + 1)),
            React.createElement('span', { className: 'fex-ln-c ' + wrapCls + (cls ? ' ' + cls : '') }, l || '\u00a0'),
          )
        }),
      )
    }
    const renderHex = (bytes, dataPath) => {
      const rows = []
      let r = 0
      for (let i = 0; i < bytes.length; i += 16) {
        const slice = bytes.slice(i, i + 16)
        const hex = []
        const ascii = []
        slice.forEach((b) => {
          hex.push(('0' + b.toString(16)).slice(-2))
          ascii.push(b >= 32 && b < 127 ? String.fromCharCode(b) : '.')
        })
        while (hex.length < 16) hex.push('  ')
        const hexStr = hex.map((h, j) => (j === 8 ? ' ' + h : h)).join(' ')
        rows.push(React.createElement('div', { key: i, className: 'fex-ln', 'data-ln': r },
          React.createElement('span', { className: 'fex-ln-g' }, i.toString(16).padStart(8, '0')),
          React.createElement('span', { className: 'fex-ln-c fex-wrap-off' },
            React.createElement('span', { className: 'fex-hex' }, hexStr),
            React.createElement('span', { className: 'fex-hex-ascii' }, ascii.join('')),
          ),
        ))
        r++
      }
      return React.createElement('div', { className: 'fex-lines', 'data-fex-path': dataPath || '' }, rows)
    }

    // ---- type detection ----
    const extOf = (name) => {
      const m = /\.[^.]+$/.exec(name)
      return m ? m[0].slice(1).toLowerCase() : ''
    }
    const detectType = (name) => {
      const ext = extOf(name)
      if (['md','markdown','mdx'].includes(ext)) return 'markdown'
      if (['png','jpg','jpeg','gif','webp','svg','ico','bmp'].includes(ext)) return 'image'
      if (ext === 'json') return 'json'
      if (ext === 'csv') return 'csv'
      if (ext === 'tsv') return 'tsv'
      if (['diff','patch'].includes(ext)) return 'diff'
      if (ext === 'log') return 'log'
      if (['txt','rst','text'].includes(ext)) return 'text'
      if (EXT_TO_LANG[ext]) return 'code'
      return 'text'
    }

    const renderPretty = (file, content) => {
      const typ = file.type
      if (typ === 'markdown') {
        try {
          return React.createElement('div', { className: 'fex-md' }, renderMarkdown(content.text))
        } catch (err) {
          return React.createElement(React.Fragment, null,
            React.createElement('div', { className: 'fex-note' }, 'Markdown 渲染失败，已回退原文：' + ((err && err.message) || String(err))),
            React.createElement('pre', { className: 'fex-pre' }, content.text),
          )
        }
      }
      if (typ === 'csv') return renderTable(content.text, ',')
      if (typ === 'tsv') return renderTable(content.text, '\t')
      return React.createElement('pre', { className: 'fex-pre' }, content.text)
    }

    // ---- breadcrumb ----
    const crumbSegments = (p) => {
      const s = String(p)
      const parts = s.split(/[\\/]/).filter((x) => x !== '')
      if (/^[A-Za-z]:/.test(s)) {
        const head = parts[0]
        return parts.slice(1).map((seg, i) => ({
          label: i === 0 ? head + '\\' + seg : seg,
          path: head + '\\' + parts.slice(1, i + 2).join('\\'),
        }))
      }
      let acc = ''
      return parts.map((seg) => {
        acc += '/' + seg
        return { label: seg, path: acc }
      })
    }

    // ---- icons (lucide-style strokes) ----
    const P = {
      folder: ['M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z'],
      folderOpen: ['M6 14l1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2'],
      file: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z', 'M14 2v4a2 2 0 0 0 2 2h4'],
      caret: ['m9 18 6-6-6-6'],
      back: ['m12 19-7-7 7-7', 'M19 12H5'],
      refresh: ['M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8', 'M21 3v5h-5'],
      folderPlus: ['M12 10v6', 'M9 13h6', 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z'],
      eye: ['M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
      eyeOff: ['M9.88 9.88a3 3 0 1 0 4.24 4.24', 'M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68', 'M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61', 'M2 2l20 20'],
      x: ['M18 6 6 18', 'm6 6 12 12'],
      search: ['M21 21l-4.35-4.35', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
      copy: ['M8 8h12v12H8z', 'M4 16V4h12'],
      folderOpen2: ['M6 14l1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2'],
      external: ['M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6', 'M15 3h6v6', 'M10 14 21 3'],
      zoomIn: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z', 'M11 8v6', 'M8 11h6', 'M21 21l-4.35-4.35'],
      zoomOut: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z', 'M8 11h6', 'M21 21l-4.35-4.35'],
      rotate: ['M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8', 'M21 3v5h-5'],
      download: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'],
      edit: ['M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z'],
      save: ['M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z', 'M17 21v-8H7v8', 'M7 3v5h8'],
    }
    const icon = (key, cls) => React.createElement('svg', {
      viewBox: '0 0 24 24', width: 14, height: 14, fill: 'none',
      stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round',
      className: cls, 'aria-hidden': true,
    }, P[key].map((d) => React.createElement('path', { key: d, d: d })))

    const extColor = (name) => {
      const m = /\.[^.]+$/.exec(name)
      if (!m) return null
      const e = m[0].slice(1).toLowerCase()
      if (['js','jsx','ts','tsx','mjs','cjs','py','go','rs','java','c','h','cpp','hpp','cs','php','rb','sh','ps1','bat','kt','swift','lua','dart','sql'].includes(e)) return '#5b9dff'
      if (['json','yaml','yml','toml','xml','ini','cfg','conf'].includes(e)) return '#e8a33d'
      if (['md','markdown','mdx','txt','rst','log'].includes(e)) return '#b48ae6'
      if (['html','css','scss','less','vue','svelte'].includes(e)) return '#e0709a'
      if (['png','jpg','jpeg','gif','svg','webp','ico','bmp'].includes(e)) return '#55c285'
      if (['csv','tsv','diff','patch'].includes(e)) return '#55c285'
      return null
    }

    // ---- styles ----
    ctx.effect(() => styles.insert(`
      .fex-panel{position:relative;display:flex;flex-direction:column;height:100%;min-height:0;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-family:var(--dsw-font-family);font-size:13px;line-height:20px;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;user-select:none;}
      .fex-panel *{box-sizing:border-box;}
      .fex-head{display:flex;align-items:center;gap:6px;padding:8px 10px;border-bottom:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);}
      .fex-title{display:flex;align-items:center;gap:6px;font-weight:600;font-size:13px;line-height:18px;letter-spacing:.2px;flex:none;color:var(--dsw-alias-label-primary);}
      .fex-title svg{color:var(--dsw-alias-state-warn-primary);}
      .fex-searchmode{flex:none;height:24px;padding:0 8px;border-radius:6px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);font-size:11px;cursor:pointer;}
      .fex-searchmode.on{color:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);}
      .fex-search{flex:1;min-width:0;height:24px;padding:0 8px 0 26px;border-radius:6px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font-size:12px;outline:none;transition:border-color .12s ease;background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="%23888" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>');background-repeat:no-repeat;background-position:8px center;}
      .fex-search:focus{border-color:var(--dsw-alias-brand-primary);}
      .fex-search::placeholder{color:var(--dsw-alias-label-secondary);opacity:.7;font-family:var(--ds-font-family-code);font-size:10.5px;}
      .fex-crumbs{display:flex;align-items:center;gap:2px;padding:4px 10px;border-bottom:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);flex:none;overflow-x:auto;}
      .fex-crumb{flex:none;padding:1px 6px;border-radius:4px;border:1px solid transparent;background:transparent;color:var(--dsw-alias-label-secondary);font-size:11px;line-height:16px;cursor:pointer;font-family:var(--ds-font-family-code);}
      .fex-crumb:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);}
      .fex-crumb.current{color:var(--dsw-alias-label-primary);font-weight:600;cursor:default;}
      .fex-crumb-sep{color:var(--dsw-alias-label-secondary);opacity:.5;font-size:11px;flex:none;}
      .fex-actions{display:flex;align-items:center;gap:2px;flex:none;margin-left:auto;}
      .fex-ibtn{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;padding:0;border:1px solid transparent;border-radius:7px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;transition:background .12s ease,color .12s ease,border-color .12s ease;}
      .fex-ibtn:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);}
      .fex-ibtn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px;}
      .fex-ibtn.active{color:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);}
      .fex-tabs{display:flex;align-items:center;gap:4px;padding:6px 10px 0;overflow-x:auto;flex:none;background:var(--dsw-alias-bg-layer-1);}
      .fex-tab{display:flex;align-items:center;gap:4px;max-width:180px;padding:3px 6px 3px 10px;border-radius:7px 7px 0 0;border:1px solid var(--dsw-alias-border-l1);border-bottom:none;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-secondary);font-size:11.5px;line-height:16px;cursor:grab;flex:none;user-select:none;animation:fexTabIn .28s ease-out both;}
      .fex-tab.dragging{opacity:.45;}
      .fex-tab.active{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-1);}
      .fex-tab-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
      .fex-tab-x{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;padding:0;border:none;border-radius:4px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;flex:none;}
      .fex-tab-x:hover{background:rgba(224,108,117,.2);color:#e06c75;}
      .fex-findbar{display:flex;align-items:center;gap:6px;padding:5px 10px;border-bottom:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);flex:none;}
      .fex-find-input{flex:1;min-width:0;height:24px;padding:0 8px;border-radius:6px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font-size:12px;outline:none;}
      .fex-find-input:focus{border-color:var(--dsw-alias-brand-primary);}
      .fex-find-count{flex:none;font-size:11px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;}
      .fex-tree{flex:1;min-height:0;overflow:auto;padding:6px 4px;}
      .fex-row{display:flex;align-items:center;gap:6px;height:28px;padding:0 8px;border-radius:6px;cursor:pointer;white-space:nowrap;color:var(--dsw-alias-label-primary);font-size:12.5px;line-height:18px;transition:background .1s ease;}
      .fex-row:hover{background:var(--dsw-alias-bg-layer-1);}
      .fex-row.selected{background:rgba(91,157,255,.16);}
      .fex-row.cursor{box-shadow:inset 0 0 0 1px var(--dsw-alias-brand-primary);}
      .fex-grep-line{flex:none;font-size:11px;color:var(--dsw-alias-state-warn-primary);font-variant-numeric:tabular-nums;}
      .fex-grep-snippet{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;color:var(--dsw-alias-label-secondary);opacity:.7;font-size:11px;font-family:var(--ds-font-family-code);}
      .fex-caret{width:14px;flex:none;display:inline-flex;align-items:center;justify-content:center;color:var(--dsw-alias-label-secondary);transition:transform .15s ease;}
      .fex-caret.open{transform:rotate(90deg);}
      .fex-ico{flex:none;display:inline-flex;align-items:center;justify-content:center;width:16px;}
      .fex-ico.dir{color:var(--dsw-alias-state-warn-primary);}
      .fex-name{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;}
      .fex-size{flex:none;font-size:11px;line-height:16px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;padding-left:6px;}
      .fex-content{flex:1;min-height:0;display:flex;flex-direction:column;}
      .fex-edit{flex:1;min-height:0;margin:0;padding:10px 12px;border:none;outline:none;resize:none;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-family:var(--ds-font-family-code);font-size:12px;line-height:19px;white-space:pre-wrap;overflow-wrap:break-word;tab-size:4;user-select:text;}
      .fex-preview-name{font-weight:600;font-size:13px;line-height:18px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
      .fex-badge{flex:none;padding:1px 7px;border-radius:999px;font-size:10.5px;line-height:15px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);border:1px solid var(--dsw-alias-border-l1);}
      .fex-badge.warn{color:var(--dsw-alias-state-warn-primary);border-color:var(--dsw-alias-state-warn-primary);background:transparent;}
      .fex-lines{flex:1;overflow:auto;padding:8px 0;font-family:var(--ds-font-family-code);font-size:12px;line-height:19px;user-select:text;-webkit-font-smoothing:antialiased;font-variant-ligatures:none;}
      .fex-vspacer{flex:none;}
      .fex-ln{display:flex;align-items:flex-start;}
      .fex-ln:hover{background:var(--dsw-alias-bg-layer-1);}
      .fex-ln-found{background:rgba(255,196,0,.1);}
      .fex-mark{background:rgba(255,196,0,.35);color:inherit;border-radius:2px;}
      .fex-ln-g{flex:none;min-width:42px;padding:0 8px;text-align:right;border-right:1px solid var(--dsw-alias-border-l1);margin-right:8px;color:var(--dsw-alias-label-secondary);opacity:.55;user-select:none;font-variant-numeric:tabular-nums;}
      .fex-ln-c{flex:1;min-width:0;}
      .fex-hex{margin-right:14px;}
      .fex-hex-ascii{color:var(--dsw-alias-label-secondary);}
      .fex-pre{flex:1;overflow:auto;margin:0;padding:10px 12px;font-family:var(--ds-font-family-code);font-size:12px;line-height:19px;white-space:pre-wrap;overflow-wrap:break-word;word-break:break-word;tab-size:4;color:var(--dsw-alias-label-primary);user-select:text;-webkit-font-smoothing:antialiased;font-variant-ligatures:none;}
      .fex-hl-kw{color:#c678dd;}
      .fex-hl-str{color:#98c379;}
      .fex-hl-num{color:#d19a66;}
      .fex-hl-com{color:var(--dsw-alias-label-secondary);font-style:italic;}
      .fex-hl-fn{color:#61afef;}
      .fex-hl-type{color:#56b6c2;}
      .fex-hl-tag{color:#e06c75;}
      .fex-hl-attr{color:#d19a66;}
      .fex-note{padding:10px 12px;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px;}
      .fex-empty{padding:26px 12px;color:var(--dsw-alias-label-secondary);text-align:center;font-size:12.5px;line-height:18px;display:flex;flex-direction:column;align-items:center;gap:10px;}
      .fex-empty svg{width:30px;height:30px;opacity:.45;}
      .fex-btn2{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:7px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);cursor:pointer;font-size:12.5px;line-height:18px;transition:border-color .12s ease,color .12s ease;}
      .fex-btn2:hover{border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-brand-primary);}
      .fex-btn2:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px;}
      .fex-loadmore{display:flex;align-items:center;gap:8px;padding:6px 12px;border-top:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);font-size:11.5px;color:var(--dsw-alias-label-secondary);flex:none;}
      .fex-md{flex:1;overflow:auto;padding:12px 16px;user-select:text;line-height:22px;font-size:13.5px;color:var(--dsw-alias-label-primary);-webkit-font-smoothing:antialiased;}
      .fex-md-p{margin:0 0 10px;}
      .fex-md-h{margin:16px 0 8px;font-weight:600;line-height:1.3;}
      .fex-md-h1{font-size:18px;line-height:26px;border-bottom:1px solid var(--dsw-alias-border-l1);padding-bottom:6px;}
      .fex-md-h2{font-size:15px;line-height:22px;border-bottom:1px solid var(--dsw-alias-border-l1);padding-bottom:4px;}
      .fex-md-h3{font-size:13.5px;}
      .fex-md-h4{font-size:13px;}
      .fex-md-h5{font-size:12.5px;}
      .fex-md-h6{font-size:12px;color:var(--dsw-alias-label-secondary);}
      .fex-md-toc{border:1px solid var(--dsw-alias-border-l1);border-radius:8px;padding:6px 10px;margin-bottom:12px;background:var(--dsw-alias-bg-layer-1);}
      .fex-md-toc-toggle{border:none;background:transparent;color:var(--dsw-alias-label-primary);font-size:12px;cursor:pointer;padding:2px 4px;border-radius:4px;}
      .fex-md-toc-toggle:hover{color:var(--dsw-alias-brand-primary);}
      .fex-md-toc-list{margin:6px 0 0;padding-left:6px;list-style:none;}
      .fex-md-toc-list a{color:var(--dsw-alias-label-secondary);text-decoration:none;font-size:12px;}
      .fex-md-toc-list a:hover{color:var(--dsw-alias-brand-primary);}
      .fex-md-check{margin-right:5px;color:var(--dsw-alias-label-secondary);}
      .fex-md-check.on{color:#55c285;}
      .fex-md-pre-wrap{margin:0 0 12px;}
      .fex-md-codehead{display:flex;align-items:center;justify-content:space-between;padding:2px 12px 0;font-family:var(--ds-font-family-code);font-size:10.5px;line-height:15px;color:var(--dsw-alias-label-secondary);}
      .fex-md-codehead-lang{opacity:.8;}
      .fex-md-copy{flex:none;padding:0 8px;border-radius:6px;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-secondary);font-size:10.5px;line-height:16px;cursor:pointer;}
      .fex-md-copy:hover{color:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);}
      .fex-md-copy.done{color:#55c285;border-color:#55c285;}
      .fex-md-pre{background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;padding:12px;overflow:auto;margin:0;}
      .fex-md-code{font-family:var(--ds-font-family-code);font-size:12px;line-height:19px;font-variant-ligatures:none;white-space:pre;}
      .fex-md-ic{background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:4px;padding:0 4px;font-family:var(--ds-font-family-code);font-size:11.5px;line-height:17px;}
      .fex-md-quote{border-left:3px solid var(--dsw-alias-brand-primary);margin:0 0 12px;padding:2px 12px;color:var(--dsw-alias-label-secondary);}
      .fex-md-list{margin:0 0 12px;padding-left:22px;}
      .fex-md-list li{margin:2px 0;}
      .fex-md-table{border-collapse:collapse;margin:0 0 12px;font-size:12px;line-height:18px;width:100%;}
      .fex-md-table th,.fex-md-table td{border:1px solid var(--dsw-alias-border-l1);padding:4px 8px;text-align:left;}
      .fex-md-table th{background:var(--dsw-alias-bg-layer-2);font-weight:600;}
      .fex-md-hr{border:none;border-top:1px solid var(--dsw-alias-border-l2);margin:12px 0;}
      .fex-md a{color:#4d9fff;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px;}
      .fex-md a:hover{color:#6fb3ff;text-decoration:underline;text-decoration-thickness:1.5px;}
      .fex-md img{max-width:100%;border-radius:6px;}
      .fex-md-toggle{flex:none;padding:1px 8px;border-radius:999px;font-size:10.5px;line-height:15px;cursor:pointer;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);border:1px solid var(--dsw-alias-border-l1);transition:color .12s ease,border-color .12s ease;}
      .fex-md-toggle:hover{color:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);}
      .fex-md-toggle.fex-wrap-on{color:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);}
      .fex-table-wrap{flex:1;overflow:auto;padding:8px 12px;}
      .fex-diff-add{color:#55c285;background:rgba(85,194,133,.1);}
      .fex-diff-del{color:#e06c75;background:rgba(224,108,117,.1);}
      .fex-diff-meta{color:var(--dsw-alias-label-secondary);font-weight:600;}
      .fex-log-error{color:#e06c75;}
      .fex-log-warn{color:#e8a33d;}
      .fex-log-info{color:#61afef;}
      .fex-img-view{flex:1;min-height:0;display:flex;flex-direction:column;}
      .fex-imgbar{display:flex;align-items:center;gap:6px;padding:6px 10px;border-bottom:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);flex:none;}
      .fex-imgbar .fex-ibtn{width:24px;height:24px;}
      .fex-imginfo{font-size:11px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;}
      .fex-img{flex:1;overflow:auto;display:flex;align-items:center;justify-content:center;padding:12px;}
      .fex-img img{max-width:100%;max-height:100%;object-fit:contain;border-radius:6px;transform-origin:center center;}
      .fex-palette{position:absolute;top:10px;left:50%;transform:translateX(-50%);width:min(440px, calc(100% - 24px));z-index:200;border:1px solid var(--dsw-alias-border-l2);border-radius:10px;background:var(--dsw-alias-bg-overlay);box-shadow:0 12px 36px rgba(0,0,0,.3);overflow:hidden;}
      .fex-palette-input{width:100%;height:32px;padding:0 12px;border:none;outline:none;background:transparent;color:var(--dsw-alias-label-primary);font-size:13px;border-bottom:1px solid var(--dsw-alias-border-l1);}
      .fex-palette-list{max-height:300px;overflow:auto;padding:4px;}
      .fex-palette-item{display:flex;align-items:center;gap:8px;padding:5px 8px;border-radius:6px;cursor:pointer;}
      .fex-palette-item.active{background:var(--dsw-alias-bg-layer-2);}
      .fex-palette-name{flex:none;max-width:45%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12.5px;}
      .fex-palette-path{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:var(--ds-font-family-code);font-size:10.5px;color:var(--dsw-alias-label-secondary);opacity:.7;}
      .fex-palette-hint{padding:10px 12px;color:var(--dsw-alias-label-secondary);font-size:12px;text-align:center;}
      .fex-menu-mask{position:fixed;inset:0;z-index:300;}
      .fex-menu{position:fixed;z-index:301;min-width:150px;padding:4px;border-radius:8px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-overlay);box-shadow:0 8px 28px rgba(0,0,0,.25);}
      .fex-menu-item{display:flex;align-items:center;gap:8px;width:100%;padding:5px 10px;border:none;border-radius:6px;background:transparent;color:var(--dsw-alias-label-primary);font-size:12px;line-height:18px;cursor:pointer;text-align:left;}
      .fex-menu-item:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);}
      .fex-menu-item svg{color:var(--dsw-alias-label-secondary);}
      .fex-slide-in{animation:fexSlideIn .32s cubic-bezier(.25,.8,.3,1) both;}
      .fex-slide-out{animation:fexSlideOut .3s cubic-bezier(.4,0,1,1) both;}
      .fex-slide-in-left{animation:fexSlideInLeft .3s cubic-bezier(.25,.8,.3,1) both;}
      .fex-tabs-in{animation:fexTabsIn .28s ease-out both;}
      @keyframes fexSlideIn{from{transform:translateX(36px);opacity:.25;}to{transform:translateX(0);opacity:1;}}
      @keyframes fexSlideOut{from{transform:translateX(0);opacity:1;}to{transform:translateX(36px);opacity:.25;}}
      @keyframes fexSlideInLeft{from{transform:translateX(-24px);opacity:.25;}to{transform:translateX(0);opacity:1;}}
      @keyframes fexTabIn{from{transform:translateX(14px);opacity:0;}to{transform:translateX(0);opacity:1;}}
      @keyframes fexTabsIn{from{transform:translateY(-5px);opacity:0;}to{transform:translateY(0);opacity:1;}}
      @media (prefers-reduced-motion: reduce){.fex-slide-in,.fex-slide-out,.fex-slide-in-left,.fex-tabs-in,.fex-tab{animation:none;}}
      .fex-wrap-word{white-space:pre-wrap;overflow-wrap:break-word;word-break:break-word;}
      .fex-wrap-any{white-space:pre-wrap;overflow-wrap:anywhere;word-break:normal;}
      .fex-wrap-off{white-space:pre;overflow-wrap:normal;word-break:normal;}
      .fex-lines::-webkit-scrollbar,.fex-pre::-webkit-scrollbar,.fex-md::-webkit-scrollbar,.fex-table-wrap::-webkit-scrollbar,.fex-img::-webkit-scrollbar,.fex-tabs::-webkit-scrollbar,.fex-crumbs::-webkit-scrollbar,.fex-palette-list::-webkit-scrollbar{width:8px;height:8px;}
      .fex-lines::-webkit-scrollbar-thumb,.fex-pre::-webkit-scrollbar-thumb,.fex-md::-webkit-scrollbar-thumb,.fex-table-wrap::-webkit-scrollbar-thumb,.fex-img::-webkit-scrollbar-thumb,.fex-tabs::-webkit-scrollbar-thumb,.fex-crumbs::-webkit-scrollbar-thumb,.fex-palette-list::-webkit-scrollbar-thumb{background:var(--dsw-alias-border-l2);border-radius:4px;}
      .fex-lines::-webkit-scrollbar-thumb:hover,.fex-pre::-webkit-scrollbar-thumb:hover,.fex-md::-webkit-scrollbar-thumb:hover,.fex-table-wrap::-webkit-scrollbar-thumb:hover,.fex-img::-webkit-scrollbar-thumb:hover,.fex-tabs::-webkit-scrollbar-thumb:hover,.fex-crumbs::-webkit-scrollbar-thumb:hover,.fex-palette-list::-webkit-scrollbar-thumb:hover{background:var(--dsw-alias-label-secondary);}
      .fex-lines::-webkit-scrollbar-track,.fex-pre::-webkit-scrollbar-track,.fex-md::-webkit-scrollbar-track,.fex-table-wrap::-webkit-scrollbar-track,.fex-img::-webkit-scrollbar-track,.fex-tabs::-webkit-scrollbar-track,.fex-crumbs::-webkit-scrollbar-track,.fex-palette-list::-webkit-scrollbar-track{background:transparent;}
      .fex-md-toggle:disabled{opacity:.45;cursor:not-allowed;}
      .fex-notice{position:absolute;left:10px;right:10px;bottom:10px;z-index:250;padding:7px 12px;border-radius:8px;font-size:12px;line-height:18px;background:var(--dsw-alias-bg-overlay);border:1px solid var(--dsw-alias-border-l2);box-shadow:0 8px 24px rgba(0,0,0,.25);color:var(--dsw-alias-label-primary);}
      .fex-notice.err{color:#e06c75;border-color:#e06c75;}
    `))

    // ---- session header toggle ----
    ctx.effect(() => slots.inject('conversation.session.header.actions', () =>
      slots.register(
        { name: 'conversation.session.header.actions', id: 'file-explorer-toggle', order: 15, label: '文件' },
        () => {
          const [open, setOpenState] = React.useState(store.open)
          React.useEffect(() => {
            const fn = () => setOpenState(store.open)
            store.listeners.add(fn)
            return () => store.listeners.delete(fn)
          }, [])
          const onClick = () => {
            const next = !store.open
            setOpen(next)
            if (layout) {
              if (next) layout.openDetails()
              else layout.closeDetails()
            }
          }
          return React.createElement('button', {
            className: 'fex-ibtn fex-toggle' + (open ? ' active' : ''),
            type: 'button',
            onClick,
            title: open ? '关闭文件浏览器' : '打开文件浏览器',
          }, icon(open ? 'folderOpen' : 'folder'))
        },
      ),
    ))

    // ---- the FileLens panel (details column, real column layout) ----
    ctx.effect(() => slots.inject('details', () =>
      slots.register({ name: 'details', priority: -1 }, () => {
        const KEY = 'dsh-filex-state'
        const [root, setRoot] = React.useState(null)
        const [rootState, setRootState] = React.useState('loading')
        const [dirs, setDirs] = React.useState({})
        const [expanded, setExpanded] = React.useState({})
        const [showHidden, setShowHidden] = React.useState(false)
        const [query, setQuery] = React.useState('')
        const [grepMode, setGrepMode] = React.useState(false)
        const [searching, setSearching] = React.useState(false)
        const [results, setResults] = React.useState(null)
        const [tabs, setTabs] = React.useState([])
        const [active, setActive] = React.useState(-1)
        const [leaving, setLeaving] = React.useState(false)
        const [cursorPath, setCursorPath] = React.useState(null)
        const [menu, setMenu] = React.useState(null)
        const [palette, setPalette] = React.useState(null)
        const [dragTabIdx, setDragTabIdx] = React.useState(null)
        const [findOpen, setFindOpen] = React.useState(false)
        const [findQ, setFindQ] = React.useState('')
        const [findIdx, setFindIdx] = React.useState(-1)
        const [findMatches, setFindMatches] = React.useState([])
        const [imgSize, setImgSize] = React.useState(null)
        const [jumpTick, setJumpTick] = React.useState(0)
        const [restored, setRestored] = React.useState(false)
        const [seq, setSeq] = React.useState(0)
        const [notice, setNotice] = React.useState(null)
        const noticeTimer = React.useRef(null)
        // Transient feedback for save/load/other failures (M2): failures are
        // never silent, successes confirm. Auto-dismisses after 3.5s.
        const showNotice = (text, kind) => {
          if (noticeTimer.current) noticeTimer.current()
          setNotice({ text, kind: kind || 'ok' })
          noticeTimer.current = timer
            ? timer.timeout(() => { setNotice(null); noticeTimer.current = null }, 3500)
            : null
        }
        React.useEffect(() => () => { if (noticeTimer.current) noticeTimer.current() }, [])

        React.useEffect(() => {
          let alive = true
          callRemote('file.root', {}).then((res) => {
            if (!alive) return
            const r = res && typeof res.root === 'string' ? res.root : null
            setRoot(r)
            setRootState(r ? 'ready' : 'none')
          }).catch(() => { if (alive) setRootState('none') })
          return () => { alive = false }
        }, [])

        const applyRestore = (data) => {
          if (Array.isArray(data.expanded)) {
            const ex = {}
            data.expanded.forEach((p) => { if (typeof p === 'string') ex[p] = true })
            setExpanded((prev) => ({ ...prev, ...ex }))
          }
          if (Array.isArray(data.tabs) && data.tabs.length) {
            const ts = data.tabs
              .filter((t) => t && typeof t.path === 'string')
              .map((t) => ({
                path: t.path,
                name: t.name || basenameOf(t.path),
                type: detectType(t.name || basenameOf(t.path)),
                fromLink: false,
                gotoLine: null,
                content: { state: 'loading', id: Math.random() },
                view: 'pretty',
                wrap: 'word',
                img: { scale: 1, rotate: 0 },
                editing: false,
                editText: null,
              }))
            if (ts.length) {
              setTabs(ts)
              const act = typeof data.active === 'number' && data.active >= 0 && data.active < ts.length ? data.active : -1
              setActive(act)
              const target = ts[Math.max(act, 0)]
              if (target) fetchContent(target, false)
            }
          }
        }

        React.useEffect(() => {
          if (restored || rootState !== 'ready') return
          setRestored(true)
          let data = null
          try {
            const raw = localStorage.getItem(KEY)
            if (raw) data = JSON.parse(raw)
          } catch (err) { data = null }
          if (!data) return
          // The panel always opens on the CURRENT workspace root reported by
          // file.root; a stored root from a previous session must not hijack
          // it. Only expanded dirs and tabs are restored.
          applyRestore(data)
        }, [rootState, root])

        // state persistence (debounced)
        React.useEffect(() => {
          const save = () => {
            try {
              localStorage.setItem(KEY, JSON.stringify({
                root,
                expanded: Object.keys(expanded).filter((k) => expanded[k]),
                tabs: tabs.map((t) => ({ path: t.path, name: t.name })),
                active,
              }))
            } catch (err) { /* ignore */ }
          }
          if (timer) {
            const d = timer.debounce(save, 500)
            d()
            return () => { d.dispose() }
          }
          save()
          return undefined
        }, [root, tabs, active, expanded])

        // root change: full panel reset (tabs, find, palette, ...)
        React.useEffect(() => {
          if (!root) return
          setTabs([])
          setActive(-1)
          setLeaving(false)
          setCursorPath(null)
          setMenu(null)
          setPalette(null)
          setFindOpen(false)
          setFindQ('')
          setFindMatches([])
          setFindIdx(-1)
          setImgSize(null)
        }, [root])

        // root change OR manual refresh (seq): (re)load the root listing.
        // A refresh must NOT close the user's open tabs.
        React.useEffect(() => {
          if (!root) return
          // self-heal: a root chosen while file.root had reported none must
          // leave the '未选择目录' view
          setRootState((s) => (s === 'none' ? 'ready' : s))
          setDirs({ [root]: { state: 'loading' } })
          setExpanded((e) => ({ ...e, [root]: true }))
          callRemote('file.list', { path: root, root }).then((res) => {
            setDirs((d) => ({
              ...d,
              [root]: res && res.ok
                ? { state: 'ready', entries: res.entries }
                : { state: 'error', error: (res && (res.error || res.message)) || 'list failed' },
            }))
          }).catch((err) => {
            setDirs((d) => ({
              ...d,
              [root]: { state: 'error', error: (err && err.message) || String(err) },
            }))
          })
        }, [root, seq])

        // back-to-tree exit animation
        React.useEffect(() => {
          if (!leaving) return
          if (!timer) { setActive(-1); setLeaving(false); return }
          const d = timer.timeout(() => { setActive(-1); setLeaving(false) }, 360)
          return () => { d() }
        }, [leaving])

        // recursive name/content search (debounced)
        React.useEffect(() => {
          const q = query.trim()
          if (!root || !q) { setResults(null); setSearching(false); return }
          let alive = true
          setSearching(true)
          const rpc = grepMode ? 'file.grep' : 'file.search'
          // family lets the host abort the previous in-flight walk for this
          // root+mode, so keystrokes never queue up heavy scans (M3)
          const family = (grepMode ? 'grep:' : 'search:') + root
          const run = () => {
            callRemote(rpc, { root, query: q, family }).then((res) => {
              if (!alive) return
              setResults(res && res.ok ? res.results : [])
              setSearching(false)
            }).catch(() => { if (alive) { setResults([]); setSearching(false) } })
          }
          if (timer) {
            const d = timer.debounce(run, 250)
            d()
            return () => { alive = false; d.dispose() }
          }
          run()
          return () => { alive = false }
        }, [root, query, grepMode])

        // Ctrl+P quick-open search
        React.useEffect(() => {
          if (!palette || !root) return
          const q = palette.q.trim()
          if (!q) { setPalette({ ...palette, results: [], idx: 0 }); return }
          let alive = true
          callRemote('file.search', { root, query: q, family: 'palette:' + root }).then((res) => {
            if (!alive) return
            setPalette((p) => (p && p.q === palette.q ? { ...p, results: res && res.ok ? res.results.slice(0, 50) : [], idx: 0 } : p))
          }).catch(() => {})
          return () => { alive = false }
        }, [palette ? palette.q : null, root])

        React.useEffect(() => {
          if (root && store.pendingFile) {
            const p = store.pendingFile
            store.pendingFile = null
            openFile(p, basenameOf(p), true)
          }
          const fn = (path) => openFile(path, basenameOf(path), true)
          store.fileListeners.add(fn)
          return () => { store.fileListeners.delete(fn) }
        }, [root])

        // find: compute matches
        React.useEffect(() => {
          const tab = active >= 0 && active < tabs.length ? tabs[active] : null
          const text = tab && tab.content && tab.content.state === 'ready' && tab.content.kind !== 'hex' ? tab.content.text : ''
          const q = findQ.toLowerCase()
          if (!findOpen || !q || typeof text !== 'string' || !text) {
            setFindMatches([])
            setFindIdx(-1)
            return
          }
          const ls = text.split('\n')
          const ms = []
          ls.forEach((l, li) => {
            const low = l.toLowerCase()
            let ci = low.indexOf(q)
            while (ci !== -1) {
              ms.push({ line: li, col: ci, len: q.length })
              ci = low.indexOf(q, ci + q.length)
            }
          })
          setFindMatches(ms)
          setFindIdx((prev) => (ms.length ? (prev < 0 ? 0 : Math.min(prev, ms.length - 1)) : -1))
        }, [findOpen, findQ, active, tabs])

        // find: scroll to current match
        React.useEffect(() => {
          if (!findOpen || !activeTab) return
          const m = findMatches[findIdx]
          if (!m) return
          const cont = document.querySelector('[data-fex-path="' + escAttr(activeTab.path) + '"]')
          const row = cont && cont.querySelector('[data-ln="' + m.line + '"]')
          if (row && row.scrollIntoView) row.scrollIntoView({ block: 'center' })
        }, [findIdx, findOpen])

        // grep result line jump
        React.useEffect(() => {
          const tab = activeTab
          if (!tab || !tab.gotoLine || !tab.content || tab.content.state !== 'ready') return
          const cont = document.querySelector('[data-fex-path="' + tab.path + '"]')
          const row = cont && cont.querySelector('[data-ln="' + (tab.gotoLine - 1) + '"]')
          if (row) {
            row.scrollIntoView({ block: 'center' })
            setTabs((ts) => ts.map((t) => (t.path === tab.path ? Object.assign({}, t, { gotoLine: null }) : t)))
          } else if (cont && typeof cont.scrollTop === 'number') {
            cont.scrollTop = Math.max(0, (tab.gotoLine - 1) * LINE_H - 100)
            setJumpTick((t) => t + 1)
          } else {
            setTabs((ts) => ts.map((t) => (t.path === tab.path ? Object.assign({}, t, { gotoLine: null }) : t)))
          }
        }, [active, tabs, jumpTick])

        const toggleDir = (path) => {
          const next = !expanded[path]
          setExpanded((e) => ({ ...e, [path]: next }))
          if (next && !dirs[path]) {
            setDirs((d) => ({ ...d, [path]: { state: 'loading' } }))
            callRemote('file.list', { path, root }).then((res) => {
              setDirs((d) => ({
                ...d,
                [path]: res && res.ok
                  ? { state: 'ready', entries: res.entries }
                  : { state: 'error', error: (res && (res.error || res.message)) || 'list failed' },
              }))
            }).catch((err) => {
              setDirs((d) => ({
                ...d,
                [path]: { state: 'error', error: (err && err.message) || String(err) },
              }))
            })
          }
        }

        const fetchContent = (tab, fromLink) => {
          const rpc = tab.type === 'image' ? 'file.readImage' : 'file.read'
          const args = fromLink ? { path: tab.path } : { path: tab.path, root }
          callRemote(rpc, args).then((res) => {
            setTabs((ts) => ts.map((t) => {
              if (t.path !== tab.path || !t.content || t.content.id !== tab.content.id) return t
              if (res && res.ok) {
                return Object.assign({}, t, { content: Object.assign({ state: 'ready', id: t.content.id }, res, { offset: res.text ? res.text.length : 0, eof: !res.truncated }) })
              }
              if (res && res.kind === 'binary') {
                callRemote('file.readHex', args).then((hr) => {
                  setTabs((ts2) => ts2.map((t2) =>
                    t2.path === tab.path && t2.content && t2.content.id === tab.content.id
                      ? Object.assign({}, t2, { content: hr && hr.ok
                          ? { state: 'ready', kind: 'hex', id: t2.content.id, bytes: hr.bytes, size: hr.size, hexTruncated: !!hr.truncated }
                          : { state: 'error', kind: hr && hr.kind || 'error', message: hr && hr.message } })
                      : t2,
                  ))
                })
                return t
              }
              return Object.assign({}, t, { content: { state: 'error', kind: res && res.kind, message: res && (res.message || res.error) } })
            }))
          }).catch((err) => {
            setTabs((ts) => ts.map((t) =>
              t.path === tab.path && t.content && t.content.id === tab.content.id
                ? Object.assign({}, t, { content: { state: 'error', kind: 'error', message: (err && err.message) || String(err) } })
                : t,
            ))
          })
        }

        const openFile = (path, name, fromLink, line) => {
          setLeaving(false)
          setImgSize(null)
          setPalette(null)
          const idx = tabs.findIndex((t) => t.path === path)
          if (idx >= 0) { setActive(idx); return }
          const typ = detectType(name)
          const id = Math.random()
          const tab = { path, name, type: typ, fromLink: !!fromLink, gotoLine: typeof line === 'number' ? line : null, content: { state: 'loading', id }, view: 'pretty', wrap: 'word', img: { scale: 1, rotate: 0 }, editing: false, editText: null }
          setTabs((ts) => [...ts, tab])
          setActive(tabs.length)
          fetchContent(tab, fromLink)
        }

        const loadMore = (tab) => {
          if (!tab.content || tab.content.eof) return
          const off = tab.content.offset || 0
          const args = tab.fromLink ? { path: tab.path, offset: off } : { path: tab.path, root, offset: off }
          callRemote('file.readMore', args).then((res) => {
            setTabs((ts) => ts.map((t) => {
              if (t.path !== tab.path || !t.content) return t
              if (res && res.ok) {
                return Object.assign({}, t, { content: Object.assign({}, t.content, { text: t.content.text + res.text, offset: res.newOffset, eof: res.eof }) })
              }
              return t
            }))
            if (res && !res.ok) {
              showNotice('加载更多失败：' + ((res.message || res.error) || '未知错误'), 'error')
            }
          }).catch((err) => {
            showNotice('加载更多失败：' + ((err && err.message) || String(err)), 'error')
          })
        }

        const saveEdit = (tab) => {
          if (typeof tab.editText !== 'string') return
          // Writes ALWAYS carry the explicit root + the version observed at
          // read time: a file changed elsewhere since then is rejected by the
          // host with kind 'stale' instead of being silently overwritten (M1/M2).
          const args = {
            path: tab.path,
            root,
            text: tab.editText,
            expectedVersion: tab.content && tab.content.version,
          }
          callRemote('file.write', args).then((res) => {
            if (res && res.ok) {
              setTabs((ts) => ts.map((t) => t.path === tab.path
                ? Object.assign({}, t, {
                    editing: false,
                    editText: null,
                    content: Object.assign({}, t.content, { text: tab.editText, offset: tab.editText.length, eof: true, truncated: false, version: res.version }),
                  })
                : t))
              showNotice('已保存：' + tab.name, 'ok')
            } else if (res && res.kind === 'stale') {
              showNotice('保存被拒绝：文件已被其他程序修改，请重新打开后再编辑。', 'error')
            } else {
              showNotice('保存失败：' + ((res && (res.message || res.error)) || '未知错误'), 'error')
            }
          }).catch((err) => {
            showNotice('保存失败：' + ((err && err.message) || String(err)), 'error')
          })
        }

        const reorderTabs = (from, to) => {
          if (from === to || from === null) return
          setTabs((ts) => {
            const next = ts.slice()
            const [moved] = next.splice(from, 1)
            next.splice(to, 0, moved)
            return next
          })
          setActive((cur) => {
            if (cur === from) return to
            if (cur === to) return from
            if (from < cur && to >= cur) return cur - 1
            if (from > cur && to <= cur) return cur + 1
            return cur
          })
          setDragTabIdx(null)
        }

        const closeTab = (idx) => {
          const next = tabs.filter((_, i) => i !== idx)
          setTabs(next)
          if (active === idx) {
            if (next.length === 0) setActive(-1)
            else setActive(Math.min(idx, next.length - 1))
          } else if (active > idx) {
            setActive(active - 1)
          }
        }

        const switchRoot = async () => {
          if (!workspaces) return
          try {
            const picked = await workspaces.pickDirectory()
            if (picked) {
              setRoot(picked)
              // the '未选择目录' view must leave once a root exists
              setRootState('ready')
              if (picked !== root) setSeq((s) => s + 1)
            }
          } catch (err) {
            showNotice('选择目录失败：' + ((err && err.message) || String(err)), 'error')
          }
        }

        const closePanel = () => {
          setOpen(false)
          if (layout) layout.closeDetails()
        }

        const fmt = (n) => {
          if (n === null || n === undefined) return ''
          if (n < 1024) return n + ' B'
          if (n < 1048576) return (n / 1024).toFixed(1) + ' KB'
          return (n / 1048576).toFixed(1) + ' MB'
        }

        const filtered = (entries) => {
          let list = showHidden ? entries : entries.filter((e) => !e.name.startsWith('.'))
          const q = query.trim().toLowerCase()
          if (q) list = list.filter((e) => e.name.toLowerCase().includes(q))
          return list
        }

        const fileIcon = (name, isDir, open) => {
          if (isDir) return icon(open ? 'folderOpen' : 'folder')
          const c = extColor(name)
          return React.createElement('span', { style: c ? { color: c } : null }, icon('file'))
        }

        const activeTab = active >= 0 && active < tabs.length ? tabs[active] : null
        const currentMatch = findMatches.length && findIdx >= 0 && findIdx < findMatches.length ? findMatches[findIdx] : null

        // keyboard navigation over flattened visible rows
        const flattenVisible = () => {
          const out = []
          const walk = (path) => {
            const info = dirs[path]
            if (info && info.state === 'ready' && expanded[path]) {
              filtered(info.entries).forEach((e) => {
                out.push({ path: e.path, name: e.name, isDir: e.type === 'directory' })
                if (e.type === 'directory' && expanded[e.path]) walk(e.path)
              })
            }
          }
          if (root && expanded[root]) walk(root)
          return out
        }
        const flatList = () => query.trim()
          ? (results || []).map((r) => ({ path: (grepMode ? r.path + ':' + r.line : r.path), name: r.name, isDir: false, line: grepMode ? r.line : undefined }))
          : flattenVisible()
        const moveCursor = (delta) => {
          const list = flatList()
          if (!list.length) return
          let idx = list.findIndex((x) => x.path === cursorPath)
          if (idx === -1) idx = 0
          const ni = Math.max(0, Math.min(list.length - 1, idx + delta))
          setCursorPath(list[ni].path)
        }
        const openCursor = () => {
          const it = flatList().find((x) => x.path === cursorPath)
          if (!it) return
          if (it.isDir) toggleDir(it.path)
          else openFile(it.path, it.name, false, it.line)
        }
        const arrowHorizontal = (right) => {
          const it = flatList().find((x) => x.path === cursorPath)
          if (!it) return
          if (right && it.isDir) toggleDir(it.path)
          else if (!right && it.isDir) setExpanded((e) => ({ ...e, [it.path]: false }))
          else if (!right) setCursorPath(parentOf(it.path))
        }

        React.useEffect(() => {
          const fn = (e) => {
            if (e.target && e.target.tagName === 'INPUT') return false
            const k = e.key.toLowerCase()
            if (e.ctrlKey && k === 'f') { setFindOpen(true); setFindIdx(0); return true }
            if (e.ctrlKey && k === 'p') { setPalette({ q: '', results: [], idx: 0 }); return true }
            if (e.ctrlKey && k === 't') { if (tabs.length) { setLeaving(false); setActive((active + 1) % tabs.length) } return true }
            if (e.ctrlKey && e.shiftKey && k === 't') { if (tabs.length) { setLeaving(false); setActive((active - 1 + tabs.length) % tabs.length) } return true }
            if (e.ctrlKey && k === 's') {
              const t = active >= 0 && active < tabs.length ? tabs[active] : null
              if (t && t.editing) { e.preventDefault(); saveEdit(t); return true }
              return false
            }
            if (e.ctrlKey && k === 'w') {
              if (active >= 0) { e.preventDefault(); closeTab(active); return true }
              return false
            }
            if (e.key === 'Escape') {
              if (palette) { setPalette(null); return true }
              if (menu) { setMenu(null); return true }
              if (findOpen) { setFindOpen(false); return true }
              if (active >= 0) { setLeaving(true); return true }
              if (query) { setQuery(''); return true }
              return false
            }
            if (active >= 0) return false
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { moveCursor(e.key === 'ArrowDown' ? 1 : -1); return true }
            if (e.key === 'ArrowRight') { arrowHorizontal(true); return true }
            if (e.key === 'ArrowLeft') { arrowHorizontal(false); return true }
            if (e.key === 'Enter') { openCursor(); return true }
            return false
          }
          store.keyListeners.add(fn)
          return () => { store.keyListeners.delete(fn) }
        }, [cursorPath, query, grepMode, results, tabs, active, findOpen, palette, menu, leaving, dirs, expanded, root, showHidden])

        const openMenu = (e, path, name, isDir) => {
          e.preventDefault()
          e.stopPropagation()
          setMenu({ x: e.clientX, y: e.clientY, path, name, isDir })
        }
        const menuItem = (label, ico, onClick) => React.createElement('button', {
          className: 'fex-menu-item', type: 'button',
          onClick: () => { onClick(); setMenu(null) },
        }, icon(ico), label)

        const renderRows = (path, depth) => {
          const info = dirs[path]
          const rows = []
          if (info && info.state === 'ready') {
            // show every entry — no per-directory cap
            filtered(info.entries).forEach((e) => {
              const isDir = e.type === 'directory'
              const eOpen = isDir && !!expanded[e.path]
              rows.push(React.createElement(
                'div',
                {
                  key: e.path,
                  className: 'fex-row'
                    + (activeTab && activeTab.path === e.path ? ' selected' : '')
                    + (cursorPath === e.path ? ' cursor' : ''),
                  style: { paddingLeft: 6 + depth * 16 },
                  title: e.path,
                  onClick: () => (isDir ? toggleDir(e.path) : openFile(e.path, e.name, false)),
                  onContextMenu: (ev) => openMenu(ev, e.path, e.name, isDir),
                },
                React.createElement('span', { className: 'fex-caret' + (eOpen ? ' open' : '') }, isDir ? icon('caret') : null),
                React.createElement('span', { className: 'fex-ico' + (isDir ? ' dir' : '') }, fileIcon(e.name, isDir, eOpen)),
                React.createElement('span', { className: 'fex-name' }, e.name),
                React.createElement('span', { className: 'fex-size' }, fmt(e.size)),
              ))
              if (isDir && eOpen) rows.push(...renderRows(e.path, depth + 1))
            })
          } else if (info && info.state === 'loading') {
            rows.push(React.createElement(
              'div',
              { key: '__loading', className: 'fex-note', style: { paddingLeft: 8 + depth * 16 } },
              '加载中…',
            ))
          } else if (info && info.state === 'error') {
            rows.push(React.createElement(
              'div',
              { key: '__error', className: 'fex-note', style: { paddingLeft: 8 + depth * 16 } },
              '加载失败: ' + info.error,
            ))
          }
          return rows
        }

        let treeContent
        if (rootState === 'loading') {
          treeContent = React.createElement('div', { className: 'fex-empty' }, icon('folderOpen'), React.createElement('span', null, '正在确定根目录…'))
        } else if (rootState === 'none') {
          treeContent = React.createElement('div', { className: 'fex-empty' },
            icon('folderOpen'),
            React.createElement('span', null, '未选择目录'),
            React.createElement('button', { className: 'fex-btn2', type: 'button', onClick: switchRoot }, icon('folderPlus'), '选择目录'),
          )
        } else if (query.trim()) {
          if (searching) {
            treeContent = React.createElement('div', { className: 'fex-empty' }, icon('search'), React.createElement('span', null, '搜索中…'))
          } else if (results && results.length) {
            treeContent = React.createElement(React.Fragment, null,
              results.map((r) => grepMode
                ? React.createElement(
                    'div',
                    {
                      key: r.path + ':' + r.line,
                      className: 'fex-row' + (cursorPath === r.path + ':' + r.line ? ' cursor' : ''),
                      title: r.path,
                      onClick: () => openFile(r.path, r.name, false, r.line),
                      onContextMenu: (ev) => openMenu(ev, r.path, r.name, false),
                    },
                    React.createElement('span', { className: 'fex-ico' }, fileIcon(r.name, false, false)),
                    React.createElement('span', { className: 'fex-name' }, r.name),
                    React.createElement('span', { className: 'fex-grep-line' }, ':' + r.line),
                    React.createElement('span', { className: 'fex-grep-snippet' }, r.text),
                  )
                : React.createElement(
                    'div',
                    {
                      key: r.path,
                      className: 'fex-row' + (cursorPath === r.path ? ' cursor' : ''),
                      style: { paddingLeft: 6 },
                      title: r.path,
                      onClick: () => openFile(r.path, r.name, false),
                      onContextMenu: (ev) => openMenu(ev, r.path, r.name, false),
                    },
                    React.createElement('span', { className: 'fex-ico' }, fileIcon(r.name, false, false)),
                    React.createElement('span', { className: 'fex-name' }, r.name),
                  ),
              ),
              results.length >= 300
                ? React.createElement('div', { key: '__cap', className: 'fex-note' }, '结果已达上限（300），请缩小关键词')
                : null,
            )
          } else {
            treeContent = React.createElement('div', { className: 'fex-empty' }, icon('search'), React.createElement('span', null, '无匹配' + (grepMode ? '内容' : '文件')))
          }
        } else {
          const rootOpen = !!expanded[root]
          treeContent = React.createElement(
            React.Fragment,
            null,
            React.createElement(
              'div',
              { className: 'fex-row', style: { paddingLeft: 6 }, title: root, onClick: () => toggleDir(root) },
              React.createElement('span', { className: 'fex-caret' + (rootOpen ? ' open' : '') }, icon('caret')),
              React.createElement('span', { className: 'fex-ico dir' }, icon(rootOpen ? 'folderOpen' : 'folder')),
              React.createElement('span', { className: 'fex-name' }, root),
            ),
            rootOpen ? renderRows(root, 1) : null,
          )
        }

        let headEl
        let bodyEl
        if (active < 0) {
          const crumbs = root ? crumbSegments(root) : []
          headEl = React.createElement(
            'div',
            { className: 'fex-head' },
            React.createElement('span', { className: 'fex-title' }, icon('folder'), '文件浏览器'),
            React.createElement('button', {
              className: 'fex-searchmode' + (grepMode ? ' on' : ''), type: 'button',
              title: '搜索范围：' + (grepMode ? '文件内容' : '文件名') + '（点击切换）',
              onClick: () => { setGrepMode((m) => !m); setResults(null) },
            }, grepMode ? '内容' : '文件名'),
            React.createElement('input', {
              className: 'fex-search',
              type: 'text',
              placeholder: root || '未选择目录',
              value: query,
              onChange: (e) => setQuery(e.target.value),
              onKeyDown: (e) => { if (e.key === 'Escape') setQuery('') },
              spellCheck: false,
            }),
            React.createElement('div', { className: 'fex-actions' },
              React.createElement('button', { className: 'fex-ibtn', type: 'button', title: '切换目录', onClick: switchRoot }, icon('folderPlus')),
              React.createElement('button', { className: 'fex-ibtn', type: 'button', title: '刷新', onClick: () => setSeq((s) => s + 1) }, icon('refresh')),
              React.createElement('button', { className: 'fex-ibtn', type: 'button', title: showHidden ? '隐藏点开头条目' : '显示点开头条目', onClick: () => setShowHidden((h) => !h) }, icon(showHidden ? 'eyeOff' : 'eye')),
              React.createElement('button', { className: 'fex-ibtn', type: 'button', title: '关闭', onClick: closePanel }, icon('x')),
            ),
          )
          const crumbEl = React.createElement(
            'div',
            { className: 'fex-crumbs' },
            crumbs.map((c, i) => React.createElement(React.Fragment, { key: i },
              i > 0 ? React.createElement('span', { className: 'fex-crumb-sep' }, '›') : null,
              React.createElement('button', {
                className: 'fex-crumb' + (i === crumbs.length - 1 ? ' current' : ''),
                type: 'button',
                onClick: i < crumbs.length - 1 ? () => { setRoot(c.path); setSeq((s) => s + 1) } : undefined,
              }, c.label),
            )),
          )
          bodyEl = React.createElement(React.Fragment, null,
            crumbEl,
            React.createElement('div', { className: 'fex-tree fex-slide-in-left' }, treeContent),
          )
        } else {
          const tab = activeTab
          const wrapCls = tab.wrap === 'word' ? 'fex-wrap-word' : tab.wrap === 'any' ? 'fex-wrap-any' : 'fex-wrap-off'
          const tabStrip = React.createElement('div', { className: 'fex-tabs fex-tabs-in' },
            tabs.map((t, i) => React.createElement('div', {
              key: t.path,
              className: 'fex-tab' + (i === active ? ' active' : '') + (dragTabIdx === i ? ' dragging' : ''),
              onClick: () => { setLeaving(false); setActive(i) },
              onContextMenu: (ev) => openMenu(ev, t.path, t.name, false),
              draggable: true,
              onDragStart: (e) => { setDragTabIdx(i); try { e.dataTransfer.setData('text/plain', String(i)); e.dataTransfer.effectAllowed = 'move' } catch (err) { /* ignore */ } },
              onDragOver: (e) => e.preventDefault(),
              onDrop: (e) => { e.preventDefault(); reorderTabs(dragTabIdx, i) },
              onDragEnd: () => setDragTabIdx(null),
              title: t.path,
            },
              React.createElement('span', { className: 'fex-tab-name' }, t.name),
              React.createElement('button', {
                className: 'fex-tab-x', type: 'button',
                onClick: (e) => { e.stopPropagation(); closeTab(i) },
              }, icon('x')),
            )),
          )
          const headChildren = [
            React.createElement('button', {
              key: 'b', className: 'fex-ibtn', type: 'button', title: '返回目录',
              onClick: () => setLeaving(true),
            }, icon('back')),
            React.createElement('span', { key: 'i', className: 'fex-ico' }, fileIcon(tab.name, false, false)),
            React.createElement('span', { key: 'n', className: 'fex-preview-name' }, tab.name),
          ]
          const content = tab.content
          if (content && content.state === 'ready' && content.size !== null && content.size !== undefined) {
            headChildren.push(React.createElement('span', { key: 's', className: 'fex-badge' }, fmt(content.size)))
          }
          if (content && content.state === 'ready' && content.kind !== 'hex' && content.truncated && !tab.editing) {
            headChildren.push(React.createElement('span', { key: 't', className: 'fex-badge warn' }, '已截断 ' + PREVIEW_KB + 'KB'))
          }
          const wrapable = tab.type === 'code' || tab.type === 'json' || tab.type === 'text' || tab.type === 'diff' || tab.type === 'log' || tab.type === 'markdown'
          if (tab.editing) {
            headChildren.push(React.createElement('button', {
              key: 'sv', className: 'fex-md-toggle fex-wrap-on', type: 'button', title: '保存修改 (Ctrl+S)',
              onClick: () => saveEdit(tab),
            }, '保存'))
            headChildren.push(React.createElement('button', {
              key: 'cc', className: 'fex-md-toggle', type: 'button',
              onClick: () => setTabs((ts) => ts.map((t, i) => i === active ? Object.assign({}, t, { editing: false, editText: null }) : t)),
            }, '取消'))
          } else if (content && content.state === 'ready' && content.kind !== 'hex' && wrapable) {
            // B1: editing a truncated / partially-loaded file would silently
            // overwrite the rest of the file on save — block the edit instead.
            const notFullyLoaded = content.truncated || (content.offset > 0 && !content.eof)
            headChildren.push(React.createElement('button', {
              key: 'e', className: 'fex-md-toggle', type: 'button',
              disabled: notFullyLoaded,
              title: notFullyLoaded
                ? '文件未完整加载，编辑并保存会截断文件 —— 请先「加载更多」至完整后再编辑'
                : '编辑文件',
              onClick: notFullyLoaded ? undefined : () => setTabs((ts) => ts.map((t, i) => i === active ? Object.assign({}, t, { editing: true, editText: t.content && t.content.text || '' }) : t)),
            }, icon('edit')))
            headChildren.push(React.createElement('button', {
              key: 'w', className: 'fex-md-toggle' + (tab.wrap !== 'off' ? ' fex-wrap-on' : ''), type: 'button',
              title: '换行：智能折行 → 强制折行 → 原样',
              onClick: () => setTabs((ts) => ts.map((t, i) => i === active ? Object.assign({}, t, { wrap: t.wrap === 'word' ? 'any' : t.wrap === 'any' ? 'off' : 'word' }) : t)),
            }, tab.wrap === 'word' ? '强制' : tab.wrap === 'any' ? '原样' : '折行'))
            headChildren.push(React.createElement('button', {
              key: 'v', className: 'fex-md-toggle', type: 'button',
              onClick: () => setTabs((ts) => ts.map((t, i) => i === active ? Object.assign({}, t, { view: t.view === 'pretty' ? 'raw' : 'pretty' }) : t)),
            }, tab.view === 'pretty' ? '原文' : (tab.type === 'markdown' ? '渲染' : '美化')))
          }
          headChildren.push(React.createElement('div', { key: 'a', className: 'fex-actions' },
            React.createElement('button', { className: 'fex-ibtn', type: 'button', title: '查找 (Ctrl+F)', onClick: () => { setFindOpen(true); setFindIdx(0) } }, icon('search')),
            React.createElement('button', { className: 'fex-ibtn', type: 'button', title: '关闭', onClick: closePanel }, icon('x')),
          ))
          headEl = React.createElement('div', { className: 'fex-head' }, headChildren)

          let body
          let loadBar = null
          if (!content || content.state === 'loading') {
            body = React.createElement('div', { className: 'fex-note' }, '读取中…')
          } else if (tab.editing) {
            body = React.createElement('textarea', {
              className: 'fex-edit',
              value: tab.editText || '',
              spellCheck: false,
              onChange: (e) => setTabs((ts) => ts.map((t, i) => i === active ? Object.assign({}, t, { editText: e.target.value }) : t)),
            })
          } else if (content.state === 'ready') {
            if (content.kind === 'hex') {
              body = React.createElement(React.Fragment, null,
                React.createElement('div', { className: 'fex-note' }, content.hexTruncated ? '二进制文件较大，仅显示前 256KB' : '二进制文件（Hex 视图）'),
                renderHex(content.bytes, tab.path),
              )
            } else if (tab.type === 'image') {
              const imgState = tab.img || { scale: 1, rotate: 0 }
              const patchImg = (p) => setTabs((ts) => ts.map((t, i) => i === active ? Object.assign({}, t, { img: Object.assign({ scale: 1, rotate: 0 }, t.img || {}, p) }) : t))
              const downloadImg = () => {
                try {
                  const a = document.createElement('a')
                  a.href = content.dataUrl
                  a.download = tab.name
                  document.body.appendChild(a)
                  a.click()
                  a.remove()
                } catch (err) { /* ignore */ }
              }
              body = React.createElement('div', { className: 'fex-img-view' },
                React.createElement('div', { className: 'fex-imgbar' },
                  React.createElement('button', { className: 'fex-ibtn', type: 'button', title: '缩小', onClick: () => patchImg({ scale: Math.max(0.2, Math.round((imgState.scale * 0.8) * 100) / 100) }) }, icon('zoomOut')),
                  React.createElement('button', { className: 'fex-ibtn', type: 'button', title: '放大', onClick: () => patchImg({ scale: Math.min(8, Math.round((imgState.scale * 1.25) * 100) / 100) }) }, icon('zoomIn')),
                  React.createElement('button', { className: 'fex-ibtn', type: 'button', title: '实际大小', onClick: () => patchImg({ scale: 1, rotate: 0 }) }, '1:1'),
                  React.createElement('button', { className: 'fex-ibtn', type: 'button', title: '旋转 90°', onClick: () => patchImg({ rotate: (imgState.rotate + 90) % 360 }) }, icon('rotate')),
                  React.createElement('button', { className: 'fex-ibtn', type: 'button', title: '下载', onClick: downloadImg }, icon('download')),
                  React.createElement('span', { className: 'fex-imginfo' }, Math.round(imgState.scale * 100) + '%'),
                  imgSize ? React.createElement('span', { className: 'fex-imginfo' }, imgSize.w + ' × ' + imgSize.h) : null,
                ),
                React.createElement('div', { className: 'fex-img' },
                  React.createElement('img', {
                    src: content.dataUrl,
                    alt: tab.name,
                    onLoad: (e) => { try { setImgSize({ w: e.target.naturalWidth, h: e.target.naturalHeight }) } catch (err) { /* ignore */ } },
                    style: {
                      transform: 'rotate(' + imgState.rotate + 'deg) scale(' + imgState.scale + ')',
                      transition: 'transform .15s ease',
                    },
                  }),
                ),
              )
            } else {
              const typ = tab.type
              const mark = currentMatch
              if (tab.view === 'pretty') {
                if (typ === 'markdown' || typ === 'csv' || typ === 'tsv') {
                  body = renderPretty(tab, content)
                } else if (typ === 'diff') {
                  body = renderDiff(content.text, wrapCls, tab.path)
                } else if (typ === 'log') {
                  body = renderLog(content.text, wrapCls, tab.path)
                } else if (typ === 'json') {
                  let pretty = null
                  try { pretty = JSON.stringify(JSON.parse(content.text), null, 2) } catch (e) { pretty = null }
                  body = renderLines(pretty || content.text, wrapCls, 'json', mark, tab.path)
                } else if (typ === 'code') {
                  body = renderLines(content.text, wrapCls, langKeyOf(extOf(tab.name)), mark, tab.path)
                } else {
                  body = renderLines(content.text, wrapCls, null, mark, tab.path)
                }
              } else {
                body = renderLines(content.text, wrapCls, null, mark, tab.path)
              }
              if (content.offset > 0 && !content.eof && typ !== 'markdown' && typ !== 'csv' && typ !== 'tsv') {
                loadBar = React.createElement('div', { className: 'fex-loadmore' },
                  React.createElement('span', null, '已加载 ' + fmt(content.offset) + '，'),
                  React.createElement('button', { className: 'fex-btn2', type: 'button', onClick: () => loadMore(tab) }, '加载更多'),
                )
              }
            }
          } else {
            const kindText =
              content.kind === 'binary' ? '二进制文件，无法预览'
              : content.kind === 'too-large' ? '文件过大'
              : content.kind === 'missing' ? '文件不存在'
              : content.kind === 'not-file' ? '不是普通文件'
              : content.kind === 'denied' ? '权限不足'
              : '读取失败'
            body = React.createElement('div', { className: 'fex-note' }, kindText + (content.message ? '：' + content.message : ''))
          }
          const findBar = findOpen && !tab.editing ? React.createElement('div', { className: 'fex-findbar' },
            React.createElement('input', {
              className: 'fex-find-input', type: 'text',
              value: findQ, placeholder: '在文件中查找…', autoFocus: true, spellCheck: false,
              onChange: (e) => { setFindQ(e.target.value); setFindIdx(0) },
              onKeyDown: (e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  if (findMatches.length) setFindIdx((i) => (e.shiftKey ? (i - 1 + findMatches.length) % findMatches.length : (i + 1) % findMatches.length))
                }
                if (e.key === 'Escape') setFindOpen(false)
              },
            }),
            React.createElement('span', { className: 'fex-find-count' }, findMatches.length ? (findIdx + 1) + ' / ' + findMatches.length : '0'),
            React.createElement('button', { className: 'fex-ibtn', type: 'button', title: '上一个 (Shift+Enter)', onClick: () => findMatches.length && setFindIdx((i) => (i - 1 + findMatches.length) % findMatches.length) }, '↑'),
            React.createElement('button', { className: 'fex-ibtn', type: 'button', title: '下一个 (Enter)', onClick: () => findMatches.length && setFindIdx((i) => (i + 1) % findMatches.length) }, '↓'),
            React.createElement('button', { className: 'fex-ibtn', type: 'button', title: '关闭 (Esc)', onClick: () => setFindOpen(false) }, icon('x')),
          ) : null
          bodyEl = React.createElement(React.Fragment, null,
            tabStrip,
            findBar,
            React.createElement('div', {
              key: String(active),
              className: 'fex-content ' + (leaving ? 'fex-slide-out' : 'fex-slide-in'),
            }, body, loadBar),
          )
        }

        const paletteEl = palette ? React.createElement('div', { className: 'fex-palette' },
          React.createElement('input', {
            className: 'fex-palette-input', type: 'text',
            value: palette.q, placeholder: '快速打开文件… (Ctrl+P)', autoFocus: true, spellCheck: false,
            onChange: (e) => setPalette({ ...palette, q: e.target.value, idx: 0 }),
            onKeyDown: (e) => {
              if (e.key === 'Escape') { setPalette(null); return }
              if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault()
                if (palette.results.length) {
                  setPalette({ ...palette, idx: (palette.idx + (e.key === 'ArrowDown' ? 1 : -1) + palette.results.length) % palette.results.length })
                }
                return
              }
              if (e.key === 'Enter') {
                e.preventDefault()
                const r = palette.results[palette.idx]
                if (r) openFile(r.path, r.name, false)
                setPalette(null)
              }
            },
          }),
          React.createElement('div', { className: 'fex-palette-list' },
            palette.results.map((r, i) => React.createElement('div', {
              key: r.path,
              className: 'fex-palette-item' + (i === palette.idx ? ' active' : ''),
              onClick: () => { openFile(r.path, r.name, false); setPalette(null) },
              onMouseMove: () => setPalette({ ...palette, idx: i }),
            },
              React.createElement('span', { className: 'fex-ico' }, fileIcon(r.name, false, false)),
              React.createElement('span', { className: 'fex-palette-name' }, r.name),
              React.createElement('span', { className: 'fex-palette-path' }, r.path),
            )),
            !palette.q ? React.createElement('div', { className: 'fex-palette-hint' }, '输入关键词搜索文件名') : null,
            palette.q && !palette.results.length ? React.createElement('div', { className: 'fex-palette-hint' }, '无匹配') : null,
          ),
        ) : null

        const menuEl = menu ? React.createElement(React.Fragment, null,
          React.createElement('div', { className: 'fex-menu-mask', onClick: () => setMenu(null), onContextMenu: (e) => { e.preventDefault(); setMenu(null) } }),
          React.createElement('div', {
            className: 'fex-menu',
            style: {
              left: Math.min(menu.x, (typeof window !== 'undefined' ? window.innerWidth : 1400) - 170),
              top: Math.min(menu.y, (typeof window !== 'undefined' ? window.innerHeight : 900) - 140),
            },
          },
            menuItem('复制路径', 'copy', () => {
              try {
                const p = navigator.clipboard && navigator.clipboard.writeText && navigator.clipboard.writeText(menu.path)
                if (p && p.catch) p.catch(() => {})
              } catch (err) { /* ignore */ }
            }),
            menuItem('在系统打开', 'external', () => { if (workspaces) workspaces.openPath(menu.path) }),
            menuItem('打开所在文件夹', 'folderOpen2', () => { if (workspaces) workspaces.openPath(parentOf(menu.path)) }),
            !menu.isDir ? menuItem('在新标签打开', 'file', () => openFile(menu.path, menu.name, false)) : null,
          ),
        ) : null

        const noticeEl = notice ? React.createElement('div', {
          className: 'fex-notice' + (notice.kind === 'error' ? ' err' : ''),
          role: 'status', 'aria-live': 'polite',
        }, notice.text) : null

        return React.createElement('div', { className: 'fex-panel' }, headEl, bodyEl, paletteEl, menuEl, noticeEl)
      }),
    ))
}
