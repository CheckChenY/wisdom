<template>
  <div>
    <el-dialog
      title="地图"
      :visible="dialogVisible"
      ref="dialog"
      width="50%"
      @open="open"
      @close="close"
      :before-close="handleClose">
      <div class="map">
        <div id="allmap"></div>
        <!-- <el-input
          placeholder="请输入内容"
          id="suggestId"
          @input="change"
          clearable>
        </el-input>
        <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import BMap from 'BMap'
//关于状态码 百度地图
const BMAP_STATUS_SUCCESS = 0 //BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
//BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
//BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
//BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
//BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
//BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
//BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
//BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
//BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)
export default {
name: 'BuildingMap',
props: {
  pointValue: {
    type: String,
  }
},
data() {
  return {
    dialogVisible: false,
    map: '',
    point: {
      lng: '',
      lat: '',
    }
  }
},
created() {
},
mounted() {
  // this.$refs.dialog.open();
  this.dialogVisible = true
},
methods: {
  // 加载地图
  initMap () {
    // 百度地图API功能
    this.map = new BMap.Map("allmap");
    let point = new BMap.Point(116.331398,39.897445);
    this.map.centerAndZoom(point,12);
    let geolocation = new BMap.Geolocation();
    let _this = this
    geolocation.getCurrentPosition(function(r){
      if(this.getStatus() == BMAP_STATUS_SUCCESS){
        let mk = new BMap.Marker(r.point);
        _this.map.addOverlay(mk);
        _this.map.panTo(r.point);
        console.log('您的位置：'+r.point.lng+','+r.point.lat);
      }
      else {
        console.log('failed'+this.getStatus());
      }        
    },{enableHighAccuracy: true})
    function showInfo(e){
      console.log(e.point.lng + ", " + e.point.lat);
      _this.point.lng = e.point.lng
      _this.point.lat = e.point.lat
      _this.map.clearOverlays();
      let marker = new BMap.Marker(e.point); // 创建点
      _this.map.addOverlay(marker); // 增加点
    }
    this.map.addEventListener("click", showInfo);
    this.map.enableScrollWheelZoom(); // 启用滚轮放大缩小，默认禁用
    this.map.enableContinuousZoom(); // 启用地图惯性拖拽，默认禁用
    if (this.pointValue) {
      this.map.addEventListener("tilesloaded",this.showBackIcon);
    }
  },
  // 回显标识
  showBackIcon () {
    let point = new BMap.Point(this.pointValue.split(',')[0], this.pointValue.split(',')[1]);
    this.map.tilesloaded
    this.map.clearOverlays();
    let marker = new BMap.Marker(point); // 创建点
    this.map.addOverlay(marker); // 增加点
  },
  // 自动搜索
  change () {
    
  },
  // 关闭地图
  handleClose () {
    // this.dialogVisible = false
    this.$emit('showMap')
  },
  // 确定选择
  handleSure () {
    if (!this.point.lng) {
      this.$message({message:'请选择位置'});
      return
    }
    // this.handleClose()
    this.$emit('getPoint', this.point)
  },
  // 打开弹窗
  open () {
    console.log('open')
    setTimeout(() => {
      this.initMap()
    });
  },
  // 关闭弹窗
  close () {
    console.log('close')
  }
},
}
</script>
<style lang="scss">
.map{
  height: auto;
}
#allmap{
  height: 300px;
}
</style>


