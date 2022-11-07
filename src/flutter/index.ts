import { gitPush } from '../common/git'
import { runCmd } from '../common/runcmd'
import { updateLingmanVersion } from './lingman'

export function langFlutter(program) {
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
      updateLingmanVersion()
      // openInBrowser('https://pub.dev/packages/flutter_lingman')
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
    .command('web')
    .description('打包web应用')
    .action(() => {
      gitPush('web')
    })

  program
    .command('release')
    .description('同时打包ios android应用')
    .action(() => {
      gitPush('release')
    })
}
