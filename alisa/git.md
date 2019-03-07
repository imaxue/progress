---

---

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

然而我这样操作之后并没有提交成功,明天再继续!!!!!!!!!!