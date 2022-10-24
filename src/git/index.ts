import { execSync } from 'child_process'

export function gitPush(message, args: string[]) {
  execSync('git add .', { stdio: 'inherit' })
  if (args.length === 0)
    execSync(`git commit -m "${message || '提交'}"`, { stdio: 'inherit' })
  else if (args[0] === 'no')
    execSync('git commit -m "nobuild"', { stdio: 'inherit' })
  execSync('git push', { stdio: 'inherit' })
}
