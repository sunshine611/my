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
