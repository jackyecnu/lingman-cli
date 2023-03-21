import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import axios from 'axios'

const tokenPath = path.resolve(__dirname, './token.txt')
const userPath = path.resolve(__dirname, './user.json')

export function saveToken(token: string): string {
  fs.writeFileSync(tokenPath, token)
  return token
}

export function getToken(): string {
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
        axios.get('https://git.lingman.tech:1235/api/account/info', { headers: { token } }).then((res) => {
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
