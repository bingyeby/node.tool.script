var gulp = require('gulp');
var tap = require("gulp-tap");
var gulpIf = require("gulp-if");

var argv = require('yargs').argv;


let outPath = `./${argv.o}` || './00000'
gulp.task("jpgGet", function () {
    return gulp.src("./**/*.jpg")
        .pipe(gulp.dest(outPath));
});





