// generated on 2016-06-03 using generator-gulp-webapp 1.1.1
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';// gulp-load-plugins 自动加载package.json文件里的 gulp 插件
import browserSync from 'browser-sync';
import del from 'del';
import path from "path";
import { stream as wiredep } from 'wiredep';


var pkg = require('./package.json')


// gulp加载插件
const $ = gulpLoadPlugins();
// 重新加载
const reload = browserSync.reload;


// 判断文件后缀是.scss
const ifSass = (file) => {
    const ext = path.extname(file.path);
    return ext == ".scss" ? true : false;
}


// 判断文件包含lib目录
const ifLibDir = (file) => {
    const index = path.parse(file.path).dir.indexOf('\\lib');
    //console.log(index > -1)
    //console.log(file.path)
    return index > -1;
}


// 测试地址
const test_app_dir = "app/Public/";
// 开发App地址
const dev_app_dir = "../branches/branch2/Application/Home";


const app_dir = dev_app_dir;
// 测试地址
const test_dist_dir = "dist/Public/";
// 开发Dist地址
const dev_dist_dir = "../branches/branch2/Public/";
// 中间转换
const dist_dir = dev_dist_dir;




// 生成版本号清单
gulp.task('rev', () => {
    return gulp.src(['app/Public/**/*'])
        // 判断是不是sass文件
        .pipe($.if(ifSass, $.sass()))
        .pipe($.rev())
        .pipe($.revFormat({
            prefix: '.',
            suffix: '.cache',
            lastExt: false
        }))
        .pipe($.rev.manifest({
            //path:"rev-manifest.json",//default rev-manifest.json file
            base: "app",
            //merge: true // merge with the existing manifest (if one exists) 
        }))
        .pipe(gulp.dest("app/Public/"));
});


