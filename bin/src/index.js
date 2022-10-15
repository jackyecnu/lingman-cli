"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const package_json_1 = require("../package.json");
const co_1 = require("./co");
const open_1 = require("./open");
const git_1 = require("./git");
const sync_1 = require("./sync");
const build_1 = require("./build");
const checkVersion_1 = require("./utils/checkVersion");
const program = new commander_1.Command();
const configPath = path_1.default.resolve(process.cwd(), 'lingman.config.js');
if (!fs_1.default.existsSync(configPath))
    console.log(chalk_1.default.red('当前目录下不存在 lingman.config.js 配置文件, 请先创建'));
const config = require(configPath);
async function default_1() {
    program
        .command('co')
        .description('创建Controller , 文件目录以.分割')
        .action(() => { (0, co_1.createController)(config, program.args.slice(1)); });
    program
        .command('git')
        .description('git提交 默认提交工作区所有文件')
        .option('-m, --message <message>', '提交信息')
        .action((options) => { (0, git_1.gitPush)(options.message); });
    program
        .command('sync')
        .description('同步远程数据库表结构到本地')
        .action(() => { (0, sync_1.sync)(config); });
    program
        .command('build')
        .description('执行build指令')
        .action(() => { (0, build_1.build)(config); });
    program
        .command('log')
        .description('打开接口日志')
        .action(() => { (0, open_1.openLog)(config); });
    program
        .command('docs')
        .description('打开本地Api文档')
        .action(() => { (0, open_1.openDocs)(config); });
    program
        .command('docs1')
        .description('打开在线Api文档')
        .action(() => { (0, open_1.openDocs1)(config); });
    program.version(package_json_1.version, '-v, --version', '查看版本号');
    program.parse();
    (0, checkVersion_1.checkVersion)();
}
exports.default = default_1;
