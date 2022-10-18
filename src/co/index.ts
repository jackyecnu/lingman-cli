/* eslint-disable no-extend-native */
import fs from 'fs'
import chalk from 'chalk'

export function createController(config, args: string[]) {
  const { ApiPath, BLLPath, ModelPath } = config.co
  if (!ApiPath) return console.log(chalk.red('缺少ApiPath配置'))
  if (!BLLPath) return console.log(chalk.red('缺少BLLPath配置'))
  if (!ModelPath) return console.log(chalk.red('缺少ModelPath配置'))
  if (args.length === 0) {
    console.log('\x1B[33m%s\x1B[0m', '需要传入Controller参数')
    return
  }
  Object.defineProperty(String.prototype, 'capitalize', {
    value() {
      return this.charAt(0).toUpperCase() + this.slice(1)
    },
    enumerable: false,
  })

  const nameArr = args[0].split('.')
  // @ts-expect-error xxx
  const class_name = nameArr[nameArr.length - 1].capitalize()
  nameArr.pop()

  // @ts-expect-error xxx
  const namespace_dot = nameArr.reduce((pre, cur) => `${pre}.${cur.capitalize()}`, '')
  // @ts-expect-error xxx
  const namespace_slash = nameArr.reduce((pre, cur) => `${pre}/${cur.capitalize()}`, '')

  const controllerFile = `using ${BLLPath}.Service${namespace_dot};
using Microsoft.AspNetCore.Mvc;
using NAutowired.Core.Attributes;
${args[0].includes('.') ? `using ${ApiPath}.Controllers;` : ''}

namespace ${ApiPath}.Controllers${namespace_dot}
{
    [Route("api${namespace_slash.toLowerCase()}/${class_name.toLowerCase()}")]
    public class ${class_name}Controller : BaseController
    {
        private new DemonSession session
        { get { return (DemonSession)base.session; } }

        [Autowired]
        private readonly ${class_name}Service currentService; 
    }
}
`

  fs.writeFile(`${ApiPath}/Controllers${namespace_slash}/${class_name}Controller.cs`, controllerFile, { flag: 'wx' }, (err) => {
    if (err) throw err
    console.log('File is created successfully.')
  })

  const serviceFile = `using AutoMapper;
using ${BLLPath}.Service;
using Microsoft.Extensions.Caching.Distributed;
using NAutowired.Core.Attributes; 

namespace ${BLLPath}.Service${namespace_dot}
{
    [Service]
    public class ${class_name}Service : BaseService
    {
        private new DemonSession session
        { get { return (DemonSession)base.session; } } 
    }
}
`

  fs.writeFile(`${BLLPath}/Service${namespace_slash}/${class_name}Service.cs`, serviceFile, { flag: 'wx' }, (err) => {
    if (err) throw err
    console.log('File is created successfully.')
  })
}
