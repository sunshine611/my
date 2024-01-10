# HTML

## 1、简述一下你对 HTML 语义化的理解？

::: tip 参考答案

1. **用正确的标签做正确的事情。**
2. HTML 语义化让页面的 **内容结构化，结构更清晰**，便于对浏览器、搜索引擎解析；即使在没有样式 CSS 情况下也以一种文档格式显示，并且是容易阅读的；
3. 搜索引擎的爬虫也依赖于 HTML 标记来确定上下文和各个关键字的权重，**利于 SEO**；
4. 使阅读代码的人对网站更容易将网站分块，便于 **阅读维护理解**；
   :::

## 2、Label 的作用是什么？是怎么用的？

::: tip 参考答案
Label 标签来定义表单控制间的关系，**当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。**  
解析：**一种是 id 绑定，一种是嵌套**

```html
//第一种
<label for="Name">Number:</label>
<input type="text" name="Name" id="Name" />
//第二种
<label>Date:<input type="text" name="B" /></label>
```

:::

## 3、iframe 框架有哪些优缺点？

::: tip 参考答案
**优点：**

- iframe 能够原封不动得把嵌入得网页展现出来。
- 如果有多个网页引用 iframe，那么你只需要修改 iframe 得内容，就可以实现调用得每一个页面内容得修改，方便快捷。
- 网页如果为了统一风格，头部和版本都是一样的，就可以写成一个页面，用 iframe 来嵌套，可以增加代码的可重用。
- 如果遇到加载缓慢的第三方内容，如图标和广告，这些问题可以由 iframe 来解决。

**缺点：**

- 框架结构中出现各种滚动条
- iframe 会阻塞主页面的 Onload 事件
- 搜索引擎的检索程序无法解读这种页面，不利于 SEO
- iframe 和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。

:::

## 4、HTML 与 XHTML 二者有什么区别？你觉得应该使用哪一个并说出理由。

::: tip 参考答案
应该使用 XHTML，因为 XHTML 是 XML 重写了 HTML 的规范，比 HTML 更加严格，表现如下：

1. XHTML 中所有的标记都必须有一个相应的结束标签；
2. XHTML 所有标签的元素和属性的名字都必须使用小写；
3. 所有的 XML 标记都必须合理嵌套；
4. 所有的属性都必须用引号""括起来；
5. 把所有<和&特殊符号用编码表示；
6. 给所有属性赋一个值；
7. 不要再注释内容中使用"--"；
8. 图片必须使用说明文字。

:::

## 5、HTML5 的 form 如何关闭自动完成功能？

::: tip 参考答案
将不想要自动完成的 `form` 或 `input` 设置为 `autocomplete=off`
:::

## 6、title 与 h1 的区别、b 与 strong 的区别、i 与 em 的区别

::: tip 参考答案

**title 用于网站信息标题，突出网站标题或关键字，一个网站可以有多个 title，seo 权重高于 h1；**
**h1 概括的是文章主题，一个网页最好只用一个 h1，seo 权重低于 title。**

1. 从网站角度而言，title 这重于网站信息标题，突出网站标题或关键字用 title，一篇文章、一个页面最好只用一个 h1，h1 用得太多，会稀释主题；一个网站可以有多个 title，最好一个单页用一个 title 以便突出网站页面主题信息。
2. 从文章角度而言，h1 则概括的是文章主题，突出文章主题，用 h1，面对的用户，要突出其视觉效果。
3. 从 SEO 角度而言，title 的权重高于 H1，其适用性要比 H1 广。

**b 为了加粗而加粗，strong 为了标明重点而加粗**

1. b 这个标签对应 bold，即文本加粗，其目的仅仅是为了加粗显示文本，是一种样式／风格需求；
2. strong 这个标签意思是加强字符的语气，表示该文本比较重要，提醒读者／终端注意。为了达到这个目的，浏览器等终端将其加粗显示；

**i 为了斜体而斜体，em 为了标明重点而斜体，且对于搜索引擎来说 strong 和 em 比 b 和 i 要重视的多**

:::

## 7、请描述下 SEO 中的 TDK？

::: tip 参考答案
在 SEO 中，所谓的 TDK 其实就是 title、description、keywords 这三个标签，title 标题标签，description 描述标签，keywords 关键词标签
:::

## 8、每个 HTML 文件头里都有个很重要的东西，Doctype，知道这是干什么的么？

::: tip 参考答案
`<! DOCTYPE>` 声明位于文档中的最前面的位置，处于 `<html>` 标签之前。

1. 告知浏览器文档使用哪种 HTML 或 XHTML 规范。

2. 告诉浏览器按照何种规范解析页（如果你的页面没有 DOCTYPE 的声明，那么 compatMode 默认就是 BackCompat, 浏览器按照自己的方式解析渲染页面）

:::

## 9、简述一下 src 与 href 的区别。

::: tip 参考答案
**src 用于引用资源，替换当前元素；href 用于在当前文档和引用资源之间确立联系。**

- **href：** 标识超文本引用，用在 link 和 a 等元素上，href 是引用和页面关联，是在当前元素和引用资源之间建立联系。  
  若在文档中添加 href ，浏览器会识别该文档为 CSS 文件，就会并行下载资源并且不会停止对当前文档的处理。这也是为什么建议使用 link 方式加载 CSS，而不是使用 @import 方式。
- **src：** 表示引用资源，替换当前元素，用在 img，script，iframe 上，src 是页面内容不可缺少的一部分。  
  当浏览器解析到 src ，会暂停其他资源的下载和处理（图片不会暂停其他资源下载和处理），直到将该资源加载、编译、执行完毕，图片和框架等也如此，类似于将所指向资源应用到当前内容。这也是为什么建议把 js 脚本放在底部而不是头部的原因。

:::

## 10、严格模式与混杂模式

::: tip 参考答案
**严格模式：** 以浏览器支持的最高标准运行

**混杂模式：** 页面以宽松向下兼容的方式显示，模拟老式浏览器的行为
:::

## 11、对于 WEB 标准以及 W3C 的理解与认识问题

::: tip 参考答案
**web 标准** 简单来说可以分为 **结构、表现和行为** 。其中结构主要是有 HTML 标签组成。或许通俗点说，在页面 body 里面我们写入的标签都是为了页面的结构。表现即指 css 样式表，通过 css 可以是页面的结构标签更具美感。行为是指页面和用户具有一定的交互，同时页面结构或者表现发生变化，主要是有 js 组成。

web 标准一般是将该三部分独立分开，使其更具有模块化。但一般产生行为时，就会有结构或者表现的变化，也使这三者的界限并不那么清晰。

W3C 对 web 标准提出了规范化的要求，也就是在实际编程中的一些代码规范：

- 对于结构要求：（标签规范可以提高搜索引擎对页面的抓取效率，对 SEO 很有帮助）

1. 标签字母要小写
2. 标签要闭合
3. 标签不允许随意嵌套

- 对于 css 和 js 来说

1. 尽量使用外链 css 样式表和 js 脚本。是结构、表现和行为分为三块，符合规范。同时提高页面渲染速度，提高用户的体验。
2. 样式尽量少用行间样式表，使结构与表现分离，标签的 id 和 class 等属性命名要做到见文知义，标签越少，加载越快，用户体验提高，代码维护简单，便于改版。
3. 不需要变动页面内容，便可提供打印版本而不需要复制内容，提高网站易用性。

:::

## 12、列举 IE 与其他浏览器不一样的特性？

