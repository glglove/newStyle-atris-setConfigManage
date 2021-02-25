<!--
    User:
    Date: pageSetModule  组件
    功能:
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.pageSetProperty-cmp {
    height: calc(100vh - 130px);
    background: #F2F3F5;
    overflow: auto;
}
</style>
<template>
    <div class="pageSetProperty-cmp">
        fdsaf
    </div>
</template>
<script type="text/ecmascript-6">
import { 
    REQ_OK
} from '@/api/config'
import { 
    CommonInterfaceMixin
} from '@/utils/CommonInterfaceMixin'
import SearchToolsCmp from '@/base/NewStyle-cmp/common-cmp/searchTool-cmp'
export default {
    mixins: [CommonInterfaceMixin],
    props: {
        objP: {
            type: Object,
            default: () => {
                return {}
            }
        }
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
    }
}
</script>
