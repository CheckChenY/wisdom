<template>
  <a-form :form="form1" @submit="onhandleSubmit" class="register_index">
    <a-row>
      <a-col :span="12" :offset="6">
        <div class="forg_pass_logo">
          <img class="forg_pass_img" src="../../assets/logo/logo1.png">
          <div style="font-size: 1.5em;">金特莱智慧消防云平台</div>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12" :offset="6">
        <h5>守护您的消防安全</h5>
        <h4>忘记密码</h4>
      </a-col>
    </a-row>
    <a-row class="item_list">
      <a-col :span="12" :offset="6">
        <a-row style="display: flex;justify-content: center;">
          <a-col :span="12">
            <a-form-item label="手机号(登录名):" style="display: flex;">
                <a-input
                v-decorator="[
                              'userName',
                              {
                                  rules: [{ required: true, message: '请输入手机号!', }],
                              },
                          ]"
                    maxLength="11"
                    placeholder="请输入手机号(登录名):"
                    type="number">
                  <template slot="prepend">+ 86</template></a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row class="item_list">
      <a-col :span="12" :offset="6">
        <a-row style="display: flex;justify-content: center;">
          <a-col :span="12">
            <a-form-item label="短信验证码:" style="display: flex;margin-top:-20px;">
                <a-input-search
                  style="width:250px;"
                  v-decorator="[
                              'code',
                              {
                                  rules: [{ required: true, message: '请输入验证码!', whitespace: true }],
                              },
                          ]"
                    placeholder="请输入验证码"
                    @search="onSearch"
                    :enterButton="countText"
                />
            </a-form-item>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row class="item_list">
      <a-col :span="12" :offset="6">
        <a-row style="display: flex;justify-content: center;">
          <a-col :span="12">
            <a-form-item label="新密码:" style="display: flex;margin-top:-20px;">
              <a-input 
              v-decorator="[
                            'newCode',
                            {
                                rules: [{ required: true, message: '6-16位密码，区分大小写!', whitespace: true }],
                            },
                        ]"
                placeholder="6-16位密码，区分大小写" 
                type="password" maxlength="16" minlength="6"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row class="item_list">
      <a-col :span="12" :offset="6">
        <a-row style="display: flex;justify-content: center;">
          <a-col :span="12">
              <a-form-item label="新密码:" style="display: flex;margin-top:-20px;">
                  <a-input 
                  v-decorator="[
                                'againCode',
                                {
                                    rules: [{ required: true, message: '确认密码!', whitespace: true }],
                                },
                            ]"
                  placeholder="确认密码" maxlength="16" 
                  type="password" minlength="6"></a-input>
              </a-form-item>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row class="item_list">
      <a-col :span="12" :offset="6">
        <a-row style="display: flex;justify-content: center;">
          <!-- <a-col :span="12">
            <a-button icon="left" @click="onhandleBack">返回</a-button>
          </a-col> -->
          <a-col>
            <a-form-item>
                <a-button type="primary" icon="check" html-type="submit">确定</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
      <div class="footer">
        <div>
          <span class="footer_cont">帮助</span>
          <span class="footer_cont">隐私</span>
          <span class="footer_cont">条款</span>
        </div>
        <div class="footer_text">
          Copyright&copy; {{2019}} 郑州金特莱电子有限公司 版权所有
        </div>
      </div>
  </a-form>
</template>

<script>
  import { checkPhone,onchangeSubmit } from "@/api/sysytem"
  import { encryption } from '@/util/util'
  export default {
    name:'forgetPass',
    data(){
      return{
          code:'',
          newCode:'',
          againCode:'',
          time:60,
          disable:false,
          countText:'获取验证码',
          form1:this.$form.createForm(this, { name: 'register' }),
      }
    },
    created(){
        
    },
    mounted(){
      
    },
    methods:{
      onSearch(value) {
        if(!this.form1.getFieldValue('userName')){
          this.$message.error('请输入手机号(登陆名)')
          return
        }
        if(this.disable){
          return false
        }
        let obj = {
          phone:this.form1.getFieldValue('userName')
        }
        checkPhone(obj).then(res=>{
          if(res && res.data && res.data.success){
            this.timer();  
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },

      // 计时器
    timer () {
      if (this.time == 0) {  
        this.disable = false
        this.countText="重新获取验证码";  
        this.time = 60;  
        return false;  
      } else {  
        this.disable = true
        this.countText="重新发送(" + this.time + ")";  
        this.time--;  
      }  
      setTimeout(() => {  
        this.timer();  
      },1000); 
    },
    onhandleBack(){
      this.$router.push({ path: "/login" });
    },
    onhandleSubmit(){
      this.form1.validateFields((err, values) => {
        if(!err){
          console.log(values)
          if(this.form1.getFieldValue('againCode')!=this.form1.getFieldValue('newCode')){
            this.$message.error('两次密码输入不一致')
            return
          }
          let obj = {
            phone:values.userName,
            seccode:values.code,
            password :values.newCode
          }
          const user = encryption({
              data: obj,
              type: 'Aes',
              key: 'jintelai12345678',
              param: ['password']
          });
          onchangeSubmit(user).then(res=>{
            console.log(res)
            if(res && res.data && res.data.success){
              this.$message.success('密码重置成功')
              this.$router.push({ path: "/login" });
            }else{
              this.$message.error(res.data.msg)
            }
          })
        }
      })
    }
    }  
  }
</script>
<style scoped>
  .footer{
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

  .item_list{
    margin:16px
  }
  .item_list_left{
    text-align: right;
    padding-right:10px;
  }
</style>