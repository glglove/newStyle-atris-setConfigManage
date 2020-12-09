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
                border-right: 1px solid red;
                margin-right: 5px;
            }
        }    
    }
    .containerWrap {
        height: calc(100% - 60px);
        overflow: hidden;
        margin-top: 20px;
        >>>.leftSectionWrap {
            height: 100%;
            width: 300px;
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
            width: 300px;
            padding: 0 20px;
            box-sizing: border-box;
            overflow: auto;    
            // background-color: #ffffff;
        }    
    } 
}
</style>
<template>
    <el-row class="setModule u-f u-f-column">
        <el-col :span="24" class="topWrap">
            <div class="headerWrap u-f">
                <div class="left-header">rf</div>
                <div class="right-header u-f2">534 </div>
            </div>
        </el-col>
        <el-col :span="24" class="containerWrap u-f">
            <el-col :span="4" class="leftSectionWrap">
                <left-cmp @leftChangeEmit="leftChangeEmit"></left-cmp>
            </el-col>
            <el-col :span="16" class="middleSectionWrap">
                currentLeftSelectArr: {{currentLeftSelectArr}}
                <middle-cmp
                    :cmpsList="currentLeftSelectArr"
                    @middleChangeEmit="middleChangeEmit"
                ></middle-cmp>
            </el-col>
            <el-col :span="4" class="rightSectionWrap">
                <right-cmp 
                    :cmpsList="currentLeftSelectArr"
                    :currentMiddleSelectObj="currentMiddleSelectObj"
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

    } from '@/api/newStyleConfig'
    import {
        // setLocalStorage,
        // getLocalStorage
    } from '@/utils/auth.js'
    export default {
        components: {
            LeftCmp,
            MiddleCmp,
            RightCmp
        },
        data(){
            return {
               currentLeftSelectArr: [],
               currentMiddleSelectObj: null
            }
        },
        created(){
            
        },
        methods: {
            leftChangeEmit(arr){
                debugger
                this.currentLeftSelectArr = arr
            },
            middleChangeEmit(arr){
                debugger
                this.currentMiddleSelectObj = arr
            }
        }
    }
</script>
