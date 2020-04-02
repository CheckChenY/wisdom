import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity,AsyncStorage } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Sound from 'react-native-sound';
import { Button } from 'react-native-material-ui';
import Monent from 'moment';

class warnScreens extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        // const { id } = navigation.state.params;
        return {
            header:null
        };
    };
    constructor(props) {
        super(props)
        this.state = {
            backgroundMusic: '',
            loadingMusic: '',
            companyInfo: '',
            data: '',
            dealState: '',
            deviceType: '',
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('voice').then(o=>{
            console.log(AsyncStorage.getItem('voice'))

            console.log('报警消息声音提示')
            console.log(o)
            if(o=='true'){
                this.soundCtrl()
            }
        })
        this.getAlertInfo()
    }
    // 加载声音
    soundCtrl = () => {
        let musciPath = require('../sounds/FireSound.wav') 
        // console.log('musciPathmusciPath', musciPath)
        //如果是网络音频，使用 new Sound(mp3,null,error => {})  // 'http://fjdx.sc.chinaz.com/Files/DownLoad/sound1/201507/6155.mp3'
        let music = new Sound(musciPath, (error) => {
            // 加载成功回调
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            music.setVolume(0.8); // 设置音量
            music.setNumberOfLoops(-1); // 无限循环
            music.play((success) => { // 播放完成后回调
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors.' + success);
                }
            });
        })
        this.setState({ backgroundMusic: music, loadingMusic: false });
    }
    // 获取报警详情
    getAlertInfo = () => {
        const { item } = this.props.navigation.state.params;
        console.log(item)
        this.setState({
            data: item,
        })
    }
    componentWillUnmount() {
        if(this.state.backgroundMusic){
            this.state.backgroundMusic.release()
        }
    }

    godetail=()=>{
        this.state.backgroundMusic.release();
        const { data } = this.state;
        this.props.navigation.push('warndetail',{
            id:this.state.data.alarmId,
            createDate:data.createDate,
            detail:data.alertInfo
        })
    }

    render() {
        const { data } = this.state;
        // let len = data.createTime ? data.createTime.substring(0,data.createTime.length - 4) : '';
        // let time = len ? len.replace('T',' ') : '';
        // let tim = Monent().toArray();
        // console.log(Monent(data.createTime).toArray())
        //Monent().toArray()
        // let tim = new Date(data.createTime);
        // .subString(0,data.createTime.length - 4)
        // console.log(tim)
        return (
            <View>
                <View style={{height:55,backgroundColor:'#467cd4',flexDirection:'row',justifyContent:'space-between',alignItems:'center',}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('home')} style={{paddingRight:15,}}>
                        <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                            <FontAwesome color="#fff" name="angle-left" size={28}/>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, color: '#fff' }}>{this.state.data.alertInfo}</Text>
                    <TouchableOpacity>
                        <View style={{paddingRight:15,flexDirection:'row',alignItems:'center'}}>
                            {/* <AntDesign color="#fff" name="bars" size={28}/> */}
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 10 }}>

                    <View style={{ height: 209 }}>
                        <Image style={{ width: '100%', height: '100%' }} source={require('../img/icon_light.gif')}></Image>
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                        <View style={{ width: 120 }}>
                            <Text style={{ fontSize: 14, color: '#333333', fontWeight: '500',textAlign:'right' }}>报警类型:</Text>
                        </View>
                        <View style={{ flex: 1, fontSize: 14, color: '#999999' }}>
                            <Text>
                                {data.alertInfo}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                        <View style={{ width: 120 }}>
                            <Text style={{ fontSize: 14, color: '#333333', fontWeight: '500',textAlign:'right' }}>时间:</Text>
                        </View>
                        <View style={{ flex: 1, fontSize: 14, color: '#999999' }}>
                            <Text>
                                {/* {tim} */}
                                {data.createTime}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                        <View style={{ width: 120 }}>
                            <Text style={{ fontSize: 14, color: '#333333', fontWeight: '500',textAlign:'right' }}>设备ID:</Text>
                        </View>
                        <View style={{ flex: 1, fontSize: 14, color: '#999999' }}>
                            <Text>
                                {this.state.data.brokerId}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                        <View style={{ width: 120 }}>
                            <Text style={{ fontSize: 14, color: '#333333', fontWeight: '500',textAlign:'right' }}>设备名称:</Text>
                        </View>
                        <View style={{ flex: 1, fontSize: 14, color: '#999999' }}>
                            <Text>
                                {this.state.data.deviceName}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                        <View style={{ width: 120 }}>
                            <Text style={{ fontSize: 14, color: '#333333', fontWeight: '500',textAlign:'right' }}>安装位置:</Text>
                        </View>
                        <View style={{ flex: 1, fontSize: 14, color: '#999999' }}>
                            <Text>
                                {this.state.data.location}
                            </Text>
                        </View>
                    </View>

                    
                    <View style={{ flexDirection: 'row', paddingTop: 10,alignItems:'center',justifyContent:'center' }}>
                        <View style={{ width: 120 }}>
                            <Button
                                primary
                                raised
                                text={'确定'}
                                onPress={()=>{this.godetail()}} />
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}

export default warnScreens