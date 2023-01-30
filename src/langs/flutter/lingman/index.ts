import path from 'path'
import fs from 'fs'
import axios from 'axios'
import chalk from 'chalk'
import { runCmd } from '../../../common/runcmd'

export async function updateLingmanVersionForFlutter() {
  const res = await axios.get('https://pub.flutter-io.cn/api/documentation/flutter_lingman')
  const { latestStableVersion } = res.data
  console.log(chalk.bold.yellow(`最新版本: ${latestStableVersion}`))

  const pubspecPath = path.resolve(process.cwd(), 'pubspec.yaml')

  const pubspec = fs.readFileSync(pubspecPath, 'utf-8')

  const reg = /flutter_lingman:\s+\^?(.*)[\r\n]+/

  if (!reg.test(pubspec)) {
    // const newPubspec = pubspec.replace('dependencies:\r\n', `dependencies:\r\n  flutter_lingman: ${latestStableVersion}\r\n\r\n`)
    // fs.writeFileSync(pubspecPath, newPubspec)
    // runCmd('flutter pub get')
    runCmd('flutter pub add flutter_lingman')
    console.log(chalk.bold.green('更新成功'))

    return
  }

  const currentVersion = pubspec.match(reg)[1]

  if (latestStableVersion !== currentVersion) {
    const newPubspec = pubspec.replace(reg, `flutter_lingman: ${latestStableVersion}\r\n\r\n`)
    fs.writeFileSync(pubspecPath, newPubspec)
    runCmd('flutter pub get')
    console.log(chalk.bold.green('更新成功'))
  }
  else {
    console.log(chalk.bold.yellow('已经是最新版本'))
  }
}
