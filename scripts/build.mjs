// Build the dsh-filelens bundle package:
//   1. tsc compiles the host half (src/index.ts) -> lib/index.js + lib/index.d.ts
//   2. esbuild bundles the client half (src/client/index.js) -> lib/client.js
//      in the __ModuleLoader__.load({ id, factory }) format the browser module
//      table expects; platform modules stay external (resolved from the frozen
//      module table, mirroring packages/client/web/src/platform.ts).
import { execSync } from 'node:child_process'
import { build } from 'esbuild'

execSync('npx tsc -p tsconfig.json', { stdio: 'inherit' })

// Mirror of PLATFORM_MODULES in @deepseek-ai/dsh-client-web (packages/client/web/src/platform.ts).
const PLATFORM_MODULES = [
  'react', 'react/jsx-runtime', 'react-dom', 'react-dom/client', '@deepseek-ai/cordis',
  '@deepseek-ai/dsh-client-ui-slots',
  '@deepseek-ai/dsh-client-web-react',
  '@deepseek-ai/dsh-client-ui-primitives',
  '@deepseek-ai/dsh-client-ui-attachment',
  '@deepseek-ai/dsh-client-schema-form',
]

await build({
  entryPoints: ['src/client/index.js'],
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: 'es2020',
  outfile: 'lib/client.js',
  external: PLATFORM_MODULES,
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'production'),
  },
  // Same artifact shape as the repository's clientBundle preset:
  // the module table hands this factory a `require` for externals.
  banner: {
    js: 'var module = { exports: {} }; var exports = module.exports;\n'
      + 'window.__ModuleLoader__.load({ id: "dsh-filelens", factory: (require) => {',
  },
  footer: { js: 'return module.exports; } });' },
  sourcemap: true,
})

console.log('built lib/index.js (host) and lib/client.js (browser)')
