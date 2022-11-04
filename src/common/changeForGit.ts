import path from 'path'
import fs from 'fs'
import chalk from 'chalk'
export function changeForGit() {
  const configPath = path.resolve(process.cwd(), 'lingman.config.js')

  if (fs.existsSync(configPath)) {
    let json = fs.readFileSync(configPath).toString()
    const firstLine = `\/\/ 发布用 ${new Date().toLocaleString()}\n`
    if (json.startsWith('//')) {
      // 替换第一行
      json = firstLine + json.substring(json.indexOf('\n') + 1)
    }
    else {
      // 增加第一行
      json = `${firstLine}${json}`
    }
    fs.writeFileSync(configPath, json, { encoding: 'utf-8' })
    console.log(chalk.bold.green('改变成功'))
  }
  else {
    console.log(chalk.bold.red('不存在 lingman.config.js， 无法提交'))
  }
}
