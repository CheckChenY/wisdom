<template>
    <div class="monitormap" style="height: 100%;">
        <div class="table-box" style="height: 100%;display: flex;flex-direction: column;justify-content:center;">
            <table class="table_head" style="height: 10%;">
                <thead>
                    <tr style="width:100%;display: flex;justify-content: center;">
                        <th align="center" width="12.5%" style="width:12.5%">上报时间</th>
                        <th align="center" width="12.5%" style="width:12.5%">设备名称</th>
                        <th align="center" width="12.5%" style="width:12.5%">设备类型</th>
                        <th align="center" width="12.5%" style="width:12.5%">所属单位</th>
                        <th align="center" width="12.5%" style="width:12.5%">安装位置</th>
                        <th align="center" width="12.5%" style="width:12.5%">警情类型</th>
                        <th align="center" width="12.5%" style="width:12.5%">警情程度</th>
                        <!-- <th align="center" width="12.5%" style="width:12.5%">处理时间</th> -->
                    </tr>
                </thead>
            </table>
            <div class="table_bod_div scroll_content" id="predictionId" style="height: 80%;">
                <table class="table_body" v-if="!loading">
                    <tbody>
                        <tr v-for="(item, index) in deviceList" :key="index" @click="setPoint(item)"
                            style="cursor: pointer;width:100%;display: flex;justify-content: center;">
                            <td class="device_name_color" align="center" width="12.5%">{{item.createTime}}</td>
                            <td align="center" width="12.5%" style="overflow:hidden;">
                                <a-tooltip>
                                    <template slot="title">
                                        {{item.deviceName}}
                                    </template>
                                    {{item.deviceName}}
                                </a-tooltip>
                            </td>
                            <td align="center" width="12.5%" style="overflow:hidden;">
                                <a-tooltip>
                                    <template slot="title">
                                        {{item.deviceType}}
                                    </template>
                                    {{item.deviceType}}
                                </a-tooltip>
                            </td>
                            <td align="center" width="12.5%" style="overflow:hidden;">
                                <a-tooltip>
                                    <template slot="title">
                                        {{item.companyId}}
                                    </template>
                                    {{item.companyId}}
                                </a-tooltip>
                                {{item.companyId}}
                            </td>
                            <td align="center" width="12.5%">{{item.location}}</td>
                            <td align="center" width="12.5%">{{item.alarmDetails}}</td>
                            <td align="center" width="12.5%">{{item.alarmLevel}}</td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="loading" style="height: 100%;display: flex;justify-content: center;align-items: center;">
                    <a-icon type="loading" style="color:#fff;font-size:80px;font-weight:900;"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getAlarmDetail } from '@/api/statistics/home'
import eventBus from './eventBus.js'
import { getAlarmByOrg } from '@/api/warncenter/warnscan'
import BMap from 'BMap'
import { dict } from '@/const/dict'
export default {
    name: "monitormap",
    props: ["companyList"],
    data() {
        return {
            deviceList: [],
            bmap: '',
            dom: '',
            params: {
                page: 0,
                size: 50
            },
            loopNum: 0,
            dialogVisible: false,
            url: '',
            loading: false,
            nullVideo: false,
            hasVideo: false,
            warnTypeList:dict.USESTATE,
            warnLevelList:dict.ALARMLEVEL,
            companyDict:[],
            interval: ''
        };
    },
    watch:{
        companyList(){
            this.companyDict=this.companyList
        },
    },
    created() {
        this.getData()
        this.interval = setInterval(() => {
            this.getData()
        },30 * 1000)
    },
    mounted() {
        this.dom = document.getElementById('mapChart')
        this.tableScroll()
    },
    methods: {
        getData(){
            this.loading=true
            getAlarmByOrg(this.params).then(res=>{
                if(res && res.data && res.data.success){
                    if(res.data.value.content.length){
                        res.data.value.content.forEach((s,index)=>{
                            s.key=index
                            if(s.alarmDetails){
                                if( s.alarmDetails.length>1){
                                    s.alarmDetails=s.alarmDetails[0]
                                }else{
                                    s.alarmDetails=s.alarmDetails.length?s.alarmDetails[0]:null
                                }
                            }
                            this.warnTypeList.forEach(t=>{
                                if(s.alarmType==t.value){
                                    s.alarmType=t.label
                                }
                            })
                            this.warnLevelList.forEach(t=>{
                                if(s.alarmLevel==t.value){
                                    s.alarmLevel=t.label
                                }
                            })
                            this.companyDict.forEach(t=>{
                                if(s.companyId==t.companyId){
                                    s.companyId=t.companyName
                                }
                            })
                        })
                        this.loading=false
                        this.deviceList=res.data.value.content
                    }else{
                        this.deviceList=[] 
                    }
                }else{
                    this.deviceList=[]
                }
            })
        },
        setPoint(item){
            getAlarmDetail({alarmId:item.id}).then(res=>{
                if(res && res.data && res.data.success){
                    res.data.value.deviceId=item.deviceId
                    eventBus.$emit('getPosition',res.data.value)
                }
            })
        },
        format(t) {
            let time = new Date(t)
            let y = time.getFullYear()
            let m = time.getMonth() + 1 < 10 ? '0' + time.getMonth + 1 : time.getMonth() + 1
            let d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
            let h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
            let M = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
            let s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()
            return y + '-' + m + '-' + d + ' ' + h + ':' + M + ':' + s
        },
        // 列表滚动
        tableScroll() {
            var speed = 100;
            var delay = 2000;
            var height = 46;
            var time;
            var speed1 = 100;
            var delay1 = 2000;
            var height1 = 46;
            var time1;
            window.onload = function () {
                var area1 = document.getElementById("predictionId");
                area1.innerHTML += area1.innerHTML;

                function scroll1() {
                    if (area1.scrollTop % height1 == 0) {
                        clearInterval(time1);
                        setTimeout(start1, delay1);
                    } else {
                        area1.scrollTop++;
                        if (area1.scrollTop >= area1.scrollHeight / 2) {
                            area1.scrollTop = 0;
                        }
                    }
                }

                function start1() {
                    time1 = setInterval(scroll1, speed1);
                    area1.scrollTop++;
                }

                setTimeout(start1, delay1);
            }
        },
    },
    destroyed () {
        clearInterval(this.interval)
    }
};
</script>

