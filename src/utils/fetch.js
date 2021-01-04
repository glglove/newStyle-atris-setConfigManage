
import Vue from 'vue'
import axios from 'axios'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
import qs from 'qs'
import store from '../store'
// import MD5 from 'js-md5'


// 创建axios实例

const service = axios.create({
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',   
    'Content-Type': 'application/json;charset=utf-8' // 默认  
  },
  baseURL: process.env.BASE_API, // api的base_url 开发环境引用的是@/config/dev.env.js中的 base_API；生成环境引用的是@/config/prod.env.js中的 base_API
  timeout: 95000               // 请求超时时间 95s
})

// request拦截器
service.interceptors.request.use(config => {
  console.log(store.getters)
  config.baseURL = 'http://192.168.0.101:9990'   
  // debugger
  // if(config.data.Method === 'GetNoticeTypeList'){
  //   config.baseURL = 'http://192.168.0.101:801'
  // }
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

  
  if (!config.noQS && config.Method !== 'logon') {
    // 非登录接口
    // 测试 newStyle
    if ( config.module === 'newStyle' ) {
      // 旧的 newStyle
      // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'    
      if (process.env.NODE_ENV === "development"){
        // debugger
        // 开发环境
        console.log(process.env)
        config.baseURL = 'https://www.caihuiyun.cn/ddd'
        // config.baseURL = 'http://192.168.0.101'
        // console.log(config.baseURL)
      } else if (process.env.NODE_ENV === 'production'){
        // 生产环境
        config.baseURL = 'https://www.caihuiyun.cn/ddd'
        // config.baseURL = 'http://192.168.0.101'
      }   
      
      Object.assign(data, {
        'token': getToken(),
        'TenantId': store.getters.companyCode,  // 企业号
        // 'PersonId': store.getters.userCode,  // 员工id
        // 'PersonNo': store.getters.empNo,   // 员工号
        'UserId': store.getters.userCode
      })

      // config.params = JSON.stringify(data)
      config.params = data  // get 请求 此处需要是 config.params
    } else {

      let newData = {}
      if(config.module === 'testNew'){
        // config.data = JSON.stringify(data)
        newData = data
      }else {
        // 将 data 里面的参数进行md5 加密
        newData = Object.assign(data, {
          'token': getToken(),
          'TenantId': store.getters.companyCode,  // 企业号
          'UserId': store.getters.userCode
        }) 
      }        
      config.data = JSON.stringify(newData)       
    }       
  } else if (config.Method === 'logon') {
    // 登录接口
    config.baseURL = 'http://192.168.0.101:9990'   
    // config.baseURL = 'https://www.caihuiyun.cn/'   
    debugger
    // 本地的登录接口logon  此时只需要传 商户码、用户名、密码 
    config.data = JSON.stringify(data)
  }    

  return config
}, error => {
  // 请求错误
  // Message({
  //   message: '请求错误，请刷新重试！',
  //   type: 'error',
  //   duration: 2000
  // }) // for debug
  console.log(error)
  return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {  
    // debugger 
    // debugger
    response = {
      data: {
        Data: response.data.data,
        State: response.data.code,
        Error: response.data.msg,
        
      }
    }
    return response
  },
  error => {
    Message({
      message: '请求错误，请刷新重试！',
      type: 'error',
      duration: 2000
    })
    console.log(error)
    // 生产环境中请求超时后 自动跳转至 https://www.caihuiyun.cn/ 页面进行重新登录
    if (process.env.NODE_ENV === 'production') {
      window.location.href = 'https://www.caihuiyun.cn/'
    }
    return Promise.reject(error)
  }
)

export default service
