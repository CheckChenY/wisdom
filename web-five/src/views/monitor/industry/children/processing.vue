<template>
  <div class="process_box">
    <avue-crud :data="datas" 
      :option="option" 
      v-model="obj" 
      :page="page" 
      @on-load="onLoad" 
      :table-loading="tableLoading">
      <template slot="empty">
          <avue-empty
          :image="timeout?'/img/bg/404.svg':'/img/empty.png'"
          :desc="timeout?'请求超时,请稍后重试······':'暂无数据'"
          >
        </avue-empty>
      </template>
      <template slot-scope="scope" slot="processdeep">
        <el-tag v-if="scope.row.processdeepid=='1'">{{scope.row.processdeep}}</el-tag>
        <el-tag type="warning" v-if="scope.row.processdeepid=='2'">{{scope.row.processdeep}}</el-tag>
        <el-tag type="danger" v-if="scope.row.processdeepid=='3'">{{scope.row.processdeep}}</el-tag>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button type="warning" plain icon="el-icon-edit" size="small" @click.native="tip(scope)">处理</el-button>
      </template>
    </avue-crud>
    <div class="device_dialog">
      <el-dialog
        title="警情处理"
        :visible.sync="dialogVisible"
        width="60%"
        @open="openBefore"
        :before-close="handleClose"
      >
        <basic-container>
          <avue-tabs :option="procesOptions" @change="handleTabChange"></avue-tabs>
          <span v-if="showType=='information'" class="information contain_scroller">
            <!-- <img :src="planFloor" class="dialog_point_img"> -->
            <el-container>
              <!-- <el-header>建筑主体责任人</el-header> -->
              <el-main>
                <el-row>
                  <el-col :span="12">
                    <div class="grid-content">
                      <span class="input_label">设备ID:</span>
                      <div class="avatar-uploader">
                        <span class="input_content">{{alartform.deviceId}}</span>
                      </div>
                    </div>
                    <div class="grid-content">
                      <span class="input_label">设备类型:</span>
                      <div class="avatar-uploader">
                        <span class="input_content">{{device_type[alartform.deviceType]}}</span>
                      </div>
                    </div>
                    <div class="grid-content">
                        <span class="input_label">当前状态:</span>
                        <div class="avatar-uploader">
                          <span class="input_content" :class="[(alartform.warnState == 1 || alartform.warnState == 3) ? 'red':'',alartform.warnState == 2 ? 'yellow':'']">{{warn_state[alartform.warnState]}}</span>
                        </div>
                      </div>
                      <div class="grid-content">
                        <span class="input_label">警情程度:</span>
                        <div class="avatar-uploader">
                          <span class="input_content">{{alartform.processdeep}}</span>
                        </div>
                      </div>
                      <div class="grid-content">
                        <span class="input_label">楼层/区域:</span>
                        <div class="avatar-uploader">
                          <span class="input_content">{{floorDic[alartform.floorId]}}</span>
                        </div>
                      </div>
                    
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content">
                      <span class="input_label">设备名称:</span>
                      <div class="avatar-uploader">
                        <span class="input_content">{{alartform.deviceName}}</span>
                      </div>
                    </div>
                    <div class="grid-content">
                        <span class="input_label">上报时间:</span>
                        <div class="avatar-uploader">
                          <span class="input_content">{{alartform.createTime}}</span>
                        </div>
                      </div>
                      <div class="grid-content">
                          <span class="input_label">状态描述:</span>
                          <div class="avatar-uploader">
                            <span class="input_content">{{distext}}</span>
                          </div>
                        </div>
                        <div class="grid-content">
                          <span class="input_label">所在建筑:</span>
                          <div class="avatar-uploader">
                            <span class="input_content">{{alartform.building}}</span>
                          </div>
                        </div>
                        <div class="grid-content">
                          <span class="input_label">具体位置:</span>
                          <div class="avatar-uploader">
                            <span class="input_content">{{alartform.location}}</span>
                          </div>
                        </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <div class="grid-content">
                      <span class="xinghao input_label">警情确认:</span>
                      <div class="avatar-uploader">
                        <!-- <img :src="form.ownerPhoto" class="avatar"> -->
                        <el-select v-model="alartform.warnConfirmType" clearable placeholder="请选择">
                          <el-option
                            v-for="item in processoptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="grid-content">
                      <span class="xinghao input_label">确认说明:</span>
                      <div class="avatar-uploader illustrate-box">
                        <!-- <img :src="form.ownerPhoto" class="avatar"> -->
                        <textarea
                          name="illustrate"
                          id="illustrate"
                          cols="30"
                          rows="10"
                          v-model="alartform.warnConfirmDes"
                        ></textarea>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content">
                      <span class="xinghao input_label">现场报警图:</span>
                      <div class="avatar-uploader">
                        <!-- <img :src="form.adminPhoto" class="avatar"> -->
                        <el-upload
                          ref="alart_img"
                          action=""
                          :limit="1"
                          :multiple="true"
                          :show-file-list="false"
                          :auto-upload="false"
                          :on-change="fileChange"
                        >
                          <img
                            width="100%"
                            height="100%"
                            v-if="alartform.warnLocaleConfirmPhoto!=' '"
                            :src="alartform.warnLocaleConfirmPhoto"
                            alt
                          >
                          <i v-else class="el-icon-plus"></i>
                        </el-upload>
                        <!-- <el-dialog :visible.sync="dialogImage">
                          <img width="100%" :src="alartform.warnLocaleConfirmPhoto" alt>
                        </el-dialog> -->
                        <div class="format_describe">
                          <h3>格式要求:</h3>
                          <ul>
                            <li>1.要求现场拍摄告警状态图片,或直接视频截图上传图片。</li>
                            <li>2.要求jpg、jpeg或png格式。</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content">
                      <span class="xinghao input_label">处理描述:</span>
                      <div class="avatar-uploader illustrate-box">
                        <!-- <img :src="form.ownerPhoto" class="avatar"> -->
                        <textarea
                          name="illustrate"
                          id="illustrate"
                          cols="30"
                          rows="10"
                          v-model="alartform.warnDealDes"
                        ></textarea>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content">
                      <span class="xinghao input_label">处理结果图:</span>
                      <div class="avatar-uploader">
                        <!-- <img :src="form.adminPhoto" class="avatar"> -->
                        <el-upload
                          ref="alart_deal_img"
                          action=""
                          :limit="1"
                          :multiple="true"
                          :show-file-list="false"
                          :auto-upload="false"
                          :on-change="fileDealChange"
                        >
                          <img
                            width="100%"
                            height="100%"
                            v-if="alartform.warnDealResultPhoto!=' '"
                            :src="alartform.warnDealResultPhoto"
                            alt
                          >
                          <i v-else class="el-icon-plus"></i>
                        </el-upload>
                        <div class="format_describe">
                          <h3>格式要求:</h3>
                          <ul>
                            <li>1.要求现场拍摄告警状态图片,或直接视频截图上传图片。</li>
                            <li>2.要求jpg、jpeg或png格式。</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-main>
            </el-container>
          </span>
          <span v-if="showType=='images'" class="image_information contain_scroller">
            <el-container>
              <el-main>
                <el-row>
                  <el-col :span="18">
                    <p class="tvchannal channal">设备可视化</p>
                    <device-position
                      :offsetY="0"
                      :offsetX="0"
                      :planFloor="planFloor"
                      :pointSign="pointSign"
                      :pointClick="false"
                    ></device-position>
                  </el-col>
                  <el-col :span="6">
                    <p class="sitechannal channal">设备现场图</p>
                    <div class="small_photo dialog_point_img">
                      <img :src="surroundingPhoto" class="live_photo">
                    </div>
                    <div class="view_button">
                      <el-button @click="showImg(surroundingPhoto)">查看大图</el-button>
                    </div>
                  </el-col>
                </el-row>
              </el-main>
            </el-container>
          </span>
          <span v-if="showType=='videos'" class="information contain_scroller">
            <!-- <correlation-video></correlation-video> -->
            <div class="grid-content">
              <span class="format_describe">开发中</span>
            </div>
          </span>
        </basic-container>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="alartSure">确 定</el-button>
          <!-- 转交处理 现场处理  暂时干掉 -->
          <!-- <el-button type="primary" @click="dealwith(title1)">{{title1.text}}</el-button>
          <el-button type="primary" @click="siteDisposal(title2)">{{title2.text}}</el-button> -->
        </span>
      </el-dialog>
      <imageview v-if="dialogImage" :facilityPhoto="facilityPhoto" @closeImage="closeImg"/>
      <!-- <dealstyle :dealdatas="dealdatas" v-on:dealShow="dealShows"/> -->
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import dialogCompany from "./devicedetail/devicedetail.vue";
import DevicePosition from "@/components/public/device-position";
import correlationVideo from "@/components/public/video-list";
import { getDict } from "@/api/unit/dict";
import { btnseven, showimgviode, getInfoTracking } from "@/api/monitor/industry";
import { getObj, fetchTree, fetchFloorList } from "@/api/unit/floor";
import { getUnitdeviceNew } from "@/api/monitor/firewirless"; //相关图片
import imageview from "@/components/public/image-view";
// import dealstyle from "./dealStyle";
import {
  getWarnMsg
} from "@/util/warn";

