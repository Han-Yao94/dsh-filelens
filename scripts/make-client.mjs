// Dev helper: generate src/client/index.js from the dynamic-plugin edition at
// ../client.js (the source of truth for the UI logic). Run after every change
// to client.js:  node scripts/make-client.mjs
//
// Transformations:
//   1. prepend imports (React) and the callRemote() replacement for host.call(...)
//   2. host.call( -> callRemote(
//   3. `return { apply(ctx) {` -> `export async function apply(ctx) {`
//   4. a styles.insert fallback after the slots check
//   5. close the export instead of the plugin object
//
// The client reaches the host over the /api Remote transport with the exact
// client-request envelope the client-connection package uses. It deliberately
// avoids the ctx.remote namespace injection: declaring 'remote.filelens' in
// inject would deadlock (cordis keeps the fiber inactive until the namespace
// service exists, but only our own $mount creates it, and $mount runs in
// apply), while not declaring it trips the inject guard on every call.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const sourcePath = fileURLToPath(new URL('../../client.js', import.meta.url))
const outPath = fileURLToPath(new URL('../src/client/index.js', import.meta.url))
let out = readFileSync(sourcePath, 'utf8')
const originalLength = out.length

const header = `// GENERATED from ../client.js by scripts/make-client.mjs — edit the source
// file, then re-run \`node scripts/make-client.mjs\`. Static client half: the
// FileLens UI in the details column, reaching the host over the /api Remote
// transport (the same wire the client-connection package uses). The host
// endpoint is registered by the FileLens service at construction, so no
// ctx.remote namespace injection is needed — the cordis inject guard and the
// mount-order deadlock cannot interfere.

import React from 'react'

// Replaces host.call(...) from the dynamic-plugin edition: POSTs a
// client-request envelope to the /api bridge (identical shape to the
// client-connection rpc.call) and unwraps the server response. The host
// method always takes one plain-object \`args\` argument.
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

`
out = header + out

out = out.split('host.call(').join('callRemote(')

const applyOpen = 'return {\n  apply(ctx) {'
if (!out.includes(applyOpen)) throw new Error('apply signature not found')
out = out.replace(applyOpen, 'export async function apply(ctx) {')

const mountAnchor = `    if (slots === undefined) return

    const store = `
if (!out.includes(mountAnchor)) throw new Error('mount anchor not found')
out = out.replace(mountAnchor, `    if (slots === undefined) return

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

    const store = `)

const tail = /\n    \)\)\n  \},\n}\s*$/
if (!tail.test(out)) throw new Error('tail not found')
out = out.replace(tail, '\n    ))\n}\n')

writeFileSync(outPath, out)
console.log(`wrote ${outPath} (${originalLength} -> ${out.length} chars)`)
