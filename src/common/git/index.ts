import { execSync } from 'child_process'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { runCmd } from '../runcmd'
import { messageTypes } from '../../shared'

export async function gitPush(message, args: string[] = []) {
  if (!message) {
    console.log(chalk.bold.red('请输入提交信息'))
    return
  }
  try {
    execSync('git add .', { stdio: 'inherit' })

    if (args[0] === 'no')
      execSync('git commit -m "nobuild"', { stdio: 'inherit' })
    else
      execSync(`git commit -m "${message}"`, { stdio: 'inherit' })
    execSync('git push', { stdio: 'inherit' })
  }
  catch (err) {
    console.log(`${chalk.bold.red('运行出错')}`)
  }
}

export async function chooseMessage() {
  if (checkGitStats()) return

  const choose = await inquirer.prompt([
    {
      type: 'rawlist',
      message: '请选择提交类型 ?',
      name: 'type',
      choices: Object.keys(messageTypes).map(item => ({ name: item, value: messageTypes[item] })),
    },
  ])

  if (choose.type === messageTypes['发版']) return gitPush(`${choose.type}release`)

  const message = await inquirer.prompt([
    {
      type: 'input',
      message: '请输入提交信息 ?',
      name: 'message',
    },
  ])

  gitPush(choose.type + message.message)
}

export async function checkGitMessage(message) {
  const reg = new RegExp(`^(${Object.values(messageTypes).join('|')}|chore)`)
  if (!reg.test(message)) {
    console.log(chalk.bold.red('提交信息格式错误, 请按照规范提交'))
    process.exit(1)
  }
  process.exit(0)
}

export function checkGitStats() {
  runCmd('git config core.hooksPath .gitHooks')

  runCmd('git fetch')

  const res = execSync('git status', { stdio: 'pipe' }).toString().trim()
  const currentBranch = res.match(/On branch (.*)/)[1]

  const isPull = res.match(/Your branch is behind '.*' by (\d+) commit/) || [0, 0]
  const isPush = res.match(/Your branch is ahead of '.*' by (\d+) commit/) || [0, 0]
  const pullCountNum = +isPull[1]
  const pushCountNum = +isPush[1]

  if (isPull[0] && pullCountNum > 0) {
    console.log(`当前分支 ${chalk.bold.yellow(currentBranch)} 距离远程分支 ${chalk.bold.yellow(currentBranch)} 有 ${chalk.bold.yellow(pullCountNum)} 个拉取, 请先执行 ${chalk.bold.yellow('git pull')}`)
    return true
  }

  if (isPush[0] && pushCountNum > 0) {
    console.log(`当前分支 ${chalk.bold.yellow(currentBranch)} 距离远程分支 ${chalk.bold.yellow(currentBranch)} 有 ${chalk.bold.yellow(pushCountNum)} 个提交, 请先执行 ${chalk.bold.yellow('git push')}`)
    return true
  }

  return false
}

export function gitPushAll(message) {
  if (checkGitStats()) return
  gitPush(message)
}
