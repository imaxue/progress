#  Go 语言学习笔记



##  Go 语言特性

* 垃圾回收
* 天然并发
  * 语言层面支持并发
  * 轻量级线程
* 静态类型
* 跨平台编译
* 内置代码格式化工具, 风格统一



## 安装

[官网](https://golang.org/) 下载安装包并安装



## hello world

> hello.go

```go
// 指明文件属于哪个包, main 包用来定义一个独立的可执行程序
package main

// 导入 fmt 包, fmt 包中的函数用于格式化输出和扫描输入
import "fmt"

// main 函数是程序的入口
func main() {
    // Println 是 fmt 包中的一个基本的输出函数
    fmt.Println("Hello, World")
}
```

**运行**

> go run hello.go

**编译 (会生成可执行文件)**

> go build hello.go



## 名称

* 如果一个实体在函数中声明，作用域是函数内。在包中声明，作用域是包内。如果首字母大写，说明是可以跨包的。

### 命名风格

- 越小的使用范围，使用更短的变量命名，越大的使用范围，使用更长的命名。
- 驼峰命名，缩写单词全大写或全小写，如：HTML



## 变量

```go
// var 名称 类型 = 表达式
var a int = 10

// 短变量声明 ( 自动推导类型, 常用 ), 变量类型取决于表达式类型
// 格式 name := expression
b := 100

// 同时定义多个变量
var (
	c int
    d float64
)
c = 10
d = 11.1

// 同时定义多个变量并赋值
var (
	e = 10
    f = 11.1
)

// 多重赋值
x, y = y, x // 交换变量的值
```




## 常量

```go
const a int = 10
// 或
const b = 20

// 或
const (
	c = 100
    d = 99
)
```



### iota 常量自动生成器

```go
// 每隔一行自动加1
const (
    a = iota // 0
    b = iota // 1
    c = iota // 2
)
// 或者
const (
    a = iota // 0
    b // 1
    c // 2
)

// 一行定义多个, 值相同
const (
    a1 = iota // 0
    b1, b2, b3 = iota // 1, 1 ,1
    c1 = iota // 1
)

// 每次 const 中定义的时候, 重置为0
const (
    d = iota // 0
)

// 不能给变量使用
```



### 变量的生命周期

- 包级别变量的生命周期和程序的运行时间相同



### 类型声明

```go
// 可以使用 type 关键字声明一种新的类型
// 如: 声明性别类型
type Sex int

female Sex = 0;
male Sex = 1;
```



### 类型转换

```go
// 类型(另一种类型)
var a float32 = 1.0
var b int = int(a)
```



## 指针

- &p: 取p变量在内存中的地址

- *p: 取p指针对应的值
- 指针变量的默认值是 `nil` , 可以使用 `p == nil` 判断指针是否已经指向一个变量



## 函数

> func 函数名(参数列表) 返回值1,返回值2 {
>
> 	return x, y
>
> }

```go
func func1(a int, b int) {
    // 固定参数, 参数个数和类型都必须匹配
}

func func2(a, b string, c, d int) {
    // a, b string 类型
    // c, d int 类型
}


```









new 函数创建一个变量, 并返回变量的指针

``` go
p := new(int)
```



`_` 占位符, 用于语法需要实际并不需要的情况, 比如: 函数有两个返回值, 但是只需要其中的一个, 另外一个可以使用占位符



## 包和文件

包可以理解为模块或库

`package` 声明

`import` 导入

####  目录结构

hello.go

|--test

    |--test.go

> hello.go

```go
package main

import (
	"./test"
)

func main() {
	test.Test()
}
```

> test.go

```go
package test

import "fmt"

func Test() {
	fmt.Println("test")
}
```







## for 循环

```go
for i := 0; i < 100; i++ {  // 注意, 花括号不能换行
    
}
```



```go
for i < 100 {
    // 等同与while
}
```



```go
for {
    // 死循环
}
```



### 使用 range

```
for i, data := range arr {
	
}
```







## 复合数据类型

> 通过基本数据类型组合而成

### 

### 数组

数组中的类型必须相同

数组初始化

```go
var arr1 [3]int // 3 个元素的数组, 元素默认值均为 0 

var arr2 [3]int = [3]int{1, 2, 3} // 3 个元素的数组, 赋值 1, 2, 3
var arr3 [3]int = [3]int{1, 2}// 3 个元素的数组, 赋值 1, 2, arr3[2] 为默认值 0

arr4 := [...]int{1, 2} // 数组长度由初始化的元素个数决定
```

如果数组长度和变量初始化时指定的数组的长度不同, 不能赋值

```go
arr1 := [2]int{1, 2}

arr1 = [1]int{1}  // 编译错误
```

单独指定数组中某一个元素的值

```go
arr1 := [3]int{2: 1} // 将 arr1[2] 赋值为1, 其他元素均为 0
```

数组长度不同, 无法进行是否相等的比较

```go
arr1 := [1]int{1}
arr2 := [2]int{1,2}

arr1 == arr2 // 编译错误
```



调用函数时, 传递的参数为拷贝之后的副本, 所以对参数进行修改不会影响原始数据

```go
import "fmt"

func main() {
	arr := [2]int{1, 2}
	double(arr)

	for _, data := range arr {
		fmt.Println(data) // 1, 2
	}
}

func double(a [2]int) {
	for _, data := range a {
		data *= 2
	}
}
```



### slice

slice 和数组是紧密相连的, 可以访问数组中的部分或全部元素, 被访问的数组称为 slice 的 `底层数组`

slice 有三个属性: `指针`, `长度`, `容量`

指针指向 slice 中第一个可以访问的元素

长度指 slice 中元素的个数

容量的大小指的是 slice 可以访问的第一个元素到底层数组最后一个元素的个数

go 内置了 `len` 和 `cap` 来返回 slice 的长度和容量

```go
arr := [5]int{1,2,3,4,5}
sub := arr[1:5]
fmt.Println(sub) // [2 3]
fmt.Println(len(sub)) // 2  
fmt.Println(cap(sub)) // 4
```



对字符串的 slice 操作相当于取子串



slice **无法用 == 比较**





### map

键值对的无序集合

格式: 

> map[keyType]valueType

```go
ages = make(map[string]int) // 从 string 到 map 的映射
ages["alice"] = 18

delete(ages, "alice") // 移除元素 alice
```



map 的初始值是 `nil`

对初始值为 `nil` 的map, 大多数操作是安全的, 除了对一个键进行赋值

```go
var ages map[string]int
ages["alice"] = 18 // 崩溃

```



判断一个 key 是否存在

```go
_, ok := ages["aaa"]

if !ok {
   fmt.Println("aaa, 不存在")
}
```



map 中键值对的个数

```go
len(ages)
```





### 结构体

结构体使用 `struct` 关键字来定义

```go
type Empolyee struct {
    id int
    age int
    name string
}

var alice Empolyee
alice.id = 100
alice.age = 18

// 可以使用指针来访问成员变量
age := &alice.age
*age++
```



如果一个结构体的成员变量名称是首字母大写的, 那么这个变量是可以导出的



结构体类型不能包含自身类型的成员变量, 但是可以包含自身指针类型的成员变量





## 常用 API

### string

string.join()

### time
time.Sleep()



### append()

用于将元素追加到 `slice`后面



### sort

sort.String() 

对字符串数组进行排序





## 其他不知道该放哪的知识

* `rune` 在golang中是 int32 的别名，在各个方面都与int32相同。 
* 





