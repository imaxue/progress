# prettier插件使用
> 错误：Insert `⏎`  prettier/prettier  
> 原因：因为prettier配置和编辑器prettier配置冲突导致的，在rules中配置掉就可以了  
> 方案：修改eslint配置文件的rules配置 [把error改成warn]
```json
{
    tabWidth: 4,
    singleQuote: true,             // 用单引号
    printWidth: 120,               // 换行字符串阈值
    semi: true,                    // 句末加分号
    trailingComma: 'none',         // 最后一个对象元素加逗号
    bracketSpacing: true,          // 对象，数组加空格
    jsxBracketSameLine: false,     // jsx > 是否另起一行
    arrowParens: 'avoid',          // (x) => {} 是否要有小括号
    requirePragma: false,          // 是否要注释来决定是否格式化代码
    proseWrap: 'preserve'          // 是否要换行
}
```