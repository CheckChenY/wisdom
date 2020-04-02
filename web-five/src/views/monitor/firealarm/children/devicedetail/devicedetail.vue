<template>
  <div class="device_dialog">
    <el-dialog
      title="设备详情"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <basic-container>
        <avue-tabs :option="option" @change="handleTabChange"></avue-tabs>
        <span v-if="type.prop==='tab1'" >
          <el-container class="contain_scroll">
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
                      <span class="input_content">{{deviceTypeDic[tabOneData.deviceType]}}</span>
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
                  <div class="grid-content" v-if="tabOneData.deviceType!=10 && tabOneData.deviceType!=3">
                    <span class="input_label">设备回路号:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">{{tabOneData.loopNumber}}</span>
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
                  <div class="grid-content" v-if="tabOneData.deviceType!=10 && tabOneData.deviceType!=3 && tabOneData.deviceType!=5 && tabOneData.deviceType!=6 && tabOneData.deviceType!=1 && tabOneData.deviceType!=7 && tabOneData.deviceType!=16 && tabOneData.deviceType!=11 && tabOneData.deviceType!=12">
                    <span class="input_label">设备区号:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">{{tabOneData.areaCode}}</span>
                    </div>
                  </div>
                  <div class="grid-content" v-if="tabOneData.deviceType!=10 && tabOneData.deviceType!=3">
                    <span class="input_label">设备点位号:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">{{tabOneData.pointNumber}}</span>
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
       
        <span v-else-if="type.prop==='tab2'">
          <el-container class="contain_scroll is-vertical">
            <el-main>
              <el-row>
                <el-col :span="12">
                  <div class="grid-content">
                    <span class="input_label">上报时间:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">{{discribution.dealCreateTime}}</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">状态描述:</span>
                    <div class="avatar-uploader">
                      <span class="input_content" :class="[(discribution.warnState == 1 || discribution.warnState == 3) ? 'red':'',discribution.warnState == 2 ? 'yellow':'']">{{distext}}</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content">
                    <span class="input_label">当前状态:</span>
                    <div class="avatar-uploader">
                      <span class="input_content" :class="[(discribution.warnState == 1 || discribution.warnState == 3) ? 'red':'',discribution.warnState == 2 ? 'yellow':'']">{{warnStateDic[discribution.warnState]}}</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="24">
                  <div class="current_status">
                    <span class="cuttent_status_title">状态跟踪</span>
                    <!-- <span class="status_handle" @click="dealWith" v-if="discribution.warnState != 0 && !discribution.firstViewTime">前往处理></span> -->
                  </div>
                  <div class="status_steps">
                    <el-steps direction="vertical" :active="RstatusSteps.length">
                      <el-step class="step_style" v-for="(item, i) in RstatusSteps" :key='i' :title="item.timestamp" :description="item.content"></el-step>
                    </el-steps>
                  </div>
                </el-col>
              </el-row>
            </el-main>
          </el-container>
        </span>
        <span v-else-if="type.prop==='tab3'">
          <el-row class="device_img">
            <el-col :span="18">
              <div class="img_title">设备可视化</div>
              <div class="img_content">
                <device-position :offsetY="0"
                      :offsetX="0"
                      :planFloor="planFloor"
                      :pointSign="pointSign"
                      :pointClick="false"></device-position>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="img_title">设备现场图</div>
              <div class="img_content">
                <img :src="tabOneData.surroundingPhoto">
              </div>
              <div class="view_button">
                <el-button @click="showImg(tabOneData.surroundingPhoto)">查看大图</el-button>
              </div>
            </el-col>
          </el-row>
        </span>
        <span v-else-if="type.prop==='tab4'">
          <!-- <v-html-panel :url.sync="'https://www.jianshu.com/p/e0d36c419519'"></v-html-panel> -->
          系统升级中
          <!-- <iframe :src="src" ref="iframe" style="height: 400px; width: 100%"></iframe> -->
        </span>
        <span v-else-if="type.prop==='tab5'">
          <basic-container class="status_record">
            <avue-crud ref="crud"
                      :page="page"
                      class="status_record"
                      :data="tableData"
                      :table-loading="tableLoading"
                      :option="tableOption"
                      @search-change="searchChange"
                      @search-reset="dialogReset">
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
                          :image="timeout?'/img/bg/404.svg':'/img/empty.png'"
                          :desc="timeout?'请求超时,请稍后重试······':'暂无数据'"
                          >
                        </avue-empty>
                      </template>
            </avue-crud>
          </basic-container>
        </span>
        <span v-if="type.prop==='tab6'">
          <div class="status_div">
            <span size="small">日期：</span>
            <el-date-picker
              v-model="statusDateStart"
              type="date"
              size="small"
              class="status_date_pick"
              placeholder="开始日期">
            </el-date-picker>
            <el-date-picker
              v-model="statusDateEnd"
              type="date"
              size="small"
              class="status_date_pick"
              placeholder="结束日期">
            </el-date-picker>
            <el-button type="primary" size="small" icon="el-icon-search" @click="dateSearch">查询</el-button>
          </div>
          <div id="echart" v-if="this.dataList && this.dataList.length > 0" class="status_chart"></div>
        </span>
      </basic-container>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <image-view v-if="dialogImage" :facilityPhoto='facilityPhoto' @closeImage="closeImg"></image-view>
    <processing v-if="showProcess" :datas="discribution" @close="closeDealWith"></processing>
  </div>
</template>
<script>
import deviceDetail from './devicedetail.js'
export default deviceDetail
</script>
<style lang="scss">
@import './devicedetail.scss'
</style>

