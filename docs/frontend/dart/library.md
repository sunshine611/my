# Dart 库与生态

## 简介

- Dart 中的库就是具有特定功能的模块
  - 可能包含单个文件, 也可能包含多个文件
- 按照库的作业进行划分, 库可以分成三类
  - 系统库 (Dart 中自带的)
  - 第三方库 (Dart 生态中的)
  - 自定义库 (程序猿自己写的)
- Dart 生态
  - https://pub.dev
  - pub 命令 (src:flutter/bin/cache/dart-sdk/bin)

|          |     **Dart**      |  **Javascript**   |
| :------: | :---------------: | :---------------: |
|   叫法   |   库 (library)    |   包 (package)    |
| 生态网站 |  https://pub.dev  | https://npmjs.com |
| 管理文件 |   pubspec.yaml    |   package.json    |
|   命令   | flutter pub (pub) |        npm        |

## 系统库

- 系统库 (核心库) 是 Dart 提供的常用内置库
  - 不需要单独下载,就可以直接使用
- 引入: `import 'dart:库名';`
  - `import 'dart:core';` // 会自动引入 (无需手动引入)
- 系统库列表
  - 中文: https://dart.cn/libraries
  - 英文: https://dart.dev/libraries

## 第三方库

- 来源: https://pub.dev
- 使用
  - 在项目目录下创建 **pubspec.yaml**
  - 在 pubspec.yaml 中声明第三方库(依赖)
  - 命令行中进入 pubspec.yaml 所在目录,运行 `flutter pub get` 或 `pub get` 进行安装
  - 项目中引入已安装的第三方库 (`import 'package:xxxxxx/xxxxx.dart';`)
- 第三方库的结构
  - 一个第三方库,必须包含一个 pubspec.yaml 文件
- pubspec.yaml
  - 详情: https://dart.dev/tools/pub/pubspec

```
某个第三方库文件结构

dart_string_manip   // 库名
├── example // 示例目录
│  └── main.dart
├── lib 库的核心代码
│  ├── dart_string_manip.dart
│  └── src
│     ├── classes.dart
│     └── functions.dart
├── .gitignore  // git提交的时候设置要忽略内容的配置文件
├── .packages   // 包的衍射,在这个目录查看所有已安装包的路径
├── LICENSE // 许可证
├── README.md   // 文档说明文件
├── pubspec.lock    // 记录已经安装过的库以及版本信息
└── pubspec.yaml    // 库的配置文件
```

## 自定义库

- 每个 Dart 文件默认都是一个库, 只是没有使用 library 来显示声明
- Dart 使用 \_ (下划线) 开头的标识符, 表示库内访问可见(私有)
- library 关键字声明的库名称建议使用: 小写字母 + 下划线 (蛇形命名)

```dart
// main.dart
void main(){
    print('Hello World');
}
```

```dart{2}
// main.dart
library main;   // 默认隐藏了一个 main 的 library 的声明
void main(){
    print('Hello World');
}
```

## 通过 import 来引入库

- 不同类型的库, 引入方式不同
  - 系统库 (`import 'dart:库名称';`)
  - 第三方库 (`import 'package:xxxxxx/xxxxx.dart';`)
  - 自定义库 (`import '库的位置/库名称.dart';`)
- 引入部分库 (仅引入需要的内容,按需加载)
  - 包含引入 (show): 仅引入 show 显示声明的内容,其它不引入
  - 排除引入 (hide): 不引入 hide 显示声明的内容,其它引入
- 指定库的前缀
  - 当库名冲突时, 可以通过 **as** 关键字, 给库声明一个前缀
- 延迟引入 (懒加载)
  - 使用 deferred as 关键字来标识需要延时加载的库

#### 系统库引入方式

```dart
import 'dart:math'; // Dart 内置库,使用时候还是需要引入的
import 'dart:core'; // Dart 内置核心库,不需要显示引入即可使用,默认引入

void main(){
    // 引入了系统库,就可以使用系统库里面的内容
    print(pi);  // result: 3.141592653589793

    print(min(3,1));  // result: 1
    print(max(3,1));  // result: 3
}
```

