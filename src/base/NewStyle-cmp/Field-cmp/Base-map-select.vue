<!--
  User: xxxxxxx
  Date: 2019/10/08
  功能：地点  controlType 22
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import 'common-fieldcmp-style.styl'
  .base-input-container
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
        class="fieldValueWrap u-f-g0 u-f-ac"
        :style="fieldValueWrapStyle"
      >    
        <el-input 
          disabled 
          size="mini" 
          v-model="obj.convalue.LocationName" 
          :placeholder="obj.actremind || '请选择地点'"
        ></el-input>
        <el-button 
          :disabled="isDisabledField"
          type="primary" 
          class="selecetMapBtn marginL5" 
          size="small" 
          icon="el-icon-plus" 
          @click.native="showMap = true"></el-button>
        <!--引用百度地图的组件---start-->
        <map-cmp v-if="showMap" @cancelLocation="showMap = false" @saveLocaltion="handleSaveLocaltion" :obj="obj.convalue"></map-cmp>
        <!--引用百度地图的组件---end-->          
      </div>


      <div 
        class="fieldValueWrap showValue line-bottom u-f-g0" 
        v-else
        :style="fieldValueWrapStyle"
      >
        <span class="ellipsis2">{{obj.convalue.LocationName}}</span>
      </div>         
    </div>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { validatEmail, validatMobilePhone, validatTel, validateViewAuth } from '@/utils/validate'
  import MapCmp from './dialog-map'
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
    components: {
      MapCmp
    },    
    data () {
      let validatePass = (rule, value, callback) => {
        if(!this.isNeedCheck){
          callback()
          return
        }
        
        if (this.obj.require ==1 && (!this.obj.convalue.LocationName)) {
          callback(new Error('请选择' + this.obj.conname))
        } else {
          callback()
        } 
      }
      return {      
        rules: {
          required: this.obj.require ==1,
          type: 'array',
          validator: validatePass,
          trigger: ['change']
        },
        showMap: false
      }
    },
    computed: {

    },    
    created () {
    },
    methods: {   
      handleSaveLocaltion (localtion) {
        console.log(localtion)
        this.showMap = false
        this.obj.convalue = localtion
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