<style lang="scss" scoped>
    $color: #fff;
    .table-box {
        position: relative;
        margin: auto;
        left: 0;
        right: 0;
        height: auto;

        table {
            width: 100%;
        }

        .table_head {
            background-color: rgba(19, 53, 81, 0.5); // rgba(19,53,81,0.5)
            filter: Alpha(opacity=50);
            /* 只支持IE6、7、8、9 */
            box-shadow: #004882 0px 0px 10px inset;

            th {
                color: #39fdfd;
                height: 42px;
                line-height: 42px;
                text-align: center;
                font-size: 18px;
            }
        }

        .table_bod_div {
            width: 100%;
            height: 165px;
            overflow: auto;
            -ms-scroll-chaining: chained;
            -ms-overflow-style: none;
            -ms-content-zooming: zoom;
            -ms-scroll-rails: none;
            -ms-content-zoom-limit-min: 100%;
            -ms-content-zoom-limit-max: 500%;
            -ms-scroll-snap-type: proximity;
            -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
            -ms-overflow-style: none;
        }

        tr {
            display: flex;

            th {
                flex: 1;
            }

            td {
                flex: 1;
                color: #d8e8ff;
                height: 32px;
                line-height: 32px;
                background-color: rgba(8, 29, 65, 0.5); // rgba(19,53,81,0.5)
                filter: Alpha(opacity=50);
                /* 只支持IE6、7、8、9 */
                font-size: 12px;
            }
        }
    }
    /*webkit内核*/
    .scroll_content::-webkit-scrollbar {
        width: 0px!important;
        height: 0px!important;
    }

    .scroll_content::-webkit-scrollbar-button {
        background-color: rgba(0, 0, 0, 0);
    }

    .scroll_content::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0);
    }

    .scroll_content::-webkit-scrollbar-track-piece {
        background-color: rgba(0, 0, 0, 0);
    }

    .scroll_content::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0);
    }

    .scroll_content::-webkit-scrollbar-corner {
        background-color: rgba(0, 0, 0, 0);
    }

    .scroll_content::-webkit-scrollbar-resizer {
        background-color: rgba(0, 0, 0, 0);
    }

    /*o内核*/
    .scroll_content .-o-scrollbar {
        -moz-appearance: none !important;
        background: rgba(0, 255, 0, 0) !important;
    }

    .scroll_content::-o-scrollbar-button {
        background-color: rgba(0, 0, 0, 0);
    }

    .scroll_content::-o-scrollbar-track {
        background-color: rgba(0, 0, 0, 0);
    }

    .scroll_content::-o-scrollbar-track-piece {
        background-color: rgba(0, 0, 0, 0);
    }

    .scroll_content::-o-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0);
    }

    .scroll_content::-o-scrollbar-corner {
        background-color: rgba(0, 0, 0, 0);
    }

    .scroll_content::-o-scrollbar-resizer {
        background-color: rgba(0, 0, 0, 0);
    }

    /*IE10,IE11,IE12*/
    .scroll_content {
        -ms-scroll-chaining: chained;
        -ms-overflow-style: none;
        -ms-content-zooming: zoom;
        -ms-scroll-rails: none;
        -ms-content-zoom-limit-min: 100%;
        -ms-content-zoom-limit-max: 500%;
        -ms-scroll-snap-type: proximity;
        -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
        -ms-overflow-style: none;
        overflow: auto;
    }
</style>