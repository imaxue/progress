# Go 语言学习笔记

## 安装

[官网](https://golang.org/) 下载安装包并安装



## hello world

> hello.go

```go
package main
import "fmt"

func main() {
    fmt.Println("Hello, World")
}
```

**运行**

> go run hello.go

**编译 (会生成可执行文件)**

> go build hello.go



## 入门

* go 代码使用包来组织

> package main 指明文件属于哪个包
>
> import "fmt" fmt 包中的函数用于格式化输出和扫描输入
>
> Println 是fmt 包中的一个基本的输出函数
>
> main包用来定义一个独立的可执行程序
>
> main函数是程序开始的地方



