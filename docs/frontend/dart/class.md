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
- 工厂构造函数: 通过 factory 声明,工厂函数不会自动生成实例,而是通过代码来决定返回的实例

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
void main() {
  Point p1 = Point(1, 2);
  Point p2 = Point(1, 2);
  print(p1 == p2);  // result: false,因为在内存当中地址并不一样

  // 常量构造函数,可以当作普通构造函数使用
  ImmutablePoint ip1 = ImmutablePoint(1, 2);
  ImmutablePoint ip2 = ImmutablePoint(1, 2);
  print(ip1 == ip2);  // result: false

  // 声明不可变对象,必须通过 const 关键字
  ImmutablePoint ip3 = const ImmutablePoint(1, 2);
  ImmutablePoint ip4 = const ImmutablePoint(1, 2);
  print(ip3 == ip4);  // result: true,使用 const 声明的常量构造函数,只要参数是一致的,它们就相等.
}

class Point {
  num? x, y;
  Point(this.x, this.y);
}

//常量构造函数
class ImmutablePoint {
  // 属性必须通过 final 声明
  final num x;
  final num y;

  // 常量构造函数,必须通过 const 声明
  const ImmutablePoint(this.x, this.y);
}
```

### 工厂构造函数

```dart
void main() {
  Person p1 = Person('关羽');
  print(p1.name); // result:关羽

  Person p2 = Person('张飞');
  print(p2.name); // result:关羽,因为p1已经实例化过了

  print(p1 == p2);  // result: true
}

class Person {
  String? name;

  static Person? instance; // instance 是静态变量,Person类的静态属性,使用static修饰

  // 工厂构造函数
  factory Person([String name = '刘备']) {
    // 工厂构造函数中,不能使用 this 关键字,因为它不会自动生成实例
    // print(this.name);  //这样写不允许的
    if (Person.instance == null) {
      // 判断instance是不是第一次实例化,假如第一次调用就赋值
      Person.instance = Person.newSelf(name);
    }
    // 返回现存的实例，使用 ! 断言不为null
    return Person.instance!;
  }

  // 命名构造函数
  Person.newSelf(this.name);
}
```

## 访问修饰

- Dart 与 TypeScript 不同,没有访问修饰符(public、protected、private)
- Dart 类中,默认的访问修饰符是公开的(即 public)
- 如果 **属性** 或 **方法** 以`_`(下划线)开头,则表示私有(即 private)
- **只有把类单独抽离出去,私有属性和方法才起作用**

```dart
void main(){
  Person p = Person('张三');
  print(p.name);  // result:张三

  // 访问私有属性
  print(p._money); // result:100,因为Person类和main函数在同一个文件中，所以可以访问
}

class Person{
  String? name;

  // 声明私有属性
  num _money=100;

  Person(this.name);
}
```

---

```dart
// 文件目录在lib文件下的Person.dart
class Person{
  String? name;

  // 声明私有属性
  num _money=100;

  Person(this.name);

  //设定一个公共的方法,就可以通过公共的方法访问_money这个Person类的私有属性
  num getMoney(){
    return this._money;
  }

  // 声明私有方法
  void _wife() {
    print('我是 $name 的妻子');
  }
}
```

```dart
// 文件目录和lib同级的main方法入口
import './lib/Person.dart';
void main(){
  Person p = Person('张三');
  print(p.name);  // result:张三

  // 访问私有属性
  print(p._money); // result:Error,此时不能访问Person类里面的私有属性 // [!code error]

  print(p.getMoney());  // result: 100

  // 访问私有方法
  p._wife(); // result:Error,无法访问Person类里面的私有方法 // [!code error]
}
```

## Getter 与 Setter

- Getter(获取器): 是通过 get 关键字修饰的方法
  - 函数没有小括号,访问时也没有小括号(**像访问属性一样访问方法**)
- Setter(修改器): 是通过 set 关键字修饰的方法
  - 访问时,像设置属性一样给函数传参

```dart
void main() {
  Circle c = Circle(10);
  print(c.area()); // result:314.15926...

  // 使用 get 声明的方法,访问方法就像访问属性一样,不需要带括号
  print(c.getArea); // result:314.15926...

  // 通过 Setter 修改属性
  c.setR = 20; // 通过 set 声明的方法,赋值就像属性一样赋值
  print(c.getArea);
}