::: tip 参考答案

1. IE 的排版引擎是 Trident （又称为 MSHTML）

2. Trident 内核曾经几乎与 W3C 标准脱节（2005 年）

3. Trident 内核的大量 Bug 等安全性问题没有得到及时解决

4. JS 方面，有很多独立的方法，例如绑定事件的 attachEvent、创建事件的 createEventObject 等

5. CSS 方面，也有自己独有的处理方式，例如设置透明，低版本 IE 中使用滤镜的方式

:::

## 13、前端页面有哪三层构成，分别是什么？作用是什么？

::: tip 参考答案
**结构层（structural layer）：** 由 HTML 或 XHTML 之类的标记语言负责创建。标签，也就是那些出现在尖括号里的单词，对网页内容的语义含义做出了描述，但这些标签不包含任何关于如何显示有关内容的信息。例如，P 标签表达了这样一种语义：“这是一个文本段。”

**表示层（presentation layer）：** 由 CSS 负责创建。 CSS 对“如何显示有关内容”的问题做出了回答。

**行为层（behavior layer）：** 负责回答“内容应该如何对事件做出反应”这一问题。这是 Javascript 语言和 DOM 主宰的领域。

:::

## 14、网页验证码是干嘛的，是为了解决什么安全问题？

::: tip 参考答案

- 区分用户是计算机还是人的公共全自动程序。可以防止恶意破解密码、刷票、论坛灌水。
- 有效防止黑客对某一个特定注册用户用特定程序暴力破解方式进行不断的登陆尝试。

:::

## 15、为什么用多个域名存储网站资源更有效？

::: tip 参考答案

- CDN 缓存更方便
- 突破浏览器并发限制
- 节约 cookie 带宽
- 节约主域名的连接数，优化页面响应速度
- 防止不必要的安全问题

:::

## 16、页面可见性（Page Visibility）API 可以有哪些用途？

::: tip 参考答案

**页面可见性：** 就是对于用户来说，页面是显示还是隐藏, 所谓显示的页面，就是我们正在看的页面；隐藏的页面，就是我们没有看的页面。 因为，我们一次可以打开好多标签页面来回切换着，始终只有一个页面在我们眼前，其他页面就是隐藏的，还有一种就是.........，(把浏览器最小化，所有的页面就都不可见了)。

API 很简单，document.hidden 就返回一个布尔值，如果是 true, 表示页面可见，false 则表示，页面隐藏。 不同页面之间来回切换，触发 visibilitychange 事件。 还有一个 document.visibilityState, 表示页面所处的状态，取值：visible, hidden。

```js
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    document.title = "hidden";
  } else {
    document.title = "visibile";
  }
});
```

我们打开这个页面，然后再打开另一个页面，来回点击这两个页面，当我们看到这个页面时，标题显示 visiable , 当我们看另一个页面时，标题显示 hidden;

动画，视频，音频都可以在页面显示时打开，在页面隐藏时关闭

:::

## 17、Quirks（怪癖）模式是什么？它和 Standards（标准）模式有什么区别

::: tip 参考答案

1 以 ie6 为例，如果写了 DTD，就意味着这个页面将采用对 CSS 支持更好的布局，而如果没有，则采用兼容之前的布局方式。这就是 Quirks 模式（怪癖模式，诡异模式，怪异模式）。

2 区别：总体会有布局、样式解析和脚本执行三个方面的区别。

设置一个元素的宽度和高度

给 `<span>` 等行内元素设置 width 和 height

用 margin:0 auto 设置水平居中

从 IE6 开始，引入了 Standards 模式，标准模式中，浏览器尝试给符合标准的文档在规范上的正确处理达到在指定浏览器中的程度。

在 IE6 之前 CSS 还不够成熟，所以 IE5 等之前的浏览器对 CSS 的支持很差， IE6 将对 CSS 提供更好的支持，然而这时的问题就来了，因为有很多页面是基于旧的布局方式写的，而如果 IE6 支持 CSS 则将令这些页面显示不正常，如何在即保证不破坏现有页面，又提供新的渲染机制呢？

在写程序时我们也会经常遇到这样的问题，如何保证原来的接口不变，又提供更强大的功能，尤其是新功能不兼容旧功能时。遇到这种问题时的一个常见做法是增加参数和分支，即当某个参数为真时，我们就使用新功能，而如果这个参数 不为真时，就使用旧功能，这样就能不破坏原有的程序，又提供新功能。IE6 也是类似这样做的，它将 DTD（文档类型定义）当成了这个“参数”，因为以前的页面大家都不会去写 DTD，所以 IE6 就假定 如果写了 DTD，就意味着这个页面将采用对 CSS 支持更好的布局，而如果没有，则采用兼容之前的布局方式。这就是 Quirks 模式（怪癖模式，诡异模式，怪异模式）。

区别：

总体会有布局、样式解析和脚本执行三个方面的区别。

盒模型：在 W3C 标准中，如果设置一个元素的宽度和高度，指的是元素内容的宽度和高度，而在 Quirks 模式下，IE 的宽度和高度还包含了 padding 和 border。

设置行内元素的高宽：在 Standards 模式下，给 `<span>` 等行内元素设置 wdith 和 height 都不会生效，而在 quirks 模式下，则会生效。

设置百分比的高度：在 standards 模式下，一个元素的高度是由其包含的内容来决定的，如果父元素没有设置百分比的高度，子元素设置一个百分比的高度是无效的

用 margin:0 auto 设置水平居中：使用 margin:0 auto 在 standards 模式下可以使元素水平居中，但在 quirks 模式下却会失效。

:::

## 18、div+css 的布局较 table 布局有什么优点？

::: tip 参考答案

分离、方便改版、清晰简洁、seo

- 改版的时候更方便，只要改 css 文件。

- 页面加载速度更快、结构化清晰、页面显示简洁。

- 表现与结构相分离。

- 易于优化（seo）搜索引擎更友好，排名更容易靠前。

:::

## 19、你能描述一下渐进增强和优雅降级之间的不同吗?

::: tip 参考答案

**渐进增强(progressive enhancement)：** 针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。

（一开始保证最基本的功能，再改进和追加功能）

**优雅降级(graceful degradation)：** 一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。

（一开始就构建完整的功能，再针对低版本浏览器进行兼容。）

**区别：** 优雅降级是从复杂的现状开始，并试图减少用户体验的供给，而渐进增强则是从一个非常基础的，能够起作用的版本开始，并不断扩充，以适应未来环境的需要。降级（功能衰减）意味着往回看；而渐进增强则意味着朝前看，同时保证其根基处于安全地带。

:::

## 20、请谈一下你对网页标准和标准制定机构重要性的理解。

::: tip 参考答案

降低开发难度及开发成本，减少各种 BUG、安全问题， 提高网站易用性

:::

## 21、知道什么是微格式吗？谈谈理解。在前端构建中应该考虑微格式吗？

::: tip 参考答案

**微格式（Microformats）：** 是一种让机器可读的语义化 XHTML 词汇的集合，是结构化数据的开放标准。是为特殊应用而制定的特殊格式。

**优点：** 将智能数据添加到网页上，让网站内容在搜索引擎结果界面可以显示额外的提示。（应用范例：豆瓣，有兴趣自行 google）

:::

## 22、html 常见兼容性问题？

::: tip 参考答案

