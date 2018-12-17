##### 新建工程：
- 如果是新建一个angular工程采用sass：
```
ng new My_New_Project --style=sass
```
- 这样所有样式的地方都将采用sass样式，如果需要使用sass的scss语法，还可以如下方式：
```
ng new My_New_Project --style=scss
```
- 然后需要手动安装node-sass:
```
npm install node-sass --save-dev
```
- 这样就可以实现用sass语法做样式了。

##### 已有angular-cli工程改为sass：
- 首先同样安装sass需要的node-sass包
```
npm install node-sass --save-dev
```

- 然后修改已有项目的.angular-cli.json配置文件：
```
//其中的css修改为sass或scss。
"styles": [
        "styles.css"
],
...
//修改最后的defaults标签
"defaults": {
     "styleExt": "sass",
}
```
- 并把全局style.css文件改为style.scss或style.sass。

##### 相关结论
- 测试需要在全局样式style.scss中进行；

##### 相关链接：
- https://www.jianshu.com/p/14243eb0d438