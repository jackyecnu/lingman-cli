import { execSync } from 'node:child_process'

export function runShell(command: string) {
  execSync(command, { stdio: 'inherit' })
}
