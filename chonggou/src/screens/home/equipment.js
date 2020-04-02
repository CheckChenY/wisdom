import React,{ Component } from 'react';
import { View,Text,Image,StyleSheet,TouchableOpacity,AsyncStorage,ScrollView } from 'react-native'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NfcManager, {Ndef} from 'react-native-nfc-manager';

class EquipmentScreens extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (
                <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center',color:'#FFFFFF',flex:1 }}>添加设备</Text>
            ),
            headerRight: <View />,
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
            },
        }
    };


    componentDidMount() {
        this._stopDetection();
    }
    
    //关闭NFC功能
    _stopDetection = () => {
        console.log('已关闭NFC功能')
        this.setState({
            nfcbool:false
        })
        NfcManager.unregisterTagEvent()
        .then(result => {
            console.log('unregisterTagEvent OK', result)
        })
        .catch(error => {
            console.warn('unregisterTagEvent fail', error)
        })
    }
    

    render() {
        const { navigation } = this.props;
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <View style={{width:212,height:240,}}>
                    <View style={{width:106,flexDirection:'row',height:130}}>
                    {/* AddDev */}
                        <TouchableOpacity onPress={()=>navigation.navigate('AddDev',{
                                refresh:()=>{
                                    this._refresh();
                                },
                        })}
                        >
                            <View style={{width:81}}>
                                <Image style={{width:81,height:81}} source={require('../../img/home/sdtj.png')} />
                                <Text style={{paddingTop:5,textAlign:'center'}}>手动添加</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{navigation.navigate('qscode',{item:'1'})}}>
                            <View style={{marginLeft:50}}>
                                <Image style={{width:81,height:81}} source={require('../../img/home/smtj.png')} />
                                <Text style={{paddingTop:5,textAlign:'center'}}>扫码添加</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:106,flexDirection:'row',height:130}}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('MonitorDev')}}>
                            <View style={{width:81}}>
                                <Image style={{width:81,height:81}} source={require('../../img/home/spjk.png')} />
                                <Text style={{paddingTop:5,textAlign:'center'}}>视频监控</Text>
                            </View>
                        </TouchableOpacity>
                        {/* //AddPatrolSuccess   AddPatrol*/}
                        <TouchableOpacity onPress={()=>{navigation.navigate('AddPatrol')}}>
                            <View style={{marginLeft:50}}>
                                <Image style={{width:81,height:81}} source={require('../../img/home/tjxc.png')} />
                                <Text style={{paddingTop:5,textAlign:'center'}}>添加巡查</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }  
}

const styles = StyleSheet.create({
    title_right_word:{
        fontSize:17,
        color:'#ffffff'
    },
    main_list:{
        flexDirection:"row",padding:15,borderBottomWidth:1,borderBottomColor:'#EBEBEB',backgroundColor:'#FFFFFF'
    }
})

export default EquipmentScreens;