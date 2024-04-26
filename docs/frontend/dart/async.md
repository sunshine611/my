# 异步编程

## 单线程 (事件轮询 EventLoop)

- Dart 单线程的核心包括: 主线程、微任务、和宏任务
  - 微任务队列: 包含微任务, 主要通过 scheduleMicrotask 来调度
  - 事件队列(宏任务): 包含外部事件, 例如 I/O 、Timer、绘制事件等
  - 微任务优先级高于宏任务
- 同步与异步 (sync,async)
  - 同步: (4 X 100 米)
  - 异步: (100 米中有 8 个跑道)

<ZoomImg src="/images/dart/event_loop.png" title="eventLoop"/>

## 多线程 (Isolate)

- Isolate 是 Dart 中的线程
  - Dart 中的线程是以 **隔离 (Isolate)** 的方式存在的
  - 每个 Isolate 都有自己的独立的私有内存块 (多个线程不共享内存)
  - 没有共享内存, 就不需要竞争资源, 就不需要锁 (不用担心死锁问题)

<ZoomImg src="/images/dart/isolate1.png" title="Isolate存在位置"/>

### 创建 Isolate

- Isolate 类用来管理线程 (创建、暂停、杀死 Isolate 线程)

  👉 `Isolate.spawn()` : 创建一个新的 Isolate,它执行一个提供的函数，并允许你在不同的执行线程中运行代码。这是实现并行计算的常用方法。  
  👉 `Isolate.spawnUri()` : 用于根据指定的 URI 在一个新的 Isolate 中启动 Dart 代码。它允许你异步地在新 Isolate 中加载和运行一个 Dart 文件。  
  👉 `Isolate.pause()` : 暂停 Isolate 的执行,这通常用于调试或控制 Isolate 的执行。  
  👉 `Isolate.kill()` : 立即终止 Isolate 的执行。

---

- `Future<Isolate> Isolate.spawn(entryPoint,message)`
  - `import 'dart:isolate';`
  - entryPoint (必须是一个顶层方法或静态方法)
  - message
    - ① Dart 原始数据类型, 如 null、bool、int、double、String 等
    - ② SendPort 实例 - `ReceivePort().sendPort`
    - 包含 ① 和 ② 的 List 和 Map, 也可以嵌套

```dart
// 导入 Isolate 包
import 'dart:isolate';

void main() {
  // multiThread start
  // 当前线程:main
  // 当前线程:newThread
  // hello
  // multiThread end
  multipleThread();
}

void multipleThread() {
  print('multiThread start');
  print('当前线程:' + Isolate.current.debugName!);
  Isolate.spawn(newThread,'hello'); // 创建多个线程需要不同命名的函数
  print('multiThread end');
}

void newThread(String message){
    print('当前线程:' + Isolate.current.debugName!);
    print(message);
}
```

### 通信机制

- Isolate 多线程之间, 通信的唯一方式就是 Port
- ReceivePort 类
  - 初始化接收端口, 创建发送端口、接收消息、监听消息、关闭端口
- SendPort 类
  - 将消息发送给 ReceivePort
- 通信方式
  - 单向通信 (A -> B)
  - 双向通信 (A <-> B)

> **单向通信过程:** 在 rootIsolate 通过 ReceivePort() 实例化一个 R1 对象接收消息,再通过 R1 生成一个 P1,用来发送消息.在创建 Isolate 的时候把 P1 传到 newIsolate 里面,负责传递 newIsolate 的消息.

<ZoomImg src="/images/dart/isolate2.png" title="Isolate 单向通信"/>

> **双向通信过程:** 在 rootIsolate 通过 ReceivePort() 实例化一个 R1 对象接收消息,再通过 R1 生成一个 P1,用来发送消息.在创建 Isolate 的时候把 P1 传到 newIsolate 里面,负责传递 newIsolate 的消息.在 newIsolate 里面再通过 ReceivePort() 实例化一个 R2,R2 再生成一个 P2,通过 P1 的 send 方法把 P2 传递给 R1.于是 R1 有了 P2 发送消息,R2 有了 P1 发送消息.

<ZoomImg src="/images/dart/isolate3.png" title="Isolate 双向通信"/>

---

#### 单向通信实现

```dart
import 'dart:isolate';

void main() {
  multipleThread();
}

void multipleThread() {
  print('multipleThread start');
  print('当前线程:' + Isolate.current.debugName!);

  ReceivePort R1 = ReceivePort(); // 创建一个接口端口实例
  SendPort P1 = R1.sendPort; // 创建一个发送端口实例
  Isolate.spawn(newThread, P1); // 开启一个新的线程

  // 接收消息
  // dynamic msg = R1.first; // 接收 newThread 发送的消息
  // print(msg.toString());

  // 监听消息
  R1.listen((message) {
    print('接收到消息:' + message.toString());
    R1.close(); // 关闭接口端口
  });

  print('multipleThread end');
}

void newThread(SendPort P1) {
  print('newThread start');
  print('当前线程:' + Isolate.current.debugName!);
  P1.send('Hello World'); // 发送消息给 multipleThread
  print('newThread end');
}

```

#### 双向通信实现

```dart
import 'dart:isolate';

void main() {
  multipleThread();
}

// 主线程
void multipleThread() async {
  print('Multiple thread start');
  print('Current thread: ${Isolate.current.debugName}');

  final mainToNewThread = ReceivePort(); // 用于主线程接收消息的端口
  Isolate.spawn(newThread, mainToNewThread.sendPort); // 开启一个新的线程

  // 监听从新线程发来的消息
  final newThreadSendPort = await mainToNewThread.first as SendPort;

  final msg1 = await sendMessage(newThreadSendPort, 'Who is you?');
  print('Main thread received: $msg1');

  final msg2 = await sendMessage(newThreadSendPort, 'You is sun?');
  print('Main thread received: $msg2');

  mainToNewThread.close(); // 监听完成，关闭端口
  print('Multiple thread end');
}

// 新线程
void newThread(SendPort mainToNewThreadSendPort) async {
  print('New thread start');
  print('Current thread: ${Isolate.current.debugName}');
  final newToMainThread = ReceivePort(); // 用于新线程接收消息的端口
  mainToNewThreadSendPort.send(newToMainThread.sendPort); // 发送端口给主线程

  // 持续监听从主线程发来的消息
  await for (var message in newToMainThread) {
    final data = message[0];
    final SendPort replyToMainThread = message[1];
    print('New thread received message from main thread: $data');

    // 根据收到的消息来回复主线程
    if (data == 'Who is you?') {
      replyToMainThread.send('I am Sun!');
    } else if (data == 'You is sun?') {
      replyToMainThread.send('Yes, I am!');
    } else {
      replyToMainThread.send('I don’t understand the question.');
    }
  }
  print('New thread end');
}

// 封装发送消息
Future<dynamic> sendMessage(SendPort sendPort, String message) {
  print('Sending message to new thread: $message');
  dynamic response = ReceivePort();
  sendPort.send([message, response.sendPort]);
  return response.first;
}

```
