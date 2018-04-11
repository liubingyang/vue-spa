# vue-spa

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

npm run start
```
目前功能：

1:采用类jsonp获取百度输入框的关键字搜索结果；

2：利用node爬虫获取魔兽的部分论坛信息；

3.利用node.router获取用户浏览器信息进行统计了；

现在只做到开发模式，必须使用localhost:3000打开，不能使用ip，应为页面调用的接口地址是写死的localhost；

>内容提要

1.首页搜索框下拉结果调用百度接口，由于node不支持gbk编码，使用jsonp的方式调用。

2.掘金比较友好，列表直接使用https模块调用。

3.魔兽论坛则是用简易爬虫爬取的内容。

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
