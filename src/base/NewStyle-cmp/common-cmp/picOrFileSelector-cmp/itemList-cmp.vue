<!--
    User:
    Date:
    功能:  图片/文件 列表组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.itemListWrap {
    width: 100px
    margin: 5px;
    .img {
        width: 100%;
        height: 100px;
    }
}
</style>
<template>
    <div class="picOrFileListCmp">
        图片/文件 列表 组件
        <div class="u-f-jst u-f-wrap">
            <div 
                class="itemListWrap"
                v-for="(item, key) in dataList"
                :key="key"
            >
                <el-image
                    class="img"
                    :src="item.url"
                    fit="contain"
                >
                </el-image>
                <el-span class="center">{{item.name}}</el-span>
            </div>
        </div>
        <!--分页部分--start--->
        <div class="pagination-container">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="queryObj.pageIndex"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="queryObj.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="queryObj.total">
            </el-pagination>
        </div>
        <!---分页部分--end--->  
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
            dataList: [
                {
                    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa4.att.hudong.com%2F63%2F70%2F06300000046969120433706514748.jpg&refer=http%3A%2F%2Fa4.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615278986&t=f23292f56f7885e948ef5a7f83acc6f6',
                    name: '图一'
                },
                {
                    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa4.att.hudong.com%2F63%2F70%2F06300000046969120433706514748.jpg&refer=http%3A%2F%2Fa4.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615278986&t=f23292f56f7885e948ef5a7f83acc6f6',
                    name: '图二'                    
                },
                {
                    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa4.att.hudong.com%2F63%2F70%2F06300000046969120433706514748.jpg&refer=http%3A%2F%2Fa4.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615278986&t=f23292f56f7885e948ef5a7f83acc6f6',
                    name: '图三'                    
                },
                {
                    url: 'https://ss3.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/42166d224f4a20a4b44741a690529822720ed072.jpg',
                    name: '图四'                    
                },
                {
                    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa4.att.hudong.com%2F82%2F55%2F01300000349330124003555691086.jpg&refer=http%3A%2F%2Fa4.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615278986&t=3473abc62522ee6dd5ea667cfff34506',
                    name: '图五'                    
                },
                {
                    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa4.att.hudong.com%2F63%2F70%2F06300000046969120433706514748.jpg&refer=http%3A%2F%2Fa4.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615278986&t=f23292f56f7885e948ef5a7f83acc6f6',
                    name: '图六'                    
                },
                {
                    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa3.att.hudong.com%2F08%2F22%2F01300000013945118822221353308.jpg&refer=http%3A%2F%2Fa3.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615278986&t=6f505bc0831991ef2985eb80f15d1e15',
                    name: '图七'                    
                },
                {
                    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa4.att.hudong.com%2F63%2F70%2F06300000046969120433706514748.jpg&refer=http%3A%2F%2Fa4.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615278986&t=f23292f56f7885e948ef5a7f83acc6f6',
                    name: '图八'                    
                },  
                {
                    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa4.att.hudong.com%2F63%2F70%2F06300000046969120433706514748.jpg&refer=http%3A%2F%2Fa4.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615278986&t=f23292f56f7885e948ef5a7f83acc6f6',
                    name: '图八'                    
                }, 
                {
                    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa4.att.hudong.com%2F63%2F70%2F06300000046969120433706514748.jpg&refer=http%3A%2F%2Fa4.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615278986&t=f23292f56f7885e948ef5a7f83acc6f6',
                    name: '图八'                    
                },   
                {
                    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa4.att.hudong.com%2F63%2F70%2F06300000046969120433706514748.jpg&refer=http%3A%2F%2Fa4.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615278986&t=f23292f56f7885e948ef5a7f83acc6f6',
                    name: '图九'                    
                },
                {
                    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa4.att.hudong.com%2F63%2F70%2F06300000046969120433706514748.jpg&refer=http%3A%2F%2Fa4.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615278986&t=f23292f56f7885e948ef5a7f83acc6f6',
                    name: '图十'                    
                },
                {
                    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa4.att.hudong.com%2F63%2F70%2F06300000046969120433706514748.jpg&refer=http%3A%2F%2Fa4.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615278986&t=f23292f56f7885e948ef5a7f83acc6f6',
                    name: '图十一'                    
                },
                {
                    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa4.att.hudong.com%2F63%2F70%2F06300000046969120433706514748.jpg&refer=http%3A%2F%2Fa4.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615278986&t=f23292f56f7885e948ef5a7f83acc6f6',
                    name: '图十二'                    
                },
                 {
                    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa4.att.hudong.com%2F63%2F70%2F06300000046969120433706514748.jpg&refer=http%3A%2F%2Fa4.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615278986&t=f23292f56f7885e948ef5a7f83acc6f6',
                    name: '图十三'                    
                }, 
                {
                    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa4.att.hudong.com%2F63%2F70%2F06300000046969120433706514748.jpg&refer=http%3A%2F%2Fa4.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615278986&t=f23292f56f7885e948ef5a7f83acc6f6',
                    name: '图十四'                    
                }, 
                {
                    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa4.att.hudong.com%2F63%2F70%2F06300000046969120433706514748.jpg&refer=http%3A%2F%2Fa4.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615278986&t=f23292f56f7885e948ef5a7f83acc6f6',
                    name: '图十五'                    
                }, 
                {
                    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa4.att.hudong.com%2F63%2F70%2F06300000046969120433706514748.jpg&refer=http%3A%2F%2Fa4.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615278986&t=f23292f56f7885e948ef5a7f83acc6f6',
                    name: '图十六'                    
                }, 
                {
                    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa4.att.hudong.com%2F63%2F70%2F06300000046969120433706514748.jpg&refer=http%3A%2F%2Fa4.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615278986&t=f23292f56f7885e948ef5a7f83acc6f6',
                    name: '图十七'                    
                }, 
                {
                    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa4.att.hudong.com%2F63%2F70%2F06300000046969120433706514748.jpg&refer=http%3A%2F%2Fa4.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615278986&t=f23292f56f7885e948ef5a7f83acc6f6',
                    name: '图十八'                    
                }, 
                {
                    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa4.att.hudong.com%2F63%2F70%2F06300000046969120433706514748.jpg&refer=http%3A%2F%2Fa4.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615278986&t=f23292f56f7885e948ef5a7f83acc6f6',
                    name: '图十九'                    
                }, 
                {
                    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa4.att.hudong.com%2F63%2F70%2F06300000046969120433706514748.jpg&refer=http%3A%2F%2Fa4.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615278986&t=f23292f56f7885e948ef5a7f83acc6f6',
                    name: '图二十'                    
                },  
                {
                    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa4.att.hudong.com%2F63%2F70%2F06300000046969120433706514748.jpg&refer=http%3A%2F%2Fa4.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615278986&t=f23292f56f7885e948ef5a7f83acc6f6',
                    name: '图二十一'                    
                },  
                {
                    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa4.att.hudong.com%2F63%2F70%2F06300000046969120433706514748.jpg&refer=http%3A%2F%2Fa4.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615278986&t=f23292f56f7885e948ef5a7f83acc6f6',
                    name: '图二十二'                    
                },  
                {
                    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa4.att.hudong.com%2F63%2F70%2F06300000046969120433706514748.jpg&refer=http%3A%2F%2Fa4.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615278986&t=f23292f56f7885e948ef5a7f83acc6f6',
                    name: '图二十三'                    
                },  
                {
                    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa4.att.hudong.com%2F63%2F70%2F06300000046969120433706514748.jpg&refer=http%3A%2F%2Fa4.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615278986&t=f23292f56f7885e948ef5a7f83acc6f6',
                    name: '图二十四'                    
                }                                                                                                                                                                                                                                                                                                                                                                                                         
            ],
            queryObj: {
                pageSize: 24,
                pageNum: 1,
                total: 0
            }
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
        // 分页--一页展示多少条
        handleSizeChange (val) {
            this.queryObj.pageSize = val
            // this._getPaEmployeeTable()
        },
        // 分页--上一页，下一页
        handleCurrentChange (val) {
            this.queryObj.pageIndex = val
            // this._getPaEmployeeTable()
        },         
    }
}
</script>
