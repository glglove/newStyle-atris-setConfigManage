/
* Author: gaol
* Date: 2020/10/30
* Desc： 配置板块 - 中间部分
*/
<style lang="stylus" rel="stylesheet/stylus" scoped>
.middleCmp {
    width: 100%;
    font-size: 14px;
    .cmp-item {
        padding: 20px 40px;
        box-sizing: border-box;
        background-color: #ffffff;
        &:hover {
            // cursor: pointer;
            background-color: #f5f5f5            
        }
        &.is-active {
            background-color: #f5f5f5;
            border-top: 1px dotted #000000;                      
            border-bottom: 1px dotted #000000;                      
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
}
</style>
<template>
    <div class="middleCmp">
        配置板块——中间
        cmpsList: {{cmpsList}}
        <div class="containerBox marginT30">
            滑动设置部分
            {{contentCmpsList}}
            
            <vuedraggable 
                class="wrapper" 
                v-model="contentCmpsList"  
                v-bind="dragOptions"
                @change="change"
                @start="start"
                @end="end"                
                :move='allow'
            >
                <transition-group>
                    <ul  v-for="(obj, index) in contentCmpsList" :key="index+1" class="inputItemBox">
                        <!-- <el-button type="primary" size="mini">{{obj.ControlName}}</el-button> -->
                        <li 
                            :class="['cmp-item', index == currentClickItemObjIndex ? 'is-active': '']" 
                            @click="clickCmpItem(obj, index)"
                        >
                            <div class="item-titwrap u-f-jsb">
                                <span class="tit">{{obj.ControlName}}</span>
                                <span class="iconwrap">
                                    <i 
                                        class="el-icon-document-copy"
                                        @click.stop="handlerClickCopy(obj, index)"
                                    ></i>
                            
                                    <i 
                                        class="el-icon-delete"
                                        @click.stop="handlerClickDelete(obj, index)"
                                    ></i>
                                </span>
                            </div>
                            <component 
                                :is="currentCmpItemObj(obj)"
                            >
                            </component>
                        </li>
                    </ul>
                </transition-group>              
            </vuedraggable>            
        </div>
    </div>
</template>

<script>
    import { 
        REQ_OK
    } from '@/api/config'
    import { 

    } from '@/api/newStyleConfig'
    import {
        // setLocalStorage,
        // getLocalStorage
    } from '@/utils/auth.js'
    import Vuedraggable from 'vuedraggable'
    import BaseInput from './components-item-cmp/baseInput-cmp'
    export default {
        props:{
            cmpsList: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        components: {
            Vuedraggable,
            BaseInput
        },
        data(){
            return {
                contentCmpsList: null,
                currentClickItemObjIndex: 0,
                currentClickItemObj: null               
            }
        },
        computed: {
            // contentCmpsList(){
            //     return this.cmpsList
            // },
            dragOptions() {
                return {
                animation: 500,
                // group: "description",
                disabled: false,
                // ghostClass: "ghost"
                }
            }              
        },
        watch: {
            cmpsList: {
                handler(newValue, oldValue) {
                   this.contentCmpsList = newValue 
                }
            }
        },
        created(){
            
        },
        mounted () {
          
        },
        methods: {
            clickCmpItem(obj, index){
                debugger
                this.currentClickItemObjIndex = index
                this.currentClickItemObj = obj
                this.$emit("middleClickEmit", this.currentClickItemObj, index)
            },
            // 点击 复制的图标
            handlerClickCopy(obj, index){
                debugger
                this.$emit("middleCopyEmit", obj, index)
            },
            // 点击 删除的图标
            handlerClickDelete(obj, index){
                this.$confirm("确定要删除吗？","提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(res => {
                    this.$emit("middleDeleteEmit", obj, index)
                }).catch(err => {
                    // this.$message.info("删除已取消")
                })
            },            
            currentCmpItemObj(obj){
                debugger
                let ControlType = obj.ControlType
                switch(ControlType){
                    case 1:
                        return BaseInput
                    default:
                        return BaseInput   
                }
            },
            //evt里面有两个值，一个evt.added 和evt.removed  可以分别知道移动元素的ID和删除元素的ID
            change: function (evt) {
                console.log(evt)
            },
            //start ,end ,add,update, sort, remove 得到的都差不多
            start: function (evt) {
                console.log(evt)
            },
            end: function (evt) {
                debugger
                console.log(evt)
                // evt.item //可以知道拖动的本身
                // evt.to    // 可以知道拖动的目标列表
                // evt.from  // 可以知道之前的列表
                // evt.oldIndex  // 可以知道拖动前的位置
                // evt.newIndex  // 可以知道拖动后的位置
                console.log("拖动结束后打印contentCmpsList", this.contentCmpsList)
                this.$emit("middleDraggedEmit", this.contentCmpsList)
            },            
            allow(evt, originalEvent){
                console.log(originalEvent) //鼠标位置
                console.log(evt.draggedContext.index)
                console.log(evt.draggedContext.element)
                console.log(evt.draggedContext.futureIndex)
                console.log(evt.relatedContext.index)
                console.log(evt.relatedContext.element)
                console.log(evt.relatedContext.list)
                console.log(evt.relatedContext.component)
            }            
        }
    }
</script>-
