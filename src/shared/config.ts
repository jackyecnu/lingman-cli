import process from 'node:process'
import { createConfigLoader } from 'unconfig'

export async function loadConfig<T extends Config>() {
  const defaults = { lang: '', co: {}, initConfig: {} }

  const loader = createConfigLoader<T>({
    sources: [
      {
        files: 'lingman.config',
        // default extensions
        extensions: ['ts', 'mts', 'cts', 'js', 'mjs', 'cjs', 'json', ''],
      },
      // {
      //   files: 'package.json',
      //   extensions: [],
      //   rewrite(config: any) {
      //     return config?.lingman
      //   },
      // },
    ],
    cwd: process.cwd(),
    merge: false,
  })

  const result = await loader.load()

  result.config = Object.assign(defaults, result.config)

  return result
}
