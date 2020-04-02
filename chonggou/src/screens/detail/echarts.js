
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View,FlatList} from 'react-native';

import Echarts from 'native-echarts';

export default class TabECharts extends Component {

    // constructor() {
    //     super(...arguments);
    // }

    //初始变量
    state = {
        data:[{
            title:{
               text:'各系统设备总览',
               padding:10 
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b}: {c}"
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['报警', '故障', '离线', '正常']
            },
            yAxis: {
                type: 'value',
                axisLine:{
                    show:false,
                },
                splitLine:{
                    lineStyle:{
                        type:'dashed'
                    }
                }
            },
            series: [{
                data: [{
                    name:'报警',
                    value:220,
                    itemStyle:{
                        normal:{
                            color:'red'
                        }
                    }
                },{
                    name:'故障',
                    value:280,
                    itemStyle:{
                        normal:{
                            color:'orange'
                        }
                    }
                },{
                    name:'离线',
                    value:480,
                    itemStyle:{
                        normal:{
                            color:'#ccc'
                        }
                    }
                },{
                    name:'正常',
                    value:880,
                    itemStyle:{
                        normal:{
                            color:'green'
                        }
                    }
                }],
                type: 'bar',
                barWidth:20
            }]
        },{
            title:{
               text:'设备监控状态分析',
               padding:10 
            },
            tooltip: {
                trigger: 'item',
                formatter: "{b}: {d}%"
            },
            series: [
                {
                    name:'设备状态',
                    type:'pie',
                    radius: ['35%', '50%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'center',
                            formatter:'{b}\n{d}%'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: 14,
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[{
                        value:335,
                        name:'接入占比',
                        itemStyle:{
                            color:'purple'
                        },
                        label:{
                            normal:{
                                show:false
                            }
                        }
                    },{
                        value:40,
                        name:'离线占比',
                        itemStyle:{
                            color:'blue'
                        }
                    }]  
                }
            ]
        }]
    };

    render() {
        return (
            <FlatList data={this.state.data}
                renderItem={(data) => this._renderItem(data)}
                initialNumToRender={2}
            />
        );
    }
    _renderItem({item}) {
        console.log(item)
        return(
            <Echarts option={item} height={300}/>
        )
    }
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1
    // },
    titleView: {
        height: Platform.OS === 'ios' ? 64 : 34,
        paddingTop: Platform.OS === 'ios' ? 14 : 0,
        backgroundColor: '#4a65ff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    title: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center'
    },
});
