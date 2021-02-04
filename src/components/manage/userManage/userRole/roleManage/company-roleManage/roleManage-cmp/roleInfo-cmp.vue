<!--
  User: gaol
  Date: 2019/11/28
  功能：平台系统设置——用户角色-角色管理  角色信息 组件 【企业】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.el-form
    max-height 400px
    overflow auto
</style>

<template>
    <div class="roleInfoCmp animated fadeIn">
        <!-- obj: {{obj}}
        ---- -->
        roleInfoForm: {{roleInfoForm}}
        <el-form ref="roleForm" label-width="120px" :model="roleInfoForm" :rules="roleInfoRules">
            <el-form-item label="角色名" prop="rolename">
                <el-input 
                    v-model="roleInfoForm.rolename"
                    style="width:300px"
                    placeholder="请填写角色名"
                    >
                </el-input>
            </el-form-item>
            <el-form-item label="角色编号" prop="roleid">
                <el-button type="text">{{roleInfoForm.roleid}}</el-button>
            </el-form-item>
            <el-form-item label="角色类型" prop="roletype">
                <el-select 
                    style="width:300px"
                    v-model="roleInfoForm.roletype">
                    <el-option
                        v-for="(item, key) in commonDataSourceConfig.RoleTypeEnum" 
                        :key="key"
                        :value="item.type" 
                        :label="item.des"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="角色级别" prop="rolelevel">
                <el-select 
                    style="width:300px"                
                    v-model="roleInfoForm.rolelevel">
                    <el-option
                        v-for="(item, key) in commonDataSourceConfig.RoleLevelEnum" 
                        :key="key"
                        :value="item.type" 
                        :label="item.des"
                    ></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="最大授权人数" prop="MaxAuthNum">
                <el-input
                    type="number"
                    v-model="roleInfoForm.MaxAuthNum"
                    placeholder="请填写最大授权人数"
                    style="width: 300px"
                >
                </el-input>
            </el-form-item>

            <el-form-item label="版本控制" prop="VersionRange">
                <el-select v-model="roleInfoForm.VersionRange">                  
                    <el-option
                        value="1"
                        label="初级版"
                    ></el-option>
                    <el-option
                        value="2"
                        label="中级版"
                    ></el-option>
                    <el-option
                        value="3"
                        label="高级版"
                    ></el-option>
                    <el-option
                        value="4"
                        label="白金版"
                    ></el-option>                                                            
                </el-select>
            </el-form-item>      -->

            <el-form-item label="描述" prop="description">
                <el-input 
                    v-model="roleInfoForm.description"
                    style="width: 300px"
                    type="textarea" 
                    autosize>
                </el-input>
            </el-form-item>   

            <el-form-item label="状态" prop="state">
                <el-switch 
                    v-model="roleInfoForm.state"
                    :active-value="1" 
                    :inactive-value="0">
                </el-switch> 
            </el-form-item>                
        </el-form>

        <div class="footer" v-atris-sysManageScan="{'styleBlock':'block'}">
            <save-footer @save="save" @cancel="cancel"></save-footer>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import SaveFooter from '@/base/Save-footer/index'
    import { REQ_OK } from '@/api/config'
    import { CommonInterfaceMixin } from '@/utils/CommonInterfaceMixin'
    import { 
        addComRoleNew,
        getComRole 
    } from '@/api/systemManage'
    export default {
        mixins: [CommonInterfaceMixin],
        props: {
            obj: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            strFlag: {
                type: String,
                default: 'roleInfo'
            }
        },
        components: {
            SaveFooter
        },
        data(){
            return {
                loading: false, 
                roleInfoForm: JSON.parse(JSON.stringify(this.obj)),
                roleInfoRules: {
                    rolename: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
                    roletype: [{required: true, message: '请选择角色类型', trigger: ['blur','change']}],
                    rolelevel: [{required: true, message: '请选择角色级别', trigger: 'blur'}],
                    MaxAuthNum: [{required: true, message: '请输入最大授权人数', trigger: 'blur'}],
                    VersionRange: [{required: true, message: '请选择版本', trigger: 'blur'}],
                    description: [{required: true, message: '请输入备注', trigger: 'blur'}],
                }
            }
        },
        created(){
            this._initData()
        },
        computed: {

        },
        methods: {
            _initData(){
                this.commonDataSourceListMixin()
            },
            _addComRoleNew(){
                Object.assign(this.roleInfoForm, {
                    id: this.obj.id,
                })
                addComRoleNew(this.roleInfoForm).then(res => {
                    debugger
                    if(res && res.data.State === REQ_OK){
                        this.$emit("roleInfoSaveSuccess")
                    }else{
                        this.$message.error(`编辑角色保存失败,${res.data.Error}`)
                    }
                }) 
            },
            save(){
                this.$refs.roleForm.validate(valid => {
                    if(valid){
                        this._addComRoleNew()
                    }else {

                    }
                })
            },
            cancel(){
                this.$bus.$emit("closeDialog")
            }
        }
    }
</script>

