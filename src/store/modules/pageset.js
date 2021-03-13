/* eslint-disable prefer-promise-reject-errors */
import * as types from '../mutation-types'
const pageset = {
    state: {
        currentsetPageCode: '',  // 当前配置菜单页面的pagecode
        currentLeftNavType: 2, // 1: 大纲树 2 组件库 
        leftCmpBoxShow : true,
        historyNum: 0,
        hasclickHistorayBtn: false, 
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
            state.hasclickHistorayBtn = false
        },
        [types.SET_CLICKHISTORYBTN] (state, type) {
            if(type === 'before'){
                // 后退
                if(state.historyNum>0){
                    state.hasclickHistorayBtn = true
                    --state.historyNum
                }else {
                    state.hasclickHistorayBtn = false
                }
            }else if (type === 'after') {
                //前进
                if(state.historyNum < state.historyRecords.length-1){
                    state.hasclickHistorayBtn = true
                    ++state.historyNum
                }else {
                    state.hasclickHistorayBtn = false
                }
            }
        },
        [types.SET_PAGESETDATAHISTORY] (state, obj) {
            state.historyRecords.push(obj)
            state.hasclickHistorayBtn = false
            state.historyNum = state.historyRecords.length-1
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
        setClickHistoryBtn ( {commit, state}, type) {
            commit(types.SET_CLICKHISTORYBTN, type)
        },
        setPageSetDataHistory ( {commit, state}, obj) {
            commit(types.SET_PAGESETDATAHISTORY, obj)
        },
        setPageSetPagecode ({commit, state}, pagecode) {
            commit(types.SET_CURRENTSETPAGECODE, pagecode)
        }
    }
}

export default pageset
