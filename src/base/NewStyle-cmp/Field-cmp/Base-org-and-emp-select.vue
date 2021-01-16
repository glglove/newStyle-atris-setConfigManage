<!--
  User: xxxxxxx
  Date: 2018/11/27
  功能：公司架构 岗位  controlType  21
-->

<template>
  <el-form-item
    :label="isTitle ? obj.conname : ''"
    :prop="prop"
    :rules="rules"
    v-if="isShowField"
  >

    <div 
      class="filedContentWrap u-f-ac u-f-jst"
    >
      <div class="titWrap u-f-ac" v-show="isTitle">
        <span 
          class="tit ellipsis2"
          :style="fieldLabelStyle"
        >
          {{isTitle ? obj.conname : ''}}
          <icon-svg 
            class="fieldRequiredIcon"
            v-show="!isShowing && obj.Require"
            :icon-class="RequiredSvg"
          ></icon-svg>      
          <el-tooltip 
            v-if="obj.Description"
            :content="obj.Description">
            <i class="el-icon-info"></i>
          </el-tooltip>             
        </span>
      </div>

      <div 
        v-if="!isShowing" 
        class="fieldValueWrap u-f-g0"
        :style="fieldValueWrapStyle"
      >
        <company-structure-cmp
          class="fieldValue"
          v-if="!isShowing"
          :isTitle="false"
          title="岗位"
          :tabType="['renyuan']"
          :selectedList="obj.convalue"
          :disableFlag="isDisabledField"
          @upData="updata"
        ></company-structure-cmp>
      </div>

      <div 
        class="fieldValueWrap showValue line-bottom u-f-g0" 
        v-else
        :style="fieldValueWrapStyle"
      >
        <span
          v-for="(item, key) in obj.convalue" 
          :key="key"
          style="margin-right:10px"
        >
          {{item.Name}}
        </span>
      </div>         
    </div>    

  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { validatEmail, validatMobilePhone, validatTel, validateViewAuth } from '@/utils/validate'
  import CompanyStructureCmp from '@/base/Company-structure-cmp/select-cmp'
  import { commonFiledsViewFns } from './common-fields-mixins.js'
  export default {
    mixins: [ commonFiledsViewFns ],
    props: {
      //是否需要调取下拉源
      isNeedGetDataSource: {
        type: Boolean,
        default: false  // 默认不需要
      },       
      //是否需要校验
      isNeedCheck: {
        type: Boolean,
        default: false
      },      
      prop: {
        type: String,
        default: ''
      },
      sid: {
        type: Number,
        default: 0
      },
      obj: {
        type: Object,
        default: {}
      },
      // 是否直接显示控件的值, 默认false
      isShowing: {
        type: Boolean,
        default: false
      },         
      isTitle: {
        type: Boolean,
        default: true
      },
      // 是否是直接显示 还是 新增或者编辑  这个决定了 此字段组件 在不同视图场景下的正确权限显示
      viewType: {
        type: String,
        default: ''   // '' 和View-TM 直接显示   新增：Add-TM  编辑：Edit-TM 删除：Del-TM  查看：View-TM  表的话就是Add-SH，Edit-SH，Del-SH，View-SH
      },        
    },
    components: {
      CompanyStructureCmp
    },    
    data () {
      let validatePass = (rule, value, callback) => {
        if(!this.isNeedCheck){
          callback()
          return
        }
        
        if (this.obj.Require && this.obj.convalue && !this.obj.convalue.length) {
          callback(new Error('请选择' + this.obj.conname))
        } else if (this.obj.Max > 0 && this.obj.convalue.length > this.obj.Max) {
          callback(new Error(`${this.obj.conname}最多选择${this.obj.Max}个`))
        } else {
          callback()
        }
      }
      return {        
        rules: {
          required: this.obj.Require,
          type: 'array',
          validator: validatePass,
          trigger: 'change'
        },
        orgVisible: false,
        orgDefaultProps: [],
        defaultCheckedKeys: []
      }
    },
    computed: {
  
    },     
    created () {
      // if (!this.obj.convalue) {
      //   this.obj.convalue = []
      // }
    },
    methods: {     
      updata (val) {
        debugger
        if (val.length) {
          this.obj.convalue = val.map(item => {
            if( item.OrgId ){
              // 按岗位
              return {
                Id: item.OrgId,
                Name: item.PositionName
              }
            }else {
              // 按人员  组织
              return {
                Id: item.NodeId,
                Name: item.Name
              }
            }
          })
        } else {
          this.obj.convalue = []
        }

        this.$emit('changeEmp', this.prop)
      }
    },
    watch: {
      obj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          if (!Array.isArray(newValue.convalue) && newValue.convalue === '') {
            this.obj.convalue = []
          }
          this.$emit('update:obj', newValue)
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .flex-div
    display flex
    align-items: center
    min-height 40px
    .div-selected
      display: inline-block
      margin-right 5px
      line-height: normal
      width: 300px
      min-height 28px
      border: 1px solid #d8dce5
      border-radius: 4px
</style>
