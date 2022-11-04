import axios from 'axios'
import chalk from 'chalk'
export async function checkOnlineAppVersion(config) {
  if (config['appVersion']) {
    const version = await axios.get(`https://api-lmapp.lingman.tech/api/Public/online_app_version/${config['appVersion']}`)

    console.log(`线上版本为:\r\n${version.data['market']}：${chalk.bold.green(`${version.data['version']}`)}`)
  }
  else {
    console.log(chalk.bold.red('不存在 lingman.config.js， 无法获取'))
  }
}
