<template>
  <div class="building_detail">
    <el-row>
      <el-col :span="1"><div @click="close" class="el-icon-close close_add"></div></el-col>
    </el-row>
    <el-container>
      <el-header>建筑基础信息</el-header>
      <el-main>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">
              <span class="xinghao input_label">建筑编码:</span>
              <div class="avatar-uploader">
                <span class="input_content">{{form.buildingCode}}</span>
              </div>
            </div>
            <div class="grid-content">
              <span class="xinghao input_label">建筑高度:</span>
              <div class="avatar-uploader">
                <span class="input_content">{{form.height}}</span>
              </div>
            </div>
            <div class="grid-content">
              <span class="xinghao input_label">占地面积:</span>
              <div class="avatar-uploader">
                <span class="input_content">{{form.areaCovered}}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <span class="xinghao input_label">建筑结构类型:</span>
              <div class="avatar-uploader">
                <span class="input_content">{{form.structure}}</span>
              </div>
            </div>
            <div class="grid-content">
              <span class="xinghao input_label">使用性质:</span>
              <div class="avatar-uploader">
                <span class="input_content">{{form.usageNature}}</span>
              </div>
            </div>
            <div class="grid-content">
              <span class="xinghao input_label">建筑层数:</span>
              <div class="avatar-uploader">
                <span class="input_content">{{form.floor}}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-container>
      <el-header>建筑主体责任人</el-header>
      <el-main>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">
              <span class="xinghao input_label">产权人姓名:</span>
              <div class="avatar-uploader">
                <span class="input_content">{{form.owner}}</span>
              </div>
            </div>
            <div class="grid-content">
              <span class="input_label">产权人身份证号:</span>
              <div class="avatar-uploader">
                <span class="input_content">{{form.ownerId}}</span>
              </div>
            </div>
            <div class="grid-content">
              <span class="input_label">产权人联系电话:</span>
              <div class="avatar-uploader">
                <span class="input_content">{{form.ownerPhone}}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <span class="xinghao input_label">管理人姓名:</span>
              <div class="avatar-uploader">
                <span class="input_content">{{form.admin}}</span>
              </div>
            </div>
            <div class="grid-content">
              <span class="input_label">管理人身份证号:</span>
              <div class="avatar-uploader">
                <span class="input_content">{{form.adminId}}</span>
              </div>
            </div>
            <div class="grid-content">
              <span class="input_label">管理人联系电话:</span>
              <div class="avatar-uploader">
                <span class="input_content">{{form.adminPhone}}</span>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">
              <span class="input_label">产权人照片:</span>
              <div class="avatar-uploader">
                <img :src="form.ownerPhoto" class="avatar">
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <span class="input_label">管理人照片:</span>
              <div class="avatar-uploader">
                <img :src="form.adminPhoto" class="avatar">
              </div>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-container>
      <el-header>建筑消防资源</el-header>
      <el-main>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">
              <span class="input_label">消控室位置:</span>
              <div class="avatar-uploader">
                <span class="input_content">{{form.controlRoom}}</span>
              </div>
            </div>
            <div class="grid-content">
              <span class="input_label">烟感报警器数量:</span>
              <div class="avatar-uploader">
                <span class="input_content">{{form.smokeSensation}}</span>
              </div>
            </div>
            <div class="grid-content">
              <span class="input_label">应急照明灯具数量:</span>
              <div class="avatar-uploader">
                <span class="input_content">{{form.emergencyLight}}</span>
              </div>
            </div>
            <div class="grid-content">
              <span class="input_label">消防电梯数量:</span>
              <div class="avatar-uploader">
                <span class="input_content">{{form.elevator}}</span>
              </div>
            </div>
            <div class="grid-content">
              <span class="input_label">疏散楼梯数量:</span>
              <div class="avatar-uploader">
                <span class="input_content">{{form.stairs}}</span>
              </div>
            </div>
            <div class="grid-content">
              <span class="input_label">排风风机数量:</span>
              <div class="avatar-uploader">
                <span class="input_content">{{form.exhaustFan}}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <span class="input_label">消火栓数量:</span>
              <div class="avatar-uploader">
                <span class="input_content">{{form.hydrants}}</span>
              </div>
            </div>
            <div class="grid-content">
              <span class="input_label">灭火器数量:</span>
              <div class="avatar-uploader">
                <span class="input_content">{{form.fireExtinguisher}}</span>
              </div>
            </div>
            <div class="grid-content">
              <span class="input_label">疏散指示标记数量:</span>
              <div class="avatar-uploader">
                <span class="input_content">{{form.evacuationIndicate}}</span>
              </div>
            </div>
            <div class="grid-content">
              <span class="input_label">安全出口数量:</span>
              <div class="avatar-uploader">
                <span class="input_content">{{form.exitMount}}</span>
              </div>
            </div>
            <div class="grid-content">
              <span class="input_label">疏散楼梯形式:</span>
              <div class="avatar-uploader">
                <span class="input_content">{{form.stairsForm}}</span>
              </div>
            </div>
            <div class="grid-content">
              <span class="input_label">送风风机数量:</span>
              <div class="avatar-uploader">
                <span class="input_content">{{form.airBlower}}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { getObj } from '@/api/unit/building'
export default {
  name: "AddBuilding",
  props: {
    buildId: {
      type: Number,
      required: true
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
      showMap: false,
    };
  },
  watch: {
  },
  created() {
    this.getInfo()
  },
  mounted() {},
  methods: {
    // 获取建筑信息详情
    getInfo () {
      getObj(this.buildId).then(res => {
        this.form = res.data.data
      })
    },
    // 关闭添加页面
    close () {
      this.$emit('addClose')
    },
  }
};
</script>
<style lang="scss">
.building_detail{
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
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
