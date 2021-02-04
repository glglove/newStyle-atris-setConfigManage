<!--
    User:
    Date:
    功能:  通用字典表 树形组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@keyframes emptyAnimate {
    0% {
        border: none !important 
    }
    100% {
        // transform scale(1.1)
        border: 1px solid red
    }
}

.dicCmpTreeWrap
    >>>.el-tree-node__content
        height 45px !important;
        .el-tree-node__expand-icon
            margin-top -5px; 
    >>>.el-form-item__content
        line-height 30px !important
    >>>.el-input__inner 
        height 20px !important;
        line-height 20px !important;
    >>>.el-input__icon
        line-height 30px !important
    >>>.el-select-dropdown
        top 195px !important
    >>>.el-color-picker
        vertical-align top
    >>>.el-image
        vertical-align middle
    >>>.el-tree-node>.el-tree-node__children
        overflow visible !important
    .treeBox
        margin-left 50px
    .showFilterWrap
    .markWrap
        padding 0 10px 10px 10px;
        font-size 12px;
        line-height 15px;
        .text
            color: #909399
    .dic-tree
        margin 10px 20px
.commonDicCmp
    >>>.custom-tree-wrap
        height 100%
        display inline-block
        .nameBox,.descriptionBox,.remarkBox,.colorBox,.picBox,.cmpExplainBox,.childCmpBox,.cmpIsrequiredBox
            height 100%
            display inline-block
            line-height 26px;
            .name-input
                width 100px;
            .name-input.empty
                >>>.el-input__inner
                    border-radius 5px;
                    animation emptyAnimate 1s ease 1
                    animation-fill-mode:forwards
            .name-text
                font-size 12px;
        .nameBox
            margin 0 10px
        .descriptionBox
            margin 0 10px
        .remarkBox
            margin 0 10px
        .colorBox
            margin 0 10px        
        .picBox
            margin 0 10px        
        .cmpExplainBox
            margin 0 10px        
        .childCmpBox
            margin 0 10px        
        .cmpIsrequiredBox
            margin 0 10px        
        .handlerBox
            margin-left 40px        
            display inline-block
