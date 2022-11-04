import path from 'path'
import fs from 'fs'
import chalk from 'chalk'
import inquirer from 'inquirer'

export async function init() {
  // const program = new Command()

  const configPath = path.resolve(process.cwd(), 'lingman.config.js')
  if (fs.existsSync(configPath)) {
    let config = { lang: '', co: {}, initConfig: {} } as any
    config = require(configPath)
    if (config)
      console.log('该程序配置为：', config.lang)
  }
  else {
    console.log(chalk.blue('请输入需要需要配置的语言：'))
    const arr = ['dotnet', 'flutter', 'uniapp']
    const choose = await inquirer.prompt([
      {
        type: 'rawlist',
        message: '请选择 ?',
        name: 'type',
        choices: arr.map(i => ({
          name: i,
          value: `
module.exports = {
  lang: '${i}',
}
`.trim(),
        })),
      },
    ])
    const str = choose.type
    fs.writeFileSync(configPath, str, { encoding: 'utf-8' })
  }
}
