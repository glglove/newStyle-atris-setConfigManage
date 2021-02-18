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
        justify-content: center;
        align-items: center;
        margin: 0 2px;
        background-color: #837e87;
        color: #ffffff;
    }
</style>

<template>
    <div style="width: 95%;padding: 0 2.5%">
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="默认" name="first">
                <div style="display: flex;justify-content: center;width: 100%">
                    <vuedraggable :list="layoutData"
                               :options="{sort:false}"
                               :group="{ name: 'control', pull: 'clone', put: false}"
                               :clone="clone"
                               @choose="choose"
                               style="position: relative;width: 70%">
                        <!-- <ComponentContainer v-for="item in layoutData"
                                            :key="item.id"
                                            :name="item.name"
                                            :num="item.num"
                                            type="layoutData"
                                            :componentName="item.componentName">
                        </ComponentContainer> -->
                        <div 
                            class="u-f" 
                            style="height: 35px;margin-bottom: 4px;" 
                            v-for="item in layoutData"
                        >
                            <div 
                                class="content-layout-item" 
                                :class="item.layoutClass" 
                                v-for="(item,index) in item.num" 
                                :key="index"
                            >{{flexHash[item.layoutClass]}}</div>
                        </div>                        
                    </vuedraggable>
                </div>
                <!--<el-divider><span style="color: #DCDFE6">拖动布局</span></el-divider>-->
            </el-tab-pane>

            <el-tab-pane label="自定义" name="tow">
                <div class="u-f-ac">
                    <el-form 
                        :inline="true" 
                        :model="form" 
                        :rules="formRule"  
                        ref="ruleForm" 
                        style="width:100%"
                        class="demo-form-inline u-f-jst u-f-ac"
                    >
                        <el-form-item 
                            label="布局比例" 
                            prop="layoutRatio"
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
                    <vuedraggable 
                        :list="layoutCustom"
                        :options="{sort:false}"
                        :group="{ name: 'control', pull: 'clone', put: false}"
                        :clone="clone"
                        @choose="choose"
                        style="position: relative;width: 70%"
                    >
                        <!-- <transition-group> -->
                            <!-- layoutCustom: {{layoutCustom}} -->
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
                                >{{flexHash[item.layoutClass]}}</div>
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
    // import ComponentContainer from '@/components/LeftComponents/ComponentContainer/ComponentContainer'
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
            clone:{
                type: Function,
                default: () => {
                    return function (){}
                }
            },
            layoutData: {
                type: Array,
                default: ()=>[]
            },
            choose: {
                type: Function,
                default: () => {
                    return function (){}
                }
            }
        },
        components:{
            Vuedraggable
        },
        data(){
          return {
              maxLayoutRote:maxLayoutRote,
              flexHash:flexHash,
              activeName: 'first',
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
            yes() {
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        let value = this.form.layoutRatio
                        let arrValue = value.split("-")
                        let num = []
                        for (let i = 0; i < arrValue.length; i++) {
                            let index =( parseInt(arrValue[i]) - 1)
                            num.push({
                                layoutClass: flexMap[index],
                                itemList: [],
                                iStyle:{},
                                iClass:[]
                            })
                        }
                        let name = arrValue.join(':')
                        this.layoutCustom.push({name:`布局 ${name}`,id: layoutGlobalId++, componentName: 'Iflex',iStyle:{},num})
                    }else {
                        return false;
                    }
                })
            }
        }
    }
</script>


