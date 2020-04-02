<template>
  <div class="industry_box">
    <avue-tabs :option="procesOption" @change="clickChange"></avue-tabs>
    <div class="tab_box">
      <ul>
        <li>
          <span>设备类型：</span>
          <!-- <el-select v-model="typeValue" placeholder="请选择" class="type_value"> -->
          <el-input v-model="typeLabel" placeholder="请选择" @focus="inputClick(typeValue)" readonly></el-input>
          <!-- <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          ></el-option>-->
          <!-- </el-select> -->
        </li>
        <li>
          <span>警情程度：</span>
          <el-select v-model="degreeValue" placeholder="请选择" class="degree_value" clearable>
            <el-option
              v-for="item in degreeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>
        <li>
          <span>警情状态：</span>
          <el-select v-model="statusValue" placeholder="请选择" class="degree_value" clearable>
            <el-option
              v-for="item in alarmStatusdata"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>
        <li>
          <span>所在建筑：</span>
          <el-select v-model="floorValue" placeholder="请选择" class="floor_value" clearable>
            <el-option
              v-for="item in floorOptions"
              :key="item.id"
              :label="item.buildingCode"
              :value="item.id"
            ></el-option>
          </el-select>
        </li>
        <li class="dateBox">
          <span class="demonstration">报警时间：</span>
          <timedate v-on:changeValues="changeValues" :timevalues="timevalues" class="dateClass"></timedate>
        </li>
        <li class="butn_boxs">
          <button
            v-for="(btnItem,index) in btnText"
            :key="index"
            :class="{'butnClass':btnItem.isShow}"
            @click="btnClicktext(index)"
          >{{btnItem.btnname}}</button>
        </li>
      </ul>
    </div>
    <div v-show="isShow=='process'">
      <process :datas="processdatas" :tableLoading="tableLoading" @dealSuccess="dealSuccess" :option="proceoption" @pageChange="pageOn"/>
    </div>
    <div v-show="isShow=='record'">
      <record :datas="processdatas" :tableLoading="tableLoading" :option="proceoption" v-on:pageChange="pageOn"/>
    </div>
    <div class="deivce_alert">
      <el-dialog
        title="请选择"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose"
        class="alert_box"
      >
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <el-tree
          :data="datayuan"
          :props="defaultProps"
          ref="typeref"
          show-checkbox
          node-key="id"
          :check-strictly="true"
          :highlight-current="true"
          :filter-node-method="filterNode"
          :default-checked-keys="[treepanId]"
          @check-change="handleNodeClick"
          @node-click="nodeClick"
        ></el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
