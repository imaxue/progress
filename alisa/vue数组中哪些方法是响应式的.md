#### 数组中哪些方法是响应式的
* pop()
*  push() 
*   shift()
*    unshift() 
*    splice(start) // 删除/插入/替换元素 start从哪个元素开始
> splice(start,删除元素个数)
> splice(start,)
> 并不是所有改变数据的方式都会响应
> his.letters[0] = 'abc'  数据会变,但是页面不会响应
> splice 替换功能 splice(1,3,'m','n','l') 从第一个元素开始,删除(替换)三个,然后替换成后边三个数
> splice 插入功能 splice(1,0,'a','b'),第二个参数是0,删除0个,插入后面的参数
####  数组中通过索引改变数组的方式是不会响应页面的
this.array[0] = 'abc' 这种方式是不会响应的

#### 通过Vue.set(this.array,0,'bbbbbbb') 做到响应式