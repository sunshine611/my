# 包管理

## 模块化

用任何语言来开发, 如果软件规模扩大, 会编写大量的函数、结构体、接口等代码. 这些代码不可能写在一个文件中, 这就会产生大量的文件. 如果这些文件杂乱无章, 就会造成名称冲突、重复定义、难以检索、无法引用、共享不便、版本管理等一系列问题.
有一些功能模块如何复用, 如何共享方便其它项目使用.所以, 一定要有模块化管理, 解决以上诸多问题.

### 包

- 包由多个文件和目录组成
- 使用 package <包名> 来定义包名
- 包名一般都采用小写, 符合标识符要求
- 当前目录名和 package <包名> 中的包名不需要一致, 但最好保持一致
- **同级文件归属一个包**, 就是说每个包目录的当前目录中, 只能统一使用同一个 package 的包名, 否则编译出错

一般来说, 开发项目时, 可以把相关功能的代码集中放在某个包里面. 例如在 main 包目录中新建一个 calc 包, 将所有计算函数都放在其中, 以供别的代码调用.

### Module 模式

在 Go 1.11 开始引入, 可以在任何目录使用 go.mod 创建项目

- `go mod init <package-name>` 当前文件夹下初始化一个新的 module, 创建 go.mod 文件
- `go mod tidy` 自动分析依赖, 下载缺失的模块, 移除未使用的模块, 并更新 go.mod 文件

`go mod vendor` 把第三方依赖包复制到项目的 vendor 目录中, 就可以离线使用该依赖包编译.

### 构建 Module 模式项目

构建项目根目录 lydoctools, 并初始化模块 `go mod init lydoc.me/tools`, 会产生 go.mod 文件,内容如下

```mod
module lydoc.me/tools

go 1.22.1
```

- module 指定模块名称
- go 指定当前模块使用的 Go 版本

根目录下新建 main.go, 内容如下

```go [main.go]
package main

import "fmt"

func main(){
    fmt.Println("hello lydoc.me")
}
```

- package 指定包名, 同一个目录里面 go 文件包名必须相同
- import 导入包, 这里是绝对导入, 且 fmt 是标准库中的包
  - 标准库搜索 `$GOROOT/src`
- main 函数, 必须在 main 包中,且只能有一个 main 函数. 如果要编译成可执行文件, 必须要有 main 函数.

## 日志

### log 包

Go 标准库中有 log 包, 提供了简单的日志功能.

|    输出     |   格式输出   |   换行输出    |                                 |
| :---------: | :----------: | :-----------: | :-----------------------------: |
| log.Print() | log.Printf() | log.Println() |        类似 fmt.Print\*         |
| log.Fatal() | log.Fatalf() | log.Fatalln() | 相当于 log.Print\* + os.Exit(1) |
| log.Panic() | log.Panicf() |  log.Panicln  |  相当于 log.Print\* + panic()   |

日志输出需要使用日志记录器 Logger.

log 包提供了一个缺省的 Logger 即 std. std 是小写,包外不可见, 所以提供了 Default()方法返回 std 给包外使用.

```go
package main

import (
	"log"
	"os"
)

func main() {
	l := log.New(os.Stdout, "lydoc.me ", log.LstdFlags) // 第一个参数是输出位置，第二个参数是前缀，第三个参数是日志属性
	l.Println("Hello, World!")                          // result:lydoc.me 2025/02/17 20:08:59 Hello, World!
}

```

### zerolog

标准库的 log 模块太简陋了, 实际使用并不方便.

- logrus 有日志级别、Hook 机制、日志格式输出, 很好用
- zap 是 Uber 的开源高性能日志库
- zerolog 更注重开发体验, 高性能、 有日志级别、 链式 API, json 格式日志记录, 号称 0 内存分配

官网 https://github.com/rs/zerolog

安装 `go get -u github.com/rs/zerolog/log`

```go
package main

import (
	"os"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

func main() {
	log.Print("Default Msg")   // result:{"level":"debug","time":"2025-02-18T15:41:22+08:00","message":"Default Msg"}
	log.Info().Msg("Info Msg") // result:{"level":"info","time":"2025-02-18T15:41:22+08:00","message":"Info Msg"}

	logger := zerolog.New((os.Stdout)).With().Timestamp().Bool("success", true).Logger() // 全新定义,并在最后返回Logger结构体
	logger.Warn().Msg("自定义:Info Msg")                                                    // result:{"level":"warn","success":true,"time":"2025-02-18T15:41:22+08:00","message":"自定义:Info Msg"}

}
```

### 日志级别

```go
package main

import (
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

func main() {

	zerolog.SetGlobalLevel(zerolog.TraceLevel) // 设置全局(gLevel)日志级别为TraceLevel,
	l1 := log.Level(zerolog.InfoLevel)
	l1.Debug().Msg("debug message")                 // 这一行不会输出,因为l1的级别是InfoLevel,InfoLevel=1,DebugLevel=0,0<1,所以不会输出
	l1.Info().Msg("info message")                   // Info消息级别是1,1>=1 result: {"level":"info","time":"2025-02-18T17:41:41+08:00","message":"info message"}
	l1.Warn().Msg("warn message")                   // Warn消息级别是2,2>=1 result: {"level":"warn","time":"2025-02-18T17:41:41+08:00","message":"warn message"}
	log.Print(l1.GetLevel(), log.Logger.GetLevel()) // l1级别是info,log.Logger级别是trace
	// 消息输出级别 >= Max(zerolog.GlobalLevel(),l1.GetLevel())
}
```
