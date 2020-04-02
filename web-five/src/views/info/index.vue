<!--
  -    Copyright (c) 2018-2025, lengleng All rights reserved.
  -
  - Redistribution and use in source and binary forms, with or without
  - modification, are permitted provided that the following conditions are met:
  -
  - Redistributions of source code must retain the above copyright notice,
  - this list of conditions and the following disclaimer.
  - Redistributions in binary form must reproduce the above copyright
  - notice, this list of conditions and the following disclaimer in the
  - documentation and/or other materials provided with the distribution.
  - Neither the name of the pig4cloud.com developer nor the names of its
  - contributors may be used to endorse or promote products derived from
  - this software without specific prior written permission.
  - Author: lengleng (wangiegie@gmail.com)
  -->

<template>
  <div class="app-container calendar-list-container user_info">
    <basic-container>
      <avue-tabs :option="option" @change="handleTabChange"></avue-tabs>
      <span v-if="type.prop==='tab1'">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form :model="ruleForm1"
                      :rules="rules2"
                      ref="ruleForm1"
                      label-width="100px"
                      class="demo-ruleForm">
                <el-form-item label="用户名"
                              prop="userName">
                  <el-input type="text"
                            v-model="ruleForm1.userName"
                            disabled></el-input>
                </el-form-item>
                <el-form-item label="真实姓名"
                              prop="realName">
                  <el-input type="text"
                            v-model="ruleForm1.realName"
                            disabled></el-input>
                </el-form-item>
                <el-form-item label="职务"
                              prop="post">
                  <el-input type="text"
                            v-model="ruleForm1.post"
                            disabled></el-input>
                </el-form-item>
                <el-form-item label="性别"
                              prop="gender">
                  <el-radio v-model="ruleForm1.gender" label="0">男</el-radio>
                  <el-radio v-model="ruleForm1.gender" label="1">女</el-radio>
                </el-form-item>
                <el-form-item label="头像"
                              prop="avatar">
                  <el-upload
                    class="avatar-uploader"
                    ref="upload"
                    action=""
                    :limit="1"
                    :multiple="true"
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="handleChange">
                    <img v-if="ruleForm1.avatar" :src="ruleForm1.avatar" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <!-- <el-form-item label="社交登录"
                              prop="social">
                  <a href="#"
                    style="color: blue"
                    @click="handleClick('wechat')">绑定微信</a>
                </el-form-item> -->
                <el-form-item>
                  <el-button type="primary"
                            @click="submitForm('ruleForm1')">提交
                  </el-button>
                  <!-- <el-button @click="resetForm('ruleForm1')">重置</el-button> -->
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </span>
      <span v-else-if="type.prop==='tab2'">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form :model="ruleForm2"
                      :rules="rules2"
                      ref="ruleForm2"
                      label-width="100px"
                      class="demo-ruleForm">
                <el-form-item label="原密码"
                              prop="password">
                  <el-input type="password"
                            v-model="ruleForm2.password"
                            auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码"
                              prop="newpassword1">
                  <el-input type="password"
                            v-model="ruleForm2.newpassword1"
                            auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码"
                              prop="newpassword2">
                  <el-input type="password"
                            v-model="ruleForm2.newpassword2"
                            auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary"
                            @click="submitPassForm('ruleForm2')">提交
                  </el-button>
                  <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </span>
      
    </basic-container>
  </div>
</template>


