#### 引言
- 最近公司要使用vscode作为开发工具，需要对vscode做一些定制功能，比如snippet提示，内容提示，以及其他插件集成等，为此做了一些调查，并做了一定的开发与支持。

#### 插件开发官方文档
- https://code.visualstudio.com/docs
- 上面是vscode官方提供的extension开发帮助，按照上面的步骤基本上可以做简单的demo事例
- 如下主要介绍下自己在开发中做的几个简单功能：

#### 1. Snippet
- 感觉vscode的snippet功能真的很强大，只要编辑相应的json配置文件，在文档编辑过程中的各种提示应有尽有
- 在vscode的market上，也可以找到各种后缀格式的文件的配置。
- snippet的配置很简单，只需要配置对应的json文件就可以了
- snippet可以通过两种方式添加：
    - 1.1 通过vscode->首选项-->用户代码段
    - 1.2 通过开发snippet的extension
- 1.1 通过vscode->首选项-->用户代码段
    - 通过这种方式等于是通过配置自己本地的代码片段，而且只能在本机使用。
- 1.2 通过开发snippet的extension
    - 对于开发snippet的extension很简单，配置好vscode extension的工程结构，只需要在package.json文件中的contributes-->snippets即可,配置上自己写的json文件或者添加从第三方获取到的json文件即可。
    - 通过这种方式，把插件打包发布以后，可以轻松的共享给自己的小伙伴们，对于snippet的扩展很方便。
    ```
      "contributes": {
        "snippets": [
                {
                    "language": "cpp",
                    "path": "./snippets/snippets.json"
                }
            ],
      }
    ```
#### 2. registerCommand
- 在vscode的插件开发，最基础的就应该算是command了，在功能命令，右键菜单，menu， keybindings等都和command相关，所以在做这些功能之前，首先需要自己注册一个command进去。
```
export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "demoCmd" is now active!');
    let demoCmd= vscode.commands.registerCommand('extension.demoCmd', () => {
        // The code you place here will be executed every time your command is executed
    });
    context.subscriptions.push(demoCmd);
}

export function deactivate() {
    
}
```
- 这个也是整个插件的入口，上例子中定义了一个extension.demoCmd的cmd
- 对于上面说的一些定制功能，都需要通过这个cmd在package.json中配置。
- 注：如下的命令和配置都是在package.json中的contributes属性

##### 2.1 注册命令
- 注册命令与其名称，注意此处的command必须与上门代码中的cmd名称一致。
```
     "commands": [{
        "command": "extension.demoCmd",
        "title": "demoCmd"
    }],
```
- 注册了这个命令，就可以通过vscode在F1弹出的窗口中输入命令，找到自己刚刚注册的cmd
- 但是如果添加一个快捷键是不是会更方便呢？

##### 2.2 command添加keybindings 快捷键
```
"keybindings": [{
                "command": "extension.demoCmd",
                "key": "ctrl+shift+a",
                "mac": "ctrl+shift+a",
                "when": "editorTextFocus"
            }],
```
- 此处注册一个ctrl+shift+a的快捷键调用我们注册的cmd
- 添加了以后，可以通过快捷键试试效果，是不是比在F1中输入命令找到对应的cmd方便多了。

##### 2.3 command添加到右键menu
- 注册了快捷键，是方便了，但是对于很多用户来说，有一个menu按钮或者有一个右键菜单是不是更方便呢？
```
"menus": {
      "editor/context": [
        {
          "when": "resourceLangId == cpp",
          "command": "extension.demoCmd",
          "group": "navigation"
        }],
        "editor/title": [{
                "when": "resourceLangId == cpp",
                "command": "extension.demoCmd",
                "group": "navigation"
         }]
```
- 如上，提供了两种方式添加menu
    - editor/context：鼠标右键菜单
    - editor/title：菜单栏按钮

##### 2.4 setting.json配置提示
- 刚才说了snippet文件内容提示，但是对于插件开发来说，很有可能需要用户配置一些本机的环境或者参数之类的变量，对于这个名称格式的提示也是很有必要的，省的用户配置错误。
- 省略。。。

#### 3. 一些高阶用法

#### 4. 打包发布插件
- 这个就参考官方的发布方法，再次提示一点，以为如果是公司内部开发，有些东西是不能对外提交发布的，所以可以考虑只打包，通过本地安装
```
vsce package
```
- 自己打包以后，把打包完成的*.vsix内网发布出去，可以让同事们通过 <b>从VSIX安装</b>

#### 小结：
- 随着web发展，vscode使用范围在扩大，从extensions market市场上也可以发现，各种功能的插件基本都很齐全，可以很大的提高代码编码速度，同时还可以通过各种提示校验等，提高代码质量。
- 同时vscode extensions 开发门槛不高，对于公司内部用于规范代码格式，提高代码质量，降低代码学习门槛都是非常有用的。

#### 参考资料
- 【重点】https://www.jianshu.com/p/520c575e91c3
- http://blog.haoji.me/vscode-plugin-overview.html