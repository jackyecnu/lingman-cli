import chalk from 'chalk'
import inquirer from 'inquirer'
import { openInBrowser } from '../../../common/open'

export async function openDocs({ api }, args: string[]) {
  if (!api)
    return console.log(chalk.bold.red('缺少api配置'))
  const key = args[0]

  if (Object.prototype.toString.call(api) === '[object Object]') {
    if (key) {
      if (!api[key]) {
        const choose = await inquirer.prompt([
          {
            type: 'rawlist',
            message: '请选择接口文档类型 ?',
            name: 'type',
            choices: Object.keys(api).map(item => ({ name: item, value: api[item] })),
          },
        ])
        openInBrowser(choose.type)
      }
      else {
        openInBrowser(api[key])
      }
    }
    else {
      const choose = await inquirer.prompt([
        {
          type: 'rawlist',
          message: '请选择接口文档类型 ?',
          name: 'type',
          choices: Object.keys(api).map(item => ({ name: item, value: api[item] })),
        },
      ])
      openInBrowser(choose.type)
    }
  }
  else {
    openInBrowser(api)
  }
}

export function openDocs1({ api1 }) {
  if (!api1)
    return console.log(chalk.bold.red('缺少api1配置'))
  openInBrowser(api1)
}

export function openLog({ log }) {
  if (!log)
    return console.log(chalk.bold.red('缺少log地址配置'))
  openInBrowser(log)
}