</style>
<template>
    <div class="commonDicCmp" v-loading = 'loading'>
        treeData: {{treeData}}  
        <el-row class="dic-row dicCmpTreeWrap">              
            <el-col :span="24">
                <div class="addNewTreeBox">
                    <el-button 
                        class="addNewTree rt" 
                        size="mini" 
                        type="primary" 
                        @click.native="addNewTree"
                    >新增</el-button>
                </div>                  
                <div class="treeBox" v-if="treeData.length">
                    <div class="showFilterWrap">
                        <el-checkbox v-model="showFilterObj.showRemark">备注</el-checkbox>
                        <el-checkbox v-model="showFilterObj.showColors">颜色</el-checkbox>
                        <el-checkbox v-model="showFilterObj.showLogo">图片</el-checkbox>
                        <el-checkbox v-model="showFilterObj.showControlText">控件说明</el-checkbox>
                        <el-checkbox v-model="showFilterObj.showControlType">子项后控件</el-checkbox>
                        <el-checkbox v-model="showFilterObj.showIsConfig">控件内容必填</el-checkbox>
                    </div>
                    <div class="markWrap">
                        <p class="text"><i class="el-icon-info">颜色,图片尽在单选框和多选框下有效</i></p>
                        <p class="text"><i class="el-icon-info"></i>选中项目且后面有其他控件时,控件前面的说明,控件类型和控件内容是否为必填项</p>
                    </div>
                    <el-input
                        v-if="showSearch"
                        style="width: 450px;margin-bottom:20px"
                        placeholder="输入关键字进行过滤"
                        v-model="filterText">
                    </el-input>    

                    <el-tree
                        ref="tree"
                        class="dic-tree"
                        :data="treeData"
                        :draggable="propDraggable "
                        :show-checkbox="false"
                        node-key="treeId"
                        :props="{
                            label: 'dicName',
                            children: 'childrenList',
                        }"
                        default-expand-all
                        :expand-on-click-node="false"
                        :filter-node-method="filterNode"
                        @node-drop="nodeDrop"
                    >
                            <span :class="['custom-tree-wrap', 'u-f-jc'] " slot-scope="{ node, data }">
                                <!-- data: {{data}} -->
                                <el-form :model="data" :ref="`dataForm_${data.dicCode}`" :class="[`form_${data.dicCode}`, 'form']">     
                                    <span class="nameBox">
                                        <el-form-item v-if="data.isEditing" prop="dicName" :rules="data.itemRules">
                                            <el-input
                                                :class="['name-input', data.dicCode === currentDicCode?'empty':'']"
                                                v-model="data.dicName"
                                                placeholder="请输入"
                                                @change="nameInputChange(node, data)"
                                            >
                                            </el-input>
                                        </el-form-item>                                
                                        <span v-else class="name-text">项目名：{{ data.dicName }}</span>                            
                                    </span>

                                    <span 
                                        class="descriptionBox" 
                                    >
                                        <el-form-item v-if="data.isEditing" prop="description" :rules="{required: false, message: '描述为空', trigger: 'blur'}">
                                            <el-input
                                                class="name-input"      
                                                v-model="data.description"
                                                style="width: 300px"
                                                maxlength="40"
                                                placeholder="请输入描述"
                                            >
                                            </el-input>
                                        </el-form-item>                                
                                        <span v-else class="name-text">描述：{{ data.description }}</span>                             
                                        
                                    </span>

                                    <span 
                                        v-show="showFilterObj.showRemark"
                                        class="remarkBox" 
                                    >
                                        <el-form-item v-if="data.isEditing" prop="remark" :rules="{required: false, message: '描述为空', trigger: 'blur'}">
                                            <el-input
                                                class="name-input"      
                                                v-model="data.remark"
                                                style="width: 150px"
                                                maxlength="40"
                                                placeholder="请输入备注"
                                            >
                                            </el-input>
                                        </el-form-item>                                
                                        <span v-else class="name-text">备注：{{ data.remark }}</span>                             
                                        
                                    </span>                                    

                                    <span
                                        v-show="showFilterObj.showColors"
                                        class="colorBox"
                                    >
                                        <el-form-item 
                                            v-if="data.isEditing"
                                            prop="colors" 
                                            :rules="{required: false, message: '颜色为空', trigger: 'blur'}"
                                        >
                                            {{data.colors}}
                                            <el-color-picker 
                                                size="mini" 
                                                v-model="data.colors"
                                                show-alpha
                                                :predefine="[
                                                    '#ff4500',
                                                    '#ff8c00',
                                                    '#ffd700',
                                                    '#90ee90',
                                                    '#00ced1',
                                                    '#1e90ff',
                                                    '#c71585',
                                                    'rgba(255, 69, 0, 0.68)',
                                                    'rgb(255, 120, 0)',
                                                    'hsv(51, 100, 98)',
                                                    'hsva(120, 40, 94, 0.5)',
                                                    'hsl(181, 100%, 37%)',
                                                    'hsla(209, 100%, 56%, 0.73)',
                                                    '#c7158577'                                                    
                                                ]"
                                            >颜色</el-color-picker>
                                        </el-form-item>
                                        <span v-else class="name-text">
                                            颜色：{{data.colors || '#000000'}}
                                        </span>
                                    </span>

                                    <span
                                        v-show="showFilterObj.showLogo"
                                        class="picBox"
                                    >
                                        <el-form-item 
                                            v-if="data.isEditing"
                                            prop="logo" 
                                            :rules="{required: false, message: 'logo图片为空', trigger: 'blur'}"
                                        >
                                            <el-image 
                                                v-if="data.logo"
                                                style="width: 25px;height: 20px"
                                                :src="data.logo"
                                                fit="fill"
                                            >
                                            </el-image>  
                                            <!-- <el-button 
                                                v-show="data.logo"
                                                size="mini" 
                                                type="text"
                                            >{{data.logo}}</el-button> -->
                                            <el-popover
                                                placement="top-start"
                                                title="上传图片"
                                                width="400"
                                                trigger="click"
                                                @show="showPopver(data)"
                                                v-model="data.showImgPopver"
                                            >                  
                                                <div class="popover-content">
                                                    <base-img-upload 
                                                        showType="1"
                                                        :obj.sync="data"
                                                        @emitUpload="emitUpload($event, data)"
                                                    ></base-img-upload>
                                                </div>     
                                                <el-button 
                                                    size="mini"
                                                    slot="reference"
                                                >上传图片</el-button>                   
                                            </el-popover>
                                        </el-form-item>
                                        <span v-else>
                                            图片：
                                            <el-image 
                                                v-if="data.logo"
                                                style="width: 25px;height: 20px"
                                                :src="data.logo"
                                                fit="fill"
                                            >
                                            </el-image>   
                                            <span v-else>无</span>                                   
                                        </span>                                   
                                    </span>   

                                    <span
                                        v-show="showFilterObj.showControlText"
                                        class="cmpExplainBox"
                                    >
                                        <el-form-item v-if="data.isEditing" prop="controlText" :rules="{required: false, message: '控件说明为空', trigger: 'blur'}">
                                            <el-input
                                                class="name-input"      
                                                v-model="data.controlText"
                                                style="width: 200px"
                                                maxlength="40"
                                                placeholder="请输入控件说明"
                                            >
                                            </el-input>
                                        </el-form-item>                                
                                        <span v-else class="name-text">
                                            说明：{{ data.controlText? data.controlText: '无' }}
                                        </span>                             
                                    </span>   

                                    <span
                                        v-show="showFilterObj.showControlType"
                                        class="childCmpBox"
                                    >
                                        <el-form-item 
                                            v-if="data.isEditing"
                                            prop="controlType" 
                                            :rules="{required: false, message: '子项后控件为空', trigger: 'blur'}"
                                        >
                                            <el-select 
                                                v-model="data.controlType" 
                                                placeholder="请选择子项控件"
                                                clearable
                                                filterable
                                                style="width: 150px"
                                            >
                                                <el-option 
                                                    v-for="(item, key) in childCmpList"
                                                    :key="key"
                                                    :label="item.controlName"
                                                    :value="item.controlType + ''"
                                                >
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <span v-else class="name-text">
                                            控件：{{data.controlType | controlTypeSwitch(data.controlType)}}
                                        </span>
                                    </span>  

                                    <span
                                        v-show="showFilterObj.showIsConfig"
                                        class="cmpIsrequiredBox"
                                    >
                                        <el-form-item 
                                            v-if="data.isEditing"
                                            prop="isConfig" 
                                            :rules="{required: false, message: '控件为空', trigger: 'blur'}"
                                        >
                                            <el-checkbox v-model="data.isConfig">必填</el-checkbox>
                                        </el-form-item>
                                        <span v-else class="name-text">
                                            必填：{{data.controlType? '是':'否'}}
                                        </span>                                    
                                    </span>                                                                                                                            


                                    <span 
                                        v-if="!onlyRead"
                                        class="handlerBox" 
                                    >                         
                                        <el-button
                                            class="btn btn-add"
                                            size="mini"
                                            type="text"
                                            @click="() => append(node,data)">
                                            新增
                                        </el-button>                                    
                                        <el-button
                                            v-show="!data.isEditing"
                                            class="btn btn-edit"
                                            size="mini"
                                            type="text"
                                            @click="() => edit(node, data)">
                                            编辑
                                        </el-button>      
                                        <el-button
                                            v-show="data.isEditing"
                                            class="btn btn-edit"
                                            size="mini"
                                            type="text"
                                            @click="() => cancel(node, data)">
                                            取消
                                        </el-button>                                                        
                                        <el-button
                                            v-if="!data.id"
                                            class="btn btn-delet"
                                            size="mini"
                                            type="text"
                                            @click="() => remove(node, data)">
                                            移除
                                        </el-button>      
                                        <el-button
                                            v-if="data.id"
                                            class="btn btn-delet"
                                            size="mini"
                                            type="text"
                                            @click="() => handlerStopOrUsing(node, data)">
                                            {{data.state==1? '停用':'启用'}}
                                        </el-button>                                                                    
                                    </span>
                                </el-form>
                            </span> 
                    </el-tree>  
                    <save-footer
                        :cancelBtnIsShow="false"
                        saveBtnSize="mini"
                        cancelBtnSize="mini"
                        @save="saveTree"
                        @cancel="cancelTree"
                    ></save-footer>                       
                </div>              
            </el-col>
        </el-row>     

        addNewObj: {{addNewObj}}
        <atris-drawer-cmp
          v-if="showAddNew"
          tit="新增"    
          :dialog.sync="showAddNew"    
          width="400px"    
          @emitClickSureBtn="saveAdd"
        >  
            <el-form 
                slot="container-slot" 
                ref="addNewForm" 
                label-width='50px'
                :model="addNewObj" 
                :rules="addNewObjRules"
            >
                <el-form-item  label="名称" prop="dicName">
                    <el-input
                        style="width: 250px;"
                        v-model="addNewObj.dicName"
                        size="small"
                        placeholder="请输入名称"
                    >
                    </el-input>
                </el-form-item>  
                <el-form-item label="描述" prop="description">
                    <el-input
                        size="small"
                        style="width: 250px;"
                        v-model="addNewObj.description"
                        placeholder="请输入描述"
                    >
                    </el-input>
                </el-form-item>                  
            </el-form>
        </atris-drawer-cmp> 
    </div>
