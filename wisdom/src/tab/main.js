import React, { Component } from 'react';
import Select from '../components/select/select';
import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import HeaderComponent from '../components/header';
import FetchManager from '../http/http'
import { getDay,getMonth } from '../components/home/changeTime';

class MainScreen extends Component{
    constructor(){
        super()
        this.state={
            timeType:'Date',
            wangguanList: [],
            wangguandefault: '',
            detail:{},
            lineList:[],
            n_year:moment().format('YYYY'),
            n_month:moment().format('M'),
            n_day:moment().format('D'),
            // n_month:moment().format('MM')>=10?moment().format('MM'):moment().format('MM').split('0')[1],
            // n_day:moment().format('DD')>=10?moment().format('DD'):moment().format('DD').split('0')[1],
            bol_date:true,
            deviceId:'',
            time:moment().format('YYYY-MM-DD'),
            url:'getReportFormsByDay',
            
            
            // arr:['智慧网管1','智慧网管2','智慧网管3','智慧网管4'],
            // arrDefault:'智慧网管1',
        }
    }

    componentDidMount(){
        this.findAllNet();
        // console.log('1',moment().format('DD'))
    }

    findAllNet = () => {
        FetchManager.get('/app/acbdevice/findAllNet','', async (set) => {
            console.log(set)
            if(set.status === 0 && set.data.length > 0){
                let detail = set.data;
                let arr = [],arrdefault;
                detail.forEach((show,i) => {
                    if(i === 0){
                        arrdefault = show.deviceName
                    }
                    arr.push(show.deviceName)
                })

                this.setState({
                    wangguanList:arr,
                    wangguandefault:arrdefault,
                    detail:detail,
                    deviceId:detail[0].deviceId
                })

                this.findSwitchList(detail[0].deviceId)

            }
        })
    }



    findSwitchList = (id) => {
        const { deviceId,time,url } = this.state;
        console.log(time)
        
        let obj = {
            getwayDeviceId: id ? id : deviceId,
            time:time
        }
        console.log(obj)
        FetchManager.get('/app/acbElectricityAlarm/' + url,obj, async (set) => {
            console.log(set)
            if(set.status === 0 && set.data.length > 0){
                let data = set.data;
                this.setState({
                    lineList:data
                })
            }else{
                this.setState({
                    lineList:[]
                })
            }

        })
    }


    getDayNow = (nub,bol_date) => {
        const { n_year,n_month,n_day } = this.state;
        // let l_t = daytime.substring(daytime.lenght - 3,daytime.lenght - 1);
        let n_d = bol_date ? getDay(Number(n_year),Number(n_month),Number(n_day),nub) : getMonth(Number(n_year),Number(n_month),Number(n_day),nub)
        console.log(n_d);
        this.setState({
            n_day:n_d.day,
            n_month:n_d.month,
            n_year:n_d.year,
            time:bol_date ? n_d.year + '-' + n_d.month + '-' + n_d.day : n_d.year + '-' + n_d.month
        },this.findSwitchList)
    }


    getListData = (e,i,item) => {
        this.setState({
            deviceId:item.deviceId
        },this.findSwitchList)
    }

    onChangeBtn = (e,i) => {
        const { n_year,n_month,n_day } = this.state;
        this.setState({
            bol_date:!this.state.bol_date,
            time:e === 1 ? n_year + '-' + n_month : n_year + '-' + n_month + '-' + n_day,
            url:e === 1 ? 'getReportFormsByMonth' : 'getReportFormsByDay'
        },this.findSwitchList)
    }


