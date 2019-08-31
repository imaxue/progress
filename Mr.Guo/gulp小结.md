## gulp4.0

前段时间写gulp的时候没注意已经到4.0了，按照3.x的写法会出很多错误，就顺便查了一下资料

1.移除了gulp.task传递三参数的用法

```gulp
gulp.task('watch', ['default'], function() {
    // TODO
    // watch file
});
 
  
```

上面这种写法就会报错了。

gulp官方建议：

当我们想在命令行通过敲gulp taskname的方式执行一个任务，这时候你应该使用gulp.task注册taskName
当一个较复杂的任务（如dist）由很多个子任务组合而成的时候，子任务使用具名函数即可，不用单独为每个子任务进行注册，
而只需将dist使用gulp.task进行注册，以前的版本则必须将每一个子任务都先使用gulp.task进行注册，然后再组合出dist，详细用法见最后的例子。
gulp.task又增加了一种用法，即传递一个具名函数作为参数，将自动注册以该函数名命名的任务。

```gulp
  function compile() {
    // TODO
    gulp.src('./src/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
  }
  gulp.task(compile);

```

这种写法相当于

```gulp
  gulp.task('compile', function() {
    // TODO
    gulp.src('./src/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
  });

```

两者都可以通过命令行运行gulp compile执行任务

增加了gulp.series和gulp.parallel
哈哈，解放军来了。

如果你是gulp深度使用者，你一定不止一次吐槽过gulp的任务流程难以控制，就像一条复杂的电路一样，电路上很多电阻都是串联加并联的方式连接在一起，
gulp一个复杂的任务同样也是由很多个子任务以串联（同步）加并联（异步）的方式连接在一起的。

老版本的gulp对多个异步任务很难控制，必须借助于第三方模块，如run-sequence、event-stream等，效果也并不理想。

现在gulp带来了两个新的api：gulp.series和gulp.parallel，这两个革命性的api将帮助开发者解决恼人的任务流程控制问题。

下面就来见识新api的神奇之处吧。

以开发中最常见的dist任务为例，使用gulp首先得分解任务，dist大致分解成子任务如下

删除开发目录dev，clean-dev
删除发布目录dist，clean-dist
合图并修改css中图片引用，sprite
预编译css（如sass）到dev，compile-css
预编译js到dev，compile-js
从src拷贝html到dev，copy-html
对dev下面的js/css进行md5，再拷贝到dist，reversion
替换dev下html中js/css进行过md5之后的文件路径，并拷贝到dist，replcae
这只是一个普通的dist任务，我将dist拆得比较细并省略了压缩合并等常规任务，大致由以上8个步骤组成。

拆的粒度完全由自己控制，达到方便复用又便于理解的目的就行。

使用老版本的gulp，首先需要对每一个任务进行注册，这里只是为了说明问题，我省略了任务的具体代码。

```gulp
gulp.task('compile-css', ['sprite']);
gulp.task('dev', ['clean-dev'], function() {
    runSecquence(['compile-css', 'compile-js', 'copy-html']);
});
gulp.task('md5', ['dev', 'clean-dist'], function() {
    runSecquence('reversion');
});
gulp.task('dist', ['md5'], function() {
    runSecquence('replcae');
});
 
 
```

如果我们换成4.0就是
```gulp
function cleanDev() {// TODO}
function cleanDist() {// TODO}
function sprite() {// TODO}
function compileCss() {// TODO}
function compileJs() {// TODO}
function copyHtml() {// TODO}
function reversion() {// TODO}
function replcae() {// TODO}
 
gulp.task('dist', gulp.series(
    gulp.parallel(
        gulp.series(
            cleanDev,
            gulp.parallel(
                gulp.series(
                    sprite,
                    compileCss
                ),
                compileJs,
                copyHtml
            )
        ),
        cleanDist
    ),
    reversion,
    replcae
));

```
gulp.series和gulp.parallel都可以接受以gulp.task注册的任务名干脆就是一个（多个）函数，省去了一大堆gulp.task的代码，
同时也达到了任务复用的目的，将子任务经过不同的组合又可以产生新的任务。

另外再说一点，只要在gulpfile.js中没有使用gulp.task传三个参数的用法，gulp 4.0也是兼容老版本的gulpfile.js的。

原文地址：转载自AlloyTeam：http://www.alloyteam.com/2015/07/update-your-gulp/
