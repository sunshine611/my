# PostgreSQL 函数

:::info 函数介绍
函数 (Function) 是一些预定义好的代码模块, 可以将输入进行计算和处理, 最终输出一个结果值. PostgreSQL 函数可以分为两类: **标量函数** (scalar function) 和 **聚合函数** (aggregation function) .标量函数针对每个输入都会返回相应的结果, 聚合函数针对一组输入汇总出一个结果. 
:::

## 算术运算符

| 运算符  | 名称         | 示例       | 结果                       |
| ------- | ------------ | ---------- | -------------------------- |
| `+`     | 加法         | `5 + 3`    | `8`                        |
| `-`     | 减法         | `5 - 3`    | `2`                        |
| `*`     | 乘法         | `5 * 3`    | `15`                       |
| `/`     | 除法         | `5 / 2`    | `2`（整数）/ `2.5`（小数） |
| `%`     | 取模（余数） | `5 % 2`    | `1`                        |
| `^`     | 幂运算       | `2 ^ 3`    | `8`                        |
| `\|/`   | 平方根       | `\|/ 25`   | `5`                        |
| `\|\|/` | 立方根       | `\|\|/ 27` | `3`                        |
| `!`     | 阶乘         | `5 !`      | `120`                      |
| `!!`    | 前缀阶乘     | `!! 5`     | `120`                      |
| `@`     | 绝对值       | `@ -5`     | `5`                        |
| `&`     | 按位与       | `5 & 3`    | `1`                        |
| `\|`    | 按位或       | `5 \| 3`   | `7`                        |
| `#`     | 按位异或     | `5 # 3`    | `6`                        |
| `~`     | 按位取反     | `~ 5`      | `-6`                       |
| `<<`    | 按位左移     | `1 << 3`   | `8`                        |
| `>>`    | 按位右移     | `8 >> 2`   | `2`                        |

:::tip
其中,按位运算只对整型数字类型有效;左移 N 位相当于乘以 2 的 N 次方, 右移 N 位相当于除以 2 的 N 次方
:::

## 常用 Math 函数

### ABS 绝对值

**ABS(x)** 函数用于计算 x 的绝对值

```sql
-- Result: 17.8
SELECT ABS(-17.8) 
```

### CEIL/CEILING 向上取整

**CEIL(x)/CEILING(x)** 函数用于计算大于或等于 x 的最小整数, 即向上取整

```sql
-- Result: 6
SELECT CEIL(5.3)
-- Result: -5
SELECT CEIL(-5.3)
```

### FLOOR 向下取整

**FLOOR(x)** 函数用于计算小于或等于 x 的最大整数, 即向下取整

```sql
-- Result: 5
SELECT FLOOR(5.3)
-- Result: -6
SELECT FLOOR(-5.3)
```

### ROUND 四舍五入

**ROUND(x)** 函数四舍五入为整数, **ROUND(x,s)** 函数四舍五入到**第 s 位小数**;

```sql
-- Result:3 
SELECT ROUND(3.1415926)
-- Result: 3.14
SELECT ROUND(3.1415926,2)
-- Result: 3.142
SELECT ROUND(3.1415926,3)
```

### TRUNC 向零取整

**TRUNC(x)** 函数向零取整,即不算四舍五入 **TRUNC(x,s)** 函数截断到**第 s 位小数**

```sql
-- Result: 3
SELECT TRUNC(3.1415926)
-- Result: 3.14
SELECT TRUNC(3.1415926,2)
-- Result: 3.141
SELECT TRUNC(3.1415926,3)
```

### POWER 次方

**POWER(a,b)** 函数计算 a 的 b 次方;

```sql
-- Result: 2*2*2=8, 2的3次方
SELECT POWER(2,3)
-- Result: 3*3*3*3=81, 3的4次方
SELECT POWER(3,4)
```

### SQRT 平方根

SQRT(x) 函数计算 x 的平方根

```sql
-- Result: 3, 9的平方根
SELECT SQRT(9)
```

### CBRT 立方根

**CBRT(x)** 函数计算 x 的立方根

```sql
-- Result: 3.0000000000000004,27的立方根
SELECT CBRT(27)
```

