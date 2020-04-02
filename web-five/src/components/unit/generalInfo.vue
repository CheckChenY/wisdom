<template>
  <div class="general_info">
    <el-container>
      <el-header>单位扩展信息</el-header>
      <el-main>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">
              <span class="input_label">所属消防队(上级主管单位)</span>
              <el-input v-model="form.manageUnit" clearable placeholder="请输入所属消防队" :disabled="true"></el-input>
              <!-- <el-select v-model="form.manageUnit" clearable placeholder="请选择" :disabled="true">
                <el-option
                  v-for="item in manageOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select> -->
            </div>
            <div class="grid-content">
              <span class="xinghao input_label">是否是消防重点单位</span>
              <el-select v-model="isKeyPointDic[form.keyPoint]" clearable placeholder="请选择" @change="changeKeyPoint">
                <el-option
                  v-for="item in isKeyPoint"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <!-- <el-radio-group v-model="form.keyPoint">
                <el-radio :label="'1'">是</el-radio>
                <el-radio :label="'0'">否</el-radio>
              </el-radio-group> -->
            </div>
            <div class="grid-content">
              <span class="input_label">单位职工人数</span>
              <el-input v-model="form.staffNumber"
                        placeholder="请输入单位职工人数"
                        clearable></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <span class="xinghao input_label">值班电话</span>
              <el-input v-model="form.phone"
                        placeholder="请输入值班电话"
                        clearable></el-input>
            </div>
            <div class="grid-content">
              <span class="input_label">单位总建筑面积</span>
              <el-input v-model="form.structureArea"
                        placeholder="请输入面积。单位: ㎡"
                        clearable></el-input>
            </div>
            <div class="grid-content">
              <span class="input_label">单位总占地面积</span>
              <el-input v-model="form.coveredArea"
                        placeholder="请输入面积。单位: ㎡"
                        clearable></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">
              <span class="input_label">单位简介</span>
              <el-input v-model="form.unitIntroduction"
                        type="textarea"
                        :rows="3"
                        placeholder="请输入单位简介"
                        clearable></el-input>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-container>
      <el-header>单位安全责任人</el-header>
      <el-main>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">
              <span class="xinghao input_label">单位安全责任人姓名</span>
              <el-input v-model="form.safetyManager"
                        placeholder="请输入单位安全责任人姓名"
                        clearable></el-input>
            </div>
            <div class="grid-content">
              <span class="xinghao input_label">联系方式</span>
              <el-input v-model="form.safetyPhone"
                        placeholder="请输入手机号"
                        maxlength="11"
                        clearable></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <span class="input_label">身份证号</span>
              <el-input v-model="form.idNumber"
                        placeholder="请输入身份证号"
                        clearable></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">
              <span class="input_label">身份证正面</span>
              <el-upload
                class="avatar-uploader"
                ref="upload1"
                action=""
                :limit="1"
                :multiple="true"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="handlePositiveChangeOne">
                <img v-if="form.idPhoto1" :src="form.idPhoto1" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div slot="tip">格式要求：</div>
                <div slot="tip">1.身份证原件照，复印件不可用。</div>
                <div slot="tip">2.姓名、住址、身份证号、人像照片等信息清晰可见。</div>
                <div slot="tip">3.要求.JPG、.JPEG或PNG格式。</div>
              </el-upload>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <span class="input_label">身份证反面</span>
              <el-upload
                class="avatar-uploader"
                ref="upload2"
                action=""
                :limit="1"
                :multiple="true"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="handleNegativeChangeOne">
                <img v-if="form.idPhoto2" :src="form.idPhoto2" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div slot="tip">格式要求：</div>
                <div slot="tip">1.身份证原件照，复印件不可用。</div>
                <div slot="tip">2.姓名、住址、身份证号、人像照片等信息清晰可见。</div>
                <div slot="tip">3.要求.JPG、.JPEG或PNG格式。</div>
              </el-upload>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-container>
      <el-header>消防许可</el-header>
      <el-main>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">
              <span class="input_label">资质类型</span>
              <el-select v-model="form.qualificationType" clearable placeholder="请选择">
                <el-option
                  v-for="item in qualificationOptions1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="grid-content">
              <span class="input_label">证书编号</span>
              <el-input v-model="form.certificateNumber"
                        placeholder="请输入证书编号"
                        clearable></el-input>
            </div>
            <div class="grid-content">
              <span class="input_label">资质有效期</span>
              <el-date-picker
                v-model="qualificationDate"
                type="daterange"
                clearable
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <span class="input_label">资质等级</span>
              <el-select v-model="form.qualificationLevel" clearable placeholder="请选择">
                <el-option
                  v-for="item in qualificationOptions2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="grid-content">
              <span class="input_label">发证机关</span>
              <el-input v-model="form.certificationAuthority"
                        placeholder="请输入发证机关"
                        clearable></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">
              <span class="input_label">执业范围</span>
              <el-input v-model="form.practiceArea"
                        type="textarea"
                        :rows="3"
                        placeholder="请输入执业范围"
                        clearable></el-input>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-row class="button_row">
      <el-col class="button_col">
        <el-button type="primary" icon="el-icon-check" @click="saveInfo">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getGeneralObj, putGeneralObj,getOrgById } from '@/api/unit/baseinfo'
