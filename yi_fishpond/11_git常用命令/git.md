# git 日常 常用命令

1. 初始化git

```
git init
```

2. 第一次拉代码

    + 方式一：git clone 

    ```
        git clone + 远程仓库地址
    ```

    + 方式二：

    先添加远程仓库remote，然后Git pull(默认分支master)

3. 远程仓库remote操作

    1. 要添加一个新的远程仓库,可以指定一个简单的名字,以便将来引用

    ```
        git remote add origin  + 远程仓库地址 //(仓库名.默认origin) 
        git pull origin master
    ```

    2. 列出已经存在的仓库（只显示仓库别名，不显示详细地址）
    ```
        git remote
    ```

    3. 列出仓库及详细信息，在每一个名字后面列出其远程url
    ```
        git remote -v | --verbose
    ```

    4. 重命名仓库名称
    ```
        git remote rename <old> <new>
    ```

    5. 修改远程仓库地址
    ```
        //a).修改命令
        git remote set-url origin [url]
        
        //b).先删后加
        git remote rm origin
        git remote add origin [url]
        
        //c).直接修改config文件
    ```

4. 提交代码
```
    git add .
    git commit -m"first commit"
    git push team（仓库名） master（分之名）
```

5. 分之（branch）操作
```
    git branch    //查看本地分之
    git branch -r    //列出远程分支
    git branch -a    //查看本地+远程分支
    git branch new_branch    //创建分之（不进行切换）
    git checkout -b new_branch    //创建并切换分之
    git checkout version2（分之名） //切换分之
    git checkout .//或者git checkout a.txt    放弃本地工作区文件的修改
    git checkout -b new_branch origin/branch-name    
    //从远程分之上创建本地分支并切换分之（远程分之）在本地创建和远程分支对应的分支（本地和远程分支的名称最好一致；）
    git branch -m | -M oldbranch newbranch
    //重命名分支，如果newbranch名字分支已经存在，则需要使用-M强制重命名，否则，使用-m进行重命名。
    git branch -d | -D branchname //删除branchname分支


    //删除远程branchname分支
    git branch -d -r origin/branchname 
    git push origin :branch-name
```

6. 暂存     
```
git stash // 暂存当前状态
git stash drop [<stash>] 删除某一个进度，默认删除最新进度 
git stash apply [--index] [<stash>] 不删除已恢复的进度，其他同git stash pop 
git stash clear 删除所有进度 
git stash branch <branchname> <stash> 基于进度创建分支
```

7. 文件对比 
```
git diff filepath     　　　　  工作区与暂存区比较
git diff HEAD filepath 　　　　 工作区与HEAD ( 当前工作分支) 比较
git diff branchName filepath   当前分支的文件与branchName 分支的文件进行比较
git diff commitId filepath 　　 与某一次提交进行比较
```

8. 查看修改文件的状态
```
git status 查看当前修改状态（列出所有修改）
```




 