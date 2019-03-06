var gulp = require('gulp'),
    gulpSync = require('gulp-sync')(gulp),
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
        return gulp.src('app/html/pages/**/*.html')
            .pipe(plumber())
            .pipe(fileinclude({
                basepath: path.join(__dirname, 'app/html/public/')
            }))
            .pipe(gulp.dest(devDir))
            .pipe(browserSync.stream())
    } else {
        return gulp.src('app/html/pages/**/*.html')
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

gulp.task('js', function () {
    if (env === 'development') {
        return gulp.src('app/js/**/*.js')
            .pipe(plumber())
            .pipe(gulp.dest(devDir + '/js'))
            .pipe(browserSync.stream())
    } else {
        return gulp.src('app/js/**/*.js')
            .pipe(uglify())
            .pipe(rev())
            .pipe(gulp.dest(prodDir + '/js'))
            .pipe(rev.manifest())
            .pipe(gulp.dest(prodDir + '/rev/js'))
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
    gulp.watch('app/js/**/*.js', ['js']);
});

gulp.task('hash', function () {
    return gulp.src([prodDir + '/rev/**/*.json', prodDir + '/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest(prodDir))
});

gulp.task('delRev', function () {
    del.sync([prodDir + '/rev'])
});

gulp.task('dev', gulpSync.sync(['clean', 'config', ['imgs', 'html', 'css', 'js'], 'browserSync', 'watch']));
gulp.task('build', gulpSync.sync(['clean', 'config', ['imgs', 'html', 'css', 'js'], 'hash', 'delRev']));