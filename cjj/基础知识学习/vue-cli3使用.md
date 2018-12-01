配置自定义的环境变量与模式  
1. 需要在项目根目录创建``.env.[mode]``文件，如自定义一个mock模式则创建 ``.env.mock``
2. 在文件内写上需要的环境变量
    ```
    NODE_ENV=production
    VUE_APP_MOCKURL=https://www.easy-mock.com/mock/.....
    BASEURL=/mock
    ```
    此处说明一下：在客户端里面使用的变量需要加上``VUE_APP_``前缀才能通过``process.env.VUE_APP_[variable]``获取到对应的变量。如上面代码中的``VUE_APP_MOCKURL``。在webpack中使用就不需要这样做，直接``process.env.[variable]``就能获取到
  1. 在package.json中配置
      ```json
      {
        "scripts": {
          "build&Mock": "vue-cli-service build --mode mock" // 此处的mock就是第一步创建的文件.env.mock中的mock字段
        },
      }
      ```
      注意：通过vue ui运行对应的模式的话注意一定要将环境设置为``(unset)``，不然默认的``production``模式会覆盖掉你自定义的模式，同时记得在自定义模式中设置``NODE_ENV``，不然默认的NODE_ENV为``development``