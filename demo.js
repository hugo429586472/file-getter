const { file_getter, get_pkg_path } = require("./dist/cjs/index.js")

console.log(file_getter('package.json', {}))
console.log(file_getter('index.ts', {}))

console.log(get_pkg_path('typescript'))