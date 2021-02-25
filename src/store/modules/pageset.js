/* eslint-disable prefer-promise-reject-errors */
import * as types from '../mutation-types'
const pageset = {
    state: {
        currentLeftNavType: 2, // 1: 大纲树 2 组件库 
        leftCmpBoxShow : true,
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
        }
    },
    actions: {
        setPageSetLeftCmpBoxStatus({commit, state}, {navType, flag}){
            commit(types.SET_LeftCmpBoxShow, {navType, flag})
        },
        setPageSetDataList( {commit, state}, arr ) {
            commit(types.SET_PAGESETDATALIST, arr)
        }
    }
}

export default pageset