// 圆的类
class Circle {
  final double PI = 3.1415926; // 𝛑 圆周率

  num? r; // 圆的半径

  Circle(this.r);

  // 返回圆的面积
  num area() {
    return PI * r! * r!;
  }

  // Getter,返回圆的面积,使用 get 声明的方法,不能有小括号
  num get getArea {
    return PI * r! * r!;
  }

  // Setter,重新设置圆的半径
  set setR(val) {
    r = val;
  }
}
```

## 构造函数的初始化列表

- 作用: 在构造函数中设置属性的默认值
- 时机: 在构造函数体执行之前执行
- 语法: 使用逗号分隔初始化表达式
- 场景: 常用于设置 final 常量的值

```dart
void main(){
  Rect r = new Rect();  // result:  2 -- 10
}

class Rect{
  int? height,width;

  // 此种方式实例化 Rect 类时必须传值
  <!-- Rect(this.height,this.width); -->

  // 可选参数,初始化写法
  <!-- Rect([int height = 2,int width = 10]){
    this.height = height;
    this.width = width;
    print('${this.height} -- ${this.width}');
  } -->

  // 命名可选参数,初始化写法
  <!-- Rect({int height = 2,int width = 10}){
    this.height = height;
    this.width = width;
    print('${this.height} -- ${this.width}');
  } -->

  // 初始化列表写法,加不加this都可以
  Rect()
      : height = 2,
        this.width = 10 {
    print('${this.height} -- ${this.width}');
  }
}
```

---

```dart
// 初始化列表写法
void main() {
  Point p1 = Point(1, 2, 3);
  print(p1.z); // result: 3.0 ,因为z是double类型

  Point p2 = Point.twoD(8, 9);
  print(p2.z); // result: 0.0
}

class Point {
  double x, y, z;

  Point(this.x, this.y, this.z);

  // 获取2d坐标,初始化列表的特殊用法(重定向构造函数),这里的this指向Point构造函数
  Point.twoD(double x, double y) : this(x, y, 0);
}
```

## static

- static 关键字用来指定静态成员
  - 通过 static 修饰的属性是静态属性
  - 通过 static 修饰的方法是静态方法
- **静态成员可以通过类名称直接访问(不需要实例化)**
  - 实例化是比较消耗资源的,声明静态成员,可以提高程序性能
- 静态方法不能访问非静态成员,非静态方法可以访问静态成员
  - 静态方法中不能使用 this 关键字
  - 不能使用 this 关键字,访问静态属性

```dart
void main(){
  // 静态成员,可以通过类名直接访问;不能通过类名直接访问非静态方法和属性
  print(Person.name); // result: 张三
  Person.printInfo(); // result: 张三

  Person p = Person();
  // print(p.name);  // 不能通过实例化对象 p 去访问静态方法和属性  // [!code error]
  print(p.age); // result: 18
  p.printUserInfo();  // result: 张三  18  张三
}

class Person{
  // 静态属性
  static String name = '张三';
  int age = 18;

  // 静态方法
  static void printInfo(){
    // print(this.name); // 不能通过this访问静态成员 // [!code error]
    print(name);

    // print(age); // 静态方法不能访问非静态属性 // [!code error]

    // printUserInfo();  // 静态方法里面不能访问非静态方法  // [!code error]
  }

