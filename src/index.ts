import fs from 'node:fs'
import path from 'node:path'
import { Command } from 'commander'

import axios from 'axios'
import { langCommon, registerScripts } from './common'
import { langs } from './shared'
import { checkVersion } from './utils/checkVersion'
import { getToken } from './utils/user'

// axios 请求拦截
axios.interceptors.request.use((config) => {
  // 为请求头对象，添加 ToKen 验证的 Authorization 字段
  config.headers.token = getToken()
  // 必须 return
  return config
})

const program = new Command()

const configPath = path.resolve(process.cwd(), 'lingman.config.js')

let config = { lang: '', co: {}, initConfig: {} } as any

if (fs.existsSync(configPath)) config = require(configPath)

export default async function () {
  langs[config.lang] && langs[config.lang](program, config)

  langCommon(program, config)

  registerScripts(program, config)

  program.parse()

  checkVersion()
}
