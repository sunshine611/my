# 数据库交互

## 连接 mysql 数据库

```go
package main

import (
	"database/sql"
	"fmt"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

func init() {
	connstr := "{数据库用户名}:{数据库密码}@tcp({服务器ip地址}:{端口})/{库名}"
	var err error
	db, err = sql.Open("mysql", connstr)
	if err != nil {
		fmt.Println("open mysql failed,", err)
		return
	}
	db.SetConnMaxLifetime(time.Second * 30) // 30s
	db.SetMaxOpenConns(2)
	db.SetMaxIdleConns(10)
}

type User struct {
	ID        int
	UserName  string
	Email     string
	CreatedAt string
}

func main() {
	// 单行查询
	row := db.QueryRow("SELECT id, username, email, created_at FROM users where id=1")
	if row.Err() != nil {
		fmt.Println("query failed,", row.Err())
		return
	}
	var user User
	err := row.Scan(&user.ID, &user.UserName, &user.Email, &user.CreatedAt)
	if err != nil {
		fmt.Println("scan failed,", err)
		return
	}
	fmt.Printf("User: %+v\n", user)
	fmt.Println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
	// 多行查询
	// rows, err := db.Query("SELECT id, username, email, created_at FROM users")
	// 预编译查询
	stmt, err := db.Prepare("SELECT id, username, email, created_at FROM users where id<?")
	if err != nil {
		fmt.Println("prepare failed,", err)
		return
	}
	rows, err := stmt.Query(10)
	if err != nil {
		fmt.Println("query failed,", err)
		return
	}

	for rows.Next() { // Next拨动到当前行,Scan才能读取当前行的数据
		var user User
		err := rows.Scan(&user.ID, &user.UserName, &user.Email, &user.CreatedAt)
		if err != nil {
			fmt.Println("scan failed,", err)
			return
		}
		fmt.Printf("User: %+v\n", user)
	}
}

```
