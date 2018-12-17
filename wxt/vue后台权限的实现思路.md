# vue后台管理的实现思路
1. 创建vue实例的时候将vue-router挂载，但这个时候vue-router挂载一些登录或者不用权限的公用的页面。

2. 当用户登录后，获取用角色，将角色和路由表每个页面的需要的权限作比较，生成最终用户可访问的路由表。

3. 调用router.addRoutes（store.getters.addRouters）添加用户可访问的路由。

4. 使用vuex管理路由表，根据vuex中可访问的路由渲染侧边栏组件。