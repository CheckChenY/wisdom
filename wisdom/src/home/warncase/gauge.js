import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Echarts from 'native-echarts';

export default class EchartsExample extends Component {

    //初始变量
    state = {
        pcData: [300, 500, 150, 450, 562, 400],
        phoneData: [168, 482, 300, 400, 362, 352],
        xData: ['2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12',]
    };

    render() {
        const option = {
            tooltip: {
                formatter: "{a} <br/>{b} : {c}A"
            },
            toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: '当前电流',
                    type: 'gauge',
                    detail: {formatter:'{value}A'},
                    data: [{value: 120, name: '电流'}],
                    max:200
                }
            ]
        };

        return (
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'#333',fontSize:16,}}>当前电流：</Text>
                        <Text style={{color:'#ff0000',fontSize:18,}}>85A</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'#333',fontSize:16,}}>过载阈值：</Text>
                        <Text style={{color:'#333',fontSize:18,}}>80A</Text>
                    </View>
                </View>
                <Echarts option={option} height={350}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:30,
    },
    titleView: {
        height: Platform.OS === 'ios' ? 64 : 34,
        paddingTop: Platform.OS === 'ios' ? 14 : 0,
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    title: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center'
    },
});
