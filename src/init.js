const fs = require("fs")

console.log('----------------------------初始化开始----------------------------')
if( !fs.existsSync('./src') ) {
    console.log("创建 src 目录")
    fs.mkdirSync("./src")
}
if( !fs.existsSync('./src/configs') ) {
    console.log("创建 configs 目录")
    fs.mkdirSync("./src/configs")
}
if( !fs.existsSync('./src/configs/main.js') ) {
    console.log("创建 main.js 文件")
    fs.copyFileSync('./node_modules/@vshen/v-frame-core/src/environments/configs/main.js', './src/configs/main.js')
}
if( !fs.existsSync('./src/configs/params.js') ) {
    console.log("创建 params.js 文件")
    fs.copyFileSync('./node_modules/@vshen/v-frame-core/src/environments/configs/params.js', './src/configs/params.js')
}
if( !fs.existsSync('./src/configs/apis.js') ) {
    console.log("创建 apis.js 文件")
    fs.copyFileSync('./node_modules/@vshen/v-frame-core/src/environments/configs/apis.js', './src/configs/apis.js')
}
if( !fs.existsSync('./src/models') ) {
    console.log("创建 models 目录")
    fs.mkdirSync("./src/models")
}
if( !fs.existsSync('./src/models/dataModels') ) {
    console.log("创建 dataModels 目录")
    fs.mkdirSync("./src/models/dataModels")
}
if( !fs.existsSync('./src/models/dataModels/User.js') ) {
    console.log("创建 User.js 文件")
    fs.copyFileSync('./node_modules/@vshen/v-frame-core/src/environments/models/dataModels/User.js', './src/models/dataModels/User.js')
}
if( !fs.existsSync('./src/models/formModels') ) {
    console.log("创建 formModels 目录")
    fs.mkdirSync("./src/models/formModels")
}
if( !fs.existsSync('./src/models/formModels/user') ) {
    console.log("创建 user 目录")
    fs.mkdirSync("./src/models/formModels/user")
}
if( !fs.existsSync('./src/models/formModels/user/UserLoginForm.js') ) {
    console.log("创建 UserLoginForm.js 文件")
    fs.copyFileSync('./node_modules/@vshen/v-frame-core/src/environments/models/formModels/user/UserLoginForm.js', './src/models/formModels/user/UserLoginForm.js')
}
if( !fs.existsSync('./src/models/searchModels') ) {
    console.log("创建 searchModels 目录")
    fs.mkdirSync("./src/models/searchModels")
}
if( !fs.existsSync('./src/pages') ) {
    console.log("创建 pages 目录")
    fs.mkdirSync("./src/pages")
}
console.log("")

if( fs.existsSync('./src/App.vue') ) {
    console.log('VUE项目：')
    console.log("Vue项目请在 src/main.js 文件添加以下代码以初始化项目：")
    console.log("VFrame.getInstance().vue(app, reactive)")
    console.log("")
}

console.log('API驱动：')
console.log("已配置默认使用 axios 作为API驱动发起请求，若您还未安装请运行以下命令：")
console.log("npm i axios -S")
console.log("如果你使用其它库发起请求，请修改 src/main.js 文件中的 api.driver ")
console.log("")

console.log('----------------------------初始化完成----------------------------')

