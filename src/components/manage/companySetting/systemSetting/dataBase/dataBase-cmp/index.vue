/
* Author: gaol
* Date: 2020/10/30
* Desc： 配置板块
*/
<style lang="stylus" rel="stylesheet/stylus" scoped>
.setModule {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #f5f7fa;
    .topWrap {
        padding: 0 20px;      
        height: 56px;
        line-height: 56px;
        box-shadow: 0 2px 8px 2px rgba(0,0,0,.1);   
        background-color: #ffffff;     
        .headerWrap {
            .left-header {
                width: 300px;
                border-right: 1px solid silver;
                margin-right: 5px;
            }
            .right-header {
                .text {
                    margin: 0 10px;
                    font-size: 18px;
                    color: #000000;
                    border: none;
                    &.is-active {
                        color: #409EFF;
                        border-radius: 0;
                        border-bottom: 2px solid #409EFF
                    }
                }
            }
        }    
    }
    .containerWrap {
        height: calc(100% - 60px);
        overflow: hidden;
        margin-top: 20px;
        padding-left: 20px;
        >>>.leftSectionWrap {
            height: 100%;
            min-width: 200px;
            padding: 0 20px;
            box-sizing: border-box;
            overflow: auto;
            background-color: #ffffff;
        }
        >>>.middleSectionWrap {
            height: 100%;
            padding: 0 0 20px 0;
            box-sizing: border-box;
            overflow: auto;
            margin: 0 20px;
            background-color: #ffffff;
        }
        >>>.rightSectionWrap {
            height: 100%;
            // min-width: 200px;
            padding: 0 10px 20px 0;
            box-sizing: border-box;
            overflow: auto;    
            // background-color: #ffffff;
        }    
    } 
}
</style>
<template>
    <el-row class="setModule u-f u-f-column">

        <el-col :span="24" class="topWrap" v-if="showTopNav">
            <div class="headerWrap u-f">
                <div class="left-header">
                    <i class="el-icon-back"></i>
                    <el-button type="text" style="font-size: 16px;color: #000000">返回</el-button>
                </div>
                <div class="right-header u-f-g2 u-f-jsb">
                    <div class="u-f-jst">
                        <el-button 
                            type="text" 
                            :class="['text', activeHeaderText==='页面设置'? 'is-active': '']" 
                            @click.native="clickHeaderText('页面设置')"
                        >页面设置</el-button>
                        <el-button 
                            type="text" 
                            :class="['text', activeHeaderText==='工作流设置'? 'is-active': '']"
                            @click.native="clickHeaderText('工作流设置')"
                        >工作流设置</el-button>
                        <el-button 
                            type="text" 
                            :class="['text', activeHeaderText==='拓展设置'? 'is-active': '']"
                            @click.native="clickHeaderText('拓展设置')"
                        >拓展设置</el-button>
                    </div>
                    <div>
                        <el-button type="primary" size="mini" disabled>预览</el-button>
                        <el-button type="primary" size="mini">取消</el-button>
                        <el-button type="primary" size="mini">保存</el-button>
                    </div>
                </div>
            </div>
        </el-col>

        <el-col :span="24" class="containerWrap u-f">
            <el-col :span="4" class="leftSectionWrap u-f-g1 u-f-s1">
                <!-- leftCmps: {{leftCmps}} -->
                <left-cmp 
                    ref="leftCmpRef"
                    :objP="objP"
                    @leftChangeEmit="leftChangeEmit"
                ></left-cmp>
            </el-col>

            <el-col :span="16" class="middleSectionWrap u-f-g1 u-f-s1">
                <!-- currentMiddleSelectArr: {{currentMiddleSelectArr}} -->
                <middle-cmp
                    v-loading="middleLoading"
                    ref="middleCmpRef"
                    :cmpsList="currentMiddleSelectArr"
                    :objP="objP"
                    @middleClickEmit="middleClickEmit"
                    @middleDeleteEmit="middleDeleteEmit"
                    @middleCopyEmit="middleCopyEmit"
                    @DraggedFromLeft="DraggedFromLeftEmit"
                    @middleDraggedEmit="middleDraggedEmit"
                    @middleDraggedEmitVueDraged="middleDraggedEmitVueDraged"
                ></middle-cmp>
            </el-col>

            <el-col :span="4" class="rightSectionWrap u-f-g1 u-f-s1">
                <right-cmp 
                    ref="rightCmpRef"
                    :cmpsList="currentMiddleSelectArr"
                    :objP="objP"
                    :currentRightIndex="currentRightIndex"
                    :currentMiddleSelectObj="currentMiddleSelectObj"
                    :currentMiddleSelectObjIndex="currentMiddleSelectObjIndex"
                    :showAllSetItem="false"
                ></right-cmp>
            </el-col>

        </el-col>

    </el-row>
</template>

