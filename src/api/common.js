/**
 * Created by Administrator on 2018/10/11.
 */
import fetch from '@/utils/fetch'
import store from '../store'
import { getToken } from '@/utils/auth'

// ------------------------------------------------------------------------------------
// 通用接口 newStyle
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
            Method: 'commonSetStatus',   
            params: {
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
            Method: 'commonDeleteList',   
            params: {
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
            Method: 'commonDataSourceList',   
            params: {
            }
        }
    })
}


/**
 *  通用的选择器 组件 获取 模块的下拉源数据
 * @param {*}    metacode
 */
export function commonSelectorModuleDataSource (obj) {
    let {
        metacode,
    } = obj
    return fetch({
        url: '/sys-control/findGroupList',   
        method: 'post',
        data: {
            Method: 'commonSelectorModuleDataSource',
            params: {
                metacode
            }
        }
    })
}

/**
 *  通用的选择器 组件获取数据
 * @param {*}    metacode
 * @param {}    content  搜索关键词
 * @param {}    groupName  模块
 */
export function commonSelectorList (obj) {
    let {
        content,
        groupName,
        metacode,
        pageSize=10,
        pageNum=1,
    } = obj
    return fetch({
        url: '/sys-control/findList',   
        method: 'post',
        data: {
            Method: 'commonSelectorList',
            current:  pageNum,
            size: pageSize,
            params: {
                content,
                groupName,
                metacode
            }
        }
    })
}