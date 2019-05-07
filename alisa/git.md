1.参考网址 [](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013743256916071d599b3aed534aaab22a0db6c4e07fd0000)

操作步骤:

> 1. 首先，选择一个合适的地方，创建一个空目录：

```
$ mkdir learngit
$ cd learngit
$ pwd
```

* mkdir 创建目录

* cd 切换到哪个目录

* pwd当前操作的目录

  >

> 2. 第二步，通过`git init`命令把这个目录变成Git可以管理的仓库：

```
$ git init
Initialized empty Git repository in /Users/michael/learngit/.git/
```

瞬间Git创建了一个空的仓库（empty Git repository）,当前目录下多了一个`.git`的目录，这个目录是Git来跟踪管理版本库的，不要手动修改这个目录里面的文件，会把Git仓库给破坏了。

如果你没有看到`.git`目录，那是因为这个目录默认是隐藏的，用`ls -ah`命令就可以看见。

* ls-ah 让 .git目录下的文件显示

```
$ ls -ah
./  ../  .git/	
```

> 3. 在learngit目录下创建一个readme.txt文件,内容随意.
>
> 4. 用命令`git add`告诉Git，把文件添加到仓库：

```
$ git add readme.txt
```

执行上面的命令，没有任何显示，说明添加成功。

> 4.  用命令`git commit`告诉Git，把文件提交到仓库：

```
git commit -m "wrote a readme file" 
```

然后回车变成如下样子

```
$ git commit -m "wrote a readme file"
[master (root-commit) 23eab2c] wrote a readme file
 1 file changed, 2 insertions(+)
 create mode 100644 readme.txt

```

* git add  告诉Git，把文件添加到仓库：
* git commit  告诉Git，把文件提交到仓库：
* git commit -m "" 后面双引号输入的是本次提交的说明，可以输入任意内容，当然最好是有意义的，这样你就能从历史记录里方便地找到改动记录.

------

**为什么Git添加文件需要`add`，`commit`一共两步呢？因为`commit`可以一次提交很多文件，所以你可以多次`add`不同的文件，比如：**

```
$ git add file1.txt
$ git add file2.txt file3.txt
$ git commit -m "add 3 files."
```

> 5. 运行`git status`命令看看结果：

```
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")

```

* `git status`命令可以让我们时刻掌握**仓库**当前的状态
* `git diff`顾名思义就是查看difference(查看我们更改了哪些内容)
	注意git diff只有在提交之前查看才有效果,否则,没有任何效果.

```
$ git diff
diff --git a/readme.txt b/readme.txt
index d8036c1..013b5bc 100644
--- a/readme.txt
+++ b/readme.txt
@@ -1,2 +1,2 @@
-Git is a version control system.
+Git is a distributed version control system.
 Git is free software.
\ No newline at end of file

```

> 6. 接下来可以继续上面的操作 git add readme.txt
> 7. git status
> 8. git commit

