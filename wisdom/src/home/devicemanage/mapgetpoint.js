import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Platform,TouchableOpacity } from 'react-native';

// import { BaiduMapManager } from 'react-native-baidu-map'
// BaiduMapManager.initSDK('sIMQlfmOXhQmPLF1QMh4aBp8zZO9Lb2A');

import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map';
import Modal from "react-native-modal";
import FetchManager from '../../http/http';
const { Marker } = Overlay;
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const { width,height } = Dimensions.get('window');
import TitleComponent from '../../components/home/title';
export default class BaiduMapDemo extends Component {

    static navigationOptions = ({ navigation, navigationOptions }) => {
        // debugger;
        return{
            header:null
        }
    };

    constructor() {
        super();
        this.state = {
            zoomControlsVisible: true,
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            mapType: MapTypes.NORMAL,
            zoom: 15,
            // center: {
            //     longitude: 113.773989,
            //     latitude: 34.720097,
            // },
            clickMessage: '', //空白区域信息
            poiMessage: '', //已有点信息
            clickMessageData: [], //空白区域附近数据
            poiMessageData: [], //已有点附近数据
            localtion:'',

            
            mapData:[],
            isModalVisible:false,
            lineData:[]
        };
    }
 
    componentDidMount() {
        FetchManager.get('/app/acbdevice/map', '' , async (set) => {
            console.log(set)
            //下面的就是请求来的数据
            if(set.status === 0){
                set.data.forEach(key=>{
                    if(key.pointSign){
                        // let obj = {};
                        key.pointSign = key.pointSign ? key.pointSign.split(',') : key.pointSign
                        // obj['longitude'] = Number(key.position[0])
                        // obj['latitude'] = Number(key.position[1])
                        // arry.push(obj)
                    }
                })
                this.setState({
                    mapData:set.data,
                    lineData:set.data[0],
                    center:{
                        latitude:Number(set.data[0].pointSign[0]),
                        longitude:Number(set.data[0].pointSign[1]),
                    }
                })
            }
        })
    }

    onMapModal = (item) => {
        console.log(item.title)
        const { mapData } = this.state;
        mapData.forEach((show,i) => {
            if(show.deviceId === item.title){
                this.setState({
                    lineData:show
                },this.onCancelModal)
            }
        })
    }

    onCancelModal = () =>{
        setTimeout(()=>{
            this.setState({ isModalVisible: !this.state.isModalVisible });
        },1000)
    }
    
    render() {
        const { state,props } = this,
        { isModalVisible,mapData,center,lineData } = state;
        let arr = [];
        {
            mapData.length > 0 && mapData.map((item,i) => {
                if(item && item.pointSign){
                    let obj = {};
                    obj.longitude = Number(item.pointSign[1]);
                    obj.latitude = Number(item.pointSign[0])
                    arr.push(obj)
                }

            })
        }

        console.log(lineData);
        return (
            <ScrollView style={styles.container}>
                <View style={{ height: 55, backgroundColor: '#467cd4', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <View style={{flex:1}}>
                        <TouchableOpacity onPress={() =>{this.returnBack()}} style={{paddingRight:15,}}>
                            <View style={{ paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesome color="#fff" name="chevron-left" size={18} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
                        <Text style={{ textAlign: 'center', fontSize: 18, color: '#fff' }}>地理位置</Text>
                    </View>
                    <View style={{flex:1}}></View>
                </View>
                <MapView 
                    // zoomControlsVisible={this.state.zoomControlsVisible} //默认true,是否显示缩放控件,仅支持android
                    // trafficEnabled={this.state.trafficEnabled} //默认false,是否显示交通线
                    // baiduHeatMapEnabled={this.state.baiduHeatMapEnabled} //默认false,是否显示热力图
                    // mapType={this.state.mapType} //地图模式,NORMAL普通 SATELLITE卫星图
                    // zoom={this.state.zoom} //缩放等级,默认为10
                    // center={this.state.center}

                    width={ width }  
                    height={ 400 } 
                    zoom={10}
                    trafficEnabled={true}
                    zoomControlsVisible={true}
                    mapType={MapTypes.NORMAL}
                    onMarkerClick={this.onMapModal}
                    center={center}

                    style={styles.map}
                >

                    {
                        Platform === 'ios' ? <Text /> : (
                            arr.map((item,i)=>(
                                <Marker 
                                    key={i}
                                    location={item}
                                    title={mapData[i].deviceId}
                                    > 
                                </Marker> 
                            ))
                        )
                    }
                </MapView>
                {/* <View style={{ flex: 1,}}>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center',}}> */}
                        <View style={{backgroundColor:"#FFFFFF",padding:10,borderRadius:3,marginTop:20}}>
                            <TitleComponent title={'位置信息'} />
                            <View style={{marginLeft:10}}>
                                <View style={{paddingTop:4,paddingLeft:5}}>
                                    <Text style={{flex:1,fontSize:12}}>设备名称:{lineData.deviceModel}</Text>
                                </View>
                                <View style={{paddingTop:4,paddingLeft:5}}>
                                    <Text style={{flex:1,fontSize:12}}>安装位置:{lineData.location}</Text>
                                </View>
                            </View>
                        </View>
                    {/* </View>
                </View> */}
                {/* {
                   isModalVisible ? (

                   ) : <View />
                } */}
                {/* <View 
                    isVisible={ isModalVisible }
                >
                </View> */}
            </ScrollView>
        );
    }
    returnBack=()=>{
        console.log(this.state.center)
        console.log(this.state.localtion)
        this.props.navigation.state.params.getData(this.state.center,this.state.localtion)
        this.props.navigation.goBack()
        // this.props.navigation.navigate('addgateway',{
        //     pointSign:this.state.center,
        //     localtion:this.state.localtion
        // })
    }
    _header = () => {
        return (
            <Text>附近信息: </Text>
        )
    }
    _renderItem = (item) => {
        
        item = item.item;
        let H = Math.random() * 1000;
        H = Math.ceil(H);
        return (
            <View style={[styles.item,{backgroundColor:`hsl(${H},50%,30%)`}]}>
                <Text style={styles.itemText}>纬度: {item.latitude}</Text>
                <Text style={styles.itemText}>经度: {item.longitude}</Text>
                <Text style={styles.itemText}>地点: {item.name}</Text>
                <Text style={styles.itemText}>地址: {item.address}</Text>
            </View>
        )
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    map: {
        width: width,
        height: height-300,
        marginBottom: 5,
    },
    list: {
        flexDirection: 'row',
        paddingLeft: 10,
        marginBottom: 5,
    },
    item: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        paddingHorizontal: 5,
        paddingVertical: 8,
    },
    itemText: {
        color: '#fff',
    }
});
