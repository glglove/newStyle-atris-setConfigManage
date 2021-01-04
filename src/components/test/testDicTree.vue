<!--
    User:
    Date:
    功能:
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.dicListPage {
    padding: 20px
    box-sizing: border-box
}
</style>
<template>
    <div class="dicListPage">
        tableData: {{tableData}}
        ---------
        treeData: {{treeData}}
        <el-table
            :data="tableData.records"
            style="width: 100%"
        >
            <el-table-column
                prop="DicName"
                label="DicName"
                width="180">
            </el-table-column>
            <el-table-column
                prop="DicCode"
                label="DicCode"
                width="180">
            </el-table-column>
            <el-table-column
                prop="MaxTier"
                label="MaxTier">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button 
                        @click="handleClick(scope.row)" 
                        type="text" 
                        size="small"
                    >查看</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog 
            v-if="showScanDialog"
            title="查看"
            fullscreen
            :visible.sync="showScanDialog"
            append-to-body
            :close-on-click-modal="false"
        >
            <common-dic-tree
                :propRowObj="currentRowObj"
                :propDicCode="currentRowObj.DicCode"
                :propDraggable="true"
                :propMaxTier="currentRowObj.MaxTier"
            ></common-dic-tree> 
        </el-dialog>
    </div>
</template>
<script type="text/ecmascript-6">
import { 
    REQ_OK
} from '@/api/config'
import {
    findDicList,
} from '@/api/newStyle.js'
import CommonDicTree from '@/base/NewStyle-cmp/Dic-cmp/Base-commonDicTree'
export default {
    components: {
        CommonDicTree
    },
    data() {
        return {
            loading: false,
            tableData: [],
            treeData: [],
            currentRowObj: {},
            showScanDialog: false,
        }
    },
   created(){
       this._findDicList()
   },
   computed:{
   },
   methods:{
    _findDicList(){
        this.loading = true
        findDicList().then(res => {
            this.loading = false
            if(res && res.data.State === REQ_OK){
                this.tableData = res.data.Data
            }else {
                
            }
        })      
    },
    // 查看
    handleClick(rowObj){
        debugger
        // this.loading = true
        this.currentRowObj = rowObj
        this.showScanDialog = true
    }
   },
}
</script>
