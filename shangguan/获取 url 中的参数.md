1. 指定参数名称，返回该参数的值 或者 空字符串；
2. 不指定参数名称，返回全部的参数对象 或者 {}；
3. 如果存在多个同名参数，则返回数组 ；

解一：使用字符串拼接匹配字符；

```
/*  获取URl中的参数
* @para url 
* @para key 参数名*/
function getUrlParam(sUrl, sKey) {
    var left= sUrl.indexOf("?") + 1
    var right= sUrl.lastIndexOf("#")
    var parasString = sUrl.slice(left, right)
    var paras = parasString.split('&');
    var parasjson = {}
    paras.forEach(function (value, index, arr) {
        var a = value.split('=');
        parasjson[a[0]] !== undefined ? parasjson[a[0]] = [].concat(parasjson[a[0]], a[1]) : parasjson[a[0]] = a[1];
    });

    let result = arguments[1] !== void 0 ? (parasjson[arguments[1]] || '') : parasjson;
    return result
}
```
解二：使用正则表达式匹配字符，并使用正则Replace方法替换；

```
function getUrlParam2(sUrl, sKey) {
    var result, Oparam = {};
    sUrl.replace(/[\?&]?(\w+)=(\w+)/g, function ($0, $1, $2) 
        console.log('$0:' + $0 + "     $1:" + $1 + "     $2:" + $2);
        Oparam[$1] === void 0 ? Oparam[$1] = $2 : Oparam[$1] = [].concat(Oparam[$1], $2);
    });
    sKey === void 0 || sKey === '' ? result = Oparam : result = Oparam[sKey] || '';
    return result;
}
```
解三：使用正则表达式匹配字符，并使用正则Exec方法进行组装；

```
function getUrlParam3(sUrl, sKey) {
    var resObj = {};
    var reg = /(\w+)=(\w+)/g;
    while (reg.exec(sUrl)) {
        resObj[RegExp.$1] ? resObj[RegExp.$1] = [].concat(resObj[RegExp.$1], RegExp.$2) : resObj[RegExp.$1] = RegExp.$2;
    }
    if (sKey) {
        return (resObj[sKey] ? resObj[sKey] : '');
    }
    return resObj;
}
```

