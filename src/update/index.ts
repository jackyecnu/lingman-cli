import { execSync } from 'child_process'

export function update() {
  execSync('lm -v', { stdio: 'inherit' })
  execSync('npm install -g lingman-pub', { stdio: 'inherit' })
  execSync('lm -v', { stdio: 'inherit' })
  console.log('淘宝源同步： https://www.npmmirror.com/package/lingman-pub')
}
