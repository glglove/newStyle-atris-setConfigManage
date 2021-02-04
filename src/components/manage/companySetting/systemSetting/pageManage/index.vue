<!--
    User:
    Date:
    功能: 页面管理
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.leftCol {
        min-height: 80vh;
        min-width: 300px;
    .leftTree {
    }
}

.rightTable {
    // margin-left: 510px;
}
</style>
<template>
    <div class="page-pageManage clearfix page">
        <!-- pageDatatree: {{pageDatatree}} -->
        <el-row :gutter="10">
            <el-col :span="4" class="leftCol">
                <div class="leftTree" v-loading="treeLoding">
                    <el-input
                        placeholder="输入关键词过滤"
                        size="small"
                        v-model="queryTreeObj.key"
                        clearable
                    ></el-input>
                    <left-tree-cmp
                        ref="leftpageManageTreeRef"
                        :treeData="pageDatatree"
                        @treeClick="treeClick"
                        @treeEmitAdd="treeEmitAdd"
                        @treeEmitEdit="treeEmitEdit"
                        @getTreeData="reGetTreeDada"        
                    ></left-tree-cmp>
                </div>
            </el-col>
            <el-col :span="18">
                <div class="rightTable">
                    <!--搜索部分--start-->
                    <search-tools-cmp 
                        propSearchContentId="pageManageList"
                        :outShowSearchInput="outShowSearchInput"
                        @commonSearchToolEmit="commonSearchToolEmit"
                    >
                        <div slot="handlerBtnWrap"> 
                            <el-checkbox 
                                v-model="queryObj.state"
                                :true-label="0"
                                :false-label="1"
                            >停用</el-checkbox>
                            <el-button 
                                type="primary" 
                                size="mini"
                                @click.native="handlerAddDataBase"
                            >新增</el-button>
                            <el-button type="primary" 
                                :disabled="!multipleSelection.length"
                                size="mini"
                                @click.native="handlerBatchStopOrUsing"
                            >{{queryObj.state ==1? '批量停用': '批量启用'}}</el-button>
                            <el-button 
                                :disabled="!multipleSelection.length"
                                type="primary" 
                                size="mini"
                                @click.native="handlerBatchDelete"
                            >批量删除</el-button>
                            <el-button 
                                :disabled="!multipleSelection.length"
                                type="primary" 
                                size="mini"
                                @click.native="batchUsing(0)"
                            >批量标签</el-button>
                            <el-button 
                                :disabled="!multipleSelection.length"
                                type="primary" 
                                size="mini"
                                @click.native="batchUsing(0)"
                            >页面排序</el-button>                            
                            <!-- <el-button type="primary" size="mini">日志</el-button> -->
                        </div>

                        <div slot="moreSearch" class="atrisMoreSearchWrap u-f-jst u-f-wrap">
                            <div 
                                class="searchItem u-f-jst u-f-ac margin5"
                                v-if="!outShowSearchInput"
                            >
                                <span class="searchTit">关键词:</span>
                                <el-input 
                                    clearable
                                    size="small"
                                    class="searchCmp"              
                                    style="width: 200px"
                                >
                                </el-input>              
                            </div> 
                            <div class="searchItem u-f-jst u-f-ac margin5">
                                <span class="searchTit">模块:</span>
                                <el-select 
                                    clearable
                                    size="small"
                                    v-model="queryObj.moduleCode">
                                    <el-option
                                    v-for="(item, key) in moduleSource"
                                    :key="key"
                                    :label="item.ModuleName"
                                    :value="item.ModuleCode"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="searchItem u-f-jst u-f-ac margin5">
                                <span class="searchTit">子页面类型:</span>
                                <el-select 
                                    clearable
                                    size="small"
                                    v-model="queryObj.moduleCode">
                                    <el-option
                                    v-for="(item, key) in moduleSource"
                                    :key="key"
                                    :label="item.ModuleName"
                                    :value="item.ModuleCode"
                                    >
                                    </el-option>
                                </el-select>                                
                            </div>
                            <div class="searchItem u-f-jst u-f-ac margin5">
                                <span class="searchTit">电脑端:</span>
                                <el-select 
                                    clearable
                                    size="small"
                                    v-model="queryObj.moduleCode">
                                    <el-option
                                    v-for="(item, key) in moduleSource"
                                    :key="key"
                                    :label="item.ModuleName"
                                    :value="item.ModuleCode"
                                    >
                                    </el-option>
                                </el-select>                                
                            </div>     
                            <div 
                                class="searchBtnWrap u-f-ajc"
                                v-if="!outShowSearchInput"
                            >                       
                                <el-button 
                                    type="primary" 
                                    size="small"
                                    @click.native="handlerSearch"
                                >搜索</el-button>
                                <el-button 
                                    type="primary" 
                                    size="small"
                                    @click.native="handlerReset"
                                >重置</el-button>
                            </div>
                        </div>
                    </search-tools-cmp> 
                    <!---搜索部分---end-->        
                    <div
                        :class="['tableBox', tableData.length<=0? 'not_found':'']"
                        v-loading="tableLoading"
                    >
                        tableData: {{tableData}}
                        <common-table-cmp
                            ref="pageManage_commonTableCmp"
                            :tableHeadData="tableHeadData"
                            :tableHandlerData="tableHandlerData"
                            :tableData = "tableData"
                            :baseKey="baseKey"
                            :stopOrUsingTitKey="stopOrUsingTitKey"
                            :queryObj.sync = "queryObj"
                            :multipleSelection.sync="multipleSelection"
                            @refreshTableData = "refreshTableData"        
                            @commonTableEmitHandler="commonTableEmitHandler"
                        >
                        </common-table-cmp>            
                    </div>    
                </div> 
            </el-col>
        </el-row>
       
    </div>
