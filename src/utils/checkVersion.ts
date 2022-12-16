import { execSync } from 'child_process'
import chalk from 'chalk'
import { version } from '../../package.json'

export function checkVersion() {
  if (process.argv[2] === 'u') return

  const latest_version = execSync('pnpm view lingman-cli version --registry https://registry.npmmirror.com', { stdio: 'pipe' }).toString().trim()
  if (latest_version !== version)
    console.log(`有新版本更新啦! 输入: ${chalk.bold.yellow('lm u')} 更新到最新版`)
}
