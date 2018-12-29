##一、什么是weback
webpack就是一个资源打包工具，它可以将css，image，less，sass，.vue等等文档当做一个模块进行打包处理，最终将这些资源输出到一个统一的.js文件中，将来在系统中只需要请求这个打包的.js文件即可完成所有的功能。

##二、为啥选择webpack：
* vuejs官方脚手架就使用了webpack模版

* 对所有的资源会做压缩等优化操作

* 它在开发过程中提供了一整套完整的功能，能够使得我们开发过程中变得高效（源代码改变之后保存一下，页面不用刷新就能同步）
  ##三、官方文档

* 1.官网 <https://webpack.js.org/>

* 2.webpack的基本打包演示

* 请参考以下文档<https://webpack.github.io/>

* 1.webpack 1.x <http://webpack.github.io/docs/>

* 2.webpack 2.x <https://webpack.js.org/>

* 1、将webpack安装成为全局包 npm install webpack -g

* 2、在cmd控制面板中调用webpack指令给定两个参数 要打包的文件路径 要输出的文件路径 例如 webpack main.js build.js

* 2.1什么是npm，npm是代表的是npmjs.org这个网站，这个站点存储了很多nodejs的第三方功能包。

   2.2利用npm这个工具可以将nodejs第三方包通过相关指令进行安装 例如npm install webpack -g。
      只要安装好了node.exe这个软件，就自动安装好了npm这个包。
    2.3 nodejs的下载地址：<https://nodejs.org/en/>
   ##四、安装webpack的过程：
   nodeJS下载安装，会自带安装npm； 
   2.npm -v查看npm安装版本号； 
   3.npm install webpack -g 安装webpack； 
   4.npm会被防火墙拦截，导致下载速度慢，所以要安装cnpm，即npm install cnpm -g； 
   5.cnpm install webpack -g替代npm install webpack -g，即替换第三步； 
   6.cnpm的常用指令： cnpm install -g 全局安装 / cnpm uninstall 卸载 / cnpm init 初始化
   ##四（一）、webpack 打包初始
   ![](E:\觅码实验室\progress\alisa\img\1.png)

   * 检验webpack是否安装成功通过webpack -v

   * 然后新建一个main.js 代码如下:

     ``var calcExports=require('./calc.js')

     console.log(calcExports.addFun(1, 2));``

     建立一个cala.js 代码如下：

     `function add(x,y) {`

     `return x+y;`

     `}`

     ``````
     
     ``````

     `module.exports={`

     `addFun:add`

     `}`

   * 通过终端打开到对应的目录下，执行命令 webpack main.js build.js 回车

   * 这时，目录下会生成一个压缩打包好的build.js

   * 此时新建一个index.js,代码如下：

     <!DOCTYPE html>`

     <html lang="en">`

     <head>`

     <meta charset="UTF-8">`

     <title>Document</title>`

     </head>`

     <body>`

     `<script src="./build.js"></script>`

     ````
     
     ````

     </body>`

     </html>`


检验webpack是否安装成功通过webpack -v