</template>
<script type="text/ecmascript-6">
import CommonTableCmp from '@/base/NewStyle-cmp/common-cmp/tableCommon-cmp/tableCommon-cmp'
import leftTreeCmp from '@/components/manage/companySetting/systemSetting/pageManage/leftTree-cmp'
import { 
    REQ_OK
} from '@/api/config'
import { 
    CommonInterfaceMixin
} from '@/utils/CommonInterfaceMixin'
import {
    getPageManageTreeList,
    getPageManageTableList
} from '@/api/systemManage'
import SearchToolsCmp from '@/base/NewStyle-cmp/common-cmp/searchTool-cmp'
export default {
    mixins: [CommonInterfaceMixin],
    components: {
        SearchToolsCmp,
        CommonTableCmp,
        leftTreeCmp
    },
    data() {
        return {
            treeLoding: false,
            tableLoading: false,
            baseKey: '45c48cce',
            stopOrUsingTitKey: 'routeName',
            pageDatatree: [],
            currentTreeLevelObj: {}, // 新增/编辑 树形层级对象  
            queryTreeObj: {
                key: ''
            },
            moduleSource: [],
            tableHeadData: [
            {
                label: '模块',
                property: 'modulecode',
                showOverFlowTooltip: true,
                sortable: true,
                width: '220',
                lock: false
            },
            {
                label: '页面编码',
                property: 'metacode',
                showOverFlowTooltip: true,
                sortable: true,
                width: '',
                lock: false
            },  
            {
                label: '页面名称',
                property: 'routeName',
                showOverFlowTooltip: true,
                sortable: true,
                width: '',
                lock: false
            },  
            {
                label: '页面子类型',
                property: 'metacode',
                showOverFlowTooltip: true,
                sortable: true,
                width: '',
                lock: false
            },  
            {
                label: '电脑端',
                property: 'ispc',
                showOverFlowTooltip: true,
                sortable: true,
                width: '',
                lock: false
            }, 
            {
                label: '手机端',
                property: 'ismobile',
                showOverFlowTooltip: true,
                sortable: true,
                width: '',
                lock: false
            },  
            {
                label: '状态',
                property: 'state',
                showOverFlowTooltip: true,
                sortable: true,
                width: '',
                lock: false
            }, 
            {
                label: '归属群组',
                property: 'pcode',
                showOverFlowTooltip: true,
                sortable: true,
                width: '',
                lock: false
            },   
            // {
            //     label: '标签',
            //     childrenList: [
            //     {
            //         label: '标签-状态',
            //         property: 'state',
            //         showOverFlowTooltip: false,
            //         sortable: false,
            //         width: '',
            //         lock: false,                 
            //     },              
            //     {
            //         label: '标签-1',
            //         property: 'enname',
            //         showOverFlowTooltip: false,
            //         sortable: false,
            //         width: '',
            //         lock: false,                
            //     }
            //     ]
            // },  
            // {
            //   label: '操作',
            //   property: 'handlerColumn',
            //   showOverFlowTooltip: false,
            //   sortable: false,
            //   width: '',
            //   lock: false,
            //   content: [
            //     {
            //       no: 1,
            //       label: '条目',
            //       property: 'entry'
            //     },
            //     {
            //       no: 2,
            //       label: '标签',
            //       property: 'mark'
            //     },  
            //     {
            //       no: 3,
            //       label: '编辑分组',
            //       property: 'edit'                
            //     }            
            //   ]
            // },                                                                                                                                            
            ],
            tableHandlerData: [
            {
                no: 1,
                code: 'edit',
                tit: '编辑',
                baseKey:'c9f0f895',
                stopOrUsingTitKey: 'routeName'
            },
            {
                no: 2,
                code: 'stop',
                tit: '停用',
                baseKey:'c9f0f895',
                stopOrUsingTitKey: 'routeName'
            },
            {
                no: 3,
                code: 'using',
                tit: '启用',
                baseKey:'c9f0f895',
                stopOrUsingTitKey: 'routeName'
            },          
            {
                no: 4,
                code: 'delete',
                tit: '删除',
                baseKey:'c9f0f895',
                stopOrUsingTitKey: 'routeName'
            },
            {
                no: 5,
                code: 'move',
                tit: '移动归属',
                baseKey:'c9f0f895',
                stopOrUsingTitKey: 'routeName'            
            },                              
            ], 
            tableData: [],
            outShowSearchInput: true,
            currentRowObj: {},
            multipleSelection: [],
            queryObj: {
                pageSize: 10,
                pageNum: 1,
                total: 0,
                state: 1,
                content: '',
                metacode: ''           
            },          
        }
    },
    created(){
        this.getPageManageTreeList()
    },
    computed:{
    },
    watch:{
    },
    methods:{
        //重新刷新获取数据
        _refreshData(){
        },
        _getComTables(){
            this.getPageManageTableList()
        },
        refreshTableData(){
            this._getComTables()
        },
        getPageManageTableList(){
            debugger
            let params = {
                pageSize: this.queryObj.pageSize,
                pageNum: this.queryObj.pageNum,
                state: this.queryObj.state,
                metacode: this.currentTreeLevelObj.metacode
            }
            this.tableLoading = true
            getPageManageTableList(params).then(res => {
                this.tableLoading = false
                this.tableData = res.data.Data.records
                this.queryObj.total = res.data.Data.total
            })
        },  
        commonSearchToolEmit(obj){
            this.queryObj.content = this.queryObj.key
            this.handlerSearch()
        },
        // 搜索
        handlerSearch(){
            this._getComTables()
        },
        // 重置
        handlerReset(){
            Object.assign(this.queryObj, {
                state: 1,
            })
            this._getComTables()
        },  
        //启用/停用
        handlerStopOrUsing(row){
            debugger
            let statusText = row.state == 1? '停用': '启用'
            let name = row[this.stopOrUsingTitKey] || ''
            let ids = row.id ? [row.id] : []
            let baseKey = this.baseKey
            this.commonSetStatusMixin({
                statusText,
                name,
                ids,
                baseKey
            })
        },
        // 删除
        handlerDelete(row){
            if(row.id){
                let statusText = '删除'
                let name = row[this.stopOrUsingTitKey] || ''
                let ids = row.id ? [row.id] : []
                let baseKey = this.baseKey
                this.commonDeleteListMixin({
                    statusText,
                    name,
                    ids,
                    baseKey
                })
            }
        },                    
        commonTableEmitHandler(btn, row){
            debugger
            this.currentRowObj = row
            let code = btn.code || ''
            switch(code){
            case 'edit':
                // this.showEntryDialog = true                
            break
            case 'stop':
            case 'using':
                this.handlerStopOrUsing(this.currentRowObj)
            break
            case 'delete':
                this.handlerDelete(this.currentRowObj)
            break
            case 'move':
                // this.handleEdit(row)
            break
            }        
        }, 
        reGetTreeDada(){
            this.getPageManageTreeList(this.queryTreeObj)
        },
        treeClick(obj){
            debugger
            this.currentTreeLevelObj = obj
            this._getComTables()
        },
        treeEmitAdd(obj){
            // 新增
            this.currentTreeLevelObj = obj                
            // this.addNewUserGroup(1, 'inner')// inner 表示树形层级上面新增下级  outer 表示 外面添加
        },
        treeEmitEdit(obj){
            // 编辑
            this.currentTreeLevelObj = obj                
            // this.addNewUserGroup(2, 'inner') // inner 表示树形层级上面新增下级  outer 表示 外面添加
        },                 
        getPageManageTreeList(){
            this.treeLoding = true
            let params = {
                pageSize: 10,
                pageNum: 1
            }
            getPageManageTreeList(params).then(res => {
                this.treeLoding = false
                this.pageDatatree = res.data.Data
            })
        }
    }
}
</script>
