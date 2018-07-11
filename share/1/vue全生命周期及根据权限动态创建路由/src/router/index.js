import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Lifecycle from '@/views/Lifecycle'
import children1 from '@/views/children1'
import children2 from '@/views/children2'
import mixin from '@/views/mixin'
import login from '@/views/login'
import not from '@/views/404'
// import demo5 from '@/views/demo5'
const demo5 = () => import('@/views/demo5')
// const demo7 = () => import('@/views/demo7')
// import demo7 from '@/views/demo7'

Vue.use(Router)
import {asyncRoutes} from '@/router/asyncRouter'
const componentObj = asyncRoutes()
let addRoutes = JSON.parse(sessionStorage.getItem('addRoutes')) || [];
addRoutes.forEach(e => {
  e.component = componentObj[e.component]
})

export default new Router({
  routes: [
    { path: '/', name: 'Index', component: Index },
    { path: '/demo1', name: 'Lifecycle', component: Lifecycle, meta:{route: false} },
    { path: '/children1', children1: 'children1', component: children1 },
    { path: '/children2', name: 'children2', component: children2 },
    { path: '/mixin', name: 'mixin', component: mixin },
    { path: '/login', name: 'login', component: login },
    { path: '/demo5', name: 'demo5', component: demo5 , meta: {token: true}},
    { path: '/demo6', name: 'demo5', component: demo5 , meta: {token: false}},
    ...addRoutes,
    { path: '*', name: '404', component: not , meta: {token: false}},
    
  ]
})
