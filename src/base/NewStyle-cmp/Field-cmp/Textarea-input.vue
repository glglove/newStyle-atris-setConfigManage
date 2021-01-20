<!--
  User: gaol
  Date: 2019/10/08
  功能：多行输入框    controlType 为  2  
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "common-fieldcmp-style.styl";
  .textarea-input-rule
    .el-textarea__inner
      max-height 200px!important
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
            v-show="!isShowing && obj.require"
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
          v-if="!isShowing"
          clearable
          class="textarea-input-rule fieldValue"
          v-model="obj.convalue"
          :disabled="isDisabledField" 
          :type="isPassWordField? 'password':'textarea'"  
          :placeholder="obj.actremind || '请输入'"
          :maxlength="obj.Max"
          :autosize="{ minRows: 1, maxRows: 4}"
        >
        </el-input>
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
  import { validatEmail, validatMobilePhone, validatTel } from '@/utils/validate'
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
    data () {
      let validatePass = (rule, value, callback) => {
        if( !this.isNeedCheck ){
          callback()
          return
        }
        
        if (this.obj.require && (this.obj.convalue === '' || !this.obj.convalue)) {
          callback(new Error(this.obj.conname + '不能为空'))
        } else if (this.obj.convalue && this.obj.convalue.length > 3000) {
          callback(new Error('长度不能大于3000字符'))
        } 
        else if (this.obj.ValidData === '邮箱' && !validatEmail(this.obj.convalue)) {
          callback(new Error('邮箱格式不正确'))
        } else if (this.obj.ValidData === '手机' && !validatMobilePhone(this.obj.convalue)) {
          callback(new Error('手机格式不正确'))
        } else if (this.obj.ValidData === '电话' && !validatTel(this.obj.convalue)) {
          callback(new Error('电话格式不正确'))
        }
         else {
          callback()
        }
      }
      return {       
        rules: {
          required: this.obj.require,
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


