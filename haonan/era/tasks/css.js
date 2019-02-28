var path = require('path'),
    gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    changed = require('gulp-changed'),
    postcss = require('gulp-postcss'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    rev = require('gulp-rev'),
    base64 = require('gulp-base64'),
    autoprefixer = require('autoprefixer')({
        browsers: [
            "> 5% in CH",
            "last 2 versions",
            "ie 10-11"
        ]
    }),
    browserSync = require('browser-sync');

var config = require('../gulp.config'),
    //开发环境编译输出地址
    devDir = config.devDir,
    //生产环境编译输出地址
    prodDir = config.prodDir,
    //当前运行的环境变量
    env = config.env,
    g = gulp.src(dir('app/css/**/*.scss'));

function dir(dirName) {
    return path.join(__dirname, '..', dirName);
}

function development() {
    return g.pipe(plumber())
        .pipe(
            changed(
                devDir + '/css',
                {
                    extension: '.css'
                }
            )
        )
        .pipe(sass())
        .pipe(postcss([autoprefixer]))
        .pipe(base64())
        .pipe(gulp.dest(devDir + '/css'))
        .pipe(browserSync.stream())
}

function production() {
    return g.pipe(sass())
        .pipe(postcss([autoprefixer]))
        .pipe(base64())
        .pipe(csso())
        .pipe(rev())
        .pipe(gulp.dest(prodDir + '/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest(prodDir + '/rev/css'))
}

module.exports = env === 'development' ? development : production;
