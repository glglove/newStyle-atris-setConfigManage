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
    // border: 1px solid red
}
.containerWrap {
    height: calc(100vh - 50px);
    overflow: auto;
    .fixedLeftNavWrap {
        position: fixed;
        left: 0;
        width: 50px;
        height: calc(100vh - 50px);
        background: #f2f3f5;
        .leftNavItem {
            font-size: 20px;
            margin: 20px;
            .el-tooltip {
                display: block;
            }
        }
    }    
}
.container-left {
    width: 300px;
    padding-left: 30px;
    box-sizing: border-box;
    // border: 1px solid blue
    .cmpTitWrap {
        height: 30px;
        line-height: 30px;
        margin: 20px 0 0 0;
        padding: 0 10px;
        background: #ffffff
    }
    .leftSetCmpModule {

    }
}
.container-right {
    // border: 1px solid black
    width: calc(100% - 300px);
    padding: 0 0 20px 20px;
    box-sizing: border-box;
    &.open {
        margin-left: 50px;
    }
    .setMainBox {
        height: 100%
        width: 100%;
    }
    .setPropertyBox {
        width: 300px;
        height: 100%;
        padding: 20px 0 0 20px;
        box-sizing: border-box;
        // border-left: 1px solid red
    }
}
</style>
<template>
    <div class="pageSetModule-cmp">
        <div class="topWrap u-f-jsb u-f-ac">
            <div class="leftBox">
                <h4>页面设置页</h4>
            </div>
            <div class="rightBox">
                <el-button type="info" size="mini" disabled>预览</el-button>
                <el-button type="primary" size="mini">保存</el-button>
            </div>
        </div>
        <div class="containerWrap u-f-jc">
            <ul class="fixedLeftNavWrap u-f-column u-f-ac">
                <li class="leftNavItem">
                    <el-tooltip effect="dark" content="大纲树" placement="right">
                        <i 
                            class="el-icon-s-unfold"
                           @click="handlerClickLeftNav('programTree')" 
                        ></i>
                    </el-tooltip>
                </li>
                <li class="leftNavItem">
                    <el-tooltip effect="dark" content="组件库" placement="right">
                        <i 
                            class="el-icon-s-unfold"
                            @click="handlerClickLeftNav('cmp')"
                        ></i>
                    </el-tooltip>
                </li>
            </ul>   
            <div class="container-left" v-if="leftCmpBoxShow">
                <div class="cmpTitWrap u-f-jsb u-ac">
                    <h3>{{currentNavTit}}</h3>
                    <div class="close">
                        <i class="el-icon-close" @click="closeCmpBox"></i>
                    </div>
                </div>
                <left-page-setmodule-cmp
                    class="leftSetCmpModule"
                    :objP="objP"
                ></left-page-setmodule-cmp>
            </div>
            <div class="container-right u-f-jst u-f-g1" :class="leftCmpBoxShow?'':'open'">
                <div class="setMainBox u-f-g1 u-f-s1">
                    <middle-page-setmodule-cmp></middle-page-setmodule-cmp>
                </div>
                <div class="setPropertyBox">
                    <right-page-setproperty-cmp></right-page-setproperty-cmp>
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
import { mapGetters } from 'vuex'
import {
    fieldControlTypeMixin
} from '@/utils/newStyleMixins-components'
import SearchToolsCmp from '@/base/NewStyle-cmp/common-cmp/searchTool-cmp'
import LeftPageSetmoduleCmp from './leftSection-cmp/index'
import MiddlePageSetmoduleCmp from './middleSection-cmp/index'
import RightPageSetpropertyCmp from './rightSection-cmp/index'
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
        MiddlePageSetmoduleCmp,
        RightPageSetpropertyCmp
    },
    data() {
        return {
            currentNavTit: '组件库'
        }
    },
    created(){
        this.initData()
    },
    computed:{
      ...mapGetters([
        'leftCmpBoxShow',
        'currentLeftNavType'
      ]),
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
        handlerClickLeftNav(str){
            switch(str){
                case 'programTree':
                    this.currentNavTit = '大纲树'
                    return this.$store.dispatch("setPageSetLeftCmpBoxStatus", {
                        navType: 1,
                        flag: this.leftCmpBoxShow? (this.currentLeftNavType == 2 ? true : false) : true
                    })                
                case 'cmp':
                    this.currentNavTit = '组件库'
                    return this.$store.dispatch("setPageSetLeftCmpBoxStatus", {
                        navType: 2,
                        flag: this.leftCmpBoxShow? (this.currentLeftNavType == 1 ? true : false) : true
                    })
            }
        },
        closeCmpBox() {
            this.$store.dispatch("setPageSetLeftCmpBoxStatus", {
                navType: this.currentLeftNavType,
                flag: false
            })
        },        
    }
}
</script>
