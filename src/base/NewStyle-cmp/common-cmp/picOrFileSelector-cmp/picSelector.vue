<!--
    User:
    Date: newStyle 图片文件选择器
    功能:
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.picOrFileSelectorCmp-mainWrap {
    border 1px solid #DCDFE6
}
.topHead {
    background: #F2F6FC
    border-bottom 1px solid #DCDFE6
}
.picOrFileSelectorCmp-main-container {
    min-height 400px
    background #FFFFFF
}
.main-container-leftside {
    // background #409EFF
    border-right 1px solid #DCDFE6
}
.main-container-right {
    .right-main {
        // background #C0C4CC
        border-bottom 1px solid #DCDFE6
    }
    .right-footer {
        // background #DCDFE6
    }
}
</style>
<template>
    <div class="picOrFileSelectorCmp">
        这是图片选择器路由页面
        <el-container class="picOrFileSelectorCmp-mainWrap">
            <el-header class="topHead u-f-jfd u-f-ac">
                <div class="addBtnWrap">
                    <el-popover
                        placement="bottom"
                        title="标题"
                        width="400"
                        trigger="manual"
                        v-model="showAddDialog">
                        <div class="popover-content">
                            <img-upload-cmp></img-upload-cmp>
                        </div>
                        <el-button 
                            size="mini"
                            type="primary"
                            slot="reference" 
                            @click.native="handlerClickAddBtn"
                        >添加图片</el-button>
                    </el-popover>
                </div>
            </el-header>
            <el-container class="picOrFileSelectorCmp-main-container">
                <el-aside 
                    width="150px"
                    class="main-container-leftside"
                >
                    <tag-list-cmp></tag-list-cmp>
                </el-aside>
                <el-container class="main-container-right">
                    <el-main class="right-main">
                        <item-list-cmp></item-list-cmp>
                    </el-main>
                    <el-footer class="right-footer u-f-ajc">
                        ------atris------- 图片选择器
                    </el-footer>
                </el-container>
            </el-container>
        </el-container> 



        <!-- <el-dialog
            v-if="showAddDialog"
            :title="添加图片"
            width="50%"
            hight="400px"
            :visible.sync="showAddDialog"
            append-to-body
            :close-on-click-modal="false"
        >
            <img-upload-cmp></img-upload-cmp>
        </el-dialog> -->
    </div>
</template>
<script type="text/ecmascript-6">
import { 
    REQ_OK
} from '@/api/config'
import { CommonInterfaceMixin } from '@/utils/CommonInterfaceMixin.js'
import SearchToolsCmp from '@/base/NewStyle-cmp/common-cmp/searchTool-cmp'
import TagListCmp from '@/base/NewStyle-cmp/common-cmp/picOrFileSelector-cmp/tagList-cmp'
import ItemListCmp from '@/base/NewStyle-cmp/common-cmp/picOrFileSelector-cmp/itemList-cmp'
import ImgUploadCmp from '@/base/NewStyle-cmp/common-cmp/img-upload'
export default {
    mixins: [CommonInterfaceMixin],
    props: {

    },
    components: {
        SearchToolsCmp,
        ImgUploadCmp,
        TagListCmp,
        ItemListCmp 
    },
    data() {
        return {
            showAddDialog: false,
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
        handlerClickAddBtn(){
            this.showAddDialog = !this.showAddDialog
        }
    }
}
</script>
