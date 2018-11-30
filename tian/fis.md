### 构建。
```js
fis3 release -d <path>
构建发布到项目目录 path下
```
### 资源定位
  1.构建过程中对资源 URI 进行了替换，替换成了绝对 URL。通俗点讲就是相对路径换成了绝对路径。这是一个 FIS 的很重要的特性，资源定位。  
  2.资源定位能力，可以有效地分离开发路径与部署路径之间的关系，工程师不再关心资源部署到线上之后去了哪里，变成了什么名字，这些都可以通过配置来指定。而工程师只需要使用相对路径来定位自己的开发资源即可。  
  
### fis.match(elector, props)
  1.elector:FIS3 把匹配文件路径的路径作为selector，匹配到的文件会分配给它设置的 props  
  2.props:编译规则属性，包括文件属性和插件属性  
```js
//例如：
fis.match('*.js', {
  useHash: false
});
fis.match('*.css', {
  useHash: false
});

fis.match('*.png', {
  useHash: false
});
```
  3.供多种状态功能，比如有些配置是仅供开发环境下使用，有些则是仅供生产环境使用的。  
  ```js
  fis.match('*', {
  useHash: false
});

fis.media('prod').match('*.js', {
  optimizer: fis.plugin('uglify-js')
});

  ```
  编译时使用 prod 指定的编译配置，即对 js 进行压缩。  
### 文件指纹
  1.文件指纹，唯一标识一个文件。在开启强缓存的情况下，如果文件的 URL 不发生变化，无法刷新浏览器缓存。一般都需要通过一些手段来强刷缓存，一种方式是添加时间戳，每次上线更新文件，给这个资源文件的 URL 添加上时间戳。  
  2.FIS3 选择的是添加 MD5 戳  
  ```js
  //清除其他配置，只剩下如下配置
fis.match('*.{js,css,png}', {
  useHash: true
});
  ```
 ### 压缩资源
 为了减少资源网络传输的大小，通过压缩器对 js、css、图片进行压缩是一直以来前端工程优化的选择。在 FIS3 中这个过程非常简单，通过给文件配置压缩器即可。  
 ```js
 // 清除其他配置，只保留如下配置
fis.match('*.js', {
  // fis-optimizer-uglify-js 插件进行压缩，已内置
  optimizer: fis.plugin('uglify-js')
});

fis.match('*.css', {
  // fis-optimizer-clean-css 插件进行压缩，已内置
  optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
  optimizer: fis.plugin('png-compressor')
});
 ```
 ### CssSprite图片合并 
 压缩了静态资源，我们还可以对图片进行合并，来减少请求数量。  
 FIS3 构建会对 CSS 中，路径带 ?__sprite 的图片进行合并。为了节省编译的时间，分配到 useSprite: true 的 CSS 文件才会被处理。  
 ```js 
 li.list-1::before {
  background-image: url('./img/list-1.png?__sprite');
}

li.list-2::before {
  background-image: url('./img/list-2.png?__sprite');
}

//配置
// 启用 fis-spriter-csssprites 插件
fis.match('::package', {
  spriter: fis.plugin('csssprites')
})

// 对 CSS 进行图片合并
fis.match('*.css', {
  // 给匹配到的文件分配属性 `useSprite`
  useSprite: true
});
 ```
 ### 功能组合
 ```js
 
 // 加 md5
fis.match('*.{js,css,png}', {
  useHash: true
});

// 启用 fis-spriter-csssprites 插件
fis.match('::package', {
  spriter: fis.plugin('csssprites')
});

// 对 CSS 进行图片合并
fis.match('*.css', {
  // 给匹配到的文件分配属性 `useSprite`
  useSprite: true
});

fis.match('*.js', {
  // fis-optimizer-uglify-js 插件进行压缩，已内置
  optimizer: fis.plugin('uglify-js')
});

fis.match('*.css', {
  // fis-optimizer-clean-css 插件进行压缩，已内置
  optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
  optimizer: fis.plugin('png-compressor')
});
 ```
 可能有时候开发的时候不需要压缩、合并图片、也不需要 hash。那么给上面配置追加如下配置；  
 ```js
 fis.media('debug').match('*.{js,css,png}', {
  useHash: false,
  useSprite: false,
  optimizer: null
})
 ```
 fis3 release debug 启用 media debug 的配置，覆盖上面的配置，把诸多功能关掉。  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
