<!--
    User:
    Date:
    功能: 纯容器布局组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.grid-row {
    min-height: 100px;
}
.content-layout-item{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 2px;
    background-color: #837e87;
    color: #ffffff;
}
</style>
<template>
    <div class="basicGrid-simpleContainer-cmp" :id="ballId">
        obj: {{obj}}
        <el-row :style="styleWidth" class="u-f grid-row">
            <el-col
                v-for="(col, key) in obj.atrisCols" 
                :key="key"
                :span="col.span"
                class="content-layout-item"
                :class="obj.num[key].layoutClass" 
            >
                列{{key+1}}
            </el-col>
        </el-row>
    </div>
</template>
<script type="text/ecmascript-6">
import { fieldControlTypeMixin } from '@/utils/newStyleMixins-components.js'
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
    mixins: [fieldControlTypeMixin],
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
