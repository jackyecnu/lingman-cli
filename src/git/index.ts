import { execSync } from 'child_process'

export async function gitPush(message, args: string[]) {
  // if (res.toString().includes('nothing to commit'))
  //   console.log(`错误：${chalk.yellow('无更新')}`)
  try {
    execSync('git add .', { stdio: 'inherit' })
    console.log('output========gg')
    if (args[0] === 'no')
      execSync('git commit -m "nobuild"', { stdio: 'inherit' })
    else
      execSync(`git commit -m "${message || '提交'}"`, { stdio: 'inherit' })
    execSync('git push', { stdio: 'inherit' })
    console.log('output========ss')
  }
  catch (err) {
    console.log('output========', err)
    // console.log('sdterr', err.stderr.toString())
  }
}
