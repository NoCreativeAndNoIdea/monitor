import { defineWorkspace } from 'vitest/config'

// DefineWorkspace provides a nice type hinting DX
export default defineWorkspace([
  'apps/*',
  'packages/*',
  {
    test: {
      include: ['**/tests/**/*.{test,dom}.[tj]s'],
      exclude: ['**/node_modules/**', '**/dist/**'],
      testTimeout: 20000,
      // Node14 segfaults often with threads
      threads: !process.versions.node.startsWith('14')
    }
  }
])
