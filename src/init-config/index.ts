import path from 'path'
import fs from 'fs'
import axios from 'axios'
import chalk from 'chalk'

export function initConfig({ url, path: configPath }) {
  if (!url) return console.log(chalk.red('缺少initConfig.url配置'))
  if (!configPath) return console.log(chalk.red('缺少initConfig.path配置'))

  const fileName = path.basename(url)
  const targetPath = path.resolve(process.cwd(), configPath, fileName)
  axios.get(url).then(({ data }) => {
    fs.writeFileSync(targetPath, data, { encoding: 'utf-8' })
  })
}

