<!--
    User:
    Date:
    功能:  高级组件——表布局组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.highLevel-tableSection {
    width: 100%;
    min-height: 100px;
}
</style>
<template>
    <div class="highLevel-tableSection">
        表布局组件
        <vuedraggable
            class="draggableWrap highLevel-tabSection-draggableWrap"
            v-model="tableSectionData"
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
                class="transitionGroup" 
                style="display: inline-block;min-height: 200px;width: 100%;"                
            >
                <div  
                    v-for="(obj, index) in tableSectionData" 
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

        <el-table 
            :data="tableData"
            style="width: 100%"
        >
            <el-table-column
                prop="name"
                label="姓名"
                width="180"
            ></el-table-column>
            <el-table-column
                prop="age"
                label="年龄"
            ></el-table-column>
        </el-table>           
    </div>
</template>
<script type="text/ecmascript-6">
import { 
    REQ_OK
} from '@/api/config'
import { 
    CommonInterfaceMixin
} from '@/utils/CommonInterfaceMixin'
import { getComponentUtils } from '@/utils/newStyle-components-type.js'
import Vuedraggable from 'vuedraggable'
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
        Vuedraggable,
        SearchToolsCmp,
    },
    data() {
        return {
            tableSectionData: [],
            tableData: [
                {
                    name: '张三',
                    age: 18
                },
                {
                    name: '李四',
                    age: 28
                }
            ]
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
        obj: {
            handler(newValue, oldValue) {
                this.$emit("update:obj", newValue)
            }
        }
    },
    methods:{
        getComponentUtils(controlType){
            return getComponentUtils(controlType)
        },        
        cloneFuc(obj){
            // debugger
            console.log("-----------cloneFuc----")
            return obj
        },                       
        //evt里面有几个值，一个evt.added 和evt.removed,evt.moved  可以分别知道移动元素的ID和删除元素的ID
        change: function (evt) {
            debugger
            console.log("vuedragable拖拽完成后打印", evt)
            if(evt.added){
                // 给拖拽后的数据对象生成  唯一码
                let obj = evt.added.element
                // obj.minUnicode = getGuid2(obj.controlType)
                // obj.longUnicode = getGuid(obj.controlType)
                this.$set(obj, 'longUnicode', getGuid(obj.controlType))
                this.$set(obj, 'minUnicode', getGuid2(obj.controlType))                
                console.log("vuedragable拖拽完成后添加了唯一码（minUnicode 、 longUnicode）打印", obj.minUnicode, obj.longUnicode)
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
