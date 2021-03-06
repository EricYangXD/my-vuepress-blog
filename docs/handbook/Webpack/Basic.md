---
title: Webpack知识点
author: EricYangXD
date: "2022-02-10"
---

## 详解 webpack 中的 hash、chunkhash、contenthash 区别

> hash 一般是结合 CDN 缓存来使用，通过 webpack 构建之后，生成对应文件名自动带上对应的 MD5 值。如果文件内容改变的话，那么对应文件哈希值也会改变，对应的 HTML 引用的 URL 地址也会改变，触发 CDN 服务器从源服务器上拉取对应数据，进而更新本地缓存。但是在实际使用的时候，这几种 hash 计算还是有一定区别。

### hash

hash 是跟整个项目的构建相关，同一次构建过程中生成的哈希都是一样的，只要项目里有文件更改，整个项目构建的 hash 值都会更改，并且全部文件都共用相同的 hash 值。

### chunkhash

根据入口文件进行依赖文件解析、构建对应的 chunk，生成多个 bundle，把公共依赖库和我们的代码文件分开，但是如果某个文件变了，那么引用它的文件也会跟着改变。

采用 hash 计算的话，每一次构建后生成的哈希值都不一样，即使文件内容压根没有改变。这样子是没办法实现缓存效果，我们需要换另一种哈希值计算方式，即 chunkhash。

chunkhash 和 hash 不一样，它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的 chunk，生成对应的哈希值。我们在生产环境里把一些公共库和程序入口文件区分开，单独打包构建，接着我们采用 chunkhash 的方式生成哈希值，那么只要我们不改动公共库的代码，就可以保证其哈希值不会受影响。

### contenthash

文件内容不改变，contenthash 就不变。

在 chunkhash 的例子，我们可以看到由于 index.css 被 index.js 引用了，所以共用相同的 chunkhash 值。但是这样子有个问题，如果 index.js 更改了代码，css 文件就算内容没有任何改变，由于是该模块发生了改变，导致 css 文件会重复构建。

这个时候，我们可以使用 extra-text-webpack-plugin 里的 contenthash 值，保证即使 css 文件所处的模块里就算其他文件内容改变，只要 css 文件内容不变，那么不会重复构建。

一般用于 CDN。

```js
// 示例
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 新增

module.exports = {
	mode: "production",
	entry: {
		index: "./src/index.js",
		chunk1: "./src/chunk1.js",
	},
	output: {
		filename: "[name].[chunkhash].js",
	},
	module: {
		// 新增
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
		],
	},
	plugins: [
		// 新增
		// 提取css插件
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: "[name].[contenthash].css",
		}),
	],
};
```

### 总结

hash 所有文件哈希值相同； chunkhash 根据不同的入口文件(Entry)进行依赖文件解析、构建对应的 chunk，生成对应的哈希值； contenthash 计算与文件内容本身相关，主要用在 css 抽取 css 文件时。

1. **不管是在 chunkhash 还是 contenthash，修改 css 都会引发 js 和 css 的改变；**
2. **在 chunkhash 时，由于 js 和 css 的 chunkhash 是一样的，所以修改了 js，会导致整个 chunk 的 chunkhash 改变，它们俩是同一个 chunkhash，肯定就都变了；而在 contenthash 时，js 修改不会影响 css 的改变。**

## Hot Module Replacement(HMR)--热模块替换

见名思意，即无需刷新在内存环境中即可替换掉过旧模块。与 Live Reload 相对应。在 webpack 的运行时中 `__webpack__modules__` 用以维护所有的模块。

而热模块替换的原理，即通过 chunk 的方式加载最新的 modules，找到 `__webpack__modules__` 中对应的模块逐一替换，并删除其上下缓存。

1. `webpack-dev-server` 将打包输出 bundle 使用内存型文件系统控制，而非真实的文件系统。此时使用的是 memfs (opens new window)模拟 node.js fs API;
2. 每当文件发生变更时，webpack 将会重新编译，`webpack-dev-server` 将会监控到此时文件变更事件，并找到其对应的 module。此时使用的是 chokidar (opens new window)监控文件变更;
3. `webpack-dev-server` 将会把变更模块通知到浏览器端，此时使用 websocket 与浏览器进行交流。此时使用的是 ws(opens new window);
4. 浏览器根据 websocket 接收到 hash，并通过 hash 以 JSONP 的方式请求更新模块的 chunk;
5. 浏览器加载 chunk，并使用新的模块对旧模块进行热替换，并删除其缓存;

