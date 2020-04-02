import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Echarts from 'native-echarts';

export default class EchartsExample extends Component {

    constructor() {
        super(...arguments);
    }

    //初始变量
    // state = {
    //     pcData: [300, 500, 150, 450, 562, 400],
    //     // phoneData: [168, 482, 300, 400, 362, 352],
    //     xData: ['2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12',]
    // };

    render() {
        const { arrdata1,arrdata2,arrdata3,xdata,unit,legend,EchartsType } = this.props;
        // console.log(unit)
        const option = {
            tooltip: {
                trigger: 'axis'
            },
            // legend: {
            //     data: legend
            // },
            toolbox: {
                show: true,
                showTitle: true,
                feature: {
                    // dataView: {show: true, readOnly: false},
                    magicType: {
                        type: [ 'line',
                        // 'bar', 
                        // 'stack', 'tiled'
                        ],
                    },
                    // restore: {show: true}
                }
            },
            xAxis: [
                {
                    boundaryGap: true,
                    type: 'category',
                    name: '日期',
                    data: xdata
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '单位:' + unit
                }
            ],
            // color: ['#ff0fe3', '#ffff00'],
            series: [
                {
                    name: 'A相'+ EchartsType,
                    type: 'line',
                    data: arrdata1
                },
                {
                    name: 'B相'+ EchartsType,
                    type: 'line',
                    data: arrdata2
                },
                {
                    name: 'C相'+ EchartsType,
                    type: 'line',
                    data: arrdata3
                },
            ]
        };

        return (
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <TouchableOpacity>
                        <Text style={styles.title}>智慧用电展示图</Text>
                    </TouchableOpacity>
                </View>
                <Echarts option={option} height={240}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleView: {
        // height: Platform.OS === 'ios' ? 64 : 34,
        // paddingTop: Platform.OS === 'ios' ? 14 : 0,
        backgroundColor: '#4a65ff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding:5,
        borderRadius:3
    },
    title: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center'
    },
});
