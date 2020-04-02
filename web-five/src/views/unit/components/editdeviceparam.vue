<template>
  <el-dialog
    title="修改设备参数"
    :visible.sync="dialogVisible"
    width="60%"
    :before-close="handleClose"
    class="device_param">
    <el-container class="contain_scroll is-vertical">
      <!-- 水压 液位-->
      <el-main v-if="Dev.deviceType==17||Dev.deviceType==18">
          <el-row>
            <el-col>
              <div class="grid-content">
                <span class="input_label">{{Dev.deviceType==17?'水压':'液位'}}报警上限阈值：</span>
                <div class="avatar-uploader">
                  <span class="input_content" v-if="inputShow">{{num1}} {{Dev.deviceType==17?'Kpa':'mm'}}</span>
                  <span class="input_content" v-if="!inputShow">
                    <el-input
                      style="width:70%" 
                      v-model="num1" 
                      :disabled="percentShow"
                      :readonly="buttonText == '修改'"
                      ></el-input>
                    <span class="input_label">{{Dev.deviceType==17?'Kpa':'mm'}}</span>
                  </span>
                </div>
              </div>
              <div class="grid-content">
                <span class="input_label">{{Dev.deviceType==17?'水压':'液位'}}报警下限阈值：</span>
                <div class="avatar-uploader">
                  <span class="input_content" v-if="inputShow">{{num2}} {{Dev.deviceType==17?'Kpa':'mm'}}</span>
                  <span class="input_content" v-if="!inputShow">
                    <el-input
                      style="width:70%" 
                      v-model="num2" 
                      :disabled="percentShow"
                      :readonly="buttonText == '修改'"></el-input>
                    <span class="input_label">{{Dev.deviceType==17?'Kpa':'mm'}}</span>
                  </span>
                </div>
              </div>
            </el-col>
          </el-row>
      </el-main>
      <!-- 智慧消防栓 -->
      <el-main v-if="Dev.deviceType==19">
          <el-row>
            <el-col>
              <div class="grid-content">
                <span class="input_label">压力报警上限阈值：</span>
                <div class="avatar-uploader">
                  <span class="input_content" v-if="inputShow">{{num1}} Kpa</span>
                  <span class="input_content" v-if="!inputShow">
                    <el-input placeholder="" style="width:70%" v-model="num1" 
                      :disabled="percentShow"
                      :readonly="buttonText == '修改'"></el-input>
                    <span class="input_label"> Kpa</span>
                  </span>
                </div>
              </div>
              <div class="grid-content">
                <span class="input_label">压力报警下限阈值：</span>
                <div class="avatar-uploader">
                  <span class="input_content" v-if="inputShow">{{num2}} Kpa</span>
                  <span class="input_content" v-if="!inputShow">
                    <el-input placeholder="" style="width:70%" v-model="num2" 
                      :disabled="percentShow"
                      :readonly="buttonText == '修改'"></el-input>
                    <span class="input_label"> Kpa</span>
                  </span>
                </div>
              </div>
            </el-col>
          </el-row>
      </el-main>
      <!-- 智慧用电电气火灾 电气火灾监控系统 -->
      <el-main v-if="Dev.deviceType==41 || Dev.deviceType==25 || Dev.deviceType==22">
          <el-row>
            <el-col>
              <div class="grid-content">
                <span class="input_label">过压阈值：</span>
                <div class="avatar-uploader">
                  <span class="input_content" v-if="inputShow">{{num1}} V</span>
                  <span class="input_content" v-if="!inputShow">
                    <el-input placeholder="可调范围（220V~280V）" 
                      style="width:70%" v-model="num1"
                      :disabled="percentShow"
                      :readonly="buttonText == '修改'"
                    ></el-input>
                    <span class="input_label"> V</span>
                  </span>
                </div>
              </div>
              <div class="grid-content">
                <span class="input_label">欠压阈值：</span>
                <div class="avatar-uploader">
                  <span class="input_content" v-if="inputShow">{{num2}} V</span>
                  <span class="input_content" v-if="!inputShow">
                    <el-input placeholder="可调范围（160V~220V）" 
                      style="width:70%" 
                      v-model="num2" 
                      :disabled="percentShow"
                      :readonly="buttonText == '修改'"></el-input>
                    <span class="input_label"> V</span>
                  </span>
                </div>
              </div>
              <div class="grid-content">
                <span class="input_label">过载阈值：</span>
                <div class="avatar-uploader">
                  <span class="input_content" v-if="inputShow">{{num3}} A</span>
                  <span class="input_content" v-if="!inputShow">
                    <el-input placeholder="可调范围（1A~5A）" 
                      style="width:70%" 
                      v-model="num3" 
                      :disabled="percentShow"
                      :readonly="buttonText == '修改'"></el-input>
                    <span class="input_label"> A</span>
                  </span>
                </div>
              </div>
              <div class="grid-content">
                <span class="input_label">漏电报警阈值：</span>
                <div class="avatar-uploader">
                  <span class="input_content" v-if="inputShow">{{num4}} mA</span>
                  <span class="input_content" v-if="!inputShow">
                    <el-input placeholder="可调范围（100mA~1000mA）" 
                      style="width:70%" 
                      v-model="num4" 
                      :disabled="percentShow"
                      :readonly="buttonText == '修改'"></el-input>
                    <span class="input_label"> mA</span>
                  </span>
                </div>
              </div>
              <div class="grid-content">
                <span class="input_label">温度报警阈值：</span>
                <div class="avatar-uploader">
                  <span class="input_content" v-if="inputShow">{{num5}} ℃</span>
                  <span class="input_content" v-if="!inputShow">
                    <el-input placeholder="可调范围（45℃~115℃）" 
                      style="width:70%" 
                      v-model="num5" 
                      :disabled="percentShow"
                      :readonly="buttonText == '修改'"></el-input>
                    <span class="input_label"> ℃</span>
                  </span>
                </div>
              </div>
            </el-col>
          </el-row>
      </el-main>
      <!-- 消防电源监控系统 -->
      <el-main v-if="Dev.deviceType==37 || Dev.deviceType==38 || Dev.deviceType==39">
          <el-row>
            <el-col>
              <div class="grid-content" v-if="num1">
                <span class="input_label">过压阈值：</span>
                <div class="avatar-uploader">
                  <span class="input_content" v-if="inputShow">{{num1}} V</span>
                  <span class="input_content" v-if="!inputShow">
                    <el-input placeholder="可调范围（220V~280V）" 
                      style="width:70%" v-model="num1"
                      :disabled="percentShow"
                      :readonly="buttonText == '修改'"
                    ></el-input>
                    <span class="input_label"> V</span>
                  </span>
                </div>
              </div>
              <div class="grid-content" v-if="num2">
                <span class="input_label">欠压阈值：</span>
                <div class="avatar-uploader">
                  <span class="input_content" v-if="inputShow">{{num2}} V</span>
                  <span class="input_content" v-if="!inputShow">
                    <el-input placeholder="可调范围（160V~220V）" 
                      style="width:70%" 
                      v-model="num2" 
                      :disabled="percentShow"
                      :readonly="buttonText == '修改'"></el-input>
                    <span class="input_label"> V</span>
                  </span>
                </div>
              </div>
              <div class="grid-content" v-if="num3">
                <span class="input_label">过载阈值：</span>
                <div class="avatar-uploader">
                  <span class="input_content" v-if="inputShow">{{num3}} A</span>
                  <span class="input_content" v-if="!inputShow">
                    <el-input placeholder="可调范围（1A~5A）" 
                      style="width:70%" 
                      v-model="num3" 
                      :disabled="percentShow"
                      :readonly="buttonText == '修改'"></el-input>
                    <span class="input_label"> A</span>
                  </span>
                </div>
              </div>
              <div class="grid-content" v-if="num6">
                <span class="input_label">过载阈值：</span>
                <div class="avatar-uploader">
                  <span class="input_content" v-if="inputShow">{{num6}} A</span>
                  <span class="input_content" v-if="!inputShow">
                    <el-input placeholder="可调范围（1A~5A）" 
                      style="width:70%" 
                      v-model="num6" 
                      :disabled="percentShow"
                      :readonly="buttonText == '修改'"></el-input>
                    <span class="input_label"> A</span>
                  </span>
                </div>
              </div>
            </el-col>
          </el-row>
      </el-main>
      <el-main v-if="percentShow">
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="16">
            <el-progress :stroke-width="15" :percentage="percent" :status="percentStatus" style="margin-top:5px;"></el-progress>
          </el-col>
          <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
      </el-main>
      <el-footer>
        <el-button @click="changeStatus" icon="el-icon-edit">{{buttonText}}</el-button>
      </el-footer>
    </el-container>
    <el-dialog
      width="30%"
      title="请输入修改验证密码"
      :visible.sync="passShow"
      append-to-body>
      <div class="pass_dialog">
        <span class="pass_label">密码：</span>
        <div class="pass_input">
          <el-input
            placeholder="请输入密码"
            v-model="password"
            type="password"
            autocomplete="off"
            clearable>
          </el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="passShow = false">取 消</el-button>
        <el-button type="primary" @click="submitPass">确 定</el-button>
      </span>
    </el-dialog>
  </el-dialog>