## 如何提升 webpack 构建资源的速度

### 更快的 loader: swc

在 webpack 中耗时最久的当属负责 AST 转换的 loader。当 loader 进行编译时的 AST 操作均为 CPU 密集型任务，使用 Javascript 性能低下，此时可采用高性能语言 rust 编写的 swc。

```js
module: {
	rules: [
		{
			test: /\.m?js$/,
			exclude: /(node_modules)/,
			use: {
				loader: "swc-loader",
			},
		},
	];
}
```

### 持久化缓存: cache

1. webpack5 内置了关于缓存的插件，可通过以下配置开启。它将 Module、Chunk、ModuleChunk 等信息序列化到磁盘中，二次构建避免重复编译计算，编译速度得到很大提升。

2. 如对一个 JS 文件配置了 eslint、typescript、babel 等 loader，他将有可能执行五次编译，被五次解析为 AST：

-   acorn: 用以依赖分析，解析为 acorn 的 AST
-   eslint-parser: 用以 lint，解析为 espree 的 AST
-   typescript: 用以 ts，解析为 typescript 的 AST
-   babel: 用以转化为低版本，解析为 @babel/parser 的 AST
-   terser: 用以压缩混淆，解析为 acorn 的 AST

而当开启了持久化缓存功能，最耗时的 AST 解析将能够从磁盘的缓存中获取，再次编译时无需再次进行解析 AST。

```js
{
	cache: {
		type: "filesystem";
	}
}
```

3. 在 webpack4 中，可使用 cache-loader 仅仅对 loader 进行缓存。需要注意的是该 loader 目前已是 @depcrated 状态。

```js
module.exports = {
	module: {
		rules: [
			{
				test: /\.ext$/,
				use: ["cache-loader", ...loaders],
				include: path.resolve("src"),
			},
		],
	},
};
```

### 多进程: thread-loader

1. thread-loader 为官方推荐的开启多进程的 loader，可对 babel 解析 AST 时开启多线程处理，提升编译的性能。

```js
module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: "thread-loader",
						options: {
							workers: 10,
						},
					},
					"babel-loader",
				],
			},
		],
	},
};
```

2. 在 webpack4 中，可使用 happypack plugin，但需要注意的是 happypack 已经久不维护了。

## 如何分析前端打包体积

在 webpack 中，可以使用 webpack-bundle-analyzer (opens new window)分析打包后体积分析。

其原理是根据 webpack 打包后的 Stats (opens new window)数据进行分析，在 webpack compiler 的 done hook (opens new window)进行处理。

```js
compiler.hooks.done.tapAsync("webpack-bundle-analyzer", (stats) => {});
```

在查看页面中，有三个体积选项：

-   stat: 每个模块的原始体积
-   parsed: 每个模块经 webpack 打包处理之后的体积，比如 terser 等做了压缩，便会体现在上边
-   gzip: 经 gzip 压缩后的体积

```js
// ANALYZE=true npm run build 设置环境变量
const webpack = require("webpack");
const BundleAnalyzerPlugin =
	require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

function f1() {
	return webpack({
		entry: "./index.js",
		mode: "none",
		plugins: [process.env.ANALYZE && new BundleAnalyzerPlugin()],
	});
}

f1().run((err, stat) => {});
```

## 如何正确地进行分包

### 为什么需要分包？

1. 一行代码将导致整个 bundle.js 的缓存失效
2. 一个页面仅仅需要 bundle.js 中 1/N 的代码，剩下代码属于其它页面，完全没有必要加载

### 如何更好的分包？

#### 打包工具运行时

webpack(或其他构建工具) 运行时代码不容易变更，需要单独抽离出来，比如 webpack.runtime.js。由于其体积小，必要时可注入 index.html 中，减少 HTTP 请求数，优化关键请求路径

#### 前端框架运行时

