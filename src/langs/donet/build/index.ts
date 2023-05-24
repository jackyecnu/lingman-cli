import { execSync } from 'node:child_process'
import chalk from 'chalk'

export function build({ build }) {
  if (!build) return console.log(chalk.bold.red('缺少build指令配置'))
  execSync(build, { stdio: 'inherit' })
}
