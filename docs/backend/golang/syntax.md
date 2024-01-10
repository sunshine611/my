---
sidebarDepth:3
---

# 语法结构

## 结构体

结构体（struct）是一种复合数据类型，允许你将多个不同类型的项（称为字段）组合成一个单一的类型。这使得结构体成为组织和存储不同数据的强大工具，类似于其他语言中的类或记录。

```go:line-numbers
//定义结构体
type User struct{
    id int
    score float32
    enrollment time.Time
    name,addr string //多个字段类型相同时可以简写到一行里
}

//初始化一个实例
func main(){
    //声明，会用相应类型的默认值初始化struct里的每一个字段
    var u User
    //相应类型的默认值初始化struct里的每一个字段
    u = User{}
    //赋值初始化
    u = User{id:3,name:"Aoliao"}
    //赋值初始化，，可以不写字段，但需要跟结构体定义里的字段顺序一致
    u = User{4,100.0,time.Now(),"Aoliao","Los Angeles,Ca,United States"}
}
```

### 修改与访问结构体

```go
//给结构体的成员变量赋值
u.enrollment = time.Now()
//访问结构体的成员变量
fmt.Printf("id=%d,enrollment=%v,name=%s\n",u.id,u.enrollment,u.name)
```

### 成员函数(方法)

```go
//可以把hello理解成User内部 的方法
func (u User) hello(man string){
    var sb strings.Builder
    sb.WriteString("Hi ")
    sb.WriteString(man)
    sb.WriteString(",my name is ")
    sb.WriteString(u.name)
    fmt.Println(sb.String())
}

//函数里不需要访问User的成员，可以传匿名_，甚至_也不用传
func (User) think(man string){
    fmt.Println("Hi " + man + ",do you know my name?")
}

//调用User成员函数
u.hello("Aoliao")
u.think("Aoliao")
```

### 为任意类型添加方法

```go
type UserMap map[int]User  //自定义类型

//可以给自定义类型添加任意方法
func (um UserMap) getUser(id int) User{
    return um[id]
}
```

- "func" 关键字用于声明函数。
- 在函数名称前，括号内的 "um UserMap" 部分定义了这个方法的接收器。
- "UserMap" 是这个方法附加到的类型（例如，某个结构体的类型）。
- "getUser" 是方法的名称。
- "id" 和 "User" 分别是方法的参数列表和返回类型，它们可以根据需要省略。

### 匿名结构体

在 Go 语言中，匿名结构体是一种没有显式声明名称的结构体。它们通常用于创建一次性使用的简单数据结构，避免了定义全局结构体类型的需要。匿名结构体在处理临时数据结构或实现简单的封装时非常有用。

```go
//声明stu是一个结构体,但这个结构体是匿名的
var stu struct {
    Name string
    Addr string
}

//匿名结构体通常用于只使用一次的情况
stu.Name = "Aoliao"
stu.Addr = "USA"
```

### 结构体中含有匿名成员

```go
type Student struct {
    id int
    string  //匿名字段
    float32 //直接使用数据类型作为字段名，所以匿名字段中不能出现重复的数据类型
}

var stu = Student{id:1,string:"Aoliao",float32:88}
fmt.Printf("anonymous member string member=%s float member=%f\n",stu.string,stu.float32)
```

### 结构体指针

```go
//创建结构体指针

var u User
//通过取址符(&)得到指针
user := &u

//直接创建结构体指针
user = &User{
    id:3,name:"Aoliao",addr:"America"
}

//通过new()函数实体化一个结构体，并返回其指针
user = new(User)
```

### 构造函数

```go
//构造函数，返回指针是为了避免值拷贝
func NewUser(id int,name string) *User{
    return &User{id,name}
}
```

### 函数接收指针

```go
//User传的是值，即传的是整个结构体的拷贝，在函数里修改结构体不会影响原来的结构体(深拷贝)
func hello(u User,man string){
    u.name = "Tom"
    fmt.Println("Hi " + man ",my name is " + u.name)
}

//传的是User指针，在函数里修改User的成员会影响原来的结构体(浅拷贝)
func hello2(u *User,man string){
    u.name = "Tom"
    fmt.Println("Hi " + man ",my name is " + u.name)
}
```

### 结构体嵌套

