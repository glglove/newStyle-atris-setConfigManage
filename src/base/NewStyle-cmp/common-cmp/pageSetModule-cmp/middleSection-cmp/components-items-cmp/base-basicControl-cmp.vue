<!--
    User:
    Date:
    功能: 基础控件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
<template>
    <div class="basicControl-cmp" :id="ballId">
        <el-row :style="styleWidth">
            <el-col :span="24">
                basicControl-cmp    
            </el-col>
        </el-row>
    </div>
</template>
<script type="text/ecmascript-6">
import { 
    REQ_OK
} from '@/api/config'
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
           return `${this.obj.options.width}`
       }
   },
   methods:{
   },
}
</script>
