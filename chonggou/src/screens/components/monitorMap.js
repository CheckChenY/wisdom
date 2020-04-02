/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { View,ScrollView,Text,TouchableOpacity,Linking} from 'react-native';
import Modal from "react-native-modal";
import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map';
import FetchManager from '../fetch/index';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const { Marker } = Overlay;




export default class BaiduMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mayType: MapTypes.NORMAL,
            zoom: 15, 
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            isModalVisible:false,
            mapData:{},
        };
    } 

    componentDidMount() { // 获取位置
        FetchManager.get('1/unitdevice/selectMapMonitor', '' , async (set) => {
            console.log(set)
            //下面的就是请求来的数据
            if(set&&set.data){
                let str = set.data.position;
                let arr = str.split(',')
                this.setState({
                    center:{
                        latitude:Number(arr[1]),
                        longitude:Number(arr[0]),
                    }
                })
            }
        })
    }

    onMapModal = () => {
        FetchManager.get('1/unitdevice/selectMapMonitor', '' , async (set) => {
            console.log(set)
            //下面的就是请求来的数据
            if(set&&set.data){
                this.setState({
                    mapData:set.data,
                })
            }
        })

        this.setState({ isModalVisible: !this.state.isModalVisible });
    }


    onCancelModal = () =>{
        this.setState({ isModalVisible: false });
    }

    onChangeLink = (phone) => {
        let tel = 'tel:' + phone// 目标电话
        Linking.canOpenURL(tel).then((supported) => {
            if (!supported) {
                console.log('Can not handle tel:' + tel)
            } else {
                this.setState({
                    isModalVisible:true,
                })
                return Linking.openURL(tel)
            }
        }).
        catch(error => console.log('tel error', error))
    }

    render() {
        const { state,props } = this,
        { isModalVisible,mapData,center } = state,
        { width,height } = props;
        return (
            <View>
                <ScrollView>
                    <MapView 
                        width={ width }  
                        height={ height } 
                        zoom={18}
                        trafficEnabled={true}
                        zoomControlsVisible={true}
                        mapType={MapTypes.NORMAL}
                        onMarkerClick={this.onMapModal}
                        center={center}
                    >
                        <Marker 
                            location={center}
                            title="我是marker"
                        > 
                        </Marker>
                    </MapView>
                </ScrollView>

                <Modal 
                    isVisible={ isModalVisible }
                >
                    <View style={{ flex: 1}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
                            <View style={{width:'80%',backgroundColor:"#FFFFFF",padding:10,borderRadius:3}}>

                                <View style={{flexDirection:'row',marginTop:10,borderBottomWidth:1,borderBottomColor:'#CCCCCC'}}>
                                    <View style={{flex:1}}>
                                        <Text style={{fontWeight:"700",fontSize:16,textAlign:'center',padding:5}}>
                                            {mapData.org_name}
                                        </Text>
                                    </View>
                                    <View style={{flex:1,justifyContent:'center'}}>
                                        <Text style={{fontSize:12,color:'#3AA1FE'}}>
                                            单位消防安全评测:{mapData.score}分
                                        </Text>
                                    </View>
                                </View>


                                <View>
                                    {/* <View style={{padding:5}}>
                                        <Text style={{padding:5,fontWeight:"600"}}>{mapData.org_name}</Text>
                                        <Text style={{padding:5}}>单位消防安全评测:90分</Text>
                                    </View> */}
                                    <View style={{flexDirection:"row",padding:5}}>
                                        <View style={{width:50,justifyContent:'center',alignItems:'center'}}>
                                            <Text style={{width:8,height:8,borderWidth:1,borderRadius:5,backgroundColor:'#FD3E3C',borderColor:"#FD3E3C"}}></Text>
                                        </View>
                                        <Text style={{flex:1,fontSize:12}}>报警设备数量 : {mapData.alarm_amount}</Text>
                                    </View>
                                    <View style={{flexDirection:"row",padding:5}}>
                                        <View style={{width:50,justifyContent:'center',alignItems:'center'}}>
                                            <Text style={{width:8,height:8,borderWidth:1,borderRadius:5,backgroundColor:'#FFBB2A',borderColor:"#FFBB2A"}}></Text>
                                        </View>
                                        <Text style={{flex:1,fontSize:12}}>故障设备数量 : {mapData.fault_amount}</Text>
                                    </View>
                                    <View style={{flexDirection:"row",padding:5}}>
                                        <View style={{width:50,justifyContent:'center',alignItems:'center'}}>
                                            <Text style={{width:8,height:8,borderWidth:1,borderRadius:5,backgroundColor:'#A6A6A6',borderColor:"#A6A6A6"}}></Text>
                                        </View>
                                        <Text style={{flex:1,fontSize:12}}>离线设备数量 : {mapData.offline_amount}</Text>
                                    </View>
                                    <View style={{flexDirection:"row",padding:5}}>
                                        <View style={{width:50,justifyContent:'center',alignItems:'center'}}>
                                            <Text style={{width:8,height:8,borderWidth:1,borderRadius:5,backgroundColor:'#5CDD00',borderColor:"#5CDD00"}}></Text>
                                        </View>
                                        <Text style={{flex:1,fontSize:12}}>正常设备数量 : {mapData.normal_amount}</Text>
                                    </View>
                                    <View style={{paddingTop:5,paddingLeft:5}}>
                                        <Text style={{fontSize:12}}>负责人 : {mapData.safetyManager}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',paddingTop:4,paddingLeft:5}}>
                                        <Text style={{flex:1,fontSize:12}}>联系电话:{mapData.safetyPhone}</Text>
                                        <View style={{width:40,fontSize:14,color:"#666666",}}>
                                            <TouchableOpacity onPress={()=>this.onChangeLink(mapData.safetyPhone)}>
                                                <FontAwesome color="#3AA1FE" name="phone" size={18}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    {/* <View style={{paddingTop:5,paddingLeft:5}}>
                                        <Text style={{fontSize:12}}>下班时间 : 下午18：00</Text>
                                    </View> */}
                                </View>
                                <View>

                                </View>
                                <View style={{justifyContent:'center',alignItems:'center',marginTop:10}}>
                                    <TouchableOpacity onPress={this.onCancelModal}>
                                        <View style={{backgroundColor:'#3AA1FE',borderRadius:3,padding:5,width:84,justifyContent:'center',alignItems:'center'}}>
                                            <Text style={{textAlign:"center",color:"#ffffff"}}>确定</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
