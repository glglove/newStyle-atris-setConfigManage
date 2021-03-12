<!--
    User:
    Date: 
    功能:pageSetModule - styleset 样式设置  组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../common-set-style.styl";
.pageSetProperty-styleset-cmp {

}
</style>
<template>
    <div class="pageSetProperty-styleset-cmp">
        <!-- pageSetModule - styleset 样式设置 组件 -->
        <!-- obj: {{obj}} -->
        <h2 common-cmp-name>{{obj.controlName}}</h2>
        <h4 class="common-type-tit">样式设置</h4>
        <ul class="common-listWrap">
            <el-form-item prop="pageStyle.widthPx">
                <li class="common-item u-f-ac">
                    <span class="common-label ellipsis1">宽</span>
                    <el-input 
                        v-model="obj.pageStyle.widthPx"
                        class="u-f-s1"
                        size="mini" 
                        type="number"
                        clearable
                        placeholder="输入宽"
                    >
                        <template slot="append">px</template>
                    </el-input>
                </li>
            </el-form-item>
            <el-form-item prop="pageStyle.heightPx">
                <li class="common-item u-f-ac">
                    <span class="common-label ellipsis1">高</span>
                    <el-input 
                        v-model="obj.pageStyle.heightPx"
                        class="u-f-s1"
                        size="mini" 
                        placeholder="设置高"
                        type="number"
                        clearable
                    >
                        <template slot="append">px</template>
                    </el-input>
                </li> 
            </el-form-item>               
        </ul>
        <h4 class="marginT20">定位</h4>
        <ul class="common-listWrap">
            <el-form-item prop="pageStyle.topPx">
                <li class="common-item u-f-ac">
                    <span class="common-label ellipsis1">距离顶部</span>
                    <el-input 
                        v-model="obj.pageStyle.topPx"
                        class="u-f-s1"
                        size="mini" 
                        placeholder="距离顶部"
                        type="number"
                        clearable                        
                    >
                        <template slot="append">px</template>
                    </el-input>
                </li>
            </el-form-item>
            <el-form-item prop="pageStyle.bottom">
                <li class="common-item u-f-ac">
                    <span class="common-label ellipsis1">距离下部</span>
                    <el-input 
                        v-model="obj.pageStyle.bottom"
                        class="u-f-s1"
                        size="mini" 
                        placeholder="距离下部"
                        type="number"
                        clearable                        
                    >
                        <template slot="append">px</template>                    
                    </el-input>
                </li> 
            </el-form-item>    
            <el-form-item prop="pageStyle.leftPx">
                <li class="common-item u-f-ac">
                    <span class="common-label ellipsis1">距离左边</span>
                    <el-input 
                        v-model="obj.pageStyle.leftPx"
                        class="u-f-s1"
                        size="mini" 
                        placeholder="距离左边"
                        type="number"
                        clearable                        
                    >
                        <template slot="append">px</template>                    
                    </el-input>
                </li> 
            </el-form-item>   
            <el-form-item prop="pageStyle.rightPx">
                <li class="common-item u-f-ac">
                    <span class="common-label ellipsis1">距离右边</span>
                    <el-input 
                        v-model="obj.pageStyle.rightPx"
                        class="u-f-s1"
                        size="mini" 
                        placeholder="距离右边"
                        type="number"
                        clearable                        
                    >
                        <template slot="append">px</template>                    
                    </el-input>
                </li> 
            </el-form-item>                                      
        </ul>  

        <h4 class="marginT20">文字</h4>
        <ul class="common-listWrap">
            <el-form-item prop="pageStyle.fontSize">
                <li class="common-item u-f-ac">
                    <span class="common-label ellipsis1">字体大小</span>
                    <el-input 
                        v-model="obj.pageStyle.fontSize"
                        class="u-f-s1"
                        size="mini" 
                        placeholder="字体大小"
                        type="number"
                        clearable                        
                    >
                        <template slot="append">px</template> 
                    </el-input>
                </li>
            </el-form-item>

            <el-form-item prop="pageStyle.fontColor">
                <li class="common-item u-f-ac">
                    <span class="common-label ellipsis1">字体颜色</span>
                    <el-input 
                        v-model="obj.pageStyle.fontColor"
                        class="u-f-s1"
                        size="mini" 
                        placeholder="字体颜色"
                        clearable                        
                    ></el-input>
                </li> 
            </el-form-item>

            <el-form-item prop="pageStyle.fontIsWeith">
                <li class="common-item u-f-ac">
                    <span class="common-label ellipsis1">字体加粗</span>
                    <el-switch 
                        v-model="obj.pageStyle.fontIsWeith"
                        class="u-f-s1"
                        size="mini" 
                        :active-value="1"
                        :inactive-value="0"
                    ></el-switch>
                </li>   
            </el-form-item>   

            <el-form-item prop="pageStyle.fontIsItalic">
                <li class="common-item u-f-ac">
                    <span class="common-label ellipsis1">字体斜体</span>
                    <el-switch 
                        v-model="obj.pageStyle.fontIsItalic"
                        class="u-f-s1"
                        size="mini" 
                        :active-value="1"
                        :inactive-value="0"
                    ></el-switch>
                </li>   
            </el-form-item>  

            <el-form-item prop="pageStyle.fontIsUnderline">
                <li class="common-item u-f-ac">
                    <span class="common-label ellipsis1">下划线</span>
                    <el-switch 
                        v-model="obj.pageStyle.fontIsUnderline"
                        class="u-f-s1"
                        size="mini" 
                        :active-value="1"
                        :inactive-value="0"
                    ></el-switch>
                </li>   
            </el-form-item> 
            <el-form-item>
                <li class="common-item u-f-ac">
                    <span class="common-label ellipsis1">水平位置</span>
                    <el-radio label="1">左</el-radio>
                    <el-radio label="2">中</el-radio>
                    <el-radio label="3">右</el-radio>
                </li> 
            </el-form-item>                                                                        
        </ul>      
        <h4 class="marginT20">背景</h4>
        <ul class="common-listWrap">
            <el-form-item prop="pageStyle.backgroundColor">
                <li class="common-item u-f-ac">
                    <span class="common-label ellipsis1">背景色</span>
                    <el-input 
                        v-model="obj.pageStyle.backgroundColor"
                        class="u-f-s1"
                        size="mini" 
                        placeholder="背景色"
                        clearable                        
                    ></el-input>
                </li>
            </el-form-item>
            <el-form-item prop="pageStyle.backgroundUrl">
                <li class="common-item u-f-ac">
                    <span class="common-label ellipsis1">背景图</span>
                    <el-input 
                        v-model="obj.pageStyle.backgroundUrl"
                        class="u-f-s1"
                        size="mini" 
                        placeholder="背景图"
                        clearable                        
                    ></el-input>
                </li> 
            </el-form-item>  
        </ul>    
        <h4 class="marginT20">边框</h4>
        <ul class="common-listWrap">
            <el-form-item>
                <li class="common-item u-f-ac">
                    <span class="common-label ellipsis1">边框样式</span>
                    <el-select 
                        class="u-f-s1"
                        size="mini" 
                        placeholder="边框样式"
                    >
                        <el-option>实线</el-option>
                        <el-option>虚线</el-option>
                    </el-select>
                </li>
            </el-form-item>
            <el-form-item prop="pageStyle.borderWidth">
                <li class="common-item u-f-ac">
                    <span class="common-label ellipsis1">宽度</span>
                    <el-input 
                        v-model="obj.pageStyle.borderWidth"
                        class="u-f-s1"
                        size="mini" 
                        placeholder="宽度"
                        type="number"
                        clearable                        
                    >
                        <template slot="append">px</template> 
                    </el-input>
                </li>  
            </el-form-item>
            <el-form-item prop="pageStyle.borderColor">
                <li class="common-item u-f-ac">
                    <span class="common-label ellipsis1">颜色</span>
                    <el-input 
                        v-model="obj.pageStyle.borderColor"
                        class="u-f-s1"
                        size="mini" 
                        placeholder="颜色"
                        clearable                        
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