</template>
<script>
import {
    editparams
} from '@/api/unit/unitdevice'
import {
    operationPass,
    getPass
} from '@/api/public'
import {
    thresholdAnalisys
} from "@/util/public";
export default {
  name: 'DeviceParam',
  props: {
    //设备类型
    device:{
      type:Object,
    },
    // 图片地址
    facilityPhoto: {
      type: String,
    },
  },
  data () {
    return {
      percent: 0,
      percentShow: false,
      percentStatus: 'success',
      dialogVisible: true,
      inputShow: true,
      buttonText: '修改',
      asswordShow: false,
      password: '',
      passShow: false,
      form: {
        smokeAlarmValue: '',
        interval: ''
      },
      Dev:'',
      num1:'',
      num2:'',
      num3:'',
      num4:'',
      num5:'',
      num6:'',
      num7:'',
      num8:''
    }
  },
  watch: {
  },
  created () {
    
  },
  mounted() {
    this.Dev=this._props.device
    if (this.Dev.deviceParam) {
      console.log('this.Dev.deviceParam', this.Dev.deviceParam)
      let deviceParams = thresholdAnalisys(JSON.parse(this.Dev.deviceParam))
      console.log('deviceType', this.Dev.deviceType)
      console.log('deviceParams', deviceParams)
      if(this.Dev.deviceType==17){
        this.num1= deviceParams.type144
        this.num2= deviceParams.type146
      }
      if(this.Dev.deviceType==18){
        this.num1= deviceParams.type140
        this.num2= deviceParams.type141
      }
      if(this.Dev.deviceType==19){
        this.num1= deviceParams.type144
        this.num2= deviceParams.type146
      }
      if(this.Dev.deviceType==25 || this.Dev.deviceType==22){
        this.num1 = deviceParams.type131a
        this.num2 = deviceParams.type131b
        this.num3 = deviceParams.type132
        this.num4 = deviceParams.type129
        this.num5 = deviceParams.type130
      }
      if(this.Dev.deviceType==41){
        this.num1 = deviceParams.type131a
        this.num2 = deviceParams.type131b
        this.num3 = deviceParams.type132
        this.num4 = deviceParams.type129
        this.num5 = deviceParams.type130
      }
      if(this.Dev.deviceType==37){
        this.num1 = deviceParams.type131a
        this.num2 = deviceParams.type131b
      }
      if(this.Dev.deviceType==38){
        this.num3 = deviceParams.type132a
        this.num6 = deviceParams.type132b
      }
      if(this.Dev.deviceType==39){
        this.num1 = deviceParams.type131a
        this.num2 = deviceParams.type131b
        if (deviceParams.type132) {
          this.num3 = deviceParams.type132
        } else {
          this.num3 = deviceParams.type132a
          this.num6 = deviceParams.type132b
        }
      }
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？').then(_ => {
        // done();
        this.$emit('closeDialog')
      }).catch(_ => {});
    },
    // 提交密码
    submitPass () {
      operationPass({password: this.password, deviceTypeId: this.Dev.deviceType}).then(res => {
        console.log("提交密码", res.data)
        if (res && res.data && res.data.code == 0) {
          this.passShow = false
          this.inputShow = false
          this.buttonText = '保存'
        } else {
          this.$message.error(res.data.data);
        }
      })
    },
    // 修改设备参数
    // 温度设定值范围：45~100 °C
    // 漏电：100~1000  mA
    // 电流：0~945 A
    // 欠压：165~219  V
    // 过压：221~280 V
    changeStatus () {
      getPass(this.Dev.deviceType).then(res => {
        if (res && res.data && res.data.code == 0) {
          if (res.data.data) {
            if (this.buttonText == '修改') {
              this.passShow = true
            } else {
              // this.inputShow = true
              // this.buttonText = '修改'
              let paramsObj = {
                deviceType:this.Dev.deviceType,
                nbiotId:this.Dev.nbiotId,
                deviceId:this.Dev.deviceId,
              }
              //水压
              if(this.Dev.deviceType==17){
                paramsObj.type144 = this.num1
                paramsObj.type146 = this.num2
              }
              //液位
              if(this.Dev.deviceType==18){
                paramsObj.type140 = this.num1
                paramsObj.type141 = this.num2
              }
              if(this.Dev.deviceType==41 || this.Dev.deviceType==25 || this.Dev.deviceType==22){
                if (this.num1 < 221 || this.num1 > 280) { // 过压：221~280
                  this.$message('过压阈值必须>=221 V,<=280 V');
                  return
                } 
                if (this.num2 < 165 || this.num2 > 219) { // 欠压：165~219
                  this.$message('欠压阈值必须>=165 V,<=219 V');
                  return
                }
                if (this.num3 < 0 || this.num3 > 945) { // 电流：0~945 A
                  this.$message('电流阈值必须>=0 A,<=945 A');
                  return
                }
                if (this.num4 < 100 || this.num4 > 1000) { // 漏电：100~1000  mA
                  this.$message('漏电阈值必须>=100 mA,<=1000 mA');
                  return
                }
                if (this.num5 < 45 || this.num5 > 100) { // 温度设定值范围：45~100 °C
                  this.$message('温度阈值必须>=45 ℃,<=100 ℃');
                  return
                }
                paramsObj.type131 = this.num1+','+this.num2
                paramsObj.type132 = this.num3
                paramsObj.type129 = this.num4
                paramsObj.type130 = this.num5
              }
              if(this.Dev.deviceType==37){
                if (this.num1 < 221 || this.num1 > 280) { // 过压：221~280
                  this.$message('过压阈值必须>=221 V,<=280 V');
                  return
                } 
                if (this.num2 < 165 || this.num2 > 219) { // 欠压：165~219
                  this.$message('欠压阈值必须>=165 V,<=219 V');
                  return
                }
                paramsObj.type131 = this.num1+','+this.num2
              }
              if(this.Dev.deviceType==38){
                if (this.num3 < 0 || this.num3 > 945) { // 电流：0~945 A
                  this.$message('电流阈值必须>=0 A,<=945 A');
                  return
                }
                if (this.num6 < 0 || this.num6 > 945) { // 电流：0~945 A
                  this.$message('电流阈值必须>=0 A,<=945 A');
                  return
                }
                paramsObj.type132 = this.num3+','+this.num6
              }
              if(this.Dev.deviceType==39){
                if (this.num1 < 221 || this.num1 > 280) { // 过压：221~280
                  this.$message('过压阈值必须>=221 V,<=280 V');
                  return
                } 
                if (this.num2 < 165 || this.num2 > 219) { // 欠压：165~219
                  this.$message('欠压阈值必须>=165 V,<=219 V');
                  return
                }
                if (this.num3 < 0 || this.num3 > 945) { // 电流：0~945 A
                  this.$message('电流阈值必须>=0 A,<=945 A');
                  return
                }
                if (this.num6 && (this.num6 < 0 || this.num6 > 945)) { // 电流：0~945 A
                  this.$message('电流阈值必须>=0 A,<=945 A');
                  return
                }
                paramsObj.type131 = this.num1+','+this.num2,
                paramsObj.type132 = this.num6 ? this.num3+','+this.num6 : this.num3
              }
              if (!this.percentShow) {
                this.percentShow = true
                var timer=setInterval(()=>{
                  this.percent=this.percent+1
                  if(this.percent==95){
                    clearInterval(timer)
                  }
                },300)
                editparams(paramsObj).then(res=>{
                  console.log(res)
                  if (res && res.data && res.data.code == 0) {
                    this.$message.success(res.data.data);
                    clearInterval(timer)
                    this.percent=100
                    this.percentShow=false
                    this.$emit('closeDialog')
                  } else {
                    this.$message.error(res.data.data);
                    clearInterval(timer)
                    this.percentStatus = 'exception'
                    setTimeout(() => {
                      this.percent=0
                      this.percentShow=false
                      this.$emit('closeDialog')
                    }, 1500)
                  }
                })
              }
            }
          } else {
            this.$message('请去系统参数中设置设备参数修改密码');
          }
        }
      })
    },
  }
}
</script>
<style lang="scss">
.device_param{
  .contain_scroll {
    height: 400px;
    overflow: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .el-footer {
      text-align: center;
      line-height: 60px;
    }
    .el-button{
      color: #409eff;
    }
    .current_status{
      display: flex;
      justify-content: space-between;
      padding: 0px 20px;
      height: 60px;
      .cuttent_status_title{
        font-size: 18px;
      }
      .status_handle{
        color: #409eff;
        width: 100px;
      }
    }
    .status_steps{
      margin: 0px 100px;
      .step_style{
        height: 100px;
      }
    }
    .grid-content{
      display: flex;
      margin-bottom: 20px;
      .input_label{
        font-size: 14px;
        color: #333;
        width: 380px;
        text-align: right;
        padding-right: 10px;
        line-height: 40px;
        margin-right: 0px !important;
      }
      .input_content{
        font-size: 14px;
        color: #666;
        width: 380px;
        text-align: right;
        padding-right: 10px;
        line-height: 40px;
        margin-right: 0px !important;
      }
      .xinghao:before{
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
      }
      .avatar-uploader{
        position: relative;
        font-size: 14px;
        display: inline-block;
        width: 100%;
      }
    }
  }
}
.pass_dialog{
  display: flex;
  flex-direction: row;
  .pass_label{
    font-size: 14px;
    color: #333;
    width: 80px;
    text-align: right;
    padding-right: 10px;
    line-height: 40px;
    margin-right: 0px !important;
  }
  .pass_input{
    font-size: 14px;
    width: 68%;
  }
}
</style>
