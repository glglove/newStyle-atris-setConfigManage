<!--
    User:
    Date:
    功能: showingcomponents: link 设置  组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common-set-style.styl";
.showingcomponents-link-cmp {

}
</style>
<template>
    <div class="showingcomponents-link-cmp">
        <!-- showingcomponents: link 设置  组件 -->
        <h2 class="common-cmp-name">{{ obj.controlName }}</h2>
        <h4 class="common-type-tit">基本设置</h4>
        <ul class="common-listWrap">
            <el-form-item>
                <li class="common-item u-f-ajc">
                    <span class="common-label ellipsis1">中文内容</span>
                    <el-input
                        class="u-f-s1"
                        size="mini"
                        placeholder="链接"
                    ></el-input>
                </li>
            </el-form-item>        
            <el-form-item>
                <li class="common-item u-f-ajc">
                    <span class="common-label ellipsis1">英文内容</span>
                    <el-input
                        class="u-f-s1"
                        size="mini"
                        placeholder="链接"
                    ></el-input>
                </li>
            </el-form-item>   
            <el-form-item>
                <li class="common-item u-f-ac">
                    <span class="common-label ellipsis1">单行截断</span>
                    <el-switch
                        class="u-f-s1"
                        size="mini"
                        :inactive-value="1"
                        :active-value="0"
                    >
                    </el-switch>
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
