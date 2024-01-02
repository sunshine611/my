# 数据类型

## 基础数据类型

|     类型     | 长度(字节) | 默认值 | 说明                                                                                          |
| :----------: | :--------: | :----: | :-------------------------------------------------------------------------------------------- |
|     bool     |     1      | false  |                                                                                               |
|     byte     |     1      |   0    | uint8，取值范围[0 ~ 255]                                                                      |
|     rune     |     4      |   0    | Unicode Code Point,int32                                                                      |
|   int,uint   |   4 或 8   |   0    | 32 或 64 位，_取决于操作系统_，**uint 与 int 差别就是 uint 没有负数，所以最高位不表示符号位** |
|  int8,uint8  |     1      |   0    | [-128 ~ 127]，[0 ~ 255]                                                                       |
| int16,uint16 |     2      |   0    | [-32768 ~ 32767]，[0 ~ 65535]                                                                 |
| int32,uint32 |     4      |   0    | [-2^31 ~ 2^31-1]，[0 ~ 2^32-1]                                                                |
| int64,uint64 |     8      |   0    | [ -2^63 ~ 2^63-1]，[0 ~ 2^64-1]                                                               |
|   float32    |     4      |  0.0   | 1 位用于符号（指示正数或负数），8 位用于指数部分，剩余的 23 位用于尾数（或称为小数部分）      |
|   float64    |     8      |  0.0   | 1 位用于符号（指示正数或负数），11 位用于指数部分，剩余的 52 位用于尾数（或称为小数部分）     |
|  complex64   |     8      |  0+0i  | 一个 complex64 值由两部分组成：一个表示实部的 float32 值和一个表示虚部的 float32 值。         |
|  complex128  |     16     |  0+0i  | 一个 complex128 值由两部分组成：一个表示实部的 float64 值和一个表示虚部的 float64 值          |
|   uintptr    |   4 或 8   |   0    | 以存储指针的 uint32 或 uint64 整数                                                            |

```go:line-numbers
func default_value() {
	var a int
	var b byte
	var f float32 = 2.4578
	var t bool
	var s string
	var r rune
	var arr []int
    var m complex64 = complex(2, 6)
    var x int = 11
	var p *int = &x
	fmt.Printf("default value of int %d\n", a) //0
	fmt.Printf("default value of byte %d\n", b) //0
	fmt.Printf("default value of float32 %.2f,%.3e,%g\n", f, f, f) //2.46,2.458e+00,2.4578
	fmt.Printf("default value of bool %t\n", t) //false
	fmt.Printf("default value of string %s\n", s) //""
	fmt.Printf("default value of rune %d %c\n", r, r)  //0,[]
	fmt.Printf("default value of slice %v,arr is nil %t\n", arr, arr == nil) //[],true
    fmt.Printf("%T %T\n", real(m), imag(m)) //实部float32类型，虚部float32类型
    fmt.Printf("real %f imag %f\n", real(m), imag(m)) //实部2.000000，虚部6.000000
	fmt.Printf("%T\n", m)                             //complex64
    fmt.Printf("pointer is %p", p)                    //pointer is 0xc00000a0d8(不是固定的值)，定义的x在当前内存的地址
}

func main() {
	default_value()
}
```

## 复合数据类型

|   类型    | 默认值 | 说明         |
| :-------: | :----: | :----------- |
|   array   |        | 值类型       |
|  struct   |        | 值类型       |
|  string   |   ""   | UTF-8 字符串 |
|   slice   |  nil   | 引用类型     |
|    map    |  nil   | 引用类型     |
|  channel  |  nil   | 引用类型     |
| interface |  nil   | 接口         |
| function  |  nil   | 函数         |

## 自定义类型

- `type signal uint8`
- `type ms map[string]string`
- `type add func(a,b int) int`
- `type user struct {name string;age int}`

```go:line-numbers
//自定义结构体类型
type User struct {
	Name string
	Age  int
}

//自定义类型方法
func (self User) Hello() {
	fmt.Printf("my name is %s\n", self.Name)
}

//自定义类型
type ms map[string]int

//自定义类型方法
func (self ms) Say() {
	fmt.Printf("%d\n", self["hello"])
}

func main() {
	var u User
	u = User{"Tom", 18}
	u.Hello() //my name is Tom
	var a, b ms
	a = ms{"hello": 33}
	a.Say() //33
	b = ms{"no": 99}
	b.Say() //0
}
```

