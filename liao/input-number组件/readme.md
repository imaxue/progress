# number-input组件

## 引入
```js
import NumberInput from './NumberInput'

components:{
    NumberInput
}
```

## 使用方法

```html

<number-input v-model="value"  style="width:50px;" :type="'number'" :min='0' :max="10" ></number-input>

```

## 说明

type: 类型

    number：只能输入整数
    price：只能输入两位小数的数字
    other：任意数字

min：最小值
max：最大值