React(Vue) 运行时代码不容易变更，且每个组件都会依赖它，可单独抽离出来 framework.runtime.js。请且注意，务必将 React 及其所有依赖(react-dom/object-assign)共同抽离出来，否则有可能造成性能损耗。(因 webpack 依赖其 object-assign，而 object-assign 将被打入共同依赖 vendor.chunk.js，因此此时它必回加载，但是该页面并不依赖任何第三方库，完全没有必要全部加载 vendor.chunk.js)

#### 高频库

一个模块被 N(2 个以上) 个 Chunk 引用，可称为公共模块，可把公共模块给抽离出来，形成 vendor.js。

1. 问：那如果一个模块被用了多次 (2 次以上)，但是该模块体积过大(1MB)，每个页面都会加载它(但是无必要，因为不是每个页面都依赖它)，导致性能变差，此时如何分包？

-   答：如果一个模块虽是公共模块，但是该模块体积过大，可直接 import() 引入，异步加载，单独分包，比如 echarts 等

2. 问：如果公共模块数量多，导致 vendor.js 体积过大(1MB)，每个页面都会加载它，导致性能变差，此时如何分包

答：有以下两个思路

-   思路一: 可对 vendor.js 改变策略，比如被引用了十次以上，被当做公共模块抽离成 verdor-A.js，五次的抽离为 vendor-B.js，两次的抽离为 vendor-C.js
-   思路二: 控制 vendor.js 的体积，当大于 100KB 时，再次进行分包，多分几个 vendor-XXX.js，但每个 vendor.js 都不超过 100KB

#### 使用 webpack 分包

-   在 webpack 中可以使用 SplitChunksPlugin (opens new window)进行分包，它需要满足三个条件:

1. minChunks: 一个模块是否最少被 minChunks 个 chunk 所引用
2. maxInitialRequests/maxAsyncRequests: 最多只能有 maxInitialRequests/maxAsyncRequests 个 chunk 需要同时加载 (如一个 Chunk 依赖 VendorChunk 才可正常工作，此时同时加载 chunk 数为 2)
3. minSize/maxSize: chunk 的体积必须介于 (minSize, maxSize) 之间

