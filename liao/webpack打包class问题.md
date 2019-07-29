## class打包后new的时候报__default.a is not a constructor错误

加了libraryTarget: "umd"才好使
```js
...
  output: {
    path: path.join(__dirname, 'dist'),
    filename: path.join('[name]', 'index.js'),
    library: "my-library",
    libraryTarget: "umd" // exposes and know when to use module.exports or exports.
  },
...
```
