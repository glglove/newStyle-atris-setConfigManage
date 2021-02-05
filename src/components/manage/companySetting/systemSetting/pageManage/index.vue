<!--
    User:
    Date:
    功能: 页面管理
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.leftCol {
        min-height: 80vh;
        min-width: 200px;
        overflow: auto;
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
        <el-row :gutter="20">
            <el-col :span="6" class="leftCol">
                <div class="leftTree" v-loading="treeLoding">
                    <div class="treeSearchWrap u-f-ajc marginB5">
                        <el-input
                            placeholder="关键词"
                            size="small"
                            v-model="queryTreeObj.content"
                            clearable
                            prefix-icon="el-icon-search"
                        ></el-input>

                        <el-button 
                            type="primary"
                            size="mini"
                            class="marginL5"
                            @click.native="handlerTreeSearch"
                        >搜索</el-button>

                    </div>
                    <el-checkbox 
                        v-model="queryTreeObj.state"
                        :true-label="1"
                        :false-label="0"
                    >停用</el-checkbox>
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
                                @click.native="handlerAddPage"
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
                                    v-model="queryObj.metacode"
                                >
                                    <el-option
                                        v-for="(item, key) in commonDataSourceConfig.ModulesetEnum"
                                        :key="key"
                                        :label="item.moduleName"
                                        :value="item.moduleCode"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                            <!-- <div class="searchItem u-f-jst u-f-ac margin5">
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
                            </div> -->
                            <!-- <div class="searchItem u-f-jst u-f-ac margin5">
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
                            </div>      -->
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
                        <!-- tableData: {{tableData}} -->
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
       

       <!--树形上面 新增/编辑--->
       showAddTreeDialog: {{showAddTreeDialog}}
        <el-dialog
            v-if="showAddTreeDialog"
            :title="dialogTitTree"    
            width="400px"
            :visible.sync="showAddTreeDialog"
            :close-on-click-modal="false"
            append-to-body
        >            
            <!-- currentRow: {{currentRow}} -->
            <!-- pageData: {{pageData}} -->
            <el-form 
                :model="currentRowTree" 
                :rules="dialogTableObjRules" 
                label-width="100px">
                <div class="item-container">
                    <el-form-item
                        label="模块"
                        prop="modulecode"
                    >
                        <el-select 
                            clearable
                            size="small"
                            style="width: 200px"
                            v-model="currentRowTree.modulecode"
                        >
                            <el-option
                                v-for="(item, key) in commonDataSourceConfig.ModulesetEnum"
                                :key="key"
                                :label="item.moduleName"
                                :value="item.moduleCode"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>  

                <div class="item-container">
                    <el-form-item
                        label="群组编号"
                        prop=""
                    >
                        <el-input 
                            style="width: 200px"
                            placeholder="请输入"
                            size="small"
                        ></el-input>                     
                    </el-form-item>
                </div>       

                <div class="item-container">
                    <el-form-item
                        label="群组名称"
                        prop=""
                    >
                        <el-input 
                            style="width: 200px"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                </div>        

                <div class="item-container">
                    <el-form-item
                        label="群组子类型"
                        prop=""
                    >
                        <el-select style="width: 200px">

                        </el-select>
                    </el-form-item>
                </div>    

                <!-- pageData: {{pageData}} -->                   

                <div class="item-container">
                    <el-form-item
                        label="描述"
                        prop="description"
                    >
                        <el-input 
                            style="width: 200px"
                            type="textarea" 
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                </div>      

                <div class="item-container">
                    <el-form-item
                        label="状态"
                        prop="state"
                    >
                        <el-switch
                            :inactive-value="0"
                            :active-value="1"
                        >
                        </el-switch>
                    </el-form-item>
                </div>  
            </el-form>
                <save-footer
                    @save="saveAddGroup"
                    @cancel="cancelAddGroup"
                >
                </save-footer>
        </el-dialog>

       <!--table 新增/编辑--->
        <atris-drawer-cmp
            v-if="showAddTableDialog"
            :tit="dialogTitTable"    
            :dialog.sync="showAddTableDialog"        
            @emitClickSureBtn="saveDialogTable"
        >            
            <!-- pageData: {{pageData}} -->
            <el-form 
                ref="dialogForm" 
                slot="container-slot"
                :model="currentRowTable" 
                :rules="dialogTableObjRules" 
                label-width="100px">
                <div class="item-container">
                    <el-form-item
                        label="模块"
                        prop="modulecode"
                    >
                        <el-select 
                            clearable
                            size="small"
                            style="width: 200px"
                            v-model="currentRowTable.modulecode"
                        >
                            <el-option
                                v-for="(item, key) in commonDataSourceConfig.ModulesetEnum"
                                :key="key"
                                :label="item.moduleName"
                                :value="item.moduleCode"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>  

                <!-- <div class="item-container">
                    <el-form-item
                        label="群组编号"
                        prop=""
                    >
                        <el-input 
                            placeholder="请输入"
                        ></el-input>                     
                    </el-form-item>
                </div>        -->

                <div class="item-container">
                    <el-form-item
                        label="群组名称"
                        prop="routeName"
                    >
                        <el-input 
                            size="small"
                            style="width: 200px"
                            placeholder="请输入"
                            v-model="currentRowTable.routeName"
                        ></el-input>
                    </el-form-item>
                </div>        

                <div class="item-container">
                    <el-form-item
                        label="群组子类型"
                        prop=""
                    >
                        <el-select 
                            style="width: 200px"    
                        >

                        </el-select>
                    </el-form-item>
                </div>    

                <!-- pageData: {{pageData}} -->                   

                <div class="item-container">
                    <el-form-item
                        label="描述"
                        prop="description"
                    >
                        <el-input 
                            type="textarea" 
                            style="width: 200px"
                            v-model="currentRowTable.description"
                            placeholder="请输入"></el-input>
                    </el-form-item>
                </div>      

                <div class="item-container">
                    <el-form-item
                        label="状态"
                        prop="state"
                        v-model="currentRowTable.state"
                    >
                        <el-switch
                            :inactive-value="0"
                            :active-value="1"
                        >
                        </el-switch>
                    </el-form-item>
                </div>  
            </el-form>
        </atris-drawer-cmp>        
    </div>
</template>
<script type="text/ecmascript-6">
import CommonTableCmp from '@/base/NewStyle-cmp/common-cmp/tableCommon-cmp/tableCommon-cmp'
import leftTreeCmp from '@/components/manage/companySetting/systemSetting/pageManage/leftTree-cmp'
 import SaveFooter from '@/base/Save-footer/index'
import { 
    REQ_OK
} from '@/api/config'
import { 
    CommonInterfaceMixin
} from '@/utils/CommonInterfaceMixin'
import {
    getPageManageTreeList,
    getPageManageTableList,
    addGroupOne,
    addPageOne
} from '@/api/systemManage'
import SearchToolsCmp from '@/base/NewStyle-cmp/common-cmp/searchTool-cmp'
export default {
    mixins: [CommonInterfaceMixin],
    components: {
        SaveFooter,
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
                content: '',
                state: 1,
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
            currentRowTree: {
                modulecode: '',
            },
            treeEditType: '', // 1 新增  2 编辑
            dialogTitTree: '',
            showAddTreeDialog: false, 
            dialogTableObjRules: {
                modulecode: [
                    {required: true, message: '请选择模块', trrigger: ['blur','change']}
                ],
            },
            currentRowTable: {
                modulecode: '',
                routeName: '',
                description: '',
                state: 1
            },
            tableEditType: '', // 1新增 2 编辑
            dialogTitTable: '',
            showAddTableDialog: false,
            dialogTableObjRules: {
                modulecode: [
                    {required: true, message: '请选择模块', trrigger: ['blur','change']}
                ],
                routeName: [
                    {required: true, message: '请输入名称', trrigger: ['blur','change']}
                ],
                description: [
                    {required: true, message: '请输入描述', trrigger: ['blur','change']}
                ],
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
                metacode: this.queryObj.metacode
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
        addGroupOne(){
            this.treeLoding = true
            let params = {
                pageSize: this.queryTreeObj.pageSize,
                pageNum: this.queryTreeObj.pageNum,
                routeIcon: this.currentRowTree.routeIcon,
                ispc: this.currentRowTree.ispc,
                ismobile: this.currentRowTree.ismobile,
                state: this.currentRowTree.state
            }
            addGroupOne(params).then(res => {
                this.treeLoding = false
                this.$message.success("新增成功")
                this.getPageManageTreeList(this.queryTreeObj)
            })
        },
        saveDialogTable(){
            // 先验证
            this.addPageOne()
        },
        addPageOne(){
            this.tableLoading = true
            let params = {
                pageSize: this.queryObj.pageSize,
                pageNum: this.queryObj.pageNum,
                state: this.currentRowTable.state,
                description: this.currentRowTable.description,
                routeName: this.currentRowTable.routeName,
                moduleCode: this.currentRowTable.moduleCode
            }
            addPageOne(params).then(res => {
                this.tableLoading = false
                this.$message.success("新增成功")
                this.hideTableDialog()
                this._getComTables()
            })
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
        handlerTreeSearch(){
            this.getPageManageTreeList()
        },
        treeClick(obj){
            debugger
            this.currentTreeLevelObj = obj
            this._getComTables()
        },
        showTreeDialog(){
            this.showAddTreeDialog = true
        },
        hideTreeDialog(){
            this.showAddTreeDialog = false
        },
        saveAddGroup(){

        },
        cancelAddGroup(){
            this.hideTreeDialog()
        },
        // 树形新增
        treeEmitAdd(obj){
            // 新增
            debugger
            this.currentTreeLevelObj = obj                
            // this.addNewUserGroup(1, 'inner')// inner 表示树形层级上面新增下级  outer 表示 外面添加
            this.currentRowTree = obj
            this.dialogTitTree = '新增'
            this.treeEditType = 1
            Object.assign(this.currentRowTree, {

            })
            this.showTreeDialog() 
        },
        // 树形编辑
        treeEmitEdit(obj){
            // 编辑
            this.currentTreeLevelObj = obj                
            // this.addNewUserGroup(2, 'inner') // inner 表示树形层级上面新增下级  outer 表示 外面添加
            this.currentRowTree = obj
            this.dialogTitTree = '编辑'
            this.treeEditType = 2
            this.showTreeDialog()
        },    
        showTableDialog(){
            this.showAddTableDialog = true
        },
        hideTableDialog(){
            this.showAddTableDialog = false
        },
        // tablelist 新增  
        handlerAddPage(){
            this.dialogTitTable = "新增"
            this.tableEditType = 1
            Object.assign(this.currentRowTable, {
                
            })
            this.showTableDialog()
        },  
        // tablelist 编辑
        handlerEditPage(row){
            this.dialogTitTable = "编辑"
            this.tableEditType = 2
            this.currentRowTable = row
            this.showTableDialog()
        },         
        getPageManageTreeList(){
            this.treeLoding = true
            let params = {
                pageSize: 10,
                pageNum: 1,
                content: this.queryTreeObj.content,
                state: 1
            }
            getPageManageTreeList(params).then(res => {
                this.treeLoding = false
                this.pageDatatree = res.data.Data
            })
        }
    }
}
</script>
