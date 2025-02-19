# 常用标准库

## 时间

:::tip
时间是非常重要的, 离开了时间, 几乎没有哪个生产环境数据能够有意义

在 GO 语言中, 时间定义为 Time 结构体
:::

### 时间格式化(Format)

```go
package main

import (
	"fmt"
	"time"
)

// Time => string
func main() {
	t := time.Now()
	fmt.Printf("%T %[1]v \n", t)                        // result: time.Time 2025-02-10 20:48:01.479873 +0800 CST m=+0.000101709
	fmt.Printf("%T %[1]v \n", t.UTC())                  // GMT,result: time.Time 2025-02-10 12:48:01.479873 +0000 UTC
	fmt.Println(t.Format("2006年01月02日 15:04:05 -0700")) // 25年02月10日 20:48:01 +0800, 2006(06)是哪一年, 01是哪个月, 02是哪一天, 15是哪个小时(24小时制,03是12小时制), 04是哪个分钟, 05是哪个秒, -0700是时区
}

```

### 时间解析(Parse)

```go
package main

import (
	"fmt"
	"time"
)
// 时间string => Time
func main() {
	timeStr := "2025-02-10 12:48:01.479873 +0800"
	t, err := time.Parse("2006-01-02 03:04:05.9  -0700", timeStr) // 保证格式对应,不然会失败
	if err != nil {
		panic(err)
	}
	fmt.Println(t) // result: 2025-02-10 12:48:01.479873 +0800 CST
}
```

### 时间属性

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	t := time.Now()
	fmt.Println(t.Year(), t.Month(), int(t.Month()), t.Day()) // result: 2025 February 2 10
	fmt.Println(t.YearDay())                                  // result: 41 本年度的第几天
	fmt.Println(t.Unix())                                     // result: 1739195749 时间戳
	fmt.Println(t.Weekday(), int(t.Weekday()))                // result: Monday 1 星期几
}

```

### 时间时区

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	loc, _ := time.LoadLocation("Asia/Shanghai") // 获取时区
	timeStr := "2020-01-01 00:00:00"
	t1, _ := time.Parse("2006-01-02 15:04:05", timeStr)                  // 默认时区
	t2, err := time.ParseInLocation("2006-01-02 15:04:05", timeStr, loc) // 指定时区
	if err != nil {
		panic(err)
	}
	fmt.Println(t1, "\t", t2) // result: 2020-01-01 00:00:00 +0000 UTC 	 2020-01-01 00:00:00 +0800 CST
}

```

### 时间计算

```go
package main

import (
	"fmt"
	"time"
)

// 时间计算
// t1 - t2 = Δ(增量 delta)
// t1 + Δ = t2
func main() {
	timeStr := "2020-01-01 00:00:00"
	t1, _ := time.Parse("2006-01-02 15:04:05", timeStr)
	t2 := time.Now()
	d := t2.Sub(t1)
	fmt.Println(t1)                        // result: 2020-01-01 00:00:00 +0000 UTC
	fmt.Println(t2)                        // result: 2025-02-10 22:21:43.705923 +0800 CST m=+0.000262501
	fmt.Println(d, d.Hours(), d.Seconds()) // t1和t2的时间差,result: 44822h21m43.705923s 44822.36214053417 1.61360503705923e+08
	t3 := t2.Add(8 * time.Hour * 24)       // t2 + 8天
	fmt.Println(t3)                        // 2025-02-18 22:24:41.33934 +0800 CST m=+691200.000085501
	fmt.Println(t3.After(t2))              // t3是否在t2之后,result: true
}

```
