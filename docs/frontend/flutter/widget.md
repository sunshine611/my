# Widget

## Base Widget

### Text() - 文本

- Text
  - TextDirection (文本方向)
  - TextStyle (文本样式)
    - color (文本颜色)
    - fontSize (字体大小)
    - fontStyle (字体样式)
    - fontWeight (字体粗细)
  - TextAlign (文本对其)
  - TextOverflow (文本溢出)
  - maxLines (指定显示最大行数)
- RichText 与 TextSpan

```dart:line-numbers
// Text() 示例
class TextDemo extends StatelessWidget {
  const TextDemo({super.key});
  @override
  Widget build(BuildContext context) {
    return const Column(children: [
      Text(
        "Flutter 是一个由 Google 开发并开源的 UI 工具包，用于从单一代码库构建跨平台的美观、原生速度的移动、Web 和桌面应用程序。它首次推出于 2017 年，并迅速成为开发者社区中的热门选择，特别是对于那些寻求一种高效方式来开发 iOS 和 Android 应用的开发者。",
        textDirection: TextDirection.ltr,
        style: TextStyle(
            fontSize: 30,
            color: Colors.purple,
            fontWeight: FontWeight.w500,
            fontStyle: FontStyle.italic,
            overflow: TextOverflow.ellipsis,
            decoration: TextDecoration.lineThrough,
            decorationColor: Colors.purple),
        textAlign: TextAlign.center,
        maxLines: 3,
      )
    ]);
  }
}
```

<ZoomImg src="/images/flutter/Text.png" title="Text()"/>
<div class="text-center mt-2">Text 展示效果</div>

---

### RichText() - 副文本

```dart:line-numbers
// RichText() 示例
class TextDemo extends StatelessWidget {
  const TextDemo({super.key});
  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Center(
        child: RichText(
            text: const TextSpan(
                text: "Hello ",
                style: TextStyle(
                    color: Colors.black,
                    fontSize: 30,
                    fontWeight: FontWeight.bold),
                children: [
              TextSpan(
                  text: "Flutter! ",
                  style: TextStyle(
                      color: Colors.purple,
                      fontSize: 30,
                      fontWeight: FontWeight.bold)),
              TextSpan(
                  text: "你好,世界!",
                  style: TextStyle(
                      backgroundColor: Colors.yellow,
                      color: Colors.white,
                      fontSize: 30,
                      fontWeight: FontWeight.bold))
            ])),
      )
    ]);
  }
}
```

<ZoomImg src="/images/flutter/RichText.png" title="RichText()"/>
<div class="text-center mt-2">RichText 展示效果</div>

---

### Icon() - 图标

- Icon
  - Flutter 中的图标库
  - Icon (使用: `Icons.add`)
- 在线预览
  - https://fonts.google.com/icons

---

### Color() - 颜色

- Color (自定义颜色)
  - Flutter 中通过 ARGB 来声明颜色
  - `const Color(0xFF42a5f5);` // 16 进制的 ARGB = 透明度 + 六位十六进制颜色
  - `const Color.fromARGB(0xFF, 0x42, 0xA5, 0xF5);`
  - `const Color.fromARGB(255, 66, 255, 245);`
  - `const Color.fromRGBO(66, 165, 245, 1);` // O = Opacity, 透明度
- Colors (英文字母声明的颜色)
  - `Colors.red`
  - `Colors.green`
  - `Colors.blue`

---

### Container() - 容器

- Container
  - child (子组件)
- padding & margin
  - EdgeInsets: all(),fromLTRB(),only()
- decoration
  - BoxDecoration (边框、圆角、渐变、阴影、背景色、背景图片)
- alignment
  - Alignment (内容对其)
- transform
  - Matrix4 (平移 - translate、 旋转 - rotate、 缩放 - scale、 斜切 - skew)

