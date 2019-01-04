#  ubuntu - 服务器环境安装报错解决

1. 安装nvm  
`curl-o-https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash`  
> 会输出如下：
```
=> Downloading nvm as script to '/root/.nvm'

=> Appending nvm source string to /root/.bashrc
=> Appending bash_completion source string to /root/.bashrc
=> Close and reopen your terminal to start using nvm or run the following to use it now:

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```
> 以上提示信息说，设置了环境变量， 需要刷新环境变量  执行以下命令刷新变量：

`source /root/.bashrc`  
> 验证环境变量是否生效：  
`echo $NVM_DIR`  
> 输出了/root/.nvm说明已经OK  

> 验证nvm安装是否成功  
`nvm --version`

> 输出nvm版本号说明nvm安装ok