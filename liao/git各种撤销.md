## 1,  git checkout -- file

可以撤销add和commit之后的文件
```shell
git checkout -- a.txt
```

## 2,  git checkout branch a.txt

用另外一个分支的文件替换当前分支的文件
```shell
git checkout master a.txt
```
## 3， git reset --hard commitID

回退到某一个提交
```shell
git log
// 如果没有你想要的就在冒号状态下一直回车，退出是在冒号下输入q
git reset --hard f185d0ec
git push -f
// 强制提交

// 如果又后悔了，想回到最新的
git reflog
// 重复上边的步骤
```
## 4, git reset HEAD~1

按提交步骤回退,~后边的数字是回退几次命令
(假如merge了一个其他的分支并提交）
```shell
git merge branch2
git push

// 现在要撤回

git reset HEAD~1
git checkout .
// 如果只是个别文件可以git checkout aa.txt bb.txt
git push -f
```
## 5, git rm a.txt

直接删除某个文件
```shell
git rm a.txt
git commit -m "del a.txt"
```

## 6, git rebase --onto baseBranch from to
删除中间的某次commit

我们先提交几次记录
> git log
我们会看到如下信息
```shell
commit aa1f22523b7c27c692a59588a72d396a97ae04be (HEAD -> branch2)
Author: liaohainan <liaohainan@liaohainandeMacBook-Pro.local>
Date:   Tue Jul 10 21:34:55 2018 +0800

    4

commit cb10df56ea102a558c24625e4ebbb296e0b9d1e8
Author: liaohainan <liaohainan@liaohainandeMacBook-Pro.local>
Date:   Tue Jul 10 21:34:38 2018 +0800

    3

commit 6407cefa0631920cfe8e12bfebc5f1f72c373b07
Author: liaohainan <liaohainan@liaohainandeMacBook-Pro.local>
Date:   Tue Jul 10 21:34:24 2018 +0800

    2

commit 3427ac34d38fb6bb06cfd222896e7e3a7a837219
Author: liaohainan <liaohainan@liaohainandeMacBook-Pro.local>
Date:   Tue Jul 10 21:34:10 2018 +0800

    1
```
我们要删掉3的那次commit，我所在的分支是branch2，--onto后边第一个参数是base，也就是要删掉的commit的上一个commit，
第二个参数是我们要拼接的commit起始位置，第三个是结束位置
~表示分支的上一次或者上几次commit
```shell
git rebase --onto branch2~3 branch2~1 branch2

执行完会发现冲突，这时候删掉第3次commit的代码，解决完冲突，然后恢复到最后一次commit
git add .
git rebase --continue

```

再git log，会发现，第三次commit已经没有了
```shell
commit 20586673a513c53709f1e75f786e501c62d6537d (HEAD -> branch2)
Author: liaohainan <liaohainan@liaohainandeMacBook-Pro.local>
Date:   Tue Jul 10 21:34:55 2018 +0800

    4

commit 6407cefa0631920cfe8e12bfebc5f1f72c373b07
Author: liaohainan <liaohainan@liaohainandeMacBook-Pro.local>
Date:   Tue Jul 10 21:34:24 2018 +0800

    2

commit 3427ac34d38fb6bb06cfd222896e7e3a7a837219
Author: liaohainan <liaohainan@liaohainandeMacBook-Pro.local>
Date:   Tue Jul 10 21:34:10 2018 +0800

    1

```








