import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectSingle from './../../components/select/selectSingle';
import { Text, View, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, Image,ScrollView } from 'react-native';
import FetchManager from '../../http/http';

class SwitchDetail extends Component {
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
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, color: '#fff' }}>空开详情</Text>
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
            deviceId: '',
            deviceModel: '',
            voltage: '',
            current: '',
            deviceName: '',
            id: '',
            parentId: '',
            locationlist: [],
            modelPhoto: '',
            switchTypeList:[],
            defaultSwitchType:'',
            location:''
        }
    }
    componentDidMount() {
        const { data } = this.props.navigation.state.params;
        console.log(data)
        this.setState({
            deviceId: data.deviceId,
            defaultSwitchType: data.deviceModel,
            voltage: data.voltage ? data.voltage + '' : '0',
            current: data.current + '' ? data.current + '' : '0',
            deviceName: data.deviceName,
            modelPhoto: data.modelPhoto,
            id: data.id + '',
            parentId: data.parentId + '',
            location:data.location,
            deviceModel:data.deviceModel,
            // switchTypeId:data.switchTypeId
        })
        this.getDataImage(data.modelPhoto)
        this.getList()
    }

    getList=()=>{
        FetchManager.get('/app/acbdevice/getDeviceModel', {deviceType:2}, async (set) => {
            console.log(set)
            if (set.status == 0 && set.data) {
                let switchTypeList=[]
                // let switchTypeId,defaultSwitchType;
                set.data.forEach(s=>{
                    // if(s.data === modal){
                    //     switchTypeId = s.id
                    //     defaultSwitchType = s.data
                    // }
                    switchTypeList.push(s.data)
                })
                this.setState({
                    switchTypeList:switchTypeList,
                    // switchTypeId:switchTypeId,
                    // defaultSwitchType:defaultSwitchType,
                })
            }
        })
    }

    getDataImage = (modelPhoto) => {
        FetchManager.get('/app/acbdevice/getDatas', '', async (set) => {
            console.log(set)
            if (set.status === 0 && set.data.length > 0) {
                let detail = set.data;
                detail.forEach(show => {
                    if (show.data === modelPhoto) {
                        show.status = 0
                    } else {
                        show.status = 1
                    }
                })
                this.setState({
                    locationlist: detail,
                    // modelPhoto: detail[0].data
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
            <ScrollView style={style.page}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                    <View style={{ width: 100 }}>
                        <Text style={{ textAlign: 'right', color: '#333', fontSize: 14,justifyContent:'center' }}>空开 ID：</Text>
                    </View>
                    <View style={{ flex:1}}>
                        <TextInput
                            editable={this.state.deviceId ? false : true}
                            placeholder="请输入空开ID"
                            style={style.input_box}
                            onChangeText={(deviceId) => this.setState({ deviceId })}
                            value={this.state.deviceId}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                    <View style={{ width: 100 }}>
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                    <View style={{ width: 100 }}>
                        <Text style={{ textAlign: 'right', color: '#333', fontSize: 14,justifyContent:'center' }}>额定电压：</Text>
                    </View>
                    <View style={{ flex:1 }}>
                        <TextInput
                            keyboardType='numeric'
                            placeholder="请输入额定电压"
                            style={style.input_box}
                            onChangeText={(text) => {
                                const voltage = text.replace(/[^0-9.]/g, '');
                                this.setState({ voltage: voltage })
                                // this.setState({ voltage })
                            }}
                            value={this.state.voltage}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <View style={{ width: 100 }}>
                        <Text style={{ textAlign: 'right', color: '#333', fontSize: 14,justifyContent:'center' }}>额定电流：</Text>
                    </View>
                    <View style={{ flex:1 }}>
                        <TextInput
                            keyboardType='numeric'
                            placeholder="请输入额定电流"
                            style={style.input_box}
                            onChangeText={(text) => {
                                const current = text.replace(/[^0-9.]/g, '');
                                this.setState({ current: current })
                                // this.setState({ voltage })
                            }}
                            // onChangeText={(current) => this.setState({ current })}
                            value={this.state.current}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                    <View style={{ width: 100 }}>
                        <Text style={{ textAlign: 'right', color: '#333', fontSize: 14,justifyContent:'center' }}>空开名称：</Text>
                    </View>
                    <View style={{ flex:1 }}>
                        <TextInput
                            placeholder="请输入空开名称"
                            style={style.input_box}
                            onChangeText={(deviceName) => this.setState({ deviceName })}
                            value={this.state.deviceName}
                        />
                    </View>
                </View>
                
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                    <View style={{ width: 100 }}>
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
                <View style={{ marginTop: 15, }}>
                    <Text style={{ fontSize: 14, color: '#333', marginTop: 10, width: 100,textAlign:'right' }}>空开图标：</Text>
                </View>
                <View style={{ marginTop: 15, flexWrap: 'wrap', flexDirection: 'row', }}>
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
                <SafeAreaView>
                    <TouchableOpacity onPress={() => this.edit()} 
                    style={{ height: 45, backgroundColor: '#467cd4',borderRadius:3 ,
                        justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{ fontSize: 16, color: '#fff', }}>修改</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ScrollView>
        )
    }
    onChangeType=(val)=>{
        console.log(val)
        this.setState({
            deviceModel:this.state.switchTypeList[val]
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
    edit = () => {
        let obj = {
            current: this.state.current,
            deviceId: this.state.deviceId,
            deviceModel: this.state.deviceModel,
            deviceName: this.state.deviceName,
            id: this.state.id,
            modelPhoto: this.state.modelPhoto,
            parentId: this.state.parentId,
            voltage: this.state.voltage,
            location: this.state.location,
        }
        console.log(obj)
        FetchManager.post('/app/acbdevice/UpdateDevice', obj, async (set) => {
            console.log(set)
            if (set.status === 0) {
                this.props.navigation.state.params.refresh()
                this.props.navigation.goBack()
            }
        })
    }
}

var style = StyleSheet.create({
    page: {
        height: '100%',
        backgroundColor: 'rgb(246,246,246)',
        paddingTop: 10,
        paddingLeft: 45,
        paddingRight: 45,
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
    },
})
export default SwitchDetail