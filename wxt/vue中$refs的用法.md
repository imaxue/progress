### vue中$refs的用法
> 通常获取DOM元素需要使用document.querySelector（".input1"）来获取DOM节点，然后再获取input1的值，但是用ref绑定之后，我们就不需要在获取dom节点了，直接在上面的input上绑定input1，然后$refs里面调用就行。然后在javascript里面这样调用：this.$refs.input1 这样就可以减少获取dom节点的消耗了 
#### HTML
```html
<div id="app">
  <input type="text" ref="input1"/>
  <button @click="add">添加</button>
</div>
```
#### JS
```javascript
<script>
  new Vue({
    el: "#app",
    methods:{
    add:function(){
      this.$refs.input1.value ="test"; //this.$refs.input1 减少获取dom节点的消耗
      }
    }
  })
</script>
```
#### 补充
> 当挂载的元素为组件的时候可直接（this.$refs.scroll.method）调用该组件内部的方法
 `<scroll ref="scroll"></scroll>`