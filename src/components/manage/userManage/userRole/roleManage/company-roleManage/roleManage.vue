<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——用户角色--角色管理/企业角色 [企业]

-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.roleManage
  padding 0 20px
  box-sizing border-box
  .containerWrap
    .topBtnBox
      margin-bottom 10px
      text-align right
</style>

<template>
    <div class="roleManage">
      <div class="containerWrap">
        <!-- queryObj: {{queryObj}} -->     

        <el-tabs v-model="queryObj.roletype"  @tab-click="handleClickTabs">
          <el-tab-pane label="系统角色" name="roleType_one"></el-tab-pane>
          <el-tab-pane label="企业自定义角色" name="roleType_two"></el-tab-pane>
        </el-tabs>    

        <!--搜索部分--start-->
        <search-tools-cmp>
            <div slot="handlerBtnWrap">
              <el-checkbox 
                v-model="queryObj.state" 
                :true-label='1'
                :false-label='0'
                @change="handlerChangeSelect"
              >
                停用
              </el-checkbox>

              <el-button 
                v-if="queryObj.roletype == 'roleType_two'"
                type="primary" 
                size="mini" 
                @click.native="addNewRole"
              >
                新增角色
              </el-button>

              <el-button 
                :disabled="!multipleSelection.length || multipleSelection.length != 1"
                type="primary" 
                size="mini" 
                @click.native="copyRole"
              >
                复制角色
              </el-button>

              <el-button 
                type="primary" 
                size="mini" 
                @click.native="exportRole"
              >
              导出
              </el-button>             
            </div>

            <div slot="moreSearch">
                <el-input 
                  placeholder="角色名"
                  clearable
                  size="small"
                  style="width: 220px;margin: 5px 10px"
                  v-model="queryObj.rolename"
                ></el-input>

                <el-cascader 
                  style="margin: 5px 10px"
                  v-model="queryObj.rolegroupcode"
                  placeholder="按角色组查看"
                  :options="roleGroupOptions"
                  filterable
                  size="small"
                  :props="{
                    value: 'rolegroupcode',
                    label: 'rolegroupname',
                    children: 'childrenList'
                  }"
                  :collapse-tags="true"
                  clearable
                >
                </el-cascader>
                <el-button 
                  type="primary" 
                  size="small"
                  @click.native="handlerSearch">搜索</el-button>
                <el-button 
                  type="primary" 
                  size="small"
                  @click.native="handlerReset"
                >重置</el-button>               
            </div>
        </search-tools-cmp> 
        <!---搜索部分---end-->   

        tableData: {{tableData}}
        <div 
          :class="['tableBox', tableData.length<=0?'not_found':'']" 
          v-loading="loading">
          <el-table 
            style="width: 100%"
            max-height="450px"
            :data="tableData"
            empty-text=" "
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            >

            </el-table-column>

            <el-table-column
              prop="rolename"
              label="角色名称"
              sortable
            ></el-table-column>

            <el-table-column
              prop="roletype"
              label="角色类型"
              sortable
            >
              <template slot-scope="scope">
                <span v-if="scope.row.roletype == 'roleType_one'">
                  系统角色
                </span >
                <span v-if="scope.row.roletype == 'roleType_two'">
                  企业自定义角色
                </span >                
              </template>
            </el-table-column>

            <el-table-column
              prop="description"
              label="描述"
              show-overflow-tooltip
            ></el-table-column>    

            <el-table-column
              prop="state"
              label="状态"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span 
                  v-if="scope.row.state == 1"
                  @click="handlerStopOrUsing(scope.row)"
                >
                  启用
                </span>
                <span 
                  @click="handlerStopUsing(scope.row)"
                  v-if="scope.row.state == 0">
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
                  @click.native="handlerStopOrUsing(scope.row)"
                >         
                  {{scope.row.state==1? '停用':'启用'}}       
                </el-button>
                <el-button 
                  type="text" 
                  size="mini"
                  @click.native="handlerScan(scope.row)"
                >查看</el-button>                
                <el-button 
                  type="text" 
                  size="mini"
                  @click.native="hanlderEdit(scope.row)"
                >编辑</el-button>
                <el-button 
                  type="text" 
                  size="mini" 
                  v-if="scope.row.State == 0"
                  @click.native="handlerStopOrUsing(scope.row)"
                >
                启用
                </el-button>
                <el-button 
                  type="text" 
                  size="mini" 
                  v-if="scope.row.State == 1"
                  @click.native="handlerStopUsing(scope.row)"
                >停用</el-button>
                <el-button 
                  type="text" 
                  size="mini"
                  @click.native="handlerPermitRights(scope.row)"  
                >
                  许可权限
                </el-button>
                <el-button 
                  type="text" 
                  size="mini"
                  @click.native="handlerUserOrGroup(scope.row)">
                  用户/组
                </el-button>
              </template>
            </el-table-column>      
          </el-table>    

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
       
      </div>

      <!---新增角色弹框---->
      <div class="addNewRole" v-if="showAddNewRole">
        <!-- <el-dialog
          title="新增角色"
          width="30%"
          append-to-body
          :close-on-click-modal="false"
          :visible.sync="showAddNewRole"
        > -->
        <atris-drawer-cmp
          tit="新增角色"    
          :dialog.sync="showAddNewRole"    
          saveBtnSize="mini"    
          @emitClickSureBtn="saveAdd"
        >            
          <!-- addRoleObj: {{addRoleObj}} -->
          <el-form slot="container-slot" ref="addRoleForm" label-width="120px" :model="addRoleObj" :rules="addRoleForm">
            <el-form-item label="角色名" prop="rolename">
              <el-input 
                v-model="addRoleObj.rolename"
                placeholder="请输入角色名称" 
                style="width:300px">
              </el-input>
            </el-form-item>

            <el-form-item label="编号">
              <el-button type="text">系统生成</el-button>
            </el-form-item>

            <el-form-item label="角色类型">
              <el-select style="width:300px" v-model="addRoleObj.roletype">
                <el-option 
                  v-for="(item, key) in commonDataSourceConfig.RoleTypeEnum"
                  :key="key"
                  :value="item.type"
                  :label="item.des"
                >
                  
                </el-option>
              </el-select>
            </el-form-item>      

            <el-form-item label="角色级别">
              <el-select style="width:300px" v-model="addRoleObj.rolelevel">
                <el-option 
                  v-for="(item, key) in commonDataSourceConfig.RoleLevelEnum"
                  :key="key"
                  :value="item.type"
                  :label="item.des"
                >
                  
                </el-option>
              </el-select>
            </el-form-item>                  

            <el-form-item label="描述" prop="description">
              <el-input
                v-model="addRoleObj.description"
                style="width:300px"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
              >
              </el-input>              
            </el-form-item>

            <el-form-item label="状态">
              <el-switch
                v-model="addRoleObj.state"
                active-value="1"
                inactive-value="0"
              >
              </el-switch>
            </el-form-item>            

          </el-form>

          <!-- <div>
            <save-footer @save="saveAdd" @cancel="cancelAdd"></save-footer>
          </div>
        </el-dialog> -->
        </atris-drawer-cmp>
      </div>
      <!---新增角色弹框--->

      <!--复制角色--->
      <div>
        <el-dialog 
          title="复制角色"
          width="30%"
          append-to-body
          :close-on-click-modal="false"
          :visible.sync="showCopyRole"        
        >
        <!-- copyRoleForm: {{copyRoleForm}} -->
          <el-form ref="copyRoleForm" :model="copyRoleForm" :rules="copyRoleRules" label-width="80px">
            <el-form-item label="角色名" prop="name">
              <el-input placeholder="角色名" clearable v-model="copyRoleForm.name">
              </el-input>
            </el-form-item>

            <div class="footer">
              <save-footer @save="saveCopy" @cancel="cancelCopy"></save-footer>
            </div>           
          </el-form>
        </el-dialog>
      </div>
      <!--复制角色-->

      <!--编辑角色弹框--->
      <div class="editRoleBox animated fadeIn" v-if="showEditRole">
        <el-dialog
          :title="editRoleDialogTit"
          width="50%"
          append-to-body
          :visible.sync="showEditRole"
          :close-on-click-modal="false"
        >
          <company-role-Edit-info-cmp
            ref="companyRoleEditInfoCmp"
            :obj="currentRowObj"
            :strFlag = 'strFlag'
            @roleInfoSaveSuccess="roleInfoSaveSuccess"
          >
          </company-role-Edit-info-cmp>

          <!-- <div class="footer">
            <save-footer @save="saveEdit" @cancel="cancelEdit"></save-footer>
          </div> -->
        </el-dialog>
      </div>
      <!---编辑角色弹框-->
    </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import CompanyRoleEditInfoCmp from './roleManage-cmp/common-roleEditInfo-cmp'
  import {  REQ_OK, BASE_URL } from '@/api/config'
  import { mapGetters } from 'vuex'
  import { getToken, setToken, removeToken } from '@/utils/auth'
  import { CommonInterfaceMixin } from '@/utils/CommonInterfaceMixin'
  import SearchToolsCmp from '@/base/NewStyle-cmp/common-cmp/searchTool-cmp'
  import { 
    getRoleList,
    addComRoleNew,
    getRoleGroupTree,
  } from '@/api/systemManage'
  export default {
    mixins: [CommonInterfaceMixin],
    components:{
      SaveFooter,
      CompanyRoleEditInfoCmp,
      SearchToolsCmp
    },
    data(){
      return {
        loading: false, // loading状态
        showAddNewRole: false, // 控制新增角色弹框显示/隐藏
        showEditRole: false, // 编辑角色的弹框 显示/隐藏
        showCopyRole: false, 
        roleOptions: [],  //搜索框中 角色下拉源
        roleGroupOptions: [], //搜索框中 角色组下拉源
        props: { multiple: true },
        tableData: [],
        currentRowObj: {},  
        copyRoleForm: {
          name: ''
        },
        copyRoleRules: {
          name: [{required: true, message: '请填写角色名称', trigger: 'blur'}],
        },
        addRoleObj: {
          "id": '',
          "userName":"",
          "CompanyCode":"",
          "rolename":"",
          "roletype": "roleType_two",
          "rolelevel":"roleLevel_two",
          "maxAuthNum":0,
          "description":"",
          "state": 1,
          "deleted":0
        },           
        multipleSelection: [],
        queryObj: {
          pageSize: 10,
          pageNum: 1,
          total: 0,
          rolename: '',
          rolegroupcode: [],
          roletype: 'roleType_two',
          state: 1,
        },
        addRoleForm: {
          rolename: [{required: true, message: '请填写角色名称', trigger: 'blur'}],
          description: [{required: true, message: '请填写备注', trigger: 'blur'}],
        },
        strFlag: '',  // 'roleInfo'  'permitRights'
        editRoleDialogTit: '', 
      }
    },
    created(){
      this.$store.dispatch("setCompanyRoleScan", false)
      this.$bus.$on("closeDialog", () => {
        this.showEditRole = false
      })

      this._initData()
    },
    beforeDestroy(){
      this.$bus.$off("closeDialog")
    },
    computed: {
      ...mapGetters([
        'userCode',
        'companyCode',
        'token'
      ])
    },
    watch: {

    },
    methods: {
      _initData(){
        // 获取table 列表数据
        this._getComTables()
        // 获取 通用的下拉源
        this.commonDataSourceListMixin()  
        // 获取角色组下拉源
        this._getRoleGroupTree({
          state: this.queryObj.state,
          pageSize: this.queryObj.pageSize,
          pageNum: this.queryObj.pageNum 
        })    
      },
      _refreshData(){
        this._getComTables()
      },
      _getComTables(){
        this._getRoleList()
      },
      handleSelectionChange(val){
         this.multipleSelection = val
      },
      _changeData(roleOptions){
        if(roleOptions && roleOptions.length){
          roleOptions.forEach((item, key) => {
            this.$set(item, 'label', item.rolegroupname)
            this.$set(item, 'value', item.rolegroupcode)
            this.$set(item, 'children', item.Children)
            if(item.Children && item.Children.length){
              this._changeData(item.Children)
            }else {
              delete item.children
            }
          })
        }else {

        }
      },
      _changedata(data){
        debugger
        if(data && data.length){
          data.forEach((item, key) => {
            let length = item.childrenList.length
            if(!length){
              delete item.childrenList
            }else {
              this._changedata(item.childrenList)
            }
          })
        }
      },
      //获取 角色组数据
      _getRoleGroupTree(obj){
          debugger
          getRoleGroupTree(obj).then(res => {
              if(res && res.data.State === REQ_OK){
                  // 初始化数据
                  this.roleGroupOptions = res.data.Data.records
                  this._changedata(this.roleGroupOptions)
              }else {
                  this.$message({
                      type: 'error',
                      message: `获取角色组数据失败,${res.data.Error}`
                  })
              }
          }).catch(() => {

          })
      },
      // 获取列表数据
      _getRoleList(){
        debugger
        this.loading = true
        let length = this.queryObj.rolegroupcode.length
        if (length) {
          this.queryObj.rolegroupcode = this.queryObj.rolegroupcode[length-1]
        }else {
          this.queryObj.rolegroupcode = ''
        }

        getRoleList(this.queryObj).then(res => {
          debugger
          this.loading = false
          if(res && res.data.State === REQ_OK) {
            this.tableData = res.data.Data.records
            this.queryObj.total = res.data.Data.total
          }else {
            this.$message.error(`获取列表数据失败,${res.data.Error}`)
          }
        })
      },
      // 搜索
      handlerSearch(){
        this._getComTables()
      },
      //重置
      handlerReset(){
        Object.assign(this.queryObj, {
          rolename: [],
          rolegroupcode: []
        })
        this._getComTables()
      },
      // 停用/启用
      handlerStopOrUsing(row){
          debugger           
          let statusText = row.state == 1? '停用': '启用'
          let name = row.dicName || ''
          let ids = row.id ? [row.id] : []
          let baseKey = 'plat_sysmg_sys_rolegroup'
          this.commonSetStatusMixin({
              statusText,
              name,
              ids,
              baseKey
          })
      },          
      // 查看
      handlerScan(row){
        // store 中存入 点击查看的 标识 companyRoleScanFlag
        this.$store.dispatch("setCompanyRoleScan", true)
        this.currentRowObj = row
        this.strFlag = 'roleInfo'
        this.editRoleDialogTit = '查看角色'
        this.showEditRole = true        
      },
      // 编辑
      hanlderEdit(row){
        debugger
        this.$store.dispatch("setCompanyRoleScan", false)
        this.currentRowObj = row
        this.strFlag = 'roleInfo'
        this.editRoleDialogTit = '编辑角色'
        this.showEditRole = true
      },
      roleInfoSaveSuccess(){
        this._getComTables()
      },
      _CopyComRole(){
        Object.assign(this.addRoleObj, {
          id: '',
          rolename: this.copyRoleForm.rolename,
          roletype: this.multipleSelection[0].roletype,
          rolelevel: this.multipleSelection[0].rolelevel,
          state: this.multipleSelection[0].state,
          description: this.multipleSelection[0].description
        })
        addComRoleNew(this.addRoleObj).then(res => {
          debugger
          if(res && res.data.State === REQ_OK){
            this.$message.success("复制成功")
            this.showCopyRole = false
            this._getComTables()
          }else{
            this.$message.error(`新增角色保存失败,${res.data.Error}`)
          }
        })        
      },
      // 复制保存
      saveCopy(){
        this.$refs.copyRoleForm.validate(valid => {
          if(valid){
            this._CopyComRole()
          }else {

          }
        })
      },
      // 复制取消
      cancelCopy(){
        this.showCopyRole = false
      },
      // 许可权限
      handlerPermitRights(row){
        // store 中存入 点击查看的 标识 companyRoleScanFlag
        this.$store.dispatch("setCompanyRoleScan", false)        
        this.currentRowObj = row
        this.strFlag = 'permitRights'
        this.editRoleDialogTit = '编辑许可权'
        this.showEditRole = true
      },
      // 用户/组
      handlerUserOrGroup(row){
        // store 中存入 点击查看的 标识 companyRoleScanFlag
        this.$store.dispatch("setCompanyRoleScan", false)        
        this.currentRowObj = row
        this.strFlag = 'userOrGroup'
        this.editRoleDialogTit = '编辑用户/组'
        this.showEditRole = true        
      },
      // 停用/启用
      handlerStopOrUsing(row){
        debugger           
        let statusText = row.state == 1? '停用': '启用'
        let name = row.rolename || ''
        let ids = row.id ? [row.id] : []
        let baseKey = 'plat_sysmg_sys_role'
        this.commonSetStatusMixin({
          statusText,
          name,
          ids,
          baseKey
        })
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
      // 切换tab
      handleClickTabs(tab){
        debugger
        this.queryObj.roletype = tab.name
        this._getComTables()
      },
      // 勾选/取消勾选
      handlerChangeSelect(value){
        debugger
        this.queryObj.state = value
        this._getComTables()
      },
      // 新增角色
      addNewRole(){
        debugger
        Object.assign(this.addRoleObj, {
          rolename: '',
          description: '',
          state: '1'           
        })
        this.showAddNewRole = true
      },

      // 复制角色
      copyRole(){
        this.copyRoleForm.name = ''
        this.showCopyRole = true
      },
      // 导出
      exportRole(){
        debugger
        let strJson = JSON.stringify(this.multipleSelection)
        let roletype = this.queryObj.roletype
        let state = ''
        if(  this.queryObj.state == 1 ){
          state = 0
        }else {
          state = 1
        }
        let TokenId = getToken()
        let url = `${BASE_URL}/SystemManage/getRoleList?Method=ExportSelectedComRole&TokenId=${TokenId}&UserNo=${this.userCode}&CompanyCode=${this.companyCode}&strJson=${strJson}&roletype=${roletype}&state=${state}`
        window.open(url)        
      },
      // 新增角色保存
      _addComRoleNew(){
        debugger
        addComRoleNew(this.addRoleObj).then(res => {
          debugger
          if(res && res.data.State === REQ_OK){
            this.$message.success("新增角色保存成功")
            this.showAddNewRole = false
            this._getComTables()
          }else{
            this.$message.error(`新增角色保存失败,${res.data.Error}`)
          }
        })
      },
      // 保存新增
      saveAdd(){
        debugger
        this.$refs.addRoleForm.validate(valid => {
          if(valid){
            this._addComRoleNew()
          }else {

          }
        })
      },
      // 取消新增
      cancelAdd(){
        this.showAddNewRole = false
      },
    },
  }
</script>
