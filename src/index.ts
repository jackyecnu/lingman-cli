/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs'
import path from 'path'
import { Command } from 'commander'
import chalk from 'chalk'
import { version } from '../package.json'
import { createController } from './co'
import { openDocs, openDocs1, openLog } from './open'
import { gitPush } from './git'
import { sync } from './sync'
import { build } from './build'
import { checkVersion } from './utils/checkVersion'

const program = new Command()

const configPath = path.resolve(process.cwd(), 'lingman.config.js')

if (!fs.existsSync(configPath))
  console.log(chalk.red('当前目录下不存在 lingman.config.js 配置文件, 请先创建'))

const config = require(configPath)

export default async function () {
  program
    .command('co')
    .description('创建Controller , 文件目录以.分割')
    .action(() => { createController(config.co, program.args.slice(1)) })

  program
    .command('git')
    .description('git提交 默认提交工作区所有文件')
    .option('-m, --message <message>', '提交信息')
    .action((options) => { gitPush(options.message) })

  program
    .command('sync')
    .description('同步远程数据库表结构到本地')
    .action(() => { sync(config) })

  program
    .command('build')
    .description('执行build指令')
    .action(() => { build(config) })

  program
    .command('log')
    .description('打开接口日志')
    .action(() => { openLog(config) })

  program
    .command('docs')
    .description('打开本地Api文档')
    .action(() => { openDocs(config) })

  program
    .command('docs1')
    .description('打开在线Api文档')
    .action(() => { openDocs1(config) })

  program.version(version, '-v, --version', '查看版本号')
  program.parse()
  checkVersion()
}
