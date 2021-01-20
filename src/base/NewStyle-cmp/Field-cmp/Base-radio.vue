<!--
  User: xxxxxxx
  Date: 2019/10/08
  功能：单选radio 规则验证    controlType 12  
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "common-fieldcmp-style.styl";
  .el-scrollbar /deep/
    .el-scrollbar__wrap
      overflow-x hidden
      .item-rule__radio
        margin-left 0!important
        margin-right 30px
  .el-form-item__content
    .radioBox
      display inline-flex
      flex-wrap wrap
      line-height 40px
      justify-content flex-start
      .el-radio
        padding 5px 5px
        box-sizing border-box
        margin-left 0 !important
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



      <!-- dataSource: {{dataSource}}--- -->
      obj.convalue: {{obj.convalue}}
      ---
      obj.concode: {{obj.concode}}
      <!-- isHasAddOrEditAuth(): {{isHasAddOrEditAuth()}} -->
      <div 
        v-if="!isShowing" 
        class="fieldValueWrap u-f-g0"
        :style="fieldValueWrapStyle"
      >      
        <el-radio-group
          v-if="!isShowing"
          v-model="obj.convalue"
          @change="changeRadioValue(obj.convalue)"
          class="fieldValue"
        >
          <el-radio 
            class="item-rule__radio margin5"
            v-for="source in dataSource"
            :key="source.dicId"
            :disabled="isDisabledField"
            :label="source.dicId">
            {{source.itemName}}
          </el-radio>
        </el-radio-group>
      </div>

      <div 
        class="fieldValueWrap showValue line-bottom u-f-g0" 
        v-else
        :style="fieldValueWrapStyle"
      >
        <span>{{obj.convalue}}</span>
      </div>         
    </div>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { validatEmail, validatMobilePhone, validatTel, validateViewAuth } from '@/utils/validate'
  import iconSvg from '@/base/Icon-svg/index'  
  import { fieldsDataSourceMixin } from '@/utils/fieldsDataSourceMixins.js'
  import { commonFiledsViewFns } from './common-fields-mixins.js'
  import { newStyleGetDicByKey } from '@/api/dic'
  export default {
    mixins: [ commonFiledsViewFns, fieldsDataSourceMixin ],
    props: {
      //是否需要调取下拉源
      isNeedGetDataSource: {
        type: Boolean,
        default: true  // 默认需要
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
    data () {
      let validatePass = (rule, value, callback) => {
        debugger
        if( !this.isNeedCheck ){
          callback()
          return
        }

        if (this.obj.require && !this.obj.convalue) {
          callback(new Error('请选择' + this.obj.conname))
        } else {
          callback()
          // callback(new Error('请选择' + this.obj.conname))
        }
      }
      return {
        rules: {
          required: this.obj.require,
          validator: validatePass,
          trigger: ['change']
        },
        dataSource: [],
      }
    },
    computed: {
    
    },
    created () {

    },
    mounted () {

    },
    methods: {
      // radio value 值改变
      changeRadioValue (val) {

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

