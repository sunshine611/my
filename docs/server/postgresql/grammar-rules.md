# postgreSQL 语法规则

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

## 单双引号规则

### 单引号 '...' - 字符串/文本值

**用途：** 表示**字符串常量、日期、时间**等值

``` sql
-- ✅ 字符串值用单引号
SELECT * FROM employees WHERE first_name = 'Steven';

-- ✅ 日期值用单引号
SELECT * FROM employees WHERE hire_date = '2025-01-26';

-- ✅ 时间戳用单引号
SELECT * FROM orders WHERE created_at > '2025-01-01 00:00:00';

-- ✅ 插入数据时的值用单引号
INSERT INTO employees (first_name, last_name, email) 
VALUES ('张三', 'Zhang', 'zhang@email.com');

-- ✅ 文本比较
SELECT * FROM products WHERE category = 'Electronics';
```

**规则：**

- 单引号用于**数据值**
- 字符串、日期、时间都用单引号
- 数字不需要引号

### 双引号 "..." - 标识符（表名、列名）

**用途：** 标识**表名、列名、别名**等数据库对象，并且**保留大小写**和**特殊字符**

``` sql
-- ✅ 列名包含空格或特殊字符时必须用双引号
SELECT "First Name", "Last Name" FROM employees;

-- ✅ 别名用双引号（保留大小写和中文）
SELECT 
    first_name AS "名字",
    last_name AS "姓氏",
    salary AS "工资"
FROM employees;

-- ✅ 表名包含大写或特殊字符
CREATE TABLE "MyTable" (id SERIAL);
SELECT * FROM "MyTable";  -- 必须用双引号，否则会转为小写 mytable

-- ✅ 关键字作为列名（不推荐，但可行）
CREATE TABLE test (
    "select" TEXT,
    "from" TEXT,
    "where" INTEGER
);
```

**规则：**

- 双引号用于**标识符**（数据库对象的名字）
- **保留大小写**（"MyTable" ≠ mytable）
- 可以包含空格和特殊字符
- 大多数情况下**可以省略**（如果是简单的小写字母标识符）

## 美元引号

### 1. **基本语法**

```sql
-- 基础格式：$$字符串内容$$
SELECT $$这是一个字符串$$;

-- 结果：这是一个字符串
```

**核心特点：**
- 用 `$$` 包围字符串
- **不需要转义**单引号和双引号
- **支持多行**文本
- PostgreSQL **特有**功能（MySQL、Oracle 不支持）

### 2. **为什么需要美元引号？**

#### 问题：单引号的转义很麻烦

```sql
-- ❌ 单引号中包含单引号，必须转义（双写）
SELECT 'He said ''Hello'' to me';
-- 结果：He said 'Hello' to me
-- 读起来很混乱：'He said ''Hello'' to me'

-- ❌ 更复杂的例子
SELECT 'It''s a beautiful day, she said ''I''m happy''';
-- 读起来非常痛苦

-- ✅ 美元引号：简单清晰
SELECT $$He said 'Hello' to me$$;
-- 结果：He said 'Hello' to me

SELECT $$It's a beautiful day, she said 'I'm happy'$$;
-- 清晰易读！
```

### 美元引号的使用场景

#### 1. **包含单引号的字符串**

```sql
-- 单引号方式（需要转义）
INSERT INTO companies (name) VALUES ('McDonald''s');
INSERT INTO books (title) VALUES ('The Writer''s Guide');

-- 美元引号方式（不需要转义）
INSERT INTO companies (name) VALUES ($$McDonald's$$);
INSERT INTO books (title) VALUES ($$The Writer's Guide$$);

-- 查询条件
SELECT * FROM companies WHERE name = $$O'Brien's Pizza$$;
SELECT * FROM books WHERE title LIKE $$%Writer's%$$;
```

#### 2. **包含双引号的字符串**

```sql
-- 传统方式（双引号不需要转义，但单引号需要）
SELECT 'She said "Hello"';  -- OK

-- 同时包含单引号和双引号
SELECT 'She said "It''s nice"';  -- 单引号需要转义

-- 美元引号：都不需要转义
SELECT $$She said "Hello"$$;
SELECT $$She said "It's nice"$$;
```

