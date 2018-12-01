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
git branch -r查看远程所有分支  
git branch查看本地所有分支  
git branch -a查看本地和远程所有分支  
git branch -d branchname删除本地分支  
git branch -d -r branchname  
使用-D则表示强制删除，相当于 --delete --force
重命名分支 git branch (-m | -M) <oldbranch> <newbranch>  使用-M则表示强制重命名  
## git checkout
git checkout 实际上就是在操作HEAD  
一般情况下 .git/HEAD 指向本地仓库当前操作的分支。那只是一般情况，更准确的说法是 .git/HEAD 直接或者间接指向某个 commit 对象。
我们知道每一个 commit 对象都对应着一个快照。可依据其恢复本地的工作目录。 HEAD 指向的 commit 是判断工作区有何更改的基础。
Git 中有一个比较难理解的概念叫做「HEAD分离」，映射到文件层面，其实指的是 .git/HEAD 直接指向某个commit对象.  
用法：  
1.git checkout file:  此命令可以用来清除未缓存的更改，它可以看做是 git checkout HEAD <file> 的简写  
2.git checkout commit file 可以用来恢复某文件为某个提交时的状态。  
3.git checkout branch：  切换分支到 <branch> 其实际上是修改 .git/HEAD 中的内容为 <branch>，更新工作区内容为 <branch> 所指向的 commit 对象的内容。  
4.git checkout <hash|tag>HEAD直接指向一个commit对象，更新工作区内容为该commit对象对应的快照，此时为HEAD分离状态  
5.git branch -b new-branch|| git checkout branch 切换到其它分支或者新建分支  
## git merge
  
Git 中分支合并有两种算法，快速向前合并 和 三路合并。
快速向前合并：主分支没有改动，因此在基于主分支生成的分支上做的更改，一定不会和主分支上的代码冲突，可以直接合并，在底层相当于修改.refs/heads/ 下主分支的内容为最新的 commit 对象。  
三路合并：新的feature分支在开发过程中，主分支上的代码也做了修改并添加了新的 commit ，此时合并，需要对比 feature 分支上最新的 commit，feature 分支的 base commit 以及 master 分支上最新的 commit 这三个commit的快照。如果一切顺利，这种合并会生成新的合并 commit  。和普通的 commit 对象的区别在于其有两个parent，分别指向被合并的两个commit。  
详细过程：  
1.Git 将接收 commit 的哈希值写入文件 .git/MERGE_HEAD。此文件的存在说明 Git 正在做合并操作。(记录合并提交的状态)  
2.Git 查找 base commit：被合并的两个分支的第一个共有祖先 commit  
3.Git 基于 base commit、master commit 和 feature commit 创建索引；  
4.Git 基于 base commit — master commit 和base commit — feature commit 分别生成 diff，diff 是一个包含文件路径的列表，其中包含添加、移除、修改或冲突等变化;    
5.Git 将 diff 应用到工作区;  
6.Git 将 diff 应用到 index，如果某文件有冲突，其在index中将存在三份;  
7.如果存在冲突，需要手动解决冲突  
8.git add 以更新 index 被提交, git commit基于此 index 生成新的commit;  
9.将主分支.git/refs/heads/master中的内容指向第8步中新生成的 commit，至此三路合并完成;  
## git cherry-pick
做的事情是将一个或者多个commit应用到当前commit的顶部，复制commit，会保留对应的二进制文件，但是会修改parent信息。
## git reset
1.git reset file 从缓存区移除特定文件，但是不会改变工作区的内容  
2.git reset : 重设缓存区，会取消所有文件的缓存  
3.git reset --hard : 重置缓存区和工作区，修改其内容对最新的一次 commit 对应的内容  
4.git reset commit : 移动当前分支的末端到指定的commit处  
5.git reset --hard commit: 重置缓存区和工作区，修改其内容为指定 commit 对应的内容    
6.git reset HEAD  -- file  拉取最近一次提交到版本库的文件到暂存区  改操作不影响工作区  
7.git reset HEAD~1 返回上一次提交
  
