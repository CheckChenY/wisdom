import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image,AsyncStorage,ScrollView,SafeAreaView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TitleComponent from '../../components/home/title';
import LineComponent from '../../components/home/line';
import FetchManager from '../../http/http';
import ModelPop from '../../components/modelPop';
import {getDeviceModal} from '../../components/home/deviceModal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DeviceStatus from '../../components/home/deviceStatus';

class LineDetail extends Component {

    static navigationOptions = ({ navigation, navigationOptions }) => {
        // debugger;
        return {
            header:null
        }
    };

    constructor() {
        super()
        this.state = {
            deviceId: '',
            data: {},
            isCHZ: false,
            status:2,//2=>2P  4=>4P  3 =>重合闸
            deviceToken:'' ,
            index:0
        }
    }

    componentDidMount() {
        const { index } = this.props.navigation.state.params;
        console.log(index);
        this.props.navigation.addListener('didFocus', () => {
            this.getLineDetail();
        });
        this.getDeviceToken();
    }

    getDeviceToken = async () => {
        let token = await AsyncStorage.getItem('deviceToken');
        console.log(token)
        this.setState({
            deviceToken:token
        })
    }
    onChangeData = () => {
        this.getLineDetail(1)
    }

    getLineDetail = (nub) => {
        const { deviceId,index } = this.props.navigation.state.params;
        this.setState({
            deviceId: deviceId,
            index:index
        })
        let obj = {
            deviceId: deviceId
        }
        // const modelEnum = ['JTL-CHZ']
        console.log(obj)
        FetchManager.get('/app/acbdevice/getDeviceDetail', obj, async (set) => {
            console.log(set)
            if (set.status === 0) {
                let data = set.data;
                // let int = data.deviceModel.replace(/[^0-9]/ig,"");
                // console.log(int)
                if (data.createDate) {
                    let ind = data.createDate.lastIndexOf('.')
                    data.createDate=data.createDate.substring(0,ind)
                }

                let num = getDeviceModal(data.deviceModel);
                console.log(num)
                if(nub){
                    this.popUp.showPop('数据更新成功')
                }
                this.setState({
                    data: data,
                    status: num,
                })
            }
        })
    }


    //复位
    restoration = () => {
        const { deviceId,deviceToken,status } = this.state;
        let obj = {
            deviceId:deviceId,
            deviceToken:deviceToken
        }
        this.debuggingChange(status,obj)
    }
    
    //模拟试跳 复位
    debuggingChange=(bol,obj)=>{
        if(bol === 5){
            //模拟试跳
            obj.status = '6'
            console.log(obj)
            FetchManager.get('/app/acbdevice/debugging', obj, async (set) => {
                console.log(set)
            })
        }else{
            //复位
            FetchManager.get('/app/acbdevice/restoration', obj, async (set) => {
                console.log(set)
                if (set.status === 0) {
                    this.popUp.showPop(set.msg)
                    // this.props.navigation.goBack();
                }else{
                    this.popUp.showPop(set.msg)
                }
            })
        }
    }

