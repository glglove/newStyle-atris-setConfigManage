<!--
    User:
    Date: newStyle 图片文件选择器
    功能:
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.topHead {
    background: silver
}
.picOrFileSelectorCmp-main-container {
    min-height 400px
}
.main-container-leftside {
    background #409EFF
}
.main-container-right {
    .right-main {
        background #C0C4CC
    }
    .right-footer {
        background #DCDFE6
    }
}
</style>
<template>
    <div class="picOrFileSelectorCmp">
        这是图片选择器路由页面
        <el-container>
            <el-header class="topHead">Header</el-header>
            <el-container class="picOrFileSelectorCmp-main-container">
                <el-aside 
                    width="200px"
                    class="main-container-leftside"
                >Aside</el-aside>
                <el-container class="main-container-right">
                    <el-main class="right-main">Main</el-main>
                    <el-footer class="right-footer">Footer</el-footer>
                </el-container>
            </el-container>
        </el-container> 
    </div>
</template>
<script type="text/ecmascript-6">
import { 
    REQ_OK
} from '@/api/config'
import { CommonInterfaceMixin } from '@/utils/CommonInterfaceMixin.js'
import SearchToolsCmp from '@/base/NewStyle-cmp/common-cmp/searchTool-cmp'
export default {
    mixins: [CommonInterfaceMixin],
    props: {

    },
    components: {
        SearchToolsCmp,
    },
    data() {
        return {
        }
    },
    created(){
    },
    computed:{
    },
    watch:{
    },
    methods:{
        //重新刷新获取数据
        _refreshData () {

        },
        _getComTables(){

        },
    }
}
</script>
