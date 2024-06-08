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

## 终端命令

### 重新生成对应平台文件

```dart
flutter create . --platforms=web  // 重新生成web文件夹
flutter create . --platforms=android  // 重新生成安卓文件夹
flutter create . --platforms=ios  // 重新生成 ios 文件夹
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

<ZoomImg src="/images/flutter/app_structure.png" title="App 结构"/>
<div class="text-center mt-2">App 结构</div>

### Drawer 导航

- Scaffold
  - drawer (左侧抽屉菜单)
  - endDrawer (右侧抽屉菜单)
- UserAccountsDrawerHeader: 抽屉菜单头部组件
- AboutListTile: 关于弹窗

### BottomNavigationBar 导航

- items: 包含导航 (BottomNavigationBarItem) 的列表
- currentIndex: 当前导航索引
- type: 导航类型(bottomNavigationBarType)
- onTap(): 导航的点击事件 (一般会更新导航索引)

### Tab 导航

- DefaultTabController (整个 Tab 导航的容器)
  - length (声明导航数量)
  - child (指定子组件)
- TabBar (导航菜单)
  - tabs (导航菜单数组)
- TabBarView (导航页面)
  - children (多个导航页面内容)

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

```dart:line-numbers
// InheritedWdiget 的状态管理示例
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
    return ShareDatawidget(
      data: _counter,
      child: Padding(
        padding: const EdgeInsets.all(50),
        child: Column(
          children: [
            Row(
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
            const MyCounter()
          ],
        ),
      ),
    );
  }
}

class MyCounter extends StatefulWidget {
  const MyCounter({super.key});

  @override
  State<MyCounter> createState() => _MyCounterState();
}

class _MyCounterState extends State<MyCounter> {
  @override
  Widget build(BuildContext context) {
    // 使用 InheritedWidget 共享数据
    return Text(
      '我共享了数据:${ShareDatawidget.of(context)!.data}',
      style: const TextStyle(fontSize: 30),
    );
  }
}

// 数据共享组件
class ShareDatawidget extends InheritedWidget {
  const ShareDatawidget({super.key, required this.child, required this.data}) : super(child: child);
  final int data;

  @override
  final Widget child;

  static ShareDatawidget? of(BuildContext context) {
    // 重要的,获取共享数据
    return context.dependOnInheritedWidgetOfExactType<ShareDatawidget>();
  }

  @override
  bool updateShouldNotify(ShareDatawidget oldWidget) {
    return true;
  }
}
```

<ZoomImg src="/images/flutter/Inherited2.png" title="InheritedWidget 展示效果"/>
<div class="text-center mt-2">InheritedWidget 展示效果</div>

---

## 组件生命周期

- initState(): 这个方法在组件被插入到树中时调用。它通常用于一次性的初始化，比如订阅服务或初始化数据。

```dart
  @override
  void initState() {
    super.initState();
    // 初始化逻辑
  }
```

- didChangeDependencies(): 当前状态对象的依赖改变时
- build(): 组件渲染时
- setState(): 组件对象的内部状态变更时
- didUpdateWidget(): 这个方法在父组件重建并传递新的参数时调用。它通常用于处理父组件传递的新数据。

```dart
  @override
  void didUpdateWidget(covariant MyWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    // 响应新的参数
  }
```

- deactivate(): 组件对象在元素中**暂时**移除时
- dispose(): 组件对象在元素树中**永远**移除时

```dart
@override
void dispose() {
  // 清理逻辑
  super.dispose();
}
```

<ZoomImg src="/images/flutter/lifecycle.png" title="组件生命周期"/>
<div class="text-center mt-2">组件生命周期</div>

---

<ZoomImg src="/images/flutter/didChangeDependencies.png" title="didChangeDependencies 生命周期"/>
<div class="text-center mt-2">didChangeDependencies 生命周期</div>

---

## 路由

- Route: 一个路由是一个屏幕或页面的抽象
- Navigator
  - 管理路由的组件, Navigator 可以通过路由入栈和出栈来实现页面之间的跳转
  - 常用属性:
    - initialRoute: 初始路由, 即默认页面
    - onGenerateRoute: 动态路由 (根据规则, 匹配动态路由)
    - onUnknownRoute: 未知路由, 也就是 404
    - routes: 路由集合

### 匿名路由

- Navigator

  - push (跳转到指定组件)

  ```dart
  Navigator.push{context,MaterialPageRoute(builder:(context)=> 组件名称())};
  ```

  - pop (回退)

  ```dart
  Navigator.pop(context);
  ```

```dart:line-numbers
// 匿名路由示例
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Provider'),
        ),
        body: const HomePage(),
      ),
    );
  }
}

