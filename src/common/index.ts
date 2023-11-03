import process from 'node:process'
import type { Command } from 'commander'
import chalk from 'chalk'
import { version } from '../../package.json'
import { PlatformX } from '../utils/platformX'
import { changeForGit } from './changeForGit'
import { checkOnlineAppVersion } from './checkOnlineAppVersion'
import { chooseMessage, gitPushAll, openGitRepoByBrowser } from './git'
import { init } from './init'
import { openInBrowser } from './open'
import { getCommand, runCmd } from './runcmd'
import { update } from './update'
import { login, logout, me } from './user'
import { createProject } from './create'

export function langCommon(program: Command, config) {
  program
    .command('u')
    .description('更新Api')
    .action(() => {
      update()
    })

  program.command('dir')
    .description('显示json配置文件')
    .action(() => {
      console.dir(config)
    })

  program
    .command('create')
    .description('创建项目')
    .action(() => {
      createProject()
    })

  program
    .command('git')
    .description('git提交 默认提交工作区所有文件')
    // .option('-m, --message <message>', '提交信息')
    .action(() => {
      // console.log(options.message, 'aaaa1', program.args.slice(1))
      // console.dir(options)
      // gitPush(options.message, options.message ? program.args.slice(1) : program.args)
      const message = program.args.slice(1).join(' ').trim()

      if (message)
        gitPushAll(message)

      else
        chooseMessage()
    })

  program
    .command('init')
    .description('自动创建lingman.config.js')
    .action(() => {
      init()
    })

  program
    .command('taobao')
    .description('打开淘宝源去同步')
    .action(() => {
      openInBrowser('https://www.npmmirror.com/sync/lingman-cli')
    })

  program
    .command('change')
    .description('修改lingman.config.js,方便git提交')
    .action(() => {
      changeForGit()
    })

  program
    .command('v')
    .description('查看当前线上App版本')
    .action(() => {
      checkOnlineAppVersion(config)
    })

  program
    .command('.')
    .description('打开当前文件夹')
    .action(() => {
      if (PlatformX.isWin)
        runCmd('explorer .')
      else
        runCmd('open .')
    })

  program
    .command('repo')
    .description('打开当前git仓库')
    .action(() => {
      openGitRepoByBrowser()
    })

  program
    .command('cmd')
    .description('运行命令')
    .action(() => {
      getCommand()
    })

  program
    .command('login')
    .description('登录')
    .action(() => {
      login()
    })

  program
    .command('logout')
    .description('退出登录')
    .action(() => {
      logout()
    })

  program
    .command('me')
    .description('查看当前用户')
    .action(() => {
      me()
    })

  program.version(version, '-v, --version', '查看版本号')
}

export function registerScripts(program: Command, config) {
  const scripts = config.scripts || {}

  // 检查是否有重复的命令
  const commands = program.commands.map(item => item.name())

  if (Object.keys(scripts).some(key => commands.includes(key))) {
    console.error(chalk.yellow('错误：') + chalk.red('scripts 不能和 lm 内置命令重复'))
    process.exit(0)
  }

  Object.keys(scripts).forEach((key) => {
    program
      .command(key)
      .description(scripts[key])
      .action(() => {
        runCmd(scripts[key])
      })
  })
}
