```js
fis.compile = function (file) {
  if (file.isFile()) {
    if (exports.useLint && file.lint) {
      pipe('lint', file);
    }
    if (!file.hasCache) {
      process(file);
    } else {
      file.revertCache();
    }
  } else {
    process(file);
  }
};

function process(file) {
  if (file.parser) {
    pipe('parser', file);
  }
  if (file.preprocessor) {
    pipe('preprocessor', file);
  }
  if (file.standard) {
    standard(file); // 标准化处理
  }
  if (file.postprocessor) {
    pipe('postprocessor', file);
  }
  if (file.optimizer) {
    pipe('optimizer', file);
  }
}
```
其中插件扩展点包括：  
  1.lint：代码校验检查，比较特殊，所以需要 release 命令命令行添加 -l 参数  
  2.parser：预处理阶段，比如 less、sass、es6、react 前端模板等都在此处预编译处理  
  3.preprocessor：标准化前处理插件
  4.standard：标准化插件，处理内置语法
  5.postprocessor：标准化后处理插件 
  
预处理阶段一般是对异构语言等进行预编译，如 less、sass 编译为标准的 css；前端模板被编译为 js 等等  
单文件阶段通过读取文件属性，来执行对应扩展点插件。  
举个例子：  
```js
fis.match('*.es6', {
  parser: fis.plugin('babel'),
  rExt: '.js' // 代码编译产出时，后缀改成 .js
});
```

给后缀是 .es6 的文件配置了一个 parser 属性，属性值是启用了一个叫 babel 的插件，当执行到预处理阶段时，将 es6 编译为 es5，供浏览器执行。  
其他插件扩展点亦然。  


