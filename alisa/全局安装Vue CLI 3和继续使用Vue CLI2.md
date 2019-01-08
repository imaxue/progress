官方链接：https://cli.vuejs.org/zh/guide/installation.html

# 1.安装Vue cli3 
关于旧版本

Vue CLI 的包名称由 vue-cli 改成了 @vue/cli。 如果你已经全局安装了旧版本的 vue-cli(1.x 或 2.x)，你需要先通过 npm uninstall vue-cli -g 或 yarn global remove vue-cli 卸载它。

## Node 版本要求

Vue CLI 需要 Node.js 8.9 或更高版本 (推荐 8.11.0+)。你可以使用 nvm 或 nvm-windows在同一台电脑中管理多个 Node 版本。

可以使用下列任一命令安装这个新的包：

`npm install -g @vue/cli`
\# OR
`yarn global add @vue/cli`
安装之后，你就可以在命令行中访问 vue 命令。你可以通过简单运行 vue，看看是否展示出了一份所有可用命令的帮助信息，来验证它是否安装成功。

你还可以用这个命令来检查其版本是否正确 (3.x)：

vue --version 会显示你的具体版本号,如下

![1546934363052](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1546934363052.png)

# 2.安装完Vue cli3 之后，还想用vue-cli2.x 版本

#### Vue CLI 3 和旧版使用了相同的 vue 命令，所以 Vue CLI 2 (vue-cli) 被覆盖了。如果你仍然需要使用旧版本的 vue init 功能，你可以全局安装一个桥接工具：



`npm install -g @vue/cli-init`
//安装完后 就还可以使用 vue init 命令
`vue init webpack my_project`