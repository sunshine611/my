# SQL 基本语法

::: info 素材来源
[https://github.com/dongxuyang1985/postgresql_dev_guide](https://github.com/dongxuyang1985/postgresql_dev_guide)
:::

## SELECT

### 基本查询

#### 查询所有字段 *

从 employees 表中选择所有列的所有数据

- **SELECT** - 查询命令，表示"选择/读取"数据
- **\*** - 星号，表示"所有列"（all columns）
- **FROM employees** - 从 employees 表中读取

``` sql
SELECT * FROM employees;
```

<ZoomImg src="/images/pgsql/sql_1.png" title="查询所有字段"/>

----

#### 选择性查询

这是一个选择性查询，只获取特定的列，而不是所有列。

- **SELECT first_name, last_name** - 只选择 first_name 和 last_name 这两列
- **FROM employees** - 从 employees 表中读取

``` sql
SELECT first_name,last_name FROM employees;
```

<ZoomImg src="/images/pgsql/sql_2.png" title="选择性查询"/>

----

#### 别名查询 AS

使用 AS 关键字给列起一个别名（alias），让返回的结果更易读。

- **first_name AS "名字"** - 将 first_name 列显示为"名字"
- **last_name AS "姓氏"** - 将 last_name 列显示为"姓氏"
- **FROM employees** - 从 employees 表中读取

``` sql
SELECT first_name AS "名字",last_name AS "姓氏" FROM employees;
```

<ZoomImg src="/images/pgsql/sql_3.png" title="别名查询"/>

----

#### 去重查询 DISTINCT

这个查询引入了 DISTINCT 关键字，用于去重.单个字段的不同查询结果只会出现一次

**SELECT DISTINCT** - 选择不重复的数据
**department_id AS "部门"** - 选择 department_id 列，显示为"部门"
**FROM employees** - 从 employees 表中读取

``` sql
SELECT DISTINCT department_id AS "部门" FROM employees;
```

<ZoomImg src="/images/pgsql/sql_4.png" title="去重查询"/>

----

#### 多列去重查询 DISTINCT

对多列组合进行去重，只要两列的组合不同，就算是不同的记录。

- **SELECT DISTINCT** - 去重
- **department_id AS "部门", job_id AS "职位"** - 选择两列
- **FROM employees** - 从 employees 表中读取

``` sql
SELECT DISTINCT department_id AS "部门",job_id AS "职位" FROM employees;
```

<ZoomImg src="/images/pgsql/sql_5.png" title="多列去重查询"/>

----

#### postgreSQL扩展查询

``` sql
-- 查询postgreSQL版本
SELECT version();
```

<ZoomImg src="/images/pgsql/sql_6.png" title="postgreSQL扩展查询"/>

----

### 条件查询

#### 简单条件查询 WHERE

查询引入了 **WHERE 子句**，用于**条件过滤**

``` sql
SELECT * FROM employees WHERE employee_id = 100; -- 符号: = != <> > >= < <=
```

<ZoomImg src="/images/pgsql/sql_7.png" title="简单条件查询"/>

----

#### 范围查询 BETWEEN

**BETWEEN 是闭区间**，包含起始值和结束值。

- **SELECT \*** - 选择所有列
- **FROM employees** - 从 employees 表
- **WHERE salary BETWEEN 10000 AND 12000** - 薪资在10000到12000之间

``` sql
SELECT * FROM employees WHERE salary BETWEEN 10000 AND 12000;
```

<ZoomImg src="/images/pgsql/sql_8.png" title="范围查询"/>

----

#### 匹配查询 IN

**IN** 运算符，用于**匹配列表中的任意值**

- **SELECT \*** - 选择所有列
- **FROM employees** - 从 employees 表
- **WHERE salary IN (10000, 12000)** - 薪资是10000或12000

``` sql
SELECT * FROM employees WHERE salary IN (10000, 12000);
```

<ZoomImg src="/images/pgsql/sql_9.png" title="匹配查询"/>

----

#### 模糊查询 LIKE

**LIKE** 用于**模糊匹配**字符串，支持通配符。

| 通配符 |               含义                | 示例  |       匹配结果        |
| :----: | :-------------------------------: | :---: | :-------------------: |
|   %    | 匹配**任意多个字符**（0个或多个） | `S%`  | Smith, Sam, Steven, S |
|   -    |    匹配**单个字符**（恰好1个）    | `S_m` |     Sam, Sim, Sum     |

``` sql
SELECT first_name FROM employees WHERE first_name LIKE 'S%' -- 查询 S 开头的 first_name 字段
SELECT first_name FROM employees WHERE first_name LIKE '%s' -- 查询 s 结尾的 first_name 字段
SELECT first_name FROM employees WHERE first_name LIKE '%s%' -- 查询 s 在中间的 first_name 字段
SELECT first_name FROM employees WHERE first_name ILIKE 's%' -- 不区分大小写模湖查询
```

#### 反向模糊查询 NOT LIKE

**NOT LIKE** 用于排除符合某个模式的数据。

- **SELECT first_name** - 选择 first_name 列
- **FROM employees** - 从 employees 表
- **WHERE first_name NOT LIKE 'S%'** - 排除以 'S' 开头的名字

``` sql
SELECT first_name FROM employees WHERE first_name NOT LIKE 'S%'
```

<ZoomImg src="/images/pgsql/sql_10.png" title="反向模糊查询"/>

----

#### 空值查询 IS NULL

**IS NULL - 查询空值**  
**IS NOT NULL - 查询非空值**

::: info 什么是 NULL？

**NULL** 是一个特殊值，表示：

- 不存在的值
- 未知的值
- 未赋值的状态
  
**NULL 不等于：**

- ❌ 空字符串 ''
- ❌ 数字 0
- ❌ 布尔值 false
  
NULL 是一个**独特的状态**。
:::



- **SELECT \*** - 选择所有列
- **FROM employees** - 从 employees 表
- **WHERE manager_id IS NULL** - 查询 manager_id 是空值

``` sql
SELECT * FROM employees WHERE manager_id IS NULL

SELECT * FROM employees WHERE manager_id IS NOT DISTINCT FROM NULL; -- 这句话也可用于空值判断,等同上一句效果
```

<ZoomImg src="/images/pgsql/sql_11.png" title="空值查询"/>

----

### 运算查询

::: info 运算符优先级
从高到低：

括号 ()  
NOT  
比较运算符 =, !=, >, <, etc.  
AND  
OR  
:::

#### AND 查询

**AND** 逻辑运算符，用于**组合多个条件**

- **SELECT \*** - 选择所有列
- **FROM employees** - 从 employees 表
- **WHERE first_name = 'Steven' AND last_name = 'King'** - 两个条件都要满足

``` sql
SELECT * FROM employees WHERE first_name = 'Steven' AND last_name = 'King'

SELECT 1=0 OR 1/0=1; -- 短路运算,只要前面有一个不满足条件,后面都不会去执行
```

<ZoomImg src="/images/pgsql/sql_12.png" title="使用 AND 查询"/>

----

#### OR 查询

**OR** 逻辑运算符，用于**满足任一条件**

- **SELECT \*** - 选择所有列
- **FROM employees** - 从 employees 表
- **WHERE first_name = 'Steven' OR last_name = 'King'** - 两个条件满足任一即可

``` sql
SELECT * FROM employees WHERE first_name = 'Steven' OR last_name = 'King'

SELECT 1=1 OR 1/0=1; -- 短路运算,只要前面满足条件,后面都不会去执行
```

<ZoomImg src="/images/pgsql/sql_13.png" title="使用 OR 查询"/>

----

#### NOT 查询

**NOT** 运算符，用于**取反/否定**条件

```sql
-- NOT BETWEEN, NOT IN, NOT LIKE
SELECT * FROM employees WHERE (NOT first_name = 'Steven') AND last_name = 'King'
```

<ZoomImg src="/images/pgsql/sql_14.png" title="使用 NOT 查询"/>

----

### 排序查询 ORDER BY

#### 升序排序 ASC

- **SELECT employee_id, first_name, last_name, hire_date, salary** - 选择这5列
- **FROM employees** - 从 employees 表
- **ORDER BY first_name** - 按 first_name 排序（默认升序）

``` sql
-- 默认升序排列 ASC
SELECT employee_id,first_name,last_name,hire_date,salary 
FROM employees 
ORDER BY first_name
```

<ZoomImg src="/images/pgsql/sql_15.png" title="升序排序"/>

----

#### 降序排序 DESC

- **SELECT employee_id, first_name, last_name, hire_date, salary** - 选择5列
- **FROM employees** - 从 employees 表
- **ORDER BY salary DESC** - 按薪资降序排列（高薪在前）

``` sql
SELECT employee_id,first_name,last_name,hire_date,salary 
FROM employees 
ORDER BY salary DESC
```

<ZoomImg src="/images/pgsql/sql_16.png" title="渐序排序"/>

----


## 注释

注释是给**人看的说明**，数据库执行时会**忽略**注释内容。

**作用:**

- 📝 解释代码的目的
- 📝 记录业务逻辑
- 📝 提醒注意事项
- 📝 方便团队协作

### 单行注释: --

``` sql
SELECT DISTINCT department_id AS "部门",job_id AS "职位" -- 查询部门和职位组合的不同值
FROM employees;
```

----

### 多行注释: /* */

``` sql
SELECT DISTINCT department_id AS "部门",job_id AS "职位" 
/* 注释
日期: 2026年
作者: 匿名
*/
FROM employees;
```