#### 项目中的密码是取得后台返回的经过加密的密码,但是浏览器一旦记住密码之后,就会覆盖你自己的密码

#### 浏览器是通过什么找到你的密码,并且覆盖掉的?

##### 浏览器通过input标签的type=password 属性找到你的密码所在处,然后覆盖掉你的密码.

##### 解决办法:

给 input 加一个readonly 属性,然后加一个鼠标聚焦方法.鼠标获取焦点之后移除只读属性.具体如下:

```
 <input v-model="user.password" type="password"  readonly  onfocus="this.removeAttribute('readonly');" ></input>
```

