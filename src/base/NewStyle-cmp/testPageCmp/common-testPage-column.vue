<style lang="stylus" rel="stylesheet/stylus" scoped></style>
<template>
    <div class="commonPage">
        <showing-text-cmp
            :obj="showTextObj"
        ></showing-text-cmp>
    </div>
</template>
<script type="text/ecmascript-6">
    import showingTextCmp from '@/base/NewStyle-cmp/common-cmp/showingComponents-cmp/text-cmp/index.vue'
    export default {
        components: {
            showingTextCmp
        },
        data() {
            return {
                showTextObj: {}
            }
        },
        created(){
            var showTextObjJSON = '{"childrenList":[],"controlType":1001,"longUnicode":"ee6002c2-ce1b-7dc2-9cc4-19cf3765c1e1","minUnicode":"showText_1001_a902492c","pageHighSetUp":{},"pageSetUp":{"cncontent":"23"},"pageStyle":{"backstyle":"{}","borderlinestyle":"{}","bottom":10,"fontIsItalic":0,"fontIsUnderline":0,"fontIsWeith":0,"fontSize":20,"frontstyle":"{\"fontIsUnderline\":0,\"fontIsWeith\":0,\"fontSize\":20,\"fontIsItalic\":0}","heightPx":10,"leftPx":15,"rightPx":15,"showstyle":"{\"leftPx\":15,\"bottom\":10,\"topPx\":10,\"rightPx\":15}","stylepara":"{\"widthPx\":100,\"heightPx\":10}","topPx":10,"widthPx":100},"upIsPage":1}';
            this.showTextObj = JSON.stringify(showTextObjJSON);
        },
        computed:{
        },
        watch:{
        },
        methods:{

        }
    }
</script>