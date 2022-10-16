import { execSync } from 'child_process'

export function update() {
  execSync('npm install -g lingman-pub', { stdio: 'inherit' })
}
