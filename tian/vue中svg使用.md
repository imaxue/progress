### 这里我用的vue-svgicon
### 1.安装
```
npm install vue-svgicon --save-dev
```
### 2.配置
在我们 package.json中进行配置
```
{
    "scripts": {
        "svg": "vsvg -s ./static/svg/src -t ./src/icons"
    }
}
./static/svg/src :这里指的是依赖你项目的svg文件
./src/icons  :这个是编译完输出到哪里
```
### 3.使用之前每次进行编译
```
npm run svg
```
### 4.main.ts中进行引入
```
// main.js
import Vue from 'vue'
import App from './App.vue'
import SvgIcon from 'vue-svgicon'

// Default tag name is 'svgicon'
Vue.use(SvgIcon, {
    tagName: 'svgicon'
})

new Vue({
    el: '#app',
    render: h => h(App)
})
```
### 5.使用
```
<!-- App.vue -->
<template>
    <div id="app">
        <p>
            <svgicon
                name="vue"
                width="200"
                height="200"
                color="#42b983 #35495e"
            ></svgicon>
        </p>
    </div>
</template>

<script>
    import 'icons/vue'
    export default {
        name: 'app',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }
</script>
```
