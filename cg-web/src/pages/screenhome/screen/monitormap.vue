<template>
    <div style="height: 100%;position: relative;">
        <div id="mapChart" style="width:100%;height:100%;"></div>
        <div style="position: absolute;top:0;left:0;right:0;height: 50px;display: flex;justify-content: center;align-items: center;">
            <p style="width:20%;color: #fff;font-size:18px;font-weight:900;">单位总数：{{dataObj.companyCount}}</p>
            <p style="width:20%;color: #fff;font-size:18px;font-weight:900;">设备总数：{{dataObj.deviceCount}}</p>
            <p style="width:20%;color: #fff;font-size:18px;font-weight:900;">待处理警情：{{dataObj.alarmCount}}</p>
            <p style="width:20%;color: #fff;font-size:18px;font-weight:900;">异常设备：{{dataObj.abnormalCount}}</p>
        </div>  
    </div>
</template>

<script>
import { atlasData,getCompanyDataCount } from '@/api/statistics/home'
import eventBus from './eventBus.js'
import BMap from 'BMap'
export default {
    props: ["visible"],
    data() {
        return {
            bmap: '',
            list: [],
            dataList: [],
            dialogVisible: false,
            dataObj:{},
            interval: ''
        };
    },
    created() {
        this.interval = setInterval(() => {
            this.getDataMap()
            this.getTopData()
        },30 * 1000)
    },
    watch: {
        visible() {
            this.dialogVisible = this.visible
        }
    },
    mounted() {
        var that = this
        that.dialogVisible = that.visible
        this.getDataMap()
        eventBus.$on("getPosition", (data) => {
            that.setPoint(data)
        })
        this.getTopData()
    },
    methods: {
        getTopData(){
            getCompanyDataCount().then(res=>{
                if(res && res.data && res.data.success){
                    this.dataObj=res.data.value
                }
            })
        },
        initMap(defaultPoint, point) {
            console.log(point[3])
            var that=this
            //地图
            var mapChart = this.$echarts.init(document.getElementById('mapChart'));
            mapChart.setOption({
                bmap: {
                    center: defaultPoint,
                    zoom: 12,
                    roam: true,
                },
                tooltip: {
                    trigger: 'item',
                    padding: 10,
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    formatter: function (obj) {
                        var value = obj.value;
                        return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 14px;padding-bottom: 7px;margin-bottom: 7px;color: #fff; ">' +
                            '单位：' + (value[2] ? value[2] : '无') + '<br>' +
                            '</div>' +
                            '单位类型：' + ((value[3]=='1')?'社会单位':(value[3]=='2')?'监管单位':value[3]=='3' ?'总公司':'代理商') + '<br>' +
                            '设备总数量：' + (value[4] ? value[4] : '无') + '台<br>' +
                            '消防设备：' + (value[5] ? value[5] : '无') + '台<br>' +
                            '视频设备：' + (value[6] ? value[6] : '无') + '台<br>' +
                            '异常设备：' + (value[7] ? value[7] : '无') + '台<br>' +
                            '未处理警情：' + (value[8] ? value[8] : '无') + '次<br>' +
                            '联系人：' + (value[9] ? value[9] : '无') + '<br>' +
                            '联系电话：' + (value[10] ? value[10] : '无') + '<br>' +
                            '单位地址：' + (value[11] ? value[11] : '无') + '<br>' 
                    },
                },
                legend: {
                    right: 10,
                    bottom: 10,
                    data: ['报警', '正常', '故障', '离线'],
                    textStyle: {
                        color: '#fff',
                        fontSize: 14
                    }
                },
                series: [{
                    name: '报警',
                    type: 'effectScatter',
                    coordinateSystem: 'bmap',
                    symbol: 'pin',
                    showEffectOn: 'render',
                    symbolSize: 40,
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    data: point[0],
                    itemStyle: {
                        normal: {
                            color: '#fd3e3c',
                        }
                    }
                }, {
                    name: '正常',
                    type: 'scatter',
                    coordinateSystem: 'bmap',
                    symbol: 'pin',
                    symbolSize: 40,
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    data: point[2],
                    itemStyle: {
                        normal: {
                            color: '#5cdd00',
                        }
                    }
                }, {
                    name: '故障',
                    type: 'scatter',
                    coordinateSystem: 'bmap',
                    symbol: 'pin',
                    symbolSize: 40,
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    data: point[1],
                    itemStyle: {
                        normal: {
                            color: '#ffbb2a',
                        }
                    }
                }, {
                    name: '离线',
                    type: 'scatter',
                    coordinateSystem: 'bmap',
                    symbol: 'pin',
                    symbolSize: 40,
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    data: point[3],
                    itemStyle: {
                        normal: {
                            color: '#a6a6a6',
                        }
                    }
                }]
            },true);
            this.bmap = mapChart.getModel().getComponent('bmap').getBMap()
            this.bmap.enableMapClick = false
            this.bmap.addControl(new BMap.MapTypeControl({
                mapTypes: [BMAP_NORMAL_MAP,BMAP_SATELLITE_MAP,BMAP_HYBRID_MAP ]
            }));
            this.bmap.setMapStyle({
                style: 'midnight'
            })
            mapChart.on('click', function (para) {
                let len=para.data.length
                that.$router.push({
                    path:'/screencompany',
                    query:{companyId:para.data[len-1]}
                })
            })
        },
        // 获取地图数据
        getDataMap() {
            atlasData().then(res => {
                if (res && res.data && res.data.success) {
                    var defaultPoint = []
                    var alarmData = []
                    var normalData = []
                    var defaultData = []
                    var outlineData = []
                    if (res.data.value.length) {
                        res.data.value.forEach(s => {
                            s.lon = s.position.split(',')[0]
                            s.lat = s.position.split(',')[1]
                            if(s.orgDeviceCount){
                                s.allCount = s.orgDeviceCount.allCount
                                s.deviceCount = s.orgDeviceCount.deviceCount
                                s.cameraCount = s.orgDeviceCount.cameraCount
                                s.abnormalDeviceCount = s.orgDeviceCount.abnormalDeviceCount
                                s.untreatedAlarmCount = s.orgDeviceCount.untreatedAlarmCount
                            }
                        })
                        var key = ['lon', 'lat', 'companyName', 'companyType', 'allCount', 'deviceCount',
                            'cameraCount', 'abnormalDeviceCount', 'untreatedAlarmCount','linkman','phone','location','companyId'
                        ]
                        var o = res.data.value[0]
                        key.forEach(t => {
                            defaultPoint.push(o[t])
                        })
                        res.data.value.forEach(s => {
                            if (s.state == '4') {
                                var element = []
                                key.forEach(t => {
                                    element.push(s[t])
                                })
                                outlineData.push(element)
                            }
                            if (s.state == '0') {
                                var element = []
                                key.forEach(t => {
                                    element.push(s[t])
                                })
                                normalData.push(element)
                            }
                            if (s.state == '2') {
                                var element = []
                                key.forEach(t => {
                                    element.push(s[t])
                                })
                                defaultData.push(element)
                            }
                            if (s.state == '1') {
                                var element = []
                                key.forEach(t => {
                                    element.push(s[t])
                                })
                                alarmData.push(element)
                            }
                        })
                        var point = []
                        point.push(alarmData)
                        point.push(defaultData)
                        point.push(normalData)
                        point.push(outlineData)
                        this.initMap(defaultPoint, point)
                        this.bmap.centerAndZoom(new BMap.Point(defaultPoint[0], defaultPoint[1]), 9);
                    }else{
                        this.initMap(["110", "37", "", "", "", "", "", ""],[[],[],[],[]])
                        this.bmap.centerAndZoom(new BMap.Point(105.3359375000, 30.1375511923), 4);
                    }
                }
            })
        },
        // 点击设备地图标记
        setPoint(item) {
            var that = this
            let longitude = item.position.split(',')[0]
            let latitude = item.position.split(',')[1]
            this.bmap.closeInfoWindow()
            var sContent = "<div><h4 style='font-weight:600;font-size:15px;z-index:10000;'>报警信息</h4>" +
                "<div style='width: 300px; margin-left:10px;font-size:12px;>" +
                "<span style='margin:0;font-size:12px;text-indent:2em'>上报时间：</span>" +
                "<span style='margin:0;font-size:12px;text-indent:2em'>" + item.createTime + "</span>" +
                "</div>" +
                "<div style='width: 300px; margin-left:10px;font-size:12px;>" +
                "<span style='margin:0;font-size:12px;text-indent:2em'>单位名称：</span>" +
                "<span style='margin:0;font-size:12px;text-indent:2em;'>" + item.orgName + "</span>" +
                "</div>" +
                "<div style='width: 300px; margin-left:10px;font-size:12px;>" +
                "<span style='margin:0;font-size:12px;text-indent:2em'>设备名称：</span>" +
                "<span style='margin:0;font-size:12px;text-indent:2em;color:rgb(5,133,255)'>" + item.deviceName + "</span>" +
                "</div>" +
                "<div style='width: 300px; margin-left:10px;font-size:12px;>" +
                "<span style='margin:0;font-size:12px;text-indent:2em'>设备类型：</span>" +
                "<span style='margin:0;font-size:12px;text-indent:2em'>" + item.deviceType + "</span>" +
                "</div>" +
                "<div style='width: 300px; margin-left:10px;font-size:12px;>" +
                "<span style='margin:0;font-size:12px;text-indent:2em'>安装位置：</span>" +
                "<span style='margin:0;font-size:12px;text-indent:2em;color:rgb(5,133,255)'>" + item.location + "</span>" +
                "</div>" +
                "<div style='width: 300px; margin-left:10px;font-size:12px;>" +
                "<span style='margin:0;font-size:12px;text-indent:2em'>警情类型：</span>" +
                "<span style='margin:0;font-size:12px;text-indent:2em;color:rgb(5,133,255)'>" + item.alarmDetails + "</span>" +
                "</div>" +
                "<div style='width:100%;height:66px;padding-top:10px;margin-top:6px;font-size:12px;background:rgb(236,242,249);'>" +
                "<div style='width:100%;height:45%;display:flex;'>" +
                "<div style='height:45%;font-size:12px;margin-left:8px;'>" +
                '联系人:' + item.linkman +
                "</div>" +
                "<div style='height:45%;font-size:12px;margin-left:18px;'>" +
                '联系电话:' + item.phone +
                "</div>" +
                "</div>" +
                "<div style='width:100%;height:55%;margin-left:8px;'>" +
                "<div style='height:55%;font-size:12px;'>" +
                '单位地址:' + item.companyLocation +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "<div style='width: 300px; margin-left:10px;font-size:12px;>" +
                "<span style='margin:0;font-size:12px;text-indent:2em'>查看监控：</span>" +
                "<span id='seeMonitor' style='margin:0;font-size:12px;text-indent:2em;color:rgb(5,133,255);cursor:pointer;'>点击查看</span>" +
                "</div>"
            var infoWindow = new BMap.InfoWindow(sContent); // 创建信息窗口对象
            var point = new BMap.Point(longitude, latitude);
            this.bmap.openInfoWindow(infoWindow, point);

            setTimeout(() => {
                var oseeMonitor = document.getElementById('seeMonitor')
                oseeMonitor.addEventListener('click', () => {
                    console.log('开监控')
                    that.$emit('showVideo', item)
                })
            })
        }
    },
    destroyed () {
        clearInterval(this.interval)
    }
};
</script>