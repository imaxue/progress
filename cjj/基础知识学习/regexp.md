# 一些正则表达式
```javascript
  var reg = /(?:<)([^<>]+)(?:>)/g // 匹配html字符串中的所有标签

  var hanzi = /[\u4e00-\u9fa5]/ // 匹配汉字

  var doubleByteCharacter = /[^\x00-\xff]/ // 匹配双字节字符(包括汉字在内)
```