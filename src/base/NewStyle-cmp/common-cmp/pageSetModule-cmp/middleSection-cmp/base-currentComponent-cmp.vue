<!--
    User:
    Date: 
    功能:
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

.currentCmp-cmp {
    width: 100%;
    // padding-left: 10px;
    box-sizing: border-box;
    margin-top: 10px;
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
</style>
<template>
    <div class="currentCmp-cmp">
        obj: {{obj}}
        <div class="item-titwrap u-f-jsb">
            <span class="tit" v-if="!ismultiColumnContainerFn(obj.controlType)">{{obj.controlName}}</span>
            <span class="iconwrap">
                <!-- <i 
                    class="el-icon-document-copy"
                    @click.stop="handlerClickCopy(obj, index)"
                ></i> -->
                <!-- <i 
                    class="el-icon-delete"
                    @click.stop="handlerClickDelete(obj, index)"
                ></i> -->
            </span>
        </div>        
        <component 
            :is="getComponentUtils(obj.controlType)"
            :obj.sync="obj"
            :isTitle="isTitle"
            :isNeedGetDataSource="isNeedGetDataSource"
            :disableFlag="disableFlag"
        >
        </component>              
    </div>
</template>

<script>
    import { 
        REQ_OK
    } from '@/api/config'
    import { getGuid, getGuid2, getGuidPrefixStr } from '@/utils/guid.js'
    import { mapGetters } from 'vuex'
    import {
        setLocalStorage,
        getLocalStorage
    } from '@/utils/auth.js'  
    import { getComponentUtils, isContainerFn, ismultiColumnContainerFn } from '@/utils/newStyle-components-type.js'

    import Vuedraggable from 'vuedraggable'   
    let that = null
    export default {
        props: {    
            obj: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            isTitle: {
                type: Boolean,
                default: () => {
                    return false
                }
            },
            isNeedGetDataSource: {
                type: Boolean,
                default: () => {
                    return false
                }
            },
            disableFlag: {
                type: Boolean,
                default: () => {
                    return true
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
            ])           
        },
        watch: {
            obj: {
                handler(newValue, oldValue){
                    debugger
                    let res = JSON.parse(getLocalStorage(this.obj.minUnicode))
                    console.log("-----------33333333333333------", res)
                    // 单个组件 做历史记录
                    this.setLocalStorage(this.obj.minUnicode, JSON.stringify({
                        objCurrentValue: newValue,
                        objBeforeValue: res.objCurrentValue                     
                    }))
                    // 页面整体的历史记录 
                    // this.$bus.$emit("emitFromBasecurrentComponent")
                },
                deep: true
            }
        },
        created(){
            that = this      
            this.initData()   
        },
        beforeDestroy(){

        },
        methods: {
            initData(){
                this.setLocalStorage(this.obj.minUnicode, JSON.stringify({
                    objCurrentValue: this.obj,
                    objBeforeValue: {}
                }))
            },
            setLocalStorage(minUnicode, strObj){
                setLocalStorage(minUnicode, strObj)
            },
            getComponentUtils(controlType){
                return getComponentUtils(controlType)
            },
            ismultiColumnContainerFn(type){
                return ismultiColumnContainerFn(type)
            }  
        }
    }
</script>