### EXP 指数

计算 **e 的 x 次方**（e^x）,其中 **e ≈ 2.71828（自然常数, 固定的值, 就像 π ≈ 3.14159）**

```sql
-- Result: e^0 = 1
SELECT EXP(0); 
-- Result: e^1 ≈ 2.718281828459045
SELECT EXP(1); 
-- Result: e^2 ≈ 7.38905609893065
SELECT EXP(2); 
-- 计算复利,本金1000，年利率12%，5年, Result: 1822.1188003905090000
SELECT 1000 * EXP(0.12 * 5); 
```

### LN 对数

**LN(x)** 函数计算以自然参数 e 为底数的对数,即 **e 的多少次方等于 x** , LN 和 EXP 互为反函数

```sql
-- Result: 0, 即 e^0 = 1
SELECT LN(1);  
-- Result: 1, 即 e^1 = 1
SELECT LN(EXP(1)); 
-- Result: 2.302585092994046 , 即 e^2.302585092994046 ≈ 10
SELECT LN(10); 
```

### LOG/LOG10 对数

**LOG(x)/LOG10(x)** 函数计算以 10 为底的对数, 即 **10 的多少次方等于 x**, **LOG(b,x)** 函数计算以 b 为底的对数,即 **b 的多少次方等于 x**

```sql
-- Result: 2, 10^2 = 100
SELECT LOG(100)
-- Result: 3, 10^3 = 1000
SELECT LOG(1000)
-- Result: 4, 2^4 = 16
SELECT LOG(2,16)
```

### DIV 整数商

**DIV(x,y)** 函数计算 x 除以 y 的整数商,

```sql
-- Result: 5
SELECT DIV(15,3)
-- Result: 4
SELECT DIV(14,3)
```

### MOD 求余

**MOD(x,y)** 函数计算 x 除以 y 的余数

```sql
-- Result: 0
SELECT MOD(15,3)
-- Result: 2
SELECT MOD(14,3)
```

### DEGREES 弧度转角度

degrees(x) 函数用于将弧度转为角度

```sql
-- Result: 91.67324722093171
SELECT DEGREES(1.6)
```

### RADIANS 角度转弧度

RADIANS(x) 函数用于将角度转弧度

```sql
-- Result: 1.5707963267948966
SELECT RADIANS(90)
```

### PI π值

**PI()** 函数用于返回常量 π 的值

```sql
-- Result: 3.141592653589793
SELECT PI()
```

### SIGN 求正负

SIGN(x) 函数返回参数的正负结果, 可能的结果为 -1、0、1

```sql
-- Result: -1
SELECT SIGN(-8)
-- Result: 0
SELECT SIGN(0)
-- Result: 1
SELECT SIGN(8)
```

### RANDOM 随机数

**RANDOM()** 函数返回一个大于等于0,小于1 (0 <= RANDOM() < 1) 的随机数, 类型为双精度浮点数

```sql
-- Result: 0 <= RANDOM() < 1
SELECT RANDOM()
```

### SETSEED 设置种子

**SETSEED(x)** 函数可以为**随后一次运行的 RANDOM() 函数设置种子数**,范围 -1 <= x <=1

```sql
-- Result: 0.7345507212519062 因为设置了种子数是0.1,所以随机数固定了
SELECT SETSEED(0.1);
SELECT RANDOM();
```

## 常用 String 函数

### CONCAT 字符串连接

**CONCAT(str,...)** 函数用于连接字符串, 并且忽略其中的 NULL 参数; (||) 也可以用于连接字符串, 但是只要带有 NULL 将会返回 null 

```sql
-- Result: postgreSQL
SELECT CONCAT('post','gre','SQL');
-- Result: postgreSQL, 两个(||)也可以用于连接字符串, 但是只要带有 NULL 将会返回 null 
SELECT 'post'||'greSQL'
-- Result: null
SELECT 'post'||NULL||'greSQL'
```

### CONCAT_WS 带分隔符连接

**CONCAT_WS(sep,str,...)** 函数使用指定分隔符 sep 连接字符串;

```sql
-- Result: post-gre-SQL
SELECT CONCAT_WS('-','post','gre','SQL');
```

