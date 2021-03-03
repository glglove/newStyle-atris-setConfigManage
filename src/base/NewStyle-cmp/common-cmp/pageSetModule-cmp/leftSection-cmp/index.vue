<!--
    User:
    Date: pageSetModule  组件 - 左边部分
    功能:
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.el-collapse {
    max-height: calc(100vh - 150px);
    overflow: auto;
    border-bottom: none !important
}
>>>.el-collapse-item__wrap {
    padding-top: 5px;
}
>>>.el-collapse-item {
    // margin: 5px 0 5px 10px;
    &.is-active {
        box-shadow: 1px 1px 10px 1px #e8dede
    }
    // .el-collapse-item__wrap {
    //     background-color: #e8dede;
    //     padding: 10px;
    // }
}
>>>.el-button {
    // padding 10px 2px !important
}
>>>.el-collapse-item__header {
    position: relative;
    padding-left: 10px;
    display flex;
    justify-content flex-start 
    align-items center
    &:before {
        position: absolute;
        content: '';
        width: 4px;
        height: 15px;
        left: 0px;
        background-color: red
    }
}
.left-pageSetModul-cmp {
    width: 100%;
    height: calc(100vh - 170px);
    overflow: atuo;
    .topContent {
        // border-bottom: 1px solid silver;
        min-height 80vh
        padding: 0 10px;
        .item {
            width 40%
            height 40px
            margin 5px 5%;
            box-sizing: border-box;
            .badgeItem {
                width: 100%;
                .itemBtn {
                    position: relative;
                    width: 100%
                    text-align left                    
                    background rgba(249, 237, 222, 1)
                    &.click {
                        color: #409EFF
                        background: #ffffff                        
                    }
                }
            }
            .itemBtn {
                position: relative;
                width: 100%
                text-align: left
                &.click {
                    color: #409EFF
                    background: #ffffff
                }
            }            
        }
    }    
}
</style>
<template>
    <div class="left-pageSetModul-cmp">
        <div class="programTreeWrap" v-show="currentLeftNavType ===1">
            <program-tree-cmp></program-tree-cmp>
        </div>


        <div class="topContent" v-show="currentLeftNavType ===2">
            <el-tabs 
                v-model="activeTabType" 
                @tab-click="handleClickTab"
            >
                <el-tab-pane label="控件" name="1">

                </el-tab-pane>
                <el-tab-pane label="组件" name="2">

                </el-tab-pane>
            </el-tabs>
            <!-- objP: {{objP}} -->
            <el-collapse 
                :accordion="false"
                v-model="activeIndex"
                @change="collapseChange"
                v-loading="loading"
            >   
                <el-collapse-item 
                    v-for="(cmpItem, index) in cmps"
                    :key="index"
                    :name="index"
                    class="collapseItem"
                >
                    <span slot="title">
                        {{cmpItem.controlName}}
                        <i class="header-icon el-icon-info"></i>
                    </span>

                    <div class="setCmpContentBox">
                        <vuedraggable 
                            class="wrapper u-f-jst u-f-wrap" 
                            data-flag="leftFlag"
                            v-model="cmpItem.childrenList"  
                            v-bind="dragOptions"
                            :group="{
                                name:'component',
                                pull:'clone',
                                put:false
                            }" 
                            :clone="cloneFuc"
                            @change="change"
                            @start="start"
                            @end="end"                
                            :move='allow'
                        >
                            <!-- <transition-group> -->
                                <li
                                    v-for="(controlItem, index) in cmpItem.childrenList"
                                    :key="controlItem.controlType"
                                    draggable="true"
                                    :class="[`controlType-${controlItem.controlType}`, 'u-f-s1', ismultiColumnContainerFn(controlItem.controlType)? '': 'item']"    
                                    :data-itemData="JSON.stringify(controlItem)"                                         
                                >
                                    <template v-if="!ismultiColumnContainerFn(controlItem.controlType)">
                                        <el-badge 
                                            v-if="controlItem.flagNum"
                                            :value="controlItem.flagNum" 
                                            class="badgeItem"
                                        >
                                            <el-button 
                                                size="mini"
                                                @click.native="selectTag(controlItem, index)"
                                                :class="['itemBtn', 'ellipsis1', currentClickObjIndex === index ? 'click': ''] " 
                                            >
                                                {{controlItem.controlType}} - {{controlItem.controlName}} - {{controlItem.controlEnName}}
                                            </el-button>
                                        </el-badge>

                                        <el-button 
                                            v-else
                                            size="mini"
                                            @click.native="selectTag(controlItem, index)"
                                            :class="['itemBtn', 'ellipsis1', currentClickObjIndex === index ? 'click': ''] " 
                                        >
                                            {{controlItem.controlType}} - {{controlItem.controlName}} - {{controlItem.controlEnName}}
                                        </el-button>    
                                    </template>


                                    <!------分栏容器布局------->
                                    <template v-else>
                                        <left-components-by-layouts></left-components-by-layouts>                                        
                                    </template>                    
                                </li>                    
                            <!-- </transition-group> -->
                        </vuedraggable>       
                    
                    </div>
                </el-collapse-item>     
            </el-collapse> 
        </div>        
    </div>
</template>

