var fs = require("fs");
var gulp = require("gulp");
var imagemin = require('gulp-imagemin');

var config = {
    src: "./**/*.png",
    dest: "./imagesMin"
};

gulp.task('imagemin', function () {
    gulp.src(config.src)
        .pipe(imagemin())
        .pipe(gulp.dest(config.dest));
});

// gulp.run('imagemin');

/*
 如何把网页中要用到的图片压缩到最小，这是前端攻城师们在写网页时都会考虑的一个问题，今天小坊给各位带来了给前端攻城师们真正的良心网站---TinyPNG。
 只需要简单的两步就可以把你要压缩的PNG格式图片压缩到小很多又基本上不会影响图片的质量：
 1.打开网址：http://tinypng.org/
 */
/*https://github.com/manuelvanrijn/node-tinypng*/
