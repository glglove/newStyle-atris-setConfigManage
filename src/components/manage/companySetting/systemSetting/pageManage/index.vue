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
>>>.pageSetDialog {
    .el-dialog__body {
        padding: 0 !important
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
                    <!-- queryTreeObj.state: {{queryTreeObj.state}} -->
                    <div class="u-f-jsb">
                        <el-checkbox 
                            v-model="queryTreeObj.state"
                            :true-label="0"
                            :false-label="1"
                        >停用</el-checkbox>                          
                        <!-- <el-button 
                            type="primary" 
                            size="mini" 
                            @click.native="treeOutAdd"
                            icon="el-icon-circle-plus"
                        ></el-button>   -->
                        <el-tooltip class="item" effect="dark" content="新增组" placement="top-start">
                            <i 
                                class="el-icon-plus"
                                @click="treeOutAdd"
                            ></i>  
                        </el-tooltip>                  
                    </div>
                    <left-tree-cmp
                        ref="leftpageManageTreeRef"
                        :treeData="pageDatatree"
                        @treeClick="treeClick"
                        @treeEmitAdd="treeEmitAdd"
                        @treeEmitEdit="treeEmitEdit"
                        @addNewPageEmit="addNewPageEmit"
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
                            <!-- <el-button 
                                type="primary" 
                                size="mini"
                                @click.native="handlerAddPage"
                            >新增</el-button> -->
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
       <!-- showAddTreeDialog: {{showAddTreeDialog}} -->
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
                ref="dialogForm_tree"
                :model="currentRowTree" 
                :rules="dialogTreeObjRules" 
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

                <!-- <div class="item-container">
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
                </div>        -->

                <div class="item-container">
                    <el-form-item
                        label="群组名称"
                        prop="routeName"
                    >
                        <el-input 
                            style="width: 200px"
                            placeholder="请输入"
                            v-model="currentRowTree.routeName"
                        ></el-input>
                    </el-form-item>
                </div>        

                <!-- <div class="item-container">
                    <el-form-item
                        label="群组子类型"
                        prop=""
                    >
                        <el-select style="width: 200px">

                        </el-select>
                    </el-form-item>
                </div>     -->

                <div class="item-container">
                    <el-form-item
                        label="小图标"
                        prop="routeIcon"
                    >
                        <el-input 
                            style="width: 200px"
                            v-model="currentRowTree.routeIcon"
                        >
                        </el-input>
                    </el-form-item>
                </div>                 

                <!-- pageData: {{pageData}} -->                   

                <!-- <div class="item-container">
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
                </div>       -->

                <div class="item-container">
                    <el-form-item
                        label="是否隐藏"
                        prop="routeHidden"
                    >
                        <el-switch
                            v-model="currentRowTree.routeHidden"
                            :inactive-value="0"
                            :active-value="1"
                        >
                        </el-switch>
                    </el-form-item>
                </div>                  

                <div class="item-container">
                    <el-form-item
                        label="状态"
                        prop="state"
                    >
                        <el-switch
                            v-model="currentRowTree.state"
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
        <div v-if="showAddTableDialog">
            <atris-drawer-cmp
                v-if="showAddTableDialog"
                :tit="dialogTitTable"    
                :appendToBody="true"
                :dialog.sync="showAddTableDialog"        
                @emitClickSureBtn="saveDialogTable"
            >            
                <!-- pageData: {{pageData}} -->
                <el-form 
                    ref="dialogForm_table" 
                    slot="container-slot"
                    :model="currentRowTable" 
                    :rules="dialogTableObjRules" 
                    label-width="150px">
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
                            label="页面编号"
                            prop=""
                        >
                            <el-input 
                                placeholder="请输入"
                                style="width: 200px"
                            ></el-input>                     
                        </el-form-item>
                    </div>        -->

                    <div class="item-container">
                        <el-form-item
                            label="页面名称"
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

                    <!-- <div class="item-container">
                        <el-form-item
                            label="页面子类型"
                            prop=""
                        >
                            <el-select 
                                style="width: 200px"    
                            >

                            </el-select>
                        </el-form-item>
                    </div>   -->


                    <div class="item-container">
                        <el-form-item
                            label="样式格式"
                            prop="templateId"
                        >
                            <el-select 
                                clearable
                                size="small"
                                style="width: 200px"
                                v-model="currentRowTable.templateId"
                            >
                                <el-option
                                    v-for="(item, key) in commonDataSourceConfig.FormTypeEnum"
                                    :key="key"
                                    :label="item.des"
                                    :value="item.type"
                                >
                                </el-option>
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

                    <!-- <div class="item-container">
                        <el-form-item
                            label="路由"
                            prop=""
                        >
                            <el-input 
                                size="small"
                                style="width: 200px"
                                placeholder="请输入"
                            ></el-input>
                        </el-form-item>
                    </div>   -->

                    <div class="item-container">
                        <el-form-item
                            label="小图标"
                            prop="routeIcon"
                        >
                            <el-input 
                                size="small"
                                style="width: 200px"
                                placeholder="请输入"
                                v-model="currentRowTable.routeIcon"
                            ></el-input>                        
                        </el-form-item>
                    </div>  

                    <div class="item-container">
                        <el-form-item
                            label="pc端"
                            prop="ispc"
                        >
                            <el-switch
                                :inactive-value="0"
                                :active-value="1"
                                v-model="currentRowTable.ispc"
                            >
                            </el-switch>
                        </el-form-item>
                    </div>   

                    <div class="item-container">
                        <el-form-item
                            label="移动端"
                            prop="ismobile"
                        >
                            <el-switch
                                :inactive-value="0"
                                :active-value="1"
                                v-model="currentRowTable.ismobile"
                            >
                            </el-switch>                        
                        </el-form-item>
                    </div>                                                  

                    <div class="item-container">
                        <el-form-item
                            label="隐藏"
                            prop="routeHidden"
                        >
                            <el-switch
                                :inactive-value="0"
                                :active-value="1"
                                v-model="currentRowTable.routeHidden"
                            >
                            </el-switch>
                        </el-form-item>
                    </div>                                

                    <div class="item-container">
                        <el-form-item
                            label="启用/停用"
                            prop="state"
                        >
                            <el-switch
                                :inactive-value="0"
                                :active-value="1"
                                v-model="currentRowTable.state"
                            >
                            </el-switch>
                        </el-form-item>
                    </div>  

                    <div class="item-container" v-if="tableEditType == 1">
                        
                        <el-form-item
                            label="关联已有页面配置"
                            prop="existMetaCode"
                        >
                            <el-select 
                                clearable
                                size="small"
                                style="width: 200px"
                                v-model="currentRowTable.existMetaCode"
                            >
                                <el-option
                                    v-for="(item, key) in tableData"
                                    :key="key"
                                    :label="item.routeName"
                                    :value="item.metacode"
                                >
                                </el-option>
                            </el-select>  
                        </el-form-item>
                    </div>                 
                </el-form>
            </atris-drawer-cmp>  
        </div>

        <!---table的设置---->
        <div class="pageSetDialogWrap" v-if="showPageSetDialog">
            <el-dialog
                :title="currentPageSetTit"
                :visible.sync="showPageSetDialog"
                fullscreen
                append-to-body
                custom-class="pageSetDialog"
                :close-on-click-modal="false"
            >
                <page-set-module-cmp
                    :objP.sync="currentPageSetRow"                
                ></page-set-module-cmp>
            </el-dialog>  
        </div>    
    </div>
</template>
<script type="text/ecmascript-6">
import CommonTableCmp from '@/base/NewStyle-cmp/common-cmp/tableCommon-cmp/tableCommon-cmp'
import leftTreeCmp from '@/components/manage/companySetting/systemSetting/pageManage/leftTree-cmp'
import SaveFooter from '@/base/Save-footer/index'
import pageSetModuleCmp from '@/base/NewStyle-cmp/common-cmp/pageSetModule-cmp/index'
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
        leftTreeCmp,
        pageSetModuleCmp
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
                {
                    no: 6,
                    code: 'set',
                    tit: '设置',
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
                pcode: '',
                modulecode: '',
                routeName: '',
                routeHidden: 0,
                routeIcon: 'people',
                ispc: 1,
                ismobile: 0,
                state: 1,
            },
            treeEditType: '', // 1 新增  2 编辑
            dialogTitTree: '',
            currentTableHasPage: false,
            showAddTreeDialog: false, 
            dialogTreeObjRules: {
                modulecode: [
                    {required: true, message: '请选择模块', trrigger: ['blur','change']},
                ],
                routeName: [
                    {required: true, message: '请填写名称', trrigger: ['blur','change']},
                ],
            },
            currentRowTable: {
                pcode: '',
                modulecode: '',
                routeName: '',
                templateId: '', // 样式格式
                description: '',
                routeIcon: 'people',
                ispc: 1,
                ismobile: 0,
                routeHidden: 0,
                state: 1,
                existMetaCode: '',
            },
            tableEditType: '', // 1新增 2 编辑
            dialogTitTable: '',
            showAddTableDialog: false,
            dialogTableObjRules: {
                modulecode: [
                    {required: true, message: '请选择模块', trrigger: ['blur','change']}
                ],
                routeName: [
                    {required: true, message: '请输入名称', trrigger: 'blur'}
                ],
                description: [
                    {required: true, message: '请输入描述', trrigger: 'blur'}
                ],
            },
            currentPageSetTit: '',
            showPageSetDialog: false,
            currentPageSetRow: {}
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
                metacode: this.queryObj.metacode,
                hasPage: this.currentTableHasPage ? 1 : ''
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
                modulecode: this.currentRowTree.modulecode,
                pcode: this.currentRowTree.pcode,
                routeName: this.currentRowTree.routeName,
                routeIcon: this.currentRowTree.routeIcon,
                ispc: this.currentRowTree.ispc,
                ismobile: this.currentRowTree.ismobile,
                state: this.currentRowTree.state
            }
            // console.log("-------fddf---------", this.currentRowTree)
            addGroupOne(params).then(res => {
                this.treeLoding = false
                this.$message.success("保存成功")
                this.hideTreeDialog()
                this.getPageManageTreeList(this.queryTreeObj)
            })
        },
        saveDialogTable(){
            // 先验证
            this.$refs.dialogForm_table.validate(valid => {
                if(valid) {
                    this.addPageOne()
                }
            })
        },
        addPageOne(){
            this.tableLoading = true
            let params = {
                pageSize: this.queryObj.pageSize,
                pageNum: this.queryObj.pageNum,
                modulecode: this.currentRowTable.modulecode,
                pcode: this.currentRowTable.pcode,
                templateId: this.currentRowTable.templateId,
                state: this.currentRowTable.state,
                description: this.currentRowTable.description,
                routeName: this.currentRowTable.routeName,
                ispc: this.currentRowTable.ispc,
                ismobile: this.currentRowTable.ismobile, 
                existMetaCode: this.currentRowTable.existMetaCode        
            }
            addPageOne(params).then(res => {
                this.tableLoading = false
                this.$message.success("保存成功")
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
            this.currentRowTable = row
            let code = btn.code || ''
            switch (code) {
                case 'set':
                    this.handlerSetPage(row)
                break
                case 'edit':
                    this.handlerEditPage(row)             
                break
                case 'stop':
                case 'using':
                    // this.handlerStopOrUsing()
                break
                case 'delete':
                    this.handlerDelete(this.currentRowTable)
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
            // 先验证
            this.$refs.dialogForm_tree.validate(valid => {
                if(valid) {
                    this.addGroupOne()
                }
            })            
        },
        cancelAddGroup(){
            this.hideTreeDialog()
        },
        // 新增组
        addNewTreeGroup(type, flag){
            // debugger
            if(type === 1) {
                // 新增
                Object.assign(this.currentRowTree, {
                    modulecode: '',
                    routeName: '',
                    routeIcon: 'people',
                    ispc: 1,
                    ismobile: 0,
                    state: 1,                
                })
                if(flag === 'inner'){
                    this.currentRowTree.pcode = this.currentRowTree.metacode
                }else if(flag === 'outer') {
                    this.currentRowTree.pcode = ''
                }
            }else if(type === 2){
                // 编辑
                this.currentRowTree.pcode = this.currentRowTree.metacode
            }
        },
        treeOutAdd(){
            this.dialogTitTree = '新增'
            this.treeEditType = 1
            this.addNewTreeGroup(1, 'outer')// inner 表示树形层级上面新增下级  outer 表示 外面添加
            this.showTreeDialog()             
        },
        // 树形新增
        treeEmitAdd(obj){
            // 新增
            debugger
            this.currentTreeLevelObj = obj                
            this.currentRowTree = obj
            this.dialogTitTree = '新增'
            this.treeEditType = 1
            this.addNewTreeGroup(1, 'inner')// inner 表示树形层级上面新增下级  outer 表示 外面添加
            this.showTreeDialog() 
        },
        // 树形编辑
        treeEmitEdit(obj){
            // 编辑
            this.currentTreeLevelObj = obj                
            this.currentRowTree = obj
            this.dialogTitTree = '编辑'
            this.treeEditType = 2
            this.addNewTreeGroup(2, 'inner') // inner 表示树形层级上面编辑 
            this.showTreeDialog()
        },  
        // 
        addNewPageEmit(obj){
            this.currentTreeLevelObj = obj 
            this.currentRowTable.pcode = obj.metacode
            this.currentTableHasPage = true
            // 获取 已有配置的页面列表作为下拉源数据
            this._getComTables()
            this.handlerAddPage()

        },  
        showTableDialog(){
            this.showAddTableDialog = true
        },
        hideTableDialog(){
            this.showAddTableDialog = false
        },
        // page 新增  
        handlerAddPage(){
            debugger
            this.dialogTitTable = "新增"
            this.tableEditType = 1
            Object.assign(this.currentRowTable, {
                modulecode: '',
                routeName: '',
                templateId: '', // 样式格式
                description: '',
                routeIcon: 'people',
                ispc: 1,
                ismobile: 0,
                routeHidden: 0,
                state: 1,
            })
            this.showTableDialog()
        },  
        // 设置页面
        handlerSetPage(row){
            this.currentPageSetTit =  `${row.routeName}页面设置`
            this.currentPageSetRow = JSON.parse(JSON.stringify(row))
            this.showPageSetDialog = true
            // 存入 store 中
            this.$store.dispatch("setPageSetPagecode", this.currentPageSetRow.metacode)
        },
        // tablelist 编辑
        handlerEditPage(row){
            debugger
            alert(1)
            this.dialogTitTable = "编辑"
            this.tableEditType = 2
            this.currentTableHasPage = true
            console.log("--------------------------", row)
            Object.assign(this.currentRowTable, JSON.parse(JSON.stringify(row)))
            this.showTableDialog()
        },         
        getPageManageTreeList(){
            this.treeLoding = true
            let params = {
                pageSize: 10,
                pageNum: 1,
                content: this.queryTreeObj.content,
                state: this.queryTreeObj.state
            }
            getPageManageTreeList(params).then(res => {
                this.treeLoding = false
                this.pageDatatree = res.data.Data
            })
        }
    }
}
</script>
