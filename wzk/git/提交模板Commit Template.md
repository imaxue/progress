#### 引言
- git commit提交备注规范化，以便以后出问题了回溯版本就可以看得到每次commit的详情；

#### 具体配置
##### 1、在工程的根目录下建立模板文件
- 比如建立一个gitcommit_template 文件，里面的内容为：
    ```
    [部门][项目]:
    问题原因:
    解决方法:
    ```
##### 2、设置模板的命令
- 设置当前分支的提交模板
```
git config commit.template [模板文件名]   
例如：git config commit.template gitcommit_template
```
- 设置全局的提交模板
```
git config --global commit.template [模板文件名]   
例如：git config --global commit.template gitcommit_template
```
- 设置文本编辑器(可选)
```
git config -global core.editor [编辑器名称] 
例如:git config -global core.editor vim
```
- 提交代码
```
git add .
//git gommit 之前需要将没有加入代码库的 git add 进入代码库
git commit
或者git commit -a （这个可以提交多个代码文件）
```
- 提交到远程分支
```
git push
```
##### 3、配置merge命令使用提升开发效率(重点)
- 在自己的开发分支myBranch不必使用commit 模板，直接执行git commit -m "常规提交即可"
- 配合使用命令：git merge --squash branchName 合并自己的分支到dev(该命令仅仅合并代码，不合并commit信息)
- merge到dev后，dev分支此时是没有commit的 ，此时执行git commit 使用模板

#### 相关链接
- https://gist.github.com/jmaxhu/8e7fb69a7dcec1b9b953
- https://blog.csdn.net/aaa2832/article/details/7746610