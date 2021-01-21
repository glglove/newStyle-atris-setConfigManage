<!--
  User: gaol
  Date: 2019/11/28
  功能：平台系统设置——许可权-许可权配置  许可权限组件 【企业】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.permitRightsSetCmp
    .item
        font-size 0
        .roleTit
            display inline-block
            width 70px
            height 20px
            font-weight bold
            line-height 20px
            font-size 14px
            color #606266
        .roleValue
            display inline-block
            font-size 12px
            margin-left 10px
</style>

<template>
    <div class="permitRightsSetCmp animated fadeIn">
        <!--搜索部分--start-->
        <search-tools-cmp>
            <div slot="handlerBtnWrap">
                <el-checkbox
                    :true-label="1"
                    :false-label="0"
                    v-model="queryObj.state"
                    @change="handlerSelectBtn"
                >
                    启用
                </el-checkbox>  

                <el-button 
                    type="primary" size="mini"
                    @click.native="addPermit"
                >添加许可权</el-button>
                <!-- <el-button 
                    :disabled="!multipleSelection.length"
                    type="primary" 
                    size="mini"
                    @click.native="batchDeletePermit"
                >批量移除许可权</el-button> -->
                <el-tooltip content="请勾选一项后进行复制">
                    <el-button 
                        type="primary" 
                        size="mini"
                        @click.native="copyPermit"
                    >复制许可权</el-button>  
                </el-tooltip>              
                <!-- <el-button 
                    type="primary" 
                    size="mini"
                    @click.native="batchDataSafety"
                >批量数据安全</el-button> -->               
            </div>
            <div slot="moreSearch">
                <el-input
                    v-model="queryObj.permissionpackagename"
                    placeholder="许可权名，编号"
                    clearable
                    size="small"
                    style="width: 150px"
                    @clear="clearSearch"
                ></el-input>
                <span class="" style="font-size:12px">角色：</span>
                <el-select 
                    size="small"
                    v-model="queryObj.permissionpackagetype"
                >
                    <el-option 
                        v-for="(item, key) in commonDataSourceConfig.RoleTypeEnum"
                        :key="key"
                        :value="item.type"
                        :label="item.des"
                    >
                    </el-option>                           
                </el-select>   
                <el-button 
                    type="primary" 
                    size="small"
                    @click.native="handlerSearch"
                >搜索</el-button>             
            </div>
        </search-tools-cmp> 
        <!---搜索部分---end-->



        <!-- queryObj.permissionpackagetype: {{queryObj.permissionpackagetype}} -->

        <!-- tableData: {{tableData}} -->
        <div class="contentBox">
            <!-- tableData： {{tableData}} -->
            <div :class="['tableBox', !tableData.length? 'not_found':'']" v-loading="loading">
                <el-table
                    border
                    size="medium"
                    max-height="500"
                    :data="tableData"
                    empty-text=" "
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column
                        type="selection"
                        width="55"
                    >
                    </el-table-column>

                    <el-table-column
                        label="许可权名称"
                        prop="permissionpackagename"
                        width="150"
                        sortable
                        show-overflow-tooltip                           
                    >
                    
                    </el-table-column>                       
                    <el-table-column
                        label="许可权编号"
                        sortable
                        width="300"
                        show-overflow-tooltip                        
                        prop="permissionpackagecode"
                    >

                    </el-table-column>

                    <el-table-column
                        label="引用的角色"
                        prop="Rolepermissionpackagenames"
                        sortable
                        show-overflow-tooltip                           
                    >
                    
                    </el-table-column> 

                    <el-table-column
                        label="系统配置"
                        prop="permissionpackagetype"
                        sortable
                        show-overflow-tooltip                           
                    >
                        <template slot-scope="scope">
                            <!-- scope.row.permissionpackagetype: {{scope.row.permissionpackagetype}} -->
                            <span v-if="scope.row.permissionpackagetype == 'roleType_one'" style="color: #409EFF">是</span>
                            <span v-if="scope.row.permissionpackagetype == 'roleType_two' " style="color: #67C23A">否</span>                       
                        </template>
                    </el-table-column>    

                    <el-table-column
                        label="描述"
                        prop="description"
                        sortable
                        show-overflow-tooltip                           
                    >
                    
                    </el-table-column>                                       

                    <el-table-column
                        label="状态"
                        prop="state"
                        width="80"
                        sortable
                        show-overflow-tooltip                           
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.state == 1">
                                启用
                            </span>
                            <span v-if="scope.row.state == 0">
                                停用
                            </span>                        
                        </template>
                    </el-table-column>                                 

                    <el-table-column
                        label="操作"
                    >
                        <template slot-scope="scope">                                              
                            <el-button 
                                type="text" 
                                size="mini"
                                @click.native="handlerScan(scope.row)">
                                查看
                            </el-button>  
                            <el-button 
                                type="text" 
                                size="mini"
                                @click.native="handlerEdit(scope.row)">
                                编辑
                            </el-button>     
                            <!-- <el-button 
                                type="text" 
                                size="mini"
                                @click.native="handlerDataSafety(scope.row)">
                                数据安全
                            </el-button>  
                            <el-button 
                                type="text" 
                                size="mini"
                                @click.native="handlerDelete(scope.row)">
                                移除
                            </el-button>   -->  
                            <el-button 
                                v-if="scope.row.state == 1"
                                type="text"
                                size="mini"
                                @click.native="handlerStopOrUsing(scope.row)">
                                停用
                            </el-button>      
                            <el-button 
                                v-if="scope.row.state == 0"
                                type="text"
                                size="mini"
                                @click.native="handlerStopOrUsing(scope.row)">
                                启用
                            </el-button>                                           
                        </template>
                    </el-table-column>                                                  
                </el-table>
            </div>
            <!--分页部分-->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryObj.pageNum"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="queryObj.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="queryObj.total">
            </el-pagination>            
        </div>   

        <!----数据安全弹框--start-->
        <div class="dataSafetyBox" v-if="showDataSafetyDialog">
            <el-dialog
                title="数据安全"
                width="40%"
                :visible.sync="showDataSafetyDialog"
                append-to-body
                :close-on-click-modal="false"
            >
                <data-safety-cmp 
                    :obj="currentRowObj"
                ></data-safety-cmp>
            </el-dialog>
        </div>
        <!--数据安全弹框-end-->     



        <!----添加许可权限弹框--start-->
        <div class="addPermitBox" v-if="showAddPermitDialog">
            <el-dialog
                title="新增许可权"
                fullscreen
                :visible.sync="showAddPermitDialog"
                append-to-body
                :close-on-click-modal="false"
            >
                <add-permit-cmp 
                    ref="addPermitCmp"
                    @closeAddDialog="closeAddDialog"
                    @addPermitSuccess="addPermitSuccess"
                ></add-permit-cmp>
            </el-dialog>
        </div>
        <!--添加许可权限弹框-end-->    

        <!---复制弹框--start-->
        <div class="copyBox" v-if="showCopyDialog">
            <el-dialog
                title="复制许可权"
                width="40%"
                :visible.sync="showCopyDialog"
                append-to-body
                :close-on-click-modal="false"
            >
                <div class="content u-f-ac">
                    <h4>复制后名称：</h4>
                    <el-input 
                        style="width: 300px;display: inline-block"
                        v-model="copypermissionpackagename"
                        placeholder="请输入名称"
                    ></el-input>
                </div>
                <div class="footerBox">
                    <save-footer @save="saveCopy" @cancel="cancelCopy"></save-footer>
                </div>                
            </el-dialog>
        </div>
        <!---复制弹框---end-->

        <!---编辑/查看弹框--start-->
        <div class="editBox" v-if="showEditDialog">
            <el-dialog
                :title="scanOrEditTit"
                fullscreen
                :visible.sync="showEditDialog"
                append-to-body
                :close-on-click-modal="false"
            >
                <permit-scan-cmp 
                    :obj="currentRowObj"
                    :isScanOrEdit="isScanOrEdit"
                    @closeScanDialog="closeEditDialog"
                    @editPermitSuccess="editPermitSuccess"
                ></permit-scan-cmp>
            </el-dialog>
        </div>
        <!---编辑/查看弹框---end-->        

    </div>
