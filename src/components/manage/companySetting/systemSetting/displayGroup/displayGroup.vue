<!--
  User: gaol
  Date: 2019/8/7
  功能：企业-系统设置-显示分组
-->

<style lang="stylus" ref="stylesheet/stylus" scoped>
.el-form-item
  margin-bottom 17px !important
.displayGroup
  padding 0 20px
  box-sizing border-box
</style>
<template>
    <div class="displayGroup">

      <!-- <el-tabs v-model="currentTab" type="card" @tab-click="handleClickTab">
        <el-tab-pane label="系统" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="企业自定义" name="second">配置管理</el-tab-pane>
      </el-tabs> -->
      queryObj: {{queryObj}}
      <!--搜索部分--start-->
      <search-tools-cmp>
        <div slot="handlerBtnWrap">              
          <el-checkbox 
            v-model="queryObj.state"
            :true-label="0"
            :false-label="1"
          >停用</el-checkbox>
          <el-button 
            size="mini"
            type="primary" 
            icon="el-icon-setting"
            @click.native="handleSetShowColumn"
          >
            设置表头列
          </el-button>           
          <el-button 
            type="primary" 
            size="mini"
            @click.native="handlerAddGroup"
          >新增</el-button>
          <el-button type="primary" 
            :disabled="!multipleSelection.length"
            size="mini"
            @click.native="handlerBatchStopOrUsing"
          >{{queryObj.state? '批量停用':'批量启用'}}</el-button>
          <!-- <el-button type="primary" size="mini">日志</el-button> -->
        </div>

        <div slot="moreSearch" class="moreSearch u-f-jst u-f-wrap">
          <div class="searchItem u-f-jst u-f-ac margin5">
            <span class="searchTit">关键词:</span>
            <el-input 
              clearable
              size="small"
              class="searchCmp"              
              style="width: 200px"
              v-model="queryObj.moduleCode"
            >
            </el-input>              
          </div>    

          <div class="searchItem u-f-jst u-f-ac margin5">
            <span class="searchTit">模块:</span>            
            <el-select 
              clearable
              size="small"
              class="searchCmp"
              style="width: 200px"
              v-model="queryObj.moduleCode">
              <el-option
                v-for="(item, key) in commonDataSourceConfig.ModulesetEnum"
                :key="key"
                :label="item.moduleName"
                :value="item.moduleCode"
              >
              </el-option>
            </el-select>
          </div>
          <div class="searchItem u-f-jst u-f-ac margin5">
            <span class="searchTit">标签:</span>     
            <el-select 
              clearable
              size="small"
              style="width: 200px"
              class="searchCmp"              
              v-model="queryObj.moduleCode">
              <!-- <el-option
                v-for="(item, key) in moduleSource"
                :key="key"
                :label="item.ModuleName"
                :value="item.ModuleCode"
              >
              </el-option> -->
            </el-select>  
          </div>     

          <div class="searchItem u-f-jst u-f-ac margin5">
            <span class="searchTit">类型:</span>  
            <el-select 
              clearable
              size="small"
              style="width: 200px"
              class="searchCmp"              
              v-model="queryObj.moduleCode">
              <!-- <el-option
                v-for="(item, key) in moduleSource"
                :key="key"
                :label="item.ModuleName"
                :value="item.ModuleCode"
              >
              </el-option> -->
            </el-select>   
          </div>   
          <div class="searchItem u-f-jst u-f-ac margin5">
            <span class="searchTit">子类型:</span>  
            <el-select 
              clearable
              size="small"
              style="width: 200px"
              class="searchCmp"              
              v-model="queryObj.moduleCode">
              <!-- <el-option
                v-for="(item, key) in moduleSource"
                :key="key"
                :label="item.ModuleName"
                :value="item.ModuleCode"
              >
              </el-option> -->
            </el-select> 
          </div>                         
               
          <div class="searchItem u-f-jst u-f-ac margin5">
            <span class="searchTit">属性:</span>  
            <el-select 
              clearable
              size="small"
              style="width: 200px"
              class="searchCmp"              
              v-model="queryObj.moduleCode">
              <!-- <el-option
                v-for="(item, key) in moduleSource"
                :key="key"
                :label="item.ModuleName"
                :value="item.ModuleCode"
              >
              </el-option> -->
            </el-select>   
          </div>               
          
          <div class="searchItem u-f-jst u-f-ac margin5">
            <span class="searchTit">模板号:</span>  
            <el-select 
              clearable
              size="small"
              style="width: 200px"
              class="searchCmp"              
              v-model="queryObj.moduleCode">
              <!-- <el-option
                v-for="(item, key) in moduleSource"
                :key="key"
                :label="item.ModuleName"
                :value="item.ModuleCode"
              >
              </el-option> -->
            </el-select>    
          </div>          
          
          <div class="searchBtnWrap u-f-ajc">
            <el-button 
              type="primary" 
              size="small"
              class="u-f-g0 u-f-s0"
              @click.native="handlerSearch"
            >搜索</el-button>
            <el-button 
              type="primary" 
              size="small"
              class="u-f-g0 u-f-s0"
              @click.native="handlerReset"
            >重置</el-button>
          </div>                                   
        </div>
      </search-tools-cmp> 
      <!---搜索部分---end-->
      
      <!-- multipleSelection: {{multipleSelection}} -->
      <common-table-cmp
        ref="display_commonTableCmp"
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

      <!--自定义表头列弹框----start-->
      <div class="setShowColumnBox" v-if="showSetColumnDailog">
        <el-dialog
          title="设置显示列"
          width="70%"
          append-to-body
          :visible.sync="showSetColumnDailog"
          :close-on-click-modal="false"
          custom-class="setShowColumn-dialog"
        >
          <!---引入设置自定义显示列组件--start-->
          <show-column-cmp 
            ref="showColumnCmp"
          >
          </show-column-cmp>  
          <!--引入设置自定义显示列组件--end-->              
        </el-dialog>
      </div>
      <!--自定义表头列弹框----end-->

      <!--新增的弹框--start--->
      <transition name="el-zoom-in-center">
        <div class="addGroupBox" v-if="showAddGroup">
          <atris-drawer-cmp
              :tit="dialogTit"    
              :dialog.sync="showAddGroup"        
              @emitClickSureBtn="addSaveGroup"
          >           
          <!-- <el-dialog
            :title="dialogTit"
            v-if="showAddGroup"
            fullscreen
            :visible.sync="showAddGroup"
            append-to-body
            :close-on-click-modal="false"
          > -->
            <!-- <div slot="title" class="header-title">
              <div class="u-f-jsb u-f-ac topTitleNav">
                <span class="tit">{{dialogTit}}</span>
                <div>
                  <save-footer 
                    saveBtnSize="mini"
                    :isCancel="false"
                    @save="addSaveGroup"
                  ></save-footer>
                </div>
              </div>
            </div>  -->

            <div 
              slot="container-slot"
            >
              <add-group-cmp
                ref="groupCmpRef"
                :isShowing="(isAddOrEdit == 1)"
                :parentGroups="parentGroups"
                @emitGetData="emitGetData"
                @emitSuccess="emitSuccess"
              ></add-group-cmp>
              <!-- <save-footer @save="saveAddGroup" @cancel="cancelAddGroup"></save-footer> -->
            </div>
          <!-- </el-dialog> -->
          </atris-drawer-cmp>
      </div>
      </transition>
      <!---新增的弹框----end-->  

      <!--编辑的弹框--start--->
      <transition name="el-zoom-in-center">
        <div class="addGroupBox" v-if="showEditGroup">
          <atris-drawer-cmp
            :tit="dialogTit"    
            :dialog.sync="showEditGroup"        
            @emitClickSureBtn="editSaveGroup"
          >           
          <!-- <el-dialog
            :title="dialogTit"
            v-if="showEditGroup"
            fullscreen
            :visible.sync="showEditGroup"
            append-to-body
            :close-on-click-modal="false"
          > -->
            <!-- <div slot="title" class="header-title">
              <div class="u-f-jsb u-f-ac topTitleNav">
                <span class="tit">{{dialogTit}}</span>
                <div>
                  <save-footer 
                    saveBtnSize="mini"
                    :isCancel="false"
                    @save="saveGroup"
                  ></save-footer>
                </div>
              </div>
            </div>  -->

            <div 
              slot="container-slot"
            >
              <edit-group-cmp
                ref="editGroupCmpRef"
                :isShowing="false"
                :obj="currentEditRow"
                @emitEditSuccess="emitEditSuccess"
              ></edit-group-cmp>
              <!-- <save-footer @save="saveAddGroup" @cancel="cancelAddGroup"></save-footer> -->
            </div>
          <!-- </el-dialog> -->
          </atris-drawer-cmp>
      </div>
      </transition>
      <!---编辑的弹框----end-->        

      <!----条目弹框-start-->
      <div class="fieldSetWrap" v-if="showEntryDialog">
        <el-dialog
          title="条目"
          append-to-body
          fullscreen
          :close-on-click-modal="false"
          :visible.sync="showEntryDialog"
        >
          <entry-cmp
            :obj="currentRowObj"
          ></entry-cmp>
        </el-dialog>
      </div>
      <!----条目弹框---end-->
    </div>
