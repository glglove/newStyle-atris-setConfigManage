<!--
  User: xxxxxxx
  Date: 2020/11/17
  功能：字段设置器组件    controletype 为 29
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
    <!-- obj：{{obj}}
    eventTypeResult: {{eventTypeResult}}
    字段设置器组件 -->
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
          <!-- <icon-svg 
            class="fieldRequiredIcon"
            :icon-class="RequiredSvg"
          ></icon-svg>   -->
          <el-button
            type="primary"
            icon="el-icon-setting"
            size="mini"
            @click.native="handlerClickSetBtn(obj)"
          >
            {{obj.conname}}
          </el-button>
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

    <!----fieldSet 区域----->   
    comData_fieldSet: {{comData_fieldSet}}  
    <div class="fieldSetBox" v-if="showFieldSetFlag">

    </div>    

  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK, BASE_URL } from '@/api/config'
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
      iconSvg,
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
        showFieldSetFlag: false, 
        comData_fieldSet: {
          CombineType: '',
          MetaCode: ''
        }
      }
    },
    computed: {
  
    },    
    created () {

    },
    mounted () {
    },
    methods: {
      // 点击字段设置
      handlerClickSetBtn (obj) {
        debugger
        this.showFieldSetFlag = !this.showFieldSetFlag
        if(obj.Link){
          let arr = obj.Link.split("-")
          this.comData_fieldSet.CombineType = arr[0]
          this.comData_fieldSet.MetaCode = arr[1]
        }else {

        }
        let url = `http://localhost:8080/#/page_fieldSet?CombineType=${this.comData_fieldSet.CombineType}&MetaCode=${this.comData_fieldSet.MetaCode}`
        window.open(url)        
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

