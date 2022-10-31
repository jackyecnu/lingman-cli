import { execSync } from 'child_process'

export async function gitPush(message) {
  await execSync('nothing to commit', { stdio: 'inherit' })
  // if (res.toString().includes('nothing to commit'))
  //   console.log(`错误：${chalk.yellow('无更新')}`)
  execSync('git add .', { stdio: 'inherit' })
  if (message === 'no')
    execSync('git commit -m "nobuild"', { stdio: 'inherit' })
  else
    execSync(`git commit -m "${message || '提交'}"`, { stdio: 'inherit' })
  execSync('git push', { stdio: 'inherit' })
}