```dart:line-numbers
// Container 示例
class ContainerDemo extends StatelessWidget {
  const ContainerDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      // width: 200,
      // height: 200,
      width: double.infinity, // 宽度撑满父元素
      height: double.infinity, // 高度撑满父元素
      padding: const EdgeInsets.all(30),
      margin: const EdgeInsets.fromLTRB(10, 20, 100, 40),
      alignment: Alignment.bottomRight,
      transform: Matrix4.skew(0.1, 0)
        ..scale(0.8)
        ..rotateZ(-0.05)
        ..leftTranslate(40.0, 60), // 链式调用
      decoration: const BoxDecoration(
          color: Colors.lightBlue,
          gradient: LinearGradient(
              colors: [Colors.purple, Colors.lightGreen, Colors.blue],
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              stops: [0.1, 0.5, 0.9]), // 渐变后背景色失效
          border: Border(
            top: BorderSide(color: Colors.purple, width: 5),
            right: BorderSide(color: Colors.purple, width: 15),
            bottom: BorderSide(color: Colors.purple, width: 15),
            left: BorderSide(color: Colors.purple, width: 5),
          ),
          borderRadius: BorderRadius.all(Radius.circular(20))),
      child: const Text(
        'Flutter 是一个由 Google 开发并开源的 UI 工具包，用于从单一代码库构建跨平台的美观、原生速度的移动、Web 和桌面应用程序。它首次推出于 2017 年，并迅速成为开发者社区中的热门选择，特别是对于那些寻求一种高效方式来开发 iOS 和 Android 应用的开发者。',
        style: TextStyle(
            fontSize: 20, color: Colors.white, fontWeight: FontWeight.w600),
      ),
    );
  }
}
```

<ZoomImg src="/images/flutter/Container.png" title="Container()"/>
<div class="text-center mt-2">Container 展示效果</div>

---

### Column() - 线性布局

- Column
  - Column 中的主轴方向是垂直方向
  - mainAxiaAlignment: MainAxisAlignment 主轴对其方式
  - crossAxisAlignment: CrossAxisAlignment 交叉轴对其方式
  - children: 可放置多个子组件

```dart:line-numbers
// Column 示例
class ColumnDemo extends StatelessWidget {
  const ColumnDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,   // 主轴垂直方向平均分布
          crossAxisAlignment: CrossAxisAlignment.center, // 交叉轴水平方向居中
          children: [
            Container(
              color: Colors.red,
              height: 100,
              width: 100,
              child: const Icon(
                Icons.ac_unit,
                size: 60,
                color: Colors.white,
              ),
            ),
            Container(
              color: Colors.orange,
              height: 100,
              width: 100,
              child: const Icon(
                Icons.abc,
                size: 60,
                color: Colors.white,
              ),
            ),
            Container(
              color: Colors.green,
              height: 100,
              width: 100,
              child: const Icon(
                Icons.baby_changing_station,
                size: 60,
                color: Colors.white,
              ),
            ),
            Container(
              color: Colors.blue,
              height: 100,
              width: 100,
              child: const Icon(
                Icons.cabin,
                size: 60,
                color: Colors.white,
              ),
            ),
          ]),
    );
  }
}
```

<ZoomImg src="/images/flutter/Column.png" title="Column()"/>
<div class="text-center mt-2">Column 展示效果</div>

---

### Row() - 线性布局

- Row
  - Row 中的主轴方向是水平方向
  - mainAxiaAlignment: MainAxisAlignment 主轴对其方式
  - crossAxisAlignment: CrossAxisAlignment 交叉轴对其方式
  - children: 可放置多个子组件

```dart:line-numbers
// Row 示例
class RowDemo extends StatelessWidget {
  const RowDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: double.infinity,
      child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly, // 主轴水平方向平均分布
          crossAxisAlignment: CrossAxisAlignment.center, // 交叉轴垂直方向居底部
          children: [
            Container(
              color: Colors.red,
              height: 100,
              width: 100,
              child: const Icon(
                Icons.ac_unit,
                size: 60,
                color: Colors.white,
              ),
            ),
            Container(
              color: Colors.orange,
              height: 100,
              width: 100,
              child: const Icon(
                Icons.abc,
                size: 60,
                color: Colors.white,
              ),
            ),
            Container(
              color: Colors.green,
              height: 100,
              width: 100,
              child: const Icon(
                Icons.baby_changing_station,
                size: 60,
                color: Colors.white,
              ),
            ),
            Container(
              color: Colors.blue,
              height: 100,
              width: 100,
              child: const Icon(
                Icons.cabin,
                size: 60,
                color: Colors.white,
              ),
            ),
          ]),
    );
  }
}
```

