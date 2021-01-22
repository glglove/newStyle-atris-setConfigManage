<!--
    User:
    Date:
    功能:
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.addNewGroupCmp {
    .parentGroupForm {
        border-bottom: 1px solid silver
        padding: 20px 
        box-sizing border-box
        .fieldContentBox {
            min-height 100px
        }
        &:nth-last-of-type {
            border-bottom: none
        }
    }
    .childrenListWrap {
        margin-top: 20px
        border: 1px dotted silver
        padding-left: 20px
    }
}
</style>
<template>
    <div class="addNewGroupCmp" v-loading="loading">
        <!-- parentGroups: {{parentGroups}} -->
        <el-form
            v-for="(parentItem, index) in parentGroups"
            :key="index"        
            :ref="`parentGroup_${parentItem.metacode}`"
            class="parentGroupForm"
            :model="parentItem"
        >
            <h3 class="header">
                <i class="header-icon el-icon-info"></i>                
                {{parentItem.name}}
            </h3>
            <div :class="['fieldContentBox', 'u-f-jst', 'u-f-wrap', parentItem.teamControlList.length<=0? 'not_found':'']">
                <component 
                    :class="`${parentItem.metacode}_field_${field.concode}`"
                    v-for="(field, key) in parentItem.teamControlList"
                    :key="key"                
                    :is="currentFieldComponentMixin(field.controltype)"
                    :obj.sync="field"
                    :style="fieldStyle(field)"
                    :prop="'teamControlList.' + key + '.convalue'"
                    :isNeedGetDataSource="true"
                    :disableFlag="false"
                    :fieldEventFlag="false"
                ></component>                
            </div> 

            <div class="childrenListWrap" v-if="parentItem.childrenList && parentItem.childrenList.length">
                <add-group-cmp
                    :parentGroups="parentItem.childrenList"
                ></add-group-cmp>
            </div>
        </el-form>
    </div>
</template>
<script type="text/ecmascript-6">
import { 
    REQ_OK
} from '@/api/config'
import {
    getGroupTreeList,
    saveGroupTreeList
} from '@/api/systemManage.js'
import { 
    CommonInterfaceMixin
} from '@/utils/CommonInterfaceMixin'
import SearchToolsCmp from '@/base/NewStyle-cmp/common-cmp/searchTool-cmp'
import { fieldControlTypeMixin } from '@/utils/newStyleMixins-fields.js'
import { newStyleCheckFormArray } from '@/utils/newStyleFieldValidate.js'
let that = null
export default {
    name: 'AddGroupCmp',
    mixins: [CommonInterfaceMixin, fieldControlTypeMixin],
    props: {
        parentGroups: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    components: {
        SearchToolsCmp,
    },
    data() {
        return {
            loading: false, 
            queryObj: {
                metacode: 'teaminfo',
                pageSize: 10,
                pageNum: 1,
                total: 0
            },
            saveFinalData: []
        }
    },
    created(){
        that = this
        this._getComTables()
    },
    computed:{

    },
    watch:{
    },
    methods:{
        //重新刷新获取数据
        _refreshData(){
           this.$emit("emitGetData") 
        },
        _getComTables(){

        },  
        fieldStyle(field){
            // return `width: ${field.showStyle.width}`
            return "width: 20%"
        },   
        //启用/停用
        handlerStopOrUsing(){
            let statusText = row.state == 1? '停用': '启用'
            let name = row.rolename || ''
            let ids = row.id ? [row.id] : []
            let baseKey = 'sys_rolegroup'
            this.commonSetStatusMixin({
                statusText,
                name,
                ids,
                basekey
            })
        },
        //批量删除
        handlerBatchDelete(){
            let statusText = '批量删除'
            let baseKey = 'sys_rolegroup'
            let name = ''
            let ids = []
            let length = this.multipleSelection.length
            if(length){
                this.multipleSelection.forEach((item, key) => {
                    item.id && ids.push(item.id)
                    if(key != length-1){
                        name += item.rolename + ','
                    }else {
                        name += item.rolename
                    }
                })
                this.commonDeleteListMixin({
                    statusText,
                    name,
                    ids,
                    baseKey
                })
            }
        },
        // 删除
        handlerDelete(row){
            if(row.id){
                let statusText = '删除'
                let name = row.rolename || ''
                let ids = row.id ? [row.id] : []
                let baseKey = 'sys_rolegroup'
                this.commonDeleteListMixin({
                    statusText,
                    name,
                    ids,
                    baseKey
                })
            }
        },
        // 分页---每页多少条
        handleSizeChange (val) {
            this.queryObj.pageSize = val
            this._getComTables()
        },
        // 分页 -- 当前页
        handleCurrentChange (val) {
            this.queryObj.pageIndex = val
            this._getComTables()
        },
        saveGroup(arr){
            this.loading = true
            saveGroupTreeList(arr).then(res => {
                this.loading = false
                if(res && res.data.State === REQ_OK){
                    this.$message({
                        type: 'success',
                        message: '保存成功'
                    })
                }
            }).catch(err => {
                this.loading = false
            })
        },
        changeData(arr){
            let newArr = []
            if(arr && arr.length){
                newArr = arr.map((item, key) => {
                    let convalue = ''
                    if(item.controltype == 5 || item.controltype == 6) {
                        convalue = item.copyConvalue
                    }else {
                        convalue = item.convalue
                    }
                    return {
                        unicode: item.unicode,
                        convalue: convalue
                    }
                })
            }
            console.log("------------", newArr)
            return newArr
        },
        // 保存
        saveGroupForm(){
            let resArr = []
            this.saveFinalData = []
            this.parentGroups.forEach((groupItem, key) => {
                resArr.push(newStyleCheckFormArray(that, `parentGroup_${groupItem.metacode}`, groupItem, key))
                this.saveFinalData.push(...this.changeData(groupItem.teamControlList))
            })
            Promise.all(resArr).then(res => {
                this.saveGroup(this.saveFinalData)
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>
