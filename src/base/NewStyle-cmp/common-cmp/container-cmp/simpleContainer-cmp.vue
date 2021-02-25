<!--
    User:
    Date:
    功能: 纯容器布局组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~common/css/variable.styl"
.grid-row {
    min-height: 100px;
}
.content-layout-item{
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    align-content: space-around;
    margin: 0 2px;
    background-color: #f0f0f0;
    color: #a7b1bd;
    border: 1px solid rgba(0,0,0,0.1)
    // box-shadow: 0 1px 1px 0 rgba(0,0,0,0.1)
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

.cmpItemBox {
    margin: 20px 0;
}
.cmp-item {
    width: 100%;
    padding: 5px 10px;
    box-sizing: border-box;
    background-color: #ffffff;
    &:hover {
        // cursor: pointer;
        background-color: #f5f5f5         
    }
    &.is-active {
        background-color: #f5f5f5;
        // border-top: 1px dotted #000000;                      
        // border-bottom: 1px dotted #000000;                      
    }
    .handlerBox {
        display: none;
    }
    .item-titwrap {
        .iconwrap {
            .el-icon-document-copy, .el-icon-delete {
                &:hover {
                    cursor pointer
                }
            }
            .el-icon-document-copy {
                margin-right: 10px
            }
        }
    }
}

.cmpSelected {
    border: $page-set-border    
}

.cmpSelected {
    .handlerBox {
        position: absolute;
        display: block;
        right: 0;
        bottom: -20px;
        padding:  0 5px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background: $page-set-bgc
        color: $page-set-font
        &:hover {
            cursor: pointer;
        }
    } 
}

.cmpItemBox {
    position: relative;
    &.cmpSelected {
        border: $page-set-border           
    }
}
    
.cmpHover {
    border: $page-set-border-dot
    // .cmp-item {
    //     position: relative;
    //     .handlerBox {
    //         position: absolute;
    //         display: block;
    //         right: 0;
    //         background: $page-set-bgc
    //         color: $page-set-font
    //     }
    // }
}
</style>
<template>
    <div class="basicGrid-simpleContainer-cmp" :id="ballId">
        <!-- obj: {{obj}} -->
        <!-- <div class="marginB10">{{obj.controlName}}</div> -->
        <el-row :style="styleWidth" class="u-f grid-row">
            <el-col
                v-for="(col, key) in obj.atrisChildrenList" 
                :key="key"
                :span="col.span"
                class="content-layout-item"
                :class="obj.num[key].layoutClass" 
            >
                <!-- 列{{key+1}} -->
                <vuedraggable
                    class="draggableWrap simpleContainer-draggableWrap"
                    v-model="col.atrisChildrenList"
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
                            v-for="(itemCol, index) in col.atrisChildrenList" 
                            :key="index+1" 
                            :class="[`cmp_${itemCol.atrisCode}`, 'cmpItemBox']"  
                            @mouseover.stop="mouseoverCmpItem(obj, index)"
                            @mouseout.stop="mouseoutCmpItem(obj, index)"                          
                        >
                            <!----容器中如果又拖过来纯容器 需要递归调用本组件------->
                            <span v-if="itemCol.atrisComponentType=='grid-simple'">
                                <!-- itemCol: {{itemCol}} -->
                                <simple-container-cmp
                                    :class="`yu_${itemCol.atrisCode}`"
                                    :obj.sync="itemCol"
                                >
                                </simple-container-cmp>
                            </span>  

                            <!---容器中拖过来的不是纯容器--->
                            <span v-if="itemCol.atrisComponentType!='grid-simple'">
                                <!-- itemCol: {{itemCol}} -->
                                <!-- <component 
                                    :is="getComponentUtils(itemCol.controlType)"
                                    :obj.sync="itemCol"
                                    :isTitle="false"
                                    :isNeedGetDataSource="false"
                                    :disableFlag="true"
                                >
                                </component>   -->

                                <!----动态渲染当前组件---->
                                <current-component-cmp
                                    :class="`yu_${itemCol.atrisCode}`"
                                    :obj.sync="itemCol"
                                    :isTitle="false"
                                    :isNeedGetDataSource="false"
                                    :disableFlag="true"                                    
                                >
                                </current-component-cmp>
                            </span>   

                            <!----复制、删除----->
                            <div :class="['handlerBox', `cmp_handler_${itemCol.atrisCode}`]" >
                                <el-tooltip effect="dark" content="复制" placement="top-start">
                                    <i class="el-icon-document-copy"
                                    ></i>
                                </el-tooltip>
                                <el-tooltip effect="dark" content="删除" placement="top-start">
                                    <i 
                                        class="el-icon-delete"
                                        @click.stop="handlerClickDelete(obj, index)"
                                    ></i>
                                </el-tooltip>                                    
                            </div>
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
import CurrentComponentCmp from '@/base/NewStyle-cmp/common-cmp/pageSetModule-cmp/middleSection-cmp/currentComponent-cmp'
// import CurrentComponentCmp from './current'
import Vuedraggable from 'vuedraggable'
import $ from 'jquery'
import { 
    REQ_OK
} from '@/api/config'
import { mapGetters } from 'vuex'
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
        obj: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    components: {
        Vuedraggable,
        CurrentComponentCmp
    },
    data() {
        return {
            currentTreeClickObj: {}
        }
    },
    created(){
        this.$bus.$on("progressTreeEmitClick", (data) => {
            debugger
            this.currentTreeClickObj = data
            this.setClickStyle(this.currentTreeClickObj.atrisCode)
        })       
    },
    watch: {

    },
    destroyed(){
        this.$bus.$off("progressTreeEmitClick")
    },
    computed:{
        ballId(){
           if(this.obj.atrisCode) {
               return `${this.obj.atrisCode}`
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
        },
        ...mapGetters([
            'pageSetTotalData'
        ])
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
        mouseoverCmpItem (obj, index) {
            // $(".containerBox").eq(0).removeClass("cmpHover")
            // $(".cmpItemBox").eq(index).addClass("cmpHover").siblings().removeClass("cmpHover")
            if(obj.atrisCode){
                this.setClickStyle(obj.atrisCode)
            }
        },
        mouseoutCmpItem(obj, index){
            // $(".cmpItemBox").eq(index).removeClass("cmpHover")
            if(obj.atrisCode){
                this.cancelAllAttibute(this.pageSetTotalData.pageSetTotalDataList, obj.atrisCode, 'cmpSelected')
            }
        },                               
        //evt里面有几个值，一个evt.added 和evt.removed,evt.moved  可以分别知道移动元素的ID和删除元素的ID
        change: function (evt) {
            debugger
            console.log("vuedragable拖拽完成后打印", evt)
            if(evt.added){
                // 给拖拽后的数据对象生成  唯一码
                let obj = evt.added.element
                // this.$set(obj, 'atrisGuid', getGuid())
                // this.$set(obj, 'atrisCode', getGuid2())
                obj.atrisCode = getGuid2()
                obj.atrisGuid = getGuid()
                console.log(`vuedragable拖拽完成后${obj.controlName}添加了唯一码（atrisCode 、 atrisGuid）打印`, obj.atrisCode, obj.atrisGuid)
            }else if(evt.moved) {

            }else if(evt.removed){

            }
            // 以下可以使得 拖拽完成后 template模板中绑定的 atrisCode 值能及时绑定上去
            this.$forceUpdate()
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
            
        },
        // 取消其他所有的 cmpSelected 属性
        cancelAttribute( arr, atrisCode , str){
            debugger
            if(arr && arr.length){
                arr.forEach((item, key) => {
                    if(item.atrisCode && (item.atrisCode!== atrisCode)){
                        $(`.cmp_${item.atrisCode}`).removeClass(str)
                        $(`.cmp_handler_${item.atrisCode}`).style.display = "none"
                    }
                    // console.log($(`.cmp_${item.atrisCode}`))
                    console.log("item", item, `${item.atrisCode}`, $(`.cmp_${item.atrisCode}`))
                    if(item.atrisChildrenList && item.atrisChildrenList.length){
                        this.cancelAttribute(item.atrisChildrenList, atrisCode , str)
                    }
                })
            }
        },
        cancelAllAttibute(arr, atrisCode , str){
            if(arr && arr.length){
                arr.forEach((item, key) => {
                    if(item.atrisCode){
                        $(`.cmp_${item.atrisCode}`).removeClass(str)
                        // $(`.cmp_handler_${item.atrisCode}`).style.display = "none"
                    }
                    // console.log($(`.cmp_${item.atrisCode}`))
                    console.log("item", item, `${item.atrisCode}`, $(`.cmp_${item.atrisCode}`))
                    if(item.atrisChildrenList && item.atrisChildrenList.length){
                        this.cancelAttribute(item.atrisChildrenList, atrisCode , str)
                    }
                })
            }
        },
        setClickStyle(atrisCode){
            debugger
            console.log($(`.cmp_${atrisCode}`))
            if(atrisCode){
                $(`.cmp_${atrisCode}`).addClass("cmpSelected")
                $(`.cmp_handler_${atrisCode}`).show()
                this.cancelAttribute(this.currentPageSetDataList, atrisCode, 'cmpSelected')
            }
        },
        // 点击 复制的图标
        handlerClickCopy(obj, index){
            debugger
            // this.$emit("middleCopyEmit", obj, index)
        },
        // 点击 删除的图标
        handlerClickDelete(obj, index){
            this.$confirm("确定要删除此组件?,删除后用户已填写的数据将一并被删除","提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(res => {
                // this.currentPageSetDataList.splice(index,1)
                // this.saveCurrentPageSetData()
                this.$bus.$emit("changeBadageNum", obj, false)
            }).catch(err => {
                // this.$message.info("删除已取消")
            })
        },                        
   },
}
</script>
