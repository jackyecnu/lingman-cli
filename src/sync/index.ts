import { execSync } from 'child_process'
import chalk from 'chalk'

export function sync(config, args: string[]) {
  let sync = config.sync
  if (!sync) return console.log(chalk.red('缺少sync配置'))


  let command:string = ""
  if(typeof sync === "string") { // "string" 
    command = sync
  } else {
    if (args.length == 0) {
      console.log('\x1B[33m%s\x1B[0m', '请输入需要同步的数据库')
      for (var key in sync) {
        console.log(key)
      }
      return
    } 
    command = sync[key.toString()]
  }

  const isWin = process.platform === 'win32'
  if (isWin)
    execSync(command, { stdio: 'inherit', shell: 'powershell.exe' })
  else
    execSync(command)
}
