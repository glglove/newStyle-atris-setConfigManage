<!--
    User:
    Date:
    功能: 高级组件(表布局组件、分组组件、tab选项卡组件)
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
<template>
    <div class="basicGrid-highLevel-cmp" :id="ballId">
        obj: {{obj}}
        <el-row :style="styleWidth">
            <el-col :span="24">
                高级组件(表布局组件、分组组件、tab选项卡组件)   
            </el-col>
        </el-row>
    </div>
</template>
<script type="text/ecmascript-6">
import { 
    REQ_OK
} from '@/api/config'
let flexMap = [
    'flex-one',
    'flex-two',
    'flex-three',
    'flex-four',
    'flex-five'
]
let flexHash = {
    'flex-one': 1,
    'flex-two': 2,
    'flex-three': 3,
    'flex-four': 4,
    'flex-five': 5
}
export default {
    props:{
        parentAtrisCode: {
            type: String,
            default: () => {
                return ''
            }
        },
        obj: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
        }
    },
    created(){
    },
    computed:{
        ballId(){
            if(this.parentAtrisCode && this.obj.atrisCode) {
                return `${this.parentAtrisCode}-${this.obj.atrisCode}`
            }
        },
        styleWidth(){
            return `${this.obj.atrisOptions.width}`
            // return '100%'
        }
    },
    methods:{
    },
}
</script>
