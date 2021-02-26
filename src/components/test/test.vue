/
* Author: gaol
* Date: 2020/07/31
* Desc： 测试动态页面  页面code 为 config.js 中的 PA_PAGECODE_WAITEDEMPLOYEE
*/

<style lang="stylus" rel="stylesheet/stylus" scoped>
.testpage {
    height 100%;
}
.selected {
    border: 1px dotted black
}
</style>

<template>
    <div class="testpage">
        <!-- <input type="file" id="file" @input="upload">
        <el-button type="button" size="mini" @click.native="joinToPage('test1')">跳转到test1 页面</el-button> -->
        <!-- pageCode: {{pageCode}} -->
        <!-- <base-page-cmp
            :pageCode="pageCode"
            :authrityObj="authrityObj"
        ></base-page-cmp> -->

        <!--字段解释：
          subfield：双栏or单栏
          defaultOpen：preview  展示区域，预览区域
          toolbarsFlag：false，工具栏展示
        -->
        <!-- <div class="testjquery">tttt</div> -->
        <!-- <mavon-editor 
            class="markdown"
            :value="get_mark_data()"
            :subfield = "false"    
            :defaultOpen = "prop.defaultOpen"
            :toolbarsFlag = "prop.toolbarsFlag"
            :editable="prop.editable"
            :scrollStyle="prop.scrollStyle"
        ></mavon-editor> -->
        <!-- <common-table-cmp></common-table-cmp> -->
        <!-- <series-line-cmp></series-line-cmp> -->
        <!-- <test-line-cmp></test-line-cmp> -->

        <div
            :class="['tableBox', tableData.length<=0? 'not_found':'']"
            v-loading="loading"
        >
            <!-- tableData: {{tableData}} -->
            <el-table
                :data="tableData"
                border
                max-height="500px"
                empty-text=" "
            >

            <el-table-column
                type="selection"
                width="50"
            >
            </el-table-column>

            <el-table-column
                label="物理表名"
                prop="dbcode"
                width="200"
                show-overflow-tooltip
                sortable          
            >
                <template slot-scope="scope">
                <span>{{scope.row.dbcode}}</span>
                </template>
            </el-table-column>

            <el-table-column
                label="中文名"
                prop="name"
                width="200"
                show-overflow-tooltip
                sortable          
            >
                <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>

            <el-table-column
                label="主键"
                prop="pk"
                show-overflow-tooltip
                sortable     
                width="120"     
            >
                <template slot-scope="scope">
                <span>{{scope.row.pk}}</span>
                </template>
            </el-table-column>

            <el-table-column
                label="是否多行"
                prop="hasmore"
                show-overflow-tooltip
                sortable   
                width="120"       
            >
                <template slot-scope="scope">
                <span>{{scope.row.hasmore? '否':'是'}}</span>
                </template>
            </el-table-column>   

            <el-table-column
                label="状态"
                prop="state"
                width="120"
                show-overflow-tooltip
                sortable          
            >
                <template slot-scope="scope">
                <span>{{scope.row.state  == 1? '启用':'停用'}}</span>
                </template>
            </el-table-column>

            <el-table-column
                label="描述"
                show-overflow-tooltip
                prop="description"
            >
                <template slot-scope="scope">
                <span>{{scope.row.description}}</span>
                </template>
            </el-table-column>                  


            <el-table-column
                label="操作"
                width="250"
                fixed="right"
            >
                <template slot-scope="scope">
                <el-button 
                    v-if="scope.row.State == 0"
                    type="text" 
                    size="mini"
                    @click.native="handlerUsing(scope.row, 1)"
                >启用</el-button>
                <el-button 
                    v-if="scope.row.State == 1"
                    type="text" 
                    size="mini"
                    @click.native="handlerUsing(scope.row, 0)"
                >停用</el-button>      

                <el-button 
                    type="text" 
                    size="mini" 
                    @click.native="handleTableSet(scope.row, scope.$index)"
                >物理表设置</el-button>                       

                </template>
            </el-table-column>     
            </el-table>

            <!--分页部分--start--->
            <div class="pagination-container">
                <!-- <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="queryObj.pageNum"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="queryObj.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="queryObj.total">
                </el-pagination> -->
            </div>
            <!---分页部分--end--->           
        </div>

        <el-dialog
            v-if="showPageSet"
            fullscreen
            :visible.sync="showPageSet"
            :append-to-body="true"
            :close-on-click-modal="false"
        >
            <page-set-module-cmp
                :objP.sync="currentTableSetRow"                
            ></page-set-module-cmp>
        </el-dialog>


        <div class="wrap" style="border: 1px solid red" @click="handlerClick0($event)">
            wrap
            <div class="item1" style="border: 1px solid blue" @click="handlerClick1($event)">
                item1
                <div class="item2" style="border: 1px solid yellow" @click="handlerClick2($event)">
                    item2
                    <div 
                        class="item3" style="width: 300px;height: 300px;border: 1px solid silver"
                        @click="handlerClick3($event)"
                    >
                        item 3
                        <span class="ui yti">大家疯狂撒肥料大家发大水就</span>
                        <div class="uy marginT30" data-yu="fdjksf">
                            15范德萨发
                            <div data-atirsCode="78342ui" class="ui marginT30">的会计法律的</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { 
        REQ_OK
    } from '@/api/config'
    import { 
        PA_PAGECODE_JOINEDEMPLOYEE, 
        PA_PAGECODE_WAITEDEMPLOYEE,
        PA_PAGECODE_LEAVEDEMPLOYEE,
        PA_PAGECODE_CONTRACTMANAGE
    } from '@/api/newStyleConfig'
    import { authorityArr } from '@/utils/authority1.js'
    //   import pageCmp from '@/base/NewStyle-cmp/Page-cmp/Base-page'
    // import BasePageCmp from '@/base/NewStyle-cmp/Page-cmp/Base-page'
    // import SeriesLineCmp from '@/base/NewStyle-cmp/Content-section-cmp/Echarts-cmp/Base-seriesLine'
    // import TestLineCmp from '@/base/NewStyle-cmp/Content-section-cmp/Echarts-cmp/test-cmp'
    // import CommonTableCmp from '@/base/NewStyle-cmp/Table-common-cmp/Base-Common-Table'
    import pageSetModuleCmp from '@/base/NewStyle-cmp/common-cmp/pageSetModule-cmp/index'
    import $ from 'jquery'
    import { 
        getDataBaseList,
    } from '@/api/systemManage.js'
    import {
        setLocalStorage,
        getLocalStorage
    } from '@/utils/auth.js'
