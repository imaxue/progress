## ECMA2015简称es6的简单学习

* promise
* let 定义变量
* const 定义常量
* 

# es6的for循环方法
```
let result = 0
for(let book of this.books) {
    // console.log(book)
    result += book.price
  }
 return result
 ```````````````````````````````````````````````
 // 此时的book就相当于普通for循环的this.books[i]
 // for(let i = 0;i < this.books.length;i++) {
  //   result += this.books[i].price
  // }
  ```````````````````````````````````````````````
  // for(let book in this.books) {
  //   result += this.books[book].price
  // }