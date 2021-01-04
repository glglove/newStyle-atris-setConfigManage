<!--
  User: xxxxxxx
  Date: 2020/06/01
  功能：注册
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.titHead
  .backWrap
    width: 30px
  .stepWrap
    .setItem
      margin 0 5px
      padding 5px 5px
      font-size 14px
      box-sizing border-box
      &.current
        border-bottom 2px solid #FF4001
        transform scale(1.1)
        color red
        transition all .2s
      .stepNum
        width 15px
        line-height 15px
        height 15px
        margin-right 2px
        font-size 12px
        text-align center
        background #FF4001
        border-radius 50%
        color #ffffff  
.valideAccount,.resetWord,.setSuccess {
  position: absolute;
  max-width: 700px;
  left: 10px;
  right: 10px;
  margin: 20px auto;  
}

.setSuccess {
  top: 50px
}

.nextBtnWrap,.setSuccessBtnWrap
  padding-left 100px
  margin-top 10px
  .nextBtn,.sureBtn,.setSuccessBtn
    width 100%
    margin 0 auto
    background #FF4001 !important
    border-color #FF4001 !important
    &:hover
      border-color #FF4001 !important
      opacity .9
      &:active
        opacity .7
        &::before
          opacity .7
  .cancelBtn
    width 100% !important
    margin 10px auto 0  !important
    background #909399 !important
    border-color #909399 !important
    &:hover
      border-color #909399 !important
      opacity .9
      &:active
        opacity .7
        &::before
          opacity .7    
