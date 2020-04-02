import React,{ Component } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,TextInput,Dimensions,ScrollView } from 'react-native'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";
import {Calendar,LocaleConfig} from 'react-native-calendars';
import FetchManager from '../fetch/index';

LocaleConfig.locales['fr'] = {
    monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    monthNamesShort: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    dayNames: ['日','一','二','三','四','五','六'],
    dayNamesShort: ['日','一','二','三','四','五','六']
};
LocaleConfig.defaultLocale = 'fr';

import CurveLineECharts from '../components/curveLineECharts';
import CurveLineEChartsTwo from '../components/curveLineEChartsTwo';

import CurveLineWater from '../components/curveLineWater';

import { getLine } from '../components/curveLineEChartsData';


const { height, width } = Dimensions.get('window');






class CurveScreens extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            day: '',
            color:'#788A93',
            index:0,
            btnBol:false,
            date:[{id:1,title:'实时压力'},
            ],
            deviceWaringNub:[],
            deviceWaringDate:[],
            systemId:'',
            list:{
                // page:1,
                // limit:10,
            },
            lineObj:{}
        };

    }


    componentDidMount(){
        const { time,systemId } = this.props;
        if(!time){
            let day = new Date().getDate();
            let month = new Date().getMonth();
            let nub = Number(month) + 1;
            // debugger;
            if(nub < 10){
                nub = '0' + nub;
            }else if(day < 10){
                day = '0' + day;
            }
    
            let time = new Date().getFullYear()+'-'+ nub +'-'+ day;
            this.getData(time,systemId)
        }else{
            this.getData(time,systemId)
        }

    }


    getData=(day,systemId)=>{
        const { list } = this.state;
        // list['createTime'] = '2019-06-27';
        list['createTime'] = day;
        console.log(list)
        FetchManager.get('1/devicealertrecord/selctParameter/' ,list, (set) => {
        // FetchManager.get('1/devicealertrecord/page',_params, (set) => {
            console.log(set)
            if(set&&set.data&&set.data !== null && set.data.length > 0){
                // debugger
                let lineObj = getLine(set.data,systemId)
                console.log(lineObj)

                this.setState({
                    lineObj:lineObj,
                    time:day
                })
            }
        })
    }



    render() {
        const { color,date,index,lineObj } = this.state;
        const { systemId } = this.props;

        let resName1 = ['Ua', 'Ub', 'Uc', '过压阀值', '欠压阀值'];
        let resColor1 = ['#2f4554', '#61a0a8', '#d48265', '#ffbb2a', '#fd3e3c'];

        let resName2 = ['Ia', 'Ib', 'Ic', '过载阀值'];
        let resColor2 = ['#2f4554', '#61a0a8', '#d48265', '#fd3e3c'];

        let resName3 = ['漏电报警阀值', '漏电值'];
        let resColor3 = ['#ffbb2a', '#fd3e3c'];

        let resName4 = ['A相', 'B相', 'C相', '零线'];
        let resColor4 = ['#2f4554', '#61a0a8', '#ffbb2a', '#fd3e3c'];


        // console.log(lineObj)

        return (
            <View style={styles.container}>
                <View>
                    {
                        lineObj && lineObj.serTime && systemId === 3 ? (
                            <View>
                                <Text style={{fontSize:14,color:'#2f4554',backgroundColor:'#FBFBFB',marginTop:10,padding:5}}>
                                    三相电压变化曲线
                                </Text>
                                <CurveLineECharts height={280} 
                                    series={lineObj.resOne} 
                                    serTime={lineObj.serTime}
                                    resName={resName1} 
                                    // title = {'三相电压变化曲线'}
                                    text = {'电压:V'}
                                    color = {resColor1}
                                />

                                <Text style={{fontSize:14,color:'#2f4554',backgroundColor:'#FBFBFB',marginTop:10,padding:5}}>
                                    三相电流变化曲线
                                </Text>
                                <CurveLineECharts height={280} 
                                    series={lineObj.resTwo} 
                                    serTime={lineObj.serTime}
                                    resName={resName2} 
                                    // // title = {'三相电压变化曲线'}
                                    text = {'电流:A'}
                                    color = {resColor2}
                                />


                                <Text style={{fontSize:14,color:'#2f4554',backgroundColor:'#FBFBFB',marginTop:10,padding:5}}>
                                    漏电变化曲线
                                </Text>
                                <CurveLineECharts height={280} 
                                    series={lineObj.resTre} 
                                    serTime={lineObj.serTime}
                                    resName={resName3} 
                                    // // title = {'三相电压变化曲线'}
                                    text = {'电压:V'}
                                    color = {resColor3}
                                />


                                <Text style={{fontSize:14,color:'#2f4554',backgroundColor:'#FBFBFB',marginTop:10,padding:5}}>
                                    三相四线温度变化曲线
                                </Text>
                                <CurveLineECharts height={280} 
                                    series={lineObj.resFou} 
                                    serTime={lineObj.serTime}
                                    resName={resName4} 
                                    // // title = {'三相电压变化曲线'}
                                    text = {'温度:℃'}
                                    color = {resColor4}
                                />
                            </View>
                        ) : lineObj && systemId === 2 ? (
                            <View>
                                <Text style={{fontSize:14,color:'#2f4554',backgroundColor:'#FBFBFB',marginTop:10,padding:5}}>
                                    消防液位值
                                </Text>
                                <CurveLineWater height={280} 
                                    series={lineObj} 
                                    // serTime={lineObj.serTime}
                                    // resName={resName1} 
                                    // // title = {'三相电压变化曲线'}
                                    text = {'液位:mm'}
                                    color = {resColor1}
                                />
                            </View>
                        ) :  lineObj && lineObj.serTime && systemId === 8 ? (
                            <View>
                                <Text style={{fontSize:14,color:'#2f4554',backgroundColor:'#FBFBFB',marginTop:10,padding:5}}>
                                    三相电压变化曲线
                                </Text>
                                <CurveLineECharts height={280} 
                                    series={lineObj.resOne} 
                                    serTime={lineObj.serTime}
                                    resName={resName1} 
                                    // // title = {'三相电压变化曲线'}
                                    text = {'电压:V'}
                                    color = {resColor2}
                                    systemId={systemId}
                                />


                                <Text style={{fontSize:14,color:'#2f4554',backgroundColor:'#FBFBFB',marginTop:10,padding:5}}>
                                    三相电流变化曲线
                                </Text>
                                <CurveLineEChartsTwo height={280} 
                                    series={lineObj.resTwo} 
                                    serTime={lineObj.serTime}
                                    resName={resName2} 
                                    // // title = {'三相电压变化曲线'}
                                    text = {'电流:A'}
                                    color = {resColor2}
                                    systemId={systemId}
                                />


                                <Text style={{fontSize:14,color:'#2f4554',backgroundColor:'#FBFBFB',marginTop:10,padding:5}}>
                                    漏电变化曲线
                                </Text>
                                <CurveLineECharts height={280} 
                                    series={lineObj.resTre} 
                                    serTime={lineObj.serTime}
                                    resName={resName3} 
                                    // // title = {'三相电压变化曲线'}
                                    text = {'电压:V'}
                                    color = {resColor3}
                                    systemId={systemId}
                                />


                                <Text style={{fontSize:14,color:'#2f4554',backgroundColor:'#FBFBFB',marginTop:10,padding:5}}>
                                    三相四线温度变化曲线
                                </Text>
                                <CurveLineECharts height={280} 
                                    series={lineObj.resFou} 
                                    serTime={lineObj.serTime}
                                    resName={resName4} 
                                    // // title = {'三相电压变化曲线'}
                                    text = {'温度:℃'}
                                    color = {resColor4}
                                    systemId={systemId}
                                />
                            </View>
                        ) : (
                            <View />
                        )
                    }
                </View>
            </View>
        );
    }
    
}



const styles = StyleSheet.create({
    container:{
        padding:10
    },
    title:{
        flexDirection:'row',
        paddingTop:5,
        paddingBottom:5,
    },
});


export default CurveScreens;