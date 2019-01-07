## css盒模型
1. 基本概念：标准模型+IE模型  
   > 标准模型：W3C 盒子模型的范围包括 margin、border、padding/content，并且 content 部分不包含其他部分 

   > IE模型： IE 盒子模型的范围也包括 margin、border、padding、content，和标准 W3C 盒子模型不同的是：IE 盒子模型的 content 部分包含了 border 和 pading  

   >设置两种模型:  
   标准： bbox-sizing: content-box  
   IE: box-sizing: border-box 
2. js设置获取和模型的宽和高
   > dom.style.height/width [ 只能取出内联样式的宽和高,外联等取不到 ]  

   > dom.currentStyle.width/height  [可以取到渲染之后的值，缺点：但是只有IE支持]  

   > window.getComputedStyle(dom).width/height [通用较好]  

   > document.getBoundingClientRect().width/height [很少有人知道，通用较好]

3. BFC--块级格式化上下文：
   > 基本概念：就是页面上的一个独立容器，容器里面的元素不会影响到外面的元素，反之亦然  

   > float清除浮动原理：
      1. bfc的元素不会和float元素相重叠， 
      2. bfc子元素即使是float也会参与高度计算

   > 如何创建BFC:   
       1. float的值不是none。  
       2. position的值不是static或者relative。  
       3. display的值是inline-block、table-cell、flex、table-caption或者 inline-flex  
       4. overflow的值不是visible
        
   > BFC使用场景:  
      -   问题：bfc垂直方向重叠的问题，消除：.给子元素创建一个bfc，即给其中一   个子元素加一个父元素，在父元素上加bfc:overflow:hidden
  参考文献： https://www.cnblogs.com/dojo-lzz/p/3999013.html