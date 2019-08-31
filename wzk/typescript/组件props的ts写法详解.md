##### 引言
- 使用 TypeScript 编写 Vue 的时候，主要有两种方法Vue.extend() 和 vue-class-component

##### Vue with TypeScript中组件传值props的写法
- Vue.extend()实现 props 其实和 JavaScript 没有任何差别，但是如果你需要有 Object 变量类型提示，那就有点不一样了
- vue-class-component实现 props， 需要从 vue-property-decorator 引入 Prop 这个修饰符，使用起来也非常方便

##### JavaScript写法
```
  // 简单写法:
  props: ['isVisible', 'title', 'item', 'count', 'items']
  
  // 如果加入了prop验证，这样写:
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    title: {
      type: [String, Number]
    },
    item: {
      type: Object
    },
    items: {
      type: Array,
    }
    count: {
      count: Number
    }
  }
```
##### vue.extend()方式
```
  // 简单写法:
  props: ['isVisible', 'title', 'item', 'count', 'items']
  /* 简单写法没有任何改变，但是这样没有任何类型提示，这些变量能被TS识别，但是会全部被识别成any，和没类型检查一样 */

  // 如果加入了prop验证，这样写:
  // 首先定义接口，假设item对象的结构是
  interface Item {
    key: string
    val: string
    num: number
  }
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    title: {
      type: [String, Number]
    },
    item: {
      // 注意这里不是
      // Object as Item
      type: Object as () => Item
    },
    itmes: {
      // 注意这里不是
      // Array as Array<Item>
      type: Array as () => Array<Item>
    }
    count: {
      count: Number
    }
  }
  /* 当加入prop验证之后，TS就会提示prop类型了，如果是对象的话，还能有对象的成员提示，写法和JS写法差不多，只是对象类型（包括对象，数组和函数）的有点差别*/
```
##### vue-class-component方式
```
  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Prop({
    required: true
  }) isVisible!: boolean
  
  @Prop() title!: string | number
  
  @Prop() item!: Item
  
  @Prop() items!: Array<Item>
  
  @Prop() count!: number
  
  // 注意要加非空断言符 ! 不然会报，当然，你定义成any类型当我没说

  // 关于非空断言可以参考这个 [non-null-assertion-operator](https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#non-null-assertion-operator) 

```
