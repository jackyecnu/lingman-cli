import path from 'node:path'
import fs from 'node:fs'
import https from 'node:https'
import process from 'node:process'
import chalk from 'chalk'
import { XMLParser } from 'fast-xml-parser'
import { runCmd } from '../../../common/runcmd'
import { getHomeDir } from '../../../utils'

export async function syncDB(config, isNew: boolean) {
  const javaDir = path.join(getHomeDir(), 'java')
  if (!fs.existsSync(javaDir))
    fs.mkdirSync(javaDir)

  const outputFilePath = path.join(javaDir, 'db-generator.jar')

  const workDir = process.cwd()
  const db = config.db

  const dbGeneratorLink = db.link || 'https://198401.oss-cn-shanghai.aliyuncs.com/test/db-generator.jar'

  if (!fs.existsSync(outputFilePath) || isNew)
    await downloadDBGenerator(dbGeneratorLink, outputFilePath)

  if (!db) {
    console.log(chalk.bold.red('db 配置不存在'))
    process.exit(1)
  }

  if (!db.name) {
    console.log(chalk.bold.red('db.name 配置不存在'))
    process.exit(1)
  }

  if (!db.url) {
    console.log(chalk.bold.red('db.url 配置不存在'))
    process.exit(1)
  }

  if (!db.username) {
    console.log(chalk.bold.red('db.username 配置不存在'))
    process.exit(1)
  }

  if (!db.password) {
    console.log(chalk.bold.red('db.password 配置不存在'))
    process.exit(1)
  }

  const pomPath = path.resolve(workDir, 'pom.xml')

  if (!fs.existsSync(pomPath)) {
    console.log(chalk.bold.red('pom.xml 不存在, 无法识别包名'))
    process.exit(1)
  }

  const parser = new XMLParser()
  const data = fs.readFileSync(pomPath, 'utf-8')
  const json = parser.parse(data) as any

  const curGroupId = json.project.groupId
  const curArtifactId = json.project.artifactId
  const currentPackageName = `${curGroupId}.${curArtifactId}`

  const command = `java -jar ${outputFilePath} --project.path=${workDir} --project.relativePath=${currentPackageName} --db.name=${db.name} --db.url=${db.url} --db.username=${db.username} --db.password=${db.password}`

  runCmd(command)
}

function downloadDBGenerator(dbGeneratorLink, outputFilePath: string): Promise<void> {
  console.log(chalk.bold.green('开始下载db-generator.jar'))

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputFilePath)

    https.get(dbGeneratorLink, (response) => {
      response.pipe(file)

      file.on('finish', () => {
        file.close(() => {
          console.log(chalk.bold.green('文件下载完成.'))
          resolve()
        })
      })
    }).on('error', (err) => {
      fs.unlink(outputFilePath, () => {
        console.error(chalk.bold.red(`文件下载失败: ${err.message}`))
        reject(err)
      })
    })
  })
}
