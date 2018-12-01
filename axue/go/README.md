# 《Go 程序设计语言》 笔记













## 注意

> 想学 go 的，不建议看这篇笔记，完成的比较仓促，很多细节没有记录，后面会进行补充

**推荐的入门书:**

[Go 学习笔记](https://github.com/qyuhen/book/blob/master/Go%20学习笔记%20第四版.pdf)

[Go 入门指南](https://github.com/Unknwon/the-way-to-go_ZH_CN/blob/master/eBook/directory.md)



















## Go 语言特性

- 静态类型
- 垃圾回收
- 天然并发
  - 语言层面支持并发
  - 轻量级线程
- 跨平台编译
- 内置代码格式化工具, 风格统一





## 安装

[官网](https://golang.org/) 下载安装包并安装

### hello world
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

运行

> go run hello.go

编译 (会生成可执行文件)

>  go build hello.go



## 变量

Go 是静态类型语⾔言，不能在运⾏行期改变变量类型。

如果一个实体在函数中声明，作用域是函数内。在包中声明，作用域是包内。如果首字母大写，说明是可以跨包的。

var 名称 类型 = 表达式

```go
var a int = 10
```



在函数中，`:=` 简洁赋值语句在明确类型的地方，可以用于替代 `var` 定义。变量类型取决于表达式类型
格式 name := expression

```go
b := 100
```



`:=` 结构不能使用在函数外。

```go
b := 4 // syntax error: non-declaration statement outside function body
func main() {
    
}
```



同时定义多个变量

```go
// 方法一
var (
	c int
    d float64
)
c = 10
d = 11.1

// 方法二, 同时定义多个变量并赋值
var (
	e = 10
    f = 11.1
)

// 方法三
n, s := 0x1234, "Hello, World!"
```

当两个或多个连续的函数命名参数是同一类型，则除了最后一个类型之外，其他都可以省略。

```go
x int, y int

// 可以缩写为
x, y int
```

多重赋值,  先计算右侧的值,  再复制给左侧

```go
x, y = y, x // 交换变量的值
```

`_`占位符，用于语法需要实际并不需要的情况，比如：函数有两个返回值，但是只需要其中的一个，另外一个可以使用占位符

```go
// 函数可以有多个返回值, 这个后面再说
func test() (int, string) {
	return 1, "abc"
}

func main() {
    _, s := test()
    println(s)
}
```

**变量如果定义却未使用, 编译器会报错**



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

// 在同⼀一常量组中，可以提供多个 iota，它们各⾃自增⻓长。
const (
    A, B = iota, iota << 10 // 0, 0 << 10
    C, D // 1, 1 << 10
)

// 一行定义多个, 值相同
const (
    a1 = iota // 0
    b1, b2, b3 = iota // 1, 1 ,1
    c1 = iota // 1
)

// 如果 iota ⾃自增被打断，须显式恢复。
const (
    A = iota // 0
    B // 1
    C = "c" // c
    D // c，与上⼀一⾏行相同。
    E = iota // 4，显式恢复。注意计数包含了 C、D 两⾏行。
    F // 5
)

// 每次 const 中定义的时候, 重置为0
const (
    d = iota // 0
)

// 不能给变量使用
```





## 基本数据类型

>bool
>
>string
>
>int  int8  int16  int32  int64
>uint uint8 uint16 uint32 uint64 uintptr
>
>byte // uint8 的别名
>
>rune // int32 的别名
>         // 代表一个Unicode码
>
>float32 float64
>
>complex64 complex128

### string

使用 ``` 定义不做转义处理的原始字符串，支持跨行。

```go
s := `a
b\r\n\x00
c`
println(s)

// 输出
a
b\r\n\x00
c
```

连接跨行字符串时，"+" 必须在上一⾏行末尾，否则导致编译错误。

```go
s := "Hello, " +
"World!"
```

### 零值

变量在定义时没有明确的初始化时会赋值为 `零值`。

零值是：

- 数值类型为 `0`，
- 布尔类型为 `false`，
- 字符串为 `""`（空字符串）。



### 指针

Go 具有指针。 指针保存了变量的内存地址。

类型 `*T` 是指向类型 `T` 的值的指针。其零值是 `nil`。

```go
var p *int
```

`&` 符号会生成一个指向其作用对象的指针。

```go
i := 42
p = &i
```

`*` 符号表示指针指向的底层的值。

```go
fmt.Println(*p) // 通过指针 p 读取 i
*p = 21         // 通过指针 p 设置 i
```

这也就是通常所说的“间接引用”或“非直接引用”。

与 C 不同，Go 没有指针运算。



可以用 unsafe.Pointer 和任意类型指针间进⾏行转换。

```go
func main() {
    x := 0x12345678
    p := unsafe.Pointer(&x) // *int -> Pointer
    n := (*[4]byte)(p) // Pointer -> *[4]byte
    for i := 0; i < len(n); i++ {
    	fmt.Printf("%X ", n[i])
    }
}
```



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



## 复合数据类型
> 通过基本数据类型组合而成

### 数组

* 数组是值类型, 赋值和传参会复制整个数组, 而不是指针
* [2]int 和 [3]int 是不同的类型
* 指针数组 [n]*T, 数组指针 *[n]T

* 数组中的类型必须相同

数组初始化

```go
var arr1 [3]int // 3 个元素的数组, 元素默认值均为 0 

var arr2 [3]int = [3]int{1, 2, 3} // 3 个元素的数组, 赋值 1, 2, 3

var arr3 [3]int = [3]int{1, 2}// 3 个元素的数组, 赋值 1, 2, arr3[2] 为默认值 0

arr4 := [...]int{1, 2} // 数组长度由初始化的元素个数决定

//创建一个初始元素个数为5的数组切片，元素初始值为0，并预留10个元素的存储空间
b := make([]int, 5, 10)
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



一旦超出原 slice.cap 限制，就会重新分配底层数组，即便原数组并未填满。

```go
s := make([]int, 0, 3)

s = append(s, 1)
s = append(s, 1)
s = append(s, 1)

fmt.Println(s,cap(s)) // [1 1 1] 3

s = append(s, 1)

fmt.Println(s,cap(s)) // [1 1 1 1] 6
```

函数 copy 在两个 slice 间复制数据，复制长度以 len 小的为准。两个 slice 可指向同⼀底层数组，允许元素区间重叠。

```go
data := [...]int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
s := data[8:]
s2 := data[:5]
copy(s2, s) // dst:s2, src:s
fmt.Println(s2)  // [8 9 2 3 4]
fmt.Println(data) // [8 9 2 3 4 5 6 7 8 9]
```







对字符串的 slice 操作相当于取子串



slice **无法用 == 比较**



### map

键值对的无序集合

格式: 

> map[keyType]valueType

```go
// 从 string 到 int 的映射

// 预先给 make 函数一个合理元素数量参数，有助于提升性能。因为事先申请一大块内存，可避免后续操作时频繁扩张。

ages = make(map[string]int, 1000) 
```



迭代，随机顺序返回，每次都不相同。

```go
for k, v := range m {
	println(k, v)
}
```



map 的初始值是 `nil`

对初始值为 `nil` 的map, 大多数操作是安全的, 除了对一个键进行赋值

```go
var ages map[string]int
ages["alice"] = 18 // 崩溃
```

判断一个 key 是否存在

```go
// 方式一
_, ok := ages["aaa"]

if !ok {
   fmt.Println("aaa, 不存在")
}

// 方式二, if 中使用初始化语句
if v, ok := m["a"]; ok { // 判断 key 是否存在。
	println(v)
}
```

删除 key

```go
delete(m, "c")
```





map 中键值对的个数

```go
len(ages)
```



### struct (结构体)

#### 定义

```go
type structType struct {

	filed1 type

	filed2 type

}
```

举例: 

```go
type Empolyee struct {
    id int
    age int
    name string
}
```

#### 初始化

##### 顺序初始化

使用顺序初始化给结构体赋值时, 赋值的顺序要和成员定义时的顺序保持一致, 否则会报错



结构体成员赋值

```go
var alice Empolyee
alice.id = 100
alice.age = 18

// 可以使用指针来访问成员变量
age := &alice.age
*age++
```





结构体的成员也可以是结构体类型



如果一个结构体的成员变量名称是首字母大写的, 那么这个变量是可以导出的



结构体类型不能包含自身类型的成员变量, 但是可以包含自身指针类型的成员变量





## 流程控制

### if

可省略表达式括号, 下面两种方式都可以, `{}`是必须的

```go
// 方式一
if (a > b) {
    // do something
}

// 方式二
if a > b {
    // do something
}
```

支持初始化语句，可定义代码块局部变量。

```go
if n := "abc"; x > 0 { // 初始化语句未必就是定义变量，⽐比如 println("init") 也是可以的。
    println(n[2])
} else if x < 0 { // 注意 else if 和 else 左⼤大括号位置。
    println(n[1])
} else {
    println(n[0])
}
```







**不支持三元表达式**





### for 循环

基本用法, **注意, 花括号不能换行**

> for 初始化语句; 条件表达式; 后置语句 {
>
> }

```go
for i := 0; i < 100; i++ {
    // do something
}
```

等同与while

```go
i := 1
for i < 100 {
    i++
}
```

死循环

```go
// 如果省略了循环条件，循环就不会结束，因此可以用更简洁地形式表达死循环。
for {
    // do something
}
```



#### 使用 range

```
for i, data := range arr {
	// i: 下标, data: 元素
}
```

range 也可以用来遍历 map

```
m := map[string]int{"a": 1, "b": 2}
for k, v := range m { // 返回 (key, value)。
   println(k, v)
}
```

range 会复制对象。



### switch

不需要写 break 语句, 会自动中断

```go
switch i {
    case x[1]:
    	println("a")
    case 1, 3:
    	println("b")
    default:
    	println("c")
}
```

如果要继续向下执行, 可以使用 `fallthrough` 语句

```
switch i {
    case x[1]:
    	println("a")
    	fallthrough
    case 1, 3:
    	println("b")
    default:
    	println("c")
}
```





### goto





## 函数

* 支持多返回值
* 支持匿名函数和闭包

### 函数声明

每个函声明都包含一个`函数名`, 一个`形参列表`, 一个`返回列表`和`函数体`

> func 函数名(形参列表) (返回列表) {
>
> 	// body
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

// 函数可以返回任意数量的返回值。
func swap(x, y string) (string, string) {
	return y, x
}

```

有返回值的函数，必须有明确的终⽌止语句，否则会引发编译错误。



### 可变参数

可变参数只能有一个, 而且必须是最后一个参数

```go
func test(s string, n ...int) string {
    var x int
    for _, i := range n {
    	x += i
	}
	return fmt.Sprintf(s, x)
}
func main() {
	println(test("sum: %d", 1, 2, 3))
}
```

### 延迟函数

`defer` 定义的函数会在 return 语句调用之前执行

```go
func add(x, y int) (z int) {
    defer func() {
        println(z + 200) // 输出: 203
    }()
    z = x + y
    return z + 200 // 执⾏行顺序: (z = z + 200) -> (call defer) -> (ret)
}
func main() {
    println(add(1, 2)) // 输出: 203
}
```

多个defer, 后定义的先执行



### 匿名函数

```go
fn := func() {
	println("Hello, World!")  
}
```





## 方法

方法总是绑定对象实例，并隐式将实例作为第一实参 (receiver)。





## 接口

接口类型是由一组方法定义的集合。



## 并发



Go 在语⾔言层⾯面对并发编程提供⽀支持，一种类似协程，称作 goroutine 的机制。

### goroutine

一个程序启动时, 只有一个主 goroutine，只需在函数调用语句前添加 go 关键字，就可创建并发执行单元。开发人员无需了解任何执行细节，调度器会自动将其安排到合适的系统线程上执行。goroutine 是⼀种非常轻量级的实现，可在单个进程⾥里执行成千上万的并发任务。



```go
// 开启一个新的 goroutine 执行 f(x, y, z)
go f(x, y, z)
```



### channel

channel 是有类型的管道，可以用 channel 操作符 `<-` 对其发送或者接收值。

```
ch <- v    // 将 v 送入 channel ch。
v := <-ch  // 从 ch 接收，并且赋值给 v。
```

（“箭头”就是数据流的方向。）

和 map 与 slice 一样，channel 使用前必须创建：

```
ch := make(chan int)
```

默认情况下，在另一端准备好之前，发送和接收都会阻塞。这使得 goroutine 可以在没有明确的锁或竞态变量的情况下进行同步。

```go
package main

import "fmt"

func sum(a []int, c chan int) {
	sum := 0
	for _, v := range a {
		sum += v
	}
	c <- sum // 将和送入 c
}

func main() {
	a := []int{7, 2, 8, -9, 4, 0}

	c := make(chan int)
	go sum(a[:len(a)/2], c)
	go sum(a[len(a)/2:], c)
	x, y := <-c, <-c // 从 c 中获取

	fmt.Println(x, y, x+y)
}

```

### 缓冲 channel

channel 可以是 _带缓冲的_。为 `make` 提供第二个参数作为缓冲长度来初始化一个缓冲 channel：

```
ch := make(chan int, 100)
```

向缓冲 channel 发送数据的时候，只有在缓冲区满的时候才会阻塞。当缓冲区清空的时候接受阻塞。

```go
package main

import "fmt"

func main() {
	c := make(chan int, 2)
	c <- 1
	c <- 2
    // c <- 3  // 再发送一条数据, 报错
	fmt.Println(<-c)
	fmt.Println(<-c)
}
```

### range 和 close

发送者可以 `close` 一个 channel 来表示再没有值会被发送了。接收者可以通过赋值语句的第二参数来测试 channel 是否被关闭：当没有值可以接收并且 channel 已经被关闭，那么经过

```
v, ok := <-ch
```

之后 `ok` 会被设置为 `false`。

循环 `for i := range c` 会不断从 channel 接收值，直到它被关闭。

**注意：** 只有发送者才能关闭 channel，而不是接收者。向一个已经关闭的 channel 发送数据会引起 `panic`。 

**还要注意：** channel 与文件不同；通常情况下无需关闭它们。只有在需要告诉接收者没有更多的数据的时候才有必要进行关闭，例如中断一个 `range`。

```go
package main

import (
	"fmt"
)

func fibonacci(n int, c chan int) {
	x, y := 0, 1
	for i := 0; i < n; i++ {
		c <- x
		x, y = y, x+y
	}
	close(c)
}

func main() {
	c := make(chan int, 10)
	go fibonacci(cap(c), c)
	for i := range c {
		fmt.Println(i)
	}
}
```





##包

```go
package main

import (
	"fmt"
	"math/rand"
)

func main() {
	fmt.Println("My favorite number is", rand.Intn(10))
}
```

每个 Go 程序都是由包组成的。

程序运行的入口是 `main` 包。

这个程序使用并导入了包 `"fmt"` 和 `"math/rand"`。

按照惯例，包名与导入路径的最后一个目录一致。例如，`"math/rand"` 包由 `package rand` 语句开始。

**注意：** 这个程序的运行环境是固定的，因此 `rand.Intn` 总是会返回相同的数字。 （为了得到不同的数字，需要生成不同的种子数，参阅 [`rand.Seed`](http://golang.org/pkg/math/rand/#Seed)。）

### 导入包

```go
// 方式一, 推荐
import (
	"fmt"
	"math"
)

// 方式二
import "fmt"
import "math"
```

### 导出

如果 math 包中有一个变量 pi 需要在其他包中使用, 则需要将首字母大写为 `Pi`

```go
package main

import (
	"fmt"
	"math"
)

func main() {
	fmt.Println(math.Pi)
}
```





## Web 服务器

包通过任何实现了 `http.Handler` 的值来响应 HTTP 请求：

```
package http

type Handler interface {
    ServeHTTP(w ResponseWriter, r *Request)
}
```

在这个例子中，类型 `Hello` 实现了 `http.Handler`。

```go
package main

import (
	"fmt"
	"log"
	"net/http"
)

type Hello struct{}

func (h Hello) ServeHTTP(
	w http.ResponseWriter,
	r *http.Request) {
	fmt.Fprint(w, "Hello!")
}

func main() {
	var h Hello
	err := http.ListenAndServe("localhost:4000", h)
	if err != nil {
		log.Fatal(err)
	}
}
```

访问 <http://localhost:4000/> 会看到来自程序的问候。



## 图片

例子:

```go
package main

import (
	"fmt"
	"image"
)

func main() {
	m := image.NewRGBA(image.Rect(0, 0, 100, 100))
	fmt.Println(m.Bounds())
	fmt.Println(m.At(0, 0).RGBA())
}
```

[Package image](http://golang.org/pkg/image/#Image) 定义了 `Image` 接口：

```
package image

type Image interface {
    ColorModel() color.Model
    Bounds() Rectangle
    At(x, y int) color.Color
}
```

*注意*：`Bounds` 方法的 `Rectangle` 返回值实际上是一个 [`image.Rectangle`](http://golang.org/pkg/image/#Rectangle)， 其定义在 `image` 包中。

（参阅[文档](http://golang.org/pkg/image/#Image)了解全部信息。）

`color.Color` 和 `color.Model` 也是接口，但是通常因为直接使用预定义的实现 `image.RGBA` 和 `image.RGBAModel` 而被忽视了。这些接口和类型由[image/color 包](http://golang.org/pkg/image/color/)定义。





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





### 风格

- 越小的使用范围，使用更短的变量命名，越大的使用范围，使用更长的命名。
- 驼峰命名，缩写单词全大写或全小写，如：HTML



## 其他

不⽀支持隐式类型转换

不能将其他类型当 bool 值使⽤用。





### 待整理

* panic
* 反射
