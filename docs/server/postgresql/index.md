# PostgreSQL

::: tip 什么是 PostgreSQL？
PostgreSQL（常简称为 Postgres）是一个功能强大的开源对象关系型数据库管理系统（ORDBMS），拥有超过 35 年的发展历史。它以稳定性、数据完整性和正确性著称。
:::

## 一、PostgreSQL 概述

### 核心特点

- 完全开源，BSD 许可证
- 强大的 SQL 标准支持
- 支持复杂查询、外键、触发器、视图
- 支持 ACID 事务
- 多版本并发控制（MVCC）
- 高度可扩展

### 为什么选择 PostgreSQL？

**相比 MySQL：**

- 更严格的数据完整性检查
- 更强大的 JSON/JSONB 支持（对你的多租户配置很重要）
- 更好的复杂查询性能
- 更丰富的数据类型
- 更强大的全文搜索

**相比 MongoDB：**

- 同时支持结构化和非结构化数据（JSONB）
- ACID 事务保证
- 强大的关系型查询能力
- 更成熟的生态系统

## 二、核心概念

### 1.数据库架构层次

    集群 (Cluster)
    └── 数据库 (Database)
        └── 模式 (Schema)
            └── 表 (Table)
                ├── 列 (Column)
                ├── 行 (Row)
                └── 索引 (Index)

**实例**

```sql
-- 创建数据库
CREATE DATABASE saas_system;

-- 连接到数据库
\c saas_system

-- 创建模式（命名空间）
CREATE SCHEMA site_data;
CREATE SCHEMA admin_data;

-- 在不同模式下创建表
CREATE TABLE site_data.users (...);
CREATE TABLE admin_data.settings (...);

-- 访问不同模式的表
SELECT * FROM site_data.users;
SELECT * FROM admin_data.settings;
```

### 2.ACID 特性

PostgreSQL 完全支持 ACID：

**Atomicity（原子性）**

```sql
BEGIN;
    INSERT INTO accounts (user_id, balance) VALUES (1, 1000);
    INSERT INTO transactions (user_id, amount) VALUES (1, 1000);
    -- 如果任何一条失败，全部回滚
COMMIT;
```

**Consistency（一致性）**

```sql
-- 通过约束保证一致性
ALTER TABLE users ADD CONSTRAINT check_age CHECK (age >= 0 AND age <= 150);
```

**Isolation（隔离性）**

```sql
-- 事务隔离级别
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
-- 或 REPEATABLE READ, SERIALIZABLE
```

**Durability（持久性）**

- WAL (Write-Ahead Logging) 机制保证数据持久化
- 即使系统崩溃,已提交的事务也不会丢失

### 3.MVCC(多版本并发控制)

PostgreSQL 的核心优势之一：

**工作原理:**

- 读操作不会阻塞写操作
- 写操作不会阻塞读操作
- 每个事务看到的是数据的快照

示例:

```sql
-- 事务 1
BEGIN;
SELECT balance FROM accounts WHERE id = 1;  -- 看到 1000
-- 此时事务 2 修改了这条记录

-- 事务 2
BEGIN;
UPDATE accounts SET balance = 2000 WHERE id = 1;
COMMIT;

-- 回到事务 1
SELECT balance FROM accounts WHERE id = 1;  -- 仍然看到 1000（快照）
COMMIT;
```

## 三、数据类型详解

### 1.数值类型

```sql
CREATE TABLE products (
    -- 整数类型
    id SERIAL PRIMARY KEY,              -- 自增整数（1 到 2,147,483,647）
    bigid BIGSERIAL,                    -- 大整数（1 到 9,223,372,036,854,775,807）
    smallid SMALLSERIAL,                -- 小整数（1 到 32,767）

    count INTEGER,                      -- 标准整数
    big_count BIGINT,                   -- 大整数
    small_count SMALLINT,               -- 小整数

    -- 精确数值（推荐用于金额）
    price NUMERIC(10, 2),               -- 10位数字，2位小数
    total DECIMAL(15, 2),               -- 与 NUMERIC 相同

    -- 浮点数（不精确，不要用于金额）
    rating REAL,                        -- 单精度
    score DOUBLE PRECISION              -- 双精度
);

-- 金额计算示例
SELECT
    price * 1.1 AS price_with_tax,     -- NUMERIC 保证精确
    ROUND(price * 1.1, 2) AS rounded   -- 四舍五入
FROM products;
```

