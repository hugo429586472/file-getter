/*
 * 溯源向上查找，获取文件对应的路径
 * ts文件
 */
import * as fs from 'node:fs';
import * as path from 'node:path';

interface Options {
  useEnv: boolean;
  envSuffix: string;
  relativeFileDir?: string;
  sourcePath?: string;
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
const get_file_path = (fileName: string, options?: Options): Result => {
  const resFileName = handle_file_name(fileName, options);
  const relativeFileDir = options && options.relativeFileDir || '';
  const sourcePath = options && options.sourcePath || '';

  try {
    return {
      result: true,
      path: trace_get_file_path(resFileName, relativeFileDir, sourcePath)
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
const trace_get_file_path = (fileName: string, relativeFileDir: string, filePath: string): string => {
  const relativeFileName = relativeFileDir + fileName;
  const resFilePath = filePath && filePath !== '' ? filePath + '/' + relativeFileName : relativeFileName;
  if (fs.existsSync(resFilePath)) {
    return resFilePath;
  } else {
    const parentDir = path.resolve(filePath, '..');
    if (parentDir === filePath || parentDir === '/') {
      throw new Error(`Cannot find ${fileName}`);
    }

    return trace_get_file_path(fileName, relativeFileDir, parentDir);
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

/*
 * 获取当前工作目录
 * 输入：
 *  dir: "./"
 * 输出：
 *  "/Users/user/project"
 */
export const resolve = (dir) => {
  return path.join(process.cwd(), '.', dir)
}

/*
 * 获取包路径
 * 输入：
 *  pkg: "react-native"
 * 输出：
 *  "/Users/user/project/node_modules/react-native"
 * 或
 * 如果使用了pnpm输出：
 *  "/Users/user/project/.pnpm/react-native@0.64.2/node_modules/react-native"
 */
export const get_pkg_path = (pkg) => {
  const pathRoute = pkg + '/package.json'
  return path.join(require.resolve(pathRoute), '..')
}

export const file_getter = get_file_path;

export default {
  get_file_path,
  get_pkg_path
};