// 主页
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ElevatedButton(
        onPressed: () => {
          // 匿名路由:跳转到组件
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => const SecondPage(),
            ),
          )
        },
        child: const Text('第二页面'),
      ),
    );
  }
}

// 第二页
class SecondPage extends StatelessWidget {
  const SecondPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('第二页面'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            // 后退
            Navigator.pop(context);
          },
          child: const Text('首页'),
        ),
      ),
    );
  }
}
```

### 命名路由

- 声明路由
  - routes 路由表 (Map 类型)
  - initialRoute (初始路由)
  - onUnknownRoute (未知路由 - 404)
- 跳转到命名路由
  - `Navigator.pushNamed(context,'路由名称');`

<ZoomImg src="/images/flutter/router1.png" title="命名路由"/>
<div class="text-center mt-2">命名路由</div>

---

### 动态路由

- 动态路由是指, 通过 onGenerateRoute 属性指定的路由

<ZoomImg src="/images/flutter/router2.png" title="动态路由"/>
<div class="text-center mt-2">动态路由</div>

### 路由传参

- 匿名路由

<ZoomImg src="/images/flutter/router3.png" title="匿名路由传参"/>
<div class="text-center mt-2">匿名路由传参</div>

- 命名路由
  - 路由中声明参数
    - `Navigator.pushNamed(context,routename,{arguments})`
  - 组件中接收参数
    - `ModalRoute.of(context).settings.arguments`

<ZoomImg src="/images/flutter/router4.png" title="命名路由传参"/>
<div class="text-center mt-2">命名路由传参</div>

## 动画

- Why
  - UI 界面设计合理的动画, 可以让用户觉得更加流畅、直观,可以极大提高和改善用户体验.
- What (实现原理)
  - 动画就是动起来的画面
  - 视觉暂留: 画面经视神经传入大脑后, 不会立即消失 (会留存一段时间)
  - 帧 (Frame): 单个的画面, 在学术上叫帧
  - 每秒中展示的帧数简称 fps(Frame per Second)
- 动画分类
  - 补间 (Tween) 动画
    - 在补间动画中我们定义**开始点**和**结束点**、**时间线**以及定义**转换时间**和**速度曲线**.然后由系统计算, 从开始点运动到结束点. 从而形成动画效果.
    - 例如: 透明度从 0 到 1, 颜色值从 0 到 255
  - 拟物动画
    - 拟物动画是对真实世界的行为进行建模, 使动画效果类似于现实中的物理效果.
    - 例如: 弹簧, 阻尼, 重力, 抛物线等

### Animation

- Animation: 是 Flutter 动画库中的一个核心类, 它包含动画的**值**和**状态**两个属性, 定义了动画的一系列**监听函数**
  - 监听值
    - addListener
    - removeListener
  - 监听状态
    - addStateListener
    - removeStateListener
  - 动画状态
    - 动画初始状态: `AnimationStatus.dismissed`
    - 动画结束状态: `AnimationStatus.completed`
    - 动画处在从开始到结束的运行状态: `AnimationStatus.forward`
    - 动画处在从结束到开始的运行状态: `AnimationStatus.reverse`

<ZoomImg src="/images/flutter/Animation1.png" title="动画状态"/>
<div class="text-center mt-2">动画状态</div>

### AnimationController

- AnimationController (动画控制器)
  - 在指定时间内, 将组件属性值由初始值演变到终止值,从而形成动画效果
- AnimationController 参数
  - duration (动画的执行时间)
  - reverseDuration (动画反向执行时间)
  - lowerBound = 0.0 (动画最小值)
  - upperBound = 1.0 (动画最大值)
  - value (动画初始值, 默认是 lowerBound)
  - **vsync** (TickerProvider 类型的对象, 用来创建 Ticker 对象)
- 当创建一个 AnimationController 时, 需要传递一个 vsync 参数
  - vsync 的作用是: 防止屏幕外的动画 (动画页面切换到后台时) 消耗不必要的资源
  - 通过将 SingleTickerProviderStatemixin 添加到类定义中, 可以将 stateful 对象作为 vsync 的值
- AnimationController 具有控制动画的方法:
  - .forward() 可以正向执行动画
  - .reverse() 可以反向执行动画
  - .dispose() 用来释放动画资源 (在不使用时需要调用该方法, 否则会造成资源泄露)
  - .stop() 用来停止动画运行

<ZoomImg src="/images/flutter/Animation2.png" title="添加 SingleTickerProviderStatemixin"/>
<div class="text-center mt-2">添加 SingleTickerProviderStatemixin</div>

### Tween

- AnimationController 动画生成的默认区间时 0.0 到 1.0, 如果希望使用不同的区间, 或不同的数据类型, 需要使用 Tween (补间动画)
- Tween 的唯一职责就是定义从**输入范围**到**输出范围**的**映射**
- 例如: 颜色区间时 0 到 255
  - `Tween<double>(begin:起始值,end:终止值);`
  - `ColorTween(begin:Colors.white,end:Colors.black);`

### CurvedAnimation

- 简介
  - 动画执行的速度有多种 (匀速、先快后慢或先慢后快), 这里的速度称为**动画曲线**
  - CurvedAnimation 的目的是为 AnimationController 添加动画曲线
- 组件
  - `CurvedAnimation(parent:controller,curve:Curves.easeIn);`
    - parent (动画控制器对象)
    - curve (正向执行的动画曲线)
    - reverseCurve (反向执行的动画曲线)
  - Curves
    - 动画曲线: https://api.flutter.dev/flutter/animation/Curves-class.html

### 动画使用步骤

- 创建动画控制器
  - `controller = AnimationController(duration,vsync);`
- 创建动画
  - 动画曲线 (CurvedAnimation)
  - 补间动画 (Tween)
- 监听动画
  - addListener() // 监听动画**生成值**
  - addStatusListener() // 监听**动画状态**
- 执行动画
  - `controller.forward();` // 正向执行
  - `controller.reverse();` // 反向执行

<ZoomImg src="/images/flutter/Animation3.png" title="动画步骤"/>
<div class="text-center mt-2">动画步骤</div>

```dart
class AnimationDemo extends StatefulWidget {
  const AnimationDemo({super.key});