1. 双边距 BUG float 引起的，解决办法: 使用 display 解决
2. 3 像素问题 使用 float 引起的，解决办法: 使用 dislpay:inline -3px
3. 超链接 hover 点击后失效，解决办法: 使用正确的书写顺序 link visited hover active
4. Ie z-index 问题，解决办法: 给父级添加 position:relative
5. Png 透明 ，解决办法: 使用 js 代码
6. Min-height 最小高度 ，解决办法: ！Important 解决
7. select 在 ie6 下遮盖，解决办法: 使用 iframe 嵌套
8. 为什么没有办法定义 1px 左右的宽度容器，解决办法: （IE6 默认的行高造成的，使用 over:hidden, zoom:0.08 line-height:1px）
9. IE5-8 不支持 opacity，解决办法：

```css
.opacity {
    opacity: 0.4;
    filter: alpha(opacity=60);/_ for IE5-7 _/ -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";/_ for IE 8_/
}
```

10. IE6 不支持 PNG 透明背景，解决办法: IE6 下使用 gif 图片

:::

## 23、对 WEB 标准以及 W3C 的理解与认识

::: tip 参考答案

标签闭合、标签小写、不乱嵌套、提高搜索机器人搜索几率、使用外链 css 和 js 脚本、结构行为表现的分离、文件下载与页面速度更快、内容能被更多的用户所访问、内容能被更广泛的设备所访问、更少的代码和组件，容易维护、改版方便，不需要变动页面内容、提供打印版本而不需要复制内容、提高网站易用性。

:::

## 24、如何在页面上实现一个圆形的可点击区域？

::: tip 参考答案

css3、js、map 加 area

1. border-radius (css3)

对于圆形，最直接的方法想到的就是 css3 的圆角属性，这个属性可以将 html 元素的形状设置为圆形，这之后你想对该圆形区域设置什么事件就设置什么事件(当然包括点击)。（这里就不做具体的 test 了）

2. 通过事件坐标来实现（js）

也就是通过 js 来进行一个区域判断，进而简介地的形成可点区域，以下给出主要的 js 测试代码：

```js
// 获取目标元素
var box = document.getElementById("box");

// 对目标元素target的圆形区域进行一个点击事件绑定
function bindClickOnCircleArea(target, callback) {
  target.onclick = function (e) {
    e = e || window.event;

    // target中心点的坐标
    var x1 = 100;
    var y1 = 100;

    // 事件源坐标
    var x2 = e.offsetX;
    var y2 = e.offsetY;

    // 校验是否在圆形点击区，在的话就执行callback回调
    // 计算事件触发点与target中心的位置
    var len = Math.abs(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
    // 通过半径进行校验
    if (len <= 100) {
      callback();
    } else {
      alert("啊啊啊");
    }
  };
}

// 执行
bindClickOnCircleArea(box, function () {
  alert("呜呜呜");
});
```

3. 通过 map 加 area

```html
<img src="../imgs/test.jpg" width="200" border="0" usemap="#Map" />
<map name="Map" id="Map">
  <area shape="circle" coords="100,100,100" href="http://www.baidu.com" target="_blank" />
</map>
```

:::

## 25、前端需要注意哪些 SEO

::: tip 参考答案

1. 合理的 title、description、keywords：搜索对着三项的权重逐个减小，title 值强调重点即可，重要关键词出现不要超过 2 次，而且要靠前，不同页面 title 要有所不同；description 把页面内容高度概括，长度合适，不可过分堆砌关键词，不同页面 description 有所不同；keywords 列举出重要关键词即可。

2. 语义化的 HTML 代码，符合 W3C 规范：语义化代码让搜索引擎容易理解网页。

3. 重要内容 HTML 代码放在最前：搜索引擎抓取 HTML 顺序是从上到下，有的搜索引擎对抓取长度有限制，保证重要内容一定会被抓取。

4. 重要内容不要用 js 输出：爬虫不会执行 js 获取内容。

5. 少用 iframe：搜索引擎不会抓取 iframe 中的内容。

6. 非装饰性图片必须加 alt。

7. 提高网站速度：网站速度是搜索引擎排序的一个重要指标。

:::

## 26、html5 有哪些新特性、移除了那些元素？

::: tip 参考答案

- **新特性：**

  1. 拖拽释放(Drag and drop) API

  2. 语义化更好的内容标签（header,nav,footer,aside,article,section）

  3. 音频、视频 API(audio,video)

  4. 画布(Canvas) API

  5. 地理(Geolocation) API

  6. 本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失；

  7. sessionStorage 的数据在浏览器关闭后自动删除

  8. 表单控件，calendar、date、time、email、url、search

  9. 新的技术 webworker, websocket, Geolocation

- **移除的元素：**

  1. 纯表现的元素：basefont，big，center，font, s，strike，tt，u；

  2. 对可用性产生负面影响的元素：frame，frameset，noframes；

- **支持 HTML5 新标签：**

  1. IE8/IE7/IE6 支持通过 document.createElement 方法产生的标签， 可以利用这一特性让这些浏览器支持 HTML5 新标签， 浏览器支持新标签后，还需要添加标签默认的样式；

  2. 当然最好的方式是直接使用成熟的框架、使用最多的是 html5shim 框架；

```html
<!--[if lt IE 9]>
  <script>
    src = "http://html5shim.googlecode.com/svn/trunk/html5.js";
  </script>
<![endif]-->
```

:::

## 27、HTML5 的离线储存怎么使用，工作原理能不能解释一下？

::: tip 参考答案

在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件。

原理：HTML5 的离线存储是基于一个新建的.appcache 文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像 cookie 一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。

使用方法

只要在头部加一个 manifest 属性就 ok 了

```html
<!DOCTYPE html>
<html manifest="cache.manifest">
  ...
</html>
```

然后 cache.manifest 文件的书写方式如下：

```
CACHE MANIFEST
#v0.11

CACHE:

js/app.js
css/style.css

NETWORK:
resourse/logo.png

FALLBACK:
/ /offline.html
```

代码说明：

离线存储的 manifest 一般由三个部分组成:

1. CACHE:表示需要离线存储的资源列表，由于包含 manifest 文件的页面将被自动离线存储，所以不需要把页面自身也列出来。
2. NETWORK:表示在它下面列出来的资源只有在在线的情况下才能访问，他们不会被离线存储，所以在离线情况下无法使用这些资源。不过，如果在 CACHE 和 NETWORK 中有一个相同的资源，那么这个资源还是会被离线存储，也就是说 CACHE 的优先级更高。
3. FALLBACK:表示如果访问第一个资源失败，那么就使用第二个资源来替换他，比如上面这个文件表示的就是如果访问根目录下任何一个资源失败了，那么就去访问 offline.html。

:::

## 28、浏览器是怎么对 HTML5 的离线储存资源进行管理和加载的呢

::: tip 参考答案

在线的情况下，浏览器发现 html 头部有 manifest 属性，它会请求 manifest 文件，如果是第一次访问 app，那么浏览器就会根据 manifest 文件的内容下载相应的资源并且进行离线存储。如果已经访问过 app 并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的 manifest 文件与旧的 manifest 文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。 离线的情况下，浏览器就直接使用离线存储的资源。

:::

## 29、HTML 全局属性(global attribute)有哪些

::: tip 参考答案

