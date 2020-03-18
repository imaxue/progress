```scss
@use "sass:meta";
@use "var";
@debug meta.module-variables("var");
// export可以将变量导出至js中引用
:export {
  var: var;
}

.text-primary {
  color: var.$color-primary;
}
```