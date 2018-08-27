# react测试

## 测什么

- React 组件的 render 结果是一个组件树，并且整个树最终会被解析成一个纯粹由 HTML 元素构成的树形结构
- React 组件可以拥有 state，且 state 的变化会影响 render 结果
- React 组件可以拥有生命周期函数，这些生命周期函数会在特定时间点执行

## 用什么

1. Mocha & Chai

Mocha是一个JS的测试框架

- 简单、易上手
- 支持TDD、BDD等多种接口
- 支持同步和异步的测试
- 支持多种方式导出结果
- 支持直接在浏览器上跑JavaScript代码

Chai断言库


2. Sinon

提供 fake 数据， 替换函数调用等功能

在我们的代码需要与其他系统或者函数对接时，它可以模拟这些场景

3. Enzyme

基于 react-test-renderer 和 react-dom/test-utils 的

类似 jquery 风格的 api 操作react 节点

### Enzyme三种方法

- shallow

shallow rendering(测试虚拟DOM的方法（浅渲染）指的是，将一个组件渲染成虚拟DOM对象，但是只渲染第一层，不渲染所有子组件，所以处理速度非常快。它不需要DOM环境，因为根本没有加载进DOM。)的封装




4. [Jest](https://jestjs.io/zh-Hans/)

- Facebook 官方支持
- 适应性：Jest是模块化、可扩展和可配置的。
- 沙箱和快速：Jest虚拟化了JavaScript的环境，能模拟浏览器，并且并行执行
- 快照测试：Jest能够对React 树进行快照或别的序列化数值快速编写测试，提供快速更新的用户体验。
- 支持异步代码测试：支持promises和async/await


5. End-to-end (E2E) Tests  ???
6. CI and Tests  ???


## mocha测试

1. $ mocha

2. $ mocha --recursive

$ npm install --save-dev mochawesome

$ ../node_modules/.bin/mocha --reporter mochawesome

3. $ mocha --recursive --reporter tap --growl

4. $ npm install babel-core babel-preset-es2015 --save-dev

$ ../node_modules/mocha/bin/mocha --compilers js:babel-core/register

$ npm install babel-polyfill --save

5. $ mocha -t 5000 timeout.test.js

$ mocha -t 5000 -s 1000 timeout.test.js

$ mocha -t 10000 async.test.js

6. beforeEach.test.js / beforeEach-async.test.js

7. test/add.test.js

8. $ mocha init demo08

9. $ mocha --recursive -R markdown > spec.md