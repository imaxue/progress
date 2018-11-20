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

如果数据只需要使用一次，可以使用v-once进行绑定
```js
export default {
  data () {
    return {
      type:'1',
    }
  },
  data2: {
    foo: 111
  }
```
也可以使用和data平级的数据,这种数据可以通过$option获取
```html
<p >{{$option.data2.foo}}</p>
```
## :key="item.id"

```html
key值尽量选取唯一值，方便数组顺序改变时候diff的速度
<li v-for="(item,index) in list" :key="item.id">{{item.name}}</li>
数组顺序不需要改变的时候也可以直接赋值一个index
<li v-for="(item,index) in list" :key="index">{{item.name}}</li>
```

## {{}}里尽量少写表达式

如果多处复用一个表达式，尽量用computed提前缓存计算结果
```html
<p >{{name_id}}</p>
<span>{{name_id}}</span>

computed:{
  name_id(){
    return this.name + this.id
  }
}
```



在v-for里，尤其是筛选列表数据经常变化的，每次diff后如果是新出现的数据，会进行重新计算
不推荐写法
```html
<p v-for="(item,index) in list" @click="select(item)" >{{item.gname + (item.gid != -1 ? `(gid: ${item.gid})` : '')}}</p>

```
推荐写法是先遍历数组数据，
```js
list.forEach(item => {
  item.name_gid = item.gname + (item.gid != -1 ? `(gid: ${item.gid})` : ''
})
然后
<p v-for="(item,index) in list" @click="select(item)" >{{item.name_gid}}</p>
```
小插曲

发现了之前同事写的去重，性能太差，优化完只需要2ms，vuejs虽然给优化了很多地方，但是js部分也需要自己好好写
```js
// 去重
console.time('some')
list.forEach(good => {
  let {gid} = good

  if ( !(_arr.some(item => item.gid === gid)) ) {
    _arr.push(good)
  }
})
console.timeEnd('some')
// 124ms
console.time('seen')
let seen = new Map()
_arr = list.filter((item) => !seen.has(item.gid) && seen.set(item.gid, 1));
console.timeEnd('seen')
// 2ms
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
// 提前定义定时器变量
let timer = null;
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
      
      // 这是老的做法，比对temp数据进行更新，但是每次都要执行一次setTimeout，
      // let tempVal = val
      // setTimeout(()=>{
      //   if(tempVal === this.goodInput){
      //     this.goodSearchList = temp
      //   }
      // },500)
      
      // 在axue的指导下，用真正的节流阀，来清理定时器，这样只需要执行最后一次就可以了
      clearTimeout(timer);
      timer = setTimeout(()=>{
        this.goodSearchList = temp
      },500)
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
## v-for和v-if当它们处于同一节点，v-for的优先级比v-if更高
