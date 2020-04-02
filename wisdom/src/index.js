import React from 'react';
import {ActivityIndicator,NativeModules,AsyncStorage,Button,DeviceEventEmitter,
    StatusBar,StyleSheet,View,} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer,createBottomTabNavigator } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//登陆注册
import SignInScreen from './sign/login';
import RegisterScreen from './sign/register';//注册
import RegisterSuccess from './sign/regisuccess';//注册成功
import ForgetPassword from './sign/forgetpassword';//忘记密码

//个人中心
import SetPrice from './setting/setprice'; //单价设置
import UseHelp from './setting/usehelp'; //使用帮助
import About from './setting/about'; //关于
import SetUp from './setting/setup'; //设置
import PersonInfo from './setting/personinfo';//个人中心
import EditUsername from './setting/editusername';//修改用户姓名
import EditPassword from './setting/editpassword';//修改用户密码
import EditPhone from './setting/editphone';//修改绑定手机号
import CheckUpdate from './setting/checkUpdate';//检查更新


import HomeScreen from './tab/home';
import MainScreen from './tab/main';
import SetScreen from './tab/setting';//个人中心
import MapView from './home/index';//个人中心

// import HomeDetail from './home/homedetail';
// import MainDetail from './main/maindetail';
// import SetDetail from './setting/setdetail';

import SafetyScore from './home/safetyscore/safetyscore';//安全评分
import WarnMessage from './home/warnmessage';//报警弹窗
import InfoSuccess from './home/infoSuccess';//通信测试

import HomeIndex from './home/index';
import EchartIndex from './home/echarts';
import DataPick from './home/dataPick';
import CodeScreen from './home/qscode';

import RemoteControl from './home/remote/remoteControl';
import LineDetail from './home/remote/lineDetail';
import RemoteSet from './home/remote/remoteSet';

import TimingOperation from './home/timing/timingOperation';
import TimingPicker from './home/timing/timingPicker';
import TimerSuess from './home/timing/timingSuess';

import WarnList from './home/warncase/warnlist'; //警情列表
import WarnDetail from './home/warncase/warndetail'; //警情详情

import ActiveCurve from './home/activecurve/activecurve'; //动态曲线

import CoporateLog from './home/coporatelog/coporatelog'; //操作日志

import GatewayList from './home/devicemanage/gatewaylist';//网关列表
import AddGateway from './home/devicemanage/addgateway';//网关列表
import TempSwitchList from './home/devicemanage/tempswitchlist';//开关列表
import SwitchList from './home/devicemanage/switchlist';//临时开关列表
import AddSwitch from './home/devicemanage/addswitch';//添加开关
import SubmitScan from './home/devicemanage/submitscan';//提交预览
import AddDeviceSuccess from './home/devicemanage/addsuccess';//添加设备成功
import GatewayInfo from './home/devicemanage/gatewayinfo';//网管信息
import EditGateway from './home/devicemanage/editgateway';//修改网关
import SwitchDetail from './home/devicemanage/switchdetail';//空开详情
import MapGetPoing from './home/devicemanage/mapgetpoint';//空开详情
import GetLocation from './components/location';//获取地址信息

import ShareList from './home/sharedevice/sharelist';//网管共享
import ShareDetail from './home/sharedevice/sharedetail';//共享详情
import LimitsList from './home/sharedevice/limitslist';//共享权限
import AddShareUser from './home/sharedevice/addshareuser';//添加用户
import CheckUser from './home/sharedevice/checkuser';//核查用户
import AddTag from './home/sharedevice/addtag';//添加备注
import SharePerson from './home/sharedevice/shareperson';//添加备注
import DeleteShare from './home/sharedevice/deleteshare';//删除共享人员
import QuitShare from './home/sharedevice/quitshare';//删除共享网关
import UserManageList from './home/sharedevice/usermanagelist';//用户管理
import AddUser from './home/sharedevice/adduser';//添加用户
import UserDetail from './home/sharedevice/userdetail';//用户详情
import EditUserPassword from './home/sharedevice/edituserpassword';//用户详情


import MapTest from './main/map';


class AuthLoadingScreen extends React.Component {
    constructor() {
        super();
        this._bootstrapAsync();
    }

