import { langDotnet } from '../langs/donet'
import { langFastApi } from '../langs/fastapi'
import { langFlutter } from '../langs/flutter'
import { langJava } from '../langs/java'
import { langNodejs } from '../langs/nodejs'
import { langUniapp } from '../langs/uniapp'
import { langWeb } from '@/langs/web'

export const langs = {
  java: langJava,
  dotnet: langDotnet,
  flutter: langFlutter,
  uniapp: langUniapp,
  nodejs: langNodejs,
  fastapi: langFastApi,
  web: langWeb,
}

export const initConfigTemplate = {
  java: `
module.exports = {
  lang: 'java',
  scripts: {
    test: 'echo test',
  }
}
`.trim(),
  dotnet: `
module.exports = {
  lang: 'dotnet',
  scripts: {
    test: 'echo test',
  }
}
`.trim(),

  flutter: `
module.exports = {
  lang: 'flutter',
  scripts: {
    test: 'echo test',
  }
}
`.trim(),

  uniapp: `
module.exports = {
  lang: 'uniapp',
  scripts: {
    test: 'echo test',
  }
}
`.trim(),

  nodejs: `
module.exports = {
  lang: 'nodejs',
  scripts: {
    test: 'echo test',
  }
}
`.trim(),

  fastapi: `
module.exports = {
  lang: 'fastapi',
  scripts: {
    test: 'echo test',
    dev: 'uvicorn main:app --reload --port 8000',
  }
}
`.trim(),

  web: `
module.exports = {
  lang: 'web',
  // docsAddress: 'http://xxxx/v3/api-docs',
  // outDir: 'src/api/sync',
  scripts: {
    test: 'echo test',
    dev: 'uvicorn main:app --reload --port 8000',
  }
}
`.trim(),
}

export const messageTypes = {
  其他: '其他: ',
  功能: '功能: ',
  修复: '修复: ',
  重构: '重构: ',
  发版: '发版: ',
}