</template>

<script type="text/ecmascript-6">
  import EntryCmp from './displayGroup-cmp/entry-cmp'
  import SaveFooter from '@/base/Save-footer/index'
  import SearchToolsCmp from '@/base/NewStyle-cmp/common-cmp/searchTool-cmp'
  import ShowColumnCmp from '@/base/NewStyle-cmp/common-cmp/setTableShowColumn-cmp/setTableShowColumn-cmp'
  import AddGroupCmp from './displayGroup-cmp/addGroup-cmp'
  import EditGroupCmp from './displayGroup-cmp/editGroup-cmp'
  import CommonTableCmp from '@/base/NewStyle-cmp/common-cmp/tableCommon-cmp/tableCommon-cmp'
  import { CommonInterfaceMixin } from '@/utils/CommonInterfaceMixin'
  import { REQ_OK } from '@/api/config'
  import { 
    getShowGroupList,
    getGroupTreeList,
  } from '@/api/systemManage.js'
  export default {
    mixins: [CommonInterfaceMixin],
    components: {
      SearchToolsCmp,
      CommonTableCmp,
      ShowColumnCmp,
      EntryCmp,
      AddGroupCmp,
      EditGroupCmp,
      SaveFooter
    },
    data(){     
      return {
        loading: false, // loading 状态
        baseKey: 'c9f0f895',
        stopOrUsingTitKey: 'name',
        showAddGroup: false, // 控制 新增分组/ 弹框显示/隐藏
        showEditGroup: false, // 控制 编辑分组 弹框显示/隐藏
        showSetColumnDailog: false,
        showEntryDialog: false, 
        finalTableHeadData: [], // 最终的 表头数据                             
        customerTaleData:[],  // 获取的自定义表格的内容数据                                   
        multipleSelection: [], // 全选
        isAddOrEdit: 1, // 1 是编辑 2 是新增
        currentRowObj: {},
        queryObj: {
          pageSize: 10,
          pageNum: 1,
          total: 0,
          state: 1,
          moduleCode: '',
        },    
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
            label: '类型',
            property: 'configtype',
            showOverFlowTooltip: true,
            sortable: true,
            width: '',
            lock: false
          },  
          {
            label: '子类型',
            property: 'subtype',
            showOverFlowTooltip: true,
            sortable: true,
            width: '',
            lock: false
          },  
          {
            label: '编号',
            property: 'metacode',
            showOverFlowTooltip: true,
            sortable: true,
            width: '',
            lock: false
          },  
          {
            label: '名称',
            property: 'name',
            showOverFlowTooltip: true,
            sortable: true,
            width: '',
            lock: false
          }, 
          {
            label: '简称',
            property: 'shortname',
            showOverFlowTooltip: true,
            sortable: true,
            width: '',
            lock: false
          },  
          {
            label: '属性',
            property: 'properties',
            showOverFlowTooltip: true,
            sortable: true,
            width: '',
            lock: false
          }, 
          {
            label: '主键',
            property: 'pk',
            showOverFlowTooltip: true,
            sortable: true,
            width: '',
            lock: false
          },   
          {
            label: '验证关键词',
            property: 'keyvalue',
            showOverFlowTooltip: true,
            sortable: true,
            width: '',
            lock: false
          },   
          {
            label: '内容',
            property: 'content',
            showOverFlowTooltip: true,
            sortable: true,
            width: '',
            lock: false
          },   
          {
            label: '关系',
            property: 'relations',
            showOverFlowTooltip: true,
            sortable: true,
            width: '',
            lock: false
          },   
          {
            label: '描述',
            property: 'description',
            showOverFlowTooltip: true,
            sortable: true,
            width: '',
            lock: false
          },    
          {
            label: '模板号',
            property: 'templateid',
            showOverFlowTooltip: true,
            sortable: true,
            width: '',
            lock: false
          },  
          {
            label: '参数',
            property: 'para1',
            showOverFlowTooltip: true,
            sortable: true,
            width: '',
            lock: false
          },    
          {
            label: '事件',
            property: 'event',
            showOverFlowTooltip: true,
            sortable: true,
            width: '',
            lock: false
          },    
          // {
          //   label: '状态',
          //   property: 'state',
          //   showOverFlowTooltip: true,
          //   sortable: true,
          //   width: '',
          //   lock: false
          // }, 
          // {
          //   label: '标签',
          //   property: 'enname',
          //   showOverFlowTooltip: true,
          //   sortable: true,
          //   width: '',
          //   lock: false
          // },             
          {
            label: '标签',
            childrenList: [
              {
                label: '标签-状态',
                property: 'state',
                showOverFlowTooltip: false,
                sortable: false,
                width: '',
                lock: false,                 
              },              
              {
                label: '标签-1',
                property: 'enname',
                showOverFlowTooltip: false,
                sortable: false,
                width: '',
                lock: false,                
              }
            ]
          },  
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
            code: 'entry',
            tit: '条目',
            baseKey:'c9f0f895',
            stopOrUsingTitKey: 'name'
          },
          {
            no: 2,
            code: 'stop',
            tit: '停用',
            baseKey:'c9f0f895',
            stopOrUsingTitKey: 'name'
          },
          {
            no: 3,
            code: 'using',
            tit: '启用',
            baseKey:'c9f0f895',
            stopOrUsingTitKey: 'name'
          },          
          {
            no: 4,
            code: 'mark',
            tit: '标签',
            baseKey:'c9f0f895',
            stopOrUsingTitKey: 'name'
          },
          {
            no: 5,
            code: 'edit',
            tit: '编辑分组',
            baseKey:'c9f0f895',
            stopOrUsingTitKey: 'name'            
          },                              
        ],
        tableData: [],
        currentEditRow: {},
        dialogTit: '',   
        parentGroups: [],
        queryParentGroupObj: {
          pageSize: 10,
          pageNum: 1,
          total: 0
        }
      }
    },
    watch: {
           
    },
    created(){
      // this.GetModuleList()
      this.initData()
    },
    methods: {
      _refreshData(){
        this._getCommTables()
      },
      initData(){
        debugger
        this._getCommTables()
      },
      _getCommTables(){
        this._getShowGroupList()
      },
      // 设置列显示
      handleSetShowColumn(){
        debugger
        this.showSetColumnDailog = true
      },      
      // 搜索
      handlerSearch(){
        this._getCommTables()
      },
      // 重置
      handlerReset(){
        Object.assign(this.queryObj, {
          moduleCode: ''

        })
        this._getCommTables()
      },
      refreshTableData(){
        this._getCommTables()
      },
      emitGetData(){
        this._getGroupTreeList()
      },
      emitSuccess(){
        this.showAddGroup = false
        this._getCommTables()
      },
      emitEditSuccess(){
        this.showEditGroup = false
        this._getCommTables()        
      },
      commonTableEmitHandler(btn, row){
        debugger
        this.currentRowObj = row
        let code = btn.code || ''
        switch(code){
          case 'entry':
            this.showEntryDialog = true                
          break
          case 'stop':
          case 'using':
          break
          case 'mark':
            
          break
          case 'edit':
            this.handleEdit(row)
          break
        }        
      },      
      // 新增时获取 分组tree数据
      _getGroupTreeList(){
        debugger
        this.$nextTick(() => {
          debugger
          this.$refs.groupCmpRef.loading = true
          let parmas = {
            metacode: 'teaminfo'
          }
          getGroupTreeList(parmas).then(res => {
            debugger
            this.$refs.groupCmpRef.loading = false        
            if(res && res.data.State === REQ_OK){
              this.parentGroups = res.data.Data.records
              this.$refs.groupCmpRef.queryObj.total = res.data.total
            }else {

            }
          })            
        }) 
      },         
      _getShowGroupList(){
        debugger
        this.$nextTick(() => {
          this.$refs["display_commonTableCmp"].showLoading() 
          getShowGroupList(this.queryObj).then(res => {
            debugger
            this.$refs["display_commonTableCmp"].hideLoading() 
            if(res && res.data.State === REQ_OK){
                this.tableData = res.data.Data.records
                // 给 tableData 添加 hasChildren 属性
                this._changeData(this.tableData)
                this.queryObj.total = res.data.Data.total
            }else {

            }
          })
        })
      },                  
      _changeData(data){
        if(data && data.length){
          data.forEach((item, key) => {
            if(item.childrenList){
              if(!item.childrenList.length){
                this.$set(item, 'hasChildren', true)
              }else {
                this.$set(item, 'hasChildren', false)
              }
            }
          })
        }
        // console.log(data)
      },
      // 获取模块下拉源
      GetModuleList(pageSize, pageNum){
        GetModuleList(65556).then(res => {
          if(res && res.data.state === REQ_OK){
            this.moduleSource = res.data.Data
          }else {
            this.$message({
                type: 'error',
                message: `获取模块下拉源失败,${res.data.Error}`
            })
          }
        }).catch(() => {
          // this.$message({
          //     type: 'warning',
          //     message: '获取模块下拉源数据出错了'
          // })
        })
      }, 
      // 条目
      handleEntry(){
        this.showEntryDialog = true
        
      },
      closeEditDialog(){
        this.showEditGroup = false
      }, 
      closeAddDialog(){
        this.showAddGroup = false
      },   
      // 新增
      handlerAddGroup(){
        debugger
        this.dialogTit = '新增分组'
        this.isAddOrEdit = 2 
        this.showAddGroup = true
        this._getGroupTreeList()
      },
      // 编辑
      handleEdit(row){
        debugger
        this.dialogTit = '编辑分组'
        this.isAddOrEdit = 1
        this.currentEditRow = row
        this.showEditGroup = true
      },
      // 新增的保存分组
      addSaveGroup(){
        debugger
        this.$refs.groupCmpRef.saveGroupForm()
      },
      // 编辑的保存分组
      editSaveGroup(){
        debugger
        this.$refs.editGroupCmpRef.saveGroupForm()
      },      
    },
  }
</script>
