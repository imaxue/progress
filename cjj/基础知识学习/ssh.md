### ssh免密登录
- 配置别名
  在``~/.ssh/config``里面追加以下内容
  ```vi
  HOST name
    HostName ip
    User root
    Port 22
  ```
  这样，在ssh连接远程服务的时候直接输入``ssh name``即可
- 免密登录
  - 配置公钥
    + 执行``ssh-keygen``,一路回车即可
  - 上传公钥到服务器
    + 执行``ssh-copy-id -p port user@remote``，可以让远程服务器记住公钥