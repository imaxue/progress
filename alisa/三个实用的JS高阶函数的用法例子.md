### 三个高阶函数 filter map reduce优化代码的例子

#### 写法一
```
		const Nums = [10,20,111,222,444,40,50]
      // 1.需求:取出所有小于100的数字
      let newNums = []
      for(let n of Nums) {
        if(n < 100) {
          newNums.push(n)
        }
      }
      console.log(newNums)
      // 2.将所有小于100的数字进行转化:全部*2
      let new2Nums = []
      for(let n of newNums) {
        new2Nums.push(n*2)
      }
      console.log(new2Nums)

      // 3.需求将所有的new2Nums数字相加,得到最终的结果
      let total = 0
      for(let n of newNums) {
        total += n
      }
      console.log(total)
      
      
      
```
#### 用高阶函数实现写法二
 
 ```
  // 1) filter 中的回调函数必须返回一个布尔值,当返回true的时候,会把item放进新数组里面,false不会加到数组里面
      let newNums= Nums.filter(function(item){
        return item  < 100  //返回一个布尔值,true的话把itam放进新数组,否则不放新数组里面
      })
      console.log(newNums)
      // 2) map回调函数,适用于对数组里面所有的选项操作的
      let new2Nums = newNums.map(function(item){
        return item * 2
      })
      console.log(new2Nums)
      // 3) reduce 函数,对数组中的所有内容进行汇总 preValuel 累计汇总值,item数组的每一项,0初始值
      let total = new2Nums.reduce(function(preValue,item){
        return preValue + item
      },0)
      console.log(total)
 ``` 
#### 用高阶函数链式编程的写法三
```
	let total = Nums.filter(function(item){
        return item < 100
      }).map(function(item){
        return item * 2
      }).reduce(function(preNums,item){
        return preNums + item
      },0)
      console.log(total)
```
> 总结,高阶函数代码简洁省去了很多冗余代码

* 1) filter 中的回调函数必须返回一个布尔值,当返回true的时候,会把item放进新数组里面,false不会加到新的数组里
* map回调函数,适用于对数组里面所有的选项操作的数组里面
* reduce 函数,对数组中的所有内容进行汇总 preValue 累计汇总值,item数组的每一项,0是初始值


