# 接口

## 接口的基础概念

在 Go 语言（Golang）中，接口 interface 是一种定义方法集合的抽象类型。接口定义了一组方法，而不提供这些方法的具体实现。其他类型可以实现这些接口，只要它们提供了接口所需的方法即可。接口在 Go 中用于实现多态性和代码复用。

```go
type 接口名 interface {
    方法名1(参数列表1) 返回值列表1
    方法名2(参数列表2) 返回值列表2
    // 更多方法...
}
```

- 接口名是你要定义的接口的名称。
- 方法名 1、方法名 2 是接口中的方法名。
- 参数列表 1、参数列表 2 是方法的参数列表。
- 返回值列表 1、返回值列表 2 是方法的返回值列表。

```go
//接口是一组行为规范的集合
type Transporter interface {    //定义接口,通常接口名以er结尾
    //接口里面只定义方法,不定义变量
    move(src string,dest string) (int,error)    //方法名(参数列表) 返回值列表
    whistle(int) int    //参数列表和返回值列表里的变量名可以省略
}
```

## 接口的实现

```go
//定义结构体时无需要显式声明它要实现什么接口
type Car struct{
    price int
}

//只要结构体拥有接口里声明的所有方法,就称该结构体“实现了接口”
func (car Car) move(src string,dest string) (int,error){
    return car.price,nil
}
func (car Car) whistle(n int) int{
    return n
}
//一个struct可以同时实现多个接口
func (car Car) say() string{
    return "Hello,World!"
}
```

## 接口的本质

- 接口值有两部分组成,一个指向该接口的具体类型的指针和另外一个指向该具体类型真实数据的指针

```go
car := Car{"宝马",100}  //实例化Car类
var transporter Transporter //声明了Transporter接口类型
transporter = car //transporter里面包含了两个指针,一个指向Car结构体,一个指向car实例
transporter.whistle(3)
```

## 接口的使用

```go
func transport(src,dest string,transporter Transporter) error{
    _,err := transporter.move(src,dest)
    return err
}

var car Car //这里Car实现了Transporter接口
var ship Shiper //这里Shiper实现了Transporter接口
transport("北京","天津",car)
transport("北京","天津",ship)
```

## 接口的赋值

```go
func (car Car) whistle(n int) int {...} //方法接收者是值
func (ship *Shiper) whistle(n int) int {...}    //方法接收者用指针,则实现接口的是指针类型
car := Car{}
ship := Shiper{}
var transporter Transporter
transporter = car
transporter = &car  //值实现的方法,指针同样也实现了,值和指针是同步的
transporter = &ship //因为上面是*Shiper指针实现了接口,所以必须使用&ship,而不能使用ship
```

## 接口嵌入

```go
type Transporter interface{
    whistle(int) int
}
type Steamer interface{
    Transporter //接口嵌入,相当于Transporter接口定义的行为集合是Steamer的子集,意味着想实现Steamer接口必须同时实现Transporter接口
    displacement() int
}
```

## 空接口

空接口（Empty Interface）是一个不包含任何方法签名的接口。空接口可以接受任何类型的值，因为它不限定具体类型。空接口在某些情况下非常有用，因为它允许你以通用的方式处理不同类型的数据。

- 空接口类型用 interface{}表示，注意有{}
  - `var i interface{}`
- 空接口没有定义任何方法，因此任意类型都实现了空接口
  - `var a int = 5`
  - `i = a`
- `func square(x interface{}) {}`该函数可以接收任意数据类型
- slice 的元素、map 的 key 和 value 都可以是空接口类型

```go
package main

import "fmt"

func main() {
    // 定义一个空接口变量
    var emptyInterface interface{}

    // 可以将任何类型的值赋给空接口
    emptyInterface = 42
    fmt.Println(emptyInterface) // 输出: 42

    emptyInterface = "Hello, Go"
    fmt.Println(emptyInterface) // 输出: Hello, Go

    emptyInterface = []int{1, 2, 3}
    fmt.Println(emptyInterface) // 输出: [1 2 3]

    // 从空接口中获取值时，需要进行类型断言
    value, ok := emptyInterface.(int)
    if ok {
        fmt.Printf("从空接口中获取的整数值是：%d\n", value)
    } else {
        fmt.Println("无法从空接口中获取整数值")
    }
}

```

在上面的示例中，首先定义了一个空接口变量 emptyInterface，然后分别将整数、字符串和整数切片赋给它。最后，我们使用类型断言从空接口中获取值，并检查是否成功。空接口允许在不知道具体类型的情况下处理各种不同类型的数据。

## 类型断言

```go
func main(){
    if v,ok := i.(int);ok { //若断言成功,则ok为true,v是具体的类型
        fmt.Printf("i是int类型,其值为%d\n",v)
    }else{
        fmt.Println("i不是int类型")
    }
}
```

- 当要判断的类型比较多时,就需要写很多 if-else,更好的方法是使用[switch i.(type)](/backend/golang/syntax.html#switch-type)
