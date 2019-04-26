var gulp = require('gulp');
var connect = require('gulp-connect');//livereload 自动刷新

//定义livereload任务
gulp.task('util-connect', function () {
    connect.server({
        livereload: true,
        root: process.cwd()
    });
});


/* 监听所有变化 */
gulp.task("all-watch", function () {
    gulp.watch(["./**/*.html"], function () {
        gulp.src('./**/*.html')
            .pipe(connect.reload());
    });
});

gulp.task("server", ['util-connect', "all-watch"]);//1、通过connet启动服务器 2、通过all_watch监听变化，并进行刷新
