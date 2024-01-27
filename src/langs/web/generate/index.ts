import fs from 'node:fs'
import path from 'node:path'
import axios from 'axios'

// 首字母大写
function firstUpperCase(str) {
  return str.replace(/^\S/, s => s.toUpperCase())
}

export async function generateApi(docsAddress, outDir) {
  const fileName = 'sync.ts'

  if (!fs.existsSync(outDir))
    fs.mkdirSync(outDir)

  const outFile = path.resolve(outDir, fileName)

  const res = await axios.get(docsAddress)

  const paths = res.data.paths || {}

  let api = ''

  if (fs.existsSync(outFile))
    api = fs.readFileSync(outFile, 'utf-8') || ''

  if (api) {
    api = api.trim()
    api += '\r\n\r\n'
  }

  const regex = /'([^']*)'/g
  const matches = [...api.matchAll(regex)]

  const contentArray = matches.map(match => match[1])

  for (const key in paths) {
    const item = paths[key]
    const requestType = item.post ? 'post' : 'get'

    if (contentArray.includes(key)) continue

    if (item[requestType].summary) {
      api += `// ${item[requestType].summary}`
      api += '\r\n'
    }

    api += `export const ${item[requestType].operationId} = data => ${firstUpperCase(requestType)}('${key}', data)`
    api += '\r\n\r\n'
  }

  fs.writeFileSync(outFile, api)

  return api
}