export default {
    components: {
        pageSetModuleCmp
        // BasePageCmp,
        // SeriesLineCmp,
        // TestLineCmp,
        // CommonTableCmp
    },
    data(){
        return {
            loading: false,
            tableData: [],
            showPageSet: false,
            currentTableSetRow: {},
            queryObj: {
                pageSize: 10,
                pageNum: 1,
                total: 0,
                state: 1,
                moduleCode: ''
            },
        }
    },
    computed: {
      prop () {
        let data = {
          subfield: true,// 单双栏模式
          defaultOpen: 'edit',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域 
          editable: true,
          toolbarsFlag: true,
          scrollStyle: true
        }
        return data
      }        
    },
    created(){
        // $(function(){
        //     $('.testjquery').text("这是用jq填充的内容")
        // })
        let authrityObj = getLocalStorage("pageAuthrity")
        if(authrityObj) {

        }else {
            // this._getAuthrityObj(this.pageCode)
            // 存入缓存
            setLocalStorage("authrityObj", JSON.stringify(this.authrityObj))
        }
        this.getDataBaseList()
    },
    methods: {
        get_mark_data(){
            return '<div style="color:red">测试makdown</div>'
        },
        // 获取当前页面的权限数据
        _getAuthrityObj(pageCode){
            //...
            // 获取数据后 存入 localstorage
            setLocalStorage("authrityObj", JSON.stringify(this.authrityObj))
        },
        joinToPage(str){
            this.$router.push({
                path: `/${str}`
            })
        },
        fileInfo(){
            debugger
            let fileObj = document.getElementById('file').files[0];
            console.log(fileObj);   
                     
        },
         // 从start字节处开始上传
        upload(start) {

            const chunkSize = 1024 * 1024;
            let fileObj = document.getElementById('file').files[0];
            // 上传完成
            if (start >= fileObj.size) {
                return;
            }
            // 获取文件块的终止字节
            let end = (start + chunkSize > fileObj.size) ? fileObj.size : (start + chunkSize);
            // 将文件切块上传
            let fd = new FormData();
            fd.append('file', fileObj.slice(start, end));
            // POST表单数据
            let xhr = new XMLHttpRequest();
            xhr.open('post', 'upload.php', true);
            xhr.onload = function() {
                if (this.readyState == 4 && this.status == 200) {
                    // 上传一块完成后修改进度条信息，然后上传下一块
                    let progress = document.getElementById('progress');
                    progress.max = fileObj.size;
                    progress.value = end;
                    upload(end);
                }
            }
            xhr.send(fd);
        },
        // 获取物理表列表
        getDataBaseList(){
            this.loading = true
            getDataBaseList().then(res => {
                this.loading = false
                this.tableData = res.data.Data.records
                this.queryObj.total = res.data.Data.total
            })
        },        
        // 物理表设置
        handleTableSet(row, index){
            debugger
            this.currentTableSetRow = JSON.parse(JSON.stringify(row))
            this.showPageSet  = true
        },  
        handlerClick0(event){
            console.log("0中 打印 event",event)
        },
        handlerClick1(event){
            console.log("1中 打印 event",event)

        },
        handlerClick2(event){
            console.log("2中 打印 event",event)

        },
        handlerClick3(e){
            let event = e || window.event
            console.log("3中 打印 event",event)
            event.preventDefault ? event.preventDefault() : (event.returnValue = false)
            event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true)

            let target = event.target||event.srcElement
            if($(target).hasClass("ui")) {
                let code = target.dataset.atirsCode
                alert('code')
                $(target).css({
                    backgroundColor: 'red'
                })
            }else {
                // alert('no')
                alert(89)
            }
        }                                     

    }
}
</script>

