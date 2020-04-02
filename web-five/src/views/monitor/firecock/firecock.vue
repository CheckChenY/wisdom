<template>
  <div class="electricfire_box">
    <avue-tabs :option="electricOption" @change="clickChange"></avue-tabs>
    <div v-if="showindex=='pandect'">
      <statist :datay="echartsdatay" :datax="echartsdatax" :elshownum="elshownum"/>
    </div>
    <div v-if="showindex=='monitoring'">
      <avue-crud
        ref="crud"
        :page="page"
        class="fire_device"
        :data="tableData"
        :option="tableOption"
        :table-loading="tableLoading"
        @current-change="currentChange"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @search-reset="searchReset"
        @search-change="searchChange"
      >
        <template slot="empty">
            <avue-empty
            :image="timeout?'/img/bg/404.svg':'/img/empty.png'"
            :desc="timeout?'请求超时,请稍后重试······':'暂无数据'"
            >
          </avue-empty>
        </template>
        <template slot="search">
          <el-form-item label="设备类型">
            <el-input v-model="search.slot"
              @focus="inputClick(search.slot)" readonly
            placeholder="请选择设备类型" size="small"/>
          </el-form-item>
        </template>

        <template slot-scope="scope" slot="menu">
          <el-button size="mini" type="info" plain icon="el-icon-view" @click="handleShow(scope)">查看</el-button>
          <el-button size="mini" type="warning" plain icon="el-icon-setting" @click="remotedoit(scope)">远程操作</el-button>
        </template>
      </avue-crud>
      <!-- 设备类型弹窗 -->
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
              :data="equipmentData"
              :props="defaultProps"
              ref="typeref"
              show-checkbox
              node-key="id"
              :check-strictly="true"
              :highlight-current="true"
              :filter-node-method="filterNode"
              @check-change="handleNodeClick"
              :default-checked-keys="[treepanId]"
              @node-click="nodeClick"
            ></el-tree>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      <div class="electric_dialog">
        <div class="electric_look device_dialog">
          <el-dialog
            title="设备详情"
            :visible.sync="dialoglook"
            width="60%"
            @open="openBefore"
            :before-close="handleClose"
          >
            <basic-container>
              <avue-tabs :option="electrictabOptions" @change="handleTabChange"></avue-tabs>
              <span v-if="showType=='tab1'" class="information contain_scroller">
                <!-- <img :src="planFloor" class="dialog_point_img"> -->
                <el-container>
                  <!-- <el-header>建筑主体责任人</el-header> -->
                  <el-main>
                    <el-row>
                      <el-col :span="12">
                        <div class="grid-content">
                          <span class="input_label">设备ID:</span>
                          <div class="avatar-uploader">
                            <span class="input_content">{{tabOneData.deviceId}}</span>
                          </div>
                        </div>
                        <div class="grid-content">
                          <span class="input_label">设备类型:</span>
                          <div class="avatar-uploader">
                            <span class="input_content">{{device_type[tabOneData.deviceType]}}</span>
                          </div>
                        </div>
                        <div class="grid-content">
                          <span class="input_label">楼层/区域:</span>
                          <div class="avatar-uploader">
                            <span class="input_content">{{floorDic[tabOneData.floorId]}}</span>
                          </div>
                        </div>
                        <div class="grid-content">
                          <span class="input_label">设备状态:</span>
                          <div class="avatar-uploader">
                            <span class="input_content">{{useStatusDic[tabOneData.useStatus]}}</span>
                          </div>
                        </div>
                        <div class="grid-content">
                          <span class="input_label">生产厂家:</span>
                          <div class="avatar-uploader">
                            <span class="input_content">{{tabOneData.manufacturer}}</span>
                          </div>
                        </div>
                        <div class="grid-content">
                          <span class="input_label">软件版本:</span>
                          <div class="avatar-uploader">
                            <span class="input_content">{{tabOneData.softwareVersion}}</span>
                          </div>
                        </div>
                        <div class="grid-content">
                          <span class="input_label">安装时间:</span>
                          <div class="avatar-uploader">
                            <span class="input_content">{{tabOneData.installTime}}</span>
                          </div>
                        </div>
                        <div class="grid-content">
                          <span class="input_label">设备型号图:</span>
                          <div class="avatar-uploader">
                              <img
                              v-if="tabOneData.modelPhoto"
                              :src="tabOneData.modelPhoto"
                              class="avatar"
                            >
                          </div>
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content">
                          <span class="input_label">设备名称:</span>
                          <div class="avatar-uploader">
                            <span class="input_content">{{tabOneData.deviceName}}</span>
                          </div>
                        </div>
                        <div class="grid-content">
                          <span class="input_label">所在建筑:</span>
                          <div class="avatar-uploader">
                            <span class="input_content">{{buildingDic[tabOneData.buildingId]}}</span>
                          </div>
                        </div>
                        <div class="grid-content">
                          <span class="input_label">具体位置:</span>
                          <div class="avatar-uploader">
                            <span class="input_content">{{tabOneData.location}}</span>
                          </div>
                        </div>
                        <div class="grid-content">
                          <span class="input_label">设备型号:</span>
                          <div class="avatar-uploader">
                            <span class="input_content">{{tabOneData.deviceModel}}</span>
                          </div>
                        </div>
                        <div class="grid-content">
                          <span class="input_label">生产日期:</span>
                          <div class="avatar-uploader">
                            <span class="input_content">{{tabOneData.manufactureDate}}</span>
                          </div>
                        </div>
                        <div class="grid-content">
                          <span class="input_label">服务到期时间:</span>
                          <div class="avatar-uploader">
                            <span class="input_content">{{tabOneData.validityTerm}}</span>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </el-main>
                </el-container>
              </span>
              
              <span v-if="showType=='tab2'" class="electab2 contain_scroller">
                <!-- <correlation-video></correlation-video> -->
                <el-container>
                  <!-- <el-header>建筑主体责任人</el-header> -->
                  <el-main>
                    <el-row>
                      <el-col :span="12">
                        <div class="grid-content">
                          <span class="input_label">上报时间:</span>
                          <div class="avatar-uploader">
                            <span class="input_content">{{discribution.createTime}}</span>
                          </div>
                        </div>
                        <div class="grid-content">
                          <span class="input_label">状态描述:</span>
                          <div class="avatar-uploader">
                            <span class="input_content" :class="[(discribution.warnState == 1 || discribution.warnState == 3) ? 'red':'',discribution.warnState == 2 ? 'yellow':'']">{{distext}}</span>
                          </div>
                        </div>
                        <div class="grid-content" v-if="deviceParams.type140">
                          <span class="input_label">上限阈值:</span>
                          <div class="avatar-uploader">
                            <span class="input_content">{{deviceParams.type140}}</span>
                          </div>
                        </div>
                        <div class="grid-content" v-if="deviceParams.type144">
                          <span class="input_label">上限阈值:</span>
                          <div class="avatar-uploader">
                            <span class="input_content">{{deviceParams.type144}}</span>
                          </div>
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content">
                          <span class="input_label">当前状态:</span>
                          <div class="avatar-uploader">
                            <span class="input_content" :class="[(discribution.warnState == 1 || discribution.warnState == 3) ? 'red':'',discribution.warnState == 2 ? 'yellow':'']">{{warn_state[discribution.warnState]}}</span>
                          </div>
                        </div>
                        <div class="grid-content" v-if="deviceParams.type23">
                          <span class="input_label">实时液位:</span>
                          <div class="avatar-uploader">
                            <span class="input_content" :class="[(discribution.warnState == 1 || discribution.warnState == 3) ? 'red':'',discribution.warnState == 2 ? 'yellow':'']">{{deviceParams.type23}}</span>
                          </div>
                        </div>
                        <div class="grid-content" v-if="deviceParams.type141">
                          <span class="input_label">下限阈值:</span>
                          <div class="avatar-uploader">
                            <span class="input_content">{{deviceParams.type141}}</span>
                          </div>
                        </div>
                        <div class="grid-content" v-if="deviceParams.type16">
                          <span class="input_label">实时压力:</span>
                          <div class="avatar-uploader">
                            <span class="input_content" :class="[(discribution.warnState == 1 || discribution.warnState == 3) ? 'red':'',discribution.warnState == 2 ? 'yellow':'']">{{deviceParams.type16}}</span>
                          </div>
                        </div>
                        <div class="grid-content" v-if="deviceParams.type146">
                          <span class="input_label">下限阈值:</span>
                          <div class="avatar-uploader">
                            <span class="input_content">{{deviceParams.type146}}</span>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <div class="current_status">
                          <span class="cuttent_status_title">状态跟踪</span>
                          <!-- <span class="status_handle" @click="dealWith" v-if="discribution.warnState != 0 && !discribution.firstViewTime">前往处理></span> -->
                        </div>
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
                      </el-col>
                    </el-row>
                  </el-main>
                </el-container>
              </span>
              <span v-if="showType=='tab3'" class="electab3 contain_scroller">
                <!-- <correlation-video></correlation-video> -->
                <el-container>
                  <!-- <el-header>建筑主体责任人</el-header> -->
                  <el-main>
                    <el-row>
                      <el-col :span="18">
                        <p class="tvchannal channal">设备可视化</p>
                        <deviceposition
                          :offsetY="0"
                          :offsetX="0"
                          :planFloor="planFloor"
                          :pointSign="pointSign"
                          :pointClick="false"
                        ></deviceposition>
                      </el-col>
                      <el-col :span="6">
                        <p class="sitechannal channal">设备现场图</p>
                        <div class="small_photo dialog_point_img">
                          <img :src="tabOneData.surroundingPhoto" class="live_photo">
                        </div>
                        <div class="view_button">
                          <el-button
                            @click="showImg(tabOneData.surroundingPhoto)"
                          >查看大图</el-button>
                        </div>
                      </el-col>
                    </el-row>
                  </el-main>
                </el-container>
              </span>
              <span v-if="showType=='tab4'" class="electab4 contain_scroller">
                <!-- <correlation-video></correlation-video> -->
                <el-container>
                  <!-- <el-header>建筑主体责任人</el-header> -->
                  <el-main>
                    <el-row>
                      <el-col :span="24">系统升级中</el-col>
                    </el-row>
                  </el-main>
                </el-container>
              </span>
              <span v-if="showType=='tab5'" class="electab5 contain_scroller">
                <!-- <correlation-video></correlation-video> -->
                <el-container>
                  <!-- <el-header>建筑主体责任人</el-header> -->
                  <el-main>
                    <el-row>
                      <el-col :span="24">
                         <div class="status_div">
                          <span size="small">日期：</span>
                          <el-date-picker
                            v-model="createTimeStart"
                            type="date"
                            size="small"
                            class="status_date_pick"
                            placeholder="开始日期"
                          ></el-date-picker>
                          <el-date-picker
                            v-model="createTimeEnd"
                            type="date"
                            size="small"
                            class="status_date_pick"
                            placeholder="结束日期"
                          ></el-date-picker>
                          <el-button
                            type="primary"
                            size="small"
                            icon="el-icon-search"
                            @click="tab5Search"
                          >查询</el-button>
                        </div>
                        <div id="echartLines" v-if="deviceParams.type23" class="chart_style"></div>
                        <div id="echartLinesEle" v-if="deviceParams.type16" class="chart_style"></div>
                      </el-col>
                    </el-row>
                  </el-main>
                </el-container>
              </span>
              <span v-if="showType=='tab6'" class="electab6 contain_scroller">
                <!-- <correlation-video></correlation-video> -->
                <el-container>
                  <!-- <el-header>建筑主体责任人</el-header> -->
                  <el-main>
                    <el-row class="status_divs">
                      <avue-crud
                        ref="crud"
                        :page="statuspage"
                        class="status_record"
                        :data="tableStatus"
                        :option="statusOption"
                        :table-loading="tableLoading"
                        @size-change="sizeChangeTab"
                        @current-change="currentChangeTab"
                        @search-change="dialogSearch"
                        @search-reset="dialogReset"
                        v-model="statusobj"
                      >
                      <template slot="search">
                        <div class="status_div_search">
                          <el-date-picker
                            v-model="search.createTimeStart"
                            type="date"
                            size="small"
                            class="status_date_pick"
                            placeholder="开始日期">
                          </el-date-picker>
                          <el-date-picker
                            v-model="search.createTimeEnd  "
                            type="date"
                            size="small"
                            class="status_date_pick"
                            placeholder="结束日期">
                          </el-date-picker>
                        </div>
                      </template>
                      <template slot="empty">
                          <avue-empty
                            :image="timeout1?'/img/bg/404.svg':'/img/empty.png'"
                            :desc="timeout1?'请求超时,请稍后重试······':'暂无数据'"
                            >
                          </avue-empty>
                        </template>
                    </avue-crud>
                    </el-row>
                  </el-main>
                </el-container>
              </span>
              <span v-if="showType=='tab7'" class="electab7 contain_scroller">
                <!-- <correlation-video></correlation-video> -->
                <el-container>
                  <!-- <el-header>建筑主体责任人</el-header> -->
                  <el-main>
                    <el-row>
                      <el-col :span="24">
                         <div class="status_div">
                          <span size="small">日期：</span>
                          <el-date-picker
                            v-model="statusDateStarts"
                            type="date"
                            size="small"
                            class="status_date_pick"
                            placeholder="开始日期"
                          ></el-date-picker>
                          <el-date-picker
                            v-model="statusDateEnds"
                            type="date"
                            size="small"
                            class="status_date_pick"
                            placeholder="结束日期"
                          ></el-date-picker>
                          <el-button
                            type="primary"
                            size="small"
                            icon="el-icon-search"
                            @click="dateSearch"
                          >查询</el-button>
                        </div>
                        <div id="echartfenxi" v-if="this.dataList && this.dataList.length > 0" class="chart_style"></div>
                      </el-col>
                    </el-row>
                  </el-main>
                </el-container>
              </span>
            </basic-container>
            <span slot="footer" class="dialog-footer">
              <!-- <el-button @click="dialoglook = false">取 消</el-button> -->
              <el-button type="primary" @click="dialoglook = false">确 定</el-button>
              <!-- <el-button type="primary" @click="siteDisposal">现场处理</el-button> -->
            </span>
          </el-dialog>
          <remoteoperation @handleClose="remoteOperationClose" :setPropsId="setData" v-if="remoteOperationShow"/>
          <imageview v-if="dialogImage" :facilityPhoto="facilityPhoto" @closeImage="closeImg"/>
          <processing v-if="showProcess" :datas="discribution" @close="closeDealWith"></processing>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
import firecock from "./firecock.js";
export default firecock;
</script>
<style lang="scss">
@import "./firecock.scss";
@import "./children/devicedetail.scss";
</style>