- accesskey: 设置快捷键，提供快速访问元素如 aaa 在 windows 下的 firefox 中按 alt + shift + a 可激活元素
- class: 为元素设置类标识，多个类名用空格分开，CSS 和 javascript 可通过 class 属性获取元素
- contenteditable: 指定元素内容是否可编辑
- contextmenu: 自定义鼠标右键弹出菜单内容
- data-\*: 为元素增加自定义属性
- dir: 设置元素文本方向
- draggable: 设置元素是否可拖拽
- dropzone: 设置元素拖放类型： copy, move, link
- hidden: 表示一个元素是否与文档。样式上会导致元素不显示，但是不能用这个属性实现样式效果
- id: 元素 id，文档内唯一
- lang: 元素内容的的语言
- spellcheck: 是否启动拼写和语法检查
- style: 行内 css 样式
- tabindex: 设置元素可以获得焦点，通过 tab 可以导航
- title: 元素相关的建议信息
- translate: 元素和子孙节点内容是否需要本地化

:::

## 30、Canvas 和 SVG 有什么区别？

::: tip 参考答案

**Canvas 和 SVG 都允许您在浏览器中创建图形，但是它们在根本上是不同的。**

**Canvas：** 通过 Javascript 来绘制 2D 图形。 是逐像素进行渲染的。 其位置发生改变，会重新进行绘制。

- 依赖分辨率
- 不支持事件处理器
- 弱的文本渲染能力
- 能够以 .png 或 .jpg 格式保存结果图像
- 最适合图像密集型的游戏，其中的许多对象会被频繁重绘

**SVG：** 一种使用 XML 描述的 2D 图形的语言，SVG 基于 XML 意味着，SVG DOM 中的每个元素都是可用的，可以为某个元素附加 Javascript 事件处理器。 在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。

- 不依赖分辨率
- 支持事件处理器
- 最适合带有大型渲染区域的应用程序（比如谷歌地图）
- 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）
- 不适合游戏应用

:::

## 31、HTML5 为什么只需要写 `<!DOCTYPE HTML>` ？

::: tip 参考答案

HTML 4.01 中的 doctype 需要对 DTD 进行引用，因为 HTML 4.01 基于 SGML。而 HTML 5 不基于 SGML，因此不需要对 DTD 进行引用，但是需要 doctype 来规范浏览器的行为。其中，SGML 是标准通用标记语言, 简单的说，就是比 HTML, XML 更老的标准，这两者都是由 SGML 发展而来的。BUT，HTML5 不是的。

`<!DOCTYPE>` 声明位于位于 HTML 文档中的第一行，处于 `<html>` 标签之前。作用：告知浏览器的解析器用什么文档标准解析这个文档。DOCTYPE 不存在或格式不正确会导致文档以怪异模式呈现。

:::

## 32、meta viewport 原理是什么？

::: tip 参考答案

meta viewport 标签的作用是让当前 viewport 的宽度等于设备的宽度，同时不允许用户进行手动缩放

viewport 的原理：移动端浏览器通常都会在一个比移动端屏幕更宽的虚拟窗口中渲染页面，这个虚拟窗口就是 viewport; 目的是正常展示没有做移动端适配的网页，让他们完整的展示给用户；

**Viewport ：** 字面意思为视图窗口，在移动 web 开发中使用。表示将设备浏览器宽度虚拟成一个特定的值（或计算得出），这样利于移动 web 站点跨设备显示效果基本一致。移动版的 Safari 浏览器最新引进了 viewport 这个 meta tag，让网页开发者来控制 viewport 的大小和缩放，其他手机浏览器也基本支持。

在移动端浏览器当中，存在着两种视口，一种是可见视口（也就是我们说的设备大小），另一种是视窗视口（网页的宽度是多少）。 举个例子：如果我们的屏幕是 320 像素 \* 480 像素的大小（iPhone4），假设在浏览器中，320 像素的屏幕宽度能够展示 980 像素宽度的内容。那么 320 像素的宽度就是可见视口的宽度，而能够显示的 980 像素的宽度就是视窗视口的宽度。

为了显示更多的内容，大多数的浏览器会把自己的视窗视口扩大，简易的理解，就是让原本 320 像素的屏幕宽度能够容下 980 像素甚至更宽的内容（将网页等比例缩小）。

:::

## 33、对 web 标准、可用性、可访问性的理解

::: tip 参考答案

**可用性（Usability）：** 产品是否容易上手，用户能否完成任务，效率如何，以及这过程中用户的主观感受可好，是从用户的角度来看产品的质量。可用性好意味着产品质量高，是企业的核心竞争力。

**可访问性（Accessibility）：** Web 内容对于残障用户的可阅读和可理解性

**可维护性（Maintainability）：** 一般包含两个层次，一是当系统出现问题时，快速定位并解决问题的成本，成本低则可维护性好。二是代码是否容易被人理解，是否容易修改和增强功能。

:::

## 34、HTML5 引入什么新的表单属性？

::: tip 参考答案

Datalist、datetime、output、keygen、date、month、week、time、number、range、emailurl

:::

## 35、新的 HTML5 文档类型和字符集是？

::: tip 参考答案

HTML5 文档类型：<!doctype html>
HTML5 使用的编码<meta charset=”UTF-8”>

:::

## 36、HTML5 Canvas 元素有什么用？

::: tip 参考答案

Canvas 元素用于在网页上绘制图形，该元素标签强大之处在于可以直接在 HTML 上进行图形操作。

:::

## 37、HTML5 存储类型有什么区别？

::: tip 参考答案

Media API、Text Track API、Application Cache API、User Interaction、Data Transfer API、Command API、Constraint Validation API、History API

:::

## 38、iframe 的作用

::: tip 参考答案

iframe 是用来在网页中插入第三方页面，早期的页面使用 iframe 主要是用于导航栏这种很多页面都相同的部分，这样在切换页面的时候避免重复下载。

**优点：**

1. 便于修改，模拟分离，像一些信息管理系统会用到。
2. 但现在基本不推荐使用。除非特殊需要，一般不推荐使用。

**缺点：**

1. iframe 的创建比一般的 DOM 元素慢了 1-2 个数量级
2. iframe 标签会阻塞页面的的加载，如果页面的 onload 事件不能及时触发，会让用户觉得网页加载很慢，用户体验不好，在 Safari 和 Chrome 中可以通过 js 动态设置
3. iframe 的 src 属性来避免阻塞。
4. iframe 对于 SEO 不友好，替换方案一般就是动态语言的 Incude 机制和 ajax 动态填充内容等。

:::

## 39、为什么最好把 CSS 的 `<link>` 标签放在 `<head></head>` 之间？为什么最好把 JS 的 `<script>` 标签恰好放在 `</body>` 之前，有例外情况吗？

::: tip 参考答案

**把 `<link>` 放在 `<head>` 中**

把 `<link>` 标签放在 `<head></head>` 之间是规范要求的内容。此外，这种做法可以让页面逐步呈现，提高了用户体验。将样式表放在文档底部附近，会使许多浏览器（包括 Internet Explorer）不能逐步呈现页面。一些浏览器会阻止渲染，以避免在页面样式发生变化时，重新绘制页面中的元素。这种做法可以防止呈现给用户空白的页面或没有样式的内容。

**把 `<script>` 标签恰好放在 `</body>` 之前**

脚本在下载和执行期间会阻止 HTML 解析。把 `<script>` 标签放在底部，保证 HTML 首先完成解析，将页面尽早呈现给用户。

例外情况是当你的脚本里包含 `document.write()` 时。但是现在， `document.write()` 不推荐使用。同时，将 `<script>` 标签放在底部，意味着浏览器不能开始下载脚本，直到整个文档（document）被解析。也许，对此比较好的做法是， `<script>` 使用 defer 属性，放在 `<head>`中。