    render() {
        const { deviceId, data,status,index } = this.state;
        return (
            <ScrollView>
                <ModelPop ref={ref => this.popUp = ref}></ModelPop>
                <SafeAreaView style={{backgroundColor:'#467cd4'}}>
                    <View style={{flexDirection:'row',backgroundColor:'#467cd4',paddingBottom:15,paddingTop:15}}>
                        <View style={{flex:1}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('remote',{
                                index:index
                            })} style={{paddingRight:15,}}>
                                <FontAwesome style={{color:'#FFFFFF',paddingLeft:20,paddingTop:7}} name="chevron-left" size={18} />
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{color:'#467cd4',fontSize:20,color:'#ffffff',textAlign:'center',fontWeight:'500'}}>线路详情</Text>
                        </View>
                        <View style={{flex:1,alignItems:'flex-end',paddingRight:15}}>
                            <TouchableOpacity onPress={this.restoration}>
                                {
                                    status === 5 ? <Text style={{color:'#FFFFFF'}} >模拟试跳</Text>:<Text style={{color:'#FFFFFF'}}>复位</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
                
                {/* <TitleComponent title={'设备信息'} /> */}

                <View style={{flexDirection:'row',backgroundColor:'#F6F6F6',padding:10}}>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Text style={{width:3,backgroundColor:'#467cd4',marginRight:5,height:12}}></Text>
                        </View>
                        <Text style={{color:'#467cd4',fontSize:16}}>{'设备信息'}</Text>
                    </View>
                    <TouchableOpacity onPress={this.onChangeData}>
                        <AntDesign name="retweet" size={15} color={'#467cd4'} />
                    </TouchableOpacity>
                </View>


                <View style={{ flexDirection: 'row', margin: 5, paddingLeft: 15 }}>
                    <View style={{ flex: 1 }}>
                        <LineComponent left={'线路名称'} right={data.deviceName} />
                        <LineComponent left={'开关型号'} right={data.deviceModel} />
                        <LineComponent left={'开关ID'} right={data.deviceId} />
                    </View>
                    <View style={{ width: 120, justifyContent: 'center', alignItems: 'center' }}>
                        {/* <Image
                            style={{ width: 50, height: 50 }}
                            resizeMode='contain'
                            source={{uri:this.props.navigation.state.params.modelPhoto}}
                        /> */}
                    </View>
                </View>
                <TitleComponent title={'设备状态'} />
                <View style={{ margin: 5, paddingLeft: 15 }}>
                    <LineComponent left={'上报时间'} right={data.createDate} />
                    <LineComponent left={'设备状态'} right={
                        DeviceStatus[data.deviceStatus]
                        // data.deviceStatus==='1' ? '远程合闸': 
                        // data.deviceStatus==='2' ? '合闸' : 
                        // data.deviceStatus==='3' ? '分闸' : 
                        // data.deviceStatus==='4' ? '手动复位' : 
                        // data.deviceStatus==='49' ? '手动合闸' : 
                        // data.deviceStatus==='15' ? '远程分闸': 
                        // data.deviceStatus==='63' ? '手动分闸' : 
                        // data.deviceStatus==='47' ? '报警分闸' : 
                        // data.deviceStatus==='65' ? '合闸 正常运行' : 
                        // data.deviceStatus==='66' ? '按键分闸 闭锁跳闸' : 
                        // data.deviceStatus==='67' ? '按键试验 闭锁跳闸' : 
                        // data.deviceStatus==='68' ? '远程闭锁 闭锁跳闸' : 
                        // data.deviceStatus==='69' ? '通信闭锁 闭锁跳闸' : 
                        // data.deviceStatus==='70' ? '重合闸' : 
                        // data.deviceStatus==='71' ? '漏电闭锁 闭锁跳闸' : 
                        // data.deviceStatus==='72' ? '报警 闭锁跳闸' : 
                        // data.deviceStatus==='73' ? '参数设置更改' : 
                        // data.deviceStatus==='74' ? '远程试跳 闭锁跳闸' : '' 
                        } />
                    <LineComponent left={'报警类型'} right={data.status ? data.status : '无报警'} />
                    {
                        status === 5 ? <View /> : (
                            <LineComponent left={'当前模式'} right={ 
                                data.statusDes === '128' ? '手动模式' : 
                                data.statusDes === '12' ? '锁定模式' : 
                                data.statusDes === '160' ? '自动模式' : ''} />
                        )
                    }
                </View>
                <TitleComponent title={'设备参数'} />
                <View style={{ margin: 5, paddingLeft: 15 }}>
                    <View>
                        {
                            status === 1 ? 
                                <LineComponent left={'电压'} right={data.voltge} type={'V'} /> : 
                            status === 2 ? (
                                <View>
                                    <LineComponent left={'电压'} right={data.voltge} type={'V'} />
                                    <LineComponent left={'电流'} right={data.electr} type={'A'} />
                                    <LineComponent left={'温度'} right={data.temperature} type={'℃'} />
                                    <LineComponent left={'漏电'} right={data.leakage} type={'mA'} />
                                    <LineComponent left={'功率'} right={data.power} type={'w'} />
                                    <LineComponent left={'电能'} right={data.energy} type={'KW·h'} />
                                </View>
                            ):
                            status === 3 ? (
                                <View>
                                    <LineComponent left={'A相电压'} right={data.voltge} type={'V'} />
                                    <LineComponent left={'B相电压'} right={data.ENERGY_B} type={'V'} />
                                    <LineComponent left={'C相电压'} right={data.ENERGY_C} type={'V'} />
                                </View>
                            ) : status === 4 ? (
                                <View>
                                    <LineComponent left={'A相电压数据'} right={data.voltge} type={'A'} />
                                    <LineComponent left={'B相电压数据'} right={data.ENERGY_B} type={'V'} />
                                    <LineComponent left={'C相电压数据'} right={data.ENERGY_C} type={'V'} />
                                    <LineComponent left={'A相电流数据'} right={data.electr} type={'A'} />
                                    <LineComponent left={'B相电流数据'} right={data.ElECTR_B} type={'A'} />
                                    <LineComponent left={'C相电流数据'} right={data.ElECTR_C} type={'A'} />
                                    <LineComponent left={'漏电'} right={data.leakage} type={'mA'} />
                                    <LineComponent left={'1路温度数据'} right={data.TEMPERATURE_1} type={'℃'} />
                                    <LineComponent left={'2路温度数据'} right={data.TEMPERATURE_2} type={'℃'} />
                                    <LineComponent left={'3路温度数据'} right={data.TEMPERATURE_3} type={'℃'} />
                                    <LineComponent left={'4路温度数据'} right={data.TEMPERATURE_4} type={'℃'} />
                                    <LineComponent left={'功率'} right={data.power} type={'w'} />
                                    <LineComponent left={'电能'} right={data.energy} type={'KW·h'} />
                                    <LineComponent left={'频率实时数据'} right={data.FREQUENCY_DATA} type={'Hz'} />
                                    <LineComponent left={'无功功率实时数据'} right={data.REACTIVE_POWER} type={'Var'} />
                                    <LineComponent left={'视在功率实时数据'} right={data.APPrent_power} type={'VA'} />
                                    <LineComponent left={'电压不平衡度数据'} right={data.IMBALANCE_VOLTAGE} type={'%'} />
                                    <LineComponent left={'电流不平衡度数据'} right={data.IMBALANCE_ELECTR} type={'%'} />
                                    <LineComponent left={'A相有功功率数据'} right={data.A_ACTIVE_POWER} type={'W'} />
                                    <LineComponent left={'B相有功功率数据'} right={data.B_ACTIVE_POWER} type={'W'} />
                                    <LineComponent left={'C相有功功率数据'} right={data.C_ACTIVE_POWER} type={'W'} />
                                    <LineComponent left={'A相无功功率数据'} right={data.A_REACTIVE_POWER} type={'Var'} />
                                    <LineComponent left={'B相无功功率数据'} right={data.B_REACTIVE_POWER} type={'Var'} />
                                    <LineComponent left={'C相无功功率数据'} right={data.C_REACTIVE_POWER} type={'Var'} />
                                    <LineComponent left={'A相视在功率数据'} right={data.A_APPrent_power} type={'VA'} />
                                    <LineComponent left={'B相视在功率数据'} right={data.B_APPrent_power} type={'VA'} />
                                    <LineComponent left={'C相视在功率数据'} right={data.C_APPrent_power} type={'VA'} />
                                    <LineComponent left={'短路电流倍率阈值'} right={data.THRESHOLD_SHORT_ELECTR} type={'Ie'} />
                                </View>
                            ) : status === 5 ? (
                                <View>
                                    <LineComponent left={'A相电压数据'} right={data.voltge} type={'V'} />
                                    <LineComponent left={'B相电压数据'} right={data.ENERGY_B} type={'V'} />
                                    <LineComponent left={'C相电压数据'} right={data.ENERGY_C} type={'V'} />
                                    <LineComponent left={'A相电流数据'} right={data.electr} type={'A'} />
                                    <LineComponent left={'B相电流数据'} right={data.ElECTR_B} type={'A'} />
                                    <LineComponent left={'C相电流数据'} right={data.ElECTR_C} type={'A'} />
                                    <LineComponent left={'漏电'} right={data.leakage} type={'mA'} />

                                    <LineComponent left={'过压保护'} right={data['过压保护']} type={''} />
                                    <LineComponent left={'欠压保护'} right={data['欠压保护']} type={''} />
                                    <LineComponent left={'缺相保护'} right={data['缺相保护']} type={''} />
                                    <LineComponent left={'过流保护'} right={data['过流保护']} type={''} />
                                    <LineComponent left={'缺零保护'} right={data['缺零保护']} type={''} />
                                    <LineComponent left={'漏电保护'} right={data['漏电保护']} type={''} />
                                    <LineComponent left={'重合闸'} right={data['重合闸']} type={''} />
                                </View>
                            ) : (
                                <View />
                            )
                        }
                    </View>
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('remoteSet', {
                    deviceId: deviceId,
                    deviceModel:status,
                    thresholdId:data.thresholdId,
                    deviceName: data.deviceName
                })}>
                    <TitleComponent title={'阈值设置'} icon={'arrowright'} />
                </TouchableOpacity>
                <View style={{ margin: 5, paddingLeft: 15 }}>


                    {
                        status === 1 ? (
                            <View>
                                <LineComponent left={'过压阈值'} right={data.thresholdVoltage} type={'V'} />
                                <LineComponent left={'欠压阈值'} right={data.thresholdUnderovltage} type={'V'} />
                            </View>
                        ) :
                        status === 2 ? (
                            <View>
                                <LineComponent left={'过压阈值'} right={data.thresholdVoltage} type={'V'} />
                                <LineComponent left={'欠压阈值'} right={data.thresholdUnderovltage} type={'V'} />
                                <LineComponent left={'过载阈值'} right={data.thresholdOverload} type={'A'} />
                                <LineComponent left={'温度阈值'} right={data.thresholdTemperature} type={'℃'} />
                                <LineComponent left={'漏电阈值'} right={data.thresholdLeakage} type={'mA'} />
                                <LineComponent left={'功率阈值'} right={data.thresholdPoer} type={'w'} />
                                <LineComponent left={'电能阈值'} right={data.thresholdEnergy} type={'KW·h'} />
                            </View>
                        ) : status === 3 ? (
                            <View>
                                <LineComponent left={'过压阈值'} right={data.thresholdVoltage} type={'V'} />
                                <LineComponent left={'欠压阈值'} right={data.thresholdUnderovltage} type={'V'} />
                            </View>
                        ) : status === 4 ? (
                            <View>
                                <LineComponent left={'过压阈值'} right={data.thresholdVoltage} type={'V'} />
                                <LineComponent left={'欠压阈值'} right={data.thresholdUnderovltage} type={'V'} />
                                <LineComponent left={'过载阈值'} right={data.thresholdOverload} type={'A'} />
                                <LineComponent left={'温度阈值'} right={data.thresholdTemperature} type={'℃'} />
                                <LineComponent left={'漏电阈值'} right={data.thresholdLeakage} type={'mA'} />
                                
                                <LineComponent left={'功率越限阈值'} right={data.thresholdPoer} type={'w'} />
                                <LineComponent left={'电量告警阈值'} right={data.thresholdEnergy} type={'KW·h'} />
                                <LineComponent left={'短路电流倍率阈值'} right={data.THRESHOLD_SHORT_ELECTR} type={'Ie'} />
                                <LineComponent left={'电压不平衡度阈值'} right={data.THRESHOLD_IMBALANCE_VOLTAGE} type={'%'} />
                                <LineComponent left={'电流不平衡度阈值'} right={data.THRESHOLD_IMBALANCE_ELECTR} type={'%'} />
                            </View>
                        ) : status === 5 ? (
                            <View>
                                <LineComponent left={'过压阈值'} right={data.thresholdVoltage} type={'V'} />
                                <LineComponent left={'欠压阈值'} right={data.thresholdUnderovltage} type={'V'} />
                                <LineComponent left={'断相阈值'} right={data.thresholdPhaseVoltage} type={'V'} />
                                <LineComponent left={'过载阈值'} right={data.thresholdOverload} type={'A'} />
                                <LineComponent left={'漏电阈值'} right={data.thresholdLeakage} type={'mA'} />
                            </View>
                        ) : (
                            <View />
                        )
                    }
                </View>
            </ScrollView>
        )
    }
}

export default LineDetail