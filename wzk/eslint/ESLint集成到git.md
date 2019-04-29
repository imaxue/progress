##### 目录
- 1、解决思路
- 2、脚本check.js中 new CLIEngine()详解

##### 1、解决思路
- 安装pre-commit插件
    ```
    npm install pre-commit --save-dev
    ```
- 应用场景1：执行静态文件检查，上面配置会保证eslint在提交时会校验src目录下的js文件。
  - 配置package.json如下：
    ```
    // package.json
    "scripts": {
        "lint": "eslint src --ext .js --cache --fix",
      },
      "pre-commit": [
        "lint",
      ]
    ```
- 应用场景二：动态获取提交的代码进行校验
  - 配置package.json如下：
    ```
    // package.json
    "scripts": {
         "lint": "eslint src --ext .js --cache --fix",
         "pre-lint": "node check.js"
    },
    "pre-commit": [
         "pre-lint",
    ]
    ```
  - 在check.js中需要调用eslint的Node.js API，详情可看eslint官网
  - 以下是我在项目中的例子，可作为参考：
    ```
    // check.js
    const exec = require('child_process').exec
    const CLIEngine = require('eslint').CLIEngine
    const cli = new CLIEngine({})
    function getErrorLevel (number) {
      switch (number) {
        case 2:
          return 'error'
        case 1:
          return 'warn'
        default:
      }
      return 'undefined'
    }
    let pass = 0
    exec('git diff --cached --name-only | grep -E ".(ts|vue)$"', (error, stdout) => {
      if (stdout.length) {
        const array = stdout.split('\n')
        array.pop()
        const results = cli.executeOnFiles(array).results
        let errorCount = 0
        let warningCount = 0
        results.forEach((result) => {
          errorCount += result.errorCount
          warningCount += result.warningCount
          if (result.messages.length > 0) {
            console.log('\n')
            console.log(result.filePath)
            result.messages.forEach((obj) => {
              const level = getErrorLevel(obj.severity)
              console.log(`   ${obj.line}:${obj.column}  ${level}  ${obj.message}  ${obj.ruleId}`)
              pass = 1
            })
          }
        })
        if (warningCount > 0 || errorCount > 0) {
          console.log(`\n   ${errorCount + warningCount} problems (${errorCount} ${'errors'} ${warningCount} warnings)`)
        }
        process.exit(pass)
      }
      if (error !== null) {
        // console.log(`exec error: ${error}`)
      }
    })
    ```
##### 2、脚本check.js中 new CLIEngine()详解
- 本质上是通过nodejs类型的API接口手动对文件进行eslint检测
- 基本使用：
  - 1、new一个检测实例：var cli = new CLIEngine({})；
  - 2、调用实例对象cli上的executeOnFiles()方法，此方法参数是要检测的文件或者目录，返回值是检测结果：
    ```
    var report = cli.executeOnFiles(["myfile.js", "lib/"]);
    ```
- new CLIEngine({})参数为空对象即可，因为调用此API时，vue项目根目录下的eslitn配置文件.eslintrc.js是有效的，相当于入参了
  - 已经测试确定此机制！

##### 参考资料
- https://www.jianshu.com/p/072a96633479