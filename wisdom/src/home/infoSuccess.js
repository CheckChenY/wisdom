import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity,AsyncStorage } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Sound from 'react-native-sound';
import { Button } from 'react-native-material-ui';

class InfoSuccess extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        // debugger;
        return {
            title: '通信测试',
            headerStyle: {
                backgroundColor: '#467cd4',
                alignItems: 'center',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                textAlign: 'center',
                flex: 1
            },
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingRight:15,}}>
                    <FontAwesome style={{ paddingLeft: 20, color: '#FFFFFF' }} name="chevron-left" size={18} />
                </TouchableOpacity>
            ),
            headerRight: <View />
        }
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
            list:{}
        }
    }

    componentDidMount() {
        this.getAlertInfo()
    }
    // 获取报警详情
    getAlertInfo = () => {
        const { item } = this.props.navigation.state.params;
        // this.getDeviceData(deviceId)
        let device = JSON.parse(item.device)
        this.setState({
            data: item,
            list:device
        })
    }

    // godetail=()=>{
    //     this.props.navigation.push('home')
    // }

    render() {
        const { data,list } = this.state;
        console.log(data)
        return (
            <View>
                <View style={{ padding: 10 }}>
                    <View style={{ height: 209 }}>
                        <Image style={{ width: '100%', height: '100%' }} source={require('../img/light.png')}></Image>
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                        <View style={{ width: 120 }}>
                            <Text style={{ fontSize: 14, color: '#333333', fontWeight: '500',textAlign:'right' }}>上报时间:</Text>
                        </View>
                        <View style={{ flex: 1, fontSize: 14, color: '#999999' }}>
                            <Text>
                                {data['发送时间']}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                        <View style={{ width: 120 }}>
                            <Text style={{ fontSize: 14, color: '#333333', fontWeight: '500',textAlign:'right' }}>网管ID:</Text>
                        </View>
                        <View style={{ flex: 1, fontSize: 14, color: '#999999' }}>
                            <Text>
                                {list.deviceId}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                        <View style={{ width: 120 }}>
                            <Text style={{ fontSize: 14, color: '#333333', fontWeight: '500',textAlign:'right' }}>网关名称:</Text>
                        </View>
                        <View style={{ flex: 1, fontSize: 14, color: '#999999' }}>
                            <Text>
                                {list.deviceName}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                        <View style={{ width: 120 }}>
                            <Text style={{ fontSize: 14, color: '#333333', fontWeight: '500',textAlign:'right' }}>安装位置:</Text>
                        </View>
                        <View style={{ flex: 1, fontSize: 14, color: '#999999' }}>
                            <Text>
                                {list.location}
                            </Text>
                        </View>
                    </View>

                    
                    <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                        <View style={{ width: 120 }}>
                            <Text style={{ fontSize: 14, color: '#333333', fontWeight: '500',textAlign:'right' }}>内容:</Text>
                        </View>
                        <View style={{ flex: 1, fontSize: 14, color: '#999999' }}>
                            <Text>
                                {data.title}
                            </Text>
                        </View>
                    </View>

                    
                    {/* <View style={{ flexDirection: 'row', paddingTop: 10,alignItems:'center',justifyContent:'center' }}>
                        <View style={{ width: 120 }}>
                            <Button
                                primary
                                raised
                                text={'确定'}
                                onPress={()=>{this.godetail()}} />
                        </View>
                    </View> */}

                </View>
            </View>
        );
    }
}

export default InfoSuccess