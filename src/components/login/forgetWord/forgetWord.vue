<!--
  User: xxxxxxx
  Date: 2017/11/13
  功能：忘记密码
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.titHead
  .backWrap
    width: 30px
  .stepWrap
    .setItem
      margin 0 10px
      padding 5px 10px
      font-size 14px
      box-sizing border-box
      &.current
        border-bottom 2px solid #FF4001
        transform scale(1.1)
        color red
        transition all .2s
        &.stepNum
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

.nextBtnWrap,.sureBtnWrap,.setSuccessBtnWrap
  padding-left 100px
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
</style>
<template>
  <el-row>
    <el-col :span="24" style="padding: 20px;height: 100vh">
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

      <div class="valideAccount" v-show="currentIndex == 0">
        <el-form 
          ref="valideAccountForm"
          label-width="100px" 
          :model="valideAccountForm" 
          :rules="accountRules">
          <el-row>
            <el-col  :span="24">
              <el-form-item label="用户名" prop="userAccount">
                <el-input v-model="valideAccountForm.userAccount" label="请输入用户名"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-col  :span="24">
            <el-form-item label="手机号" prop="phone">
              <el-col :span="24" class="u-f-ajc">
                <el-input 
                  v-model.number="valideAccountForm.phone"
                  placeholder="请输入账号绑定的手机号" 
                  class="marginR5">
                </el-input>
                <el-button 
                  :disabled="!getCodeStatus || !this.valideAccountForm.phone || getMobileCodeStatus"
                  @click.native="getCodeByNamePhone"
                >{{codeBtnTit}}</el-button>
              </el-col>
            </el-form-item>
          </el-col>  


          <el-col  :span="24" v-if="showCodeLine">
            <el-form-item label="验证码" prop="mobileCode">
              <el-input v-model="valideAccountForm.mobileCode" placeholder="请输入验证码"></el-input>
            </el-form-item>

            <el-form-item label="新密码" prop="newPwd">
              <el-input v-model="valideAccountForm.newPwd" placeholder="请输入新密码"></el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="reNewPwd">
              <el-input v-model="valideAccountForm.reNewPwd" placeholder="再次输入新密码"></el-input>
            </el-form-item>                            
          </el-col>  

        </el-form>

        <el-col  class="sureBtnWrap" :span="24" v-if="showCodeLine">
          <el-button type="primary" class="sureBtn" @click.native="submitChange">
            确认修改
          </el-button>
        </el-col>          

        <!-- <el-col  class="nextBtnWrap" :span="24">
          <el-button type="primary" class="nextBtn">
            下一步
          </el-button>
        </el-col>     -->
      </div>

      <!-- <div class="resetWord" v-show="currentIndex == 1">
        form2
        <el-form 
          label-width="100px" 
          :model="valideAccountForm" 
          :rules="accountRules">
          <el-row>
            <el-col  :span="24">
              <el-form-item label="用户名">
                <el-input label="请输入用户名"></el-input>
              </el-form-item>
            </el-col>
            <el-col  :span="24">
              <el-form-item label="验证码">
                <el-input label="请输入验证码"></el-input>
              </el-form-item>
            </el-col>            
          </el-row>   
        </el-form>
        
        <el-col  class="nextBtnWrap" :span="24">
          <el-button type="primary" class="nextBtn">
            下一步
          </el-button>
        </el-col>    
      </div> -->    

      <div class="setSuccess" v-if="currentIndex == 1">
        <el-col  :span="24" class="setSuccessBtnWrap">
          <p class="center">密码修改成功!</p>        
          <el-button type="primary" class="setSuccessBtn" style="margin-top: 30px" @click.native="gotoLogin">
            去登录
          </el-button>           
        </el-col>      
      </div>     
    
    </el-col>
  </el-row>
</template>

<script type="text/ecmascript-6">
  import * as config from 'api/config'
  import { Message } from 'element-ui'
  import { validatEmail, validatMobilePhone, validatTel, validateViewAuth } from '@/utils/validate'
  import {
    debounce
  } from '@/utils/debounce.js'
  import {
    REQ_OK
  }from '@/api/config'
  import {
    resetPassword,
    getCodeByNamePhone
  } from '@/api/login'  
  export default {
    name: 'forgetWord',
    components: {

    },
    data () {
      let validatePhone = (rule, value, callback) => {
        if(this.valideAccountForm.phone){
          if(validatMobilePhone(this.valideAccountForm.phone)){
            this.getMobileCodeStatus = false
            callback()
          }else {
            this.getMobileCodeStatus = true
            callback(new Error("手机格式不正确"))
          }
        }else {
          this.getMobileCodeStatus = true
          callback(new Error('手机号为空'))          
        }
      }

      let validateReNewPwd = (rule, value, callback) => {
        debugger
        if(this.valideAccountForm.newPwd && this.valideAccountForm.newPwd === this.valideAccountForm.reNewPwd){
          callback()
        }else {
          callback(new Error("两次输入的密码不一致"))
        }
      }

      return {
        currentIndex: 0,
        titList: [
          {
            num: 1,
            tit: '密码修改'
          },
          // {
          //   num: 2,
          //   tit: '重置密码'
          // },
          {
            num: 2,
            tit: '修改成功'
          },                    
        ],
        timer: null,
        getMobileCodeStatus: true,  // 手机号码是否有效
        getCodeStatus: true,
        countdown: 60,
        showCodeLine: true,  
        valideAccountForm: {
          userAccount: '',
          phone: '',   
          mobileCode: '',  // 短信验证码   
          newPwd: '',
          reNewPwd: ''
        },
        accountRules: {
          userAccount: [
            {required: true, message: '请输入用户名',  trigger: 'blur'}
          ],
          phone: [
            {required: true, validator: validatePhone, trigger: ['blur','change']}
          ],  
          mobileCode: [
            {required: true, message: '请输入短信验证码',  trigger: 'blur'}
          ], 
          newPwd: [
            {required: true, message: '请输入新密码',  trigger: 'blur'}
          ], 
          reNewPwd: [
            {required: true, validator: validateReNewPwd, trigger: 'blur'}
          ]                     
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
        debugger
        // this.currentIndex = index
      },
      stopCode(){
        this.getCodeStatus = true
        this.countdown = 60
        clearInterval(this.timer)        
      },
      getCodeByNamePhone( phone ){
        debugger
        // 倒计时60s
        if(this.valideAccountForm.userAccount && this.valideAccountForm.phone) {
          this.getCodeStatus = false
          this.timer = setInterval(() => {
            if(this.countdown === 0){
              this.stopCode()
            }
            this.countdown -= 1
          }, 1000)
          // 调取短信接口
          getCodeByNamePhone(this.valideAccountForm.phone, this.valideAccountForm.userAccount).then(res => {
            debugger
            if( res && res.data.State === REQ_OK ) {
              this.showCodeLine = true
            }else {
              this.stopCode()
              this.$message({
                type: 'error',
                message: `${res.data.Error}`
              })
            }
          })          
        }
      },
      resetPassword(phone, userAccount, code, password){
        resetPassword(phone, userAccount, code, password).then(res => {
          if(res && res.data.State === REQ_OK){
            this.currentIndex = 1
          }else {
          
          }
        })
      },
      submitChange () {   
        let that = this 
        this.$refs.valideAccountForm.validate(valid => {
          if(valid) {
            debounce(that.resetPassword(
              this.valideAccountForm.phone, 
              this.valideAccountForm.userAccount, 
              this.valideAccountForm.mobileCode,
              this.valideAccountForm.newPwd
            ), 3000) 
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

