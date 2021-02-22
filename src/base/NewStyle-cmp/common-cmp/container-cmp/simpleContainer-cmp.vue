<!--
    User:
    Date:
    功能: 纯容器布局组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.grid-row {
    min-height: 100px;
}
.content-layout-item{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 2px;
    background-color: #837e87;
    color: #ffffff;
    border: 1px solid red
}
</style>
<template>
    <div class="basicGrid-simpleContainer-cmp" :id="ballId">
        <!-- obj: {{obj}} -->
        <el-row :style="styleWidth" class="u-f grid-row">
            <!-- <div>{{obj.controlName}}</div> -->
            <el-col
                v-for="(col, key) in obj.atrisCols" 
                :key="key"
                :span="col.span"
                class="content-layout-item"
                :class="obj.num[key].layoutClass" 
            >
                <!-- 列{{key+1}} -->
                <vuedraggable
                    class="draggableWrap highLevel-tabSection-draggableWrap"
                    v-model="col.list"
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
                            v-for="(itemCol, index) in col.list" 
                            :key="index+1" 
                            class="cmpItemBox"
                        >
                            <!----容器中如果又拖过来纯容器 需要递归调用本组件------->
                            <span v-if="itemCol.atrisComponentType=='grid-simple'">
                                <!-- itemCol: {{itemCol}} -->
                                <simple-container-cmp
                                    :obj.sync="itemCol"
                                >
                                </simple-container-cmp>
                            </span>  

                            <!---容器中拖过来的不是纯容器--->
                            <template v-if="itemCol.atrisComponentType!='grid-simple'">
                                <component 
                                    :is="getComponentUtils(itemCol.controlType)"
                                    :obj.sync="itemCol"
                                    :isTitle="false"
                                    :isNeedGetDataSource="false"
                                    :disableFlag="true"
                                >
                                </component>  
                            </template>              
                        </div>
                    </transition-group>
                </vuedraggable>   
            </el-col>
        </el-row>
    </div>
</template>
<script type="text/ecmascript-6">
import { getComponentUtils } from '@/utils/newStyle-components-type.js'
import { getGuid, getGuid2 } from '@/utils/guid.js'
import { setLocalStorage } from '@/utils/auth.js'
import Vuedraggable from 'vuedraggable'
import { 
    REQ_OK
} from '@/api/config'
let flexMap = [
    'flex-one',
    'flex-two',
    'flex-three',
    'flex-four',
    'flex-five'
]
let flexHash = {
    'flex-one': 1,
    'flex-two': 2,
    'flex-three': 3,
    'flex-four': 4,
    'flex-five': 5
}
export default {
    name: 'simpleContainerCmp',
    props:{
        parentAtrisCode: {
            type: String,
            default: () => {
                return ''
            }
        },
        obj: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    components: {
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
        ballId(){
           if(this.parentAtrisCode && this.obj.atrisCode) {
               return `${this.parentAtrisCode}-${this.obj.atrisCode}`
           }
        },
        styleWidth(){
           return `${this.obj.atrisOptions.width}`
        // return '100%'
        },
        dragOptions() {
            return {
            animation: 500,
            // group: "description",
            disabled: false,
            // ghostClass: "ghost"
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
                obj.atrisCode = getGuid2()
                obj.atrisGuid = getGuid()
                console.log("vuedragable拖拽完成后添加了唯一码（atrisCode 、 atrisGuid）打印", obj.atrisCode, obj.atrisGuid)
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
   },
}
</script>