### ASCII 编码

**ASCII(str)** 函数返回第一个字符的 ASCII 码, 对于 UTF-8 返回 Unicode 码, 对于其它多字节编码, 参数必须是一个 ASCII 字符

```sql
-- Result: 120
SELECT ASCII('x')
-- Result: 38451
SELECT ASCII('阳')
-- Result: 128512
SELECT ASCII('😀')
```

### CHR 反码

**CHR(int)** 函数返回编码对应的字符, 对于 UTF-8,参数指定的是 Unicode 码, 对于其它多字节编码, 参数必须对应一个 ASCII 字符, 参数不允许为 0 (空字符),因为 text 数据类型不能存储空字符.

```sql
-- Result: ᨊ
SELECT CHR(6666)
-- Result: 😀
SELECT CHR(128512)
```

### BIT_LENGTH 比特长度

BIT_LENGTH(str) 函数用于计算字符串包含的比特数

```sql
-- Result: 24,一个字符一个字节,一个字节8个比特
SELECT BIT_LENGTH('abc')
```

### LENGTH 字符长度

**LENGTH(str)、CHAR_LENGTH(str)、CHARACTER_LENGTH(str)** 函数都是计算字符串包含的字符数

```sql
-- Result:3
SELECT LENGTH('abc')
-- Result:1
SELECT LENGTH('阳')
```

### OCTET_LENGTH 字节长度

**OCTET_LENGTH(str)** 函数计算字符串包含的字节数

```sql
-- Result:3
SELECT OCTET_LENGTH('abc')
-- Result:3, 一个汉字3个字节
SELECT LENGTH('阳')
```

### LOWER 小写

**LOWER(string)** 函数将字符串转换为小写形式

```sql
-- Result:tom
SELECT LOWER('TOM')
-- Result:jerry
SELECT LOWER('Jerry')
```

### UPPER 大写

**UPPER(string)** 函数将字符串转换为大写形式

```sql
-- Result:TOM
SELECT UPPER('tom')
-- Result:JERRY
SELECT UPPER('Jerry')
```

### INITCAP 首字母大写

INITCAP(string) 函数将每个单词的首字母大写, 其它字母小写

```sql
-- Result:Tom
SELECT INITCAP('tom')
-- Result:Jerry
SELECT INITCAP('JERRY')
```

### SUBSTRING、SUBSTR 子串查找截取

- **SUBSTRING(string [FROM] [for])** 函数用于提取从位置 FORM 开始的 for 个字符子串,位置从 1 开始计算, **SUBSTR(string,FROM [,count])** 的作用相同
- **SUBSTRING(string FROM pattern)** 函数提取匹配 POSIX 正则表达式的子串
- **SUBSTRING(string FROM pattern for escape)** 函数提取匹配 SQL 正则表达式的子串

```sql
-- Result: hom
SELECT SUBSTRING('Thomas' FROM 2 for 3)
-- Result: homas
SELECT SUBSTRING('Thomas' FROM 2)
-- Result: hom
SELECT SUBSTR('Thomas',2,3)
-- Result: homas
SELECT SUBSTR('Thomas',2)
-- Result: omas,提取最后面4个字符,SUBSTRING(string FROM pattern)
SELECT SUBSTRING('Thomas' FROM '....$')
```

### LEFT 从左查找截取

**LEFT(str,n)** 函数返回字符串左边的 n 个字符, 如果 n 为 负数, 返回除了最后 |n| 个字符之外的所有字符

```sql
-- Result: abc
SELECT LEFT('abcdefg',3)
-- Result: abcd,-3 相当于从右边数起第1-3个字符被截取
SELECT LEFT('abcdefg',-3)
```

### RIGHT 从右查找截取

**RIGHT(str,n)** 函数返回字符串右边的 n 个字符串, 如果 n 为负数, 返回除了左边 |n| 个字符之外的所有字符

```sql
-- Result: efg
SELECT RIGHT('abcdefg',3)
-- Result: defg
SELECT RIGHT('abcdefg',-3)
```

### REGEXP_MATCH 正则匹配

