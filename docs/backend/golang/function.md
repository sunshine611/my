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
