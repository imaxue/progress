# 启动
```
npm install
npm start
```

# 打包
```
npm run build
```

+ 项目运行前请先安装node.js
+ 项目采用gulp打包，开发环境生成DEV文件夹，生产环境生成DIST文件夹
+ 开发环境提供热加载功能，代码修改后可直接查看效果无需刷新浏览器
+ 发版时将``npm run build``后生成的DIST文件夹中的内容进行上传即可，打包时已自动为文件名添加hash值，解决浏览器缓存问题
