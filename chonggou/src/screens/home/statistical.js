import React, { Component } from 'react';
import { View, Text,Dimensions,ScrollView,TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BarEcharts from '../components/barEcharts';
import WaringCake from '../components/echarts';
import LineCharts from '../components/lineECharts';
import FetchManager from '../fetch/index';
import { getSystem } from '../components/getSystex';
import SelectSingle from '../components/select/selectSingle';

const { height, width } = Dimensions.get('window');

class StatisticalScreens extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerTitle: (
                <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center',color:'#FFFFFF',flex:1 }}>统计报表</Text>
            ),
            headerRight: (<View></View>),
            headerLeft: (
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                        <FontAwesome color="#fff" name="angle-left" size={28}/>
                        <Text style={{color:'#fff',fontSize:16,paddingLeft:5,paddingTop:3}}>返回</Text>
                    </View>
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: '#3AA1FE',
            },
        }
    };
    constructor(){
        super()
        this.state = {
            SystemList: [],
            selectbuild:'',
            defaultSystem: '系统类别(全部)',
            defaultOption:'周',
            offlintCount: '',
            AllCount: '',
            oneData: {
                getReadrColor: '#B8DDFF',
                finishColor: '#3AA1FE',
            },
            deviceWaringDate:[],
            deviceWaringNub:[],
            oneBarData:[],
            twoBarData:[],
            oneTitleData:['报警','故障','离线','正常'],
            twoTitleData:['真实火警','隐患','异常报警','测试'],
            options:["周","月","年"],
            time:[],
            timeSystemUrl:'systemWeek',
            timeMonitoringUrl:'monitoringCountWeek',
            timeTrendUrl:'alarmingTrendWeek',
            timeAnalyUrl:'getDisposeAnalyze',
            systemId:0,
            alarmingTrendBeginTime:'',
            alarmingTrendEndTime:''
        }
    }


    
    
    componentDidMount(){
        
        getSystem().then(res => {
            let system = [];
            if(res){
                res.map(item => (
                    system.push(item.label)
                ))
            }

            // console.log(system)
            this.setState({
                SystemList:system,
                // selectbuild: res[0].value,
                // defaultSystem: res[0].label,
            })
        });
        
        this.getData(0,'systemWeek','monitoringCountWeek','alarmingTrendWeek','getDisposeAnalyze')
    }
    
    
    
    onChangeHandle=(item)=>{
        const { timeSystemUrl,timeMonitoringUrl,timeTrendUrl,timeAnalyUrl } = this.state;
        let nub = Number(item) + 1;
        this.setState({
            selectbuild:nub
        },this.getDataSystem(nub,timeSystemUrl,timeMonitoringUrl,timeTrendUrl,timeAnalyUrl,true))
    }

    onChangeSystem = (val) => {
        const { selectbuild,systemId } = this.state;

       console.log(selectbuild);
        let nub = Number(val);
        if(nub === 1){
            this.setState({
                timeSystemUrl:'systemMonth',
                timeMonitoringUrl:'monitoringCountMonth',
                timeTrendUrl:'alarmingTrendMonth',
                timeAnalyUrl:'getDisposeAnalyzeMonth',
            },this.getData(systemId,'systemMonth','monitoringCountMonth','alarmingTrendMonth','getDisposeAnalyzeMonth'))
            // this.getDataSystem(systemId,'systemMonth')
        }else if(nub === 2){
            this.setState({
                timeSystemUrl:'systemYear',
                timeMonitoringUrl:'monitoringCountYear',
                timeTrendUrl:'alarmingTrendYear',
                timeAnalyUrl:'getDisposeAnalyzeYear',
            },this.getData(systemId,'systemYear','monitoringCountYear','alarmingTrendYear','getDisposeAnalyzeYear'))
            // this.getDataSystem(systemId,'systemYear')
        }else{
            this.setState({
                timeSystemUrl:'systemWeek',
                timeMonitoringUrl:'monitoringCountWeek',
                timeTrendUrl:'alarmingTrendWeek',
                timeAnalyUrl:'getDisposeAnalyze',
            },this.getData(systemId,'systemWeek','monitoringCountWeek','alarmingTrendWeek','getDisposeAnalyze'))
            // this.getDataSystem(systemId,'systemWeek')
        }
    }

    getDataSystem = (id,systemWeek) => {
        let type = {
            systemId:id === 10 ? '' : id
        }
        console.log(systemWeek + '//////111111')
        // console.log(type + '//////111111')
        //各设备系统总览
        FetchManager.get('1/analysisdeviceorgday/' + systemWeek,type, async (set) => {
            if(set&&set.data){
                console.log('各设备系统总览111111' + JSON.stringify(set))
                let data = set.data;
                let oneBarDataArry = [];
                // oneTitleData:['报警','故障','离线','正常'],
                oneBarDataArry.push(data.alarmAmount)
                oneBarDataArry.push(data.faultAmount)
                oneBarDataArry.push(data.offlineAmount)
                oneBarDataArry.push(data.normalAmount)
                console.log(oneBarDataArry + '//////111111')
                this.setState({
                    oneBarData:oneBarDataArry,
                    systemId:id
                })
            }
        }) 

        // //设备报警处理结果分析
        FetchManager.get('1/devicealertdeal/getDisposeAnalyze',type, async (set) => {
            console.log('设备报警处理结果分析')
            console.log(set)
            // debugger;
            if(set){
                let twoBarDataArry = [];
                twoBarDataArry.push(set.realFireAmount)
                twoBarDataArry.push(set.hiddenAmount)
                twoBarDataArry.push(set.errorAmount)
                twoBarDataArry.push(set.testAmount)
                
                this.setState({
                    twoBarData:twoBarDataArry
                })
                
            }
        }) 
    }

    getData = (id,systemWeek,monitoringCountWeek,alarmingTrendWeek,getDisposeAnalyze) => {
        let type = {
                systemId:id === 0 ? '' : id
            }
            // debugger
        console.log('参数' + id + '///' + systemWeek + '///' + monitoringCountWeek + '///' + alarmingTrendWeek + '///' + getDisposeAnalyze + '///')
        //各设备系统总览
        FetchManager.get('1/analysisdeviceorgday/' + systemWeek,type, async (set) => {
            console.log('各设备系统总览')
            // debugger;
            if(set&&set.data){
                console.log(JSON.stringify(set))
                let data = set.data;
                let oneBarDataArry = [];
                // oneTitleData:['报警','故障','离线','正常'],
                oneBarDataArry.push(data.alarmAmount)
                oneBarDataArry.push(data.faultAmount)
                oneBarDataArry.push(data.offlineAmount)
                oneBarDataArry.push(data.normalAmount)
                console.log('各设备系统总览' + oneBarDataArry)
                this.setState({
                    oneBarData:oneBarDataArry
                })
            }
        }) 

        //设备监控状态分析
        FetchManager.get('1/analysisdeviceorgday/' + monitoringCountWeek,'', async (set) => {
            console.log('设备监控状态分析', set)
            // debugger
            if(set){
                let data = set;
                this.setState({
                    offlintCount:data.offlintCount ? data.offlintCount : 0,
                    AllCount:data.AllCount ? data.AllCount : 0,
                })
            }
        }) 


        // //设备报警趋势分析
        console.log('设备报警趋势分析' + alarmingTrendWeek)
        FetchManager.get('1/analysisdeviceorgday/' + alarmingTrendWeek,'', async (set) => {
            console.log(set)
            if(set){
                let deviceWaringDateArry = [],deviceWaringNubArry = [];
                set.forEach(item=>{
                    console.log(item)
                    if(!item.beginTime && !item.endTime){
                        deviceWaringDateArry.push(item.log_date)
                        deviceWaringNubArry.push(item.alarm_amount)
                    }else{
                        if(item.beginTime){
                            this.setState({
                                alarmingTrendBeginTime:item.beginTime
                            })
                        }
                        if(item.endTime){
                            this.setState({
                                alarmingTrendEndTime:item.endTime
                            })
                        }
                    }
                })
                console.log(deviceWaringDateArry)
                console.log(deviceWaringNubArry)
                this.setState({
                    deviceWaringDate:deviceWaringDateArry,
                    deviceWaringNub:deviceWaringNubArry,
                })
            }

        }) 


        // //设备报警处理结果分析
        FetchManager.get('1/devicealertdeal/' + getDisposeAnalyze,'', async (set) => {
            console.log('设备报警处理结果分析')
            console.log(set)
            // debugger;
            if(set){
                let twoBarDataArry = [];
                twoBarDataArry.push(set.realFireAmount)
                twoBarDataArry.push(set.hiddenAmount)
                twoBarDataArry.push(set.errorAmount)
                twoBarDataArry.push(set.testAmount)
                
                this.setState({
                    twoBarData:twoBarDataArry
                })
                
            }
        }) 
    }
    
    render() {
        const { SystemList,oneData,offlintCount,AllCount,selectbuild,defaultSystem,
            deviceWaringNub,deviceWaringDate,twoBarData,options,defaultOption } = this.state;
            oneData['AllCount'] = AllCount;
            oneData['offlintCount'] = offlintCount;
        return (
            <ScrollView>
                <View style={{padding:10}}>
                    <View style={{flexDirection:'column'}}>
                        <View style={{flex:1,fontSize:18,backgroundColor:'#F2F7FB',borderRadius:2}}>
                            <SelectSingle
                                options={options} 
                                width={150}
                                onSelect={this.onChangeSystem}
                                defaultValue={defaultOption}
                            />
                        </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:1,justifyContent:'center'}}>
                            <Text style={{fontSize:14}}>各系统设备总览</Text>
                        </View>
                        <View style={{flex:1,borderRadius:2}}>
                            <SelectSingle
                                    options={SystemList}
                                    width={150}
                                    size={12}
                                    onSelect={this.onChangeHandle}
                                    defaultValue={defaultSystem}/>
                        </View>
                    </View>
                    <View>
                        <BarEcharts width={width} height={300} 
                            barData={this.state.oneBarData}
                            titleData={this.state.oneTitleData}
                            title={'次'}
                         />
                    </View>
                    
                    <View style={{fontSize:18,fontWeight:'900',justifyContent:'center',color:'black'}}><Text>设备监控状态分析</Text></View>
                    <View style={{flexDirection:'row',padding:10,marginLeft:10}}>
                        <View>
                            <WaringCake height={158} width={width/2} oneData={oneData} />
                        </View>
                        <View style={{flex:1}}>
                            <View style={{justifyContent:'center',alignItems:'center',height:158}}>
                                <View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{ width: 10, height: 10, borderRadius: 15, alignItems: 'center', backgroundColor: '#3AA1FE', marginTop: 5, }}/>
                                        <Text style={{fontSize:16}}>设备总数</Text>
                                    </View>
                                    <Text style={{fontSize:16}}>{AllCount}</Text>
                                </View>
                                <View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{ width: 10, height: 10, borderRadius: 15, alignItems: 'center', backgroundColor: '#B8DDFF', marginTop: 5, }}/>
                                        <Text style={{fontSize:16}}>离线数量</Text>
                                    </View>
                                    <Text style={{fontSize:16}}>{offlintCount}</Text>
                                </View>
                            </View>
                        </View>
                    </View>


                    <View style={{fontSize:18,fontWeight:'900',justifyContent:'center',color:'black'}}><Text>设备报警趋势分析</Text></View>
                    <Text>({this.state.alarmingTrendBeginTime} --- {this.state.alarmingTrendEndTime})</Text>
                    <View>
                        <LineCharts 
                            deviceWaringNub = {deviceWaringNub}
                            deviceWaringDate = {deviceWaringDate}
                            // id={selectbuild}
                            height={240} />
                    </View>
                    
                    <View style={{fontSize:18,fontWeight:'900',justifyContent:'center',color:'black'}}><Text>设备报警处理结果分析</Text></View>
                    {/* <Text>
                        (2019-02-01 至 2019-02-07)
                    </Text> */}
                    <View>
                        <BarEcharts width={width} height={300} 
                            titleData={this.state.twoTitleData}
                            barData={twoBarData}
                            title={'次'}
                         />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default StatisticalScreens