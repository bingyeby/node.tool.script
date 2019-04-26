/*
 * sea js 合并测试  F:\HTML2\新建文件夹\blog\seajs
 * */
var fs = require('fs')
var gulp = require('gulp')
var replace = require('gulp-replace-task')//对文件中的字符串进行替换   https://www.npmjs.com/package/gulp-replace-task
var transport = require('gulp-seajs-transport')//对seajs的模块进行预处理：添加模块标识
var concat = require('gulp-seajs-concat')//seajs模块合并
var uglify = require('gulp-uglify')//js压缩混淆
var merge = require('merge-stream')//合并多个流

var src = 'seajs'
var dist = 'dist'
//seajs合并模式
gulp.task('seajs', function () {
  return merge(
    gulp.src(src + '/js/!(lib)/**/*.js', { base: src + '/js' })
      .pipe(transport())
      .pipe(concat({
        base: src + '/js',
      }))

      .pipe(gulp.dest(dist + '/js')),

    gulp.src([src + '/js/lib/**/*.js', src + '/js/common.js'], { base: src + '/js' })
      .pipe(uglify({
        //mangle: true,//类型：Boolean 默认：true 是否修改变量名
        mangle: { reserved: ['require', 'exports', 'module', '$'] }//排除混淆关键字
      }))
      .pipe(gulp.dest(dist + '/js')),
  )
})

//gulp.run("seajs");

