## 过程

```shell
npm install --save-dev jest
npm install --save-dev babel-jest regenerator-runtime
npm install --save-dev @babel/cli @babel/core @babel/preset-env @babel/plugin-transform-regenerator @babel/plugin-transform-runtime @babel/runtime

```

## 项目目录添加.babelrc 文件

```
{
    "presets": ["@babel/preset-env"],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}
```

## package.json 里添加命令 test:jest

```
"scripts": {
    "build": "webpack --mode=production --config=config/webpack.prod.js",
    "test": "jest"
  },
```

## 项目里添加 test 目录

- 添加 xx.test.js 文件，每个 test.js 就是一个测试文件，jest 会自动识别

- 常规测试

```js
test("测试返回数组长度为1", () => {
  expect(fun("url")).toHaveLength(1);
});
```

- 包含异步函数

```js
test("异步", () => {
  return fun("id").then(res => {
    // console.log(res)
    expect(res).toHaveLength(1);
  });
});
// 或者
test("异步", async () => {
  let res = await fun("id");
  // console.log(res)
  expect(res).toHaveLength(1);
});
```

- 带定时器的
test方法后边第三个参数可以设定测试最长时间，突破默认的5s
```js
var temp = {
  data:'',
}
var fun2 = function(data){
  temp.data = data
  return data
}
function fun(temp){
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
      resolve(temp.data)
    },5000)
  });
}
test('测试定时器', async ()=>{
//  延时5s
  await fun(temp)
  // 第二次曝光事件再判断发送数据
 expect(fun2('id')).toHaveLength(2);
},13000)
```
