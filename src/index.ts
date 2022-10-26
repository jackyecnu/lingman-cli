import fs from 'fs'
import path from 'path'
import { Command } from 'commander'

import { checkVersion } from './utils/checkVersion'
import { langCommon, langDotnet, langFlutter, langUniapp } from './lang'

const program = new Command()

const configPath = path.resolve(process.cwd(), 'lingman.config.js')

let config = { lang: '', co: {}, initConfig: {} } as any

if (fs.existsSync(configPath)) config = require(configPath)

export default async function () {
  switch (config.lang) {
    case 'dotnet':
      langDotnet(program, config)
      break
    case 'flutter':
      langFlutter(program, config)
      break
    case 'uniapp':
      langUniapp(program, config)
      break
  }
  langCommon(program, config)
  program.parse()
  checkVersion()
}