#### 3. **多行文本**

```sql
-- ✅ 美元引号：支持多行，格式清晰
INSERT INTO articles (title, content) VALUES (
    'PostgreSQL 教程',
    $$
这是文章的第一段。
可以包含 'single quotes' 和 "double quotes"。

这是文章的第二段。
不需要任何转义！
    $$
);

-- 查询多行文本
SELECT $$
第一行
第二行
第三行
$$;

-- 结果：
-- 第一行
-- 第二行
-- 第三行
```

#### 4. **JSON 数据**

```sql
-- JSON 中包含大量引号，用美元引号很方便
INSERT INTO products (name, metadata) VALUES (
    'iPhone',
    $$
    {
        "brand": "Apple",
        "model": "iPhone 15",
        "specs": {
            "storage": "256GB",
            "color": "black"
        },
        "price": 999.99
    }
    $$::JSONB  -- 转换为 JSONB 类型
);

-- 查询条件
SELECT * FROM products 
WHERE metadata @> $${"brand": "Apple"}$$::JSONB;
```

#### 5. **SQL 语句字符串**

```sql
-- 在存储过程或函数中存储 SQL 语句
DO $$
DECLARE
    sql_query TEXT;
BEGIN
    sql_query := $$
        SELECT * 
        FROM employees 
        WHERE first_name = 'Steven' 
          AND department_id IN (10, 20, 30)
    $$;
    
    EXECUTE sql_query;
END $$;
```

#### 6. **正则表达式**

```sql
-- 正则表达式中包含特殊字符
SELECT * FROM users 
WHERE email ~ $$^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$$;

-- 不用美元引号，反斜杠需要转义
SELECT * FROM users 
WHERE email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
```

### 带标签的美元引号

#### 1. **基本语法**

```sql
-- 格式：$标签$字符串内容$标签$
SELECT $tag$这是一个字符串$tag$;
SELECT $quote$He said 'Hello'$quote$;
SELECT $mystring$任意内容$mystring$;
```

**规则：**
- 标签可以是任意标识符（字母、数字、下划线）
- 开始和结束的标签必须**完全相同**
- 标签是**可选的**，不加标签就用 `$$`

#### 2. **为什么需要标签？**

##### 场景：字符串中包含 `$$`

```sql
-- ❌ 问题：字符串本身包含 $$
SELECT $$这是 $$ 美元符号$$;
-- 错误！PostgreSQL 认为字符串在第二个 $$ 处结束

-- ✅ 解决：使用带标签的美元引号
SELECT $str$这是 $$ 美元符号$str$;
-- 结果：这是 $$ 美元符号

SELECT $outer$字符串包含 $$ 和 $ 符号$outer$;
-- 结果：字符串包含 $$ 和 $ 符号
```

#### 3. **嵌套美元引号**

```sql
-- 外层和内层使用不同的标签
SELECT $outer$
    外层字符串
    $inner$
        内层字符串
    $inner$
    继续外层
$outer$;

-- 实际例子：函数中的 SQL 语句
CREATE FUNCTION get_user_info(user_id INTEGER) 
RETURNS TEXT AS $function$
DECLARE
    result TEXT;
BEGIN
    SELECT INTO result 
        $query$
            SELECT username 
            FROM users 
            WHERE id = $query$ || user_id;
    RETURN result;
END;
$function$ LANGUAGE plpgsql;
```

### 函数和存储过程中的美元引号（最常用）

#### 1. **创建函数**

```sql
-- ✅ 使用美元引号定义函数体（推荐）
CREATE FUNCTION get_full_name(first TEXT, last TEXT) 
RETURNS TEXT AS $$
BEGIN
    RETURN first || ' ' || last;
END;
$$ LANGUAGE plpgsql;

-- 调用函数
SELECT get_full_name('张', '三');
-- 结果：张 三

-- ❌ 不用美元引号（需要大量转义，不推荐）
CREATE FUNCTION get_full_name(first TEXT, last TEXT) 
RETURNS TEXT AS '
BEGIN
    RETURN first || '' '' || last;
END;
' LANGUAGE plpgsql;
```

#### 2. **复杂的存储过程**

