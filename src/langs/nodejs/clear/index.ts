import fs from 'node:fs'
import { rimrafSync } from 'rimraf'
import chalk from 'chalk'

export function clear() {
  const cleans = [
    'node_modules',
    'dist',
    'build',
    'package-lock.json',
    'yarn.lock',
    'npm-debug.log',
    'pnpm-lock.yaml',
    'pnpm-debug.log',
    'yarn-error.log',
    'yarn-debug.log',
  ]

  cleans.forEach((clean) => {
    // 判断是否存在
    if (!fs.existsSync(clean))
      return

    console.log(chalk.bold.green(`清除 ${clean}`))
    rimrafSync(clean)
    console.log(chalk.bold.green(`清除 ${clean} 成功`))
  })
}