**REGEXP_MATCH(string,pattern [,flags])** 函数返回匹配 POSIX 正则表达式的第一个子串

```sql
-- Result: {bar,beque}
SELECT REGEXP_MATCH('foobarbequebaz','(bar)(beque)')
-- Result: null
SELECT REGEXP_MATCH('foobarbequebaz','(beque)(bar)')
```

### REGEXP_MATCHES 正则匹配

**REGEXP_MATCHES(string,pattern,[,flags])** 函数返回匹配 POSIX 正则表达式的所有子串, 结果是一个集合

```sql
-- Result:{bar}
SELECT REGEXP_MATCHES('foobarbequebaz','ba.')
-- Result:{bar},{baz}
SELECT REGEXP_MATCHES('foobarbequebaz','ba.','g')
```

### POSITION、STRPOS 返回子串位置

- POSITION(substring in string) 返回子串的位置
- STRPOS(string, substring) 函数的作用相同, 但参数顺序相反

```sql
-- Result: 3
SELECT POSITION('om' in 'Thomas')
-- Result: 3
SELECT STRPOS('Thomas','om')
```

### STARTS_WITH 前缀查找

**STARTS_WITH(string,prefix)** 函数判断 string 是否以 prefix 开头, 如果是则返回 true; 否则返回false

```sql
-- Result: false,区分大小写
SELECT STARTS_WITH('Thomas','th')
-- Result: true
SELECT STARTS_WITH('Thomas','Th')
```

### REPLACE 替换

**REPLACE(string,FROM,to)** 函数将字符串 string 中的 FROM 子串替换为 to 子串

```sql
-- Result: abc-xyz-g
SELECT REPLACE('abcdefg','def','-xyz-')
```

### REGEXP_REPLACE 正则替换

**REGEXP_REPLACE(string,pattern,replacement [,flags])** 函数字符串 string 中匹配 POSIX 正则表达式 pattern 的子串替换为 replacement

```sql
-- Result: aMfg
SELECT REGEXP_REPLACE('abcdefg','.cd.','M')
```
### TRANSLATE

TRANSLATE(string,FROM,to) 函数将字符串 string 中出现在 FROM 中的字符串替换成 to 中相应位置的字符,如果 FROM 长度大于 to, 在 to 中没有对应值的字符将被删除.

```sql
-- Result: a2x5, 解释:1替换成了a,4替换成了x,3因为没有对应可替换的,所有3被删除了,所以就是 a2x5
SELECT TRANSLATE('12345','143','ax')
```

### OVERLAY 覆盖

**OVERLAY(string placing substring FROM [for])** 函数使用 substring 覆盖字符串 string 中从 FROM 开始的 for 个字符

```sql
-- Result: Thomas,解释:把 Txxxxas 里面的第2-4个字符,即 xxxx 替换成 hom
SELECT OVERLAY('Txxxxas' placing 'hom' FROM 2 for 4)
```

### TRIM 删除前或后

- **TRIM([leading | trailing | both] [characters] FROM string)** 函数从字符串的开头(leading) 、结尾(trailing)或者两端(both) 删除由指定字符 characters (默认为空格) 组成的最长子串;
-  **TRIM([leading | trailing | both] [characters] FROM string [,characters])** 函数的作用相同
  
```sql
-- Result: Tom, 会把字符串里面的 x、y、z 的字符都去掉
SELECT TRIM(both 'xyz' FROM 'yxTomxx');
-- Result: Tomxx, 会把字符串前面的 x、y、z 的字符都去掉
SELECT TRIM(leading 'xyz' FROM 'yxTomxx');
-- Result: yxTom, 会把字符串后面的 x、y、z 的字符都去掉
SELECT TRIM(trailing 'xyz' FROM 'yxTomxx');
```

### BTRIM、LTRIM、RTRIM

- **BTRIM(string [,characters])** 函数的作用与 TRIM 函数的 both 选项相同;
- **LTRIM(string [,characters])** 函数的作用与 TRIM 函数的 leading 选项相同;
- **RTRIM(string [,characters])** 函数的作用与 TRIM 函数的 trailing 选项相同;