    render(){
        const { wangguanList,wangguandefault,n_day,n_month,n_year,bol_date,detail,lineList } = this.state;
        let total = 0;
        return(
            <View>
                {/* 头部 */}
               
                <HeaderComponent {...this.props} arr={wangguanList} arrDefault={wangguandefault} 
                    onChangeBtn = {this.onChangeBtn} item = {detail}
                    getListData={this.getListData} >
                    <Text title="按日">按日</Text>
                    <Text title="按月">按月</Text>
                </HeaderComponent>
                <ScrollView>
                    <View style={{ backgroundColor: '#fff',flexDirection:'row',padding:10 }}>
                        <View style={{flex:1,alignItems:'flex-end',paddingRight:20}}>
                            <TouchableOpacity onPress={()=>this.getDayNow(0,bol_date)}>
                                <FontAwesome name={'chevron-left'} color='#999999' size={20} />
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                            <Text style={{color:'#000000'}}>
                                {n_year}年{n_month < 10 ? '0' + n_month : n_month}月
                                {
                                    bol_date ? (
                                        <Text>{n_day < 10 ? '0' + n_day : n_day}日</Text>
                                    ) : <Text />
                                }
                                
                            </Text>
                            <FontAwesome name={'calendar'} color={'#999999'} size={20} />
                        </View>
                        <View style={{flex:1,paddingLeft:20}}>
                            <TouchableOpacity onPress={()=>this.getDayNow(1,bol_date)}>
                                <FontAwesome name={'chevron-right'} color={'#999999'} size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{paddingLeft:15,paddingRight:15,backgroundColor:'#fff',marginTop:10,marginBottom:20,}}>
                        <View style={{borderBottomColor:'#E8E8E8',borderBottomWidth:1,height:38,flexDirection:'row',}}>
                            <View style={{justifyContent:'center',alignItems:'center',width:'25%'}}>
                                <Text style={{fontSize:12,color:'#666'}}>线路名</Text>
                            </View>
                            <View style={{justifyContent:'center',alignItems:'center',width:'25%'}}>
                                <Text style={{fontSize:12,color:'#666'}}>用电量（KW·h）</Text>
                            </View>
                            <View style={{justifyContent:'center',alignItems:'center',width:'25%'}}>
                                <Text style={{fontSize:12,color:'#666'}}>峰值功率（w）</Text>
                            </View>
                            <View style={{justifyContent:'center',alignItems:'center',width:'25%'}}>
                                <Text style={{fontSize:12,color:'#666'}}>异常次数（次）</Text>
                            </View>
                        </View>
                        {
                            lineList.length > 0 && lineList.map((item,index)=>{
                                // console.log(item)
                                // const { deviceData } = item;
                                total +=  item.deviceData && parseInt(item.deviceData.electricData)? parseInt(item.deviceData.electricData) : 0;
                                // console.log(deviceData ?deviceData.electricData : 0)
                                return(
                                    <View key={index} style={{borderBottomColor:'#E8E8E8',borderBottomWidth:1,height:45,flexDirection:'row',}}>
                                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:'25%'}}>
                                            <Image style={{width:25,height:25,marginRight:10,}} source={{uri:item.modelPhoto}}></Image>
                                            <Text style={{fontSize:12,color:'#666'}}>{item.deviceName}</Text>
                                        </View>
                                        <View style={{justifyContent:'center',alignItems:'center',width:'25%'}}>
                                            <Text style={{fontSize:12,color:'#666'}}>{!item.deviceData ? '':item.deviceData.electricData?item.deviceData.electricData:'0'}</Text>
                                        </View>
                                        <View style={{justifyContent:'center',alignItems:'center',width:'25%'}}>
                                            <Text style={{fontSize:12,color:'#666'}}>{item.deviceData ? item.deviceData.powerData : '0'}</Text>
                                        </View>
                                        <View style={{justifyContent:'center',alignItems:'center',width:'25%'}}>
                                            <Text style={{fontSize:12,color:'#666'}}>{item.deviceData ? item.deviceData.alertCount : '0'}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                        <View style={{marginTop:15,paddingRight:15,paddingLeft:15,paddingBottom:50,flexDirection:'row',justifyContent:'space-between'}}>
                            <View>
                                <Text style={{fontSize:12,color:'#999'}}>共计用电：<Text style={{fontSize:16,color:'#127CFE'}}>{total}</Text>kw·h</Text>
                            </View>
                            {/* <View>
                                <Text style={{fontSize:12,color:'#999'}}>电费：<Text style={{fontSize:16,color:'#127CFE'}}>0.0</Text>元</Text>
                            </View> */}
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const style=StyleSheet.create({
    dateselect: {
        backgroundColor: '#467cd4',
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:3,
        padding:3,
        flex:1
    },
    dateselectTexted: {
        color: '#FFFFFF',
    },
    dateselectText: {
        color: '#467cd4',
    },
    dateselected: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:3,
        padding:3,
        flex:1
    },
})


export default MainScreen