export default {
  name: "process",
  components: {
    dialogcompany: dialogCompany,
    "device-position": DevicePosition,
    "correlation-video": correlationVideo,
    imageview,
    // dealstyle
  },
  props: ["datas", "option", "tableLoading"],
  data() {
    return {
      obj: {},
      dialogImage: false,
      // title1: {
      //   id: 1,
      //   text: "转交处理"
      // },
      // title2: {
      //   id: 2,
      //   text: "现场处理"
      // },
      // dealdatas: {
      //   dialogshow: false,
      //   title: "",
      //   ids: 1,
      //   id: "",
      //   warnState:""
      // },
      facilityPhoto: "",
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      // 下拉参数配置
      // processvalue: "",
      processoptions: [],
      showType: "information",
      // 处理方式

      procesOptions: {
        column: [
          {
            label: "警情信息",
            prop: "information"
            // icon: "el-icon-date",
          },
          {
            label: "相关图片",
            prop: "images"
            // icon: "el-icon-picture",
          },
          {
            label: "关联视频",
            prop: "videos"
            // icon: "el-icon-picture",
          }
        ]
      },
      // 警情信息
      alartform: {},
      // 确定传输值
      // alarthanddata: {},
      dialogImageUrl: "",
      dialogVisible: false,
      lockScroll: false,
      // dialogImage: false,
      planFloor: "",
      pointSign: "",
      // waitToDealObj:{},
      floorDic:{},
      timeout:false,
      device_type: {},
      warn_state: {},
      distext: '',
      surroundingPhoto:''
    };
  },
  created() {
    console.log("datasdatas", this.datas)
  },
  computed: {
    ...mapGetters([
      "userInfo",
    ]),
  },
  watch: {
    datas(val) {
      if(val.length){
        this.page.total = val[0].total;
      }else{
        this.page.total = 0
      }
    }
  },
  mounted() {},
  methods: {
    getFloorDetail(id){
      if (!id) {
        return
      }
      var that=this
      fetchFloorList({buildingId:id}).then(res=>{
        if(res && res.data && res.data.data.length){
          var obj={}
          res.data.data.forEach(s=>{
            obj[s.id]=s.floorCode
          })
          that.floorDic=obj
        }
      })
    },
    onLoad(page) {
      //模拟分页
      this.$emit("pageChange", page);
    },
    tip(data) {
      getUnitdeviceNew(data.row.id).then(res=>{
        console.log(data.row)
        // this.waitToDealObj=res.data.data
        // this.dealdatas.warnState=res.data.data.warnState
        getObj(res.data.data.floorId).then(resdata => {
          this.planFloor = resdata.data.data.plan;
        });

        this.alartform = res.data.data
        this.alartform.createTime = this.alartform.createTime.replace('T', ' ')
        this.distext = getWarnMsg(this.alartform)
        this.alartform.firstViewer = this.userInfo.id
        this.alartform.warnConfirmor = this.userInfo.id
        this.getBuildingTree()
        this.getFloorDetail(res.data.data.buildingId)
        this.getDic();//警情选项
        
        // getInfoTracking(res.data.data.deviceId).then(res => {
        //   if (res && res.data && res.data.code == 0) {
        //     this.alartform = res.data.data
        //     this.alartform.createTime = this.alartform.createTime.replace('T', ' ')
        //     this.distext = getWarnMsg(this.alartform)
        //     this.alartform.firstViewer = this.userInfo.id
        //     this.alartform.warnConfirmor = this.userInfo.id
        //     this.getBuildingTree()
        //     this.getFloorDetail(res.data.data.buildingId)
        //   }
        //   this.getDic();//警情选项
        // })
      })
      
      this.imgvideo(data.row.deviceId);//视频
      this.dialogVisible = true;
    },
    // 页面是否出现
    clickChange(item) {
      console.log(item);
    },
    // 弹窗打开前
    openBefore() {
      this.dialogVisible = true;
    },
    // // 弹窗关闭前
    handleClose() {
      this.dialogVisible = false;
    },
    // 弹窗取消按钮
    cancel() {
      this.dialogVisible = false;
    },
    // 弹窗确定按钮
    handleSubmit() {
      this.dialogVisible = false;
    },
    // tab切换
    handleTabChange(data) {
      // console.log(data);
      this.showType = data.prop;
    },
    // 获取相关图片
    //相關圖片
    getUnitdeviceImg(id) {
      getUnitdeviceNew(id).then(
        res => {
            console.log(res);
          // console.log(this.pointSign);
          
          // debugger;
        },
        err => {
          // debugger;
          console.log("22222222222222");
        }
      );
    },
    // // 转交处理
    // dealwith(data) {
    //   this.dealdatas.dialogshow = true;
    //   this.dealdatas.ids = data.id;
    //   this.dealdatas.title = data.text;
    //   this.dialogVisible = false;
      
    // },
    // dealShows(data) {
    //   this.dealdatas.dialogshow = data;
    // },
    // // 现场处理按钮
    // siteDisposal(data) {
    //   this.dealdatas.dialogshow = true;
    //   this.dealdatas.ids = data.id;
    //   this.dealdatas.title = data.text;
    //   this.dialogVisible = false;
    // },
    // 文件移除时钩子
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    // 文件列表中已上传的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogImage = true;
    },
    // 放大显示图片
    showImg(url) {
      this.facilityPhoto = url;
      this.dialogImage = true;
    },
    // 关闭弹窗
    closeImg() {
      this.dialogImage = false;
    },
    // 警情确认字段
    getDic() {
      getDict("alert_confirm").then(res => {
        this.processoptions = res.data.data;
      });
      getDict("device_type").then(res => {
          if(res && res.data && res.data.data.length){
              var obj={}
              res.data.data.forEach(s=>{
                  obj[s.value]=s.label
              })
              this.device_type=obj
          }
      })
      getDict("warn_state").then(res => {
          if(res && res.data && res.data.data.length){
              var obj={}
              res.data.data.forEach(s=>{
                  obj[s.value]=s.label
              })
              this.warn_state=obj
          }
      })
      getDict("warn_level").then(res => {
        if (res && res.data) {
          if (this.alartform.warnLevel) this.$set(this.alartform, 'processdeep', res.data.data.filter(res => res.value == this.alartform.warnLevel)[0].label)
        }
      });
    },
    // 图片数据转换
    imgDataTrans(file) {
      return new Promise((resolve, reject) => {
        const imgType = "image/jpeg;image/png;image/jpg";
        const isTypeOk = imgType.indexOf(file.raw.type);
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (isTypeOk == -1) {
          this.$message.error("上传图片要求JPG、JPEG或PNG格式!");
          return;
        }
        if (!isLt2M) {
          this.$message.error("上传图片大小不能超过 1MB!");
          return;
        }
        this.getBase64(file.raw).then(
          response => {
            resolve(response);
          },
          error => {
            reject(error);
          }
        );
      });
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
    // 点击图片上传
    fileChange(file) {
      this.$refs.alart_img.clearFiles();
      this.imgDataTrans(file).then(
        res => {
          this.alartform.warnLocaleConfirmPhoto = res;
        },
        error => {
          console.log(error);
        }
      );
    },
    // 点击图片上传
    fileDealChange(file) {
      this.$refs.alart_deal_img.clearFiles();
      this.imgDataTrans(file).then(
        res => {
          this.alartform.warnDealResultPhoto = res;
        },
        error => {
          console.log(error);
        }
      );
    },
    //点击确定
    alartSure() {
      if(!this.alartform.warnConfirmType){
        this.$message({
          type:'error',
          message:'请选择警情确认'
        })
        return
      }
      if(!this.alartform.warnConfirmDes){
        this.$message({
          type:'error',
          message:'请输入警情说明'
        })
        return
      }
      if(!this.alartform.warnLocaleConfirmPhoto){
        this.$message({
          type:'error',
          message:'请选择现场报警图'
        })
        return
      }
      if(!this.alartform.warnDealDes){
        this.$message({
          type:'error',
          message:'请输入处理说明'
        })
        return
      }
      if(!this.alartform.warnDealResultPhoto){
        this.$message({
          type:'error',
          message:'请选择现场处理图'
        })
        return
      }
      this.alartform.firstViewTime = new Date()
      this.alartform.warnConfirmTime = new Date()
      // this.alarthanddata.dealState = 1;
      // this.alarthanddata.warnState = this.waitToDealObj.warnState;
      // this.alarthanddata.id = this.alartform.id;
      // this.alarthanddata.warnConfirmType = this.processvalue;
      // this.alarthanddata.warnLocaleConfirmPhoto = this.alartform.warnLocaleConfirmPhoto;
      // this.alarthanddata.warnConfirmDes = this.alartform.warnConfirmDes;
      this.alartform.createTime = this.alartform.createTime.replace(" ",'T')
      this.alartform.dealState = '2'
      btnseven(this.alartform).then(res => {
        if (res && res.data &&res.data.code == 1) {
          this.$message({
            type:'error',
            message:res.data.data,
          })
        } else {
          this.$emit('dealSuccess','dealSuccess')
          this.$message({
            type:'success',
            message:res.data.data,
          })
        }
      });
      this.dialogVisible = false;
    },
    getBuildingTree() {
        fetchTree({
            limit: 100
        }).then(res => {
            if (res && res.data && res.data.data) {
              if(res.data.data.building.length && this.alartform.buildingId){
                this.$set(this.alartform,"building", res.data.data.building.filter(res => res.id == this.alartform.buildingId)[0].buildingCode);
              }
            }
        })
    },
    // 关联视频
    imgvideo(data) {
      showimgviode(data).then(res => {
        this.surroundingPhoto=res.data.data.surroundingPhoto
        this.pointSign = res.data.data.pointSign;
        console.log(this.pointSign)
      });
    }
  }
};
</script>
<style lang="scss">
// @import "./devicedetail/devicedetail.scss";
.el-message-box {
  position: relative;
  .scene_btn {
    position: absolute;
    bottom: -39px;
    right: 150px;
  }
}
.process_box {
  .avue-crud {
    .ms-tree-title {
      padding-left: 0;
    }
  }
  .device_dialog {
    // 相关图片
    .image_information {
      .el-col-6 {
        padding-right: 24px;
        margin-top: 13px;
      }
    }
    .small_photo {
      border: dashed 1px #dcdfe6;
      padding: 5px 5px;
    }
    // 题目字体
    .channal {
      font-size: 17px;
    }
    // 查看大图按钮
    .view_button {
      margin-top: 15px;
      text-align: center;
    }
    .dialog_point_img {
      width: 100%;
      .live_photo {
        width: 95%;
      }
    }
    .el-select {
      .el-input {
        top: 7px;
        .el-input__inner {
          height: 30px;
          width: 241px;
        }
      }
    }
    .grid-content {
      .avatar-uploader {
        .el-upload {
          top: 11px;
          width: 103px;
          height: 100px;
          line-height: 107px;
        }
        .format_describe {
          margin-top: 15px;
        }
      }
      .illustrate-box {
        top: 12px;
        textarea {
          border: 1px solid #dcdfe6;
          width: 234px;
          height: 146px;
        }
      }
    }
  }
}
</style>
