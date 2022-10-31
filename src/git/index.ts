import { execSync } from 'child_process'

export function gitPush(message) {
  execSync('git add .', { stdio: 'inherit' })
  if (message === 'no')
    execSync('git commit -m "nobuild"', { stdio: 'inherit' })
  else
    execSync(`git commit -m "${message || '提交'}"`, { stdio: 'inherit' })
  execSync('git push', { stdio: 'inherit' })
}
