import { execSync } from 'child_process'
import chalk from 'chalk'

export function sync({ sync }) {
  if (!sync) return console.log(chalk.red('缺少sync配置'))
  const isWin = process.platform === 'win32'
  if (isWin)
    execSync(sync, { stdio: 'inherit', shell: 'powershell.exe' })
  else
    execSync(sync)
}
