import { execSync } from 'child_process'
import chalk from 'chalk'
import inquirer from 'inquirer'

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
  const res = execSync('git status', { stdio: 'pipe' }).toString().trim()
  const currentBranch = res.match(/On branch (.*)/)[1]

  const isPull = res.match(/Your branch is behind '.*' by (\d+) commit/) || [0, 0]
  const isPush = res.match(/Your branch is ahead of '.*' by (\d+) commit/) || [0, 0]
  const pullCountNum = +isPull[1]
  const pushCountNum = +isPush[1]

  if (isPull[0] && pullCountNum > 0) {
    console.log(`当前分支 ${chalk.bold.yellow(currentBranch)} 距离远程分支 ${chalk.bold.yellow(currentBranch)} 有 ${chalk.bold.yellow(pullCountNum)} 个拉取, 请先执行 ${chalk.bold.yellow('git pull')}`)
    return
  }

  if (isPush[0] && pushCountNum > 0) {
    console.log(`当前分支 ${chalk.bold.yellow(currentBranch)} 距离远程分支 ${chalk.bold.yellow(currentBranch)} 有 ${chalk.bold.yellow(pushCountNum)} 个提交, 请先执行 ${chalk.bold.yellow('git push')}`)
    return
  }

  const choose = await inquirer.prompt([
    {
      type: 'rawlist',
      message: '请选择提交类型 ?',
      name: 'type',
      choices: [
        { name: '其他', value: '其他: ' },
        { name: '功能', value: '功能: ' },
        { name: '重构', value: '重构: ' },
        { name: '发版', value: '发版: ' },
      ],
    },
  ])

  if (choose.type === '发版: ') return gitPush(`${choose.type}release`)

  const message = await inquirer.prompt([
    {
      type: 'input',
      message: '请输入提交信息 ?',
      name: 'message',
    },
  ])

  gitPush(choose.type + message.message)
}
