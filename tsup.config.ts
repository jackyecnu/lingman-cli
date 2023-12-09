import type { Options } from 'tsup'

export const tsup: Options = {
  entry: [
    'index.ts',
    'lmc.ts',
  ],
  format: ['cjs'],
  dts: true,
  splitting: true,
  clean: true,
  shims: true,
  plugins: [],
  // skipNodeModulesBundle: true,
  target: 'esnext',
}