```go:line-numbers{8,19,27-29}
type User struct{
    name string
    sex byte
}

type Paper struct{
    name string
    auther User //结构体嵌套
}

//实例化Paper并赋值
p := new(Paper)
p.name = "论文标题"
p.auther.name = "作者姓名"
p.auther.sex = 0

type Vedio struct{
    length int
    name string
    User    //匿名字段,可用数据类型当字段名
}

//实例化Vedio并赋值
v := new(Vedio)
v.length = 13
v.name = "视频名称"
v.user.sex = 0  //通过字段名逐级访问
v.sex = 0   //对于匿名字段也可以跳过中间字段名，直接访问内部得字段名
v.user.name = "作者姓名"    //字段名冲突，由于内部、外部结构体都有name这个字段，名字冲突了，所以需要指定中间字段名
```

### 深拷贝和浅拷贝

- 深拷贝，拷贝得是值
- 浅拷贝，拷贝得是指针
- 深拷贝开辟了新的内存空间，修改操作不影响原先得内存
- 浅拷贝指向得还是原来得内存空间，修改操作直接作用在原内存空间上

```go
type Student struct{
    name string
    string
    year int
}

type Vedio struct {
    length int
    author Student
}

func main(){
    s := Student{Name:"Aoliao",string:"America",int:18}
    v := Vedio{25,s}    //s是值拷贝(深拷贝)
    v.Author.name = "789"
    fmt.Println(s.name) //Aoliao,深拷贝不影响原值
}
```

## if 语句

```go
if 5 > 9 {
    fmt.Println("5>9")
}
```

- 如果逻辑表达式成立，就会执行{}里得内容
- 逻辑表达式不需要加()
- "{"必须紧跟在逻辑表达式后面，不能另起一行

```go
//初始化多个局部变量，复杂得逻辑表达式
if c,d,e := 5,9,2;c < d && (c > e || c >3){
    fmt.Println("fit")
}
```

- 逻辑表达中可以含有变量或常量
- if 句子中允许包含 1 个(仅 1 个)分号，在分号前初始化一些局部变量(即只在 if 块内可见)

### if-else

```go
color := "black"
if color == "red"{  //if只能有一个
    fmt.Println("stop")
}else if color == "green"{
    fmt.Println("go")
}else if color == "yellow" {    //else if可以有0个、1个或者连续多个
    fmt.Println("stop")
} else {    //else有0个或1个
    fmt.Printf("invalid traffic signal:%s\n",strings.ToUpper(color))
}
```

### if 表达式嵌套

```go
//太深得嵌套不利于代码得维护
if true{
    if true{
        if true{
            if true{

            }
        }
    }
}
```

## switch 语句

```go:line-numbers
color := "black"
switch color {
case "green": //相当于 if color=="green"
    fmt.Println("go")

case "red":
    fmt.Println("red") //相当于else if color=="red"
default: //相当于else
    fmt.Printf("invalid traffic signal:%s\n", strings.ToUpper(color))
}
```

- switch-case-default 可能模拟 if-else，但只能实现相等判断
- switch 和 case 后面可以跟常量、变量、或函数表达式，只要它们表示得数据类型相同就行
- case 后面可以跟多个 case，只要有一个值满足就行

### 空 switch

```go:line-numbers
switch {
case add(5) > 10:
    fmt.Println("right")
default:
    fmt.Println("wrong")
}
```

- switch 后带表达式时，switch-case 只能模拟相等的情况；如果 switch 后不带表达式，case 后就可以跟任意的条件表达式

### switch type

```go
var num interface{} = "33"
//输出结果:number is interfaca 33
switch value := num.(type){ //相当于在每个case内部声明了一个变量value
case int:   //value已被转换为int类型
    fmt.Printf("number is int %d/n",value)
case float64:   //value已被转换为float64类型
    fmt.Printf("number is float64 %f/n",value)
case byte,string:   //如果case后有多个类型，则value还是interfase{}类型
    fmt.Printf("number is interfaca %v/n",value)
default:
    fmt.Println("number是其它类型")
}
```

### fallthrough