</style>
<template>
<el-row>
  <el-col :span="24" style="padding: 20px;position: relative">
    <div class="titHead line-bottom u-f-jst">
      <div class="backWrap u-f-ajc u-f-g0" @click="backToLogin">
        <i class="el-icon-back"></i>
      </div>
      <ul class="stepWrap u-f-ajc u-f-g2">
        <li
          v-for="(item, key) in titList" 
          :key="key"
          class="setItem u-fi-ajc u-f-g0" 
          :class="currentIndex == key?'current':''"
          @click="handlerClickTit(item,key)"
        >
          <span class="stepNum">{{item.num}}</span>
          <span class="setTit">{{item.tit}}</span>
        </li>
      </ul>          
    </div>

    <div class="valideAccount animated fadeIn" v-show="currentIndex == 0">
      <el-form 
        ref="accountForm"
        label-width="100px" 
        :model="accountForm" 
        :rules="accountRules">
        <el-row>
          <el-col  :span="24">
            <el-form-item label="用户名" prop="accountname">
              <el-input 
                v-model="accountForm.accountname"
                placeholder="请输入用户名"></el-input>
            </el-form-item>
          </el-col>
          <el-col  :span="24">
            <el-form-item label="设置密码" prop="password">
              <el-input 
                v-model="accountForm.password" 
                type="password"
                placeholder="请设置初始密码"
              ></el-input>
            </el-form-item>
          </el-col>  

          <el-col  :span="24">
            <el-form-item label="确认密码" prop="surepassword">
              <el-input 
                v-model="accountForm.surepassword"
                type="password"
                placeholder="请再次输入密码"></el-input>
            </el-form-item>
          </el-col>        

          <el-col  :span="24">
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="accountForm.email" 
                placeholder="请输入邮箱"
              ></el-input>
            </el-form-item>
          </el-col>   


          <el-col  :span="24">
            <el-form-item label="企业电话" prop="fixtel">
              <el-col :span="24" class="u-f-ajc">
                <el-input 
                  v-model="accountForm.fixtelArea"
                  placeholder="请输入区号" 
                  class="marginR5" 
                  style="width: 150px"
                ></el-input>
                <span>-</span>
                <el-input 
                  v-model="accountForm.fixtelTel"
                  placeholder="请输入电话"
                ></el-input>
              </el-col>
            </el-form-item>
          </el-col> 

          <!-- <el-col :span="24">
            <el-form-item label="省市区">
              <dist-picker-cmp
                :placeholders = "{
                  province: '--省--',
                  city: '--市--',
                  area: '--区--'
                }"
              ></dist-picker-cmp>
            </el-form-item>
          </el-col>     -->

          <el-col  :span="24">
            <el-form-item label="手机号" prop="phone">
              <el-col :span="24" class="u-f-ajc">
                <el-input 
                  v-model.number="accountForm.phone"
                  placeholder="请输入验证码" 
                  class="marginR5">
                </el-input>
                <el-button 
                  :disabled="!getCodeStatus || !this.accountForm.phone || getMobileCodeStatus"
                  @click.native="getMobileCode"
                >{{codeBtnTit}}</el-button>
              </el-col>
            </el-form-item>
          </el-col>       

          <el-col  :span="24">
            <el-form-item label="验证码" prop="phonecode">
              <el-input
                v-model="accountForm.phonecode" 
                placeholder="请输入验证码"></el-input>
            </el-form-item>
          </el-col>  
        </el-row>    
      </el-form>

      <el-col  class="nextBtnWrap" :span="24">
        <el-button 
          :disabled="!nextBtnStatus"
          type="primary" 
          class="nextBtn"
          @click.native="handlerNextBtn"
          >
          下一步
        </el-button>
      </el-col>   

    </div>

    <div class="resetWord animated fadeIn" v-show="currentIndex == 1">
      <el-form 
        ref="companyForm"
        label-width="100px" 
        :model="companyForm" 
        :rules="companyRules">
        <!-- companyForm： {{companyForm}} -->
        <el-row>
          <el-col  :span="24">
            <el-form-item label="企业名称" prop="companynamecn">
              <el-input 
                v-model="companyForm.companynamecn"
                placeholder="请输入企业名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col  :span="24">
            <el-form-item label="企业简称" prop="nicknamecn">
              <el-input 
                v-model="companyForm.nicknamecn"
                placeholder="请输入企业简称"></el-input>
            </el-form-item>
          </el-col>  

          <el-col  :span="24">
            <el-form-item label="联系人" prop="linkman">
              <el-input
                v-model="companyForm.linkman" 
                placeholder="请输入联系人"></el-input>
            </el-form-item>
          </el-col>        

          <el-col :span="24">
            <el-form-item label="省市区" prop="province" :rules="provinceRule">
              <dist-picker-cmp
                :propObj.sync="companyForm"
                :propCurrentProvince.sync="companyForm.province"
                :propCurrentCity.sync="companyForm.city"
                :propCurrentArea.sync="companyForm.area"
                @selectprovince="selectProvince"
                @selectcity="selectCity"
                @selectarea="selectArea"
              ></dist-picker-cmp>              
            </el-form-item>
          </el-col>    

          <el-col  :span="24">
            <el-form-item label="企业地址" prop="street">
              <el-col :span="24">
                <el-input 
                  v-model="companyForm.street"
                  placeholder="请输入企业地址">
                </el-input>
              </el-col>
            </el-form-item>
          </el-col>       

          <el-col  :span="24">
            <el-form-item label="人员规模" prop="companyscope">
              <el-select 
                v-model="companyForm.companyscope"
                clearable
                placeholder="请选择"
                filterable style="width: 100%">
                <el-option label="0~20" value="companyscope_1"></el-option>
                <el-option label="21~100" value="companyscope_2"></el-option>
                <el-option label="101~300" value="companyscope_3"></el-option>
                <el-option label="301~500" value="companyscope_4"></el-option>
                <el-option label="501~1000" value="companyscope_5"></el-option>
                <el-option label="1000以上" value="companyscope_6"></el-option>
              </el-select>
            </el-form-item>
          </el-col>  

          <el-col  :span="24">
            <el-form-item label="企业性质" prop="naturetype">
              <el-select 
                v-model="companyForm.naturetype"
                placeholder="请选择"
                clearable
                filterable style="width: 100%">
                <el-option label="民营" value="naturetype_1"></el-option>
                <el-option label="外商独资" value="naturetype_2"></el-option>
                <el-option label="合资" value="naturetype_3"></el-option>
                <el-option label="中外合作" value="naturetype_4"></el-option>
                <el-option label="国企" value="naturetype_5"></el-option>
                <el-option label="股份制" value="naturetype_6"></el-option>
                <el-option label="上市公司" value="naturetype_7"></el-option>
                <el-option label="国家机关" value="naturetype_8"></el-option>
                <el-option label="事业单位" value="naturetype_9"></el-option>
                <el-option label="其他" value="naturetype_10"></el-option>
              </el-select>
            </el-form-item>
          </el-col>  

          <el-col  :span="24">
            <el-form-item label="所属行业" prop="businesstype">
              <el-select 
                v-model="companyForm.businesstype"
                clearable
                placeholder="请选择"
                filterable style="width: 100%">
                <el-option label="IT电子|通信互联网" value="businesstype_1"></el-option>
                <el-option label="金融业" value="businesstype_2"></el-option>
                <el-option label="房产建筑" value="businesstype_3"></el-option>
                <el-option label="生产|加工|制造" value="businesstype_4"></el-option>
                <el-option label="能源|矿产|环保" value="businesstype_5"></el-option>
                <el-option label="交通|运输|物流|仓储" value="businesstype_6"></el-option>
                <el-option label="商业服务" value="businesstype_7"></el-option>
                <el-option label="个人服务业" value="businesstype_8"></el-option>
                <el-option label="贸易|批发|零售|租赁业" value="businesstype_9"></el-option>
                <el-option label="文化传媒|娱乐休闲|工艺美术" value="businesstype_10"></el-option>
                <el-option label="政府|非盈利机构" value="businesstype_11"></el-option>
                <el-option label="医药医疗器械" value="businesstype_12"></el-option>
                <el-option label="农|林|牧|渔|其他" value="businesstype_13"></el-option>
              </el-select>
            </el-form-item>
          </el-col>      

          <el-col :span="24" class="agreement" style="padding-left: 100px">
            <el-form-item label="" prop="hasChecked">
              <el-checkbox v-model="companyForm.hasChecked">
              </el-checkbox>  
              <span>
                我已阅读
              </span>
              <el-button type="text" style="color: red" @click="clickUserAgreement">
                用户协议
              </el-button>
              <span>及</span>
              <el-button type="text" style="color: red" @click="clickProtectAgreement">
                保护协议
              </el-button>  
              <span>,并同意</span>            
            </el-form-item>  
          </el-col>
        </el-row>    
      </el-form>
      
      <el-col  class="nextBtnWrap" :span="24">
        <el-button 
          :disabled="!submitBtnStatus"
          type="primary" 
          class="nextBtn" 
          @click.native="submitCompanyInfo">
          提交
        </el-button>       
      </el-col>     
    </div>     

    <div class="setSuccess animated fadeIn" v-show="currentIndex == 2">
      <el-col  :span="24" class="setSuccessBtnWrap">
        <p class="center">恭喜注册成功!</p>        
        <el-button type="primary" class="setSuccessBtn" style="margin-top: 30px" @click.native="gotoLogin">
          去登录
        </el-button>           
      </el-col>     
    </div>    
  </el-col>

  <div class="agreeMentDialog" v-if="showUserAgreement">
    <el-dialog
      title="用户协议"
      :append-to-body="true"
      :close-on-click-modal="true"
      :visible.sync="showUserAgreement"
    >
      <service-agreement-cmp 
        :agreementData="agreementData"
      ></service-agreement-cmp>
    </el-dialog>
  </div>

  <div class="confidentialtyDialog" v-if="showConfidentialty">
    <el-dialog
      title="保密协议"
      :append-to-body="true"
      :close-on-click-modal="true"
      :visible.sync="showConfidentialty"
    >
      <confidentiality-agreement-cmp 
        :agreementData="agreementData"
      ></confidentiality-agreement-cmp>
    </el-dialog>
  </div>  
