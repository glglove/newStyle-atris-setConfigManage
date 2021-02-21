<!--
    User:
    Date:
    功能:  高级组件——表布局组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.highLevel-tableSection {
    width: 100%;
    min-height: 100px;
}
</style>
<template>
    <div class="highLevel-tableSection">
        表布局组件
        <el-table 
            :data="tableData"
            style="width: 100%"
        >
            <el-table-column
                prop="name"
                label="姓名"
                width="180"
            ></el-table-column>
            <el-table-column
                prop="age"
                label="年龄"
            ></el-table-column>
        </el-table>
    </div>
</template>
<script type="text/ecmascript-6">
import { 
    REQ_OK
} from '@/api/config'
import { 
    CommonInterfaceMixin
} from '@/utils/CommonInterfaceMixin'
import SearchToolsCmp from '@/base/NewStyle-cmp/common-cmp/searchTool-cmp'
export default {
    mixins: [CommonInterfaceMixin],
    props: {
        obj: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    components: {
        SearchToolsCmp,
    },
    data() {
        return {
            tableData: [
                {
                    name: '张三',
                    age: 18
                },
                {
                    name: '李四',
                    age: 28
                }
            ]
        }
    },
    created(){
    },
    computed:{
    },
    watch:{
        obj: {
            handler(newValue, oldValue) {
                this.$emit("update:obj", newValue)
            }
        }
    },
    methods:{

    }
}
</script>
