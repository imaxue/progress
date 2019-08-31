#### 引言
- Terminal == 终端 == command-line

#### 打开终端
- 打开 Launchpad（F4） ，搜索 Terminal ，点击 终端；
- 或者使用快捷键 ctrl + 空格，在 Spotlight 里面搜索 Terminal

#### 为什么要使用命令行/如何开启命令行？
- 许多功能在图形界面不提供，只有通过命令行来实现。
- Finder会隐藏许多你不太会需要的文件，然而 command line 会允许你访问所有文件。
- 通过 command line 可以远程访问你的 Mac（利用 SSH）。
- administrators 用户可以通过 sudo 命令获得 root 用户权限。
- 通过 command-line script 可以使工作更高效。
- 如果你开启手动输入用户名登陆模式，登陆时在用户名处输入 >console 可以直接进入命令行界面。随后你仍然需要登录到一个账户。

#### 1、初识Command Line
- 许多命令会花费一些时间来执行，然而这中间不会给出任何提示或者进度条。一般结束后会出现一个“用户名$”的标记。如果没有出现，那么说明最后一条命令正在执行。
- 一条命令包括 Command Name、Options、Arguments、Extras 四个部分，但是后三个部分有时是可选的
  - Options 部分用-作为前导符。其中许多命令的 Options 部分只包含单个字母，这时可以合并。例如，ls -lA和ls -l -A是等效的
  - Arguments 部分用来细化这个命令或指定这个命令具体的实施对象
- 举例：下列命令包含前三个部分，用于删除 Junk 这个程序

```
    michelle$ rm -R /Applications/Junk.app
```
- 如果你输入了一些错误的命令，系统会返回一些错误信息。但是系统却不会阻止你做傻事（例如删除整个用户文件夹）。

#### 2、关于 man 命令
- 虽然有上千条命令，每条命令还有许多可选参数和具体的使用方式，但是你却不需要记住这些命令。你只需要记住一个：man 命令
- 大多数命令都会包含一个使用指南，会告诉你任何你需要知道的关于这个命令的所有细节，在命令行中输入 man command-name 即可获取
- 例如，你想知道ls这个命令怎么使用，输入man ls即可进入使用指南页面。
- 按Q来退出使用指南页面。
- 如果你连命令名称都不知道怎么办呢？输入man -k和关键字来对整个使用指南数据库进行搜索。

#### 3、命令行，文件和路径
#####  3.1、引言
- 如果知道如何使用命令是掌握 command line 的第一步，那么第二步就是学习如何在 command line 中使用文件路径。如果你掌握了文件路径，你将会发现这比使用 Finder 更加快捷。
- command line 工具是大小写敏感的，并且对于文件名，必须包括扩展名。例如，你想找iTunes这个程序，输入itunes是无效的，必须输入iTunes.app。

##### 3.2、两种路径：绝对路径和相对路径
- 绝对路径：完整描述一个文件的位置，总是以斜杠（/）（forward slash）开头。
    - 例如/Users/michelle/Public/Drop Box。
- 相对路径：只描述一部分位置信息，它和你在 command line 目前的目录有关。
    - 当你打开新的 Terminal 程序时，command line 会话的目录应该是你的 home folder。这时上面例子文件夹的相对路径写作Public/Drop Box。

##### 3.3、切换到其他路径和目录
- 如果你想将当前 command line 会话切换到其他目录，需要用到三个命令：pwd，ls和cd。
- pwd的含义是“print working directory”，会显示当前目录的绝对路径。
- ls的含义是“list directory contents”，它会列出当前目录的内容。这个命令还有其他参数可选。
- cd的含义是“change directory”，它会改变当前目录到你指定的目录。如果你不指定，则会返回你的 home folder。

##### 3.4、处理特殊字符
- 如果目录中有特殊字符（空格，括号，引号，[]，!，$，&，*，;，|，\），那么直接输入空格会造成系统识别困难，必须使用特殊的语法来表示这些字符。
- 例如上例中，空格前添加反斜杠“\”（back slash）即可：cd Punlic/Drop\ Box/。除了反斜杠，也可以用引号的方法：cd "Public/Drop Box"。
- 如果不想手动输入，也可以把文件从 Finder 拖到 Terminal 窗口来创建绝对路径
- 其实，更有效率的解决方案是使用 Tab Complete 功能。
    - 就是tab自动补全
- 鄂化符~（tilde）在command line 中可以代表当前用户的 home folder。

##### 3.5、查看隐藏文件
- 为了简化工作，command line 和 Finder 都会隐藏许多文件和文件夹，这些内容通常是系统需要的。
    - command line也有隐藏的文件
- ls命令会隐藏文件名以.开头的文件，但是这些文件却可以被显示出来，方法是利用-a选项。例如：michelle$ ls -la
- 我们还添加了-l选项，目的是控制输出格式。
- 如果你注意输出内容的话，会发现还包括.和..两项，它们分别表示当前文件夹和父文件夹（如图）。
    - 如果你不想显示这两项，只需要把-a改成-A即可。