### 2.字符类型

```sql
CREATE TABLE content (
    -- VARCHAR 有长度限制
    username VARCHAR(50),               -- 最多 50 字符
    email VARCHAR(255),                 -- 最多 255 字符

    -- CHAR 固定长度（不推荐）
    code CHAR(10),                      -- 总是 10 字符，不足自动填充空格

    -- TEXT 无长度限制（推荐）
    description TEXT,                   -- 无限制
    article TEXT                        -- 存储长文本
);

-- 性能提示：
-- VARCHAR(n) 和 TEXT 性能几乎相同
-- 推荐：短字段用 VARCHAR(n)，长字段用 TEXT
```

### 3.日期时间类型

```sql
CREATE TABLE events (
    -- 日期
    event_date DATE,                    -- 只存储日期：2025-12-10

    -- 时间
    event_time TIME,                    -- 只存储时间：14:30:00

    -- 日期+时间（不带时区）
    created_at TIMESTAMP,               -- 2025-12-10 14:30:00

    -- 日期+时间（带时区）★推荐
    updated_at TIMESTAMP WITH TIME ZONE, -- 2025-12-10 14:30:00+08

    -- 时间间隔
    duration INTERVAL                   -- 2 hours 30 minutes
);

-- 时区处理
SELECT NOW();                           -- 当前时间（带时区）
SELECT CURRENT_TIMESTAMP;               -- 同上
SELECT CURRENT_DATE;                    -- 当前日期
SELECT CURRENT_TIME;                    -- 当前时间

-- 时间计算
SELECT NOW() + INTERVAL '7 days';       -- 7天后
SELECT NOW() - INTERVAL '1 month';      -- 1个月前
SELECT AGE(TIMESTAMP '2025-12-10', TIMESTAMP '2000-01-01'); -- 计算年龄

-- 提取时间部分
SELECT EXTRACT(YEAR FROM NOW());        -- 提取年份
SELECT EXTRACT(MONTH FROM NOW());       -- 提取月份
SELECT DATE_TRUNC('day', NOW());        -- 截断到天
```

### 4.布尔类型

```sql
CREATE TABLE settings (
    is_active BOOLEAN DEFAULT TRUE,
    is_public BOOLEAN DEFAULT FALSE
);

-- 布尔值表示
INSERT INTO settings VALUES (TRUE, FALSE);
INSERT INTO settings VALUES ('yes', 'no');      -- 也可以
INSERT INTO settings VALUES (1, 0);             -- 也可以
INSERT INTO settings VALUES ('t', 'f');         -- 也可以

-- 查询
SELECT * FROM settings WHERE is_active;         -- TRUE 的记录
SELECT * FROM settings WHERE NOT is_active;     -- FALSE 的记录
```

### 5.JSON 和 JSONB 类型 ★ 重要

