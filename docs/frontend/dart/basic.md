# Dart 基础

```dart
//声明函数
void printInteger(int aNumber){
    print('The number is ${aNumber}');  //打印到控制台
}

//入口文件-应用从这里开始执行
void main(){
    var number = 42;    //声明并初始化一个变量
    printInteger(number);   //调用函数
}
```

- 注释语法与 JS 一致
- 声明函数不需要关键字(JS 中通过 function 关键字来声明函数)
- 函数和参数前面都有类型声明,void 表示没有返回值,int 是整形数字
- 打印使用 print(JS 使用 console.log())
- 每行代码结束时,必须写结束分号(;)
- 字符串通过引号包起来,支持模板字符串
- main 是入口函数,Dart 应用程序总是从 main 函数开始执行
- 用 var 声明的变量,其数据类型是动态的

## 运行

- 在命令行中运行
  - `dart hell.dart`
- Dart 执行文件中的 main 函数

```dart
void main(){
    print("Hello,World");
}
```

- 输出 Hello,World

## 注释

- 单行注释
  - `//我是单行注释`
- 多行注释
  - `/*我是多行注释*/`
- 文档注释

  - `///我是文档注释`
  - 可以通过 dartdoc 将注释转成文档(文档注释支持 markdown 语法)

Dart 是一个支持类型安全的编程语言，提供了多种内建数据类型。Dart 的变量类型大致可以分为以下几类：

## 变量

- 变量是一个引用,Dart 万物皆对象,变量存储的是对象的引用
- 声明变量
  - 明确指定类型: `int age = 18;`
  - 不明确类型: `var age = 18;` 或者 `dynamic age=18;`
- 变量名大小写敏感(age 与 Age 是两个不同的变量)
- 变量默认值是 null(JS 中变量默认值是 underfined)
- Dart 变量的值不会进行隐式转换(null 不会自动转成 false)
- 关于 var 和 dynamic
  - **var:** 当使用 var 声明变量时，Dart 使用类型推断来确定变量的类型。一旦变量被赋予一个初始值，其类型就会被固定，之后如果尝试将不同类型的值赋给该变量，编译器将会报错。
  - **dynamic:** 使用 dynamic 声明的变量可以被赋予任何类型的值，且类型可以在运行时改变。它基本上关闭了 Dart 的类型检查。
  - **类型安全:** var 是类型安全的，编译时会检查类型，而 dynamic 不是，错误可能在运行时才会出现。
  - **编译时类型检查:** 使用 var，如果你试图将错误类型的值赋给变量，编译器会在编译时提供错误信息。使用 dynamic，编译器不会提供这些信息，你可能会在运行时遇到类型相关的问题。
  - **性能:** var 变量在编译时就确定了类型，这可以让编译的应用运行得更快。因为 dynamic 类型的变量会跳过类型检查，所以可能会影响运行时性能。

## 常量

- 常量就是值不可改变的变量(一旦声明,其值不能更改)
- 声明常量
  - `const age = 18;`
  - `final age = 18;`
- const 与 final 的区别
  - `const time = DateTime.now();` //报错,无法将运行时的值分配给 const 变量
  - `final time = DateTime.now();` //成功,可以将运行时的值分配给 final 变量

## Dart 数据类型

### 基础类型

#### 1. **数值类型（Numeric Types）**

- `int`: 用于表示整数值。
- `double`: 用于表示 64 位（双精度）浮点数。
- `num`: 既可以是整数,也可以是小数

```dart
void main(){
   //声明整数
   int count = 3;
   print(count);   // result:3

   //声明浮点数
   double price = 3.7;
   print(price);   // result:3.7

   //当不确定整型还是浮点型的时候,可以声明数值类型
   num n1 = 3;
   num n2 = 3.7;
   print(n1);  // result:3
   print(n2);  // result:3.7

   //类型转换
   print(n1.toString());   // result:3,数值类型转换成字符串类型
   print(3.8.toInt());  // result:3,转换成整形,去掉小数点部分,保留整数部分,相当于向下取整

   //四舍五入
   print(3.1415926.round());  // result:3,四舍五入到整数位
   print(3.1415926.toStringAsFixed(4));   // result:3.1416,根据toStringAsFixed传入的整数来精确到四舍五入到小数点第几位.

   //返回余数
   print(10.remainder(4)); // result:2,10余4的结果是2

   //数字比较,前面的数字和后面的数字进行比较,返回值0:相同,1:前者大于后者,-1:前者小于后者
   print(10.compareTo(12));   //result:-1,前者小于后者

   //返回最大公约数
   print(12.gcd(18));   //result:6,12和18的最大公约数是6

   //科学技术法,根据toStringAsExponential传进去的整数参数进行小数点位置的四舍五入并用科学记数法表示
   print(1234.toStringAsExponential(2));  // result:1.23e+3,等价于1.23 * 10^3
   print(1235.toStringAsExponential(2));  // result:1.24e+3,等价于1.24 * 10^3
}
```

