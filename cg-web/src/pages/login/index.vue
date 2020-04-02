<template>
    <a-layout>
        <a-layout-header style="background:#ffffff;box-shadow: 0 2px 4px 0 rgba(0,0,0,.05);">
            <a-row>
                <a-col :span="12">
                    <img src="../../assets/logo/logo2.png" alt> 
                    <span style="color:#1890ff;font-size:18px;line-height:64px">
                        金特莱智慧城市消防管理系统  
                    </span> 
                </a-col>
                <a-col :span="12" style="text-align: right;">
                    <span style="font-weight:900">
                        扫码下载APP 
                    </span> 
                    <img :src="srcImg" style="width:60px;height:60px" alt> 
                </a-col>
            </a-row>
        </a-layout-header>
        <a-layout-content>
    <div class="login-container pull-height" ref="loginCont" @keyup.enter.native="handleLogin">
        <div class="login-config">
            <!-- 登录界面 -->
            <!-- 边框 -->
            <div class="login-border animated fadeInLeft">
                <!-- logo -->
                <div class="login-config-logo">
                    <img src="../../assets/logo/logo2.png" alt>
                </div>
                <!-- text -->
                <div class="login-text">
                <!-- 左标 -->
                
                    <img class="login-text-left" src="../../assets/logo/left.png" alt>
                <div>
                    <h4 class="login-title">金特莱云平台</h4>
                    <h4 class="login-title">智慧消防云系统</h4>
                </div>
                <!-- 右标 -->
                
                    <img class="login-text-right" src="../../assets/logo/right.png" alt>
        
                </div>
                <!-- 输入框 -->
                <div class="login-main">
                <!-- <userLogin v-if="activeName==='user'"></userLogin>
                <codeLogin v-else-if="activeName==='code'"></codeLogin>
                <thirdLogin v-else-if="activeName==='third'"></thirdLogin> -->
                <a-form
                    style="margin-top:30px;"
                    id="components-form-demo-normal-login"
                    :form="form"
                    class="login-form"
                    @submit="handleSubmit"
                >
                    <a-form-item>
                        <a-input
                            v-decorator="[
                                'username',
                                { rules: [{ required: true, message: '请输入手机号!' }] }
                            ]"
                            maxLength="11"
                            placeholder="请输入手机号"
                        >
                            <a-icon
                            slot="prefix"
                            type="user"
                            style="color: rgba(0,0,0,.25)"
                            />
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-input
                            v-decorator="[
                                'password',
                                { rules: [{ required: true, message: '请输入密码!' }] }
                            ]"
                            type="password"
                            placeholder="请输入密码"
                        >
                            <a-icon
                            slot="prefix"
                            type="lock"
                            style="color: rgba(0,0,0,.25)"
                            />
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-input
                            v-decorator="[
                                'code',
                                { rules: [{ required: true, message: '请输入验证码!' }] }
                            ]"
                            type="user"
                            placeholder="请输入验证码"
                            @change="onCodeChange"
                            >
                            <a-icon
                                slot="prefix"
                                type="lock"
                                style="color: rgba(0,0,0,.25)"
                                />
                            <img :src="code.src"
                                class="login-code-img"
                                slot="addonAfter"
                                @click="refreshCode"/>
                        </a-input>
                    </a-form-item>
                    <div style="display: flex;justify-content:space-between;">
                        <a-checkbox
                            v-model="remember"
                            @change="onChange"
                        >
                            记住账号
                        </a-checkbox>
                        <router-link
                            class="login-form-forgot"
                            to="/forgetPass"
                            >
                            忘记密码？
                        </router-link>
                    </div>
                    <a-form-item>
                        <a-button
                            type="primary"
                            html-type="submit"
                            class="login-form-button"
                        >
                            登 录
                        </a-button>
                    </a-form-item>
                </a-form>
                <div style="display: flex;">
                    <span class="register_word" @click="register">没有账号？注册一个</span>
                </div>
            </div>
        </div>
        <!-- 版权 -->
        <div class="footer_text">Copyright&copy; {{2019}} 郑州金特莱电子有限公司 版权所有
            <br>全国服务热线：400-876-7899
            <br>豫IPC备16003537号-3
        </div>
        </div>
        
        <!-- 左边标题 -->
        <div class="login-left-config">
                <!--logo-->
            <!-- <div class="login-logo animated fadeIn">
                <img src="../../assets/logo/logo1.png" alt>
            </div> -->
            <!--下载方法-->
            <div class="login-weaper">
                <!-- <p class="login-info-title">
                <span>物联网 • 大数据</span><br>
                金特莱智慧城市消防管理系统
                </p> -->
                    
                <!--链接下载-->
                <div class="login-info">
                <!-- 下载链接 -->
                        <!-- <div class="login-info-list">
                                    <div class="login-info-link">
                                        <i class="y-icon-android"></i>
                                    </div>
                                    <a href="#">扫码下载APP</a>
                        </div> -->
                        
        
                <!--二维码下载-->
                    <!-- <img class="login-left animated fadeInLeft" src="../../assets/logo/ercode.png" alt> -->
                </div>
            </div>
        </div>
    </div>
    </a-layout-content>
    </a-layout>
