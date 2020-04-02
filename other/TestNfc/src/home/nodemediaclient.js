import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  NativeModules,
  NativeEventEmitter,
  Button,
  View
} from 'react-native';
import {  NodePlayerView } from 'react-native-nodemediaclient';
import { NodeCameraView } from 'react-native-nodemediaclient';

export default class Example extends Component {

    // constructor(){
    //     super()
    //     this.state = {
    //         id : 'rtmp://58.200.131.2:1935/livetv/hunant'
    //     }
    // }

    render() {
        const { params } = this.props.navigation.state;
        console.log(params.pushserver + params.stream);
        return (
        <View style={styles.container}>

            <NodePlayerView 
                style={styles.player}
                // style={{ height: 200 }}
                ref={(vp) => { this.vp = vp }}
                // inputUrl={id}
                // inputUrl={"rtmp://58.200.131.2:1935/livetv/hunantv"}
                inputUrl={params.pushserver + params.stream}
                scaleMode={"ScaleAspectFit"}
                bufferTime={300}
                maxBufferTime={1000}
                autoplay={true}
                
                camera={{ cameraId: 1, cameraFrontMirror: true }}
                audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
                video={{ preset: 1, bitrate: 500000, profile: 1, fps: 15, videoFrontMirror: false }}
                smoothSkinLevel={3}
                autopreview={true}
            />

            {/* <NodeCameraView
                style={styles.player}
                ref={(vb) => { this.vb = vb }}
                outputUrl={"rtmp://192.168.0.10/live/stream1"}
                camera={{ cameraId: 1, cameraFrontMirror: true }}
                audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
                video={{ preset: 12, bitrate: 400000, profile: 1, fps: 15, videoFrontMirror: false }}
                autopreview={true}
            /> */}
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
  player: {
    width: '90%',
    height: '50%'
  }
});