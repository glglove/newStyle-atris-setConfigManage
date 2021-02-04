<!--
  User: gaol
  Date: 2019/11/15
  功能：平台系统设置——角色角色--角色组【企业】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.el-submenu.is-opened
    .el-submenu__title
        // background-color rgba(144,147,153,0.2)
.leftMenu-cmp
    height 100%
    padding 0 20px
    box-sizing border-box
    .groupWrap
        height calc(100% - 150px) 
        min-height 150px
        margin-top 10px
        overflow auto

</style>

<template>
    <div class="leftMenu-cmp animated fadeIn">
        <div class="searchBox u-f-ac">
            <el-input 
                placeholder="角色组" 
                clearable
                size="small"
                v-model="searchTit"
                @keyup.native="searchUserGroup">
            </el-input>
            <!-- <div class="searchBtn marginL10">
                <el-button type="primary" @click="searchUserGroup">搜索</el-button>
            </div> -->
        </div>

        <div class="addBox u-f u-f-jsb u-f-ac marginT10">
            <el-checkbox 
                v-model="queryTreeObj.state"
                :true-label="1"
                :false-label="0"
            >启用</el-checkbox>
            <el-button 
                type="primary" 
                size="mini"
                @click.native="addNewRoleGroup(1, 'outer')"
            >新增角色组
            </el-button>
        </div>

        <div :class="['groupWrap','animated', 'fadeIn', roleGroupData.length<=0? 'not_found': '']" v-loading="loading">
            <!-- roleGroupData： {{roleGroupData}} -->
            <tree-cmp
                ref="leftRoleGroupTree"
                :treeData="roleGroupData"
                @treeEmitAdd="treeEmitAdd"
                @treeEmitEdit="treeEmitEdit"                
                @getTreeData="reGetTreeDada"
            ></tree-cmp>  
            <!--分页部分-->
            <el-pagination
                @size-change="handleTreeSizeChange"
                @current-change="handleTreeCurrentChange"
                :current-page="queryTreeObj.pageNum"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="queryTreeObj.pageSize"
                layout="total, prev, pager, next"
                :total="queryTreeObj.total">
            </el-pagination>                       
        </div>

        <!---新增/编辑 组名称弹框--start-->
        <div class="newGroupBox animated fadeIn" v-if="showNewGroupDialog">
            <el-dialog
                :title="dialogTit"
                width="500px"
                :visible.sync="showNewGroupDialog"
                append-to-body
                :close-on-click-modal="false"
            >
                <el-form 
                    ref="formGroup" 
                    :model="newGroupObj" 
                    :rules="newGroupObjRules" 
                    label-width="120px">
                    <el-form-item label="角色组名" prop="rolegroupname">
                        <el-input 
                            style="width: 200px"
                            placeholder="请填写角色组名称" 
                            v-model="newGroupObj.rolegroupname">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="角色组编号">
                        <el-button  
                           type="text">
                           系统生成
                        </el-button>
                    </el-form-item>
                    <el-form-item label="描述" prop="description">
                        <el-input 
                            style="width: 200px"
                            type="textarea"
                            v-model="newGroupObj.description" 
                            autosize
                            :rows="2"
                            placeholder="请输入描述">
                        </el-input>
                    </el-form-item>       
                    <el-form-item label="状态" prop="state">
                        <el-switch
                            v-model="newGroupObj.state"
                            :active-value="1"
                            :inactive-value="0">
                        </el-switch>
                    </el-form-item>                                     

                    <!-- <div class="item u-f-ac marginB20">
                        <span class="tit u-f-g0 marginR10" 
                            style="width:100px;font-weight:bold;text-align:right">角色组名:</span>
                        <el-input 
                            placeholder="请填写角色组名称" 
                            v-model="newGroupObj.rolegroupname">
                        </el-input>
                    </div> -->
                    <!-- <div class="item u-f-ac marginB20">
                        <span class="tit u-f-g0 marginR10" 
                            style="width:100px;font-weight:bold;text-align:right">角色组编号:</span>
                        <span>系统生成</span>
                    </div>

                    <div class="item u-f-ac marginB20">
                        <span class="tit u-f-g0 marginR10" 
                            style="width:100px;font-weight:bold;text-align:right">描述:</span>
                        <el-input 
                            type="textarea"
                            v-model="newGroupObj.description" 
                            autosize
                            :rows="2"
                            placeholder="请输入描述">
                        </el-input>
                    </div>      -->

                    <!-- newGroupObj： {{newGroupObj}} -->
                    <!-- <div class="item u-f-ac marginB10">
                        <span class="tit u-f-g0 marginR10" 
                        style="width:100px;font-weight:bold;text-align:right">状态:</span>
                        <el-switch
                            v-model="newGroupObj.state"
                            active-value="1"
                            inactive-value="0">
                        </el-switch>
                    </div>                  -->
                </el-form>          

                <save-footer 
                    @save="save"
                    @cancel="cancelAddNewRoleGroup"
                ></save-footer>
            </el-dialog>
        </div>
        <!---新增/编辑 组名称弹框-end-->
    </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/index'
  import TreeCmp from './Tree-cmp'
  import  { REQ_OK } from '@/api/config'
  import { 
    getRoleGroupTree,
    saveRoleGroup ,
  }from '@/api/systemManage'
  import { mapGetters } from 'vuex';
  let treeId = 0; 
  export default {
    props:{

    },
    components: {
        SaveFooter,
        TreeCmp
    },
    data(){
      let validName = (valid, rules, callback) => {
        if( !this.newGroupObj.rolegroupname ){
            callback(new Error("名称未填写"))
        }else {
            let res = this.roleGroupData.find((item, index) => {
                if(item.Id != this.isEditingObj.Id){
                    return item.rolegroupname === this.newGroupObj.rolegroupname
                }
            })

            if(res){
                // this.$message.warning("名称重复,请重新修改")
                callback(new Error("名称重复,请重新修改"))
            }else {
                callback()
            }
        } 
      }
      return {
        loading: false, 
        searchTit: '',
        roleGroupData: [], 
        showNewGroupDialog: false, // 新增/编辑 组名称的弹框
        dialogTit: '',
        isEditOrAddGroup: '',  // 1 是 编辑 2 是新增
        isEditingObj: {},
        newGroupObj: {
            id: '',
            companycode: '',
            rolegroupcode: '',
            rolegroupname: '',
            state: 1,
            description: ''
        },
        newGroupObjRules: {
            rolegroupname: [{required: true,validator: validName, trigger: 'blur'}],
            description: [{required: true,message: '请填写描述内容', trigger: 'blur'}]
        },
        userCheckList: [],
        currentMenuObj: '',
        defaultMenuKey: '',
        queryTreeObj: {
            state: 1, // -1 全部 1 是启用 0 停用
            pageSize: 10,
            pageNum: 1,
            total: 0
        },
        addType: 'outer', // innder 表示 树形层级上面新增 outer表示 外面直接添加 树形的第一级       
        currentTreeLevelObj: {} // 新增/编辑 树形层级对象
      }
    },
    watch: {
        'queryTreeObj.state': {
            handler(newValue, oldValue) {
                if(newValue){
                    //勾选了之后 状态 传 0  -1 代表全部， 1代表启用 0 代表停用
                    this.queryTreeObj.state = 1
                    this._getRoleGroupTree( this.queryTreeObj)
                }else {
                    this.queryTreeObj.state = 0
                    this._getRoleGroupTree(this.queryTreeObj)
                }
            }
        },
        searchTit: {
            handler(newValue, oldValue){
                debugger
                console.log(this.$refs['leftRoleGroupTree'].$refs['tree'])
                this.$refs['leftRoleGroupTree'].$refs['tree'].filter(newValue)
            }
        },

    },
    created(){
        debugger
        this._getRoleGroupTree(this.queryTreeObj)       
    },
    computed: {
        ...mapGetters(['isCompanyOrSystemUser'])
    },
    methods: {
        reGetTreeDada(){
            this._getRoleGroupTree(this.queryTreeObj)
        }, 
        treeEmitAdd(obj){
            // 新增
            debugger
            this.currentTreeLevelObj = obj
            this.addNewRoleGroup(1, 'inner') // inner 表示树形层级上面新增下级  outer 表示 外面添加
        },
        treeEmitEdit(obj){
            // 编辑
            debugger
            this.currentTreeLevelObj = obj
            this.addNewRoleGroup(2, 'inner') // inner 表示树形层级上面新增下级  outer 表示 外面添加
        },                 
        //获取 角色组数据
        _getRoleGroupTree(obj){
            debugger
            this.loading = true
            getRoleGroupTree(obj).then(res => {
                this.loading = false
                if(res && res.data.State === REQ_OK){
                    // 初始化数据
                    this.roleGroupData = res.data.Data.records
                    this.queryTreeObj.total = res.data.Data.total
                    this._changedata(this.roleGroupData)
                }else {
                    this.$message({
                        type: 'error',
                        message: `获取角色组数据失败,${res.data.Error}`
                    })
                }
            }).catch(() => {

            })
        },
        // 分页--每页多少条
        handleTreeSizeChange (val) {
            this.queryTreeObj.pageSize = val
            this._getRoleGroupTree(this.queryTreeObj)
        },
        // 分页--当前页
        handleTreeCurrentChange (val) {
            this.queryTreeObj.pageNum = val
            this._getRoleGroupTree(this.queryTreeObj)
        },          
        _changedata(arr){
            debugger
            if(arr.length){
                arr.forEach((item, key) => {
                    let num = ++treeId
                    this.$set(item, 'isEditing', false) // 是否正在编辑状态
                    this.$set(item, 'changed', false)  // 是否修改过
                    this.$set(item, 'treeId', num)
                    this.$set(item, 'id', item.id)
                    this.$set(item, 'description', item.description)
                    this.$set(item, 'state', item.state)
                    item.itemRules = {required: true, message: '名称为空', trigger: ['blur', 'change']}
                    if(item.childrenList && item.childrenList.length){
                        this._changedata(item.childrenList)
                    }
                })
            }
        },         
        selectMenu(index, indexPath){
            debugger
            this.defaultMenuKey = index
            let num = index * 1
            this.currentMenuObj = this.roleGroupData[num]
            // this.$bus.$emit("currentMenuCode", this.currentMenuCode)
        },
        openMenu(index, indexPath){
            debugger
            this.defaultMenuKey = index
            let num = index * 1
            this.currentMenuObj = this.roleGroupData[num]
            // this.$bus.$emit("currentMenuCode", this.currentMenuCode)
        },
        closeMenu(index){
            debugger
            this.defaultMenuKey = index
            let num = index * 1
            this.currentMenuObj = this.roleGroupData[num]
            // this.$bus.$emit("currentMenuCode", this.currentMenuCode)
        },
        _handlerData(){
            debugger
            this.roleGroupData = this.roleGroupData.filter((item, key) => {
                return item.rolegroupname.indexOf(this.searchTit) != -1
            })
        },
        // 搜索角色组
        searchUserGroup(){

        },

        // 添加新角色组
        addNewRoleGroup(type, addType){
            debugger
            this.isEditOrAddGroup = type
            this.addType = addType
            this.dialogTit = type ===1? '新增角色组': '编辑角色组'
            if(type ===1){
                // 新增
                Object.assign(this.newGroupObj, {
                    rolegroupname: '',
                    description: '',
                    state: 1
                })
            }else {
                // 编辑
                Object.assign(this.newGroupObj, {
                    rolegroupname: this.currentTreeLevelObj.rolegroupname,
                    description: this.currentTreeLevelObj.description,
                    state: this.currentTreeLevelObj.state
                })                
            }

            this.showNewGroupDialog = true                      
        },
        // 取消新增角色组
        cancelAddNewRoleGroup(){
            Object.assign(this.newGroupObj, {
                "id": "",
                "rolegroupcode":"",
                "rolegroupname":"",
                "state":1,
                "description":" ",
                "created":null,
                "updateby":null,
                "updated":null,
                "parentcode":null,
                "deteled":null,
                "childrenList":Array[1],
                "isEditing":false,
                "changed":false,          
            })                
            this.showNewGroupDialog = false
        },
        // 新增角色组
        saveAddNewRoleGroup(){
            debugger
            if(this.addType === 'outer'){
                // 外层添加
                Object.assign(this.newGroupObj, {
                    "id": "",
                    // "rolegroupcode":"two",
                    // "rolegroupname":"组2",
                    "state":1,
                    // "description":"阿斯蒂芬 ",
                    "pcode":null,
                    "serial":null,
                    "deleted":0,
                    "created":null,
                    "updateby":null,
                    "updated":null,
                    "childrenList":[],
                    "isEditing":false,
                    "changed":true           
                })
                this._saveRoleGroup([this.newGroupObj])
            }else if(this.addType === 'inner'){
                // 树形层级上面添加/编辑
                if(this.isEditOrAddGroup === 1){
                    // 添加
                    let length = this.currentTreeLevelObj.childrenList.length
                    Object.assign(this.currentTreeLevelObj.childrenList[length-1], {
                        "id": "",
                        "rolegroupname": this.newGroupObj.rolegroupname,
                        "state": this.newGroupObj.state,
                        "description": this.newGroupObj.description,   
                    })  
                    this._saveRoleGroup([this.currentTreeLevelObj])                    
                }else {
                    // 编辑
                    Object.assign(this.currentTreeLevelObj, {
                        "rolegroupname": this.newGroupObj.rolegroupname,
                        "state": this.newGroupObj.state,
                        "description": this.newGroupObj.description,   
                    })  
                    this._saveRoleGroup([this.currentTreeLevelObj])
                }
                
            }
        },   
        // 保存
        _saveRoleGroup(arr){
            debugger
            saveRoleGroup(arr).then(res => {
                if(res && res.data.State === REQ_OK){
                    this.$message({
                        type: 'success',
                        message: '保存成功'
                    })
                    this.showNewGroupDialog = false
                    // 重新获取树形组件更新
                    this._getRoleGroupTree(this.queryTreeObj)
                }else {
                    this.$message({
                        type: 'error',
                        message: `保存失败,${res.data.Error}`
                    })
                }
            })
        },              
        handlerFocus(obj){
            debugger
        },     
        // 新增/编辑 角色组保存
        save(){
            // if( !this.newGroupObj.rolegroupname ){
            //     this.$message.warning("名称为空,请重新填写")
            //     return
            // }

            // if( !this.newGroupObj.description ){
            //     this.$message.warning("描述为空,请重新填写")
            //     return
            // }

            this.$refs.formGroup.validate(valid => {
                if(valid){
                    this.saveAddNewRoleGroup()
                }else {

                }
            }) 
        },
        // 取消新增角色组
        cancel(){
            this.showNewGroupDialog = false
        }
    }
}
</script>


