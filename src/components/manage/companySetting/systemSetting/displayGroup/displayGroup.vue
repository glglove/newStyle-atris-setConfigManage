<!--
  User: gaol
  Date: 2019/8/7
  功能：企业-系统设置-显示组表
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
            :disabled="!mutipleSelection.length"
            size="mini"
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

      <div
        :class="['tableBox', tableData.length<=0? 'not_found':'']"
        v-loading="loading">
        <!-- tableData: {{tableData}} -->
        <el-table
          :data="tableData"
          border
          max-height="500px"
          empty-text=" "
          @selection-change="handleSelectionChange"
        >

          <el-table-column
            type="selection"
            width="50"
          >
          </el-table-column>

          <el-table-column
            label="模块"
            prop="modulecode"
            show-overflow-tooltip
            sortable          
          >
            <template slot-scope="scope">
              <span>{{scope.row.modulecode}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="类型"
            prop="metacodeCN"
            show-overflow-tooltip
            sortable     
            width="120"     
          >
            <template slot-scope="scope">
              <span>{{scope.row.metacodeCN}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="子类型"
            prop="conname"
            show-overflow-tooltip
            sortable   
            width="120"       
          >
            <template slot-scope="scope">
              <span>{{scope.row.conname}}</span>
            </template>
          </el-table-column>   

          <el-table-column
            label="编号"
            prop="concode"
            show-overflow-tooltip
            sortable     
            width="120"     
          >
            <template slot-scope="scope">
              <span>{{scope.row.concode}}</span>
            </template>
          </el-table-column>            

          <el-table-column
            label="名称"
            prop="conname"
            show-overflow-tooltip
            sortable     
            width="120"     
          >
            <template slot-scope="scope">
              <span>{{scope.row.conname}}</span>
            </template>
          </el-table-column>             

          <el-table-column
            label="简称"
            prop="enconname"
            show-overflow-tooltip
            sortable        
            width="120"  
          >
            <template slot-scope="scope">
              <span>{{scope.row.enconname}}</span>
            </template>
          </el-table-column>    

          <el-table-column
            label="属性"
            prop="showstyle"
            show-overflow-tooltip
            sortable
            width="120"
          >
            <template slot-scope="scope">
              <span>{{scope.row.showstyle}}</span>          
            </template>
          </el-table-column>


          <el-table-column
            label="主键"
            width="200"
            show-overflow-tooltip
            prop="id"
          >
            <template slot-scope="scope">
              <span>{{scope.row.id}}</span>
            </template>
          </el-table-column>         


          <el-table-column
            label="验证关键词"
            show-overflow-tooltip
            sortable       
            prop="validate"   
          >
            <template slot-scope="scope">
              <span>{{scope.row.validate}}</span>
            </template>
          </el-table-column>    

          <el-table-column
            label="内容"
            show-overflow-tooltip
            sortable  
            prop="convalue"        
          >
            <template slot-scope="scope">
              <span>{{scope.row.convalue}}</span>            
            </template>
          </el-table-column>       

          <el-table-column
            label="关系"
            show-overflow-tooltip
            sortable   
            prop="relateb"       
          >
            <template slot-scope="scope">
              <span>{{scope.row.relateb}}</span>            
            </template>
          </el-table-column>    

          <el-table-column
            label="描述"
            show-overflow-tooltip
            sortable    
            prop="description"      
          >
            <template slot-scope="scope">
              <span>{{scope.row.description}}</span>            
            </template>
          </el-table-column>    

          <el-table-column
            label="模板号"
            show-overflow-tooltip
            sortable 
            prop="modulecode"        
          >
            <template slot-scope="scope">
              <span>{{scope.row.modulecode}}</span>            
            </template>
          </el-table-column>         

          <el-table-column
            label="参数"
            show-overflow-tooltip
            sortable      
            prop="labelstyle"    
          >
            <template slot-scope="scope">
              <span>{{scope.row.labelstyle}}</span>            
            </template>
          </el-table-column>     

          <el-table-column
            label="事件"
            show-overflow-tooltip
            sortable   
            prop="event"       
          >
            <template slot-scope="scope">
              <span>{{scope.row.event}}</span>            
            </template>
          </el-table-column>  

          <el-table-column
            label="状态"
            show-overflow-tooltip
            sortable      
            prop="state"    
          >
            <template slot-scope="scope">
              <span>{{ scope.row.state == 1 ? '启用':'停用' }}</span>            
            </template>
          </el-table-column>    

          <el-table-column
            label="标签"
            show-overflow-tooltip
            sortable  
            prop="tips"        
          >
            <template slot-scope="scope">
              <span>{{scope.row.tips}}</span>            
            </template>
          </el-table-column>                                                                   


          <el-table-column
            label="操作"
            width="250"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button 
                type="text" 
                size="mini" 
                @click.native="handleEntry(scope.row, scope.$index)"
              >条目</el-button>

              <el-button 
                type="text" 
                size="mini"
                @click.native="handlerStopOrUsing(scope.row, scope.$index)"
              >{{scope.row.state ==1 ? '停用': '启用'}}</el-button>   

              <el-button 
                type="text" 
                size="mini" 
                @click.native="handleFieldSet(scope.row, scope.$index)"
              >标签</el-button>

              <el-button 
                type="text" 
                size="mini" 
                @click.native="handleEdit(scope.row, scope.$index)"
              >编辑分组</el-button>
            </template>
          </el-table-column>     
        </el-table>

        <!--分页部分--start--->
        <div class="pagination-container">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="queryObj.pageNum"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="queryObj.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="queryObj.total">
            </el-pagination>
        </div>
        <!---分页部分--end--->           
      </div>
    

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

      <!--新增/编辑的弹框--start--->
      <transition name="el-zoom-in-center">
        <div class="addGroupBox" v-if="showAddGroup">
          <el-dialog
            :title="dialogTit"
            v-if="showAddGroup"
            fullscreen
            :visible.sync="showAddGroup"
            append-to-body
            :close-on-click-modal="false"
          >
            <div slot="title" class="header-title">
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
            </div> 

            <div>
              <add-group-cmp
                ref="groupCmp"
                :parentGroups="parentGroups"
                @emitGetData="emitGetData"
              ></add-group-cmp>
              <!-- <save-footer @save="saveAddGroup" @cancel="cancelAddGroup"></save-footer> -->
            </div>
          </el-dialog>
      </div>
      </transition>
      <!---新增/编辑的弹框----end-->  

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
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import SearchToolsCmp from '@/base/NewStyle-cmp/common-cmp/searchTool-cmp'
  import ShowColumnCmp from '@/base/NewStyle-cmp/common-cmp/setTableShowColumn-cmp/setTableShowColumn-cmp'
  import AddGroupCmp from './displayGroup-cmp/group-cmp'
  import { CommonInterfaceMixin } from '@/utils/CommonInterfaceMixin'
  import { REQ_OK } from '@/api/config'
  import { 
    getShowGroupList,
    getGroupTreeList
  } from '@/api/systemManage.js'
  export default {
    mixins: [CommonInterfaceMixin],
    components: {
      SearchToolsCmp,
      ShowColumnCmp,
      EntryCmp,
      AddGroupCmp,
      SaveFooter
    },
    data(){     
      return {
        loading: false, // loading 状态
        showAddGroup: false, // 控制 新增组/ 编辑的 弹框显示/隐藏
        showSetColumnDailog: false,
        showEntryDialog: false, 
        finalTableHeadData: [], // 最终的 表头数据                             
        customerTaleData:[],  // 获取的自定义表格的内容数据                                   
        mutipleSelection: [], // 全选
        isAddOrEdit: 1, // 1 是编辑 2 是新增
        currentRowObj: {},
        queryObj: {
          pageSize: 10,
          pageNum: 1,
          total: 0,
          state: 1,
          moduleCode: ''
        },    
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
      emitGetData(){
        this._getGroupTreeList()
      },
      // 新增时获取 分组tree数据
      _getGroupTreeList(){
          debugger
          this.$nextTick(() => {
            debugger
            this.$refs.groupCmp.loading = true
            getGroupTreeList(this.$refs.groupCmp.queryObj).then(res => {
              debugger
              this.$refs.groupCmp.loading = false        
              if(res && res.data.State === REQ_OK){
                this.parentGroups = res.data.Data.records
                this.$refs.groupCmp.queryObj.total = res.data.total
              }else {

              }
            })            
          }) 
      },        
      // 停用/启用
      handlerStopOrUsing(row){
        debugger           
        let statusText = row.state == 1? '停用': '启用'
        let name = row.conname || ''
        let ids = row.id ? [row.id] : []
        let baseKey = 'plat_sysmg_sys_team_control'
        this.commonSetStatusMixin({
            statusText,
            name,
            ids,
            baseKey
        })
      },   
      // 批量启用/ 停用
      handlerBatchStopOrUsing (state) {
        let statusText = (this.queryObj.state == 1)? "批量停用": "批量启用"
        let baseKey = 'plat_sysmg_sys_team_control'            
        let name = ''
        let ids = []
        let length = this.multipleSelection.length
        if(length){
          this.multipleSelection.forEach((item, key) => {
            item.id && ids.push(item.id)
            if(key != length-1){
              name += item.conname + ','
            }else {
              name += item.conname
            }
          })
          this.commonSetStatusMixin({
            statusText,
            name,
            ids,
            baseKey
          })              
        }          
      },
      // 批量移除
      handlerBatchDelete(){
        debugger
        let statusText = '批量删除'
        let baseKey = 'plat_sysmg_sys_team_control'            
        let name = ''
        let ids = []
        let length = this.multipleSelection.length
        if(length){
          this.multipleSelection.forEach((item, key) => {
            item.id && ids.push(item.id)
            if(key != length-1){
              name += item.conname + ','
            }else {
              name += item.conname
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
      handlerDelete(row, index){
        debugger
        this.currentRow = row            
        if(row.id){
          let statusText = '删除'
          let name = row.conname || ''
          let ids = row.id ? [row.id] : []
          let baseKey = 'plat_sysmg_sys_team_control'
          this.commonDeleteListMixin({
            statusText,
            name,
            ids,
            baseKey
          })
        }            
      }, 
      _getShowGroupList(){
        debugger
        this.loading = true
        getShowGroupList(this.queryObj).then(res => {
        debugger
        this.loading = false
        if(res && res.data.State === REQ_OK){
            this.tableData = res.data.Data.records
            this.queryObj.total = res.data.Data.total
        }else {

        }
        })
      },                  
      _changeData(data){
        if(data && data.length){
          data.forEach((item, key) => {
            if(item.Children){
              if(!item.Children.length){
                delete item.Children
              }else {
                this._changeData(item.Children)
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
      _SaveComTeamConfig(data){
        SaveComTeamConfig(JSON.stringify(data)).then(res => {
          if(res && res.data.state === REQ_OK){
            this.$message.success('保存成功')
            if(this.isAddOrEdit == 1){
              this.closeEditDialog()
            }else {
              this.closeAddDialog()
            }
            this._getCommTables()
          }else {
            this.$message.error(`保存失败,${res.data.Error}`)
          }
        })
      },
      // 批量启用停用
      _SetComTeamConfigState(data, type){
        let text = type == 1 ? '启用':'停用'
        SetComTeamConfigState(JSON.stringify(data), type).then(res => {
          if(res && res.data.state === REQ_OK){
            this.$message.success(`${text}成功`)
            this._getCommTables()
          }else {
            this.$message.error(`${text}失败,${res.data.Error}`)
          }
        })
      },
      // 启用/停用
      handlerUsing(row, type){
        this.currentRowObj = row
        let text = type == 0? '停用':'启用'
        this.$confirm(`确定要${text}"${row.TeamName}"吗？`,"提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(res => {
          this._SetComTeamConfigState([this.currentRowObj], type)
        }).catch(() => {
          this.$message.info(`${text}已取消`)
        })
      }, 
      // 批量启用/批量停用
      batchUsing(type){
        debugger
        let text = type == 0? '停用':'启用'
        let str = ''
        let length = this.mutipleSelection.length
        if(length){
          this.mutipleSelection.forEach((item, key) => {
            if(key != (length-1)){
              str += item.TeamName + ','
            }else {
              str += item.TeamName
            }
          })
        }
        debugger
        this.$confirm(`确定要${text}"${str}"吗？`,"提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(res => {
          this._SetComTeamConfigState([this.currentRowObj], type)
        }).catch(() => {
          this.$message.info(`${text}已取消`)
        }) 
      },     
      // 分页--一页展示多少条
      handleSizeChange (val) {
          this.queryObj.pageSize = val
          this._getCommTables()
      },
      // 分页--上一页，下一页
      handleCurrentChange (val) {
        this.queryObj.pageNum = val
        this._getCommTables()
      }, 
      // 全选  
      handleSelectionChange(val){
        this.mutipleSelection = val
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
        // Object.assign(this.formData, JSON.parse(JSON.stringify(row)))
        this.formData = JSON.parse(JSON.stringify(row))
        // this.formData.belongToQun = ''
        // this.formData.belongToGroup = ''
        this.formData.state += ''
        console.log("-------",this.formData)
        // if(!this.belongToGroupOptions.length){
        //   this._ComTeamTree(this.currentEditRow.ModuleCode,'')
        // }        
        // if(!this.belongToQunOptions.length){
        //   this._ComGroups(this.currentEditRow.ModuleCode)          
        // }
        this.showEditGroup = true
      },
      // 保存分组
      saveGroup(){
        this.$refs.groupCmp.saveGroupForm()
      },
    },
  }
</script>
