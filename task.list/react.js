var gulp = require('gulp');
var less = require('gulp-less');
var connect = require('gulp-connect'); //
var react = require('gulp-react');


gulp.task("react-connect", function () {
    connect.server({
        livereload: true,
        root: "F:\\HTML\\practice\\React\\me"
    });
});

gulp.task('jsxHandler', function () {
    return gulp.src('src/*.js')
        .pipe(react())
        .pipe(gulp.dest('static'));
});

gulp.task("react-change", ["jsxHandler"], function () {
    gulp.watch('./**/*.*', function () {
        gulp.run("jsxHandler");
        gulp.src('./**/*.*')
            .pipe(connect.reload());
    });
});

gulp.task("react", ["react-connect", "react-change"]);