<script>
  import {openWindow} from '@/util/util'
  import {getToken} from '@/util/auth'
  import {getAdminInfo,updatePassword, editAdminInfo} from "@/api/unit/admin";

  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (this.ruleForm2.password !== '') {
          if (value === '') {
            callback(new Error('请再次输入密码'))
          } else if (value !== this.ruleForm2.newpassword1) {
            callback(new Error('两次输入密码不一致!'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      return {
        fileList: [],
        show: false,
        headers: {
          Authorization: 'Bearer ' + getToken()
        },
        ruleForm1: {
          userName: '',
          realName: '',
          avatar: '',
          gender: '',
          post: '',
        },
        ruleForm2: {
          password: '',
          newpassword1: '',
          newpassword2: '',
        },
        rules2: {
          password: [{required: true, min: 6, message: '原密码不能为空且不少于6位', trigger: 'change'}],
          newpassword1: [{required: true, min: 6, message: '新密码不能为空且不少于6位', trigger: 'change'}],
          newpassword2: [{required: true, validator: validatePass, trigger: 'blur'}]
        },
        type: {},
        option: {
          column: [{
            // icon:'el-icon-info',
            label: '信息管理',
            prop: 'tab1',
          }, {
            // icon:'el-icon-warning',
            label: '密码管理',
            prop: 'tab2',
          }]
        }
      }
    },
    created() {
      this.getAdminInfo()
      this.type = this.option.column[0]
    },
    computed : {
    },
    methods: {
      // 获取用户信息
      getAdminInfo () {
        getAdminInfo().then(response => {
          if (response.data.data) {
            this.ruleForm1.userName = response.data.data.userName
            this.ruleForm1.realName = response.data.data.realName
            this.ruleForm1.avatar = response.data.data.avatar
            this.ruleForm1.gender = response.data.data.gender
            this.ruleForm1.post = response.data.data.post
          }
        })
      },
      submitForm(formName) {
        delete this.ruleForm1["userName"]
        this.$refs[formName].validate(valid => {
          if (valid) {
            editAdminInfo(this.ruleForm1).then(response => {
              if (response.data.code == 0) {
                this.$message({
                  type:'success',
                  message:'修改成功'
                })
                this.getAdminInfo()
              } else {
                this.$message({
                  type:'error',
                  message:response.data.msg
                })
              }
            }).catch(() => {
              this.$message({
                type:'error',
                message:'修改失败'
              })
            })
          } else {
            return false
          }
        })
      },
      submitPassForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            var obj={
              originaPassword:this.ruleForm2.password,
              password:this.ruleForm2.newpassword2
            }
            updatePassword(obj).then(response => {
              if (response.data.code == 0) {
                this.$message({
                  type:'success',
                  message:'修改成功'
                })
                // 修改密码之后强制重新登录
                if (this.ruleForm2.newpassword1 !== '') {
                  this.$store.dispatch('LogOut').then(() => {
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                  })
                } else {
                  this.$router.push({path: '/'})
                }
              } else {
                this.$message({
                  type:'error',
                  message:response.data.data
                })
              }
            }).catch(() => {
              this.$message({
                type:'error',
                message:'修改失败',
              })
            })
          } else {
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleClick(thirdpart) {
        let appid, client_id, redirect_uri, url
        redirect_uri = encodeURIComponent(window.location.origin + '/#/authredirect?type=BIND')
        if (thirdpart === 'wechat') {
          appid = 'wxd1678d3f83b1d83a'
          url = 'https://open.weixin.qq.com/connect/qrconnect?appid=' + appid + '&redirect_uri=' + redirect_uri + '&state=' + appid + '&response_type=code&scope=snsapi_login#wechat_redirect'
        } else if (thirdpart === 'tencent') {
          client_id = '101322838'
          url = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&state=' + appid + '&client_id=' + client_id + '&redirect_uri=' + redirect_uri
        }
        openWindow(url, thirdpart, 540, 540)
      },
      handleChange(file) {
        const imgType = 'image/jpeg;image/png;image/jpg';
        const isTypeOk = imgType.indexOf(file.raw.type);
        const isLt2M = file.size / 1024 / 1024 < 1;
        this.$refs.upload.clearFiles();
        if (isTypeOk == -1) {
          this.$message.error('上传头像图片要求JPG、JPEG或PNG格式!');
          return
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
          return
        }
        this.getBase64(file.raw).then(response => {
          this.ruleForm1.avatar = response
        }, error => {
          console.log(error)
        })
      },
      getBase64(file) {
        return new Promise(function(resolve, reject) {
          let reader = new FileReader();
          let imgResult = "";
          reader.readAsDataURL(file);
          reader.onload = function() {
            imgResult = reader.result;
          };
          reader.onerror = function(error) {
            reject(error);
          };
          reader.onloadend = function() {
            resolve(imgResult);
          };
        });
      },
      handleTabChange(column) {
        this.type = column
      }
    }
  }
</script>
<style lang="scss">
.user_info{
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
}

</style>
