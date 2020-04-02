import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  NativeModules,
  NativeEventEmitter,
  Dimensions,
  View,
  TouchableOpacity
} from 'react-native';
// import {  NodePlayerView } from 'react-native-nodemediaclient';
// import { NodeCameraView } from 'react-native-nodemediaclient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RtmpView } from 'react-native-rtmpview';
import Orientation from 'react-native-orientation';
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
                backgroundColor: 'linear-gradient(-30deg,rgba(58,161,254,1) 0%,rgba(48,191,251,1) 100%)'
            }
        };
    }


    constructor(props){
        super(props)
        this.player = null
        this.state = {
            shouldMute:true,
            pushserver:'',
            stream:''
        }
    }

    componentWillMount(){
        Orientation.lockToLandscape();
    }

    componentDidMount(){
        this.player.initialize();
        // this._navListener = this.props.navigation.addListener('didFocus', () => {
        //     this._stopDetection();
        // });
        // console.log(123)
    }

    componentWillUnmount(){
        // this._navListener.remove();
        this.player.pause()
    }

    // playerStart = () => {
    //     // this.vp.start();
    //     // this.player.initialize();
    //     this.player.play()
    //     // const { params } = this.props.navigation.state;
    //     this.setState({
    //         shouldMute:false
    //     })
    //     // this.props.navigation.navigate('caseVideoList',{
    //     //     'pushserver': params.pushserver, 
    //     //     'stream': params.stream 
    //     // })
    // }

    // playerPasue = () => {
    //     // this.vp.stop();
    //     this.player.pause()
    // }

    componentWillUnmount(){
        Orientation.lockToPortrait();
        this.player.pause()
    }


    render() {
        const { params } = this.props.navigation.state;
        console.log(params.pushserver + params.stream);
        return (
        <View style={styles.container}>
            <RtmpView
                style={styles.player}
                shouldMute={true}
                ref={e => { this.player = e; }}
                // onPlaybackState={(data) => {
                //     this.handlePlaybackState(data);
                // }}
                // onFirstVideoFrameRendered={(data) => {
                //     this.handleFirstVideoFrameRendered(data);
                // }}
                url={params.pushserver + params.stream}
                // url={pushserver + stream}
            />
            {/* <View style={{flexDirection:'row',marginTop:20}}>
                <View style={{flex:1,alignItems:'center'}}>
                    <TouchableOpacity onPress={this.playerStart}>
                        <Text style={{textAlign:"center",width:50,backgroundColor:"#3AA1FE",color:'#FFFFFF',borderWidth:1,borderRadius:2,borderColor:"#3AA1FE"}}>
                            播放
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
            </View> */}
                
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    margin:5,
  },  
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