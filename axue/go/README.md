# Go 语言学习笔记



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
- 指针变量的默认值是 `nil` , 可以使用 p== nil 判断指针是否已经指向一个变量



## 函数

> func 函数名(参数列表) 返回值1,返回值2 {
>
> 	return x,y
>
> }

new 函数创建一个变量, 并返回变量的指针

``` go
p := new(int)
```





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







### for 循环

for 初始化; 条件; 后置 {

}



// 等同与while

for 条件 {

}



```go
for {
    // 死循环
}
```





`_` 占位符, 用于语法需要实际并不需要的情况, 比如: 函数有两个返回值, 但是只需要其中的一个, 另外一个可以使用占位符





数组.[m,n]    // 数组裁切, 取第 m  ~ n-1 个元素



## 常用 API

### string

string.join()

### time
time.Sleep()









