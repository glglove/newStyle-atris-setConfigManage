<!--
    User:
    Date:
    功能:  标签组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.tagWrap {
    .item {
        position: relative;
        width: 100%;
        &.select {
            background: #E4E7ED
        }
        &:hover {
            background: #EBEEF5
        }
        &:active {
            background: #E4E7ED
        }
        .text {
            margin-left 10px;
        }
        &:before {
            content: '';
            position: absolute;
            width: 2px;
            height: 15px;
            top: 50%;
            transform: translateY(-50%);
            background: red
        }
    }
}
</style>
<template>
    <div class="taglistCmp">
        taglist 组件
        <ul class="tagWrap u-f-ajc u-f-column">
            <li 
                :class="['item', currentTagSelectIdx === key? 'select':'']"
                v-for="(tag, key) in tags"
                :key="key"
                @click="handlerClickTag(tag, key)"
            >
                <el-button
                    class="text"
                    type="text"
                    :disable-transitions="false"
                >
                    {{tag.name}}
                </el-button>                              
            </li>                       
        </ul>
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
    components: {
        SearchToolsCmp,
    },
    data() {
        return {
            currentTagSelectIdx: 0,
            tags: [
                {
                    name: '美容',
                },
                {
                    name: '美发',
                },
                {
                    name: '染发',
                }                                
            ]
        }
    },
    created(){
    },
    computed:{
    },
    watch:{
    },
    methods:{
        //重新刷新获取数据
        _refreshData(){
        },
        _getComTables(){
        },
        handlerClickTag(tag, index){
            this.currentTagSelectIdx = index
        },
    }
}
</script>
