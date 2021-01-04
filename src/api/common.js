/**
 * Created by Administrator on 2018/10/11.
 */
import fetch from '@/utils/fetch'
import store from '../store'
import { getToken } from '@/utils/auth'

// ------------------------------------------------------------------------------------
// 通用接口
/**
 *  启用/停用
 * @param {*} baseKey   
 * @param {*} ids  数组
 */
export function commonSetStatus (baseKey,ids) {
    return fetch({
        url: '/base/statusOn',   
        method: 'post',
        data: {
            params: {
                Method: 'commonSetStatus',   
                baseKey,
                ids
            }
        }
    })
}

/**
 *  通用的 删除 接口
 * @param {*}    baseKey
 * @param {*} ids  id的数组
 */
export function commonDeleteList (baseKey,ids) {
    return fetch({
        url: '/base/deleteList',   
        method: 'post',
        data: {
            params: {
                Method: 'commonDeleteList',   
                baseKey,
                ids
            }
        }
    })
}

/**
 * 获取通用的 数据源
 * @param {*}    baseKey
 * @param {*} ids  id的数组
 */
export function commonDataSourceList () {
    return fetch({
        url: '/common-business-code/getAllEnum',   
        method: 'post',
        data: {
            params: {
                Method: 'commonDataSourceList',   
            }
        }
    })
}