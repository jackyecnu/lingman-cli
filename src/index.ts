import fs from 'fs'
import path from 'path'
import { Command } from 'commander'

import { checkVersion } from './utils/checkVersion'
import { langDotnet } from './donet'
import { langFlutter } from './flutter'
import { langUniapp } from './uniapp'
import { langCommon } from './common'

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
      langFlutter(program)
      break
    case 'uniapp':
      langUniapp(program, config)
      break
    case 'java'
      langJava(program, config)
      break
  }
  langCommon(program, config)
  program.parse()
  checkVersion()
}
