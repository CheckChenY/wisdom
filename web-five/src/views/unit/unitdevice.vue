<template>
  <div class="app-container unit_device">
    <basic-container>
      <el-row>
        <el-col :span="3">
          <avue-tree
            class="device_tree"
            :data="treeData"
            :option="treeOption"
            @node-click="nodeClick"
          ></avue-tree>
        </el-col>
        <el-col :span="21">
          <avue-crud
            ref="crud"
            :page="page"
            v-model="form"
            :data="tableData"
            :table-loading="tableLoading"
            :option="tableOption"
            @refresh-change="refreshChange"
            @current-change="currentChange"
            @size-change="sizeChange"
            @search-change="searchChange"
            @selection-change="selectionChange"
            @row-update="handleUpdate"
            @row-save="handleSave"
            @row-del="rowDel"
          >
            <template slot="empty">
                <avue-empty
                :image="timeout?'/img/bg/404.svg':'/img/empty.png'"
                :desc="timeout?'请求超时,请稍后重试······':'暂无数据'"
                >
              </avue-empty>
            </template>
            <template slot="menuLeft">
              <el-button
                type="primary"
                plain
                @click="handleAdd"
                icon="el-icon-plus"
                size="small"
              >添加设备</el-button>
              <!-- <el-button size="small" @click="uploadMore" icon="el-icon-upload">批量导入</el-button> -->
              <!-- <el-button
                size="small"
                @click="changeStatus('1')"
                icon="y-icon-kaiqi"
                plain
              >批量启用</el-button> -->
            </template>
            <template slot-scope="scope" slot="menu">
              <el-button
                size="mini"
                type="info"
                plain
                icon="el-icon-view"
                @click="handleShow(scope.row,scope.index)"
              >查看</el-button>
              <!-- ||
                      scope.row.deviceType==19 ||
                      scope.row.deviceType==20 ||
                      scope.row.deviceType==21 ||
                      scope.row.deviceType==23 ||
                      scope.row.deviceType==24 ||
                      scope.row.deviceType==37 ||
                      scope.row.deviceType==38 ||
                      scope.row.deviceType==39 -->
              <el-button
                size="mini"
                type="warning"
                plain
                icon="el-icon-edit"
                @click="handleEditParam(scope.row,scope)"
                v-if="scope.row.deviceType==41 || 
                      scope.row.deviceType==17 ||
                      scope.row.deviceType==18 ||
                      scope.row.deviceType==22 ||
                      scope.row.deviceType==25"
              >修改参数</el-button>
              <el-button
                size="mini"
                type="warning"
                plain
                icon="el-icon-edit"
                @click="handleEdit(scope.row,scope.index)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                plain
                icon="el-icon-delete"
                @click="handleDel(scope.row,scope.index)"
              >删除</el-button>
            </template>
            <template slot="deviceIdForm" slot-scope="scope">
              <el-input
                v-model="form.deviceId"
                @change="deviceIdChange(form.deviceId, scope.row)"
                clearable
                placeholder="请输入设备标识码(SN码)"
              ></el-input>
            </template>
            <template slot="surroundingPhotoForm" slot-scope="scope">
                <img v-if="form.surroundingPhoto && formSave" :src="form.surroundingPhoto" class="avatar">
              <el-upload
                class="avatar-uploader"
                ref="upload"
                action
                :limit="1"
                :multiple="true"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="handleImg"
                v-if="!formSave"
              >
                <img v-if="form.surroundingPhoto" :src="form.surroundingPhoto" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div slot="tip" class="el-upload__tip">
                  <div slot="tip" class="el-upload__tip0">格式要求：</div>
                  <div slot="tip" class="el-upload__tip1">1.设备图像清晰可见，周边环境尽量有明显标志，便于及时确认设备所在位置。</div>
                  <div slot="tip" class="el-upload__tip2">2.要求JPG、JPEG或PNG格式。</div>
                </div>
              </el-upload>
            </template>
            <template slot="modelPhotoForm" slot-scope="scope">
              <img v-if="form.modelPhoto && formSave" :src="form.modelPhoto" class="avatar">
              <el-upload
                class="avatar-uploader"
                ref="upload"
                action
                :limit="1"
                :multiple="true"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="handleModelPhotoImg"
                v-if="!formSave"
              >
                <img v-if="form.modelPhoto" :src="form.modelPhoto" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div slot="tip" class="el-upload__tip">
                  <div class="el-upload__tip0">格式要求：</div>
                  <div class="el-upload__tip1">1.输入设备型号时，自动展示相应型号的设备图。</div>
                  <div class="el-upload__tip2">2.如没有设备型号图，可以自行上传。</div>
                  <div class="el-upload__tip3">3.要求JPG、JPEG或PNG格式。</div>
                </div>
              </el-upload>
            </template>
            <template slot-scope="scope" slot="floorIdForm">
              <el-select v-model="form.floorId" :disabled="formSave" placeholder="请选择">
                <el-option
                  v-for="item in floorData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
            <template slot-scope="scope" slot="deviceTypeForm">
              <el-select
                v-model="deviceTypeValue"
                @focus="deviceTypePop"
                :disabled="formSave"
                placeholder="请选择"
              ></el-select>
            </template>
            <template slot-scope="scope" slot="isInvalid">
              <el-tag type="success" v-if="scope.row.isInvalid == '有效'">有效</el-tag>
              <el-tag type="warning" v-if="scope.row.isInvalid == '即将到期'">即将到期</el-tag>
              <el-tag type="danger" v-if="scope.row.isInvalid == '已过期'">已过期</el-tag>
            </template>
            <template slot-scope="scope" slot="validityTermForm">
              <el-input
                v-model="form.validityTerm"
                type="number"
                :disabled="formSave"
                :validate-event="true"
                @change="termChange"
                clearable
                placeholder="请填写有效期"
              ></el-input>
            </template>
            <template slot-scope="scope" slot="pointSignForm">
              <div
                class="el-tooltip el-input el-input--medium el-input-group el-input-group--append"
                aria-describedby="el-tooltip-4186"
                tabindex="0"
              >
                <input
                  type="text"
                  v-model="form.pointSign"
                  disabled
                  autocomplete="off"
                  placeholder="请标记具体位置"
                  class="el-input__inner"
                >
                <div class="el-input-group__append" @click="handleIconClick">
                  <i slot="suffix" class="el-icon-location-outline el-input__icon point_sign_icon"></i>
                </div>
              </div>
            </template>
            <template slot-scope="scope" slot="deviceCusernameForm">
              <el-input
                v-model="form.deviceCusername"
                :disabled="formSave"
                :validate-event="true"
                clearable
                placeholder="请填写摄像机用户名"
              ></el-input>
            </template>
            <template slot-scope="scope" slot="deviceCpasswordForm">
              <el-input
                v-model="form.deviceCpassword"
                :disabled="formSave"
                :validate-event="true"
                clearable
                placeholder="请填写摄像机密码"
              ></el-input>
            </template>
            <template slot-scope="scope" slot="deviceIpForm">
              <el-input
                v-model="form.deviceIp"
                :disabled="formSave"
                :validate-event="true"
                clearable
                placeholder="请填写摄像机ip"
              ></el-input>
            </template>
            <template slot-scope="scope" slot="devicePortForm">
              <el-input
                v-model="form.devicePort"
                :disabled="formSave"
                :validate-event="true"
                clearable
                placeholder="请填写摄像机端口号"
              ></el-input>
            </template>
          </avue-crud>
        </el-col>
      </el-row>
    </basic-container>
    <el-dialog
      title="设备类型"
      :visible.sync="dialogVisible"
      width="30%"
      class="dialog_class"
      @open="openDialog"
      :before-close="handleClose"
    >
      <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
      <el-tree
        :data="deviceTypeData"
        ref="eltree"
        show-checkbox
        node-key="value"
        @check="nodeDialogClick"
        :default-checked-keys="[form.deviceType]"
        :filter-node-method="filterNode"
        :props="defaultProps"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="pointTitle" :visible.sync="dialogPointVisible" class="dialog_point">
      <device-position
        :offsetY="offsetY"
        :offsetX="offsetX"
        :planFloor="planFloor"
        :pointSign="form.pointSign"
        :pointClick="pointClick"
        @getPoinValue="getPoinValue"
      ></device-position>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelPoint">取 消</el-button>
        <el-button type="primary" @click="dialogPointVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="批量导入设备"
      :visible.sync="dialogUploadVisible"
      width="33%"
      class="upload_excel"
      :before-close="handleUploadClose"
    >
      <avue-form ref="form" v-model="uploadForm" :option="optionUpload">
        <template slot="download">
          <span class="download_model" @click="download">下载模板</span>
        </template>
        <template slot="menuForm">
          <el-button @click="handleUploadClose">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">提 交</el-button>
        </template>
      </avue-form>
    </el-dialog>
    <device-param v-if="deviceParamShow" @closeDialog="closeDeviceDialog" :device="device"></device-param>
  </div>
