<<<<<<< HEAD
记录git操作
- 将vue-cli通过build生成的dist目录下的文件push到github的gh-pages  
  ```git
  $ npm run build
  $ git checkout -b gh-pages
  $ git add -f dist
  $ git commit -m 'create project'
  $ git subtree push --prefix dist origin gh-pages

  ```
=======
git远程删除分支后，本地git branch -a 依然能看到的解决办法
```
git remote prune origin
```
>>>>>>> 6cb048bb4264e078ac9439d94d362f51e3c77283
