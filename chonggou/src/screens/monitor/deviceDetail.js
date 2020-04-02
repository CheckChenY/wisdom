import React, {Component} from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View, Text,Image,Dimensions,TouchableOpacity,ScrollView,} from 'react-native';
// import Modal from "react-native-modal";
const { height, width } = Dimensions.get('window');
import FetchManager from '../fetch/index';
import DeviceName from '../components/deviceName';
import SystemName from '../components/systemName';
import StatusName from '../components/statusName';
import { getAllFloor,getSigleFloor } from '../components/getSystex';

import { getWarnMsg } from '../components/warn';

import { dataAnalisys } from '../components/analisys';

class Content extends Component{
    render(){
        const { left,right } = this.props;
        return(
            <View style={{ flexDirection: 'row',marginTop:5,paddingLeft:15 }}>
                <Text style={{ fontSize:16,color:'#333',width:150,textAlign:'right' }}>{left}</Text>
                <Text style={{ flex:1,fontSize:14,color:'#666666' }}>{right}</Text>
            </View>
        )
    }
}



export default class DevDetail extends Component{
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { id } = navigation.state.params;
        // console.log(deviceType)
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 18 }}>设备详情</Text>
            ),
            headerRight: (
                <TouchableOpacity style={{paddingRight:15}} onPress={ () => navigation.navigate('EditAddDev',{
                    id:id
                })}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>
                        {/* 编辑 */}
                    </Text>
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

    constructor(){
        super()
        this.state = {
            data : '',
            floor:'',
            AllCamera:'',
            types:2
        }
    }
    

    componentDidMount(){
        const { id,types } = this.props.navigation.state.params;
        // let url = types === 2 ? '/device/inner/jtlDevice/getDetailApp' : '/camera/inner/jtlDeviceCamera/findId';
        let obj = {
            deviceId:id
        };
        this.setState({
            types:types
        })
        FetchManager.get('/device/inner/jtlDevice/getDetailApp',obj, async (set) => {
            //下面的就是请求来的数据
            console.log(set)
            if(set&&set.success){
                let data = set.value[0];
                this.setState({
                    data:data,
                })
            }
        }) 

    }
    
    
    render(){
        const { data,types } = this.state;
        // console.log(obj);
        return(
            <ScrollView>
                <View>
                    <Image source={require('../../img/jrsb_img.png')} style={{width:'100%',height:186}}></Image>
                </View>
                <View style={{paddingTop:10}}>
                    <Content left="设备名称：" right={data.deviceName}></Content>
                    {
                        types === 2 ? (
                            <View>
                                <Content left="应用名：" right={data.type}></Content>
                                <Content left="应用密码：" right={data.build}></Content>
                            </View>
                        ) : <View />
                    }
                    <Content left="设备ID：" right={data.deviceId}></Content>
                    <Content left="所属系统：" right={data.system ? data.system : '视频监控系统'}></Content>
                    <Content left="设备类型：" right={data.type}></Content>
                    <Content left="所在建筑：" right={data.build}></Content>
                    <Content left="楼层/区域：" right={data.floor}></Content>
                    <Content left="安装位置：" right={data.location}></Content>
                    <Content left="设备型号：" right={data.model}></Content>
                    <Content left="生产厂家：" right={data.orgName}></Content>
                    <Content left="生产日期：" right={data.manufactureDate}></Content>
                    <Content left="服务期限：" right={data.expirationDate}></Content>
                    {/* <Content left="设备状态：" right={StatusName[obj.warnState]}></Content>
                    <Content left="周边摄像头：" right={AllCamera}></Content> */}
                    {/* <Content left="主摄像头：" right={data.relevantCamera}></Content> */}
                    {/* {
                        obj.deviceType === '41' ? (
                            <Content left="网关标识码：" right={obj.deviceCode}></Content>
                        ) : <Text />
                    } */}
                </View>
            </ScrollView>
        )
    }
}