  // 非静态方法可以访问静态属性
  printUserInfo(){
    print(name);
    print(age);
    printInfo();  // 非静态方法可以访问静态方法 // [!code default]
  }
}
```

## 元数据

- 元数据以 @ 开头,可以给代码标记一些额外的信息
  - 元数据可以写在库、类、构造器、函数、字段、参数或变量声明的前面
- @override (**重写**): 某方法添加该注解后, 表示重写了父类中的同名方法
- @required (**必填**): 可以通过 @required 来注解 Dart 中的命名参数,用来指示它是必填参数
- @deprecated (**弃用**): 若某类或某方法加上该注解之后,表示此方法或类不再建议使用

```dart
void main(){
  Phone p = Phone();

  p.actived();  // result: 开机;能用,但是不赞成使用

  p.turnOn(); // result: 开机
}

class Phone {
  // 这是旧版本中的开机方法,会在将来的版本中移除
  @deprecated('请使用turnOn替代actived')
  actived() {
    turnOn();
  }

  turnOn() {
    print('开机');
  }
}
```

## 继承 (extends)

- 根据类的先后顺序,可以将类分成**父类**和**子类**
- 子类通过 **extends** 关键字 **继承** 父类
  - 继承后,子类可以使用父类中,可见的内容(属性或方法)
- 子类中,可以通过 **@override** 元数据来标记“重写”方法
  - “重写”方法: 子类中与父类中同名的方法
- 子类中,可以通过 **super** 关键字来引用父类中,可见的内容
  - 属性
  - 方法(普通构造函数,命名构造函数)

```
文件结构

├─ lib
│  ├─ Father.dart
│  └─ Son.dart
└─ main.dart
```

### 继承的特性

::: code-group

```dart [main.dart]
import 'lib/Father.dart'; // 引入Father类
import 'lib/Son.dart';  // 引入Son类

void main(){
  Father f = Father();
  print(f.name);  // result:刘备

  Son s = Son();
  print(s.name);  // result:刘备,因为Son继承父类,所以可以获取父类可见的name属性
  print(s._money); // result:error,因为_money是father父类的私有属性,子类不能访问 // [!code --]
  print(s.getMoney);  // result:10000, 子类可以通过另外的方式获取到父类 _money 的值 // [!code ++]
  s.say();  // result:我是刘备,因为Son继承父类,所以可以获取父类可见的say方法
  //第一句是子类引用了父类的target方法,同时因为子类重写了父类的target方法,所以子类实例化对象调用的是子类的方法.
  s.target(); // result:刘备:我的目标是恢复汉室江山!    刘禅:我没有目标
}
```

```dart [Father.dart]
// 父类
class Father{
  String name = "刘备";
  int _money = 10000;

  say(){
    print('我是$name');
  }
  target(){
    print('刘备:我的目标是恢复汉室江山!');
  }
  // 通过Getter写一个获取_money私有属性的方法
  get getMoney => _money;
}
```

```dart [Son.dart]
import 'Father.dart'; //引入父类

// 子类,继承了Father父类
class Son extends Father {

  @override
  target(){
    super.target(); // 引用了父类的方法
    print('刘禅:我没有目标');
  }

}
```

:::

### 构造函数和命名构造函数的继承

::: code-group

```dart [main.dart]
import 'lib/Father.dart'; // 引入Father类
import 'lib/Son.dart';  // 引入Son类

void main(){
  Father f = Father('皇帝');
  print(f.job); // result:皇帝
  f.say();  // result: 我是刘备,我的职位是皇帝

  Son s = Son('皇太子');
  print(s.job); // result:皇太子
  s.say();  // 我是刘禅,我的职位是皇太子,我父亲的职位是皇太子.注:这里父亲的job被由于被子类构造函数的传递,变成了皇太子

  Son ss = Son.origin('卖草鞋');
  ss.sayFather(); // result: 我是刘禅,我父亲原本的工作是卖草鞋.注:这里继承了父类的命名构造函数,并把参数传给了父类
}
```

```dart [Father.dart]
// 父类
class Father{
  String name = "刘备";
  String? job;

  // 普通构造函数
  Father(this.job);

