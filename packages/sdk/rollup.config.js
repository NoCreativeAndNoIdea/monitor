import typescript from '@rollup/plugin-typescript'

/**
 * @type {import('rollup').RollupOptions}
 */
const configs = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.cjs',
        format: 'cjs'
      },
      {
        file: 'dist/index.mjs',
        format: 'esm'
      },
      {
        name: 'MonitorSDK',
        file: 'dist/index.js',
        format: 'iife'
      }
    ],
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json'
      })
    ]
  }
]

export default configs
