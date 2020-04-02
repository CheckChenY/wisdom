import React , { Component } from 'react';
import { Text,View,Button } from 'react-native';


class HomeScreen extends Component{

    constructor(props){
        super(props)
        this.state = {
            pushserver:'rtmp://58.200.131.2:1935/',
            stream:'livetv/hunantv',
        }
    }

    render(){
        return(
            <View>
                <Text>
                    我是主页
                </Text>
                <Button title={'巡查点'}
                    onPress={this.portal}
                >

                </Button>
                <Button title={'视频'} onPress={this.video} ></Button>
                <Button title={'视频rtmpview'} onPress={this.rtmpview} ></Button>
                <Button title={'视频VLC'} onPress={this.videoVlc} ></Button>
                <Button title={'视频LIVE'} onPress={this.videoLive} ></Button>
                <Button title={'视频nodemediaclient'} onPress={this.nodemediaclient} ></Button>
            </View>
        )
    }

    portal = () => {
        this.props.navigation.navigate('homedetail')
    }

    video = () => {
        this.props.navigation.navigate('video')
    }

    rtmpview = () => {
        this.props.navigation.navigate('rtmpview')
    }

    videoVlc = () => {
        this.props.navigation.navigate('videoPlayer',{
            // abc:'rtmp://58.200.131.2:1935/livetv/hunantv'
            'pushserver': this.state.pushserver, 
            'stream': this.state.stream 
        })
    }

    videoLive = () => {
        this.props.navigation.navigate('videoLivePlayer')
    }

    nodemediaclient = () => {
        this.props.navigation.push('nodemediaclient',{
            'pushserver': this.state.pushserver, 
            'stream': this.state.stream 
        })
    }
}

export default HomeScreen