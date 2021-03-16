<!--
    User:
    Date: pageSetModule  组件
    功能:
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.pageSetProperty-cmp {
    height: calc(100vh - 130px);
    background: #F2F3F5;
    box-sizing:border-box;
    overflow: hidden;
    .tabWrap {
        padding: 0 10px;
    }
}
.setContainer {
    height: calc(100% - 60px);
    overflow: auto;
    padding: 0 10px 10px 10px;
    box-sizing: border-box;
}
</style>
<template>
    <div class="pageSetProperty-cmp">
        <!-- currentObj: {{currentObj}} -->
        <el-tabs class="tabWrap" v-model="activeTab" @tab-click="handleClickTab">
            <el-tab-pane label="设置" name="attrSet"></el-tab-pane>
            <el-tab-pane label="样式" name="styleSet"></el-tab-pane>
            <el-tab-pane label="高级" name="highSet"></el-tab-pane>
        </el-tabs>
        <div class="setContainer">
            <el-form :model="currentObj">
                <component
                    :is="currentAttrType(activeTab)"
                    :controlType="currentControlType"
                    :obj.sync="currentObj"
                    minUnicode="currentAtrisCode"
                ></component>
            </el-form>
        </div>
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
import AttributeSetCmp from './attrType-cmp/attribute-set/index'
import StyleSetCmp from './attrType-cmp/style-set/index'
import HighSetCmp from './attrType-cmp/high-set/index'
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
        AttributeSetCmp,
        StyleSetCmp,
        HighSetCmp
    },
    data() {
        return {
            loading: false,
            activeTab: 'attrSet',
            currentControlType: '',
            currentAtrisCode: '',
            currentObj: {}
        }
    },
    created(){
        this.$bus.$on("emitFromMiddleSection", (emitObj) => {
            // debugger
            let {
                minUnicode,
                obj,
                controlType
            } = emitObj
            this.currentControlType = controlType
            this.currentAtrisCode = minUnicode
            this.currentObj = obj
        })
        this.$bus.$on("emitFromProgramTree", (emitObj) => {
            let {
                minUnicode,
                obj,
                controlType
            } = emitObj
            this.currentControlType = controlType
            this.currentAtrisCode = minUnicode
            this.currentObj = obj            
        })
    },
    beforeDestroy(){
        this.$bus.$off("emitFromMiddleSection")
        this.$bus.$off("emitFromProgramTree")
    },
    computed:{
    },
    watch:{
    },
    methods:{
        //重新刷新获取数据
        _refreshData () {

        }, 
        currentAttrType(attrType){
            switch(attrType){
                case 'attrSet':
                 return  AttributeSetCmp;
                case 'styleSet':
                    return StyleSetCmp;
                case 'highSet':
                    return HighSetCmp;                    
                default:
                    return AttributeSetCmp
            }
        },  
        handleClickTab(tab){

        },     
    }
}
</script>
