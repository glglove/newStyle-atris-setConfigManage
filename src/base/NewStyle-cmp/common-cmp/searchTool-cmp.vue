<!--
  User: gaol
  Date: 2020/12/30
  功能：通用的 搜索条件框组件 moreSearch 
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.more-search-conditions-cmp
    position relative
    margin 0 0px 10px 0
    box-sizing border-box
.serchContent
    opacity 0;
    height 1px;
    overflow hidden
    transition all .8s
    border-radius 5px
    padding 5px
.serchContent.show
    display block
    opacity 1
    border 1px dotted rgba(0,0,0,.1)
    margin 10px 0
    transition all .8s
</style>

<template>
    <div>
        <div 
            :span="24" 
            class="more-search-conditions-cmp"
        >
            <div 
                :class="['serchContentWrap']" 
                style="width:100%"
            >
                <div class="allBtnBox u-f-jsb">
                    <div class="otherBtnBox u-f-g0">
                        <slot name="handlerBtnWrap"></slot>
                    </div>

                    <div class="moreConditionsBtnBox">
                        <el-button 
                            type="primary" 
                            size="mini" 
                            @click.native="clickMoreConditionBtn"
                            icon="el-icon-search"
                        >
                            筛选
                            <i :class="[showMoreSearchWrap? 'el-icon-caret-top': 'el-icon-caret-bottom']"></i>
                        </el-button>
                    </div>  
                </div>

                <div 
                    :class="['serchContent', showMoreSearchWrap? 'show':'']" 
                    :style="serchContentStyle"
                >
                    <slot name="moreSearch"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{

    },
    components: {

    },
    computed: {
        serchContentStyle(){
            return `height:${this.searchContentHeight}px`
        }
    },
    watch: {

    },
    data(){
      return {
        showMoreSearchWrap: false,
        searchContentHeight: '',  // 搜索内容的宽度
      }
    },
    created(){

    },
    methods: {
        // 点击展开/收起搜索条件
        clickMoreConditionBtn(){
            this.$emit("emitRefreshTable", this.queryObj)
            this.showMoreSearchWrap = !this.showMoreSearchWrap
            // debugger
            let newObj = document.getElementsByClassName("serchContent")[0]
            if(this.showMoreSearchWrap){
                this.searchContentHeight = document.getElementsByClassName("serchContent")[0].scrollHeight || 0
                // console.log(document.getElementsByClassName("serchContent")[0].scrollHeight)
                document.getElementsByClassName("serchContent")[0].style.height = this.searchContentHeight + 'px'
            }else {
                document.getElementsByClassName("serchContent")[0].style.height = '1px'
            }
        }
    }
}
</script>


