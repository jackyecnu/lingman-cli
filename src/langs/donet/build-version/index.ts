import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import axios from 'axios'

export async function updateDotnetBuildVersion(build1) {
  const res = await axios.get(build1.url)

  const targetPath = path.resolve(process.cwd(), build1.path)

  const content = fs.readFileSync(targetPath, 'utf-8')

  const reg = /<Version>(\d+)\.(\d+)\.(\d+)<\/Version>/

  fs.writeFileSync(targetPath, content.replace(reg, `<Version>$1.$2.${res.data.data}</Version>`))
}
