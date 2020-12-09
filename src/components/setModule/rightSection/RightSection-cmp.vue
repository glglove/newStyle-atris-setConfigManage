/
* Author: gaol
* Date: 2020/10/30
* Desc： 配置板块 - 右边部分
*/
<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.el-collapse-item {
    margin: 10px 0;
    border-left: 2px solid red
}
>>>.el-collapse-item__header {
    padding-left: 5px
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
        <el-collapse accordion>      
            <el-collapse-item 
                v-for="(cmp, index) in contentCmpsList"
                :key="index"
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
            }
        },
        components: {

        },
        data(){
            return {

            }
        },
        computed: {
            contentCmpsList(){
                return this.cmpsList
            }            
        },
        created(){
            
        },
        methods: {
        }
    }
</script>