  // 命名构造函数
  Father.origin(this.job);

  say(){
    print('我是$name,我的职位是$job');
  }
}
```

```dart [Son.dart]
import 'Father.dart'; //引入父类

// 子类,继承了Father父类
class Son extends Father {
  String name = "刘禅"; // 因为子类有父类的 name 属性,所以重写了 name

  // 通过 super 继承了父类普通构造函数.注:父类写了有参构造函数,子类不写会报错
  Son(String job) : super(job); // 初始化列表的写法,这句话相当于把子类的 job 参数传递给了父类的普通构造函数

  // 继承父类的命名构造函数
  // Son(String job) : super.origin(job); // 这种写法也没问题
  Son.origin(String job) : super.origin(job);

  @override
  say(){
    print('我是$name,我的职位是$job,我父亲的职位是${super.job}');
  }

  sayFather(){
    print('我是$name,我父亲原本的工作是${super.job}');
  }
}
```

:::

## 抽象类 (abstract)

- 抽象类是用 **abstract** 关键字修饰的类
- 抽象类的作用是充当普通类的模板,约定一些必要的属性和方法
- 抽象方法是指没有方法体的方法
  - 抽象类中一般都有抽象方法,也可以没有抽象方法
  - 普通类中,不能有抽象方法
- 抽象类不能被实例化 (不能被 new)
- 抽象类可以被普通类继承 (extends)
  - 如果普通类继承抽象类,必须实现抽象类中所有的**抽象方法**
- 抽象类还可以充当接口被实现 (implements)
  - 如果把抽象类当作接口实现的话,普通类必须得实现抽象类里面定义的所有**属性和方法**

```
文件结构

├─ lib
│  ├─ Phone.dart  // 手机抽象(abstract)类
│  ├─ IPhone.dart // 苹果手机类
│  └─ Samsung.dart  // 三星手机类
└─ main.dart  // 程序运行入口
```

::: code-group

```dart [main.dart]
import './lib/IPhone.dart';
import './lib/Samsung.dart';

void main(){
  // 抽象类不能被实例化
  // Phone p = Phone(); // [!code error]

  IPhone i = IPhone();
  i.processor();  // result: A18
  i.camera(); // result: 1200万像素

  Samsung s = Samsung();
  s.processor();  // result: 高通 Gen 3
  s.camera(); // result: 2000万像素
  // Samsung 继承了 Phone ,可以使用 Phone 中的普通方法 info()
  s.info(); // result: 我是抽象类中的一个普通方法
}
```

```dart [Phone.dart]
// 1. 抽象类必须通过 abstract 关键字声明
// 2. 抽象类中可以有抽象方法,也可以没有抽象方法;但没有抽象方法的抽象类是没有意义的.
abstract class Phone{
  // 声明抽象方法
  void processor(); // 手机的处理器

  void camera();  // 手机的摄像头

  // 抽象类里面可以写普通方法
  void info(){
    print('我是抽象类中的一个普通方法');
  }
}
```

```dart [IPhone.dart]
import 'Phone.dart';

// 普通类继承了抽象类,就必须实现抽象类中所有的抽象方法
class IPhone extends Phone{
  // 实现抽象类Phone里面的processor方法
  @override
  void processor(){
    print('A18');
  }

  // 实现抽象类Phone里面的camera方法
  @override
  void camera(){
    print('1200万像素');
  }

  // 普通类中不能有抽象方法,就是没有方法体的方法
  // void screen(); // [!code error]
}
```

```dart [Samsung.dart]
import 'Phone.dart';

// 普通类继承了抽象类,就必须实现抽象类中所有的抽象方法
class Samsung extends Phone{
  // 实现抽象类Phone里面的processor方法
  @override
  void processor(){
    print('高通 Gen 3');
  }

