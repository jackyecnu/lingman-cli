import { langDotnet } from '../langs/donet'
import { langFastApi } from '../langs/fastapi'
import { langFlutter } from '../langs/flutter'
import { langJava } from '../langs/java'
import { langNodejs } from '../langs/nodejs'
import { langUniapp } from '../langs/uniapp'

export const langs = {
  java: langJava,
  dotnet: langDotnet,
  flutter: langFlutter,
  uniapp: langUniapp,
  nodejs: langNodejs,
  fastapi: langFastApi,
}

export const messageTypes = {
  其他: '其他: ',
  功能: '功能: ',
  修复: '修复: ',
  重构: '重构: ',
  发版: '发版: ',
}