```sql
-- 使用美元引号包含复杂逻辑
CREATE FUNCTION update_salary(emp_id INTEGER, increase_pct NUMERIC) 
RETURNS VOID AS $$
DECLARE
    current_salary NUMERIC;
    new_salary NUMERIC;
BEGIN
    -- 获取当前薪资
    SELECT salary INTO current_salary 
    FROM employees 
    WHERE employee_id = emp_id;
    
    -- 计算新薪资
    new_salary := current_salary * (1 + increase_pct / 100);
    
    -- 更新
    UPDATE employees 
    SET salary = new_salary 
    WHERE employee_id = emp_id;
    
    -- 记录日志
    INSERT INTO salary_history (employee_id, old_salary, new_salary, change_date)
    VALUES (emp_id, current_salary, new_salary, NOW());
    
    RAISE NOTICE '员工 % 的薪资从 % 更新为 %', emp_id, current_salary, new_salary;
END;
$$ LANGUAGE plpgsql;

-- 调用
SELECT update_salary(100, 10);  -- 给员工100涨薪10%
```

#### 3. **多层嵌套的函数**

```sql
CREATE FUNCTION process_orders() 
RETURNS VOID AS $function$
DECLARE
    order_record RECORD;
    sql_query TEXT;
BEGIN
    -- 外层美元引号
    FOR order_record IN 
        SELECT * FROM orders WHERE status = 'pending'
    LOOP
        -- 内层美元引号（使用不同标签）
        sql_query := $sql$
            UPDATE order_items 
            SET processed = TRUE 
            WHERE order_id = $sql$ || order_record.order_id;
        
        EXECUTE sql_query;
    END LOOP;
END;
$function$ LANGUAGE plpgsql;
```

### 实际应用案例

#### 案例1：批量插入带特殊字符的数据

```sql
-- 插入包含单引号、双引号、换行的评论
INSERT INTO reviews (product_id, username, comment) VALUES 
(1, 'John', $$
这个产品很好！
质量"excellent"，价格也合理。
店家说："It's the best in town"
我很满意！
$$),
(2, 'Alice', $$
It's OK, but the seller's attitude wasn't great.
She said "Take it or leave it".
$$),
(3, 'Bob', $$产品描述写着"高品质"，实际一般般$$);

-- 查询
SELECT product_id, username, comment 
FROM reviews 
WHERE comment LIKE $$%"excellent"%$$;
```

#### 案例2：存储 HTML/XML 内容

```sql
-- 存储 HTML 模板
CREATE TABLE email_templates (
    template_id SERIAL PRIMARY KEY,
    template_name VARCHAR(50),
    html_content TEXT
);

INSERT INTO email_templates (template_name, html_content) VALUES 
('welcome_email', $$
<!DOCTYPE html>
<html>
<head>
    <title>Welcome to Our Site</title>
</head>
<body>
    <h1>Welcome, {{username}}!</h1>
    <p>We're glad you're here.</p>
    <p>Click <a href="{{activation_link}}">here</a> to activate.</p>
</body>
</html>
$$),
('order_confirmation', $$
<html>
<body>
    <h2>Order Confirmation</h2>
    <p>Order ID: {{order_id}}</p>
    <p>Total: ${{total_amount}}</p>
</body>
</html>
$$);
```

#### 案例3：动态 SQL 生成

```sql
CREATE FUNCTION generate_report(dept_id INTEGER, start_date DATE, end_date DATE)
RETURNS TABLE(employee_name TEXT, total_sales NUMERIC) AS $$
DECLARE
    sql_query TEXT;
BEGIN
    -- 动态构建 SQL 查询
    sql_query := $query$
        SELECT 
            e.first_name || ' ' || e.last_name AS employee_name,
            SUM(o.order_amount) AS total_sales
        FROM employees e
        JOIN orders o ON e.employee_id = o.employee_id
        WHERE e.department_id = $query$ || dept_id || $query$
          AND o.order_date BETWEEN '$query$ || start_date || $query$' 
          AND '$query$ || end_date || $query$'
        GROUP BY e.employee_id, e.first_name, e.last_name
        ORDER BY total_sales DESC
    $query$;
    
    RETURN QUERY EXECUTE sql_query;
END;
$$ LANGUAGE plpgsql;

-- 调用
SELECT * FROM generate_report(60, '2025-01-01', '2025-01-31');
```

