## 不需要绑定在template里的数据
不需要绑定在template里的数据不需要写在data里，写在外边也可以直接调用，防止vue生成很多watcher，增加内存
```js
<script>
let foo = '不需要绑定在template里的数据'
export default {
  data () {
    return {
      type:'1',
    }
  },
```

## 超级大列表


先截取一部分展示，再展示全部
```js
// 商品下拉事件
goodSelectDown(good){
  this.goodInput = ''
  // 由于初始列表goodList的数据量特别大，点击显示弹窗的时候页面渲染会卡顿，
  // 所以先展示100条，页面渲染完再赋值全部数据，让用户无感知
  this.goodSearchList = this.goodList.slice(0,100)
  this.goodSearchListStatus =! this.goodSearchListStatus
  setTimeout(()=>{
    this.goodSearchList = this.goodList
  })
},
```

## 列表数据筛选
```html
<div v-if="type===1">已付款</div>
<div v-if="type===2">已发货</div>
<div v-if="type===3">已收货</div>
<div v-if="type===4">已退款</div>

```
性能方面不如如下写法，因为vue在生成vdom的时候会把所有template都parse一次，而v-if只是控制isShow和keepAlive属性而已，每次diff的时候还会遍历节点，不如只更改数据性能要好
```html
<div >{{type|typeFilter}}</div>

filters:{
  typeFilter(type){
    let obj = {
    '1': '已付款',
    '2': '已发货',
    '3': '已收货',
    '4': '已退款',
    }
    return obj[type] || type || ''

  }
},

```