## 字符串赋值

`s1:="My name is XXX"`  
`s2:="He say:\"I'm fine.\"\n\\Thank\tyou.\\"` //包含转义字符，阅读性很差  
`` s3:=`here is first line.` `` //反引号里的转义字符无效，反引号里的原封不动地输出，包括空白符和换行符

### 字符串常用操作

| 方法                                | 介绍           |
| :---------------------------------- | :------------- |
| len(str)                            | 求长度         |
| strings.Split                       | 分割           |
| strings.Contains                    | 判断是否包含   |
| strings.HasPrefix,strings.HasSuffix | 前缀/后缀判断  |
| strings.Index(),strings.LastIndex() | 子串出现的位置 |

### 字符串拼接

- 加号(+)连接
- `func fmt.Sprintf(format string,a ...interface{}) string`
- `func strings.Join(elems []string,sep string) string`
- _当有大量的 string 需要拼接时，用 strings.Builder 效率最高_

```go:line-numbers
func main() {
	s1 := "aaa"
	s2 := "bbb"
	s3 := "ccc"

	S1 := s1 + s2 + s3                           //第一种拼接字符串方式
	S2 := fmt.Sprintf("%s%s%s", s1, s2, s3)      //第二种拼接字符串方式
	S3 := strings.Join([]string{s1, s2, s3}, "") //第三种拼接字符串方式,效率较高
	S4 := strings.Builder{}                      //第四种拼接字符串方式,效率最高
	S4.WriteString(s1)
	S4.WriteString(s2)
	S4.WriteString(s3)

	fmt.Println(S1)
	fmt.Println(S2)
	fmt.Println(S3)
	fmt.Println(S4.String())
}
```

### byte 和 rune

- string 中每个元素叫“字符”，字符有两种：
  1. byte：1 个字节，代表 ASCII 码的一个字符
  2. rune：4 个字节，代表一个 UTF-8 字符，一个汉字可用一个 rune 表示
- string 底层是 byte 数组，string 的长度就是该 byte 数组的长度，UTF-8 编码下一个汉字占 3 个 byte，即一个汉字占 3 个长度
- string 可以转换为[]byte 或[]rune 类型
- string 是常量，不能修改其中的字符

## 强制类型转换

- byte 和 int 可以互相转换
- float 和 int 可以互相转换，小数位会丢失
- bool 和 int 不能互相转换
- 不同长度的 int 或 float 之间可以互相转换
- string 可以转换为[]byte 或[]rune 类型，byte 或 rune 可以转为 string
- 低精度向高精度转换没问题，高精度向低精度转换会丢失位数
- 无符号向有符号转换，最高位是符号位

## array 数组

数组是块连续的内存空间，在声明的时候必须指定长度，且长度不能改变。所以数组在声明的时候就可以把内存空间分配好，并赋上默认值，即完成了初始化。

```go:line-numbers
//数组初始化
var arr1 [5]int = [5]int{}	//数组必须指定长度和类型，且长度和类型指定后不可改变
var arr2 [5]int{}
var arr3 = [5]int{3,2}	//给数组前2个元素赋值
var arr4 = [5]int{2:15,4:30}	//指定index位置赋值
var arr5 = [...]int{3,2,6,5,4}	//根据{}里元素的个数推断出数组的长度
var arr6 = [...]struct {
	name string
	age int
}{{"Tom",18},{"Jim",20}}	//数组的元素类型由匿名结构体给定

//二维数组初始化
var arr7 = [5][3]int{{1},{2,3}}//5行3列，只给前2行赋值，且前2行的所有列还没有赋满
var arr8 = [...][3]int{{1},{2,3}} //第1维可以用...推测，第2维不能用...
```

### 访问数组里的元素

- 通过 index 访问
  - 首元素 `arr[0]`
  - 末元素 `arr[len(arr)-1]`
- 访问二位数组里的元素
  - 位于第三行第四列的元素 `arr[2][3]`

### 遍历数组

```go:line-numbers
var arr [5]int = [5]int{3,2,3,5,3}

//遍历数组里的所有元素
for i,ele := range arr {
	fmt.Printf("index=%d,element=%d\n",i,ele)
}

//或者这样遍历数组
for i := 0;i<len(arr);i++ {  //len(arr)获取数组的长度
	fmt.Printf("index=%d,element=%d\n",i ,arr[i])
}

//遍历二维数组
for row,array := range arr {  //先取出某一行
	for col,ele := range array {  //再遍历这一行
		fmt.Printf("arr[%d][%d]=%d\n",row,col,ele)
	}
}
```

