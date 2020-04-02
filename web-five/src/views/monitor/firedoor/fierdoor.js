import statist from '@/components/public/statisti-analysis.vue';
import deviceposition from "@/components/public/device-position";
import imageview from '@/components/public/image-view'
import remoteoperation from './children/remoteOperation.vue';

import {
    tableOption,
    dialogTable
} from '@/const/monitor/fierdoor';

import {
    fetchTree,
    fetchFloorList,
    getObj
} from '@/api/unit/floor';

import {
    getWaringTree, //获取设备类型树
    searchTableList,
} from '@/api/monitor/firewirless';
import {
    getEquipment, //设备信息
    getMotesystem, //當前狀態
    getUnitdevice, //相關圖片
    getRecord, //相關記錄
    getAnaly, //状态分析
} from '@/api/monitor/firewirless'

import {
    getDict
} from "@/api/unit/dict";
import {
    analysisList,
    analysisListone
} from "@/api/monitor/industry";
import {
    getWarnMsg
} from "@/util/warn";
import { getLine } from '@/util/lineChart';
let indexObj = 0,
    arrayObj = []
export default {
    name: 'firedoor_index',
    components: {
        statist,
        deviceposition,
        imageview,
        remoteoperation
    },
    data() {
        return {
            echartsdatax: [],
            echartsdatay: [],
            elshownum: {},
            showindex: "monitoring",
            dialoglook: false,
            dialogImage: false,
            remoteOperationShow: false,
            facilityPhoto: "",
            showType: "tab1",
            myCharts: '',
            chartOptions: {},
            discribution: {}, //当前状态描述
            distext: "", //状态描述
            planFloor: "",
            pointSign: "",
            STATUS: [],
            statusobj: {},
            statusDateStarts: "",
            statusDateEnds: "",
            // 状态跟踪参数
            RstatusSteps: [
                {
                    content: "支持使用图标",
                    timestamp: "2018-04-12 20:46",
                    size: "large",
                    type: "primary",
                    icon: "el-icon-more"
                },
                {
                    time: '2019-01-02 08:35:08',
                    description: '感烟火灾探测器01，位于大通工业园3号楼，5层，501室，当前状态：报警；状态描述：设备报警，警情程度为严重。'
                  },
                  {
                    time: '2019-01-02 08:35:08',
                    description: '感烟火灾探测器01，位于大通工业园3号楼，5层，501室，当前状态：报警；状态描述：设备报警，警情程度为严重。'
                  },
                  {
                    time: '2019-01-02 08:35:08',
                    description: '感烟火灾探测器01，位于大通工业园3号楼，5层，501室，当前状态：报警；状态描述：设备报警，警情程度为严重。'
                  },
            ],
            // tab切换
            electricOption: {
                column: [{
                        label: "设备实时监测列表",
                        prop: "monitoring"
                        // icon: "el-icon-picture",
                    },
                    {
                        label: "统计分析",
                        prop: "pandect"
                        // icon: "el-icon-date",
                    },

                ],
            },
            // 表格页码
            page: {
                total: 0, // 总页数
                currentPage: 1, // 当前页数
                pageSize: 6 // 每页显示多少条
            },
            listQuery: {
                page: 1,
                limit: 6,
                systemId: 6,
            },
            // 弹窗切换
            electrictabOptions: {
                column: [{
                        // icon:'el-icon-info',
                        label: '设备信息',
                        prop: 'tab1',
                    }, {
                        // icon:'el-icon-warning',
                        label: '当前状态',
                        prop: 'tab2',
                    }, {
                        // icon:'el-icon-warning',
                        label: '相关图片',
                        prop: 'tab3',
                    }, {
                        // icon:'el-icon-warning',
                        label: '关联视频',
                        prop: 'tab4',
                    },
                    {
                        // icon:'el-icon-warning',
                        label: '动态曲线',
                        prop: 'tab5',
                    },
                    {
                        // icon:'el-icon-warning',
                        label: '状态记录',
                        prop: 'tab6',
                    }, {
                        // icon:'el-icon-warning',
                        label: '状态分析',
                        prop: 'tab7',
                    }
                ]
            },

            // 表格数据
            tableData: [],
            tableOption: tableOption,
            dialogTable: dialogTable,
            search: {
                slot: ''
            },
            dialogVisible: false,
            equipmentData: [], //设备类型树
            defaultProps: {
                children: "children",
                label: "label",
                id: "id"
            },
            // 树形过滤
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            filterText: '', //搜索字段
            treepanId: '',
            typeValue: '',
            setData: '',

            statuspage: {
                total: 0, // 总页数
                currentPage: 1, // 当前页数
                pageSize: 6 // 每页显示多少条
            },

            // 状态查询数据
            tableStatus: [],
            tabOneData: {
                deviceId: "", //设备名称
                deviceName: "", //设备名称
                deviceCode: "", //设备标识码
                deviceType: "", //设备类型
                buildingId: "", //所在建筑

                floorId: "", //设备楼层
                location: "", //设备安装位置
                areaCode: "", //设备区号
                loopNumber: "", //设备回路号
                pointNumber: "", //设备点位号

                installTime: "", //安装时间
                deviceModel: "", //设备型号
                softwareVersion: "", //软件版本
                manufacturer: "", //生产厂家
                manufactureDate: "", //生产日期

                validityTerm: "", //有效期
                warnState: "", //设备使用状态
                surroundingPhoto: "", //周边图
            },
            offlineAmount: [], //离线设备数量
            alarmAmount: [], //报警设备数量
            faultAmount: [], //故障数量
            dataList: [], //x轴日期坐标
            logObj: {
                logDateStart: "",
                logDateEnd: "",
                deviceId: "",
            },
            listQueryChliren: {
                page: 1,
                limit: 6,
                deviceId: ''
            },
            dialogData: [],

            dialogPage: {
                total: 0, // 总页数
                currentPage: 1, // 当前页数
                pageSize: 6 // 每页显示多少条
            },

            // 状态查询数据
            tableStatus: [{
                statustime: "2019-01-05",
                channalstatus: "正常",
                disstatues: "消火栓箱故障"
            }],
            tableLoading: false,
            timeout:false,
            timeout1:false,
            search: {
                createTimeStart: '',
                createTimeEnd: '',
            },
            statusDes: '',
        }
    },
    created() {
        this.getList(this.listQuery);
        this.getWaring();
        this.tableOption.column[2].click = ({
            value
        }) => {
            this.getFloorTree(value)
        }
        this.getBuildingTree();
        // this.getSystemType();
    },
    computed: {

    },
    watch: {
        filterText(val) {
            this.$refs.typeref.filter(val);
        },
        // deep:true
    },
    mounted() {
        this.statusType();
        // setTimeout(()=>{
        //     this.filter();
        // })
        this.getEchartdata()
    },
    methods: {
        getList(params) {
            this.tableLoading = true
            searchTableList(params).then(response => {
                if (response && response.data && response.data.code == 0) {
                    this.tableData = response.data.data
                    this.page.total = response.data.total
                    setTimeout(() => {
                        this.tableLoading = false
                    }, 1000)
                }
            }).catch(error=>{
                this.tableLoading = false
                if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
                this.timeout=true
                }
            })
        },
        getBuildingTree() {
            fetchTree({
                limit: 100
            }).then(res => {
                if (res && res.data && res.data.data) {
                    let data = res.data.data
                    this.$set(this.tableOption.column[3].dicData.splice(0, this.tableOption.column[3].dicData.length))
                    console.log(this.tableOption.column[3].dicData.splice(0, this.tableOption.column[3].dicData.length))
                    if (data.building) {
                        for (let i = 0, len = data.building.length; i < len; i++) {
                            let dict = {
                                value: data.building[i].id,
                                label: data.building[i].buildingCode
                            }
                            this.tableOption.column[3].dicData.push(dict);
                        }
                        arrayObj = this.tableOption.column[3].dicData.concat()
                        this.callSelfFloor()
                        this.tableOption.column[3].valueDefault = data.building[0].id
                    }
                }
            })
        },
        // 递归遍历建筑
        callSelfFloor() {
            if (arrayObj[indexObj]) {
                this.getFloorAllTree(arrayObj[indexObj].value).then(() => {
                    indexObj++
                    if (indexObj > arrayObj.length) {
                        arrayObj = []
                        indexObj = 0
                        return
                    }
                    this.callSelfFloor()
                })
            }
        },
        // 获取全部楼层
        getFloorAllTree(id) {
            return new Promise((resolve, reject) => {
                fetchFloorList({
                    buildingId: id,
                    limit: 200,
                }).then(res => {
                    if (res && res.data && res.data.data) {
                        let data = res.data.data
                        for (let i = 0, len = data.length; i < len; i++) {
                            let dict = {
                                value: data[i].id,
                                label: data[i].floorCode,
                            }
                            if (this.tableOption.column[4].dicData.indexOf(dict) == -1) {

                                this.tableOption.column[4].dicData.push(dict)
                            }
                        }
                        resolve()
                    } else {
                        reject()
                    }
                })
            })
        },
        inputClick(val) {
            console.log(val);
            this.dialogVisible = true
            this.getWaring();
        },
        // 多选发生改变
        handleNodeClick(item, node, self) {
            if(item.children.length){
                return
            }
            // console.log(item);
            //console.log(data);
            //console.log(node);
            if (node == true) {
                this.treepanId = item.id;
                this.search.slot = item.label;
                this.$refs.typeref.setCheckedNodes([item]);
            }
        },
        // 多选点击已选
        nodeClick(item, node, self) {
            if(item.children.length){
                return
            }
            this.treepanId = item.id;
            this.search.slot = item.label;
            this.$refs.typeref.setCheckedNodes([item]);
        },
        // //获取设备类型
        getSystemType(data) {
            this.tableOption.column[2].dicData = []
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].children.length; j++) {
                    let obj = {
                        label: data[i].children[j].label,
                        value: data[i].children[j].value
                    }
                    this.tableOption.column[2].dicData.push(obj)
                }
                this.tableOption.column[2].valueDefault = data[0].children.value
            }
        },
        getWaring(id) {
            getWaringTree({
                type: "device_type,system_type",
                level: "1"
            }).then(res => {
                if (res && res.data) {
                    for (var ins in res.data.data.filter(s=>s.value==6)) {
                        res.data.data.filter(s=>s.value==6)[ins].disabled = true;
                    }
                    this.equipmentData = res.data.data.filter(s=>s.value==6);
                    this.getSystemType(this.equipmentData);
                }
            })
        },
        // 获取楼层
        getFloorTree(id) {
            fetchFloorList({
                buildingId: id,
                limit: 200,
            }).then(res => {
                if (res && res.data && res.data.data) {
                    let data = res.data.data
                    this.$set(this.floorData.splice(0, this.floorData.length))
                    for (let i = 0, len = data.length; i < len; i++) {
                        let dict = {
                            value: data[i].id,
                            label: data[i].floorCode,
                        }
                        this.floorData.push(dict)
                    }
                }
            })
        },
        // 获取统计图数据
        getEchartdata() {
            analysisList(6).then(res => {
                this.echartsdatay = res.data.data
            })
            // 获取最近一天数据
            analysisListone({systemType:6}).then(res => {
                // console.log(res)
                this.elshownum = res.data.data;
            })
            getDict("alarm_status").then(res => {
                this.echartsdatax = res.data.data
            })
        },
        //相关图片
        getUnitdeviceImg(id) {
            getUnitdevice(id).then(res => {
                this.pointSign = res.data.data.pointSign;
                this.statusDes = res.data.data.statusDes;
                getObj(res.data.data.floorId).then(resdata => {
                    this.planFloor = resdata.data.data.plan

                })
                // debugger;
            })
        },
        // tab切换
        clickChange(item) {
            console.log(item)
            this.showindex = item.prop;
            this.getEchartdata()
        },
        // 状态选择
        statusType() {
            getDict("device_state").then(res => {

                if (res && res.data) {
                    // console.log(res.data);
                    this.tableOption.column[6].dicData = res.data.data
                }
            });
        },
        // 搜索
        searchChange(params) {
            params.limit = this.listQuery.limit;
            params.systemId = this.listQuery.systemId;
            params.deviceType = this.treepanId;

            searchTableList(params).then(res => {
                if (res && res.data && res.data.data) {
                    this.tableData = res.data.data;
                    this.page.total = res.data.total;
                }
            })

            // this.$message.success(JSON.stringify(params))
        },
        // 重置搜索
        searchReset() {

        },
        //   刷新表格
        refreshChange() {

        },
        // 切换页面
        currentChange() {

        },
        // 表格大小改变
        sizeChange() {

        },
        //表格查看点击
        handleShow(row) {
            this.dialoglook = true;
            this.setData = row;
            this.getEquipmentInt(row.row.id);
            this.getUnitdeviceImg(row.row.deviceId)
        },
        // 远程操作
        remotedoit(data) {
            this.remoteOperationShow = true
        },
        // 远程操作关闭前
        remoteOperationClose() {
            this.remoteOperationShow = false
        },
        //弹窗打开前
        openBefore() {

        },
        // 弹窗关闭前
        handleClose() {
            this.dialoglook = false;
            this.dialogVisible = false;
        },
        // 弹窗tab切换
        handleTabChange(item) {
            this.showType = item.prop
            if (item.prop == 'tab1') {
                this.getEquipmentInt(this.setData.id);
            } else if (item.prop == 'tab2') {
                this.getCurrentStatus(this.setData.row.deviceId);
            } else if (item.prop == 'tab5') {
                this.getDynamic({deviceId:this.setData.row.deviceId,page: 1,limit: 8});
            } else if (item.prop == 'tab6') {
                this.listQueryChliren.deviceId = this.setData.row.id;
                this.getUnitRecord({
                    deviceId: this.setData.row.deviceId
                });
            } else if (item.prop == 'tab7') {
                this.getAnalyCharts({
                    deviceId: this.setData.row.deviceId
                }, "echartfenxi", "状态趋势");
            }
        },
        getEquipmentInt(id) {
            getEquipment(id).then(res => {
                if (res && res.data) {
                    let dataList = res.data.data
                    this.tabOneData.deviceId = dataList.deviceId //设备ID
                    this.tabOneData.deviceName = dataList.deviceName //设备名称
                    this.tabOneData.deviceCode = dataList.deviceCode //设备标识码
                    this.tabOneData.deviceType = dataList.deviceType //设备类型
                    this.tabOneData.buildingId = dataList.buildingId //所在建筑

                    this.tabOneData.floorId = dataList.floorId //设备楼层
                    this.tabOneData.location = dataList.location //设备安装位置
                    this.tabOneData.areaCode = dataList.areaCode //设备区号
                    this.tabOneData.loopNumber = dataList.loopNumber //设备回路号
                    this.tabOneData.pointNumber = dataList.pointNumber //设备点位号

                    this.tabOneData.installTime = dataList.installTime //安装时间
                    this.tabOneData.deviceModel = dataList.deviceModel //设备型号
                    this.tabOneData.softwareVersion = dataList.softwareVersion //软件版本
                    this.tabOneData.manufacturer = dataList.manufacturer //生产厂家
                    this.tabOneData.manufactureDate = dataList.manufactureDate //生产日期

                    this.tabOneData.validityTerm = dataList.validityTerm //有效期
                    this.tabOneData.warnState = dataList.warnState //设备使用状态
                    this.tabOneData.surroundingPhoto = dataList.surroundingPhoto //周边图
                }
            })
        },
        //相关记录
        getUnitRecord(id) {
            this.tableLoading = true
            getRecord(id).then(res => {
                if (res && res.data) {
                    let data = res.data.data;
                    data.forEach(s=>{
                        s.statusDes = this.statusDes
                        s.stateDesc=getWarnMsg(s)
                    })
                    this.tableStatus = data;
                    this.statuspage.total = res.data.total;
                    setTimeout(() => {
                        this.tableLoading = false
                    }, 1000)
                }
            }).catch(error=>{
                this.tableLoading = false
                if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
                this.timeout1=true
                }
            })
        },
        //动态曲线数据
        getDynamic(obj){
            getRecord(obj).then(res=>{
                if(res&&res.data){
                    let data = res.data.data
                    console.log(data);
                    // let resName1 = ['Ua','Ub','Uc','过压阀值','欠压阀值'];
                    // let resColor1 = ['#2f4554','#61a0a8','#d48265','#ffbb2a','#fd3e3c'];

                    // let resName2 = ['Ia','Ib','Ic','过载阀值'];
                    // let resColor2 = ['#2f4554','#61a0a8','#d48265','#fd3e3c'];
                    
                    // let resName3 = ['漏电报警阀值','漏电值'];
                    // let resColor3 = ['#ffbb2a','#fd3e3c'];

                    // let resName4 = ['A相','B相','C相','零线'];
                    // let resColor4 = ['#2f4554','#61a0a8','#ffbb2a','#fd3e3c'];

                    // let lineObj = getLine(data);

                    // setTimeout(() => {
                    //     this.lineCharts("echartLines","三相电压变化曲线",lineObj.resOne,lineObj.serTime,resName1,resColor1,'电压:V')
                    //     this.lineCharts("echartLinesEle","三相电流变化曲线",lineObj.resTwo,lineObj.serTime,resName2,resColor2,'电压:V')
                    //     this.lineCharts("echartLinesOne","漏电变化曲线",lineObj.resTre,lineObj.serTime,resName3,resColor3,'电流:MA')
                    //     this.lineCharts("echartLinesEleTwo","三相四线温度变化曲线",lineObj.resFou,lineObj.serTime,resName4,resColor4,'温度:℃')
                    // })
                }
            })
        },
        //动态曲线图
        lineCharts(id,title,ser,serTime,resName,resColor,text) {
            var dom = document.getElementById(id);
            if (!dom) {
                return
            }
            this.myCharts = this.$echarts.init(dom);
            this.myCharts.clear()

            let serObj = [];
            for(let i=0;i<ser.length;i++){
                let series= {}
                series['data'] = ser[i];
                series['type'] = 'line';
                series['name'] = resName[i];
                series['itemStyle'] = {'color': resColor[i]};
                serObj.push(series)
            }
            console.log(ser.serTime)

            this.chartOptions = {
                title: {
                    text: title
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        let relVal = ''
                        let unit = text.split(':')[1]
                        for (let i = 0, len = params.length; i < len; i++) {
                            relVal += params[i].seriesName + ': ' + params[i].value + ' ' + unit + '<br />'
                        }
                        return relVal;
                    }
                },
                legend: {
                    data:resName
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: serTime
                },
                yAxis: {
                    type: 'value',
                    name: text,
                },
                series: serObj
            };

            this.myCharts.setOption(this.chartOptions);
        },
        //状态分析
        getAnalyCharts(obj, id, title) {
            getAnaly(obj).then(res => {
                if (res && res.data) {
                    let data = res.data.data
                    for (let i = 0, len = data.length; i < len; i++) {
                        this.offlineAmount.push(data[i].offlineAmount)
                        this.alarmAmount.push(data[i].alarmAmount)
                        this.faultAmount.push(data[i].faultAmount)
                        this.dataList.push(data[i].logDate.substring(0, 7))
                    }
                    setTimeout(() => {
                        this.lineChart(id, title)
                    })
                }
            })
        },
        //当前状态
        getCurrentStatus(id) {
            getMotesystem(id).then(res => {
                // console.log(this.setPropsId);
                var stutasData = res.data.data;
                if (stutasData) {
                    this.discribution = stutasData;
                    if (stutasData.createTime != null) {
                      this.discribution.createTime = stutasData.createTime.replace(
                        "T",
                        " "
                      ).split('.')[0];
                    }
                }
                this.distext = getWarnMsg(stutasData)
                if (stutasData != null) {
                    if (stutasData.createTime && stutasData.createTime != null) {
                        var createTime = stutasData.createTime.replace("T", " ").split('.')[0];
                        this.RstatusSteps[0].time = createTime;
                        this.RstatusSteps[0].description =
                            stutasData.deviceName +
                            ",位于" +
                            this.alarparticulars.processbuild +
                            "," +
                            this.alarparticulars.processfloor +
                            "," +
                            this.alarparticulars.speclocation +
                            "," +
                            "当前状态:" +
                            this.alarparticulars.processcondition +
                            "," +
                            "报警程度:" +
                            stutasData.warnLevel;
                    } else {
                        this.RstatusSteps.splice(0, this.RstatusSteps.length);
                    }

                } else {
                    this.RstatusSteps.splice(0, this.RstatusSteps.length);
                }
                if (stutasData != null) {
                    if (stutasData.firstViewTime && stutasData.firstViewTime != null) {
                        var firstViewTime = stutasData.firstViewTime.replace("T", " ");
                        this.RstatusSteps[1].time = firstViewTime;
                        this.RstatusSteps[1].description =
                            "值班人员:" +
                            stutasData.firstViewer +
                            "安全管理人确认警情为:" +
                            stutasData.warnDealDes;
                    } else {
                        this.RstatusSteps.splice(1, this.RstatusSteps.length);
                    }
                    if (stutasData.warnConfirmTime && stutasData.warnConfirmTime != null) {
                        var warnConfirmTime = stutasData.warnConfirmTime.replace("T", " ");
                        this.RstatusSteps[2].time = warnConfirmTime;
                        this.RstatusSteps[1].description =
                            "确认人:" +
                            stutasData.warnConfirmor +
                            "安全确认人确认该警情为:" +
                            stutasData.warnDealWay +
                            "确认说明:" +
                            stutasData.warnDealDes;
                    } else {
                        this.RstatusSteps.splice(2, this.RstatusSteps.length);
                    }
                } else {
                    this.RstatusSteps.splice(0, this.RstatusSteps.length);
                }
            })
        },
        //相关记录弹窗数据搜索
        dialogSearch() {
            this.search.createTimeStart = this.search.createTimeStart ? this.search.createTimeStart.format('yyyy-MM-dd'): ''
            this.search.createTimeEnd = this.search.createTimeEnd ? this.search.createTimeEnd.format('yyyy-MM-dd'): ''
            this.getUnitRecord(Object.assign(this.listQuery, this.search))
        },
        //相关记录弹窗数据情况
        dialogReset () {
            this.search.createTimeStart = ''
            this.search.createTimeEnd = ''
        },
        // 弹窗取消按钮
        cancel() {
            this.dialoglook = false;
        },
        // 状态查询
        dateSearch() {

        },
        // 放大显示图片
        showImg(url) {
            this.facilityPhoto = url;
            this.dialogImage = true;
        },
        // 关闭弹窗
        closeImg() {
            this.dialogImage = false
        },
        // 去除h5中 &nbsp;
        filter() {
            let tab0List = window['tab-0']
            for (let i = 0, len = tab0List.length; i < len; i++) {
                tab0List[i].innerHTML = tab0List[i].innerHTML.replace(/<i><\/i>&nbsp;/ig, "")
            }
            let tab1List = window['tab-1']
            for (let i = 0, len = tab1List.length; i < len; i++) {
                tab1List[i].innerHTML = tab1List[i].innerHTML.replace(/<i><\/i>&nbsp;/ig, "")
            }
            let tab3 = document.getElementById('tab-2')
            tab3.innerHTML = tab3.innerHTML.replace(/<i><\/i>&nbsp;/ig, "")
            let tab4 = document.getElementById('tab-3')
            tab4.innerHTML = tab4.innerHTML.replace(/<i><\/i>&nbsp;/ig, "")

            let tab5 = document.getElementById('tab-4')
            tab5.innerHTML = tab5.innerHTML.replace(/<i><\/i>&nbsp;/ig, "")

            let tab6 = document.getElementById('tab-5')
            tab6.innerHTML = tab6.innerHTML.replace(/<i><\/i>&nbsp;/ig, "")
            let tab7 = document.getElementById('tab-6')
            tab7.innerHTML = tab7.innerHTML.replace(/<i><\/i>&nbsp;/ig, "")

        },
        // 折线图 报警：#fd3e3c；故障：#ffbb2a；离线：#a6a6a6；屏蔽：#38a3ec；正常：#5cdd00；
        lineChart(value, tit) {
            var dom = document.getElementById(value);
            this.myCharts = this.$echarts.init(dom);
            this.myCharts.clear()
            
            this.chartOptions = {
                title: {
                    text: tit
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['报警', '故障', '离线', '正常'],
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    // x:'1000',
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    // boundaryGap: false,
                    data: this.dataList
                },
                yAxis: {
                    name: '数量：次',
                    type: 'value',
                    // max: 500
                },
                series: [{
                    name: '报警',
                    type: 'line',
                    data: this.alarmAmount,
                    itemStyle: {
                        color: '#fd3e3c'
                    },
                    lineStyle: {
                        color: '#fd3e3c'
                    },
                }, {
                    name: '故障',
                    type: 'line',
                    data: this.faultAmount,
                    itemStyle: {
                        color: '#ffbb2a'
                    },
                    lineStyle: {
                        color: '#ffbb2a'
                    },
                }, {
                    name: '离线',
                    type: 'line',
                    data: this.offlineAmount,
                    itemStyle: {
                        color: '#a6a6a6'
                    },
                    lineStyle: {
                        color: '#a6a6a6'
                    },
                }]
            };
            if (this.chartOptions && typeof this.chartOptions === "object") {
                this.myCharts.setOption(this.chartOptions);
            }
        },
        // 状态分析时间搜索
        dateSearch() {
            console.log(this.statusDateEnd);
            let startYear = new Date().getFullYear() - 1
            let startMonth = new Date().getMonth() + 1
            let endYear = new Date().getFullYear()
            let endMonth = new Date().getMonth() + 1
            if (this.statusDateStart && this.statusDateEnd) {
                startYear = this.statusDateStart.getFullYear()
                startMonth = this.statusDateStart.getMonth() + 1
                endYear = this.statusDateEnd.getFullYear()
                endMonth = this.statusDateEnd.getMonth() + 1
            }
            // this.chartOption.xAxis.data = []
            if (startYear == endYear && startMonth > endMonth) {
                this.$message('月份错误，请从新选择');
                return
            }
            // debugger;
            if (startYear == endYear) {
                for (let i = startMonth; i <= endMonth; i++) {
                    this.dataList.push(startYear + '/' + i)
                }
            }
            if (startYear > endYear) {
                this.$message('年份错误，请从新选择');
                return
            }

            if ((endYear - startYear) >= 1) {
                for (let i = startMonth; i <= 12; i++) {
                    this.dataList.push(startYear + '/' + i)
                }

                for (let i = startYear + 1; i < endYear; i++) {
                    for (let j = 1; j <= 12; j++) {
                        this.dataList.push(i + '/' + j)
                    }
                }
                for (let i = 1; i <= endMonth; i++) {
                    this.dataList.push(endYear + '/' + i)
                }
            }
            let logDateStart = startYear + '-' + startMonth + '-01';
            let logDateEnd = endYear + '-' + endMonth + '-01';
            this.logObj.logDateStart = logDateStart;
            this.logObj.logDateEnd = logDateEnd;
            this.logObj.deviceId = this.setPropsId.deviceId;
            this.getAnalyCharts(this.logObj);
            // this.myChart.setOption(this.chartOption, true);
        },
    }



}