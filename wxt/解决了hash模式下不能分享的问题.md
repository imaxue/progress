# 解决了hash模式下不能分享的问题

```javascript
//处理二次分享的链接，把path强制转成query,防止篡改
if (link.indexOf('/#/') > -1) {
  if (link.indexOf('/?/') > -1) {
    link = link.split('#')[0] + '?hashPath=' + link.split('#')[1].substr(1)
  } else {
    //如果分享出去的url没有query参数需要追加问号
    link = link.split('#')[0] + '?hashPath=' + link.split('#')[1].substr(1) + '?'
  }
}



router.beforeEach(to, from, next) => {
  //处理二次分享链接,还原path
  let link = window.location.href
  if (link.indexOf('hashPath') > -1) {
    if (link.indexOf('?') > -1) {
      window.location.href = 'http://' + window.location.host + '#' +  link.split('hashPath=')[1].split('#')[0]
    } else {
      //万一问号丢失情况。。
      let host = 'http://' + window.location.host + '/#/'
      let path = link.split('hashPath=')[1].split('&')[0]
      let query = link.split('hashPath=')[1].split('&').shift().join('&')
      window.location.href = host +path + '?' + query
    }
  }
}
```