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
            cursor: pointer;
            background-color: #f5f5f5            
        }
        &.is-active {
            background-color: #f5f5f5;
            border-top: 1px dotted #000000;                      
            border-bottom: 1px dotted #000000;                      
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
            
            <vuedraggable class="wrapper" v-model="contentCmpsList"  v-bind="dragOptions">
                <transition-group>
                    <ul  v-for="(obj, index) in contentCmpsList" :key="index+1" class="inputItemBox">
                        <!-- <el-button type="primary" size="mini">{{obj.ControlName}}</el-button> -->
                        <li 
                            :class="['cmp-item', index == currentCmpItemIndex ? 'is-active': '']" 
                            @click="clickCmpItem(obj, index)"
                        >
                            <div class="item-titwrap u-f-jsb">
                                <span class="tit">{{obj.ControlName}}</span>
                                <span class="iconwrap">
                                    <i class="el-icon-document-copy"></i>
                                    <i class="el-icon-delete"></i>
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
                currentClickItemObjIndex: 0,
                currentClickItemObj: null               
            }
        },
        computed: {
            contentCmpsList(){
                return this.cmpsList
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
        created(){
            
        },
        mounted () {
            this.$dragging.$on('dragged', ({value}) => {
                console.log('dragged', value)
            })
            this.$dragging.$on('dragend', (value) => {
                console.log('dragend', value)
            })            
        },
        methods: {
            clickCmpItem(obj, index){
                debugger
                this.currentClickItemObjIndex = index
                this.currentClickItemObj = obj
                this.$emit("middleChangeEmit", this.currentClickItemObj)
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
            }            
        }
    }
</script>-
