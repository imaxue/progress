# 需求：
项目中加了单元测试，想在git commit 的时候，执行 npm run test

解决：
 1. npm install pre-commit --save --dev
 2. devDependencies 加上pre-commit
 3. scripts 加上test 
 4. pre-commit 加上 test

```
"jest": {
    "setupTestFrameworkScriptFile": "./node_modules/jest-enzyme/lib/index.js"
  },
  "devDependencies": {
    "earth-scripts": "1.0.2",
    "ftp": "^0.3.10",
    "jest": "^23.6.0",
    "pre-commit": "^1.2.2"
  },
  "scripts": {
    "start": "earth-scripts start",
    "build": "earth-scripts build",
    "update": "earth-scripts update",
    "test": "jest",
    "mock": "earth-scripts mock",
    "add": "node  ./lib/add.js"
  },
  "pre-commit": [
    "test"
  ],
```

