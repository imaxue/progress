var path = require('path'),
    gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    fileinclude = require('gulp-file-include'),
    // htmlMinify = require('gulp-html-minify'),
    browserSync = require('browser-sync');

var config = require('../gulp.config'),
    //开发环境编译输出地址
    devDir = config.devDir,
    //生产环境编译输出地址
    prodDir = config.prodDir,
    //当前运行的环境变量
    env = config.env,
    g = gulp.src(dir('app/html/pages/*.html'));

function dir(dirName) {
    return path.join(__dirname, '..', dirName);
}

function development() {
    return g.pipe(plumber())
        .pipe(fileinclude({
            basepath: dir('app/html/public')
        }))
        .pipe(gulp.dest(devDir))
        .pipe(browserSync.stream())
}

function production() {
    return g.pipe(fileinclude({
        basepath: dir('app/html/public')
    }))
        // .pipe(htmlMinify())
        .pipe(gulp.dest(prodDir))
}

module.exports = env === 'development' ? development : production;
