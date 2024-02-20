import { replacePackageName } from '@/langs/java/replace/package_name'

const createMeta: CreateMeta = {
  Java: {
    templateUrl: 'https://github.com/lingmancom/SpringbootStandardProject',
    effect({ packageName, workDir }) {
      replacePackageName({ packageName, workDir })
    },
    prompt: [
      {
        type: 'input',
        message: '请输入包名 ?',
        name: 'packageName',
      },
    ],
  },
  公司应用网站: {
    templateUrl: 'https://github.com/lingmancom/company-website-app-starter',
  },
  后台管理网站: {
    templateUrl: 'https://github.com/lingmancom/admin-website-starter',
  },
}

export default createMeta
