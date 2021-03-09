<!--
    User:
    Date: pageSetModule  组件
    功能:
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.pageSetProperty-cmp {
    height: calc(100vh - 130px);
    background: #F2F3F5;
    padding: 10px;
    box-sizing:border-box;
    overflow: auto;
}
</style>
<template>
    <div class="pageSetProperty-cmp">
        <el-tabs v-model="activeTab" @tab-click="handleClickTab">
            <el-tab-pane label="属性设置" name="attr"></el-tab-pane>
            <el-tab-pane label="事件设置" name="event"></el-tab-pane>
            <!-- <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane> -->
        </el-tabs>
        <div class="setAttibuteContainer">
            <component
                :is="currentAttrType(activeTab)"
                :controlType="currentControlType"
                :obj.sync="currentObj"
                atrisCode="currentAtrisCode"
            ></component>
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
import EventSetCmp from './attrType-cmp/event-set/index'
export default {
    mixins: [CommonInterfaceMixin],
    props: {
       
    },
    components: {
        SearchToolsCmp,
        AttributeSetCmp,
        EventSetCmp
    },
    data() {
        return {
            loading: false,
            activeTab: 'attr',
            currentControlType: '',
            currentAtrisCode: '',
            currentObj: {}
        }
    },
    created(){
        this.$bus.$on("emitFromMiddleSection", (emitObj) => {
            // debugger
            let {
                atrisCode,
                obj,
                controlType
            } = emitObj
            this.currentControlType = controlType
            this.currentAtrisCode = atrisCode
            this.currentObj = obj
        })
        this.$bus.$on("emitFromProgramTree", () => {
            let {
                atrisCode,
                obj,
                controlType
            } = emitObj
            this.currentControlType = controlType
            this.currentAtrisCode = atrisCode
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
                case 'attr':
                 return  AttributeSetCmp;
                case 'event':
                    return EventSetCmp;
                default:
                    return AttributeSetCmp
            }
        },  
        handleClickTab(tab){

        },     
    }
}
</script>
