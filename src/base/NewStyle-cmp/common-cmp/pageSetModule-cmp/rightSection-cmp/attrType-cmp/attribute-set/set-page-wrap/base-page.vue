<!--
    User:
    Date:
    功能: page外层 设置  组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common-set-style.styl";
.page-wrap-cmp {

}
</style>
<template>
    <div class="page-wrap-cmp">
        <!-- page-wrap: page-wrap 设置  组件 -->
        <h2 common-cmp-name>{{obj.controlName}}</h2>
        <h4 class="common-type-tit">按钮显示的逻辑条件</h4>
        <ul class="common-listWrap">

            <el-form-item>
                <li class="common-item u-f-ac">
                    <span class="common-label ellipsis1">隐藏</span>
                    <el-switch 
                        class="u-f-s1"
                        size="mini" 
                        :active-value="1"
                        :inactive-value="0"
                    ></el-switch>
                </li>
            </el-form-item>

            <el-form-item>
                <li class="common-item u-f-ac">
                    <span class="common-label ellipsis1">隐藏关系类型</span>
                    <el-select 
                        class="u-f-s1"
                        size="mini" 
                        placeholder="与其他按钮有关"
                    >
                        <el-option></el-option>
                        <el-option></el-option>
                    </el-select>
                </li>
            </el-form-item>  
        </ul>     

        <h4 class="common-type-tit">按钮隐藏条件</h4>        
        <ul class="common-listWrap">
            <el-form-item>
                <!-- <li class="common-item u-f-ac">
                    <span class="common-label ellipsis1">按钮隐藏条件</span>
                    <el-select 
                        class="u-f-s1"
                        size="mini" 
                        placeholder="与其他按钮有关"
                    >
                        <el-option></el-option>
                        <el-option></el-option>
                    </el-select>
                </li> -->
                <el-table
                    :data="hideConditionData"
                >
                    <el-table-column
                        prop="condition"
                        label="条件"
                    >
                        <template slot-scoped="scoped">
                            <el-select>
                                <el-option>表/字段</el-option>
                            </el-select>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="contolType"
                        label="控件类型"
                    >
                        <template slot-scoped="scoped">
                            <span>多选下拉框</span>
                        </template>
                    </el-table-column>    

                    <el-table-column
                        prop="logicCondition"
                        label="逻辑条件"
                    >
                        <template slot-scoped="scoped">
                            <span>等于/不等于</span>
                        </template>
                    </el-table-column> 

                    <el-table-column
                        prop="logicValue"
                        label="值"
                    >
                        <template slot-scoped="scoped">
                            <span></span>
                        </template>
                    </el-table-column>    

                    <el-table-column
                        prop="logicMark"
                        label="逻辑符号"
                    >
                        <template slot-scoped="scoped">
                            <span></span>
                        </template>
                    </el-table-column>                                       

                </el-table>
            </el-form-item> 
        </ul>  

        <h4 class="common-type-tit">事件</h4>        
        <ul class="common-listWrap">
            <li class="common-item u-f-ac">
                <span class="common-label ellipsis1">加载完成前</span>
                <el-select 
                    class="u-f-s1"
                    size="mini" 
                    placeholder="事件列表"
                >
                    <el-option></el-option>
                    <el-option></el-option>
                </el-select>
            </li>     

            <li class="common-item u-f-ac">
                <span class="common-label ellipsis1">加载完成后</span>
                <el-select 
                    class="u-f-s1"
                    size="mini" 
                    placeholder="事件列表"
                >
                    <el-option></el-option>
                    <el-option></el-option>
                </el-select>
            </li>     

            <!-- <li class="common-item u-f-ac">
                <span class="common-label ellipsis1">参数接收事件</span>
                <el-select 
                    class="u-f-s1"
                    size="mini" 
                    placeholder="事件列表"
                >
                    <el-option></el-option>
                    <el-option></el-option>
                </el-select>
            </li>   

            <li class="common-item u-f-ac">
                <span class="common-label ellipsis1">页面激活</span>
                <el-select 
                    class="u-f-s1"
                    size="mini" 
                    placeholder="事件列表"
                >
                    <el-option></el-option>
                    <el-option></el-option>
                </el-select>
            </li>  -->

            <li class="common-item u-f-ac">
                <span class="common-label ellipsis1">页面离开</span>
                <el-select 
                    class="u-f-s1"
                    size="mini" 
                    placeholder="事件列表"
                >
                    <el-option></el-option>
                    <el-option></el-option>
                </el-select>
            </li>                                                          
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