</template>

<script type="text/ecmascript-6">
    import { REQ_OK } from '@/api/config'
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import SearchToolsCmp from '@/base/NewStyle-cmp/common-cmp/searchTool-cmp'
    // import DataSafetyCmp from './permit-cmp/DataSafe-cmp'
    import DataSafetyCmp from '@/components/manage/userManage/userRole/roleManage/company-roleManage/roleManage-cmp/dataSafety-cmp'
    import AddPermitCmp from './permit-cmp/addPermit-cmp'
    // import PermitScanCmp from './permit-cmp/permitScan-cmp'
    // 引入公用的 组件
    import PermitScanCmp from '@/components/manage/userManage/userRole/roleManage/company-roleManage/roleManage-cmp/permitScan-cmp'
    import { 
        getPermissionList,
        addPermissionSet,
        batchDelSecurityTypeGroup
    } from '@/api/systemManage'
    import { CommonInterfaceMixin } from '@/utils/CommonInterfaceMixin'
    export default {
        mixins: [CommonInterfaceMixin],
        props: {

        },
        components: {
            SearchToolsCmp,
            DataSafetyCmp,
            AddPermitCmp,
            PermitScanCmp,
            SaveFooter
        },
        data(){
            return {
                loading: false, 
                multipleSelection: [],
                tableData: [],
                currentRowObj: {},
                showDataSafetyDialog: false,
                showAddPermitDialog: false,
                showCopyDialog: false,
                showEditDialog: false,
                isScanOrEdit: false, 
                scanOrEditTit: '',
                copypermissionpackagename: '',
                permissionpackagetypeOptions: [
                  
                ],                
                queryObj: {
                    permissionpackagename: '',
                    permissionpackagetype: '', 
                    state: 1, //状态，默认1启用，0禁用
                    pageSize: 10,
                    pageNum: 1,
                    total: 0
                }
            }
        },
        created(){
            this._initData()
        },
        computed: {

        },
        watch: {
            'queryObj.permissionpackagetype': {
                handler(newValue, oldValue){
                    this._getComTables()
                }
            }
        },
        methods: {
            _initData(){
                // 获取 通用的下拉源
                this.commonDataSourceListMixin()  
                this._getComTables()
            },
            _getComTables(){
                this._getPermissionList()
            },
            handleClickTab(tab, index){
                debugger
                this.queryObj.permissionpackagetype = tab.name
                // this._getComTables()
            },
            _getPermissionList(){
                this.loading = true
                getPermissionList(this.queryObj).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.tableData = res.data.Data.records
                        this.queryObj.total = res.data.Data.total
                    }else {
                        this.$message.error(`获取许可权限列表数据失败,${res.data.Error}`)
                    }
                })
            },   
            _batchDelSecurityTypeGroup(data){
                this.loading = true
                batchDelSecurityTypeGroup(JSON.stringify(data)).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.$message.success("安全组删除成功")
                        this._getComTables()
                    }else {
                        this.$message.error(`删除安全组失败,${res.data.Error}`)
                    }
                })
            }, 
            // 清空搜索框
            clearSearch(){
                if(this.queryObj.permissionpackagetype == '-1'){
                    Object.assign(this.queryObj, {
                        permissionpackagename: '',
                        permissionpackagetype: '',
                        state: 1
                    })   
                    this._getComTables()                 
                }else {
                    Object.assign(this.queryObj, {
                        permissionpackagename: '',
                        permissionpackagetype: '',
                        state: 1
                    })                       
                }
            },      
            // 分页--每页多少条
            handleSizeChange (val) {
                this.queryObj.pageSize = val
                this._getComTables()
            },
            // 分页--当前页
            handleCurrentChange (val) {
                this.queryObj.pageNum = val
                this._getComTables()
            },
            handleSelectionChange(val){
                this.multipleSelection = val
            },  
            //搜索
            handlerSearch(){
                this.queryObj.pageNum = 1
                this._getComTables()
            }, 
            // 查看
            handlerScan(row){
                this.currentRowObj = row
                this.isScanOrEdit = false
                this.scanOrEditTit = '查看许可权'
                this.showEditDialog = true
            },
            // 编辑
            handlerEdit(row){
                this.currentRowObj = row
                this.scanOrEditTit = '编辑许可权'
                this.isScanOrEdit = true
                this.showEditDialog = true
            },
            // 数据安全
            handlerDataSafety(row){
                this.currentRowObj = row
                this.showDataSafetyDialog = true
            },
            // 批量移除
            handlerBatchDelete(){
                debugger
                let statusText = '批量删除'
                let baseKey = 'plat_sysmg_sys_user'            
                let name = ''
                let ids = []
                let length = this.multipleSelection.length
                if(length){
                    this.multipleSelection.forEach((item, key) => {
                        item.id && ids.push(item.id)
                        if(key != length-1){
                            name += item.permissionpackagename + ','
                        }else {
                            name += item.permissionpackagename
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
            // 移除
            handlerDelete(row){
                debugger
                this.currentRow = row            
                if(row.id){
                    let statusText = '删除'
                    let name = row.permissionpackagename || ''
                    let ids = row.id ? [row.id] : []
                    let baseKey = 'plat_sysmg_sys_permissionpackageinfo'
                    this.commonDeleteListMixin({
                        statusText,
                        name,
                        ids,
                        baseKey
                    })
                }            
            },
            // 启用/停用 筛选
            handlerSelectBtn(value){
                debugger
                this._getComTables()        
            },             
            // 添加许可权限
            addPermit(){
                debugger
                this.showAddPermitDialog = true
            },
            // 复制许可权
            copyPermit(){
              debugger  
              if(this.multipleSelection.length!=1){
                this.$message.warning("请选择一项进行复制")
                return
              }
            
              this.showCopyDialog = true
            },
            // 批量数据安全
            batchDataSafety(){
                debugger

            },
            closeAddDialog(){
                this.showAddPermitDialog = false
            },
            addPermitSuccess(){
                this._getComTables()
                // this.showAddPermitDialog = false
            },
            editPermitSuccess(){
                debugger
                this._getComTables()
                this.showEditDialog = false                
            },
            // 停用/启用
            handlerStopOrUsing(row){
                debugger           
                let statusText = row.state == 1? '停用': '启用'
                let name = row.permissionpackagename || ''
                let ids = row.id ? [row.id] : []
                let baseKey = 'plat_sysmg_sys_permissionpackageinfo'
                this.commonSetStatusMixin({
                    statusText,
                    name,
                    ids,
                    baseKey
                })
            }, 
            _addPermissionSet(obj){
                this.loading = true

                addPermissionSet(obj).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.$message.success("复制许可权成功")
                        this.showCopyDialog = false
                        this._getComTables()
                    }else {
                        this.$message.error(`复制许可权失败,${res.data.Error}`)
                    }
                })                
            },            
            // 复制保存
            saveCopy(){
                if(!this.copypermissionpackagename){
                    this.$message.warning("名称为空，请填写名称")
                    return
                }
                let {
                    state,
                    description
                } = this.multipleSelection[0]
                let newObj = {
                    permissionpackagename: this.copypermissionpackagename,
                    id: '',
                    state: state,
                    description: description
                }                
                this._addPermissionSet(newObj)
            },
            // 复制取消
            cancelCopy(){
                this.showCopyDialog = false
            },
            closeEditDialog(){
                this.showEditDialog = false
            }
        }
    }
</script>

