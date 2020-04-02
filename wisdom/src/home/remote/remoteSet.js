import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView, AsyncStorage, Picker } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import FetchManagers from '../../http/http';
import SelectSingle from './../../components/select/selectSingle';
import ModelPop from '../../components/modelPop';
import ModelLoad from '../../components/modelLoad';

class LineDetail extends Component {

    static navigationOptions = ({ navigation, navigationOptions }) => {
        
        return {
            title: '阈值设置',
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

    constructor() {
        super()
        this.state = {
            overvoltageThreshold: '',
            undervoltageThreshold: '',
            shortThreshold: '',
            temperatureThreshold: '',
            leakageThreshold: '',
            powerThreshold: '',
            electricalThreshold: '',
            overloadThreshold: '',
            reportTime: '',
            delayTime: '',
            id: '',

            shortThreshold: '',
            reactivePower: '',
            apparentPower:  '',
            voltageUnbalance: '',
            currentUnbalance: '',

            phaseVoltage:'',

            deviceModel:0,
            thresholdId:'',
            deviceName: ''
        }
    }

    componentDidMount() {
        const { deviceId,deviceModel,thresholdId, deviceName } = this.props.navigation.state.params;
        console.log(thresholdId)
        let obj = {
            deviceId: deviceId
        }
        
        this.setState({
            deviceModel:deviceModel,
            thresholdId:thresholdId,
            deviceName: deviceName
        })

        this.getDetail(obj)
    }

    getDetail = (obj) => {
        // debugger;
        FetchManagers.get('/app/acbdevicethreshold/findByDeviceId', obj, async (set) => {
            console.log(set)
            if (set.status === 0) {
                let data = set.data;
                this.setState({
                    // deviceName:data.deviceName ? data.deviceName : '',
                    overvoltageThreshold: data.overvoltageThreshold ,
                    undervoltageThreshold: data.undervoltageThreshold,
                    shortThreshold: data.shortThreshold,
                    temperatureThreshold: data.temperatureThreshold,
                    leakageThreshold: data.leakageThreshold,
                    powerThreshold: data.powerThreshold,
                    electricalThreshold: data.electricalThreshold,
                    overloadThreshold: data.overloadThreshold,
                    reportTime: data.reportTime ,
                    delayTime: data.delayTime,
                    id: data.id,

                    shortThreshold: data.shortThreshold,
                    reactivePower: data.reactivePower,
                    apparentPower:  data.apparentPower,
                    voltageUnbalance: data.voltageUnbalance,
                    currentUnbalance: data.currentUnbalance,
                    phaseVoltage:data.phaseVoltage
                })
            }
        })
    }


    getChangeText = (item, index) => {
        // debugger
        const { overvoltageThreshold, undervoltageThreshold, temperatureThreshold, overloadThreshold,deviceName,
            leakageThreshold, powerThreshold, electricalThreshold, reportTime, delayTime,phaseVoltage,
            shortThreshold,reactivePower,apparentPower,voltageUnbalance,currentUnbalance } = this.state;
        this.setState({
            overvoltageThreshold: index === 0 ? item : overvoltageThreshold,
            undervoltageThreshold: index === 1 ? item : undervoltageThreshold,
            // shortThreshold: index === 2 ? item : shortThreshold,
            temperatureThreshold: index === 3 ? item : temperatureThreshold,
            leakageThreshold: index === 4 ? item : leakageThreshold,
            powerThreshold: index === 5 ? item : powerThreshold,
            electricalThreshold: index === 6 ? item : electricalThreshold,
            overloadThreshold: index === 7 ? item : overloadThreshold,
            reportTime: index === 8 ? item : reportTime,
            delayTime: index === 9 ? item : delayTime,

            
            shortThreshold: index === 10 ? item : shortThreshold,
            reactivePower: index === 11 ? item : reactivePower,
            apparentPower: index === 12 ? item : apparentPower,
            voltageUnbalance: index === 13 ? item : voltageUnbalance,
            currentUnbalance: index === 14 ? item : currentUnbalance,
            phaseVoltage: index === 15 ? item.toString() : phaseVoltage,
            deviceName: index === 16 ? item : deviceName
        })
    }


    render() {
        const { overvoltageThreshold, undervoltageThreshold, temperatureThreshold,deviceModel,phaseVoltage,
            leakageThreshold, powerThreshold, electricalThreshold, reportTime, delayTime, overloadThreshold,//2P
            shortThreshold,reactivePower,apparentPower,voltageUnbalance,currentUnbalance, deviceName} = this.state;
        return (
            <ScrollView style={{ backgroundColor: '#F6F6F6', padding: 5, height: '100%' }}>
                <ModelPop ref={ref => this.popUp = ref}></ModelPop>
                <ModelLoad ref={ref => this.loadUp = ref}></ModelLoad>
                <View style={{ backgroundColor: '#F6F6F6', padding: 10, height: '100%' }}>

                <SettingComponent index={16} left={"设备名称:"} middle={deviceName} right={''} status={true} getChangeText={this.getChangeText} />

                    {
                        deviceModel === 1 ? (
                            <View>
                                <SettingComponent index={0} left={"过压阈值:"} middle={overvoltageThreshold} right={'V'} getChangeText={this.getChangeText} />
                                <SettingComponent index={1} left={"欠压阈值:"} middle={undervoltageThreshold} right={'V'} getChangeText={this.getChangeText} />
                            </View>
                        ) :deviceModel === 2 ? (
                            <View>
                                <SettingComponent index={0} left={"过压阈值:"} middle={overvoltageThreshold} right={'V'} getChangeText={this.getChangeText} />
                                <SettingComponent index={1} left={"欠压阈值:"} middle={undervoltageThreshold} right={'V'} getChangeText={this.getChangeText} />
                                <SettingComponent index={7} left={"过载阈值:"} middle={overloadThreshold} right={'A'} getChangeText={this.getChangeText} />
                                <SettingComponent index={3} left={"温度阈值:"} middle={temperatureThreshold} right={'℃'} getChangeText={this.getChangeText} />
                                <SettingComponent index={4} left={"漏电阈值:"} middle={leakageThreshold} right={'mA'} getChangeText={this.getChangeText} /> 
                                <SettingComponent index={5} left={"功率阈值:"} middle={powerThreshold} right={'W'} getChangeText={this.getChangeText} />
                                <SettingComponent index={6} left={"电能阈值:"} middle={electricalThreshold} right={'KW·h'} getChangeText={this.getChangeText} />
                            </View>
                        ) :deviceModel === 3 ? (
                            <View>
                                <SettingComponent index={0} left={"过压阈值:"} middle={overvoltageThreshold} right={'V'} getChangeText={this.getChangeText} />
                                <SettingComponent index={1} left={"欠压阈值:"} middle={undervoltageThreshold} right={'V'} getChangeText={this.getChangeText} />
                                <SettingComponent index={7} left={"过载阈值:"} middle={overloadThreshold} right={'A'} getChangeText={this.getChangeText} />
                            </View>
                        ) :deviceModel === 4 ? (
                            <View>
                                <SettingComponent index={0} left={"过压阈值:"} middle={overvoltageThreshold} right={'V'} getChangeText={this.getChangeText} />
                                <SettingComponent index={1} left={"欠压阈值:"} middle={undervoltageThreshold} right={'V'} getChangeText={this.getChangeText} />
                                <SettingComponent index={7} left={"过载阈值:"} middle={overloadThreshold} right={'A'} getChangeText={this.getChangeText} />
                                <SettingComponent index={3} left={"温度阈值:"} middle={temperatureThreshold} right={'℃'} getChangeText={this.getChangeText} />
                                <SettingComponent index={4} left={"漏电阈值:"} middle={leakageThreshold} right={'mA'} getChangeText={this.getChangeText} />

                                <SettingComponent index={5} left={"功率阈值:"} middle={powerThreshold} right={'W'} getChangeText={this.getChangeText} />
                                <SettingComponent index={6} left={"电能阈值:"} middle={electricalThreshold} right={'KW·h'} getChangeText={this.getChangeText} />
                                <SettingComponent index={10} left={"短路电流倍率阈值:"} middle={ shortThreshold} right={'Ie'} getChangeText={this.getChangeText} />
                                <SettingComponent index={13} left={"电压不平衡度阈值:"} middle={voltageUnbalance} right={'%'} getChangeText={this.getChangeText} />
                                <SettingComponent index={14} left={"电流不平衡度阈值:"} middle={currentUnbalance} right={'%'} getChangeText={this.getChangeText} />
                            </View>
                        ) :deviceModel === 5 ? (
                            <View>
                                <SettingComponent index={0} left={"过压阈值:"} middle={overvoltageThreshold} right={'V'} getChangeText={this.getChangeText} />
                                <SettingComponent index={1} left={"欠压阈值:"} middle={undervoltageThreshold} right={'V'} getChangeText={this.getChangeText} />
                                <SettingComponent index={7} left={"过载阈值:"} middle={overloadThreshold} right={'A'} getChangeText={this.getChangeText} />
                                <SettingComponent index={15} left={"断相电压阈值:"} middle={ phaseVoltage} right={'V'} getChangeText={this.getChangeText} />
                                <SettingComponentPicker index={4} left={"漏电阈值:"} middle={leakageThreshold} right={'mA'} getChangeText={this.getChangeText} />
                            </View>
                        ) : <View />
                    }
                    
                    
                    <View style={{ marginTop: 15 }}>
                        <Button
                            title="提交"
                            loading={false}
                            onPress={this.onSubmit}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }


    onSubmit = () => {
        this.loadUp.showPop(true, '操作中，请稍后')
        const { deviceId } = this.props.navigation.state.params;
        const { overvoltageThreshold, undervoltageThreshold, temperatureThreshold, id,deviceModel,deviceToken,thresholdId,
        leakageThreshold, powerThreshold, electricalThreshold, reportTime, delayTime, overloadThreshold,phaseVoltage,deviceName,
        shortThreshold,reactivePower,apparentPower,voltageUnbalance,currentUnbalance } = this.state;
        
        // console.log(thresholdId)
        let obj = {
            shortThreshold: shortThreshold,
            reactivePower: reactivePower,
            apparentPower: apparentPower,
            voltageUnbalance: voltageUnbalance,
            currentUnbalance: currentUnbalance,
            temperatureThreshold: temperatureThreshold,
            powerThreshold: powerThreshold,
            electricalThreshold: electricalThreshold,
            overvoltageThreshold: overvoltageThreshold,//过压
            undervoltageThreshold: undervoltageThreshold,//欠压
            leakageThreshold:leakageThreshold,//漏电
            overloadThreshold: overloadThreshold,//过载
            phaseVoltage: phaseVoltage,//断湘
            deviceId: deviceId,
            id:thresholdId

        }
        AsyncStorage.getItem('deviceToken').then((deviceToken) => {
            console.log(obj)
            obj.deviceToken = deviceToken;
            FetchManagers.post('/app/acbdevicethreshold/save', obj, async (set) => {
                console.log(set)
                this.loadUp.showPop(false)
                if (set.status === 0) {
                    // let data = set.data;
                    // this.setState({
                    //     overvoltageThreshold: data.overvoltageThreshold,
                    //     undervoltageThreshold: data.undervoltageThreshold,
                    //     shortThreshold: data.shortThreshold,
                    //     temperatureThreshold: data.temperatureThreshold,
                    //     leakageThreshold: data.leakageThreshold,
                    //     powerThreshold: data.powerThreshold,
                    //     electricalThreshold: data.electricalThreshold,
                    //     overloadThreshold: data.overloadThreshold,
                    //     reportTime: data.reportTime,
                    //     delayTime: data.delayTime,
                    //     deviceId: deviceId
                    // })
                    this.popUp.showPop('操作成功')
                }else{
                    this.popUp.showPop('操作失败')
                }
            })
        })
    }
}


class SettingComponent extends Component {
    constructor() {
        super()
        this.state = {
            value: ''
        }
    }

    onChangeTxt = (txt, index) => {
        const { getChangeText,status } = this.props;
        let sub;
        if(!status){
            sub = txt.replace(/^(0+)|[^\d]+/g,'');
        }
        getChangeText(sub, index)
    }

    render() {
        const { left, middle, right, index,status } = this.props;
        return (
            <View style={{ flexDirection: "row", marginTop: 10 }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'right' }}>{left}</Text>
                </View>

                <View style={{ flex: 1 }}>
                    <TextInput
                        style={{ borderColor: '#BABABC', borderWidth: 1, padding: 3, borderRadius: 3 }}
                        onChangeText={(value) => this.onChangeTxt(value, index)}
                        defaultValue={middle + ''}
                        editable={status}
                    />
                </View>
                <View style={{ width: 60, justifyContent: 'center', paddingLeft: 5 }}>
                    <Text>{right}</Text>
                </View>
            </View>
        )
    }
}

class SettingComponentPicker extends Component {

    constructor() {
        super()
        this.state = {
            value: ''
        }
    }

    onChangeTxt = (txt, index) => {
        const { getChangeText } = this.props;
        getChangeText(txt, index)
    }
    render() {
        const { left, middle, right, index } = this.props;
        let options = ['30','50','75','100','200','300','500','800','1000']
        return (
            <View style={{ flexDirection: "row", marginTop: 10 }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'right' }}>{left}</Text>
                </View>

                <View style={{ flex: 1, borderColor: '#BABABC', borderWidth: 1, height: 35, borderRadius: 3 }}>
                    <SelectSingle
                            width={120}
                            height={36}
                            options={options}
                            onSelect={(value) => this.onChangeTxt(options[value], index)}
                            defaultValue={middle} />
                </View>
                <View style={{ width: 60, justifyContent: 'center', paddingLeft: 5 }}>
                    <Text>{right}</Text>
                </View>
            </View>
        )
    }
}

export default LineDetail