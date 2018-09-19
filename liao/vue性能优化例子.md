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
  this.goodSearchListStatus = !this.goodSearchListStatus
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
## watch里监听输入加节流阀

```js
watch: {
    goodInput(val){
      // 根据用户输入筛选上架列表
      // temp是为了优化筛选显示速度
      let temp = []
      if(/^[0-9]*$/.test(val)){
        temp = this.goodList.filter(e => String(e.gid).indexOf(val) >= 0)
      }else{
        temp = this.goodList.filter(e => e.gname.indexOf(val) >= 0)
      }
      this.goodSearchList = temp.slice(0, 100)
      // 此处增加节流阀，防止用户快速输入造成页面卡顿，100条以后的数据只保留最后一次结果，
      let tempVal = val
      setTimeout((val)=>{
        if(tempVal === val){
          this.goodSearchList = temp
        }
      },300)
      
    },
  },

```
## 赋值页面未更新情况，大数组重新赋值尽量不要用深拷贝
找到具体页面未更新数据的原因
```js
// 尽量使用$set，进行局部更新
this.$set(this.arr,index,{a: 555})

// 如无必要就不要用深拷贝去更新整个数组，例如
this.arr = JSON.parse(JSON.stringify(this.arr))

```
