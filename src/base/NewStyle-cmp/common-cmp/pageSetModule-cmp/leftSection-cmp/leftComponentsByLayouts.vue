<!--
    User:
    Date: pageSetModule  组件
    功能:
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .el-form-item {
        margin-bottom: 18px !important
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
                            class="u-f" 
                            style="height: 35px;margin-bottom: 4px;" 
                            v-for="item in layoutGeneral"
                        >
                            <div 
                                class="content-layout-item" 
                                :class="item.layoutClass" 
                                v-for="(item,index) in item.num" 
                                :key="index"
                            >
                            {{flexHash[item.layoutClass]}}
                        </div>
                        </div>                        
                    </vuedraggable>
                </div>
                <!--<el-divider><span style="color: #DCDFE6">拖动布局</span></el-divider>-->
            </el-tab-pane>

            <!-----自定义的容器------>
            <el-tab-pane label="自定义" name="tow">
                <div class="u-f-ac">
                    <el-form 
                        :model="form" 
                        :rules="formRule"  
                        ref="ruleForm" 
                        style="width:100%"
                        class="u-f-jst u-f-ac"
                    >
                        <el-form-item 
                            label="布局比例" 
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
                            <div style="display: inline-block;vertical-align: top;margin:-20px 10px 0 0">
                                <i class="el-icon-question" style="font-size: 16px"></i>
                            </div>
                        </el-tooltip>

                        <el-form-item>
                            <el-button 
                                type="primary" 
                                @click="yes" 
                                size="mini"
                            >确认</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="u-f-ajc">
                    layoutCustom: {{layoutCustom}}
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
                                class="u-f" 
                                style="height: 35px;margin-bottom: 4px;" 
                                v-for="layoutCustomItem in layoutCustom"
                            >
                                <div 
                                    class="content-layout-item" 
                                    :class="item.layoutClass" 
                                    v-for="(item,index) in layoutCustomItem.num" 
                                    :key="index"
                                >
                                {{flexHash[item.layoutClass]}}
                            </div>
                            </div>
                        <!-- </transition-group> -->
                    </vuedraggable>
                </div>
                <el-divider>
                    <span style="color: #aeb1b7;cursor: pointer" @click="clearLayoutCustom">
                        清空
                    </span>
                </el-divider>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Vuedraggable from 'vuedraggable'   
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
            maxLayoutRote:maxLayoutRote,
            flexHash:flexHash,
            activeName: 'first',
            layoutGeneral: [
                { 
                    name:'布局 1',
                    id: 0, 
                    containerType: 'generalGrid',                            
                    componentName: 'Iflex',
                    iStyle:{},
                    iClass: [],
                    num: [{
                        iStyle:{},
                        iClass: [],
                        itemList: [],
                        layoutClass:'flex-one',
                    }],
                    "allTeamControl": null,
                    "attributionList": null,
                    "childrenList": [],
                    "commonCode": "sysfield",
                    "controlEnName": "TMText",
                    "controlName": "一列布局",
                    "controlType": 2000,
                    "flagNum": 0,
                    "hasChildren": true,
                    "id": 1,
                    "pcode": "abcdefgh",
                    "sortId": null,
                    "sysControlUnicode": null,
                    "type": 1,
                    "unicode": null,

                    atrisCode: '',
                    atrisGuid: '',
                    atrisIcon: '',
                    atrisTitle: '一列布局',
                    atrisComponentType: 'grid-simple',
                    atrisConValue: '',
                    atrisOptions: {
                        width: '100%',
                        defaultValue:'',
                        disabled: false,
                        placeholder: '',
                        required: true,
                        regEx: ''
                    },
                    atrisChildrenList:[
                        {
                            span: 24,
                            controlName: `第1列`,
                            atrisComponentType: 'grid-simple',                                
                            atrisChildrenList: [

                            ]
                        }
                    ]                            
                },
                {
                    name:'布局 1:1',
                    id: 1, 
                    containerType: 'generalGrid',                            
                    componentName: 'Iflex',
                    iStyle:{},
                    iClass: [],
                    num: [
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
                    "allTeamControl": null,
                    "attributionList": null,
                    "childrenList": [],
                    "commonCode": "sysfield",
                    "controlEnName": "TMText",
                    "controlName": "两列等宽布局",
                    "controlType": 2000,
                    "flagNum": 0,
                    "hasChildren": true,
                    "id": 1,
                    "pcode": "abcdefgh",
                    "sortId": null,
                    "sysControlUnicode": null,
                    "type": 1,
                    "unicode": null,

                    atrisCode: '',
                    atrisGuid: '',
                    atrisIcon: '',
                    atrisTitle: '两列等宽布局',
                    atrisComponentType: 'grid-simple',
                    atrisConValue: '',
                    atrisOptions: {
                        width: '100%',
                        defaultValue:'',
                        disabled: false,
                        placeholder: '',
                        required: true,
                        regEx: ''
                    },
                    atrisChildrenList:[
                        {
                            span: 12,
                            controlName: `第1列`,
                            atrisComponentType: 'grid-simple',                                
                            atrisChildrenList: [

                            ]
                        },
                        {
                            span: 12,
                            controlName: `第2列`,
                            atrisComponentType: 'grid-simple',                                
                            atrisChildrenList: [

                            ]                                    
                        }
                    ]                            
                },
                {
                    name:'布局 1:1:1',
                    id: 2, 
                    containerType: 'generalGrid',
                    componentName: 'Iflex',
                    iStyle:{},
                    iClass: [],
                    num: [
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
                    "allTeamControl": null,
                    "attributionList": null,
                    "childrenList": [],
                    "commonCode": "sysfield",
                    "controlEnName": "TMText",
                    "controlName": "三列等宽布局",
                    "controlType": 2000,
                    "flagNum": 0,
                    "hasChildren": true,
                    "id": 1,
                    "pcode": "abcdefgh",
                    "sortId": null,
                    "sysControlUnicode": null,
                    "type": 1,
                    "unicode": null,

                    atrisCode: '',
                    atrisGuid: '',
                    atrisIcon: '',
                    atrisTitle: '三列等宽布局',
                    atrisComponentType: 'grid-simple',
                    atrisConValue: '',
                    atrisOptions: {
                        width: '100%',
                        defaultValue:'',
                        disabled: false,
                        placeholder: '',
                        required: true,
                        regEx: ''
                    },
                    atrisChildrenList:[
                        {
                            span: 8,
                            controlName: `第1列`,
                            atrisComponentType: 'grid-simple',                                
                            atrisChildrenList: [

                            ]
                        },
                        {
                            span: 8,
                            controlName: `第2列`,
                            atrisComponentType: 'grid-simple',                            
                            atrisChildrenList: [

                            ]                                    
                        },
                        {
                            span: 8,
                            controlName: `第3列`,
                            atrisComponentType: 'grid-simple',                            
                            atrisChildrenList: [

                            ]                                    
                        }                                
                    ]                              
                },
                // {
                //     name:'布局 1:1:1:1',
                //     id: 3, 
                //     componentName: 'Iflex',
                //     iStyle:{},
                //     iClass: [],
                //     num: [{
                //         iClass: [],
                //         iStyle:{},
                //         layoutClass:'flex-one',
                //         itemList: []
                //     },{
                //         iStyle:{},
                //         iClass: [],
                //         layoutClass:'flex-one',
                //         itemList: []
                //     },{
                //         iStyle:{},
                //         iClass: [],
                //         layoutClass:'flex-one',
                //         itemList: []
                //     },{
                //         iStyle:{},
                //         iClass: [],
                //         layoutClass:'flex-one',
                //         itemList: []
                //     }]
                // },
                // {
                //     name:'布局 1:1:1:1:1',
                //     id: 4, 
                //     componentName: 'Iflex',
                //     iStyle:{},
                //     iClass: [],
                //     num: [{
                //         iClass: [],
                //         iStyle:{},
                //         layoutClass:'flex-one',
                //         itemList: []
                //     },{
                //         iClass: [],
                //         iStyle:{},
                //         layoutClass:'flex-one',
                //         itemList: []
                //     },{
                //         iStyle:{},
                //         iClass: [],
                //         layoutClass:'flex-one',
                //         itemList: []
                //     },{
                //         iClass: [],
                //         iStyle:{},
                //         layoutClass:'flex-one',
                //         itemList: []
                //     },{
                //         iStyle:{},
                //         iClass: [],
                //         layoutClass:'flex-one',
                //         itemList: []
                //     }]
                // }
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
            cloneFuc(controlItem){
                // 处理 拖拽的元素
                debugger
                console.log("---------拖拽的元素----------", controlItem)
                // this.currentObj = controlItem
                // this.changeBadageNum(controlItem, true)              
                let obj = controlItem
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
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        let value = this.form.layoutRatio
                        let arrValue = value.split("-")
                        let num = []
                        let atrisChildrenList = []
                        let total = arrValue.reduce(function(pre, current, idx, []){
                            return parseInt(pre) + parseInt(current)
                        })
                        let name = arrValue.join(':')
                        console.log("-------total------------",total)
                        for (let i = 0; i < arrValue.length; i++) {
                            let index =( parseInt(arrValue[i]) - 1)
                            num.push({
                                layoutClass: flexMap[index],
                                itemList: [],
                                iStyle:{},
                                iClass:[]
                            })
                            atrisChildrenList.push({
                                span: (arrValue[i]/total)*24,
                                controlName: `${name}——第${i}列`,
                                atrisComponentType: 'grid-simple',
                                atrisChildrenList: [

                                ]
                            })
                        }
                        this.layoutCustom.push(
                            {   
                                name:`布局 ${name}`,
                                id: layoutGlobalId++, 
                                containerType: 'customGrid',                                
                                componentName: 'Iflex',
                                iStyle:{},
                                num,
                                "allTeamControl": null,
                                "attributionList": null,
                                "childrenList": [],
                                "commonCode": "sysfield",
                                "controlEnName": "TMText",
                                "controlName":  `${name}布局`,
                                "controlType": 2000,
                                "flagNum": 0,
                                "hasChildren": true,
                                "id": 1,
                                "pcode": "abcdefgh",
                                "sortId": null,
                                "sysControlUnicode": null,
                                "type": 1,
                                "unicode": null,

                                atrisCode: '',
                                atrisGuid: '',
                                atrisIcon: '',
                                atrisTitle: `${name}布局`,
                                atrisComponentType: 'grid-simple',
                                atrisConValue: '',
                                atrisOptions: {
                                    width: '100%',
                                    defaultValue:'',
                                    disabled: false,
                                    placeholder: '',
                                    required: true,
                                    regEx: ''
                                },
                                atrisChildrenList: atrisChildrenList                             
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


