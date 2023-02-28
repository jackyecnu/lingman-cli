import fs from 'fs'

export async function updateDotnetBuildVersion(path) {
  const pubspecPath = path.resolve(process.cwd(), path)

  const pubspec = fs.readFileSync(pubspecPath, 'utf-8')

  const reg = /<Version>\d+\.\d+\.\d+<\/Version>/
  // const lastVersion = `${Math.floor(new Date().getTime() / 1000)}`
  fs.writeFileSync(pubspecPath, pubspec.replace(reg, (match) => {
    // if (!build) return `${match}+${data}`
    return match.replace(/\d+$/, '')
  }))
}
