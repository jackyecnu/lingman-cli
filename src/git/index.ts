import { execSync } from 'child_process'

export function gitPush() {
  execSync('git add .', { stdio: 'inherit' })
  execSync('git commit -m "提交"', { stdio: 'inherit' })
  execSync('git push', { stdio: 'inherit' })
}
