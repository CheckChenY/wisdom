<template>
  <div class="record_box">
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
        <el-tag>{{scope.row.processdeep}}</el-tag>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button type="info" plain icon="el-icon-view" size="small" @click.native="open6(scope)">查看</el-button>
      </template>
    </avue-crud>
    <div class="device_dialog">
      <el-dialog
        title="记录详情"
        :visible.sync="dialogVisible"
        width="60%"
        @open="openBefore"
        :before-close="handleClose"
      >
        <basic-container>
          <avue-tabs :option="procesOptionss" @change="handleTabChanges"></avue-tabs>
          <!-- 警情详情 -->
          <span v-if="isshowTime=='information'" class="information contain_scroller">
            <!-- <img :src="planFloor" class="dialog_point_img"> -->
            <el-container>
              <el-main>
                <el-row>
                  <el-col :span="12">
                    <div class="grid-content">
                      <span class="input_label">设备ID:</span>
                      <div class="avatar-uploader">
                        <span class="input_content">{{alarparticulars.deviceId}}</span>
                      </div>
                    </div>
                    <div class="grid-content">
                      <span class="input_label">设备类型:</span>
                      <div class="avatar-uploader">
                        <span class="input_content">{{alarparticulars.processtype}}</span>
                      </div>
                    </div>
                    <div class="grid-content">
                        <span class="input_label">当前状态:</span>
                        <div class="avatar-uploader">
                           <!-- :class="[(discribution.warnState == 1 || discribution.warnState == 3) ? 'red':'',discribution.warnState == 2 ? 'yellow':'']" -->
                          <span class="input_content">{{alarparticulars.processcondition}}</span>
                        </div>
                      </div>
                      <div class="grid-content">
                        <span class="input_label">警情程度:</span>
                        <div class="avatar-uploader">
                          <span class="input_content">{{alarparticulars.processdeep}}</span>
                        </div>
                      </div>
                      <div class="grid-content">
                        <span class="input_label">楼层/区域:</span>
                        <div class="avatar-uploader">
                          <span class="input_content">{{floorDic[alarparticulars.processfloor]}}</span>
                        </div>
                      </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content">
                      <span class="input_label">设备名称:</span>
                      <div class="avatar-uploader">
                        <span class="input_content">{{alarparticulars.deviceName}}</span>
                      </div>
                    </div>
                    <div class="grid-content">
                      <span class="input_label">上报时间:</span>
                      <div class="avatar-uploader">
                        <span class="input_content">{{alarparticulars.createTime}}</span>
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
                        <span class="input_content">{{alarparticulars.processbuild}}</span>
                      </div>
                    </div>
                    <div class="grid-content">
                      <span class="input_label">具体位置:</span>
                      <div class="avatar-uploader">
                        <span class="input_content">{{alarparticulars.speclocation}}</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-main>
            </el-container>
          </span>
          <!-- 报警位置相关图片 -->
          <span v-if="isshowTime=='images'" class="information contain_scroller">
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
                      <img :src="surroundingPhoto" class="live_photo" alt>
                    </div>
                    <div class="view_button">
                      <el-button @click="showImg(surroundingPhoto)">查看大图</el-button>
                    </div>
                  </el-col>
                </el-row>
              </el-main>
            </el-container>
          </span>
          <span v-if="isshowTime=='videos'" class="information contain_scroller">
            开发中
          </span>
          <!-- 状态跟踪 -->
          <span v-if="isshowTime=='status'" class="contain_scroller">
            <div class="status_steps">
              <el-steps direction="vertical" :active="RstatusSteps.length">
                <el-step
                  class="step_style"
                  v-for="(item, i) in RstatusSteps"
                  :key="i"
                  :title="item.timestamp"
                  :description="item.content"
                ></el-step>
              </el-steps>
              <p class="schedule_text">跟踪处理进度,直到该警情处理完毕。</p>
            </div>
          </span>
          <!-- 处理情况 -->
          <span v-if="isshowTime=='situation'" class="process_look contain_scroller">
            <el-container>
              <el-header>警情查看</el-header>
              <el-main>
                <el-row>
                  <el-col :span="12">
                    <div class="grid-content">
                      <span class="input_label">第一查看人:</span>
                      <div class="avatar-uploader">
                        <span class="input_content">{{userDic[alarparticulars.firstViewer]}}</span>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content">
                      <span class="input_label">查看时间:</span>
                      <div class="avatar-uploader">
                        <span class="input_content">{{alarparticulars.firstViewTime}}</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-main>
            </el-container>
            <el-container>
              <el-header>警情确认</el-header>
              <el-main>
                <el-row>
                  <el-col :span="12">
                    <div class="grid-content">
                      <span class="input_label">警情确认:</span>
                      <div class="avatar-uploader">
                        <span class="input_content">{{alarparticulars.warnConfirmType}}</span>
                      </div>
                    </div>
                    <div class="grid-content">
                      <span class="input_label">确认说明:</span>
                      <div class="avatar-uploader">
                        <span class="input_content">{{alarparticulars.warnConfirmDes}}</span>
                      </div>
                    </div>
                    <div class="grid-content">
                      <span class="input_label">确认人:</span>
                      <div class="avatar-uploader">
                        <span class="input_content">{{userDic[alarparticulars.warnConfirmor]}}</span>
                      </div>
                    </div>
                    <div class="grid-content">
                      <span class="input_label">确认时间:</span>
                      <div class="avatar-uploader">
                        <span class="input_content">{{alarparticulars.dealTime}}</span>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content">
                      <span class="input_label">现场报警图:</span>
                      <div class="avatar-uploader img_box">
                        <img :src="alarparticulars.warnLocaleConfirmPhoto" class="live_photo" alt>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-main>
            </el-container>
            <el-container class="list_press">
              <el-header>警情处理</el-header>
              <el-main>
                <el-row>
                  <el-col :span="12">
                    <div class="grid-content">
                      <span class="input_label">处理描述:</span>
                      <div class="avatar-uploader">
                        <span class="input_content">{{alarparticulars.warnDealDes}}</span>
                      </div>
                    </div>
                    <div class="grid-content">
                      <span class="input_label">处理人:</span>
                      <div class="avatar-uploader">
                        <span class="input_content">{{userDic[alarparticulars.warnConfirmor]}}</span>
                      </div>
                    </div>
                    <div class="grid-content">
                      <span class="input_label">处理时间:</span>
                      <div class="avatar-uploader">
                        <span class="input_content">{{alarparticulars.dealTime}}</span>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content">
                      <span class="input_label">处理结果图:</span>
                      <div class="avatar-uploader img_box">
                        <img :src="alarparticulars.warnDealResultPhoto" class="live_photo" alt>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-main>
            </el-container>
          </span>
        </basic-container>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          <!-- <el-button type="primary" @click="siteDisposal">现场处理</el-button> -->
        </span>
      </el-dialog>
      <imageview v-if="dialogImage" :facilityPhoto="facilityPhoto" @closeImage="closeImg"/>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
