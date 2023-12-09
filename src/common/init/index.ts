import path from 'node:path'
import fs from 'node:fs'
import process from 'node:process'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { loadConfig } from '@/shared/config'
import { initConfigTemplate, langs } from '@/shared'

export async function init() {
  const { config } = await loadConfig()

  const configPath = path.resolve(process.cwd(), 'lingman.config.js')

  if (config.lang) {
    console.log(chalk.bold.green(`该程序配置为：${config.lang}`))
  }
  else {
    console.log(chalk.bold.blue('请输入需要需要配置的语言：'))
    const choose = await inquirer.prompt([
      {
        type: 'rawlist',
        message: '请选择 ?',
        name: 'type',
        choices: Object.keys(langs).map(i => ({
          name: i,
          value: initConfigTemplate[i],
        })),
      },
    ])
    const str = choose.type
    fs.writeFileSync(configPath, str, { encoding: 'utf-8' })
  }
}
