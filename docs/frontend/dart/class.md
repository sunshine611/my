# 类与对象

## Dart 类

- 类是通过 class 声明的代码段,包含属性和方法
  - 属性: 用来描述类的变量
  - 方法: 类中的函数称为类的方法
- 对象是类的 **实例化** 结果 `var obj = new MyClass();`
- 编程方式
  - 面向对象编程 (OOP)
  - 面向过程编程(函数编程) (POP)

```dart
void main(){
    // 实例化类,得到一个对象
    Person p = new Person();

    // 访问类中的属性
    print(p.name);  // result:张三

    // 访问类中的方法
    p.getInfo();    // result:我的名字是: 张三

    // Dart 中所有的内容都是对象
    Map m = new Map();  // Map本质也是类,Dart 内置的类
    print(m.length);    // result:0
}

// 声明类
class Person{
    // 类的属性
    String name = '张三';
    // 类的方法
    void getInfo(){
        print('我的名字是 $name');
    }
}
```

## 构造器(构造函数)

- 默认构造函数: 与类同名的函数,在实例化时,自动被调用
- 命名构造函数: 在类中使用命名构造器( **类名.函数名** )实现多个构造器,可以提供额外的清晰度
- 常量构造函数: 如果类生成的对象不会改变,那就可以通过常量构造函数使这些对象成为编译时常量

### 默认构造函数

```dart
// 默认构造函数
void main(){
  Point p = new Point();  // result: 我是默认构造函数,实例化时会第一个被调用
  print('${p.x},${p.y}'); // result: 0,null
}

class Point{
  num? x,y;

  // 声明普通构造函数
  Point(){
    print('我是默认构造函数,实例化时会第一个被调用');

    // this可以省略,但是当命名指向有歧义时,this 不能省略(比如参数是x,类里面又定义x,两者是不一样的)
    this.x=0;
  }
}
```

```dart
// 带参默认构造函数,如果默认构造函数带参数,那么实例化类的时候必须带参数
void main() {
  Point p = new Point(1, 2);
  print('${p.x},${p.y}'); // result: 1,2
}

class Point {
  num? x, y;
  // 声明带参数的普通构造函数,简写: Point(this.x,this.y);
  Point(x, y) {
    this.x = x;
    this.y = y;
  }
}
```

### 命名构造函数

```dart
// 命名构造函数
void main() {
  Point p1 = Point(10, 20);
  print('${p1.x}, ${p1.y}'); // result:10,20

  Point p2 = Point.origin();
  print('${p2.x}, ${p2.y}'); // result:0,0

  Point p3 = Point.fromJson();
  print('${p3.x}, ${p3.y}'); // result:0,1  ,不传参数的时候,默认值设定的是x=0,y=1

  Point p4 = Point.fromJson(x: 100, y: 200);
  print('${p4.x}, ${p4.y}'); // result:100,200
}

class Point {
  num? x, y;
  Point(this.x, this.y);

  // 命名构造函数,简写方式: Point.origin() : x = 0, y = 0;
  Point.origin() {
    this.x = 0;
    this.y = 0;
  }

  // 命名构造函数fromJson,默认x,y的参数时0,1. 简写方式: Point.fromJson({x = 0, y = 1}) : x = x, y = y;
  Point.fromJson({x = 0, y = 1}) {
    this.x = x;
    this.y = y;
  }
}
```

### 常量构造函数

```dart
// 常量构造函数
```
