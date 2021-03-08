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
.transitionGroup-simpleContainer {
    display: block;
    width: 100%;
    min-height: 200px;
    padding: 20px 0;
    box-sizing: border-box;
    .cmpItemBox {
        margin: 10px 0;
    }
}
</style>
<template>
    <div class="highLevel-tabSection">
        <!-- obj: {{obj}} -->
        <!-- tabSectionData: {{tabSectionData}} -->
        <vuedraggable
            class="draggableWrap highLevel-tabSection-draggableWrap"
            v-model="obj.atrisChildrenList"
            v-bind="dragOptions"
            :group="{
                name:'component',
                pull: true,
                put:true                
            }"
            sort:true
            :clone="cloneFuc"
            @change="change"
            @start="start"
            @end="end"  
            @add="dragedAdd"  
            @update="drageUpdate"                              
            :move='checkMove'            
        >
            <transition-group
                class="transitionGroup-simpleContainer" 
            >
                <div  
                    v-for="(cmpObj, index) in obj.atrisChildrenList" 
                    :key="index+1" 
                    class="cmpItemBox"
                >
                    <!-- cmpObj.controlType: {{cmpObj.controlType}} -->
                    <!-- <component 
                        :is="getComponentUtils(cmpObj.controlType)"
                        :obj.sync="cmpObj"
                        :isTitle="false"
                        :isNeedGetDataSource="false"
                        :disableFlag="true"
                    >
                    </component> -->

                    <!----动态渲染当前组件---->
                    <current-component-cmp
                        :obj.sync="cmpObj"
                        :isTitle="false"
                        :isNeedGetDataSource="false"
                        :disableFlag="true"                                    
                    >
                    </current-component-cmp>                    
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
import CurrentComponentCmp from '@/base/NewStyle-cmp/common-cmp/pageSetModule-cmp/middleSection-cmp/currentComponent-cmp'
import { getGuid, getGuid2 } from '@/utils/guid.js'
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
        Vuedraggable,
        CurrentComponentCmp
    },
    data() {
        return {

        }
    },
    created(){
        this.initData()
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
        initData(){
            this.obj.atrisChildrenList = this.obj.atrisChildrenList.concat({  
                span: 24,
                controlName: "选项卡(一列容器)",      
                controlType: 2000,      
                iClass: [],
                iStyle: {},
                name: "1列布局",    
                num: [
                    {
                        iClass: [],
                        iStyle: {},
                        itemList: [],
                        layoutClass: "flex-one" 
                    }                   
                ],                       
                atrisCode: getGuid2(),
                atrisGuid: getGuid(),
                atrisIcon: '',
                atrisTitle: '选项卡(一列容器)',
                atrisComponentType: 'grid-simple',
                atrisConValue: '',
                atrisOptions: {
                    width: '100%',
                    defaultValue:'',
                    disabled: false,
                    placeholder: '',
                    required: true,
                    regEx: ''
                },                                        
                atrisChildrenList: [
                    {
                        span: 24,
                        controlName: "选项卡(一列容器)",      
                        controlType: 2000,      
                        iClass: [],
                        iStyle: {},
                        name: "1列布局",    
                        num: [
                            {
                                iClass: [],
                                iStyle: {},
                                itemList: [],
                                layoutClass: "flex-one" 
                            }                   
                        ],                       
                        atrisCode: getGuid2(),
                        atrisGuid: getGuid(),
                        atrisIcon: '',
                        atrisTitle: '选项卡(一列容器)',
                        atrisComponentType: 'grid-simple',
                        atrisConValue: '',
                        atrisOptions: {
                            width: '100%',
                            defaultValue:'',
                            disabled: false,
                            placeholder: '',
                            required: true,
                            regEx: ''
                        },   
                        atrisChildrenList: []
                    }
                ]
            })
        },
        getComponentUtils(controlType){
            return getComponentUtils(controlType)
        },
        cloneFuc(obj){
            // debugger
            console.log("-----------cloneFuc----")
            return obj
        },    
        addTabSectionCode(){
            obj.atrisChildrenList.forEach((item, key) => {
                item.atrisCode = getGuid2()
                item.atrisGuid = getGuid()
            })
        },                   
        //evt里面有几个值，一个evt.added 和evt.removed,evt.moved  可以分别知道移动元素的ID和删除元素的ID
        change: function (evt) {
            debugger
            console.log("vuedragable拖拽完成后打印", evt)
            if(evt.added){
                // 给拖拽后的选项卡数据对象生成  唯一码
                let obj = evt.added.element
                // obj.atrisCode = getGuid2()
                // obj.atrisGuid = getGuid()
                this.$set(obj, 'atrisGuid', getGuid())
                this.$set(obj, 'atrisCode', getGuid2())                
                console.log("vuedragable拖拽完成后添加了唯一码（atrisCode 、 atrisGuid）打印", obj.atrisCode, obj.atrisGuid)
                // 给选项卡里面的一列布局组件添加 唯一码
                this.addTabSectionCode(obj)
            }else if(evt.moved) {

            }else if(evt.removed){

            }
            // 触发 middleSelection-cmp/index 组件 将当前页面所有数据存入缓存中
            this.$bus.$emit("simpleContainerEmit")
            // setLocalStorage('currentPageSetDataList', JSON.stringify(this.currentPageSetDataList))
        },
        dragedAdd(evt){
            debugger
            // var itemEl = evt.item; // dragged HTMLElement
            // evt.to; // target list
            // evt.from; // previous list
            // evt.oldIndex; // tag's old index within old parent
            // evt.newIndex; // tag's new index within new parent
            // evt.clone; // the clone tag
            // evt.pullMode; // when item is in another sortable: `"clone"` if cloning, `true` if moving
            // console.log("移出子列表下标" + evt.oldIndex);
            // console.log("拖入子列表下标" + evt.newIndex);
            // this.evtoldIndex = evt.oldIndex;
            // this.evtnewIndex = evt.newIndex;
            // console.log("0000000000000000000000",JSON.parse(evt.item.dataset.itemdata))
        },  
        drageUpdate(evt){
            // 排序后的更新操作
            debugger
            console.log("updated", evt)
            let evtoldIndex = evt.oldIndex;
            let evtnewIndex = evt.newIndex;
            this.currentClickItemObjIndex = evtnewIndex
            // console.log("updated", this.currentPageSetDataList)
            this.$bus.$emit("sortRightDataArr", this.currentPageSetDataList, evtnewIndex)
            // 触发 middleSelection-cmp/index 组件 将当前页面所有数据存入缓存中
            this.$bus.$emit("simpleContainerEmit")                                

        },                       
        //start ,end ,add,update, sort, remove 得到的都差不多
        start: function (evt) {
            console.log("@@@@@@@@@@@",evt)
        },
        end(evt) {
            debugger
            console.log("----------------000---------------",evt)
            // evt.item //可以知道拖动的本身
            // evt.to    // 可以知道拖动的目标列表
            // evt.from  // 可以知道之前的列表
            // evt.oldIndex  // 可以知道拖动前的位置
            // evt.newIndex  // 可以知道拖动后的位置
            console.log("拖动结束后打印contentCmpsList", this.currentPageSetDataList)
            let oldIndex = evt.oldIndex, newIndex = evt.newIndex
            // this.$emit("middleDraggedEmitVueDraged", oldIndex, newIndex)
        }, 
        // 排序后                      
        checkMove(evt, originalEvent){
            debugger
            console.log("---排序后contentCmpsList---", this.currentPageSetDataList)
            // console.log(originalEvent) //鼠标位置
            // console.log(evt.draggedContext.index)
            // console.log(evt.draggedContext.element)
            // console.log(evt.draggedContext.futureIndex)
            // console.log(evt.relatedContext.index)
            // console.log(evt.relatedContext.element)
            // console.log(evt.relatedContext.list)
            // console.log(evt.relatedContext.component)
            // 排序后
            // console.log("---排序后打印 evt.draggedContext.futureIndex---", evt.draggedContext.futureIndex)
            // this.currentClickItemObjIndex = evt.draggedContext.futureIndex
            // 排序后
            
        }          
    }
}
</script>
