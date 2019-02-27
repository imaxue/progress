# 启动
```bash
npm install
npm start
```
---

# 打包
```bash
npm run build
```
---

# 技术栈
+ sass
+ jQuery
---

# 开发规定
>以html文件夹为例，其他相同
<table>
    <tr>
        <td rowspan="8">html</td>
        <td rowspan="3">pages</td>
        <td>example.html</td>
        <td rowspan="3">这里存放每个页面的基础结构</td>
    </tr>
    <tr>
        <td>index.html</td>
    </tr>
    <tr>
        <td>...</td>
    </tr>
    <tr>
        <td rowspan="5">public</td>
        <td>footer.html</td>
        <td rowspan="5">这里存放公共页面片段</td>
    </tr>
    <tr>
        <td>head-link.html</td>
    </tr>
    <tr>
        <td>head.html</td>
    </tr>
    <tr>
        <td>public-script.html</td>
    </tr>
    <tr>
        <td>...</td>
    </tr>
    <tr>
        <td>example-content.html</td>
        <td colspan="3">这里写基础结构外的内容，命名要以xxx-content.html</td>
    </tr>
</table>

>在html文件内，这样引用片段
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="renderer" content="webkit">
    <title>首页</title>
    <!-- 想要引入那个样式，在后面添加对应的名称即可，会自动引入css/public对应的文件 -->
    @@loop('head-link.html', [
    { "name": "reset" },
    { "name": "global" },
    { "name": "head" },
    { "name": "footer" }
    ])
    <!-- 该html的样式文件，记得写对路径 -->
    <link rel="stylesheet" href="css/pages/index/index.css">
</head>

<body>
    <div class="container">
        <!-- 这里可以引用公共片段 -->
        @@include('head.html')
        @@include('../../index-content.html')
        @@include('footer.html')
    </div>
    <!-- 与上面css同理 -->
    @@loop('public-script.html', [
    { "name": "jQuery" },
    <!-- config是全局配置文件，到config文件夹内添加对应的文件即可，会根据当前配置的环境变量引用 -->
    { "name": "config" }
    ])
    <!-- 该html的入口js文件，每个页面都这么写即可（js/pages/文件夹名/bundle.js） -->
    <script src="js/pages/index/bundle.js"></script>
</body>

</html>
```
> js有一个需要特殊注意的地方，在`js/pages/xxx`文件夹内对应html文件的入口js文件名要取名`xxx-entry.js`
---

# 注意事项
+ 项目运行前请先安装node.js
+ 项目采用gulp打包，开发环境生成DEV文件夹，生产环境生成DIST文件夹
+ 开发环境提供热加载功能，代码修改后可直接查看效果无需刷新浏览器
+ 发版时将``npm run build``后生成的DIST文件夹中的内容进行上传即可，打包时已自动为文件名添加hash值，解决浏览器缓存问题
