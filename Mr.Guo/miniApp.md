# 小程序-登录

## unionid和openid

了解小程序登陆之前，我们写了解下小程序/公众号登录涉及到两个最关键的用户标识：

- `OpenId` 是一个用户对于一个小程序／公众号的标识，开发者可以通过这个标识识别出用户。
- `UnionId` 是一个用户对于同主体微信小程序／公众号／APP的标识，开发者需要在微信开放平台下绑定相同账号的主体。开发者可通过UnionId，实现多个小程序、公众号、甚至APP 之间的数据互通了。

## 关键Api

- [`wx.login`](https://developers.weixin.qq.com/miniprogram/dev/api/api-login.html) 官方提供的登录能力

- [`wx.checkSession`](https://developers.weixin.qq.com/miniprogram/dev/api/signature.html#wxchecksessionobject) 校验用户当前的session_key是否有效

- [`wx.authorize`](https://developers.weixin.qq.com/miniprogram/dev/api/authorize.html) 提前向用户发起授权请求

- [`wx.getUserInfo`](https://developers.weixin.qq.com/miniprogram/dev/api/api-login.html) 获取用户基本信息


## 登录流程设计

  以下从笔者接触过的几种登录流程来做阐述:

### 利用现有登录体系

  直接复用现有系统的登录体系，只需要在小程序端设计用户名，密码/验证码输入页面，便可以简便的实现登录，只需要保持良好的用户体验即可。

### 利用OpenId 创建用户体系

👆提过，`OpenId` 是一个小程序对于一个用户的标识，利用这一点我们可以轻松的实现一套基于小程序的用户体系，值得一提的是这种用户体系对用户的打扰最低，可以实现静默登录。具体步骤如下：

  1. 小程序客户端通过 `wx.login` 获取 code

  2. 传递 code 向服务端，服务端拿到 code 调用微信登录凭证校验接口，微信服务器返回 `openid` 和会话密钥 `session_key` ，此时开发者服务端便可以利用 `openid` 生成用户入库，再向小程序客户端返回自定义登录态

  3. 小程序客户端缓存 （通过`storage`）自定义登录态（token），后续调用接口时携带该登录态作为用户身份标识即可

### 利用 Unionid 创建用户体系
   
如果想实现多个小程序，公众号，已有登录系统的数据互通，可以通过获取到用户 unionid 的方式建立用户体系。因为 unionid 在同一开放平台下的所所有应用都是相同的，通过 `unionid` 建立的用户体系即可实现全平台数据的互通，更方便的接入原有的功能，那如何获取 `unionid` 呢，有以下两种方式：

   1. 如果户关注了某个相同主体公众号，或曾经在某个相同主体App、公众号上进行过微信登录授权，通过 `wx.login` 可以直接获取 到 `unionid`

   2. 结合 `wx.getUserInfo` 和 `<button open-type="getUserInfo"><button/>` 这两种方式引导用户主动授权，主动授权后通过返回的信息和服务端交互 (这里有一步需要服务端解密数据的过程，很简单，微信提供了示例代码) 即可拿到 `unionid` 建立用户体系， 然后由服务端返回登录态，本地记录即可实现登录，附上微信提供的最佳实践：

      - 调用 wx.login 获取 code，然后从微信后端换取到 session_key，用于解密 getUserInfo返回的敏感数据。

      - 使用 wx.getSetting 获取用户的授权情况
        - 如果用户已经授权，直接调用 API wx.getUserInfo 获取用户最新的信息；
        - 用户未授权，在界面中显示一个按钮提示用户登入，当用户点击并授权后就获取到用户的最新信息。

      - 获取到用户数据后可以进行展示或者发送给自己的后端。
 
### 注意事项

1. 需要获取 `unionid` 形式的登录体系，在以前（18年4月之前）是通过以下这种方式来实现，但后续微信做了调整（因为一进入小程序，主动弹起各种授权弹窗的这种形式，比较容易导致用户流失），调整为必须使用按钮引导用户主动授权的方式，这次调整对开发者影响较大，开发者需要注意遵守微信的规则，并及时和业务方沟通业务形式，不要存在侥幸心理，以防造成小程序不过审等情况。

```
   wx.login(获取code) ===> wx.getUserInfo(用户授权) ===> 获取 unionid
```

2. 因为小程序不存在 `cookie` 的概念， 登录态必须缓存在本地，因此强烈建议为登录态设置过期时间

3. 值得一提的是如果需要支持风控安全校验，多平台登录等功能，可能需要加入一些公共参数，例如platform，channel，deviceParam等参数。在和服务端确定方案时，作为前端同学应该及时提出这些合理的建议，设计合理的系统。

4. `openid` ， `unionid` 不要在接口中明文传输，这是一种危险的行为，同时也很不专业。
