#!/usr/bin/env node
let fs = require('fs')
let path = require('path')
let nodeJsZip = require('nodeJs-zip')
let basicPath = 'D:\\github\\app-0'
fs.readdir(basicPath, (err, files) => {
  if (err) {
    return console.log(err)
  }
  let filesFilter = files.filter((n) => {
    return !['node_modules', '.idea', '.git', '.vscode'].includes(n) // 待排除文件名
  }).map((n) => {
    return path.join(basicPath, n)
  })
  nodeJsZip.zip(filesFilter, {
    name: 'app-up',
    dir: 'D:\\github\\one',
  })
})

// 获取除第一个命令以后的参数，使用空格拆分
// run(process.argv.slice(2));