> > > 我在输入git commit的时候忘记输入-m以及修改备注了,然后进入vim 模式的处理可以参考以下网址解决
> > >
> > > [](https://blog.csdn.net/bianliuzhu/article/details/81905343)
> > >
> > * 在没有#号的一行输入修改了哪些内容
> > * 按下ESC键,输入冒号,此时光标在最下方,然后输入wq回车,回到主页面
> > ```
> > $ git commit
> > [master (root-commit) fa997c9]  new file:   readme.txt 我是第一次提交的内容:
> > 1 file changed, 1 insertion(+)
> > create mode 100644 readme.txt
> > ```

####  版本回退()

* `git log`命令显示从最近到最远的提交日志，我们可以看到3次提交，最近的一次是`append GPL`，上一次是`add distributed`，最早的一次是`wrote a readme file`。

  ```
  $ git log
  commit 5dc971c5aaed54c55ff5bca8aeb1a5ecb6b0744c
  Author: alisa <alisawilliam@163.com>
  Date:   Thu Mar 7 09:49:44 2019 +0800
  
      lll
  
  commit 084c225d9fe96476041648d371fc8de46fc9191f
  Author: alisa <alisawilliam@163.com>
  Date:   Thu Mar 7 09:44:48 2019 +0800
  
      gaile
  
  commit 23eab2c374cbbfcd21bd3f114a9f85eec7a1c82c
  Author: alisa <alisawilliam@163.com>
  Date:   Wed Mar 6 16:42:22 2019 +0800
  
      wrote a readme file
  
  ```
> `git log`命令显示从最近到最远的提交日志，我们可以看到3次提交. 
> 如果嫌输出信息太多，看得眼花缭乱的，可以试试加上--pretty=oneline参数：
* $ git log --pretty=oneline
```
$ git log --pretty=oneline
5dc971c5aaed54c55ff5bca8aeb1a5ecb6b0744c lll
084c225d9fe96476041648d371fc8de46fc9191f gaile
23eab2c374cbbfcd21bd3f114a9f85eec7a1c82c wrote a readme file
```
>> 注意:我好几次把oneline打成了online,命令报错

#### 上面通过git log我们看到目前提交了三个版本的提交记录,分别的111   gaile  wrote a readme file,利用git reset命令回退到上一个版本
#### 上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100。
```
$ git reset --hard HEAD^
HEAD is now at 084c225 gaile
```
> 通过cat readme.txt命令查看文件内容,果然回退到上一个版本了.
* cat 命令查看文件内容
> 此时再通过git log命令查看版本号,发现最新的lll版本已经不见了
> 好比你从21世纪坐时光穿梭机来到了19世纪，想再回去已经回不去了，肿么办？

> 办法其实还是有的，只要上面的命令行窗口还没有被关掉，你就可以顺着往上找啊找啊，找到个
> append GPL的commit id是1094adb...，于是就可以指定回到未来的某个版本：
```
$ git reset --hard 5dc97
HEAD is now at 5dc971c lll
```
>> --hard 后面就是你通过git log --pretty=oneline得到的版本号的前五位数字
>>接下来可以git log 看一下是否有回退到有lll的版本号
```
$ git log
commit 5dc971c5aaed54c55ff5bca8aeb1a5ecb6b0744c
Author: alisa <alisawilliam@163.com>
Date:   Thu Mar 7 09:49:44 2019 +0800

    lll

commit 084c225d9fe96476041648d371fc8de46fc9191f
Author: alisa <alisawilliam@163.com>
Date:   Thu Mar 7 09:44:48 2019 +0800

    gaile

commit 23eab2c374cbbfcd21bd3f114a9f85eec7a1c82c
Author: alisa <alisawilliam@163.com>
Date:   Wed Mar 6 16:42:22 2019 +0800

    wrote a readme file

```
或者
```
$ git log --pretty=oneline
5dc971c5aaed54c55ff5bca8aeb1a5ecb6b0744c lll
084c225d9fe96476041648d371fc8de46fc9191f gaile
23eab2c374cbbfcd21bd3f114a9f85eec7a1c82c wrote a readme file

```
这样我们发现lll的版本号又回来了哈.
>>版本号没必要写全，前几位就可以了，Git会自动去找。当然也不能只写前一两位，因为Git可能>>会找到多个版本号，就无法确定是哪一个了。
然后再cat readme.txt看看内容回来了么
```
$ cat readme.txt
Git is a distributed version control system.
Git is free software.

```
>>反反复复回退,忘记之前的命令,Git提供了一个命令git reflog用来记录你的每一次命令：
```
$ git reflog
5dc971c HEAD@{0}: reset: moving to 5dc97
084c225 HEAD@{1}: reset: moving to HEAD^
5dc971c HEAD@{2}: commit: lll
084c225 HEAD@{3}: commit: gaile
23eab2c HEAD@{4}: commit (initial): wrote a readme file

```
小结:
HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令git reset --hard commit_id。
穿梭前，用git log可以查看提交历史，以便确定要回退到哪个版本。

要重返未来，用git reflog查看命令历史，以便确定要回到未来的哪个版本。

## 概念:
## 工作区（Working Directory）
>> 就是你在电脑里能看到的目录，比如我的learngit文件夹就是一个工作区：
## 版本库（Repository）
>> 工作区有一个隐藏目录.git，这个不算工作区，而是Git的版本库。
>> Git的版本库里存了很多东西，其中最重要的就是称为stage（或者叫index）的暂存区，还有 Git为我们自动创建的第一个分支master，以及指向master的一个指针叫HEAD。
>> ![](C:\Users\ADMINI~1\AppData\Local\Temp\1552444785139.png)
>> 我们把文件往Git版本库里添加的时候，是分两步执行的：
>> 第一步是用git add把文件添加进去，实际上就是把文件修改添加到暂存区；
>> 第二步是用git commit提交更改，实际上就是把暂存区的所有内容提交到当前分支。
>> 因为我们创建Git版本库时，Git自动为我们创建了唯一一个master分支，所以，现在，git  commit就是往master分支上提交更改。
>> 简单理解为，需要提交的文件修改通通放到暂存区，然后，一次性提交暂存区的所有修改。

