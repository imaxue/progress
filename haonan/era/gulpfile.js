var gulp = require('gulp'),
    gulpSync = require('gulp-sync')(gulp),
    glob = require('glob'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    plumber = require('gulp-plumber'),
    base64 = require('gulp-base64'),
    browserSync = require('browser-sync'),
    autoprefixer = require('autoprefixer')({
        browsers: [
            "> 5% in CH",
            "last 2 versions",
            "ie 10-11"
        ]
    }),
    postcss = require('gulp-postcss'),
    sass = require('gulp-sass'),
    changed = require('gulp-changed'),
    fileinclude = require('gulp-file-include'),
    rename = require('gulp-rename'),
    del = require('del'),
    uglify = require("gulp-uglify"),
    csso = require('gulp-csso'),
    // htmlMinify = require('gulp-html-minify'),
    imagemin = require('gulp-imagemin'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    path = require('path'),
    //开发环境编译输出地址
    devDir = 'DEV',
    //生产环境编译输出地址
    prodDir = 'DIST',
    //当前运行的环境变量
    env = process.env.NODE_ENV;

gulp.task('clean', function () {
    if (env === 'development') {
        del.sync([devDir])
    } else {
        del.sync([prodDir])
    }
});

gulp.task('config', function () {
    if (env === 'development') {
        return gulp.src('config/config.dev.js')
            .pipe(rename({
                basename: 'config'
            }))
            .pipe(gulp.dest(devDir + '/js/public'))
    } else {
        return gulp.src('config/config.prod.js')
            .pipe(rename({
                basename: 'config'
            }))
            .pipe(gulp.dest(prodDir + '/js/public'))
    }
});

gulp.task('html', function () {
    if (env === 'development') {
        return gulp.src('app/html/pages/*.html')
            .pipe(plumber())
            .pipe(fileinclude({
                basepath: path.join(__dirname, 'app/html/public/')
            }))
            .pipe(gulp.dest(devDir))
            .pipe(browserSync.stream())
    } else {
        return gulp.src('app/html/pages/*.html')
            .pipe(fileinclude({
                basepath: path.join(__dirname, 'app/html/public/')
            }))
            // .pipe(htmlMinify())
            .pipe(gulp.dest(prodDir))
    }
});

gulp.task('css', function () {
    if (env === 'development') {
        return gulp.src('app/css/**/*.scss')
            .pipe(plumber())
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
    } else {
        return gulp.src('app/css/**/*.scss')
            .pipe(sass())
            .pipe(postcss([autoprefixer]))
            .pipe(base64())
            .pipe(csso())
            .pipe(rev())
            .pipe(gulp.dest(prodDir + '/css'))
            .pipe(rev.manifest())
            .pipe(gulp.dest(prodDir + '/rev/css'))
    }
});

gulp.task('imgs', function () {
    if (env === 'development') {
        return gulp.src('app/imgs/**/*.*')
            .pipe(plumber())
            .pipe(gulp.dest(devDir + '/imgs'))
    } else {
        return gulp.src('app/imgs/**/*.*')
            .pipe(imagemin())
            .pipe(rev())
            .pipe(gulp.dest(prodDir + '/imgs'))
            .pipe(rev.manifest())
            .pipe(gulp.dest(prodDir + '/rev/imgs'))
    }
});

gulp.task('public-js', function () {
    if (env === 'development') {
        return gulp.src('app/js/public/**/*.js')
            .pipe(plumber())
            .pipe(gulp.dest(devDir + '/js/public'))
            .pipe(browserSync.stream())
    } else {
        return gulp.src('app/js/public/**/*.js')
            .pipe(rev())
            .pipe(gulp.dest(prodDir + '/js/public'))
            .pipe(rev.manifest())
            .pipe(gulp.dest(prodDir + '/rev/js/public'))
    }
});

gulp.task('pages-js', function (cb) {
    if (env === 'development') {
        glob('app/js/pages/**/**-entry.js', {}, function (err, files) {
            if (err) return cb(err);
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
            files.forEach(function (file) {
                var destPath = devDir + file.match(/\/[js/pages/].*(?=\/)/)[0];
                var b = browserify({
                    entries: file,
                    cache: {},
                    packageCache: {},
                    plugin: [watchify]
                })
                b.on('update', bundle(b, destPath));
                bundle(b, destPath)();
            });
            cb();
        })
    } else {
        glob('app/js/pages/**/**-entry.js', {}, function (err, files) {
            if (err) return cb(err);
            files.forEach(function (file) {
                var destPath = file.match(/\/[js/pages/].*(?=\/)/)[0];
                browserify(file)
                    .bundle()
                    .pipe(source('bundle.js'))
                    .pipe(buffer())
                    .pipe(uglify())
                    .pipe(rev())
                    .pipe(gulp.dest(prodDir + destPath))
                    .pipe(rev.manifest())
                    .pipe(gulp.dest(prodDir + '/rev' + destPath))
            });
            cb();
        })
    }
});

gulp.task('browserSync', function () {
    browserSync({
        port: 9090,
        open: false,
        notify: false,
        server: {
            baseDir: devDir
        }
    })
});

gulp.task('watch', function () {
    gulp.watch('app/**/*.html', ['html']);
    gulp.watch('app/css/**/*.scss', ['css']);
    gulp.watch('app/imgs/**/*.*', ['imgs']);
    // gulp.watch('app/js/pages/**/*.js', ['pages-js']);
    gulp.watch('app/js/public/**/*.js', ['public-js']);
});

gulp.task('hash', function () {
    return gulp.src([prodDir + '/rev/**/*.json', prodDir + '/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest(prodDir))
});

gulp.task('delRev', function () {
    del.sync([prodDir + '/rev'])
});

gulp.task('dev', gulpSync.sync(['clean', 'config', ['imgs', 'html', 'css', 'public-js', 'pages-js'], 'browserSync', 'watch']));
gulp.task('build', gulpSync.sync(['clean', 'config', ['imgs', 'html', 'css', 'public-js', 'pages-js'], 'hash', 'delRev']));