:::

## 40、什么是渐进式渲染（progressive rendering）？

::: tip 参考答案

渐进式渲染是用于提高网页性能（尤其是提高用户感知的加载速度），以尽快呈现页面的技术。

在以前互联网带宽较小的时期，这种技术更为普遍。如今，移动终端的盛行，而移动网络往往不稳定，渐进式渲染在现代前端开发中仍然有用武之地。

一些举例：

- 图片懒加载——页面上的图片不会一次性全部加载。当用户滚动页面到图片部分时，JavaScript 将加载并显示图像。
- 确定显示内容的优先级（分层次渲染）——为了尽快将页面呈现给用户，页面只包含基本的最少量的 CSS、脚本和内容，然后可以使用延迟加载脚本或监听 DOMContentLoaded/load 事件加载其他资源和内容。
- 异步加载 HTML 片段——当页面通过后台渲染时，把 HTML 拆分，通过异步请求，分块发送给浏览器。

:::

## 41、DOM 和 BOM 有什么区别

::: tip 参考答案

**DOM：**

Document Object Model，文档对象模型

DOM 是为了操作文档出现的 API，document 是其的一个对象

DOM 和文档有关，这里的文档指的是网页，也就是 html 文档。DOM 和浏览器无关，他关注的是网页本身的内容。

**BOM：**

Browser Object Model，浏览器对象模型

BOM 是为了操作浏览器出现的 API，window 是其的一个对象

window 对象既为 javascript 访问浏览器提供 API，同时在 ECMAScript 中充当 Global 对象

:::

## 42、img 上 title 与 alt

::: tip 参考答案

title 指图片的信息、alt 指图片不显示时显示的文字

:::

## 43、一个 iframe，内嵌了一个 A 页面，iframe 的宽高不停变化，如何让 A 页面的宽高实时自适应这个 iframe 的宽高大小。请说出至少 3 种方法，越难越好

::: tip 参考答案

css 的方案
onresize
监听鼠标动作，鼠标释放后重新定宽

:::

## 44、DOM Tree 是如何构建的？

::: tip 参考答案

**HTML 解释器：**
HTML 解释器的工作就是将网络或者本地磁盘获取的 HTML 网页和资源从字节流解释成 DOM 树结构。

**JavaScript 的执行：**
在 HTML 解释器的工作过程中，可能会有 JavaScript 代码需要执行，它发生在将字符串解释成词语之后、创建各种节点的时候。这也是为什么全局执行的 JavaScript 代码不能访问 DOM 的原因——因为 DOM 树还没有被创建完呢。

:::

## 45、`<noscript>` 标签的作用

::: tip 参考答案

noscript 元素用来定义在脚本未被执行时的替代内容（文本）。

此标签可被用于可识别 `<script>` 标签但无法支持其中的脚本的浏览器。

:::

## 46、SGML 、 HTML 、XML 和 XHTML 的区别？

::: tip 参考答案

**SGML:** 是标准通用标记语言，是一种定义电子文档结构和描述其内容的国际标准语言，是所有电子文档标记语言的起源。

**HTML:** 是超文本标记语言，主要是用于规定怎么显示网页。

**XML:** 是可扩展标记语言是未来网页语言的发展方向，XML 和 HTML 的最大区别就在于 XML 的标签是可以自己创建的，数量无限多，
而 HTML 的标签都是固定的而且数量有限。

**XHTML:** 也是现在基本上所有网页都在用的标记语言，他其实和 HTML 没什么本质的区别，标签都一样，用法也都一样，就是比 HTML
更严格，比如标签必须都用小写，标签都必须有闭合标签等。

:::

## 47、DTD 介绍

::: tip 参考答案

DTD（ Document Type Definition 文档类型定义）是一组机器可读的规则，它们定义 XML 或 HTML 的特定版本中所有允许元
素及它们的属性和层次关系的定义。在解析网页时，浏览器将使用这些规则检查页面的有效性并且采取相应的措施。

DTD 是对 HTML 文档的声明，还会影响浏览器的渲染模式（工作模式）。

:::

## 48、行内元素定义

::: tip 参考答案

**HTML4 中，元素被分成两大类：** inline （内联元素）与 block（块级元素）。一个行内元素只占据它对应标签的边框所包含的空
间。

常见的行内元素有 a b span img strong sub sup button input label select textarea

:::

## 49、块级元素定义

::: tip 参考答案

块级元素占据其父元素（容器）的整个宽度，因此创建了一个“块”。

常见的块级元素有 div ul ol li dl dt dd h1 h2 h3 h4 h5 h6 p

:::

## 50、行内元素与块级元素的区别？

::: tip 参考答案

HTML4 中，元素被分成两大类：inline （内联元素）与 block （块级元素）。

- 格式上，默认情况下，行内元素不会以新行开始，而块级元素会新起一行。
- 内容上，默认情况下，行内元素只能包含文本和其他行内元素。而块级元素可以包含行内元素和其他块级元素。
- 行内元素与块级元素属性的不同，主要是盒模型属性上：行内元素设置 width 无效，height 无效（可以设置 line-height），设置 margin 和 padding 的上下不会对其他元素产生影响。

:::

## 51、空元素定义

::: tip 参考答案

标签内没有内容的 HTML 标签被称为空元素。空元素是在开始标签中关闭的。

常见的空元素有：br hr img input link meta

:::

## 52、link 标签定义

::: tip 参考答案

link 标签定义文档与外部资源的关系。

link 元素是空元素，它仅包含属性。 此元素只能存在于 head 部分，不过它可出现任何次数。

link 标签中的 rel 属性定义了当前文档与被链接文档之间的关系。常见的 stylesheet 指的是定义一个外部加载的样式表。

:::

## 53、页面导入样式时，使用 link 和 @import 有什么区别？

::: tip 参考答案

- **从属关系区别：** @import 是 CSS 提供的语法规则，只有导入样式表的作用；link 是 HTML 提供的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性、引入网站图标等。

- **加载顺序区别：** 加载页面时，link 标签引入的 CSS 被同时加载；@import 引入的 CSS 将在页面加载完毕后被加载。

- **兼容性区别：** @import 是 CSS2.1 才有的语法，故只可在 IE5+ 才能识别；link 标签作为 HTML 元素，不存在兼容性问题。

- **DOM 可控性区别：** 可以通过 JS 操作 DOM ，插入 link 标签来改变样式；由于 DOM 方法是基于文档的，无法使用 @import 的方式插入样式。

:::

## 54、async 和 defer 的作用是什么？有什么区别？（浏览器解析过程）

::: tip 参考答案

- 脚本没有 defer 或 async，浏览器会立即加载并执行指定的脚本，也就是说不等待后续载入的文档元素，读到就加载并执行。

- defer 属性表示延迟执行引入的 JavaScript，即这段 JavaScript 加载时 HTML 并未停止解析，这两个过程是并行的。当整个 document 解析完毕后再执行脚本文件，在 DOMContentLoaded 事件触发之前完成。多个脚本按顺序执行。

- async 属性表示异步执行引入的 JavaScript，与 defer 的区别在于，如果已经加载好，就会开始执行，也就是说它的执行仍然会阻塞文档的解析，只是它的加载过程不会阻塞。多个脚本的执行顺序无法保证。

:::

## 55、什么是文档的预解析？（浏览器解析过程）

::: tip 参考答案

