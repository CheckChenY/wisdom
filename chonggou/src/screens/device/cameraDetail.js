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
        // const { deviceId,deviceType,systemId } = navigation.state.params;
        // console.log(deviceType)
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 18 }}>设备详情</Text>
            ),
            headerRight: (
                <TouchableOpacity style={{paddingRight:15}} onPress={ () => navigation.navigate('EditAddVideo',{
                    deviceId:deviceId,
                    deviceType:deviceType
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
            types:2,
            list:[{label:'实时视频',bol:false,id:1},{label:'报警截图',bol:false,id:2},
            {label:'录像回放',bol:false,id:3},{label:'设备状态获取',bol:false,id:4}],
            arr:[]
        }
    }
    

    componentDidMount(){
        const { id } = this.props.navigation.state.params;
        const { list } = this.state;
        let obj = {
            id:id
        }///camera
        FetchManager.get('/camera/inner/jtlDeviceCamera/findId',obj, async (set) => {
            //下面的就是请求来的数据
            console.log(set)
            if(set&&set.success){
                let data = set.value[0];
                let sub = data.function.substring(0,data.function.length-1);
                let arr = sub.split(',');
                list.forEach((item,i)=>{
                    arr && arr.forEach((show,j)=>{
                        if(item.id === Number(show)){
                            item.bol = true
                        }
                    })
                })
                console.log(list)
                this.setState({
                    data:data,
                    arr:arr,
                    list:list
                })
            }
        }) 

    }
    
    
    render(){
        const { data,list,arr } = this.state;
        // console.log(obj);
        return(
            <ScrollView>
                <View>
                    <Image source={require('../../img/jrsb_img.png')} style={{width:'100%',height:186}}></Image>
                </View>
                <View style={{paddingTop:10}}>
                    <Content left="设备ID：" right={data.deviceId}></Content>
                    <Content left="应用名：" right={data.userName}></Content>
                    <Content left="应用密码：" right={data.password}></Content>
                    <Content left="设备名称：" right={data.deviceName}></Content>
                    <Content left="所属系统：" right={data.system ? data.system : '视频监控系统'}></Content>
                    <Content left="设备类型：" right={data.type}></Content>
                    <Content left="设备型号：" right={data.model}></Content>
                    <Content left="所在建筑：" right={data.build}></Content>
                    <Content left="楼层/区域：" right={data.floor}></Content>
                    <Content left="安装位置：" right={data.location}></Content>
                    <Content left="点位标注：" right={data.pointSign}></Content>
                    <Content left="安装时间：" right={data.model}></Content>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
                        <View style={{ width: '30%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text style={{ color: '#FD3E3C' }}>* </Text>
                                <Text style={{ color: '#333', fontSize: 15 }}>摄像头功能:</Text>
                            </View>
                        </View>
                        <View style={{ width: '67%' }}>
                            {
                                list && list.map((show,i)=>(
                                    <View key={i} style={{flexDirection:'row',marginTop:5}}>
                                        <TouchableOpacity style={{width:24}}>
                                            <Text style={{width:24,height:24,borderWidth:1,borderColor:'#333333',textAlign:'center',lineHeight:24}}>
                                                {
                                                    show.bol ? (
                                                        <FontAwesome style={{padding:2}} color="#DC4C40" name="heart" size={18} />
                                                    ) : <Text />
                                                }
                                            </Text>
                                        </TouchableOpacity>
                                        <Text style={{flex:1}}>{show.label}</Text>
                                    </View>
                                ))
                            }
                        </View>
                    </View>
                    
                    
                </View>
            </ScrollView>
        )
    }
}