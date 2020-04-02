<template>
  <div class="devicemap">
    <div class="data_list">
      <div class="data_left">
        <div class="data_show border_style">
          <span>网关数量：</span>
          <span>{{form.NetNumbers}}个</span>
        </div>
        <div class="data_show border_style">
          <span>空开数量：</span>
          <span>{{form.getWayNumbers}}台</span>
        </div>
      </div>
      <div  class="data_right">
        <div class="data_show border_style">
          <span>报警次数：</span>
          <span>{{form.alarm}}次</span>
        </div>
        <div class="data_show border_style">
          <span>离线空开：</span>
          <span>{{form.offLine}}个</span>
        </div>
      </div>
    </div>
    <div class="chart-box-map">
      <div id="mapChart" style="width:100%;height:100%;"></div>
    </div>
    <!-- <div class="border_style legend_show">
      <span class="legend_nuit">
        <span class="color_block green"></span>
        <span>正常</span>
      </span>
      <span class="legend_nuit">
        <span class="color_block red"></span>
        <span>报警</span>
      </span>
      <span class="legend_nuit">
        <span class="color_block gray"></span>
        <span>离线</span>
      </span>
    </div> -->
  </div>
</template>

<script>
import { getMyNetNumbers } from "@/api/screen/screen";
import { findAllNet } from "@/api/public"
import BMap from 'BMap'
export default {
  name: "devicemap",
  data () {
    return {
      bmap:'',
      form: {}
    };
  },
  computed: {
  },
  created(){
    this.getMyNetNumbers()
  },
  mounted () {
    this.getDataMap()
  },
  methods: {
    initMap (defaultPoint, point) {
			//地图
			var mapChart = this.$echarts.init(document.getElementById('mapChart'));
      mapChart.setOption({
        bmap: {
          center: defaultPoint,
          zoom: 12,
          roam: true,
        },
        tooltip : {
          trigger: 'item',
          padding: 10,
          backgroundColor: '#222',
          borderColor: '#777',
          borderWidth: 1,
          formatter: function (obj) {
              var value = obj.value;
              return '设备名称：' + (value[2]?value[2]:'无')
          }
        },
        series: [{
          name: '正常',
          type: 'scatter',
          coordinateSystem: 'bmap',
          symbol: 'image:///img/screen/mapicon1.png',
          symbolSize: 40,
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          data: point,
          itemStyle: {
            normal: {
              color: '#95ce33'
            }
          },
        }]
			});
			this.bmap = mapChart.getModel().getComponent('bmap').getBMap()
			this.bmap.enableMapClick = false
			this.bmap.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_SATELLITE_MAP ]}));
			// this.bmap.setMapStyle({style:'midnight'})
    },
    // 获取地图数据
    getDataMap () {
      findAllNet().then(res=>{
        let point = []
        if(res && res.data && res.data.status === 0){
          res.data.data.forEach(s => {
            if (s.pointSign) {
              let pt = s.pointSign.split(',')
              let pointArr = [pt[1], pt[0]]
              pointArr.push(s.deviceName)
              point.push(pointArr)
            }
          })
        }
        if (point.length === 0) {
          point = [[113.774138,34.719612,'']]
        }
        this.initMap(point[0],point)
      })
    },
    // 获取地图数据
    getMyNetNumbers () {
      getMyNetNumbers().then(res => {
        if (res && res.data && res.data.status === 0) {
          this.form = res.data.data
        }
      })
    }
  }
};
</script>

<style lang="scss">
$color: #fff;
.devicemap{
  position: relative;
  width: 100%;
  height: 540px;
  border: #2d7cfb 1px solid;
  .chart-box-map{
    position: absolute;
    top: 0px;
    bottom: 0;
    margin: auto;
    left: 0;
    right: 0;
    height: auto;
  }
  .data_list{
    position: absolute;
    top: 10px;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    .data_show{
      color: #00fafd;
      font-size: 16px;
      height: 30px;
      line-height: 30px;
      padding: 0px 15px;
      margin: 0px 20px;
    }
    .data_left{
      display: flex;
    }
    .data_right{
      display: flex;
      width: 400px;
    }
  }
  .legend_show{
    position: absolute;
    bottom: 10px;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    color: #b3c8ff;
    font-size: 15px;
    width: 300px;
    right: 20px;
    .legend_nuit{
      height: 40px;
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0px 10px;
      .color_block{
        display: inline-block;
        width: 27px;
        height: 17px;
        margin: 0px 10px;
      }
      .green {
        background: #95ce33;
      }
      .red {
        background: #ed3d30;
      }
      .gray {
        background: #c6c7c7;
      }
    }
    
  }
  .border_style{
    background-color: rgba(16,32,105,0.8);
    filter:Alpha(opacity=50);/* 只支持IE6、7、8、9 */
    box-shadow:#2b4cba 0px 0px 18px inset;
  }
}


</style>
