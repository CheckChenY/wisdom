import React, { Component } from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CameraComponent from '../components/cammer'
import { Text, View,Image,TextInput, KeyboardAvoidingView,StyleSheet,TouchableOpacity,ScrollView,AsyncStorage } from "react-native";
import FetchManager from '../fetch/index';
// import { getAllFloor,getSigleFloor } from '../components/getSystex';
// import SelectSingle from '../components/select/selectobj';
// import DeviceName from '../components/deviceName';
// import SystemName from '../components/systemName';
// import { getWarnMsg } from '../components/warnPublic';
// import StatusName from '../components/statusName';
import waringTypeName from '../components/waringTypeName';
import { dataAnalisys } from '../components/analisys';
import ModelPop from '../components/modelPop';

class Content extends Component{
    render(){
        return(
            <View style={{ flexDirection: 'row',paddingLeft:20,marginBottom:10 }}>
                <View style={{ width:120 }}>
                    <Text style={{textAlign: 'right',fontSize:14,color:'#333' }}>{this.props.left}</Text>
                </View>
                <View style={{ flex:1}}>
                    <Text style={{ fontSize:14,color:'#666' }}>{this.props.right}</Text>
                </View>
            </View>
        )
    }
}

class CaseDeal extends Component {
    constructor(props){
        super(props)
        this.state={
            data:[],
            // paramList:[],//设备参数
            warnText:'',//状态描述
            warnLevel:{
                '0':'无报警',
                '1':'一般',
                '2':'重要',
                '3':'严重',
            },
            userData:{warnDealResultPhoto:'/upload/91a23196-1d3b-48ee-b5f0-ee934ce16270.jpg'}
        }
        // this.selectWarnConfirm=this.selectWarnConfirm.bind(this)
    }
  
    
    componentDidMount(){
        // debugger;
        const { deviceId,id,disabled } = this.props.navigation.state.params;
        console.log(deviceId)
        let obj = {
            deviceId:deviceId,
            param:id
        }
        FetchManager.get('/alarm/inner/jtlAlarmRecord/findDetailById',obj, (set) => {
            console.log(set)
            if(set && set.success){
                let data = set.value
                let txt = data.alarmDetails;
                let t = ''
                txt && txt.forEach(show=>{
                    t += show
                })
                this.setState({
                    data:data,
                    warnText:t
                })
            }
        })
        let objs = {
            recordId:id
        }///alarm
        FetchManager.get('/alarm/inner/jtlAlarmProcess/findByRecordId',objs, (set) => {
            console.log(set)
            if(set && set.success){
                this.setState({
                    userData:set.value
                })
            }
        })
    }


    onChangeIndex = (val) => {
        // let nub = val === 0 ? Number(val) + 2 : 1;
        console.log(val)
        // this.getData();
    }

    render() {
        const { disabled } = this.props.navigation.state.params;
        const { data,warnText,userData,
            warnLevel } = this.state;
        return (
            <KeyboardAvoidingView enabled>
            <ScrollView>
                <View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:1}}>
                            <Content left='设备名称：' right={data.deviceName}/>
                            <Content left='设备类型：' right={data.deviceType}/>
                            <Content left='所属系统：' right={data.system}/>
                            <Content left='所在建筑：' right={data.building}/>
                            <Content left='楼层/区域：' right={data.floor}/>
                            <Content left='具体位置：' right={data.location}/>
                            <Content left='上报时间：' right={data.createTime}/>
                            {/* <Content left='报警状态：' right={StatusName[data.alarmLevel]}/> */}
                            <Content left='警情程度：' right={warnLevel[data.alarmLevel]}/>
                        </View>
                    </View>
                    <View style={{ paddingTop:5,paddingBottom:5 }}>
                        <Content left='报警类型：' right={warnText}/>
                    </View>

                    {
                        disabled ? <View /> : (
                            <View>

                                <View style={styles.tit}>
                                    <Text style={{color:'#3AA1FE',fontSize:16}}>警情处理</Text>
                                </View>
                
                                <View>
                                    <View style={{padding:10,flexDirection:'row'}}>
                                        <View style={{width:120,alignItems:"flex-end",justifyContent:'center'}}>
                                            <View style={{flexDirection:'row'}}>
                                                <Text style={{color:'#333',fontSize:16,textAlign:'right',justifyContent:"center"}}> 处理时间：</Text>
                                            </View>
                                        </View>
                                        <Text style={{color:'#333',fontSize:14}}>{ userData ? userData.dealTime : '' }</Text>   
                                    </View>
                                    <View style={{padding:10,flexDirection:'row'}}>
                                        <View style={{width:120,alignItems:"flex-end",justifyContent:'center'}}>
                                            <View style={{flexDirection:'row'}}>
                                                <Text style={{color:'#333',fontSize:16,textAlign:'right',justifyContent:"center"}}> 处理人：</Text>
                                            </View>
                                        </View>
                                        <Text style={{color:'#333',fontSize:14}}>{data.warnHandler ? data.warnHandler : ''}</Text>   
                                    </View>
                                </View>
                                <View style={{padding:10,flexDirection:'row'}}>
                                    <View style={{width:120,alignItems:"flex-end",justifyContent:'center'}}>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={{color:'red'}}>*</Text>
                                            <Text style={{color:'#333',fontSize:16,textAlign:'right',justifyContent:"center"}}> 警情处理：</Text>
                                        </View>
                                    </View>
                                    <Text style={{flex:1}}>{userData ? waringTypeName[userData.warnConfirmType] : '' }</Text>
                                </View>
                                <View style={{padding:10,flexDirection:'row'}}>
                                    <View style={{width:120,alignItems:"flex-end",justifyContent:'center'}}>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={{color:'red'}}>*</Text>
                                            <Text style={{color:'#333',fontSize:16,textAlign:'right',justifyContent:"center"}}> 处理描述：</Text>
                                        </View>
                                    </View>
                        
                                    <Text style={{color:'#333',fontSize:14}}>{ userData ? userData.warnDealDes : ''}</Text>
                                </View>
                                <View style={{padding:10,flexDirection:'row'}}>
                                    <View style={{width:120,alignItems:"flex-end",justifyContent:'center'}}>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={{color:'red'}}>*</Text>
                                            <Text style={{color:'#333',fontSize:16,textAlign:'right',justifyContent:"center"}}> 处理结果图：</Text>
                                        </View>
                                    </View>
                                    <View style={{flex:1}}>
                                        <Image
                                            style={{width:80,height:60}}
                                            resizeMode ='contain'
                                            source={{uri:'http://192.168.0.186:60080/' + data ? data.alarmPhoto : '/upload/91a23196-1d3b-48ee-b5f0-ee934ce16270.jpg' }}
                                        />
                                    </View>
                                </View>
                            </View>
                        )
                    }

                    <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
                </View>
            </ScrollView>   
            </KeyboardAvoidingView>
        );
    }
    // selectWarnConfirm=(item)=>{
    //     this.setState({
    //         warnConfirmType:item.value
    //     })
    // }

    // getLocalImgBase = (val) => {
    //     this.setState({
    //         warnLocaleConfirmPhoto:'data:image/jpg;base64,' + val
    //     });
    // }
    // getDealImgBase = (val) => {
    //     this.setState({
    //         warnDealResultPhoto:'data:image/jpg;base64,' + val
    //     });
    // }
}
export default CaseDeal;

const styles = StyleSheet.create({
    tit: {
        padding:10,
        backgroundColor: '#F2F7FB',
    },
    logo:{
        width:105,
        height:95
    }
})