-   以下是 next.js 的默认配置，可视作最佳实践: 源码位置: [next/build/webpack-config.ts](https://github.com/vercel/next.js/blob/v12.0.5-canary.10/packages/next/build/webpack-config.ts#L728)

```js
{
  // Keep main and _app chunks unsplitted in webpack 5
  // as we don't need a separate vendor chunk from that
  // and all other chunk depend on them so there is no
  // duplication that need to be pulled out.
  chunks: (chunk) =>
    !/^(polyfills|main|pages\/_app)$/.test(chunk.name) &&
    !MIDDLEWARE_ROUTE.test(chunk.name),
  cacheGroups: {
    framework: {
      chunks: (chunk: webpack.compilation.Chunk) =>
        !chunk.name?.match(MIDDLEWARE_ROUTE),
      name: 'framework',
      test(module) {
        const resource =
          module.nameForCondition && module.nameForCondition()
        if (!resource) {
          return false
        }
        return topLevelFrameworkPaths.some((packagePath) =>
          resource.startsWith(packagePath)
        )
      },
      priority: 40,
      // Don't let webpack eliminate this chunk (prevents this chunk from
      // becoming a part of the commons chunk)
      enforce: true,
    },
    lib: {
      test(module: {
        size: Function
        nameForCondition: Function
      }): boolean {
        return (
          module.size() > 160000 &&
          /node_modules[/\\]/.test(module.nameForCondition() || '')
        )
      },
      name(module: {
        type: string
        libIdent?: Function
        updateHash: (hash: crypto.Hash) => void
      }): string {
        const hash = crypto.createHash('sha1')
        if (isModuleCSS(module)) {
          module.updateHash(hash)
        } else {
          if (!module.libIdent) {
            throw new Error(
              `Encountered unknown module type: ${module.type}. Please open an issue.`
            )
          }

          hash.update(module.libIdent({ context: dir }))
        }

        return hash.digest('hex').substring(0, 8)
      },
      priority: 30,
      minChunks: 1,
      reuseExistingChunk: true,
    },
    commons: {
      name: 'commons',
      minChunks: totalPages,
      priority: 20,
    },
    middleware: {
      chunks: (chunk: webpack.compilation.Chunk) =>
        chunk.name?.match(MIDDLEWARE_ROUTE),
      filename: 'server/middleware-chunks/[name].js',
      minChunks: 2,
      enforce: true,
    },
  },
  maxInitialRequests: 25,
  minSize: 20000,
}
```

## JS 代码压缩 minify 的原理是什么

通过 AST 分析，根据选项配置一些策略，来生成一棵更小体积的 AST 并生成代码。

目前前端工程化中使用 terser 和 swc 进行 JS 代码压缩，他们拥有相同的 API。

常见用以压缩 AST 的几种方案如下:

### 去除多余字符: 空格，换行及注释

一般来说中文会占用更大的空间。多行代码压缩到一行时要注意行尾分号。

### 压缩变量名：变量名，函数名及属性名

缩短变量的命名也需要 AST 支持，不至于在作用域中造成命名冲突。

### 解析程序逻辑：合并声明以及布尔值简化

### 解析程序逻辑: 编译预计算

在编译期进行计算，减少运行时的计算量。

## 15 个 Webpack 优化点

### 构建时间的优化

#### thread-loader

多进程打包，可以大大提高构建的速度，使用方法是将 thread-loader 放在比较费时间的 loader 之前，比如 babel-loader，数组中右侧的 loader 先执行。

#### cache-loader

缓存资源，提高二次构建的速度，使用方法是将 cache-loader 放在比较费时间的 loader 之前，比如 babel-loader，同上。

#### 开启热更新

在 plugins 中增加 webpack 提供的热更新插件`new webpack.HotModuleReplacementPlugin()`，并配置`devServer.hot=true`。

#### 合理设置 exclude & include

```js
{
  //....
  test: /\.js$/,
  //使用include来指定编译文件夹
  include: path.resolve(__dirname, '../src'),
  //使用exclude排除指定文件夹
  exclude: /node_modules/,
  use: [
    'babel-loader'
  ]
},
```

#### 构建区分环境

1. 开发环境：去除代码压缩、gzip、体积分析等优化的配置，大大提高构建速度
2. 生产环境：需要代码压缩、gzip、体积分析等优化的配置，大大降低最终项目打包体积

#### 提升 webpack 版本

### 打包体积优化

主要是打包后项目整体体积的优化，有利于项目上线后的页面加载速度提升

#### CSS 代码压缩

CSS 代码压缩使用`css-minimizer-webpack-plugin`，效果包括压缩、去重

#### JS 代码压缩

-   JS 代码压缩使用`terser-webpack-plugin`或者 uglify，实现打包后 JS 代码的压缩；

```js
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // 去重压缩css
      new TerserPlugin({ // 压缩JS代码
        terserOptions: {
          compress: {
            drop_console: true, // 去除console
          },
        },
      }), // 压缩JavaScript
    ],
  }
```

#### tree-shaking

tree-shaking 简单说作用就是：只打包用到的代码，没用到的代码不打包，而 webpack5 默认开启 tree-shaking，当打包的 mode 为 production 时，自动开启 tree-shaking 进行优化

#### source-map 类型

source-map 的作用是：方便你报错的时候能定位到错误代码的位置。它的体积不容小觑，所以对于不同环境设置不同的类型是很有必要的。

1. 开发环境: `devtool: 'eval-cheap-module-source-map'`, 开发环境的时候我们需要能精准定位错误代码的位置
2. 生产环境: `devtool: 'nosources-source-map'`, 生产环境，我们想开启 source-map，但是又不想体积太大，那么可以换一种类型

#### 打包体积分析

使用`webpack-bundle-analyzer`插件可以审查打包后的体积分布，进而进行相应的体积优化

### 用户体验优化

#### 模块懒加载

如果不进行模块懒加载的话，最后整个项目代码都会被打包到一个 js 文件里，单个 js 文件体积非常大，那么当用户网页请求的时候，首屏加载时间会比较长，使用模块懒加载之后，大 js 文件会分成多个小 js 文件，网页加载时会按需加载，大大提升首屏加载速度。在配置路由时使用 lazy 动态 import 页面组件。

#### Gzip

使用`compression-webpack-plugin`，开启 Gzip 后，大大提高用户的页面加载速度，因为 gzip 的体积比原文件小很多，当然也需要后端的配合。

```js
plugins: [
	// ...
	// gzip
	new CompressionPlugin({
		algorithm: "gzip",
		threshold: 10240,
		minRatio: 0.8,
	}),
];
```

```zsh
# 开启和关闭gzip模式
gzip on;
# gizp压缩起点，文件大于1k才进行压缩
gzip_min_length 1k;
# 设置压缩所需要的缓冲区大小，以4k为单位，如果文件为7k则申请2*4k的缓冲区
gzip_buffers 4 16k;
# 设置gzip压缩针对的HTTP协议版本
gzip_http_version 1.0;
# gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间
gzip_comp_level 2;
# 进行压缩的文件类型
gzip_types text/plain application/javascript text/css application/xml;
# 是否在http header中添加Vary: Accept-Encoding，建议开启
gzip_vary on;
```

#### 小图片转 base64

对于一些小图片，可以转 base64，这样可以减少用户的 http 网络请求次数，提高用户的体验。webpack5 中`url-loader`已被废弃，改用`asset-module`

```js
{
   test: /\.(png|jpe?g|gif|svg|webp)$/,
   type: 'asset',
   parser: {
     // 转base64的条件
     dataUrlCondition: {
        maxSize: 25 * 1024, // 25kb
     }
   },
   generator: {
     // 打包到 image 文件下
    filename: 'images/[contenthash][ext][query]',
   },
},
```

#### 合理配置 hash

我们要保证，改过的文件需要更新 hash 值，而没改过的文件依然保持原本的 hash 值，这样才能保证在上线后，浏览器访问时没有改变的文件会命中缓存，从而达到性能优化的目的。

```js
 output: {
    path: path.resolve(__dirname, '../dist'),
    // 给js文件加上 contenthash
    filename: 'js/chunk-[contenthash].js',
    clean: true,
  },
```

#### 首屏优化之 CDN 加速

通过把类似 echart、element-ui、lodash 等第三方依赖库单独提取出，从而减小打包的体积大小，通过 chainWebpack 中配置 externals 属性后的依赖插件不会被打包进 chunk 。而使用 CDN 加速、缓存也能加快访问速度。

1. 在 index.html 中手动引入 cdn 链接。并修改 webpack 配置，不再把 cdn 引入的依赖打包进 chunk。

```js
const IS_PRO = process.env.NODE_ENV === "production";
module.exports = {
	//... 其他基本配置
	chainWebpack: (config) => {
		if (IS_PRO) {
			config.externals({ echarts: "echarts" });
		}
	},
};
```

2. 通过 html-webpack-plugin 将 cdn 注入到 index.html 之中。需要修改 webpack 配置。

```js
const cdn = {
	css: [],
	js: ["https://cdn.jsdelivr.net/npm/echarts@4.8.0/dist/echarts.min.js"],
};
// 通过 html-webpack-plugin 将 cdn 注入到 index.html 之中
config.plugin("html").tap((args) => {
	args[0].cdn = cdn;
	return args;
});
```

#### 首屏优化之代码分割-splitChunks 拆包优化

1. Bundle Splitting: 这个过程提供了一种优化构建的方法，允许 webpack 为单个应用程序生成多个 bundle 文件。因此，可以将每个 bundle 文件与影响其他文件的更改进行分离，从而减少重新发布并由此被客户端重新下载的代码量，并且运用浏览器「缓存」。
    - 拆分的越小，文件越多，可能会有更多 Webpack 的辅助代码，也会带来更少的合并压缩。但是，通过数据分析，文件拆分越多，性能会更好。
2. Code Splitting: 代码分离指将代码分成不同的包/块，然后可以「按需加载」，而不是加载包含所有内容的单个包。一般配合路由懒加载。通过 Webpack4 的 import()语法。

-   webpack 默认配置下会把所有的依赖和插件都打包到 vendors.js 中，有些可能是 app.js 。所以，对于大量引入第三方依赖的项目，这个文件会非常的大。而对于在特定页面中才会使用的插件也会造成性能浪费。这时拆分和异步就显得尤为重要了。
-   包的大小本地打包完成时可以看到，若想更仔细的分析可以通过插件 `webpack-bundle-analyzer`；
-

```js
splitChunks: {
    chunks: "async",// 哪些chunks需要进行优化，async-按需引入的模块将会被用于优化，initial-被直接引入的模块将会被用于优化，all-全部都会被用于优化。
    minSize: 30000,// 打包优化完生成的新chunk大小要> 30000字节，否则不生成新chunk。
    minChunks: 1,// 共享该module的最小chunk数
    maxAsyncRequests: 5,// 最多有N个异步加载请求该module
    maxInitialRequests: 3,// 一个入口文件可以并行加载的最大文件数量
    automaticNameDelimiter: '~',// 名字中间的间隔符
    name: true,// chunk的名字，true-自动生成，false-由 id 决定，string-缓存组最终会打包成一个 chunk，名称就是该 string。
    cacheGroups:{// 要切割成的每一个新chunk就是一个cache group。
      styles: {
          name: 'style',
          test: m => m.constructor.name === 'CssModule',// 用来决定提取哪些module，可以接受字符串，正则表达式，或者函数，函数的一个参数为module，第二个参数为引用这个module的chunk(数组)。
          chunks: 'all',
          enforce: true,
          priority: 40,
      },
      emcommon: {
          name: 'emcommon',
          test: module => {
              const regs = [/@ant-design/, /@em/, /@bytedesign/];
              return regs.some(reg => reg.test(module.context));
          },
          chunks: 'all',
          enforce: true,
          priority: 30,// 优先级一样的话，size大的优先被选择。
      },
      byteedu: {
          name: 'byteedu',
          test: module => {
              const regs = [
                  /@ax/,
                  /@bridge/,
                  /axios/,
                  /lodash/,
                  /@byted-edu/,
                  /codemirror/,
                  /@syl-editor/,
                  /prosemirror/,
              ];
              return regs.some(reg => reg.test(module.context));
          },
          chunks: 'all',
          enforce: true,
          priority: 20,
      },
      default: {
          minChunks: 2,
          priority: 1,
          chunks: 'all',
          reuseExistingChunk: true,// 当module未变时，是否可以使用之前的chunk。
      },
    },
};
```

## webpack 构建流程

1. 通过 yargs 解析 config 和 shell 的配置项
2. webpack 初始化过程，首先会根据第一步的 options 生成 compiler 对象，然后初始化 webpack 的内置插件及 options 配置
3. run 代表编译的开始，会构建 compilation 对象，用于存储这一次编译过程的所有数据
4. make 执行真正的编译构建过程，从入口文件开始，构建模块，直到所有模块创建结束
5. seal 生成 chunks，对 chunks 进行一系列的优化操作，并生成要输出的代码
6. seal 结束后，Compilation 实例的所有工作到此也全部结束，意味着一次构建过程已经结束

Webpack 插件统一以 apply 方法为入口，然后注册优化事件，apply 方法接收一个参数，该参数是 webpack 初始化过程中生成的 compiler 对象的引用，从而可以在回调函数中访问到 compiler 对象。

```js
apply(compiler) {
  //Compiler 对象包含了 Webpack 环境的所有配置信息，包含options、loaders、plugins等信息。这个对象在 Webpack 启动时被实例化，它是全局唯一的，可以简单地将它理解为 Webpack 实例。
  compiler.hooks.thisCompilation.tap("SplitChunksPlugin", compilation => {
  //Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。当 Webpack 以开发模式运行时，每当检测到一个文件变化，一次新的 Compilation 将被创建。Compilation 对象也提供了很多事件回调供插件做扩展。通过 Compilation 也能读取到 Compiler 对象。
    let alreadyOptimized = false;
    //当编译开始接受新模块时触发
    compilation.hooks.unseal.tap("SplitChunksPlugin", () => {
      alreadyOptimized = false;
    });
    //在块优化阶段的开始时调用。插件可以利用此钩子来执行块优化。
    compilation.hooks.optimizeChunksAdvanced.tap(
      "SplitChunksPlugin",
      chunks => {
          //核心代码
      }
    );
  });
}
```
