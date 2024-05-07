/*
 * 溯源向上查找，获取文件对应的路径
 * ts文件
 */
import * as fs from 'node:fs';
import * as path from 'node:path';

interface Options {
  useEnv: boolean;
  envSuffix: string;
  filePath?: string;
}

interface Result {
  result: boolean;
  path?: string;
  error?: Error;
}

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
const get_file_path = (fileName: string, options: Options): Result => {
  const resFileName = handle_file_name(fileName, options);
  const filePath = options.filePath || '';

  try {
    return {
      result: true,
      path: trace_get_file_path(resFileName, filePath)
    };
  } catch (error) {
    return {
      result: false,
      error
    };
  }
}

/*
 * 溯源向上查找，获取文件对应的路径
 * 输入：
 *  fileName: "config.js"
 *  filePath: ""
 * 输出：
 *  "/Users/user/project/src/config.js"
 */
const trace_get_file_path = (fileName: string, filePath: string): string => {
  const resFilePath = filePath && filePath !== '' ? filePath + '/' + fileName : fileName;
  if (fs.existsSync(resFilePath)) {
    return resFilePath;
  } else {
    const parentDir = path.resolve(filePath, '..');
    if (parentDir === filePath || parentDir === '/') {
      throw new Error(`Cannot find ${fileName}`);
    }

    return trace_get_file_path(fileName, parentDir);
  }
}

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
const handle_file_name = (fileName: string, options: Options): string => {
  if (options.useEnv) {
    return `${fileName}.${options.envSuffix}`;
  }

  return fileName;
}

export const file_getter = get_file_path;

export default get_file_path;
