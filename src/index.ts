import process from 'node:process'
import { Command } from 'commander'

import axios from 'axios'
import chalk from 'chalk'
import { langCommon, registerScripts } from './common'
import { langs } from './shared'
import { checkVersion } from './utils/checkVersion'
import { getToken } from './utils/user'
import { loadConfig } from './shared/config'

// axios 请求拦截
axios.interceptors.request.use((config) => {
  // 为请求头对象，添加 ToKen 验证的 Authorization 字段
  config.headers.token = getToken()
  // 必须 return
  return config
})

const program = new Command()

export default async function () {
  const { config } = await loadConfig<Config>()

  langs[config.lang] && langs[config.lang](program, config)

  langCommon(program, config)

  registerScripts(program, config)

  program.parse()

  checkVersion()
}

// 捕获全局异常
process.on('uncaughtException', (err) => {
  console.log(chalk.red('异常信息：', err.message))
})

// 捕获全局 Promise 异常
// process.on('unhandledRejection', (err) => {
//   console.error('unhandledRejection', err)
// })
