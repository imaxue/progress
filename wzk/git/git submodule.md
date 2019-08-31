#### 引言
- 最近公司项目saas在所拆分，遇见前端多个项目公共模块如何管理与更新的问题，google发现 git子模块就是其中一个解决方案
- 前端多个项目公共模块如何管理与更新？ 现在有几种思路：
  - npm包(现有私有仓库)
  - git submodule
  - iframe引用
  - ajax异步加载
  - 写一个纯js文件动态生成DOM与样式存放CDN并在各项目中引用。
  - 注：前两种方案貌似比较好

#### 使用场景
- 基于公司的项目会越来越多，常常需要提取一个公共的类库提供给多个项目使用，但是这个library怎么和git在一起方便管理呢？
- 我们需要解决下面几个问题：
  - 如何在git项目中导入library公共库?
  - library库在其他的项目中被修改了可以更新到远程的代码库中?
  - 其他项目如何获取到library库最新的提交?
  - 如何在clone的时候能够自动导入library库?
- 解决以上问题，可以考虑使用git的 Submodule来解决。

#### 常用命令

```
    git clone <repository> --recursive 递归的方式克隆整个项目
    git submodule add <repository> <path> 添加子模块
    git submodule init 初始化子模块
    git submodule update 更新子模块
    git submodule foreach git pull 拉取所有子模块
```

#### git submodule实战
- 1、初始化四个git 项目project1、project2、lib1、lib2
  - lib1、lib2是公共项目；
- 2、为主项目添加Submodules
  - 2.1 如何在git项目中导入library公共库?例如，为project1添加lib1和lib2
    ```
    git submodule add git@github.com:zengkaiwang/lib1.git libs/lib1
    
    ```
  - 2.2 把主项目的更改提交到仓库
    ```
    git commit -a -m "add submodules[lib1,lib2] to project1"
    git push
    ```
- 3、Clone带有Submodule的仓库，有两种方式
  - 一种是采用递归的方式clone整个项目
    ```
    //采用递归参数 --recursive
    git clone git@github.com:jjz/pod-project.git --recursive
    ```

  - 一种是clone父项目，再更新子项目
    ```
    git clone git@github.com:jjz/pod-project.git
    cd pod-project
    git submodule init
    //更新Submodule:
    git submodule update
    ```
- 4、修改Submodule
  - 4.1 首先切换到submodule子项目的目录下，如libs/lib1
    ```
    cd libs/lib1
    ```

  - 4.2 现在我们要修改lib1的文件需要先切换到**master**分支：(待考证)
    ```
    //在子项目的目录（如libs/lib1目录)下执行
    git checkout master
    ```
   - 4.3 修改文件，并可以git status查看变动
   - 4.4 提交Submodule的更改内容
    ```
    git commit -a -m "update lib1-features by developer B"
    ```
   - 4.5 把submodule的修改提交到远程
    ```
    git push
    //这个操作是把变动更新到了lib1远程项目
    ```
  - 4.6 然后再回到父目录，提交到本地并更新到远程
    ```
    //切换到父项目的目录
    cd ../../
    //提交到缓存区
    git add -u
    //提交到本地和远程
    git commit -m "update libs/lib1 to lastest commit id"
    git push
    ```
- 5、更新Submodule
  - 方式一：
    ```
    //在父项目的目录下执行命
    git submodule update
    //注意：当需要更新子模块的内容时请先确保已经运行过**git submodule init**
    ```
  - 方式二：在父项目的目录下直接运行
    ```
    git submodule foreach git pull
    ```
    - 循环进入（enter）每个子模块的目录，然后执行**foreach**后面的命令；
    - 当有多个子项目的时候很方便；
  - 方式三：在Submodule的目录下面更新
    ```
    >cd pod-library
    //首先保证在一个分支上
    git checkout master
    //更新
    git pull
    ```
    - 可以看到在Submodule的目录中,使用git和单独的一个项目是一样的；
  - 注意：更新Submodule的时候如果有新的commit id产生，需要在父项目产生一个新的提交，pod-libray文件中的 Subproject commit会变为最新的commit id

- 6、删除Submodule
  - 6.1 git 并不支持直接删除Submodule需要手动删除对应的文件:
    ```
    cd pod-project
    git rm --cached pod-library
    rm -rf pod-library
    rm .gitmodules
    ```
  - 6.2 更改git的配置文件config:
    ```
    vim .git/config
    删除submodule相关的内容,然后提交到远程服务器:
    git commit -a -m 'remove pod-library submodule'
    ```
  - 6.3 删除.git/module/子项目（亲测）
    ```
    rm -rf .git/modules/src
    
    ```
    - 注：不执行的话再次添加（git submodule add...）时报错
    ```
        A git directory for 'src/app/pages/common' is found locally with remote(s):
          origin        git@gitlab.irootech.com:zengkai.wang/saas3.0-lib.git
        If you want to reuse this local git directory instead of cloning again from
          git@gitlab.irootech.com:zengkai.wang/saas3.0-lib.git
        use the '--force' option.     
    ```


 - 删除代码实例：
    ```
    //删除git cache和物理文件夹
    git rm -r --cached libs/
    rm 'libs/lib1'
    rm 'libs/lib2'
    rm -rf libs
    
    //删除.gitmodules的内容（或者整个文件）
    rm .gitmodules
    
    //删除.git/config的submodule配置
    源文件：
    <pre>[core]
        repositoryformatversion = 0 
        filemode = true
        bare = false
        logallrefupdates = true
    [remote "origin"]
        fetch = +refs/heads/*:refs/remotes/origin/*
        url = /home/henryyan/submd/ws/../repos/project1.git
    [branch "master"]
        remote = origin
        merge = refs/heads/master
    [submodule "libs/lib1"]
        url = /home/henryyan/submd/repos/lib1.git
    [submodule "libs/lib2"]
        url = /home/henryyan/submd/repos/lib2.git
    </pre>
     
    删除后：
    <pre>[core]
        repositoryformatversion = 0 
        filemode = true
        bare = false
        logallrefupdates = true
    [remote "origin"]
        fetch = +refs/heads/*:refs/remotes/origin/*
        url = /home/henryyan/submd/ws/../repos/project1.git
    [branch "master"]
        remote = origin
        merge = refs/heads/master
    </pre>
    ```


#### 相关链接
- http://www.kafeitu.me/git/2012/03/27/git-submodule.html
- https://www.jianshu.com/p/b49741cb1347
- 注：以上两个链接文章写得非常好！
