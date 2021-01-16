/
* Author: gaol
* Date: 2020/10/30
* Desc： 配置板块 - 左边部分
*/
<style lang="stylus" rel="stylesheet/stylus" scoped>
.leftCmp {
    width: 100%;
    .topContent {
        // border-bottom: 1px solid silver;
        .item {
            padding: 10px;
        }
    }    
}
</style>
<template>
    <div class="leftCmp">
        配置板块——左边
        <div class="topContent">
            <ul class="u-f-ac u-f-wrap">
                <li
                    v-for="(cmpItem, index) in cmps"
                    :key="index"
                    class="item"
                    draggable="true"
                    :id="cmpItem.ControlType"
                    @dragstart="startDrag($event, cmpItem)"
                    @dragend="endDrag($event, cmpItem)"             
                >
                    <el-checkbox 
                        v-model="cmpItem.checked" 
                        :label="cmpItem.ControlType"
                        border
                        @change="handlerChange"
                    >
                        {{cmpItem.ControlType}} - {{cmpItem.ControlName}} - {{cmpItem.ControlEnName}}
                    </el-checkbox>
                </li>
            </ul>
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
    let that = null
    export default {
        props: {
            cmps: {
                type: Array,
                default: () => {
                    return [
                        // {
                        //     ControlType:1,
                        //     ControlName: '单行文本输入框', 
                        //     ControlEnName: 'BaseInput', 
                        //     checked: false
                        // },
                        // {
                        //     ControlType:2,
                        //     ControlName: '多行文本输入框', 
                        //     ControlEnName: 'TextareaInput', 
                        //     checked: false
                        // },
                        // {
                        //     ControlType:3,
                        //     ControlName: '数字输入框', 
                        //     ControlEnName: 'NumInput', 
                        //     checked: false
                        // },
                        // {
                        //     ControlType:4,
                        //     ControlName: '金额输入框', 
                        //     ControlEnName: 'MoneyInput', 
                        //     checked: false
                        // },
                        // {
                        //     ControlType:5,
                        //     ControlName: '单选下拉框', 
                        //     ControlEnName: 'BaseSelect', 
                        //     checked: false
                        // },
                        // {
                        //     ControlType:6,
                        //     ControlName: '多选下拉框', 
                        //     ControlEnName: 'MultipleSelect', 
                        //     checked: false
                        // },
                        // {
                        //     ControlType:7,
                        //     ControlName: '时间——年月日', 
                        //     ControlEnName: 'BaseDate', 
                        //     checked: false
                        // },
                        // {
                        //     ControlType:8,
                        //     ControlName: '时间区间', 
                        //     ControlEnName: 'RangeDate', 
                        //     checked: false
                        // },
                        // {
                        //     ControlType:9,
                        //     ControlName: '时分', 
                        //     ControlEnName: 'TimeDate', 
                        //     checked: false
                        // },
                        // {
                        //     ControlType:10,
                        //     ControlName: '月份', 
                        //     ControlEnName: 'MonthSelect', 
                        //     checked: false
                        // },
                        // {
                        //     ControlType:11,
                        //     ControlName: 'switch 选择器', 
                        //     ControlEnName: 'BaseSwitch', 
                        //     checked: false
                        // },   
                        // {
                        //     ControlType:12,
                        //     ControlName: '单选radio', 
                        //     ControlEnName: 'BaseRadio', 
                        //     checked: false
                        // },
                        // {
                        //     ControlType:13,
                        //     ControlName: '多选chekbox', 
                        //     ControlEnName: 'BaseCheckbox', 
                        //     checked: false
                        // },
                        // {
                        //     ControlType:14,
                        //     ControlName: '图片', 
                        //     ControlEnName: 'BaseImgUpload', 
                        //     checked: false
                        // },
                        // {
                        //     ControlType:15,
                        //     ControlName: '附件', 
                        //     ControlEnName: 'BaseFileUpload', 
                        //     checked: false
                        // },
                        // {
                        //     ControlType:16,
                        //     ControlName: '计算公式', 
                        //     ControlEnName: 'BaseCalculate', 
                        //     checked: false
                        // },
                        // {
                        //     ControlType:19,
                        //     ControlName: '人员选择器', 
                        //     ControlEnName: 'BaseEmpSelect', 
                        //     checked: false
                        // },                        
                        // {
                        //     ControlType:20,
                        //     ControlName: '组织选择器', 
                        //     ControlEnName: 'BaseOrgSelect', 
                        //     checked: false
                        // },
                        // {
                        //     ControlType:21,
                        //     ControlName: '组织和人员选择器', 
                        //     ControlEnName: 'OrgAndEmpSelect', 
                        //     checked: false
                        // },                        
                        // {
                        //     ControlType:22,
                        //     ControlName: '地图', 
                        //     ControlEnName: 'BaseMapSelect', 
                        //     checked: false
                        // },
                        // {
                        //     ControlType:23,
                        //     ControlName: '富文本编辑器', 
                        //     ControlEnName: 'BaseEditor', 
                        //     checked: false
                        // },
                        // {
                        //     ControlType:24,
                        //     ControlName: '说明', 
                        //     ControlEnName: 'BaseExplain', 
                        //     checked: false
                        // },
                        // {
                        //     ControlType:27,
                        //     ControlName: '省市区', 
                        //     ControlEnName: 'BaseProvinces', 
                        //     checked: false
                        // },
                        // {
                        //     ControlType:28,
                        //     ControlName: '字段选择器', 
                        //     ControlEnName: 'BaseFieldSelect', 
                        //     checked: false
                        // },
                        // {
                        //     ControlType:29,
                        //     ControlName: '字段设置器', 
                        //     ControlEnName: 'BaseFieldSet', 
                        //     checked: false
                        // },
                        // {
                        //     ControlType:30,
                        //     ControlName: '页面跳转字段', 
                        //     ControlEnName: 'BasePageLinkField', 
                        //     checked: false
                        // },
                        // {
                        //     ControlType:31,
                        //     ControlName: '数字区间', 
                        //     ControlEnName: 'RangeNum', 
                        //     checked: false
                        // },
                        // {
                        //     ControlType:32,
                        //     ControlName: '是否下拉选择', 
                        //     ControlEnName: 'BaseSwitchSelect', 
                        //     checked: false
                        // },
                        {
                            ControlType: 1000,
                            ControlName: '显示字段区', 
                            ControlEnName: 'ShowF', 
                            checked: false                            
                        },
                        {
                            ControlType: 1001,
                            ControlName: '上文本区', 
                            ControlEnName: 'UpText', 
                            checked: false                            
                        },
                        {
                            ControlType: 1002,
                            ControlName: '上按钮区', 
                            ControlEnName: 'UpBtn', 
                            checked: false                            
                        }, 
                        {
                            ControlType: 1003,
                            ControlName: '内容区', 
                            ControlEnName: 'Content', 
                            checked: false                            
                        }, 
                        {
                            ControlType: 1004,
                            ControlName: '下按钮区', 
                            ControlEnName: 'DownBtn', 
                            checked: false                            
                        }, 
                        {
                            ControlType: 1005,
                            ControlName: '下文本区', 
                            ControlEnName: 'DownText', 
                            checked: false                            
                        },  
                        {
                            ControlType: 1006,
                            ControlName: '链接区', 
                            ControlEnName: 'Link', 
                            checked: false                            
                        }, 
                        {
                            ControlType: 1007,
                            ControlName: '尾部区', 
                            ControlEnName: 'Tail', 
                            checked: false                            
                        },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                    ]
                }
            }            
        },
        components: {

        },
        data(){
            return {
                controlType: 10,
            }
        },
        computed: {
            currentObj(){
                return this.cmps.filter((item, key) => {
                    return item.checked 
                })
            }            
        },
        created(){
            that = this            
        },
        methods: {
            handlerChange(){
                this.$emit("leftChangeEmit", this.currentObj)
            },
            startDrag(event, sourceItem){
                debugger
                let e = event || window.event
                console.log(e)
                console.log('开始拖拽');
                e.dataTransfer.setData('currentItemStr',JSON.stringify(sourceItem))
            },
            enterDrag(event, sourceId) {
                let e = event || window.event
                e.preventDefault()
                console.log("拖拽进入到目标元素",e)                
                debugger                
            },
            overDrag(event, sourceId){
                let e = event || window.event
                console.log("拖拽在目标元素中拖拽",e)                
                debugger                
            },
            leaveDrag(event, sourceId){
                let e = event || window.event
                console.log("拖拽离开目标元素",e)                
                debugger
            },
            endDrag(event, sourceId){
                let e = event || window.event
                e.preventDefault()
                console.log("拖拽结束",e)                
                debugger
            },            
        }
    }
</script>
