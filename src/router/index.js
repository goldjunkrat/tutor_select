import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store/index'

import { getLoginType } from '@/utils/loginType'

Vue.use(VueRouter)

import routes from './routes'

let originPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location).catch(err => err)
    }
}

let originReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { }).catch(err => err)
    }
}

let router = new VueRouter({
    mode:'hash',
    routes
})

// 全局路由守卫,控制各登陆种类不能进入别的登陆身份的页面,登录的状态下不能进入登陆页面
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token
    let realname = store.state.user.userInfo.realname
    let userInfo = store.state.user.userInfo
    next()
    if (token) {
        if (to.path === '/login') {
            if (getLoginType('isStudent')) {
                next('/home')
            }
            if (getLoginType('isTeacher')) {
                next('/apply')
            }
            if (getLoginType('isAdmin')) {
                next('/student')
            }
        } else {
            if (realname) {
                // 学生想直接访问pick1
                if (getLoginType('isStudent')&&to.path === '/pick1') {
                    
                    if (store.state.user.userInfo.hasTutor !== '0'||store.state.choose.roundId == "0") {
                        next('/user')
                    } else if (store.state.choose.roundId == "2") {
                        next('/pick2')
                    }
                }
                // 导师想直接访问pick1
                if(getLoginType('isTeacher')&&to.path === '/pick1'){
                    if(store.state.choose.roundId == "2"){
                        next('/pick2')
                    }else if(store.state.choose.roundId == "0"){
                        next('/user')
                    }
                }
                
                next()
            } else {
                // 此情况是刷新页面的情况,store中的数据都会被初始化,因此需要重新获取信息
                try {
                    if (getLoginType('isStudent')) {
                        await store.dispatch('getStudentInfo')
                        next()
                    }
                    if(getLoginType('isTeacher')){
                        await store.dispatch('getTeacherInfo')
                        await store.dispatch('getReceiveRequestsList',{limit:12,page:1})
                        // await store.dispatch('getAllStudentsRequests')
                        next()
                    }
                    if(getLoginType('isAdmin')){
                        await store.dispatch('getAdminInfo')
                        next()
                    }

                } catch (error) {
                    // token过期的情况
                    // 清除token及用户信息
                    await store.dispatch('userLogout')
                    next('/login')
                }

            }

        }
    } else {
        let toPath = to.path
        if (toPath !== '/login') {
            next('/login')
        } else {
            next()
        }
        // next()
    }
})

export default router