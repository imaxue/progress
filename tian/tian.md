# egg 项目demo地址：
1.egg+react+mysql项目开发地址：https://github.com/fomenyesu/egg-restapi-module-tool  
2.egg+ OAuth 2.0 讲解：https://cnodejs.org/topic/592b2aedba8670562a40f60b  
# vue 项目问题总结(廖神提供)
1.https://juejin.im/post/5b174de8f265da6e410e0b4e  
# Git相关操作以及知识
## Git 中存储的五种对象 
Blobs是Git中最基础的数据类型，一个blob对象就是一堆字节，通常是一个文件的二进制表示
tree，有点类似于目录，其内容由对其它tree及blobs的指向构成；  
commit，指向一个树对象，并包含一些表明作者及父 commit 的元数据  
Tag，指向一个commit对象，并包含一些元数据  
References,指向一个commit或者tag对象  
## 本地命令
git init && git init --bare  
git init：在当前文件夹下新建一个本地仓库，在文件系统上表现为在当前文件夹中新增一个 .git 的隐藏文件夹  
Git 中还存在一种被称为裸仓库的特殊仓库，使用命令 git init --bare 可以初始化一个裸仓库  
和普通仓库相比，裸仓库没有工作区，所以并不会存在在裸仓库上直接提交变更的情况，这种仓库会直接把 .git 文件夹中的内容置于初始化的文件夹下。此外  
在 config 文件下我们会看到 bare = true 这表明当前仓库是一个裸仓库    
普通的方法是不能修改裸仓库中的内容的。裸仓库只允许贡献者clone,push,pull。  
## git add
git add [file] 会把文件添加到缓存区  
git 命令操作的是三棵树。三棵树对应的就是上图中的工作区( working directory )、缓存区( Index )、以及 HEAD。  
工作区比较好理解，就是可供我们直接修改的区域，HEAD 其实是一个指针，指向最近的一次 commit 对象，这个我们之后会详述。Index 就是我们说的缓存区了，它是下次 commit 涉及到的所有文件的列表。  
git add [file]，这个命令会依次做下面两件事情：  
1.在 .git/object/ 文件夹中添加修改或者新增文件对应的 blob 对象； 
2.在 .git/index 文件夹中写入该文件的名称及对应的 blob 对象名称；  
## git status  
1.查看当前所在分支；  
2.列出已经缓存，未缓存，未追踪的文件（依据上文中的三棵树生成）；  
3.给下一步的操作一定的提示；  
## git commit
1.新增tree对象，有多少个修改过的文件夹，就会添加多少个tree对象；  
2.新增commit对象，其中的的tree指向最顶端的tree，此外还包含一些其它的元信息，commit对象中的内容，上文已经见到过， tree对象中会包含一级目录下的子tree对象及blob对象，由此可构建当前commit的文档快照；  
## git branch
存在两种分支，本地分支和远程分支。   
1.本地分支：对应存储在.git/refs/heads中；
还存在一种叫做「跟踪分支」(也叫「上游分支」)的本地分支，此类分支从一个远程跟踪分支检出，是与远程分支有直接关系的本地分支。 如果在一个跟踪分支上输入 git pull，Git 能自动地识别去那个远程仓库上的那个分支抓取并合并代码。  
2.远程分支： 对应存储在.git/refs/remotes中，可以看做远程仓库的分支在本地的备份，其内容在本地是只读的。   
使用 git branch [newBranchName] 可以创建新分支 newBranchName。不过一个更常见的用法是git checkout -b [newBranchName]，此命令在本地创建了分支 newBranchName，并切换到了分支 newBranchName。  
## git checkout
git checkout 实际上就是在操作HEAD  
一般情况下 .git/HEAD 指向本地仓库当前操作的分支。那只是一般情况，更准确的说法是 .git/HEAD 直接或者间接指向某个 commit 对象。
我们知道每一个 commit 对象都对应着一个快照。可依据其恢复本地的工作目录。 HEAD 指向的 commit 是判断工作区有何更改的基础。
Git 中有一个比较难理解的概念叫做「HEAD分离」，映射到文件层面，其实指的是 .git/HEAD 直接指向某个commit对象.  
用法：  
1.git checkout <file>:  此命令可以用来清除未缓存的更改，它可以看做是 git checkout HEAD <file> 的简写  
2.git checkout <commit> <file> 可以用来恢复某文件为某个提交时的状态。  
3.git checkout <branch>：  切换分支到 <branch> 其实际上是修改 .git/HEAD 中的内容为 <branch>，更新工作区内容为 <branch> 所指向的 commit 对象的内容。  
4.git checkout <hash|tag>HEAD直接指向一个commit对象，更新工作区内容为该commit对象对应的快照，此时为HEAD分离状态
5.git branch -b new-branch|| git checkout branch 切换到其它分支或者新建分支
## git merge
  
  
  
  












































