#### 1、自动换行设置
- 首选项-设置
- editor.wordWrap设置为on即可

#### 2、代码格式调整快捷键
- 上下移动一行： Alt+Up 或 Alt+Down
- 向上向下复制一行： Shift+Alt+Up 或 Shift+Alt+Down
- 在当前行下边插入一行 Ctrl+Enter
- 在当前行上方插入一行 Ctrl+Shift+Enter

#### 3、按文件名搜索文件
Ctrl+p

#### 4、vs code全局搜索快捷键失效的解决
- 1、打卡首选项-设置
- 2、把如下代码复制粘贴进入
```
"search.exclude": {
   "system/": true,
   "!/system/**/*.ps*": true
 }
```
- 重启VSCODE，不行就重启电脑即可；

#### 5、vs code中md文档的使用配置
- 使用vs code默认的md预览功能
    - Ctrl + Shift + P 调出主命令框
    - 输入markdown 
    - 选择open preview，在编辑器中就能看预览效果
- 使用插件丰富更快捷
    - 插件Markdown Preview Enhanced
    - Ctrl + Shift + P 调出主命令框
    - 输入markdown 
    - 选择Markdown Preview Enhanced：open preview
    - 在新打开的窗口中右键：open in Browser
    - 就能在浏览器中预览
- 相关链接
    - https://www.jianshu.com/p/9f13e971fe6b
