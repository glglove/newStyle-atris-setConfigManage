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
        },
        singleCmpHistory: {}   // 所有单个组件的历史修改记录
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
        [types.SET_currentCmpHistoryNum] (state, {type, objCode}) {
            if(type === 'before'){
                // 后退
                if(state.singleCmpHistory[objCode] && state.singleCmpHistory[objCode].currentHistoryNum>0){
                    --state.singleCmpHistory[objCode].currentHistoryNum
                }else {

                }
            }else if(type === 'after'){
                // 前进
                if(state.singleCmpHistory[objCode] && state.singleCmpHistory[objCode].currentHistoryNum< (state.singleCmpHistory[objCode].historyDataMap.length-1)){
                    ++state.singleCmpHistory[objCode].currentHistoryNum
                }else {

                }                
            }
        },
        [types.SET_singleCmpHistory] (state, {obj, objCode}) {
            if(state.singleCmpHistory[objCode]){
                state.singleCmpHistory[objCode].historyDataMap.push(obj)
                state.singleCmpHistory[objCode].currentHistoryNum = state.singleCmpHistory[objCode].historyDataMap.length-1
            }else {
                state.singleCmpHistory[objCode] = {}
                state.singleCmpHistory[objCode].historyDataMap = []
                state.singleCmpHistory[objCode].historyDataMap.push(obj)
                state.singleCmpHistory[objCode].currentHistoryNum = 0
            }
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
        },
        // 设置单个组件的历史记录
        setSingleCmpHistory ({commit, state}, obj) {
            commit(types.SET_singleCmpHistory, obj)
        },
        // 设置单个组件的历史记录的当前num
        setSingleCmpHistoryNum ({commit, state}, obj) {
            commit(types.SET_currentCmpHistoryNum, obj)
        }        
    }
}

export default pageset
