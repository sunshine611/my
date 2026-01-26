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

<ZoomImg src="/images/pgsql/sql_16.png" title="降序排序"/>

----

#### 多列排序

**多列排序**，不同列可以有**不同的排序方向**

- **SELECT employee_id, first_name, last_name, hire_date, salary** - 选择5列
- **FROM employees** - 从 employees 表
- **ORDER BY first_name, salary DESC** - 多列排序
    - **第一优先：** first_name 升序（默认 ASC）
    - **第二优先：** salary 降序（DESC）

``` sql
SELECT employee_id,first_name,last_name,hire_date,salary 
FROM employees 
ORDER BY first_name, salary DESC

-- 2代表第二个列表first_name,5代表第五个列表salary
SELECT employee_id,first_name,last_name,hire_date,salary 
FROM employees 
ORDER BY 2, 5 DESC
```

<ZoomImg src="/images/pgsql/sql_17.png" title="多列排序"/>

----

#### 空值排序

NULL 在排序中的位置在 PostgreSQL 中，默认排序规则：

- **升序（ASC）：** NULL 排在**最后**
- **降序（DESC）：** NULL 排在**最前**

``` sql
-- null 默认被看作最大的值
SELECT employee_id,first_name,last_name,manager_id
FROM employees 
ORDER BY manager_id

-- 让 null 排在最前面
SELECT employee_id,first_name,last_name,manager_id
FROM employees 
ORDER BY manager_id NULLS FIRST

-- 让 null 排在最后面
SELECT employee_id,first_name,last_name,manager_id
FROM employees 
ORDER BY manager_id NULLS LAST
```

<ZoomImg src="/images/pgsql/sql_18.png" title="空值排序"/>

----

### 分页查询

#### FETCH FIRST ... ROWS ONLY

**FETCH FIRST ... ROWS ONLY** 语法，这是 **SQL 标准**的分页方式

- **SELECT first_name, last_name, salary** - 选择3列
- **FROM employees** - 从 employees 表
- **ORDER BY salary** - 按薪资升序排序
- **FETCH FIRST 10 ROWS ONLY** - 只取前10行

``` sql
SELECT first_name,last_name,salary FROM employees ORDER BY salary FETCH FIRST 10 ROWS ONLY
```

<ZoomImg src="/images/pgsql/sql_19.png" title="标准分页查询"/>

----

#### LIMIT

**LIMIT**，这是 PostgreSQL 中**最常用**的限制结果数量的方式

- **SELECT first_name, last_name, salary** - 选择3列
- **FROM employees** - 从 employees 表
- **ORDER BY salary** - 按薪资升序排序
- **LIMIT 20** - 只取前20行

``` sql
SELECT first_name,last_name,salary FROM employees ORDER BY salary LIMIT 20
```

<ZoomImg src="/images/pgsql/sql_20.png" title="LIMIT分页查询"/>

----

#### TIES

**WITH TIES** 的作用是：如果最后一名有多个并列的，**全部返回**

- **SELECT first_name, last_name, salary** - 选择3列
- **FROM employees** - 从 employees 表
- **ORDER BY salary** - 按薪资升序排序
- **FETCH FIRST 10 ROWS WITH TIES** - 取前10行，包含并列的

``` sql
SELECT first_name,last_name,salary FROM employees ORDER BY salary FETCH FIRST 10 ROWS WITH TIES
```

<ZoomImg src="/images/pgsql/sql_21.png" title="TIES 作用"/>

----

#### OFFSET

**OFFSET + FETCH FIRST** 的组合，用于**分页查询**

**重要：** 语法顺序必须是：**ORDER BY → OFFSET → FETCH**

**OFFSET 越大, 性能越差**

``` sql
SELECT first_name,last_name,salary 
FROM employees 
ORDER BY salary -- 1. 先排序
OFFSET 10 -- 2. 再跳过
FETCH FIRST 10 ROWS ONLY -- 3. 最后取值

-- LIMIT + OFFSET 写法
SELECT first_name,last_name,salary 
FROM employees 
ORDER BY salary 
LIMIT 10
OFFSET 10
```

<ZoomImg src="/images/pgsql/sql_22.png" title="分页偏移量"/>

----

### 聚合函数查询

#### COUNT,SUM,AVG,MAX,MIN

- **多行输入，一行输出** - 把多行数据聚合成一个结果
- **自动忽略 NULL** - COUNT(*) 除外
- **通常与 GROUP BY 配合** - 可以分组聚合

``` sql
SELECT COUNT(*) AS "总条数",SUM(salary) AS "工资汇总",AVG(salary) AS "人均工资",MAX(salary) AS "最高工资",MIN(salary) AS "最低工资" from employees

-- COUNT(列名) - 统计非 NULL 值
-- 统计有薪资的员工数（排除 salary 为 NULL 的）
SELECT COUNT(salary) AS "有薪资的人数" FROM employees;

-- COUNT(DISTINCT 列名) - 统计不重复值
-- 统计有多少个不同的部门
SELECT COUNT(DISTINCT department_id) AS "部门数量" FROM employees;
```

<ZoomImg src="/images/pgsql/sql_23.png" title="COUNT,SUM,AVG,MAX,MIN"/>

---

#### 字符串聚合 STRING_AGG

**STRING_AGG** 函数，用于**字符串聚合**

- **STRING_AGG(first_name, '-')** - 把 first_name 用 '-' 连接
- **ORDER BY first_name** - 在拼接前先排序
- **FROM employees** - 从 employees 表

``` sql
SELECT STRING_AGG(first_name,'-' ORDER BY first_name) FROM employees;
```

<ZoomImg src="/images/pgsql/sql_24.png" title="STRING_AGG"/>

--- 

### 分组统计查询 

#### GROUP BY

::: info GROUP BY 的核心概念
**GROUP BY = 分组聚合**

原始数据（多行）→ 按某列分组 → 每组计算聚合值 → 返回汇总结果
:::

**关键理解：**
- **没有 GROUP BY**：聚合函数对**整个表**计算（返回1行）
- **有 GROUP BY**：聚合函数对**每个组**分别计算（返回N行，N=组数）

**执行步骤**
- **SELECT department_id, COUNT(*)** - 选择部门ID和人数统计
- **FROM employees** - 从 employees 表
- **GROUP BY department_id** - 按部门ID分组

``` sql
SELECT department_id,COUNT(*) AS "部门人数" from employees GROUP BY department_id 

-- 通过 extract 提取日期的年份进行分组
SELECT EXTRACT(YEAR FROM hire_date),COUNT(*)
FROM employees 
GROUP BY extract(YEAR FROM hire_date)

-- 通过 extract 提取日期的年份进行分组(简写形式,1代表查询的第一个字段)
SELECT EXTRACT(YEAR FROM hire_date),COUNT(*)
FROM employees 
GROUP BY 1
```

<ZoomImg src="/images/pgsql/sql_25.png" title="GROUP BY"/>
<div class="text-center mt-2 font-bold">GROUP BY</div>

<ZoomImg src="/images/pgsql/sql_26.png" title="EXTRACT + GROUP BY"/>
<div class="text-center mt-2 font-bold">EXTRACT + GROUP BY</div>

---

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