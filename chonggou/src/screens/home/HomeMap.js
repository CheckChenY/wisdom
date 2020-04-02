import React,{ Component } from 'react';
import { View,Text,TouchableOpacity,Dimensions } from 'react-native'; 
import BaiduMap from '../components/monitorMap'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FetchManager from '../fetch/index';

var { width,height } = Dimensions.get("window");

class HomeMap extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center',color:'#fff',fontSize:17 }}>地图监控</Text>
            ),
            headerRight:(
                <Text></Text>
            ),
            headerLeft:(
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                        <FontAwesome color="#fff" name="angle-left" size={28}/>
                        <Text style={{color:'#fff',fontSize:16,paddingLeft:5,paddingTop:3}}>返回</Text>
                    </View>
                </TouchableOpacity>
            ),
            headerStyle:{
                backgroundColor: '#3AA1FE',
                height:50
            }
        };
    };

    constructor(props){
        super(props)
        this.state = {
            latitude:'',
            longitude:''
        }
    }

    // componentDidMount(){
    //     var params={}
    //     FetchManager.get('1/unitdevice/selectMapMonitor',params, async (set) => {
    //         console.log(set)
    //         debugger;
    //         if(set&&set.data){
    //             let str = set.data.position;
    //             let arr = str.split(',')
    //             // let center = {}
    //             // arr['latitude'] = Number(show[0]);
    //             // arr['longitude'] = Number(show[1]);
    //             this.setState({
    //                 latitude:Number(arr[0]),
    //                 longitude:Number(arr[1])
    //             })
    //         }
    //     })
    // }

    render() {
        const { latitude,longitude } = this.state;
        return (
            <View style={{flex:1}}>
                <BaiduMap width={width} 
                // latitude={latitude}
                // longitude={longitude}
                height={height} region={true}></BaiduMap>
            </View>
        );
    }  

    
}

export default HomeMap;