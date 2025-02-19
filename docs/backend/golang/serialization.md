# 序列化

## 为什么要序列化

内存中的 map、slice、array 以及各种对象,如何保存到一个文件中? 如果是自己定义的结构体的实例,如何保存到一个文件中?

如何从文件中读取数据,并让它们在内存中再次恢复成自己对应的类型的实例?

要设计一套**协议**,按照某种规则,把内存中数据保存到文件中.文件时一个直接序列,所以把数据转换成字节序列,输出到文件,这就是**序列化**.反之,从文件的字节序列恢复到内存并且还是**原来的**类型,就是**反序列化**.

## 定义

- serialization 序列化: 将内存中的对象转换为可存储或可传输的格式的过程。该格式可以是二进制（Binary）、XML、JSON、Protocol Buffers 等。

- deserialization 反序列化: 将序列化后的数据（文件、网络传输的字节流等）重新转换为内存中对象的过程。

## JSON

JSON(JavaScript Object Notation, JS 对象标记) 是一种轻量级的数据交换格式. 它基于 1999 年发布的 ES3(ECMAScript 是 w3c 组织制定的 Javascript 规范)的一个子集,采用完全独立于编程语言的**文本**格式来
存储和表示数据.应该是, 目前 JSON 得到几乎所有浏览器的支持. https://www.json.org/json-zh.html

## json 包

GO 标准库中提供了 encoding/json 包,内部使用了反射技术,效率较为低下.参看 https://go.dev/blog/json

- json.Marshal(v any)([]byte,error),将 v 序列化成字符序列(本质上也是字节序列),这个过程为 Encode
- json.Unmarshal(data []byte,v any) error, 将字符序列 data 反序列化为 v,这个过程称为 Decode
- Go 自带的 json 包 实现效率较低,由此社区和某些大公司提供大量开源的实现,例如 easyjson、jsoniter、sonic 等.

### 使用 json 包进行序列化和反序列化

::: code-group

```go [main.go]
package main

import (
	"encoding/json"
	"fmt"
)

func main() {
	// 序列化
	var data = []any{123, "abc", true, false, nil, 2.5,
		[3]int{1, 11, 111},       // 数组 => js Array
		[]int{2, 22, 222},        // 切片 => js Array
		map[int]string{},         // map => js {}
		map[int]string{1: "abc"}, // map => js {"1": "abc"}
	}
	target := make([][]uint8, 0, len(data))
	for i, v := range data {
		b, err := json.Marshal(v)
		if err != nil {
			fmt.Println("error:", err)
			continue
		}
		fmt.Printf("%d: %T %[2]v => %[3]T %[3]v %q\n", i, v, b, string(b))
		target = append(target, b)
	}
	fmt.Println("=====================================")
	fmt.Println(target) // 序列化后的数据
	fmt.Println("=====================================")
	// 反序列化
	for i, b := range target {
		var v interface{} // 用interface{}接收反序列化后的数据
		err := json.Unmarshal(b, &v)
		if err != nil {
			fmt.Println("error:", err)
			continue
		}
		fmt.Printf("%d: %T %[2]v => %[3]T %[3]v\n", i, b, v)
	}
}
```

```txt [result.txt]
0: int 123 => []uint8 [49 50 51] "123"
1: string abc => []uint8 [34 97 98 99 34] "\"abc\""
2: bool true => []uint8 [116 114 117 101] "true"
3: bool false => []uint8 [102 97 108 115 101] "false"
4: <nil> <nil> => []uint8 [110 117 108 108] "null"
5: float64 2.5 => []uint8 [50 46 53] "2.5"
6: [3]int [1 11 111] => []uint8 [91 49 44 49 49 44 49 49 49 93] "[1,11,111]"
7: []int [2 22 222] => []uint8 [91 50 44 50 50 44 50 50 50 93] "[2,22,222]"
8: map[int]string map[] => []uint8 [123 125] "{}"
9: map[int]string map[1:abc] => []uint8 [123 34 49 34 58 34 97 98 99 34 125] "{\"1\":\"abc\"}"
=====================================
[[49 50 51] [34 97 98 99 34] [116 114 117 101] [102 97 108 115 101] [110 117 108 108] [50 46 53] [91 49 44 49 49 44 49 49 49 93] [91 50 44 50 50 44 50 50 50 93] [123 125] [123 34 49 34 58 34 97 98 99 34 125]]
=====================================
0: []uint8 [49 50 51] => float64 123
1: []uint8 [34 97 98 99 34] => string abc
2: []uint8 [116 114 117 101] => bool true
3: []uint8 [102 97 108 115 101] => bool false
4: []uint8 [110 117 108 108] => <nil> <nil>
5: []uint8 [50 46 53] => float64 2.5
6: []uint8 [91 49 44 49 49 44 49 49 49 93] => []interface {} [1 11 111]
7: []uint8 [91 50 44 50 50 44 50 50 50 93] => []interface {} [2 22 222]
8: []uint8 [123 125] => map[string]interface {} map[]
9: []uint8 [123 34 49 34 58 34 97 98 99 34 125] => map[string]interface {} map[1:abc]
```

