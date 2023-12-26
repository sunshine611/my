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
