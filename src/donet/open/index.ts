import chalk from 'chalk'
import { openInBrowser } from '../../common/open'

export function openDocs({ api }) {
  if (!api) return console.log(chalk.bold.red('缺少api配置'))
  openInBrowser(api)
}

export function openDocs1({ api1 }) {
  if (!api1) return console.log(chalk.bold.red('缺少api1配置'))
  openInBrowser(api1)
}

export function openLog({ log }) {
  if (!log) return console.log(chalk.bold.red('缺少log地址配置'))
  openInBrowser(log)
}

