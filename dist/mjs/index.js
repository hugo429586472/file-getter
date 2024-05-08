/*
 * 溯源向上查找，获取文件对应的路径
 * ts文件
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
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
    var relativeFileDir = options && options.relativeFileDir || '';
    var sourcePath = options && options.sourcePath || '';
    try {
        return {
            result: true,
            path: trace_get_file_path(resFileName, relativeFileDir, sourcePath)
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
var trace_get_file_path = function (fileName, relativeFileDir, filePath) {
    var relativeFileName = relativeFileDir + fileName;
    var resFilePath = filePath && filePath !== '' ? filePath + '/' + relativeFileName : relativeFileName;
    if (fs.existsSync(resFilePath)) {
        return resFilePath;
    }
    else {
        var parentDir = path.resolve(filePath, '..');
        if (parentDir === filePath || parentDir === '/') {
            throw new Error("Cannot find ".concat(fileName));
        }
        return trace_get_file_path(fileName, relativeFileDir, parentDir);
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
export var file_getter = get_file_path;
export default get_file_path;
