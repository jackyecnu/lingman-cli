import fs from 'fs'
import path from 'path'

export async function updateDotnetBuildVersion(buildPath) {
  const pubspecPath = path.resolve(process.cwd(), buildPath)

  const pubspec = fs.readFileSync(pubspecPath, 'utf-8')

  const reg = /<Version>(\d+)\.(\d+)\.(\d+)<\/Version>/
  const lastVersion = `${Math.floor(new Date().getTime() / 1000)}`
  fs.writeFileSync(pubspecPath, pubspec.replace(reg, `<Version>$1.$2.${lastVersion}</Version>`))
}
