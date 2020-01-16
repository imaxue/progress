## eggjs学习记录

### 初始化项目
```bash
$ mkdir showcase && cd showcase
$ npm init egg --type=ts
$ npm i
$ npm run dev
```

### 在helper中使用ctx
```typescript
import { Context } from 'egg';

export function myHelper (this: Context) {
  // ...
}

```

### 使用vscode编辑代码时，eslint出现警告信息：`Expected linebreak to be 'LF' (linebreak-style)tslint(1)`
```json
// tslint.json
{
  "extends": ["tslint-config-egg"],
  "rules": {
    "linebreak-style": ["error", "windows"] // 添加这行规则
  }
}

```