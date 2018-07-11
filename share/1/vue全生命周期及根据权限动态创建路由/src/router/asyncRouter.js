



// 建立常量的对应关系
export const asyncRoutes  = ()=>{
    const demo7 = () => import('@/views/demo7')
    const demo8 = () => import('@/views/demo8')
    const demo9 = () => import('@/views/demo9')
    return {demo7, demo8, demo9}
}
    
    
