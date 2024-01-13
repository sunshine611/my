# 函数

## 函数的基本形式

- 形参可以有 0 个或 N 个
- 参数类型相同时可以只写一次，比如 argf(a,b int)

```go
//a,b是形参，形参是函数内部的局部变量，实参的值会拷贝给形参
func argf(a,b int){
    a = a+b //在函数内部修改形参的值，实参的值不受影响
}
func main(){
    var x,y int = 3,6
    argf(x,y)   //x,y是实参
}
```

### 参数传指针

- 如果想通过函数修改实参，就需要指针类型

```go
func argf(a,b *int){
    *a = *a + *b
    *b = 888
}
func main(){
    var x,y int = 3,6
    argf(&x,&y)
}
```

### 传引用和传引用的指针

- slice、map、channel 都是引用类型，它们作为函数参数时其实跟普通 struct 没什么区别，都是对 struct 内部的各个字段做一次拷贝传到函数内部

```go
func sliceArg(arr []int){   //slice作为参数，实际上是把slice的arrayPointer、len、cap拷贝了一份传进来
    arr[0] = 1  //修改底层数据里的首元素，即arr的值发生了变化
    arr = append(arr,1) //arr的len和cap发生了变化，但不会影响实参
}
```

### 函数返回值

- 可以返回 0 个或这 N 个
- 可以在 func 行直接声明要返回的变量
- return 后面的语句不会执行
- 无返回参数时 return 可以不写

```go
func returnf(a,b int) (c int){  //返回变量c在这里就声明好了
    a = a+b
    c = a //直接使用c
    return //由于函数要求有返回值，即使给c赋过值，也需要显示写return
}
```

### 不定长参数

```go{2}
//不定长参数实际上时slice类型
func variableEngthArg(a int,other ...int) int {
    sum := a
    for _,ele := range other {
        sum += ele
    }
    fmt.Printf("len %d cap %d\n",len(other),cap(other))
    return sum
}
func main(){
    variableEngthArg(1) //len 0 cap 0
    variableEngthArg(1,3,5,7,9) //len 4 cap 4
    brr := []int{1, 2, 3}
	variableEngthArg(3, brr...)//传不定长参数的另类写法
}
```

## 匿名函数

在 Go 语言（Golang）中，匿名函数是没有名字的函数。它们通常用于实现闭包和即时函数调用。匿名函数可以定义在任何地方，并且可以直接调用。

```go:line-numbers
//f参数是一种函数类型
func functionArg1(f func(a,b int) int,b int) int{
    a := 2 * b
    return f(a,b)
}

//foo是一种函数类型
type foo func(a,b int) int
//参数类型看上去简洁多了
func functionArg2(f foo,b int) int{
    a := 2 * b
    return f(a,b)
}

type User struct{
    Name string
    bye foo //bye的类型是foo,而foo代表一种函数类型
    hello func(name string) string  //使用匿名函数来声明struct字段的类型
}

ch := make(chan func(string) string,10) //用匿名函数
ch <- func(name string) string{
    return "hello " + name
}
```

## 闭包

- 闭包(Closure)是引用了自由变量的函数
- 自由变量将和函数一同存在，即使已经离开了创造它的环境
- 闭包复制的是原对象的指针(浅拷贝)

```go:line-numbers
func sub() func() {
	i := 10
	fmt.Printf("%p\n", &i) //0xc00000a0d8
	b := func() {   //闭包
		fmt.Printf("i address %p\n", &i)
		i--
		fmt.Println(i)
	}
	return b
}

func main() {
	f := sub()
	f() //f就是b,i没有被回收,i address 0xc00000a0d8,9
	f() //i address 0xc00000a0d8,8
	fmt.Println()
}
```

## 延迟调用 defer

