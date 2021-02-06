<!--
    User:
    Date: newStyle 图片文件选择器
    功能:
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
<template>
    <div class="picOrFileSelectorCmp">
        这是文件选择器页面路由
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
