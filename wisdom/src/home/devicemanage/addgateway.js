import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SelectSingle from './../../components/select/selectSingle';
import { Text, View, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, Alert, } from 'react-native';
import FetchManager from '../../http/http';
import ModelPop from '../../components/modelPop';
// import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map';

class AddGateway extends Component {

    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingRight:15,}}>
                    <View style={{ paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome color="#fff" name="angle-left" size={28} />
                    </View>
                </TouchableOpacity>
            ),
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, color: '#fff' }}>添加网关</Text>
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
            code: '',
            joinTypeList: ['WIFI', 'RS485'],
            defaultJointype: '请选择',
            selectType: '',
            netName: '',
            locationed: '',
            pointSign: '',
            deviceModel:'',
            gatewayTypeList:[],
            defaultGatewayType:'请选择',
            gatewayTypeId:'',
            address:''
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('didFocus', () => {
            this.getLocationData();
        });
        FetchManager.get('/app/acbdevice/getDeviceModel', {deviceType:1}, async (set) => {
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
    
    getLocationData = () => {
        const { state } = this.props.navigation;
        console.log(state)
        this.setState({
            locationed:state.params ? state.params.locationed.latitude + ',' + state.params.locationed.longitude : '',
            address:state.params ? state.params.address : ''
        })

    }

    render() {
        return (
            <View style={style.page}>
                <ModelPop ref={ref => this.popUp = ref}></ModelPop>
                <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                        <View style={{ width: '25%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text style={{ textAlign: 'right', color: '#333', fontSize: 15 }}>网关标识码：</Text>
                            </View>
                        </View>
                        <View style={{ width: '73%', }}>
                            {/* <View style={{ width: '90%' }}> */}
                                <TextInput
                                    placeholder="输入网关标识码"
                                    style={style.input_box}
                                    onChangeText={(code) => this.setState({ code })}
                                    value={this.state.code}
                                />
                            {/* </View> */}
                            {/* <TouchableOpacity onPress={() => { this.saoma() }}>
                                <FontAwesome color="#788A93" name="qrcode" size={28} />
                            </TouchableOpacity> */}
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                        <View style={{ width: '25%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>组网方式：</Text>
                            </View>
                        </View>
                        <View style={{ width: '73%', borderWidth: 1, borderRadius: 3, borderColor: '#BABABC', backgroundColor: '#fff' }}>
                            <SelectSingle
                                width={120}
                                height={36}
                                options={this.state.joinTypeList}
                                onSelect={this.onChangeJointype}
                                defaultValue={this.state.defaultJointype} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                        <View style={{ width: '25%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>网关型号：</Text>
                            </View>
                        </View>
                        <View style={{ width: '73%', borderWidth: 1, borderRadius: 3, borderColor: '#BABABC', backgroundColor: '#fff' }}>
                            <SelectSingle
                                width={120}
                                height={36}
                                options={this.state.gatewayTypeList}
                                onSelect={this.onChangeGatewayType}
                                defaultValue={this.state.defaultGatewayType} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                        <View style={{ width: '25%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>网关名称：</Text>
                            </View>
                        </View>
                        <View style={{ width: '73%' }}>
                            <TextInput
                                placeholder="输入设备名称"
                                style={style.input_box}
                                onChangeText={(netName) => this.setState({ netName })}
                                value={this.state.netName}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                        <View style={{ width: '25%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text style={{ textAlign: 'right', color: '#333', fontSize: 15 }}>经纬度：</Text>
                            </View>
                        </View>
                        <View style={{ width: '73%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ width: '90%' }}>
                                <TextInput
                                    editable={false}
                                    placeholder="请选择经纬度"
                                    style={style.input_box}
                                    onChangeText={(locationed) => this.setState({ locationed })}
                                    value={this.state.locationed}
                                />
                            </View>
                            <TouchableOpacity onPress={() => { this.getPoint() }}>
                                <AntDesign name="pushpino" style={{ fontSize: 20, color: '#788A93' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                        <View style={{ width: '25%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>安装位置：</Text>
                            </View>
                        </View>
                        <View style={{ width: '73%' }}>
                            <TextInput
                                placeholder="输入安装位置"
                                style={style.input_box}
                                onChangeText={(address) => this.setState({ address })}
                                value={this.state.address}
                            />
                        </View>
                    </View>
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                        <View style={{ width: '25%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>经纬度：</Text>
                            </View>
                        </View>
                        <View style={{ width: '73%' }}>
                            <TextInput
                                editable={false}
                                placeholder="输入安装位置"
                                style={style.input_box}
                                onChangeText={(pointSign) => this.setState({pointSign})}
                                value={this.state.pointSign}
                                />
                        </View>
                    </View> */}
                </View>
                <TouchableOpacity onPress={() => { this.addswitch() }} style={{ height: 45, backgroundColor: '#467cd4', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, left: 0, right: 0, }}>
                    <Text style={{ fontSize: 16, color: '#fff', }}>下一步</Text>
                </TouchableOpacity>
            </View>
        )
    }
    onChangeGatewayType=(val)=>{
        this.setState({
            gatewayTypeId:this.state.gatewayTypeList[val]
        })
    }
    getPoint = () => {
        this.props.navigation.navigate('location')
    }
    addswitch = () => {
        const { selectType, netName, address, code ,locationed,gatewayTypeId } = this.state;
        console.log(code)
        if(!code.trim()){
            this.popUp.showPop('请输入网关标识码')
            return
        }
        if(selectType===''){
            this.popUp.showPop('请选择组网方式')
            return
        }
        if(!gatewayTypeId){
            this.popUp.showPop('请输入网关型号')
            return
        }
        if(!netName){
            this.popUp.showPop('请输入网关名称')
            return
        }
        if(!locationed){
            this.popUp.showPop('请选择经纬度')
            return
        }
        if(!address){
            this.popUp.showPop('请输入安装位置')
            return
        }
        let obj = {
            "deviceId": code,
            "deviceName": netName,
            "networkModel": selectType==0?'1':'2',
            "id": 0,
            "location": address,
            "pointSign":locationed,
            "deviceModel":gatewayTypeId
        }
        console.log(obj)
        FetchManager.post('/app/acbdevice/saveNet', obj, async (set) => {
            console.log(set)
            if (set.status === 0) {
                this.props.navigation.navigate('gatewaylist')
            } else {
                this.popUp.showPop(set.msg)
            }
        })
    }
    onChangeJointype = (e) => {
        // const { joinTypeList } = this.state;
        this.setState({
            selectType: e
        })
    }
    changeDeviceId = () => {

    }
    // saoma = () => {
    //     this.props.navigation.navigate('code')
    // }
}

var style = StyleSheet.create({
    page: {
        height: '100%',
        backgroundColor: 'rgb(246,246,246)',
    },
    input_box: {
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
export default AddGateway