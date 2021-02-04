<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——系统配置--用户组
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.search-cmp
    width 100%
    position relative
    box-sizing border-box
    .searchTop
        // margin 5px 0 10px 0
    .item-container
        margin-top 5px
        display inline-block
        >>>.el-input
            display inline-block !important
            width 200px
        .item
            margin 2px 10px
</style>

<template>
    <div class="search-cmp">
        <!--搜索部分--start-->
        <div class="searchTop">
            <!-- currentPcode: {{currentPcode}} -->
            <div class="item-container u-f-jst">
                <!-- <span class="tit">关键词</span> -->
                <el-input 
                    class="item"
                    v-model="queryObj.username"
                    clearable
                    size="small"
                    placeholder="用户名,编号">
                </el-input>

                <el-button 
                    type="primary" 
                    size="small"
                    @click.native="clickSearchBtn"
                >搜索</el-button>    
                <!-- <el-button 
                    type="primary" 
                    size="mini" 
                    @click.native="clickResetBtn"
                >重置</el-button>     -->                                                                                                                                                                                                                                   
            </div>                      
        </div>        
        <!---搜索部分---end-->
    </div>
</template>

<script type="text/ecmascript-6">
//   import SaveFooter from '@/base/Save-footer/index'
  import  { REQ_OK } from '@/api/config'
  import { 
    getSysMenuList,
    deleteSysMenu,
    sortSysMenu,
    saveSysMenu
  }from '@/api/systemManage'
  export default {
    props:{
        // 左边树组件选中的当前菜单
        currentPcode: {
            type: String,
            default: ''
        },
        currentKeyName: {
            type: String,
            default: ''
        }
    },
    components: {
        // SaveFooter
    },
    computed: {
    },
    watch: {

    },
    data(){
      return {
        queryObj: {
            username: ''           
        },
      }
    },
    created(){

    },
    methods: {
        // 搜索
        clickSearchBtn(){
            // this._getSysMenuList()
            this.$emit("emitRefreshTable", this.queryObj)
        },
        // 重置
        clickResetBtn(){
            Object.assign(this.queryObj, {
                username: '',    
            })
            // this._getSysMenuList()
            this.$emit("emitRefreshTable", this.queryObj)
        },
    }
}
</script>


