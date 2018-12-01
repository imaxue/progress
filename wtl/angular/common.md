```js
  formatNumber(num: number, point: number): number {
    const reg = new RegExp(`^(.*\\..{${point}}).*$`);
    return Number(String((num)).replace(reg, '$1'));
  }

```
```js
      'Content-Type': 'application/x-www-form-urlencoded',
      'accept': '*/*'
// 可以不进行 options 请求
```