</template>

<script>
import { randomLenNum } from "@/util/util";
import { debuglog } from 'util';
import { findByUserId } from '@/api/role'
import { findByOrgId } from '@/api/platform/platform'
import { isvalidatemobile } from '@/util/validate'
import { setStore, getStore } from '@/util/store'
export default {
    name:'login',
    data () {
        return{
            code: {
                src: "",
                value: "",
                len: 4,
            },
            redomStr:'',
            form: this.$form.createForm(this),
            remember: false,
            srcImg:require('../../assets/logo/ercode.png')
        }
    },
    created(){
        this.refreshCode()
        this.$store.dispatch('FedLogOut')
    },
    mounted() {　　
        findByOrgId({orgId:"1000000000000001"}).then(res => {
            console.log(res)
            if (res && res.data && res.data.success) {
                let imgString = res.data.value.backgroundImg?(this.$imgUrl + res.data.value.backgroundImg):require("../../assets/bg/img.png") 
                this.$refs.loginCont.style.background = 'url(' + imgString + ') no-repeat' //新增属性
                this.$refs.loginCont.style.backgroundSize = '100% 100%' //新增属性
            }else{
                let imgString = require("../../assets/bg/img.png") 
                this.$refs.loginCont.style.background = 'url(' + imgString + ') no-repeat' //新增属性
                this.$refs.loginCont.style.backgroundSize = '100% 100%' //新增属性
            }
        })
        let loginObj = getStore({ name: 'loginObj'})
        if (loginObj && loginObj.username) {
            this.remember = true
            this.form.setFieldsValue({
                username: loginObj.username,
                password: loginObj.password
            })
        } else {
            this.remember = false
        }
    },
    methods:{
        refreshCode () {
            this.redomStr = randomLenNum(this.code.len, true);
            this.code.src = `/auth/code?randomStr=${this.redomStr}`
        },
        handleSubmit(e){
            e.preventDefault();
            // this.$router.push('/workbench')
            // this.$router.push('/system')
            this.form.validateFields((err, values) => {
                if (!err) {
                    values.randomStr=this.redomStr
                    values.grant_type = 'password'
                    values.scope = 'read write'
                    values.loginType = 1
                    this.$store.dispatch("LoginByUsername", values).then((res) => {
                        console.log(res)
                        if(res=='loginSuccess'){
                            this.getMenuType()
                        }
                    },(error) => {
                        console.log(error.response.data)
                        if(error.response.data.message){
                            this.$message.error(error.response.data.message) // 验证码错误时，提示信息在message中
                        }else{
                            this.$message.error(error.response.data.error_description)
                        }
                        this.refreshCode()
                    })
                }
            });
        },
        getMenuType(){
            let noindex = true
            findByUserId({sysCodes:"100,102"}).then(res=>{
                if(res && res.data && res.data.success && res.data.value.length){
                    res.data.value.forEach(s=>{
                        if(s.menuName=='首页'){
                            noindex = false
                            if(s.children.length==1){
                                this.$router.push(s.children[0].menuPath)
                            }else{
                                this.$router.push('/unitmanage')
                            }
                        }
                    })
                    if (noindex) {
                        this.$router.push(res.data.value[0].children[0].menuPath)
                    }
                }
            })
        },
        register () {
            this.$router.push({ path: "/register" });
        },
        onChange (e) {
            if (e.target.checked) {
                let obj = {
                    username: this.form.getFieldValue("username"),
                    password: this.form.getFieldValue("password"),
                }
                setStore({
                    name: 'loginObj',
                    content: obj,
                })
            } else {
                setStore({
                    name: 'loginObj',
                    content: {},
                })
            }
        },
        onCodeChange(value) {
            let res = value.target.value.replace(/[^a-zA-Z0-9]/ig, '')
            this.$nextTick(() => {
                // 设置初始值
                this.form.setFieldsValue({
                    code: res,
                })
            })
            let code = this.form.getFieldValue("code")
        }
    }
}
</script>
<style>
.ant-form-explain{
    display:flex;
}
.login-form-button{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 30px !important;
    outline: medium !important;
    border: none !important;
    font-size: 1.2rem !important;
    margin-top:30px;
}
.login-container {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    /* background: url("@/../../../assets/bg/img.png") no-repeat; */
    background-size: 100% 100%;
    position: fixed;
}
.login-left-config {
    margin-top: 100px;
    display: flex;
    justify-content: space-around;
}
.login-logo {
    width: 150px;
    height: 60px;
    margin-right: 10px;
    margin-top: 7px;
}
.login-weaper {
    display: flex;
    /*决定主轴方向   交叉轴   起点在上沿*/
    flex-direction: column;
}
.login-info-title {
    text-align: center;
    color: rgb(255, 255, 255);
    font-size: 1.5rem;
    border-left: 1.2px solid rgb(255, 255, 255);
    padding-left: 20px;
    line-height: 35px;
}
.login-info-title span{
    font-size: 2.0rem;
}

