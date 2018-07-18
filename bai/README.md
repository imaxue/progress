## git

[git 相关操作](https://www.baixiaojian.com/git/)

## 以太坊相关

## 概念

|API|作用|
|---|---|
|eth |包含一些跟操作区块链相关的方法|
|net |包含以下查看p2p网络状态的方法|
|admin |包含一些与管理节点相关的方法|
|miner |包含启动&停止挖矿的一些方法|
|personal |主要包含一些管理账户的方法|
|txpool |包含一些查看交易内存池的方法|
|web3 |包含了以上对象，还包含一些单位换算的方法|



### 常用

|API|作用|
|---|---|
| eth.accounts | 查看账户|
| personal.newAccount() | 创建账户|
| eth.getBalance(eth.accounts[0]) | 查看余额|
| miner.start(1) | 启动挖矿|
| miner.stop() | 停止挖矿|
| miner.start(1);admin.sleepBlocks(1);miner.stop(); | 挖矿后停止挖矿|
| web3.fromWei(eth.getBalance(eth.accounts[1])) | 查看转换过后的数量|
| geth init ./genesis.json --datadir ./data | 初始化|
| geth --datadir ./data --nodiscover --networkid 1024 --rpc console | 启动|
| geth --datadir ./data --nodiscover --networkid 1024 --rpc --rpccorsdomain="*" console | 启动时解决本地跨域问题|

### 坑点&技巧

  - `gasLimit * GasPrice / 1e9` 计算打币需消耗的 eth
  - 地址前面 **需要加上0x** 否则生成地址不一致的问题
  - 搭建私链 `chainId` 不一致带来的交易失效问题
  - `--rpccorsdomain="*"` 解决跨域的问题
  - 实现批量打币需动态设置 nonce 值
  - 通过 `web3.eth.sendTransaction` 发起交易可以记录tx交易值

## 以太坊钱包

以太坊系钱包有几个名词必须深刻理解，**地址、密码、私钥、助记词、keystore**。

若以银行账户为类比，这 5 个词分别对应内容如下：

```
    地址 = 银行卡号
    密码 = 银行卡密码
    私钥 = 银行卡号+银行卡密码
    助记词 = 银行卡号+银行卡密码
    Keystore+密码 = 银行卡号+银行卡密码
    Keystore ≠ 银行卡号
    keystore = 加密私钥
    keystore+密码 = 私钥
```

 - 一个钱包只有一个私钥且不能修改
 - 助记词只会出现一次且不能修改
 - 区块链世界中是去中心化的, 所以资产不受ZF保护

### 忘记

你若把钱包信息忘了，会有什么后果呢？分这么几种情况：

1. 地址忘了，可以用私钥、助记词、keystore+密码，导入钱包找回。
2. 密码忘了，可以用私钥、助记词，导入钱包重置密码。
3. 密码忘了，私钥、助记词又没有备份，就无法重置密码，就不能对代币进行转账，等于失去了对钱包的控制权。
4. 密码忘了，keystore 就失去了作用。
5. 私钥忘了，只要你钱包没有删除，并且密码没忘，可以导出私钥。可以用助记词、
7. 助记词忘了，可以通过私钥、keystore+密码，导入钱包重新备份助记词。
8. keystore 忘了，只要你钱包没有删除，密码没忘，可以重新备份keystore。


### 泄露

1. 地址泄漏了，没有关系。
2. 密码泄漏了，没有关系。
3. 地址+密码泄漏了，只要手机不丢。

只要「`私钥、助记词、Keystore+密码`」有一个信息泄漏出去，别人就拥有了你钱包的控制权，你钱包中的币就会被别人转移走。

### 备份

`私钥、助记词、Keystore+密码`如此重要，那么如何进行保存呢，最安全的方法就是： **手抄纸上**

Keystore 内容较多，可以不手抄，只手抄私钥、助记词就足够了，手抄备份要注意以下几点：

1. 多抄几份，分别放在不同的安全区域，并告诉家人。
2. 对手抄内容进行验证，导入钱包看能不能成功，防止抄写错误。
3. 备份信息不要在联网设备上进行传播，包括邮箱、QQ、微信等。
4. 教会家人操作钱包。​​​​

