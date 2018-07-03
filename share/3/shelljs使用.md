# shelljs
## 介绍
一个在node里使用的脚本库
## 引入方式

```js
var shell = require('shelljs');
shell.echo('hello world');
```

## 一些简单用法

```js
// 删除
shell.rm('-rf', 'out/Release');
// 复制
shell.cp('-R', 'stuff/', 'out/Release');
// 切换目录
shell.cd('..');
// 查看当前目录文件
shell.ls('*.js').forEach(function (file) {
  // 替换文件内的特殊字符
  shell.sed('-i', 'BUILD_VERSION', 'v0.1.2', file);
  shell.sed('-i', /^.*REMOVE_THIS_LINE.*$/, '', file);
  // 从文件中读取内容，替换现有文件内容
  shell.sed('-i', /.*REPLACE_LINE_WITH_MACRO.*\n/, shell.cat('macro.js'), file);
});
// 如果不喜欢使用它封装的方法，还可以直接执行shell命令
shell.exec('cd ..')


// 为了防止命令执行出错，可以用if包裹，然后判断code值
if (shell.exec('git commit -am "Auto-commit"').code !== 0) {
  // 在命令行打印，类似于console
  shell.echo('Error: Git commit failed');
  // 退出
  shell.exit(1);
}

```
## 好了上边已经介绍了1+1=2，下边来一个完整的例子

```js
// 用node执行js文件，后边可以追加一些信息，可以在代码里获取
node deploy "commit信息"
// process是一个全局对象，argv返回的是一组包含命令行参数的数组，其中前两个参数分别是 'node'和'deploy.js'
var commitMessage = process.argv.splice(2)
if(commitMessage.length === 0){
    console.warn('错误，未填写commit信息');
    console.warn('使用方法 node deploy "<commit message>"');
    shell.exit(1);
}
shell.exec('npm run build')

// 中间可能有很多自己的代码

shell.exec('git add .')
if (shell.exec('git commit -m' + commitMessage[0]).code !== 0) {
    console.error('错误，无可用的提交文件');
    shell.exit(1);
}
shell.exec('git push')
console.log('==================已完成===================')

```
