/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { Text, View,Dimensions,TouchableOpacity,Alert,ScrollView} from 'react-native';
import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map';

import PunchClock from '../home/punchClock';

// const {height, width} = Dimensions.get('window');

const { Marker } = Overlay;

class HeaderRight extends Component {
  render(){
      const { navigation } = this.props,
      { titleRight,status } = navigation.state.params,
      url = status === 0 ? 'fileRecord' : 'workRecord'

      return(
          <TouchableOpacity onPress={() => navigation.navigate(url)}>
              <Text style={{ textAlign: 'center',fontSize:16 }}>{ titleRight }</Text>
          </TouchableOpacity>
      )
  }
}

export default class App extends Component {

  static navigationOptions = ({ navigation, navigationOptions }) => {
    console.log(navigationOptions)
    return {
        headerTitle: (
            <Text style={{ flex: 1, textAlign: 'center',fontSize:20 }}>{navigation.state.params.title}</Text>
        ),
        headerRight: <HeaderRight navigation={navigation} />
    };
};

  constructor() {
    super();
    this.state = {
        mayType: MapTypes.NORMAL,
        zoom: 15, 
        trafficEnabled: false,
        baiduHeatMapEnabled: false,
    };
  } 

  componentDidMount() { // 获取位置
    Geolocation.getCurrentPosition().then(
        (data) => {
          console.log(data);
            this.setState({
                zoom:18,
                markers:[{
                    latitude:data.latitude,
                    longitude:data.longitude,
                    title:'我的位置'
                }],
                center:{
                    latitude:data.latitude,
                    longitude:data.longitude,
                }
            })
        }
    ).catch(error => {
        console.warn(error,'error')
    })
  }

  render() {
    const { navigation } = this.props,
    height = navigation ? navigation.state.params.height : 320;
    return (
      <View>
        <ScrollView>
          <MapView 
            width={ Dimensions.get('window').width }  
            height={ height } 
            zoom={18}
            trafficEnabled={true}
            zoomControlsVisible={true}
            mapType={MapTypes.NORMAL}
            center={this.state.center}
            markers={ this.state.markers }
            // onMapClick = {this.onHandleClick}
            
          >
            <Marker 
              location={this.state.center}
              title="我是marker"
            > 
            </Marker>
          </MapView>
            { navigation ? navigation.state.params.title === "考勤打卡" ? <PunchClock /> :null  : null }
        </ScrollView>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   }
// });
