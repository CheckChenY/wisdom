<template>
  <div class="device_dialog">
    <el-dialog
      title="设备详情"
      :visible.sync="dialogVisible"
      width="60%"
       @open="openBefore"
      :before-close="handleClose">
      <basic-container>
        <avue-tabs :option="option" @change="handleTabChange"></avue-tabs>
        <span v-if="type.prop==='tab1'" >
          <el-container class="contain_scroller">
            <el-main>
              <el-row>
                <el-col :span="12">
                  <div class="grid-content">
                    <span class="input_label">设备名称:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">烟感01</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">设备类型:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">烟感火灾探测器</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">设备安装位置:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">02</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">设备回路号:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">01</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">安装时间:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">2019-01-01</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">软件版本:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">1.0.1</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">生产日期:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">2019-01-01</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">设备使用状态:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">启用</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content">
                    <span class="input_label">设备标识码(SN):</span>
                    <div class="avatar-uploader">
                      <span class="input_content">Device01</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">所在建筑:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">大通1号楼</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">设备楼层/区域:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">2层</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">设备区号:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">02</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">设备点位号:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">21</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">设备型号:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">YG-001</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">生产厂家:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">海湾</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">有效期:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">3年</span>
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
        <span v-else-if="type.prop==='tab2'">
          <el-container class="contain_scroller">
            <el-main>
              <el-row>
                <el-col :span="12">
                  <div class="grid-content">
                    <span class="input_label">报警声级:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">>85dB（3m）</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">环境温度:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">0℃~49℃（32℉~120℉）</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">通信方式:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">NB-IOT无线数据发送</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">烟雾浓度告警值:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">0.6dB/m  可调浓度值范围（0.5dB/m~1dB/m）</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content">
                    <span class="input_label">传感器类型:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">光电式</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">相对湿度:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">10%~90%RH（无结露或结冰）</span>
                    </div>
                  </div>
                  <div class="grid-content">
                    <span class="input_label">通信时间间隔:</span>
                    <div class="avatar-uploader">
                      <span class="input_content">5 分钟</span>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-main>
            <el-footer>编辑</el-footer>
          </el-container>
        </span>
        <span v-else-if="type.prop==='tab3'">
          tab3tab3tab3
        </span>
        <span v-else-if="type.prop==='tab4'">
          系统升级中
        </span>
        <span v-else-if="type.prop==='tab5'">
          tab5tab5tab5
        </span>
        <span v-else-if="type.prop==='tab6'">
          tab6tab6tab6
        </span>
        <span v-else-if="type.prop==='tab7'">
          tab7tab7tab7
        </span>
      </basic-container>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import deviceDetail from './devicedetail.js'
export default deviceDetail
</script>
<style lang="scss">
@import './devicedetail.scss'
</style>

