# npm命令

- 安装依赖
  + 当前目录中存在package.json时，通过``npm install`` 安装所有项目依赖
  + 安装运行依赖：``npm install xxx --save``；通过此方式安装的插件会添加在package.json中的``"dependencies"``；简写：``npm i xxx -S``
  + 安装开发依赖： ``npm install xxx --save-dev``；通过此方式安装的插件会添加在package.json中的``"devDependencies"``；简写：``npm i xxx -D``
  + 全局安装： ``npm install -g xxx``

- 查看全局安装的插件：``npm list -g --depth 0``

- 升级全局安装的包： ``npm update -g xxx``

- 配置某npm包的镜像(以nod-sass淘宝镜像为例)： `` npm config set sass-binary-site http://npm.taobao.org/mirrors/node-sass ``