<ZoomImg src="/images/flutter/Row.png" title="Row()"/>
<div class="text-center mt-2">Row 展示效果</div>

---

### Flex() - 弹性布局

- Flex
  - direction (声明主轴方向)
  - mainAxisAlignment (声明主轴对其方式)
  - textDirection (声明水平方向的排列顺序)
  - crossAxisAlignment (声明交叉轴对其方式)
  - verticalDirection (声明垂直方向的排列顺序)
  - children (声明子组件)
- Expanded (可伸缩组件,配套 Flex 使用)
  - flex (声明弹性布局所占比例)
  - child (声明子组件)
- Flexible (可伸缩组件,配套 Flex 使用)
  - flex (声明弹性布局所占比例)
  - child (声明子组件)
  - fit (默认属性: FlexFit.loose, 子部件可以最多扩展到分配的空间，但也可以更小)
- Spacer (弹性布局里面的占位组件)
  - flex (声明弹性布局所占比例)

```dart:line-numbers
// Flex 示例
class FlexDemo extends StatelessWidget {
  const FlexDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Flex(direction: Axis.horizontal, children: [
          Expanded(
            flex: 1,
            child: Container(
              color: Colors.purple,
              height: 100,
              child: const Icon(
                Icons.abc,
                color: Colors.white,
                size: 50,
              ),
            ),
          ),
          Expanded(
            flex: 1,
            child: Container(
              color: Colors.red,
              height: 100,
              child: const Icon(
                Icons.abc,
                color: Colors.white,
                size: 50,
              ),
            ),
          ),
          Expanded(
            flex: 2,
            child: Container(
              color: Colors.green,
              height: 100,
              child: const Icon(
                Icons.abc,
                color: Colors.white,
                size: 50,
              ),
            ),
          ),
          Expanded(
            flex: 3,
            child: Container(
              color: Colors.blue,
              height: 100,
              child: const Icon(
                Icons.abc,
                color: Colors.white,
                size: 50,
              ),
            ),
          ),
        ]),
        const SizedBox(height: 100),
        Flex(
            direction: Axis.vertical,
            mainAxisSize: MainAxisSize.min,
            children: [
              Flexible(
                flex: 1,
                child: Container(
                  color: Colors.purple,
                  height: 100,
                  child: const Icon(
                    Icons.abc,
                    color: Colors.white,
                    size: 50,
                  ),
                ),
              ),
              Flexible(
                flex: 1,
                child: Container(
                  color: Colors.red,
                  height: 100,
                  child: const Icon(
                    Icons.abc,
                    color: Colors.white,
                    size: 50,
                  ),
                ),
              ),
              Flexible(
                flex: 2,
                child: Container(
                  color: Colors.green,
                  height: 100,
                ),
              ),
              Flexible(
                flex: 3,
                child: Container(
                  color: Colors.blue,
                  height: 100,
                ),
              ),
            ]),
      ],
    );
  }
}
```

<ZoomImg src="/images/flutter/Flex.png" title="Flex()"/>
<div class="text-center mt-2">Flex 展示效果</div>

---

### Wrap() - 流式布局

- Wrap
  - spacing (主轴方向子组件的间距)
  - alignment (主轴方向的对齐方式)
  - runSpacing (纵轴方向子组件间距)
  - runAlignment (纵轴方向的对齐方式)
- Chip (标签)
- CircleAvatar (圆形头像)

```dart:line-numbers
// Wrap 示例
class WrapDemo extends StatelessWidget {
  WrapDemo({super.key});

  final List<String> _list = [
    '刘备',
    '诸葛亮',
    '关羽',
    '张飞',
    '赵云',
    '黄忠',
    '马超',
  ];

  List<Widget> shuCountry() {
    return _list.map((item) {
      return Chip(
        label: Text(
          item,
          style: const TextStyle(fontSize: 30),
        ),
        avatar: const CircleAvatar(
          backgroundColor: Colors.blue,
          child: Text('蜀', style: TextStyle(fontSize: 30, color: Colors.white)),
        ),
      );
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(50),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Wrap(
            spacing: 20,
            runSpacing: 20,
            alignment: WrapAlignment.center,
            children: shuCountry(),
          )
        ],
      ),
    );
  }
}
```

