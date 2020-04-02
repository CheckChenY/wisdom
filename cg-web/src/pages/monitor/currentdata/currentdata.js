import UnitSelect from "@/components/selectUnit"
import formSearch from '@/components/base/formSearch.vue';
import checkmodal from '@/components/public/checkmodal.vue';
import currentdataDialog from './currentdataDialog.vue';
import currentdataRemote from './currentdataRemote.vue';
import currentdataThresold from './currentdataThresold.vue';
import { findDevicePage, allDeviceState, allSystemPandect } from '@/api/monitor/monitor'
import { getDeviceFindList } from '@/api/public'
import moment from 'moment';
import { mapGetters } from "vuex";
import { dict } from '@/const/dict'
export default {
    components:{
        UnitSelect,
        currentdataDialog,
        currentdataRemote,
        currentdataThresold,
        formSearch,
        checkmodal
    },
    data () {
        return{
            dataSource: [],
            pagination: {
                onChange: this.onChange,
                pageSize: 3,
                current: 1
            },
            columns: [
                {
                    title: '设备ID',
                    dataIndex: 'deviceId',
                    fixed:'left',
                    width:150
                },
                {
                    title: '设备名称',
                    dataIndex: 'deviceName',
                    fixed:'left',
                    width:150
                },
                {
                    title: '设备型号',
                    dataIndex: 'deviceModel',
                },
                {
                    title: '设备类型',
                    dataIndex: 'deviceType',
                },
                {
                    title: '所属系统',
                    dataIndex: 'systemCode',
                },
                {
                    title: '所在建筑',
                    dataIndex: 'buildingName',
                },
                {
                    title: '楼层/区域',
                    dataIndex: 'floorName',
                },
                {
                    title: '具体位置',
                    dataIndex: 'location',
                },
                {
                    title: '设备状态',
                    dataIndex: 'warnState',
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 310,
                    scopedSlots: { customRender: 'operation' },
                    fixed:'right'
                },
            ],
            form: this.$form.createForm(this, { name: 'advanced_search' }),
            params:{
                page:0,
                size:3,
                floorId: '',
            },
            systemList:[],
            deviceTypeList:[],
            deviceModelList:[],
            warnStateList:dict.USESTATE,
            visible:false,
            confirmLoading:false,
            dateValue:null,
            dateValueString:'',
            record:null,
            expireDate:null
        }
    },
    created(){
        this.getDictData()
    },
    mounted(){
        this.params.companyId = this.orgInfo.id
        this.getData()
        this.allchannlechrts()
    },
    computed: {
        ...mapGetters([
            "orgInfo",
            "rowLight",
        ]),
    },
    methods:{
        refresh(){
            this.getData()
        },
        onDateChange(date, dateString){
            console.log(date)
            this.expireDate=date
            console.log(dateString)
        },
        getDictData(){
            getDeviceFindList({type:1}).then(res=>{
                this.systemList=[]
                if(res && res.data && res.data.value){
                    if(res.data.value.length){
                        res.data.value.forEach(s=>{
                            s.label=s.dataDicDesc
                            s.value=s.id
                        })
                        this.systemList=res.data.value
                    }
                }
            })
            allDeviceState().then(res => {
                let data = res.data.value
                if (data) {
                    let dataList = [{value:data.alarmCount, name:'报警个数'},
                        {value:data.faultCount, name:'故障个数'},
                        {value:data.normalCount, name:'正常个数'},
                        {value:data.notLinkCount, name:'离线个数'},
                        // {value:data.closingByHandCount, name:'手动合闸个数'},
                        // {value:data.breakByHandCount, name:'手动分闸个数'},
                        // {value:data.closingByRemoteCount, name:'远程合闸个数'},
                        // {value:data.breakByRemoteCount, name:'远程分闸个数'}
                    ]
                    this.pieInit(dataList)
                }
            })
            allSystemPandect().then(res => {
                this.allchannlechrts(res.data.value)
            })
        },
        systemChange (value) {
            getDeviceFindList({type:2,id:value}).then(res=>{
                this.deviceTypeList=[]
                if(res && res.data && res.data.value){
                    if(res.data.value.length){
                        res.data.value.forEach(s=>{
                            s.label=s.dataDicDesc
                            s.value=s.id
                        })
                        this.deviceTypeList=res.data.value
                    }
                }
            })
        },
        typeChange (value) {
            getDeviceFindList({type:3,id:value}).then(res=>{
                this.deviceModelList=[]
                if(res && res.data && res.data.value){
                    if(res.data.value.length){
                        res.data.value.forEach(s=>{
                            s.label=s.dataDicDesc
                            s.value=s.id
                        })
                        this.deviceModelList=res.data.value
                    }
                }
            })
        },
        batchExport(){

        },
        download(){

        },

        disabledDate(current) {
            // Can not select days before today and today
            return current && current < moment().endOf('day');
        },
        handleCancel(){
            this.visible=false
        },
        handleOk(){
            var that=this
            console.log(that.dateValueString)
            console.log(that.record)
            that.confirmLoading=true
            setTimeout(()=>{
                that.confirmLoading=false
            },1000)
        },
        onRemote(record){
            this.$refs.checkmodal.showModal(record, 'Remote')
        },
        onView(record) {
            this.$refs.currentdataDialog.showDrawer(record)
        },
        onThresold(record){
            this.$refs.checkmodal.showModal(record, 'Thresold')
        },
        handleSearch(e) {
            e.preventDefault();
            this.form.validateFields((error, values) => {
                this.params.page = 0
                this.pagination.current = 1
                Object.assign(this.params, values)
                this.getData()
            });
        },
        handleReset() {
            this.form.resetFields();
            this.expireDate=null
        },
        getData(){
            findDevicePage(this.params).then(res=>{
                if(res && res.data && res.data.success){
                    if(res.data.value.content && res.data.value.content.length){
                        res.data.value.content.forEach(s=>{
                            s.key=s.id
                            let warn = dict.USESTATE.filter(item => item.value == s.warnState)
                            s.warnState = warn.length>0?warn[0].label:''
                        })
                    }
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    this.dataSource=res.data.value.content
                    this.pagination = pagination;
                }else{
                    this.dataSource=[]
                }
            })
        },
        onChange (value) {
            this.params.page = value - 1
            this.pagination.current = value
            this.getData()
        },
        // 设备总览图配置
        allchannlechrts(echartsbar) {
            var channlDome = document.getElementById("allchannl");
            var myCharts = this.$echarts.init(channlDome);
            var channalOption = {
                title: {
                    show: false,
                    text: "设备总览柱状图"
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ["报警", "离线", "故障", "正常","手动合闸","手动分闸","远程合闸","远程分闸"],
                    right: "4%",
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                xAxis: [
                    {
                        type: "category",
                        data: (function(data) {
                            var systemNames = [];
                            for (var i in data) {
                                systemNames.push(data[i].systemName)
                            }
                            // console.log(alarmdatas)
                            return systemNames
                        })(echartsbar),
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            interval: 0,
                            rotate: -40
                        }
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        name: "数量/台",
                        minInterval:1
                    }
                ],
                series: [
                    {
                        name: "报警",
                        type: "bar",
                        stack: "报警",
                        color:'#fd3e3c',
                        data: (function(data) {
                            var alarmCounts = [];
                            for (var i in data) {
                                alarmCounts.push(data[i].alarmCount)
                            }
                            return alarmCounts
                        })(echartsbar)
                    },
                    {
                        name: "离线",
                        type: "bar",
                        stack: "离线",
                        color:'#a6a6a6',
                        data: (function(data) {
                            var notLinkCounts = [];
                            for (var i in data) {
                                notLinkCounts.push(data[i].notLinkCount)
                            }
                            return notLinkCounts
                        })(echartsbar)
                    },
                    {
                        name: "故障",
                        type: "bar",
                        stack: "故障",
                        color:'#ffbb2a',
                        data: (function(data) {
                            var faultCounts = [];
                            for (var i in data) {
                                faultCounts.push(data[i].faultCount)
                            }
                            return faultCounts
                        })(echartsbar)
                    },
                    {
                        name: "正常",
                        type: "bar",
                        stack: "正常",
                        color:'#5cdd00',
                        data: (function(data) {
                            var normalCounts = [];
                            for (var i in data) {
                                normalCounts.push(data[i].normalCount)
                            }
                            return normalCounts
                        })(echartsbar)
                    // },
                    // {
                    //     name: "手动合闸",
                    //     type: "bar",
                    //     stack: "手动合闸",
                    //     color:'#ff3399',
                    //     data: (function(data) {
                    //         var closingByHandCounts = [];
                    //         for (var i in data) {
                    //             closingByHandCounts.push(data[i].closingByHandCount)
                    //         }
                    //         return closingByHandCounts
                    //     })(echartsbar)
                    // },
                    // {
                    //     name: "手动分闸",
                    //     type: "bar",
                    //     stack: "手动分闸",
                    //     color:'#a95252',
                    //     data: (function(data) {
                    //         var breakByHandCounts = [];
                    //         for (var i in data) {
                    //             breakByHandCounts.push(data[i].breakByHandCount)
                    //         }
                    //         return breakByHandCounts
                    //     })(echartsbar)
                    // },
                    // {
                    //     name: "远程分闸",
                    //     type: "bar",
                    //     stack: "远程分闸",
                    //     color:'#d4a9a9',
                    //     data: (function(data) {
                    //         var breakByRemoteCounts = [];
                    //         for (var i in data) {
                    //             breakByRemoteCounts.push(data[i].breakByRemoteCount)
                    //         }
                    //         return breakByRemoteCounts
                    //     })(echartsbar)
                    // },
                    // {
                    //     name: "远程合闸",
                    //     type: "bar",
                    //     stack: "远程合闸",
                    //     color:'#ffd4a9',
                    //     data: (function(data) {
                    //         var closingByRemoteCounts = [];
                    //         for (var i in data) {
                    //             closingByRemoteCounts.push(data[i].closingByRemoteCount)
                    //         }
                    //         return closingByRemoteCounts
                    //     })(echartsbar)
                }
            ]
            };
            myCharts.setOption(channalOption);
        },
        // 饼状图
        pieInit (dataList) {
            let dom = document.getElementById("pieAlert");
            let myChart = this.$echarts.init(dom);
            let data = genData(dataList);
            let color = ['#fd3e3c', '#ffbb2a', '#5cdd00', '#a6a6a6', '#00fafd', '#ff59ff', '#00a4ff']
            let option = {
                color: color,
                legend: {
                    orient: 'vertical',
                    right: 70,
                    top: '25%',
                    height: 280,
                    data:data.legendData,
                },
                title: {
                    text: '设备状态',
                    left: '27%',
                    top: 120,
                },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['50%', '70%'],
                        center: ['35%', '45%'],
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:data.seriesData
                    }
                ]
            };

            function genData(arr) {
                let legendData = [];
                let seriesData = [];
                let total = 0;
                for (let i = 0; i < arr.length; i++) {
                    total += arr[i].value
                }
                for (let i = 0; i < arr.length; i++) {
                    let legend = arr[i].name + "|" + (Math.round((arr[i].value/total)*10000)/100) + '%'
                    legendData.push({
                        name:legend,
                        icon: 'circle'
                    });
                    seriesData.push({
                        name: legend,
                        value: arr[i].value
                    });
                }

                return {
                    legendData: legendData,
                    seriesData: seriesData
                };
            }
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
            window.addEventListener("resize", function() {
                myChart.resize();
            });
        },
        closeModal(record, value) {
            if (value == 'Thresold') {
                this.$refs.currentdataThresold.showDrawer(record)
            } else if (value == 'Remote'){
                this.$refs.currentdataRemote.showDrawer(record)
            }
        },
        rowClassName (record) {
            let className = '';
            if (this.rowLight == record.deviceId) {
                className = 'light-row';
            }
            return className;
        }
    }
}