### cap 和 len

- cap 代表 capacity 容量
- len 代表 length 长度
- len 代表目前数组里的几个元素，cap 代表给数组分配的内存空间可以容纳多少个元素
- 由于数组初始化之后长度不会改变，不需要给它预留内存空间，所以 len(arr)==cap(arr)

### 数组传参

- 数组的长度和类型都是数组类型的一部分，函数传递数组类型时这两部分都必须吻合
- go 语言没用按引用传参，全都是按值传参，即传递数组实际上传的时数组的拷贝，当数组的长度很大时，仅传参开销都很大。
- 如果想修改函数外部的数组，就把它的指针（数组在内存里的地址）传进来

```go:line-numbers
//通过指针修改原数组的值
func arrPointer(arr *[5]int) {
	arr[0] += 10
}
func main() {
	var crr [5]int = [5]int{3, 2, 5, 4, 5}
	arrPointer(&crr)
	fmt.Println(crr[0]) //13，正常方法传参是不能更改原数组的值，但通过指针传参可以
}
```

## slice 切片

在 Go 语言中，切片（slice）是一个引用类型，它提供了访问数组子序列（即数组的连续段）的功能。切片不存储任何数据，它只是对现有数组的引用。切片的定义和使用非常灵活，它是 Go 中处理序列数据的核心类型之一。

```go:line-numbers
var s []int	//切片声明，len=cap=0
s = []int{}	//初始化，len=cap=0
s=make([]int,3)	//初始化，len=cap=3
s=make([]int,3,5)	//初始化，len=3，cap=5
s=[]int{1,2,3,4,5}	//初始化，len=cap=5

s2d := [][]int{
	{1,}{2,3}
}	//二维数组各行的列数相等，但二维切片各行的len可以不等
```

### append 附加

- 切片相对于数组最大的特点就是可以追加元素，可以自动扩容。
- 追加的元素放到预留的内存空间里，同时 len 加 1。
- 如果预留空间已用完，则会重新申请一块更大的内存空间，capacity 变成之前的 2 倍(cap<1024)或 1.25 倍(cap>1024)。把原内存空间的数据拷贝过来，在新内存空间上执行 append 操作

```go:line-numbers
func sliceAppend() {
	s := make([]int, 3, 5)
	s = append(s, 100)
	fmt.Println(len(s), cap(s)) //4,5
	s = append(s, 100)
	fmt.Println(len(s), cap(s)) //5,5
	s = append(s, 100)
	fmt.Println(len(s), cap(s)) //6,10
}

func main() {
	sliceAppend()
}
```

### 截取子切片

- `s := make([]int,3,5)` //len=3,cap=5 `sub_slice = s[1:3]` //len=2,cap=4
- 刚开始，子切片和母切片共享底层的内存空间，修改子切片会反映到母切片上。
- 在子切片上执行 append 会在子元素后面附加新元素，假如此时子元素对应的母元素的位置有值，会被替换，母子元素内存还未分离。
- 子元素对应的母元素的位置没有值，但是母元素还有预留内存空间的时候， 在子切片上执行 append 会接着占用母元素预留的内存空间，因为此时母子元素内存还未分离。
- 当子切片不断执行 append，耗完了母切片预留的内存空间，子切片跟母切片就会发生内存分离，此后两个切片没用任何关系，但是之前被修改的母元素还是被修改后的样子。

```go:line-numbers
//截取切片
func subSlice() {
	mom := make([]int, 4, 5)
	fmt.Println(mom)        //mom:[0,0,0,0]
	child := mom[1:3]       //前闭后开，截取了第二位和第三位
	child[1] = 8            //因为child[1]是mom[2]，所以改变的是mom[2]的值
	fmt.Println(mom, child) //mom:[0,0,8,0],child[0,8]
	child = append(child, 9)
	fmt.Println(mom, child) //mom:[0,0,8,9],child:[0,8,9]
	child = append(child, 12)
	fmt.Println(mom, child) //mom:[0,0,8,9],child:[0,8,9,12]
	child[0] = 3            //此时还未发生内存分离，更改child的值会影响到mom，
	fmt.Println(mom, child) //mom:[0,3,8,9],child[3,8,9,12]
	child = append(child, 15)
	fmt.Println(mom, child) //mom:[0,3,8,9],child:[3,8,9,12,15]
	child[0] = 6            //此时发生内存分离，更改child的值不会影响到mom
	fmt.Println(mom, child) //mom:[0,3,8,9],child:[6,8,9,12,15]

}

func main() {
	subSlice()
}

```

