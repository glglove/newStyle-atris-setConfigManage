/**
 * Created by Administrator on 2020/7/31.
 * function : fieldsMixins
 */

// 接口-----------------------------------------------------------------------------------------------------
import { REQ_OK, BASE_URL } from '@/api/config'

// import { getDicByKey, getRoleRange, getDicCollection } from '@/api/permission'
import { setLocalStorage, getLocalStorage } from '@/utils/auth.js'
import { newStyleGetDicTree } from '@/api/dic'

// vuex --------------------------------------------------------------------------------------------------
import { mapGetters } from 'vuex'

// import store from '../store'

// 字段组件   mixins
export const fieldsDataSourceMixin = {
    data(){
        return {
           localDicDataSourceList:  [],
           dicKey: this.obj.Dstype + this.obj.DataSource
        }
    },
    created(){
        this._checkDicLocalStorage().then(res => {
            if(res){
                
            }else {
                // 缓存中没有 则去获取 数据源 然后进行缓存
                this._newStyleGetDicTree( this.obj.Dstype, this.obj.DataSource )                
            }
        })
    },
    methods: {
        _checkDicLocalStorage(){
            return new Promise((resolve, reject) => {
                this.localDicDataSourceList = this.localDicDataSourceList.length? this.localDicDataSourceList: this.getDicDataSourceList(this.dicKey)
                if(this.localDicDataSourceList && this.localDicDataSourceList.length){
                    resolve(true) 
                }else {
                    resolve(false)
                }
            })
        },
        // 获取字典表
        _newStyleGetDicTree(dicType, dicCode){
            newStyleGetDicTree(dicType, dicCode).then(res => {
                if(res && res.data.State === REQ_OK){
                    this.localDicDataSourceList = res.data.Data.records
                }else {
                    this.$message({
                        type: 'error',
                        message: `获取{this.dicKey}字典表数据源失败,${res.data.Error}`
                    })
                }
            })
        },
        getDicDataSourceList(key){
            let resKey = ''
            try {
                resKey = getLocalStorage(key)
            } catch (error) {
                console.log(`字典表获取${key}时出错了`)
            }
            return JSON.parse(resKey)                
        },
        setDicDataSourceList(key, val){
            try {
                setLocalStorage(key, val)
            } catch (error) {
                console.log(`字典表存储${key}时出错了`)
            }
        }
    }
}
