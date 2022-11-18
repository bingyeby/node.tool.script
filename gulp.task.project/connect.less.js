//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
  less = require('gulp-less'),
  connect = require('gulp-connect');//livereload 自动刷新


//定义一个testLess任务（自定义任务名称）
gulp.task('testLess', function () {
  gulp.src('src/less/index.less') //该任务针对的文件
    .pipe(less()) //该任务调用的模块
    .pipe(gulp.dest('src/css'))//将会在src/css下生成index.css
    .pipe(connect.reload());
});

//定义html任务
gulp.task('html', function () {
  gulp.src('src/*.html')
    .pipe(connect.reload());
});

//定义看守任务
gulp.task('watch', function () {
  gulp.watch('src/*.html', ['html']);
});

//定义livereload任务
gulp.task('connect', function () {
  connect.server({
    livereload: true
  });
});
gulp.task('default', ['testLess', 'watch', 'connect']);

gulp.run("default");
