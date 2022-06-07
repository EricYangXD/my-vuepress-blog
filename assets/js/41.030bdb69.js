(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{610:function(t,s,a){"use strict";a.r(s);var n=a(10),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"记录-nodejs-知识"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#记录-nodejs-知识"}},[t._v("#")]),t._v(" 记录 nodejs 知识")]),t._v(" "),a("h3",{attrs:{id:"npx"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#npx"}},[t._v("#")]),t._v(" npx")]),t._v(" "),a("p",[t._v("npx 想要解决的主要问题:")]),t._v(" "),a("ol",[a("li",[t._v("就是「"),a("strong",[t._v("调用项目内部安装的模块")]),t._v("」。")]),t._v(" "),a("li",[t._v("npx 还能「"),a("strong",[t._v("避免全局安装的模块")]),t._v("」。")])]),t._v(" "),a("h4",{attrs:{id:"调用项目内部安装的模块"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#调用项目内部安装的模块"}},[t._v("#")]),t._v(" 调用项目内部安装的模块")]),t._v(" "),a("ol",[a("li",[t._v("比如，项目内部安装了测试工具 Mocha。"),a("code",[t._v("npm install -D mocha")])]),t._v(" "),a("li",[t._v("一般来说，调用 Mocha ，只能在项目脚本和 package.json 的 scripts 字段里面， 如果想在命令行下调用，必须像下面这样。"),a("code",[t._v("node-modules/.bin/mocha --version")])]),t._v(" "),a("li",[t._v("通过 npx 调用就会很简单："),a("code",[t._v("npx mocha --version")])]),t._v(" "),a("li",[t._v("npx 的原理很简单，就是运行的时候，会到"),a("code",[t._v("node_modules/.bin")]),t._v("路径和环境变量"),a("code",[t._v("$PATH")]),t._v("里面，检查命令是否存在。")]),t._v(" "),a("li",[t._v("由于 npx 会检查环境变量"),a("code",[t._v("$PATH")]),t._v("，所以系统命令也可以调用。"),a("code",[t._v("npx ls")])]),t._v(" "),a("li",[t._v("注意，Bash 内置的命令不在"),a("code",[t._v("$PATH")]),t._v("里面，所以不能用。比如，cd 是 Bash 命令，因此就不能用"),a("code",[t._v("npx cd")]),t._v("。")])]),t._v(" "),a("h4",{attrs:{id:"避免全局安装的模块"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#避免全局安装的模块"}},[t._v("#")]),t._v(" 避免全局安装的模块")]),t._v(" "),a("ul",[a("li",[t._v("npx 可以运行某些模块/脚手架工具，而且不进行全局安装。"),a("code",[t._v("npx create-react-app my-react-app")])]),t._v(" "),a("li",[t._v("npx 将"),a("code",[t._v("create-react-app")]),t._v("下载到一个临时目录，使用以后再删除。所以，以后再次执行上面的命令，会重新下载"),a("code",[t._v("create-react-app")]),t._v("。只要 npx 后面的模块无法在本地发现，就会下载同名模块。")]),t._v(" "),a("li",[t._v("下载全局模块时，npx 允许指定版本。"),a("code",[t._v("npx uglify-js@3.1.0 main.js -o ./dist/main.js")])])]),t._v(" "),a("h3",{attrs:{id:"require-工作原理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#require-工作原理"}},[t._v("#")]),t._v(" require 工作原理")]),t._v(" "),a("ul",[a("li",[t._v("require 方法")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Module")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("require")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("id")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typeof")]),t._v(" id "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!==")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"string"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("throw")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ERR_INVALID_ARG_TYPE")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"id"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"string"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("id "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("throw")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ERR_INVALID_ARG_VALUE")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"id"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"must be a non-empty string"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" Module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("_load")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* isMain */")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("ul",[a("li",[t._v("_load 方法")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("Module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("_load")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("request"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" parent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" isMain")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("parent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("debug")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Module._load REQUEST %s parent: %s"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" request"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" parent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" filename "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("_resolveFilename")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("request"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" parent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" isMain"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" cachedModule "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_cache"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("filename"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cachedModule"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("updateChildren")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("parent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" cachedModule"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" cachedModule"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("NativeModule"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("nonInternalExists")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("filename"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("debug")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"load native module %s"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" request"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" NativeModule"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("filename"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Don't call updateChildren(), Module constructor already does.")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" module "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Module")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("filename"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" parent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("isMain"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\tprocess"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("mainModule "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\tmodule"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"."')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n\tModule"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_cache"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("filename"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("tryModuleLoad")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" filename"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("如上，require 的大致过程如下：")]),t._v(" "),a("ol",[a("li",[t._v("先检测传入的 id 是否有效。")]),t._v(" "),a("li",[t._v("如果有效，则调用 Module._load 方法，该方法主要负责加载新模块和管理模块的缓存，而 require 本身就是对该方法的一个封装。")]),t._v(" "),a("li",[t._v("然后会调用 Module._resolveFilename 去取文件地址。")])]),t._v(" "),a("ul",[a("li",[a("ol",[a("li",[t._v("查询文件名是否是核心模块，如果是直接返回传入的 id")])])]),t._v(" "),a("li",[a("ol",{attrs:{start:"2"}},[a("li",[t._v("因为 option 没有参数传入，所以会调用 Module._resolveLookupPaths 方法去获取路径")])])]),t._v(" "),a("li",[a("ol",{attrs:{start:"3"}},[a("li",[t._v("调用 Module._findPath 方法")])]),t._v(" "),a("ul",[a("li",[t._v("_resolveLookupPaths：其实就是 node 解析模块中的路径查找，他会向父目录查找，直到根目录为止。")]),t._v(" "),a("li",[t._v("_findPath：其实就是将_resolveLookupPaths 查找出来的文件名和文件 id 向匹配，返回一个文件地址。")])])])]),t._v(" "),a("ol",{attrs:{start:"4"}},[a("li",[t._v("判断是否有缓存模块，如果有则返回缓存模块的 exports。")]),t._v(" "),a("li",[t._v("如果没有缓存，再检测文件名是否是核心模块，如果是则调用核心模块的 require。")]),t._v(" "),a("li",[t._v("如果不是核心模块，那么创建一个新的 module 对象。")]),t._v(" "),a("li",[t._v("在 Module._cache 中缓存该对象，"),a("code",[t._v("Module._cache[filename] = module;")]),t._v("。")]),t._v(" "),a("li",[t._v("调用"),a("code",[t._v("tryModuleLoad(module, filename);")]),t._v("，去尝试加载模块，如果报错，那么清除模块的缓存。")]),t._v(" "),a("li",[t._v("返回模块本身的 exports 对象。")])]),t._v(" "),a("h2",{attrs:{id:"rpc-协议之-protobuf"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rpc-协议之-protobuf"}},[t._v("#")]),t._v(" RPC 协议之 protobuf")]),t._v(" "),a("p",[t._v("nodejs 中的 "),a("code",[t._v("protobufjs")]),t._v(" 库包含一个 "),a("code",[t._v("toObject")]),t._v(" 方法，该方法提供一个可以传递给 "),a("code",[t._v("JSON.stringify()")]),t._v(" 的纯 javascript 对象。接收一个 protobuf 实例对象和一个配置对象。返回一个 js 对象。")])])}),[],!1,null,null,null);s.default=e.exports}}]);