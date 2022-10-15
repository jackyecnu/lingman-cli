import { execSync } from 'child_process'
import chalk from 'chalk'

export function openDocs({ docs }) {
  if (!docs) return console.log(chalk.red('缺少docs配置'))
  execSync(`start ${docs}`, { stdio: 'inherit' })
}

export function openDocs1({ docs1 }) {
  if (!docs1) return console.log(chalk.red('缺少docs1配置'))
  execSync(`start ${docs1}`, { stdio: 'inherit' })
}

export function openLog({ log }) {
  if (!log) return console.log(chalk.red('缺少log地址配置'))
  execSync(`start ${log}`, { stdio: 'inherit' })
}
