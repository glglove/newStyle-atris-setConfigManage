/* eslint-disable prefer-promise-reject-errors */
import * as types from '../mutation-types'
const pageset = {
    state: {
        currentsetPageCode: '',  // 当前配置菜单页面的pagecode
        currentLeftNavType: 2, // 1: 大纲树 2 组件库 
        leftCmpBoxShow : true,
        historyRecords: [],   // 历史记录
        pageSetTotalData: {
            pageSetTotalDataList: [], // 配置的总数据
        }
    },
    mutations:{
        [types.SET_LeftCmpBoxShow] (state, {navType, flag}) {
            state.currentLeftNavType = navType
            state.leftCmpBoxShow = flag
        },
        [types.SET_PAGESETDATALIST] (state, arr) {
            state.pageSetTotalData.pageSetTotalDataList = arr
        },
        [types.SETPAGESETDATAHISTORY] (state, obj) {
            state.historyRecords.push(obj)
        },
        [types.SET_CURRENTSETPAGECODE] (state, pagecode) {
            state.currentsetPageCode = pagecode
        },
    },
    actions: {
        setPageSetLeftCmpBoxStatus({commit, state}, {navType, flag}){
            commit(types.SET_LeftCmpBoxShow, {navType, flag})
        },
        setPageSetDataList( {commit, state}, arr ) {
            commit(types.SET_PAGESETDATALIST, arr)
        },
        setPageSetDataHistory ( {commit, state}, obj) {
            commit(types.SETPAGESETDATAHISTORY, obj)
        },
        setPageSetPagecode ({commit, state}, pagecode) {
            commit(types.SET_CURRENTSETPAGECODE, pagecode)
        }
    }
}

export default pageset
