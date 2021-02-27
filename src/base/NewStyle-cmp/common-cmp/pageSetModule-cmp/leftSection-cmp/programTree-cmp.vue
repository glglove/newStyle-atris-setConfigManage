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
                children: 'atrisChildrenList',
                label: 'controlName',            
            }"
            @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter"
            @node-drag-leave="handleDragLeave"
            @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd"
            @node-drop="handleDrop"
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
                        if(item.atrisChildrenList) {
                            if(item.atrisChildrenList.length){
                                this.changeData(item.atrisChildrenList)
                            }else {
                                delete item.atrisChildrenList
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
                return true
            },
            allowDrag(draggingNode) {
                // return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
                console.log("draggingNode", draggingNode)
                // 只有 有唯一码的可以拖拽 (布局容器中的 单个列 的atrisGuid为 null 不能单个进行拖拽排序需要和该布局容器一起进行拖拽)

                return draggingNode.data.atrisGuid 
            },
            handleNodeClick(data, node, elem){
                debugger
                this.$bus.$emit("progressTreeEmitClick", data)
            },                   
        }
    }
</script>
