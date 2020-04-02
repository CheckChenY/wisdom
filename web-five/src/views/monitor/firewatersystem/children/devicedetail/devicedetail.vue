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
                    <span class="input_label">设备名称:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">{{tabOneData.deviceName}}</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">设备类型:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">{{tabOneData.deviceType}}</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">设备安装位置:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">{{tabOneData.location}}</span>
                    </div>
                  </div>
                  <div class="grid-content">
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
                    <span class="input_label">软件版本:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">{{tabOneData.softwareVersion}}</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">生产日期:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">{{tabOneData.manufactureDate}}</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">设备使用状态:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">{{tabOneData.warnState}}</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content">
                    <span class="input_label">设备标识码(SN):</span>
                    <div class="avatar-uploader">
                      <span class="input_content">{{tabOneData.deviceCode}}</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">所在建筑:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">{{tabOneData.buildingId}}</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">设备楼层/区域:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">{{tabOneData.floorId}}</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">设备区号:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">{{tabOneData.areaCode}}</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">设备点位号:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">{{tabOneData.pointNumber}}</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">设备型号:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">Y{{tabOneData.deviceModel}}</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">生产厂家:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">{{tabOneData.manufacturer}}</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">有效期:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">{{tabOneData.validityTerm}}</span>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <div class="grid-content">
                    <span class="input_label">产权人照片:</span>
                    <div class="avatar-uploader">
                      <img src="http://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E5%9B%BE%E7%89%87&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=2687927787,2181890558&os=2177448733,2557696080&simid=3559833186,598495145&pn=159&rn=1&di=188822007990&ln=1659&fr=&fmq=1551488471380_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=78&objurl=http%3A%2F%2Fa3.topitme.com%2Fb%2Ff5%2F26%2F1123443480c9b26f5bo.jpg&rpstart=0&rpnum=0&adpicid=0&force=undefined" class="avatar">
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-main>
          </el-container>
        </span>
        <!--  -->
        <span v-else-if="type.prop==='tab2'">
          <el-container class="contain_scroll is-vertical">
            <el-main>
              <el-row>
                <el-col :span="12">
                  <div class="grid-content">
                    <span class="input_label">上报时间:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">{{tabTwoText.createTime}}</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">状态描述:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">{{tabTwoText.warn01}}</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content">
                    <span class="input_label">当前状态:</span>
                    <div class="avatar-uploader">
                      <span class="input_content" :class="[(discribution.warnState == 1 || discribution.warnState == 3) ? 'red':'',discribution.warnState == 2 ? 'yellow':'']">{{tabTwoText.warnState}}</span>
                    </div>
                  </div>
                  <!-- <div class="grid-content">
                    <span class="input_label">模拟量值:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">报警</span>
                    </div>
                  </div> -->
                </el-col>
                <el-col :span="24">
                  <div class="current_status">
                    <span class="cuttent_status_title">状态跟踪</span>
                  </div>
                  <div class="status_steps">
                    <el-steps direction="vertical" :active="statusSteps.length">
                      <el-step class="step_style" v-for="(item, i) in statusSteps" :key='i' :title="item.time" :description="item.description"></el-step>
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
                      :planFloor="'http://192.168.0.189/group1/M00/00/02/wKgAvVx3gaiAb_a6AAGOD4lAm4U036.jpg'"
                      :pointSign="'79.72,13.39'"
                      :pointClick="false"></device-position>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="img_title">设备现场图</div>
              <div class="img_content">
                <img src="http://192.168.0.189/group1/M00/00/02/wKgAvVx3gaiAb_a6AAGOD4lAm4U036.jpg">
              </div>
              <div class="view_button">
                <el-button @click="showImg('http://192.168.0.189/group1/M00/00/02/wKgAvVx3gaiAb_a6AAGOD4lAm4U036.jpg')">查看大图</el-button>
              </div>
            </el-col>
          </el-row>
        </span>
        <span v-else-if="type.prop==='tab4'">
          系统升级中
        </span>
        <span v-else-if="type.prop==='tab5'">
          <div class="status_div">
            <el-date-picker
              v-model="statusDateStart"
              type="month"
              size="small"
              class="status_date_pick"
              placeholder="开始日期">
            </el-date-picker>
            <el-date-picker
              v-model="statusDateEnd"
              type="month"
              size="small"
              class="status_date_pick"
              placeholder="结束日期">
            </el-date-picker>
            <el-button type="primary" size="small" icon="el-icon-search" @click="dateSearch">查询</el-button>
          </div>
          <div id="echartDynamic" class="status_chart"></div>
        </span>
        <span v-else-if="type.prop==='tab6'">
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
        <span v-if="type.prop==='tab7'">
          <div class="status_div">
            <el-date-picker
              v-model="statusDateStart"
              type="month"
              size="small"
              class="status_date_pick"
              placeholder="开始日期">
            </el-date-picker>
            <el-date-picker
              v-model="statusDateEnd"
              type="month"
              size="small"
              class="status_date_pick"
              placeholder="结束日期">
            </el-date-picker>
            <el-button type="primary" size="small" icon="el-icon-search" @click="dateSearch">查询</el-button>
          </div>
          <div id="echart" class="status_chart"></div>
        </span>
      </basic-container>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <image-view v-if="dialogImage" :facilityPhoto='facilityPhoto' @closeImage="closeImg"></image-view>
  </div>
</template>
<script>
import deviceDetail from './devicedetail.js'
export default deviceDetail
</script>
<style lang="scss">
@import './devicedetail.scss'
</style>

