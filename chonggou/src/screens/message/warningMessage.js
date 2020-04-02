import React, { Component } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View,Text,Image,TouchableOpacity} from 'react-native'
import FetchManager from '../fetch/index';


class Content extends Component {
    render() {
        return (
            <View style={{ flexDirection: 'row',marginTop:10}}>
                <View style={{width:100}}>
                    <Text style={{fontSize:14,color:'#333',textAlign:'right'}}>{this.props.left}</Text>
                </View>
                <View style={{flex:1}}>
                    <Text style={{color:'#666',fontSize:14,lineHeight:20}}>{this.props.right}</Text>
                </View>
            </View>
        )
    }
}

export default class CompanyInfo extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 18 }}>消息详情</Text>
            ),
            headerRight: (
                <TouchableOpacity onPress={()=>navigation.navigate('CaseDealList')}>
                    <View style={{paddingRight:15,flexDirection:'row',alignItems:'center'}}>
                        <Text style={{color:'#fff',fontSize:16,paddingRight:5,paddingTop:3}}>前往处理</Text>
                    </View>
                </TouchableOpacity>
            ), 
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
                height: 50
            }
        };
    };
    constructor(props) {
        super(props)
        this.state={
            companyInfo:{},
            warnObj:{}
        }
    }

    componentDidMount(){
        const { data } = this.props.navigation.state.params;
        console.log(data)
        this.getwarndetail(data)
        this.setState({
            companyInfo:data
        })
    }
    
    getwarndetail(data){
        console.log(data)
        var obj={
            param:data.concreteContent,
        }
        FetchManager.get('/alarm/inner/jtlAlarmRecord/findDetailById',obj, (set) => {
            console.log(set)
            if(set && set.success){
                this.setState({
                    warnObj:set.value
                })
            }
        })


        FetchManager.post('/notice/inner/jtlNoticeAcceptMessage/updateAlreadyread ',{
            id:data.id
        }, (set) => {
            console.log(set)
            if(set && set.success){
                // this.setState({
                //     warnObj:set.value
                // })
            }
        })
    }

    render() {
        const { companyInfo,warnObj } = this.state;
        return (
            <View style={{padding:10}}>
                <Content left='报警时间:' right={companyInfo.sendTime}/>
                <Content left='设备名称:' right={companyInfo.acceptNoticeTitle} />
                <Content left='所属系统:' right={companyInfo.subordinateSystem}/>
                <Content left='所在建筑:' right={warnObj.building}/>
                <Content left='楼层/区域:' right={warnObj.floor}/>
                <Content left='安装位置:' right={warnObj.location}/>
                <Content left='设备状态:' right={warnObj.alarmType=='0'?'正常':warnObj.alarmType=='1'?'报警':warnObj.alarmType=='2'?'故障':warnObj.alarmType=='3'?'报警&故障':warnObj.alarmType=='4'?'离线':'温湿度传感器故障'}/>
                <Content left='报警类型:' right={warnObj.alarmDetails?warnObj.alarmDetails.join(','):''}/>
                <Content left='警情程度:' right={warnObj.alarmLevel=='0'?'无报警':warnObj.alarmLevel=='1'?'一般':warnObj.alarmLevel=='2'?'重要':warnObj.alarmLevel=='3'?'严重':'其他'}/>
                {/* <Content left='所在建筑:' right={companyInfo.orgName}/>
                <Content left='楼层/区域:' right={companyInfo.orgCode} />
                <Content left='安装位置:' right={companyInfo.orgType}/>
                <Content left='设备状态:' right={companyInfo.regionId}/>
                <Content left='报警类型:' right={companyInfo.orgType}/>
                <Content left='警情程度:' right={companyInfo.regionId}/> */}
            </View>
        )
    }
}