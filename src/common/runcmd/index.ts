import { execSync } from 'child_process'
import chalk from 'chalk'
import inquirer from 'inquirer'
import axios from 'axios'
import { checkLogin } from '../../utils/user'

export async function runCmd(cmd, win = 'powershell') {
  if (!cmd) return console.log(chalk.bold.red('缺少指令配置'))
  const isWin = process.platform === 'win32'

  if (isWin) {
    if (win === 'powershell')
      execSync(cmd, { stdio: 'inherit', shell: 'powershell.exe' })
    else
      execSync(cmd, { stdio: 'inherit', shell: 'cmd.exe' })
  }
  else { execSync(cmd, { stdio: 'inherit' }) }
}

export async function getCommand() {
  await checkLogin()
  const res = await axios.get(`https://api-lmapp.lingman.tech/api/app/devtool/command/all/${process.platform}`)

  const choose = await inquirer.prompt([
    {
      type: 'rawlist',
      message: '请选择运行命令 ?',
      name: 'type',
      choices: res.data.data.map(item => ({ name: item.name, value: item })),
    },
  ])

  console.log(chalk.green.bold(`执行指令: ${choose.type.content}`))
  if (choose.type.is_run === 1)
    runCmd(choose.type.content)
}