#### 案例4：存储正则表达式规则

```sql
CREATE TABLE validation_rules (
    rule_id SERIAL PRIMARY KEY,
    rule_name VARCHAR(50),
    pattern TEXT,
    description TEXT
);

INSERT INTO validation_rules (rule_name, pattern, description) VALUES 
('email', $$^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$$, '邮箱格式验证'),
('phone_cn', $$^1[3-9]\d{9}$$, '中国手机号'),
('url', $$^https?://[^\s/$.?#].[^\s]*$$, 'URL格式'),
('password_strong', $$^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$$, '强密码');

-- 使用规则验证
SELECT 
    'test@email.com' ~ pattern AS is_valid_email
FROM validation_rules 
WHERE rule_name = 'email';
```

### 美元引号 vs 单引号对比

#### 示例对比

```sql
-- 场景：存储一段包含引号和换行的文本

-- ❌ 单引号方式（复杂）
INSERT INTO posts (content) VALUES (
    'He said ''Hello''.
She replied ''It''s nice to meet you''.
They discussed "important matters".'
);
-- 转义单引号很麻烦，而且不支持真正的多行

-- ✅ 美元引号方式（简单）
INSERT INTO posts (content) VALUES ($$
He said 'Hello'.
She replied 'It's nice to meet you'.
They discussed "important matters".
$$);
-- 清晰易读，不需要转义
```

### 注意事项

#### 1. **美元引号不是字符串插值**

```sql
-- ❌ 美元引号不会进行变量替换
DECLARE
    name TEXT := 'Steven';
BEGIN
    -- 这不会替换 {name}
    SELECT $$Hello {name}$$;  
    -- 结果：Hello {name}（不是 Hello Steven）
END;

-- ✅ 需要字符串拼接
DECLARE
    name TEXT := 'Steven';
BEGIN
    SELECT 'Hello ' || name;  
    -- 结果：Hello Steven
END;
```

#### 2. **性能考虑**

```sql
-- 美元引号和单引号的性能完全相同
-- 只是写法不同，编译后完全一样

SELECT 'Hello';     -- 性能
SELECT $$Hello$$;   -- 性能相同
```

#### 3. **可读性优先**

```sql
-- 简单字符串：用单引号（简洁）
SELECT 'Hello';

-- 包含引号的字符串：用美元引号（清晰）
SELECT $$It's "great"$$;

-- 函数体：用美元引号（必须）
CREATE FUNCTION ... AS $$ ... $$ LANGUAGE plpgsql;
```

### 快速总结

| 特性 | 单引号 `'...'` | 美元引号 `$$...$$` |
|------|----------------|---------------------|
| **基本字符串** | ✅ `'Hello'` | ✅ `$$Hello$$` |
| **包含单引号** | ❌ `'It''s'` 需转义 | ✅ `$$It's$$` 不需转义 |
| **包含双引号** | ✅ `'He said "Hi"'` | ✅ `$$He said "Hi"$$` |
| **多行文本** | ❌ 不支持真正多行 | ✅ 支持多行 |
| **嵌套使用** | ❌ 很难嵌套 | ✅ 用标签嵌套 |
| **函数定义** | ❌ 需要大量转义 | ✅ **推荐使用** |
| **性能** | 相同 | 相同 |
| **可移植性** | ✅ SQL 标准 | ❌ PostgreSQL 特有 |

**使用建议：**

```sql
-- ✅ 简单字符串 → 单引号
SELECT first_name FROM employees WHERE last_name = 'Smith';

-- ✅ 包含引号 → 美元引号
INSERT INTO companies (name) VALUES ($$O'Brien's Pizza$$);

-- ✅ 多行文本 → 美元引号
INSERT INTO articles (content) VALUES ($$
第一段内容
第二段内容
$$);

-- ✅ 函数定义 → 美元引号（必须）
CREATE FUNCTION ... AS $$ ... $$ LANGUAGE plpgsql;

-- ✅ 嵌套场景 → 带标签的美元引号
SELECT $outer$ ... $inner$ ... $inner$ ... $outer$;
```
