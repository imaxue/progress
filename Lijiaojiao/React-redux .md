# Redux:
# 1、基本原则：
* 唯一数据源
* 保持状态只读
* 数据改变只通过函数完成

# 2、无状态组件
react 支持只用一个函数代表的无状态组件，不需要用对象表示，也没有类

Function  a () {
    Return   ( <div> 
</div>) }


# 3、react-redux 库
* connect ：一个方法，主要两个工作：1.是把store的状态转为内层组件的props，2.把内层组件的用户动作转派给store
                    两个参数：mapStateToProps   mapDispatch-ToProps 
* provider：提供store 的connect
          包换三个函数的对象：  
        *     Subscribe
        * Dispatch
        * getState 

 # 4、两种导出和引入
  export (actions. Reducer,  view) 
  Import { actions , reducer ,view as todolist  } from “../..”

Export default { actions, reducer ,view }
 Impotrt todolist from ‘ ./action.js ‘
Const reducer = todolist.reducer
