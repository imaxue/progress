var gulp = require('gulp'),
    gulpSync = require('gulp-sync')(gulp),
    browserSync = require('browser-sync'),
    rename = require('gulp-rename'),
    del = require('del'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector');

var taskHtml = require('./tasks/html'),
    taskCss = require('./tasks/css'),
    taskImgs = require('./tasks/imgs'),
    publicJs = require('./tasks/public-js'),
    pagesJs = require('./tasks/pages-js'),
    config = require('./gulp.config'),
    //开发环境编译输出地址
    devDir = config.devDir,
    //生产环境编译输出地址
    prodDir = config.prodDir,
    //当前运行的环境变量
    env = config.env;

gulp.task('clean', function () {
    del.sync([env === 'development' ? devDir : prodDir]);
});

gulp.task('config', function () {
    var configName = env === 'development' ? 'dev' : 'prod',
        destDir = env === 'development' ? devDir : prodDir;
    return gulp.src('config/config.' + configName + '.js')
        .pipe(rename({
            basename: 'config'
        }))
        .pipe(gulp.dest(destDir + '/js/public'))
});

gulp.task('html', taskHtml);

gulp.task('css', taskCss);

gulp.task('imgs', taskImgs);

gulp.task('public-js', publicJs);

gulp.task('pages-js', pagesJs);

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
// gulp.task('build', gulpSync.sync(['clean', 'config', ['imgs', 'css', 'public-js', 'pages-js'], 'html', 'hash', 'delRev']));
gulp.task('build', gulpSync.sync(['clean', 'config', ['imgs', 'html', 'css', 'public-js', 'pages-js']]));