#### 2. **布尔类型（Boolean Type）**

- `bool`: 用于表示布尔值，即 `true` 或 `false`。
- Dart 通过`bool`关键字来表示布尔类型
- 对变量进行判断时,要显示地检查布尔值
  - ~~`if(varname){...}`~~ ❌
  - `if(varname == 0){...}` ✅
  - `if(varname == null){...}` ✅

```dart
void main(){
   //声明布尔类型
   bool flag1 = true;
   print(flag1);  // result:true

   bool flag2 = false;
   print(flag2);

   //显示地进行判断
   var flag3;
   if(flag3 == null){
      print("真");
   }else{
      print("假");
   }

   //一些特殊的判断场景,判断是否是数字
   var n1 = 0/0;
   print(n1);  //result:NaN,结果非数字
   print(n1.isNaN);  //result:true,isNaN这个属性判断是否非数字
}
```

#### 3. **字符串类型（String Type）**

- `String`: 用于表示一系列字符。
  - 单引号、双引号都可以
  - 三个引号可以声明包含换行符的字符串
  - `RegExp(r'正则表达式')`

```dart
void main(){
   //声明字符串
   String str1 = 'Hello,World';
   print(str1);   //result:Hello,World

   //通过三个引号声明字符串
   String str2 = '''Hello,
   World
   ''';
   print(str2);   //result:Hello,\n World

   //字符串拼接
   print(str1 + str1);  //result:Hello,WorldHello,World
   print("$str1 $str1");   //result:Hello,World Hello,World

   //字符串的分割,分割后的数据类型是List
   print(str1.split(''));  //result:[H, e, l, l, o, ,, W, o, r, l, d]

   //字符串的裁切,trim方法去除两边空格,trimLeft去掉左边空格,trimRight去掉右边空格
   print('  abc  '.trim()); //result:abc

   //判断字符串是否为空
   print(''.isEmpty);   //result:true,如果为空,返回true
   print(''.isNotEmpty);   //result:false,如果为空,返回false

   //字符串替换
   print(str1.replaceAll('World','Dart'));   //result:Hello,Dart
   //字符串正则替换
   print('a1b2c3d4e5'.replaceAll(RegExp(r'\d+'),'_'));   //result:a_b_c_d_e_
   //通过正则匹配手机号
   var isPhone = RegExp(r'^1\d{10}$');    //判断是否为11位数,第一个数字是1
   print(isPhone.hasMatch('18888888888'));   //result:true,位数匹配

   //查找字符串
   print(str1.contains('e')); // result:true,str1里面拥有字符串e

   //定位字符串
   ///indexOf是从左到右查找第一个遇到的相符字符串,并返回索引位置
   ///lastIndexOf是从右往左查找第一个遇到的相符字符串,并返回索引位置
   print(str1.indexOf('e')); // result:1,索引是1
   print(str1.lastIndexOf('e')); // result:1,索引是1
}
```

### 集合类型（Collection Types）

#### 1. **列表（List）**

- `List`: 通常被称作数组，用于表示一组有序的对象。
- 字面量方式声明:
  - `List list = [];` // 不限定元素的数据类型
  - `List list = <int>[];` // 限定元素的数据类型是 int
- 构造函数方式声明:
  - `List list = new List.empty(growable:true);` // 不限制长度的空列表
  - `List list = new List.filled(3,0);` // 声明指定长度的填充列表
- 扩展操作符(...)

```dart
// List的基本方法及属性
void main(){
   // 声明List - 字面量
   List l1 = ['a','b','c',1,2,3];   //这种声明方式不限定数据类型
   print(l1);  // result:['a','b','c',1,2,3]

   List l2 = <int>[1,2,3]; //限定元素类型的声明方式
   print(l2);  // result:[1,2,3]

   // 通过构造函数的声明方式
   var l3 = new List.empty(growable:true);   //默认growable是false,当为false的时候不能往List里面添加元素
   l3.add(1);  //给List添加元素
   print(l3);  // result:[1]

   var l4 = new List.filled(3,6);   //限定3个元素,用6填充了每个元素,同时限定了长度,不可用add方法添加新的元素
   print(l4);  // result:[6,6,6]

   //扩展操作符
   var l5 = [0,...l4];
   print(l5);  // result:[0,6,6,6]

   var l6;
   var l7 = [7,...?l6]; // 不加?会报错,添加?虽然会警告,但不会报错
   print(l7);  // result:[7]

   //返回列表的长度
   print(l1.length); // result:6,长度为6

   //列表的反转
   print(l1.reversed);   //result:(3, 2, 1, c, b, a),不改变l1原本数据,返回结果数据类型不是List
   print(l1.reversed.toList());   //result:[a, b, c, 1, 2, 3],数据类型重新转换为List类型

   // 添加元素
   l3.addAll([4,5,6]);
   print(l3);  // result:[1, 4, 5, 6]

   //删除元素
   l3.remove(6);  // 删除了l3里面的元素6
   print(l3);  // result:[1,4,5]
   l3.remove(7);  // 假如删除一个List里面并没有的元素,不会有任何报错,List也没有任何变动
   print(l3);  // result:[1,4,5]

   //根据List下标删除元素
   l3.removeAt(1);   //删除了List里面的第二个元素4
   print(l3);  // result:[1,5]

   //在指定的位置添加元素
   l3.insert(1,9);   // 在l3下标1的地方添加了元素9
   print(l3);  // result:[1,9,5],原本5在l3下标1的位置,现在被9占据,往后挪了一个位置
   l3.insertAll(1,[9,5,2,7]); // 批量在指定下标位置添加元素
   print(l3);  // result:[1,9,5,2,7,9,5],在l3下标1的位置添加了[9,5,2,7]这四个元素,原本的[9,5]往后挪了4个位置

   // 清空List的全部元素
   l3.clear();
   print(l3); // result:[]
   print(l3.isEmpty);   // result:true,判断l3是否为空,为空返回true

   // 合并元素方法join,和split是一对
   List words = ['Hello','World'];
   print(words.join('-')); // result:Hello-World,合并成字符串
}
```

