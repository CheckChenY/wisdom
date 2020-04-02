import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectSingle from './../../components/select/selectSingle';
import { Text, View, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import FetchManager from '../../http/http';
import ModelPop from '../../components/modelPop';

class AddGateway extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: 15, }}>
                    <View style={{ paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome style={{ color: '#FFFFFF' }} name="chevron-left" size={18} />
                    </View>
                </TouchableOpacity>
            ),
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, color: '#fff' }}>添加空开</Text>
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
            locationlist: [],
            modelPhoto: '',
            defaultSwitchType: '请选择',
            typeList: [],
            switchTypeList:[],
            switchTypeId:'',
            location:''
        }
    }

    componentDidMount() {
        this.getDataImage()
        this.getList()
    }

    getList=()=>{
        FetchManager.get('/app/acbdevice/getDeviceModel', {deviceType:2}, async (set) => {
            console.log(set)
            if (set.status == 0 && set.data) {
                let switchTypeList=[]
                set.data.forEach(s=>{
                    switchTypeList.push(s.data)
                })
                this.setState({
                    switchTypeList:switchTypeList,
                })
            }
        })
    }

    getDataImage = () => {
        FetchManager.get('/app/acbdevice/getDatas', '', async (set) => {
            console.log(set)
            if (set.status === 0 && set.data.length > 0) {
                let detail = set.data;
                detail.forEach((show, i) => {
                    if (i === 0) {
                        show.status = 0
                    } else {
                        show.status = 1
                    }
                })
                this.setState({
                    locationlist: detail,
                    modelPhoto: detail[0].data
                })
            } else {
                this.setState({
                    locationlist: []
                })
            }
        })
    }

    render() {
        const { locationlist } = this.state;
        return (
            <ScrollView>
                <ModelPop ref={ref => this.popUp = ref}></ModelPop>
                <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <View style={{ width: 100,justifyContent:'center' }}>
                            <Text style={{ textAlign: 'right', color: '#333', fontSize: 14,justifyContent:'center' }}>空开 ID：</Text>
                        </View>
                        <View style={{ flex:1, flexDirection: 'row', }}>
                            <View style={{ flex:1 }}>
                                <TextInput
                                    placeholder="输入空开ID"
                                    style={style.input_box}
                                    onChangeText={(code) => {
                                        code = code.replace(/[^a-zA-Z0-9]/g, '')
                                        this.setState({ code: code })
                                    }}
                                    // onChangeText={(code) => this.setState({ code })}
                                    value={this.state.code}
                                />
                            </View>
                            {/* <View style={{width:80,justifyContent:'center',alignItems:'center'}}>
                                <TouchableOpacity onPress={() => { this.saoma() }}>
                                    <FontAwesome color="#788A93" name="qrcode" size={28} />
                                </TouchableOpacity>
                            </View> */}
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <View style={{ width: 100,justifyContent:'center' }}>
                            <Text style={{ textAlign: 'right', color: '#333', fontSize: 14,justifyContent:'center' }}>空开型号：</Text>
                        </View>
                        <View style={{ flex:1, borderWidth: 1, borderRadius: 3, borderColor: '#BABABC', backgroundColor: '#fff' }}>
                            <SelectSingle
                                width={120}
                                height={36}
                                options={this.state.switchTypeList}
                                onSelect={this.onChangeType}
                                defaultValue={this.state.defaultSwitchType} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row',marginTop: 15 }}>
                        <View style={{ width: 100,justifyContent:'center' }}>
                            <Text style={{ textAlign: 'right', color: '#333', fontSize: 14,justifyContent:'center' }}>额定电压：</Text>
                        </View>
                        <View style={{ flex:1,flexDirection:'row' }}>
                            <View style={{flex:1}}>
                                <TextInput
                                    placeholder="输入额定电压"
                                    style={style.input_box}
                                    onChangeText={(codeVoltage) => this.setState({ codeVoltage })}
                                    value={this.state.codeVoltage}
                                />
                            </View>
                            <View style={{width:80,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{alignItems:'center'}}>V</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <View style={{ width: 100,justifyContent:'center' }}>
                            <Text style={{ textAlign: 'right', color: '#333', fontSize: 14,justifyContent:'center' }}>额定电流：</Text>
                        </View>
                        <View style={{ flex:1,flexDirection:'row' }}>
                            <View style={{flex:1}}>
                                <TextInput
                                    placeholder="输入额定电流"
                                    style={style.input_box}
                                    onChangeText={(codeElectric) => this.setState({ codeElectric })}
                                    value={this.state.codeElectric}
                                />
                            </View>
                            <View style={{width:80,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{alignItems:'center'}}>A</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <View style={{ width: 100,justifyContent:'center' }}>
                            <Text style={{ textAlign: 'right', color: '#333', fontSize: 14,justifyContent:'center' }}>空开名称：</Text>
                        </View>
                        <View style={{ flex:1 }}>
                            <TextInput
                                placeholder="请输入设备名称"
                                style={style.input_box}
                                onChangeText={(deviceName) => this.setState({ deviceName })}
                                value={this.state.deviceName}
                            />
                        </View>
                    </View>
                    
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <View style={{ width: 100,justifyContent:'center' }}>
                            <Text style={{ textAlign: 'right', color: '#333', fontSize: 14,justifyContent:'center' }}>安装位置：</Text>
                        </View>
                        <View style={{ flex:1 }}>
                            <TextInput
                                placeholder="请输入安装位置"
                                style={style.input_box}
                                onChangeText={(location) => this.setState({ location })}
                                value={this.state.location}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ padding: 15, backgroundColor: '#fff', marginTop: 20, }}>
                    <View>
                        <Text style={{ color: '#333', fontSize: 16, }}>开关图标</Text>
                    </View>
                    <View style={{ marginTop: 15, flexDirection: 'row',flexWrap:'wrap' }}>
                        {
                            locationlist.length > 0 && locationlist.map((item, index) => {
                                return (
                                    <TouchableOpacity onPress={() => { this.selectLocation(item, index) }} key={index}>
                                        <View style={{ width: 70, height: 70, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                                            {
                                                item.status === 0 ? (
                                                    <FontAwesome style={{ position: 'absolute', top: 35, right: 2 }} color="#28c44f" name="check" size={18} />
                                                ) : <Text />
                                            }
                                            <Image style={{ width: 45, height: 45, resizeMode: 'contain' }} source={{ uri: item.data }} />
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
                <SafeAreaView>
                    <TouchableOpacity onPress={() => this.onSubmit()} 
                    style={{ height: 45, backgroundColor: '#467cd4',borderRadius:3 ,margin:20,
                        justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{ fontSize: 16, color: '#fff', }}>确认</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ScrollView>
                
        )
    }
    onChangeType = (val) => {
        // console.log(this.state.switchTypeList)
        console.log(val)
        this.setState({
            switchTypeId:this.state.switchTypeList[val]
        })
    }
    selectLocation = (item, index) => {
        const { locationlist } = this.state;
        locationlist.forEach((show, i) => {
            if (index === i) {
                show.status = 0
            } else {
                show.status = 1
            }
        })
        this.setState({
            locationlist: locationlist,
            modelPhoto: item.data
        })
    }
    onSubmit = () => {
        const { deviceId } = this.props.navigation.state.params;
        const { code, codeElectric, codeVoltage, deviceName, modelPhoto,switchTypeId,location } = this.state;
        if(!code.trim()){
            this.popUp.showPop('请输入空开ID')
            return
        }
        if(switchTypeId===''){
            this.popUp.showPop('请选择空开型号')
            return
        }
        if(!codeVoltage){
            this.popUp.showPop('请输入额定电压')
            return
        }
        if(!codeElectric){
            this.popUp.showPop('请输入额定电流')
            return
        }
        if(!deviceName){
            this.popUp.showPop('请输入空开名称')
            return
        }
        let obj = {
            "deviceId": code,
            "deviceModel": switchTypeId,
            "deviceName": deviceName,
            "current": codeElectric,
            "voltage": codeVoltage,
            "id": "",
            "modelPhoto": modelPhoto,
            "parentId": deviceId,
            'location':location
        }
        console.log(obj)
        FetchManager.post('/app/acbdevice/saveDevice', obj, async (set) => {
            console.log(set)
            if (set.status === 0) {
                this.props.navigation.navigate('tempswitchlist', {
                    deviceId: deviceId
                });
            }else{
                this.popUp.showPop(set.msg)
            }
        })
    }

    // saoma = () => {
    //     this.props.navigation.navigate('code')
    // }
}

var style = StyleSheet.create({
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
    },
    selected: {
        width: 45,
        height: 35,
        backgroundColor: '#467cd4',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10
    },
    select: {
        width: 45,
        height: 35,
        backgroundColor: '#467cd4',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10
    }
})
export default AddGateway