#### 自定义库引入方式

```
文件结构

├─ lib
│ └─ my_custom.dart // 自定义库
└─ main.dart // 程序运行入口
```

::: code-group

```dart [main.dart]
import './lib/my_custom.dart';

void main(){
    MyCustom mc = MyCustom();
    mc.info();  // result: 我是自定义库: MyCustom

    print(MyCustom.version);    // result: 1.0
}
```

```dart [my_custom.dart]
library my_custom;  // 可有可无,建议 小写字母 + 下划线 命名

class MyCustom {
    String name = 'MyCustom';
    static num version = 1.0;

    void info(){
        print('我是自定义库: $name');
    }
}
```

:::

#### show 和 hide 引入

::: code-group

```dart [show.dart]
// show 会引入显示声明的内容
import 'common.dart' show f1,f3;

void main(){
    f1();   // result: f1 is runing
    // f2();    // 因为show引入没有引入f2,所以运行错误
    f3();   // result: f3 is runing
}
```

```dart [hide.dart]
// hide 会隐藏显示声明的内容
import 'common.dart' hide f1,f3;

void main(){
    // f1();   // 因为show引入没有引入f1,所以运行错误
    f2();    // result: f1 is runing
    // f3();   // 因为show引入没有引入f3,所以运行错误
}
```

```dart [common.dart]
void f1(){
    print('f1 is runing');
}

void f2(){
    print('f2 is runing');
}

void f3(){
    print('f3 is runing');
}
```

:::

#### as 解决库命名冲突

::: code-group

```dart [main.dart]
import 'common.dart';
import 'function.dart' as func; // 给库添加 as 前缀,解决了不同库之间的命名冲突问题

void main(){
    f1();   // result: f1 is runing

    func.f1(); // result: f1 is Hello
}
```

```dart [common.dart]
void f1(){
    print('f1 is runing');
}

void f2(){
    print('f2 is runing');
}

void f3(){
    print('f3 is runing');
}
```

```dart [function.dart]
void f1(){
    print('f1 is Hello');
}

void hello(){
    print('function is Hello');
}
```

:::

#### deferred as 延时加载库

::: code-group

```dart{11} [main.dart]
import 'function.dart' deferred as func;
void main(){
    // 报错:Deferred library func was not loaded.注:因为延迟引入所以还没开始加载库
    // func.hello(); // [!code error]

    great();    // result: function is Hello
}

Future great () async {
    // 使用 loadLibrary 方法后,这时才开始加载 function.dart 库,这是个异步方法
    await func.loadLibrary();
    func.hello();
}
```

```dart [function.dart]
void f1(){
    print('f1 is Hello');
}

void hello(){
    print('function is Hello');
}
```

:::

## part 与 part of

<ZoomImg src="/images/dart/part.png" title="part与part of"/>

```
文件结构

├─ lib
│ ├─ phone.dart // 主库,通过 part 和子库建立连接
│ ├─ processor.dart // 子库,通过 part of 和主库建立连接
│ └─ camera.dart // 子库,通过 part of 和主库建立连接
└─ main.dart // 程序运行入口
```

::: code-group

```dart [main.dart]
import './lib/phone.dart';

void main(){
    Processor cpu = Processor();
    cpu.info(); // result: 我是: 处理器

    Camera camera = Camera();
    camera.info();  // result: 我是: 摄像头
}
```

```dart [phone.dart]
// 和子库建立连接
// 分库不能使用 import , export 指令,只需要在主库 import 和 export
// 子库之间也可以互相调用对方的成员
import 'dart:math';
part './processor.dart';
part './camera.dart';

class Phone{

}
```

```dart [processor.dart]
// 与主库建立联系
part of './phone.dart';

class Processor{
    String name = '处理器';

    void info(){
        print('我是: $name');
    }

    // 因为主库引入了'dart:math',所以子库也能使用pi
    void PI(){
        print(pi);
    }
}
```

```dart [camera.dart]
// 与主库建立联系
part of './phone.dart';

class Camera{
    String name = '摄像头';

    void info(){
        print('我是: $name');
    }
}
```

:::
