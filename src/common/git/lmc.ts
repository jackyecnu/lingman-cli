import process from 'node:process'
import { checkGitMessage } from '.'

const message = process.argv.slice(2).join(' ')

checkGitMessage(message)
