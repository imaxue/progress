## 私服搭建个人使用的是Verdaccio ，之前公司也是用的这个
### 1.安装node
  verdaccio是基于node.js的，所以在我们的服务器上需要安装node  
### 2.安装verdaccio
```
npm install -g verdaccio --unsafe-perm
```
加上--unsafe-perm选项是为了防止gyp ERR! permission denied权限问题报错，如下：
```
gyp ERR! configure error
gyp ERR! stack Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules/verdaccio/node_modules/dtrace-provider/build'
gyp ERR! System Linux 3.10.0-862.14.4.el7.x86_64
gyp ERR! command "/usr/local/bin/node" "/usr/local/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "rebuild"
gyp ERR! cwd /usr/local/lib/node_modules/verdaccio/node_modules/dtrace-provider
gyp ERR! node -v v8.12.0
gyp ERR! node-gyp -v v3.8.0
gyp ERR! not ok
```
如果出现需要更新npm，则执行npm install -g npm操作  
执行结果：
```
/usr/local/bin/verdaccio
```
### 3.启动verdaccio
```
verdaccio
```
执行结果如下：
```
Verdaccio doesn't need superuser privileges. Don't run it under root.
 warn --- config file  - /root/.config/verdaccio/config.yaml
 warn --- Plugin successfully loaded: htpasswd
 warn --- Plugin successfully loaded: audit
 warn --- http address - http://localhost:4873/ - verdaccio/3.10.2
```
从控制台的输出，我们可以看到，verdaccio的配置文件路径  
在/root/.config/verdaccio/config.yaml和默认访问地址http://localhost:4873/，在配置文件末尾增加listen: 0.0.0.0:4873保存  
```
// 进入verdaccio目录
cd /root/.config/verdaccio/

// 查看该目录下的文件，该目录下默认有两个文件：config.yaml和storage，添加用户之后会自动创建htpasswd
ls
> config.yaml  storage

// 查看配置文件
vim config.yaml
```
在配置文件config.yaml末尾加入代码：  
```
# you can specify listen address (or simply a port)
listen: 0.0.0.0:4873
```
####  个人的config.yaml配置如下：
```

# 所有模块的存放位置
storage: /home/nicolas/.local/share/verdaccio/storage

# 插件目录, 对于基于Docker/Kubernetes的部署有用
plugins: ./plugins

web:
  # 是否启用Web页面
  enable: true
  title: Verdaccio

auth:
  htpasswd:
  	# 默认使用文件保存用户账户、密码等信息, 可以开启LDAP认证, 参考官网DOC
  	# 官网DOC: https://verdaccio.org/docs/en/plugins
    file: ./htpasswd
    # 设置用户注册数量限制, 设置-1时禁止注册
    # max_users: 1000

# 可以访问已知的其他存储库列表，用于请求资源不存在，根据此处配置地址请求其他服务器
uplinks:
  npmjs:
    # url: https://registry.npmjs.org/
    # 考虑到我们的地理位置, 建议使用淘宝镜像
    url: https://registry.npm.taobao.org/

# 配置权限管理
packages:
  # 私有域下的模块
  '@*/*':
    # 所有用户可以访问, 选项: "$all", "$anonymous", "$authenticated"
    access: $all
    # 仅授权用户可以发布模块
    publish: $authenticated
    # 如果本地没有可用的私有包，代理会请求'npmjs'仓库
    proxy: npmjs

  # 公共模块
  '**':
    access: $all
    publish: $authenticated
    proxy: npmjs
  
  # 限制访问权限
  'npmuser-*':
    access: npmuser
    publish: npmuser

# 指定服务器超时时间
server:
  keepAliveTimeout: 60

# Audit插件检查npm包中是否存在恶意代码
middlewares:
  audit:
    enabled: true

# 日志打印, 日志详细配置: https://verdaccio.org/docs/en/logger
logs:
  # 输出日志
  - {type: stdout, format: pretty, level: http}
  # 输出日志到文件
  - {type: file, path: verdaccio.log, level: info}

# 指定监听端口
listen:~
  - '0.0.0.0:4873'
  - 'https://0.0.0.0:4874'

# 如果配置了https, 必须设置ssl证书
https:
    key: /home/nicolas/.config/verdaccio/verdaccio-key.pem
    cert: /home/nicolas/.config/verdaccio/verdaccio-cert.pem
    ca: /home/nicolas/.config/verdaccio/verdaccio-csr.pem
 ```
###  直接打开 http://localhost:4873/
###  创建用户
```
 npm adduser --registry http://localhost:4873
```
然后我们在http://localhost:4873/上面直接点Login就可以登陆了  
###  可选:我安装了nrm，方面切换
1.npm install -g nrm  
2.nrm ls 用来查看npm源  
3.nrm use 源名称 设置当前npm源  
###  发布包
这里我随便新建一个文件夹，通过npm init新建一个项目，然后在这个目录下,执行
```
npm publish --registry http://localhost:4873
```

### 版本控制

```
$ npm version patch
```

| Code status                               | Stage         | Rule                                                         | Example version |
| ----------------------------------------- | ------------- | ------------------------------------------------------------ | --------------- |
| First release                             | New product   | Start with 1.0.0                                             | 1.0.0           |
| Backward compatible bug fixes             | Patch release | Increment the third digit                                    | 1.0.1           |
| Backward compatible new features          | Minor release | Increment the middle digit and reset last digit to zero      | 1.1.0           |
| Changes that break backward compatibility | Major release | Increment the first digit and reset middle and last digits to zero | 2.0.0           |

For example, to specify acceptable version ranges up to 1.0.4, use the following syntax:

- Patch releases: `1.0` or `1.0.x` or `~1.0.4`
- Minor releases: `1` or `1.x` or `^1.0.4`
- Major releases: `*` or `x`
