import * as types from '../mutation-types'
import { asyncRouterMap, constantRouterMap, consRouterMap, asyncRouter } from '@/router/index'
import { getRoutesInfo } from '@/api/permission'
import router from '@/router'
import Layout from '@/components/layout/Layout'

function loadView(view, name) {
  // console.log(`${name}:`,view)
  return (resolve) => require(['@/' + view + '.vue'], resolve)
  // 此处用reqiure比较好，import引入变量会有各种莫名的错误
  // if(process.env.NODE_ENV){
  //   if(process.env.NODE_ENV === 'development'){
      // return (view) => require('@/'+view+'.vue').default
  //   }else if(process.env.NODE_ENV === 'production'){
      // return ()=> import('@/'+view + '.vue')
  //   }
  // }
}

function filterAsyncRouter (routesArr) {
  let res = routesArr.filter((item, key) => {
    item.path = item.routePath 
    item.name = item.routeName || item.name
    let meta = item.routeMeta
    meta && (item.meta = JSON.parse(meta))
    item.redirect = item.routeRedirect || item.redirect
    let hidden = item.routeHidden || item.hidden
    item.hidden = hidden
    item.routeHidden = hidden
    item.children = item.childrenList
    if(item.routeComponent){
      if (item.routeComponent == 'Layout') { // Layout组件特殊处理
        item.component = Layout
      } else {
        let component = item.routeComponent
        item.component = loadView(component, item.name)
      }
    }  
    // debugger
    if (item.children && item.children.length) {
      item.children = filterAsyncRouter(item.children)
    } 
    return true  
  })     
  return res
}


const permission = {
  state: {
    routers: constantRouterMap,   // 基础路由
    addRouters: [] // 增加的路由
  },
  mutations: {
    [types.SET_ROUTERS] (state, routers) {
      state.routers = routers
    },
    [types.SET_ADD_ROUTERS] (state, routers) {
      state.addRouters = routers
    }
  },
  actions: {
    GenerateRoutes ({ commit, state, rootState }) {
      return new Promise(async (resolve, reject) => {
        debugger
        // 获取的用户可访问路由与 配置的 asyncRouterMap 路由做递归匹配 得到用户真实的可访问的路由地址
        // let accessedRouters = filterAsyncRouter(asyncRouterMap, rootState.user.userAccessRouters)
        let res = filterAsyncRouter(asyncRouterMap)
        console.log("----999-----", res)
        let accessedRouters = constantRouterMap.concat(res)
        // let accessedRouters = constantRouterMap.concat([])
        console.log("---合并后的总路由accessedRouters----", accessedRouters)

        commit(types.SET_ROUTERS, accessedRouters)
        commit(types.SET_ADD_ROUTERS, accessedRouters)

        // 路由 options 并不会随着 addRoutes 动态响应，所以要在这里进行设置
        // router.options.routes = constantRouterMap.concat(changeRoutesData(asyncRouter))        
        // 将添加的路由 写入到路由表
        // await router.addRoutes(accessedRouters) // 动态添加可访问路由表
        resolve()
      })
    }
  }
}

export default permission