    componentDidMount() {
        setTimeout(SplashScreen.hide,1000);

        //需删
        // AsyncStorage.setItem('UmengOperateObj','Umeng&&Umeng&&Umeng')
        // console.log('开始执行')
        // this.getDeviceTokenFun();

        // NativeModules.UMPushModule.getDeviceToken(res => {
        //     console.log('哇哇哇哇deviceToken')
        //     console.log(res)
        //     AsyncStorage.setItem('deviceToken',res)
        // })

        
        AsyncStorage.getItem('message').then(s=>{
            console.log('是否接收消息')
            console.log(s)
            if(s=='true'){
                //静默推送
                DeviceEventEmitter.addListener('DidReceiveNo', res => {
                    console.log('静默推送数据', res)
                    AsyncStorage.setItem('CustomMessage','jmts')
                }) 

                DeviceEventEmitter.addListener('DidOpenMessage', res => {
                    console.log(res)
                    console.log('显示通知栏')
                    let flag = JSON.parse(res.extra).flag;
                    if( flag==='alert'){
                        this.props.navigation.navigate('warnmessage',{
                            item:JSON.parse(res.extra)
                        })
                    }

                    if(flag ==='status-change'){

                        // AsyncStorage.setItem('CustomMessage','jmts')

                        this.props.navigation.navigate('coporatelog')
                    }

                }) 

                
                DeviceEventEmitter.addListener('DidReceiveMessage', res => {
                    console.log(res)
                    console.log('接收推送消息')
                    let flag = JSON.parse(res.extra).flag;
                    if( flag==='alert' ){
                        this.props.navigation.navigate('warnmessage',{
                            item:JSON.parse(res.extra)
                        })
                    }else if(flag==='heart'){
                        this.props.navigation.navigate('infoSuccess',{
                            item:JSON.parse(res.extra)
                        })
                    }
                });
            }
        })
        
        
        // AsyncStorage.removeItem('CustomMessage')
        // setTimeout(()=>{
            
        //     AsyncStorage.setItem('CustomMessage',JSON.stringify({
        //         a:'1111'
        //     }))
        // },12000)
        // AsyncStorage.removeItem('CustomMessage')
        DeviceEventEmitter.addListener('CustomMessage', res => {
            console.log('接收状态改变  有用到此次设置')
            console.log(JSON.parse(res.extra))
            AsyncStorage.removeItem('CustomMessage')
            AsyncStorage.setItem('CustomMessage',JSON.parse(res.extra))
            // this.props.navigation.navigate('warnmessage',{
            //     item:JSON.parse(res.extra)
            // })
        });
        
    }

    // getDeviceTokenFun = async () => {
    //     console.log(111)
    //     console.log(NativeModules);
    //     NativeModules.UMPushModule.getDeviceToken(res => {
    //         console.log(res)
    //         AsyncStorage.setItem('deviceToken',res)
    //     })
    // }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(accessToken ? 'App' : 'Auth');
    };

    // Render any loading content that you like here
    render() {
        return (
        <View style={styles.container}>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const TabNavigator = createBottomTabNavigator({
    home:{
        screen:HomeScreen,
        navigationOptions: {
            tabBarLabel: '首页',
            tabBarIcon: ({ tintColor, focused }) => (
                <FontAwesome name="home" size={24} color={tintColor} />
            ),
        },
    },
    maim:{
        screen:MainScreen,
        navigationOptions: {
            tabBarLabel: '报表',
            tabBarIcon: ({ tintColor, focused }) => (
                <FontAwesome name="bar-chart" size={24} color={tintColor} />
            ),
        },
    },
    setting:{
        screen:SetScreen,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({ tintColor, focused }) => (
                <FontAwesome name="user" size={24} color={tintColor} />
            ),
        },
    }
},{
    tabBarOptions:{
        activeTintColor:"#06C1AE",
        inactiveTintColor:"#979797",
        style:{
            backgroundColor:'#FFFFFF'
        }
    }
})





const AppStack = createStackNavigator({ 
    Home: {
        screen:TabNavigator,
        navigationOptions: {
            header: null,
        }
    }, 
    // homedetail: HomeDetail,
    // maindetail: MainDetail, 
    // setdetail: SetDetail,
    homeIndex:HomeIndex,
    echarts:EchartIndex,
    pick:DataPick,
    code:CodeScreen,
    warnmessage:WarnMessage,
    infoSuccess:InfoSuccess,

    //HOME
    remote:RemoteControl,
    lineDetail:LineDetail,
    remoteSet:RemoteSet,
    safetyscore:SafetyScore,
    location:GetLocation,
    timingOperation:{
        screen:TimingOperation,
        navigationOptions: {
            header: null,
        }
    },//定时操作
    timingPicker:{
        screen:TimingPicker,
        navigationOptions: {
            header: null,
        }
    },//定时操作时间选择
    timerSuess:{
        screen:TimerSuess,
        navigationOptions: {
            header: null,
        }
    },//定时操作时间选择

    map:MapTest,
    warnlist:WarnList,
    warndetail:WarnDetail,
    activecurve:ActiveCurve,
    coporatelog:CoporateLog,
    //个人中心
    setprice:SetPrice,
    usehelp:UseHelp,
    about:About,
    setup:SetUp,
    personinfo:PersonInfo,
    editusername:EditUsername,
    editpassword:EditPassword,
    editphone:EditPhone,
    checkUpdate:CheckUpdate,
    mapview:MapView,
    //网关管理
    gatewaylist:GatewayList,
    addgateway:AddGateway,
    tempswitchlist:TempSwitchList,
    switchlist:SwitchList,
    addswitch:AddSwitch,
    submitscan:SubmitScan,
    adddevicesuccess:AddDeviceSuccess,
    gatewayinfo:GatewayInfo,
    editgateway:EditGateway,
    switchdetail:SwitchDetail,
    mapgetpoint:MapGetPoing,
    //网关共享
    sharelist:ShareList,
    sharedetail:ShareDetail,
    limitslist:LimitsList,
    addshareuser:AddShareUser,
    checkuser:CheckUser,
    addtag:AddTag,
    shareperson:SharePerson,
    deleteshare:DeleteShare,
    quitshare:QuitShare,
    usermanagelist:UserManageList,
    adduser:AddUser,
    userdetail:UserDetail,
    edituserpassword:EditUserPassword,
});



const AuthStack = createStackNavigator({ 
    SignIn: {
        screen:SignInScreen,
        navigationOptions: {
            header: null,
        }
    }, 
    registerScreen:RegisterScreen,
    registerSuccess:RegisterSuccess,
    forgetpassword:ForgetPassword
 });

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));