```sql
-- Result: Tom
SELECT BTRIM('yxTomxx','xyz')
-- Result: Tomxx
SELECT LTRIM('yxTomxx','xyz')
-- Result: yxTom
SELECT RTRIM('yxTomxx','xyz')
```

### LPAD 左填充

**LPAD(string,length [,fill])** 函数在 string 左侧使用 fill 中的字符(默认空格)进行填充,直到长度为 length,如果 string 长度大于 length, 从右侧截断到长度 length

```sql
-- Result: xyxhi
SELECT LPAD('hi',5,'xy')
-- Result: xyzhi
SELECT LPAD('hi',5,'xyzz')
```

### RPAD 右填充

**RPAD(string,length [,fill])** 函数在 string 右侧使用 fill 中的字符(默认空格)进行填充,直到长度为 length,如果 string 长度大于 length, 从右侧截断到长度 length

```sql
-- Result: hixyx
SELECT RPAD('hi',5,'xy')
-- Result: hixyz
SELECT RPAD('hi',5,'xyzz')
```

### REPEAT 重复

REPEAT(string,number) 函数将字符串 string 重复 number 次

```sql
-- Result: xyzxyzxyz
SELECT REPEAT('xyz',3)
```

### FORMAT 字符串格式化

**FORMAT(formatstr,formatarg)** 用于对字符串格式化, 类似于 C 语言中的 sprintf 函数

```sql
-- Result: Hello World, World
SELECT FORMAT('Hello %s, %1$s','World')
```

### MD5 值

**MD5(string)** 函数用于返回十六进制格式的 MD5 值

```sql
-- Result: 900150983cd24fb0d6963f7d28e17f72
SELECT MD5('abc')
```

### REGEXP_SPLIT_TO_TABLE 字符串拆分

**REGEXP_SPLIT_TO_TABLE(string, pattern [,flags])** 函数用于拆分字符串, 使用 POSIX 正则表达式作为分隔符,函数的返回类型是 text 集合

```sql
-- Result: hello
-- Result: world
SELECT REGEXP_SPLIT_TO_TABLE('hello world','\s+')
```

### SPLIT_PART 字符串拆分返回

**SPLIT_PART(string,delimiter,field)** 函数使用 delimiter 拆分字符串, 并返回指定项(从1开始计数)

```sql
-- Result:def, 拆分后得到abc,def,ghi,获取第2项就是def
SELECT SPLIT_PART('abc~@~def~@~ghi','~@~',2)
```

### REVERSE 字符串反转

**REVERSE(str)** 函数用于将字符串反转

```sql
-- Result: gfedcba
SELECT REVERSE('abcdefg')
```

## 日期时间函数

| 运算符 | 示例                                                        | 结果                            |
| :----: | ----------------------------------------------------------- | ------------------------------- |
|   +    | date '2001-09-28' + integer '7'                             | date '2001-10-05'               |
|   +    | date '2001-09-28' + interval '1 hour'                       | timestamp '2001-09-28 01:00:00' |
|   +    | date '2001-09-28' + time '03:00'                            | timestamp '2001-09-28 03:00:00' |
|   +    | interval '1 day' + interval '1 hour'                        | interval '1 day 01:00:00'       |
|   +    | timestamp '2001-09-28 01:00' + interval '23 hours'          | timestamp '2001-09-29 00:00:00' |
|   +    | time '01:00' + interval '3 hours'                           | time '04:00:00'                 |
|   -    | - interval '23 hours'                                       | interval '-23:00:00'            |
|   -    | date '2001-10-01' - date '2001-09-28'                       | integer '3' (days)              |
|   -    | date '2001-10-01' - integer '7'                             | date '2001-09-24'               |
|   -    | date '2001-09-28' - interval '1 hour'                       | timestamp '2001-09-27 23:00:00' |
|   -    | time '05:00' - time '03:00'                                 | interval '02:00:00'             |
|   -    | time '05:00' - interval '2 hours'                           | time '03:00:00'                 |
|   -    | timestamp '2001-09-28 23:00' - interval '23 hours'          | timestamp '2001-09-28 00:00:00' |
|   -    | interval '1 day' - interval '1 hour'                        | interval '1 day -01:00:00'      |
|   -    | timestamp '2001-09-29 03:00' - timestamp '2001-09-27 12:00' | interval '1 day 15:00:00'       |
|   *    | 900 * interval '1 second'                                   | interval '00:15:00'             |
|   *    | 21 * interval '1 day'                                       | interval '21 days'              |
|   *    | double precision '3.5' * interval '1 hour'                  | interval '03:30:00'             |
|   /    | interval '1 hour' / double precision '1.5'                  | interval '00:40:00'             |

