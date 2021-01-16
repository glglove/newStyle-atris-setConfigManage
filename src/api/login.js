/**
 * Created by Administrator on 2017/11/13.
 * 登录接口
 */
import MD5 from 'js-md5'
import fetch from '@/utils/fetch'

/**
 *  登录
 * @param companyCode 企业号
 * @param UserName 用户名
 * @param pwd 密码
 * @returns {Promise.<TResult>}
 */
// export async function loginByUsername (UserName, pwd, companyCode) {
//   return fetch({
//     // url: '/API/Account',
//     url: '/SystemManage/Account',
//     method: 'post',
//     data:  {
//       Method: 'login',
//       UserName,
//       pwd: MD5(pwd),
//       companyCode
//     }
//   })
// }


/**
 *  登录 new  平台登录
 * @param accountname 用户名
 * @param password 密码
 * @returns {Promise.<TResult>}
 */
export async function loginByUsername (accountname, password ) {
  return fetch({
    url: '/sys-user/login',
    method: 'post',
    Method: 'login',    
    data: {
      params:  {
        accountname,
        // password: MD5(password)
        password: password
      }
    }
  })
}





/**
 *  获取用户信息
 * @param token
 */
// export function getUserInfo (TokenId) {
//   return fetch({
//     url: '/SystemManage/Account',
//     method: 'post',
//     params: {
//       Method: 'getUser',
//       TokenId
//     }
//   })
// }
export function getUserInfo () {
  return fetch({
    url: '/sys-user/getUserInfo',
    method: 'post',
    data: {
      Method: 'getUserInfo',
      params: {
        username: 'gaol'
      }
    }
  })
}


/**
 *  企业注册 保存 
 * @param  companyObj  
 */

export function saveAccountCompany (companyObj) {
  return fetch({
    url: 'sys-account/saveAccountCompany',
    method: 'post',
    data: {
      Method: 'saveAccountCompany',
      params: {
        ...companyObj
      },
    }
  })
}


/**
 * 注册获取手机验证码
 * @param  phone
 * @param  userAccount
 */

export function getMobileCode (phone) {
  return fetch({
    url: '/sys-user/getCode',
    method: 'post',
    data: {
      Method: 'getMobileCode',
      params: {
        phone
      }
    }
  })
}

/**
 * 验证短信验证码正确性
 * @param  code
 * @param  phone
 */

export function checkPhoneCode (phone, code) {
  return fetch({
    url: '/sys-user/checkCode',
    method: 'post',
    data: {
      Method: 'validateMobileCode',
      params: {
        phone,
        code
      }
    }
  })
}

/**
 *  找回密码获取手机验证码  
 */
export function getCodeByNamePhone ( phone, userAccount ) {
  return fetch({
    url: '/sys-user/getCodeByNamePhone',
    method: 'post',
    data: {
      Method: 'getMobileCode',
      params: {
        phone,
        userAccount
      }
    }
  })
}

/**
 *  保存提交修改密码
 */
export function resetPassword ( phone, userAccount, code, password ) {
  return fetch({
    url: '/sys-user/resetPassword',
    method: 'post',
    data: {
      Method: 'getMobileCode',
      params: {
        phone,
        userAccount,
        code,
        password
      }
    }
  })
}




/**
 * 登出
 */
export function logout () {
  return fetch({
    url: '/login/logout',
    method: 'post'
  })
}