  // 实现抽象类Phone里面的camera方法
  @override
  void camera(){
    print('2000万像素');
  }
}
```

:::

## 接口 (Interface)

- 接口在 Dart 中就是一个类 (只是用法不同)
  - 与 Java 不同, Java 中的接口需要用 interface 关键字声明; Dart 中不需要
  - 接口可以是任意类,但一般使用抽象类做接口
- 一个类可以实现 (implements) 多个接口,多个接口用逗号分隔
  - `class MyClass implements Interface1,Interface2 {...}`
  - 接口可以看成一个个小零件,类实现接口就相当于组装零件
- 普通类实现接口后,必须重写接口中所有的属性和方法

```
文件结构

├─ lib
│  ├─ Phone.dart  // 手机具体类,实现 Processor,Camera 抽象类的接口
│  ├─ Processor.dart // 处理器抽象类
│  └─ Camera.dart  // 摄像头抽象类
└─ main.dart  // 程序运行入口
```

::: code-group

```dart [main.dart]
import './lib/Phone.dart';

void main(){
  Phone p = Phone('4核','1200万');
  p.arch('5nm');  // result:芯片制程 5nm
  p.brand('蔡司');  // result:相机品牌 蔡司
}
```

```dart [Phone.dart]
import 'Processor.dart';
import 'Camera.dart';

// 通过普通类实现Processor、Camera接口
class Phone implements Processor, Camera{
  // 必须重写接口的属性和方法
  @override
  String? cores;

  @override
  String? resolution;

  // 构造函数
  Phone(this.cores,this.resolution);

  // 实现接口 Processor 里面的 arch 方法
  @override
  void arch(String? name){
    print('芯片制程 $name');
  }

  // 实现接口 Camera 里面的 brand 方法
  @override
  void brand(String? name){
    print('相机品牌 $name');
  }
}
```

```dart [Processor.dart]
// 抽象类,手机的处理器
abstract class Processor{
  String? cores; // 处理器内核:2核,4核
  arch(String name);  // 芯片制程: 7nm,5nm
}
```

```dart [Camera.dart]
// 抽象类,手机的摄像头
abstract class Camera{
  String? resolution; // 像素:1000万,2000万
  brand(String name);  // 品牌:莱卡,蔡司
}
```

:::

## 混入 (Mixin)

- 混入 (Mixin) 是一段公共代码,混入有两种声明方式:
  - 将类当作混入 `class MixinA {...}`
    - 作为 Mixin 的类只能继承自 Object ,不能继承其它类
    - 作为 Mixin 的类不能有构造函数
  - 使用 mixin 关键字声明 `mixin MixinB {...}`
- 混入 (Mixin) 可以提高代码复用的效率, 普通类可以通过 **with** 来使用混入
  - `class MyClass with MixinA, MixinB {...}`
- 使用多个混入时, 后引入的混入会覆盖之前混入中的重复的内容
  - 假定 MixinA 和 MixinB 中都有 hello() 方法, MyClass 会使用 MixinB 中的 hello() 方法

```
文件结构

├─ lib
│  ├─ MyClass.dart  // 引用了 MixinA 和 MixinB 混入的普通类
│  ├─ MixinA.dart // 普通类声明的混入
│  └─ MixinB.dart  // 使用 mixin 关键字声明的混入
└─ main.dart  // 程序运行入口
```

::: code-group

```dart [main.dart]
import './lib/MyClass.dart';

void main(){
  MyClass m = MyClass();
  m.printA(); // result:A
  m.printB(); // result:B

  // 后引入的混入,会覆盖之前引入的混入中重复的内容
  print(m.name);  // result:MixinB
  m.run();  // result:B is runing
}
```

```dart [MyClass.dart]
import 'MixinA.dart';
import 'MixinB.dart';

// MyClass 引入了 MixinA 和 MixinB 混入
class MyClass with MixinA, MixinB{

}
```

```dart [MixinA.dart]
// 使用普通类声明的混入 MixinA
// MixinA 的类只能继承自 Object ,不能继承其它类,因为它被作为 Mixin 引用了
// MixinA 也不能有构造函数, 因为它被作为 Mixin 引用了
class MixinA{
  String? name = 'MixinA';

