import { replacePackageName } from '../../langs/java/replace/package_name'

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
}

export default createMeta
