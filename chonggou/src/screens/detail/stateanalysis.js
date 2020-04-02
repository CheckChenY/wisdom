
import React, {Component} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Platform,Dimensions, StyleSheet, Text, TouchableOpacity, View,FlatList} from 'react-native';
import FetchManager from '../fetch/index';
import Echarts from 'native-echarts';
const { width } = Dimensions.get('window');

export default class TabECharts extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (
                <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center',color:'#FFFFFF',flex:1 }}>状态分析</Text>
            ),
            headerRight: <View />,
            headerLeft: (
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                        <FontAwesome color="#fff" name="angle-left" size={28}/>
                        <Text style={{color:'#fff',fontSize:16,paddingLeft:5,paddingTop:3}}>返回</Text>
                    </View>
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: '#3AA1FE',
            },
        }
    };

    //初始变量
    state = {
        notLinkCount:null,
        alarmCount:null,
        troubleCount:null,
        alarmAndTroubleCount:null,
        dateArr:null,
        loading:true
    };

    render() {
        const { notLinkCount,alarmCount,troubleCount,alarmAndTroubleCount,dateArr } =this.state
        let option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['报警','故障','离线','报警&故障']
            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {type: ['line', 'bar']},
                }
            },
            xAxis:  {
                type: 'category',
                boundaryGap: false,
                data:dateArr
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    name:'报警',
                    type:'line',
                    data:alarmCount,
                },
                {
                    name:'故障',
                    type:'line',
                    data:troubleCount,
                },
                {
                    name:'离线',
                    type:'line',
                    data:notLinkCount,
                },
                {
                    name:'报警&故障',
                    type:'line',
                    data:alarmAndTroubleCount,
                }
            ]
        };
        return (
            <View>
                {
                    this.state.loading?(
                        <View/>
                    ):(
                        <Echarts option={option} width={width-30} height={300}/>
                    )
                }
            </View>
        )
    }

    componentDidMount(){
        var that=this
        const { deviceId } = this.props.navigation.state.params;
        let obj = {
            deviceId:deviceId,
            time:'2019-12'
        }
        FetchManager.get('/alarm/inner/jtlAlarmRecord/stateAnalysisByMonth',obj, (res) => {
            if (res && res.data && res.data.success) {
                let data = res.data.value
                var notLinkCount=[]
                var alarmCount=[]
                var troubleCount=[]
                var alarmAndTroubleCount=[]
                var dateArr=[]
                for (let i = 0, len = data.length; i < len; i++) { 
                    notLinkCount.push(data[i].notLinkCount)
                    alarmCount.push(data[i].alarmCount)
                    troubleCount.push(data[i].troubleCount)
                    alarmAndTroubleCount.push(data[i].alarmAndTroubleCount)
                    dateArr.push(data[i].alarmDate.split(' ')[0].replace(/-/g, '/'))
                }
                this.setState({
                    notLinkCount:notLinkCount,
                    alarmCount:alarmCount,
                    troubleCount:troubleCount,
                    alarmAndTroubleCount:alarmAndTroubleCount,
                    dateArr:dateArr,
                })
                setTimeout(()=>{
                    that.setState({
                        loading:false,
                    })
                },500)
            }
        })
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
