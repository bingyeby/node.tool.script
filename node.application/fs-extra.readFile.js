// let fs = require('fs-extra')


// fs.readFile(__dirname + '/test.txt', {
//   flag: 'r+',
//   encoding: 'utf8',
// }).then((data) => {
//   console.log(`data data`, data.split(/\n\n/))
// })


// const readline = require('readline')
//
// const rl = readline.createInterface({
//   input: fs.createReadStream(__dirname + '/test.txt'),
// })
// rl.on('line', (line) => {
//   console.log(`文件的单行内容：${line}`)
// })


// const program = require('commander')
// let glob = require('glob')
// let getJsonFromHar = require('./src/getJsonFromHar.js')
//
// program
//   .version('0.0.1')
//   .option('-h, --har [har]', 'deal har')
//   .parse(process.argv)
//
// if (program.har) {
//   getJsonFromHar.dealHarAll()
// }
//
//
// // 获取除第一个命令以后的参数，使用空格拆分
// // run(process.argv.slice(2));
