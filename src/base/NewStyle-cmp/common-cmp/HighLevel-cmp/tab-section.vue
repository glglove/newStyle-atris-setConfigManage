<!--
    User:
    Date:
    功能:  高级组件——选项卡布局组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.highLevel-tabSection {
    width: 100%;
    min-height: 100%
}
</style>
<template>
    <div class="highLevel-tabSection">
        obj: {{obj}}
        选项卡布局组件
        tabSectionData: {{tabSectionData}}
        <vuedraggable
            class="draggableWrap highLevel-tabSection-draggableWrap"
            v-model="tabSectionData"
            v-bind="dragOptions"
            :group="{
                name:'component',
                pull:'clone',
                put:true                
            }"
        >
            <transition-group
                class="transitionGroup" 
                style="display: inline-block;min-height: 200px;width: 100%;"                
            >
                <div  
                    v-for="(obj, index) in tabSectionData" 
                    :key="index+1" 
                    class="cmpItemBox"
                >
                    <component 
                        :is="getComponentUtils(obj.controlType)"
                        :obj.sync="obj"
                        :isTitle="false"
                        :isNeedGetDataSource="false"
                        :disableFlag="true"
                    >
                    </component>                
                </div>
            </transition-group>
        </vuedraggable>
    </div>
</template>
<script type="text/ecmascript-6">
import { 
    REQ_OK
} from '@/api/config'
import Vuedraggable from 'vuedraggable'
import { 
    CommonInterfaceMixin
} from '@/utils/CommonInterfaceMixin'
import { fieldControlTypeMixin } from '@/utils/newStyleMixins-components.js'
import { getComponentUtils } from '@/utils/newStyle-components-type.js'
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
        Vuedraggable
    },
    data() {
        return {
            tabSectionData: []
        }
    },
    created(){
    },
    computed:{
        dragOptions() {
            return {
            animation: 500,
            // group: "description",
            disabled: false,
            // ghostClass: "ghost"
            }
        }         
    },
    watch:{

    },
    methods:{
        getComponentUtils(controlType){
            return getComponentUtils(controlType)
        },
    }
}
</script>
