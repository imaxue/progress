##### 引言
- mixins 是一种分发 Vue 组件中可复用功能的一种方式；
- mixins类似于继承
- 使用 TypeScript 编写 Vue 的时候，主要有两种方法Vue.extend() 和 vue-class-component

##### vue-ts组件mixins写法
- Vue.extend() 并不能完全实现 mixins 多混入的效果，只能混入一个
- 不推荐混入用这种方式写，无法实现多继承
- vue-class-component 能够实现多混入，写法类似类继承，这样写不仅不会报错，而且编辑器还有提示

##### vue.extend()方式
```
// ExampleMixin.vue
export default Vue.extend({
  data () {
    return {
      testValue: 'test'
    }
  }
})

// other.vue(错误写法)
export default Vue.extend({
  mixins: [ExampleMixin],
  created () {
    this.testValue // error, testValue 报错不存在！
  }
})

// 我们需要稍作修改：
// other.vue(正确写法)
export default ExampleMixin.extend({
  mixins: [ExampleMixin],
  created () {
    this.testValue // 编译通过
  }
})

```
##### vue-class-component方式
```
  // mixin1.ts
  import Vue from 'vue'

  export default Vue.extend({
    data () {
      return {
        valFromMixin1: 'test'
      }
    }
  })
  
  // 不能是
  // 这种写法会报 Mixin1 is not a constructor function type
  export default {
    data () {
      return {
        valFromMixin1: 'test'
      }
    }
  }

  // mixin2.ts
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Mixin2 extends Vue {
    methodFromMixin2() {}
  }

  // test.ts
  import Mixin1 from './mixin1'
  import Mixin2 from './mixin2'
  import { Component, Mixins } from 'vue-property-decorator'

  export default class Test extends Mixins(Mixin1, Mixin2) {
    test() {
      this.methodFromMixin2()
      console.log(this.valFromMixin1)
    }
  }
  // 如果只混入一个的话，可以这样写
  export default class Test extends Mixin1 {}
  export default class Test extends Mixin2 {}

```