Webkit 和 Firefox 都做了这个优化，当执行 JavaScript 脚本时，另一个线程解析剩下的文档，并加载后面需要通过网络加载的资源。这种方式可以使资源并行加载从而使整体速度更快。需要注意的是，预解析并不改变 DOM 树，它将这个工作留给主解析过程，自己只解析外部资源的引用，比如外部脚本、样式表及图片。

:::

## 56、CSS 如何阻塞文档解析？（浏览器解析过程）

::: tip 参考答案

理论上，既然样式表不改变 DOM 树，也就没有必要停下文档的解析等待它们，然而，存在一个问题，JavaScript 脚本执行时可能在文档的解析过程中请求样式信息，如果样式还没有加载和解析，脚本将得到错误的值，显然这将会导致很多问题。

所以如果浏览器尚未完成 CSSOM 的下载和构建，而我们却想在此时运行脚本，那么浏览器将延迟 JavaScript 脚本执行和文档的解析，直至其完成 CSSOM 的下载和构建。也就是说，在这种情况下，浏览器会先下载和构建 CSSOM，然后再执行 JavaScript，最后再继续文档的解析。

:::

## 57、渲染页面时常见哪些不良现象？（浏览器渲染过程）

::: tip 参考答案

**FOUC：** 主要指的是样式闪烁的问题，由于浏览器渲染机制（比如 firefox），在 CSS 加载之前，先呈现了 HTML，就会导致展示出无样式内容，然后样式突然呈现的现象。会出现这个问题的原因主要是 css 加载时间过长，或者 css 被放在了文档底部。

**白屏：** 有些浏览器渲染机制（比如 chrome）要先构建 DOM 树和 CSSOM 树，构建完成后再进行渲染，如果 CSS 部分放在 HTML 尾部，由于 CSS 未加载完成，浏览器迟迟未渲染，从而导致白屏；也可能是把 js 文件放在头部，脚本的加载会阻塞后面文档内容的解析，从而页面迟迟未渲染出来，出现白屏问题。

:::

## 58、如何优化关键渲染路径？（浏览器渲染过程）

::: tip 参考答案

为尽快完成首次渲染，我们需要最大限度减小以下三种可变因素：

1. 关键资源的数量。
2. 关键路径长度。
3. 关键字节的数量。

关键资源是可能阻止网页首次渲染的资源。这些资源越少，浏览器的工作量就越小，对 CPU 以及其他资源的占用也就越少。

同样，关键路径长度受所有关键资源与其字节大小之间依赖关系图的影响：某些资源只能在上一资源处理完毕之后才能开始下载，
并且资源越大，下载所需的往返次数就越多。

最后，浏览器需要下载的关键字节越少，处理内容并让其出现在屏幕上的速度就越快。要减少字节数，我们可以减少资源数（将它
们删除或设为非关键资源），此外还要压缩和优化各项资源，确保最大限度减小传送大小。

**优化关键渲染路径的常规步骤如下：**

1. 对关键路径进行分析和特性描述：资源数、字节数、长度。
2. 最大限度减少关键资源的数量：删除它们，延迟它们的下载，将它们标记为异步等。
3. 优化关键字节数以缩短下载时间（往返次数）。
4. 优化其余关键资源的加载顺序：您需要尽早下载所有关键资产，以缩短关键路径长度。

:::

## 59、什么是重绘和回流？（浏览器绘制过程）

::: tip 参考答案

**重绘：** 当渲染树中的一些元素需要更新属性，而这些属性只是影响元素的外观、风格，而不会影响布局的操作，比如 background-color，我们将这样的操作称为重绘。

**回流：** 当渲染树中的一部分（或全部）因为元素的规模尺寸、布局、隐藏等改变而需要重新构建的操作，会影响到布局的操作，这样的操作我们称为回流。

**常见引起回流属性和方法：**

任何会改变元素几何信息（元素的位置和尺寸大小）的操作，都会触发回流。

1. 添加或者删除可见的 DOM 元素；
2. 元素尺寸改变——边距、填充、边框、宽度和高度
3. 内容变化，比如用户在 input 框中输入文字
4. 浏览器窗口尺寸改变——resize 事件发生时
5. 计算 offsetWidth 和 offsetHeight 属性
6. 设置 style 属性的值
7. 当你修改网页的默认字体时。

回流必定会发生重绘，重绘不一定会引发回流。回流所需的成本比重绘高的多，改变父节点里的子节点很可能会导致父节点的一系列回流。

:::

## 60、如何减少回流？（浏览器绘制过程）

::: tip 参考答案

1. 使用 transform 替代 top

2. 不要把节点的属性值放在一个循环里当成循环里的变量

3. 不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局

4. 把 DOM 离线后修改。如：使用 documentFragment 对象在内存里操作 DOM

5. 不要一条一条地修改 DOM 的样式。与其这样，还不如预先定义好 css 的 class，然后修改 DOM 的 className。

:::

## 61、为什么操作 DOM 慢？（浏览器绘制过程）

::: tip 参考答案

一些 DOM 的操作或者属性访问可能会引起页面的回流和重绘，从而引起性能上的消耗。

:::

## 62、DOMContentLoaded 事件和 Load 事件的区别？

::: tip 参考答案

当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和
子框架的加载完成。

Load 事件是当所有资源加载完成后触发的。

:::

## 63、常见的浏览器端的存储技术有哪些？

::: tip 参考答案

浏览器常见的存储技术有 cookie、localStorage 和 sessionStorage。

还有两种存储技术用于大规模数据存储，webSQL（已被废除）和 indexDB。

IE 支持 userData 存储数据，但是基本很少使用到，除非有很强的浏览器兼容需求。

:::

## 64、请描述一下 cookies，sessionStorage 和 localStorage 的区别？

::: tip 参考答案

SessionStorage， LocalStorage， Cookie 这三者都可以被用来在浏览器端存储数据，而且都是字符串类型的键值对。区别在于前两者属于 HTML5 WebStorage，创建它们的目的便于客户端存储数据。而 cookie 是网站为了标示用户身份而储存在用户本地终端上的数据（通常经过加密）。cookie 数据始终在同源（协议、主机、端口相同）的 http 请求中携带（即使不需要），会在浏览器和服务器间来回传递。

**存储大小：**  
cookie 数据大小不能超过 4 k 。
sessionStorage 和 localStorage 虽然也有存储大小的限制，但比 cookie 大得多，可以达到 5M 或更大。

**有期时间：**  
localStorage 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据。  
sessionStorage 数据在页面会话结束时会被清除。页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。在新标签或窗口打开一个页面时会在顶级浏览上下文中初始化一个新的会话。  
cookie 设置的 cookie 过期时间之前一直有效，即使窗口或浏览器关闭。

**作用域：**  
sessionStorage 只在同源的同窗口（或标签页）中共享数据，也就是只在当前会话中共享。  
localStorage 在所有同源窗口中都是共享的。  
cookie 在所有同源窗口中都是共享的。

:::

## 65、如何实现浏览器内多个标签页之间的通信?

::: tip 参考答案

1. 使用 WebSocket，通信的标签页连接同一个服务器，发送消息到服务器后，服务器推送消息给所有连接的客户端。

2. 使用 SharedWorker （只在 chrome 浏览器实现了），两个页面共享同一个线程，通过向线程发送数据和接收数据来实现标
   签页之间的双向通行。

3. 可以调用 localStorage、cookies 等本地存储方式，localStorge 另一个浏览上下文里被添加、修改或删除时，它都会触
   发一个 storage 事件，我们通过监听 storage 事件，控制它的值来进行页面信息通信；

