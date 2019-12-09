## 什么是 base64

所谓 Base64，就是说选出 64 个字符----小写字母 a-z、大写字母 A-Z、数字 0-9、符号"+"、"/"（再加上作为垫字的"="，实际上是 65 个字符）----作为一个**基本字符集**。然后，其他所有符号都转换成这个字符集中的字符。
具体来讲转换分为四个步骤：

1. 将每三个字节作为一组，共 24 个二进制位
2. 将这 24 个二进制位分为 4 组，每组 6 个二进制位
3. 在上一步中的每一组 6 位二进制前补上两个 0.相当于组成了 4 个字节，共 32 个二进制位
4. 根据**基本字符集**查找到对应的符号，生成 base64 编码值

| 数值 | 字符 | 数值 | 字符 | 数值 | 字符 | 数值 | 字符 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
|  0   |  A   |  16  |  Q   |  32  |  g   |  48  |  w   |
|  1   |  B   |  17  |  R   |  33  |  h   |  49  |  x   |
|  2   |  C   |  18  |  S   |  34  |  i   |  50  |  y   |
|  3   |  D   |  19  |  T   |  35  |  j   |  51  |  z   |
|  4   |  E   |  20  |  U   |  36  |  k   |  52  |  0   |
|  5   |  F   |  21  |  V   |  37  |  l   |  53  |  1   |
|  6   |  G   |  22  |  W   |  38  |  m   |  54  |  2   |
|  7   |  H   |  23  |  X   |  39  |  n   |  55  |  3   |
|  8   |  I   |  24  |  Y   |  40  |  o   |  56  |  4   |
|  9   |  J   |  25  |  Z   |  41  |  p   |  57  |  5   |
|  10  |  K   |  26  |  a   |  42  |  q   |  58  |  6   |
|  11  |  L   |  27  |  b   |  43  |  r   |  59  |  7   |
|  12  |  M   |  28  |  c   |  44  |  s   |  60  |  8   |
|  13  |  N   |  29  |  d   |  45  |  t   |  61  |  9   |
|  14  |  O   |  30  |  e   |  46  |  u   |  62  |  +   |
|  15  |  P   |  31  |  f   |  47  |  v   |  63  |  /   |

> 根据上面的原理，在base64编码之后，文件体积会大三分之一左右

### base64编码与解码
...

### blob与base64转换
DataURL格式：
```
data:[<mime type>][;charset=<charset>][;base64],<encoded data>
```

```javascript
// data:image/png;base64,iVBORw0K...
function dataURItoBlob (dataURI) {
  const [ mimestring, data ] = dataURI.split(',')
  const mime = /(?::)(.+)(?:;)/.exec(mimestring)[1]
  const byteString = atob(data)
  const arrayBuffer = new ArrayBuffer(byteString.length)
  const intArray = new Uint8Array(arrayBuffer)

  for (var i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i)
  }
  return new Blob([intArray], {type: mime})
}
```