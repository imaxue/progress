记录git操作
- 将vue-cli通过build生成的dist目录下的文件push到github的gh-pages  
  ```git
  $ npm run build
  $ git checkout -b gh-pages
  $ git add -f dist
  $ git commit -m 'create project'
  $ git subtree push --prefix dist origin gh-pages

  ```
- 有时候我们提交完了才发现漏掉了几个文件没有添加，或者提交信息写错了。 此时，可以运行带有 ``--amend`` 选项的提交命令尝试重新提交
  ```
    $ git add forgotten_file
    $ git commit --amend
  ```
  最终你只会有一个提交 - 第二次提交将代替第一次提交的结果。