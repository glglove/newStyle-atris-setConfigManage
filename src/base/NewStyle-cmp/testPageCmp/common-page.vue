<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~common/css/variable.styl"
.middleCmp {
    width: 100%;
    height: calc(100vh - 130px);
    margin-top: 20px;
    font-size: 14px;
    background: #ffffff
    .containerBox {
        position: relative;
        height: 100%;
        padding: 20px;
        overflow: auto;
        box-sizing: border-box;
        &.cmpSelected {
            border: $page-set-border
        }
    }
    .cmpItemBox:not(:first-child) {
        margin: 20px 0;
    }
}
.cmp-item {
    position: relative;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    background-color: #ffffff;
    &:hover {
        // cursor: pointer;
        background-color: #f5f5f5         
    }
    &.is-active {
        background-color: #f5f5f5;
        // border-top: 1px dotted #000000;                      
        // border-bottom: 1px dotted #000000;                      
    }
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
.cmp-item-handlerBox {
    position: absolute;
    display: none;
    right: 0;
    bottom: 0;
    padding:  0 5px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background: $page-set-bgc
    color: $page-set-font
    &:hover {
        cursor: pointer;
    }
} 

// 点击之后的样式
.cmp-item-selected {
    border: $page-set-border 
}

// moseover 之后的样式
// .cmp-item-mouseover {
//     border: $page-set-border-dot
// }
</style>
<template>
    <div class="commonPage">
        <div  
            v-for="(obj, index) in currentPageSetData.currentPageSetDataList" 
            :key="index+1" 
            :class="[`cmpBox_${obj.minUnicode}`, 'cmpItemBox']"
        >
            <div 
                :class="['cmp-item',`cmp-item-${obj.minUnicode}`,'atris-selectable', 'atris-hoverable']" 
                :data-minunicode="`${obj.minUnicode}`"
            >
                <!-- 中间部分obj: {{obj}} -->
                <!----动态渲染当前组件---->
                <current-component-cmp
                    :obj.sync="obj"
                    :isTitle="false"
                    :isNeedGetDataSource="true"
                    :disableFlag="false"                                    
                >
                </current-component-cmp>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import CurrentComponentCmp from '@/base/NewStyle-cmp/common-cmp/pageSetModule-cmp/middleSection-cmp/base-currentComponent-cmp.vue'
    export default {
        components: {
            CurrentComponentCmp
        },
        data() {
            return {
                currentPageSetData: {
                    minUnicode: 'pageCode',
                    controlType: 0, // 页面的controlType 设置为0 
                    currentPageSetDataList: [{"childrenList":[{"childrenList":[{"childrenList":[],"columnObjMap":null,"controlName":"文本","controlType":1001,"longUnicode":"88c2bb3b-1e93-c5af-2af9-0bc2f2ce2bdb","minUnicode":"showText_1001_ba6c277e","pageHighSetUp":{"id":null},"pageSetUp":{"cncontent":"222","encontent":null},"pageStyle":{"backgroundColor":"red","backgroundUrl":null,"backstyle":"{\"backgroundColor\":\"red\"}","borderColor":null,"borderStyle":null,"borderWidth":null,"borderlinestyle":"{}","bottom":null,"fontColor":null,"fontIsItalic":0,"fontIsUnderline":0,"fontIsWeith":0,"fontSite":null,"fontSize":null,"frontstyle":"{\"fontIsUnderline\":0,\"fontIsWeith\":0,\"fontIsItalic\":0}","heightPx":null,"leftPx":null,"rightPx":null,"showstyle":"{}","stylepara":"{}","topPx":null,"widthPx":null},"sortid":null,"spanNum":null,"upIsPage":0},{"childrenList":[],"columnObjMap":null,"controlName":"图片","controlType":1002,"longUnicode":"37b749d8-0b47-b3c2-799b-45472c9f7df1","minUnicode":"showPic_1002_86bcaa66","pageHighSetUp":{"id":null},"pageSetUp":{"cncontent":null,"encontent":null},"pageStyle":{"backgroundColor":null,"backgroundUrl":null,"backstyle":"{}","borderColor":null,"borderStyle":null,"borderWidth":null,"borderlinestyle":"{}","bottom":null,"fontColor":null,"fontIsItalic":null,"fontIsUnderline":null,"fontIsWeith":null,"fontSite":null,"fontSize":null,"frontstyle":"{}","heightPx":null,"leftPx":null,"rightPx":null,"showstyle":"{}","stylepara":"{}","topPx":null,"widthPx":null},"sortid":null,"spanNum":null,"upIsPage":0}],"columnObjMap":null,"controlName":"第1列","controlType":5001,"longUnicode":"","minUnicode":"columnContainer_5001_814cd816","pageHighSetUp":{"id":null},"pageSetUp":{"cncontent":null,"encontent":null},"pageStyle":{"backgroundColor":null,"backgroundUrl":null,"backstyle":"{}","borderColor":null,"borderStyle":null,"borderWidth":null,"borderlinestyle":"{}","bottom":null,"fontColor":null,"fontIsItalic":null,"fontIsUnderline":null,"fontIsWeith":null,"fontSite":null,"fontSize":null,"frontstyle":"{}","heightPx":null,"leftPx":null,"rightPx":null,"showstyle":"{}","stylepara":"{}","topPx":null,"widthPx":null},"sortid":null,"spanNum":null,"upIsPage":0},{"childrenList":[{"childrenList":[],"columnObjMap":null,"controlName":"文本","controlType":1001,"longUnicode":"28a05df1-7978-2d24-9029-a4564571e828","minUnicode":"showText_1001_792d1e1b","pageHighSetUp":{"id":null},"pageSetUp":{"cncontent":"333","encontent":null},"pageStyle":{"backgroundColor":"blue","backgroundUrl":null,"backstyle":"{\"backgroundColor\":\"blue\"}","borderColor":null,"borderStyle":null,"borderWidth":null,"borderlinestyle":"{}","bottom":null,"fontColor":null,"fontIsItalic":null,"fontIsUnderline":null,"fontIsWeith":null,"fontSite":null,"fontSize":20,"frontstyle":"{\"fontSize\":20}","heightPx":null,"leftPx":null,"rightPx":null,"showstyle":"{}","stylepara":"{}","topPx":null,"widthPx":null},"sortid":null,"spanNum":null,"upIsPage":0}],"columnObjMap":null,"controlName":"第2列","controlType":5001,"longUnicode":"","minUnicode":"columnContainer_5001_e14aac9b","pageHighSetUp":{"id":null},"pageSetUp":{"cncontent":null,"encontent":null},"pageStyle":{"backgroundColor":null,"backgroundUrl":null,"backstyle":"{}","borderColor":null,"borderStyle":null,"borderWidth":null,"borderlinestyle":"{}","bottom":null,"fontColor":null,"fontIsItalic":null,"fontIsUnderline":null,"fontIsWeith":null,"fontSite":null,"fontSize":null,"frontstyle":"{}","heightPx":null,"leftPx":null,"rightPx":null,"showstyle":"{}","stylepara":"{}","topPx":null,"widthPx":null},"sortid":null,"spanNum":null,"upIsPage":0}],"columnObjMap":null,"controlName":"两列等宽布局","controlType":5001,"longUnicode":"55433537-cde1-89b0-fb8f-e4afab4ce4a4","minUnicode":"columnContainer_5001_7fa68dbd","pageHighSetUp":{"id":null},"pageSetUp":{"cncontent":null,"encontent":null},"pageStyle":{"backgroundColor":null,"backgroundUrl":null,"backstyle":"{}","borderColor":null,"borderStyle":null,"borderWidth":null,"borderlinestyle":"{}","bottom":null,"fontColor":null,"fontIsItalic":null,"fontIsUnderline":null,"fontIsWeith":null,"fontSite":null,"fontSize":null,"frontstyle":"{}","heightPx":null,"leftPx":null,"rightPx":null,"showstyle":"{}","stylepara":"{}","topPx":null,"widthPx":null},"sortid":null,"spanNum":null,"upIsPage":1},{"childrenList":[],"columnObjMap":null,"controlName":"文本","controlType":1001,"longUnicode":"94f80415-c259-1dd2-c1fc-ad2265ea8ddb","minUnicode":"showText_1001_5aa59e7a","pageHighSetUp":{"id":null},"pageSetUp":{"cncontent":null,"encontent":null},"pageStyle":{"backgroundColor":"yellow","backgroundUrl":null,"backstyle":"{\"backgroundColor\":\"yellow\"}","borderColor":null,"borderStyle":null,"borderWidth":null,"borderlinestyle":"{}","bottom":null,"fontColor":"red","fontIsItalic":0,"fontIsUnderline":0,"fontIsWeith":1,"fontSite":"right","fontSize":null,"frontstyle":"{\"fontIsUnderline\":0,\"fontIsWeith\":1,\"fontSite\":\"right\",\"fontColor\":\"red\",\"fontIsItalic\":0}","heightPx":500,"leftPx":null,"rightPx":null,"showstyle":"{}","stylepara":"{\"heightPx\":500}","topPx":null,"widthPx":null},"sortid":null,"spanNum":null,"upIsPage":1}]
                },
            }
        },
        created(){
            
        },
        computed:{
        },
        watch:{
        },
        methods:{ 
        }
    }
</script>