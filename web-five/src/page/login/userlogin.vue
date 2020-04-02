<template>
  <el-form class="login-form"
           v-loading="loading"
           status-icon
           :rules="loginRules"
           ref="loginForm"
           :model="loginForm"
           label-width="0">
    <el-form-item prop="username">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                v-model="loginForm.username"
                auto-complete="off"
                placeholder="请输入用户名">
        <i slot="prefix"
           class="y-icon-yonghu"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                :type="passwordType"
                v-model="loginForm.password"
                auto-complete="off"
                placeholder="请输入密码">
        <i class="el-icon-view el-input__icon"
           slot="suffix"
           @click="showPassword"></i>
        <i slot="prefix"
           class="y-icon-mima"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-row :span="24">
        <el-col :span="16">
          <el-input size="small"
                    @keyup.enter.native="handleLogin"
                    :maxlength="code.len"
                    v-model="loginForm.code"
                    auto-complete="off"
                    placeholder="请输入验证码">
            <i slot="prefix"
               class="y-icon-yanzhengma"></i>
          </el-input>
        </el-col>
        <el-col :span="8">
          <div class="login-code">
            <span class="login-code-img"
                  @click="refreshCode"
                  v-if="code.type == 'text'">{{code.value}}</span>
            <img :src="code.src"
                 class="login-code-img"
                 @click="refreshCode"
                 v-else/>
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-checkbox v-model="checked">记住账号</el-checkbox>
    <a href="javascript:void(0)" class="remember_psd" @click="forgetPassword">忘记密码 ?</a>
    <el-form-item>
      <el-button type="primary"
                 size="small"
                 @click.native.prevent="handleLogin"
                 class="login-submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// import { isvalidUsername } from "@/util/validate";
import { randomLenNum } from "@/util/util";
import { mapGetters } from "vuex";
import { setCookieData, removeCookieData, getCookieData } from '@/util/auth'

export default {
  name: "userlogin",
  data () {
    const validateUsername = (rule, value, callback) => {
      // if (!isvalidUsername(value)) {
      //   callback(new Error("请输入正确的用户名"));
      // } else {
      //   callback();
      // }
      callback();
    };
    return {
      loginForm: {
        username: getCookieData('username'),
        password: getCookieData('password'),
        code: "",
        redomStr: ""
      },
      checked: getCookieData('checked') == 'true'? true: false,
      code: {
        src: "",
        value: "",
        len: 4,
        type: "image"
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度最少为6位", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码长度为4位", trigger: "blur" },
        ]
      },
      passwordType: "password",
      isVertify: false,
      loading:false
    };
  },
  created () {
    this.refreshCode();
    
  },
  mounted () { 
  },
  computed: {
    ...mapGetters(["tagWel"])
  },
  props: [],
  methods: {
    refreshCode () {
      this.loginForm.redomStr = randomLenNum(this.code.len, true);
      this.code.type == "text"
        ? (this.code.value = randomLenNum(this.code.len))
        : (this.code.src = `${this.codeUrl}?randomStr=${this.loginForm.redomStr}`);
      this.loginForm.code = this.code.value;
    },
    showPassword () {
      this.passwordType == ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    handleLogin () {
      setCookieData('checked', this.checked)
      if (this.checked) {
        setCookieData('username', this.loginForm.username)
        setCookieData('password', this.loginForm.password)
      }
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading=true
          this.$store.dispatch("LoginByUsername", this.loginForm).then((res) => {
            if(res=='loginSuccess'){
              this.$router.push({ path: this.tagWel.value });
              setTimeout(()=>{
                this.loading=false
              },3000)
            }else{
              setTimeout(()=>{
                this.loading=false
                if(res=='loginFail'){
                  this.refreshCode()
                }
              },3000)
            }
          })
        }
      });
    },
    // 忘记密码
    forgetPassword () {
      this.$router.push({ path: "/forgetPass" });
    },
  }
};
</script>

<style lang="scss">
//  背景图标
.login-form {
  margin: 10px 0;
  i {
    color: #999;
  }
  
  // 记住密码
  .el-form-item {
    margin-top: 20px;
  }
  // 忘记密码
  .remember_psd{
    float: right;
    color: #606266;
    font-size:14px;
    line-height: 19px;
    text-decoration:none;
     margin-top: 7px;
  }

  // 输入框
  .el-input {
    input {
      height: 45px;
      text-indent: 5px;
      background: transparent;
      border: none;
      border-radius: 30px;
      color: #333;
      border: 1px solid rgb(91, 145, 192);
      line-height: 45px;
    }
    // 背景图标
    .el-input__prefix {
      i {
        padding: 2px 8px;
        font-size: 16px !important;
        
      }
    }
  }
  .el-button--small{
    padding: 0  !important;
  }
  //  登录按钮
  .login-submit {
    width: 100%;
    height: 50px;
    line-height: 50px ;
    // margin: auto;
    text-align: center;
      border-radius: 30px  !important;
    outline: medium  !important;
    border: none !important;
    font-size:1.2rem  !important;
    letter-spacing: 20px !important;
    text-indent:2rem;
  }
  // 验证码
  .login-code {
    display: flex;
    align-items:center;
    justify-content: space-between;
    margin: 0 0 0 10px;
  }
  // 验证图标
  .login-code-img {
    cursor: pointer;
    margin-top: 2px;
    width: 80px;
    height: 38px;
    background-color: #fdfdfd;
    border: 1px solid #f0f0f0;
    color: #333;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 5px;
    line-height: 38px;
    text-indent: 5px;
    text-align: center;
    margin-right:3px;
  }
  input,button,select,textarea,.el-button,.login-submit,.el-button--primary,.el-nutton--small{
    outline: medium;
    border: none;
  }
  .el-button,.login-submit,.el-button--primary,.el-button--small{
    border: none;
    border-radius: 30px;
  }
  #slider {
    // margin: 100px auto;
    // width: 300px;
    height: 45px;
    position: relative;
    border-radius: 30px;
    background-color: #eee;
    overflow: hidden;
    text-align: center;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    border: 1px solid #5b91c0;
  }

  #slider_bg {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background-color: #7AC23C;
    z-index: 1;
  }

  #label {
    width: 46px;
    position: absolute;
    left: 0;
    top: 0;
    height: 45px;
    line-height: 45px;
    background: #fff;
    z-index: 3;
    cursor: move;
    color: #5b91c0;
    font-size: 16px;
    font-weight: 900;
    border-radius: 30px;
  }

  #labelTip {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 13px;
    font-family: 'Microsoft Yahei', serif;
    color: #787878;
    line-height: 45px;
    text-align: center;
    z-index: 2;
  }
}

</style>
