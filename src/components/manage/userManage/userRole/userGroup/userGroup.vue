<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——用户角色--用户组
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.userGroup
  padding 0 20px 20px 20px
  // border 1px solid red
  border-bottom 1px solid #E4E7ED
  box-sizing border-box
  .userGroupContainer
    height calc(100vh - 160px)
    .el-col
      height 100%
      border-right 1px solid #DCDFE6
      .menuTreeCmpBox
        width: 300px;
        float left        
        height 100%
        border-right none !important
        .companyMenuTree
          height 100%
      .containerBox
        margin-left 300px          
</style>

<template>
    <div class="userGroup animated fadeIn">
      <!-- treeData: {{treeData}}
      isCompanyOrSystemUser： {{isCompanyOrSystemUser}} -->
      <el-row class="userGroupContainer">
        <!---左边tree-start-->
        <el-col :span="24" class="clearfix">
          <div class="menuTreeCmpBox" v-loading="treeLoading">

            <!--企业角色组件--->
            <div class="companyMenuTree" v-if="isCompanyOrSystemUser">
 
              <company-left-menu-tree-cmp 
                ref="leftMenuTreeCmp"       
                @treeNodeClick="treeNodeClick"
              >
              </company-left-menu-tree-cmp>              
            </div>

            <!--系统角色组件--->
            <!-- <div v-else>
              <company-left-menu-tree-cmp 
                ref="leftMenuTreeCmp"         
                @treeNodeClick="treeNodeClick"
              >
              </company-left-menu-tree-cmp>                          
            </div>       -->

          </div>
          <!----左边tree---end-->         


          <!---右边设置区---START--->        
          <div class="containerBox" v-loading="tableLoading">

            <!---企业--->
            <!-- currentPcode: {{currentPcode}} -->
            <div v-if="isCompanyOrSystemUser">
              <company-menu-content-set-cmp
                ref="menuContentSetCmp" 
                :currentPcode="currentPcode"
                :currentTreeNodeObj="currentTreeNodeObj"
              ></company-menu-content-set-cmp>
            </div>
            
            <!--系统---->
            <div v-else>
              <company-menu-content-set-cmp 
                ref="menuContentSetCmp" 
                :currentPcode="currentPcode"
                :currentTreeNodeObj="currentTreeNodeObj"
              ></company-menu-content-set-cmp>
            </div> 
          </div>
          <!---右边设置区---end--->          
        </el-col>        
      </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
  import CompanyLeftMenuTreeCmp from './company-userGroup-cmp/LeftMenu-cmp'
  // import SystemLeftMenuTreeCmp from './LeftMenu-cmp'
  // import SystemMenuContentSetCmp from './MenuContentSet-cmp'
  import CompanyMenuContentSetCmp from './company-userGroup-cmp/MenuContentSet-cmp'
  import { mapGetters } from 'vuex'
  import { REQ_OK } from '@/api/config'
  let that = null
  export default {
    components: {
      CompanyLeftMenuTreeCmp,
      // SystemLeftMenuTreeCmp,
      // SystemMenuContentSetCmp,
      CompanyMenuContentSetCmp
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
    computed: {
      ...mapGetters([
        'isCompanyOrSystemUser'
      ])
    },
    created(){
    },
    methods: {
      // 树形菜单被点击
      treeNodeClick(data){
        debugger
        this.currentPcode = data.UserGroupCode
        // this.currentKeyName = data.label
        this.currentTreeNodeObj = data
      },      
    }
  }
</script>

