<!--
    User:
    Date: pageSetModule  组件
    功能:
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.pageSetModule-cmp {
    width: 100%;
    height: 100%;
    background: #EDEFF3
}
.topWrap {
    width: 100%;
    height: 50px;
    padding: 0 20px;
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid red
}
.containerWrap {
    height: calc(100% - 50px);
}
.container-left {
    width: 300px
    border: 1px solid blue
}
.container-right {
    border: 1px solid black
    width: calc(100% - 300px);
    .setMainBox {
        height: 100%
        width: 100%;
    }
    .setPropertyBox {
        width: 300px;
        height: 100%;
        border-left: 1px solid red
    }
}
</style>
<template>
    <div class="pageSetModule-cmp">
        <div class="topWrap u-f-jsb u-f-ac">
            <div class="leftBox">页面设置页</div>
            <div class="rightBox">
                <el-button type="primary" size="mini">保存</el-button>
            </div>
        </div>
        <div class="containerWrap u-f-jc">
            <div class="container-left">
                左边组件选择区
                <left-page-setmodule-cmp
                    :objP="objP"
                ></left-page-setmodule-cmp>
            </div>
            <div class="container-right u-f-jst u-f-g1">
                <div class="setMainBox u-f-g1 u-f-s1">
                    设置区
                    <middle-page-setmodule-cmp></middle-page-setmodule-cmp>
                </div>
                <div class="setPropertyBox">
                    右边属性设置区
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
import { 
    REQ_OK
} from '@/api/config'
import { 
    getControlInfo
} from '@/api/systemManage'
import { 
    CommonInterfaceMixin
} from '@/utils/CommonInterfaceMixin'
import {
    fieldControlTypeMixin
} from '@/utils/newStyleMixins-components'
import SearchToolsCmp from '@/base/NewStyle-cmp/common-cmp/searchTool-cmp'
import LeftPageSetmoduleCmp from './leftSection-cmp/index'
import MiddlePageSetmoduleCmp from './middleSection-cmp/index'
export default {
    mixins: [fieldControlTypeMixin, CommonInterfaceMixin],
    props: {
        objP: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    components: {
        SearchToolsCmp,
        LeftPageSetmoduleCmp,
        MiddlePageSetmoduleCmp
    },
    data() {
        return {
        }
    },
    created(){
        this.initData()
    },
    computed:{
    },
    watch:{
    },
    methods:{
        //重新刷新获取数据
        _refreshData () {

        },
        initData(){
            this.getControlInfo()
        },
        getControlInfo(){
            this.loading = true
            let params = {
                commonCode: this.objP.relateb,
                type: 1
            }
            getControlInfo(params).then(res => {
                this.loading = false
                this.cmps = res.data.Data.records
            })
        },          
    }
}
</script>
