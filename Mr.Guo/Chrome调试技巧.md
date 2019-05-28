## 简介
谷歌浏览器（通常简称为 Chrome ）是由谷歌开发的网络浏览器。 它于 2008 年首次针对 Microsoft Windows 发布，后来移植到 Linux ，macOS ，iOS 和 
Android 。 浏览器也是 Chrome OS 的主要组件，它可以作为 Web 应用的平台。

### 打开Chrome开发者工具
1.菜单中选择 更多工具 => 开发者工具
2.在页面元素上右键点击，选择“检查”
3. 使用Ctrl + Shift + I(windows) 或 Cmd + Opt + I(Mac)

### 了解面板
1.元素面板
2.控制台面板
3.源代码面板
4.网络面板
5.性能面板
6.内存面板
7.应用面板
8.安全面板

##  copying & saving
1. copy()
在控制台输入 copy(你的变量)就可以把内容复制到粘贴板上
2. Store as global(存储为一个全局变量)
如果你在 console 中打印了一堆数据 (例如你在 App 中计算出来的一个数组) ，然后你想对这些数据做一些额外的操作比如我们刚刚说的
copy (在不影响它原来值的情况下) 。 那就可以将它转换成一个全局变量，只需要 右击 它，并选择 “Store as global variable” (保存为全局变量) 选项。
第一次使用的话，它会创建一个名为 temp1 的变量，第二次创建 temp2，第三次 ... 。通过使用这些变量来操作对应的数据，不用再担心影响到他们原来的值。
3. copy Html
选中dom节点直接右击copy，或者Ctrl + c，依然可以用

## 使用Command
我们直接可以直接看到的 DevTools 的功能，其实只是有限的一部分，怎么去探索更多的功能呢？
Command 菜单可以帮助我们快速找到那些被隐藏起来的功能，这也是它本身必不可少的原因。
如果你使用过 WebStorm 中的 Find Action (查找动作) 或者 Visual Studio Code 中的 Command Palette 的话，那么在 DevTools 中的 Command
菜单也与之类似：
在 Chrome 的调试打开的情况下 按下 [ Ctrl] + [Shift] + [P] (Mac： [⌘] + [Shift]+ [P] )

1.截屏新姿势
[⌘] + [Shift]+ [P]后输入screen,选择
