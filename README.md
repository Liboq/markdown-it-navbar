# markdown-it-navbar

针对 vue3 的 markdwon 的导航组件

## 特性

- 🚀 支持 markdown 导航
- 🚀 支持 生成页面元素 导航
- 🚀 支持 自定义 样式
- 💪 支持多框架
- 💪 支持自定义 iconfont
- 💪

## 安装

```js
import MarkdownNav from "markdown-it-navbar";
import "markdown-it-navbar/lib/style.css";
```

## props

```js
contianer:"", // 需要生成 导航的元素 例如 #markdown
content：""， //渲染的md内容
target:[],    //抓取的元素  默认为 ["h2", "h3", "h4", "h5"]
style:[Object,String]， //nav-item的样式
classes:"",    //自定义组件类名  String,Array
title:"", // 标题
height:"" // 自定义高度
route:Boolean // 默认false，是否需要监听浏览器路由变化来渲染menutext

```

## api

```js
itemClick: 参数是选中的文字;
```

## example

[blog](https://liboqiao.top/article?titleEn=browser-rendering-principles)