  // MixinA(); // 被作为混入的类,不能拥有构造函数 // [!code error]

  void printA(){
    print('A');
  }

  void run(){
    print('A is runing');
  }
}
```

```dart [MixinB.dart]
//使用 mixin 声明的混入 MixinB
mixin MixinB{
  String? name = 'MixinB';

  void printB(){
    print('B');
  }

  void run(){
    print('B is runing');
  }
}
```

:::

## 泛型 (Generics)

- 泛型是在函数、类、接口中指定 **宽泛数据类型** 的语法

  - 泛型函数
  - 泛型类
  - 泛型接口

- 通常, 在尖括号( <> )中, 使用一个字母来代表类型, 例如 E,T,S,K,和 V 等
- 作用: 使用泛型可以减少重复的代码

### 泛型函数

```dart
// 泛型函数,既可以约束类型,又可以减少代码量
T getData<T>(T value){
  return value;
}

// 只约定参数类型,不约定函数返回值的类型
getInfo<T>(T value){
  return value;
}

void main(){
  // 调用泛型函数
  print(getData<int>(20));  // result:20
  print(getData<String>('Hello'));  // result:Hello
}
```

### 泛型类

::: code-group

```dart [main.dart]
import 'GenericsClass.dart';

void main(){
  // 实例化泛型类
  GenericsClass g = GenericsClass<int>();
  g.add(1);
  g.add(9);
  g.info(); // result:{1, 9}

  // 实例化泛型类
  GenericsClass gs = GenericsClass<String>();
  gs.add('Hello');
  gs.add('World');
  gs.info(); // result:{Hello, World}

  // 字面量形式泛型
  Set s = <int>{};  // 只能在该Set里面添加 int 类型的成员
}
```

```dart [GenericsClass.dart]
// 泛型类
class GenericsClass<T>{
  Set s = Set<T>();

  void add(T value){
    this.s.add(value);
  }

  void info(){
    print(this.s);
  }
}
```

:::

### 泛型接口

```
文件结构

├─ lib
│ ├─ Cache.dart // 缓存,泛型接口
│ ├─ FileCache.dart // 文件缓存,实现泛型接口的类
│ └─ MemoryCache.dart // 内存缓存,实现泛型接口的类
└─ main.dart // 程序运行入口

```

::: code-group

```dart [main.dart]
import './lib/FileCache.dart';
import './lib/MemoryCache.dart';

void main(){
  // 文件缓存 - 缓存字符串
  FileCache fc = FileCache<String>();
  fc.setByKey('foo','bar'); // result:文件缓存: key=foo,value=bar

  // 文件缓存 - 缓存Map数据
  FileCache fm = FileCache<Map<String,String>>();
  fm.setByKey('zoo',{'title':'标题党'});  // result: 文件缓存: key=zoo,value={title: 标题党}
}
```

```dart [FileCache.dart]
import './Cache.dart';

// 实现泛型接口的类
// FileChcha<T> 这里的 <T> 相当于传入 FileCache 后再传给 Cache
class FileCache<T> implements Cache<T>{
  @override
  getByKey(String key) {
    return null;
  }

  @override
  void setByKey(String key, T value) {
    print('文件缓存: key=${key},value=${value}');
  }
}
```

```dart [MemoryCache.dart]
import './Cache.dart';

// 实现泛型接口的类
// MemoryCache 这里的 <T> 相当于传入 MemoryCache 后再传给 Cache
class MemoryCache<T> implements Cache<T>{
  @override
  getByKey(String key) {
    return null;
  }

  @override
  void setByKey(String key, T value) {
    print('内存缓存: key=${key},value=${value}');
  }
}
```

```dart [Cache.dart]
// 泛型接口
abstract class Cache<T>{
  getByKey(String key);
  void setByKey(String key,T value);
}
```

:::

### 使用泛型限制参数类型
