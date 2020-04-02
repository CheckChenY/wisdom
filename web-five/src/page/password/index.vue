<template>
  <div class="forget_password">
    <el-container>
      <el-header>
        <div class="forg_pass_logo">
          <img class="forg_pass_img" src="/img/logo1.85f94731.png">
          <h2>金特莱智慧消防云平台</h2>
        </div>
        <h5>守护您的消防安全</h5>
        <h4>忘记密码</h4>
      </el-header>
      <el-main>
        <div class="main_content">
          <div class="input_item">
            <span>手机号(登录名)</span>
            <el-input placeholder="请输入手机号(登录名)" type="tel" v-model="form.phone">
              <template slot="prepend">+ 86</template>
            </el-input>
          </div>
          <div class="input_item">
            <span>短信验证码</span>
            <div class="input_item_val">
              <el-input placeholder="请输入短信验证码" maxlength="6" v-model="form.seccode"></el-input>
              <div class="phone_code" @click="getCode">{{countText}}</div>
            </div>
          </div>
          <div class="input_item">
            <span>新密码</span>
            <el-input placeholder="6-16位密码，区分大小写" type="password" maxlength="16" minlength="6" v-model="form.password"></el-input>
          </div>
          <div class="input_item">
            <span>确认新密码</span>
            <el-input placeholder="确认密码" maxlength="16" type="password" minlength="6" v-model="form.repassword"></el-input>
          </div>
          <div class="button_item">
            <el-button class="button_style" icon="el-icon-arrow-left" @click="back">返回</el-button>
            <el-button type="primary" class="button_style" icon="el-icon-check" @click="updatePass">确定</el-button>
          </div>
        </div>
      </el-main>
      <el-footer>
        <div>
          <span class="footer_cont">帮助</span>
          <span class="footer_cont">隐私</span>
          <span class="footer_cont">条款</span>
        </div>
        <div class="footer_text">
          Copyright&copy; {{year}} 郑州金特莱电子有限公司 版权所有
        </div>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import { updatePass } from '@/api/register'
import { checkPhone } from '@/api/public'
import { isvalidatemobile } from "@/util/validate";
import { Message } from 'element-ui'
export default {
  name: "password",
  data () {
    return {
      form: {
        phone: '',
        seccode: '',
        password: '',
        repassword: '',
      },
      year: new Date().getFullYear(),
      countdown: 60,
      countText: '获取验证码',
      disable: true,
    };
  },
  watch: {
  },
  created () { 
  },
  mounted () { },
  computed: {
  },
  props: [],
  methods: {
    // 获取短信验证码
    getCode () {
      if (!this.disable) {
        return
      }
      let validatePhone = isvalidatemobile(this.form.phone)
      if (validatePhone[0]) {
        Message({
          message: validatePhone[1]
        })
        return
      }
      checkPhone({phone: this.form.phone}).then((res) => {
        if (res && res.data && res.data.code == 0) {
          this.timer()
          Message({
            message: '发送成功',
            type: 'success'
          })
        }
      })
    },
    // 计时器
    timer () {
      if (this.countdown == 0) {  
        this.disable = true
        this.countText="重新获取验证码";  
        this.countdown = 60;  
        return false;  
      } else {  
        this.disable = false
        this.countText="重新发送(" + this.countdown + ")";  
        this.countdown--;  
      }  
      setTimeout(() => {  
        this.timer();  
      },1000); 
    },
    // 修改密码
    updatePass () {
      if (this.form.repassword != this.form.password) {
        Message({
          message: '两次密码不一致',
          type: 'error'
        })
        return
      }
      delete this.form.repassword
      updatePass(this.form).then(res => {
        if (res && res.data && res.data.code == 0) {
          Message({
            message: '修改成功',
            type: 'success'
          })
        }
      })
    },
    back () {
      window.history.back()
    }
  }
};
</script>

<style lang="scss">
.forget_password {
  height: 100%;
  .el-header{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: auto !important;
    // line-height: 60px;
  }
  .el-footer{
    position: fixed;
    bottom: 20px;
    left: 40%;
  }
  .forg_pass_logo{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 70px;
    margin-bottom: 10px;
  }
  .forg_pass_img{
    width: 65px;
  }
  h5{
    color: #666;
    margin-bottom: 40px;
  }
  h4{
    border-bottom: solid 1px #666;
    width: 70%;
    padding-bottom: 30px;
  }
  .el-main{
    display: flex;
    justify-content: center;
  }
  .input_item{
    display: flex;
    margin: 20px 0px;
    font-size: 14px;
    color: #606266;
    span{
      width: 30%;
      text-align: right;
      padding-right: 8px;
      line-height: 40px;
    }
    .input_item_val{
      display: flex;
      width: 100%;
    }
    .phone_code{
      cursor: pointer;
      display: inline-block;
      width: 200px;
      margin-left: 30px;
      text-align: center;
      line-height: 40px;
      border: 1px solid #dcdfe6;
      border-radius: 6px;
    }
  }
  .button_item{
    display: flex;
    justify-content: space-around;
    margin: 60px 0px;
  }
  .button_style{
    width: 150px;
  }
  .main_content{
    width: 50%;
  }
  .footer_cont{
    font-size: 14px;
    color: rgb(190, 190, 190);
    padding: 5px 40px;
  }
  .footer_text{
    text-align: center;
    line-height: 30px;
    font-size: 0.8rem;
    color: rgb(190, 190, 190);
  }
}
</style>