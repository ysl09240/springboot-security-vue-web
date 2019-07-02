# ezhuyunzhihui

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

说明
https://www.cnblogs.com/ganmy/p/6029774.html

1.安装node.js（http://www.runoob.com/nodejs/nodejs-install-setup.html）
2.node -v
3.基于node.js,利用淘宝npm镜像安装相关依赖
  在cmd里直接输入：npm install -g cnpm --registry=https://registry.npm.taobao.org，回车，等待安装...
4.安装全局vue-cli脚手架,用于帮助搭建所需的模板框架
  在cmd里 1)输入：cnpm install -g vue-cli，回车，等待安装...
         2).输入：vue，回车，若出现vue信息说明表示成功
5.创建项目   
   在cmd里输入：vue init webpack vue_test(项目文件夹名)，回车，等待一小会儿，依次出现‘git’下的项，可按下图操作
6.安装依赖
   cd vue_test
   npm run dev