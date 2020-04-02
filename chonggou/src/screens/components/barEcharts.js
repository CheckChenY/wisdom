
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View,FlatList} from 'react-native';

import Echarts from 'native-echarts';
 

export default class TabECharts extends Component {

    constructor() {
        super(...arguments);
        this.state = {
            pcData: [300, 500, 150, 450, 562, 400],
            phoneData: [168, 482, 300, 400, 362, 352],
            xData: ['2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12',],
            colorItem:[]
        }
    }

    render() {
        const { height,width,barData,titleData,title } = this.props;
        
        const option = {
            title:{
                subtext: '数量：' + title,
                // text:'各系统设备总览',
                // padding:10 
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
                data: titleData
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
                name: '销量',
                type: 'bar',
                data: barData,
                barWidth:10,
                itemStyle: {
                    normal: {
                        //每根柱子颜色设置
                        color: function(params) {
                            
                            let colorList = [
                                "#c23531",
                                "#2f4554",
                                "#61a0a8",
                                "#d48265",
                                "#91c7ae",
                                "#749f83"
                            ];
                            
                            return colorList[params.dataIndex];
                        }
                    }
                },
            }]
        };
        return (
            <View>
                <Echarts option={option} height={height}/>
            </View>
        );
    }
}
