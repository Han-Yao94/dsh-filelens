# dsh-filelens

English | [中文](README.zh.md)

**FileLens** — a right-column file explorer for the DeepSeek Harness web UI.
Browse a lazy directory tree, preview many formats, search names & file
contents, open multiple tabs, and inline-edit text files — with containment
and version-guarded writes built in.

A single npm package ships both halves: the Host service (`filelens` Remote
namespace) and the browser UI (details column). No Typert-generated artifacts
are required — the Host gateway discovers the Remote methods through SRC
markers at runtime.

## Install

```sh
dsh plugin --profile <name> add dsh-filelens          # from npm
# or straight from a git host:
dsh plugin --profile <name> add github:Han-Yao94/dsh-filelens
# or from a local tarball:
dsh plugin --profile <name> add ./dsh-filelens-1.0.0.tgz
```

> **Git installs and build scripts**: the package ships a `prepare` script that
> builds `lib/` from source, and the `lib/` artifacts are committed as well, so
> a clone works either way. pnpm ≥10 refuses to run a git dependency's
> `prepare` script until it is explicitly allowed — if the first `add` fails,
> copy the exact package key pnpm printed into the profile's
> `pnpm-workspace.yaml` and re-run:
>
> ```yaml
> allowBuilds:
>   dsh-filelens: true
> ```
>
> That allowance executes the package's build code on your machine at install
> time; only allow packages whose source you trust, and prefer pinning a
> commit: `github:Han-Yao94/dsh-filelens#<sha>`.

If the profile does not exist yet, the first `add` initializes it with
`@deepseek-ai/dsh-base`; the web GUI additionally needs `dsh-web-app`:

```sh
dsh plugin --profile <name> add @deepseek-ai/dsh-web-app
```

Then boot with `dsh --profile <name>` and toggle the file explorer from the
conversation header (folder icon) or the details column.

## Features

- **Lazy directory tree** — expand/collapse, hidden-dotfile toggle, breadcrumb
  navigation, drag-resizable column, filename/content dual search mode.
- **Multi-tab preview** — independent tabs with drag-sort, `Ctrl+Tab` /
  `Ctrl+Shift+Tab`; per-tab "pretty/raw" and wrap preferences.
- **Typed rendering** — Markdown (headings, task lists, tables, fenced code
  with copy button, TOC), images (zoom/rotate/download), JSON, CSV/TSV,
  diff/log coloring, 30+ language syntax highlighting with line numbers,
  binary files as a hex view.
- **Large files** — 256 KB head preview with incremental "load more"
  (stream-continued on the Host, no re-read from the start), virtual scrolling
  beyond 800 lines.
- **Search** — recursive filename search (depth 8 / 3000 dirs / 300 results),
  content grep (≤256 KB text files), `Ctrl+P` quick open.
- **Shortcuts** — `↑/↓/←/→/Enter` tree navigation, `Ctrl+F` in-file find
  (n/N, jump, highlight), `Ctrl+P` quick open, `Ctrl+T` tab cycle,
  `Ctrl+S` save while editing, `Ctrl+W` close tab, `Esc` to back out.
- **Conversation links** — clicking a file-mention in a conversation opens it
  in FileLens.
- **Inline editing** — text files edit in place; saving writes through the
  Host `fs` service. State (root, expanded dirs, tabs) persists in
  `localStorage` under `dsh-filelens-state`.

## Security model

| Layer | Enforcement |
| --- | --- |
| Explorer root | every read/write is containment-guarded against an explicit root; the guard is **fail-closed** (a root that cannot resolve, or a target outside it, rejects the call) |
| Writes | `file.write` **requires an explicit root** (link-opened tabs may read without one by explicit user intent, but never write) |
| Version guard | saves carry the `FsVersion` observed at read time; a file changed elsewhere rejects the save with `stale` instead of silently overwriting |
| Truncation guard | files not fully loaded (>256 KB) cannot be edited, so a save can never truncate the rest of the file |
| Host sandbox | the underlying `fs` sandbox (e.g. `workspace-write`) remains the outermost boundary |
| Markdown | link/image URLs are scheme-whitelisted (`javascript:`/`data:` render inert) |

Failures are never silent: save / load-more / root-pick errors surface in an
in-panel notice.

## Notes

- The column width range depends on the host's details-column constants. The
  stock host allows a narrower drag range than the layout used during
  development; FileLens works in both, it just inherits the host's range.
- Editing **writes to disk** — read the file before confirming a save; the
  version guard protects against concurrent external changes.
- This bundle mounts as a single Loader row (`id: filelens`); the browser half
  is picked up automatically from the `dsh.client` declaration.

## Development

```sh
npm install
npm run build          # tsc (host half) + esbuild (browser bundle)
node scripts/make-client.mjs   # regenerate src/client from ../client.js
```

The package has zero runtime npm dependencies for its Host half beyond the
`@deepseek-ai/cordis` / `@deepseek-ai/dsh-typert-protocol` peers provided by
the harness. `zod` is inlined into the browser bundle for the Remote
descriptor codecs.

## License

MIT. The SVG icon paths in the UI are derived from the Lucide icon set
(ISC) — see `LICENSE` for the full notices.
