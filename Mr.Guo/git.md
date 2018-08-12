- [Rebase 合并](#rebase-%E5%90%88%E5%B9%B6)
- [stash](#stash)
- [reflog](#reflog)
- [Reset](#reset)

## Rebase 合并

该命令可以让和 `merge` 命令得到的结果基本是一致的。

通常使用 `merge` 操作将分支上的代码合并到 `master` 中，分支样子如下所示

![](https://user-gold-cdn.xitu.io/2018/4/23/162f109db27be054?w=505&h=461&f=png&s=22796)

使用 `rebase` 后，会将 `develop` 上的 `commit` 按顺序移到 `master` 的第三个 `commit` 后面，分支样子如下所示

![](https://user-gold-cdn.xitu.io/2018/4/23/162f11cc2cb8b332?w=505&h=563&f=png&s=26514)

Rebase 对比 merge，优势在于合并后的结果很清晰，只有一条线，劣势在于如果一旦出现冲突，解决冲突很麻烦，可能要解决多个冲突，但是 merge 出现冲突只需要解决一次。

使用 rebase 应该在需要被 rebase 的分支上操作，并且该分支是本地分支。如果 `develop` 分支需要 rebase 到 `master` 上去，那么应该如下操作

```shell
## branch develop
git rebase master
get checkout master
## 用于将 `master` 上的 HEAD 移动到最新的 commit
get merge develop
```

## stash

`stash` 用于临时报错工作目录的改动。开发中可能会遇到代码写一半需要切分支打包的问题，如果这时候你不想 `commit` 的话，就可以使用该命令。

```shell
git stash
```

使用该命令可以暂存你的工作目录，后面想恢复工作目录，只需要使用

```shell
git stash pop
```

这样你之前临时保存的代码又回来了

## reflog

`reflog` 可以看到 HEAD 的移动记录，假如之前误删了一个分支，可以通过 `git reflog` 看到移动 HEAD 的哈希值

![](https://user-gold-cdn.xitu.io/2018/4/23/162f14df98ce3d83?w=950&h=118&f=png&s=77151)

从图中可以看出，HEAD 的最后一次移动行为是 `merge` 后，接下来分支 `new` 就被删除了，那么我们可以通过以下命令找回 `new` 分支

```shell
git checkout 37d9aca
git checkout -b new
```

PS：`reflog` 记录是时效的，只会保存一段时间内的记录。

## Reset

如果你想删除刚写的 commit，就可以通过以下命令实现

```shell
git reset --hard HEAD^
```

但是 `reset` 的本质并不是删除了 commit，而是重新设置了 HEAD 和它指向的 branch。

#git 常用操作

$ git ch(checkout) -b develop  创建开发分支develop

$ git push  推送当前分支到远端仓库
$ git st(status)  查看当前分支工作区、暂存区的工作状态
$ git diff   diff文件的修改
$ git ci(commit) .  提交本次修改
$ git fetch --all  拉取所有远端的最新代码 
$ git merge origin/develop  如果是多人协作，merge同事的修改到当前分支（先人后己原则）
$ git merge origin/master   上线之前保证当前分支不落后于远端origin/master，一定要merge远端origin/master到当前分支 
$ git push  推送当前分支到远端仓库 
$ git merge --no-ff origin/develop  同事review code之后管理员合并origin/develop到远端主干origin/master
***
👉 HEAD：当前commit引用$ git version  git版本
$ git branch  查看本地所有的分支
$ git branch -r 查看所有远程的分支
$ git branch -a 查看所有远程分支和本地分支
$ git branch -d <branchname> 删除本地branchname分支
$ git branch -m brancholdname  branchnewname 重命名分支
$ git branch <branchname>   创建branchname分支
$ git checkout <branchname> 切换分支到branchname
$ git checkout -b <branchname> 等同于执行上两步，即创建新的分支并切换到该分支
$ git checkout -- xx/xx  撤销本文件的更改
$ git pull origin master:master 将远程origin主机的master分支合并到当前master分支,冒号后面的部分表示当前本地所在的分支
$ git pull origin master --allow-unrelated-histories  允许合并两个不同项目的历史记录
$ git push origin -d <branchname>   删除远程branchname分支
$ git fetch --p  更新分支
$ git status 查看本地工作区、暂存区文件的修改状态
$ git add xx  把xx文件添加到暂存区去
$ git commit -m ' '  提交文件 -m 后面的是注释
$ git commit -am(-a -m) 提交所有的修改，等同于上两步
$ git commit ./xx   等同于git add ./xx + git commit
