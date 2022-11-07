import { execSync } from 'child_process'
import chalk from 'chalk'

export async function gitPush(message, args: string[] = []) {
  const res = execSync('git status', { stdio: 'pipe' }).toString().trim()
  const currentBranch = res.match(/On branch (.*)/)[1]

  const pullCount = res.match(/Your branch is behind/g)?.length || 0
  const pushCount = res.match(/Your branch is ahead/g)?.length || 0
  const pullCountNum = res.match(/Your branch is behind '.*' by (\d+) commit/)?.[1] || 0
  const pushCountNum = res.match(/Your branch is ahead of '.*' by (\d+) commit/)?.[1] || 0

  if (pullCount > 0) {
    console.log(`当前分支 ${chalk.bold.yellow(currentBranch)} 距离远程分支 ${chalk.bold.yellow(currentBranch)} 有 ${chalk.bold.yellow(pullCountNum)} 个拉取, 请先执行 ${chalk.bold.yellow('git pull')}`)
    return
  }

  if (pushCount > 0) {
    console.log(`当前分支 ${chalk.bold.yellow(currentBranch)} 距离远程分支 ${chalk.bold.yellow(currentBranch)} 有 ${chalk.bold.yellow(pushCountNum)} 个提交, 请先执行 ${chalk.bold.yellow('git push')}`)
    return
  }

  try {
    execSync('git add .', { stdio: 'inherit' })

    if (args[0] === 'no')
      execSync('git commit -m "nobuild"', { stdio: 'inherit' })
    else
      execSync(`git commit -m "${message || '提交'}"`, { stdio: 'inherit' })
    execSync('git push', { stdio: 'inherit' })
  }
  catch (err) {
    console.log(`${chalk.bold.red('运行出错')}`)
  }
}
