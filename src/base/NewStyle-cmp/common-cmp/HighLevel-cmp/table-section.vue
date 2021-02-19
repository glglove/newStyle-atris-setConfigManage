<!--
    User:
    Date:
    功能:  高级组件——表布局组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
<template>
    <div class="highLevel-tableSection">
        表布局组件
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

    }
}
</script>
