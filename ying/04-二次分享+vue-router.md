# 微信QQ二次分享遇到的一些坑
>1.二次分享设置音频格式不起效果，只有一次分享可以设置音频类型。
>2.微信二次分享到QQ 与 QQ二次分享到微信时
    微信的desc是必须要有的，QQ的summary 是必须要有的，否则会导致互相传时的二次分享不成功。

# router push 与replace的区别
>1.router.push(location)=====window.history.pushState
>>想要导航到不同的 URL，则使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

>>解决问题：微信底部返回按钮 返回不刷新
>>例子1.从百度跳转到谷歌 2.push 会记录百度 返回会返回百度



>2.router.replace(location)=====window.history.replaceState
>>跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录

>>解决问题：QQ空间返回好多次才能返回到页面。
>>例子：1.从百度跳转到谷歌 2.replace 谷歌会把百度替换掉 返回会返回谷歌
>>特殊问题：非微信授权页面，使用router.replace IOS手机没有下方返回按钮，即为没有记录之前history；但是微信授权页面，使用router.replace IOS手机有下方返回按钮，且会记录之前history记录。


# position: fixed;在移动端抖动的问题（andriod）
>https://blog.csdn.net/zx_001/article/details/50293709
>>我用的第一种方法解决
>>position: fixed;
>>-webkit-transform: translateZ(0);
