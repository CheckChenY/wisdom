import React, { Component } from 'react';
import { View, Text,Image,TouchableOpacity,AsyncStorage } from 'react-native';
// import { NavigationActions } from 'react-navigation';
// import { StackActions, NavigationActions } from 'react-navigation';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Sound from 'react-native-sound';
import { getWarnMsg } from '../components/warnPublic';
import FetchManager from '../fetch/index';
import { getDict, getDevice,getAllFloor,getSigleFloor } from '../components/getSystex';
import ModelPop from '../components/modelPop';
import StatusName from '../components/statusName';
import WarnLevelName from '../components/warnLevelName';

class warnScreens extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { id } = navigation.state.params;
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center',color:'#fff',fontSize:17 }}>警情信息</Text>
            ),
            headerRight:<Text />,
            // headerLeft:(
            //     <TouchableOpacity onPress={()=>navigation.navigate('infoDetail',{
            //         id:id
            //     })}>
            //         <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
            //             <FontAwesome color="#fff" name="angle-left" size={28}/>
            //             <Text style={{color:'#fff',fontSize:16,paddingLeft:5,paddingTop:3}}>返回</Text>
            //         </View>
            //     </TouchableOpacity>
            // ),
            headerLeft:<Text />,
            headerStyle:{
                backgroundColor: '#3AA1FE',
            }
        };
    };
    constructor(props){
        super(props)
        this.state={
            backgroundMusic: '',
            loadingMusic: '',
            companyInfo: '',
            data: '',
            warnText: '',
            dealState: '',
            deviceType: '',
            bolRelation:false,
            message:'',
            // buildingDic:{},
            // floorDic:{},
            deviceId:'',
            id:''
        }
    }

    // componentWillMount() {
    //     const { buildingDic,floorDic } = this.state;



    //     getAllFloor().then(res => {
    //         console.log(res)
    //         res.forEach(item=>{
    //             buildingDic[item.value] = item.label
    //         })
    //     });

    //     getSigleFloor().then(res=>{
    //         console.log(res)
    //         res.forEach(item=>{
    //             floorDic[item.value] = item.label
    //         })
    //     })


        
    //     this.setState({
    //         buildingDic:buildingDic,
    //         floorDic:floorDic
    //     })

    //     // this.onDeviceLogin();
    // }

    // onDeviceLogin = async () => {
    //     let userToken = await AsyncStorage.getItem('userToken');
    //     console.log(userToken)
    //     if( !userToken ){
    //         // this._signOut(userToken);
    //         this.props.navigation.navigate('SignIn');
    //     }
    // }

    

    componentDidMount(){
        this.getAlertInfo()
        // this.getUnitInfo()
        // this._getRelation();//关联设备
        this.soundCtrl()

        // this.props.navigation.addListener('willFocus',()=>{
        //     this.soundCtrl()
        // });
        // // this.getDealState()
        // this.props.navigation.addListener('willBlur',()=>{
        //         if(this.state.backgroundMusic){
        //             this.state.backgroundMusic.release()
        //         }
        //     }
        // );
    }
    // 加载声音
    soundCtrl = () => {
        let musciPath = require('../../sounds/FireSound.wav') 
        // console.log('musciPathmusciPath', musciPath)
        //如果是网络音频，使用 new Sound(mp3,null,error => {})  // 'http://fjdx.sc.chinaz.com/Files/DownLoad/sound1/201507/6155.mp3'
        let music = new Sound(musciPath, (error) => {
            // 加载成功回调
            if (error) {
                console.log('failed to load the sound', error);
                this.state.backgroundMusic.release()
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
        const { message } = this.props.navigation.state.params;
        console.log(message)
        // let mes = message.phoneWindowContent;
        // console.log(mes)
        let obj = {
            deviceId:message.deviceId,
            param:message.alarmId
        }

        console.log(obj)
        this.setState({
            deviceId:message.deviceId,
            id:message.alarmId
        })

        FetchManager.get('/alarm/inner/jtlAlarmRecord/findDetailById' ,obj, (set) => {
            console.log(set);
            if(set&&set.success){
                let data = set.value
                let txt = data.alarmDetails;
                let t = ''
                txt && txt.forEach(show=>{
                    t += show
                })
                this.setState({
                    data:set.value,
                    warnText:t
                })
                // this.getDealState(set.data.deviceAlertDeal.dealState)
                // this.getDeviceType(set.data.deviceAlertDeal.deviceType)
            }
        })
    }



    componentWillUnmount () {
        // debugger;
        this.state.backgroundMusic.release()
    }

    toDeal = () => {
        this.state.backgroundMusic.release()
        const { type } = this.props.navigation.state.params;
        console.log(this.props.navigation.state.params)
        const { data,deviceId,id } = this.state;
        // let url = type === 1 ? 'caseDetailTab' : 'Message';
        let url = type === 1 ? 'caseDetailTab' : 'Message';
        
        this.props.navigation.navigate(url,{
            id:id,
            deviceId:deviceId,
            disabled:true,
        })
    }

    render() {
        
        const { warnText,data,dealState,buildingDic,floorDic,message } = this.state;
        console.log(data)
        console.log(message)
        return (
            <View style={{padding:10}}>
                <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
                <View style={{height:120}}>
                    <Image style={{width:'100%',height:'100%'}} source={require('../../img/icon_light.gif')}></Image>
                </View>
                <View style={{flexDirection:'row',paddingTop:5}}>
                    <View style={{width:120}}>
                        <Text style={{fontSize:14,color:'#333333',fontWeight:'500',textAlign:'right'}}>上报时间:</Text>
                    </View>
                    <View style={{flex:1,fontSize:14,color:'#999999'}}>
                        <Text>
                            {data.createTime}
                        </Text>
                    </View>
                </View>
                {/* 所在位置 */}
                <View style={{flexDirection:'row',paddingTop:10}}>
                    <View style={{width:120}}>
                        <Text style={{fontSize:14,color:'#333333',fontWeight:'500',textAlign:'right'}}>所在位置:</Text>
                    </View>
                    <View style={{flex:1,fontSize:14,color:'#999999'}}>
                        <Text>
                            {/* {buildingDic[data.buildingId]},{floorDic[data.floorId]},{data.location} */}
                            {data.location}
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',paddingTop:10}}>
                    <View style={{width:120}}>
                        <Text style={{fontSize:14,color:'#333333',fontWeight:'500',textAlign:'right'}}>所在建筑:</Text>
                    </View>
                    <View style={{flex:1,fontSize:14,color:'#999999'}}>
                        <Text>
                            {data.building}
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',paddingTop:10}}>
                    <View style={{width:120}}>
                        <Text style={{fontSize:14,color:'#333333',fontWeight:'500',textAlign:'right'}}>楼层/区域:</Text>
                    </View>
                    <View style={{flex:1,fontSize:14,color:'#999999'}}>
                        <Text>
                            {data.floor}
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',paddingTop:10}}>
                    <View style={{width:120}}>
                        <Text style={{fontSize:14,color:'#333333',fontWeight:'500',textAlign:'right'}}>设备类别:</Text>
                    </View>
                    <View style={{flex:1,fontSize:14,color:'#999999'}}>
                        <Text>
                            {/* {this.state.deviceType} */}
                            {data.deviceType}
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',paddingTop:10}}>
                    <View style={{width:120}}>
                        <Text style={{fontSize:14,color:'#333333',fontWeight:'500',textAlign:'right'}}>当前状态:</Text>
                    </View>
                    <View style={{flex:1,fontSize:14,color:'#999999'}}>
                        <Text>
                            {StatusName[data.linkState]}
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',paddingTop:10}}>
                    <View style={{width:120}}>
                        <Text style={{fontSize:14,color:'#333333',fontWeight:'500',textAlign:'right'}}>状态描述:</Text>
                    </View>
                    <View style={{flex:1,fontSize:14,color:'#999999'}}>
                        <Text>
                            {warnText}
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',paddingTop:10}}>
                    <View style={{width:120}}>
                        <Text style={{fontSize:14,color:'#333333',fontWeight:'500',textAlign:'right'}}>警情程度:</Text>
                    </View>
                    <View style={{flex:1,fontSize:14,color:'#999999'}}>
                        <Text>
                            {WarnLevelName[data.alarmLevel]}
                        </Text>
                    </View>
                </View>
                {/* <View style={{flexDirection:'row',paddingTop:10}}>
                    <View style={{width:120}}>
                        <Text style={{fontSize:14,color:'#333333',fontWeight:'500',textAlign:'right'}}>处理状态:</Text>
                    </View>
                    <View style={{flex:1,fontSize:14,color:'#999999'}}>
                        <Text>
                            {dealState}
                        </Text>
                    </View>
                </View> */}
                {/* <View style={{flexDirection:'row',paddingTop:10}}>
                    <View style={{width:120}}>
                        <Text style={{fontSize:14,color:'#333333',fontWeight:'500',textAlign:'right'}}>联动动作:</Text>
                    </View>
                    <View style={{flex:1,fontSize:14,color:'#999999'}}>
                        <Text>
                            {bolRelation ? '手动联动' : '自动联动'}
                        </Text>
                    </View>
                </View> */}
                {/* <View style={{flexDirection:'row',paddingTop:10}}>
                    <View style={{width:160}}>
                        <Text style={{fontSize:14,color:'#333333',fontWeight:'500',textAlign:'right'}}>消防安全负责人:</Text>
                    </View>
                    <View style={{flex:1,fontSize:14,color:'#999999'}}>
                        <Text>
                            {message.safetyManager}
                        </Text>
                    </View>
                </View> */}
                {/* <View style={{flexDirection:'row',paddingTop:10}}>
                    <View style={{width:120}}>
                        <Text style={{fontSize:14,color:'#333333',fontWeight:'500',textAlign:'right'}}>联系电话:</Text>
                    </View>
                    <View style={{flex:1,fontSize:14,color:'#999999'}}>
                        <Text>
                            {message.safetyManagerPhone}
                        </Text>
                    </View>
                </View> */}
                {/* <View style={{flexDirection:'row',paddingTop:10}}>
                    <View style={{width:120}}>
                        <Text style={{fontSize:14,color:'#333333',fontWeight:'500',textAlign:'right'}}>视频截图:</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Image style={{width:110,height:90}} source={{uri:data.warnDealResultPhoto}} />
                    </View>
                </View> */}
                <View style={{flexDirection:'row'}}>
                    {/* {
                        bolRelation ? (
                            <View style={{flex:1,margin:10}}>
                                <TouchableOpacity 
                                    onPress={()=>{this.toDealBolRelation()}}>
                                    <Text style={{backgroundColor:'#37A0FB',justifyContent:'center',
                                        textAlign:'center',fontSize:14,color:'#FFFFFF',padding:10,
                                        borderWidth:1,borderColor:'#37A0FB',borderRadius:3}}>
                                        联动动作
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : <View />
                    } */}
                    <View style={{flex:1,margin:10}}>
                        <TouchableOpacity 
                            onPress={()=>{this.toDeal()}}>
                            <Text style={{backgroundColor:'#37A0FB',justifyContent:'center',
                                textAlign:'center',fontSize:14,color:'#FFFFFF',padding:10,
                                borderWidth:1,borderColor:'#37A0FB',borderRadius:3}}>
                                查看并处理
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default warnScreens