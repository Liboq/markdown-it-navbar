
[![NPM version][npm-image]][npm-url]
<a >
    <img alt="license" src="https://img.shields.io/badge/license-MIT-brightgreen">
</a>

[npm-image]: https://img.shields.io/npm/v/markdown-it-navbar
[npm-url]: https://www.npmjs.com/package/markdown-it-navbar
# markdown-it-navbar

针对 vue3 的 markdwon 的导航组件

## 特性

- 🚀 支持 markdown 导航
- 🚀 支持 生成页面元素 导航
- 🚀 支持 自定义 样式
- 🚀 支持 实时渲染menu
- 🚀 支持 监听路由渲染menu
- 💪 支持 多框架
- 💪 支持 自定义 iconfont
- 💪

## 安装

```js
import MarkdownNav from "markdown-it-navbar";
import "markdown-it-navbar/lib/style.css";
```

## props

```js
contianer:"", // 需要生成 导航的元素 例如 #markdown 与content二选一
content：""， //渲染的md内容
target:[],    //抓取的元素  默认为 ["h1","h2", "h3", "h4", "h5"]
style:[Object,String]， //nav-item的样式
classes:"",    //自定义组件类名  String,Array
title:"", // 标题
height:"" // 自定义高度
route:Boolean // 默认false，监听浏览器路由变化来渲染menu
isWatched:Boolean // 默认false 监听页面内容变化实时渲染menu
scrollEL:String // 默认 document scroll的元素 
```

## api

```js
itemClick: 参数是选中的文字;
```

## example

[blog](https://liboqiao.top/article?titleEn=browser-rendering-principles)