</template>

<script>
import {
  fetchList,
  addObj,
  delObj,
  buildTree,
  cameraTree,
  setStatusObj,
  getObjBySN
} from "@/api/unit/unitdevice"; //
import { tableOption, optionUpload } from "@/const/unit/unitdevice";
import { mapGetters } from "vuex";
import { getDict, getMoreDict } from "@/api/unit/dict";
import { fetchTree, fetchFloorList, getObj,getInfoById } from "@/api/unit/floor";
import { validatepositivenum } from "@/util/validate";
import { canUpdateParam } from "@/util/public";
import DevicePosition from "@/components/public/device-position";
import DeviceParam from "./components/editdeviceparam";
let indexObj = 0,
  arrayObj = [],
  ids = "";
export default {
  name: "unitdevice",
  components: {
    "device-position": DevicePosition,
    "device-param": DeviceParam
  },
  data() {
    return {
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      listQuery: {
        page: 1,
        limit: 10
      },
      tableLoading: false,
      formSave: false,
      tableOption: tableOption,
      treeData: [],
      treeOption: {
        nodeKey: "id",
        addBtn: false,
        menu: false,
        props: {
          labelText: "标题",
          label: "name",
          value: "id",
          children: "children"
        }
      },
      form: {
        deviceName: "", // 设备名称
        deviceCode: "", // 设备标识码(SN码)
        deviceType: "", // 设备类型
        buildingId: "", // 所在建筑
        floorId: "", // 设备楼层/区域
        manufactureDate: "", // 生产时间
        status: "", // 状态
        deviceModel: "", // 产品型号
        manufacturer: "", // 生产厂家
        validityTerm: "1", // 有效期
        location: "", // 具体位置
        pointSign: "", // 点位标注
        areaCode: "", // 设备区号
        loopNumber: "", // 设备回路号
        pointNumber: "", // 点位号
        softwareVersion: "", // 软件版本
        installTime: "", // 安装时间
        relevantCamera: "", // 关联摄像头
        surroundingPhoto: "", // 设备周边环境图
        modelPhoto: "", // 设备型号图
        deviceCusername: "", // 摄像机用户名
        deviceCpassword: "", // 摄像机密码
        deviceIp: "", // 摄像机ip
        devicePort: "", // 摄像机端口号
      },
      floorData: [],
      systemData: [],
      deviceTypeData: [],
      defaultProps: {
        children: "children",
        label: "label",
        value: "value"
      },
      dialogVisible: false,
      filterText: "",
      deviceTypeValue: "",
      dialogPointVisible: false,
      planFloor: "",
      pointClick: true,
      dialogUploadVisible: false,
      optionUpload: optionUpload,
      uploadForm: {
        upload: "", // 所在建筑
        download: "", // 下载按钮
        buildingId: "", // 所在建筑
      },
      pointTitle: "",
      offsetY: 0,
      offsetX: 0,
      deviceParamShow: false,
      device:'',
      selectFloorId:'',
      selectSystemId:'',
      selectDeviceType:'',
      hasDevice:false,
      timeout:false,
      tempDeviceName:''
    };
  },
  created() {
    this.getSystemType()
    this.getList();
    this.getDeviceMoreType();
    this.getDeviceType();
    // this.getDeviceStatus();
    this.getLeftBuildTree();
    this.getBuildingTree();
    this.getFloorAllTree()
    this.cameraTree();
    
  },
  mounted(){
    this.tableOption.column[0].change = ({value})=>{
      console.log(value)
      if(value){
        getInfoById(value).then(res=>{
          console.log(res)
          if(!res.data.data){
            this.hasDevice=false
            this.$message({
              type:'error',
              message:'该设备不存在'
            })
            this.tableOption.column[1].placeholder=''
            this.tableOption.column[2].placeholder=''
            this.tableOption.column[3].placeholder=''
            this.tableOption.column[8].placeholder=''
            this.tableOption.column[9].placeholder=''
            this.tableOption.column[10].placeholder=''
            this.tableOption.column[11].placeholder=''
            this.tableOption.column[12].placeholder=''
            this.tableOption.column[14].placeholder=''
            this.tableOption.column[15].placeholder=''
            this.tableOption.column[16].placeholder=''
            this.tableOption.column[17].placeholder=''
            this.tableOption.column[18].placeholder=''
            this.tableOption.column[19].placeholder=''
            this.tableOption.column[20].placeholder=''
          }else{
            this.hasDevice=true
            var obj=res.data.data
            if(new Date(obj.validityTerm)-Date.now()>60*60*24*30){
              this.tableOption.column[13].placeholder='有效期'
            }else if(new Date(obj.validityTerm)-Date.now()<60*60*24*30 && new Date(obj.validityTerm)-Date.now()>0){
              this.tableOption.column[13].placeholder='即将到期'
            }else{
              this.tableOption.column[13].placeholder='已到期'
            }
            console.log(obj)
            this.tableOption.column[1].placeholder=obj.deviceName
            this.tempDeviceName=obj.deviceName
            // this.tableOption.column[1].placeholder=obj.deviceName
            this.tableOption.column[2].dicData.forEach(s=>{
              if(s.value==obj.systemId){
                this.tableOption.column[2].placeholder=s.label
                this.selectSystemId=s.value
              }
            })
            this.tableOption.column[3].dicData.forEach(s=>{
              if(s.value==obj.deviceType){
                this.tableOption.column[3].placeholder=s.label
                this.selectDeviceType=s.value
              }
            })
            // this.tableOption.column[6].placeholder=obj.location
            this.tableOption.column[8].placeholder=obj.validityTerm
            this.tableOption.column[9].placeholder=obj.deviceIp
            this.tableOption.column[10].placeholder=obj.devicePort
            this.tableOption.column[11].placeholder=obj.deviceCusername
            this.tableOption.column[12].placeholder=obj.deviceCpassword
            this.tableOption.column[14].placeholder=obj.deviceModel
            this.tableOption.column[15].placeholder=obj.manufactureDate
            this.tableOption.column[16].placeholder=obj.manufacturer
            this.tableOption.column[17].placeholder=obj.softwareVersion
            this.tableOption.column[18].placeholder=obj.areaCode
            this.tableOption.column[19].placeholder=obj.loopNumber
            this.tableOption.column[20].placeholder=obj.pointNumber
            this.tableOption.column[24].placeholder=obj.id
            // this.tableOption.column[22].placeholder=obj.installTime
            // this.tableOption.column[2].placeholder=obj.systemId.toString()
          }
        })
      }
    }
    this.tableOption.column[5].change = ({value})=>{
      this.tableOption.column[5].disabled=true
      console.log(value)
      this.selectFloorId=value
    }
    this.tableOption.column[4].change = ({value})=>{
      if(value){
        this.tableOption.column[5].disabled=false
        this.getFloorTree(value)
        this.selectFloorId=''
      }
    }
    this.tableOption.column[2].change = ({value})=>{
      console.log(value)
      if(value==5){
        this.tableOption.column[9].addDisplay=true
        this.tableOption.column[9].editDisplay=true
        this.tableOption.column[10].addDisplay=true
        this.tableOption.column[10].editDisplay=true
        this.tableOption.column[11].addDisplay=true
        this.tableOption.column[11].editDisplay=true
        this.tableOption.column[12].addDisplay=true
        this.tableOption.column[12].editDisplay=true
      }else{
        this.tableOption.column[9].addDisplay=false
        this.tableOption.column[9].editDisplay=false
        this.tableOption.column[10].addDisplay=false
        this.tableOption.column[10].editDisplay=false
        this.tableOption.column[11].addDisplay=false
        this.tableOption.column[11].editDisplay=false
        this.tableOption.column[12].addDisplay=false
        this.tableOption.column[12].editDisplay=false
      }
    }
  },
 
  watch: {
    filterText(val) {
      console.log(val);
      this.$refs.eltree.filter(val);
    },
    "form.floorId": function(val) {
      if (val) {
        this.getFloorObj(val);
      }
    },
    deep: true
  },
  computed: {
    ...mapGetters(["permission"])
  },
  methods: {
    getList (params) {
      this.tableLoading = true;
      params = params ? params : {};
      fetchList(Object.assign(this.listQuery, params)).then(response => {
        if (response && response.data && response.data.code == 0) {
          let list = response.data.data;
          // for (let i = 0, len = list.length; i < len; i++) {
          //   list[i].isInvalid = this.calculateDate(
          //     list[i].manufactureDate,
          //     list[i].validityTerm
          //   );
          // }
          list.forEach(s=>{
            s.deviceType=parseInt(s.deviceType)
            canUpdateParam(s.deviceType)
            if(new Date(s.validityTerm)-Date.now()>60*60*24*30){
              s.isLate=1
            }else if(new Date(s.validityTerm)-Date.now()<60*60*24*30 && new Date(s.validityTerm)-Date.now()>0){
              s.isLate=2
            }else{
              s.isLate=3
            }
          })
          console.log(list)
          this.tableData = list;
          this.page.total = response.data.total;
        }
        setTimeout(() => {
          this.tableLoading = false;
        }, 1000)
      }).catch(error=>{
        this.tableLoading = false
        if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
          this.timeout=true
        }
      })
    },
    // 计算设备是否失效
    calculateDate(manufactuDate, validTerm) {
      let productYear = new Date(manufactuDate).getFullYear() + "";
      let lastYear = new Date(manufactuDate).getFullYear() + validTerm + "";
      let dateBetween =
        new Date(manufactuDate.replace(productYear, lastYear)) - new Date();
      let aMonth = 30 * 24 * 3600 * 1000;
      if (dateBetween < 0) {
        return "已过期";
      } else if (dateBetween - aMonth < 0) {
        return "即将到期";
      } else {
        return "有效";
      }
    },
    nodeClick(data) {
      switch (data.type) {
        case undefined :
          fetchList({
            page:1,
            limit:10,
          }).then(response => {
            if (response && response.data && response.data.code == 0) {
              let list = response.data.data;
              list.forEach(s=>{
                s.deviceType=parseInt(s.deviceType)
                if(new Date(s.validityTerm)-Date.now()>60*60*24*30){
                  s.isLate=1
                }else if(new Date(s.validityTerm)-Date.now()<60*60*24*30 && new Date(s.validityTerm)-Date.now()>0){
                  s.isLate=2
                }else{
                  s.isLate=3
                }
              })
              // for (let i = 0, len = list.length; i < len; i++) {
              //   list[i].isInvalid = this.calculateDate(
              //     list[i].manufactureDate,
              //     list[i].validityTerm
              //   );
              // }
              this.tableData = list;
              this.page.total = response.data.total;
            }
            setTimeout(() => {
              this.tableLoading = false;
            }, 1000)
          });
          break;
        case "building":
          fetchList({
            page:1,
            limit:10,
            buildingId: data.id
          }).then(response => {
            if (response && response.data && response.data.code == 0) {
              let list = response.data.data;
              list.forEach(s=>{
                s.deviceType=parseInt(s.deviceType)
                if(new Date(s.validityTerm)-Date.now()>60*60*24*30){
                  s.isLate=1
                }else if(new Date(s.validityTerm)-Date.now()<60*60*24*30 && new Date(s.validityTerm)-Date.now()>0){
                  s.isLate=2
                }else{
                  s.isLate=3
                }
              })
              // for (let i = 0, len = list.length; i < len; i++) {
              //   list[i].isInvalid = this.calculateDate(
              //     list[i].manufactureDate,
              //     list[i].validityTerm
              //   );
              // }
              this.tableData = list;
              this.page.total = response.data.total;
            }
            setTimeout(() => {
              this.tableLoading = false;
            }, 1000)
          });
          break;
        case "floor":
        fetchList({
          page:1,
          limit:10,
          floorId: data.id
          }).then(response => {
            if (response && response.data && response.data.code == 0) {
              let list = response.data.data;
              list.forEach(s=>{
                s.deviceType=parseInt(s.deviceType)
                if(new Date(s.validityTerm)-Date.now()>60*60*24*30){
                  s.isLate=1
                }else if(new Date(s.validityTerm)-Date.now()<60*60*24*30 && new Date(s.validityTerm)-Date.now()>0){
                  s.isLate=2
                }else{
                  s.isLate=3
                }
              })
              // for (let i = 0, len = list.length; i < len; i++) {
              //   list[i].isInvalid = this.calculateDate(
              //     list[i].manufactureDate,
              //     list[i].validityTerm
              //   );
              // }
              this.tableData = list;
              this.page.total = response.data.total;
            }
            setTimeout(() => {
              this.tableLoading = false;
            }, 1000)
          });
          break;
        default:
          break;
      }
    },
    searchChange(params) {
      let oparams = {
        isLate:params.isLate,
        deviceId:params.deviceId,
        buildingId: params.buildingId,
        floorId: params.floorId,
        deviceType: params.deviceType,
        // useStatus: params.useStatus,
        systemId:params.systemId
      };
      this.page.currentPage=1
      this.listQuery.page=1
      console.log(oparams)
      this.getList(oparams);
    },
    currentChange(val) {
      this.page.currentPage = val
      this.listQuery.page = val
      this.getList(this.listQuery)
    },
    sizeChange(val) {
      // this.page.pageSize = val;
      // this.listQuery.limit = val;
      // this.getList();
    },
    /**
     * @title 打开新增窗口
     * @detail 调用crud的handleadd方法即可
     *
     **/
    handleAdd: function() {
      this.pointTitle = "点位标注（请点击图片标注设备位置）";
      this.pointClick = true;
      this.planFloor = ''
      this.formSave = false;
      this.tableOption.column[0].disabled=false
      this.tableOption.column[5].disabled=true
      this.tableOption.column[1].placeholder=''
      this.tableOption.column[2].placeholder=''
      this.tableOption.column[3].placeholder=''
      this.tableOption.column[24].placeholder=''
      this.$refs.crud.rowAdd();
    },
    // 修改参数
    handleEditParam(obj,a) {
      console.log(a.row)
      this.device=a.row
      this.deviceParamShow = true;
    },
    handleEdit(row, index) {
      this.tableOption.column[0].disabled=true
      this.pointTitle = "点位标注（请点击图片标注设备位置）";
      this.pointClick = true;
      this.formSave = false;
      this.getFloorTree(row.buildingId);
      this.getDefaultDevice(row.deviceType);
      this.$refs.crud.rowEdit(row, index);
    },
    handleDel(row, index) {
      this.$refs.crud.rowDel(row, index);
    },
    rowDel: function(row) {
      var _this = this;
      this.$confirm("是否确认删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return delObj(row.id);
        })
        .then(data => {
          if (data && data.data && data.data.code == 0) {
            _this.getList();
            _this.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    /**
     * @title 数据更新
     * @param row 为当前的数据
     * @param index 为当前更新数据的行数
     * @param done 为表单关闭函数
     *
     **/
    handleUpdate: function(row, index, done) {
      row.useStatus=1 //设备使用状态默认为1 启用  2 未启用
      this.formSave = true;
      if (typeof row.relevantCamera == "object" && row.relevantCamera != null) {
        row.relevantCamera = row.relevantCamera.join(",");
      }
      addObj(row).then(data => {
        if (data && data.data && data.data.code == 0) {
          this.getList();
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
        }
        done();
      });
    },
    /**
     * @title 数据添加
     * @param row 为当前的数据
     * @param done 为表单关闭函数
     *
     **/
    handleSave: function(row, done) {
      if(this.hasDevice){
        this.formSave = true;
        if (typeof row.relevantCamera == "object" && row.relevantCamera != null) {
          row.relevantCamera = row.relevantCamera.join(",");
        }
        if(!row.deviceName){
          row.deviceName=this.tempDeviceName
        }
        row.validityTerm=this.tableOption.column[8].placeholder
        row.deviceIp=this.tableOption.column[9].placeholder
        row.devicePort=this.tableOption.column[10].placeholder
        row.deviceCusername=this.tableOption.column[11].placeholder

        row.deviceCpassword=this.tableOption.column[12].placeholder
        row.deviceModel=this.tableOption.column[14].placeholder
        row.manufactureDate=this.tableOption.column[15].placeholder
        row.manufacturer=this.tableOption.column[16].placeholder
        
        row.softwareVersion=this.tableOption.column[17].placeholder
        row.areaCode=this.tableOption.column[18].placeholder
        row.loopNumber=this.tableOption.column[19].placeholder
        row.pointNumber=this.tableOption.column[20].placeholder
        row.id=this.tableOption.column[24].placeholder
        
        row.systemId=this.selectSystemId
        row.deviceType=this.selectDeviceType
        row.$systemId=this.tableOption.column[2].placeholder
        row.$deviceType=this.tableOption.column[3].placeholder
        row.useStatus=1 //设备使用状态默认为1 启用  2 未启用
        if(new Date(row.validityTerm)-Date.now()>60*60*24*30){
          row.isLate=1
          row.$isLate='有效期'
        }else if(new Date(row.validityTerm)-Date.now()<60*60*24*30 && new Date(row.validityTerm)-Date.now()>0){
          row.isLate=2
          row.$isLate='即将到期'
        }else{
          row.isLate=3
          row.$isLate='已过期'
        }
        addObj(row).then(data => {
          console.log(row)
          if (data && data.data && data.data.code == 0) {
            this.getList();
            this.$message({
              showClose: true,
              message: "添加成功",
              type: "success"
            });
          }
          done();
        });
      }else{
        this.$message({
          type:'error',
          message:'该设备不存在'
        })
        done();
      }
    },
    /**
     * 刷新回调
     */
    refreshChange() {
      this.getList();
    },
    // 设备周边环境图
    handleImg(file) {
      this.imgDataTrans(file).then(
        res => {
          this.form.surroundingPhoto = res;
        },
        error => {
          console.log(error);
        }
      );
    },
    // 设备型号图
    handleModelPhotoImg(file) {
      this.imgDataTrans(file).then(
        res => {
          this.form.modelPhoto = res;
        },
        error => {
          console.log(error);
        }
      );
    },
    // 标记位置
    handleIconClick() {
      if(this.formSave){
        return
      }
      if(!this.selectFloorId){
        this.$message({ 
          type:'error',
          message: "请选择楼层" 
        });
        return
      }
      console.log(this.pointSignForm)
      if (!this.planFloor) {
        this.$message({ message: "没有楼层图片" });
        return;
      }
      this.dialogPointVisible = true;
      setTimeout(() => {
        let dialogPoint = document.getElementsByClassName(
          "el-dialog__wrapper dialog_point"
        );
        this.offsetY = Number(dialogPoint[0].childNodes[0].offsetTop);
        this.offsetX = Number(dialogPoint[0].childNodes[0].offsetLeft);
      }, 100);
    },
    // 图片数据转换
    imgDataTrans(file) {
      return new Promise((resolve, reject) => {
        const imgType = "image/jpeg;image/png;image/jpg";
        const isTypeOk = imgType.indexOf(file.raw.type);
        const isLt2M = file.size / 1024 / 1024 < 1;
        this.$refs.upload.clearFiles();
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
    // 获取左侧建筑树
    getLeftBuildTree() {
      let parent = {
        id: "",
        name: "",
        children: []
      };
      buildTree().then(res => {
        if (res && res.data && res.data.data) {
          let data = res.data.data;
          parent.id = "-1";
          parent.name = data.orgName;
          if (data.building) {
            for (let i = 0, len = data.building.length; i < len; i++) {
              let child = {
                id: data.building[i].buildingId,
                name: data.building[i].buildingName,
                type: "building",
                children: []
              };
              for (
                let j = 0, length = data.building[i].floor.length;
                j < length;
                j++
              ) {
                let childFloor = {
                  id: data.building[i].floor[j].floorId,
                  name: data.building[i].floor[j].floorName,
                  type: "floor"
                };
                child.children.push(childFloor);
              }
              parent.children.push(child);
            }
            this.treeData.push(parent);
          }
        }
      });
    },
    // 获取建筑树
    getBuildingTree() {
      fetchTree({
        limit: 100
      }).then(res => {
        if (res && res.data && res.data.data) {
          let data = res.data.data.building;
          data.forEach(s=>{
            s.value=parseInt(s.id)
            s.label=s.buildingCode
          })
          this.tableOption.column[4].dicData=data
          // this.$set(
          //   this.tableOption.column[4].dicData.splice(
          //     0,
          //     this.tableOption.column[4].dicData.length
          //   )
          // );
          // this.$set(
          //   this.optionUpload.column[2].dicData.splice(
          //     0,
          //     this.optionUpload.column[2].dicData.length
          //   )
          // );
          // if (data.building) {
          //   for (let i = 0, len = data.building.length; i < len; i++) {
          //     let dict = {
          //       value: data.building[i].id,
          //       label: data.building[i].buildingCode
          //     };
          //     this.tableOption.column[4].dicData.push(dict);
          //     this.optionUpload.column[2].dicData.push(dict);
          //   }
          //   arrayObj = this.tableOption.column[4].dicData.concat();
          //   // this.callSelfFloor();
          //   if (data.building[0]) {
          //     this.tableOption.column[4].valueDefault = data.building[0].id;
          //   }
          // }
        }
      });
    },
    // 递归遍历建筑
    callSelfFloor() {
      if (arrayObj[indexObj]) {
        this.getFloorAllTree(arrayObj[indexObj].value).then(() => {
          indexObj++;
          if (indexObj > arrayObj.length) {
            arrayObj = [];
            indexObj = 0;
            return;
          }
          this.callSelfFloor();
        });
      }
    },
    // 获取全部楼层
    getFloorAllTree(id) {
      fetchFloorList({
        buildingId: id?id:'',
        limit: 200
      }).then(res => {
        if (res && res.data && res.data.data) {
          let data = res.data.data;
          for (let i = 0, len = data.length; i < len; i++) {
            let dict = {
              value: data[i].id,
              label: data[i].floorCode
            };
            if (this.tableOption.column[5].dicData.indexOf(dict) == -1) {
              this.tableOption.column[5].dicData.push(dict);
            }
          }
        }
      });
    },
    // 获取楼层
    getFloorTree(id) {
      fetchFloorList({
        buildingId: id,
        limit: 200
      }).then(res => {
        if (res && res.data && res.data.data) {
          let data = res.data.data;
          data.forEach(s=>{
            s.label=s.floorCode
            s.value=s.id
          })
          this.tableOption.column[5].dicData=data
          // this.$set(this.floorData.splice(0, this.floorData.length));
          // for (let i = 0, len = data.length; i < len; i++) {
          //   let dict = {
          //     value: data[i].id,
          //     label: data[i].floorCode
          //   };
          //   this.floorData.push(dict);
          //   this.tableOption.column[5].dicData.push()
          // }
        }
      });
    },
    // 有效期校验
    termChange(param) {
      if (!validatepositivenum(param)) {
        this.$message({
          showClose: true,
          message: "请填写正整数",
          type: "error"
        });
        this.form.validityTerm = "";
      }
    },
    deviceIdChange (param, row) {
      getObjBySN(param).then(res => {
        this.rowUpdate(row, res.data.data)
      })
    },
    // 获取row数据
    rowUpdate (row, data) {
      row.id = data.id
      row.deviceId = data.deviceId
      row.deviceCode = data.deviceCode
      row.deviceName = data.deviceName
      row.deviceType = data.deviceType
      row.buildingId = data.buildingId
      row.floorId = data.floorId
      row.manufactureDate = data.manufactureDate
      // row.useStatus = data.useStatus
      row.deviceModel = data.deviceModel
      row.manufacturer = data.manufacturer
      row.validityTerm = data.validityTerm
      row.location = data.location
      row.pointSign = data.pointSign
      row.areaCode = data.areaCode
      row.loopNumber = data.loopNumber
      row.pointNumber = data.pointNumber
      row.softwareVersion = data.softwareVersion
      row.installTime = data.installTime
      row.relevantCamera = data.relevantCamera
      row.surroundingPhoto = data.surroundingPhoto
      row.modelPhoto = data.modelPhoto
      row.deviceCusername = data.deviceCusername
      row.deviceCpassword = data.deviceCpassword
      row.deviceIp = data.deviceIp
      row.devicePort = data.devicePort
      this.deviceTypeValue = this.tableOption.column[4].dicData.filter(res => res.value == data.deviceType)[0].label
    },
    // 查看
    handleShow(row, index) {
      console.log(row)
      if(!row.deviceName){
        this.tableOption.column[1].placeholder=''
      }
      this.pointTitle = "点位标注图";
      this.pointClick = false;
      this.formSave = true;
      this.$refs.crud.rowView(row, index);
    },
    // 获取默认设备类型
    getDefaultDevice(type) {
      let list = this.deviceTypeData;
      console.log(list)
      for (let i = 0, len = list.length; i < len; i++) {
        if(list[i].children.length){
          for (let j = 0, length = list[i].children.length; j < length; j++) {
            if (parseInt(list[i].children[j].value) == parseInt(type)) {
              this.deviceTypeValue = list[i].children[j].label;
              return;
            } else {
              this.deviceTypeValue = type;
            }
          }
        }
      }
    },
    // 获取设备类型
    getDeviceMoreType() {
      getMoreDict({ type: "device_type,system_type", level: "1" }).then(res => {
        if (res && res.data) {
          let list = res.data.data;
          this.$set(this.deviceTypeData.splice(0, this.deviceTypeData.length));
          for (let i = 0, len = list.length; i < len; i++) {
            list[i].disabled = true;
            this.deviceTypeData.push(list[i]);
          }
        }
      });
    },
    // 获取设备类型
    getDeviceType() {
      getDict("device_type").then(res => {
        if (res && res.data) {
          let list = res.data.data;
          // this.$set(
          //   this.tableOption.column[3].dicData.splice(
          //     0,
          //     this.tableOption.column[3].dicData.length
          //   )
          // );
          // for (let i = 0, len = list.length; i < len; i++) {
          //   this.tableOption.column[3].dicData.push(list[i]);
          // }
          this.tableOption.column[3].dicData=list
          this.tableOption.column[3].dicData.forEach(s=>{
            s.value=parseInt(s.value)
          })
        }
      });
    },
    // 获取系统类型
    getSystemType() {
      getDict("system_type").then(res => {
        if (res && res.data) {
          let list = res.data.data;
          // this.$set(
          //   this.tableOption.column[2].dicData.splice(
          //     0,
          //     this.tableOption.column[2].dicData.length
          //   )
          // );
          // for (let i = 0, len = list.length; i < len; i++) {
          //   this.tableOption.column[2].dicData.push(list[i]);
          // }
          this.tableOption.column[2].dicData=list
          this.tableOption.column[2].dicData.forEach(s=>{
            s.value=parseInt(s.value)
          })
        }
      });
    },
    // 获取设备状态
    // getDeviceStatus() {
    //   getDict("device_status").then(res => {
    //     if (res && res.data) {
    //       let list = res.data.data;
    //       this.$set(
    //         this.tableOption.column[9].dicData.splice(
    //           0,
    //           this.tableOption.column[9].dicData.length
    //         )
    //       );
    //       for (let i = 0, len = list.length; i < len; i++) {
    //         this.tableOption.column[9].dicData.push(list[i]);
    //       }
    //     }
    //   });
    // },
    // 设备类型弹窗
    deviceTypePop() {
      this.dialogVisible = true;
    },
    // 选择树形节点
    nodeDialogClick(data, node) {
      console.log(data);
      console.log(node);
      if (this.form.deviceType == data.value) {
        this.form.deviceType = "";
        this.deviceTypeValue = "";
        this.$refs.eltree.setCheckedKeys([]);
      } else {
        this.form.deviceType = data.value;
        this.deviceTypeValue = data.label;
        this.$refs.eltree.setCheckedKeys([data.value]);
      }
    },
    // 关闭弹窗
    handleClose(done) {
      done();
    },
    // 树形过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 打开弹窗
    openDialog() {
      setTimeout(() => {
        this.$refs.eltree.setCheckedKeys([]);
      }, 100);
    },
    // 楼层摄像头信息
    cameraTree() {
      let _this = this
      cameraTree(21).then(res => {
        if (res && res.data && res.data.code == 0) {
          let list = res.data.data;
          // _this.$set(
          //   _this.tableOption.column[22].dicData.splice(
          //     0,
          //     _this.tableOption.column[22].dicData.length
          //   )
          // );
          for (let i = 0, length = list.length; i < length; i++) {
            let building = {
              value: list[i].buildingId,
              name: list[i].buildingName,
              disabled: true,
              children: []
            };
            let floorList = list[i].floor;
            for (let j = 0, len = floorList.length; j < len; j++) {
              let floor = {
                value: floorList[j].floorId,
                name: floorList[j].floorName,
                disabled: true,
                children: []
              };
              let deviceList = floorList[j].device;
              for (let k = 0, l = deviceList.length; k < l; k++) {
                let device = {
                  value: deviceList[k].deviceId,
                  name: deviceList[k].deviceName
                };
                floor.children.push(device);
              }
              building.children.push(floor);
            }
            // _this.tableOption.column[22].dicData.push(building);
          }
        }
      });
    },
    // 获取楼层信息
    getFloorObj(id) {
      getObj(id).then(res => {
        if (res && res.data && res.data.code == 0) {
          this.planFloor = res.data.data.plan;
        }
      });
    },
    // 获取坐标
    getPoinValue(param) {
      this.form.pointSign = param.pointSign;
    },
    // 取消标注
    cancelPoint() {
      this.form.pointSign = "";
      this.dialogPointVisible = false;
    },
    // 批量上传
    uploadMore() {
      this.uploadForm = {};
      this.dialogUploadVisible = true;
    },
    // 关闭导入弹窗
    handleUploadClose() {
      this.$refs.form.resetForm();
      this.dialogUploadVisible = false;
    },
    // 上传文件
    handleSubmit() {
      this.$refs.form.validate(vaild => {
        if (vaild) {
          this.$message.success(JSON.stringify(this.obj0));
        }
      });
    },
    // 下载模板
    download() {
      console.log("下载模板");
    },
    selectionChange(list) {
      console.log(list)
      let idsArray = [];
      for (let i = 0, len = list.length; i < len; i++) {
        idsArray.push(list[i].id);
      }
      ids = idsArray.join(",");
    },
    // 开启
    changeStatus(status) {
      if(!ids){
        this.$message({
          type:'error',
          message:'请选择设备'
        })
        return
      }
      setStatusObj({
        ids: ids,
        status: status
      }).then(res => {
        if (res && res.data && res.data.code == 0) {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
          this.getList();
        } else {
          this.$message({ message: res.data.msg });
        }
      });
    },
    // 关闭设置参数弹窗
    closeDeviceDialog() {
      this.deviceParamShow = false;
      this.getList();
    }
  }
};
</script>

<style lang="scss">
.unit_device {
  .device_tree {
    width: 200px;
    margin-right: 10px;
    padding-top: 2px;
    .el-input-group__append {
      display: none;
    }
    .el-input-group--append .el-input__inner,
    .el-input-group__prepend {
      border-radius: 4px;
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
    border-color: #409eff;
  }
  .upload_excel {
    .el-upload__tip {
      position: relative;
      left: 0px;
      margin-top: 0px;
    }
    .avue-form__menu--center {
      text-align: right !important;
    }
    .download_model {
      color: #409eff;
    }
  }
  .y-icon-kaiqi,
  .y-icon-jinyong {
    font-size: 12px !important;
    margin-right: 5px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
    font-size: 12px;
    padding-left: 5px;
  }
}
.point_sign_icon {
  font-size: 20px;
}
.dialog_class {
  .el-tree {
    max-height: 300px;
    overflow: hidden;
    overflow-y: scroll;
    margin-top: 20px;
  }
}
.dialog_point {
  .dialog_div {
    position: relative;
  }
  .dialog_point_img {
    width: 100%;
  }
  .point_dialog_div {
    display: none;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 100000;
  }
  .point_dialog_icon::before {
    content: "";
    height: 8px;
    width: 35px;
    background: #000;
    opacity: 0.2;
    border-radius: 50%;
    position: absolute;
    top: 47px;
    left: -3px;
    animation: shadow 0.9s linear infinite;
  }
  .point_dialog_icon::after {
    background-image: url("../../../public/img/icon/position.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    animation: rotate 0.9s linear infinite;
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 30px;
    width: 30px;
  }
  .notify {
    display: none;
    position: relative;
    bottom: 32px;
    left: 12px;
    .heartbit {
      position: absolute;
      top: -14px;
      right: -19px;
      width: 24px;
      height: 24px;
      border-radius: 40px;
      border: #f62d51 solid 5px;
      animation: heartbit 1s ease-out;
      animation-iteration-count: infinite;
      -moz-animation: heartbit 1s ease-out;
      -moz-animation-iteration-count: infinite;
      -o-animation: heartbit 1s ease-out;
      -o-animation-iteration-count: infinite;
      -webkit-animation: heartbit 1s ease-out;
      -webkit-animation-iteration-count: infinite;
      animation-iteration-count: infinite;
    }
    .point {
      position: absolute;
      z-index: 1024;
      width: 6px;
      height: 6px;
      border-radius: 3px;
      background-color: #f62d51;
    }
  }
}
@keyframes shadow {
  0%,
  100% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(1.2);
  }
}

@keyframes rotate {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(20px) scale(1.1, 0.9);
  }
  75% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes heartbit {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  25% {
    transform: scale(0.1);
    opacity: 0.1;
  }
  50% {
    transform: scale(0.5);
    opacity: 0.3;
  }
  75% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

@-moz-keyframes heartbit {
  0% {
    -moz-transform: scale(0);
    opacity: 0;
  }
  25% {
    -moz-transform: scale(0.1);
    opacity: 0.1;
  }
  50% {
    -moz-transform: scale(0.5);
    opacity: 0.3;
  }
  75% {
    -moz-transform: scale(0.8);
    opacity: 0.5;
  }
  100% {
    -moz-transform: scale(1);
    opacity: 0;
  }
}
@-webkit-keyframes heartbit {
  0% {
    -webkit-transform: scale(0);
    opacity: 0;
  }
  25% {
    -webkit-transform: scale(0.1);
    opacity: 0.1;
  }
  50% {
    -webkit-transform: scale(0.5);
    opacity: 0.3;
  }
  75% {
    -webkit-transform: scale(0.8);
    opacity: 0.5;
  }
  100% {
    -webkit-transform: scale(1);
    opacity: 0;
  }
}
</style>

