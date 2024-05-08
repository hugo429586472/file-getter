# file-getter

向上查找，获取文件对应路径。

Get the file path of the filename.

## 特性（Features）

* 只依赖 `fs` 模块；
* 只依赖 `path` 模块。

## 安装（Installation）

```bash
npm install file-getter
```

## 使用（Usage）

### 引入

```js
import file_getter from 'file-getter';

file_getter('test.js');
//=>./test.js

file_getter('test2.js');
//=> /xxx/test2.js

```

### 配置文件查找路径

```js
import file_getter from 'file-getter';


file_getter('test.js', {
  filePath: '/user/test/src'
});
//=> /user/test/test.js


```
