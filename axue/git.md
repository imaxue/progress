## git 分支
Git 是怎么创建新分支的呢？ 很简单，它只是为你创建了一个可以移动的新的指针。 比如，创建一个 testing 分
支， 你需要使用 git branch 命令：
```
$ git branch testing
```
这会在当前所在的提交对象上创建一个指针。 git branch 命令仅仅 创建 一个新分支，并不会自动切换到新分支中去。

那么，Git 又是怎么知道当前在哪一个分支上呢？ 也很简单，它有一个名为 HEAD 的特殊指针。

### 分支切换
要切换到一个已存在的分支，你需要使用 git checkout 命令。 我们现在切换到新创建的 testing 分支
去：
```
$ git checkout testing
```
这样 HEAD 就指向 testing 分支了。

在切换分支时，一定要注意你工作目录里的文件会被改变。 如果是切换到一个较旧的分支，你的工作目录会恢复到该分支最后一次提交时的样子。 如果 Git 不能干净利落地完成这个任务，它将禁止切换分支。

想要新建一个分支并同时切换到那个分支上，你可以运行一个带有 -b 参数的 git checkout 命令：
git checkout -b iss53

你可以使用带 -d 选项的 git branch 命令来删除分支：
```
$ git branch -d hotfix
```