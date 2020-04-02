
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View,FlatList} from 'react-native';

import Echarts from 'native-echarts';


class TabECharts extends Component {

    // componentDidMount(){
    // }
    
    render() {
        // const { deviceWaringNub,deviceWaringDate } = this.state;
        const { series,height} = this.props;
        
        // debugger;
        // let serObj = [];
        // for (let i = 0; i < series.length; i++) {
        //     let ser = {}
        //     ser['data'] = series[i];
        //     ser['type'] = 'line';
        //     ser['name'] = resName[i];
        //     ser['itemStyle'] = {
        //         'color': color[i]
        //     };
        //     serObj.push(ser)
        // }
        
        // console.log(serObj)
        let option = {
            // title: {
            //     text: title
            // },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['液位值', '上限值', '下限值']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                name: '秒',
                type: 'category',
                boundaryGap: false,
                data: series.serTime
            },
            yAxis: {
                type: 'value',
                // name: text,
            },
            // series: serObj,
            series:[{
                data: series.water23,
                itemStyle:{
                    color: "#2f4554",
                },
                name: "液位值",
                type: "line"
            },{
                data: series.water140,
                itemStyle:{
                    color: "#2f4554",
                },
                name: "上限值",
                type: "line"
            },{
                data: series.water141,
                itemStyle:{
                    color: "#2f4554",
                },
                name: "下限值",
                type: "line"
            }]
        };
        // console.log(option)
        return (
            <View>
                <Echarts option={option} height={height}/>
            </View>
        );
    }
}


export default TabECharts;
