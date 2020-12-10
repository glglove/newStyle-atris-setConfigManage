/
* Author: gaol
* Date: 2020/10/30
* Desc： 配置板块 - 右边部分
*/
<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.el-collapse-item {
    margin: 10px 0;
    &.is-active {
        box-shadow: 1px 1px 10px 1px #e8dede
    }
    .el-collapse-item__wrap {
        background-color: #e8dede;
        padding: 10px;
    }
}
>>>.el-collapse-item__header {
    position: relative;
    padding-left: 10px;
    &:after {
        position: absolute;
        content: '';
        width: 4px;
        height: 30%;
        left: 0px;
        background-color: red
    }
}
.rightCmp {
    width: 100%;
}
</style>
<template>
    <div class="rightCmp">
        配置板块——右边
        contentCmpsList: {{contentCmpsList}}-----
        currentMiddleSelectObj: {{currentMiddleSelectObj}}
        <el-collapse 
            :accordion="false"
            v-model="activeIndex"
        >      
            <el-collapse-item 
                v-for="(cmp, index) in contentCmpsList"
                :key="index"
                :name="index"
            >
                <template slot="title">
                {{cmp.ControlName}}<i class="header-icon el-icon-info"></i>
                </template>
                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>                        
        </el-collapse>  
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
    export default {
        props: {
            cmpsList: {
                type: Array,
                default: () => {
                    return []
                }
            },            
            currentMiddleSelectObj: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            currentMiddleSelectObjIndex: {
                type: [String, Number],
                default: ''
            }
        },
        components: {

        },
        data(){
            return {
                activeIndex: ''
            }
        },
        computed: {
            contentCmpsList(){
                return this.cmpsList
            }            
        },
        watch: {
            currentMiddleSelectObjIndex(newValue, oldValue){
                this.activeIndex = newValue
            }
        },
        created(){
            
        },
        methods: {
        }
    }
</script>
