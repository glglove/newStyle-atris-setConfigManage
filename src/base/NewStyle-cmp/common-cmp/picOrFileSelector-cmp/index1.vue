<!--
    User:
    Date: newStyle 图片文件选择器
    功能:
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
<template>
    <div class="picOrFileSelectorCmp page">
        <!-- 这是 图片文件选择器1页面
        <el-tabs v-model="activeName" @tab-click="handleClickTab">
            <el-tab-pane label="图片选择器1" name="first"></el-tab-pane>
            <el-tab-pane label="文件选择器1" name="second"></el-tab-pane>
        </el-tabs> -->
        <router-view></router-view>
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
            activeName: 'first',
        }
    },
    created(){
    },
    computed:{
    },
    watch:{
        activeName: {
            handler(newValue, oldValue){
                if(newValue === 'first'){
                    this.$router.push({
                        path:'/selector1/picSelector'
                        // path: '/testPicSelector'
                    })
                }else if(newValue === 'second'){
                    this.$router.push({
                        path:'/selector1/fileSelector'
                    })
                }
            },
            immediate: true
        }
    },
    methods:{
        //重新刷新获取数据
        _refreshData () {

        },
        _getComTables(){

        },
        handleClickTab(tab, event){

        },
    }
}
</script>