/*
给文件增加版本号
gulp-rev-replace支持这种样式<script src="lib/zepto.min.js?v=50a4556b00"></script>
*/
gulp.task('addVersion', ['rev'], function () {
    var manifest = gulp.src(["./app/rev-manifest.json"]);
    function modifyUnreved(filename) {
        return filename;
    }
    function modifyReved(filename) {
        // app.4b22acfb81.cache.css
        if (filename.indexOf('.cache') > -1) {
            const _version = filename.match(/\.[\w]*\.cache/)[0].replace(/(\.|cache)*/g, "");
            const _filename = filename.replace(/\.[\w]*\.cache/, "");
            filename = _filename + "?v=" + _version;
            return filename;
        }
        return filename;
    }
    gulp.src([dev_app_dir + '/**/**.html'])
        // 删除原来的版本 
        .pipe($.replace(/(\.[a-z]+)\?v=[^\'\"\&]*/g, "$1"))
        .pipe($.revReplace({
            manifest: manifest,
            modifyUnreved: modifyUnreved,
            modifyReved: modifyReved
        }))
        .pipe(gulp.dest(dev_app_dir));
});


// JS\CSS注释
const banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    // ' * @version v<%= pkg.version %>',
    // ' * @link <%= pkg.homepage %>',
    // ' * @license <%= pkg.license %>',
    ' *\/',
    ''].join(' ');



gulp.task('sass', () => {
    const timer = +(new Date());
    return gulp.src(['app/Public/css/**/*.scss'])
        .pipe($.if(ifLibDir, $.sass()))
        .pipe($.if(ifLibDir, $.concat("lib/base.css")))
        // cached要放到第一位 
        .pipe($.cached("sass"))
        //语法报错时，整个运行流程还会继续走下去，不退出
        .pipe($.plumber())
        .pipe($.sass())
        .pipe($.replace(/(\.(jpg|png|gif)+)/g, "$1?v=" + timer))
        .pipe($.csslint())
        // 压缩成一行
        //.pipe($.cssnano())
        /*
        Source Maps能够提供将压缩文件恢复到源文件原始位置的映射代码的方式。
        这意味着你可以在优化压缩代码后轻松的进行调试。
        在Chrome和Firefox的开发工具既附带内置的Source Maps的支持。
        */
        //.pipe($.sourcemaps.init())


        // browsers options url:  https://github.com/ai/browserslist#queries
        .pipe($.autoprefixer({
            browsers: ['> 5%', 'last 4 versions']
        }))
        // 压缩重复 
        .pipe($.cleanCss({ debug: false }, function (details) {
            // 压缩前大小
            //console.log(details.name + ' originalSize: ' + details.stats.originalSize);
            //压缩后大小
            //console.log(details.name + ' minifiedSize: ' + details.stats.minifiedSize);
        }))
        .pipe($.header(banner, { pkg: pkg }))
        // 带参数：生成的sourcemaps代码放到指定的文件夹中，不带参数：在对应的文件最下面生成一串代码
        //.pipe($.sourcemaps.write('../maps'))
        .pipe(gulp.dest(dist_dir + 'css/'))
        .pipe(gulp.dest(test_dist_dir + 'css/'))
        // 第一个参数是当前文件夹下生成一个source map 文件
        //.pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../src'}))

        /* 加上这段代码执行慢
        .pipe($.notify({
            onLast: true,
            message: () => `CSS文件编译了 <%= file.relative %>`
        }))
        .pipe(reload({
          stream: true
        }))*/
        ;
});


// ES5转换
gulp.task('js', () => {
    // 不匹配lib文件夹下所有文件
    return gulp.src(['app/Public/js/**/*.js'])
        // 合并多个文件要放到cached前面
        .pipe($.if(ifLibDir, $.concat("lib/base.js")))
        .pipe($.cached("es5"))
        .pipe($.plumber())
        //.pipe($.eslint())
        //.pipe($.sourcemaps.init())
        .pipe($.if(ifLibDir, $.eslint(), $.babel()))
        .pipe($.header(banner, { pkg: pkg }))
        .pipe($.uglify({
            preserveComments: 'all'
        }))
        //.pipe($.sourcemaps.write())
        .pipe(gulp.dest(dist_dir + 'js/'))
        .pipe(gulp.dest(test_dist_dir + 'js/'))
        ;
});


// 转换图片
gulp.task('images', () => {
    return gulp.src('app/Public/images/**/*')
        .pipe($.cached("image"))
        .pipe($.plumber())
        .pipe($.imagemin({
            progressive: true,
            interlaced: true,
            // don't remove IDs from SVGs, they are often used
            // as hooks for embedding and styling
            svgoPlugins: [{
                cleanupIDs: false
            }]
        }))
        .pipe(gulp.dest(dist_dir + 'image/'))
        .pipe(gulp.dest(test_dist_dir + 'images/'))
        ;
});


// 监听文件
gulp.task('devWatch', ['sass', 'js', 'images'], () => {
    //gulp.watch('app/html/**/*.html', ['html']);
    gulp.watch('app/Public/js/**/*.js', ['js', 'addVersion']);
    gulp.watch('app/Public/css/**/*.scss', ['sass', 'addVersion']);
    gulp.watch('app/Public/images/**/*', ['images', 'addVersion']);
});


// 清除缓存
gulp.task('cleanCash', function (done) {
    // $.cached.caches = {};
    delete $.cached.caches['jshint'];
});


// bower解决了前端库依赖管理的痛点，而wiredep解决了bower前端库引入进html的问题。
// bower安装是要安装到 bower install -save jquery
gulp.task('wiredep', () => {
    gulp.src('app/html/**/*.html')
        .pipe(wiredep({
            optional: 'configuration',
            goes: 'here'
        }))
        .pipe(gulp.dest('app/html'));
});


gulp.task('html', () => {
    return gulp.src('app/html/**/*.html')
        .pipe($.useref())
        .pipe(gulp.dest('dist/html/'))
        ;
});


// gulp.task('fonts', () => {
//   return gulp.src('app/sass/lib/font/**/*')
//     .pipe(gulp.dest('dist/css/lib/font'));
// });


gulp.task('serve', ['sass', 'js', 'images',], () => {
    // http://www.browsersync.cn/docs/options/
    browserSync({
        notify: false,//不显示在浏览器中的任何通知。
        port: 80,//端口
        host: '10.100.1.157',
        browser: ["chrome"/*, "firefox"*/], // 在chrome、firefix下打开该站点
        server: {
            baseDir: ['app/'],// 应用程序目录
            index: 'index.html',// 在应用程序目录中指定打开特定的文件
            routes: {
                '/bower_components': 'bower_components',
                '/dist': 'dist'
            }
        }
    })
    // 每当修改以下文件夹下的文件时就会刷新浏览器;
    gulp.watch('app/Public/js/**/*.js', ['js']);
    gulp.watch('app/Public/css/**/*.scss', ['sass']);
    gulp.watch('app/Public/images/**/*', ['images']);
    gulp.watch([
        'app/Public/**/*.html',
        'app/Public/images/**/*',
        'app/Public/css/**/*',
        'app/Public/js/**/*',
    ]).on('change', reload);


});


gulp.task('zip', ['build'], () => {
    var date = new Date();
    var y = date.getFullYear();
    var mon = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    return gulp.src('dist/**/*')
        .pipe($.zip('静态页面_' + y + '年' + mon + '月' + d + '号' + h + '时' + m + '分' + s + '秒.zip'))
        .pipe($.size({
            title: "静态压缩文件大小",
            pretty: true, // size: 1337 B(true) → 1.34 kB(false).
            showFiles: true,
            showTotal: false
        }))
        .pipe($.notify({
            onLast: true,
            message: () => `Total size ${s.prettySize}`
        }))
        .pipe(gulp.dest('zip'));
});


// 更新gulp的package的版本号 "version":"0.0.2"
gulp.task('bump', function () {
    gulp.src('./package.json')
        .pipe($.bump())
        .pipe(gulp.dest('./'));
});
