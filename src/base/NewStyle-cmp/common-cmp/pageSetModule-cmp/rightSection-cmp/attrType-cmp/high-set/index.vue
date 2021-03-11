<!--
    User:
    Date: 
    功能:pageSetModule -高级设置  组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../common-set-style.styl";
.pageSetProperty-highset-cmp {

}
</style>
<template>
    <div class="pageSetProperty-highset-cmp">
        <!-- pageSetModule - highset 属性设置  组件 -->
        obj: {{obj}}
        <h2 class="common-cmp-name">{{obj.controlName}}</h2>
        <!-- <h4 class="common-type-tit">样式设置</h4> -->
        <ul class="common-listWrap">
            <el-form-item>
                <li class="common-item u-f-ac">
                    <span class="common-label ellipsis1">唯一码</span>
                    <el-input 
                        v-model="obj.minUnicode"
                        class="u-f-s1"
                        size="mini" 
                        disabled
                    >
                    </el-input>
                </li>
            </el-form-item>
        </ul>
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