import DevicePosition from "@/components/public/device-position";
import imageview from "@/components/public/image-view";
import { stateTracking } from "@/api/monitor/industry";
import { findAllUser } from '@/api/public'
import {
  getMotesystem, //當前狀態
  getUnitdevice
} from "@/api/monitor/firewirless";
import { 
  fetchTree, 
  getObj, 
  fetchFloorList 
} from "@/api/unit/floor";
import {
    getWarnMsg
} from "@/util/warn";
import {
    getDict
} from "@/api/unit/dict";
// import { getUnitdevice } from "@/api/monitor/firewirless"; //相关图片
export default {
  name: "process",
  components: {
    "device-position": DevicePosition,
    imageview
  },
  props: ["datas", "option", "tableLoading"],
  data() {
    return {
      lockScroll: true,
      dialogVisible: false,
      dialogImage: false,
      facilityPhoto: "",
      deviceIds: "",
      obj: {},
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },

      // 下拉参数配置
      processvalue: "",
      processoptions: [],
      // 警情记录详情
      alarparticulars: {},
      showType: "information",
      // 选项卡
      isshowTime: "information",
      procesOptionss: {
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
          },
          {
            label: "处理情况",
            prop: "situation"
            // icon: "el-icon-picture",
          },
          {
            label: "状态跟踪",
            prop: "status"
            // icon: "el-icon-picture",
          }
        ]
      },
      planFloor: "",
      pointSign: "",
      // 时间轴参数
      RstatusSteps: [],
      buddingDic:{},
      floorDic:{},
      timeout:false,
      allUser: [],
      degreeOptions: [],
      warn_state: [],
      distext:'',
      surroundingPhoto:''
    };
  },
  created() {
      this.getData()
  },
  computed: {},
  watch: {
    datas(val) {
      this.page.total = val[0].total;
    }
  },
  mounted() {},
  methods: {
    getData(id){
      var that=this
      fetchFloorList().then(res=>{
        if(res && res.data && res.data.data.length){
          var obj={}
          res.data.data.forEach(s=>{
            obj[s.id]=s.floorCode
          })
          that.floorDic=obj
        }
      })
      fetchTree({
        limit: 100
      }).then(res => {
          if (res && res.data && res.data.data) {
            var obj={}
            res.data.data.building.forEach(s=>{
              obj[s.id]=s.buildingCode
            })
            that.buddingDic=obj
          }
      })
      findAllUser().then(res=>{
        if (res && res.data && res.data.code == '0') {
          var obj={}
          res.data.data.forEach(s=>{
            obj[s.id]=s.realName
          })
          that.userDic=obj
          this.allUser = res.data.data
        }
      })
      getDict("alert_confirm").then(res => {
          this.processoptions = res.data.data;
      });
      getDict("warn_level").then(res => {
          if (res && res.data) {
              this.degreeOptions = res.data.data;
          }
      });
      getDict("warn_state").then(res => {
        if(res && res.data && res.data.data.length){
          var obj={}
          res.data.data.forEach(s=>{
              obj[s.value]=s.label
          })
          this.warn_state=obj
        }
    })
    },
    onLoad(page) {
      //模拟分页
      this.$emit("pageChange", page);
    },
    // 页面是否出现
    clickChange(item) {
      console.log(item);
    },
    open6(data) {
      this.alarparticulars = data.row;
      this.alarparticulars.firstViewTime = this.alarparticulars.firstViewTime ? this.alarparticulars.firstViewTime.replace("T", " ") : '';
      this.alarparticulars.warnConfirmTime = this.alarparticulars.warnConfirmTime ? this.alarparticulars.warnConfirmTime.replace("T", " ") : '';
      this.alarparticulars.dealTime = this.alarparticulars.dealTime ? this.alarparticulars.dealTime.replace("T", " ") : '';
      this.stateTrackings(this.alarparticulars.id);
      this.dialogVisible = true;
      this.getUnitdeviceImg(data.row.deviceId);
      this.deviceIds = data.row.deviceId;
    },
    //當前狀態
    getCurrentStatus(id) {
      getMotesystem(id).then(res => {
        var stutasData = res.data.data;
        if (stutasData != null) {
            if (stutasData.createTime && stutasData.createTime != null) {
                var createTime = stutasData.createTime.replace("T", " ").split('.')[0];
                let wl = this.degreeOptions.filter(s => s.value == stutasData.warnLevel)
                let item = {
                    timestamp: '',
                    content: '',
                }
                item.timestamp = createTime;
                item.content =
                    stutasData.deviceName +
                    ", 位于 " +
                    this.buddingDic[stutasData.buildingId] +
                    ", " +
                    this.floorDic[stutasData.floorId] +
                    ", " +
                    stutasData.location +
                    ", " +
                    "当前状态: " +
                    this.warn_state[stutasData.warnState] +
                    ", " +
                    "报警程度: " +
                    wl.length > 0? wl[0].label: '';
                    item.content = item.content + ' 状态描述: ' + distext
                this.RstatusSteps = [item]
            } else {
                this.RstatusSteps.splice(0, this.RstatusSteps.length);
            }

        } else {
            this.RstatusSteps.splice(0, this.RstatusSteps.length);
        }
        if (stutasData != null) {
            let warnConfirmor, firstViewer, warnConfirmType
            let arr1 = this.allUser.filter(s => s.id == stutasData.warnConfirmor)
            let arr2 = this.allUser.filter(s => s.id == stutasData.firstViewer)
            let arr3 = this.processoptions.filter(s => s.value == stutasData.warnConfirmType)
            if (arr1.length > 0) warnConfirmor = [0].realName
            if (arr2.length > 0) firstViewer = [0].realName
            if (arr3.length > 0) warnConfirmType = [0].label
            if (stutasData.warnConfirmTime && stutasData.warnConfirmTime != null) {
              var warnConfirmTime = stutasData.warnConfirmTime.replace("T", " ");
              let item = {
                timestamp: '',
                content: '',
              }
              item.timestamp = warnConfirmTime;
              item.content =
                  "确认人: " +
                  warnConfirmor +
                  "   安全确认人确认该警情为: " +
                  warnConfirmType +
                  "   确认说明: " +
                  stutasData.warnConfirmDes;
              this.RstatusSteps.push(item)
            } else {
                this.RstatusSteps.splice(2, this.RstatusSteps.length);
            }
            if (stutasData.firstViewTime && stutasData.firstViewTime != null) {
              var firstViewTime = stutasData.firstViewTime.replace("T", " ");
              let item = {
                timestamp: '',
                content: '',
              }
              item.timestamp = firstViewTime;
              item.content =
                  "值班人员: " +
                  firstViewer +
                  "   安全管理人处理警情为: " +
                  stutasData.warnDealDes;
              this.RstatusSteps.push(item)
            } else {
                this.RstatusSteps.splice(1, this.RstatusSteps.length);
            }
        } else {
            this.RstatusSteps.splice(0, this.RstatusSteps.length);
        }
      });
    },
    // 弹窗打开前
    openBefore() {},
    // 弹窗关闭前
    handleClose() {
      this.dialogVisible = false;
    },
    // tab切换
    handleTabChanges(data) {
      // console.log(data);
      this.isshowTime = data.prop;
      if (data.prop == "status") {
        this.getCurrentStatus(this.deviceIds);
      }
    },
    // 放大显示图片
    showImg(url) {
      this.facilityPhoto = url;
      this.dialogImage = true;
    },
    //相關圖片
    getUnitdeviceImg(id) {
      getUnitdevice(id).then(
        res => {
          console.log(res);
          this.surroundingPhoto=res.data.data.surroundingPhoto
          this.pointSign = res.data.data.pointSign;
          console.log(this.pointSign);
          getObj(res.data.data.floorId).then(resdata => {
            // console.log(resdata);
            this.planFloor = resdata.data.data.plan;
          });
          // debugger;
        },
        err => {
          // debugger;
          console.log("22222222222222");
        }
      );
    },
    // 关闭弹窗
    closeImg() {
      this.dialogImage = false;
    },
    // 状态跟踪
    stateTrackings(data) {
      stateTracking(data).then(res => {
        this.distext = getWarnMsg(res.data.data)
      });
    }
  }
};
</script>
<style lang="scss">
// @import "./devicedetail/devicedetail.scss";
.record_box {
  .avue-crud {
    .ms-tree-title {
      padding-left: 0;
    }
  }
  .device_dialog {
    .el-step__description.is-finish {
      color: #666666;
      font-size: 14px;
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
    .process_look {
      .is-vertical {
        border-bottom: solid 1px #cccccc;
        margin-bottom: 25px;
        padding-bottom: 30px;
      }
    }
    .status_steps {
      .step_style {
        margin-bottom: 0;
        .el-step__line {
          top: 3px;
        }
        .el-step__main {
          margin-bottom: 20px;
        }
      }
      padding: 5px 13px;
      .schedule_text {
        color: #1890ff;
        font-size: 14px;
      }
    }
    .img_box {
      border: dashed 1px #dcdfe6;
      padding: 5px 5px;
      top: 15px;
    }
    .list_press {
      border-bottom: none !important;
    }

    .el-header {
      height: 43px !important;
      font-size: 15px;
      // font-weight: 600;
    }
    .el-col-6 {
      padding-right: 24px;
      margin-top: 13px;
      .small_photo {
        border: dashed 1px #dcdfe6;
        padding: 5px 5px;
      }
    }
    .dialog_point_img {
      width: 100%;
      height: auto;
    }
    .live_photo {
      width: 95%;
    }
  }
}
</style>