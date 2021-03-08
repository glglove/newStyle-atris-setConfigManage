/
* Author: gaol
* Date: 2020/10/30
* Desc： pageSetModule  组件 - 中间部分
*/
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~common/css/variable.styl"
.middleCmp {
    width: 100%;
    height: calc(100vh - 130px);
    margin-top: 20px;
    overflow auto;
    font-size: 14px;
    background: #ffffff
    .containerBox {
        position: relative;
        height: 100%;
        padding: 20px;
        box-sizing: border-box;
        &.cmpSelected {
            border: $page-set-border
        }
    }
    .cmpItemBox:not(:first-child) {
        margin: 20px 0;
    }
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
    <div class="middleCmp">
        <div
            @dragover="overDrag($event)"
            @dragenter="enterDrag($event)"   
            @dragleave="leaveDrag($event)" 
            @drop="dropDrag($event)"        
            class="containerBox cmp-item-pagecode atris-selectable atris-hoverable"    
            @click="clickConteainerBox($event)"
            @mouseover = "mouseoverContainerBox($event)"
            data-containerBox="middleCmpContainerBox"    
            data-atriscode="pagecode"  
        >
            <!-- 配置板块——中间 -->    
            <!-- {{currentPageSetDataList}}  -->
            <el-form>
                <vuedraggable 
                    class="wrapper" 
                    v-model="currentPageSetData.currentPageSetDataList"  
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
                        style="display: inline-block;min-height: 80vh;width: 100%;"
                    >
                        <div  
                            v-for="(obj, index) in currentPageSetData.currentPageSetDataList" 
                            :key="index+1" 
                            :class="[`cmpBox_${obj.atrisCode}`, 'cmpItemBox']"
                        >
                            <!-- <el-button type="primary" size="mini">{{obj.controlName}}</el-button> -->
                            <div 
                                :class="['cmp-item',`cmp-item-${obj.atrisCode}`,'atris-selectable', 'atris-hoverable']" 
                                :data-atriscode="`${obj.atrisCode}`"
                                @click="clickCmpItem($event, obj, index)"
                                @mouseover.stop = "mouseoverCmpItem($event, obj, index)"
                            >
                                <!-- 中间部分obj: {{obj}} -->
                                <!----动态渲染当前组件---->
                                <current-component-cmp
                                    :obj.sync="obj"
                                    :isTitle="false"
                                    :isNeedGetDataSource="false"
                                    :disableFlag="true"                                    
                                >
                                </current-component-cmp>

                                <!----复制、删除----->
                                <div 
                                    :class="['cmp-item-handlerBox', `cmp-item-handler-${obj.atrisCode}`]" 
                                    :data-atriscode="`${obj.atrisCode}`"
                                >
                                    <el-tooltip effect="dark" content="复制" placement="top-start">
                                        <i class="el-icon-document-copy"
                                            @click.stop = "handlerClickCopy($event,obj, index)"
                                        ></i>
                                    </el-tooltip>
                                    <el-tooltip effect="dark" content="删除" placement="top-start">
                                        <i 
                                            class="el-icon-delete"
                                            @click.stop="handlerClickDelete($event, obj, index)"
                                        ></i>
                                    </el-tooltip>                                    
                                </div>
                            </div>
                        </div>
                    </transition-group>              
                </vuedraggable>    
            </el-form>  

            <!----最外层(页面)的复制、删除按钮----->
            <div 
                :class="['cmp-item-handlerBox', 'cmp-item-handler-pagecode']" 
                data-atriscode="pagecode"
            >
                <!-- <el-tooltip effect="dark" content="复制" placement="top-start">
                    <i class="el-icon-document-copy"
                        @click.stop = "handlerClickCopyPage($event)"
                    ></i>
                </el-tooltip> -->
                <el-tooltip effect="dark" content="删除" placement="top-start">
                    <i 
                        class="el-icon-delete"
                        @click.stop="handlerClickDeletePage($event)"
                    ></i>
                </el-tooltip>                                    
            </div>                 
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { 
        REQ_OK
    } from '@/api/config'
    import {
        // setLocalStorage,
        // getLocalStorage
    } from '@/utils/auth.js'
    import {
        getMiddleSetData
    } from '@/api/systemManage.js'
    import Vuedraggable from 'vuedraggable'
    // import { fieldControlTypeMixin } from '@/utils/newStyleMixins-components.js'
    // import BaseSimpleContainerCmp from '@/base/NewStyle-cmp/common-cmp/grid-columnContainer-cmp/simpleContainer-cmp.vue'
    import CurrentComponentCmp from './currentComponent-cmp'
    import { getGuid, getGuid2 } from '@/utils/guid.js'
    import {setLocalStorage, getLocalStorage} from '@/utils/auth.js'
    import $ from 'jquery'
    import { getCurrentHandlerDom, findEventElement, setEventElementAttributes, cancelElementAttribute } from '@/utils/dom.js'
    import { mapGetters } from 'vuex'
    import { scrollAnimation } from '@/utils/scrollAnimation.js'
    export default {
        // mixins: [ fieldControlTypeMixin ],
        props:{
            
        },
        components: {
            Vuedraggable,
            // BaseSimpleContainerCmp,
            CurrentComponentCmp,
        },
        data() {
            return {
                loading: false,
                currentPageSetData: {
                    currentPageSetDataList: []
                },
                contentCmpsList1: [],
                currentClickItemObjIndex: '',
                currentTreeClickObj: {},
            }
        },
        computed: {
            dragOptions() {
                return {
                animation: 300,
                // group: "description",
                disabled: false,
                // ghostClass: "ghost"
                }
            },
            ...mapGetters([
                'pageSetTotalData'
            ])
        },
        watch: {
            currentClickItemObjIndex: {
                handler(newValue, oldValue){
                    debugger
                    let obj = this.currentPageSetData.currentPageSetDataList[newValue]
                    this.$bus.$emit("middleClickEmit", obj, newValue)
                },
                immediate: true
            },
            'currentPageSetData.currentPageSetDataList.length': {
                handler(newValue, oldValue){
                    // 更新缓存 和 stroe中的 总配置数据
                    // this.saveCurrentPageSetData()
                    this.$bus.$emit("rightDataArr", this.currentPageSetData.currentPageSetDataList)
                }
            },          
        },
        created(){
            // this.$nextTick(() => {
                this.$bus.$on("leftClickItem", (obj, callback) => {
                    // 给 点击的 obj 添加唯一码
                    // obj.atrisCode = getGuid2()
                    // obj.atrisGuid = getGuid()    
                    this.$set(obj, 'atrisGuid', getGuid())
                    this.$set(obj, 'atrisCode', getGuid2())                                                        
                    this.currentPageSetData.currentPageSetDataList.push(JSON.parse(JSON.stringify(obj)))
                    this.currentClickItemObjIndex = (this.currentPageSetData.currentPageSetDataList.length)-1
                    this.saveCurrentPageSetData()
                    if(callback){
                        callback(obj,true)
                    }
                }),
                this.$bus.$on("progressTreeSort", (arr) => {
                    this.currentPageSetData.currentPageSetDataList = arr
                    this.saveCurrentPageSetData()
                })
                this.$bus.$on("simpleContainerEmit", () => {
                    this.simpleContainerEmit()
                })
                this.$bus.$on("progressTreeEmitClick", (data) => {
                    debugger
                    this.currentTreeClickObj = data
                    this.programTreeEmit(this.currentTreeClickObj.atrisCode)
                })
            // })
            // this.getMiddleSetData()
        },
        beforeDestroy(){
            this.$bus.$off("leftClickItem")
            this.$bus.$off("progressTreeSort")
            this.$bus.$off("simpleContainerEmit")
            this.$bus.$off("progressTreeEmitClick")
        },
        mounted () {

        },
        methods: {
            getMiddleSetData(){
                this.loading = true
                let obj = {
                    commonCode: this.objP.relateb,
                    type: 1                    
                }
                // 获取中间部分的回显数据
                getMiddleSetData(obj).then(res => {
                    this.loading = false
                    this.currentPageSetData.currentPageSetDataList = res.data.Data
                    if(this.currentPageSetData.currentPageSetDataList.length){
                        this.currentClickItemObjIndex = 0                
                    }
                })
            },
            handlerClickDeletePage(e){
                this.$confirm("确定要删除此页面?,删除后用户已填写的所有数据将一并被删除","提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(res => {
                    this.currentPageSetData = {
                        currentPageSetDataList: []
                    }
                    this.saveCurrentPageSetData()
                }).catch((err) => {

                })              
            },           
            clickConteainerBox(e){
                // $('.cmpItemBox').each(function(){
                //     console.log($(this))
                //     $(this).removeClass("cmpSelected")
                // })
                // this.addContainerBoxSelected(".containerBox", 0)
                let handlerClickDom = getCurrentHandlerDom(e)
                let $target = findEventElement($(handlerClickDom), 'atris-selectable')
                let targetCode = $target.get(0).dataset.atriscode  // 注意此时不能用下面jq的方法来取值dataset 下面取值不会实时更新，jq存的dataset在缓存中 
                // let targetCode = $target.data("atriscode")
                console.log("----点击时-------","$target, targetCode", $target, targetCode)
                if($target && targetCode) {
                    let targetStr = `.cmp-item-${targetCode}`
                    setEventElementAttributes(true, '.cmp-item-', targetCode, ['cmp-item-selected'], true)
                    $('.cmp-item-handler-' + `${targetCode}`).show()
                    cancelElementAttribute(true, this.pageSetTotalData.pageSetTotalDataList, targetCode, {
                        'cancel': {'str': '.cmp-item-', 'attr': ['cmp-item-selected']},
                        'hide': {'str': ['.cmp-item-handler-']},
                    }, true)
                }                
            },
            mouseoverContainerBox(e){
                let handlerClickDom = getCurrentHandlerDom(e)
                let $target = findEventElement($(handlerClickDom), 'atris-hoverable')
                let targetCode = $target.get(0).dataset.atriscode  // 注意此时不能用下面jq的方法来取值dataset 下面取值不会实时更新，jq存的dataset在缓存中 
                // let targetCode = $target.data("atriscode")
                console.log("$target, targetCode", $target, targetCode)
                if($target && targetCode) {
                    let targetStr = `.cmp-item-${targetCode}`
                    setEventElementAttributes(true, '.cmp-item-', targetCode, ['cmp-item-mouseover'])
                    cancelElementAttribute(true, this.pageSetTotalData.pageSetTotalDataList, targetCode, {
                        'cancel': {'str': '.cmp-item-', 'attr': ['cmp-item-mouseover']},
                    })
                }                 
            },
            // 拖起来的元素进入到目标区域中时触发事件
            enterDrag(event, sourceId) {
                // debugger
                let e = event || window.event
                e.preventDefault()
                console.log("middleSection拖拽进入到目标元素",e)   
                // e.dataTransfer.dropEffect = "copy" // 允许拖放复制    
                document.getElementsByClassName('containerBox')[0].className += ' cmpSelected'                      
            },  
            // 拖动元素在目标区域中移动时触发事件
            overDrag(event){
                // debugger
                let e = event || window.event
                e.preventDefault()
                console.log("middleSection中拖拽进行中", e)
            }, 
            // 当拖动元素离开目标区域时触发事件
            leaveDrag(event, sourceId){
                // debugger
                let e = event || window.event
                console.log("middleSection拖拽离开目标元素",e)                
                // debugger
            },                
            // 拖拽释放时                    
            dropDrag(event){
                debugger
                let e = event || window.event
                e.preventDefault();
                console.log("middleSection中拖拽释放时", e)
                // let data = JSON.parse(e.dataTransfer.getData("currentItemStr"));
                // let str = e.currentTarget.dataset.containerbox
                // if(str === 'middleCmpContainerBox'){
                //     // 释放时 是在 middle 中
                //     this.currentPageSetData.currentPageSetDataList.push(data)
                //     this.$bus.$emit("changeBadageNum", data, true)
                //     this.currentClickItemObjIndex = (this.currentPageSetData.currentPageSetDataList.length)-1
                // }
                document.getElementsByClassName('containerBox')[0].classList.remove("cmpSelected")
            }, 
            removeContainerBoxSelected() {
                $('.containerBox:eq(0)').removeClass("cmpSelected")
            },
            addContainerBoxSelected(){
                $('.containerBox:eq(0)').addClass("cmpSelected")
            },
            addCmpItemSelected(str, index){
                this.removeContainerBoxSelected()
                $(str).eq(index).siblings().removeClass("cmpSelected")
                $(str).eq(index).addClass("cmpSelected")
            },   
            removeCmpItemSelected(str, index){
            },  
            programTreeEmit(targetCode){
                debugger
                this.removeContainerBoxSelected()
                if(targetCode) {
                    let targetStr = `.cmp-item-${targetCode}`
                    setEventElementAttributes(false, '.cmp-item-', targetCode, ['cmp-item-selected'])
                    $('.cmp-item-handler-' + `${targetCode}`).show()
                    cancelElementAttribute(false, this.pageSetTotalData.pageSetTotalDataList, targetCode, {
                        'cancel': {'str': '.cmp-item-', 'attr': ['cmp-item-selected']},
                        'hide': {'str': ['.cmp-item-handler-']},
                    })

                    // 锚点定位到此
                    let top = $(targetStr).offset().top
                    $('.middleCmp').animate({scrollTop: top}, 500)
                }                
            },           
            clickCmpItem(e, obj, index){
                debugger
                // this.currentClickItemObjIndex = index
                this.removeContainerBoxSelected()
                let handlerClickDom = getCurrentHandlerDom(e)
                let $target = findEventElement($(handlerClickDom), 'atris-selectable')
                let targetCode = $target.get(0).dataset.atriscode  // 注意此时不能用下面jq的方法来取值dataset 下面取值不会实时更新，jq存的dataset在缓存中 
                // let targetCode = $target.data("atriscode")
                console.log("----点击时-------","$target, targetCode", $target, targetCode)
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
                    // obj.atrisCode = getGuid2()
                    // obj.atrisGuid = getGuid()                    
                    this.$set(obj, 'atrisGuid', getGuid())
                    this.$set(obj, 'atrisCode', getGuid2())                      
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
                // let handlerClickDom = getCurrentHandlerDom(e)
                // let $target = findEventElement($(handlerClickDom), 'atris-selectable')
                // let targetCode = $target.get(0).dataset.atriscode  // 注意此时不能用下面jq的方法来取值dataset 下面取值不会实时更新，jq存的dataset在缓存中 
                // var resultObj = {}
                // resultObj = getDataObj(this.pageSetTotalData.pageSetTotalDataList, targetCode, resultObj, false)  
                // console.log("--resultObj----",resultObj)

                // debugger
                // this.addGuid(resultObj)
                // let res = this.findKey(this.pageSetTotalData.pageSetTotalDataList, 'allCode', targetCode, resultObj, false)
                // console.log(res)
                // if(res){
                //     if(res.parentCode === 'allCode'){
                //         this.pageSetTotalData.pageSetTotalDataList.splice(++res.levelIndex, 0, resultObj)
                //     }else {
                //         this.copyData(this.pageSetTotalData.pageSetTotalDataList, res.parentCode, res.levelIndex, resultObj)
                //     }
                // }
                let newObj = JSON.parse(JSON.stringify(obj))
                this.addGuid(newObj)
                this.currentPageSetData.currentPageSetDataList.splice(++index, 0, newObj)
                this.saveCurrentPageSetData()
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
                debugger
                this.$confirm("确定要删除此组件?,删除后用户已填写的数据将一并被删除","提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(res => {
                    this.currentPageSetData.currentPageSetDataList.splice(index,1)
                    this.saveCurrentPageSetData()
                    // this.$bus.$emit("changeBadageNum", obj, false)
                    debugger
                    // let handlerClickDom = getCurrentHandlerDom(e)
                    // let $target = findEventElement($(handlerClickDom), 'atris-selectable')
                    // let targetCode = $target.get(0).dataset.atriscode  // 注意此时不能用下面jq的方法来取值dataset 下面取值不会实时更新，jq存的dataset在缓存中 
                    // var resultObj = {}
                    // resultObj = getDataObj(this.pageSetTotalData.pageSetTotalDataList, targetCode, resultObj, false)  
                    // console.log("--resultObj----",resultObj)

                    // debugger
                    // let resObj = this.findKey(this.pageSetTotalData.pageSetTotalDataList, 'allCode', targetCode, resultObj, false)
                    // console.log(res)
                    // if(resObj){
                    //     if(resObj.parentCode === 'allCode'){
                    //         this.pageSetTotalData.pageSetTotalDataList.splice(resObj.levelIndex, 1)
                    //     }else {
                    //         this.deleteData(this.pageSetTotalData.pageSetTotalDataList, resObj.parentCode, resObj.levelIndex)
                    //     }
                    // }  
                }).catch(err => {
                    // this.$message.info("删除已取消")
                })
            },  
            // 将当前中间部分配置的所有页面信息存入缓存
            saveCurrentPageSetData(){
                // 以下可以使得 拖拽完成后 template模板中绑定的 atrisCode 值
                // this.currentPageSetData.currentPageSetDataList = [].concat(this.currentPageSetData.currentPageSetDataList)
                console.log("---------------", this.currentPageSetData)
                this.$forceUpdate()   
                console.log("-------$forceUpdate后--------", this.currentPageSetData)

                setLocalStorage('currentPageSetData', JSON.stringify(this.currentPageSetData))
                // 存入 store中
                this.$store.dispatch('setPageSetDataList', this.currentPageSetData.currentPageSetDataList)
            }, 
            simpleContainerEmit(){
                this.saveCurrentPageSetData()
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
                    // obj.atrisCode = getGuid2()
                    // obj.atrisGuid = getGuid()
                    this.$set(obj, 'atrisCode', getGuid2())
                    this.$set(obj, 'atrisGuid', getGuid())
                    console.log(`vuedragable拖拽完成后${obj.controlName}添加了唯一码（atrisCode 、 atrisGuid）打印`, obj.atrisCode, obj.atrisGuid)
                }else if(evt.moved) {

                }else if(evt.removed){

                }
                // 将中间的所有数据存入缓存中
                this.saveCurrentPageSetData()
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
                console.log("---dragedAdd----", evt)
            },  
            drageUpdate(evt){
                // 排序后的更新操作
                debugger
                console.log("updated", evt)
                let evtoldIndex = evt.oldIndex;
                let evtnewIndex = evt.newIndex;
                this.currentClickItemObjIndex = evtnewIndex
                // console.log("updated", this.currentPageSetData.currentPageSetDataList)
                this.$bus.$emit("sortRightDataArr", this.currentPageSetData.currentPageSetDataList, evtnewIndex)
                // 将中间的所有数据存入缓存中
                this.saveCurrentPageSetData()
            },                       
            //start ,end ,add,update, sort, remove 得到的都差不多
            start: function (evt) {
                console.log("@@@@@@@@@@@",evt)
            },
            end(evt) {
                debugger
                console.log("拖动结束后打印contentCmpsList", this.currentPageSetData.currentPageSetDataList)
                console.log("----------------end---------------",evt)
                // evt.item //可以知道拖动的本身
                // evt.to    // 可以知道拖动的目标列表
                // evt.from  // 可以知道之前的列表
                // evt.oldIndex  // 可以知道拖动前的位置
                // evt.newIndex  // 可以知道拖动后的位置
                let oldIndex = evt.oldIndex, newIndex = evt.newIndex
                // this.$emit("middleDraggedEmitVueDraged", oldIndex, newIndex)
            }, 
            // 排序后                      
            checkMove(evt, originalEvent){
                debugger
                console.log("---排序后contentCmpsList---", this.currentPageSetData.currentPageSetDataList)
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