import process from "./children/processing.vue";
import record from "./children/record.vue";
import timedate from "../common/timeData.vue";
import { getDict, getMoreDict } from "@/api/unit/dict";
import { fetchTree, fetchFloorList } from "@/api/unit/floor";
import { industryList } from "@/api/monitor/industry";
import {
  getWarnMsg
} from "@/util/warn";
// setStatusObj
export default {
  name: "industry",
  components: {
    process,
    record,
    timedate
  },
  props: [],
  data() {
    return {
      // 弹窗判断
      dialogVisible: false,
      filterText: "",
      datayuan: [],
      defaultProps: {
        children: "children",
        label: "label",
        id: "id"
      },
      // 警情处理配置
      proceoption: {
        title: "",
        page: true,
        border: true,
        align: "center",
        addBtn: false,
        delBtn: false,
        editBtn: false,
        index: true,
        menu: true,
        stripe: true,
        // width:100,
        menuWidth: 100,
        indexLabel: "序号",
        menuAlign: "center",
        column: [
          // {
          //   label: "序号",
          //   prop: "ordinal",
          //   width: 50
          // },
          {
            label: "报警时间",
            prop: "createTime",
            width: 165,
            // span: 12,
            type: "date",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss"
            // hide: true,
          },
          {
            label: "设备名称",
            prop: "deviceName",
            hide:true,
            span: 12,
            width: 160
          },
          {
            label: "设备类型",
            prop: "processtype",
            span: 12,
            width: 160,
            dicData: []
          },
          {
            label: "所在建筑",
            prop: "processbuild",
            span: 12,
            width: 160,
            dicData: []
          },
          {
            label: "楼层/区域",
            prop: "processfloor",
            span: 12,
            width: 110,
            type:'select',
            dicData:[]
          },
          {
            label: "具体位置",
            prop: "speclocation",
            span: 12,
            minWidth: 80,
          },
          {
            label: "报警状态",
            prop: "processcondition",
            span: 12,
            dicData: []
            // width: 80
          },
          {
            label: "报警描述",
            prop: "stateDesc",
            span: 12,
            minWidth: 160
          },
          {
            label: "报警程度",
            prop: "processdeep",
            span: 12,
            slot: true,
            width: 80,
            dicData: []
          }
        ]
      },

      // 告警详情数据
      processdatas: [],
      // 警情处理请求参数
      dealstate: "0",
      dealreqdatas: {
        createTimeStart: "", //开始时间
        createTimeEnd: "", //结束时间
        warnLevel: "", //告警等级数字
        warnState: "",
        buildingId: "", //建筑编号id
        deviceType: "", //设备类型
        limit: 10,
        page: 1
      },
      procesOption: {
        column: [
          {
            label: "警情处理",
            prop: "process",
            dealstate: "0"
            // icon: "el-icon-date",
          },
          {
            label: "处理记录",
            prop: "record",
            dealstate: "2"
            // icon: "el-icon-picture",
          }
        ]
      },
      btnText: [
        {
          id: "01",
          btnname: "搜索",
          isShow: true
        },
        {
          id: "02",
          btnname: "清空",
          isShow: false
        }
      ],
      isShow: "process",
      typeValue: "", //告警类型
      typeLabel:"",
      degreeValue: "", //告警程度
      statusValue: "", //报警状态
      floorValue: "", //建筑编号
      timevalues: "", //告警时间
      options: [], //告警类型
      degreeOptions: [], //告警程度
      floorOptions: [], //建筑编号
      alarmStatusdata: [], //报警状态
      policeHandata: [], //警情处理方式
      alertconfirmdata: [], //警情确认等级
      treepanId: null,
      treeValue: "",
      tableLoading: false,
      pageParams:{
        limit:10,
        page:1,
        deal_state:0
      }
    };
  },
  created() {
    this.floorType();
    this.processType();
    this.degreeType();
    this.alarmStatus();
    this.alertConfirm();
    this.policeHandling();
    this.getFloorDic()
  },
  watch: {
    filterText(val) {
      //console.log(val);
      this.$refs.typeref.filter(val);
    },
    // "form.floorId": function(val) {
    //   if (val) {
    //     this.getFloorObj(val);
    //   }
    // },
    deep: true
  },
  computed: {},

  mounted() {
    // this.clickChange(this.procesOption.column[0]);
    this.morenDatas(this.dealstate);
  },
  methods: {
    dealSuccess(val){
      if(val=="dealSuccess"){
        this.morenDatas(this.dealstate);
      }
    },
    //获取楼层字典
    getFloorDic(){
      fetchFloorList().then(res=>{
        console.log(res)
        if(res && res.data.data.length){
          res.data.data.forEach(s=>{
            var obj={}
            obj.label=s.floorCode
            obj.value=s.id
            this.proceoption.column[4].dicData.push(obj)
          })
        }
      })
    },
    // 默认展示数据
    morenDatas(prop) {
      this.tableLoading = true
      this.dealreqdatas.deal_state=prop
      for(let key in this.dealreqdatas){
        if(!this.dealreqdatas[key]){
          delete this.dealreqdatas[key]
        }
      }
      console.log(this.dealreqdatas)
      industryList(this.dealreqdatas)
        .then(res => {
          //console.log(this.floorOptions);
          setTimeout(() => {
            this.tableLoading = false
          }, 1000)
          // 建筑id和lable匹配
          
          if (res && res.data && res.data.data) {
            this.processdatas.splice(0, this.processdatas.length);
            res.data.data.forEach(s=>{
              s.deviceAlertDeal.statusDes = s.profileId
              s.stateDesc=getWarnMsg(s.deviceAlertDeal)
            })
            for (let ins in res.data.data) {
              var datapreoce = {};
              datapreoce.total = res.data.total;
              datapreoce.createTime = res.data.data[ins].deviceAlertDeal.createTime.replace(
                "T",
                " "
              );
              datapreoce.stateDesc = res.data.data[ins].stateDesc;
              datapreoce.id = res.data.data[ins].deviceAlertDeal.id;
              datapreoce.deviceId = res.data.data[ins].deviceAlertDeal.deviceId;
              datapreoce.deviceName = res.data.data[ins].deviceAlertDeal.deviceName; //告警源名称
              datapreoce.processfloor = res.data.data[ins].deviceAlertDeal.floorId; //所在楼层或区域
              datapreoce.speclocation = res.data.data[ins].deviceAlertDeal.location; //具体位置

              datapreoce.firstViewer = res.data.data[ins].deviceAlertDeal.firstViewer; //第一查看人
              datapreoce.firstViewTime = res.data.data[ins].deviceAlertDeal.firstViewTime; //查看时间
              datapreoce.warnLocaleConfirmPhoto =
                res.data.data[ins].deviceAlertDeal.warnLocaleConfirmPhoto; //现场报警图
              datapreoce.warnConfirmDes = res.data.data[ins].deviceAlertDeal.warnConfirmDes; //告警说明
              datapreoce.warnConfirmor = res.data.data[ins].deviceAlertDeal.warnConfirmor; //确认人
              datapreoce.warnConfirmTime = res.data.data[ins].deviceAlertDeal.warnConfirmTime; //确认时间

              datapreoce.warnDealResultPhoto =
                res.data.data[ins].deviceAlertDeal.warnDealResultPhoto; //处理结果图
              datapreoce.warnDealDes = res.data.data[ins].deviceAlertDeal.warnDealDes; //处理描述
              datapreoce.warnHandler = res.data.data[ins].deviceAlertDeal.warnHandler; //处理人
              datapreoce.dealTime = res.data.data[ins].deviceAlertDeal.dealTime; //处理时间
              // 告警源类型
              for (let inss in this.datayuan) {
                for (let i in this.datayuan[inss].children) {
                  if (
                    this.datayuan[inss].children[i].value ==
                    res.data.data[ins].deviceAlertDeal.deviceType
                  ) {
                    //console.log(i)
                    //console.log(inss)
                    let dicts = {
                      value: this.datayuan[inss].children[i].value,
                      label: this.datayuan[inss].children[i].label
                    };

                    this.proceoption.column[2].dicData.splice(
                      0,
                      this.proceoption.column[2].length
                    );
                    this.proceoption.column[2].dicData.push(dicts);
                    datapreoce.processtype = this.datayuan[inss].children[
                      i
                    ].label;
                  }
                }
              }
              // 所在建筑
              for (let i in this.floorOptions) {
                if (res.data.data[ins].deviceAlertDeal.buildingId === this.floorOptions[i].id) {
                  let dict = {
                    value: this.floorOptions[i].id,
                    label: this.floorOptions[i].buildingCode
                  };
                  this.proceoption.column[3].dicData.splice(
                    0,
                    this.proceoption.column[3].length
                  );
                  this.proceoption.column[3].dicData.push(dict);
                  datapreoce.processbuild = this.floorOptions[i].buildingCode;
                }
              }
              // 告警等级
              for (let b in this.degreeOptions) {
                if (
                  res.data.data[ins].deviceAlertDeal.warnLevel == this.degreeOptions[b].value
                ) {
                  // debugger;
                  let dict = {
                    value: this.degreeOptions[b].value,
                    label: this.degreeOptions[b].label
                  };
                  this.proceoption.column[8].dicData.splice(
                    0,
                    this.proceoption.column[8].length
                  );
                  this.proceoption.column[8].dicData.push(dict);
                  datapreoce.processdeep = this.degreeOptions[b].label;
                  datapreoce.processdeepid = this.degreeOptions[b].value;
                }
              }
              // 报警状态
              for (let c in this.alarmStatusdata) {
                if (
                  res.data.data[ins].deviceAlertDeal.warnState == this.alarmStatusdata[c].value
                ) {
                  let dict = {
                    value: this.alarmStatusdata[c].value,
                    label: this.alarmStatusdata[c].label
                  };
                  this.proceoption.column[6].dicData.splice(
                    0,
                    this.proceoption.column[6].length
                  );
                  this.proceoption.column[6].dicData.push(dict);
                  datapreoce.processcondition = this.alarmStatusdata[c].label;
                  datapreoce.processconditionid = this.alarmStatusdata[c].value;
                }
              }
              // 警情处理方式
              for (let d in this.policeHandata) {
                if (
                  this.policeHandata[d].value == res.data.data[ins].deviceAlertDeal.warnDealWay
                ) {
                  datapreoce.warnDealWay = this.policeHandata[d].label; //处理方式
                }
              }
              // 警情确认等级
              for (let h in this.alertconfirmdata) {
                if (
                  this.alertconfirmdata[h].value ==
                  res.data.data[ins].deviceAlertDeal.warnConfirmType
                ) {
                  datapreoce.warnConfirmType = this.alertconfirmdata[h].label; //警情确认
                }
              }
              // this.processdatas.splice(0,this.processdatas.length)
              this.processdatas.push(datapreoce);
            }
          }
        })
        .then(() => {
          //console.log(err);
        });
    },
    // 监听页码改变
    pageOn(data) {
      console.log(data)
      this.pageParams.page=data.currentPage
      this.pageParams.limit=data.pageSize
      this.dealreqdatas.page = data.currentPage;
      this.dealreqdatas.limit = data.pageSize;
      this.morenDatas(this.dealstate);
    },
    // 页面是否出现
    clickChange(item) {
      console.log(item);
      if (item.prop != this.isShow) {
        this.typeValue = "";
        this.degreeValue = "";
        this.statusValue = "";
        this.floorValue = "";
        this.timevalues = "";
        // this.timeLists = [];
      }
      this.isShow = item.prop;
      this.dealstate = item.dealstate;
      this.morenDatas(this.dealstate);
    },
    // 告警源类型
    processType() {
      getMoreDict({ type: "device_type,system_type", level: "1" }).then(res => {
        if (res && res.data) {
          //console.log(res.data);
          // var
          for (var ins in res.data.data) {
            res.data.data[ins].disabled = true;
          }

          this.datayuan = res.data.data;
        }
      });
    },
    // 告警程度
    degreeType() {
      getDict("warn_level").then(res => {
        if (res && res.data) {
          //console.log(res.data);
          this.degreeOptions = res.data.data;
        }
      });
    },
    // 告警状态
    alarmStatus() {
      getDict("alarm_status").then(res => {
        if (res && res.data && res.data.data.length) {
          //console.log(res.data);
          res.data.data.forEach((s,t)=>{
            if(s.value==3){
              res.data.data.splice(t,1)
            }
          })
          this.alarmStatusdata = res.data.data;
        }
      });
    },
    // 警情处理方式请求
    policeHandling() {
      getDict("police_handling").then(res => {
        if (res && res.data) {
          //console.log(res.data);
          this.policeHandata = res.data.data;
        }
      });
    },
    // 警情确认等级
    alertConfirm() {
      getDict("alert_confirm").then(res => {
        if (res && res.data) {
          //console.log(res.data);
          this.alertconfirmdata = res.data.data;
        }
      });
    },
    // 建筑编号
    floorType() {
      fetchTree({
        limit: 100
      }).then(res => {
        console.log(res)
        // //console.log("22222222222222222222");
        // //console.log(res.data.data.building);
        if (res.data.data.building) {
          this.floorOptions = res.data.data.building;
        }
      });
    },
    // 搜索重置点击
    btnClicktext(i) {
      if (i == 0) {
        this.dealreqdatas.createTimeStart = this.timevalues[0];
        this.dealreqdatas.createTimeEnd = this.timevalues[1];
        this.dealreqdatas.buildingId = this.floorValue;
        this.dealreqdatas.deviceType = this.typeValue;
        this.dealreqdatas.warnLevel = this.degreeValue;
        this.dealreqdatas.warnState = this.statusValue;
        // debugger;
        this.morenDatas(this.dealstate);
      }
      if (i == 1) {
        console.log(2)
        // //console.log(i)
        this.typeValue = "";
        this.degreeValue = "";
        this.statusValue = "";
        this.floorValue = "";
        this.timevalues = "";
        this.timevalues = "";
        this.typeLabel = ''
        this.dealreqdatas.createTimeStart = this.timevalues[0];
        this.dealreqdatas.createTimeEnd = this.timevalues[1];
        this.dealreqdatas.buildingId = this.floorValue;
        this.dealreqdatas.deviceType = this.typeValue;
        this.dealreqdatas.warnLevel = this.degreeValue;
        this.dealreqdatas.warnState = this.statusValue;
        // debugger;
        this.morenDatas(this.dealstate);
        // return;
      }
    },
    // 输入框点击
    inputClick() {
      // //console.log(data);
      this.processType();
      this.typeLabel=''
      this.typeValue=''
      this.dialogVisible = true;
    },
    // 多选发生改变
    handleNodeClick(item, node) {
      // console.log(item);
      //console.log(data);
      //console.log(node);
      if(item.children.length){
        return
      }
      if (node == true) {
        this.treepanId = item.id;
        this.typeLabel = item.label;
        this.typeValue = item.value;
        this.$refs.typeref.setCheckedNodes([item]);
      }
    },
    // 多选点击已选
    nodeClick(item) {
      if(item.children.length){
        return
      }
      this.treepanId = item.id;
      this.typeLabel = item.label;
      this.typeValue = item.value;
      this.$refs.typeref.setCheckedNodes([item]);
    },

    handleClose() {
      this.dialogVisible = false;
      // //console.log(data);
    },
    // 类型搜索框的值发生改变
    filterChange(data) {
      //console.log(data);
      this.$refs.typeref.filter(data);
    },
    // 树形过滤
    filterNode(value, data) {
      //console.log(data);
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 时间发生改变
    changeValues(itemData) {
      // //console.log(itemData);
      this.timevalues = itemData;
    }
  }
};
</script>
<style lang="scss">
@import "./industry.scss";
@import "./children/devicedetail/devicedetail.scss";
</style>