- 从上往下,只要找到成立的 case,就不再执行后面的 case 了,所以为了提高性能,把大概率会满足的情况往前放。
- case 里如果带了 fallthrough,则执行完本 case 还会去判断下一个 case 是否满足。
- 在 switch type 语句的 case 字句中不能使用 fallthrough。

```go:line-numbers{5,10,13}
func fall(age int){
    switch {
	case age > 50:
		fmt.Println("老人家")
		fallthrough
	case age > 35:
		fmt.Println("失业，待富人群")
	case age > 22:
		fmt.Println("牛马")
		fallthrough
	case age > 18:
		fmt.Println("大学生")
		fallthrough
	case age > 16:
		fmt.Println("高中生")
	}
}

func main(){
    fall(60)    //老人家 失业，待富人群
    fall(22)    //大学生 高中生
}
```

## for 循环

```go
arr := []int{1,2,3,4,5}
for i := 0;i < len(arr);i++ {   //正序遍历该arr切片
    fmt.Printf("%d:%d\n",i,arr[i])  //循环体
}
```

- for 初始化局部变量(只在循环开始时执行一次);条件表达式(在每次迭代前检查);后续操作(在每次迭代后执行)
- 局部变量指仅在 for 块内可见
- 初始化变量可以放在 for 上面
- 后续操作可以放在 for 块内部
- 只有条件判断时，前后的分号可以不要
- for{}是一个无限循环

### for range

```go
for 索引, 值 := range 集合 {
    // 循环体
}
```

- 遍历数组或切片
  - `for i,ele := range arr`
- 遍历 string
  - `for i,ele := range "我会唱国际歌"` //ele 是 rune 类型
- 遍历 map,go 不保证遍历的顺序
  - `for key,value := range m`
- 遍历 channel,遍历前一定要先 close channel
  - `for ele := range ch`
- for range 拿到的是数据的拷贝

### for 嵌套

```go
const SIZE = 4
A := [SIze][SIZE]float64{}
//两层for循环嵌套
for i := 0;i<SIZE;i++{
    for j := 0;j < SIZE;j++{
        A[i][j] = rand.Float64()    //[0,1]上的随机数
    }
}
```

### break 与 continue

- break 与 continue 用于控制 for 循环的代码流程，并且只针对最靠近自己的外层 for 循环
- break：退出 for 循环，且本轮 break 下面的代码不再执行
- continue：本轮 continue 下面的代码不再执行，进入 for 循环的下一轮

## goto 与 Label

在 Go 语言中，goto 语句可以用于在函数内部进行无条件的跳转。它可以跳转到函数内部的标签（Label）处执行代码。这种机制可以用于从深层嵌套的结构中快速跳出，或者跳过某些执行片段。使用 goto 语句时需要遵循以下规则：

- **定义标签（Label）：**标签是一个简单的标识符，后面跟着一个冒号（:）。标签可以放在函数中的任何地方，但它必须位于同一个函数内部。例如，Label1:。
- **使用 goto 跳转：**通过 goto 语句跳转到指定的标签。goto 后面跟着标签的名称。例如，goto Label1。
- **作用域和限制：**goto 只能在同一个函数内跳转。不能跨越函数边界，也不能用于跳入任何类型的循环或条件结构之内。
- **谨慎使用：**虽然 goto 语句在某些情况下很有用，但它的使用通常应该被限制。过度使用 goto 可能会导致代码难以理解和维护，特别是在创建复杂的控制流程时。

```go
//在这个例子中，程序会直接跳转到 LABEL1，因此 "This will be skipped" 不会被打印。
package main

import "fmt"

func main() {
    var a int = 10

    // 使用 goto 跳转到标签
    if a == 10 {
        goto LABEL1
    }

    fmt.Println("This will be skipped")

LABEL1:
    fmt.Println("Jumped to LABEL1")
}
```

### 使用 goto 与 Label 退出 for 循环

goto 与 Label 结合可以实现 break 的功能，甚至比 break 更强大

```go
const SIZE=5
for i := 0;i<SIZE;i++ {
L2:
    for j := 0;j<SIZE;j++ {
        goto L1
    }
}
L1:
    代码段
```

### break、continue 与 Label

- break、continue 与 Label 结合使用可以跳转到更外层的 for 循环
- continue 和 break 针对的 Label 必须写在 for 前面,而 goto 可以针对任意位置的 Label
 