<script>
    import { 
        REQ_OK
    } from '@/api/config'
    import { 
        getControlInfo
    } from '@/api/systemManage'
    // import { getGuid, getGuid2 } from '@/utils/guid.js'
    import { mapGetters } from 'vuex'
    import {
        // setLocalStorage,
        // getLocalStorage
    } from '@/utils/auth.js'  
    import Vuedraggable from 'vuedraggable'   
    import LeftComponentsByLayouts from './leftComponentsByLayouts' 
    import ProgramTreeCmp from './programTree-cmp'
    import { getComponentsList } from '@/api/systemManage'
    import { getComponentUtils, isContainerFn, ismultiColumnContainerFn } from '@/utils/newStyle-components-type.js'
    let that = null
    export default {
        props: {    
            objP: {
                type: Object,
                default: () => {
                    return {}
                }
            }     
        },
        components: {
            Vuedraggable,
            ProgramTreeCmp,
            LeftComponentsByLayouts
        },
        data(){
            return {
                loading: false,
                activeTabType: "1", // 1为控件 2 为 组件
                activeTabIndex: 0,
                cmps: [],
                currentClickObjIndex: '',
                activeIndex: 0,      
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
                'currentLeftNavType'
            ])           
        },
        watch: {

        },
        created(){
            that = this      
            this.initData()  
            this.$nextTick(() => {
                debugger
                this.$bus.$on("changeBadageNum", (obj, flag) => {
                    debugger
                    // let result = that.cmps.filter(item => {
                    //     return item.unicode === obj.pcode
                    // })

                    // let resArr = result[0].childrenList.filter((item, key) => {
                    //     return item.controlType === obj.controlType
                    // })
                    // that.changeBadageNum(resArr[0], flag)
                })
            })    
        },
        beforeDestroy(){
            this.offEvent()
        },
        methods: {
            offEvent(){
                this.$bus.$off("changeBadageNum")
            },
            initData(){
                this.getCmpInfo(this.activeTabType)
            },  
            ismultiColumnContainerFn(type){
                return ismultiColumnContainerFn(type)
            }, 
            getCmpInfo(tabType){
                if(tabType == 1) {
                    this.getControlInfo()
                }else if (tabType == 2) {
                    this.getComponentsList()
                }
            },                  
            cloneFuc(controlItem){
                // 处理 拖拽的元素
                debugger
                console.log("---------拖拽的元素----------", controlItem)
                // this.currentObj = controlItem
                // this.changeBadageNum(controlItem, true)    
                let obj = controlItem
                return JSON.parse(JSON.stringify(obj))       
            },
            //evt里面有两个值，一个evt.added 和evt.removed  可以分别知道移动元素的ID和删除元素的ID
            change: function (evt) {
                console.log(evt)
            },
            //start ,end ,add,update, sort, remove 得到的都差不多
            start: function (evt) {
                console.log("--start---",evt)
            },
            end(evt) {
                // debugger
                // console.log("----------------000---------------",evt)
                // evt.item //可以知道拖动的本身
                // evt.to    // 可以知道拖动的目标列表
                // evt.from  // 可以知道之前的列表
                // evt.oldIndex  // 可以知道拖动前的位置
                // evt.newIndex  // 可以知道拖动后的位置
                

            },            
            allow(evt, originalEvent){
                // debugger
                console.log(originalEvent) //鼠标位置
                console.log(evt.draggedContext.index)
                console.log(evt.draggedContext.element)
                console.log(evt.draggedContext.futureIndex)
                console.log(evt.relatedContext.index)
                console.log(evt.relatedContext.element)
                console.log(evt.relatedContext.list)
                console.log(evt.relatedContext.component)
                // 假如是左边自己的拖拽 就禁止
                if(evt.relatedContext.component && evt.relatedContext.component.$el.dataset.flag === 'leftFlag'){
                    return false
                }else {
                    return true
                }
            },    
            changeData(arr){
                if(arr && arr.length){
                    arr.forEach((item) => {
                        let itemChildrenList = item.childrenList
                        if(itemChildrenList && itemChildrenList.length){
                            this.changeData(itemChildrenList)
                        }
                        this.$set(item, 'atrisChildrenList', [])
                        this.$set(item, 'atrisComponentType', 'comonControl')
                    })
                }
            }, 
            handleClickTab(tab, event){
                debugger
                this.activeTabIndex = tab.index*1 
                this.getCmpInfo(this.activeTabType)
            },       
            getControlInfo(){
                this.loading = true
                let params = {
                    commonCode: this.objP.relateb,
                    type: 1
                }
                getControlInfo(params).then(res => {
                    this.loading = false
                    // 处理cmps
                    this.cmps = res.data.Data.records
                    // this.changeData(this.cmps)
                    // this.cmps =[gridCmps].concat(res.data.Data.records)
                })
            }, 
            getComponentsList(){
                this.loading = true
                getComponentsList().then(res => {
                    this.loading = false
                    // 处理cmps
                    this.cmps = res.data.Data.records
                    // this.changeData(this.cmps)
                })                
            },
            collapseChange(activeNames){
                debugger
            },   
            changeBadageNum(item, flag = true){
                if(flag){
                    // 加
                    item.flagNum = item.flagNum? ++item.flagNum: 1
                }else {
                    item.flagNum = item.flagNum? --item.flagNum: 0
                }
            },        
            selectTag(item, index){
                debugger
                this.$bus.$emit("leftClickItem", item, this.changeBadageNum)
                // this.changeBadageNum(item, true)
            },
            dragstart(event, sourceItem, index){
                // debugger
                let e = event || window.event
                console.log(e)
                console.log('开始拖拽');
                // e.dataTransfer.setData('currentItemStr',JSON.stringify(sourceItem))
            },
            dragend(event, sourceId, index){
                // let e = event || window.event
                // e.preventDefault()
                // console.log("拖拽结束",e)      
                // this.currentClickObjIndex = index   
                // this.changeBadageNum(sourceId, true)       
                // debugger
            },            
        }
    }
</script>
