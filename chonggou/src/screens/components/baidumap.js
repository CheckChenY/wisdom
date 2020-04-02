/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { View,ScrollView} from 'react-native';
import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map';

const { Marker } = Overlay;


export default class BaiduMap extends Component {

    constructor() {
        super();
        this.state = {
            mayType: MapTypes.NORMAL,
            zoom: 18, 
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            center: { longitude: 113.773886, latitude: 34.720032 }
        };
    } 

    componentDidMount() { // 获取位置
        // const { getLocation,region } = this.props;
        // debugger;
        // Geolocation.getCurrentPosition()
        // .then(data => {
        //   console.log('getCurrentPosition',data);
        // })
        // .catch(e =>{
        //   console.warn(e, 'error');
        // })
        Geolocation.getCurrentPosition().then(
            data => {
                console.log(data);
                this.setState({
                    zoom:18,
                    center:{
                        latitude:data.latitude,
                        longitude:data.longitude,
                    }
                })
            }
        ).catch(error => {
            console.warn('error locationgetlocation',error)
        })
    }

    render() {
        const { width,height } = this.props;
        const { center } = this.state;
        console.log(center)
        return (
            <ScrollView>
                <MapView 
                    width={ width }  
                    height={ height } 
                    zoom={18}
                    trafficEnabled={true}
                    zoomControlsVisible={true}
                    mapType={MapTypes.NORMAL}
                    center={center}
                    // center={{ longitude: 116.465175, latitude: 39.938522 }}
                    // markers={ this.state.markers }
                >
                    <Marker 
                        location={center}
                        title="我是marker"
                    > 
                    </Marker>
                </MapView>
            </ScrollView>
        );
    }
}
