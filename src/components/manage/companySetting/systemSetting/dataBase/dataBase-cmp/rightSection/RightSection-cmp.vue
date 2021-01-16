/
* Author: gaol
* Date: 2020/10/30
* Desc： 配置板块 - 右边部分
*/
<style lang="stylus" rel="stylesheet/stylus" scoped>
.rightCmp {
    width: 100%;
    min-height 80vh
    .header {
       padding: 10px 
       border-bottom: 1px dotted silver 
    }
    .controlListWrap {
        // border-bottom: 1px solid red;
        margin-top: 10px;
    }

}
</style>
<template>
    <div class="rightCmp" v-loading="loading">
        <!-- contentCmpsList: {{contentCmpsList}} -->
        <!-- currentMiddleSelectObj: {{currentMiddleSelectObj}} -->
        <!-- <el-form 
            v-for="(cmp, key) in contentCmpsList"
            :key="key"
            :model="cmp"
        >
            <h3 class="header">
                <i class="header-icon el-icon-info"></i>                
                {{cmp.controlName}}
            </h3>
            <div class="setCmpContentBox">
                <component 
                    v-for="(obj, key) in cmp.allTeamControl"
                    :key="key"                
                    :is="currentFieldComponentMixin(obj.controltype)"
                    :obj.sync="obj"
                    :isNeedGetDataSource="true"
                    :disableFlag="false"
                ></component>
            </div>            
        </el-form> -->
        <div
            v-for="(cmp, key) in contentCmpsList"
            :key="key"
            class="controlListWrap"
            v-show="key == currentRightIndex"
        >
            <h1>{{cmp.controlName}}</h1>
            <field-group-cmp
                :groupObj="cmp.rightAttributes"
            ></field-group-cmp>
        </div>
    </div>
</template>

<script>
    import { 
        REQ_OK
    } from '@/api/config'
    import { 
        saveControlAttributes
    } from '@/api/systemManage'
    import {
        // setLocalStorage,
        // getLocalStorage
    } from '@/utils/auth.js'
    import FieldGroupCmp from '@/base/NewStyle-cmp/common-cmp/FieldGroup-cmp/FieldGroup-cmp'
    // import setCmpShowF from './components-setCmpItem-cmp/setCmpShowF'
    // import setCmpUpText from './components-setCmpItem-cmp/setCmpUpText'
    // import setCmpUpBtn from './components-setCmpItem-cmp/setCmpUpBtn'
    // import setCmpContent from './components-setCmpItem-cmp/setCmpContent'
    // import setCmpDownBtn from './components-setCmpItem-cmp/setCmpDownBtn'
    // import setCmpDownText from './components-setCmpItem-cmp/setCmpDownText'
    // import setCmpLink from './components-setCmpItem-cmp/setCmpLink'
    // import setCmpTail from './components-setCmpItem-cmp/setCmpTail'
    import { fieldControlTypeMixin } from '@/utils/newStyleMixins-fields.js'
    let that = null
    export default {
        mixins: [ fieldControlTypeMixin ],
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
            },
            showAllSetItem: {
                type: Boolean,
                default: () => {
                    return true
                }
            },
            currentRightIndex: {
                type: Number,
                default: 0
            },
            objP: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        components: {
            // setCmpShowF,
            // setCmpUpText,
            // setCmpUpBtn,
            // setCmpContent,
            // setCmpDownBtn,
            // setCmpDownText,
            // setCmpLink,
            // setCmpTail
            FieldGroupCmp
        },
        data(){
            return {
                loading: false,
                activeIndex: 0,
                beforeActiveIndex: 0
            }
        },
        computed: {
            contentCmpsList(){
                let length = this.cmpsList.length
                if(length > 0){
                    return this.cmpsList
                }else {
                    return []
                }
            }            
        },
        watch: {
            currentMiddleSelectObjIndex(newValue, oldValue){
                this.activeIndex = newValue
            }
        },
        created(){
            that = this
            this.$nextTick(() => {
                this.$bus.$on("rightLoading", (res) => {
                   if(res){
                       this.loading = true
                   }else {
                       this.loading = false
                   }

                })
            })
        },
        beforeDestroy(){
            this.offEventBus()
        },
        methods: {
            offEventBus(){
                this.$bus.$off("rightLoading")
            },
            changeData(arr){
                let list = []
                if(arr && arr.length){
                    debugger
                    console.log("****************", arr)
                    arr.forEach((item, key) => {
                        let itemGroupAttributeArr =  item.rightAttributes.groupAttributeArr
                        if(itemGroupAttributeArr.length){
                            let arr = []
                            itemGroupAttributeArr.forEach((value, index) => {
                                let itemTeamControlList = value.teamControlList
                                if(itemTeamControlList.length) {
                                    itemTeamControlList.forEach((groupItem, groupItemKey) => {
                                        arr.push({
                                            unicode: groupItem.unicode,
                                            convalue: groupItem.convalue
                                        })
                                    })
                                }                               
                            })
                            list.push({
                                controlType: item.controlType,
                                sortId: key,
                                controlValueList: arr
                            }) 
                        }
                    })
                    // console.log("-------*******---------", list)
                }
                return list
            },
            saveControlAttributes(){
                that.loading = true
                let params = {
                    relateb: this.objP.relateb,
                    list: that.changeData(that.contentCmpsList)
                }
                saveControlAttributes(params).then(res => {
                    that.loading = false
                    that.$message({
                        type: 'success',
                        message: '保存成功'
                    })
                }).catch(err => {
                    that.loading = false
                })
            }
        }
    }
</script>
