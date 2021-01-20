<!--
  User: gaol
  Date: 2019/6/5
  功能：switch开关 (横项显示)     规则验证   controltype  11
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "common-fieldcmp-style.styl";
>>>.el-form-item__label
  width 160px !important
  .base-switch-container
    display: flex;
    align-items: center;
    width: 300px;
    font-size: 0;
    text-align: right;
    .title
      display inline-block
      width 100px
      font-size 14px
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    .el-input
      width 200px
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
        <el-switch
          v-if="!isShowing"
          v-model="obj.convalue"
          active-color="#3B8BE3"
          inactive-color="#cccccc"
          active-value="1"
          inactive-value="0"
          :disabled="isDisabledField"
          class="fieldValue">
        </el-switch>
      </div>

      <div 
        class="fieldValueWrap showValue line-bottom u-f-g0" 
        v-else
        :style="fieldValueWrapStyle"
      >
        <span class="ellipsis2">{{obj.convalue=="1"? '是':'否'}}</span>
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
      prop: {
        type: String,
        default: ''
      },
      // 是否直接显示控件的值, 默认false
      isShowing: {
        type: Boolean,
        default: false
      },        
      obj: {
        type: Object,
        default: {}
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

        if (this.obj.require) {
          callback()
        } else {
          callback()
        } 
      }
      return {
        rules: {
          required: this.obj.require,
          validator: validatePass,
          trigger: ['change']
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
          // debugger
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:obj', newValue)
        },
        deep: true
      }
    }
  }
</script>

