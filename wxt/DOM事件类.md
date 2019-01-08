### DOM事件类
   1. 基本概念：DOM事件的级别
      - DOM0: element.onclick=function(){}
      - DOM2: .element.addEventListener('click',function(){},false)//捕获设为true,冒泡是false
      - DOM3: .element.addEventListener('keyup',function(){},false)


   2. DOM事件模型: 捕获和冒泡

   3. DOM流：捕获->目标元素->冒泡

   4. 描述DOM事件捕获的具体流程: window -> document -> html标签 -> body -> ... -> 目标元素

   5. event对象的常见应用
      - event.preventDefault()//阻止默为认行为
      - event.stopPropagation()//阻止冒泡
      - event.stoplmmediatePropagation()//事件响应优先级
      - event.currentTarget()//事件委托
      - event.target()//当前被点击的元素

   6. 自定义事件
      > 场景：模拟按钮触发回调
      ```javascript
      var eve = new Event('custome');
      ev.addEventlistener('custome', fucntion () {
          console.log('custome')
      })
      ev.dispatchEvent(eve)

      CustomeEvent也是自定义事件，既可以指定事件名，也添加数据，在后面添加obj数据，在触发的时候传入数据
      event = new CustomEvent( 'custom', {
          default: {
              username: 'ahaah'
          }
      })
      ```