</el-row>
</template>

<script type="text/ecmascript-6">
  import * as config from 'api/config'
  import { Message } from 'element-ui'
  import DistPickerCmp from '@/base/DistPicker/DistPicker-cmp'
  import confidentialityAgreementCmp from './confidentialityAgreement'
  import serviceAgreementCmp from './serviceAgreement'
  import { validatEmail, validatMobilePhone, validatTel, validateViewAuth } from '@/utils/validate'
  import {
    REQ_OK
  } from '@/api/config'
  import {
    debounce
  } from '@/utils/debounce.js'  
  import {
    getMobileCode,
    checkPhoneCode,
    saveAccountCompany
  } from '@/api/login'
  export default {
    name: 'register',
    components: {
      DistPickerCmp,
      confidentialityAgreementCmp,
      serviceAgreementCmp
    },
    data () {
      let validateAccount = (valid, rule, callback) => {
        // debugger
        if(this.accountForm.accountname){
          callback()
        }else { 
          callback(new Error('用户名不能为空'))
        }
      }

      let validatePassword = (valid, rule, callback) => {
        // debugger
        if(this.accountForm.password){
          callback()
        }else { 
          callback(new Error('密码不能为空'))
        }
      }
  
      let validatesurePassword = (valid, rule, callback) => {
        // debugger
        if(this.accountForm.password && this.accountForm.password === this.accountForm.surepassword){
          callback()
        }else { 
          callback(new Error('两次输入的密码不一致'))
        }
      }  

      let validateEmail = (valid, rule, callback) => {
        // debugger
        if(validatEmail(this.accountForm.email)){
          callback()
        }else { 
          callback(new Error('邮箱格式不正确'))
        }
      }  

      let validateFixtel = (valid, rule, callback) => {
        console.log(`${this.accountForm.fixtelArea}-${this.accountForm.fixtelTel}`)
        debugger
        if(validatTel(`${this.accountForm.fixtelArea}-${this.accountForm.fixtelTel}`)){
          callback()
        }else { 
          callback(new Error('电话格式不正确'))
        }
      } 
      
      let validatePhone = (valid, rule, callback) => {
        // debugger
        if(this.accountForm.phone){
          if(validatMobilePhone(this.accountForm.phone)){
            this.getMobileCodeStatus = false
            callback()
          }else { 
            this.getMobileCodeStatus = true
            callback(new Error('手机号格式不正确'))
          }
        }else {
          this.getMobileCodeStatus = true
          callback(new Error('手机号为空'))
        }
      } 

      let validateProvince = (valid, rule, callback) => {
        debugger
        if(this.companyForm.province && this.companyForm.city && this.companyForm.area){
          callback()
        }else {
          if(!this.companyForm.province && !this.companyForm.city){
            callback(new Error('省市为空'))
            return
          }else {
            // 区为非必填项
            callback()
          }
        }
      }

      let validateHasChecked = (valid, rule, callback) => {
        if(this.companyForm.hasChecked){
          callback()
        }else {
          callback(new Error('请勾选'))
        }
      }

      return {
        currentIndex: 0,
        showUserAgreement: false,
        showConfidentialty: false,
        titList: [
          {
            num: 1,
            tit: '填写账号信息'
          },
          {
            num: 2,
            tit: '企业详细信息'
          },
          {
            num: 3,
            tit: '注册成功'
          },                    
        ],
        timer: null,
        getMobileCodeStatus: true,  // 手机号码是否有效
        getCodeStatus: true,
        countdown: 60,                  
        phone: 17607178201,    
        nextBtnStatus: true,
        submitBtnStatus: true,                             
        accountForm: {                                                                                                                                                                                                                                                                                                                                               
          accountname:  '',
          password: '',
          surepassword: '',                
          email: '',
          fixtelArea:'',
          fixtelTel: '',
          fixtel: '',          
          phone: '',        
          phonecode: ''
        },                                                                                          
        accountRules: {              
          accountname:  [
            {required: true, validator: validateAccount, trigger: 'blur'}
          ],
          password: [
            {required: true, validator: validatePassword, trigger: 'blur'}            
          ],
          surepassword: [
            {required: true, validator: validatesurePassword, trigger: 'blur'}           
          ],                
          email: [
            {required: true, validator: validateEmail, trigger: 'blur'}              
          ],
          fixtel: [
            {required: true, validator: validateFixtel, trigger: 'blur'}             
          ],
          phone: [
            {required: true, validator: validatePhone, trigger: ['change','blur']}               
          ],        
          phonecode: [
            {required: true, message:'验证码为空', trigger: 'blur'}            
          ]
        },
        companyForm: {
          companynamecn: '',                                                          
          nicknamecn: '',
          linkman: '',
          province: '',
          city: '',
          area: '',  
          street: '', // 企业地址
          companyscope: '',  // 规模
          naturetype: '', // 企业性质
          businesstype: '', // 所属行业,
          hasChecked: true,
        },
        companyRules: {
          companynamecn: [
            {required: true, message:'企业名称为空', trigger: 'blur'}            
          ],
          linkman: [
            {required: true, message:'联系人为空', trigger: 'blur'}            
          ],
          // province: [
          //   {required: false, validator: validateProvince, trigger: ['change','blur']}            
          // ],            
          street: [
            {required: true, message:'企业地址为空', trigger: 'blur'}            
          ],          
          companyscope: [
            {required: true, message:'规模为空', trigger: ['blur','change']}            
          ], 
          naturetype: [
            {required: true, message:'企业性质为空', trigger: ['blur','change']}            
          ],  
          businesstype: [
            {required: true, message:'所属行业为空', trigger: ['blur','change']}            
          ],  
          hasChecked: [
            {required: true, validator: validateHasChecked, trigger: 'blur'}            
          ]                                     
        },
        provinceRule: {
          required: false, validator: validateProvince, trigger: ['change','blur']
        }            

      }
    },
    computed: {
      codeBtnTit () {
        if(this.getCodeStatus){
          return '点击获取验证码'
        }else {
          return `倒计时${this.countdown}`
        }
      },
      codeBtnStyle () {
        // if(this.getCodeStatus) {
        //   return 'background-color: rgba(255, 64, 1, 1)'
        // }else {
        //   return 'background-color: rgba(255, 64, 1, .3)'
        // }
      }
    },
    created(){

    },
    methods: {
      backToLogin(){
        this.$router.push({
          path: '/login'
        })
      },
      handlerClickTit(item, index){
        // this.currentIndex = index
      },
      clickUserAgreement(){
        this.showUserAgreement = true
      },
      clickProtectAgreement(){
        this.showConfidentialty = true
      },
      selectProvince(obj){
        debugger
        this.companyForm.province = obj.code || ''
      },
      selectCity(obj){
        debugger
        this.companyForm.city = obj.code || ''
      },
      selectArea(obj){
        debugger
        this.companyForm.area = obj.code || ''
      },
      getMobileCode(  ){
        debugger
        // 倒计时60s
        if(this.accountForm.phone) {
          if( validatMobilePhone(this.accountForm.phone)) {
            this.getCodeStatus = false
            this.timer = setInterval(() => {
              if(this.countdown === 0){
                this.getCodeStatus = true
                this.countdown = 60
                clearInterval(this.timer)
              }
              this.countdown -= 1
            }, 1000)
            // 调取短信接口
            getMobileCode(this.accountForm.phone).then(res => {

            }) 
          }else {
            // 手机 号码无效
            this.getCodeStatus = false
          }   
        }else {

        }
      },
      checkPhoneCode(phone, code){
        checkPhoneCode(phone, code).then(res => {
          if(res && res.data.State === REQ_OK){
            this.currentIndex = 1
          }else {

          }
        })
      },
      handlerNextBtn(){
        let that = this
        this.$refs.accountForm.validate(valid => {
          if(valid){
            debounce(that.checkPhoneCode(that.accountForm.phone, that.accountForm.phonecode), 2000)
          }else {

          }
        })
      },
      saveAccountCompany(obj){
        this.submitBtnStatus = false
        saveAccountCompany(obj).then(res => {
          this.submitBtnStatus = true
          if(res && res.data.State === REQ_OK){
              this.currentIndex = 2
          }else {
            this.$message({
              type: 'error',
              message: `保存失败,${res.data.Error}`
            })
          }
        })
      },
      submitCompanyInfo(){
        debugger
        let that = this
        this.$refs.companyForm.validate(valid => {
          if(valid){
            that.companyForm.accountname = this.accountForm.accountname
            that.companyForm.password = this.accountForm.password
            that.companyForm.email = this.accountForm.email
            that.companyForm.fixtel = this.accountForm.fixtel
            that.companyForm.phone = this.accountForm.phone
            debounce(that.saveAccountCompany(that.companyForm), 2000)
          }else {

          }
        })
      },
      gotoLogin(){
        this.$router.push({
          path: '/login'
        })
        this.currentIndex = 0
      } 
    }
  }
</script>

