<!--
  User: gaol
  Date: 2019/11/28
  功能：平台系统设置——许可权配置 添加许可权 组件 【企业】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

<template>
    <div class="addPermitCmp">
        <!-- obj: {{obj}} -->
        <div class="btnBox">
            <el-tabs 
                v-model="activeTabName" 
                @tab-click="handleTabClick">
                <el-tab-pane 
                    label="基本信息" 
                    name="first"></el-tab-pane>
                <el-tab-pane 
                    v-if="showSetBtn"
                    label="配置" 
                    name="second"></el-tab-pane>
            </el-tabs>   
        </div>
        <!-- permitForm: {{permitForm}} -->
        <div class="content marginT10" v-show="activeTabName === 'first'">
            <el-form 
                ref="addPermitForm" 
                :model="permitForm" 
                :rules="permitFormRules"
                label-width="120px"> 
                <el-form-item
                    label="许可权名"
                    prop="permissionpackagename"
                >
                    <el-input 
                        style="width: 300px"
                        v-model="permitForm.permissionpackagename"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="编号"
                    prop="permissionpackagecode"
                >
                    <el-button
                        type="text"
                    >系统自动生成</el-button>
                </el-form-item>    

                <el-form-item
                    label="状态"
                    prop="state"
                >
                    <el-switch
                        v-model="permitForm.state"
                        :active-value= "1"
                        :inactive-value= "0"
                    >
                    </el-switch>
                </el-form-item>    

                <el-form-item
                    label="描述"
                    prop="description"
                >
                    <el-input
                        style="width: 300px"
                        type="textarea"
                        v-model="permitForm.description"
                    >
                    </el-input>
                </el-form-item>                          
            </el-form>

            <div class="footerBox">
                <save-footer @save="save" @cancel="cancel"></save-footer>
            </div>            
        </div>

        <div 
            class="content marginT10" 
            v-show="activeTabName === 'second'">
            <permit-set-cmp 
                v-if="activeTabName === 'second'"
                ref="setCmp" 
                :isScanOrEdit="true"
                :obj="addSuccessPermitObj">
            </permit-set-cmp>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import { mapGetters } from 'vuex'
    import { REQ_OK } from '@/api/config'
    import SaveFooter from '@/base/Save-footer/index'
    // import permitSetCmp from './permitSet-cmp'
    // 引入公共的
    import permitSetCmp from '@/components/manage/userManage/userRole/roleManage/company-roleManage/roleManage-cmp/permitSet-cmp'    
    import { 
        addPermissionSet
    } from '@/api/systemManage'
    export default {
        props: {

        },
        components: {
            SaveFooter,
            permitSetCmp
        },
        data(){
            return {
                loading: false, 
                activeTabName: 'first',
                currentTabIndex: 0,
                showSetBtn: false,
                addSuccessPermitObj: {
                    permissionpackagecode: ''
                },
                permitForm: {
                    permissionpackagename: '',
                    state: 1,
                    description: ''
                },
                permitFormRules: {
                    permissionpackagename: [{required: true, message: '请输入权限名称',trigger: ['blur','change']}],
                    description: [{required: true, message: '请输入描述',trigger: ['blur','change']}],
                }
            }
        },
        created(){
        },
        computed: {
            ...mapGetters([
                'companyCode'
            ])
        },
        watch: {

        },
        methods: {
            _getComTables(){

            },
            // 添加保存许可权
            _addPermissionSet(){
                debugger
                this.loading = true
                addPermissionSet(this.permitForm).then(res => {
                    this.loading = false
                    debugger
                    if(res && res.data.State === REQ_OK){
                        this.$message.success("保存成功")
                        this.addSuccessPermitObj.permissionpackagecode = res.data.Data
                        this.showSetBtn = true
                        this.activeTabName = 'second'
                        this.$emit("addPermitSuccess")
                    }else {
                        this.$message.error(`保存失败,${res.data.Error}`)
                    }
                })
            },
            // 保存
            save(){
                this.$refs.addPermitForm.validate(valid => {
                    if(valid){
                        this._addPermissionSet()
                    }else {

                    }
                })
            },
            // 取消
            cancel(){
                this.$emit("closeAddDialog")
            },
            // 切换tab
            handleTabClick(tab,event){
                debugger
                this.currentTabIndex = tab.index*1
                this.activeTabName = tab.name
            }
        }
    }
</script>

