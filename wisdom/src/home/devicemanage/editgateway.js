import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectSingle from '../../components/select/selectSingle';
import { Text, View, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, } from 'react-native';
import FetchManager from '../../http/http';

class EditGateway extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerLeft:(
                <TouchableOpacity onPress={()=>navigation.goBack()} style={{paddingRight:15,}}>
                    <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                        <FontAwesome style={{ color: '#FFFFFF' }} name="chevron-left" size={18} />
                    </View>
                </TouchableOpacity>
            ),
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, color: '#fff' }}>修改网关</Text>
            ),
            headerRight: <View/>,
            headerStyle: {
                backgroundColor: '#467cd4',
            }
        };
    };
    constructor() {
        super()
        this.state = {
            code:'',
            location:'',
            data:{},
            defaultGatewayType:'',
            gatewayTypeList:[],
            gatewayTypeId:''
        }
    }
    componentDidMount() {
        const { data } = this.props.navigation.state.params;
        this.setState({
            data:data,
            location:data.location,
            deviceName:data.deviceName,
            defaultGatewayType:data.deviceModel,
        })
        this.getDate()
    }
    
    getDate = () => {
        let obj = {
            deviceType:1
        }
        FetchManager.get('/app/acbdevice/getDeviceModel', obj, async (set) => {
            console.log(set)
            if (set.status == 0 && set.data) {
                let gatewayTypeList=[]
                set.data.forEach(s=>{
                    gatewayTypeList.push(s.data)
                })
                this.setState({
                    gatewayTypeList:gatewayTypeList,
                })
            }
        })
    }

    render() {
        const { data } = this.state;
        return (
            <View style={style.page}>
                <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <View style={{ width: 100 }}>
                            <Text style={{ textAlign: 'right', color: '#333', fontSize: 14,justifyContent:'center' }}>网关标识码：</Text>
                        </View>
                        <View style={{ flex:1 }}>
                            <Text>{data.deviceId}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <View style={{ width: 100 }}>
                            <Text style={{ textAlign: 'right', color: '#333', fontSize: 14,justifyContent:'center' }}>组网方式：</Text>
                        </View>
                        <View style={{ flex:1 }}>
                            <Text>{data.useStatus === '1' ? 'RS485' : 'WI-FI'}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <View style={{ width: 100,justifyContent:'center' }}>
                            <Text style={{ textAlign: 'right', color: '#333', fontSize: 14 }}>网关名称：</Text>
                        </View>
                        <View style={{ flex:1 }}>
                            <TextInput
                                placeholder="输入设备名称"
                                style={style.input_box}
                                onChangeText={(deviceName) => this.setState({deviceName})}
                                value={this.state.deviceName}
                                />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row',  marginTop: 15 }}>
                        <View style={{ width: 100,justifyContent:'center' }}>
                            <Text style={{ textAlign: 'right', color: '#333', fontSize: 14 }}>网关型号：</Text>
                        </View>
                        <View style={{ flex:1, borderWidth: 1, borderRadius: 3, borderColor: '#BABABC', backgroundColor: '#fff' }}>
                            <SelectSingle
                                width={120}
                                height={36}
                                options={this.state.gatewayTypeList}
                                onSelect={this.onChangeGatewayType}
                                defaultValue={this.state.defaultGatewayType} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15,marginBottom:20 }}>
                        <View style={{ width: 100,justifyContent:'center' }}>
                            <Text style={{ textAlign: 'right', color: '#333', fontSize: 14,justifyContent:'center' }}>安装位置：</Text>
                        </View>
                        <View style={{ flex:1 }}>
                            <TextInput
                                placeholder="输入安装位置"
                                style={style.input_box}
                                onChangeText={(location) => this.setState({location})}
                                value={this.state.location}
                                />
                        </View>
                    </View>
                </View>
                <SafeAreaView>
                    <TouchableOpacity onPress={() => this.edit()} 
                    style={{ height: 45, backgroundColor: '#467cd4',borderRadius:3 ,margin:10,
                        justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{ fontSize: 16, color: '#fff', }}>提交</Text>
                    </TouchableOpacity>
                </SafeAreaView>
                {/* <TouchableOpacity onPress={()=>{this.edit()}} style={{height:45,backgroundColor:'#467cd4',justifyContent:'center',alignItems:'center',position:'absolute',bottom:0,left:0,right:0,}}>
                    <Text style={{fontSize:16,color:'#fff',}}>提交</Text>
                </TouchableOpacity> */}
            </View>
        )
    }
    onChangeGatewayType=(val)=>{
        this.setState({
            gatewayTypeId:this.state.gatewayTypeList[val]
        })
    }
    edit=()=>{
        const { data,code,location,gatewayTypeId,defaultGatewayType } = this.state;
        let obj = {
            "deviceId": data.deviceId,
            "deviceName": this.state.deviceName,
            "deviceModel": gatewayTypeId?gatewayTypeId:defaultGatewayType,
            "id": data.id,
            "location": location,
            "pointSign":data.pointSign
        }
        console.log(obj)
        FetchManager.post('/app/acbdevice/updateNet',obj, async (set) => {
            console.log(set)
            if(set.status === 0){
                // this.props.navigation.goBack();
                // this.props.navigation.navigate('gatewaylist',{refresh:()=>{this.refresh()}})
                this.props.navigation.navigate('gatewaylist')
            }
        })

    }
    saoma=()=>{
        this.props.navigation.navigate('code')
    }
}

var style = StyleSheet.create({
    page: {
        height: '100%',
        backgroundColor: 'rgb(246,246,246)',
    },
    input_box:{
        borderWidth: 1, 
        borderColor: '#BABABC', 
        height: 40, 
        padding: 0, 
        borderRadius: 3, 
        fontSize: 14, 
        paddingLeft: 10, 
        color: '#999', 
        backgroundColor: '#fff' 
    }
})
export default EditGateway