#!/usr/bin/env node
const argv = require('yargs').argv
// const gulp = require('gulp')


// 加载所有
// const requireDir = require('require-dir')
/*
  Given this directory structure:
  dir
    |- a.js
    |- b.json
    |- c.coffee
    |- d.txt

  requireDir('./dir') will return the equivalent of: { a: require('./dir/a.js'), b: require('./dir/b.json') }
* */

// 1. 加载gulp task
// requireDir('./gulp.task.normal')

// 2. 加载js执行文件
// let nodeApplication = requireDir('./node.application')
// nodeApplication[argv.r] && nodeApplication[argv.r](argv)

if (argv.g) {
  /* 执行gulp中的task */
  // gulp.run(argv.g)
} else if (argv.r) {
  /* 执行node.application中命令 */
  let runjs = require(`./node.application/${argv.r}.js`)
  runjs(argv)
} else {
  console.log(`
    ### 执行gulp中的task    nodex -g server
    * server          建立一个本地服务器并支持自动刷新
    * seajs           打包压缩seajs模块化文件
    * replaceInclude  实现将文件中的include('./a.text')进行替换处理
    * react           打包react
    * jpgGet          获取文件中的jpg文件,并放置到同层级的文件夹中(文件夹名称通过-o outFileName实现,默认值:00000)
    * imagemin        压缩文件中的png文件,并放置到'./imagesMin'文件夹中
    * jsmin           压缩文件中的js,并放置到'./jsmin'文件夹中

    ### 执行node.application中命令   nodex -r zipMin
    * zipMin          压缩一个文件夹,在同级目录中生成zip文件
    * har             处理浏览器请求文件HAR,将其中的url与response提取出来(生成mock文件)
  `)
}