```sql
CREATE TABLE sites (
    id SERIAL PRIMARY KEY,
    site_id VARCHAR(50),
    name VARCHAR(255),

    -- JSON：存储原始文本，查询慢
    config_json JSON,

    -- JSONB：二进制格式，查询快，推荐使用 ★
    config JSONB
);

-- 插入 JSON 数据
INSERT INTO sites (site_id, name, config) VALUES (
    'site001',
    'Demo Site',
    '{"theme": "dark", "language": "zh-CN", "features": {"chat": true, "payment": false}}'
);

-- 查询 JSON 字段
SELECT
    config->>'theme' AS theme,                  -- 获取文本值
    config->'features'->>'chat' AS chat_enabled -- 嵌套访问
FROM sites;

-- JSON 操作符
-- -> 返回 JSON 对象
-- ->> 返回文本
-- #> 通过路径访问
-- #>> 通过路径访问（返回文本）

-- 查询包含特定键的记录
SELECT * FROM sites WHERE config ? 'theme';

-- 查询特定值
SELECT * FROM sites WHERE config->>'theme' = 'dark';

-- 查询嵌套值
SELECT * FROM sites WHERE config->'features'->>'chat' = 'true';

-- 包含查询（@> 操作符）
SELECT * FROM sites WHERE config @> '{"theme": "dark"}';

-- 更新 JSON 字段
UPDATE sites
SET config = jsonb_set(config, '{theme}', '"light"')
WHERE site_id = 'site001';

-- 添加新字段
UPDATE sites
SET config = config || '{"newField": "value"}'
WHERE site_id = 'site001';

-- 删除字段
UPDATE sites
SET config = config - 'oldField'
WHERE site_id = 'site001';

-- 为 JSONB 创建索引（重要！）
CREATE INDEX idx_sites_config ON sites USING GIN(config);
CREATE INDEX idx_sites_theme ON sites ((config->>'theme'));
```

**JSONB vs JSON 对比：**

|   **特性**   | **JSON** |    **JSONB**     |
| :----------: | :------: | :--------------: |
|   存储格式   |   文本   |      二进制      |
|   写入速度   |    快    |  稍慢(需要转换)  |
|   查询速度   |    慢    |        快        |
|   空格保留   |    是    |        否        |
|  键顺序保留  |    是    |        否        |
|   支持索引   |    否    |       是 ★       |
| **推荐使用** |   很少   | **绝大多数情况** |

### 6. 数组类型

```sql
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title TEXT,
    tags TEXT[],                        -- 文本数组
    scores INTEGER[]                    -- 整数数组
);

-- 插入数组
INSERT INTO posts (title, tags, scores) VALUES (
    'PostgreSQL Tutorial',
    ARRAY['database', 'sql', 'tutorial'],
    ARRAY[5, 4, 5, 3]
);

-- 另一种插入方式
INSERT INTO posts (title, tags) VALUES (
    'Another Post',
    '{"tag1", "tag2", "tag3"}'
);

-- 查询数组
SELECT * FROM posts WHERE 'database' = ANY(tags);   -- 包含某个值
SELECT * FROM posts WHERE tags @> ARRAY['sql'];     -- 包含子集
SELECT * FROM posts WHERE tags && ARRAY['sql', 'nosql']; -- 有交集

-- 数组函数
SELECT array_length(tags, 1) FROM posts;            -- 数组长度
SELECT unnest(tags) FROM posts;                     -- 展开数组
```

### 7.UUID 类型

```sql
-- 启用 UUID 扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50)
);

-- 插入
INSERT INTO users (username) VALUES ('alice');  -- id 自动生成

-- 查询
SELECT * FROM users WHERE id = '550e8400-e29b-41d4-a716-446655440000';
```

### 8. 枚举类型

```sql
-- 创建枚举类型
CREATE TYPE site_status AS ENUM ('active', 'suspended', 'deleted');

CREATE TABLE sites (
    id SERIAL PRIMARY KEY,
    site_id VARCHAR(50),
    status site_status DEFAULT 'active'
);

-- 使用枚举
INSERT INTO sites (site_id, status) VALUES ('site001', 'active');

-- 查询
SELECT * FROM sites WHERE status = 'active';

-- 修改枚举（添加新值）
ALTER TYPE site_status ADD VALUE 'archived';
```

## 四、索引详解

索引是提高查询性能的关键！

### 1.索引类型

