# VueCnode
[![Build Status](https://www.travis-ci.org/wangdabaoqq/VueCnode.svg?branch=master)](https://www.travis-ci.org/wangdabaoqq/VueCnode)

## 项目简介</h2>
<pre>
本项目我借鉴了github上很多关于Cnode的项目,加上了一些自己的理解。最终敲定了VueCnode,当然我只能说是搬运工,项目采用的是vue技术构建.
</pre>

## 总结
<pre>
在我浏览了很多关于vuecnode的项目我认为写的很好的是<a href="https://github.com/lzxb/vue-cnode">lzxb</a>有兴趣的可以了解下。
当然我在写cnode项目时,有几点我目前没有解决的第一是页面后退数据还原及滚动条位置还原,我百度及
谷歌后发现这个问题有如下方法:结合<keep-alive>与scrollBehavior，经过实验与配置,非常好的没
有解决,恕我天资愚钝,我再问问vuet的作者。还有中方法是vuet,但是我还得去看文档百度,略觉得麻
烦,可能过几天就想看了。(呵呵)。第二个没有解决的是我的message组件,我在用accesstoken登录后
可以正常显示全部内容,但是切换页面又要重新登录。猜想及百度时发现,vuex在刷新时会清空数据,所以
会出现以上问题,推荐使用localstorage,sessionstorage储存数据,但是我没有搞定。目前就是这样。
</pre>

## 功能
- [x] 首页渲染,下拉加载
- [x] 页面详情，回复及点赞
- [x] 消息列表
- [x] 个人主页
- [x] 用户信息
- [ ] 登录数据刷新消失未解决
- [x] 退出
- [x] 关于
- [x] 页面后退,数据还原及滚动条位置还原 
- [x] 文章发布
- [x] 回到顶部
- [x] 启动动画
- [x] 404页面

## 技术栈
<pre>
Vue2.0：前端页面展示。
Vuex：Vuex，实现不同组件间的状态共享
vue-router：页面路由切换
axios：一个基于 Promise 的 HTTP 库，向后端发起请求。
timeago.js：一个时间处理的库。
es5,es6: 语法标准以及趋势
SessionStorge：保存用户信息。
webpack 前端资源加载/打包工具
stylus(styl)：用styl做css预处理语言
CSS3：CSS3过渡动画及样式。
muse-ui: 非常好的ui样式
autoprefixer: 浏览器前缀自动添加前缀
eslint: 语法检查
fastclick 移动端点击延迟插件
</pre>

## 项目使用
<pre>
1.项目克隆: git@git.oschina.net:wangdabaoqq/VueCnode.git
2.安装依赖: npm install
3.项目启动: npm run dev
4.代码发布: npm run build
</pre>

## 项目结构脑图
![脑图](http://op2gvlcz7.bkt.clouddn.com/vue.png)

## 预览图
![预览1](http://op2gvlcz7.bkt.clouddn.com/cv.png)
![预览2](http://op2gvlcz7.bkt.clouddn.com/SD.png)

## [apk地址](http://ou2hsk5xb.bkt.clouddn.com/node.apk) 

## [效果查看](http://Cnode.tyty.me)
![二维码](http://op2gvlcz7.bkt.clouddn.com/F.png)

