import { execSync } from 'child_process'
import chalk from 'chalk'

export async function runCmd(cmd) {
  if (!cmd) return console.log(chalk.red('缺少指令配置'))
  const isWin = process.platform === 'win32'
  if (isWin) execSync(cmd, { stdio: 'inherit', shell: 'powershell.exe' })
  else execSync(cmd, { stdio: 'inherit' })
}
