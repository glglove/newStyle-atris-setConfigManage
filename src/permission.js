/**
 * 路由跳转权限
 */
import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '@/utils/auth' // 验权
import { Message } from 'element-ui'

// // permissiom judge
// function hasPermission (roles, permissionRoles) {
//   if (roles.indexOf('admin') >= 0) return true // admin权限 直接通过
//   if (!permissionRoles) return true
//   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// }

// register global progress.
const whiteList = ['/login', '/authredirect', '/forgetWord', '/register']// 不重定向白名单

// 路由守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start() // 开启Progress
  if (getToken()) { // 判断是否有token,从cookie 中获取的，在 @/util/auth.js文件中
    // 有token
    debugger
    if (to.path === '/login') {
      // next({ path: '/' })
      next()
      NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案
    } else {        
      // debugger
      if (!store.getters.name) { // 判断当前用户是否已拉取完user_info信息
        // 用户信息没有拉取完 重新获取用户信息
        store.dispatch('GetUserInfo').then(async (res) => { // 拉取user_info
          // console.log("---store.getters.addRouters----", store.getters.addRouters)
          // debugger
          // const roles = res.data.Data.TokenId
          // await store.dispatch('GenerateRoutes')
          // .then(async () => {
          store.dispatch('GenerateRoutes')
          //   // 生成可访问的路由表
            await router.addRoutes(store.getters.addRoutes) // 动态添加可访问路由表
          next({...to, replace: true}) // hack方法 确保addRoutes已完成
        }).catch(() => {
          debugger
          store.dispatch('LogOut').then(() => {
            Message.error('验证过期,请重新登录！')
            next({ path: '/login' })
          })
        })
      } else {
        // 用户信息已经获取完成
        // debugger
        next()
      }
    }
  } else {
    // 没有token
    debugger
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页         
      console.log("permissin 中获取 getToken() 为空故跳转到了 login页面")
      NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
