<!--
  User: xxxxxxx
  Date: 2019/10/08
  功能：数字输入框  controletype 为 3
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "common-fieldcmp-style.styl";
</style>
<template>
  <el-form-item
    :prop="prop"
    :rules="rules"
    v-if="isShowField">
    eventTypeResult： {{eventTypeResult}}
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
        <el-input 
          v-if="!isShowing"
          class="fieldValue"
          clearable 
          v-model="obj.convalue" 
          size="mini" 
          :disabled="isDisabledField"        
          :type="isPassWordField? 'password':'number'"          
          :placeholder="obj.ActRemind ||　'请输入'"
          @change="numChange">
        </el-input>
      </div>

      <div 
        class="fieldValueWrap showValue line-bottom u-f-g0" 
        v-else
        :style="fieldValueWrapStyle"
      >
        <span class="ellipsis2">{{obj.convalue}}</span>
      </div>    
    <!-- <span class="unit">{{obj.Unit === '1' ? '' : obj.Unit}}</span> -->
    </div>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { validatEmail, validatMobilePhone, validatTel, validatMoney } from '@/utils/validate'
  import iconSvg from '@/base/Icon-svg/index'
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
      obj: {
        type: Object,
        default: {}
      },
      prop: {
        type: String,
        default: ''
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
    component: {
      iconSvg
    },
    data () {
      let validatePass = (rule, value, callback) => {
        if( !this.isNeedCheck ){
          callback()
          return
        }
        
        if (this.obj.Require && (this.obj.convalue === '' || !this.obj.convalue)) {
          callback(new Error(this.obj.conname + '不能为空'))
        } else if (this.obj.Require && !validatMoney(this.obj.convalue, this.obj.Digit)) {
          callback(new Error(`格式输入不正确，且小数点后最多${this.obj.Digit}位`))
        } else {
          callback()
        }
      }
      return {         
        rules: {
          required: this.obj.Require,
          fieldLabelStyle: 'color: #000000;width: 100px',
          validator: validatePass,
          trigger: 'blur'
        }
      }
    },
    computed: {
     
    },    
    created () {
    },
    methods: {        
      // 发起页面中，数字输入变化后，需要触发一个事件 到时 计算公式(/table-control-rule-cmp/base=calculate.vue)的组件需要相应来自动计算值
      numChange(){
        // this.$bus.$emit('numChange',this.trObj, this.tdIndex)
      }
    },
    watch: {
      obj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:obj', newValue)
        },
        deep: true
      }
    }
  }
</script>

