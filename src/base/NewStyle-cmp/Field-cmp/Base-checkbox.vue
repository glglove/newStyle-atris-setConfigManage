<!--
  User: xxxxxxx
  Date: 2019/10/08
  功能：多选  controlType  13
-->
<style lang="stylus" rel="stylesheet/stylus">
  @import "common-fieldcmp-style.styl"; 
  .item-rule__checkbox
    margin-left 0 !important
    margin-right 30px
</style>
<template>
  <el-form-item
    :prop="prop"
    :rules="rules"
    v-show="(beforeHasShow==1) && isShowField"
  >
    <!-- obj：{{obj}} -->
    <!-- localDicDataSourceList: {{localDicDataSourceList}} -->
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

      <!-- dataSource: {{dataSource}}---
      obj.convalue: {{obj.convalue}} -->
      <div 
        v-if="!isShowing" 
        class="fieldValueWrap u-f-g0"
        :style="fieldValueWrapStyle"        
      >
        <el-checkbox-group 
          v-model="obj.convalue" 
          class="fieldValue"
        >
          <el-checkbox
            v-for="source in dataSource"
            :key="source.dicId"
            :disabled="isDisabledField"
            :label="source.itemName"
            @change="changeCheck"
          >
            {{source.itemName}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
 
      <div 
        class="fieldValueWrap showValue line-bottom u-f-g0" 
        v-else
        :style="fieldValueWrapStyle"
      >
        <span
          v-for="(item, key) in obj.convalue" 
          :key="key"
          class="ellipsis2"
          style="margin-right: 8px;"
        >{{item.itemName}}</span>
      </div>          
    </div>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import {REQ_OK} from '@/api/config'
  import { newStyleGetDicByKey } from '@/api/dic'
  import { validatEmail, validatMobilePhone, validatTel, validateViewAuth } from '@/utils/validate'
  import iconSvg from '@/base/Icon-svg/index'
  import { fieldsDataSourceMixin } from '@/utils/fieldsDataSourceMixins.js'
  import { commonFiledsViewFns } from './common-fields-mixins.js'
  export default {
    mixins: [fieldsDataSourceMixin, commonFiledsViewFns],
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
      // 是否直接显示控件的值, 默认false
      isShowing: {
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
      sid: {
        type: Number,
        default: 0
      },
      obj: {
        type: Object,
        default: {}
      },
      isTitle: {
        type: Boolean,
        default: true
      },
      // 是否是直接显示 还是 新增或者编辑 这个决定了 此字段组件 在不同视图场景下的正确权限显示
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
          // 不需要校验的话
          callback()
          return 
        }

      if (this.obj.require ==1 && (!this.obj.convalue || !this.obj.convalue.length)) {
          callback(new Error(`请选择${this.obj.conname}`))
        } else if (this.obj.Max > 0 && this.obj.convalue.length > this.obj.Max) {
          callback(new Error(`${this.obj.conname}最多选择${this.obj.Max}个`))
        } else {
          callback()
        }
      }
      return {      
        rules: {
          required: this.obj.require ==1,
          type: 'array',
          validator: validatePass,
          trigger: 'change'
        },
        dataSource: []
      }
    },
    computed: {
   
    },
    created () {
    },
    mounted () {

    },
    methods: {
      _initData(){
      },      
      changeCheck (e) {
        // e.preventDefault()
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


