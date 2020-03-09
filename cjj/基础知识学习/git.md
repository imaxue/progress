记录git操作
- 将vue-cli通过build生成的dist目录下的文件push到github的gh-pages  
  ```shell
    npm run build
    git checkout -b gh-pages
    git add -f dist
    git commit -m 'create project'
    git subtree push --prefix dist origin gh-pages

  ```
- 有时候我们提交完了才发现漏掉了几个文件没有添加，或者提交信息写错了。 此时，可以运行带有 ``--amend`` 选项的提交命令尝试重新提交
  ```shell
      git add forgotten_file
      git commit --amend
  ```
  最终你只会有一个提交 - 第二次提交将代替第一次提交的结果。

- 合并某个分支上的部分改动至另外一个分支 (示例中将branch分支中的file合并到master分支)
  - 首先切换到目标分支
    ```shell
      git checkout master
    ```
  - 执行合并命令
    ```shell
      git checkout --patch branchname file
    ```
  - 在命令行提示中输入'yes'，然后回车

- 别人已删除的远程分支，在本地``git branch -a``的时候仍旧显示，如何处理
  ```shell
    git remote show origin // 这一步将显示远程分支的信息，从中可以看到已经被删除的分支情况，而且会给出移除操作的方法，也就是下一步的命令
    git remote prune origin // 移除已删除的远程分支
  ```

- git仓库完整迁移
  + 方式一： 
    1. 从原地址克隆裸版本库
        ```shell
        git clone --bare git://192.168.xx.xx/xxx.git
        ```
    2. 在目标服务器上建立一个新的仓库
    3. 以镜像推送的方式上传代码到新的仓库中（确保新的git服务器上添加了公钥）
        ```shell
        git push --mirror git@192.168.xx.xx/new_project.git
        ```
      这种方式可以保留原版本库中的所有内容
  + 方式二：直接切换远程仓库地址
    ```shell
      git remote set-url origin remote_git_address
    ```
    直接删除原有的仓库并关联新仓库
    ```shell
    git remote rm origin
    git remote add origin remote_git_address
    ```

- 删除本地和远程分支
  - 删除本地分支
    ```shell
      git branch -d <branchName>
    ```
  - 删除远程分支
    ```shell
      git push origin --delete <branchName>
    ```

- stash存储。包含未跟踪的文件
  ```shell
    git stash save -u --<stashName>
  ```
- 从develop分支拉取到当前分支
  ```shell
    git pull --tags origin develop
  ```

- 已经提交的文件如果加入到gitignore里面。比如要移除logs目录下的log文件
  ```shell
    git rm --cached logs/xxx.log
  ```
  然后更新.gitignore文件
  ```
  /logs/*.log
  ```
  如果是要移除掉整个目录下的文件
  ```shell
    git rm --cached /logs -r
  ```

- 放弃工作区的所有修改。注意此命令没有确认步骤，将直接清空本地修改
  ``` shell
  git checkout --.
  ```
  或者
    ``` shell
    git checkout .
    ```
- 放弃工作区单个文件的修改
``` shell
  git checkout -- filepathname
```

电脑蓝屏之后，重启电脑发现git提交不了代码了。所有的文件都变成了new.
尝试查看分支
```bash
$ git branch -a
fatal: Failed to resolve HEAD as a valid ref.
```
尝试查看提交纪录
```bash
$ git log
fatal: your current branch appears to be broken
```
解决办法：
- 从``.git\refs\heads\`` 目录下找到当前分支命名的文件，打开后应该能看到一串NUL
- 从``.git\logs\refs\heads``目录下找到当前分支命名的文件，打开后找到最后一次commit的hashcode。将这个hashcode替换掉``.git\refs\heads\``目录下分支文件的内容并保存