### AGE 时间间隔

**AGE(timestamp,timestamp)** 函数用于计算两个时间点之间的间隔, **AGE(timestamp)** 函数用于计算当前日期的凌晨12点到该时间点的间隔

```sql
-- Result: "2026-03-10"	"3 mons 29 days"
SELECT current_date,AGE(timestamp '2025-11-11')
-- Result: 3 years 10 mons 30 days
SELECT AGE(timestamp '2025-11-11',timestamp '2021-12-12')
```

### DATE_PART、EXTRACT 提取时间信息

- **DATE_PART(text,timestamp)** 和 **EXTRACT(field FROM timestamp)** 函数用于获取日期时间中的某一部分, 例如年份、月份、小时等;
- **DATE_PART(text,interval)** 和 **EXTRACT(field FROM interval)** 函数用于获取时间间隔中的某一部分

**支持的信息**
- **century**: 世纪；
- **month**: 月份（1-12）；
- **day**: 对于 timestamp，返回月份中的第几天；对于 interval，返回天数；
- **decade**: 年份除以 10；
- **dow**: 星期天（0）到星期六（6）；
- **doy**: 一年中的第几天（1-365/366）；
- **epoch**: 对于 timestamp WITH time zone，返回 1970-01-01 00:00:00 UTC 到该时间的秒数；对于 date 和 timestamp，返回本地时间的 1970-01-01 00:00:00 到该时间的秒数；对于 interval，返回以秒数表示的该时间间隔；
- **hour**: 小时（0-23）；
- **isodow**: ISO 8601 标准中的星期一（1）到星期天（7）。
- - **isoyear**: ISO 8601 标准定义的日期所在的年份。每年从包含 1 月 4 日的星期一开始，2017 年 01 月 01 日属于 2016 年；
- **microseconds**: 微秒，包含秒和小数秒在内的数字乘以 1000000；
- **millennium**: 千年；
- **milliseconds**: 毫秒，包含秒和小数秒在内的数字乘以 1000；
- **minute**: 分钟，（0 - 59）；
- **month**: 月份；
- **quarter**: 季度，（1 - 4）；
- **second**: 秒数，包含小数秒；
- **timezone**: UTC 时区，单位为秒；
- **timezone_hour**: UTC 时区中的小时部分；
- **timezone_minute**: UTC 时区中的分钟部分；
- **week**: ISO 8601 标准中的星期几，每年从第一个星期四所在的一周开始；
- **year**: 年份。

```sql
-- Result: "2026-03-10 07:25:21.936112+00"	2026
SELECT current_timestamp,DATE_PART('year',current_timestamp)
-- Result: "2026-03-10 07:25:45.902651+00"	3
SELECT current_timestamp,EXTRACT('month' FROM current_timestamp)
-- Result: 3
SELECT DATE_PART('year',AGE(timestamp '2025-11-11',timestamp '2021-12-12'))
-- Result: 10
SELECT EXTRACT('month' FROM AGE(timestamp '2025-11-11',timestamp '2021-12-12'))
```

### DATE_TRUNC 截断日期/时间

**DATE_TRUNC(field,source [,time_zone])** 函数用于将 timestamp、timestamp WITH time zone、date、time 或者 interval 数据截断到指定的精度

**支持以下截断精度**

- microseconds
- milliseconds
- second
- minute
- hour
- day
- week
- month
- quarter
- year
- decade
- century
- millennium

```sql
-- Result: 2026-03-01 00:00:00
SELECT DATE_TRUNC('month',timestamp '2026-03-10')
-- Result: 2026-03-10 00:00:00
SELECT DATE_TRUNC('day',timestamp '2026-03-10')
```

