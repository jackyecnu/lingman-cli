/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs'
import path from 'path'
import { Command } from 'commander'
import chalk from 'chalk'
import { createController } from './co'

const program = new Command()

if (!fs.existsSync(path.resolve(process.cwd(), 'lingman.config.js')))
  console.log(chalk.red('当前目录下不存在 lingman.config.js 配置文件, 请先创建'))

const config = require(path.resolve(process.cwd(), 'lingman.config.js'))

export default async function () {
  program.command('co').description('创建Controller , 文件目录以.分割').action(() => {
    createController(config, program.args.slice(1))
  })

  program.parse()
}
