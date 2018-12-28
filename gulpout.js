#!/usr/bin/env node
var argv = require('yargs').argv;
var gulp = require('gulp');

var requireDir = require('require-dir');

requireDir("./task.list");

var taskName = argv.t;
if (taskName) {
    console.log(taskName);
    gulp.run(taskName);
} else {
    console.log('请输入参数:gulpout -t server');
}
