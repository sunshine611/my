# PostgreSQL 函数

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