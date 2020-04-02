import React, { Component } from 'react';
import {ImageBackground,StyleSheet,Text,View,TouchableOpacity,Linking,Dimensions} from 'react-native';
// import {  NodePlayerView } from 'react-native-nodemediaclient';
// import { NodeCameraView } from 'react-native-nodemediaclient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RtmpView } from 'react-native-rtmpview';
import Orientation from 'react-native-orientation';
import ModelPop from '../components/modelPop';
import FetchManager from '../fetch/index';
import DatePicker from 'react-native-datepicker';
const { width,height } = Dimensions.get('window')


export default class Example extends Component {

    static navigationOptions = ({ navigation }) => {
        // const { id,name } = navigation.state.params;
        // console.log(navigation);
        return {
            headerLeft: (
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={{flexDirection: 'row',paddingLeft:15, alignItems: 'center'}}>
                        <FontAwesome color="#fff" name="angle-left" size={28}/>
                        <Text style={{color:'#fff', fontSize: 16, paddingLeft:5}}>返回</Text>
                    </View>
                </TouchableOpacity>
            ),
            headerTitle: (
                <Text style={styles.headerMiddle}>关联摄像头</Text>
            ),
            headerRight:(
                <View />
            ),
            headerStyle: {
                backgroundColor: '#3AA1FE'
            }
        };
    }

    constructor(props){
        super(props)
        this.player = null
        this.state = {
            shouldMute:true,
            pushserver:'',
            stream:'',
            data:"",
            deviceId:''
        }
    }

    componentWillMount(){
        Orientation.lockToLandscape();
    }
    
    componentDidMount(){
        this.player.initialize();
    }
    
    
    componentWillUnmount(){
        Orientation.lockToPortrait();
        this.player.pause()
    }

    playerStart = () => {
        this.player.play()
        this.setState({
            shouldMute:false
        })
    }

    playerPasue = () => {
        // this.vp.stop();
        this.player.pause()
    }

    // goLink = () => {
    //     const { data,deviceId } = this.state;
    //     let url = 'http://192.168.0.94:8050/#/recordPlayer?token=' + data + '&url=ezopen://open.ys7.com/' + deviceId + '/1.rec';
    //     //  + '#begin=20191013103625@end=20191014103625'  
    //     console.log(url)
    //     Linking.canOpenURL(url).then(supported => {
    //         if (!supported) {
    //             this.popUp.showPop('打开浏览器失败，请返回重新操作')
    //         } else {
    //             return Linking.openURL(url);
    //         }
    //     }).catch(err =>this.popUp.showPop('打开链接失败')
    //     );
    // }

    // goToWeb = (data,deviceId) => {
    //     // const { url } = this.state;
    //     // let url = 'http://www.baidu.com'
    // }

    render() {
        const { params } = this.props.navigation.state;
        console.log(params.pushserver + params.stream);
        return (
            <ImageBackground style={{flex:1}}
                source={require('../../img/video.png')}>
                <View style={{alignItems:'center'}}>
                    <RtmpView
                        style={styles.player}
                        shouldMute={true}
                        ref={e => { this.player = e; }}
                        url={params.pushserver + params.stream}
                        // url={pushserver + stream}
                    />
                    {/* <View style={{flexDirection:'row',marginTop:10}}>
                        <View style={{flex:1,alignItems:'center'}}>
                            <TouchableOpacity onPress={this.playerStart}>
                                <Text style={{textAlign:"center",width:50,backgroundColor:"#3AA1FE",color:'#FFFFFF',borderWidth:1,borderRadius:2,borderColor:"#3AA1FE"}}>
                                    播放
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1,alignItems:'center'}}>
                            <TouchableOpacity onPress={this.goLink}>
                                <Text style={{textAlign:"center",width:50,backgroundColor:"#3AA1FE",color:'#FFFFFF',borderWidth:1,borderRadius:2,borderColor:"#3AA1FE"}}>
                                    回放
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1,alignItems:'center'}}>
                            <TouchableOpacity onPress={this.playerPasue}>
                                <Text style={{textAlign:"center",width:50,backgroundColor:"#3AA1FE",color:'#FFFFFF',borderWidth:1,borderRadius:2,borderColor:"#3AA1FE"}}>
                                    暂停
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>  */}
                </View>
                <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    //   container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   },  
    headerMiddle: {
        color: "rgba(255,255,255,1)",
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
        textAlign: 'center',
    },
    player: {
        width: height,
        height: width
    }
});