4. 如果我们能够获得对应标签页的引用，通过 postMessage 方法也是可以实现多个标签页通信的。

:::

## 66、webSocket 如何兼容低版本浏览器？

::: tip 参考答案

Adobe Flash Socket 、ActiveX HTMLFile (IE) 、基于 multipart 编码发送 XHR 、基于长轮询的 XHR

:::

## 67、页面可见性（Page Visibility API） 可以有哪些用途？

::: tip 参考答案

这个新的 API 的意义在于，通过监听网页的可见性，可以预判网页的卸载，还可以用来节省资源，减缓电能的消耗。比如，一旦用户不看网页，下面这些网页行为都是可以暂停的。

1. 对服务器的轮询
2. 网页动画
3. 正在播放的音频或视频

:::

## 68、attribute 和 property 的区别是什么？

::: tip 参考答案

attribute 是 dom 元素在文档中作为 html 标签拥有的属性；
property 就是 dom 元素在 js 中作为对象拥有的属性。
对于 html 的标准属性来说，attribute 和 property 是同步的，是会自动更新的，
但是对于自定义的属性来说，他们是不同步的。

:::

## 69、IE 各版本和 Chrome 可以并行下载多少个资源？

::: tip 参考答案

- IE6 2 个并发
- iE7 升级之后的 6 个并发，之后版本也是 6 个
- Firefox，chrome 也是 6 个

:::

## 70、Flash、Ajax 各自的优缺点，在使用中如何取舍？

::: tip 参考答案

**Flash：**

- Flash 适合处理多媒体、矢量图形、访问机器
- 对 CSS、处理文本上不足，不容易被搜索

**Ajax：**

- Ajax 对 CSS、文本支持很好，支持搜索
- 多媒体、矢量图形、机器访问不足

**共同点：**

- 与服务器的无刷新传递消息
- 可以检测用户离线和在线状态
- 操作 DOM

:::

## 71、浏览器架构

::: tip 参考答案

- 用户界面
  - 主进程
  - 内核
    - 渲染引擎
    - JS 引擎
      - 执行栈
    - 事件触发线程
      - 消息队列
        - 微任务
        - 宏任务
    - 网络异步线程
    - 定时器线程

:::

## 72、常用的 meta 标签

::: tip 参考答案

```html
<meta /> 元素可提供有关页面的元信息（meta-information），比如针对搜索引擎和更新频度的描述和关键词。 <meta /> 标签位于文档的头部，不包含任何内容。<meta /> 标签的属性定义了与文档相关联的名称/值对。

<!DOCTYPE html> //H5标准声明，使用 HTML5 doctype，不区分大小写
<head lang="en">
  //标准的 lang 属性写法
  <meta charset="utf-8" />
  //声明文档使用的字符编码
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  //优先使用 IE 最新版本和 Chrome
  <meta name="description" content="不超过150个字符" />
  //页面描述
  <meta name="keywords" content="" />
  //页面关键词者
  <meta name="author" content="name, email@gmail.com" />
  //网页爬虫声明
  <meta name="robots" content="index,follow" />
  //搜索引擎抓取
  <meta name="viewport" content="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no" />
  //为移动设备添加 viewport
  <meta name="apple-mobile-web-app-title" content="标题" />
  //iOS 设备 begin
  <meta name="apple-mobile-web-app-capable" content="yes" />
  //添加到主屏后的标题（iOS 6 新增） 是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏
  <meta name="apple-itunes-app" content="app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL" />
  //添加智能 App 广告条 Smart App Banner（iOS 6+ Safari）
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />
  <meta name="format-detection" content="telphone=no, email=no" />
  //设置苹果工具栏颜色
  <meta name="renderer" content="webkit" />
  //启用360浏览器的极速模式(webkit)
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  //避免IE使用兼容模式
  <meta http-equiv="Cache-Control" content="no-siteapp" />
  //不让百度转码
  <meta name="HandheldFriendly" content="true" />
  //针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓
  <meta name="MobileOptimized" content="320" />
  //微软的老式浏览器
  <meta name="screen-orientation" content="portrait" />
  //uc强制竖屏
  <meta name="x5-orientation" content="portrait" />
  //QQ强制竖屏
  <meta name="full-screen" content="yes" />
  //UC强制全屏
  <meta name="x5-fullscreen" content="true" />
  //QQ强制全屏
  <meta name="browsermode" content="application" />
  //UC应用模式
  <meta name="x5-page-mode" content="app" />
  //QQ应用模式
  <meta name="msapplication-tap-highlight" content="no" />
  //windows phone 点击无高光 设置页面不缓存
  <meta http-equiv="pragma" content="no-cache" />
  <meta http-equiv="cache-control" content="no-cache" />
  <meta http-equiv="expires" content="0" />
</head>
```

:::

## 73、用于预格式化文本的标签是？

::: tip 参考答案

预格式化就是保留文字在源码中的格式 最后显示出来样式与源码中的样式一致 所见即所得。

`<pre>` 定义预格式文本，保持文本原有的格式

:::

## 74、DHTML 是什么？

::: tip 参考答案

DHTML 将 HTML、JavaScript、DOM 以及 CSS 组合在一起，用于创造动态性更强的网页。通过 JavaScript 和 HTML DOM，能够动态地改变 HTML 元素的样式。

DHTML 实现了网页从 Web 服务器下载后无需再经过服务的处理，而在浏览器中直接动态地更新网页的内容、排版样式和动画的功能。例如，当鼠标指针移到文章段落中时，段落能够变成蓝色，或者当鼠标指针移到一个超级链接上时，会自动生成一个下拉式子链接目录等。

包括：

- 动态内容（Dynamic Content）：动态地更新网页内容，可“动态”地插入、修改或删除网页的元件，如文字、图像、标记等。
- 动态排版样式（Dynamic Style Sheets）：W3C 的 CSS 样式表提供了设定 HTML 标记的字体大小、字形、样式、粗细、文字颜色、行高度、加底线或加中间横线、缩排、与边缘距离、靠左右或置中、背景图片或颜色等排版功能，而“动态排版样 式”即可以“动态”地改变排版样式。

:::

## 75、head 标签中必不少的是？

::: tip 参考答案

`<head>` 标签用于定义文档的头部，它是所有头部元素的容器。`<head>` 中的元素可以引用脚本、指示浏览器在哪里找到样式表、提供
元信息等等。

文档的头部描述了文档的各种属性和信息，包括文档的标题、在 Web 中的位置以及和其他文档的关系等。绝大多数文档头部包含的数
据都不会真正作为内容显示给读者。

下面这些标签可用在 head 部分：`<base>`, `<link>`, `<meta>`, `<script>` , `<style>` , 以及 `<title>`。

`<title>` 定义文档的标题，它是 head 部分中唯一必需的元素。

:::

## 76、在 HTML5 中，哪个方法用于获得用户的当前位置？

::: tip 参考答案

getCurrentPosition()

:::

## 77、文档的不同注释方式？

::: tip 参考答案

HTML 的注释方法 <!--注释内容-->

CSS 的 注释方法 /_注释内容_/

JavaScript 的注释方法 /_ 多行注释方式 _/ //单行注释方式

:::

## 78、主流浏览器内核私有属性 css 前缀？

::: tip 参考答案

mozilla 内核 （firefox,flock 等） -moz
webkit 内核 （safari,chrome 等） -webkit
opera 内核 （opera 浏览器） -o
trident 内核 （ie 浏览器） -ms

