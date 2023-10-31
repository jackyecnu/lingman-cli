import os from 'node:os'
import path from 'node:path'
import fs from 'node:fs'

export function getHomeDir() {
  const homeDir = path.resolve(os.homedir(), './.lingman')

  if (!fs.existsSync(homeDir))
    fs.mkdirSync(homeDir)
  return homeDir
}
