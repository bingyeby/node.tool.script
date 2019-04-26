#!/usr/bin/env node
var argv = require('yargs').argv
var gulp = require('gulp')


/* Given this directory structure:
  dir
  + a.js
  + b.json
  + c.coffee
  + d.txt

  requireDir('./dir') will return the equivalent of:

  {
    a: require('./dir/a.js'),
    b: require('./dir/b.json')
  }
* */
var requireDir = require('require-dir')
requireDir('./gulp.task.normal')

let nodeApplication = requireDir('./node.application')

if (argv.g) {
  /*
  * 执行gulp中的task
  *   1. server 建立一个本地服务器并支持自动刷新
  *   2. seajs 打包压缩seajs模块化文件
  *   3. replaceInclude 实现将文件中的include('./a.text')进行替换处理
  *   4. react 打包react
  *   5. jpgGet 获取文件中的jpg文件,并放置到同层级的文件夹中(文件夹名称通过-o outFileName实现,默认值:00000)
  *   6. imagemin 压缩文件中的png文件,并放置到'./imagesMin'文件夹中
  * */
  gulp.run(argv.g)
} else if (argv.r) {
  /*
  * 执行node.application中命令
  *   1. zipMin 压缩一个文件夹,在同级目录中生成zip文件(只支持第一层次,不支持嵌套结构过滤文件)
  *   2. har 处理浏览器请求文件HAR,将其中的url与response提取出来(生成mock文件)
  * */
  nodeApplication[argv.r] && nodeApplication[argv.r]()
} else {
  console.log('请输入参数:nodex -g server')
}