<ZoomImg src="/images/flutter/Wrap.png" title="Wrap()"/>
<div class="text-center mt-2">Wrap 展示效果</div>

---

### Stack() - 层叠布局

- Stack (层叠组件 - 类似 CSS 中的 z-index)
  - alignment (声明未定位子组件的对齐方式)
  - textDirection (声明未定位子组件的排列顺序)
  - 写在 Stack 里面的 children , 越后面的 Widget 层级越高
- Positioned (绝对定位组件)
  - child (声明子组件)
  - left, top, right, bottom
  - width, height
- NetworkImage (网络图片组件)
  - NetworkImage('图片地址')
  - `<uses-permission android:name="android.permission.INTERNET"/>`

```dart:line-numbers
// Stack 示例
class StackDemo extends StatelessWidget {
  const StackDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: Alignment.center,
      children: [
        const CircleAvatar(
          radius: 200,
          backgroundImage: NetworkImage('https://picsum.photos/200/300'),
        ),
        Positioned(
            top: 100,
            left: 100,
            child: Container(
              padding: const EdgeInsets.all(8),
              color: Colors.blue,
              child: const Text(
                '风景',
                style: TextStyle(fontSize: 48, color: Colors.white),
              ),
            )),
        const Text(
          'Hello',
          style: TextStyle(fontSize: 48, color: Colors.white),
        ),
      ],
    );
  }
}
```

<ZoomImg src="/images/flutter/Stack.png" title="Stack()"/>
<div class="text-center mt-2">Stack 展示效果</div>

---

### Card() - 卡片

- Card
  - child (子组件)
  - color (背景色)
  - shadowColor (阴影色)
  - elevation (阴影高度)
  - shape (边框样式)
  - margin (外边距)
- ListTile (列表瓦片)
  - leading (头部组件)
  - title (标题)
  - subtitle (子标题)

```dart:line-numbers
// Card 示例
class CardDemo extends StatelessWidget {
  const CardDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
        width: 500,
        height: 300,
        margin: const EdgeInsets.all(100),
        child: const Card(
            margin: EdgeInsets.only(left:100),
            color: Colors.white,
            elevation: 20,  // 阴影
            shadowColor: Colors.purple, // 阴影颜色
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.all(Radius.circular(50)),  // 边框圆角
              side: BorderSide(color: Colors.purple, width: 2)  // 边框样式
            ),
            child: Column(children: [
              ListTile(
                title: Text(
                  '1625 Main Street',
                ),
                subtitle: Text('My City, CA 9998fd4'),
                leading: Icon(Icons.restaurant_menu),
                trailing: Text('2021-09-09'),
              ),
              Divider(),
              ListTile(
                title: Text('(408) 555-xxxx'),
                leading: Icon(Icons.contact_phone),
              ),
              ListTile(
                title: Text(
                  '这是卡片的内容',
                ),
              ),
            ])));
  }
}
```

<ZoomImg src="/images/flutter/Card.png" title="Card()"/>
<div class="text-center mt-2">Card 展示效果</div>

---

### Button - 按钮

- Flutter 1.22 之前
  - FlatButton (扁平按钮)
  - RaisedButton (凸起按钮)
  - OutlineButton (轮廓按钮)
- Flutter 1.22 之后
  - TextButton (文本按钮 - 用来替换 FlatButton)
  - ElevatedButton (凸起按钮 - 用来替换 RaisedButton)
  - OutlinedButton (轮廓按钮 - 用来替换 OutlineButton)

##### 按钮主题

| 1.22 版本前的按钮 |    主题     | 1.22 版本后的按钮 |        主题         |
| :---------------: | :---------: | :---------------: | :-----------------: |
|    FlatButton     | ButtonTheme |    TextButton     |   TextButtonTheme   |
|   OutlineButton   | ButtonTheme |  OutlinedButton   | OutlinedButtonTheme |
|   RaisedButton    | ButtonTheme |  ElevatedButton   | ElevatedButtonTheme |

- 图标按钮
  - IconButton
  - TextButton.icon()
  - ElevatedButton.icon()
  - OutlinedButton.icon()
- ButtonBar (按钮组)
- FloatingActionButton (浮动按钮)
- BackButton (回退按钮)
- CloseButton (关闭按钮)