```sql
-- B-tree 索引（默认，最常用）
CREATE INDEX idx_users_email ON users(email);

-- 复合索引（多列）
CREATE INDEX idx_users_site_email ON users(site_id, email);

-- 唯一索引
CREATE UNIQUE INDEX idx_users_username ON users(username);

-- 部分索引（只索引符合条件的行）
CREATE INDEX idx_active_users ON users(email) WHERE status = 'active';

-- 表达式索引
CREATE INDEX idx_users_lower_email ON users(LOWER(email));

-- GIN 索引（用于 JSONB、数组、全文搜索）
CREATE INDEX idx_config ON sites USING GIN(config);
CREATE INDEX idx_tags ON posts USING GIN(tags);

-- GiST 索引（用于地理数据、范围类型）
CREATE INDEX idx_location ON places USING GIST(coordinates);

-- Hash 索引（等值查询，较少使用）
CREATE INDEX idx_hash ON users USING HASH(email);
```

### 2. 索引使用原则

```sql
-- ✅ 经常用于 WHERE 条件
CREATE INDEX idx_users_status ON users(status);
SELECT * FROM users WHERE status = 'active';

-- ✅ 经常用于 JOIN
CREATE INDEX idx_orders_user_id ON orders(user_id);
SELECT * FROM orders JOIN users ON orders.user_id = users.id;

-- ✅ 经常用于 ORDER BY
CREATE INDEX idx_posts_created ON posts(created_at);
SELECT * FROM posts ORDER BY created_at DESC;

-- ✅ 多租户系统的关键：site_id
CREATE INDEX idx_users_site_id ON users(site_id);
CREATE INDEX idx_posts_site_created ON posts(site_id, created_at);
```

**何时不要创建索引：**

```sql
-- ❌ 小表（几千行以下）
-- ❌ 频繁写入、很少查询的列
-- ❌ 选择性很低的列（如性别：只有男/女两个值）
-- ❌ 已经有复合索引覆盖的列
```

### 3. 查看索引使用情况

```sql
-- 查看表的所有索引
\d+ users

-- 查看索引大小
SELECT
    indexname,
    pg_size_pretty(pg_relation_size(indexname::regclass)) AS size
FROM pg_indexes
WHERE tablename = 'users';

-- 查看未使用的索引
SELECT
    schemaname,
    tablename,
    indexname,
    idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0
ORDER BY pg_relation_size(indexname::regclass) DESC;
```

## 五、查询基础

### 1.基本查询

```sql
-- 查询所有列
SELECT * FROM users;

-- 查询特定列
SELECT username, email FROM users;

-- 去重
SELECT DISTINCT site_id FROM users;

-- 限制结果数量
SELECT * FROM users LIMIT 10;

-- 跳过前 N 条（分页）
SELECT * FROM users LIMIT 10 OFFSET 20;  -- 第3页，每页10条

-- 更好的分页方式（使用游标）
SELECT * FROM users
WHERE id > 100  -- 上一页最后一条的 id
ORDER BY id
LIMIT 10;
```

### 2. WHERE 条件

```sql
-- 基本条件
SELECT * FROM users WHERE age >= 18;
SELECT * FROM users WHERE status = 'active';

-- 多条件
SELECT * FROM users WHERE age >= 18 AND status = 'active';
SELECT * FROM users WHERE city = 'Beijing' OR city = 'Shanghai';

-- IN 操作符
SELECT * FROM users WHERE city IN ('Beijing', 'Shanghai', 'Shenzhen');

-- BETWEEN
SELECT * FROM orders WHERE created_at BETWEEN '2025-01-01' AND '2025-12-31';

-- LIKE 模糊查询
SELECT * FROM users WHERE email LIKE '%@gmail.com';
SELECT * FROM users WHERE username LIKE 'admin%';  -- admin 开头
SELECT * FROM users WHERE username LIKE '%user%';  -- 包含 user

-- ILIKE（不区分大小写）
SELECT * FROM users WHERE email ILIKE '%@GMAIL.COM';

-- IS NULL / IS NOT NULL
SELECT * FROM users WHERE deleted_at IS NULL;
SELECT * FROM users WHERE phone IS NOT NULL;

-- 正则表达式
SELECT * FROM users WHERE email ~ '^[a-z]+@gmail\.com$';
```

