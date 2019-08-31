# vue element-ui table表格滚动加载

## 要点： 获取Dom元素，并且监听它的scroll事件，然后在事件里面重新请求数据

### 1.给监听元素添加自定义指令
    <div class="box2con"  v-loadMore="list_LoadMore"></div>
### 2.注册局部自定义指令
    export default {
       directives:{
         loadMore: {
            // 指令的定义
            bind(el,binding){
                //el：指令所绑定的元素，可以用来直接操作 DOM
                //binding：一个对象
                el.addEventListener('scroll', function() {
                    //判断条件
                    if(this.scrollTop>20){
                        //触发自定义指令的绑定值即list_LoadMore函数
                        binding.value()
                    }
                })
            }
         }
       },
       methods:{
        list_LoadMore(){
          //请求数据axios
        
        }
       }
    }


