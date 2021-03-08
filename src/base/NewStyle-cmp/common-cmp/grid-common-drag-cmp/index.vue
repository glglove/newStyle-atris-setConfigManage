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
    .simpleContainer-draggableWrap {
        position: relative;
        &.tips {
            &:after {
                content: '请拖拽组件或者模板到这里';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 12px;
                color: rgba(0,0,0,1);
                opacity: .2;
            }
        }
    }
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
    position: relative;
    width: 100%;
    padding: 5px;
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

.cmp-item-handlerBox {
    position: absolute;
    display: none;
    right: 0;
    bottom: 0;
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

// 点击之后的样式
.cmp-item-selected {
    border: $page-set-border 
}

// moseover 之后的样式
.cmp-item-mouseover {
    border: $page-set-border-dot
}
</style>
<template>
    <div class="common-grid-drag-cmp">
        <!-- dfjksdfdfjgfkdsjgkjdgsjkdg  -->
        <!-- <div class="marginB10">{{obj.controlName}}</div> -->
        <el-row :style="styleWidth" class="u-f grid-row">
            <el-col
                :span="obj.span"
                class="content-layout-item"
            >
                <!-- 列{{key+1}} -->
                <vuedraggable
                    class="draggableWrap simpleContainer-draggableWrap"
                    :class="!obj.childrenList.length? 'tips': ''"
                    v-model="obj.childrenList"
                    v-bind="dragOptions"
                    :group="groupOption"
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
                        style="display: inline-block;min-height: 80vh;width: 100%;"
                    >
                        <div  
                            v-for="(item, index) in obj.childrenList" 
                            :key="index+1" 
                            :class="[`cmpBox_${item.atrisCode}`, 'cmpItemBox']"
                        >
                            <!-- <el-button type="primary" size="mini">{{item.controlName}}</el-button> -->
                            <div 
                                :class="['cmp-item',`cmp-item-${item.atrisCode}`,'atris-selectable', 'atris-hoverable']" 
                                :data-atriscode="`${item.atrisCode}`"
                                @click="clickCmpItem($event, item, index)"
                                @mouseover.stop = "mouseoverCmpItem($event, item, index)"
                            >
                                <!-- 中间部分obj: {{item}} -->
                                <!----动态渲染当前组件---->
                                <current-component-cmp
                                    :obj.sync="item"
                                    :isTitle="false"
                                    :isNeedGetDataSource="false"
                                    :disableFlag="true"                                    
                                >
                                </current-component-cmp>

                                <!----复制、删除----->
                                <div 
                                    :class="['cmp-item-handlerBox', `cmp-item-handler-${item.atrisCode}`]" 
                                    :data-atriscode="`${item.atrisCode}`"
                                >
                                    <el-tooltip effect="dark" content="复制" placement="top-start">
                                        <i class="el-icon-document-copy"
                                            @click.stop = "handlerClickCopy($event,item, index)"
                                        ></i>
                                    </el-tooltip>
                                    <el-tooltip effect="dark" content="删除" placement="top-start">
                                        <i 
                                            class="el-icon-delete"
                                            @click.stop="handlerClickDelete($event, item, index)"
                                        ></i>
                                    </el-tooltip>                                    
                                </div>
                            </div>
                        </div>
                    </transition-group>    
                </vuedraggable>   
            </el-col>
        </el-row>
    </div>
</template>
<script type="text/ecmascript-6">
import { getComponentUtils, isContainerFn } from '@/utils/newStyle-components-type.js'
import { getGuid, getGuid2 } from '@/utils/guid.js'
import { setLocalStorage } from '@/utils/auth.js'
import CurrentComponentCmp from '@/base/NewStyle-cmp/common-cmp/pageSetModule-cmp/middleSection-cmp/currentComponent-cmp'
// import CurrentComponentCmp from './current'
import { getCurrentHandlerDom, findEventElement, setEventElementAttributes, cancelElementAttribute, getDataObj} from '@/utils/dom.js'
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
    name: 'commonDragCmp',
    props:{
        obj: {
            type: Object,
            default: () => {
                return {}
            }
        },
        groupOption: {
            type: Object,
            default: () => {
                return {
                    name:'component',
                    pull: true,
                    put:true                
                }
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
            this.programTreeEmit(this.currentTreeClickObj.atrisCode)
        })       
    },
    watch: {

    },
    destroyed(){
        this.$bus.$off("progressTreeEmitClick")
    },
    computed:{
        styleWidth(){
            //    return `${this.obj.atrisOptions.width}`
            return 'width:100%'
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
        isContainerFn(type){
            return isContainerFn(type)
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
                this.$set(obj, 'atrisGuid', getGuid())
                this.$set(obj, 'atrisCode', getGuid2())
                // obj.atrisCode = getGuid2()
                // obj.atrisGuid = getGuid()
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
        programTreeEmit(targetCode){
            if(targetCode) {
                let targetStr = `.cmp-item-${targetCode}`
                setEventElementAttributes(false, '.cmp-item-', targetCode, ['cmp-item-selected'])
                $('.cmp-item-handler-' + `${targetCode}`).show()
                cancelElementAttribute(false, this.pageSetTotalData.pageSetTotalDataList, targetCode, {
                    'cancel': {'str': '.cmp-item-', 'attr': ['cmp-item-selected']},
                    'hide': {'str': ['.cmp-item-handler-']},
                })
            }                
        },  
        clickCmpItem(e, obj, index){
            debugger
            // this.currentClickItemObjIndex = index

            let handlerClickDom = getCurrentHandlerDom(e)
            let $target = findEventElement($(handlerClickDom), 'atris-selectable')
            let targetCode = $target.get(0).dataset.atriscode  // 注意此时不能用下面jq的方法来取值dataset 下面取值不会实时更新，jq存的dataset在缓存中 
            // let targetCode = $target.data("atriscode")            
            if($target && targetCode) {
                let targetStr = `.cmp-item-${targetCode}`
                setEventElementAttributes(false, '.cmp-item-', targetCode, ['cmp-item-selected'])
                $('.cmp-item-handler-' + `${targetCode}`).show()
                cancelElementAttribute(false, this.pageSetTotalData.pageSetTotalDataList, targetCode, {
                    'cancel': {'str': '.cmp-item-', 'attr': ['cmp-item-selected']},
                    'hide': {'str': ['.cmp-item-handler-']},
                })
            }
        },          
        mouseoverCmpItem (e, obj, index) {
            let handlerClickDom = getCurrentHandlerDom(e)
            let $target = findEventElement($(handlerClickDom), 'atris-hoverable')
            let targetCode = $target.get(0).dataset.atriscode  // 注意此时不能用下面jq的方法来取值dataset 下面取值不会实时更新，jq存的dataset在缓存中 
            // let targetCode = $target.data("atriscode")
            console.log("$target, targetCode", $target, targetCode)
            if($target && targetCode) {
                let targetStr = `.cmp-item-${targetCode}`
                setEventElementAttributes(false, '.cmp-item-', targetCode, ['cmp-item-mouseover'])
                cancelElementAttribute(false, this.pageSetTotalData.pageSetTotalDataList, targetCode, {
                    'cancel': {'str': '.cmp-item-', 'attr': ['cmp-item-mouseover']},
                })
            }               
        },
        findKey(arr, parentCode, atrisCode, resObj, flag = false){
            if(arr && arr.length){
                for(let i = 0;i< arr.length;i++){
                    let item = arr[i]
                    item.levelIndex = i
                    item.parentCode = parentCode 
                    console.log("-------------------",arr)
                    if(item.atrisCode && item.atrisCode === atrisCode){
                        resObj.parentCode = item.parentCode
                        resObj.levelIndex = item.levelIndex
                        flag = true
                        console.log("-----findkey---", resObj)
                        return resObj
                        break  
                    }else {
                        if(!flag){
                            if(item.childrenList && item.childrenList.length){
                                let res = this.findKey(item.childrenList, item.atrisCode, atrisCode, resObj, flag)
                                if(res && res.atrisCode){
                                    return res
                                    break
                                }
                            }
                        }
                    }
                }
            }else {
                return null
            }
        },
        // 添加 唯一码
        addGuid(obj){
            if(obj.atrisCode){
                obj.atrisCode = getGuid2()
                obj.atrisGuid = getGuid()
            }
            if(obj.childrenList && obj.childrenList.length){
                obj.childrenList.forEach((item) => {
                    this.addGuid(item)
                })
            }
        },
        copyData(arr, code, index, copyObj){
            let end = false
            if(arr && arr.length){
                for(let i = 0; i< arr.length;i++){
                    let  item = arr[i]
                    if(item.atrisCode && item.atrisCode === code){
                        item.childrenList.splice((index+1), 0, copyObj)
                        end = true
                        return 
                    }
                    if(!end){
                        if(item.childrenList && item.childrenList.length){
                            this.copyData(item.childrenList, code, index, copyObj)
                        }  
                    }
                }   
            }
        },
        // 点击 复制的图标
        handlerClickCopy(e, obj, index){
            debugger
            let handlerClickDom = getCurrentHandlerDom(e)
            let $target = findEventElement($(handlerClickDom), 'atris-selectable')
            let targetCode = $target.get(0).dataset.atriscode  // 注意此时不能用下面jq的方法来取值dataset 下面取值不会实时更新，jq存的dataset在缓存中 
            // let targetCode = $target.data("atriscode")            
            var resultObj = {}
            resultObj = getDataObj(this.pageSetTotalData.pageSetTotalDataList, targetCode, resultObj, false)  
            console.log("--resultObj----",resultObj)

            debugger
            this.addGuid(resultObj)
            let res = this.findKey(this.pageSetTotalData.pageSetTotalDataList, 'allCode', targetCode, resultObj, false)
            console.log(res)
            if(res){
                if(res.parentCode === 'allCode'){
                    this.pageSetTotalData.pageSetTotalDataList.splice(++res.levelIndex, 0, resultObj)
                }else {
                    this.copyData(this.pageSetTotalData.pageSetTotalDataList, res.parentCode, res.levelIndex, resultObj)
                }
            }
            this.$bus.$emit("simpleContainerEmit")

        },
        deleteData(arr, code, index){
            let end = false
            if(arr && arr.length){
                for(let i = 0; i< arr.length;i++){
                    let  item = arr[i]
                    if(item.atrisCode && item.atrisCode === code){
                        item.childrenList.splice(index, 1)
                        end = true
                        return 
                    }
                    if(!end){
                        if(item.childrenList && item.childrenList.length){
                            this.deleteData(item.childrenList, code, index)
                        }  
                    }
                }   
            }
        },
        // 点击 删除的图标
        handlerClickDelete(e, obj, index){
            this.$confirm("确定要删除此组件?,删除后用户已填写的数据将一并被删除","提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(res => {
                // this.currentPageSetDataList.splice(index,1)
                // this.saveCurrentPageSetData()
                // this.$bus.$emit("changeBadageNum", obj, false)
                debugger
                let handlerClickDom = getCurrentHandlerDom(e)
                let $target = findEventElement($(handlerClickDom), 'atris-selectable')
                let targetCode = $target.get(0).dataset.atriscode  // 注意此时不能用下面jq的方法来取值dataset 下面取值不会实时更新，jq存的dataset在缓存中 
                // let targetCode = $target.data("atriscode")            
                var resultObj = {}
                resultObj = getDataObj(this.pageSetTotalData.pageSetTotalDataList, targetCode, resultObj, false)  
                console.log("--resultObj----",resultObj)

                debugger
                let resObj = this.findKey(this.pageSetTotalData.pageSetTotalDataList, 'allCode', targetCode, resultObj, false)
                console.log(res)
                if(resObj){
                    if(resObj.parentCode === 'allCode'){
                        this.pageSetTotalData.pageSetTotalDataList.splice(resObj.levelIndex, 1)
                    }else {
                        this.deleteData(this.pageSetTotalData.pageSetTotalDataList, resObj.parentCode, resObj.levelIndex)
                    }
                }  
                this.$bus.$emit("simpleContainerEmit")              
            }).catch(err => {
                // this.$message.info("删除已取消")
            })
        },                        
   },
}
</script>
