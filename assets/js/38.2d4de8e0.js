(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{606:function(t,v,_){"use strict";_.r(v);var a=_(10),r=Object(a.a)({},(function(){var t=this,v=t.$createElement,_=t._self._c||v;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h2",{attrs:{id:"概念"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#概念"}},[t._v("#")]),t._v(" 概念")]),t._v(" "),_("p",[t._v("DMZ 是为了解决安装防火墙后外部网络的访问用户不能访问内部网络服务器的问题，而设立的一个非安全系统与安全系统之间的缓冲区。该缓冲区位于企业内部网络和外部网络之间的小网络区域内。在这个小网络区域内可以放置一些必须公开的服务器（如企业 Web 服务器、FTP 服务器和论坛等）；另一方面，通过这样一个 DMZ 区域，更加有效地保护了内部网络。因为这种网络部署，比起一般的防火墙方案，对来自外网的攻击者来说又多了一道关卡。")]),t._v(" "),_("p",[t._v("DMZ 区域可以理解为一个不同于外网和内网的特殊网络区域")]),t._v(" "),_("p",[t._v("在一个用路由器连接的局域网中,我们可以将网络划分为三个区域：")]),t._v(" "),_("ol",[_("li",[t._v("安全级别最高的 LAN Area（内网）；")]),t._v(" "),_("li",[t._v("安全级别中等的 DMZ 区域；")]),t._v(" "),_("li",[t._v("安全级别最低的 Internet 区域（外网）。")])]),t._v(" "),_("p",[t._v("三个区域因担负不同的任务而拥有不同的访问策略。")]),t._v(" "),_("h2",{attrs:{id:"原理"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#原理"}},[t._v("#")]),t._v(" 原理")]),t._v(" "),_("p",[t._v("将部分用于提供对外服务的服务器主机划分到一个特定的子网——DMZ 内，在 DMZ 的主机能与同处 DMZ 内的主机和外部网络的主机通信，而同内部网络主机的通信会被受到限制。这使 DMZ 的主机能被内部网络和外部网络所访问，而内部网络又能避免外部网络所得知。")]),t._v(" "),_("h2",{attrs:{id:"两个防火墙之间的空间被称为-dmz"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#两个防火墙之间的空间被称为-dmz"}},[t._v("#")]),t._v(" 两个防火墙之间的空间被称为 DMZ")]),t._v(" "),_("p",[t._v("我们在配置一个拥有 DMZ 区的网络的时候，通常定义以下的访问控制策略以实现 DMZ 区的屏蔽功能：")]),t._v(" "),_("ol",[_("li",[t._v("内网可以访问外网")])]),t._v(" "),_("ul",[_("li",[t._v("内网的用户显然需要自由地访问外网。在这一策略中，防火墙需要进行源地址转换。")])]),t._v(" "),_("ol",{attrs:{start:"2"}},[_("li",[t._v("内网可以访问 DMZ")])]),t._v(" "),_("ul",[_("li",[t._v("此策略是为了方便内网用户使用和管理 DMZ 中的服务器。")])]),t._v(" "),_("ol",{attrs:{start:"3"}},[_("li",[t._v("外网不能访问内网")])]),t._v(" "),_("ul",[_("li",[t._v("很显然，内网中存放的是公司内部数据，这些数据不允许外网的用户进行访问。")])]),t._v(" "),_("ol",{attrs:{start:"4"}},[_("li",[t._v("外网可以访问 DMZ")])]),t._v(" "),_("ul",[_("li",[t._v("DMZ 中的服务器本身就是要给外界提供服务的，所以外网必须可以访问 DMZ。同时，外网访问 DMZ 需要由防火墙完成对外地址到服务器实际地址的转换。")])]),t._v(" "),_("ol",{attrs:{start:"5"}},[_("li",[t._v("DMZ 不能访问内网")])]),t._v(" "),_("ul",[_("li",[t._v("很明显，如果违背此策略，则当入侵者攻陷 DMZ 时，就可以进一步进攻到内网的重要数据。")])]),t._v(" "),_("ol",{attrs:{start:"6"}},[_("li",[t._v("DMZ 不能访问外网")])]),t._v(" "),_("ul",[_("li",[t._v("此条策略也有例外，比如 DMZ 中放置邮件服务器时，就需要访问外网，否则将不能正常工作。在网络中，非军事区(DMZ)是指为不信任系统提供服务的孤立网段，其目的是把敏感的内部网络和其他提供访问服务的网络分开，阻止内网和外网直接通信，以保证内网安全。")])]),t._v(" "),_("h2",{attrs:{id:"服务配置"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#服务配置"}},[t._v("#")]),t._v(" 服务配置")]),t._v(" "),_("p",[t._v("DMZ 提供的服务是经过了网络地址转换（NAT）和受安全规则限制的，以达到隐蔽真实地址、控制访问的功能。首先要根据将要提供的服务和安全策略建立一个清晰的网络拓扑，确定 DMZ 区应用服务器的 IP 和端口号以及数据流向。通常网络通信流向为禁止外网区与内网区直接通信，DMZ 区既可与外网区进行通信，也可以与内网区进行通信，受安全规则限制。")]),t._v(" "),_("h2",{attrs:{id:"地址转换"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#地址转换"}},[t._v("#")]),t._v(" 地址转换")]),t._v(" "),_("p",[t._v("DMZ 区服务器与内网区、外网区的通信是经过网络地址转换（NAT）实现的。网络地址转换用于将一个地址域（如专用 Internet）映射到另一个地址域（如 Internet），以达到隐藏专用网络的目的。DMZ 区服务器对内服务时映射成内网地址，对外服务时映射成外网地址。采用静态映射配置网络地址转换时，服务用 IP 和真实 IP 要一一映射，源地址转换和目的地址转换都必须要有。")]),t._v(" "),_("h2",{attrs:{id:"名词解释"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#名词解释"}},[t._v("#")]),t._v(" 名词解释")]),t._v(" "),_("ul",[_("li",[_("p",[t._v("Web 服务器：一般指像 Nginx，Apache 这类的服务器，它们一般只能解析静态资源。")])]),t._v(" "),_("li",[_("p",[t._v("应用服务器：一般指像 Tomcat，Jetty，Resin 这类的服务器，既可以解析动态资源也可以解析静态资源，但解析静态资源的能力没有 web 服务器好。")])])]),t._v(" "),_("p",[t._v("一般都是只有 web 服务器才能被外网访问，应用服务器只能在内网访问。")])])}),[],!1,null,null,null);v.default=r.exports}}]);