:::

## 79、前端性能优化？

::: tip 参考答案

前端性能优化主要是为了提高页面的加载速度，优化用户的访问体验。我认为可以从这些方面来进行优化。

第一个方面是页面的内容方面

- 通过文件合并、css 雪碧图、使用 base64 等方式来减少 HTTP 请求数，避免过多的请求造成等待的情况。

- 通过 DNS 缓存等机制来减少 DNS 的查询次数。

- 通过设置缓存策略，对常用不变的资源进行缓存。

- 使用延迟加载的方式，来减少页面首屏加载时需要请求的资源。延迟加载的资源当用户需要访问时，再去请求加载。

- 通过用户行为，对某些资源使用预加载的方式，来提高用户需要访问资源时的响应速度。

第二个方面是服务器方面

- 使用 CDN 服务，来提高用户对于资源请求时的响应速度。

- 服务器端启用 Gzip、Deflate 等方式对于传输的资源进行压缩，减小文件的体积。

- 尽可能减小 cookie 的大小，并且通过将静态资源分配到其他域名下，来避免对静态资源请求时携带不必要的 cookie

第三个方面是 CSS 和 JavaScript 方面

- 把样式表放在页面的 head 标签中，减少页面的首次渲染的时间。

- 避免使用 @import 标签。

- 尽量把 js 脚本放在页面底部或者使用 defer 或 async 属性，避免脚本的加载和执行阻塞页面的渲染。

- 通过对 JavaScript 和 CSS 的文件进行压缩，来减小文件的体积。

:::

## 80、Data URI scheme 是什么 ？

::: tip 参考答案

Data URI scheme 是在 RFC2397 中定义的，目的是将一些小的数据，直接嵌入到网页中，从而不用再从外部文件载入。减少对 HTTP 的请求次数。达到优化网页的效果。

base64 后面那一串字符，其实是一张图片，将这些字符串复制粘贴到浏览器的中打开，就能看到图片了

假设你有的图像：A.jpg ，把它在网页上显示出来的标准方法是：

```html
<img src="http://sjolzy.cn/images/A.jpg" />
```

这种取得数据的方法称为 http URI scheme 。

```html
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAAGElEQVQIW2P4DwcMDAxAfBvMAhEQMYgcACEHG8ELxtbPAAAAAElFTkSuQmCC" />
```

这种取得数据的方法称为 Data URI scheme 。

:::

## 81、Data URI scheme 的语法

::: tip 参考答案

在上面的 Data URI scheme 中：

data 表示取得数据的协定名称；

image/png 是数据类型名称；

base64 是数据的编码方法，逗号后面就是这个 image/png 文件 base64 编码后的数据。

目前，Data URI scheme 支持的类型有：

```txt
data: 文本数据
data: text/plain, ------- 文本数据
data: text/html, -------- HTML代码
data: text/html;base64, -------- base64编码的HTML代码
data: text/css, ---------- CSS代码
data: text/css;base64, ---------- base64编码的CSS代码
data: text/javascript, ------------ Javascript代码
data: text/javascript;base64, --------- base64编码的Javascript代码
data: image/gif;base64, ---------------- base64编码的gif图片数据
data: image/png;base64, -------------- base64编码的png图片数据
data: image/jpeg;base64, ------------- base64编码的jpeg图片数据
data: image/x-icon;base64, ---------- base64编码的icon图片数据
```

在 HTML 中使用 data URL （不建议这样使用）

```html
<img src="data:image/png;base64,image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAAGElEQVQIW2P4DwcMDAxAfBvMAhEQMYgcACEHG8ELxtbPAAAAAElFTkSuQmCC" />
```

在 CSS 中使用 data URL

```css
body {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAAGElEQVQIW2P4DwcMDAxAfBvMAhEQMYgcACEHG8ELxtbPAAAAAElFTkSuQmCC");
}
```

在 script 中使用 data URL

```js
   _captchaImage() {
		captchaImage().then(res => {  //请求接口
			if (res.code == 200) {
				this.codeUrl = 'data:image/gif;base64,' + res.img; // 拼接请求回来的数据
				this.formModel.uuid = res.uuid;
		   }
	   });
	}
```

:::

## 82、Data URI scheme 的优缺点

::: tip 参考答案

**优点：**
减少 HTTP 请求数，没有了 TCP 连接消耗和同一域名下浏览器的并发数限制。对于小文件会降低带宽。虽然编码后数据量会增加，但是却减少了 http 头，当 http 头的数据量大于文件编码的增量，那么就会降低带宽。 对于 HTTPS 站点，HTTPS 和 HTTP 混用会有安全提示，而 HTTPS 相对于 HTTP 来讲开销要大更多，所以 Data URI 在这方面的优势更明显。可以把整个多媒体页面保存为一个文件。

**缺点：**

1. 无法被重复利用，同一个文档多次被应用到同一内容中，数据被大量增加，消耗了下载时间。
2. 无法被独自缓存，其包含文档重新加载时，它也要重新加载。
3. 耗时，客户端需要重新解码和显示，增加消耗。
4. 不支持数据压缩，base64 编码会增加 1/3 大小，而 urlencode 后数据量会增加更多
5. 不安全，不利于安全软件的过滤，同时也存在一定的安全隐患。

:::

## 83、你知道短链接的生成原理吗？

::: tip 参考答案

目的将长度较长的链接压缩成较短的链接，并通过跳转的方式，将用户请求由短链接重定向到长链接上去

1.二种方式生成短链

hash-可能会重复
发号器发号压缩 URL

2.短链跳转方式

301 - 用户第一次访问某个短链接后，如果服务器返回 301 状态码，则这个用户在后续多次访问统一短链接，浏览器会直接请求跳转地址，而不是短链接地址，这样一来服务器端就无法收到用户的请求
缺点：有缓存情况下直接跳转原地址，无法记录准确的访问

302-浏览器不缓存短链接请求，那么用户每次访问短链接，都会先去短链接服务端取回长链接地址，然后在跳转。
缺点：服务器压力大

:::

## 84、HTML5 拖拽事件的顺序是什么？

::: tip 参考答案

ondragstart ：源对象开始被拖动
ondrag：源对象被拖动过程中
ondragend：源对象被拖动结束

ondragenter：源对象拖动着进入目标对象
ondragover：源对象拖动着悬停在目标对方上方
ondragleave：源对象拖动着离开了目标对象
ondrop：源对象拖动着目标对象上方释放

:::

## 85、为什么我们要使用 web workers？

::: tip 参考答案

因为 js 是单线程，如果存在大数据运算的时候会影响用户使用体验，出现卡顿的情况。
使用 web workers 可以开启一个线程，在运算的同时，不影响用户体验。

web workers 的几个使用场景可以参考下：

1. 当大图片 canvas 转 base64 的时候非常耗时，就可以使用 wokers
2. 端对端加密的时候，要大量计算，可以使用 wokers
3. 拼写检查，检索的所有工作可以让 wokers 来完成，不会阻塞 UI
4. indexdb ，在网络不稳定情况下,使用 indexdb api 的时候，可以交给 wokers，这样不会阻塞主线 UI

:::

## 86、如何在不同的端口间共享 cookie？

::: tip 参考答案

根据同源策略，cookie 是区分端口的，但是浏览器实现来说，“cookie 区分域，而不区分端口，也就是说，同一个 ip 下的多个端口下的 cookie 是共享的。

:::
