import path from 'path'
import fs from 'fs'
import axios from 'axios'
import chalk from 'chalk'
import { checkLogin } from '../../../utils/user'

export async function updateBuildVersion(project: string, args: string[]) {
  if (args.length !== 0) {
    console.log(chalk.bold.red('传入参数有问题'))
    process.exit(1)
  }

  await checkLogin()
  const res = await axios.get(`https://api.lingman.tech/api/version/flutter/private/${project}/${args[0]}`)
  const { data } = res.data

  const pubspecPath = path.resolve(process.cwd(), 'pubspec.yaml')

  const pubspec = fs.readFileSync(pubspecPath, 'utf-8')

  const reg = /version:\s+\d+\.\d+\.\d+(\+\d+)?/

  fs.writeFileSync(pubspecPath, pubspec.replace(reg, (match, build) => {
    if (!build) return `${match}+${data}`
    return match.replace(/\d+$/, data.toString())
  }))
}
