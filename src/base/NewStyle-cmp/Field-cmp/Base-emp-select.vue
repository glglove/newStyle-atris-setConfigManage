<!--
  User: xxxxxxx
  Date: 2018/11/27
  功能：公司内联系人 19
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "common-fieldcmp-style.styl";
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
        <company-structure-cmp
          class="fieldValue"
          v-if="!isShowing"
          :isTitle="false"
          title="抄送人员"
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
    components: {
      CompanyStructureCmp,
      iconSvg
    },    
    data () {
      let validatePass = (rule, value, callback) => {
        if( !this.isNeedCheck ){
          callback()
          return
        }
        

        if (this.obj.require ==1 && !this.obj.convalue.length) {
          callback(new Error('请选择' + this.obj.conname))
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
        empVisible: false,
        checkedOrgTree: [],
        defaultCheckedKeys: []
      }
    },
    computed: {
   
    },    
    created () {
      if (!this.obj.convalue) {
        this.obj.convalue = []
      }
    },
    mounted () {
    },
    methods: {
      updata (val) {
        debugger
        if (val.length) {
          let addEmpArr = val.map(item => {
            return {
              Id: item.EmpId,
              Name: item.EmpName
            }
          })

          this.obj.convalue = this.obj.convalue.concat(addEmpArr)
          // 去重
          let newArr = []
          if (this.obj.convalue && this.obj.convalue.length) {
            this.obj.convalue.forEach((item,key) => {
              if(item.Id){
                newArr.push(item.Id)
              }else {
                this.obj.convalue.splice(key,1)
              }
            })
          }

          if (newArr.length && newArr.length >= 2) {
            for (let i = 0; i < newArr.length; i++) {
              if (newArr.indexOf(newArr[i]) !== i) {
                newArr.splice(i, 1)
                this.obj.convalue.splice(i, 1)
                --i
              }
            }
          }
        } else {
          // this.obj.convalue = []
        }
        this.$emit('changeEmp', this.prop)
      }
    },
    watch: {
      obj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          if (!this.obj.convalue) {
            this.obj.convalue = []
          }
          this.$emit('update:obj', newValue)
        },
        deep: true
      }
    }
  }
</script>

