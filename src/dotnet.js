
export function co(ApiPath, BLLPath, ModelPath) {
  const ServiceNamespace = ``

  const execSync = require('child_process').execSync
  var fs = require('fs');
  if (process.argv.length <= 2) {
    console.log('\x1b[33m%s\x1b[0m', '需要传入Controller参数');
    return
  }
  Object.defineProperty(String.prototype, 'capitalize', {
    value: function () {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
  });


  const nameArr = process.argv[2].split(".")
  const class_name = nameArr[nameArr.length - 1].capitalize();
  nameArr.pop();
  const namespace_dot = nameArr.reduce((pre, cur) => pre + "." + cur.capitalize(), "")
  const namespace_slash = nameArr.reduce((pre, cur) => pre + "/" + cur.capitalize(), "")


  let controllerFile = `using ${BLLPath}.Service${namespace_dot};
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
`



  fs.writeFile(`${ApiPath}/Controllers${namespace_slash}/${class_name}Controller.cs`, controllerFile, { flag: 'wx' }, function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
  });



  let serviceFile = `using AutoMapper;
using ${ModelPath}.EntitiesModel.maindb;
using Microsoft.Extensions.Caching.Distributed;
using NAutowired.Core.Attributes;
using System;
${ServiceNamespace}

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

  fs.writeFile(`${BLLPath}/Service${namespace_slash}/${class_name}Service.cs`, serviceFile, { flag: 'wx' }, function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
  });
}
