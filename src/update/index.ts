import { execSync } from 'child_process'

export function update() {
  execSync('lm -v', { stdio: 'inherit' })
  execSync('pnpm install -g lingman-pub', { stdio: 'inherit' })
  execSync('lm -v', { stdio: 'inherit' })
  console.log('当前源:如果为淘宝源，则运行 lm taobao 去同步')
  execSync('npm get registry')

}
