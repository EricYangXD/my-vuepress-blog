---
title: 记录一些前端知识
author: EricYangXD
date: "2021-12-29"
---

## 好用的开发工具、插件

-   Chrome 扩展：Access-Control-Allow-Origin 自动跨域插件，可以自行配置跨域域名方法等；
-   Log 工具：VConsole，用于在移动端、H5 进行日志打印，方便调试；

## Mixed Content

-   混合内容是指 https 页面下有非 https 资源时，浏览器的加载策略。
-   在 Chrome 80 中，如果你的页面开启了 https，同时你在页面中请求了 http 的音频和视频资源，这些资源将将自动升级为 https ，并且默认情况下，如果它们无法通过 https 加载，Chrome 将阻止它们。这样就会造成一些未支持 https 协议的资源加载失败。

-   最合理的方案：

1. 全站统一 https-但是有些时候内容是用户产生的，或者第三方数据；
2. 同域-nginx 强制跳转 https NGINX 配置：server{listen xx.xx.xx.xx; server_name xx.com; rewrite ^(.\*)$ https://$host$1 permanent;}；

-   跨域的方案：

1. 资源有 http 和 https 协议，但是 url 是 http 的， 兼容低版本浏览器；
   `<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">`
2. JS 拦截簒改 base host， 然后 Nginx 转发/后端代理；

## MIME sniffing 嗅探

-   引入 MIME sniffing 功能的初衷是用来弥补 Web 服务器响应一个图像请求时有可能返回错误的内容类型 Content-Type 信息这一缺陷;

-   嗅探攻击解决方案：

1. 给返回内容加上对应的 contentType；
2. 添加响应头 X-Content-Type-Options: nosniff，让浏览器不要尝试去嗅探；

-   嗅探乱码原因：<meta charset="utf-8" >只对 HTML 内容解析有效，对于 css 内容中(外部样式表下)的双字节字符（如中文）解析并没有作用，如果浏览器请求回来的 css 资源的 HTTP 响应头里的 Content-Type 未指明"charset=utf-8"的话，浏览器根据自身的嗅探机制来决定采用哪一种编码解析，结果就会概率出现双字节字符乱码的情况；
-   解决方法：

1. css 资源请求的响应头的 Content-Type 增加"charset=utf-8"声明；
2. 使用  @charset
3. 使用  css-unicode-loader

## Cookie/Set-Cookie

-   登录的原理：

-   问题：通过 http 方式访问一个 https 网站时，登录有时会失效（无法登陆、跳转），Cookies 中的 token 没有写成功
-   原因：http 和 https 返回的 tokenName 相同，由于一个是 insecure 一个是 secure 的，两者不能互相覆盖，导致 cookie 中的 sso-token 写入失败，所以也就无法登陆了。
-   查看接口，发现：Response Headers 中的 Set-Cookie 是拿到了返回值的，但是后面有个黄色三角感叹号，提示：This Set-Cookie was blocked because it was not sent over a secure connection and would have overwritten a cookie with the Secure attribute.

-   解决方案

1. 使用 https，Set-Cookie 中会有 Secure 字段；
2. 在 chrome 中打开链接： chrome://flags/#site-isolation-trial-opt-out，搜索 samesite 上述三个选项禁用(设为 disable)后重启 chrome，问题解决；
3. 删掉 https 下的 token
4. 无痕模式（有时也不行，是因为无痕模式打开时也写入了 cookie）

-   几种常见的策略

1. Same Origin Policy
2. Content Security Policy (CSP)
3. Referrer-Policy

## 针对新版本 Chrome>90.x? Samesite 策略不能设置，导致开发时页面跳转出现问题

```bash
open -n /Applications/Google\ Chrome.app/ --args --disable-features=SameSiteByDefaultCookies

或

open -a "Google Chrome" --args --disable-features=SameSiteByDefaultCookies
```

完全关闭 Chrome，打开命令行运行上述命令。

## 删除文件/文件夹

-   rimraf 包的作用：以包的形式包装 rm -rf 命令，用来删除文件和文件夹的，不管文件夹是否为空，都可删除

```js
const rimraf = require("rimraf");
rimraf("./test.txt", function (err) {
	// 删除当前目录下的 test.txt
	console.log(err);
});
```

## 闭包

-   作用域链：在 JavaScript 里面，函数、块、模块都可以形成作用域（一个存放变量的独立空间），他们之间可以相互嵌套，作用域之间会形成引用关系，这条链叫做作用域链。
-   查看作用域链：

```js
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

const code = `
  function func() {
    const guang = 'guang';
    function func2() {
      const ssh = 'ssh';
      {
        function func3 () {
          const suzhe = 'suzhe';
        }
      }
    }
  }
`;

const ast = parser.parse(code);

traverse(ast, {
	FunctionDeclaration(path) {
		if (path.get("id.name").node === "func3") {
			console.log(path.scope.dump());
		}
	},
});
```

-   函数和块的作用域内的变量声明会在作用域 （scope） 内创建一个绑定（变量名绑定到具体的值，也就是 binding），然后其余地方可以引用 （refer） 这个 binding，这样就是静态作用域链的变量访问顺序。

-   静态：因为这样的嵌套关系是分析代码就可以得出的，不需要运行，按照这种顺序访问变量的链就是静态作用域链，这种链的好处是可以直观的知道变量之间的引用关系。静态作用域链是可以做静态分析的。

-   JavaScript 除了静态作用域链外，还有一个特点就是函数可以作为返回值！这就会引出闭包。
-   父函数作用域中有很多东西与子函数无关，所以不会因为子函数没结束就一直常驻内存。这样肯定有性能问题，所以还是要销毁。但是销毁了父作用域不能影响子函数，所以要再创建个对象，要把子函数内引用（refer）的父作用域的变量打包里来，给子函数打包带走。
-   闭包的机制：销毁父作用域后，把用到的变量包起来，打包给子函数，放到一个属性上 [[Scopes]]。
-   即使子函数没有引用父函数的变量，他也会有一个闭包--闭包最少会包含全局作用域。
-   需要打包的只是环境内没有的，也就是闭包只保存外部引用。然后是在创建函数的时候保存到函数属性上的，创建的函数返回的时候会打包给函数，但是 JS 引擎怎么知道它要用到哪些外部引用呢，需要做 AST 扫描，很多 JS 引擎会做 Lazy Parsing，这时候去 parse 函数，正好也能知道它用到了哪些外部引用，然后把这些外部用打包成 Closure 闭包，加到 [[scopes]] 中。

-   所以，闭包是返回函数的时候扫描函数内的标识符引用，把用到的本作用域的变量打成 Closure 包，放到 [[Scopes]] 里。调用该函数的时候，JS 引擎 会取出 [[Scopes]] 中的打包的 Closure + Global 链，设置成新的作用域链， 这就是函数用到的所有外部环境了，有了外部环境，自然就可以运行了。

-   闭包需要扫描函数内的标识符，做静态分析，那 eval 怎么办，他有可能内容是从网络记载的，从磁盘读取的等等，内容是动态的。
-   eval 确实没法分析外部引用，也就没法打包闭包，这种就特殊处理一下，打包整个作用域就好了。因为没法静态分析动态内容所以全部打包成闭包了，本来闭包就是为了不保存全部的作用域链的内容，结果 eval 导致全部保存了，所以尽量不要用 eval，会导致闭包保存内容过多。
-   但是 JS 引擎只处理了直接调用，也就是说直接调用 eval 才会打包整个作用域，如果不直接调用 eval，就没法分析引用，也就没法形成闭包了。

-   黑魔法，比如 利用「不直接调用 eval 不会生成闭包，会在全局上下文执行」的特性。

-   定义：闭包是在函数创建的时候，让函数打包带走的根据函数内的外部引用来过滤作用域链剩下的链。它是在函数创建的时候生成的作用域链的子集，是打包的外部环境。evel 因为没法分析内容，所以直接调用会把整个作用域打包（所以尽量不要用 eval，容易在闭包保存过多的无用变量），而不直接调用则没有闭包。
-   过滤规则：
-   1. 全局作用域不会被过滤掉，一定包含。所以在何处调用函数都能访问到。
-   2. 其余作用域会根据是否内部有变量被当前函数所引用而过滤掉一些。不是每个返回的子函数都会生成闭包。
-   3. 被引用的作用域也会过滤掉没有被引用的 binding （变量声明）。只把用到的变量打个包。

### 闭包的缺陷

-   JavaScript 引擎会把内存分为函数调用栈、全局作用域和堆，其中堆用于放一些动态的对象，调用栈每一个栈帧放一个函数的执行上下文，里面有一个 local 变量环境用于放内部声明的一些变量，如果是对象，会在堆上分配空间，然后把引用保存在栈帧的 local 环境中。全局作用域也是一样，只不过一般用于放静态的一些东西，有时候也叫静态域。
-   每个栈帧的执行上下文包含函数执行需要访问的所有环境，包括 local 环境、作用域链、this 等。
-   如果子函数返回了，也就是父函数执行完了，此时，首先父函数的栈帧会销毁，子函数这个时候其实还没有被调用，所以还是一个堆中的对象，没有对应的栈帧，这时候父函数把作用域链过滤出需要用到的，形成闭包链，设置到子函数的 [[Scopes]] 属性上。
-   父函数销毁，栈帧对应的内存马上释放，用到的堆中的对象引用会被 gc 回收，而返回的函数会把作用域链过滤出用到的引用形成闭包链放在堆中。
-   这就导致了一个隐患：本来作用域是随着函数调用的结束而销毁的，因为整个栈帧都会被马上销毁。而形成闭包以后，转移到了堆内存。
-   当运行这个子函数的时候，子函数会创建栈帧，如果这个函数一直在运行，那么它在堆内存中的闭包就一直占用着内存，就会使可用内存减少，严重到一定程度就算是「内存泄漏」了。
-   所以闭包不要乱用，少打包一点东西到堆内存。

## JavaScript 中的事件循环 Event Loop

-   事件循环既可能是浏览器的主事件循环也可能是被一个 web worker 所驱动的事件循环。
-   原因：JavaScript 是单线程的语言！同一个时间只能做一件事情。
-   事件循环的具体流程如下：

1. 从宏任务队列中，按照入队顺序，找到第一个执行的宏任务，放入调用栈，开始执行；
2. 执行完该宏任务下所有同步任务后，即调用栈清空后，该宏任务被推出宏任务队列，然后微任务队列开始按照入队顺序，依次执行其中的微任务，直至微任务队列清空为止；
3. 当微任务队列清空后，一个事件循环结束；
4. 接着从宏任务队列中，找到下一个执行的宏任务，开始第二个事件循环，直至宏任务队列清空为止。

-   这里有几个重点：

1. 当我们第一次执行的时候，解释器会将整体代码 script 放入宏任务队列中，因此事件循环是从第一个宏任务开始的；
2. 如果在执行微任务的过程中，产生新的微任务添加到微任务队列中，也需要一起清空；微任务队列没清空之前，是不会执行下一个宏任务的。

### 调用栈 Call Stack

-   调用栈是解释器（比如浏览器中的 JavaScript 解释器）追踪函数执行流的一种机制。当执行环境中调用了多个函数时，通过这种机制，我们能够追踪到哪个函数正在执行，执行的函数体中又调用了哪个函数。具有 LIFO（后进先出，Last in First Out）的结构。调用栈内存放的是代码执行期间的所有执行上下文。

1. 每调用一个函数，解释器就会把该函数添加进调用栈并开始执行。
2. 正在调用栈中执行的函数还调用了其它函数，那么新函数也将会被添加进调用栈，一旦这个函数被调用，便会立即执行。
3. 当前函数执行完毕后，解释器将其清出调用栈，继续执行当前执行环境下的剩余的代码。
4. 当分配的调用栈空间被占满时，会引发“堆栈溢出”错误。

-   浏览器里有 JS 引擎做 JS 代码的执行，利用注入的浏览器 API 完成功能，有渲染引擎做页面渲染，两者都比较纯粹，需要一个调度的方式，就是 event loop。
-   event loop 实现了 task 和 急事处理机制 microtask，而且每次 loop 结束会 check 是否要渲染，渲染之前会有 requestAnimationFrames 生命周期。
-   帧刷新不能被拖延否则会卡顿甚至掉帧，所以就需要 JS 代码里面不要做过多计算，于是有了 requestIdleCallback 的 api，希望在每次 check 完发现还有时间就执行，没时间就不执行（这个 deadline 的时间也作为参数让 js 代码自己判断），为了避免一直没时间，还提供了 timeout 参数强制执行。
-   防止计算时间过长导致渲染掉帧是 ui 框架一直关注的问题，就是怎么不阻塞渲染，让逻辑能够拆成帧间隔时间内能够执行完的小块。浏览器提供了 idelcallback 的 api，很多 ui 框架也通过递归改循环然后记录状态等方式实现了计算量的拆分，目的只有一个：loop 内的逻辑执行不能阻塞 check，也就是不能阻塞渲染引擎做帧刷新。所以不管是 JS 代码宏微任务、 requestAnimationCallback、requestIdleCallback 都不能计算时间太长。这个问题是前端开发的持续性阵痛。

![image](https://mmbiz.qpic.cn/mmbiz_png/zPh0erYjkib1W6VwQ03NU6clT1alBexqeuPodh2TAHEibkTP2gu3jibstYww60jafMmSbxHtqMFYcjWE9TAN1WjMQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

-   js 引擎包括 parser、解释器、gc 再加一个 JIT 编译器这几部分。
-   parser：负责把 javascript 源码转成 AST
-   interpreter：解释器， 负责转换 AST 成字节码，并解释执行
-   JIT compiler：对执行时的热点函数进行编译，把字节码转成机器码，之后可以直接执行机器码
-   gc（garbage collector）：垃圾回收器，清理堆内存中不再使用的对象

![image](https://mmbiz.qpic.cn/mmbiz_png/zPh0erYjkib1W6VwQ03NU6clT1alBexqetjkCauOPwGqjos8Vo6TQBN7E4pR72cCjDiby3G2yG001kSyvb7xxqvA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

-   如图，一般的 JS 引擎的编译流水线是 parse 源码成 AST，之后 AST 转为字节码，解释执行字节码。运行时会收集函数执行的频率，对于到达了一定阈值的热点代码，会把对应的字节码转成机器码（JIT），然后直接执行。这就是 js 代码能够生效的流程。

### 任务与微任务

-   有两点关键的区别。

1. 首先，每当一个任务存在，事件循环都会检查该任务是否正把控制权交给其他 JavaScript 代码。如若不然，事件循环就会运行微任务队列中的所有微任务。接下来微任务循环会在事件循环的每次迭代中被处理多次，包括处理完事件和其他回调之后。
2. 其次，如果一个微任务通过调用 queueMicrotask(), 向队列中加入了更多的微任务，则那些新加入的微任务 会早于下一个任务运行 。这是因为事件循环会持续调用微任务直至队列中没有留存的，即使是在有更多微任务持续被加入的情况下。

-   任务进入任务队列，其实会利用到浏览器的其他线程。虽然说 JavaScript 是单线程语言，但是浏览器不是单线程的。而不同的线程就会对不同的事件进行处理，当对应事件可以执行的时候，对应线程就会将其放入任务队列。
-   浏览器线程：

1. js 引擎线程：用于解释执行 js 代码、用户输入、网络请求等；
2. GUI 渲染线程：绘制用户界面，与 JS 主线程互斥（因为 js 可以操作 DOM，进而会影响到 GUI 的渲染结果）；
3. http 异步网络请求线程：处理用户的 get、post 等请求，等返回结果后将回调函数推入到任务队列；
4. 定时触发器线程：setInterval、setTimeout 等待时间结束后，会把执行函数推入任务队列中；
5. 浏览器事件处理线程：将 click、mouse 等 UI 交互事件发生后，将要执行的回调函数放入到事件队列中。

## Canvas 绘图的一些坑

1. Canvas 绘制高度受浏览器的限制，不能无限绘制，可以通过设置宽高比例进行一定的调整，降低绘制图片的质量。
2. [相关文章 1](https://blog.csdn.net/azrael_adam/article/details/53305530)
3. [相关文章 2](https://www.cnblogs.com/shuchong/p/5948542.html)

## 预览 PDF 文件

### iframe

1. url 后面拼接 #page=1&view=FitH,top&toolbar=0 可以把打印下载等功能隐藏

2. 设置 response 的 Header 使得 Chrome 浏览器打开 PDF 而不自动下载

```js
// 其中比较关键的是Content-Disposition是inline而不是attachment，这样提示浏览器来显示文档而不是下载
response.setContentType("application/pdf");
response.setHeader("Content-Disposition", "inline;fileName=XXXX.pdf");
```

PS: `response-content-disposition=attachment;fileName=XXXX.pdf`时，会直接下载文件而不会预览。
PS: 对于 AWS ECS 中的文件预览，需要做相应配置！[参考](https://docs.aws.amazon.com/zh_cn/AmazonS3/latest/userguide/cors.html)

3. 由上 2 已知带有 content-disposition=attachment 头部的 pdf 文件在 Chrome 下是无法预览的，一种巧妙的思路是，先用 fetch 下载下来拿到 blob 对象，然后再用 URL.createObjectURL 生成临时 URL，然后就可以预览啦，代码如下：

```js
// 实际测试貌似依然不可，尤其是针对文件服务器还需要鉴权时
fetch("xxx.pdf")
	.then((resp) => resp.blob())
	.then((blob) => {
		var url = URL.createObjectURL(blob);
		document.querySelector("object").data = url;
	});
```

4. **注意事项：当 url 是同源（同域名、同协议、同端口号）时，这时如果给 a 标签加上了 download 属性，那么 download 属性会指示浏览器该下载而不是打开该文件，同时该属性值即下载时的文件名，哪怕此时的 href 只是个普通链接，也会下载这个 HTML 页面；**

### react-pdf

```
const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width;
};

const MyApp = () => {
  const width = useWindowWidth();
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages: page }) => {
    Toast.hide();
    setNumPages(page);
  };
  const onDocumentLoadError = (error) => {
    Toast.fail('加载失败，请重试', 3);
  };
  const onLoading = () => {
    Toast.loading('努力加载中...');
  };

  return (
    <PageWrapper>
      <Header title="详情" />
      <PDFWrapper>
        <Document
          style={{ width: '100%' }}
          file={history.location?.state?.pdfurl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={onLoading}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} width={width} />
          ))}
        </Document>
      </PDFWrapper>
    </PageWrapper>
  );
};
```

### pdfh5

### PDFObject

### pdf.js

## Taro 接入友盟

1. [友盟文档](https://developer.umeng.com/docs/147615/detail/147619#h1-u7B2Cu4E09u65B9u6846u67B6u652Fu630114)

## JSON.stringify()

### Feature1

-   undefined、任意的函数以及 symbol 值，出现在非数组对象的属性值中时在序列化过程中会被忽略
-   undefined、任意的函数以及 symbol 值出现在数组中时会被转换成  null
-   undefined、任意的函数以及 symbol 值被单独转换时，会返回 undefined

### Feature2

-   布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。

### Feature3

-   所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。

### Feature4

-   NaN 和 Infinity 格式的数值及 null 都会被当做 null。

### Feature5

-   转换值如果有 toJSON() 方法，该方法定义什么值将被序列化。

### Feature6

-   Date 日期调用了 toJSON() 将其转换为了 string 字符串（同 Date.toISOString()），因此会被当做字符串处理。

### Feature7

-   对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。

### Feature8

-   其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性

### Feature9

-   当尝试去转换 BigInt 类型的值会抛出错误

```js
// 默认情况下数据是这样的
var signInfo = [
	{
		fieldId: 539,
		value: undefined,
	},
	{
		fieldId: 539,
		value: "",
	},
	{
		fieldId: 539,
		value: null,
	},
	{
		fieldId: 539,
		value: "undefined",
	},
	{
		fieldId: 539,
		value: "null",
	},
	{
		fieldId: 540,
		value: Symbol("555"),
	},
	{
		fieldId: 540,
		value: Symbol.for("555"),
	},
	{
		fieldId: 546,
		value: function () {
			console.log(1110);
		},
	},
];
// 经过JSON.stringify之后的数据,少了value key,导致后端无法读取value值进行报错
// 具体原因是`undefined`、`任意的函数`以及`symbol值`，出现在`非数组对象`的属性值中时在序列化过程中会被忽略
console.log(JSON.stringify(signInfo1));
// [{"fieldId":539},{"fieldId":539,"value":""},{"fieldId":539,"value":null},{"fieldId":539,"value":"undefined"},{"fieldId":539,"value":"null"},{"fieldId":540},{"fieldId":540},{"fieldId":546}]

// 对于数组
var arr = [
	undefined,
	"undefined",
	null,
	"null",
	function () {
		console.log(1110);
	},
];
console.log(JSON.stringify(arr));
// [null,"undefined",null,"null",null]
```

## 文字转语音

```js
//语音播报
function voiceAnnouncements(str) {
	// 百度语音合成：或者使用新版地址https://tsn.baidu.com/text2audio
	var url =
		"http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=" +
		encodeURI(str);
	var n = new Audio(url);
	n.src = url;
	n.play();
}
voiceAnnouncements(`
秋名山上路人稀，常有车手较高低；
如今车道依旧在，不见当年老司机。
司机车技今尚好，前端群里不寂寥；
向天再借五百年，誓言各行领风骚。
`);
// 尝试了一些换女声的方式，但是，都失败了。。。
voiceAnnouncements(`
哇，代码写的真棒，你可真秀哇！
`);
```

## 使用 stringObject.localeCompare(target) 方法实现中文按照拼音顺序排序

### 把 target 以本地特定的顺序与 stringObject 进行比较，如果 stringObject 小于 target，则 localeCompare() 返回小于 0 的数。如果 stringObject 大于 target，则该方法返回大于 0 的数。如果两个字符串相等，或根据本地排序规则没有区别，该方法返回 0。

-   例：'HangJinLu'.localeCompare('HanZhongLu')，返回 number: -1
-   把 < 和 > 运算符应用到字符串时，它们只用字符的 Unicode 编码比较字符串，而不考虑当地的排序规则。以这种方法生成的顺序不一定是正确的！！！
-   例：'HangJinLu'>'HanZhongLu'; //返回 true
-   str.sort (function(a,b){return a.localeCompare(b)}); // 用本地特定排序规则对字符串数组进行排序