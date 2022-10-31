import { execSync } from 'child_process'

export async function gitPush(message, args: string[]) {
  await execSync('nothing to commit', { stdio: 'inherit' })
  // if (res.toString().includes('nothing to commit'))
  //   console.log(`错误：${chalk.yellow('无更新')}`)
  try {
    execSync('git add .', { stdio: 'inherit' })
    if (args[0] === 'no')
      execSync('git commit -m "nobuild"', { stdio: 'inherit' })
    else
      execSync(`git commit -m "${message || '提交'}"`, { stdio: 'inherit' })
    execSync('git push', { stdio: 'inherit' })
  }
  catch (err) {
    console.log('output', err)
    console.log('sdterr', err.stderr.toString())
  }
}