:::

### 结构体序列化

::: code-group

```go [main.go]
package main

import (
	"encoding/json"
	"fmt"
)

type Person struct {
	Name string
	Age  int
}

func main() {
	var data = Person{}
	b, err := json.Marshal(data)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%T \n%[1]v \n%[2]s\n", b, string(b))
}

```

```txt [result.txt]
[]uint8
[123 34 78 97 109 101 34 58 34 34 44 34 65 103 101 34 58 48 125]
{"Name":"","Age":0}
```

:::

### 结构体序列化、反序列化、读写文件

::: code-group

```go [main.go]
package main

import (
	"encoding/json"
	"fmt"
	"os"
)

type Person struct {
	Name string
	Age  int
}

func main() {
	var data = Person{"Tom", 32}

	// 序列化
	b, err := json.Marshal(data)
	if err != nil {
		panic(err)
	}

	// 序列化后写入文件
	w, wErr := os.OpenFile("person.json", os.O_CREATE|os.O_WRONLY|os.O_TRUNC, os.ModePerm) // os.O_CREATE 文件不存在就创建,os.O_TRUNC 清空文件内容,os.O_APPEND 追加内容
	if wErr != nil {
		panic(wErr)
	}
	defer w.Close() // 写入成功后关闭文件
	w.Write(b)      // 写入文件

	// 读取写入的文件内容
	r, rErr := os.ReadFile("person.json")
	if rErr != nil {
		panic(rErr)
	}

	// 反序列化成结构体
	var p Person
	unErr := json.Unmarshal(r, &p)
	if unErr != nil {
		panic(unErr)
	}
	fmt.Printf("%T, %#[1]v \n", p) // result: main.Person, main.Person{Name:"Tom", Age:32}
}
```

```json [person.json]
{ "Name": "Tom", "Age": 32 }
```

:::

### Tag: 对序列化后的 key 重命名,反序列化的时候也会转换成对应结构体

::: code-group

```go [main.go]
package main

import (
	"encoding/json"
	"os"
)

type Person struct {
	Name  string  `json:"name" msgpack:"name"` // json:"name" 指定json序列化后的key,多标签使用加空格,msgpack:"names" 指定msgpack序列化后的key
	Age   int     `json:",omitempty"`          // json:",omitempty" 如果字段为空则不序列化
	Score float32 `json:"-"`                   // json:"-" 表示不序列化
}

func main() {
	var data = Person{"Tom", 32, 80.5}

	// 序列化
	b, err := json.Marshal(data)
	if err != nil {
		panic(err)
	}

	// 序列化后写入文件
	w, wErr := os.OpenFile("person.json", os.O_CREATE|os.O_WRONLY|os.O_TRUNC, os.ModePerm) // os.O_CREATE 文件不存在就创建,os.O_TRUNC 清空文件内容,os.O_APPEND 追加内容
	if wErr != nil {
		panic(wErr)
	}
	defer w.Close() // 写入成功后关闭文件
	w.Write(b)      // 写入文件
}
```

```json [person.json]
{ "name": "Tom", "age": 32 }
```

:::

## MessagePack

:::tip
MessagePack 是一个基于**二进制**高效的对象序列化类库, 可用于跨语言通信. 它可以像 JSON 那样, 在许多种语言之间交换结构对象. 但是它比 JSON 更快速也更轻巧. 支持 Python、Ruby、Java、C/C++、Go 等众多语言. 宣称比 Goole Protocol Buffers 还要快 4 倍.
:::

- https://msgpack.org
- 文档: https://msgpack.uptrace.dev
