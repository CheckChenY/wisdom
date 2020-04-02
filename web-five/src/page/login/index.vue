<template>
<!-- 页面 -->
  <div class="login-container pull-height" @keyup.enter.native="handleLogin">
  <!-- 左边标题 -->
   <div class="login-left-config">
       <!--logo-->
            <div class="login-logo animated fadeIn">
              <img src="../../../public/img/logo/logo1.png" alt>
            </div>
      <!--下载方法-->
      <div class="login-weaper">
        <p class="login-info-title">
          <span>{{website.info.title}}</span><br>
          {{website.info.list}}
        </p>
            
        <!--链接下载-->
        <div class="login-info">
          <!-- 下载链接 -->
                <div class="login-info-list">
                              <div class="login-info-link">
                                <i class="y-icon-android"></i>
                              </div>
                              <a href="#">扫码下载APP</a>
                </div>
                

          <!--二维码下载-->
          <img class="login-left animated fadeInLeft" src="../../../public/img/logo/ercode.png" alt>
        </div>
      </div>
    </div>
 <!-- 登录界面 -->
    <div class="login-config">
      <!-- 边框 -->
      <div class="login-border animated fadeInRight">
        <!-- logo -->
        <div class="login-config-logo">
          <img src="../../../public/img/logo/logo2.png" alt>
        </div>
        <!-- text -->
        <div class="login-text">
          <!-- 左标 -->
        
            <img class="login-text-left" src="../../../public/img/logo/left.png" alt>
        
          <h4 class="login-title">{{website.title}}</h4>
          <!-- 右标 -->
        
            <img class="login-text-right" src="../../../public/img/logo/right.png" alt>
  
        </div>
        <!-- 输入框 -->
        <div class="login-main">
          <userLogin v-if="activeName==='user'"></userLogin>
          <codeLogin v-else-if="activeName==='code'"></codeLogin>
          <thirdLogin v-else-if="activeName==='third'"></thirdLogin>
          <div>
            <span class="register_word" @click="register">没有账号？注册一个</span>
          </div>
        </div>
      </div>
      <!-- 版权 -->
      <div class="footer_text">Copyright&copy; {{year}} 郑州金特莱电子有限公司 版权所有
        <br>全国服务热线：400-876-7899
        <br>豫IPC备16003537号-3
      </div>
    </div>



  </div>
</template>
<script>
import userLogin from "./userlogin";
import codeLogin from "./codelogin";
import thirdLogin from "./thirdlogin";
import topColor from "../index/top/top-color";
import color from "@/mixins/color";
import { mapGetters } from "vuex";
import { validatenull } from '@/util/validate'
export default {
  name: "login",
  mixins: [color()],
  components: {
    topColor,
    userLogin,
    codeLogin,
    thirdLogin
  },
  data () {
    return {
      activeName: "user",
      year: new Date().getFullYear()
    };
  },
  watch: {
    $route () {
      const params = this.$route.query
      this.socialForm.state = params.state
      this.socialForm.code = params.code
      if (!validatenull(this.socialForm.state)) {
        const loading = this.$loading({
          lock: true,
          text: `${this.socialForm.state === 'WX' ? '微信' : 'QQ'}登录中,请稍后。。。`,
          spinner: 'el-icon-loading'
        })
        setTimeout(() => {
          loading.close()
        }, 2000)

      }
    }
  },
  created () { 
  },
  mounted () { },
  computed: {
    ...mapGetters(["website"])
  },
  props: [],
  methods: {
    register () {
      // debugger;
      this.$router.push({ path: "/register" });
    },
  }
};
</script>

<style lang="scss">
    // 模板
.login-container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  background: url("@/../../../../public/img/bg/login.jpg") no-repeat;
  background-size: 100% 100%;
    // 左边标题
  .login-left-config {
    margin-top: 138px;
    display: flex;
    justify-content: space-around;
  }
  // logo
  .login-logo {
    width: 150px;
    height: 60px;
    margin-right: 10px;
    margin-top: 7px;
  }

  // 下载方法
  .login-weaper {
    display: flex;
    /*决定主轴方向   交叉轴   起点在上沿*/
    flex-direction: column;
  
  }
  // h2
  .login-info-title {
    text-align: center;
    color: rgb(255, 255, 255);
    font-size: 1.5rem;
    border-left: 1.2px solid rgb(255, 255, 255);
    padding-left: 20px;
    line-height: 35px;
  }
  .login-info-title>span{
    font-size: 2.0rem;
  }

  // 链接下载
  .login-info {
    display: -webkit-flex;
    display: flex;
    justify-content: center;
  }
  //下载链接
  .login-info-list{
  background: rgb(255, 255, 255);
    height: 45px;
    line-height: 45px;
    border-radius: 30px;
    margin-top: 30px;
    display: -webkit-flex;
  }
  // 图
  .login-info-link{
    img{
      width: 50px;
      height: 29px;
      padding: 8px 5px 14px 12px;
    }
    i{
      color: #0278be;
      padding: 0px 10px;
      font-size: 20px !important;
    }
  } 
  // 超链接
  .login-info-list>a{
  text-decoration: none;
    color: rgb(2, 120, 190);
    padding-right: 10px;
    padding-left: 3px;
    font-size: 1rem;
    line-height: 45px;
  }

  //二维码
  .login-left {
    width: 80px;
    height: 80px;
    margin: 10px 10px 0 20px;
  }
  // ....................................................................................................................................................
  // 登录界面
  .login-config{
    width: 410px;
    margin-top: 186px;
    margin-right: 200px;
    // text-align: center;
  }
  // 边框
  .login-border {
    background: rgb(255, 255, 255);
    border: 1px solid rgb(15, 102, 171);
    border-radius: 10px;
  }
  // logo
  .login-config-logo{
    margin-top: 30px;
    text-align: center;
  }
  .login-confin-logo> img{
    // padding-top:80px;
    width: 200px;
    height: 50px;
  }
  // 文本
  .login-text{
    // margin-top: 30px;
    display: -webkit-flex;
    display: flex;
    justify-content: space-between;
    color: rgb(62, 62, 62);

  }
  .login-text-left{
    padding-top: 15px;
  padding-left: 20px;
    width: 47px;
    height: 19px;
  }
  .login-title{
  // margin-bottom: 40px;
    // font-weight: 500; 
    margin:auto;
    text-align: center;
    font-size: 1.6rem;
    // 字距
    // letter-spacing: 4px;
  }
  .login-text-right{
    padding-top: 15px;
  padding-right: 20px;
    width: 47px;
    height: 19px;
  }
  // 输入框
  .login-main {
    margin:0 auto;
    width: 70%;
    box-sizing: border-box;
    .register_word {
      font-size: 14px;
      color: #409EFF;
      cursor: pointer;
    }
  }

  .login-main > p {
    color: #76838f;
  }

  // 版权
  .footer_text{
    text-align: center;
    margin-top: 60px;
    line-height: 30px;
    font-size: 0.8rem;
    color: rgb(190, 190, 190);
  }

  .login-index {
    margin-top: 20px;
    width: 180px;
    height: 48px;
    text-align: center;
    border-radius: 100px;
    background: transparent;
    color: #333;
    font-size: 16px;
    border: 1px solid rgb(152, 22, 244);
    
  }
  input,button,select,textarea,.el-button,.login-submit,.el-button--primary,.el-nutton--small{
    outline: medium;
    border: none;
  }
  .el-button,.login-submit,.el-button--primary,.el-button--small{
    border: none;
    border-radius: 30px;
  }
}


    
</style>