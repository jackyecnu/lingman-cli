import fs from 'node:fs'
import path from 'node:path'
import chalk from 'chalk'
import { XMLParser } from 'fast-xml-parser'

export function replacePackageName(packageName: string) {
  console.log('replacePackageName', packageName)

  // 检查包名是否合法
  if (!packageName) {
    console.log(chalk.bold.red('包名不能为空'))
    process.exit(1)
  }

  if (!/^[a-z]+(\.[a-z]+)+$/.test(packageName)) {
    console.log(chalk.bold.red('包名不合法'))
    process.exit(1)
  }

  const groupId = packageName.split('.').slice(0, -1).join('.')
  const artifactId = packageName.split('.').slice(-1)[0]

  const pomPath = path.resolve(process.cwd(), 'pom.xml')

  // 获取当前包名
  const parser = new XMLParser()
  const data = fs.readFileSync(pomPath, 'utf-8')
  const json = parser.parse(data) as any

  const curGroupId = json.project.groupId
  const curArtifactId = json.project.artifactId
  const currentPackageName = `${curGroupId}.${curArtifactId}`

  if (currentPackageName === packageName) return

  // 第一步 pom.xml替换包名
  const newPom = data.replace(`<groupId>${curGroupId}</groupId>`, `<groupId>${groupId}</groupId>`)
    .replace(`<artifactId>${curArtifactId}</artifactId>`, `<artifactId>${artifactId}</artifactId>`)
    .replace(`<name>${curArtifactId}</name>`, `<name>${artifactId}</name>`)
    .replace(`<description>${curArtifactId}</description>`, `<description>${artifactId}</description>`)

  fs.writeFileSync(pomPath, newPom)

  // 第二步 修改文件夹名称 src/main/java/**
  const currentDirList = currentPackageName.split('.')
  const newDirList = packageName.split('.')

  const changeDirList = [path.resolve(process.cwd(), 'src/main/java'), path.resolve(process.cwd(), 'src/test/java')]

  for (const changeDir of changeDirList) {
    const contentDir = path.resolve(changeDir, ...currentDirList)
    const targetDir = path.resolve(changeDir, ...newDirList)
    const tempDir = path.resolve(changeDir, '__temp__')

    // 把contentDir下所有文件夹和文件移动到tempDir
    fs.mkdirSync(tempDir, { recursive: true })
    fs.readdirSync(contentDir).forEach((file) => {
      fs.renameSync(path.resolve(contentDir, file), path.resolve(tempDir, file))
    })
    // 删除contentDir
    fs.rmdirSync(contentDir, { recursive: true })

    // 创建文件夹
    fs.mkdirSync(targetDir, { recursive: true })

    // 把tempDir下所有文件夹和文件移动到targetDir
    fs.readdirSync(tempDir).forEach((file) => {
      fs.renameSync(path.resolve(tempDir, file), path.resolve(targetDir, file))
    })
    // 删除tempDir
    fs.rmdirSync(tempDir, { recursive: true })

    deleteEmptyDir(path.resolve(changeDir, '..'), [targetDir])
  }

  // 第三步 递归修改文件内容
  replacePackageNameInDir(process.cwd(), currentPackageName, packageName, [pomPath])
}

function replacePackageNameInDir(filePath: string, oldStr: string, newStr: string, excludes: string[]) {
  const files = fs.readdirSync(filePath)
  for (const file of files) {
    const curPath = path.resolve(filePath, file)
    const stat = fs.statSync(curPath)
    if (stat.isDirectory()) {
      replacePackageNameInDir(curPath, oldStr, newStr, excludes)
    }
    else {
      if (!excludes.includes(curPath)) {
        const content = fs.readFileSync(curPath, 'utf-8')
        const newContent = content.replace(new RegExp(oldStr, 'g'), newStr)
        fs.writeFileSync(curPath, newContent)
      }
    }
  }
}

function deleteEmptyDir(dir: string, excludes: string[]) {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.resolve(dir, file)

    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      if (!excludes.includes(filePath))
        deleteEmptyDir(filePath, excludes)
    }
  }

  if (files.length === 0)
    deleteDir(dir)
}

// 删除文件夹，删除完成后，如果父文件夹也是空的，删除父文件夹
function deleteDir(dir: string) {
  const parentDir = path.resolve(dir, '..')
  fs.rmdirSync(dir)
  if (fs.readdirSync(parentDir).length === 0)
    deleteDir(parentDir)
}
