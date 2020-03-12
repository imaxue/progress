
### 执行``git pull``时出现``There is no tracking information for the current branch``错误
- 错误信息如下：
```
There is no tracking information for the current branch.
    Please specify which branch you want to merge with.
    See git-pull(1) for details

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream develop origin/<branch>
```
- 解决办法：
```bash
$ git branch --set-upstream-to=origin/master master
$ git pull
```