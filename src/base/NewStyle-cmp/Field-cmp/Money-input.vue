<!--
  User: gaol
  Date: 2019/6/13
  功能：金额输入框  controlType 为 4   金额输入框控件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "common-fieldcmp-style.styl";
</style>
<template>
  <el-form-item
    :prop="prop"
    :rules="rules"
    v-show="(beforeHasShow==1) && isShowField"
  >
    <!-- obj：{{obj}} -->
    eventTypeResult: {{eventTypeResult}}
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
            v-show="!isShowing && (obj.require ==1)"
            :icon-class="RequiredSvg"
          ></icon-svg> 
          <el-tooltip 
            v-if="obj.description"
            :content="obj.description">
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
          clearable 
          class="fieldValue"
          :disabled="isDisabledField"          
          v-model="obj.convalue" 
          size="mini" 
          :type="isPassWordField? 'password':'number'"
          :placeholder="obj.actremind ||　'请输入'"
          @input="moneyChange">
        </el-input>
        <div 
          style="line-height: 20px" 
          v-if="this.obj.AutoCapital"
        >{{changeToChinese}}</div>
      </div>

      <div 
        class="fieldValueWrap showValue line-bottom u-f-g0" 
        v-else
        :style="fieldValueWrapStyle"
      >
        <span class="ellipsis2">{{obj.convalue}}</span>
      </div> 
    </div>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { validatEmail, validatMobilePhone, validatTel, validatMoney, validateViewAuth } from '@/utils/validate'
  import iconSvg from '@/base/Icon-svg/index'
  import ArabiaToChinese from '@/utils/arabiaToChinese'
  import { REQ_OK } from '@/api/config'
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
      // 是否直接显示控件的值, 默认false
      isShowing: {
        type: Boolean,
        default: false
      },       
      prop: {
        type: String,
        default: ''
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
    computed: {           
      changeUnit () {
        let unit = this.unitList.filter(i => {
          return i.Code === this.obj.Unit
        })
        if (unit && unit.length) {
          return unit[0].Name
        }
      },
      changeToChinese () {
        return ArabiaToChinese(this.obj.convalue)
      }
    },
    data () {
      let validatePass = (rule, value, callback) => {
        if( !this.isNeedCheck ) {
          callback()
          return
        }

        if (this.obj.require ==1 && (this.obj.convalue === '' || !this.obj.convalue)) {
          callback(new Error(this.obj.conname + '不能为空'))
        } else if (this.obj.require ==1 && !validatMoney(this.obj.convalue, this.obj.Digit)) {
          callback(new Error(`金额格式输入不正确，且小数点后最多${this.obj.Digit}位`))
        } else {
          callback()
        } 

      }
      
      return {      
        rules: {
          required: this.obj.require ==1,
          validator: validatePass,
          trigger: ['blur', 'change']
        },
        unitList: []
      }
    },
    created () {
      // console.log(this.obj)
    },
    methods: {           
      // 发起页面中明细表行 中的金额输入框输入值变化后，触发 改行 计算公式(/table-control-rule-cmp/base=calculate.vue)中的值变化
      moneyChange () {
        // this.$bus.$emit('moneyChange', this.trObj, this.tdIndex)
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

