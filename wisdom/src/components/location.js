/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { View,ScrollView,Dimensions,Button,Text,TouchableOpacity} from 'react-native';
import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map';
const { width,height } = Dimensions.get('window');
const { Marker } = Overlay;
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default class BaiduMap extends Component {

    constructor() {
        super();
        this.state = {
            mayType: MapTypes.NORMAL,
            zoom: 18, 
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            // center: {}
            center: { longitude: 113.773886, latitude: 34.720032 }
        };
    } 

    // componentDidMount() { // 获取位置
    //     // const { getLocation,region } = this.props;
    //     // debugger;
    //     Geolocation.getCurrentPosition().then(data => {
    //         console.log(data);
    //         this.setState({
    //             zoom:18,
    //             center:{
    //                 latitude:data.latitude ? data.latitude : 39.938522 ,
    //                 longitude:data.longitude ? data.longitude : 116.465175 ,
    //                 // latitude:data.latitude,
    //                 // longitude:data.longitude,
    //             }
    //         })
    //     })
    //     .catch(e =>{
    //       console.warn(e, 'error');
    //     })
    // }

    onChangeMap = (val) => {
        console.log(val)
        this.setState({
            center:val
        })

        Geolocation.reverseGeoCode(val.latitude,val.longitude)
        .then(data => {
            console.log('reverseGeoCode',data);
            this.setState({
                address:data.address
            })
        })
        .catch(e =>{
            console.warn(e, 'error');
        }) 
    }

    render() {
        // const { width,height } = this.props;
        const { center } = this.state;
        // console.log(center)
        return (
            <ScrollView>
                <MapView 
                    width={ width }  
                    height={ height } 
                    zoom={18}
                    trafficEnabled={true}
                    zoomControlsVisible={true}
                    mapType={MapTypes.NORMAL}
                    onMapClick={this.onChangeMap}
                    center={center}
                    // center={{ longitude: 116.465175, latitude: 39.938522 }}
                    // markers={ this.state.markers }
                >
                    <Marker 
                        location={center}
                        // location={{ longitude: 116.465175, latitude: 39.938522 }}
                        title="我是marker"
                    > 
                    </Marker>
                </MapView>
                <View style={{ position:'absolute',top:height - 150,left: width / 2 - 20,justifyContent:'center',alignItems:'center' }}>
                    <Button
                        title={'确定'}
                        onPress={this.setLocation}
                    />
                </View>
            </ScrollView>
        );
    }


    setLocation = () => {
        this.props.navigation.navigate('addgateway',{
            locationed:this.state.center,
            address:this.state.address
        })
    }

}
