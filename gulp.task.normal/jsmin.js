var gulp = require('gulp')
var uglify = require('gulp-uglify')//js压缩混淆

gulp.task("jsmin", function () {
  gulp.src(['./**/*.js']).pipe(uglify()).pipe(gulp.dest('./jsmin'))
})

