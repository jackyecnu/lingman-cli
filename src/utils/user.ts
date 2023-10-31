import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import process from 'node:process'
import chalk from 'chalk'
import axios from 'axios'

if (!fs.existsSync(path.resolve(os.homedir(), './.lingman')))
  fs.mkdirSync(path.resolve(os.homedir(), './.lingman'))

const tokenPath = path.resolve(os.homedir(), './.lingman/token.txt')
const userPath = path.resolve(os.homedir(), './.lingman/user.json')

export function saveToken(token: string): string {
  fs.writeFileSync(tokenPath, token)
  return token
}

export function getToken(): string {
  if (!fs.existsSync(tokenPath))
    return ''

  return fs.readFileSync(tokenPath, 'utf-8')
}

export function clearToken(): void {
  fs.unlinkSync(tokenPath)
}

export function saveUser(user: string): string {
  fs.writeFileSync(userPath, user)
  return user
}

export function getUser(): string {
  return JSON.stringify(JSON.parse(fs.readFileSync(userPath, 'utf-8')), null, 4)
}

export function clearUser() {
  fs.unlinkSync(userPath)
}

export async function checkLogin() {
  return new Promise((resolve) => {
    if (!fs.existsSync(tokenPath)) {
      console.log(chalk.bold.red('请先登录'))
      process.exit(1)
    }
    else {
      const token = getToken()
      if (!token) {
        console.log(chalk.bold.red('请先登录'))
        process.exit(1)
      }
      else {
        axios.get('https://api.lingman.tech/api/account/info', { headers: { token } }).then((res) => {
          if (res.data.code === 1) {
            saveUser(JSON.stringify(res.data.data))
            resolve(res.data.data)
          }
          else {
            console.log(chalk.bold.red('请先登录'))
            process.exit(1)
          }
        }).catch(() => {
          console.log(chalk.bold.red('请先登录'))
          process.exit(1)
        })
      }
    }
  })
}
