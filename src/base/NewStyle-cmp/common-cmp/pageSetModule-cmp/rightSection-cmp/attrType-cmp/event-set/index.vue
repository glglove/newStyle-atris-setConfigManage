<!--
    User:
    Date: 
    功能:pageSetModule - event 属性设置  组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.pageSetProperty-event-cmp {

}
</style>
<template>
    <div class="pageSetProperty-event-cmp">
        pageSetModule - event 属性设置  组件
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
        obj: {
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
