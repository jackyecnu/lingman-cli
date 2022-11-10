import fs from 'fs'
import axios from 'axios'
import chalk from 'chalk'
import { XMLParser } from 'fast-xml-parser'

export async function updateLingmanVersionForJava() {
  const { data } = await axios.get('http://it.lingman.tech:8081/repository/maven-releases/com/lingman/tool/maven-metadata.xml')

  const parser = new XMLParser()
  const json = parser.parse(data)

  const releaseStableVersion = json.metadata.versioning.release

  const rootPath = process.cwd()

  // 遍历所有pom.xml文件
  const pomFiles = await findPomFiles(rootPath)

  for (const pomFile of pomFiles) {
    const pom = fs.readFileSync(pomFile, 'utf-8')

    const reg = /<groupId>com.lingman<\/groupId>\s+<artifactId>tool<\/artifactId>\s+<version>(.*)<\/version>/

    if (reg.test(pom)) {
      const currentVersion = pom.match(reg)[1]
      const oldString = pom.match(reg)[0]
      if (currentVersion !== releaseStableVersion) {
        const newPom = pom.replace(reg, oldString.replace(currentVersion, releaseStableVersion))
        fs.writeFileSync(pomFile, newPom)
        console.log(chalk.bold.green(`更新成功: ${pomFile}`))
      }
    }
  }
}

async function findPomFiles(rootPath: string) {
  // 需要排除的文件夹
  const exclude = ['node_modules']

  const files = await fs.promises.readdir(rootPath)

  const pomFiles: string[] = []

  for (const file of files) {
    if (exclude.includes(file))
      continue

    const filePath = `${rootPath}/${file}`

    const stat = await fs.promises.stat(filePath)

    if (stat.isDirectory()) {
      const subPomFiles = await findPomFiles(filePath)
      pomFiles.push(...subPomFiles)
    }
    else if (file === 'pom.xml') {
      pomFiles.push(filePath)
    }
  }

  return pomFiles
}
