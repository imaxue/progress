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
## 3, git rm a.txt

直接删除某个文件
```shell
git rm a.txt
git commit -m "del a.txt"
```
## 4， git reset --soft|--mixed|--hard <commit_id>

回退到某一个提交
1.第一种情况：还没有push，只是在本地commit
> 这里的<commit_id>就是每次commit的SHA-1，可以在log里查看到
> --mixed    会保留源码,只是将git commit和index 信息回退到了某个版本.
> --soft   保留源码,只回退到commit信息到某个版本.不涉及index的回退,如果还需要提交,直接commit即可.
> --hard    源码也会回退到某个版本,commit和index 都会回退到某个版本.(注意,这种方式是改变本地代码仓库源码)

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
2.commit push 代码已经更新到远程仓库
```shell
git revert <commit_id>
git push -f
```
revert 之后你的本地代码会回滚到指定的历史版本,这时你再 git push 既可以把线上的代码更新。
注意：git revert是用一次新的commit来回滚之前的commit，git reset是直接删除指定的commit，看似达到的效果是一样的,其实完全不同。
第一:上面我们说的如果你已经push到线上代码库, reset 删除指定commit以后,你git push可能导致一大堆冲突.但是revert 并不会.
第二:如果在日后现有分支和历史分支需要合并的时候,reset 恢复部分的代码依然会出现在历史分支里.但是revert 方向提交的commit 并不会出现在历史分支里.
第三:reset 是在正常的commit历史中,删除了指定的commit,这时 HEAD 是向后移动了,而 revert 是在正常的commit历史中再commit一次,只不过是反向提交,他的 HEAD 是一直向前的.

## 5, git reset HEAD~1

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

## 7，git commit --amend

修改最后一次commit信息
```shell
git commit --amend
此时处于vim状态，按c开始编辑，修改完按esc退出编辑，连续按两次大写Z，退出

```

修改之前几次的
比如要修改的commit是倒数第三条，使用下述命令：
```shell
git rebase -i HEAD~3
把pick改为edit
然后 :wq
git commit --amend
退出保存 :wq，然后回到正常状态
git rebase --continue
git push -f 推送到服务端
```







