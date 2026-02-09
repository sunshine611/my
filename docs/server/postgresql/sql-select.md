# SQL 查询语法

::: info 素材来源
[https://github.com/dongxuyang1985/postgresql_dev_guide](https://github.com/dongxuyang1985/postgresql_dev_guide)
:::


### 基本查询

#### 查询所有字段 *

从 employees 表中选择所有列的所有数据

- **SELECT** - 查询命令，表示"选择/读取"数据
- **\*** - 星号，表示"所有列"（all columns）
- **FROM employees** - 从 employees 表中读取

```sql
SELECT * FROM employees;
```

<ZoomImg src="/images/pgsql/sql_1.png" title="查询所有字段"/>

---

#### 选择性查询

这是一个选择性查询，只获取特定的列，而不是所有列。

- **SELECT first_name, last_name** - 只选择 first_name 和 last_name 这两列
- **FROM employees** - 从 employees 表中读取

```sql
SELECT first_name, last_name FROM employees;
```

<ZoomImg src="/images/pgsql/sql_2.png" title="选择性查询"/>

---

#### 别名查询 AS

使用 AS 关键字给列起一个别名（alias），让返回的结果更易读。

- **first_name AS "名字"** - 将 first_name 列显示为"名字"
- **last_name AS "姓氏"** - 将 last_name 列显示为"姓氏"
- **FROM employees** - 从 employees 表中读取

```sql
SELECT first_name AS "名字", last_name AS "姓氏" FROM employees;
```

<ZoomImg src="/images/pgsql/sql_3.png" title="别名查询"/>

---

#### 去重查询 DISTINCT

这个查询引入了 DISTINCT 关键字，用于去重。单个字段的不同查询结果只会出现一次。

- **SELECT DISTINCT** - 选择不重复的数据
- **department_id AS "部门"** - 选择 department_id 列，显示为"部门"
- **FROM employees** - 从 employees 表中读取

```sql
SELECT DISTINCT department_id AS "部门" FROM employees;
```

<ZoomImg src="/images/pgsql/sql_4.png" title="去重查询"/>

---

#### 多列去重查询 DISTINCT

对多列组合进行去重，只要两列的组合不同，就算是不同的记录。

- **SELECT DISTINCT** - 去重
- **department_id AS "部门", job_id AS "职位"** - 选择两列
- **FROM employees** - 从 employees 表中读取

```sql
SELECT DISTINCT department_id AS "部门", job_id AS "职位" FROM employees;
```

<ZoomImg src="/images/pgsql/sql_5.png" title="多列去重查询"/>

---

#### PostgreSQL 扩展查询

```sql
-- 查询 PostgreSQL 版本
SELECT version();
```

<ZoomImg src="/images/pgsql/sql_6.png" title="PostgreSQL扩展查询"/>

---

### 条件查询

#### 简单条件查询 WHERE

查询引入了 **WHERE 子句**，用于**条件过滤**。

- **SELECT \*** - 选择所有列
- **FROM employees** - 从 employees 表
- **WHERE employee_id = 100** - 只查询 employee_id 等于 100 的记录

```sql
-- 比较运算符: = != <> > >= < <=
SELECT * FROM employees WHERE employee_id = 100;
```

<ZoomImg src="/images/pgsql/sql_7.png" title="简单条件查询"/>

---

#### 范围查询 BETWEEN

**BETWEEN 是闭区间**，包含起始值和结束值。

- **SELECT \*** - 选择所有列
- **FROM employees** - 从 employees 表
- **WHERE salary BETWEEN 10000 AND 12000** - 薪资在 10000 到 12000 之间

```sql
SELECT * FROM employees WHERE salary BETWEEN 10000 AND 12000;
```

<ZoomImg src="/images/pgsql/sql_8.png" title="范围查询"/>

---

#### 匹配查询 IN

**IN** 运算符，用于**匹配列表中的任意值**。

- **SELECT \*** - 选择所有列
- **FROM employees** - 从 employees 表
- **WHERE salary IN (10000, 12000)** - 薪资是 10000 或 12000

```sql
SELECT * FROM employees WHERE salary IN (10000, 12000);
```

<ZoomImg src="/images/pgsql/sql_9.png" title="匹配查询"/>

---

#### 模糊查询 LIKE

**LIKE** 用于**模糊匹配**字符串，支持通配符。

| 通配符 | 含义 | 示例 | 匹配结果 |
| :----: | :--: | :--: | :------: |
| `%` | 匹配**任意多个字符**（0个或多个） | `S%` | Smith, Sam, Steven, S |
| `_` | 匹配**单个字符**（恰好1个） | `S_m` | Sam, Sim, Sum |

```sql
-- 查询 S 开头的 first_name 字段
SELECT first_name FROM employees WHERE first_name LIKE 'S%';

-- 查询 s 结尾的 first_name 字段
SELECT first_name FROM employees WHERE first_name LIKE '%s';

-- 查询包含 s 的 first_name 字段
SELECT first_name FROM employees WHERE first_name LIKE '%s%';

-- 不区分大小写模糊查询
SELECT first_name FROM employees WHERE first_name ILIKE 's%';
```

---

#### 反向模糊查询 NOT LIKE

**NOT LIKE** 用于排除符合某个模式的数据。

- **SELECT first_name** - 选择 first_name 列
- **FROM employees** - 从 employees 表
- **WHERE first_name NOT LIKE 'S%'** - 排除以 'S' 开头的名字

```sql
SELECT first_name FROM employees WHERE first_name NOT LIKE 'S%';
```

<ZoomImg src="/images/pgsql/sql_10.png" title="反向模糊查询"/>

---

#### 空值查询 IS NULL

- **IS NULL** - 查询空值
- **IS NOT NULL** - 查询非空值

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

```sql
SELECT * FROM employees WHERE manager_id IS NULL;

-- 这句话也可用于空值判断，等同上一句效果
SELECT * FROM employees WHERE manager_id IS NOT DISTINCT FROM NULL;
```

<ZoomImg src="/images/pgsql/sql_11.png" title="空值查询"/>

---

### 运算查询

::: info 运算符优先级
从高到低：

1. 括号 `()`
2. `NOT`
3. 比较运算符 `=`, `!=`, `>`, `<` 等
4. `AND`
5. `OR`
:::

#### AND 查询

**AND** 逻辑运算符，用于**组合多个条件**，两个条件都要满足。

- **SELECT \*** - 选择所有列
- **FROM employees** - 从 employees 表
- **WHERE first_name = 'Steven' AND last_name = 'King'** - 两个条件都要满足

```sql
SELECT * FROM employees WHERE first_name = 'Steven' AND last_name = 'King';

-- 短路运算：只要前面有一个不满足条件，后面都不会去执行
SELECT 1=0 OR 1/0=1;
```

<ZoomImg src="/images/pgsql/sql_12.png" title="使用 AND 查询"/>

---

#### OR 查询

**OR** 逻辑运算符，用于**满足任一条件**即可。

- **SELECT \*** - 选择所有列
- **FROM employees** - 从 employees 表
- **WHERE first_name = 'Steven' OR last_name = 'King'** - 两个条件满足任一即可

```sql
SELECT * FROM employees WHERE first_name = 'Steven' OR last_name = 'King';

-- 短路运算：只要前面满足条件，后面都不会去执行
SELECT 1=1 OR 1/0=1;
```

<ZoomImg src="/images/pgsql/sql_13.png" title="使用 OR 查询"/>

---

#### NOT 查询

**NOT** 运算符，用于**取反/否定**条件。

```sql
-- 可以和 BETWEEN、IN、LIKE 配合使用
SELECT * FROM employees WHERE (NOT first_name = 'Steven') AND last_name = 'King';
```

<ZoomImg src="/images/pgsql/sql_14.png" title="使用 NOT 查询"/>

---

### 排序查询 ORDER BY

#### 升序排序 ASC

- **SELECT employee_id, first_name, last_name, hire_date, salary** - 选择这 5 列
- **FROM employees** - 从 employees 表
- **ORDER BY first_name** - 按 first_name 排序（默认升序）

```sql
-- 默认升序排列 ASC
SELECT employee_id, first_name, last_name, hire_date, salary
FROM employees
ORDER BY first_name;
```

<ZoomImg src="/images/pgsql/sql_15.png" title="升序排序"/>

---

#### 降序排序 DESC

- **SELECT employee_id, first_name, last_name, hire_date, salary** - 选择 5 列
- **FROM employees** - 从 employees 表
- **ORDER BY salary DESC** - 按薪资降序排列（高薪在前）

```sql
SELECT employee_id, first_name, last_name, hire_date, salary
FROM employees
ORDER BY salary DESC;
```

<ZoomImg src="/images/pgsql/sql_16.png" title="降序排序"/>

---

#### 多列排序

**多列排序**，不同列可以有**不同的排序方向**。

- **SELECT employee_id, first_name, last_name, hire_date, salary** - 选择 5 列
- **FROM employees** - 从 employees 表
- **ORDER BY first_name, salary DESC** - 多列排序
  - **第一优先：** first_name 升序（默认 ASC）
  - **第二优先：** salary 降序（DESC）

```sql
SELECT employee_id, first_name, last_name, hire_date, salary
FROM employees
ORDER BY first_name, salary DESC;

-- 2 代表第二个字段 first_name，5 代表第五个字段 salary
SELECT employee_id, first_name, last_name, hire_date, salary
FROM employees
ORDER BY 2, 5 DESC;
```

<ZoomImg src="/images/pgsql/sql_17.png" title="多列排序"/>

---

#### 空值排序

NULL 在排序中的位置，在 PostgreSQL 中默认排序规则：

- **升序（ASC）：** NULL 排在**最后**
- **降序（DESC）：** NULL 排在**最前**

```sql
-- null 默认被看作最大的值
SELECT employee_id, first_name, last_name, manager_id
FROM employees
ORDER BY manager_id;

-- 让 null 排在最前面
SELECT employee_id, first_name, last_name, manager_id
FROM employees
ORDER BY manager_id NULLS FIRST;

-- 让 null 排在最后面
SELECT employee_id, first_name, last_name, manager_id
FROM employees
ORDER BY manager_id NULLS LAST;
```

<ZoomImg src="/images/pgsql/sql_18.png" title="空值排序"/>

---

### 分页查询

#### FETCH FIRST ... ROWS ONLY

**FETCH FIRST ... ROWS ONLY** 语法，这是 **SQL 标准**的分页方式。

- **SELECT first_name, last_name, salary** - 选择 3 列
- **FROM employees** - 从 employees 表
- **ORDER BY salary** - 按薪资升序排序
- **FETCH FIRST 10 ROWS ONLY** - 只取前 10 行

```sql
SELECT first_name, last_name, salary
FROM employees
ORDER BY salary
FETCH FIRST 10 ROWS ONLY;
```

<ZoomImg src="/images/pgsql/sql_19.png" title="标准分页查询"/>

---

#### LIMIT

**LIMIT**，这是 PostgreSQL 中**最常用**的限制结果数量的方式。

- **SELECT first_name, last_name, salary** - 选择 3 列
- **FROM employees** - 从 employees 表
- **ORDER BY salary** - 按薪资升序排序
- **LIMIT 20** - 只取前 20 行

```sql
SELECT first_name, last_name, salary
FROM employees
ORDER BY salary
LIMIT 20;
```

<ZoomImg src="/images/pgsql/sql_20.png" title="LIMIT分页查询"/>

---

#### WITH TIES

**WITH TIES** 的作用是：如果最后一名有多个并列的，**全部返回**。

- **SELECT first_name, last_name, salary** - 选择 3 列
- **FROM employees** - 从 employees 表
- **ORDER BY salary** - 按薪资升序排序
- **FETCH FIRST 10 ROWS WITH TIES** - 取前 10 行，包含并列的

```sql
SELECT first_name, last_name, salary
FROM employees
ORDER BY salary
FETCH FIRST 10 ROWS WITH TIES;
```

<ZoomImg src="/images/pgsql/sql_21.png" title="WITH TIES 作用"/>

---

#### OFFSET

**OFFSET + FETCH FIRST** 的组合，用于**分页查询**。

::: warning 注意
- 语法顺序必须是：**ORDER BY → OFFSET → FETCH**
- **OFFSET 越大，性能越差**
:::

```sql
SELECT first_name, last_name, salary
FROM employees
ORDER BY salary      -- 1. 先排序
OFFSET 10            -- 2. 再跳过
FETCH FIRST 10 ROWS ONLY;  -- 3. 最后取值

-- LIMIT + OFFSET 写法
SELECT first_name, last_name, salary
FROM employees
ORDER BY salary
LIMIT 10
OFFSET 10;
```

<ZoomImg src="/images/pgsql/sql_22.png" title="分页偏移量"/>

---

### 聚合函数查询

#### COUNT, SUM, AVG, MAX, MIN

聚合函数的特点：
- **多行输入，一行输出** - 把多行数据聚合成一个结果
- **自动忽略 NULL** - COUNT(*) 除外
- **通常与 GROUP BY 配合** - 可以分组聚合

```sql
SELECT
    COUNT(*) AS "总条数",
    SUM(salary) AS "工资汇总",
    AVG(salary) AS "人均工资",
    MAX(salary) AS "最高工资",
    MIN(salary) AS "最低工资"
FROM employees;

-- COUNT(列名) - 统计非 NULL 值
-- 统计有薪资的员工数（排除 salary 为 NULL 的）
SELECT COUNT(salary) AS "有薪资的人数" FROM employees;

-- COUNT(DISTINCT 列名) - 统计不重复值
-- 统计有多少个不同的部门
SELECT COUNT(DISTINCT department_id) AS "部门数量" FROM employees;
```

<ZoomImg src="/images/pgsql/sql_23.png" title="COUNT, SUM, AVG, MAX, MIN"/>

---

#### 字符串聚合 STRING_AGG

**STRING_AGG** 函数，用于**字符串聚合**。

- **STRING_AGG(first_name, '-')** - 把 first_name 用 '-' 连接
- **ORDER BY first_name** - 在拼接前先排序
- **FROM employees** - 从 employees 表

```sql
SELECT STRING_AGG(first_name, '-' ORDER BY first_name) FROM employees;
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
- **没有 GROUP BY**：聚合函数对**整个表**计算（返回 1 行）
- **有 GROUP BY**：聚合函数对**每个组**分别计算（返回 N 行，N = 组数）

```sql
-- 按部门分组统计人数
SELECT department_id, COUNT(*) AS "部门人数"
FROM employees
GROUP BY department_id;

-- 通过 EXTRACT 提取日期的年份进行分组
SELECT EXTRACT(YEAR FROM hire_date), COUNT(*)
FROM employees
GROUP BY EXTRACT(YEAR FROM hire_date);

-- 简写形式：1 代表查询的第一个字段
SELECT EXTRACT(YEAR FROM hire_date), COUNT(*)
FROM employees
GROUP BY 1;
```

<ZoomImg src="/images/pgsql/sql_25.png" title="GROUP BY"/>
<div class="text-center mt-2 font-bold">GROUP BY</div>

<ZoomImg src="/images/pgsql/sql_26.png" title="EXTRACT + GROUP BY"/>
<div class="text-center mt-2 font-bold">EXTRACT + GROUP BY</div>

---

#### 多字段分组

按多个字段进行分组，得到更细粒度的统计结果。

- **EXTRACT(YEAR FROM hire_date)** - 提取入职年份
- **department_id** - 部门 ID
- **COUNT(\*)** - 统计人数
- **GROUP BY 1, 2** - 按第 1 列和第 2 列分组

```sql
-- 按入职年份和部门分组，统计每个组合的人数
SELECT EXTRACT(YEAR FROM hire_date), department_id, COUNT(*)
FROM employees
GROUP BY 1, 2;
```

<ZoomImg src="/images/pgsql/sql_27.png" title="多字段分组"/>
<div class="text-center mt-2 font-bold">多字段分组</div>

---

#### 分组条件查询 HAVING

**HAVING** 子句，用于**分组后过滤**。

::: tip WHERE 与 HAVING 的区别
- **WHERE** - 在分组前过滤行
- **HAVING** - 在分组后过滤组
:::

- **SELECT department_id, COUNT(\*)** - 选择部门和人数
- **FROM employees** - 从 employees 表
- **GROUP BY 1** - 按部门分组
- **HAVING COUNT(\*) > 10** - 过滤：只要人数 > 10 的组

```sql
SELECT department_id, COUNT(*)
FROM employees
GROUP BY 1
HAVING COUNT(*) > 10;
```

<ZoomImg src="/images/pgsql/sql_28.png" title="分组条件查询"/>
<div class="text-center mt-2 font-bold">分组条件查询</div>

---

### 高级分组

**准备数据**

```sql
CREATE TABLE sales (
    item VARCHAR(10),
    year VARCHAR(4),
    quantity INT
);

INSERT INTO sales VALUES('apple', '2018', 800);
INSERT INTO sales VALUES('apple', '2018', 1000);
INSERT INTO sales VALUES('banana', '2018', 500);
INSERT INTO sales VALUES('banana', '2018', 600);
INSERT INTO sales VALUES('apple', '2019', 1200);
INSERT INTO sales VALUES('banana', '2019', 1800);
```

#### ROLLUP

**ROLLUP**，这是 PostgreSQL 中用于**多维度汇总**的强大功能

**ROLLUP 的作用**
ROLLUP 会自动创建**从右到左**的分层汇总：

```sql
/*
基本含义
按 item 和 year 分组统计，并自动生成多个层级的汇总。

对于 ROLLUP (item, year)，会生成：
1. GROUP BY item, year - 最细粒度（每个商品每年）
2. GROUP BY item - 中间层级（每个商品的总计）
3. GROUP BY () - 总计（所有数据的汇总）
*/
SELECT item,year,SUM(quantity)
FROM sales
GROUP BY ROLLUP (item,year);
```

<ZoomImg src="/images/pgsql/sql_29.png" title="ROLLUP"/>
<div class="text-center mt-2 font-bold">ROLLUP</div>

---

#### COALESCE

**COALESCE 的作用**
**COALESCE** 
- 返回参数列表中的**第一个非 NULL 值**。

```sql
/*
按商品和年份分组统计销售额，并用 COALESCE 将 ROLLUP 生成的 NULL 值替换为友好的文本。
*/

SELECT COALESCE(item,'所有产品') AS "产品",COALESCE(year,'所有年份') AS "年份",SUM(quantity) AS "销售额"
FROM sales
GROUP BY ROLLUP (item,year)
```

<ZoomImg src="/images/pgsql/sql_30.png" title="COALESCE"/>
<div class="text-center mt-2 font-bold">COALESCE</div>

---

#### CUBE

**CUBE**，它是比 ROLLUP 更强大的**多维分析**工具, 生成**所有可能的维度组合**

```sql
SELECT COALESCE(item,'所有产品') AS "产品",COALESCE(year,'所有年份') AS "年份",SUM(quantity) AS "销售额"
FROM sales
GROUP BY CUBE (item,year)
```

<ZoomImg src="/images/pgsql/sql_31.png" title="CUBE"/>
<div class="text-center mt-2 font-bold">CUBE</div>

---

#### GROUPING SETS

**GROUPING SETS**，这是最**灵活**的分组方式

**完全自定义**你想要的分组组合，不像 ROLLUP 和 CUBE 那样自动生成。

```sql
SELECT COALESCE(item,'所有产品') AS "产品",COALESCE(year,'所有年份') AS "年份",SUM(quantity) AS "销售额"
FROM sales
GROUP BY GROUPING SETS ((item,year),(year),())  -- 这样分组等价于 ROLLUP 分组

SELECT COALESCE(item,'所有产品') AS "产品",COALESCE(year,'所有年份') AS "年份",SUM(quantity) AS "销售额"
FROM sales
GROUP BY GROUPING SETS ((item,year),(year),(item),())  -- 这样分组等价于 CUBE 分组
```

<ZoomImg src="/images/pgsql/sql_32.png" title="GROUPING SETS"/>
<div class="text-center mt-2 font-bold">GROUPING SETS</div>

---

#### GROUPING

1. GROUPING(单列) - 判断该列是否被汇总
2. GROUPING(多列) - 生成分组标识符

```sql
INSERT INTO sales VALUES (NULL,'2018',5000);    -- 插件一条有 NULL 的数据

-- 汇总的数据会显示1,GROUPING(item,year) 汇总显示1的话,会二进制1+1=11,再转成十进制,结果=3
SELECT item AS "产品",year AS "年份",SUM(quantity) AS "销售额",
	GROUPING(item),GROUPING(year),GROUPING(item,year)
FROM sales
GROUP BY ROLLUP (item,year)
```

<ZoomImg src="/images/pgsql/sql_33.png" title="GROUPING"/>
<div class="text-center mt-2 font-bold">GROUPING</div>

### 多表连接查询

**关系型数据库**通常将数据**分散存储**在多个表中，JOIN 用于将它们**重新组合**

**ON** 指定**连接条件**，通常是两个表的**公共列**

| 写法 | 全称 | 说明 |
|------|------|------|
| JOIN | INNER JOIN | 只返回匹配的行（默认） |
| INNER JOIN | INNER JOIN | 同上（完整写法） |
| LEFT JOIN | LEFT OUTER JOIN | 保留左表所有行 |
| LEFT OUTER JOIN | LEFT OUTER JOIN | 同上（完整写法） |
| RIGHT JOIN | RIGHT OUTER JOIN | 保留右表所有行 |
| RIGHT OUTER JOIN | RIGHT OUTER JOIN | 同上（完整写法） |
| FULL JOIN | FULL OUTER JOIN | 保留两表所有行 |
| FULL OUTER JOIN | FULL OUTER JOIN | 同上（完整写法） |
| CROSS JOIN | CROSS JOIN | 笛卡尔积 |

#### JOIN (INNER JOIN)

**内连查询只要交集,就是A表和B表数据的交集**

```sql
/*
从 employees 表和 departments 表中查询数据，根据 department_id 字段将两个表连接起来。

1. FROM employees e - 主表：employees，别名 e
2. JOIN departments d - 连接表：departments，别名 d
3. ON e.department_id = d.department_id - 连接条件：两表的 department_id 相等
4. SELECT * - 选择两个表的所有列

显示106行,过滤掉了其中没有部门的一个员工
*/

SELECT *
FROM employees e
JOIN departments d
ON e.department_id = d.department_id
-- 上面查询语句和下面查询语句是等价的
SELECT *
FROM employees e
INNER JOIN departments d
ON e.department_id = d.department_id

-- 简洁写法
SELECT *
FROM employees e
JOIN departments d
USING (department_id)

-- 自然连接,数据库自动根据判断连接
SELECT *
FROM employees e
NATURAL JOIN departments d

-- 自连接,自己连接自己
SELECT concat('职员姓名:',e.first_name,' ',e.last_name),concat('直属上级:',m.first_name,' ',m.last_name)
FROM employees e
LEFT JOIN employees m
ON e.manager_id = m.employee_id

-- 多表连接
SELECT concat('职员姓名:',e.first_name,' ',e.last_name),concat('部门:',d.department_name),concat('工作岗位:',j.job_title)
FROM employees e
JOIN departments d
ON e.department_id = d.department_id
JOIN jobs j
ON e.job_id = j.job_id
```

<ZoomImg src="/images/pgsql/sql_34.png" title="JOIN(INNER JOIN)"/>
<div class="text-center mt-2 font-bold">JOIN(INNER JOIN)</div>

---

#### LEFT JOIN (LEFT OUTER JOIN)

**左外连接:** 保留左表全部，右表没有则 NULL

```sql
/*
以左表为主,查询所有员工及其部门信息，即使员工没有部门也显示出来

1. FROM employees e - 左表（主表）
2. LEFT JOIN departments d - 右表（连接表）
3. ON e.department_id = d.department_id - 连接条件
4. LEFT JOIN 的特点 - 保留左表（employees）的所有行

显示107行,没有部门的员工也显示出来
*/

SELECT e.employee_id,e.first_name,d.department_id,d.department_name
FROM employees e
LEFT JOIN departments d
ON e.department_id = d.department_id
-- 上面查询语句和下面查询语句是等价的
SELECT e.employee_id,e.first_name,d.department_id,d.department_name
FROM employees e
LEFT OUTER JOIN departments d
ON e.department_id = d.department_id
```

<ZoomImg src="/images/pgsql/sql_35.png" title="LEFT JOIN (LEFT OUTER JOIN)"/>
<div class="text-center mt-2 font-bold">LEFT JOIN (LEFT OUTER JOIN)</div>

---

#### RIGHT JOIN (RIGHT OUTER JOIN)

**右外连接:** 保留右表全部，左表没有则 NULL

```sql
/*
查询所有部门及其员工信息，即使部门没有员工也显示出来。

1. FROM employees e - 左表
2. RIGHT JOIN departments d - 右表（主表）
3. ON e.department_id = d.department_id - 连接条件
4. RIGHT JOIN 的特点 - 保留右表（departments）的所有行

显示122行,没有员工的部门也显示出来
*/
SELECT e.employee_id,e.first_name,d.department_id,d.department_name
FROM employees e
RIGHT JOIN departments d
ON e.department_id = d.department_id
-- 上面查询语句和下面查询语句是等价的
SELECT e.employee_id,e.first_name,d.department_id,d.department_name
FROM employees e
RIGHT OUTER JOIN departments d
ON e.department_id = d.department_id
```

<ZoomImg src="/images/pgsql/sql_36.png" title="RIGHT JOIN (RIGHT OUTER JOIN)"/>
<div class="text-center mt-2 font-bold">RIGHT JOIN (RIGHT OUTER JOIN)</div>

---

#### FULL JOIN (FULL OUTER JOIN)

**全外连接:** 保留两表所有行

```sql
/*
查询所有员工和所有部门的信息，无论是否匹配，全部显示。

1. FROM employees e - 左表
2. FULL JOIN departments d - 右表
3. ON e.department_id = d.department_id - 连接条件
4. FULL JOIN 的特点 - 保留两个表的所有行

一共显示了123行数据,既显示了没有部门的员工数据,同时也显示了没有员工的部门数据
*/
SELECT e.employee_id,e.first_name,d.department_id,d.department_name
FROM employees e
FULL JOIN departments d
ON e.department_id = d.department_id
-- 上面查询语句和下面查询语句是等价的
SELECT e.employee_id,e.first_name,d.department_id,d.department_name
FROM employees e
FULL OUTER JOIN departments d
ON e.department_id = d.department_id
```

<ZoomImg src="/images/pgsql/sql_37.png" title="FULL JOIN (FULL OUTER JOIN)"/>
<div class="text-center mt-2 font-bold">FULL JOIN (FULL OUTER JOIN)</div>

---

#### CROSS JOIN

**交叉连接查询:** 生成**笛卡尔积**（Cartesian Product），即**两个表的所有可能组合**。

```sql
-- 九九乘法表
SELECT concat(t1,'*',t2,'=',t1*t2)
FROM generate_series(1,9) t1
CROSS JOIN generate_series(1,9) t2
```

<ZoomImg src="/images/pgsql/sql_38.png" title="CROSS JOIN"/>
<div class="text-center mt-2 font-bold">CROSS JOIN</div>

---