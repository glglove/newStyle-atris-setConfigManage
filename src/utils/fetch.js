
import Vue from 'vue'
import axios from 'axios'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
// import qs from 'qs'
import store from '../store'
// import MD5 from 'js-md5'
import { 
  REQ_OK,
  ERR
} from '@/api/config'
import {
  EncRsa,
  DecRsa
} from '@/utils/RsaEncrypt.js'

// 创建axios实例

const service = axios.create({
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',   
    'Content-Type': 'application/json;charset=utf-8' // 默认  
  },
  baseURL: process.env.BASE_API, // api的base_url 开发环境引用的是@/config/dev.env.js中的 base_API；生成环境引用的是@/config/prod.env.js中的 base_API
  timeout: 20000               // 请求超时时间 20s
})

// request拦截器
service.interceptors.request.use(config => {
  let storeObj = store.getters
  let encFlag = storeObj.cryptoInfo.isCrypto || false
  console.log("---------打印是否需要加密传输encFlag----------", encFlag)
  console.log("--store--",store.getters)
  // debugger
  // config.baseURL = 'http://192.168.0.101:9990'   
  // config.baseURL = 'http://39.106.116.139:9990/'   
  let data = {}
  if(config.method === 'post'){
    // 上传接口时
    if(config.Method  && config.Method === 'upload') {
      data = config.data
    }else {
      data = config.data
    }
  }else if(config.method === 'get' || config.method === 'delete'){
    data = config.params
  }
  // debugger
  if(config.Method === 'login'){
    // 登录接口
    // 本地的登录接口login  此时只需要传 商户码、用户名、密码 
    config.data = JSON.stringify(data)
  }else {
    // 非登录接口
    if(encFlag) {
      // 需要加密， 需要将data.params 删除掉 给data添加一个 encryptParams 属性
      // 将data 中的parmas进行加密
      data.encryptParams = EncRsa(JSON.stringify(data.params))
      delete data.params
      // 加上统一参数
      Object.assign(data, {
        'token': getToken(),
        'TenantId': store.getters.companyCode,  // 企业号
        // 'PersonId': store.getters.userCode,  // 员工id
        // 'PersonNo': store.getters.empNo,   // 员工号
        'UserId': store.getters.userCode
      })      
      console.log("打印加密后的data", data)     

    }else {
      // 不需要加密
      // 加上统一参数
      Object.assign(data, {
        'token': getToken(),
        'TenantId': store.getters.companyCode,  // 企业号
        // 'PersonId': store.getters.userCode,  // 员工id
        // 'PersonNo': store.getters.empNo,   // 员工号
        'UserId': store.getters.userCode
      }) 
    }

    // 序列化data传给后端
    config.data = JSON.stringify(data)
  } 
  return config
}, error => {
  console.log(error)
  return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(  
  response => {  
    // debugger
    let storeObj = store.getters
    let encFlag = storeObj.cryptoInfo.isCrypto || false
    let resObj = JSON.parse(JSON.stringify(response))
    if(response.data.code === REQ_OK){
      // debugger
      if(resObj.config.Method != "login") {
        // response 进行解密
        if(encFlag) {
          // debugger
          resObj.data.data = DecRsa(response.data.data) 
          console.log("打印解密后的resData", resObj.data.data) 
        }else {
      
        }
      }else {

      }

      response = {
        data: {
          Data: resObj.data.data,
          State: resObj.data.code,
          Error: resObj.data.msg,
          
        }
      }
      return response      
    }else {
      Message({
        message: response.data.msg ? response.data.msg : "请求错误,请重试!",
        type: 'error',
        duration: 2000
      })
    }
  },
  error => {
    if(!store.getters.netWorkStatus){
      Message.warning({
        message: '请求失败,请检查网络'
      })
    }else {
      Message({
        message: '请求超时,服务器异常',
        type: 'error',
        duration: 2000
      })
      console.log(error)
      // 生产环境中请求超时后 自动跳转至 https://www.caihuiyun.cn/ 页面进行重新登录
      // if (process.env.NODE_ENV === 'production') {
      //   window.location.href = 'https://www.caihuiyun.cn/'
      // }
    }
    return Promise.reject(error)
  }
)

export default service