<script>
    import LeftCmp from './leftSection/LeftSection-cmp.vue'
    import MiddleCmp from './middleSection/MiddleSection-cmp.vue'
    import RightCmp from './rightSection/RightSection-cmp.vue'
    import { 
        REQ_OK
    } from '@/api/config'
    import {
        // setLocalStorage,
        // getLocalStorage
    } from '@/utils/auth.js'
    import {
        getControlAttributes,
        getMiddleSetData
    } from '@/api/systemManage'
    let that = null
    export default {
        props: {
            objP: {
                type: Object,
                default: () => {

                }
            },
            showTopNav: {
                type: Boolean,
                default: true
            }
        },
        components: {
            LeftCmp,
            MiddleCmp,
            RightCmp
        },
        data(){
            return {
                currentMiddleSelectArr: [],  
                currentRightSetArr: [],
                currentMiddleSelectObj: null,
                currentMiddleSelectObjIndex: '',
                activeHeaderText: '页面设置',
                currentRightIndex: 0,
            }
        },
        created(){
            that = this
            this.$nextTick(() => {
                console.log("--------打印中间的---------",this.$refs['middleCmpRef'].$el.innerHTML)
            })
            this.initData()

        },
        methods: {  
            initData(){
                this.middleLoading = true
                let obj = {
                    relateb: this.objP.relateb
                }
                // 获取中间部分的回显数据
                getMiddleSetData(obj).then(res => {
                    this.middleLoading = false
                    this.currentMiddleSelectArr = res.data.Data
                    if(this.currentMiddleSelectArr.length){
                        this.currentMiddleSelectObj = this.currentMiddleSelectArr[0]                
                        this.currentMiddleSelectArr.forEach((item, key) => {
                            this.addObjRightAttribute(item)
                        })
                        // // 获取 第一个控件的 控件属性
                        // this.getControlAttributes(this.currentMiddleSelectObj) 
                        // 循环获取 所有控件的控件属性
                        this.currentMiddleSelectArr.forEach((item, key) => {
                            this.getControlAttributes(item)
                        })
                    }
                })
            },        
            clickHeaderText(tit){
                this.activeHeaderText = tit
            },
            // 添加 属性
            addObjRightAttribute(obj){
                debugger
                this.$set(obj, 'rightAttributes', {})
            },
            // 点击了左侧
            leftChangeEmit(obj){
                debugger
                this.currentMiddleSelectObj = obj   
                this.currentRightIndex = 0
                this.addObjRightAttribute(this.currentMiddleSelectObj)
                // 获取 右侧 控件属性
                this.getControlAttributes(obj)   
                this.currentMiddleSelectArr.unshift(this.currentMiddleSelectObj)
                            
            },
            getControlAttributes (obj) {
                debugger
                let parmasObj = {
                    controlType: obj.controlType,
                    relateb: this.objP.relateb
                }
                if(obj.rightAttributes){
                    if(Object.keys(obj.rightAttributes).length){
                        
                    }else {
                        // 触发 右边 loading
                        this.$bus.$emit("rightLoading",true)                    
                        getControlAttributes(parmasObj).then(res => {
                            debugger
                            obj.rightAttributes = {
                                unicode: obj.unicode,
                                controlName: obj.controlName,
                                controlType: obj.controlType,
                                pcode: obj.pcode,
                                groupAttributeArr: res.data.Data                        
                            } 
                            this.$bus.$emit("rightLoading",false)
                        }).catch(err => {
                            this.$bus.$emit("rightLoading",false)
                        })
                    }
                }else {

                }

            },
            // 点击了中间
            middleClickEmit(obj, index) {
                debugger
                // this.currentMiddleSelectObj = obj
                this.currentMiddleSelectObjIndex = index
                this.currentRightIndex = index
                this.currentMiddleSelectObj = this.currentMiddleSelectArr[index]
                this.getControlAttributes(this.currentMiddleSelectObj)
            },
            middleDraggedEmit(arr, obj) {
                debugger
                // 获取 右侧 控件属性
                this.currentRightIndex = 0
                this.currentMiddleSelectObj = obj
                this.addObjRightAttribute(this.currentMiddleSelectObj)
                this.getControlAttributes(this.currentMiddleSelectObj)                
                this.currentMiddleSelectArr.unshift(this.currentMiddleSelectObj)
            },
            middleDraggedEmitVueDraged (oldIndex, newIndex) {
                // 拖拽排序后 触发的
                debugger
                this.currentRightIndex = 0
                let beforeObj = this.currentMiddleSelectArr[oldIndex]
                let afterObj = this.currentMiddleSelectArr[newIndex]
                this.currentMiddleSelectArr.splice(oldIndex,1, afterObj)
                this.currentMiddleSelectArr.splice(newIndex,1, beforeObj)
                console.log("vueDraggable移动后",this.currentMiddleSelectArr)
            },            
            middleDeleteEmit(obj, index){
                debugger
                this.currentMiddleSelectArr = this.currentMiddleSelectArr.filter((item, key) => {
                    return key !=index
                })
            },
            middleCopyEmit(obj, index){
                this.currentMiddleSelectArr.splice(index, 0, obj)
            },
            DraggedFromLeftEmit(arr){
                this.currentRightSetArr = arr
            },
        }
    }
</script>
