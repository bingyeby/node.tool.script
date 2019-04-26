var gulp = require("gulp");
var replace = require('gulp-replace-task');// 对文件中的字符串进行替换
var fs = require("fs");
/*
 * 替换字符串
 * .pipe(replace({ patterns: [{ match: /box/, replacement: function () { return 'bar'; } }] }))
 * 
 * 替换文本,实现_include语法
 * */
gulp.task('replaceInclude', function () {
    gulp.src('src/test.html')
        .pipe(replace({
            patterns: [{
                match: /_include\([\'|\"](\S+)[\"|\']\)/,
                replacement: function ($1, $2) {
                    return fs.readFileSync('./src/' + $2, 'utf8');
                }
            }]
        }))
        .pipe(gulp.dest('build'));
});

//gulp.run("replace");