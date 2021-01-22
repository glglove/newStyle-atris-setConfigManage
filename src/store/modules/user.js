/* eslint-disable prefer-promise-reject-errors */
import { loginByUsername, getUserInfo } from '@/api/login'
import { getMenu } from '@/api/permission'
import { getToken, setToken, removeToken } from '@/utils/auth'
import * as types from '../mutation-types'
import {
  setLocalStorage,
  getLocalStorage
} from '@/utils/auth'
import {
  REQ_OK,
  ERR
} from '@/api/config'
import {
  getCommonBusinessCode
} from '@/api/newStyleConfig'
const user = {
  state: {
    cryptoInfo: {
      isCrypto: false,
      publicKey: '',
      privateKey: '',  
    },
    commonConfigInfo: '',
    userType: '',
    status: '',
    userCode: '', // 员工id
    empNo: '',  // 员工号
    companyCode: '', // 企业id
    token: getToken(),
    name: '',
    avatar: '',
    userAccessRouters: [], // 用户有权限访问的路由集合
    setting: {
      articlePlatform: []
    },
    isCompanyOrSystemUser: 1  // 1代表默认 是企业用户, 0 代表是系统用户
  },

  mutations: {
    [types.SET_CRYPTO] (state, obj) {
      state.cryptoInfo.isCrypto = obj.isCrypto
      state.cryptoInfo.publicKey = obj.publicKey
      state.cryptoInfo.privateKey = obj.privateKey
    },
    [types.SET_COMMON_CONFIGINFO] (state, obj) {
      state.commonConfigInfo = obj
    },
    [types.SET_USER_TYPE] (state, userType) {
      state.userType = userType
    },
    [types.SET_USER_CODE] (state, code) {
      state.userCode = code
    },
    [types.SET_EMP_NO] (state, code) {
      state.empNo = code
    },    
    [types.SET_COMPANY_CODE] (state, code) {
      // state.companyCode = code
      state.companyCode = '39f89e3f-ecf9-8adf-1a7c-aa9b878931a9'
    },
    [types.SET_TOKEN] (state, token) {
      state.token = token
    },
    [types.SET_SETTING] (state, setting) {
      state.setting = setting
    },
    [types.SET_STATUS] (state, status) {
      state.status = status
    },
    [types.SET_NAME] (state, name) {
      state.name = name
    },
    [types.SET_AVATAR] (state, avatar) {
      state.avatar = avatar
    },
    [types.SET_USER_ACCESSROUTERS] (state, userAccessRouters) {
      state.userAccessRouters = userAccessRouters
    },
    // 设置是企业用户还是系统用户 0 是 企业用户  1 是系统用户
    [types.SET_COMPANYORSYSTEM] (state, type) {
      state.isCompanyOrSystemUser = type
    }    
  },

  actions: {
    // 用户名登录
    LoginByUsername ({ commit, dispatch, state }, userInfo) {
      const username = userInfo.username.trim()
      console.log(userInfo)
      // debugger
      return new Promise((resolve, reject) => {
        // 调用登陆接口 进行登陆
        // debugger
        loginByUsername(username, userInfo.password).then(async response => {
          debugger
          if( response.data.State != ERR ) {
            //
            const data = response.data.Data
            // 登陆后 将 tokenId 值存入 cookie中 ，本地环境 存入的 tokenKey 和 线上环境的 tokenkey 不一样，打包线上环境时要注意，在 @/utils/auth.js文件夹中
            setToken(response.data.Data.TokenId)
            // 同时将 tokenId 存入一份到 vuex 中
            commit(types.SET_TOKEN, data.TokenId)
            // 将是否加密 及秘钥 存入 vuex中
            commit(types.SET_CRYPTO, {
              isCrypto: data.isCrypto,
              publicKey: data.publicKey,
              privateKey: data.privateKey,
            })
  
            // 将用户的 身份(企业用户还是 系统用户)存入到 vuex 中
            let type = 1  
            commit(types.SET_COMPANYORSYSTEM, type)
            console.log(state.isCompanyOrSystemUser)          
          }else {
            
          }
          
          resolve(response.data.State)   
        }).catch(error => {
          // debugger
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetUserInfo ({ commit, dispatch, state }) {
      let t = getToken()
      // debugger

      return new Promise((resolve, reject) => {
        // 从cookie 中获取 tokenId， 本地环境 存入的 tokenKey 和 线上环境的 tokenkey 不一样，打包线上环境时要注意，在 @/utils/auth.js文件夹中
        // debugger
        let t = getToken()
        if (typeof t === 'object') {
          t = t['Admin-Token']
        }else {
          t = t
        }
        // getMenu().then(res => {
          // debugger
          // 登陆后获取了用户可访问的路由，存入 res_userAccessRouters 中
          // commit(types.SET_USER_ACCESSROUTERS, res.data.Data)
        // })

        getUserInfo(t).then(async response => {
          // debugger
          if (!response.data) {
            reject('error')
          }
          console.log("---getUserInfo接口中打印的返回值response---", response)
          const data = response.data.Data
          // commit(types.SET_USER_TYPE, data.UserType)
          // commit(types.SET_NAME, data.UserName)
          // commit(types.SET_USER_CODE, data.EmployeeId)
          // commit(types.SET_EMP_NO, data.EmployeeNumber)
          // commit(types.SET_COMPANY_CODE, data.companycode)
          // commit(types.SET_AVATAR, data.UserName)
          //--------
          commit(types.SET_USER_TYPE, '')
          commit(types.SET_NAME, data.accountname)
          commit(types.SET_USER_CODE, data.companycode)
          commit(types.SET_EMP_NO, data.companycode)
          commit(types.SET_COMPANY_CODE, data.companycode)
          commit(types.SET_AVATAR, data.companycode)          
          // 将动态路由添加进入路由表中  user 模块中调用permission模块的action
          await dispatch("GenerateRoutes", {}, { root: true })          
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },  
    // 获取配置信息(删除按钮  启用/停用按钮的配置)并存入缓存
    GetCommonConfigInfo ({commit, state}) {
      // debugger
      return new Promise((resolve, reject) => {
        getCommonBusinessCode().then(res => {
          // debugger
          if(res && res.data.State === REQ_OK){
            try {
              // 缓存配置信息至localstorage              
              setLocalStorage('commonConfig', JSON.stringify(res.data.Data))  
            } catch (error) {
              
            }           
            commit(types.SET_COMMON_CONFIGINFO, res.data.Data)
          }else {
            // 获取配置信息失败
          }
          resolve(res)
        })
      }).catch(err => {
        reject(err)
      })
    },
    // 设置是 企业用户还是 系统用户 0 是企业用户  1 是系统用户
    setIsCompanyOrSystemUser ({commit, state}, type) {
      commit(types.SET_COMPANY_OR_SYSTEM, type)
    },    
    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit(types.SET_TOKEN, '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
