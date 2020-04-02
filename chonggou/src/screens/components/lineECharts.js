
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View,FlatList} from 'react-native';

import Echarts from 'native-echarts';


class TabECharts extends Component {
    render() {
        const { height,width,abnormalCount,dealCount,noDealCount,date } = this.props;
        let option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['警情','待处理','已处理']
            },
            toolbox: {
                show: true,
                feature: {
                    // dataZoom: {
                    //     yAxisIndex: 'none'
                    // },
                    // dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},
                    // restore: {},
                    // saveAsImage: {}
                }
            },
            xAxis:  {
                type: 'category',
                boundaryGap: false,
                // data: ['周一','周二','周三','周四','周五','周六','周日']
                data:date
            },
            yAxis: {
                type: 'value',
                // axisLabel: {
                //     formatter: '{value} °C'
                // }
            },
            series: [
                {
                    name:'警情',
                    type:'line',
                    // data:[11, 11, 15, 13, 12, 13, 10],
                    data:abnormalCount,
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    // markLine: {
                    //     data: [
                    //         {type: 'average', name: '平均值'}
                    //     ]
                    // }
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'},
                            [{
                                symbol: 'none',
                                x: '90%',
                                yAxis: 'max'
                            }, {
                                symbol: 'circle',
                                label: {
                                    normal: {
                                        position: 'start',
                                        formatter: '最大值'
                                    }
                                },
                                type: 'max',
                                name: '最高点'
                            }]
                        ]
                    }
                },
                {
                    name:'待处理',
                    type:'line',
                    data:dealCount,
                    // markPoint: {
                    //     data: [
                    //         {name: '周最低'}
                    //     ]
                    // },
                    // markLine: {
                    //     data: [
                    //         {type: 'average', name: '平均值'},
                    //         [{
                    //             symbol: 'none',
                    //             x: '90%',
                    //             yAxis: 'max'
                    //         }, {
                    //             symbol: 'circle',
                    //             label: {
                    //                 normal: {
                    //                     position: 'start',
                    //                     formatter: '最大值'
                    //                 }
                    //             },
                    //             type: 'max',
                    //             name: '最高点'
                    //         }]
                    //     ]
                    // }
                },
                {
                    name:'已处理',
                    type:'line',
                    data:noDealCount,
                    // markPoint: {
                    //     data: [
                    //         {name: '周最低'}
                    //     ]
                    // },
                    // markLine: {
                    //     data: [
                    //         {type: 'average', name: '平均值'},
                    //         [{
                    //             symbol: 'none',
                    //             x: '90%',
                    //             yAxis: 'max'
                    //         }, {
                    //             symbol: 'circle',
                    //             label: {
                    //                 normal: {
                    //                     position: 'start',
                    //                     formatter: '最大值'
                    //                 }
                    //             },
                    //             type: 'max',
                    //             name: '最高点'
                    //         }]
                    //     ]
                    // }
                }
            ]
        };
        return (
            <View style={{justifyContent:'center',alignItems:'center',padding:10}}>
                <Echarts option={option} width={width} height={height}/>
            </View>
        );
    }
}


export default TabECharts;
