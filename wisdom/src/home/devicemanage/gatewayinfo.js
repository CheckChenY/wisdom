import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectSingle from './../../components/select/selectSingle';
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, } from 'react-native';
import FetchManager from '../../http/http';

import { changeTime } from '../../components/changeTime';

class GatewayInfo extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingRight:15,}}>
                    <View style={{ paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome style={{ color: '#FFFFFF' }} name="chevron-left" size={18} />
                    </View>
                </TouchableOpacity>
            ),
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, color: '#fff' }}>网关信息</Text>
            ),
            headerRight: <View />,
            headerStyle: {
                backgroundColor: '#467cd4',
            }
        };
    };
    constructor() {
        super()
        this.state = {
            data:{},
            // gatewayTypeDic:[]
        }
    }
    componentDidMount(){
        const { data } = this.props.navigation.state.params;
        this.setState({
            data:data
        })
        // this.getList()
    }

    // getList=()=>{
    //     FetchManager.get('/app/acbdevice/getDeviceModel', {deviceType:1}, async (set) => {
    //         console.log(set)
    //         if (set.status == 0 && set.data) {
    //             let gatewayTypeDic={}
    //             set.data.forEach(s=>{
    //                 gatewayTypeDic[s.id]=s.data
    //             })
    //             this.setState({
    //                 gatewayTypeDic:gatewayTypeDic,
    //             })
    //         }
    //     })
    // }

    render() {
        const { data } = this.state;
        console.log(data);
        return (
            <View style={style.page}>
                <Text style={{fontSize:16,color:'#333',marginTop:10}}>网关标识码：{data.deviceId}</Text>
                <Text style={{fontSize:16,color:'#333',marginTop:10}}>组网方式：{data.useStatus === '1' ? 'RS485' : 'WI-FI'}</Text>
                <Text style={{fontSize:16,color:'#333',marginTop:10}}>网关型号：{data.deviceModel}</Text>
                <Text style={{fontSize:16,color:'#333',marginTop:10}}>网关名称：{data.deviceName}</Text>
                <Text style={{fontSize:16,color:'#333',marginTop:10,lineHeight:20,}}>安装位置：{data.location}</Text>
                <Text style={{fontSize:16,color:'#333',marginTop:10}}>更新时间：{changeTime(data.updateTime)}</Text>
                <Text style={{fontSize:16,color:'#333',marginTop:10}}>固件版本：{data.softwareVersion}</Text>
            </View>
        )
    }
}

var style = StyleSheet.create({
    page: {
        height: '100%',
        backgroundColor: 'rgb(246,246,246)',
        paddingTop:10,
        paddingLeft:45,
        paddingRight:45,
    },
})
export default GatewayInfo