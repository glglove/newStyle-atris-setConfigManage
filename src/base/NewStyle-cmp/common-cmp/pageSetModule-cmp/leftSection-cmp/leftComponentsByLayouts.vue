<!--
    User:
    Date: pageSetModule  组件
    功能:
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .el-form-item {
        margin-bottom: 18px !important
    }
    .content-layout-wrap {
        &:hover {
            cursor: pointer;
            background-color:  rgba(31, 56, 88, 0.3) 
        }
    }
    .content-layout-item{
        display: flex;
        justify-content: space-around;
        align-items: center;
        align-content: space-around;
        margin: 0 2px;
        margin: 0 2px;
        background-color: rgba(31, 56, 88, 0.2);
        color: #ffffff;
    }
</style>

<template>
    <div style="width: 95%;padding: 0 2.5%">
        <el-tabs v-model="activeName" type="card">
            <!------默认的容器------->
            <el-tab-pane label="默认" name="first">
                <div style="display: flex;justify-content: center;width: 100%">
                    <!-- layoutGeneral: {{layoutGeneral}}
                    ---- -->
                    <vuedraggable 
                        :list="layoutGeneral"
                        :options="{sort:false}"
                        :group="{
                            name:'component',
                            pull:'clone',
                            put:false
                        }" 
                        :clone="cloneFuc"
                        @change="change"
                        @start="start"
                        @end="end"                
                        :move='allow'                        
                        style="position: relative;width: 70%"
                    >
                        <div 
                            class="u-f content-layout-wrap" 
                            style="height: 35px;margin-bottom: 4px;" 
                            v-for="(item,idx) in layoutGeneral"    
                            :key="idx"                        
                        >
                            <div 
                                v-for="(columnItem,index) in item.columnObjMap" 
                                class="content-layout-item" 
                                :class="[columnItem.layoutClass, `controlType-${columnItem.controlType}`]"    
                                :data-itemData="JSON.stringify(columnItem)"                                 
                                :key="index"
                                @click="selectTag(item, index)"
                            >
                            {{flexHash[item.layoutClass]}}
                        </div>
                        </div>                        
                    </vuedraggable>
                </div>
                <!--<el-divider><spanNum style="color: #DCDFE6">拖动布局</spanNum></el-divider>-->
            </el-tab-pane>

            <!-----自定义的容器------>
            <el-tab-pane label="自定义" name="tow">
                <div class="u-f-ac">
                    <el-form 
                        :model="form" 
                        :rules="formRule"  
                        ref="ruleForm" 
                        style="width:100%"
                        class="u-f-jst u-f-ajc"
                    >
                        <el-form-item 
                            label="分栏比例:" 
                            prop="layoutRatio"
                            label-position="top"
                            class="u-f-g1"
                        >
                            <el-input 
                                v-model="form.layoutRatio" 
                                placeholder="如1-1-1" 
                                size="mini"
                                clearable
                                style="width: 110px"
                            ></el-input>
                        </el-form-item>

                        <el-tooltip class="item" effect="dark" :content="'以 - 作为分割符，比例最大为' + maxLayoutRote" placement="top-start">
                            <div style="display: inline-block;vertical-align: top;margin:25px 0px 0 0">
                                <i class="el-icon-question" style="font-size: 16px"></i>
                            </div>
                        </el-tooltip>

                        <spanNum class="marginT20">
                            <el-button 
                                type="primary" 
                                @click="yes" 
                                size="mini"
                            >确认</el-button>
                        </spanNum>
                    </el-form>
                </div>
                <div class="u-f-ajc">
                    <!-- layoutCustom: {{layoutCustom}} -->
                    <vuedraggable 
                        :list="layoutCustom"
                        :options="{sort:false}"
                        :group="{
                            name:'component',
                            pull:'clone',
                            put:false
                        }" 
                        style="position: relative;width: 70%"
                        :clone="cloneFuc"
                        @change="change"
                        @start="start"
                        @end="end"                
                        :move='allow'                          
                    >
                        <!-- <transition-group> -->
                            <div 
                                class="u-f content-layout-wrap" 
                                style="height: 35px;margin-bottom: 4px;" 
                                v-for="(layoutCustomItem, idx1) in layoutCustom"
                                :key="idx1"
                            >
                                <div 
                                    v-for="(item,index) in layoutCustomItem.columnObjMap" 
                                    class="content-layout-item" 
                                    :class="[item.layoutClass, `controlType-${item.controlType}`]"    
                                    :data-itemData="JSON.stringify(item)"                                 
                                    :key="index"
                                    @click="selectTag(item, index)"                                    
                                >
                                {{flexHash[item.layoutClass]}}
                            </div>
                            </div>
                        <!-- </transition-group> -->
                    </vuedraggable>
                </div>
                <el-divider>
                    <spanNum style="color: #aeb1b7;cursor: pointer" @click="clearLayoutCustom">
                        清空
                    </spanNum>
                </el-divider>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Vuedraggable from 'vuedraggable'   
    import {  getGuid2, getGuid } from '@/utils/guid.js'
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
    let layoutGlobalId = 1000;

    let maxLayoutRote = 5

    export default {
        name: "LeftCompoentsByLayouts",
        props:{
            // clone:{
            //     type: Function,
            //     default: () => {
            //         return function (){}
            //     }
            // },
            // choose: {
            //     type: Function,
            //     default: () => {
            //         return function (){}
            //     }
            // }
        },
        components:{
            Vuedraggable
        },
        data(){
          return {
            maxLayoutRote: maxLayoutRote,
            flexHash: flexHash,
            activeName: 'first',
            layoutGeneral: [
                { 
                    controlType: 5001,                            
                    componentName: 'Iflex',
                    iStyle:{},
                    iClass: [],
                    columnObjMap: [{
                        iStyle:{},
                        iClass: [],
                        itemList: [],
                        layoutClass:'flex-one',
                    }],
                    "controlName": "一列布局",
                    minUnicode: getGuid2(),
                    longUnicode: '',
                    atrisOptions: {
                        width: '100%',
                        defaultValue:'',
                        disabled: false,
                        placeholder: '',
                        required: true,
                        regEx: ''
                    },
                    childrenList:[
                        {
                            spanNum: 24,
                            controlName: `第1列`,
                            minUnicode: getGuid2(),
                            longUnicode:'',
                            controlType: 5001,   
                            sortid: 1,                                                          
                            childrenList: [

                            ]
                        }
                    ]                            
                },
                {
                    controlType: 5001,                            
                    componentName: 'Iflex',
                    iStyle:{},
                    iClass: [],
                    columnObjMap: [
                        {
                            iStyle:{},
                            iClass: [],
                            layoutClass:'flex-one',
                            itemList: []
                        },
                        {
                            iStyle:{},
                            iClass: [],
                            layoutClass:'flex-one',
                            itemList: []
                        }
                    ],
                    "controlName": "两列等宽布局",
                    minUnicode: getGuid2(),
                    longUnicode: '',
                    atrisIcon: '',
                    atrisOptions: {
                        width: '100%',
                        defaultValue:'',
                        disabled: false,
                        placeholder: '',
                        required: true,
                        regEx: ''
                    },
                    childrenList:[
                        {
                            spanNum: 12,
                            controlName: `第1列`,
                            minUnicode: getGuid2(),
                            longUnicode:'',
                            controlType: 5001,    
                            sortid: 1,                                                          
                            childrenList: [

                            ]
                        },
                        {
                            spanNum: 12,
                            controlName: `第2列`,
                            minUnicode: getGuid2(),
                            longUnicode:'',                            
                            controlType: 5001,  
                            sortid: 2,                               
                            childrenList: [

                            ]                                    
                        }
                    ]                            
                },
                {
                    controlName:'布局 1:1:1',
                    controlType: 5001,                 
                    componentName: 'Iflex',
                    iStyle:{},
                    iClass: [],
                    columnObjMap: [
                        {
                            iClass: [],
                            iStyle:{},
                            layoutClass:'flex-one',
                            itemList: []
                        },{
                            iClass: [],
                            iStyle:{},
                            layoutClass:'flex-one',
                            itemList: []
                        },{
                            iStyle:{},
                            iClass: [],
                            layoutClass:'flex-one',
                            itemList: []
                        }
                    ],
                    minUnicode: getGuid2(),
                    longUnicode: '',
                    atrisConValue: '',
                    atrisOptions: {
                        width: '100%',
                        defaultValue:'',
                        disabled: false,
                        placeholder: '',
                        required: true,
                        regEx: ''
                    },
                    childrenList:[
                        {
                            spanNum: 8,
                            controlName: `第1列`,
                            minUnicode: getGuid2(),
                            longUnicode:'',
                            controlType: 5001,   
                            sortid: 1,                             
                            childrenList: [

                            ]
                        },
                        {
                            spanNum: 8,
                            controlName: `第2列`,
                            minUnicode: getGuid2(),
                            longUnicode:'',
                            controlType: 5001,                            
                            sortid: 2, 
                            childrenList: [

                            ]                                    
                        },
                        {
                            spanNum: 8,
                            controlName: `第3列`,
                            minUnicode: getGuid2(),
                            longUnicode:'',
                            controlType: 5001,   
                            sortid: 3,                          
                            childrenList: [

                            ]                                    
                        }                                
                    ]                              
                }
            ],
            form: {
                layoutRatio: ''
            },
            layoutCustom: [
            ],
            formRule: {
                layoutRatio: [{
                    validator: this.validateCustomValue, trigger: 'blur'
                }]
            }
          }
        },
        methods:{
            validateCustomValue(rule, value, callback){
                if (value === '') {
                    callback(new Error('请填写布局比例'));
                    return
                }
                let arrValue = value.split("-")
                for (let i = 0; i < arrValue.length; i++) {
                    let item = arrValue[i]
                    let itemRex = /^[1-5]$/
                    if (!itemRex.test(item)){
                        callback(new Error(`布局比例在1-${maxLayoutRote}之间`));
                        return
                    }
                }
                callback();
            },
            clearLayoutCustom(){
                this.layoutCustom = []
            },
            selectTag(item, index){
                debugger
                // 给分栏布局的容器中 每列都添加一个唯一码
                this.addGuid(item.childrenList)                
                this.$bus.$emit("leftClickItem", item)
                // this.changeBadageNum(item, true)
            },  
            addGuid(arr){
                if(arr && arr.length){
                    arr.forEach((item, key) => {
                        item.minUnicode = getGuid2()
                        // 每列就不需要添加 atrisGuid了 因为 树形数据上面是否允许拖拽移动时是不支持 分栏容器的列进行移动的
                        item.longUnicode = ''
                    })
                }
                return arr
            },          
            cloneFuc(controlItem){
                // 处理 拖拽的元素
                debugger
                console.log("---------拖拽的元素----------", controlItem)
                // this.currentObj = controlItem
                // this.changeBadageNum(controlItem, true)              
                let obj = controlItem
                // 给分栏布局的容器中 每列都添加一个唯一码
                this.addGuid(obj.childrenList)
                return JSON.parse(JSON.stringify(obj))          
            },
            //evt里面有两个值，一个evt.added 和evt.removed  可以分别知道移动元素的ID和删除元素的ID
            change: function (evt) {
                console.log(evt)
            },
            //start ,end ,add,update, sort, remove 得到的都差不多
            start: function (evt) {
                console.log("--start---",evt)
            },
            end(evt) {
                // debugger
                console.log("----------------000---------------",evt)
                // evt.item //可以知道拖动的本身
                // evt.to    // 可以知道拖动的目标列表
                // evt.from  // 可以知道之前的列表
                // evt.oldIndex  // 可以知道拖动前的位置
                // evt.newIndex  // 可以知道拖动后的位置
                

            },            
            allow(evt, originalEvent){
                // debugger
                console.log(originalEvent) //鼠标位置
                console.log(evt.draggedContext.index)
                console.log(evt.draggedContext.element)
                console.log(evt.draggedContext.futureIndex)
                console.log(evt.relatedContext.index)
                console.log(evt.relatedContext.element)
                console.log(evt.relatedContext.list)
                console.log(evt.relatedContext.component)
                // 假如是左边自己的拖拽 就禁止
                if(evt.relatedContext.component && evt.relatedContext.component.$el.dataset.flag === 'leftFlag'){
                    return false
                }else {
                    return true
                }
            },             
            yes() {
                debugger
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        let value = this.form.layoutRatio
                        let arrValue = value.split("-")
                        let columnObjMap = []
                        let childrenList = []
                        let total = arrValue.reduce(function(pre, current, idx, []){
                            return parseInt(pre) + parseInt(current)
                        })
                        let controlName = arrValue.join(':')
                        let num = 0
                        console.log("-------total------------",total)
                        for (let i = 0; i < arrValue.length; i++) {
                            num +=1
                            columnObjMap.push({
                                layoutClass: flexMap[arrValue[i]-1],
                                itemList: [],
                                iStyle:{},
                                iClass:[]
                            })
                            childrenList.push({
                                spanNum: (arrValue[i]/total)*24,
                                controlName: `${controlName}——第${num}列`,
                                minUnicode: getGuid2(),
                                longUnicode:'',
                                controlType: 5001,   
                                sortid: num,  
                                childrenList: [

                                ]
                            })
                        }
                        this.layoutCustom.push(
                            {   
                                controlName:`布局 ${controlName}`,                             
                                columnObjMap,
                                "controlType": 5001,
                                minUnicode: '',
                                longUnicode: '',
                                atrisOptions: {
                                    width: '100%',
                                    defaultValue:'',
                                    disabled: false,
                                    placeholder: '',
                                    required: true,
                                    regEx: ''
                                },
                                childrenList: childrenList                             
                            }
                        )
                    }else {
                        return false;
                    }
                })
            }
        }
    }
</script>


