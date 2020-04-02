
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View,FlatList} from 'react-native';

import Echarts from 'native-echarts';

export default class TabECharts extends Component {

    constructor() {
        super(...arguments);
        this.state = {
            pcData: [300, 500, 150, 450, 562, 400],
            phoneData: [168, 482, 300, 400, 362, 352],
            xData: ['2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12',]
        }
    }

    render() {
        const { height,oneData,width } = this.props,
        { getReadrColor,finishColor,offlintCount,AllCount } = oneData;
        const option = {
            title:{
               
            },
            tooltip: {
                trigger: 'item',
                formatter: "{b}: {d}%",
                show:false
            },
            // legend: {
            //     orient: 'vertical',
            //     x: 'right',
            //     data:['已处理','待处理']
            // },
            series: [
                {
                    name:'设备状态',
                    type:'pie',
                    radius: ['30%', '80%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center',
                            formatter:'{b}\n{d}%'
                        },
                        emphasis: {
                            show: false,
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
                        value:offlintCount,
                        // name:'已处理',
                        itemStyle:{normal:{ color:getReadrColor }}
                    },{
                        value:AllCount,
                        // name:'待处理',
                        itemStyle:{normal:{ color:finishColor }}
                    }],
                    labelLine: {
                        normal: {
                            show: false   // show设置线是否显示，默认为true，可选值：true ¦ false
                        }
                    },
                    label: {
                        normal: {
                            position: 'inner',  // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                            formatter: '{d}%',
                        }
                    }
                }
            ]
        };
        return (
            <View>
                <Echarts option={option} width={width} height={height}/>
            </View>
        );
    }
}