.login-info {
    display: -webkit-flex;
    display: flex;
    justify-content: center;
}
.login-info-list{
    background: rgb(255, 255, 255);
    height: 45px;
    line-height: 45px;
    border-radius: 30px;
    margin-top: 30px;
    display: -webkit-flex;
}
.login-info-link img{
    width: 50px;
    height: 29px;
    padding: 8px 5px 14px 12px;
}
.login-info-link i{
    color: #0278be;
    padding: 0px 10px;
    font-size: 20px !important;
}
.login-info-list a{
    text-decoration: none;
    color: rgb(2, 120, 190);
    padding-right: 10px;
    padding-left: 3px;
    font-size: 1rem;
    line-height: 45px;
}
.login-left {
    width: 80px;
    height: 80px;
    margin: 10px 10px 0 20px;
}
.login-config{
    width: 410px;
    margin-top: 100px;
    margin-right: 200px;
    text-align: center;
}
.login-border {
    background: rgb(255, 255, 255);
    border: 1px solid rgb(15, 102, 171);
    border-radius: 10px;
}
.login-config-logo{
    margin-top: 30px;
    text-align: center;
}
.login-confin-logo img{
    padding-top:80px;
    width: 200px;
    height: 50px;
}
.login-text{
    margin-top: 30px;
    display: -webkit-flex;
    display: flex;
    justify-content: space-between;
    color: rgb(62, 62, 62);
}
.login-text-left{
    margin-top: 10px;
    padding-left: 20px;
    width: 65px;
    height: 19px;
}
.login-title{
    margin-bottom: 40px;
    font-weight: 500; 
    margin:auto;
    text-align: center;
    font-size: 1.6rem;
    letter-spacing: 4px;
}
.login-text-right{
    margin-top: 10px;
    padding-right: 20px;
    width: 65px;
    height: 19px;
}
.login-main {
    margin:0 auto;
    width: 70%;
    box-sizing: border-box;
}
.register_word {
    font-size: 14px;
    color: #409EFF;
    cursor: pointer;
}
.login-main p {
    color: #76838f;
}

.footer_text{
    text-align: center;
    margin-top: 60px;
    line-height: 30px;
    font-size: 0.8rem;
    color: rgb(190, 190, 190);
}

input,button{
    outline: medium;
    border: none;
}
.login-code-img {
    cursor: pointer;
    width: '100%';
    height: 30px;
    margin-right:-11px;
    margin-left:-12px;
}
</style>