  @override
  State<AnimationDemo> createState() => _AnimationDemoState();
}

class _AnimationDemoState extends State<AnimationDemo> with SingleTickerProviderStateMixin {
  AnimationController? controller;
  Animation? animation;

  @override
  void initState() {
    super.initState();

    // 1.创建 AnimationController
    controller = AnimationController(
      duration: const Duration(milliseconds: 400),
      vsync: this,
    );

    // 2.声明动画曲线
    animation = CurvedAnimation(parent: controller!, curve: Curves.easeIn);

    // 2.1 Tween
    animation = Tween(begin: 50.0, end: 300.0).animate(controller!);

    // 3.监听动画
    animation!.addListener(() {
      setState(() {});
    });

    // 4.执行动画
    // controller!.forward();
  }

  @override
  void dispose() {
    // 必写,释放资源
    controller!.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        children: [
          Icon(Icons.favorite, color: Colors.red, size: animation!.value),
          const SizedBox(
            height: 20,
          ),
          Opacity(
            opacity: controller!.value,
            child: const Text(
              '一颗爱心',
              style: TextStyle(fontSize: 30),
            ),
          ),
          const SizedBox(
            height: 20,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ElevatedButton(
                onPressed: () {
                  controller!.forward();
                },
                child: const Text('放大'),
              ),
              const SizedBox(
                width: 20,
              ),
              ElevatedButton(
                onPressed: () {
                  animation!.addStatusListener((status) {
                    if (status == AnimationStatus.completed) {
                      // 反向执行动画
                      controller!.reverse();
                    } else if (status == AnimationStatus.dismissed) {
                      // 正向执行动画
                      controller!.forward();
                    }
                  });
                  controller!.forward();
                },
                child: const Text('重复'),
              ),
              const SizedBox(
                width: 20,
              ),
              ElevatedButton(
                onPressed: () {
                  controller!.stop();
                },
                child: const Text('终止'),
              ),
              const SizedBox(
                width: 20,
              ),
              ElevatedButton(
                onPressed: () {
                  controller!.reverse();
                },
                child: const Text('缩小'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
```

<ZoomImg src="/images/flutter/Animation4.png" title="动画代码示例"/>
<div class="text-center mt-2">动画代码示例</div>

---

### 交织动画

- 什么是交织动画
  - 交织动画是由多个单一动画叠加而成复杂动画
  - 例如: 组件变化可能涉及高度、宽度、颜色、透明度、位置等等
  - 需要给每个动画设置**时间间隔** (Interval)
- Transform (对组件进行矩阵变换)
  - 平移: Transform.translate()
  - 旋转: Transform.rotate()
  - 缩放: Transform.scale()

<ZoomImg src="/images/flutter/Animation5.png" title="交织动画"/>
<div class="text-center mt-2">交织动画</div>

---

```dart
// 交织动画示例代码
class StaggerAnimationDemo extends StatefulWidget {
  const StaggerAnimationDemo({super.key});

  @override
  State<StaggerAnimationDemo> createState() => _StaggerAnimationDemoState();
}

class _StaggerAnimationDemoState extends State<StaggerAnimationDemo> with SingleTickerProviderStateMixin {
  AnimationController? controller;
  Animation? animation;
  Animation? sizeAnimation;
  Animation? colorAnimation;
  Animation? rotationAnimation;

  @override
  void initState() {
    super.initState();

    // 1.创建 AnimationController
    controller = AnimationController(
      duration: const Duration(milliseconds: 3000),
      vsync: this,
    );

    // 2.声明动画曲线,Interval(0.0, 0.5)表示动画执行的百分比
    animation = CurvedAnimation(parent: controller!, curve: const Interval(0.0, 0.5))
      ..addListener(() {
        setState(() {});
      });

    // 3.让动画反复运行
    animation!.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        // 反向执行动画
        controller!.reverse();
      } else if (status == AnimationStatus.dismissed) {
        // 正向执行动画
        controller!.forward();
      }
    });

    // 4.设置其它动画
    // 尺寸动画
    sizeAnimation = Tween(begin: 0.0, end: 200.0).animate(animation as Animation<double>);
    // 颜色动画
    colorAnimation = ColorTween(begin: Colors.blue[100], end: Colors.blue).animate(
      CurvedAnimation(
        parent: controller!,
        curve: const Interval(0.5, 1, curve: Curves.bounceIn),
      ),
    )..addListener(() {
        setState(() {});
      });
    // 旋转动画
    rotationAnimation = Tween(begin: 0.0, end: 2 * pi).animate(
      CurvedAnimation(
        parent: controller!,
        curve: const Interval(0.5, 1, curve: Curves.easeIn),
      ),
    )..addListener(() {
        setState(() {});
      });
  }

  @override
  void dispose() {
    // 必写,释放资源
    controller!.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        children: [
          Icon(Icons.favorite, color: Colors.red, size: animation!.value),
          const SizedBox(
            height: 20,
          ),
          Opacity(
            opacity: controller!.value,
            child: Transform.rotate(
              angle: rotationAnimation!.value,
              child: Container(
                width: sizeAnimation!.value,
                height: sizeAnimation!.value,
                color: colorAnimation!.value,
              ),
            ),
          ),
          const SizedBox(
            height: 20,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ElevatedButton(
                onPressed: () {
                  controller!.forward();
                },
                child: const Text('播放'),
              ),
              const SizedBox(
                width: 20,
              ),
              ElevatedButton(
                onPressed: () {
                  controller!.stop();
                },
                child: const Text('终止'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
```

<ZoomImg src="/images/flutter/Animation6.png" title="交织动画示例"/>
<div class="text-center mt-2">交织动画示例</div>

---

### Hero 动画

- Hero 动画用来实现**跨页面的动画效果**
  - 在不同页面中,声明一个共享组件 (Hero)
  - 由于共享组件在不同页面中的位置、外观等不同,路由切换时, 形成动画效果
- 如何实现
  - 在页面 A 中定义**起始** Hero 组件 (source hero), 声明 tag
  - 在页面 B 中定义**目标** Hero 组件 (destination hero), 绑定相同的 tag
  - 页面跳转时, 通过 Navagator, 传递 tag
- Hero 组件
  - tag (路由切换时, 共享组件的标记)
  - child (声明子组件)

```dart
// Hero Animation 代码示例
class HeroAnimationDemo extends StatelessWidget {
  const HeroAnimationDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return GridView.extent(
      maxCrossAxisExtent: 250,
      children: List.generate(20, (index) {
        String imageURL = 'https://picsum.photos/id/${index + 20}/1000/800';
        return GestureDetector(
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => ImageDetail(
                  imageURL: imageURL,
                ),
              ),
            );
          },
          child: Hero(
            tag: imageURL,
            child: Image.network(imageURL, width: 200, fit: BoxFit.cover),
          ),
        );
      }),
    );
  }
}

class ImageDetail extends StatelessWidget {
  final String? imageURL;
  const ImageDetail({super.key, this.imageURL});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Center(
        child: GestureDetector(
          onTap: () {
            Navigator.pop(context);
          },
          child: Hero(
            tag: imageURL!,
            child: Image.network(imageURL!, width: double.infinity, fit: BoxFit.cover),
          ),
        ),
      ),
    );
  }
}
```

<ZoomImg src="/images/flutter/Animation7.png" title="Hero 动画示例"/>
<div class="text-center mt-2">Hero 动画示例</div>

---

<ZoomImg src="/images/flutter/Animation8.png" title="Hero 动画示例"/>
<div class="text-center mt-2">Hero 动画示例</div>

---

## 多语言 (国际化)

- 国际化 (internationalization 简称 i18n)
  - 终端 (手机) 系统语言切换时, Flutter 应用的跟随切换
- 内容
  - 组件 (Widget) 国际化
    - 例如: 日历, 弹窗等常用组件的国际化
  - 文本国际化 (包括文本的顺序)
    - 自定义文本的国际化
