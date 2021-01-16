<!--
  User: gaol
  Date: 2019/5/14
  功能：多选下拉框 的通用 验证组件     currentRuleComponent(obj.ControlType)  obj.ControlType为 6
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "common-fieldcmp-style.styl";
  >>>.el-form-item__error {
    left: 100px;
  }
  >>>.el-form-item__content {
    .filedContentWrap {
      .titWrap {
        margin-right: 5px !important;
      }
    }
  }
</style>
<template>
  <el-form-item
    :prop="prop"
    :rules="rules"
    v-if="isShowField"
  >
    <!-- obj: {{obj}} -->
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
            v-show="!isShowing && obj.Required"
            :icon-class="RequiredSvg"
          ></icon-svg>     
          <el-tooltip 
            v-if="obj.Description"
            :content="obj.Description">
            <i class="el-icon-info"></i>
          </el-tooltip>              
        </span>

      </div>  

      <!-- dataSource: {{dataSource}} -->
      <!-- obj.convalue: {{obj.convalue}} -->
      <div 
        v-if="!isShowing" 
        class="fieldValueWrap u-f-g0"
        :style="fieldValueWrapStyle"
      >
        <el-cascader
          class="fieldValue"
          v-if="!isShowing"
          :placeholder="obj.ActRemind ||　'请选择'"
          :options="dataSource"
          v-model="obj.convalue"
          :props="{
            'children': 'Children',
            'label':'Name',
            'value': 'Code',
            'multiple': true
          }"
          clearable
          :collapse-tags="false"
          filterable
          size="mini"
        >
          <template slot-scope="{ node, data }">
            <span class="u-f-ac">
              {{ data.Name }}
              <el-tooltip 
                v-if="data.Description"
                class="item" 
                effect="dark" 
                :content="data.Description" 
                placement="top-start"
              >
                <i class="el-icon-info" style="margin-left:5px"></i>
              </el-tooltip>
            </span> 
          </template>
        </el-cascader>

        <div         
          v-if="isDisabledField"
          class="shade"
        >
        </div>          
      </div>

      <div 
        class="fieldValueWrap showValue line-bottom u-f-g0" 
        v-else
        :style="fieldValueWrapStyle"
      >
        <span 
          class="ellipsis2"
          v-for="(item, key) in obj.convalue"
          :key="key"
        >
          {{item.Name}}
        </span>
      </div>             
    </div>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { validatEmail, validatMobilePhone, validatTel } from '@/utils/validate'
  import iconSvg from '@/base/Icon-svg/index' 
  import { commonFiledsViewFns } from './common-fields-mixins.js'
  import { fieldsDataSourceMixin } from '@/utils/fieldsDataSourceMixins.js'
  export default {
    mixins: [commonFiledsViewFns, fieldsDataSourceMixin],
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
        default: () => {
          return {}
        }
      },
      isTitle: {
        type: Boolean,
        default: true
      },
      currentFields: {
        typr: Array,
        default: () => {
          return []
        }
      }, 
      // 是否是直接显示 还是 新增或者编辑  这个决定了 此字段组件 在不同视图场景下的正确权限显示
      viewType: {
        type: String,
        default: ''   // '' 和View-TM 直接显示   新增：Add-TM  编辑：Edit-TM 删除：Del-TM  查看：View-TM  表的话就是Add-SH，Edit-SH，Del-SH，View-SH
      },                
    },
    computed: {
      // ...mapGetters([
      //   'nodeObjStore'
      // ])
    },
    component: {
      iconSvg
    },
    data () {
      // 验证规则
      let validatePass = (rule, value, callback) => {
        debugger
        if( !this.isNeedCheck ){
          callback()
          return
        }
        
        // 下拉选项的校验
        if (this.dataSource) {
          if (!this.dataSource.length) {
              // 业务领域存在 但是 dataSource 为空（获取业务领域接口时，返回的业务领域为空，需要重新配置表单）
            // callback(new Error(this.obj.conname + '所关联的字段范围无数据，请重新配置表单'))
            callback()
          } else if (this.obj.Require && (this.obj.convalue === '' || !this.obj.convalue)) {
            // 需要校验，并且 this.obj.convalue 为空
            callback(new Error(this.obj.conname + '不能为空'))
          } else {
            callback()
          }
        }
      }

      return {
        rules: {
          required: this.obj.Require,
          required: true,
          validator: validatePass,
          trigger: ['change', 'blur']
        },
        dataSource: [],     // option 的下拉选项
      }
    },
    computed: {
   
    },    
    created () {

    },
    mounted () {
    },
    beforeDestroy() {
    },
    watch: {
      obj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去，利用的是数据的双向绑定，父组件通过 .sync 向子组件传值，此方法会实现数据的双向绑定
          this.$emit('update:obj', newValue)
        },
        deep: true
      }
    },
    methods: {  
   
    }
  }
</script>