### MAKE_DATE 创建日期

**MAKE_DATE(year int,month int,day int)** 函数用于创建一个日期

```sql
-- Result: 2023-01-11
SELECT MAKE_DATE(2023,1,11)
```

### MAKE_INTERVAL 创建时间间隔

**MAKE_INTERVAL(years int DEFAULT 0,months int DEFAULT 0,weeks int DEFAULT0,days int DEFAULT 0,hours int DEFAULT 0,mins int DEFAULT 0,secs double precision DEFAULT 0.0)** 函数通过指定年、月、日等信息创建一个时间间隔

```sql
-- Result: 1 day 05:00:00
SELECT MAKE_INTERVAL(days=>1,hours=>5)
```

### MAKE_TIME 创建时间

**MAKE_TIME(hour int,min int,sec double precision)** 函数通过指定小时、分钟和秒数创建一个时间

```sql
SELECT MAKE_TIME(1,2,30.5)
```

### MAKE_TIMESTAMP 创建时间戳

**MAKE_TIMESTAMP(year int,month int,day int,hour int,min int,sec double precision)** 函数通过指定年、月、日、时、分、秒创建一个时间戳

```sql
-- Result: 2025-05-25 08:20:23
SELECT MAKE_TIMESTAMP(2025,05,25,8,20,23)
```

### MAKE_TIMESTAMPTZ

**MAKE_TIMESTAMPTZ(year int,month int,day int,hour int,min int,sec double precision [,timezone text])** 函数通过指定年、月、日、时、分、秒创建一个带时区的时间戳,如果没有指定时区,使用当前时区

```sql
-- Result: 2025-05-25 12:20:23+00
SELECT MAKE_TIMESTAMPTZ(2025,05,25,8,20,23,'America/New_York')
```

### TO_TIMESTAMP Unix转Timestamp

**TO_TIMESTAMP(double precision)** 函数将 Unix 时间戳(自动 1970-01-01 00:00:00+00 以来的秒数) 转换为 PostgreSQL 时间戳数据

```sql
-- Result: 2020-03-02 12:32:19+00
SELECT TO_TIMESTAMP(1583152339)
```

### AT TIME ZONE 转换时区

**AT TIME ZONE** 运算符用于将 timestamp without time zone、timestamp WITH time zone 以及 time WITH time zone 转换为指定时区中的时间

```sql
-- 设置数据库时区
SET timezone = 'Asia/Shanghai';
-- 显示当前数据库时区
SHOW timezone
-- Result: 2026-03-10 05:27:57.552189
SELECT current_timestamp AT TIME ZONE 'America/New_york'
```
### CAST 类型转换

**CAST(expr AS data_type)** 函数用于将 expr 转换为 data_type 数据类型,PostgreSQL 类型转换运算符(::)也可以实现相同的功能;如果数据类型无法转换为指定的类型,将会返回错误

```sql
-- Result: 15	"2020-03-15"
SELECT CAST('15' AS INTEGER),'2020-03-15'::DATE
/*
Result:⬇️
ERROR:  invalid input syntax for type integer: "abc"
LINE 1: SELECT CAST('abc' AS INTEGER)
*/
SELECT CAST('abc' AS INTEGER)
```

### TO_DATE 字符串转时间

**TO_DATE(string,format)** 函数用于将字符串 string 按照 format 格式转换为日期类型

```sql
-- Result: 2025-03-15
SELECT TO_DATE('2025/03/15','YYYY-MM-DD')
-- Result: 2025-03-15
SELECT TO_DATE('2025年03月15日','YYYY年MM月DD日')
```

### TO_TIMESTAMP 字符串转时间戳

**TO_TIMESTAMP(string,format)** 函数用于将字符串 string 按照 format 格式转换为 timestamp WITH time zone 类型

```sql
-- Result: 2025-03-15 00:00:00+08
SELECT TO_TIMESTAMP('2025年03月15日','YYYY年MM月DD日')
-- Result: 2020-03-15 19:18:17.678+08, HH24 表示 14 小时制的小时,MI 表示分钟, SS 表示秒数, MS 表示毫秒数
SELECT TO_TIMESTAMP('2020-03-15 19:18:17.678','YYYY-MM-DD HH24:MI:SS.MS')
```