```dart:line-numbers
// Button 示例一
class ButtonDemo extends StatelessWidget {
  const ButtonDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(10),
      child: Wrap(
        spacing: 10,
        children: [
          TextButton(
              onPressed: () {
                // ignore: avoid_print
                print('Text Button: onPressed');
              },
              child: const Text(
                'Text Button',
                style: TextStyle(color: Colors.black, fontSize: 40),
              )),
          ElevatedButton(
              onPressed: () {
                // ignore: avoid_print
                print('Elevated Button: onPressed');
              },
              child: const Text(
                'Elevated Button',
                style: TextStyle(fontSize: 40),
              )),
          OutlinedButton(
              onPressed: () {
                // ignore: avoid_print
                print('Outlined Button: onPressed');
              },
              child: const Text(
                'Outlined Button',
                style: TextStyle(fontSize: 40),
              )),
        ],
      ),
    );
  }
}
```

<ZoomImg src="/images/flutter/Button1.png" title="Button()"/>
<div class="text-center mt-2">Button 展示效果</div>

---

```dart:line-numbers
// Button 示例二
class ButtonDemo extends StatelessWidget {
  const ButtonDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(10),
      child: Wrap(
        spacing: 10,
        children: [
          OutlinedButton(
              onPressed: () {
                // ignore: avoid_print
                print('轮廓按钮: onPressed');
              },
              style: ButtonStyle(
                textStyle:
                    MaterialStateProperty.all(const TextStyle(fontSize: 50)),
                foregroundColor: MaterialStateProperty.resolveWith((states) {
                  if (states.contains(MaterialState.pressed)) {
                    // 按下按钮时的前景色(字体)
                    return Colors.blue;
                  }
                  // 默认状态下的前景色(字体)
                  return Colors.green;
                }),
                backgroundColor: MaterialStateProperty.resolveWith((states) {
                  if (states.contains(MaterialState.pressed)) {
                    // 按下按钮时的背景色
                    return Colors.purple;
                  }
                  // 默认状态下的背景色
                  return Colors.white;
                }),
                shadowColor: MaterialStateProperty.all(Colors.black), // 阴影颜色
                elevation: MaterialStateProperty.all(10), // 阴影高度
                side: MaterialStateProperty.all(
                    const BorderSide(color: Colors.green, width: 3)), // 边框
                shape: MaterialStateProperty.all(const StadiumBorder()), // 按钮形状
                minimumSize:
                    MaterialStateProperty.all(const Size(400, 400)), // 按钮最小尺寸
                overlayColor:
                    MaterialStateProperty.all(Colors.blue), // 设置点击后水波纹颜色
              ),
              child: const Text('轮廓按钮')),
        ],
      ),
    );
  }
}
```

<ZoomImg src="/images/flutter/Button2.png" title="Button()"/>
<div class="text-center mt-2">Button 展示效果</div>

---

```dart:line-numbers
// Button 示例三
class ButtonDemo extends StatelessWidget {
  const ButtonDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(10),
      child: Wrap(
        spacing: 10,
        children: [
          // 设置按钮主题
          OutlinedButtonTheme(
              data: OutlinedButtonThemeData(
                  style: ButtonStyle(
                overlayColor: MaterialStateProperty.all(
                    const Color.fromRGBO(23, 43, 32, 0.3)),
              )),
              child: OutlinedButton(
                  onPressed: () {}, child: const Text('主题设定按钮'))),
          // 图标按钮
          IconButton(
            onPressed: () {},
            icon: const Icon(Icons.notifications_none),
            color: Colors.black, // 图标颜色
            splashColor: Colors.lightBlue, // 水波纹
            highlightColor: Colors.purple, // 高亮颜色,持续按住时的颜色,设置这个后,水波纹颜色会失效
            tooltip: '我是一个消息通知!', // 长按按钮会出现的提示
          ),
          // 文本图标按钮
          TextButton.icon(
            onPressed: () {},
            icon: const Icon(
              Icons.adf_scanner,
              color: Colors.black,
            ),
            label: const Text('打印', style: TextStyle(color: Colors.black)),
          ),
          // 凸起图标按钮
          ElevatedButton.icon(
            onPressed: () {},
            icon: const Icon(
              Icons.adf_scanner,
              color: Colors.black,
            ),
            label: const Text('打印', style: TextStyle(color: Colors.black)),
          ),
          // 镂空图标按钮
          OutlinedButton.icon(
            onPressed: () {},
            icon: const Icon(
              Icons.adf_scanner,
              color: Colors.black,
            ),
            label: const Text('打印', style: TextStyle(color: Colors.black)),
          ),
          // 按钮组
          Container(
            color: Colors.purple[100],
            width: double.infinity,
            child: ButtonBar(
              children: [
                ElevatedButton(
                  onPressed: () {},
                  child: const Text('确定'),
                ),
                ElevatedButton(
                  onPressed: () {},
                  child: const Text('取消'),
                ),
              ],
            ),
          ),
          // 回退按钮
          const BackButton(),
        ],
      ),
    );
  }
}
```

