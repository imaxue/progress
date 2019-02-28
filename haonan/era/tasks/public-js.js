var path = require('path'),
    gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rev = require('gulp-rev'),
    browserSync = require('browser-sync');

var config = require('../gulp.config'),
    //开发环境编译输出地址
    devDir = config.devDir,
    //生产环境编译输出地址
    prodDir = config.prodDir,
    //当前运行的环境变量
    env = config.env,
    g = gulp.src(dir('app/js/public/**/*.js'));

function dir(dirName) {
    return path.join(__dirname, '..', dirName);
}

function development() {
    return g.pipe(plumber())
        .pipe(gulp.dest(devDir + '/js/public'))
        .pipe(browserSync.stream())
}

function production() {
    return g.pipe(rev())
        .pipe(gulp.dest(prodDir + '/js/public'))
        .pipe(rev.manifest())
        .pipe(gulp.dest(prodDir + '/rev/js/public'))
}

module.exports = env === 'development' ? development : production;
