<template>
    <div class="alert_list_bigpage">
        <div class="alert_list_title">
            <span class="y-icon-xinhao title_text">空开报警列表</span>
            <span class="BMap_Marker BMap_noprint" unselectable="on" style="position: absolute; padding: 0px; margin: 0px; border: 0px; cursor: pointer; background: url(&quot;http://api0.map.bdimg.com/images/blank.gif&quot;); width: 43px; height: 59px; left: 747px; top: 392px; z-index: -6942956;" title=""></span>
        </div>
        <div class="alert_list_body">
            <div class="table-box">
                <table class="table_head">
                    <thead>
                        <tr>
                            <th align="center" width="16%" style="width:16%">报警时间</th>
                            <th align="center" width="16%" style="width:16%">网关名称</th>
                            <th align="center" width="16%" style="width:16%">空开名称</th>
                            <th align="center" width="16%" style="width:16%">空开设备安装位置</th>
                            <th align="center" width="16%" style="width:16%">报警类型</th>
                        </tr>
                    </thead>
                </table>
                <div class="table_bod_div">
                    <table>
                        <tbody>
                            <tr v-for="(item, index) in deviceList" :key="index">
                                <td align="center" width="16%">{{item.createDate}}</td>
                                <td align="center" width="16%">{{item.getWayName}}</td>
                                <td align="center" width="16%">{{item.location}}</td>
                                <td align="center" width="16%">{{item.deviceName}}</td>
                                <td align="center" width="16%">{{item.detail}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getAlertPage } from '@/api/screen/screen'
export default {
    name: 'alert_listCurve',
    data(){
        return{
            deviceList: [],
            listQuery:{
                page:0,
                pageSize:50,
                startTime: new Date().format('yyyy-MM-dd') + ' 00:00:00',
                endTime: new Date().format('yyyy-MM-dd') + ' 23:59:59',
            },
        }
    },
    created(){
        this.getAlertPage(this.listQuery)
    },
    mounted(){
    },
    methods:{
        getAlertPage(params){
            getAlertPage(params).then(res=>{
                if(res && res.data && res.data.status === 0){
                    res.data.data.data.forEach(item => {
                        item.createDate = new Date(item.createDate).format('yyyy-MM-dd hh:mm:ss')
                    })
                    this.deviceList = res.data.data.data
                }
            })
        },
    }
}
</script>

<style lang="scss">
.alert_list_bigpage{
    border: #2d7cfb 1px solid;
    height: 250px;
    background-color: rgba(16,29,78,0.5);
    .alert_list_title{
        color: #00fcfe;
        display: flex;
        justify-content: space-between;
        height: 38px;
        align-items: flex-end;
        .title_text{
            font-size: 18px !important;
            display: inline-block;
            text-align: center;
            padding-left: 8px;
        }
        .y-icon-xinhao:before{
            padding-right: 8px;
        }
    }
    .alert_list_body{
        width:100%;
        height:195px;
        .table-box {
            margin: 5px 10px;
            table {
                width: 100%;
            }
            .table_head{
                background-color: rgba(18,28,113,0.5); // rgba(19,53,81,0.5)
                filter:Alpha(opacity=50);/* 只支持IE6、7、8、9 */
                box-shadow:#2c48bd 0px 0px 18px inset;
                th {
                    color: #00fafd;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    font-size: 18px;
                }
            }
            .table_bod_div{
                width:100%;
                height: 160px;
                overflow:auto; 
                -ms-scroll-chaining: chained;
                -ms-overflow-style: none;
                -ms-content-zooming: zoom;
                -ms-scroll-rails: none;
                -ms-content-zoom-limit-min: 100%;
                -ms-content-zoom-limit-max: 500%;
                -ms-scroll-snap-type: proximity;
                -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
                -ms-overflow-style: none;
                tr{
                    border-bottom: dashed 1px #4d5a86;
                }
                &::-webkit-scrollbar {
                    display: none;
                }
            }
            tr {
                display: flex;
                width:100%;
                justify-content: center;
                th {
                    flex: 1;
                }
                td {
                    flex: 1;
                    color: #00fafd;
                    height: 32px;
                    line-height: 32px;
                    font-size: 12px;
                }
            }
        }
    }
    
}
</style>
        