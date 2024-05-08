"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.file_getter = void 0;
/*
 * 溯源向上查找，获取文件对应的路径
 * ts文件
 */
var fs = __importStar(require("node:fs"));
var path = __importStar(require("node:path"));
/*
 * 主方法
 * 输入：
 *  fileName: "config.js"
 *  options: {
 *    useEnv: true,
 *    envSuffix: "prod"
 *  }
 * 输出：
 *  "config.js.prod"
 */
var get_file_path = function (fileName, options) {
    var resFileName = handle_file_name(fileName, options);
    var filePath = options.filePath || '';
    try {
        return {
            result: true,
            path: trace_get_file_path(resFileName, filePath)
        };
    }
    catch (error) {
        return {
            result: false,
            error: error
        };
    }
};
/*
 * 溯源向上查找，获取文件对应的路径
 * 输入：
 *  fileName: "config.js"
 *  filePath: ""
 * 输出：
 *  "/Users/user/project/src/config.js"
 */
var trace_get_file_path = function (fileName, filePath) {
    var resFilePath = filePath && filePath !== '' ? filePath + '/' + fileName : fileName;
    if (fs.existsSync(resFilePath)) {
        return resFilePath;
    }
    else {
        var parentDir = path.resolve(filePath, '..');
        if (parentDir === filePath || parentDir === '/') {
            throw new Error("Cannot find ".concat(fileName));
        }
        return trace_get_file_path(fileName, parentDir);
    }
};
/*
 * 文件名处理
 * 兼容环境变量（感觉这里写的不太合适，后面再看看怎么改）
 * 输入：
 *  fileName: "config.js"
 *  options: {
 *    useEnv: true,
 *    envSuffix: "prod"
 *  }
 * 输出：
 *  "config.js.prod"
 */
var handle_file_name = function (fileName, options) {
    if (options.useEnv) {
        return "".concat(fileName, ".").concat(options.envSuffix);
    }
    return fileName;
};
exports.file_getter = get_file_path;
exports.default = get_file_path;
