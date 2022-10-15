import { execSync } from 'child_process'
import chalk from 'chalk'

export function build({ build }) {
  if (!build) return console.log(chalk.red('缺少build指令配置'))
  execSync(build, { stdio: 'inherit' })
}