<ZoomImg src="/images/flutter/Button3.png" title="Button()"/>
<div class="text-center mt-2">Button 展示效果</div>

---

### Image() - 图片

- Image.asset (加载本地图片)
  - 在 Flutter 项目下, 创建图片存储目录
  - 在 pubspec.yaml 中的 flutter 部分添加图片配置
  - 在代码中加载图片

<ZoomImg src="/images/flutter/Image_asset.png" title="本地图片路径配置"/>
<div class="text-center mt-2">本地图片路径配置</div>

---

- Image.network (加载网络图片)
  - 保证网络畅通
  - 设置网络访问权限
  - 允许 http 协议访问

<ZoomImg src="/images/flutter/Image_network.png" title="网络访问权限"/>
<div class="text-center mt-2">安卓下网络权限配置</div>

```dart:line-numbers
// Image 示例
class ImageDemo extends StatelessWidget {
  const ImageDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        // 加载本地图片
        Image.asset('assets/img/product1.png',
            width: 300, height: 450, fit: BoxFit.fill),
        // 加载网络图片
        Image.network('https://picsum.photos/250?image=9',
            width: 300,
            height: 450,
            fit: BoxFit.fill,
            repeat: ImageRepeat.repeatY, // 重复方式
            colorBlendMode: BlendMode.colorBurn, // 模式模式: 和背景混合
            color: Colors.blue),
      ],
    );
  }
}
```

<ZoomImg src="/images/flutter/Image.png" title="Image 展示效果"/>
<div class="text-center mt-2">Image 展示效果</div>

---

### SingleChildScrollView() - 滚动列表

- SingleChildScrollView (类似 Android 中的 ScrollView)
  - child (子组件)
  - padding (内边距)
  - scrollDirection (滚动方向: Axis.horizontal | Axis.vertical)
  - reverse (初始滚动位置, false 头部、true 尾部)
  - physics
    - ClampingScrollPhysics: Android 下微光效果
    - BouncingScrollPhysics: iOS 下弹性效果

```dart
// SingleChildScrollView 示例
class SingleChildScrollViewDemo extends StatelessWidget {
  const SingleChildScrollViewDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        // 验证水平滚动
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          physics: const ClampingScrollPhysics(),
          child: Row(
            children: List.generate(
              20,
              (index) => Container(
                width: 100,
                height: 100,
                color: Colors.primaries[index % Colors.primaries.length],
                child: Center(
                  child: Text(
                    'Item $index',
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
        // 验证垂直滚动
        SingleChildScrollView(
          scrollDirection: Axis.vertical,
          physics: const BouncingScrollPhysics(), // 弹跳效果
          child: Column(
            children: List.generate(
              20,
              (index) => Container(
                width: 100,
                height: 100,
                color: Colors.primaries[index % Colors.primaries.length],
                child: Center(
                  child: Text(
                    'Item $index',
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
```

<ZoomImg src="/images/flutter/SingleChildScrollView.png" title="SingleChildScrollView 展示效果"/>
<div class="text-center mt-2">SingleChildScrollView 展示效果</div>

---

### ListView() - 列表

- ListView
  - 加载列表的组件 (加载所有 Widgets, 适用 Widget 较少的场景)
  - ListTile (leading、title、subtitle、trailing、selected)
- ListView.builder
  - 按需加载 Widget, 性能比默认构造函数高, 适用 Widget 较多的场景
