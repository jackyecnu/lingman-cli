import { version } from '../package.json'
import { build } from './build'
import { createController } from './co'
import { gitPush } from './git'
import { init } from './init'
import { initHelper } from './init-helper'
import { openDocs, openDocs1, openInBrowser, openLog } from './open'
import { runCmd } from './runcmd'
import { sync } from './sync'
import { unipub } from './uniapp/unipub'
import { update } from './update'
import { runShell } from './utils/runShell'

// 公共
export function langCommon(program, config) {
  program
    .command('update')
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
    .command('git')
    .description('git提交 默认提交工作区所有文件')
    .option('-m, --message <message>', '提交信息')
    .action((options) => {
      // console.log(options.message, 'aaaa1', program.args.slice(1))
      console.dir(options)
      gitPush(options.message, program.args.slice(1))
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
      openInBrowser('https://www.npmmirror.com/sync/lingman-pub')
    })

  program.version(version, '-v, --version', '查看版本号')
}

// uniapp
export function langUniapp(program, config) {
  program
    .command('pub')
    .description('发布uniapp的wgt和微信')
    .action(() => {
      unipub(config.pub, program.args.slice(1))
    })
}

// flutter
export function langFlutter(program, config) {
  program
    .command('get')
    .description('Flutter pub get简写')
    .action(() => {
      runCmd('git config core.hooksPath .gitHooks')
      runCmd('flutter pub get')
    })

  program
    .command('run')
    .description('Flutter run')
    .action(() => {
      runCmd('flutter run')
    })

  program
    .command('lint')
    .description('Flutter lint规则检测')
    .action(() => {
      runCmd('flutter pub run dart_code_metrics:metrics analyze lib --reporter=checkstyle')
      runCmd('flutter analyze')
    })

  program
    .command('ios')
    .description('打包ios应用')
    .action(() => {
      gitPush('ios')
    })

  program
    .command('android')
    .description('打包android应用')
    .action(() => {
      gitPush('android')
    })

  program
    .command('release')
    .description('同时打包ios android应用')
    .action(() => {
      gitPush('release')
    })

  program
    .command('web')
    .description('打包web应用')
    .action(() => {
      gitPush('web')
    })
}

// .net 相关
export function langDotnet(program, config) {
  program
    .command('co')
    .description('创建Controller , 文件目录以.分割')
    .action(() => {
      createController(config, program.args.slice(1))
    })

  program
    .command('sync')
    .description('同步远程数据库表结构到本地')
    .action(() => {
      sync(config, program.args.slice(1))
    })

  program
    .command('build')
    .description('执行build指令')
    .action(() => {
      build(config)
    })

  program
    .command('log')
    .description('打开接口日志')
    .action(() => {
      openLog(config)
    })

  program
    .command('docs')
    .description('打开本地Api文档')
    .action(() => {
      openDocs(config)
    })

  program
    .command('docs1')
    .description('打开在线Api文档')
    .action(() => {
      openDocs1(config)
    })

  program
    .command('initHelper')
    .description('初始化配置')
    .action(() => {
      initHelper(config.initHelper)
    })

  program
    .command('eftool')
    .description('ef tool 版本更新')
    .action(() => {
      runShell('dotnet tool update --global dotnet-ef')
    })
}