</template>
<script type="text/ecmascript-6">
import { REQ_OK } from '@/api/config'
import { checkTreeFormArray } from '@/utils/newStyleFieldValidate'
import {
    newStyleGetDicTree,
    saveDicTree,
    deleteDicItem
} from '@/api/dic'
import BaseImgUpload from '@/base/NewStyle-cmp/common-cmp/img-upload'
import SaveFooter from '@/base/Save-footer/index.vue';
import { CommonInterfaceMixin } from '@/utils/CommonInterfaceMixin'
let that = null;
let treeId = 0;  
export default {
    mixins: [CommonInterfaceMixin],
    components: { 
        BaseImgUpload,
        SaveFooter,
    },
    props: {
        onlyRead: {
            type: Boolean,
            default: false
        },
        showSearch: {
            type: Boolean,
            default: false
        },
        propRowObj: {
            type: Object,
            default: () => {
                return {}
            }
        },
        propDicCode: {
            type: String,
            default: () => {
                return ''
            }
        },
        propMaxTier: {
            type: [Number, String],
            default: () => {
                return ''
            }
        },        
        propDraggable: {
            type: Boolean,
            default: false
        }
    },
    data() {          
        return {
            loading: false,
            filterText: '',
            treeData: [],
            currentDicCode: '',
            treeForm: [],
            treeRulesForm: [],
            validRes: [],
            childCmpList: [
                {
                    controlType: 1,
                    controlName: '输入框'
                },
                {
                    controlType: 2,
                    controlName: '多行输入框'
                }
            ],
            showFilterObj: {
                showRemark: false,
                showColors: false,
                showLogo: false,
                showControlText: false,
                showControlType: false,
                showIsConfig: false
            },
            showAddNew: false,
            getDicSourceParams: {
                dicCode: this.propDicCode,
            },
            addNewObj: {
                treeId: ++treeId, 
                parentdiccode: this.propDicCode,
                dicName: '', 
                logo: '',
                controlText: '',
                controlType: '',
                colors: '',
                isConfig: '',
                childrenList: [], 
                isEditing: true, 
                description: '', 
                changed: true, 
                state: 1, // 1 启用 0 停用
            },
            addNewObjRules: {
                dicName: {
                    required: true, message: '名称为空', trigger: 'blur'
                },
                description: {
                    required: true, message: '描述为空', trigger: 'blur'
                }
            }                  
        }
    },
    created(){
        that = this
        this._initData()
    },
    computed:{
       
    },
    watch:{
        filterText(val) {
            this.$refs.tree.filter(val);
        }            
    },
    methods:{
        _refreshData(){
            this._newStyleGetDicTree()
        },       
        _initData(){
            // 初始获取树形数据
            this._newStyleGetDicTree()
        },
        _newStyleGetDicTree(){
            this.loading = true
            newStyleGetDicTree(this.getDicSourceParams).then(res => {
                this.loading = false
                if(res && res.data.State === REQ_OK){
                    this.treeData = res.data.Data.records
                    // 处理 this.treeData
                    this._changedata(this.treeData)
                }else {
                    
                }
            }) 
        },    
        addNewTree(){
            this.showAddNew = true
        },   
        saveAdd(){
            let res = this._saveDicTree([this.addNewObj])
            if(res){
                this.showAddNew = false
            }
        },      
        filterNode(value, data) {
            debugger
            if (!value) return true;
            return data.dicName.indexOf(value) !== -1;
        },
        _signChanged(arr, id){
            if(arr && arr.length){
                for(let i =0,length=arr.length;i<length;i++){
                    let item = arr[i]
                    if(id){
                        if(item.id === id){
                            item.changed = true
                            break
                        }else {
                            if(item.childrenList && item.childrenList.length){
                                this._signChanged(item.childrenList, id)
                            }
                        }
                    }else {
                        item.changed = true
                        if(item.childrenList && item.childrenList.length){
                            this._signChanged(item.childrenList)
                        }
                    }                
                }
            }
        },
        nodeDrop(a,b){
            debugger
            this._signChanged(this.treeData)
            console.log("------拖拽完成后最终的树treeData-------",this.treeData)
        }, 
        showPopver(data){
            debugger
            data.showImgPopver = true
        },
        emitUpload(data, item){
            debugger
            item.logo = data || ''
        },
        addNum(node, data) {
            if(node.parent){
                // 有直接上级
                data.hasAddBtnNum += 1
                if(this.propMaxTier > data.hasAddBtnNum){
                    if(node.parent.parent){
                        // 直接上级还有上级 递归
                        this.addNum(node.parent.parent, data)
                    }else {
                        // 所有上级都递归完了, 再看其下级
                        if(node.childNodes){
                            if(node.childNodes.length){
                                // 直接下级
                                data.hasAddBtnNum += 1
                                
                            }else {
                                // 没有直接下级了
                            }
                        }else {
                            // 没有下级
                        }
                    }
                }else {
                    // 超过最大递归层级
                    return false
                }
            }else {
                //没有直接上级

            }            
        },
        // 根据 propMaxTier 来判断是否显示新增按钮
        getHasAddBtn(node, data){
            data.hasAddBtnNum = 0

            this.addNum(node, data)
        },               
        _changedata(arr){
            debugger
            if(arr.length){
                arr.forEach((item, key) => {
                    let num = ++treeId
                    this.$set(item, 'isEditing', false) // 是否正在编辑状态
                    this.$set(item, 'changed', false)  // 是否修改过
                    this.$set(item, 'showImgPopver', false)  // 是否显示上传图片的popver
                    this.$set(item, 'parentdiccode', this.propDicCode || '')
                    this.$set(item, 'treeId', num)
                    item.itemRules = {required: true, message: '名称为空', trigger: ['blur', 'change']}
                    if(item.childrenList && item.childrenList.length){
                        this._changedata(item.childrenList)
                    }
                })
            }
        },
        nameInputChange(node, data){
            debugger
            if(data.dicName){
                this.currentDicCode = ''
            }
        },
        //新增
        append (node, data) {
            debugger
            const newChild = { 
                treeId: ++treeId, 
                parentdiccode: this.propDicCode || '',
                dicName: '', 
                logo: '',
                controlText: '',
                controlType: '',
                colors: '',
                isConfig: '',
                childrenList: [], 
                isEditing: true, 
                description: '', 
                changed: true, 
                state: 1, // 1 启用 0 停用
                itemRules: {required: true, message: '名称为空', trigger: ['blur', 'change']}
            }

            if (!data.childrenList) {
            this.$set(data, 'childrenList', []);
            }
            let newData = data.childrenList.concat(newChild);
            this.$set(data, 'childrenList', newData)
            console.log("9999999999999", data)
        },
        // 编辑
        edit(node, data){
            debugger
            data.isEditing = true
            data.changed = true
        },
        // 取消
        cancel(node, data){
            debugger
            this.currentDicCode = data.dicCode
            if(!data.dicName){

            }else {
                data.isEditing = false
            }
        },
        _refreshTree(){
            this._newStyleGetDicTree(this.propDicCode)
        },  
        // 移除
        remove(node, data) {
            const parent = node.parent;
            const childrenList = parent.data.childrenList || parent.data;
            const index = childrenList.findIndex(d => d.dicCode === data.dicCode);
            debugger
            if(data.id){
             
            }else {
                childrenList.splice(index, 1);
            } 
        },  
        // 删除
        deleteBtn(node, data){
            debugger
            if(data.id){
                let statusText = '删除'
                let name = data.dicCode || ''
                let ids = data.id ? [data.id] : []
                let baseKey = 'c4ca4238'
                this.commonDeleteListMixin({
                    statusText,
                    name,
                    ids,
                    baseKey
                })
            }
        }, 
        // 停用/启用
        handlerStopOrUsing(node, data){
            debugger
            let statusText = data.state == 1? '停用': '启用'
            let name = data.dicName || ''
            let ids = data.id ? [data.id] : []
            this.commonSetStatusMixin({
                statusText,
                name,
                ids
            })
        },            
        _saveDicTree(treeData){
            debugger
            // this.loading = true
            console.log("最终保存的 树形数据为——————————————————————",this.treeData)
            return saveDicTree(treeData).then(res => {
                debugger
                this.loading = false
                if(res && res.data.State === REQ_OK) {
                    this.$message({
                        type: 'success',
                        message: `保存成功`
                    })
                    this._refreshTree()
                    return true
                }else {
                    this.$message({
                        type: 'error',
                        message: `保存失败,${res.data.Error}`
                    })
                }
            })
        },                                                                        
        validFn(arr, resArr){
            if(arr && arr.length){
                arr.forEach((item, key) => {
                    let res = new Promise((resolve, reject) => {
                        item.sortId = ++key
                        console.log(that.$refs[`dataForm_${item.dicCode}`])
                        debugger
                        that.$refs[`dataForm_${item.dicCode}`].validate(valid => {
                            debugger
                            if(valid){ 
                                resolve(valid)   
                            }else {
                                reject(new Error(`${item.dicCode}验证失败`))
                                return false
                            }
                        })         
                    })
                    resArr.push(res)

                    if(item.childrenList && item.childrenList.length){
                        that.validFn(item.childrenList, resArr)
                    }
                })
            }
        },
        // 保存 整体数据
        saveTree () {
            // 先进行必填项验证
            this.validRes = []
            this.validFn(this.treeData, this.validRes)
            // console.log(this.treeData)
            console.log(this.validRes)
            debugger
            Promise.all(this.validRes).then(res => {
                debugger
                // 验证pass 调用 保存接口
                this._saveDicTree(this.treeData)
            }).catch(error => {

            })        
        },
        // 取消 整体数据
        cancelTree () {
            
        }    
    },
}
</script>