import { getDict } from '@/api/unit/dict'
import { mapGetters } from "vuex";
export default {
  name: "GeneralInfo",
  data() {
    return {
      form: {
        id: '',
        orgId: '',
        manageUnit: '',
        phone: '',
        keyPoint: '',
        structureArea: '',
        staffNumber: '',
        coveredArea: '',
        unitIntroduction: '',
        safetyManager: '',
        idNumber: '',
        safetyPhone: '',
        idPhoto1: '',
        idPhoto2: '',
        qualificationType: '',
        qualificationLevel: '',
        certificateNumber: '',
        certificationAuthority: '',
        startDate: '',
        endDate: '',
        practiceArea: '',
      },
      manageOptions: [{
        label: '管城支队',
        value: 1
      },{
        label: '金水支队',
        value: 2
      },{
        label: '二七支队',
        value: 3
      }],
      isKeyPoint:[{
        label:'一级消防安全重点单位',
        value:'1'
      },{
        label:'二级消防安全重点单位',
        value:'2'
      },{
        label:'三级消防安全重点单位',
        value:'3'
      }],
      isKeyPointDic:{
        '1':'一级消防安全重点单位',
        '2':'二级消防安全重点单位',
        '3':'三级消防安全重点单位'
      },
      qualificationOptions1: [],
      qualificationOptions2: [],
      qualificationDate: [],
      manageUnitId:''
    };
  },
  watch: {
    qualificationDate (val) {
      this.form.startDate = val[0]
      this.form.endDate = val[1]
    }
  },
  computed: {
    ...mapGetters([
      "userInfo",
    ]),
  },
  created() {
    this.getGeneralInfo()
    this.getAptitudType()
    this.getLevelType()
    this.form.orgId = this.userInfo.orgId
  },
  mounted() {},
  methods: {
    //修改是否重点单位信息
    changeKeyPoint(a){
      this.form.keyPoint=a
    },
    // 获取综合信息详情
    getGeneralInfo () {
      let _this = this
      _this.qualificationDate=[]
      getGeneralObj().then(res => {
        console.log(res)
        if (res && res.data && res.data.data) {
          _this.form = res.data.data
          this.manageUnitId=res.data.data.manageUnit
          if(res.data.data.manageUnit){
            getOrgById(res.data.data.manageUnit).then(res=>{
              if(res && res.data && res.data.data){
                this.form.manageUnit=res.data.data.orgName
              }
            })
          }else{
            this.form.manageUnit='暂无绑定任何监管单位'
          }
          _this.qualificationDate.push(_this.form.startDate)
          _this.qualificationDate.push(_this.form.endDate)
        }
      })
    },
    // 提交信息
    saveInfo () {
      if(!this.form.safetyManager){
        this.$message({
          type:'error',
          message:'请填写单位安全责任人姓名'
        })
      }else if(!this.form.safetyPhone){
        this.$message({
          type:'error',
          message:'请填写联系方式'
        })
      }else if(!this.form.phone){
        this.$message({
          type:'error',
          message:'请填写值班电话'
        })
      }else if(!this.form.keyPoint){
        this.$message({
          type:'error',
          message:'请选择消防重点单位'
        })
      }else{
        this.form.manageUnit=this.manageUnitId
        putGeneralObj(this.form).then(res => {
          if(!parseInt(res.data.code)){
            this.$message({
              type:'success',
              message:"保存成功"
            })
          }else{
            this.$message({
              type:'error',
              message:"保存失败"
            })
          }
          this.getGeneralInfo()
        })
      }
    },
    // 图片数据转换
    imgDataTrans (file) {
      return new Promise((resolve, reject) => {
        const imgType = 'image/jpeg;image/png;image/jpg';
        const isTypeOk = imgType.indexOf(file.raw.type);
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (isTypeOk == -1) {
          this.$message.error('上传图片要求JPG、JPEG或PNG格式!');
          return
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 1MB!');
          return
        }
        this.getBase64(file.raw).then(response => {
          resolve(response)
        }, error => {
          reject(error)
        })
      })
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
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
    // 责任人身份证正面
    handlePositiveChangeOne (file) {
      this.$refs.upload1.clearFiles();
      this.imgDataTrans(file).then(res => {
        this.form.idPhoto1 = res
      }, error => {
        console.log(error)
      })
    },
    // 责任人身份证反面
    handleNegativeChangeOne (file) {
      this.$refs.upload2.clearFiles();
      this.imgDataTrans(file).then(res => {
        this.form.idPhoto2 = res
      }, error => {
        console.log(error)
      })
    },
    // 获取资质类型
    getAptitudType () {
      getDict('aptitud_type').then(res => {
        if (res && res.data) {
          this.qualificationOptions1 = res.data.data
        }
      })
    },
    // 获取资质等级
    getLevelType () {
      getDict('level_type').then(res => {
        if (res && res.data) {
          this.qualificationOptions2 = res.data.data
        }
      })
    },
  }
};
</script>
<style lang="scss">
.general_info{
  overflow-y: scroll;
  height: 700px;
  &::-webkit-scrollbar{
    display: none;
  }
  .el-header {
    color: #333;
    text-align: left;
    font-weight: 900;
    line-height: 60px;
  }
  .el-main{
    border-bottom: 1px solid #eee;
  }
  .grid-content{
    display: flex;
    margin-bottom: 20px;
    .input_label{
      font-size: 14px;
      color: #606266;
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
    .el-select, .el-radio-group, .avatar-uploader{
      position: relative;
      font-size: 14px;
      display: inline-block;
      width: 100%;
    }
    .el-date-editor{
      position: relative;
      font-size: 14px;
      width: 100%;
    }
    .el-radio-group{
      line-height: 42px;
    }
  }
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
  .button_col{
    text-align: center;
    margin-top: 20px;
  }
}
</style>
