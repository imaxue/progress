var path = require('path'),
    gulp = require('gulp'),
    glob = require('glob'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require("gulp-uglify"),
    rev = require('gulp-rev'),
    browserSync = require('browser-sync');

var config = require('../gulp.config'),
    //开发环境编译输出地址
    devDir = config.devDir,
    //生产环境编译输出地址
    prodDir = config.prodDir,
    //当前运行的环境变量
    env = config.env,
    jsDir = dir('app/js/pages/**/**-entry.js');

function dir(dirName) {
    return path.join(__dirname, '..', dirName);
}

function bundle(b, destPath) {
    return function () {
        b.bundle()
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({
                loadMaps: true
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(destPath))
            .pipe(browserSync.stream())
    }
}

function g(loopHandle, cb) {
    glob(jsDir, {}, function (err, files) {
        if (err) return cb(err);
        files.forEach(loopHandle);
        cb();
    })
}

function development(cb) {
    g(
        function (file) {
            var destPath = devDir + file.match(/(?<=app)\/[js/pages/].*(?=\/)/)[0];
            var b = browserify({
                entries: file,
                cache: {},
                packageCache: {},
                plugin: [watchify]
            })
            b.on('update', bundle(b, destPath));
            bundle(b, destPath)();
        },
        cb
    );
}

function production(cb) {
    g(
        function (file) {
            var destPath = file.match(/(?<=app)\/[js/pages/].*(?=\/)/)[0];
            browserify(file)
                .bundle()
                .pipe(source('bundle.js'))
                .pipe(buffer())
                .pipe(uglify())
                .pipe(rev())
                .pipe(gulp.dest(prodDir + destPath))
                .pipe(rev.manifest())
                .pipe(gulp.dest(prodDir + '/rev' + destPath))
        },
        cb
    )
}

module.exports = env === 'development' ? development : production;
