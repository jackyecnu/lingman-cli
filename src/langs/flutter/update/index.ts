import path from 'path'
import fs from 'fs'
import axios from 'axios'

export async function updateBuildVersion(url) {
  const res = await axios.get(url)
  const { data } = res.data

  const pubspecPath = path.resolve(process.cwd(), 'pubspec.yaml')

  const pubspec = fs.readFileSync(pubspecPath, 'utf-8')

  const reg = /version:\s+\d+\.\d+\.\d+(\+\d+)?/

  fs.writeFileSync(pubspecPath, pubspec.replace(reg, (match, build) => {
    if (!build) return `${match}+${data}`
    return match.replace(/\d+$/, data.toString())
  }))
}
