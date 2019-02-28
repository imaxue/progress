var path = require('path'),
    gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    imagemin = require('gulp-imagemin'),
    rev = require('gulp-rev');

var config = require('../gulp.config'),
    //开发环境编译输出地址
    devDir = config.devDir,
    //生产环境编译输出地址
    prodDir = config.prodDir,
    //当前运行的环境变量
    env = config.env,
    g = gulp.src(dir('app/imgs/**/*.*'));

function dir(dirName) {
    return path.join(__dirname, '..', dirName);
}

function development() {
    return g.pipe(plumber())
        .pipe(gulp.dest(devDir + '/imgs'))
}

function production() {
    return g.pipe(imagemin())
        .pipe(rev())
        .pipe(gulp.dest(prodDir + '/imgs'))
        .pipe(rev.manifest())
        .pipe(gulp.dest(prodDir + '/rev/imgs'))
}

module.exports = env === 'development' ? development : production;
