let fs = require('fs-extra')


fs.readFile(__dirname + '/test.txt', {
  flag: 'r+',
  encoding: 'utf8',
}).then((data) => {
  console.log(`data data`, data.split(/\n\n/))
})


// const readline = require('readline')
//
// const rl = readline.createInterface({
//   input: fs.createReadStream(__dirname + '/test.txt'),
// })
// rl.on('line', (line) => {
//   console.log(`文件的单行内容：${line}`)
// })

