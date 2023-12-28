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

## 数组

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
