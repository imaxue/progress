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
