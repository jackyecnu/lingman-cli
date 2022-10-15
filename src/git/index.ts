import { execSync } from 'child_process'

export function gitPush(message) {
  execSync('git add .', { stdio: 'inherit' })
  execSync(`git commit -m "${message || '提交'}"`, { stdio: 'inherit' })
  execSync('git push', { stdio: 'inherit' })
}
