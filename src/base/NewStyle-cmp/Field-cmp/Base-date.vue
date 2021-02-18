<!--
  User: gaol
  Date: 2019/10/08
  功能：日期  controlType  7
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "common-fieldcmp-style.styl";
.base-date-container
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
        <el-date-picker
          v-if="!isShowing"
          size="mini"
          v-model="obj.convalue"
          type="date"
          :format="initDate"
          :disabled="isDisabledField"
          class="fieldValue"
          value-format="timestamp"
          :placeholder="obj.actremind || '选择日期'">
        </el-date-picker>
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
          callback()
          return
        }

        if (this.obj.require ==1 && (this.obj.convalue === '' || !this.obj.convalue)) {
          callback(new Error('请选择' + this.obj.conname))
        } else {
          callback()
        }  
      }  

      return {        
        rules: {
          required: this.obj.require ==1,
          validator: validatePass,
          trigger: ['change', 'blur']
        }
      }
    },
    computed: {  
      // 将时间转化为 时间戳的格式
      initDate () {
        // switch (this.obj.Config.Attribute) {
        //   case 'yyyy-MM-dd':
        //     return 'date'
        //   default:
        //     return ''
        // }
      }
    },
    created () {
      this.$nextTick(() => {
        // 将时间转化给 时间戳格式
        if(this.obj.convalue){
          var date = new Date(this.obj.convalue);
          // 有三种方式获取
          this.obj.convalue = date.getTime();
          // var time2 = date.valueOf();
          // var time3 = Date.parse(date);
          // console.log(time1);//1398250549123
          // console.log(time2);//1398250549123
          // console.log(time3);//1398250549000    
        }   

        if(this.obj.Attribute){
          switch(this.obj.Attribute){
            case 'yyyy-MM-dd':
              return 'date'
            default:
              return 'date'
          }
        }
      })
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

