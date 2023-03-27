import chalk from 'chalk'
import axios from 'axios'
import inquirer from 'inquirer'
import { checkLogin, clearToken, clearUser, getUser, saveToken } from '../../utils/user'

export async function login() {
  await inquirer.prompt([
    {
      type: 'input',
      message: '请输入用户名 ?',
      name: 'account',
    },
    {
      type: 'password',
      message: '请输入密码 ?',
      name: 'password',
    },
  ]).then(async (answers) => {
    const res = await axios.post('https://api.lingman.tech/api/account/login_account', answers)
    if (res.data.code === 1) {
      saveToken(res.data.data)
      console.log(chalk.green.bold('登录成功'))
    }
    else {
      console.log(chalk.bold.red(res.data.message ?? '登录失败'))
    }
  })
}

export async function me() {
  await checkLogin()
  console.log(chalk.green.bold(getUser()))
}

export async function logout() {
  clearToken()
  clearUser()
  console.log(chalk.green.bold('退出成功'))
}
