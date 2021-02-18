<!--
    User:
    Date:
    功能:
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
<template>
    <div class="page">
        <pic-or-file-selector></pic-or-file-selector>
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
import picOrFileSelector from '@/base/NewStyle-cmp/common-cmp/picOrFileSelector-cmp/picSelector'
export default {
    mixins: [CommonInterfaceMixin],
    components: {
        SearchToolsCmp,
        picOrFileSelector
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
        _refreshData(){
        },
        _getComTables(){
        },
    }
}
</script>