### 切片传参

- go 语言函数传参，传的都是值，即传切片会把切片的{arrayPointer,len,cap}这 3 个字段拷贝一份传进来
- 由于传的是底层数组的指针，所以可以直接修改底层数组里的元素

```go:line-numbers
//切片传参
func update_slice(arr []int) {
	arr[0] = 100
}

func main() {
	crr := []int{1, 2, 3}
	fmt.Println(crr) //[1,2,3]
	update_slice(crr)
	fmt.Println(crr) //[100,2,3]，crr的数据直接通过函数传参方式修改成功

}
```

## map 键值对

go map 的底层实现是 hash table，根据 key 查找 value 的时间复杂度时 O(1)

### map 的声明

- `var m map[string]int` //声明 map,指定 key 和 value 的数据类型
- `var m = map[string]int{"english":100,"math":98}` //初始化时直接赋值
- `m = make(map[string]int)` //初始化，容量为 0
- `m = make(map[string]int,5)` //初始化，容量为 5，建议初始化时给个合适的容量，减少扩容的概率

### 添加和删除 key

- `m["science"] = 88` //往 map 里添加 key-value 对
- `m["science"] = 99` //会覆盖之前的值
- `delete(m,"math")` //从 map 里删除 key-value 对
- `len(m)` //获取 map 的长度
- go 不支持对 map 上执行 cap 函数

### 根据 key 找 value

- 读取 key 对应的 value,如果 key 不存在,则返回 value 类型的默认值 value:=m["history"]
- 取 key 对应的 value 建议使用这种方法，先判断 key 是否存在
  ```go
  if value,exists := m["history"];exists {
  	fmt.Println(value)
  }else{
  	fmt.Println("map里不存在[history]这个key")
  }
  ```

### 遍历 map

```go
var m = map[string]int{"english":100,"math":98}
for key,value := range m{
	fmt.Printf("%s=%d\n",key,value)
}	//每次运行时候输出的key-value对可能顺序不一样
```

## channel 通道

通道底层是一个环形队列(先进先出),send(插入)和 recv(取走)从同一个位置沿同一个方向顺序执行

### 通道的声明和初始化

- `var ch chan int` //声明
- `ch = make(chan int,8)` //初始化，环形队列里可容纳 8 个 int

### send 和 recv

- `ch <- 1` //往通道里写入(send)数据
- `ch <- 2`
- `ch <- 3`
- `v := <-ch` //从管道里取走(recv)的数据
- `v = <-ch`

```go:line-numbers
func main() {
	var ch chan int
	fmt.Printf("ch is nil %t\n", ch == nil)
	fmt.Printf("len of ch is %d\n", len(ch))

	ch = make(chan int, 10)
	fmt.Printf("len of ch is %d,cap of ch is %d\n", len(ch), cap(ch))

	for i := 0; i < 10; i++ {
		ch <- i + 1
	}

	ch <- 11 // [!code error] //这行代码会造成阻塞，因为通道初始化设定的容量大小不能变，再添加一个超过了容量

	fmt.Printf("len of ch is %d,cap of ch is %d\n", len(ch), cap(ch))
}
```

### 遍历管道

- `close(ch)` //for range 循环前必须先关闭通道

```go
//遍历通道里剩下的元素
for ele := range ch{
	fmt.Println(ele)
}
```

```go:line-numbers{10}
func main() {
	var ch chan i nt

	ch = make(chan int, 10)
	for i := 0; i < 10; i++ {
		ch <- i + 1
	}
	fmt.Println(len(ch)) //10

	close(ch)//for range循环前必须先关闭通道

	for ele := range ch {
		fmt.Println(ele)
	}

	fmt.Println(len(ch)) //0，遍历的同时也revc了
}

```

## 引用类型

- slice、map 和 channel 是 go 语言里的 3 种引用类型，都可以通过 make 函数来进行初始化(申请内存分配)
- 因为它们都包含一个指向底层数据结构的指针,所以称之为“引用”类型
- 引用类型未初始化时都是 nil,可以对它们执行 len()函数，返回 0
