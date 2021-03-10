<!--
    User:
    Date:
    功能: pageSetModule-attribute-input 设置  组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common-set-style.styl";
.pageSetProperty-attribute-input-cmp {

}
</style>
<template>
    <div class="pageSetProperty-attribute-input-cmp">
        input 设置  组件
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
import { mapGetters } from 'vuex'
import { getSetComponentUtils } from '@/utils/newStyle-pageset-components-type.js'
export default {
    mixins: [CommonInterfaceMixin],
    props: {
        obj: {
            type: Object,
            default: () => {
                return {}
            }
        },
        controlType: {
            type: [String, Number],
            default: () => {
                return ''
            }
        },
        atrisCode: {
            type: [String],
            default: () => {
                return ''
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
        ...mapGetters([
            'pageSetTotalData'
        ])
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
