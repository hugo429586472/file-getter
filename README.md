# file-getter

向上查找，获取文件对应路径。

获取使用的npm包所在路径。

Get the file path of the filename or the npm package.

## 特性（Features）

* 只依赖 `fs` 模块；
* 只依赖 `path` 模块。

## 安装（Installation）

```bash
npm install file-getter
```

```bash
yarn add file-getter
```

```bash
pnpm add file-getter
```

## 使用（Usage）

### 引入

```js
import { file_getter, get_pkg_path } from 'file-getter';

file_getter('test.js');
//=>./test.js

file_getter('test2.js');
//=> /xxx/test2.js

get_pkg_path('vue');
//=> xxx/node_modules/vue/package.json


```


### 配置文件查找路径

```js
import { file_getter } from 'file-getter';

// 查找上级目录中，是否有 ./src/test.js 文件
file_getter('test.js', {
  relativeFileDir: 'src'
});
//=> /user/test/src/test.js


```

### 查找包所在路径

```js
import { file_getter } from 'file-getter';

// 查找上级目录中，是否有 ./src/test.js 文件
file_getter('test.js', {
  searchPath: 'src'
});
//=> /user/test/src/test.js