import { gitPushAll } from '../../common/git'
import { openInBrowser } from '../../common/open'
import { runCmd } from '../../common/runcmd'
import { messageTypes } from './../../shared/index'
import { updateLingmanVersionForFlutter } from './lingman'
import { updateBuildVersion } from './update'

export function langFlutter(program, config) {
  program
    .command('get')
    .description('Flutter pub get简写')
    .action(() => {
      runCmd('git config core.hooksPath .gitHooks')
      runCmd('flutter pub get')
    })

  program
    .command('lingman')
    .description('更新pub (新提交的需要约10分钟同步可用)')
    .action(() => {
      updateLingmanVersionForFlutter()
      // openInBrowser('https://pub.dev/packages/flutter_lingman')
    })

  program
    .command('build1')
    .description('更新build版本号')
    .action(() => {
      updateBuildVersion(config.url)
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
      gitPushAll(`${messageTypes['发版']}ios`)
    })

  program
    .command('android')
    .description('打包android应用')
    .action(() => {
      gitPushAll(`${messageTypes['发版']}android`)
    })

  program
    .command('web')
    .description('打包web应用')
    .action(() => {
      gitPushAll(`${messageTypes['发版']}web`)
    })

  program
    .command('release')
    .description('同时打包ios android应用')
    .action(() => {
      gitPushAll(`${messageTypes['发版']}release`)
    })

  program
    .command('icon')
    .description('跳转到icon界面')
    .action(() => {
      openInBrowser('https://fonts.google.com/icons?selected=Material+Icons&icon.platform=flutter')
    })
}
