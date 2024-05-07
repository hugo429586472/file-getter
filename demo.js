import file_getter from "./dist/mjs/index.js"
console.log(file_getter)

console.log(file_getter('package.json', {}))
console.log(file_getter('index.ts', {}))