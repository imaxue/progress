#### switch 语句,优点就是执行速度快,缺点就是只能用于确定数字,逻辑判断比较简单
```
switch (值) {
  case 值1:
    // 代码块1
    break;
  case 值2:
    // 代码块2
    break;
  case 值3:
    // 代码块3
    break;
  default:
    // 代码块n
    break;  
}
// 如果值匹配值1,就执行代码块1,
// 如果值匹配值2,就执行代码块2,
// 如果值匹配值3,就执行代码块3,
// 否则,就执行代码块3,

var day = 1
switch (day) {
  case 1:
    // 代码块1
    console.log('这是case1') //这是case1
    break;
  case 2:
    // 代码块2
    console.log('这是case2')
    break;
  case 3:
    // 代码块3
    console.log('这是case3')
    break;
  default:
    // 代码块n
    console.log('这是caseDefault')
    break;  
}


```