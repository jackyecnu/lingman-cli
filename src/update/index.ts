import { execSync } from 'child_process'

export function update() {
  execSync('npm install -g lingman-pub', { stdio: 'inherit' })
  console.log('淘宝源同步： https://www.npmmirror.com/package/lingman-pub')
}
