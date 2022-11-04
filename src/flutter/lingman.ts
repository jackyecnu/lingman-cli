import path from 'path'
import fs from 'fs'
import axios from 'axios'
import chalk from 'chalk'
import { runCmd } from '../common/runcmd'

export async function updateLingmanVersion() {
  const res = await axios.get('https://pub.flutter-io.cn/api/documentation/flutter_lingman')
  const { latestStableVersion } = res.data

  const pubspecPath = path.resolve(process.cwd(), 'pubspec.yaml')

  const pubspec = fs.readFileSync(pubspecPath, 'utf-8')

  const reg = /flutter_lingman:\s+\^?(.*)[\r\n]+/

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
