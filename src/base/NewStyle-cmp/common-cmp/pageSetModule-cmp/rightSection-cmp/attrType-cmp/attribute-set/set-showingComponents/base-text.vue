<!--
    User:
    Date:
    功能: showingcomponents: text 设置  组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common-set-style.styl";
.showingcomponents-text-cmp {

}
</style>
<template>
    <div class="showingcomponents-text-cmp">
        <!-- showingcomponents: text 设置  组件 -->
        <!-- obj: {{obj}} -->
        <h2 class="common-cmp-name">{{obj.controlName}}</h2>
        <h4 class="common-type-tit">基础设置</h4>
        <ul class="common-listWrap">
            <el-form-item prop="pageSetUp.cncontent">
                <li class="common-item u-f-ajc">
                    <span class="common-label ellipsis1">中文内容</span>
                    <el-input 
                        v-model="obj.pageSetUp.cncontent"
                        class="u-f-s1"
                        size="mini" 
                        placeholder="输入中文"
                    ></el-input>
                </li>
            </el-form-item>
            <el-form-item prop="pageSetUp.encontent">
                <li class="common-item u-f-ajc">
                    <span class="common-label ellipsis1">英文内容</span>
                    <el-input 
                        v-model="obj.pageSetUp.encontent"
                        class="u-f-s1"
                        size="mini" 
                        placeholder="输入英文"
                    ></el-input>
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
        minUnicode: {
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
