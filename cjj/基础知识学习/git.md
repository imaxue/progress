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