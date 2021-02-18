<!--
  User: xxxxxxx
  Date: 2018/11/27
  功能：月份选择  controltype 为 10
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "common-fieldcmp-style.styl";
  .month-select-container
    display: flex;
    align-items: center;
    width 300px
    font-size: 0;
    text-align: right;
    .title
      display inline-block
      width 100px
      font-size 14px
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    .el-select
      width 200px
</style>
<template>
  <el-form-item
    :prop="prop"
    :rules="rules"
    v-show="(beforeHasShow==1) && isShowField"
  >
    <!-- obj：{{obj}} -->
    <!-- eventTypeResult: {{eventTypeResult}} -->
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
        <el-select  
          v-if="!isShowing"
          v-model="obj.convalue"
          clearable
          :disabled="isDisabledField"          
          class="fieldValue"
          size="mini"
          :placeholder="obj.actremind || '选择日期'"
        >
          <el-option
            v-for="item in data"
            :key="item.code"
            :label="item.value"
            :value="item.code">
          </el-option>
        </el-select>
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
      prop: {
        type: String,
        default: ''
      },           
      orderProp: {
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
        
        if (this.obj.require ==1 && (!this.obj.convalue.length)) {
          callback(new Error('请选择' + this.obj.conname))
        } else {
          callback()
        } 
      }
      return {
        rules: {
          required: this.obj.require ==1,
          validator: validatePass,
          trigger: ['change']
        },
        data: [
          {
            value: '一月',
            code: '1'
          },
          {
            value: '二月',
            code: '2'
          },
          {
            value: '三月',
            code: '3'
          },
          {
            value: '四月',
            code: '4'
          },
          {
            value: '五月',
            code: '5'
          },
          {
            value: '六月',
            code: '6'
          },
          {
            value: '七月',
            code: '7'
          },
          {
            value: '八月',
            code: '8'
          },
          {
            value: '九月',
            code: '9'
          },
          {
            value: '十月',
            code: '10'
          },
          {
            value: '十一月',
            code: '11'
          },
          {
            value: '十二月',
            code: '12'
          }
        ]
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