- defer 用于注册一个延迟调用(在函数返回之前调用)
- defer 典型的应用场景是释放资源，比如关闭文件句柄，释放数据库连接等
- 如果同一个函数里有多个 defer，则后注册的先执行
- defer 后可以跟一个 func，func 内部如果发生 panic，会把 panic 暂时搁置，当把其它 defer 执行完之后再执行这个 panic
- defer 后不是跟 func，而直接跟一条执行语句，则相关变量在注册 defer 时被拷贝或计算

```go
func basic(){
    fmt.Println("A")
    defer fmt.Println(1) fmt.Println("B")
    //如果同一个函数里有多个defer，则后注册的先执行
    defer fmt.Println(2)
    fmt.Println("C")
}
func main(){
    basic() //输出顺序：A C 2 1 B
}
```

### defer func

```go
func deferExeTime() (i int){
    i = 9
    //defer后可以跟一个func
    defer func(){
        fmt.Printf("i=%d\n",i)  //打印5，而非9
    }()
    defer fmt.Printf("i=%d\n",i)    //变量在注册defer时被拷贝或计算
    return 5
}
```

1. **函数定义:** 这个函数 deferExeTime 定义了一个返回类型为 int 的命名返回值 i。函数开始时将 i 赋值为 9。
2. **第一个 defer 语句:** 这里使用了一个匿名函数，它在 deferExeTime 函数返回时执行。由于 defer 的特性，它将在函数返回之前的最后执行，而且此时使用的 i 值是函数作用域内的最终值，也就是在 return 语句之后的值。
3. **第二个 defer 语句:** 这个 defer 语句将直接打印 i 的值。不过，需要注意的是，这里的 i 的值是在 defer 语句被执行时确定的，即为 9。这是因为在 Go 语言中，defer 语句中的参数在声明时就会被计算和保存。
4. **返回语句:** 函数返回时，命名返回值 i 被设置为 5。这个值将在函数完全返回到调用者之前由第一个 defer 语句打印。

综上所述，当调用 deferExeTime 函数时，以下事件将发生：

- i 被设置为 9。
- 第二个 defer 语句登记，将在函数结束时打印 i=9。
- 第一个 defer 语句登记，将在函数结束时打印 i 的当前值，这将是返回语句之后的值。
- i 被设置为 5 并准备返回。
- 第一个 defer 语句执行，打印 i=5。
- 第二个 defer 语句执行，打印 i=9。
- 函数返回 i 的值 5。
- 因此，最终的输出将是：i=5;i=9

### defer panic

```go
    defer fmt.Println("111")    //这个最后输出了
    n := 0
    defer func(){
        fmt.Println(2/n)    //发生panic事件，func 内部如果发生 panic，会把panic暂时搁置，当把其它defer执行完之后再执行这个panic
        defer fmt.Println("222")    //这个defer不执行
    }()
    defer fmt.Println("333")    //这个先输出
```

## 异常处理

```go
//go语言没有try catch，它提倡返回error
func divide(a,b int) (int,error){
    if b==0{
        return -1,errors.New("divide by zero")
    }
    return a / b,nil
}

func main(){
    //函数调用方判断error是否为nil
    if _,err := divide(3,0);err != nil{
        fmt.Println(err.Error())    //divide by zero
    }
}
```

### 自定义 error

```go
//自定义error
type PathError struct{
    path string
    op string
    createTime string
    message string
}
//error接口要求实现Error() string方法
func (err PathError) Error() string{
    return err.createTime + ":" + err.op + " " + err.path + " " + err.message
}
```

### panic

- 何时会发生 panic
  - 运行时错误会导致 panic，比如数组越界、除 0
  - 程序主动调用 panic(error)
- panic 会执行什么：
  1. 逆序执行当前 goroutine 的 defer 链(recover 从这里介入)
  2. 打印错误信息和调用堆栈
  3. 调用 exit(2)结束整个进程

### recover

- recover 会阻断 panic 的执行
 
```go
func soo(a,b int){
    defer func(){
        //recover必须在defer中才能生效
        if err := recover();err != nil{
            fmt.Printf("soo函数中发生了panic:%s\n",err)
        }
    }()
    panic(errors.New("my error"))
}
```
