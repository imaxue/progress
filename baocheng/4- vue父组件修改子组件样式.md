# vue父组件修改子组件样式
## 在vue 的开发中，我们有时会引用外部组件，包括 ElementUI 组件

>方法：

### 1.去掉 scoped
    - 当 <style> 标签有 scoped 属性时，它的 CSS 只作用于当前组件中的元素,样式将不会渗透到子组件中, 去掉scoped的话会成为全局样式，对其他组件样式也有影响

 ### 2.引入全局样式
    import '@/style/custom.css  ,将对子组件的样式修改写在custom.css里面，不过这个custom.css会污染全局样式

 ### 2. 在父组件样式中使用深度作用选择器
    <style scoped>
      .parent >>> .son {
         color: red;
      }

      .parent /deep/ .son {
        font-size: 12px;
      }
     </style>

     有些SASS 之类的预处理器无法正确解析 >>>, 这种情况下你可以用 /deep/ 操作符取而代之,这是 >>> 的别名，同样可以起作用
