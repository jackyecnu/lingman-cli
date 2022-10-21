import { execSync } from 'child_process'
import chalk from 'chalk'
import inquirer from 'inquirer'

export async function sync(config, args: string[]) {
  const sync = config.sync
  if (!sync) return console.log(chalk.red('缺少sync配置'))

  let command = ''
  if (typeof sync === 'string') { // "string"
    command = sync
  }
  else {
    if (args.length === 0) {
      console.log('\x1B[33m%s\x1B[0m', '请输入需要同步的数据库:全部为all')
      const choose = await inquirer.prompt([
        {
          type: 'rawlist',
          message: '请选择 ?',
          name: 'type',
          choices: Object.keys(sync).map(i => ({ name: i, value: sync[i] })),
        },
      ])
      command = choose.type
    }
    else if (args[0] === 'all') {
      for (const key in sync) {
        const isWin = process.platform === 'win32'
        if (isWin)
          execSync(sync[key], { stdio: 'inherit', shell: 'powershell.exe' })
        else
          execSync(sync[key])
      }
      return
    }
    else {
      command = sync[args[0].toString()]
    }
  }

  const isWin = process.platform === 'win32'
  if (isWin)
    execSync(command, { stdio: 'inherit', shell: 'powershell.exe' })
  else
    execSync(command, { stdio: 'inherit' })
}
