/* eslint-disable no-extend-native */
import fs from 'node:fs'
import chalk from 'chalk'

export function createController(config, args: string[]) {
  const basePackage = config.co
  if (!basePackage)
    return console.log(chalk.bold.red('缺少base package配置'))
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
  const namespace_dot = nameArr.reduce((pre, cur) => `${pre}.${cur.capitalize()}`, '').toLowerCase()
  // @ts-expect-error xxx
  const namespace_slash = nameArr.reduce((pre, cur) => `${pre}/${cur.capitalize()}`, '').toLowerCase()

  let folderPath = `src/main/java/${basePackage.replace(/\./g, '/')}/controllers/${namespace_slash}`
  // 创建目标文件夹（如果它不存在）
  if (!fs.existsSync(folderPath))
    fs.mkdirSync(folderPath, { recursive: true })
  folderPath = `src/main/java/${basePackage.replace(/\./g, '/')}/services/${namespace_slash}`
  // 创建目标文件夹（如果它不存在）
  if (!fs.existsSync(folderPath))
    fs.mkdirSync(folderPath, { recursive: true })

  const controllerFile = `package ${basePackage}.controllers${namespace_dot};
import ${basePackage}.services${namespace_dot}.${class_name}Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.lm.tools.R;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.tags.Tag;
import ${basePackage}.controllers.BaseController;

@RestController
@RequestMapping("/api${namespace_slash.toLowerCase()}/${class_name.toLowerCase()}")
@Tag(name = "${class_name}Controller", description = "xx")
public class ${class_name}Controller extends BaseController {

    @Autowired
    private ${class_name}Service currentService;
}
`

  fs.writeFile(`src/main/java/${basePackage.replace(/\./g, '/')}/controllers/${namespace_slash}/${class_name}Controller.java`, controllerFile, { flag: 'wx' }, (err) => {
    if (err)
      throw err
    console.log('File is created successfully.')
  })

  const serviceFile = `package ${basePackage}.services${namespace_dot};

import org.springframework.stereotype.Service;


@Service
public class ${class_name}Service {
}
`

  fs.writeFile(`src/main/java/${basePackage.replace(/\./g, '/')}/services/${namespace_slash}/${class_name}Service.java`, serviceFile, { flag: 'wx' }, (err) => {
    if (err)
      throw err
    console.log('File is created successfully.')
  })
}
