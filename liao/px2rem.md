# px2rem

## 1. 安装
  安装lib-flexible：
```js
npm install --save lib-flexible
```
  安装postcss-loader和postcss-px2rem：
```js
npm install --save-dev postcss-loader postcss-px2rem
```
## 2. 在项目入口文件main.js中引入lib-flexible
```
import 'lib-flexible/flexible.js'
```
## 3. 在项目public目录的index.html头部加入手机端适配的meta的代码
```
<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0,minimum=1.0,user-scalable=no">
```
## 4. 在根目录下创建配制文件vue.config.js，并配制如下信息
  vue.config.js
```js
module.exports = {
    css: {
        loaderOptions: {
            css: {
                // options here will be passed to css-loader
            },
            postcss: {
                // options here will be passed to postcss-loader
                plugins: [require('postcss-px2rem')({
                    remUnit: 75
                })]
            }
        }
    }
}
```
  这个文件配制的信息将会被合并到类似原来2.x版本的webpack.config.js当中。

  注意： remUnit在这里要根据lib-flexible的规则来配制，如果您的设计稿是750px的，用75就刚刚好。

## 5. 温馨提示
  当你遇到1px的边框时，通常容易发现页面缺失部分边框，这时你可以使用/*no*/语法来屏蔽该属性转换，例如：
```css
border: 1px solid red; /*no*/
```
  由于字体的特殊性，我们在编译font-size属性时，通常不使用rem单位，这时候你可以这样使用：
```css
font-size: 24px; /*px*/
```