### git reset的原理
1.
  - 移动HEAD所指向的分支的指向：如果你正在 master 分支上工作，执行 git reset 9e5e64a 将会修改 master 让指向 哈希值为 9e5e64a 的 commit object  
  - 无论你是怎么使用的git reset，上述过程都会发生，不同用法的区别在于会如何修改工作区及缓存区的内容，如果你用的是 git reset --soft，将仅仅执行上述过程  
  - git reset本质上是撤销了上一次的 git commit 命令
  
2.加上 —mixed 会更新索引：git reset --mixed 和 git reset 效果一致，这是git reset的默认选项，此命令除了会撤销一上次提交外，还会重置index，相当于我们回滚到了 git add 和 git commit 前的状态  
3.添加—hard会修改工作目录中的内容：除了发生上述过程外，还会恢复工作区为 上一个 commit对应的快照的内容，换句话说，是会清空工作区所做的任何更改  
—hard 可以算是 reset 命令唯一的危险用法，使用它会真的销毁数据。  
如果你给 git reset 指定了一个路径，git reset 将会跳过第 1 步，将它的作用范围限定为指定的文件或文件夹。 此时分支指向不会移动，不过索引和工作目录的内容则可以完成局部的更改，会只针对这些内容执行上述的第 2、3 步。  
## git stash
有时候，我们在新分支上的feature开发到一半的时候接到通知需要去修复一个线上的紧急bug🐛，这时候新feature还达不到该提交的程度，命令git stash就派上了用场。
1.在feature分支上执行git stash 或 git stash save，保存当前分支的工作状态  
2.切换到其它分支，修复bug,并提交  
3.切换回feature分支，执行git stash list，列出保存的所有stash，执行 git stash apply，恢复最新的stash到工作区;  
4.也可以覆盖老一些的stash, 用法如git stash apply stash@{2}  
5.直接执行git stash会恢复所有之前的文件到工作区，也就是说之前添加到缓存区的文件不会再存在于缓存区，使用 git stash apply --index 命令，则可以恢复工作区和缓存区与之前一样；  
6.默认情况下，git stash 只会储藏已经在索引中的文件。 使用 git stash —include-untracked 或 git stash -u 命令，Git 才会将任何未跟踪的文件添加到stash;  
7.使用命令git stash pop 命令可以用来应用最新的stash,并立即从stash栈上扔掉它  
8.使用命令 git stash —patch ，可触发交互式stash会提示哪些改动想要储藏、哪些改动需要保存在工作目录中。  
9.使用命令git stash branch new branch：构建一个名为new branch的新分支，并将stash中的内容写入该分支  

## git clean
使用git clean命令可以去除冗余文件或者清理工作目录。 使用git clean -f -d命令可以用来移除工作目录中所有未追踪的文件以及空的子目录。  
此命令真的会从工作目录中移除未被追踪的文件。 因此如果你改变主意了，不一定能找回来那些文件的内容。 一个更安全的命令是运行 git stash --all 来移除每一项更新，但是可以从stash栈中找到并恢复它们。。  
所有在不知道 git clean 命令的后果是什么的时候，不要使用-f,推荐先使用 -n 来看看会有什么后果。  
## git remote
1.查看远程仓库 git remote  
2.添加远程仓库 git remote add shortname url   git remote add pb https://github.com/paulboone/ticgit
3.远程仓库重命名 git remote rename   git remote rename pb paul
4.远程仓库的移除 git remote rm <name> 
  
## git fetch
1.git fetch <some remote branch> :同步某个远程分支的改变到本地，会下载本地没有的数据，更新本地数据库，并移动本地对应分支的指向。  
2.git fetch --all会拉取所有的远程分支的更改到本地    
## 创建远程分支
git branch test 创建 本地分支
git push origin test 把本地分支推送到远程
git branch -a 查看远程分支
git megre dev  合并分支  
# 推荐地址
[git深入学习地址](https://www.jianshu.com/p/9f993e50caa0)  
