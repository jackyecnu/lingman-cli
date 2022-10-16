"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createController = void 0;
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
function createController({ ApiPath, BLLPath, ModelPath }, args) {
    if (!ApiPath)
        return console.log(chalk_1.default.red('缺少ApiPath配置'));
    if (!BLLPath)
        return console.log(chalk_1.default.red('缺少BLLPath配置'));
    if (!ModelPath)
        return console.log(chalk_1.default.red('缺少ModelPath配置'));
    if (args.length === 0) {
        console.log('\x1B[33m%s\x1B[0m', '需要传入Controller参数');
        return;
    }
    Object.defineProperty(String.prototype, 'capitalize', {
        value() {
            return this.charAt(0).toUpperCase() + this.slice(1);
        },
        enumerable: false,
    });
    const nameArr = args[0].split('.');
    const class_name = nameArr[nameArr.length - 1].capitalize();
    nameArr.pop();
    const namespace_dot = nameArr.reduce((pre, cur) => `${pre}.${cur.capitalize()}`, '');
    const namespace_slash = nameArr.reduce((pre, cur) => `${pre}/${cur.capitalize()}`, '');
    const controllerFile = `using ${BLLPath}.Service${namespace_dot};
  using Microsoft.AspNetCore.Mvc;
  using NAutowired.Core.Attributes;
  
  namespace ${ApiPath}.Controllers${namespace_dot}
  {
      [Route("api${namespace_slash}/[controller]")]
      public class ${class_name}Controller : BaseController
      {
          private new DemonSession session
          { get { return (DemonSession)base.session; } }
  
          [Autowired]
          private readonly ${class_name}Service currentService; 
      }
  }
  `;
    fs_1.default.writeFile(`${ApiPath}/Controllers${namespace_slash}/${class_name}Controller.cs`, controllerFile, { flag: 'wx' }, (err) => {
        if (err)
            throw err;
        console.log('File is created successfully.');
    });
    const serviceFile = `using AutoMapper;
  using ${ModelPath}.EntitiesModel.maindb;
  using Microsoft.Extensions.Caching.Distributed;
  using NAutowired.Core.Attributes;
  using System; 
  
  namespace ${BLLPath}.Service${namespace_dot}
  {
      [Service]
      public class ${class_name}Service : BaseService
      {
          private new DemonSession session
          { get { return (DemonSession)base.session; } } 
      }
  }
  `;
    fs_1.default.writeFile(`${BLLPath}/Service${namespace_slash}/${class_name}Service.cs`, serviceFile, { flag: 'wx' }, (err) => {
        if (err)
            throw err;
        console.log('File is created successfully.');
    });
}
exports.createController = createController;