##### 3.6、前往其他卷
- 在 command line 中，系统卷（也称为 root volume）是由开始的一个正斜杠表示的。
- 然而也许听起来不可思议，在 command line 中其他卷看起来就在文件系统中一个叫做 Volumes 的文件夹中。
- 下面的命令清晰地显示出这种逻辑关系：我从我的 home folder 出发，最终前往一个叫 Time Machine 的卷，该卷是外接在 Mac 上的。
```
    bogon:~ renfei$ pwd
    /Users/renfei
    bogon:~ renfei$ cd /Volumes/
    bogon:Volumes renfei$ pwd
    /Volumes
    bogon:Volumes renfei$ ls
    Macintosh SSD &nbsp; &nbsp; &nbsp;Time Machine
    bogon:Volumes renfei$ cd Time\ Machine/
    bogon:Time Machine renfei$ pwd
    /Volumes/Time Machine
```
#### 4、用Command-Line管理文件
##### 4.1、检视文件
- 有许多基础命令用来定位、检视文件和文件夹，包括cat, less, which, file以及find
- cat
    - cat是“concatenate”的意思，会按顺序读取文件并输出到 Terminal 窗口，语法为cat后接你需要查看的文件的路径。
    - cat命令也可以用>>来增加文本文件的内容
    - 例如命令cat ../textOne.txt >> textTwo.txt会把 textOne.txt 的内容添加到 textTwo.txt 的结尾
    - 这个>>就属于上一篇提到的“Extras”
- less
    - 这个命令更适合用来查看长文本文件，因为它会允许你查找文本。
    - 语法为 less后接文件路径，和cat一样。
    - 按V键来使用vi文本编辑器
- which
    - 这个命令会定位某个命令的文件路径。
    - 换言之，它会告诉你你执行某个具体命令的时候，在使用哪个文件。
    - 语法为which后接某个命令。
- file
    - 这个命令会尝试根据文件的内容输出文件类型。
    - 如果一个文件缺失了扩展名，那么这个命令可能会非常有用。
    - 语法为file后接文件路径。
- find
    - 这个命令用来根据搜索关键词定位文件路径。
    - 语法为find后接搜索的起始路径，后接定义搜索的选项，后接搜索内容（包含在引号里）。

##### 4.2、使用通配符（Wildcard Characters）
- 下面是常用的通配符：
- 星号（＊，Asterisk）——代表任何长度的任何字符。例如*.tiff代表所有格式为tiff的文件。
- 问号（?，Question mark）——代表任何单个字符。例如b?ok匹配 book 但是不匹配 brook。
- 方括号（[]，Square brackets）——定义一定范围的字符，例如[Dd]ocument匹配 Document 以及 document；doc[1-9]匹配doc1, doc2, …, doc9。
- 配合使用上面三种通配符可以大大提高效率。

##### 4.3、使用递归命令
- 简单来说，递归命令可以允许命令不执行于一个特定文件，而是指定的路径下的所有文件。
- 大多数命令包含一个-r或者-R选项，来设定你想递归地执行这个命令。

##### 4.4、编辑文件和文件夹
- 有许多基础的命令用来编辑文件和文件夹，包括mkdir, cp, mv, rm, rmdir以及vi。下面我们来简要地介绍一下这些命令。
- mkdir
- 省略。。。

#### 5、用Command-Line管理系统
##### 5.1、使用su来切换用户
- su命令代表“substitute user identity”，允许你在命令行中轻松切换到另一个用户账户。
- 语法为su后接用户的短名称。然后会要求你输入密码（但是输入的时候不会显示）。
- 执行完毕后，命令的前缀会改变，表示你拥有其他用户的权利。
- 你可以利用who -m命令来验证当前登陆的身份。
- 切换后，你会一直保持该用户身份，直至退出 Terminal 或者输入exit命令。

##### 5.2、关于sudo的使用
- sudo概述
    - 更强大的命令就是sudo，代表“substitute user do”，或者，更恰当地，“super user do”。用sudo执行一个命令会使用 root 账户权限。
    - 当然，使用之前需要 administrator 账户（管理员账户）的授权（如输入密码）。
    - 默认情况下，任何管理员账户都可以使用sudo来获取 root 权限，甚至当 root 账户在图形界面被禁用的情况下，sudo依然有效。
    - 这个命令是很多情况下我们不得不使用 Terminal 的原因，——同样也是给每个用户管理员身份的危险所在。
    - 不过，你可以调整sudo的配置文件，来限制它的使用。
    - 提示：如果由于你忘了使用sudo而导致命令行返回一个错误，只需输入sudo !!就可以用sudo来执行上一条指令。
    - 记住，权力越大责任越大。不恰当地使用sudo可以轻易破坏你的系统设置。
    - 如果你只掌握三条使用命令行的准则，那将是：总是仔细检查你的命令；总是使用Tab completion来帮助你避免拼写错误；使用sudo之前，总是仔仔细细检查你的命令。
- 使用 sudo 切换 Shell
    - 如果你是一个管理员用户，你需要执行很多条需要 root 权限的命令，你可以临时切换整个命令行 shell 来取得 root 级别的访问权限。
    - 方法就是先输入sudo -s，回车后再键入你的密码。

#### 6、其他Command-Line技巧提示
- 输入命令open .可以用 Finder 打开当前的位置。
- 在 Terminal 的偏好里面可以设定它的外观和风格。
- 中止一个错误的或者发疯的命令，可以使用组合键control + C。
- 你可以在执行前编辑命令，只需要使用箭头和键盘上的其他字母。
- 没有输入任何命令时，你可以用▲和▼来浏览历史命令。同样可以编辑和再次执行。
- 你也可以使用history命令查看历史记录。
- 你可以使用组合键control + L清屏。
