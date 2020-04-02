import React , { Component } from 'react';
import {Text,View,StyleSheet,Dimensions,ScrollView,TouchableOpacity} from 'react-native';
// import { MapView } from 'react-native-amap3d'
import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
// const { Marker } = Overlay;

const { width,height } = Dimensions.get('window')

class MapScreen extends Component{


    static navigationOptions = ({ navigation, navigationOptions }) => {
        // debugger;
        return{
            title: '地图查看',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                textAlign: 'center',
                flex:1
            },
            headerLeft:(
                <TouchableOpacity onPress={()=>navigation.navigate('home')}>
                    <FontAwesome style={{paddingLeft:20}} name="th" size={18} />
                </TouchableOpacity>
            ),
            headerRight: <View />
        }
    };


    render(){
        return(
            <ScrollView>
                <View>
                    <Text>
                        我的地盘
                    </Text>
                    <MapView 
                        width={ width }  
                        height={600}
                        zoom={18}
                        trafficEnabled={true}
                        zoomControlsVisible={true}
                        mapType={MapTypes.SATELLITE}
                        center={{ longitude: 116.465175, latitude: 39.938522 }}
                    >
                    </MapView> 
                </View> 
            </ScrollView>
        )
    }
    componentDidMount(){
        Geolocation.getCurrentPosition().then(res=>{
            console.log(res)
        })
    }
}

// const styles = StyleSheet.create({
//     absoluteFill: {
//       backgroundColor: '#009688',
//       alignItems: 'center',
//       height:height,
//       width:width
//     },
//   })

export default MapScreen