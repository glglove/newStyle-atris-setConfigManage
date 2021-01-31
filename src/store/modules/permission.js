import * as types from '../mutation-types'
import { asyncRouterMap, constantRouterMap, consRouterMap, asyncRouter } from '@/router/index'
import { getRoutesInfo } from '@/api/permission'
import router from '@/router'
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// function hasPermission (roles, route) {
//   if (route.meta && route.meta.role) {
//     return roles.some(role => route.meta.role.indexOf(role) >= 0)
//   } else {
//     return true
//   }
// }

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
// function filterAsyncRouter (asyncRouterMap, roles) {
//   const accessedRouters = asyncRouterMap.filter(route => {
//     if (hasPermission(roles, route)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, roles)
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表 gaol
 * @param asyncRouterMap
 *
 */
// function filterAsyncRouter (asyncRouterMap, userAccessRouters) {
//   var arrMap = []
//   if (userAccessRouters && userAccessRouters.length) {
//     for (var i = 0; i < userAccessRouters.length; i++) {
//       for (var j = 0; j < asyncRouterMap.length; j++) {
//         if (userAccessRouters[i].name == asyncRouterMap[j].name) {
//           if (userAccessRouters[i].children && userAccessRouters[i].children.length && asyncRouterMap && asyncRouterMap.length) {
//             // 递归调用
//             filterAsyncRouter(asyncRouterMap[j].children, userAccessRouters[i].children)
//           }
//           arrMap.push(asyncRouterMap[j])
//           break
//         }
//       }
//     }
//   }
//   return arrMap
// }

function changeRoutesData (routesArr, newRoutesArr = []) {
  routesArr.map((item,key) => {
    let itemRoute =  {
      path: item.routePath || item.path,
      component: (resolve) => require([`@/${item.routeComponent}.vue`], resolve),  // 后端返回的路径字符串时 import动态加载 不出来
      // 此处用reqiure比较好，import引入变量会有各种莫名的错误
      // component = (() => import(`@/${item.routeComponent}.vue`));
      // component: loadView(item.routeComponent),  // 后端返回的路径字符串时 import动态加载 不出来
      name: item.routeName || item.name,
      routeIcon: item.routeIcon,
      routeHidden: item.routeHidden,
      meta: item.routeMeta ? JSON.parse(item.routeMeta): {}
    }
    item.routeRedirect ? (itemRoute.redirect = item.routeRedirect) : null
    itemRoute.childrenList = []
    if(item.childrenList && item.childrenList.length){
      changeRoutesData(item.childrenList, itemRoute.childrenList) 
    }
    newRoutesArr.push(itemRoute)
  })
  return newRoutesArr
}

function loadView(view) {
  // return (resolve) => require([`@/${view}.vue`], resolve)
  // 此处用reqiure比较好，import引入变量会有各种莫名的错误
  return () => import(`@/${item.routeComponent}.vue`);  
}

function filterAsyncRouter (routesArr) {
  let res = routesArr.filter((item, key) => {
    const path = item.routePath || item.path
    path && (item.path = path)
    const name = item.routeName || item.name
    name && (item.name = name)
    const meta = item.routeMeta
    meta && (item.meta = JSON.parse(meta))
    item.routeRedirect && (item.redirect = item.routeRedirect) 

    if(item.routeComponent){
        if (item.routeComponent === 'Layout') { // Layout组件特殊处理
          item.component = Layout
        } else {
          const component = item.routeComponent
          item.component = loadView(component)
        }
      }
      if (item.childrenList && item.childrenList.length) {
        item.childrenList = filterAsyncRouter(item.childrenList)
      } 
      return true     
    })
  return res
}


const permission = {
  state: {
    routers: consRouterMap,   // 基础路由
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

        let accessedRouters = consRouterMap.concat([])

        commit(types.SET_ROUTERS, accessedRouters)
        commit(types.SET_ADD_ROUTERS, filterAsyncRouter(asyncRouter))

        // 路由 options 并不会随着 addRoutes 动态响应，所以要在这里进行设置
        router.options.routes = consRouterMap.concat(filterAsyncRouter(asyncRouter))        
        // 将添加的路由 写入到路由表
        await router.addRoutes(filterAsyncRouter(asyncRouter)) // 动态添加可访问路由表
        resolve()
      })
    }
  }
}

export default permission
