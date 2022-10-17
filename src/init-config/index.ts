import path from 'path'
import fs from 'fs'
import axios from 'axios'

export function initConfig({ url, path: configPath }) {
  const targetPath = path.resolve(process.cwd(), configPath)
  axios.get(url).then(({ data }) => {
    // 写入配置文件
    fs.writeFileSync(targetPath, data, { encoding: 'utf-8' })
  })
}

