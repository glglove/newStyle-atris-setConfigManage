<!--
  User: gaol
  Date: 2019/11/15
  功能：平台系统设置——用户用户--用户组【企业】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.el-submenu.is-opened
    .el-submenu__title
        border-radius 5px
        // background-color rgba(144,147,153,0.2)
>>>.el-submenu__icon-arrow
    display none
.leftMenu-cmp
    height 100%
    padding 0 10px
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
                placeholder="用户组" 
                clearable
                size="small"
                v-model="searchTit"
                @keyup.native="searchUserGroup">
            </el-input>
            <!-- <div class="searchBtn marginL10">
                <el-button 
                    type="primary" 
                    @click.native="searchUserGroup"
                >搜索</el-button>
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
                @click="addNewUserGroup(1, 'outer')"
            >新增用户组</el-button>
        </div>

        <div :class="['groupWrap','animated', 'fadeIn', userGroupData.length<=0? 'not_found': '']" v-loading="loading">
            <tree-cmp
                ref="leftUserGroupTree"
                :treeData="userGroupData"
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
                layout="total,prev, pager, next"
                :total="queryTreeObj.total">
            </el-pagination>             
        </div>

        <!--新增/编辑 用户组 弹框-start-->
        <!-- showNewGroupDialog: {{showNewGroupDialog}} -->
        <div class="newGroupBox animated fadeIn" v-if="showNewGroupDialog">
            <el-dialog
                v-if="showNewGroupDialog"
                :title="dialogTit"    
                width="500px"
                :visible.sync="showNewGroupDialog"      
                :append-to-body="true"  
            >
                <el-form 
                    ref="newGroupObjForm"
                    :model="newGroupObj" 
                    :rules="newGroupObjRules" 
                    label-width="120px">
                    <el-form-item 
                        prop="usergroupname"
                        label="用户组名称"
                        class="item">
                        <el-input 
                            style="width: 200px"
                            placeholder="请填写用户组名称" 
                            v-model="newGroupObj.usergroupname">
                        </el-input>
                    </el-form-item>
                    <el-form-item 
                        label="用户组编号" 
                        class="item">
                        <span>系统生成</span>
                    </el-form-item>    
                    <el-form-item 
                        prop="description"
                        label="描述" 
                        class="item">
                        <el-input 
                            style="width: 200px"
                            type="textarea"
                            v-model="newGroupObj.description" 
                            autosize
                            :rows="2"
                            placeholder="请输入描述">
                        </el-input>
                    </el-form-item>  
                    <el-form-item 
                        label="状态"
                        prop="state"
                        class="item">
                        <el-switch
                            v-model="newGroupObj.state"
                            :active-value="1"
                            :inactive-value="0">
                        </el-switch>
                    </el-form-item>                      
                </el-form> 

                <save-footer
                    @save="save"
                    @cancel="cancelAddNewUserGroup"
                >

                </save-footer>
            </el-dialog>                          
        </div>        
        <!--新增/编辑 用户组弹框-end-->
    </div>
</template>