- forEach():遍历列表
- map():遍历并处理元素,然后生成新的列表
- where():返回满足条件的数据
- any():只要有一项满足条件,即返回 true
- every():判断是否每一项都满足条件,都满足条件才返回 true

```dart
//List的遍历
void main(){
   List nums = <int>[1,2,3];

   // for 循环遍历List,result:1 2 3
   for(int i = 0;i < nums.length;i++){
      print(nums[i]);
   }

   // for in 循环遍历List,result:1 2 3
   for(var item in nums){
      print(item);
   }

   // froEach循环遍历,result:1 2 3
   nums.forEach((ele){
      print(ele);
   });

   // map返回一个新的可迭代数据,result:(1,4,9)
   var newNums = nums.map((ele){
      return ele * ele;
   });
   print(newNums.toList());   // result:[1,4,9],把结果转成List类型

   // where()返回符合条件的元素
   // 判断数字是否是奇数,result:(1,3)
   bool isOdd(n) => n % 2 == 1;
   var oddNums = nums.where((ele) => isOdd(ele));
   print(oddNums.toList());   // result:[1,3]

   // 使用any()来判断是否有奇数,只要有一个,条件就满足
   print(nums.any(isOdd)); // result:true

   // 使用every()来判断是否都是奇数
   print(nums.every(isOdd));  // result:false

   //扩展 - 把二维数组降为一维数组
   List pairs = [[1,2],[3,4]];
   List flattend = pairs.expand((ele) => ele).toList();
   print(flattend);  // result:[1,2,3,4]

   // 折叠 - 对列表中的每一个元素,做一个累积操作,nums = [1,2,3];
   int result = nums.fold(2,(p,ele) => (p * ele).toInt());   //p在这里是2,2 * 1 * 2 * 3
   print(result); // result:12

   int plus(p,ele){
      print("$p,$ele"); // 3+1;4+2;6+3,第一次运算3+1=4,第二次运算4+2=6,第三次运算6+3=9;
      return p + ele;   // 4,6,9
   }
   int resultPlus = nums.fold(3,plus); //传入参数3, 3 + 1 + 2 + 3
   print(resultPlus);   // result:9
}
```

#### 2. **集合（Set）**

- `Set`: 用于表示一组无序且唯一的对象。

#### 3. **映射（Map）**

- `Map`: 一个键值对的集合，键和值都可以是任何类型。

### 特殊类型

1. **动态类型（Dynamic Type）**

   - `dynamic`: 可以被赋予任何类型的值，类型安全检查将被推迟到运行时。

2. **变量（Var）**
   - `var`: 可以赋予任何类型的值，但只在第一次赋值时使用类型推断确定其类型。

### 对象和类类型（Object and Class Types）

1. **对象（Object）**

   - `Object`: Dart 中所有类的基类。

2. **用户定义的类**
   - 除了内建类型外，你可以定义你自己的类，这些类也被当作类型使用。

### 特殊用途类型

1. **枚举（Enum）**

   - 用于定义一组命名的常量值。

2. **Future 和 Stream**
   - 用于异步编程，`Future`代表将来某个时候会返回的一个值，而`Stream`代表随时间传递的一系列值。

### 可空类型（Nullable Types）

Dart 2.12 及更高版本引入了空安全（null safety），使得变量默认不接受 `null` 值。如果你想让变量可以是 `null`，可以通过在类型后添加一个问号（`?`）来声明。

例如：

- `int?`: 可以是 `int` 类型的数值或 `null`。
- `String?`: 可以是 `String` 类型的文本或 `null`。

在实际编程中，你应该根据变量应保存的数据类型来选择最合适的类型。正确使用类型有助于提高代码的清晰度和质量，同时利用 Dart 的类型系统来进行错误检查。
