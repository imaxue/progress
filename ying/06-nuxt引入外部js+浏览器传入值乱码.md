# nuxt.js
>直接引入rem.js时，会报window 不存在
>原因：window在服务端不存在
>引入外部js的办法
>1.在assets中将js文件暴露出来 
>2.在plugins中 把暴露出来的rem 赋值给window.rem 或者直接省去第一步，把rem.js文件直接赋值给window.rem
>3.在nuxt.config.js 中 配置
 >   plugins: [
  >      { src: './plugins/rem.js', ssr: false },
   > ]
>注意：有些插件可能只是在浏览器里使用，所以你可以用 ssr: false 变量来配置插件只从客户端还是服务端运行。

# 如何解决浏览器的汉字传入值乱码
```javascript
1.
v-bind:href="'./aaa.html?name=' + encodeURI(series.name)"
2.
functiongetUrlString(name) {
let r = decodeURI(window.location.search.substr(1))
let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
r = r.match(reg);
if (r != null)
return unescape(r[2]);
return null;
}
```