<script type="text/ecmascript-6">
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import TreeCmp from './Tree-cmp'
    import  { REQ_OK } from '@/api/config'
    import { 
        getUserGroupTree,
        saveUserGroup,
        SetComUserGroupState
    }from '@/api/systemManage'
    import { mapGetters } from 'vuex';
    let that = null;
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

            if( !this.newGroupObj.usergroupname ){
                callback(new Error("名称未填写"))
            }else {
                let res = this.userGroupData.find((item, index) => {
                    if(item.id != this.isEditingObj.id){
                        return item.usergroupname === this.newGroupObj.usergroupname
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
            isStopUsing: false, 
            userGroupData: [], 
            dialogTit: '',
            showNewGroupDialog: false,
            isEditOrAddGroup: '', // 1 代表新增  2 代表 编辑
            isEditingObj: {},
            newGroupObj: {
                companycode: '',
                usergroupcode: '',
                usergroupname: '',
                state: 1,
                description: '',
                updateby:'',
                updated: new Date().toLocaleDateString(),
            },
            newGroupObjRules: {
                usergroupname: [{required: true, validator: validName, trigger: 'blur'}],
                description: [{required: true, message: "请输入描述", trigger: 'blur'}],
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
                        // 勾选
                        this._changeUserGroupState(1)
                        this._getUserGroupTree(this.queryTreeObj)
                    }else {
                        // 取消勾选
                        this._changeUserGroupState(0)
                        this._getUserGroupTree(this.queryTreeObj)
                    }
                }
            },
            searchTit: {
                handler(newValue, oldValue){
                    this.$refs['leftUserGroupTree'].$refs['tree'].filter(newValue)
                }
            },

        },
        created(){
            debugger
            this._getUserGroupTree(this.queryTreeObj)
            this.$bus.$on("resetTreeActive", (userGroupCode) => {
                this.userGroupData.forEach((item,key) => {
                    if(item.usergroupcode === userGroupCode){
                        this.defaultMenuKey = userGroupCode
                    }
                })
            })
        },
        computed: {
            ...mapGetters(['isCompanyOrSystemUser'])
        },
        methods: {
            reGetTreeDada(){
                this._getUserGroupTree(this.queryTreeObj)
            },
            treeEmitAdd(obj){
                // 新增
                this.currentTreeLevelObj = obj                
                this.addNewUserGroup(1, 'inner')// inner 表示树形层级上面新增下级  outer 表示 外面添加
            },
            treeEmitEdit(obj){
                // 编辑
                this.currentTreeLevelObj = obj                
                this.addNewUserGroup(2, 'inner') // inner 表示树形层级上面新增下级  outer 表示 外面添加
            },            
            // 获取树形结构数据
            _getUserGroupTree(obj){
                debugger
                this.treeLoading = true
                getUserGroupTree(obj).then(res => {
                    this.treeLoading = false
                    if(res && res.data.State === REQ_OK){
                        debugger
                        this.userGroupData = res.data.Data.records
                        this.queryTreeObj.total = res.data.Data.total
                        this._changedata(this.userGroupData)
                        // console.log(this.treeData)
                    }else {
                        this.$message({
                            type: 'error',
                            message: `获取树形组件的数据失败,${res.data.Error}`
                        })
                    }
                }).catch(() => {

                })
            }, 
            // 分页--每页多少条
            handleTreeSizeChange (val) {
                this.queryTreeObj.pageSize = val
                this._getUserGroupTree(this.queryTreeObj)
            },
            // 分页--当前页
            handleTreeCurrentChange (val) {
                this.queryTreeObj.pageNum = val
                this._getUserGroupTree(this.queryTreeObj)
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
            // 修改 用户组状态
            _changeUserGroupState(state){
                this.queryTreeObj.state = state
            },
            //初始化数据
            initData(data){
                debugger
                if(data && data.length){
                    data.forEach((item, key) => {
                        this.$set(item, "isEditing", false)
                        this.$set(item, "EditName", '')
                    })
                }else {
                    data = []
                }
                return data
            },
            selectMenu(index, indexPath){
                debugger
                this.defaultMenuKey = index
                let num = index * 1
                this.currentMenuObj = this.userGroupData[num]
                // this.$bus.$emit("currentMenuObj", this.currentMenuObj)
            },
            openMenu(index, indexPath){
                debugger
                this.defaultMenuKey = index            
                let num = index * 1
                this.currentMenuObj = this.userGroupData[num]
                // this.$bus.$emit("currentMenuObj", this.currentMenuObj)
            },
            closeMenu(index){
                debugger
                this.defaultMenuKey = index            
                let num = index * 1
                this.currentMenuObj = this.userGroupData[num]
                // this.$bus.$emit("currentMenuObj", this.currentMenuObj)
            },
            _handlerData(){
                debugger
                this.userGroupData = this.userGroupData.filter((item, key) => {
                    return item.usergroupname.indexOf(this.searchTit) != -1
                })
            },
            // 搜索用户组
            searchUserGroup(){

            },  

            // 添加新用户组
            addNewUserGroup(type, addType){
                debugger
                // type 1 新增 2 编辑
                this.isEditOrAddGroup = type  
                this.addType = addType
                this.dialogTit = type ===1? '新增角色组': '编辑角色组'
                if(type ===1){
                    // 新增
                    Object.assign(this.newGroupObj, {
                        usergroupname: '',
                        description: '',
                        state: 1
                    })
                }else {
                    // 编辑
                    Object.assign(this.newGroupObj, {
                        usergroupname: this.currentTreeLevelObj.usergroupname,
                        description: this.currentTreeLevelObj.description,
                        state: this.currentTreeLevelObj.state
                    })                
                }        
                this.showNewGroupDialog = true
            },
            // 取消新增用户组
            cancelAddNewUserGroup(){
                Object.assign(this.newGroupObj, {
                    "id": "",
                    "usergroupcode":"",
                    "usergroupname":"",
                    "state":1,
                    "description":" ",
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
                this.showNewGroupDialog = false
            },
            // 新增用户组
            saveAddNewUserGroup(){
                debugger
                if(this.addType === 'outer'){
                    // 外层添加
                    Object.assign(this.newGroupObj, {
                        "id": "",
                        // "usergroupcode":"two",
                        // "usergroupname":"组2",
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
                    this._saveUserGroup([this.newGroupObj])
                }else if(this.addType === 'inner'){
                    debugger
                    // 树形层级上面添加/编辑
                    if(this.isEditOrAddGroup === 1){
                        // 添加
                        console.log("---------",this.newGroupObj)
                        let length = this.currentTreeLevelObj.childrenList.length
                        Object.assign(this.currentTreeLevelObj.childrenList[length-1], {
                            "id": "",
                            "usergroupname": this.newGroupObj.usergroupname,
                            "state": this.newGroupObj.state,
                            "description": this.newGroupObj.description,   
                        })  
                        this._saveUserGroup([this.currentTreeLevelObj])                    
                    }else {
                        // 编辑
                        Object.assign(this.currentTreeLevelObj, {
                            "usergroupname": this.newGroupObj.usergroupname,
                            "state": this.newGroupObj.state,
                            "description": this.newGroupObj.description,   
                        })  
                        this._saveUserGroup([this.currentTreeLevelObj])
                    }
                }
            },
            // 保存
            _saveUserGroup(arr){
                debugger
                saveUserGroup(arr).then(res => {
                    if(res && res.data.State === REQ_OK){
                        this.$message({
                            type: 'success',
                            message: '保存成功'
                        })
                        this.showNewGroupDialog = false
                        // 重新获取树形组件更新
                        this._getUserGroupTree(this.queryTreeObj)
                    }else {
                        this.$message({
                            type: 'error',
                            message: `保存失败,${res.data.Error}`
                        })
                    }
                })
            },             
            // 树形上直接新增用户组保存
            save(){
                // if( !this.newGroupObj.usergroupname ){
                //     this.$message.warning("名称为空,请重新填写")
                //     return
                // }

                // if( !this.newGroupObj.description ){
                //     this.$message.warning("描述为空,请重新填写")
                //     return
                // }

                this.$refs.newGroupObjForm.validate(valid => {
                    if(valid){
                        this.saveAddNewUserGroup()                        
                    }else {

                    }
                })            
            },
            // 取消新增用户组
            cancel(){
                this.showNewGroupDialog = false
            }
        }
}
</script>


