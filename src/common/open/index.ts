import process from 'node:process'
import { runCmd } from '../runcmd'

export function openInBrowser(url) {
  const cmd = process.platform === 'win32' ? `start '${url}'` : `open '${url}'`
  runCmd(cmd)
}
