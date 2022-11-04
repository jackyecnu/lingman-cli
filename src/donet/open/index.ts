import chalk from 'chalk'
import { openInBrowser } from '../../common/open'

export function openDocs({ docs }) {
  if (!docs) return console.log(chalk.bold.red('缺少docs配置'))
  openInBrowser(docs)
}

export function openDocs1({ docs1 }) {
  if (!docs1) return console.log(chalk.bold.red('缺少docs1配置'))
  openInBrowser(docs1)
}

export function openLog({ log }) {
  if (!log) return console.log(chalk.bold.red('缺少log地址配置'))
  openInBrowser(log)
}

