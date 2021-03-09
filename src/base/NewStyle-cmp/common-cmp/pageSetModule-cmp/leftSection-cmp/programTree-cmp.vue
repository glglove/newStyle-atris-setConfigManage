<!--
    User:
    Date: 大纲树组件
    功能:
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

.programtree-cmp {
    width: 100%;
    padding-left: 10px;
    box-sizing: border-box;
    margin-top: 10px;
}
</style>
<template>
    <div class="programtree-cmp">
        <!-- treeData: {{treeData}} -->
        <!-- pageSetTotalData: {{pageSetTotalData}} -->
        <el-tree
            :data="treeData"
            node-key="atrisCode"
            default-expand-all
            :props="{
                children: 'childrenList',
                label: 'controlName',            
            }"
            @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter"
            @node-drag-leave="handleDragLeave"
            @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd"
            @node-drop="handleDrop"
            :expand-on-click-node="false"
            draggable
            :allow-drop="allowDrop"
            :allow-drag="allowDrag"
            @node-click="handleNodeClick"
        >
        </el-tree>        
    </div>
</template>

<script>
    import { 
        REQ_OK
    } from '@/api/config'
    // import { getGuid, getGuid2 } from '@/utils/guid.js'
    import { mapGetters } from 'vuex'
    import {
        // setLocalStorage,
        // getLocalStorage
    } from '@/utils/auth.js'  
    import Vuedraggable from 'vuedraggable'   
    import { ismultiColumnContainerFn } from '@/utils/newStyle-components-type.js'
    let that = null
    export default {
        props: {    
            obj: {
                type: Object,
                default: () => {
                    return {}
                }
            }     
        },
        components: {

        },
        data(){
            return {
                loading: false,    
            }
        },
        computed: {
            ...mapGetters([
                'pageSetTotalData',
                'currentLeftNavType'
            ]),
            treeData(){
                return this.pageSetTotalData.pageSetTotalDataList
            },
        },
        watch: {

        },
        created(){
            that = this         
        },
        beforeDestroy(){

        },
        methods: {
            initData(){
                // this.changeData(this.treeData)
            },
            changeData(arr){
                if(arr && arr.length){
                    arr.forEach(item => {
                        if(item.childrenList) {
                            if(item.childrenList.length){
                                this.changeData(item.childrenList)
                            }else {
                                delete item.childrenList
                            }
                        }else {

                        }
                    })
                }
            },
            handleDragStart(node, ev) {
                console.log('drag start', node);
            },
            handleDragEnter(draggingNode, dropNode, ev) {
                console.log('tree drag enter: ', dropNode.label);
            },
            handleDragLeave(draggingNode, dropNode, ev) {
                console.log('tree drag leave: ', dropNode.label);
            },
            handleDragOver(draggingNode, dropNode, ev) {
                console.log('tree drag over: ', dropNode.label);
            },
            handleDragEnd(draggingNode, dropNode, dropType, ev) {
                // debugger
                console.log('tree drag end: ', dropNode && dropNode.label, dropType);
            },
            handleDrop(draggingNode, dropNode, dropType, ev) {
                console.log('tree drop: ', dropNode.label, dropType);
                // this.$store.dispatch("setPageSetDataList", this.treeData)
                this.$bus.$emit("progressTreeSort", this.treeData)
            },
            allowDrop(draggingNode, dropNode, type) {
                console.log("--draggingNode, dropNode, type---", draggingNode, dropNode, type)
                // if (dropNode.data.label === '二级 3-1') {
                // return type !== 'inner';
                // } else {
                // return true;
                // }
                debugger
                
                if( !dropNode.data.atrisGuid ){
                    // 列不允许前面  后面插入
                    console.log(dropNode.data)
                    if(type === 'inner'){
                        return true
                    }else {
                        return false
                    }           
                }else {
                    if (ismultiColumnContainerFn(dropNode.data.controlType)){
                        // 分栏布局容器中的列不允许插入排序  （列的controleType也为5001 但是列的 atirsGuid为空）
                        // return type !== 'inner' ;
                        return false
                    } else if(!dropNode.data.childrenList.length) {
                        // 非布局容器不允许插入排序
                        return type !== 'inner';
                    }else {
                        return false
                    }
                }
            },
            allowDrag(draggingNode) {
                // debugger
                // return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
                console.log("draggingNode", draggingNode)
                // 只有 有唯一码的可以拖拽 (布局容器中的 单个列 的atrisGuid为 null 不能单个进行拖拽排序需要和该布局容器一起进行拖拽)
                return draggingNode.data.atrisGuid 
            },
            handleNodeClick(data, node, elem){
                debugger
                this.$bus.$emit("progressTreeEmitClick", data)
                // 触发 右边的变化
                this.$bus.$emit("emitFromProgramTree", {
                    atrisCode: data.atrisCode,
                    obj: data,
                    controlType: data.controlType,
                });                
            },                   
        }
    }
</script>
