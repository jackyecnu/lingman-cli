import fs from 'fs'
import path from 'path'
import { Command } from 'commander'

import { langCommon } from './common'
import { langs } from './shared'
import { checkVersion } from './utils/checkVersion'

const program = new Command()

const configPath = path.resolve(process.cwd(), 'lingman.config.js')

let config = { lang: '', co: {}, initConfig: {} } as any

if (fs.existsSync(configPath)) config = require(configPath)

export default async function () {
  langs[config.lang] && langs[config.lang](program, config)

  langCommon(program, config)

  program.parse()

  checkVersion()
}
