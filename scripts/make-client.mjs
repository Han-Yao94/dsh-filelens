// Dev helper: generate src/client/index.js from the dynamic-plugin edition at
// ../client.js (the source of truth for the UI logic). Run after every change
// to client.js:  node scripts/make-client.mjs
//
// Transformations:
//   1. prepend imports (React, zod), the Remote descriptors, $mount and the
//      callRemote() replacement for host.call(...)
//   2. host.call( -> callRemote(
//   3. `return { apply(ctx) {` -> `export async function apply(ctx) {`
//   4. await mountRemote(ctx) + a styles.insert fallback after the slots check
//   5. close the export instead of the plugin object
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const sourcePath = fileURLToPath(new URL('../../client.js', import.meta.url))
const outPath = fileURLToPath(new URL('../src/client/index.js', import.meta.url))
let out = readFileSync(sourcePath, 'utf8')
const originalLength = out.length

const header = `// GENERATED from ../client.js by scripts/make-client.mjs — edit the source
// file, then re-run \`node scripts/make-client.mjs\`. Static client half: the
// FileLens UI in the details column, reaching the host through the Typert
// Remote gateway instead of the dynamic-plugin host.call bridge.

import React from 'react'
import { z } from 'zod'

export const inject = ['remote']

const Z_ANY = z.any()
const METHOD_NAMES = ['root', 'list', 'search', 'grep', 'read', 'readMore', 'readHex', 'write', 'readImage']
const DESCRIPTORS = METHOD_NAMES.map((method) => ({
  id: 'dsh-filelens#filelens/' + method,
  service: 'filelens',
  namespace: 'filelens',
  method,
  invocation: { kind: 'direct' },
  parameters: [{ name: 'args', wire: 'args', source: 'json', codec: { mode: 'strict', typeSymbol: 'any', schema: Z_ANY } }],
  result: { mode: 'strict', typeSymbol: 'any', schema: Z_ANY },
}))

let remoteApi = null
async function mountRemote(ctx) {
  const remote = ctx.get('remote')
  if (remote === undefined) return
  await remote.$mount({ package: 'dsh-filelens', descriptors: DESCRIPTORS })
  remoteApi = remote
}

// Replaces host.call(...) from the dynamic-plugin edition: routes through the
// mounted Remote namespace and unwraps the RemoteResult envelope. The host
// method always takes one plain-object \`args\` argument (SRC wire field).
async function callRemote(method, args) {
  const api = remoteApi
  if (!api) throw new Error('filelens remote not mounted')
  const name = method.slice(5)
  const res = await api.filelens[name](args)
  if (!res || res.ok !== true) {
    const err = new Error((res && res.error && res.error.message) || ('remote ' + method + ' failed'))
    err.kind = res && res.error && res.error.code
    throw err
  }
  return res.value
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
    await mountRemote(ctx)

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
