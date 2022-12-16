import path from 'path'
import fs from 'fs'

export function updateBuildVersion() {
  const pubspecPath = path.resolve(process.cwd(), 'pubspec.yaml')

  const pubspec = fs.readFileSync(pubspecPath, 'utf-8')

  const reg = /version:\s+\d+\.\d+\.\d+(\+\d+)?/

  fs.writeFileSync(pubspecPath, pubspec.replace(reg, (match, build) => {
    if (!build) return `${match}+1`
    return match.replace(/\d+$/, num => (+num + 1).toString())
  }))
}
