# 常用命令

## `go build`

- 编译包和依赖

```go
//示例
go build myapp.go
```

## `go build`

- 编译包和依赖

```go
//示例
go build myapp.go
```

## `go run`

- 编译并运行Go程序

```go
//示例
go run myapp.go
```

## `go test`

- 运行测试文件

```go
//示例
go test -v  //-v 代表详细的输出
```

## `go get`

- 下载并包装包及其依赖

```go
//示例
go get github.com/gin-gonic/gin
```

## `go install`

- 编译和安装包和依赖

```go
//示例
go install myapp
```

## `go fmt`

- 格式化Go程序,使其符合Go语言的代码风格

```go
//示例
go fmt ./...    //格式化当前目录和所有子目录中的所有包
```

## `go vet`

- 检查Go源码中的错误

```go
//示例
go vet ./...
```

## `go mod init`

- 初始化当前文件下下的Go模块

```go
//示例
go mod init <module-name>
```

## `go mod tidy`

- 添加确实的模块,删除无用的模块

```go
//示例
go mod tidy
```

## `go mod download`

- 下载go.mod文件中指明的所有依赖

```go
//示例
go mod download
```

## `go list`

- 列出所有的包或模块

```go
//示例
go list all
```

## `go env`

- 打印Go环境信息

```go
//示例
go env
```

## `go version`

- 打印Go的当前版本

```go
//示例
go version
```

## `go doc`

- 显示包或者符号的文档

```go
//示例
go doc fmt.Println
```