# react-pro
从零搭建一个react项目，慢慢完善一些好玩的东西


<h3>=>组件懒加载与代码分割踩的坑</h3>
对于react的代码分割从最早的require.ensure【目前已被import()取代】到后来的Loadable【“react-loadable”】，React16.6之后官方推出了React.lazy,React.Suspense来实现组件懒加载及代码分割，但它的缺点是暂时不支持服务端渲染，由于新API使用起来简单方便就决定踩下坑
<br>1⃣️构建时提示不支持“import()”语法，此时需要安装一个Babel插件【 babel-plugin-syntax-dynamic-import 】，然后在.babelrc配置文件中的plugins增加配置：

```js
//to install
npm i babel-plugin-syntax-dynamic-import -s -D

//.babelrc
"plugins": [
     "plugin-syntax-dynamic-import"
 ]
```
然后开始构建不再报错
<br>2⃣️<br>构建后的代码虽然支持了异步加载组件但打包后的chunkFile却没有把异步组件切割，找了很多原因也没有解决，最后怀疑是Babel插件的版本过低导致的,然后把Babel升级到8.0+，升级前是7.0+，Babel的后续版本的插件都以“@babel/”开头了，比如"@babel/preset-env"的配置方法都发生了些许变化，经过一番升级后终于可以成功构建，于是结案了。。
<h3>=>关于react-router和react-router-dom的区别</h3>
简单的说就是react-router只提供了核心的东西，比如你想要使用history路由时还要安装“history”使用“createBrowserHistory”方法注入到Router中才能实现，而“react-router-dom”和“react-router-native”是基于“react-router”的拓展，web应用浏览器当然选择使用“react-router-dom”,它多了BrowserRouter, Link这些拓展，其他的没有本质上的区别
