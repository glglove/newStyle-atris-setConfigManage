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
        <el-form >
            <el-collapse 
                :accordion="true"
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
                    <div class="setCmpContentBox">
                        <component
                            :is="currentSetCmpCotent(cmp)"
                        ></component>
                    </div>
                </el-collapse-item>                        
            </el-collapse>  
        </el-form>
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
    import setCmpShowF from './components-setCmpItem-cmp/setCmpShowF'
    import setCmpUpText from './components-setCmpItem-cmp/setCmpUpText'
    import setCmpUpBtn from './components-setCmpItem-cmp/setCmpUpBtn'
    import setCmpContent from './components-setCmpItem-cmp/setCmpContent'
    import setCmpDownBtn from './components-setCmpItem-cmp/setCmpDownBtn'
    import setCmpDownText from './components-setCmpItem-cmp/setCmpDownText'
    import setCmpLink from './components-setCmpItem-cmp/setCmpLink'
    import setCmpTail from './components-setCmpItem-cmp/setCmpTail'
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
            setCmpShowF,
            setCmpUpText,
            setCmpUpBtn,
            setCmpContent,
            setCmpDownBtn,
            setCmpDownText,
            setCmpLink,
            setCmpTail
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
            currentSetCmpCotent(cmp){
                let type = cmp.ControlType
                switch(type){
                    case 1000:  // 显示字段组件区
                        return setCmpShowF
                    case 1001: // 上文本区
                        return setCmpUpText 
                    case 1002: // 上按钮区
                        return setCmpUpBtn
                    case 1003: // 内容区
                        return setCmpContent
                    case 1004: // 下按钮区
                        return setCmpDownBtn
                    case 1005: //下文本区
                        return setCmpDownText
                    case 1006: // 链接区
                        return setCmpLink
                    case 1007: // 尾部区
                        return setCmpTail
                }
            }
        }
    }
</script>