### TO_CHAR 类型转字符串

**to_char(expre,format)** 函数用于将 timestamp、interval、integer、double precision 或者 numeric 类型的值转换为指定格式的字符串

```sql
-- Result: "21:21:49"	" -12.35",9代表数字位, D 代表小数点
SELECT TO_CHAR(current_timestamp,'HH24:MI:SS'),TO_CHAR(-12.351,'99D99')
```

### TO_NUMBER 字符串转数字

**TO_NUMBER(string,format)** 函数用于将字符串转换为数字

```sql
-- Result: 125.8, L表示本地货币符号
SELECT TO_NUMBER('¥125.8','L999D9')
```



## CASE

**CASE 表达式** = SQL 中的 **if-else 条件判断**，用于根据条件返回不同的值。

###  简单 CASE
```sql
/*
将 department_id 的数字转换成中文部门名称：
90 → '技术部'
60 → '人事部'
其他 → '销售部'
*/
SELECT first_name,last_name,department_id,
	CASE department_id
	WHEN 90 THEN '技术部'
	WHEN 60 THEN '人事部'
	ELSE '销售部'
	END AS "部门"
FROM employees
```

<ZoomImg src="/images/pgsql/sql_39.png" title="简单 CASE"/>
<div class="text-center mt-2 font-bold">简单 CASE</div>

---

### 搜索 CASE

```sql
/*
- ✅ 从上往下匹配
- ✅ 匹配到就停止
- ✅ 都不匹配走 ELSE
- ✅ 必须用 END 结束
- ✅ 可以嵌套使用
*/
SELECT 
    first_name,
    last_name,
    salary,
    CASE
        WHEN salary >= 20000 THEN '💰 高薪'
        WHEN salary BETWEEN 15000 AND 19999 THEN '💵 次高薪'
        WHEN salary >= 10000 THEN '💴 中薪'
        WHEN salary >= 5000 THEN '💸 低薪'
        ELSE '😭 实习工资'
    END AS "薪水评级"
FROM employees
ORDER BY salary DESC;
```

<ZoomImg src="/images/pgsql/sql_40.png" title="搜索 CASE"/>
<div class="text-center mt-2 font-bold">搜索 CASE</div>

---

## FILTER

- ✅ 简洁清晰
- ✅ PostgreSQL 特有（SQL 标准）
- ✅ 性能好
- ❌ MySQL、SQL Server 不支持

```sql
/*
一次查询统计多个部门的人数，使用了两种不同的方法：
FILTER 子句（PostgreSQL 特有，推荐）
CASE + COUNT 组合（通用方法）,COUNT 会忽略 NULL，只统计 1 的数量
*/
SELECT COUNT(*) FILTER(WHERE department_id=10) "部门id是10的部门人数",
       COUNT(CASE department_id WHEN 20 THEN 1 END) "部门id是20的部门人数",
       COUNT(CASE department_id WHEN 30 THEN 1 END) "部门id是30的部门人数"
FROM employees
```

<ZoomImg src="/images/pgsql/sql_41.png" title="FILTER"/>
<div class="text-center mt-2 font-bold">FILTER</div>

---

## NULLIF

作用: 如果两个值**相等** → 返回 **NULL**; 如果两个值**不等** → 返回 **第一个值**

1. 避免除以零错误（最常用）
2. 将无意义的值转为 NULL

```sql
-- 避免除零错误,返回 NULL
SELECT 1/NULLIF(0,0)
```

<ZoomImg src="/images/pgsql/sql_42.png" title="NULLIF"/>
<div class="text-center mt-2 font-bold">NULLIF</div>

---

## COALESCE

作用: COALESCE 返回**第一个非 NULL 的值**

```sql
/*
从左到右检查
遇到第一个非 NULL 就返回
全是 NULL 才返回 NULL
*/
SELECT COALESCE(null,null,3);
```

<ZoomImg src="/images/pgsql/sql_43.png" title="COALESCE"/>
<div class="text-center mt-2 font-bold">COALESCE</div>

---