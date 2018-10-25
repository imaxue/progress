记录git操作
- 将vue-cli通过build生成的dist目录下的文件push到github的gh-pages  
  ```git
  $ npm run build
  $ git checkout -b gh-pages
  $ git add -f dist
  $ git commit -m 'create project'
  $ git subtree push --prefix dist origin gh-pages

  ```