### 3. 排序

```sql
-- 升序（默认）
SELECT * FROM users ORDER BY created_at ASC;
SELECT * FROM users ORDER BY created_at;  -- ASC 可省略

-- 降序
SELECT * FROM users ORDER BY created_at DESC;

-- 多列排序
SELECT * FROM users ORDER BY site_id ASC, created_at DESC;

-- NULL 值处理
SELECT * FROM users ORDER BY last_login NULLS FIRST;  -- NULL 排在前面
SELECT * FROM users ORDER BY last_login NULLS LAST;   -- NULL 排在后面
```

### 4. 聚合函数

```sql
-- 计数
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM users WHERE status = 'active';
SELECT COUNT(DISTINCT site_id) FROM users;  -- 去重计数

-- 求和
SELECT SUM(amount) FROM orders;
SELECT SUM(amount) FROM orders WHERE site_id = 'site001';

-- 平均值
SELECT AVG(age) FROM users;
SELECT AVG(rating) FROM products;

-- 最大值/最小值
SELECT MAX(created_at) FROM users;
SELECT MIN(price) FROM products;

-- 分组统计
SELECT site_id, COUNT(*) as user_count
FROM users
GROUP BY site_id;

SELECT site_id, status, COUNT(*) as count
FROM users
GROUP BY site_id, status
ORDER BY site_id, status;

-- HAVING（对分组结果过滤）
SELECT site_id, COUNT(*) as user_count
FROM users
GROUP BY site_id
HAVING COUNT(*) > 100;  -- 只显示用户数 > 100 的站点
```

### 5. JOIN 连接查询

```sql
-- INNER JOIN（只返回匹配的行）
SELECT u.username, o.order_id, o.amount
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN（返回左表所有行，右表没匹配则为 NULL）
SELECT u.username, o.order_id
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- 针对多租户系统的 JOIN
SELECT
    s.name AS site_name,
    COUNT(u.id) AS user_count
FROM sites s
LEFT JOIN users u ON s.site_id = u.site_id
GROUP BY s.site_id, s.name
ORDER BY user_count DESC;

-- 多表 JOIN
SELECT
    u.username,
    o.order_id,
    p.product_name,
    oi.quantity
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE u.site_id = 'site001';
```

## 六、高级特性

### 1. CTE（通用表表达式）

让复杂查询更清晰：

```sql
-- 基本 CTE
WITH active_users AS (
    SELECT * FROM users WHERE status = 'active'
)
SELECT site_id, COUNT(*)
FROM active_users
GROUP BY site_id;

-- 多个 CTE
WITH
    site_stats AS (
        SELECT site_id, COUNT(*) as user_count
        FROM users
        GROUP BY site_id
    ),
    order_stats AS (
        SELECT site_id, SUM(amount) as total_amount
        FROM orders
        GROUP BY site_id
    )
SELECT
    s.name,
    us.user_count,
    COALESCE(os.total_amount, 0) as total_amount
FROM sites s
LEFT JOIN site_stats us ON s.site_id = us.site_id
LEFT JOIN order_stats os ON s.site_id = os.site_id;

-- 递归 CTE（例如：组织架构树）
WITH RECURSIVE org_tree AS (
    -- 根节点
    SELECT id, name, parent_id, 1 as level
    FROM departments
    WHERE parent_id IS NULL

    UNION ALL

    -- 递归部分
    SELECT d.id, d.name, d.parent_id, ot.level + 1
    FROM departments d
    JOIN org_tree ot ON d.parent_id = ot.id
)
SELECT * FROM org_tree ORDER BY level, id;
```

### 2. 窗口函数

