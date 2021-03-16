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
        <!-- currentComponent中 obj: {{obj}} -->
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
                'currentLeftNavType',
                'singleCmpHistory'
            ])           
        },
        watch: {
            obj: {
                handler(newValue, oldValue){
                    debugger
                    // 页面整体的历史记录 
                    let code = newValue.minUnicode
                    this.$store.dispatch("setSingleCmpHistory", {
                        obj: JSON.parse(JSON.stringify(newValue)),
                        objCode: code,
                    })                    
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
                // this.setLocalStorage(this.obj.minUnicode, JSON.stringify({
                //     objCurrentValue: this.obj,
                //     objBeforeValue: {}
                // }))
                let code = this.obj.minUnicode
                // 单个控件的 历史记录存入 store中
                this.$store.dispatch("setSingleCmpHistory", {
                    obj: JSON.parse(JSON.stringify(this.obj)),
                    objCode: code,
                })
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
