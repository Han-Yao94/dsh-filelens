# Changelog

## 1.0.0 (rev 2) — 2026-08-14

Fix: the Host half no longer relies on the `@Remote` decorator markers for
gateway discovery. Those markers live in a module-private WeakMap inside the
typert-protocol package, so an out-of-tree bundle resolving a different copy
of the package (typical for npm/git/tarball installs) split the marker table
and the gateway never saw the `filelens/*` endpoints — the UI opened but
showed no files. The service now registers its strict invocation definitions
at runtime through `ctx.typert.register()`, which is install-shape agnostic.

## 1.0.0 — 2026-08-14

Initial bundle release. Static Host/Client plugin packaged as an installable
`dsh.bundle` (npm / GitHub / tarball).

- Host half: `filelens` Typert Remote service (SRC mode, no generated
  artifacts) exposing `root` / `list` / `search` / `grep` / `read` /
  `readMore` / `readHex` / `write` / `readImage`.
- Browser half: details-column FileLens UI (tree, tabs, typed previews,
  search, inline editing) registered through `slots`, wired to the Host over
  the Typert Remote gateway.
- Security (carried from the dynamic-plugin pkg-24 hardening):
  - fail-closed containment guard; writes require an explicit root;
  - version-guarded writes (`stale` rejection, `FS_STALE_VERSION`);
  - edit disabled until the file is fully loaded (no truncation overwrites);
  - per-family search/grep cancellation (AbortController);
  - incremental readMore via a version-guarded stream cache (O(n) over a
    session instead of O(n²));
  - structured `FsError` code classification; Markdown URL scheme whitelist;
    CSS-escaped jump-to-line selectors (Windows paths).
- UX: save/load-more feedback notices, `Ctrl+S` / `Ctrl+W`, refresh keeps
  open tabs, CSV truncation note, `denied` error copy.
