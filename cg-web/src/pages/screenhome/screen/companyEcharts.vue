<template>
    <div style="width:100%;height:100%;" id="companycir"></div>
</template>

<script>
import { getCompanyTypeDistribution } from '@/api/statistics/home'
export default {
    props:['orgId'],
    data(){
        return{
            myCompanyCharts:null,
            agentAll:0,
            societyAll:0,
            manageAll:0,
            parentCompanyAll:0,
            data:{},
            interval: ''
        }
    },
    watch:{
        orgId(){
            this.initData()
        }
    },
    created () {
        this.interval = setInterval(() => {
            if (this.orgId) {
                this.initData()
            }
        },30 * 1000)
    },
    mounted(){
        this.initEcharts()
    },
    methods:{
        resize(){
            this.myCompanyCharts.resize()
        },
        initData(){
            getCompanyTypeDistribution({orgId:this.orgId}).then(res=>{
                if(res && res.data && res.data.success && res.data.value){
                    this.data=res.data.value
                    this.agentAll=res.data.value.agentAll
                    this.societyAll=res.data.value.societyAll
                    this.manageAll=res.data.value.manageAll
                    this.parentCompanyAll=res.data.value.parentCompanyAll
                }else{
                    this.agentAll=0
                    this.societyAll=0
                    this.manageAll=0
                    this.parentCompanyAll=0
                }
                this.initEcharts()
            })
        },
        initEcharts(){
            var that=this
            var echartsbar=[]
            var channlDome = document.getElementById("companycir");
            this.myCompanyCharts = this.$echarts.init(channlDome);
            let channalOption = {
                title : {
                    text: '单位类型分布',
                    left:'6%',
                    textStyle:{
                        color:'#fff',
                    }
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    data: ['社会单位','监管单位','总公司','代理商',],
                    orient: 'vertical',
                    right:'6%',
                    top:'28%',
                    itemGap:20,
                    textStyle:{
                        color:'#fff',
                    },
                    formatter(name){
                        console.log(name)
                        if(name=='社会单位'){
                            return name+' | '+(that.data.societyCode?that.data.societyCode:0)+'%'
                        }
                        if(name=='监管单位'){
                            return name+' | '+(that.data.manageCode?that.data.manageCode:0)+'%'
                        }
                        if(name=='总公司'){
                            return name+' | '+(that.data.parentCompanyCode?that.data.parentCompanyCode:0)+'%'
                        }
                        if(name=='代理商'){
                            return name+' | '+(that.data.agentCode?that.data.agentCode:0)+'%'
                        }
                    },
                },
                series : [
                    {
                        name: '单位类型',
                        type: 'pie',
                        radius :['50%','70%'],
                        labelLine:{
                            show:false,
                        },
                        label:{
                            normal: {
                                show: true,
                                position: 'center',
                                formatter:function (argument) {
                                    var html;
                                    html='单位类型';
                                    return html;
                                },
                                textStyle:{
                                   fontSize: 15,
                                    color:'#fff'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        center: ['30%', '55%'],
                        data:[
                            {value:this.societyAll, name:'社会单位'},
                            {value:this.manageAll, name:'监管单位'},
                            {value:this.parentCompanyAll, name:'总公司'},
                            {value:this.agentAll, name:'代理商'},
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            },
                            normal:{
                                color:function(params) {
                                //自定义颜色
                                var colorList = [          
                                        'rgb(58,161,255)', 'rgb(47,194,91)', 'rgb(251,212,55)', 'rgb(240,72,100)'
                                    ];
                                    return colorList[params.dataIndex]
                                }
                            }
                        }
                    },
                ]
            };
            this.myCompanyCharts.setOption(channalOption,true);
        }
    },
    destroyed () {
        clearInterval(this.interval)
    }
}
</script>
