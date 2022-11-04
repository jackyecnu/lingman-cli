import path from 'path'
import fs from 'fs'
import axios from 'axios'
import chalk from 'chalk'

export function initHelper({ url, path: helperPath }) {
  if (!url) return console.log(chalk.red('缺少initHelper.url配置'))
  if (!helperPath) return console.log(chalk.red('缺少initHelper.path配置'))

  const fileName = path.basename(url)
  const targetPath = path.resolve(process.cwd(), helperPath, fileName)
  axios.get(url).then(({ data }) => {
    fs.writeFileSync(targetPath, data, { encoding: 'utf-8' })
  })
}