```sql
-- ROW_NUMBER（行号）
SELECT
    site_id,
    username,
    created_at,
    ROW_NUMBER() OVER (PARTITION BY site_id ORDER BY created_at) as row_num
FROM users;

-- RANK（排名，可能有并列）
SELECT
    username,
    score,
    RANK() OVER (ORDER BY score DESC) as rank
FROM game_scores;

-- LAG / LEAD（访问前一行/后一行）
SELECT
    date,
    sales,
    LAG(sales) OVER (ORDER BY date) as prev_day_sales,
    LEAD(sales) OVER (ORDER BY date) as next_day_sales
FROM daily_sales;

-- 计算增长率
SELECT
    date,
    sales,
    sales - LAG(sales) OVER (ORDER BY date) as growth,
    ROUND((sales - LAG(sales) OVER (ORDER BY date)) * 100.0 / LAG(sales) OVER (ORDER BY date), 2) as growth_rate
FROM daily_sales;
```

### 3. 事务

```sql
-- 开始事务
BEGIN;

-- 执行操作
INSERT INTO accounts (user_id, balance) VALUES (1, 1000);
UPDATE accounts SET balance = balance - 100 WHERE user_id = 1;
INSERT INTO transactions (user_id, amount, type) VALUES (1, -100, 'debit');

-- 提交（成功时）
COMMIT;

-- 或回滚（出错时）
ROLLBACK;

-- 保存点（部分回滚）
BEGIN;
    INSERT INTO users (username) VALUES ('alice');
    SAVEPOINT sp1;
    INSERT INTO users (username) VALUES ('bob');
    SAVEPOINT sp2;
    INSERT INTO users (username) VALUES ('charlie');

    -- 只回滚到 sp2
    ROLLBACK TO sp2;

COMMIT;  -- alice 和 bob 会被提交
```

### 4. 约束

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,                     -- 主键约束

    username VARCHAR(50) NOT NULL,             -- 非空约束
    email VARCHAR(255) NOT NULL UNIQUE,        -- 唯一约束

    age INTEGER CHECK (age >= 0 AND age <= 150), -- 检查约束

    site_id VARCHAR(50) NOT NULL,
    FOREIGN KEY (site_id) REFERENCES sites(site_id) -- 外键约束
        ON DELETE CASCADE                        -- 级联删除
        ON UPDATE CASCADE,                       -- 级联更新

    status VARCHAR(20) DEFAULT 'active',       -- 默认值

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uk_site_username UNIQUE (site_id, username) -- 复合唯一约束
);
```

## 七、性能优化

### 1. EXPLAIN ANALYZE

分析查询性能的最重要工具：

```sql
-- 查看查询计划
EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';

-- 实际执行并分析
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';

-- 输出示例：
/*
Seq Scan on users  (cost=0.00..18.50 rows=1 width=100) (actual time=0.020..0.025 rows=1 loops=1)
  Filter: (email = 'test@example.com')
  Rows Removed by Filter: 499
Planning Time: 0.080 ms
Execution Time: 0.045 ms
*/

-- 如果看到 Seq Scan（全表扫描），考虑添加索引
CREATE INDEX idx_users_email ON users(email);

-- 再次执行，应该看到 Index Scan
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
/*
Index Scan using idx_users_email on users  (cost=0.28..8.29 rows=1 width=100)
  Index Cond: (email = 'test@example.com')
*/
```

### 2. VACUUM 和 ANALYZE

```sql
-- VACUUM：清理死元组（MVCC 产生的旧版本数据）
VACUUM users;
VACUUM FULL users;  -- 完全清理，但会锁表

-- ANALYZE：更新统计信息，帮助查询优化器
ANALYZE users;

-- 组合使用
VACUUM ANALYZE users;

-- 查看表膨胀
SELECT
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### 3. 连接池

在应用层使用连接池（如 pgbouncer）：

```yaml
// 在 gin-vue-admin 中配置
postgres:
  max-idle-conns: 10      // 最大空闲连接
  max-open-conns: 100     // 最大打开连接
```
