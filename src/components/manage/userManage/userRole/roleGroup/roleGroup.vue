<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——用户角色--角色组 
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.roleGroup
  padding 0 20px 20px 20px
  // border 1px solid red
  border-bottom 1px solid #E4E7ED
  box-sizing border-box
  .roleGroupContainer
    height calc(100vh - 160px)
    .el-col
      height 100%
      border-right 1px solid #DCDFE6
      .menuTreeCmpBox
        width: 300px;
        float left
        height 100%
        border-right none !important
        .companyMenuTreeCmp
          height 100%
      .containerBox
        margin-left 300px

</style>

<template>
    <div class="roleGroup animated fadeIn">
      <!-- treeData: {{treeData}} -->
      <el-row class="roleGroupContainer">
        <!---左边tree-start-->
        <el-col :span="24" class="clearfix">
          <div class="menuTreeCmpBox" v-loading="treeLoading">
            <!--企业角色组组件--->
            <div class="companyMenuTreeCmp" v-if="isCompanyOrSystemUser">
              <company-left-menu-tree-cmp 
                ref="leftMenuTreeCmp"         
                @treeNodeClick="treeNodeClick"
              >
              </company-left-menu-tree-cmp>  
            </div>

            <!--系统角色组组件--->
            <div v-else>
              <company-left-menu-tree-cmp 
                ref="leftMenuTreeCmp"         
                @treeNodeClick="treeNodeClick"
              >
              </company-left-menu-tree-cmp>                          
            </div>
          </div>

          <!---右边设置区---START---> 
          <div class="containerBox" v-loading="tableLoading">
            
            <!---企业--->
            <div v-if="isCompanyOrSystemUser">
              <company-role-content-set-cmp 
                ref="menuContentSetCmp" 
                :currentTreeNodeObj="currentTreeNodeObj"
              ></company-role-content-set-cmp>
            </div>
            
            <!--系统---->
            <div v-else>
              <company-role-content-set-cmp 
                ref="menuContentSetCmp" 
                :currentTreeNodeObj="currentTreeNodeObj"
              ></company-role-content-set-cmp>
            </div> 
          </div>   
          <!---右边设置区---end--->                 
        </el-col>
        <!----左边tree---end-->          
        
      </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
  import CompanyLeftMenuTreeCmp from './company-roleGroup-cmp/LeftMenu-cmp'
  import CompanyRoleContentSetCmp from './company-roleGroup-cmp/RoleContentSet-cmp'  
  import { mapGetters } from 'vuex'
  import { 
    getSysRoleGroupTree, 
    getCompRoleGroupTree
  } from '@/api/systemManage'
  import { REQ_OK } from '@/api/config'
  export default {
    components: {
      CompanyLeftMenuTreeCmp,
      CompanyRoleContentSetCmp
    },
    data(){
      return {
        treeLoading: false, // tree组件加载loading
        tableLoading: false, // 右边table表格区的loading
        currentPcode: '',  // 选取的菜单树的MenuCode,
        currentKeyName: '',
        currentTreeNodeObj: {}, // 选取的菜单树的node对象
      }
    },
    created(){

    },
    computed: {
      ...mapGetters([
        'isCompanyOrSystemUser'
      ])
    },
    methods: {
      // 树形菜单被点击
      treeNodeClick(data){
        debugger
        this.currentPcode = data.RoleGroupCode
        // this.currentKeyName = data.label
        this.currentTreeNodeObj = data
      },
    }
  }
</script>

