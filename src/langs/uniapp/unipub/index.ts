import { join, resolve } from 'node:path'
import fs from 'fs-extra'
import axios from 'axios'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { runCmd } from '../../../common/runcmd'
// import FormData from 'form-data'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const FormData = require('form-data')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ci = require('miniprogram-ci')

export async function unipub(para, args: string[]) {
  // 请选择发布版本
  const notifyUrl = 'https://api-lmapp.lingman.tech/api/public/programpublish'
  // 请输入发布国家
  let type = ''
  let location = ''
  if (args.length === 0) {
    console.log(chalk.bold.blue('请输入需要发布的版本'))
    const arr = ['wx', 'wgt_dev', 'wgt_pro', 'wx_wgt_dev', 'wx_wgt_pro']
    const choose = await inquirer.prompt([
      {
        type: 'rawlist',
        message: '请选择 ?',
        name: 'type',
        choices: arr.map(i => ({
          name: i,
          value: i,
        })),
      },
    ])
    type = choose.type
    location = 'cn'
  }
  else {
    type = args[0]
    location = args.length > 1 ? args[1] : 'cn'
  }

  switch (type) {
    case 'wx':
      wx()
      break
    case 'wgt_dev':
      wgt_dev()
      break
    case 'wgt_pro':
      wgt_pro()
      break
    case 'wx_wgt_dev':
      wx()
      wgt_dev()
      break
    case 'wx_wgt_pro':
      wx()
      wgt_pro()
      break
    default:
      return console.log(chalk.bold.red('缺少发布类型'))
  }

  function wgt_dev() {
    // 删除文件
    fs.removeSync(resolve(process.cwd(), para.wgtPath))
    const filePath = join(process.cwd(), './src/manifest.json')
    const versionName = `0.0.${Math.floor(new Date().getTime() / 1000)}`
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) throw err
      // "versionName" : "1.4.6",
      const newData = data.replace(
        /\"versionName\"\s*:\s*\"(\d+).(\d+).(\d+)\"/,
        () => {
          return `\"versionName\" : \"${versionName}\"`
        },
      )
      if (!newData.includes(`\"${versionName}\"`)) {
        axios.get(
          encodeURI(`${notifyUrl}/${para.projectName}wgt打包失败,版本号无增加`),
        )
        return
      }

      console.log(`=================================${versionName}`)
      //  console.log(newData)

      fs.writeFileSync(filePath, newData, { encoding: 'utf8', flag: 'w+' })

      runCmd(
        `cli publish --platform APP --type wgt --project ${para.uniappProjectName}`,
        'cmd',
      )

      const url = `${para.policyfile}/${location}/${para.projectId}`

      // const json = fs.readFileSync('src/manifest.json').toString()

      // const appid = JSON.parse(json.replace(/\/\*.+\*\//g, ""))['mp-weixin'].appid

      // todo 判断文件是否生成，不生成就报错

      try {
        fs.accessSync(resolve(process.cwd(), para.wgtPath))
      }
      catch (error) {
        console.log(error)
        axios.get(encodeURI(`${notifyUrl}/${para.projectName}wgt打包失败`))
        return
      }

      axios
        .get(url)
        .then(async (data) => {
          const resp = data.data.data
          console.log(resp)
          const filename = `${resp.dir + para.projectId}-dev.wgt`
          console.log(filename)
          // 上传文件到服务器
          const formData = new FormData()
          formData.append('key', filename)
          formData.append('policy', resp.policy)
          formData.append('OSSAccessKeyId', resp.accessid)
          formData.append('success_action_status', '200')
          formData.append('signature', resp.signature)
          formData.append(
            'file',
            fs.createReadStream(resolve(process.cwd(), para.wgtPath)),
          )

          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
          axios
            .post(resp.host, formData, config)
            .then(() => {
              // 修改版本号
              axios.post(para.saveVersionUrl, {
                version: versionName,
                id: para.projectId,
                env: 'dev',
                region: location,
              })
              axios.get(
                encodeURI(
                  `${notifyUrl}/${para.projectName}wgt ${versionName} 发布成功`,
                ),
              )
            })
            .catch((error) => {
              console.log('===================================')
              console.log(error)
              axios.get(
                encodeURI(`${notifyUrl}/${para.projectName}wgt发布失败`),
              )
            })
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }

  function wgt_pro() {
    // 删除文件
    fs.removeSync(resolve(process.cwd(), para.wgtPath))
    const filePath = join(process.cwd(), './src/manifest.json')
    let versionName = ''
    axios
      .get(`${para.getVersionUrl}/${location}/${para.projectId}`)
      .then((data) => {
        if (data.data.code !== 1) {
          axios.get(
            encodeURI(`${notifyUrl}/${para.projectName}wgt版本获取失败`),
          )
          return
        }
        versionName = data.data.data.replace(
          /(\d+).(\d+).(\d+)/,
          (a, b, c, d) => {
            const newVersion = parseInt(d) + 1
            return `${b}.${c}.${newVersion}`
          },
        )
        console.log(versionName)
        fs.readFile(filePath, 'utf-8', (err, data) => {
          if (err) throw err
          // "versionName" : "1.4.6",

          const newData = data.replace(
            /\"versionName\"\s*:\s*\"(\d+).(\d+).(\d+)\"/,
            () => {
              return `\"versionName\" : \"${versionName}\"`
            },
          )

          if (!newData.includes(`\"${versionName}\"`)) {
            axios.get(
              encodeURI(
                `${notifyUrl}/${para.projectName}wgt打包失败,版本号无增加`,
              ),
            )
            return
          }

          fs.writeFileSync(filePath, newData, { encoding: 'utf8', flag: 'w+' })

          runCmd(
            `cli publish --platform APP --type wgt --project ${para.uniappProjectName}`,
            'cmd',
          )

          const url = `${para.policyfile}/${location}/${para.projectId}`

          // const json = fs.readFileSync('src/manifest.json').toString()

          // todo 判断文件是否生成，不生成就报错

          try {
            fs.accessSync(resolve(process.cwd(), para.wgtPath))
          }
          catch (error) {
            console.log(error)
            axios.get(encodeURI(`${notifyUrl}/${para.projectName}wgt打包失败`))
            return
          }

          axios
            .get(url)
            .then(async (data) => {
              const resp = data.data.data

              const filename = `${resp.dir + para.projectId}.wgt`

              // 上传文件到服务器
              const formData = new FormData()
              formData.append('key', filename)
              formData.append('policy', resp.policy)
              formData.append('OSSAccessKeyId', resp.accessid)
              formData.append('success_action_status', '200')
              formData.append('signature', resp.signature)
              formData.append(
                'file',
                fs.createReadStream(resolve(process.cwd(), para.wgtPath)),
              )

              const config = {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
              axios
                .post(resp.host, formData, config)
                .then(() => {
                  // 修改版本号

                  axios.post(para.saveVersionUrl, {
                    version: versionName,
                    id: para.projectId,
                    env: 'pro',
                    region: location,
                  })
                  axios.get(
                    encodeURI(
                      `${notifyUrl}/${para.projectName}wgt ${versionName} 发布成功`,
                    ),
                  )
                })
                .catch((error) => {
                  console.log(error)
                  axios.get(
                    encodeURI(`${notifyUrl}/${para.projectName}wgt发布失败`),
                  )
                })
            })
            .catch((err) => {
              console.log(err)
            })
        })
      })
  }

  function wx() {
    const filePath = join(process.cwd(), './src/manifest.json')
    const json = fs.readFileSync(filePath).toString()
    const appid = JSON.parse(json.replace(/\/\*.+\*\//g, ''))['mp-weixin']
      .appid
    if (!appid) {
      axios.get(
        encodeURI(`${notifyUrl}/${para.projectName}小程序发布失败没有appId`),
      )
      throw new Error('请填写appid')
    }
    const desc = '提交'
    runCmd('pnpm build:mp-weixin')
    ci.upload({
      project: new ci.Project({
        appid,
        type: 'miniProgram',
        projectPath: resolve(process.cwd(), 'dist/build/mp-weixin'),
        privateKeyPath: resolve(process.cwd(), `private.${appid}.key`),
        ignores: ['node_modules/**/*'],
      }),
      version: `1.0.${Math.floor(new Date().getTime() / 1000)}`,
      desc,
      setting: { es6: true, es7: true },
    })
      .then(() => {
        axios.get(encodeURI(`${notifyUrl}/${para.projectName}小程序发布成功`))
      })
      .catch((e) => {
        console.log(e)
        axios.get(encodeURI(`${notifyUrl}/${para.projectName}小程序发布失败`))
      })
  }
}
