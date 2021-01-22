<!--
  User: gaol
  Date: 2019/10/08
  功能：数字区间  controlType 为 31
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "common-fieldcmp-style.styl";
>>>.el-range-editor--mini .el-range-separator {
  // line-height 32px !important
}
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
        <div class="fieldValue u-f-ac">
            <el-input 
                v-if="!isShowing"
                clearable 
                class="fieldValue-num"
                v-model="obj.convalue[0]" 
                size="mini" 
                :disabled="obj.Readonly || !isHasAddOrEditAuth()"        
                :type="isPassWordField? 'password':'number'"          
                :placeholder="obj.actremind ||　'请输入最小值'"
                @change="numChange"
            >
            </el-input> 
            <span class="fieldValue-mark">——</span>      
            <el-input 
            v-if="!isShowing"
            class="fieldValue-num"
            clearable 
            v-model="obj.convalue[1]" 
            size="mini" 
            :disabled="isDisabledField"        
            :type="isPassWordField? 'password':'number'"          
            :placeholder="obj.actremind ||　'请输入最大值'"
            @change="numChange">
            </el-input>   
        </div>         
      </div>

      <div 
        class="fieldValueWrap showValue line-bottom u-f-g0" 
        v-else
        :style="fieldValueWrapStyle"
      >
        <span class="ellipsis2">{{obj.convalue.length ? (obj.convalue | TimeStampToDate) : ''}}</span>
      </div>  
    </div>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { validatEmail, validatMobilePhone, validatTel, validateViewAuth } from '@/utils/validate'
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
    component: {
      iconSvg
    },
    data () {
      let validatePass = (rule, value, callback) => {
        if( !this.isNeedCheck ){
          callback()
          return
        }
        
        if (this.obj.require ==1 && (!this.obj.convalue.length || this.obj.convalue.length<2)) {
          callback(new Error(this.obj.conname + '需输入完整'))
        } else {
            if(this.obj.convalue[0]< this.obj.Min || this.obj.convalue[1] > this.obj.Max){
                callback(new Error(this.obj.conname + `输入值范围在${this.obj.Min}——${this.obj.Max}区间范围`))
            }else {
                callback()
            }
        }  
      }
      return {         
        rules: {
          required: this.obj.require ==1,         
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
      replaceTime (time) {
        let endTime = time.replace('/Date(', '')
        endTime = endTime.replace(')/', '')
        return parseInt(endTime)
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

