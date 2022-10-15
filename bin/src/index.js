"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const co_1 = require("./co");
const program = new commander_1.Command();
if (!fs_1.default.existsSync(path_1.default.resolve(process.cwd(), 'lingman.config.js')))
    console.log(chalk_1.default.red('当前目录下不存在 lingman.config.js 配置文件, 请先创建'));
const config = require(path_1.default.resolve(process.cwd(), 'lingman.config.js'));
async function default_1() {
    program.command('co').description('创建Controller , 文件目录以.分割').action(() => {
        (0, co_1.createController)(config, program.args.slice(1));
    });
    program.parse();
}
exports.default = default_1;
