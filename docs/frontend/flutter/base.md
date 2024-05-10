# 基础 - 初始化项目

## Flutter 项目目录

```
文件结构

├─ lib              # 开发目录
│  └─ main.dart     # 程序运行入口文件
├─ android          # 安卓目录
├─ ios              # iOS 目录
├─ build            # 构建目录
├─ test             # 测试目录
├─ .gitignore       # Git 提交时, 设置忽略的文件内容
├─ pubspec.lock     # 项目依赖锁定信息
└─ pubspec.yaml     # 项目依赖配置
```

## Material Design (Google 推出的前端 UI 解决方案 )

- 官网: https://m3.material.io/

## FLutter 中一切内容都是 Widget

- 无状态微件 (StatelessWidget)
- 有状态微件 (StatefulWidget)

## App 结构

- MaterialApp
  - title (任务管理器中的标题)
  - home (主内容)
  - debugShowCheckedModeBanner (是否显示左上角调试标记)
- Scaffold
  - appBar (应用头部)
  - body (应用主题)
  - floatingActionButton (浮动按钮)
  - drawer (左侧抽屉菜单)
  - endDrawer (右侧抽屉菜单)

## 设置自定义字体

- 下载并导入字体
  - https://fonts.google.com/
  - 解压压缩包, 将字体文件复制到 Flutter 项目中
- 在 pubspec.yaml 中声明字体
- 使用
  - 全局设置默认自定义字体
  - 组件设定自定义字体

<ZoomImg src="/images/flutter/font.png" title="导入字体"/>
<div class="text-center mt-2">导入字体</div>

---

::: code-group

```dart [main.dart]
// 全局字体
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        fontFamily: 'zcool',
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

// 局部字体
class TextDemo extends StatelessWidget {
  const TextDemo({super.key});
  @override
  Widget build(BuildContext context) {
    return const Column(children: [
      Text(
        "Flutter 是一个由 Google 开发并开源的 UI 工具包，用于从单一代码库构建跨平台的美观、原生速度的移动、Web 和桌面应用程序。它首次推出于 2017 年，并迅速成为开发者社区中的热门选择，特别是对于那些寻求一种高效方式来开发 iOS 和 Android 应用的开发者。",
        textDirection: TextDirection.ltr,
        style: TextStyle(
            fontFamily: 'zcool',
            fontSize: 30,
            color: Colors.purple,
            fontWeight: FontWeight.w500,
            overflow: TextOverflow.ellipsis,
            decorationColor: Colors.purple),
        textAlign: TextAlign.center,
        maxLines: 3,
      )
    ]);
  }
}
```

```yaml [pubspec.yaml]
name: demo2
description: "A new Flutter project."
publish_to: "none"

version: 1.0.0+1

environment:
  sdk: ">=3.2.5 <4.0.0"
dependencies:
  flutter:
    sdk: flutter

  cupertino_icons: ^1.0.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^2.0.0

flutter:
  uses-material-design: true

  fonts:
    - family: zcool
      fonts:
        - asset: assert/font/ZCOOLXiaoWei-Regular.ttf
          style: normal
```

:::

<ZoomImg src="/images/flutter/font_effect.png" title="导入字体展示效果"/>
<div class="text-center mt-2">导入字体展示效果</div>

---

## 状态管理

- Flutter 中的组件, 按状态划分
  - StatelessWidget (无状态组件)
  - StetefulWidget (有状态组件)
- 按状态作用域划分
  - 组件内私有状态 (StatefulWidget)
  - 跨组件状态共享 (InheritedWidget,Provider)
  - 全局状态 (GetX 库)
- 状态组件的组成
  - StatefulWidget (组件本身不可变 - @immutable)
  - State (将变化的状态放到 State 中维护)

### StatefulWidget

```dart:line-numbers
// StatefulWidget 的状态管理示例
class StatefulWidgetDemo extends StatefulWidget {
  const StatefulWidgetDemo({super.key});

  @override
  State<StatefulWidgetDemo> createState() => _StatefulWidgetDemoState();
}

class _StatefulWidgetDemoState extends State<StatefulWidgetDemo> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  void _decrementCounter() {
    setState(() {
      if (_counter > 0) {
        _counter--;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(50),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          IconButton(
            onPressed: _decrementCounter,
            icon: const Icon(
              Icons.remove,
              size: 30,
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              _counter.toString(),
              style: const TextStyle(fontSize: 30),
            ),
          ),
          IconButton(
            onPressed: _incrementCounter,
            icon: const Icon(
              Icons.add,
              size: 30,
            ),
          ),
        ],
      ),
    );
  }
}
```

<ZoomImg src="/images/flutter/StatefulWidget.png" title="StatefulWidget 展示效果"/>
<div class="text-center mt-2">StatefulWidget 展示效果</div>

---

### InheritedWidget

- What: 提供了**沿树向下,共享数据**的功能
  - 即子组件可以获取父组件 (InheritedWidget 的子类) 的数据
- Why: 依赖构造函数传递数据的方式不能满足业务需求, 所以需要一个新的, 更好的跨组件数据传输方案
- How: `BuildContext.dependOnInheritedWidgetOfExactType<MyInheritedWidget>()`

<ZoomImg src="/images/flutter/Inherited1.png" title="Inherized 传参"/>
<div class="text-center mt-2">Inherized 传参</div>
