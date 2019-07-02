import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/login/home'//登录页面
import layout from '@/views/layout/layout'//首页
import container from  '@/views/layout/container'

//平台管理系统
import pTRouter from './modules/pTRouter'


import errorPage404 from '@/views/errorPage/404.vue'// 404显示
import errorPage500 from '@/views/errorPage/500.vue'// 500显示
//实名制  end
import sessionUtil from "@/utils/sessionUtil";
Vue.use(Router)

export const constantRouterMap=[
    {path:'/',name:'home',component:home},
    {path:'/errorPage500',name:'errorpage500',component: errorPage500},
    {path:'*',name:'errorpage404',component: errorPage404},
    pTRouter,
]

var router= new Router({
    routes: constantRouterMap
})



router.beforeEach((to, from, next) => {
    //不需要登录权限。
    var isNotLoginPath = ["/","/home"];
    if($.inArray(to.path, isNotLoginPath)>=0){
        sessionUtil.clear();
        next();
    } else{
        //没登录则跳转到登录界面
        var user = sessionUtil.getCurUser();
        if (user && user.id && user.id !="") {// 判断是否登录
            next()
        }else{
            if(router.history.current.fullPath !== '/'){
                Vue.prototype.$message({
                    message: "已超时,请重新登录!",
                    type: 'warning',
                })
            }
            next({
                path: '/'
            })
        }
    }

})


export default router

