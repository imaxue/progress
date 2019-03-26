# puppeteer 使用

## linux 系统上安装 puppeteer 的坑

直接通过 npm install puppeteer 的方式安装是不行的。因为需要的 chrome 被墙导致安装失败。
如果直接在本地下载好 chrome-linux 包的话，仍旧需要在 linux 上安装一堆的依赖。而且还是运行不起来
解决办法：(以 centos 7 64 位系统为例)

- 添加谷歌官方 yum 软件源

  ```bash
  sudo vi /etc/yum.repos.d/google-chrome.repo
  ```

  ```vim
  [google-chrome]
  name=google-chrome
  baseurl=http://dl.google.com/linux/chrome/rpm/stable/$basearch
  enabled=1
  gpgcheck=1
  gpgkey=https://dl-ssl.google.com/linux/linux_signing_key.pub
  ```

- 安装 chrome

  ```bash
  sudo yum install google-chrome-stable
  ```

  在安装 Chrome 浏览器时如果提示如下错误信息：

  ```bash
  获取 GPG 密钥失败：[Errno 14] curl#7 - "Failed connect to dl-ssl.google.com:443; Operation now in progress"
  ```

  说明无法下载 GPG 秘钥信息，可以在 Yum 软件源信息中配置不检查秘钥信息，把 Yum 软件源信息修改为如下内容：

  ```vim
  [google-chrome]
  name=google-chrome
  baseurl=http://dl.google.com/linux/chrome/rpm/stable/$basearch
  enabled=1
  gpgcheck=0
  gpgkey=https://dl-ssl.google.com/linux/linux_signing_key.pub
  ```

  然后再运行安装命令。

- 在代码中配置
  安装puppeteer时跳过chromuin步骤
  ```bash
    npm install puppeteer --ignore-scripts
  ```

  ```javascript
  const puppeteer = require('puppeteer')
  puppeteer.launch({
    executablePath: 'google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  ```
