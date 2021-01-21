/** 通用的接口 */
import {  setLocalStorage ,getLocalStorage} from '@/utils/auth'
import { REQ_OK } from '@/api/config'
import {
  commonSetStatus,
  commonDeleteList,
  commonDataSourceList
} from '@/api/common'


/**
 * Created by Administrator on 2019/10/13
 * 
 * function : mixin
 */


// 系统管控中 账户 和 企业系统管理员 页面公用的mixin
export const CommonInterfaceMixin = {
  created(){
    this._initDataMixin()
  },
  data(){
    return {
      loading: false,
      commonConfig: {}, // 通用的 删除  启用 等按钮code配置
      commonDataSourceConfig: {}, // 通用的数据下拉源 
      showSearchContent: false,  // 控制通用的搜索条件框显示/隐藏
    }
  },
  methods:{
    _initDataMixin(){
      // 获取 字典表相关的 按钮
      try {
        if(Object.keys(this.commonConfig).length){

        }else {
          let res = JSON.parse(getLocalStorage('commonConfig'))
          this.commonConfig = res
          console.log("----this.commonConfig------", this.commonConfig)
        }
      } catch (error) {
          
      } 
    },
    // 通用的
    // 获取通用的 数据下拉源
    commonDataSourceListMixin(){
      if(Object.keys(this.commonDataSourceConfig).length){

      }else {
        // 
        let res = JSON.parse(getLocalStorage('commonDataSourceConfig'))
        this.commonDataSourceConfig = res
        commonDataSourceList().then(res => {
          if(res && res.data.State === REQ_OK){
            console.log("----------",res.data.Data)
            this.commonDataSourceConfig = res.data.Data
            // 将通用的数据源缓存
            try {
              setLocalStorage('commonDataSourceConfig', JSON.stringify(res.data.Data))
            } catch (error) {
              console.log("设置通用的下拉数据源commonDataSourceConfig出错")
            }
          }
        }) 
      }     
    },
    // 删除/ 批量删除
    commonDeleteListMixin(obj){
      debugger
      let { statusText, name, ids, baseKey } = obj
      baseKey = baseKey? this.commonConfig[baseKey]['deleteKey'] : ''
      this.$confirm(`确定要${statusText}${name}吗`, "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(res => {
        this.loading = true
        commonDeleteList(baseKey, ids).then(res => {
          this.loading = false
          if(res && res.data.State === REQ_OK){
            this.$message({
              type: 'success',
              message: `${statusText}成功`
            })
            this._refreshData()
          }else {
            this.$message({
              type: 'error',
              message: `${statusText}失败,${res.data.Error}`
            })
          }
        }).catch(err => {
  
        })           
      }).catch(() => {

      })        
    },
    // 启用/停用
    commonSetStatusMixin(obj){
      debugger
      let { statusText, name, ids, baseKey } = obj
      baseKey = baseKey? this.commonConfig[baseKey]['statusOnKey'] : ''
      this.$confirm(`确定要${statusText}${name}吗`, "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(res => {
        this.loading = true
        commonSetStatus(baseKey, ids).then(res => {
          this.loading = false
          if(res && res.data.State === REQ_OK){
            this.$message({
              type: 'success',
              message: `${statusText}成功`
            })
            this._refreshData()
          }else {
            this.$message({
              type: 'error',
              message: `${statusText}失败,${res.data.Error}`
            })
          }
        }).catch(err => {
  
        })           
      }).catch(() => {

      })            
    },
    // // 分页--每页多少条
    // handleSizeChange (val) {
    //   this.queryObj.pageSize = val
    //   this._getComTables()
    // },
    // // 分页--当前页
    // handleCurrentChange (val) {
    //   this.queryObj.pageIndex = val
    //   this._getComTables()
    // }        
  }
}