- ListView.separated
  - 比 ListView.builder 多了分隔器

```dart:line-numbers
// ListView 示例
class ListViewDemo extends StatelessWidget {
  const ListViewDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return const SingleChildScrollView(
        child: Column(
      children: [ListViewBasic(), ListViewHorizontal()],
    ));
  }
}

class ListViewBasic extends StatelessWidget {
  const ListViewBasic({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 200,
      child: ListView(
        scrollDirection: Axis.vertical,
        children: [
          const ListTile(
            title: Text('Sun'),
            subtitle: Text('Sun is a star'),
            leading: Icon(Icons.wb_sunny),
            trailing: Icon(Icons.keyboard_arrow_right),
          ),
          ListTile(
            title: const Text('Moon'),
            subtitle: const Text('Moon is a satellite'),
            leading: const Icon(Icons.nights_stay),
            trailing: const Icon(Icons.keyboard_arrow_right),
            selected: true,
            selectedTileColor: Colors.purple[50],
          ),
          const ListTile(
            title: Text('Earth'),
            subtitle: Text('Earth is a planet'),
            leading: Icon(Icons.public),
            trailing: Icon(Icons.keyboard_arrow_right),
          ),
          const ListTile(
            title: Text('Mars'),
            subtitle: Text('Mars is a planet'),
            leading: Icon(Icons.public),
            trailing: Icon(Icons.keyboard_arrow_right),
          ),
        ],
      ),
    );
  }
}

class ListViewHorizontal extends StatelessWidget {
  const ListViewHorizontal({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
        height: 100,
        child: ListView(
          scrollDirection: Axis.horizontal,
          children: [
            Container(
              width: 300,
              height: 100,
              color: Colors.red,
            ),
            Container(
              width: 300,
              height: 100,
              color: Colors.green,
            ),
            Container(
              width: 300,
              height: 100,
              color: Colors.blue,
            ),
            Container(
              width: 300,
              height: 100,
              color: Colors.yellow,
            )
          ],
        ));
  }
}
```

<ZoomImg src="/images/flutter/ListView.png" title="ListView 展示效果"/>
<div class="text-center mt-2">ListView 展示效果</div>

---

```dart:line-numbers
// ListView.builder 和 ListView.separated
class ListViewDemo extends StatelessWidget {
  const ListViewDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return const SingleChildScrollView(
        child: Column(
      children: [ListViewBuilderDemo(), ListViewSeparatedDemo()],
    ));
  }
}

class ListViewBuilderDemo extends StatelessWidget {
  const ListViewBuilderDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
        height: 150,
        child: ListView.builder(
          scrollDirection: Axis.horizontal,
          itemCount: 10,
          itemExtent: 200, // 当前元素的主轴方向的长度
          itemBuilder: (BuildContext context, int index) {
            return Container(
              width: 150,
              margin: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: Colors.purple[200],
                borderRadius: BorderRadius.circular(20),
              ),
              child: Center(
                child: Text(
                  'Item ${index + 1}',
                  style: const TextStyle(color: Colors.white),
                ),
              ),
            );
          },
        ));
  }
}

class ListViewSeparatedDemo extends StatelessWidget {
  const ListViewSeparatedDemo({super.key});

  @override
  Widget build(BuildContext context) {
    final List<Widget> products = List.generate(20, (index) {
      return ListTile(
        leading: const Icon(Icons.ac_unit),
        title: Text('商品列表${index + 1}'),
        subtitle: const Text('子标题'),
        trailing: const Icon(Icons.arrow_circle_down_rounded),
      );
    });
    return Column(
      children: [
        const ListTile(
          title: Text('商品列表'),
        ),
        // 要给ListView添加高度，否则会报错
        SizedBox(
          height: 300,
          child: ListView.separated(
              itemBuilder: (BuildContext context, int index) {
                return products[index];
              },
              // 分隔器的构造器
              separatorBuilder: (BuildContext context, int index) {
                return Divider(
                  height: 1,
                  // 奇数行为紫色分割线，偶数行为蓝色分割线
                  color: index % 2 == 0 ? Colors.purple : Colors.blue,
                );
              },
              itemCount: products.length),
        )
      ],
    );
  }
}

```
