<template>
  
</template>
<script>
import { addObj, getObj } from '@/api/unit/building'
import { getDict } from '@/api/unit/dict'
// import { mapGetters } from "vuex" 
export default {
  name: "AddBuilding",
  props: {
    handleType: {
      type: String,
      required: true
    },
    buildId: {
      type: Number,
    }
  },
  data() {
    return {
      form: {
        // id: '',
        // orgId: '', // 所属组织机构
        buildingCode: '', // 建筑编码
        position: '', // 地理位置
        usageNature: '', // 使用性质
        structure: '', // 建筑结构类型
        areaCovered: '', // 占地面积
        height: '', // 建筑高度
        floor: '', // 建筑层数
        owner: '', // 产权人
        ownerId: '', // 产权人身份证
        ownerPhone: '', // 产权人电话
        ownerPhoto: '', // 产权人身份证或者图片
        admin: '', // 管理人
        adminId: '', // 管理人身份证号
        adminPhone: '', // 管理人联系电话
        adminPhoto: '', // 管理人照片
        controlRoom: '', // 消控室位置
        hydrants: '', // 消火栓数量
        smokeSensation: '', // 烟感报警器数量
        fireExtinguisher: '', // 灭火器数量 
        emergencyLight: '', // 应急照明灯具数量
        evacuationIndicate: '', // 疏散指示标记数量
        elevator: '', // 消防电梯数量
        exitMount: '', // 安全出口数量
        stairs: '', // 疏散楼梯数量
        stairsForm: '', // 疏散楼梯形式
        airBlower: '', // 送风风机数量
        exhaustFan: '', // 排风风机数量
      },
      usageNatureOptions: [], // 使用性质list
      structureOptions: [], // 建筑结构类型list
      stairsFormOptions: [], // 疏散楼梯形式list
    };
  },
  watch: {
  },
  created() {
    this.getStairsType()
    this.getStructureType()
    this.getBuildingType()
    if (this.handleType == 'update') {
      this.getInfo()
    }
  },
  mounted() {},
  methods: {
    // 获取建筑信息详情
    getInfo () {
      getObj(this.buildId).then(res => {
        if (res && res.data && res.data.data) {
          this.form = res.data.data
        }
      })
    },
    // 关闭添加页面
    close () {
      this.$emit('addClose')
    },
    // 校验数据
    checkData () {
      if (!this.form.buildingCode) {
        this.$message.error('请填写建筑编码');
        return
      }
      //  else if (!this.form.position) {
      //   this.$message.error('请选择地理位置');
      //   return
      // }
       else if (!this.form.usageNature) {
        this.$message.error('请选择使用性质');
        return
      } else if (!this.form.structure) {
        this.$message.error('请选择建筑结构类型');
        return
      } else if (!this.form.areaCovered) {
        this.$message.error('请填写占地面积');
        return
      } else if (!this.form.height) {
        this.$message.error('请填写建筑高度');
        return
      } else if (!this.form.floor) {
        this.$message.error('请填写建筑层数');
        return
      } else if (!this.form.owner) {
        this.$message.error('请填写产权人');
        return
      } else if (!this.form.admin) {
        this.$message.error('请填写管理人');
        return
      }
      addObj(this.form).then(res => {
        if (res && res.data && res.data.code != 1) {
          this.$message({
            type:'success',
            message:'保存成功'
          })
          this.close()
        }
      })
    },
    // 提交信息
    saveInfo () {
      this.checkData()
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
    // 产权人照片 
    handleOwnerPhoto (file) {
      this.$refs.ownerPhoto.clearFiles();
      this.imgDataTrans(file).then(res => {
        this.form.ownerPhoto = res
      }, error => {
        console.log(error)
      })
    },
    // 管理人照片
    handleAdminPhoto (file) {
      this.$refs.adminPhoto.clearFiles();
      this.imgDataTrans(file).then(res => {
        this.form.adminPhoto = res
      }, error => {
        console.log(error)
      })
    },
    // 疏散楼梯形式
    getStairsType () {
      getDict('stairs_type').then(res => {
        if (res && res.data) {
          this.stairsFormOptions = res.data.data
        }
      })
    },
    // 建筑结构类型
    getStructureType () {
      getDict('structure_type').then(res => {
        if (res && res.data) {
          this.structureOptions = res.data.data
        }
      })
    },
    // 使用性质
    getBuildingType () {
      getDict('building_type').then(res => {
        if (res && res.data) {
          this.usageNatureOptions = res.data.data
        }
      })
    },
  }
};
</script>
<style lang="scss">
.add_building{
  overflow-y: scroll;
  height: 700px;
  &::-webkit-scrollbar{
    display: none;
  }
  .close_add{
    border: solid 1px #aaa;
    height: 20px;
    line-height: 20px;
    width: 20px;
    text-align: center;
    border-radius: 50%;
    margin-left: 20px;
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
    .el-date-editor, .el-cascader{
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
.position_icon{
  font-size: 20px;
}
</style>
