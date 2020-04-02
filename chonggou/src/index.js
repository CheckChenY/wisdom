import React from 'react';
import {
    ActivityIndicator,AsyncStorage,StatusBar,StyleSheet,View,NativeModules,ToastAndroid,
    Text,TouchableOpacity,Dimensions,DeviceEventEmitter,AppState
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer, createBottomTabNavigator, } from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SplashScreen from 'react-native-splash-screen';


import FeatchScreen from './screens/fetch/index';

//登录、忘记密码
import SignInScreen from './screens/login/login';
import RegisterScreen from './screens/register';
import ForgetPassword from './screens/login/ForgetPassword';

import TabHome from './screens/tab/tabHome';
import TabMonitor from './screens/tab/tabMonitor';
import TabMessage from './screens/tab/tabMessage';
import TabMain from './screens/tab/tabMain';

//上传
import OnesetUpload from './screens/upload/OnesetUpload'
import UploadSuccess from './screens/upload/UploadSuccess'
import UploadRecord from './screens/upload/UploadRecord'
import UploadRecordDetail from './screens/upload/UploadRecordDetail'

//事件处理
import CaseDeal from './screens/deal/CaseDeal'
import caseDetail from './screens/deal/caseDetail'
import CaseDetailTab from './screens/deal/caseDetailTab'
import CaseRecordTab from './screens/deal/caseRecordTab';
import CaseDealList from './screens/deal/CaseDealList'
import CaseDealRecordList from './screens/deal/CaseDealRecordList'
import CaseDealRecordDetail from './screens/deal/CaseDealRecordDetail'
import MonitorCaseDeal from './screens/deal/MonitorCaseDeal'
import TroubleDeal from './screens/deal/TroubleDeal'
// import TroubleDealList from './screens/deal/TroubleDealList'
import TroublePublicTab from './screens/deal/troublePublicTab'
import TroubleDealRecordDetail from './screens/deal/TroubleDealRecordDetail'

import CaseVideoList from './screens/deal/caseVideoList';


//设备
import AddDev from './screens/device/AddDev';
import EditAddDev from './screens/device/editAddDev';
import EditAddVideo from './screens/device/editAddVideo';
import AddVideoDev from './screens/device/addVideoDev';
import Tree from './screens/device/tree'
import  QsCode from './screens/device/qscode'
import AddDevSuccess from './screens/device/AddDevSuccess'
import DevDetail from './screens/device/DevDetail'
import EditParams from './screens/device/EditParams'
import MonitorDev from './screens/device/MonitorDev'
import StateAnalysis from './screens/detail/stateanalysis'
import CameraDetail from './screens/device/cameraDetail';




//消息
import PatrolDetail from './screens/message/businessmessage/PatrolDetail'
import PatrolRecord from './screens/message/businessmessage/PatrolRecord'
import AddPatrol from './screens/message/businessmessage/AddPatrol'
import EditPatrol from './screens/message/businessmessage/editPatrol'
import PatrolDetaiList from './screens/message/businessmessage/PatrolDetaiList' 
// import PatrolList from './screens/message/businessmessage/PatrolList'
import PatrolRecordList from './screens/message/businessmessage/PatrolRecordList'
// import PatrolRecordDetaiList from './screens/message/businessmessage/PatrolRecordDetaiList'
import PatrolDotList from './screens/message/businessmessage/PatrolDotList'
// import PatrolForm from './screens/message/businessmessage/PatrolForm'
import PatrolPostSuccess from './screens/message/businessmessage/PatrolPostSuccess'
import AddPatrolSuccess from './screens/message/businessmessage/AddPatrolSuccess'
import PortRecordTabList from './screens/message/businessmessage/portRecordTabList'
import NoticeAnnounce from './screens/message/noticeannounce/NoticeAnnounce'
import TrueFirewarning from './screens/message/noticeannounce/TrueFirewarning'
import WarnMessage from './screens/message/warnMessage';

import PatrolScreens from './screens/message/patrol'
import DeviceMessageList from './screens/message/deviceMessageList';
// import DeviceMesDetail from './screens/message/deviceMesDetail';
import SystemMessage from './screens/message/systemMessage';
import WarningMessage from './screens/message/warningMessage';
import PatrolMessage from './screens/message/patrolMessage';
import NoticeMessage from './screens/message/noticeMessage';
import RealyMessage from './screens/message/realyMessage';

//我的
import CompanyInfo from './screens/mine/CompanyInfo'
import TechnicalSupport from './screens/mine/technicalSupport'
import UserFeedback from './screens/mine/useFeedback'
import CheckUpdate from './screens/mine/checkUpdate'
import UseHelp from './screens/mine/useHelp'
import About from './screens/mine/about'
// import AppStateIndex from './screens/mine/index'
import SetUp from './screens/mine/setUp'
import MainScreens from './screens/mine/main';
import EditPassword from './screens/mine/editPassword'
import PaymentReminder from './screens/mine/paymentReminder'

import PunchClock from './screens/home/punchClock';//考勤
import PunkSuccess from './screens/home/punkSuccess';//打卡成功
import WorkRecord from './screens/home/workRecord';//考勤
import HomeMap from './screens/home/HomeMap';//首页banner地图
import BaiDuMap from './screens/components/getLocation'
import StatisticalScreen from './screens/home/statistical';
import EquipmentScreen from './screens/home/equipment';

import MoreSetting from './screens/home/moreSetting';
import CompanyList from './screens/company/companyList';
import CompanyDetail from './screens/company/companyDetail';
import CompanyWaringList from './screens/company/companyWaringList';
import CompanyTab from './screens/company/companyTab';
import CompanyDetailTab from './screens/company/companyDetailTab';
import CompanyRecordTab from './screens/company/companyRecordTab';

import BuildList from './screens/build/buildList';
import AddBuild from './screens/build/addBuild';
import Addfloor from './screens/build/addFloor';
import FloorList from './screens/build/floorList';
import FloorEdit from './screens/build/floorEdit';
import BuildEdit from './screens/build/buildEdit';

import ActionPatrol from './screens/home/actionPatrol';
import ActionPatrolFrom from './screens/home/actionPatrolFrom';
import ActionPatrolFromDetail from './screens/home/actionPatrolFromDetail';
import ActionPatrolFromFail from './screens/home/actionPatrolFromFail';
import ActionPatrolFromSuccess from './screens/home/actionPatrolFromSuccess';



import MonitorMessage from './screens/monitor/monitorMessage';
import DeviceInformation from './screens/monitor/deviceInformation';
import VideoInformation from './screens/monitor/videoInformation';
import VideoEquipment from './screens/monitor/videoEquipment';
import VideoDetail from './screens/monitor/videoDetail';
import VideoImg from './screens/monitor/videoImg';
import AccessEquipment from './screens/monitor/accessEquipment';
import CurveScreens from './screens/monitor/curve';
import EquipmentStatue from './screens/monitor/equipmentStatue';
import CommitSuccess from './screens/monitor/CommitSuccess';
import CommitRecordsList from './screens/monitor/commitRecordsList';
import DeviceDetail from './screens/monitor/deviceDetail';
import InfoProcessing from './screens/monitor/infoProcessing';
import InfoDetailTab from './screens/monitor/infoDetailTab';
import InfoImage from './screens/monitor/infoImage';
import InfoVideo from './screens/monitor/infoVideo';
import InfoDevice from './screens/monitor/infoDevice';
import InfoRemote from './screens/monitor/infoRemote';
import InfoVideoList from './screens/monitor/infoVideoList'
import InfoRecord from './screens/monitor/infoRecord';
import ProcessingRecords from './screens/monitor/processingRecords';

//添加设备
import Devicelist from './screens/devicemanger/devicelist';//设备管理







class AuthLoadingScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            deviceToken:"",
            userName:'',
        }
        this._bootstrapAsync();
    }
    
    componentDidMount() {
        
        // const { userName } = this.state;
        
        SplashScreen.hide(); // 关闭启动页

        

        // this.getObj()
        

        DeviceEventEmitter.addListener('DidOpenMessage', res => {
            // console.log(res)
            this.pushAJump(res)
        }) 


        DeviceEventEmitter.addListener('DidReceiveMessage', res => {
            // console.log(res)
            this.pushAndJump(res)
        });


        // DeviceEventEmitter.addListener('Activeapp', () => {
        //     console.log('我到后台运行程序')
        // });
    }

    pushAJump = (res) => {
        console.log(res)
        let tx = JSON.parse(res.extra)
        if(tx.flag === 'alert'){
            this.props.navigation.navigate('warnMessage',{
                type:1,
                message:tx
            });
        }else if(tx.flag === 'msg'){
            console.log(tx)
            this.props.navigation.navigate('Message');
        }
    }


    


    // 推送跳转
    pushAndJump = (res) => {
        console.log(res)
        let tx = JSON.parse(res.extra)


        if(tx.flag === 'alert'){
            this.props.navigation.navigate('warnMessage',{
                type:1,
                message:tx
            });
        }
        // else if(mes === 2){
        //     //巡查任务  taskid  safetaskid
        //     if (tx.safetaskid) {
        //         this.props.navigation.navigate('NoticeAnnounce',{
        //         // this.props.navigation.navigate(userToken ? 'NoticeAnnounce' : 'Auth',{
        //             id:tx.safetaskid,
        //             message:obj
        //         });
        //     }
        //     if (tx.taskid) {
        //         this.props.navigation.navigate('PatrolDetail',{
        //         // this.props.navigation.navigate(userToken ? 'PatrolDetail' : 'Auth',{
        //             id:tx.taskid,
        //             message:obj
        //         });
        //     }
            
        // }
        // else if(mes === 1){
        //     this.props.navigation.navigate('warnMessage',{
        //     // this.props.navigation.navigate(userToken ? 'warnMessage' : 'Auth',{
        //         id:tx.deviceAlertId,
        //         type:1,
        //         disabled:true,
        //         message:obj
        //     });
        // }
        // else if(tx.flag === 'msg'){
        //     this.props.navigation.navigate('Message');
        // }
    }
    
    _bootstrapAsync = async () => {
        // await AsyncStorage.clear();
        const userToken = await AsyncStorage.getItem('userToken');
        console.log(userToken)
        // let userName = await AsyncStorage.getItem('userName');
        // let deviceToken = await AsyncStorage.getItem('deviceToken');


        if(userToken === 'abc'){
            this.props.navigation.navigate('App');
        }else if(userToken === 'abcd'){
            this.props.navigation.navigate('Manger');
        }else{
            this.props.navigation.navigate('Auth');
        }
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        // this.props.navigation.navigate(userToken === 'abc' ? 'App' : userToken === 'abcd' ? 'manger' : 'Auth');
    };
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
    Home: {
        screen: TabHome,
        navigationOptions: {
            tabBarLabel: '首页',
            tabBarIcon: ({ tintColor, focused }) => (
                <FontAwesome name="home" size={25} color={tintColor} />
            ),
            headerTitle: "智慧"
        },
    },
    Monitor: {
        screen: TabMonitor,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '监控',
            tabBarIcon: ({ tintColor, focused }) => (
                <FontAwesome name="desktop" size={19} color={tintColor} />
            ),
        }),
    },
    Message: {
        screen: TabMessage,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '消息',
            tabBarIcon: ({ tintColor, focused }) => (
                <FontAwesome name="envelope-o" size={21} color={tintColor} />
            ),
        }),
    },
    Main: {
        screen: TabMain,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '我的',
            tabBarIcon: ({ tintColor, focused }) => (
                <FontAwesome name="user-o" size={20} color={tintColor} />
            ),
        })
    },
},
{
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: '#06C1AE',
        inactiveTintColor: '#979797',
        style: { backgroundColor: '#ffffff' },
    },
});





const AppStack = createStackNavigator({
    Home: TabNavigator,

    FeatchScreen:FeatchScreen,
    moreSetting:MoreSetting,//更多设置
    companyList:CompanyList,//企业信息
    companyDetail:CompanyDetail,//企业详情
    companyWaringList:CompanyWaringList,//警情跟中
    companyTab:CompanyTab,//单位警情
    companyDetailTab:CompanyDetailTab,//监管敬请处理
    companyRecordTab:CompanyRecordTab,//警情处理记录 

    build:BuildList,//建筑信息
    addBuild:AddBuild,//添加建筑信息
    addfloor:Addfloor,//添加楼层
    floorList:FloorList,//楼层列表
    buildEdit:BuildEdit,//编辑建筑
    floorEdit:FloorEdit,//编辑楼层

    upload:OnesetUpload,//一键上传
    UploadSuccess:UploadSuccess,//上传成功
    UploadRecordDetail:UploadRecordDetail, //上传记录详情
    UploadRecord:UploadRecord,  //上传记录
    punchClock:PunchClock,//考勤
    punkSuccess:PunkSuccess,//打卡成功
    HomeMap:HomeMap,//首页banner地图
    map:BaiDuMap,//获取当前位置
    workRecord:WorkRecord,//考勤记录
    monitorMessage:MonitorMessage,//设备信息
    deviceInformation:DeviceInformation,//监控 =》 设备信息
    videoInformation:VideoInformation,//视频监控
    videoEquipment:VideoEquipment,//视频监控详情展示
    videoDetail:VideoDetail,//视频设备详情信息
    videoImg:VideoImg,//相关图片
    infoProcessing:InfoProcessing,//监控 =》 故障，报警，离线处理
    processingRecords:ProcessingRecords,//故障，报警，离线处理 =》 处理记录
    infoDetailTab:InfoDetailTab,//故障，澳景，离线处理  =》 详情
    infoImage:InfoImage,
    infoVideo:InfoVideo,
    infoDevice:InfoDevice,
    infoRemote:InfoRemote,
    infoVideoList:InfoVideoList,
    infoRecord:InfoRecord,//警情记录
    statistical:StatisticalScreen,//统计报表
    CaseDealList: CaseDealList, //警情处理列表
    CaseDealRecordList:CaseDealRecordList,//警情处理纪录列表
    CaseDeal:CaseDeal,//警情处理（报警、故障、离线）
    caseDetail:caseDetail,//同上 备用
    caseDetailTab:CaseDetailTab,//同上 备用
    caseRecordTab:CaseRecordTab,
    caseVideoList:CaseVideoList,//视频列表
    curve:CurveScreens,//参数曲线
    stateanalysis:StateAnalysis,
    cameraDetail:CameraDetail,//摄像头详情
    CaseDealRecordDetail:CaseDealRecordDetail,//警情_处理记录详情（报警、故障、离线）
    TroubleDealRecordDetail:TroubleDealRecordDetail,//隐患_处理记录详情
    MonitorCaseDeal:MonitorCaseDeal,//系统监控_警情处理

    actionPatrol:ActionPatrol,//home开始巡查
    actionPatrolFrom:ActionPatrolFrom,//home开始巡查 详情
    actionPatrolFromDetail:ActionPatrolFromDetail,//home 巡查详情
    actionPatrolFromFail:ActionPatrolFromFail,//home 巡查失败
    actionPatrolFromSuccess:ActionPatrolFromSuccess,//home 巡查失败

    TroubleDeal:TroubleDeal,//隐患处理
    // TroubleDealList:TroubleDealList,//隐患处理列表
    dealManger:TroublePublicTab,//隐患处理列表
    equipment:EquipmentScreen,
    access:AccessEquipment,//接入设备
    AddDev:AddDev,//手动添加设备
    addVideoDev:AddVideoDev,//添加视频摄像头
    EditAddDev:EditAddDev,//编辑添加设备
    EditAddVideo:EditAddVideo,//编辑添加摄像头
    tree:Tree,
    qscode:QsCode,//扫码添加
    AddDevSuccess:AddDevSuccess,//添加设备成功
    DevDetail:DevDetail,//设备详情
    DeviceDetail:DeviceDetail,//接入设备=》设备详情
    EditParams:EditParams,//修改设备参数
    MonitorDev:MonitorDev,//监控设备
    equipmentStatue:EquipmentStatue,//设备状态
    CommitSuccess:CommitSuccess,//远程操作成功
    commitRecordsList:CommitRecordsList,//远程操作记录
    
    NoticeAnnounce:NoticeAnnounce,//通知公告
    deviceMessageList:DeviceMessageList,//设备信息
    // deviceMesDetail:DeviceMesDetail,//设备信息详情
    TrueFirewarning:TrueFirewarning,//真实火警
    CompanyInfo:CompanyInfo,//单位信息
    warnMessage:WarnMessage,
    systemMessage:SystemMessage,//系统消息详情
    warningMessage:WarningMessage,//警情信息
    patrolMessage:PatrolMessage,//巡查信息
    noticeMessage:NoticeMessage,//通知消息详情
    realyMessage:RealyMessage,//真实火警
    
    technicalSupport:TechnicalSupport,//技术支持
    userFeedback:UserFeedback,//使用反馈
    checkUpdate:CheckUpdate,//检查更新
    useHelp:UseHelp,//使用帮助
    about:About,//关于
    setUp:SetUp,//设置
    // stateIndex:AppStateIndex,
    mainSelf:MainScreens,//我的详情
    editPassword:EditPassword,//修改密码
    PaymentReminder:PaymentReminder,// 续费提醒
    
    AddPatrol:AddPatrol,//巡查绑定
    editPatrol:EditPatrol,//修改巡查点
    // PatrolList:PatrolList,//巡查任务列表 
    PatrolList:PatrolDetaiList,//巡查任务详情列表
    PatrolRecordList:PatrolRecordList,//巡查记录列表
    PatrolDotList:PatrolDotList,//巡查点列表
    PatrolRecord:PatrolRecord,//已巡查记录
    // PatrolRecordDetaiList:PatrolRecordDetaiList,//已巡查记录
    PatrolDetail:PatrolDetail,//巡查点详情
    portRecordTabList:PortRecordTabList,//巡查记录tab列表
    patrol:PatrolScreens,//开始巡查
    AddPatrolSuccess:AddPatrolSuccess,//添加巡查成功
    // PatrolForm:PatrolForm,//巡查任务-读卡成功
    PatrolPostSuccess:PatrolPostSuccess,//巡查提交成功


    devicelist:Devicelist,//设备管理

});

TabNavigator.navigationOptions = ({ navigation }) => {

    const { routeName } = navigation.state.routes[navigation.state.index];
    // You can do whatever you like here to pick the title based on the route name

    let headerTitle = "", headerRight = "", headerLeft = "", headerStyle = "";
    
    if (routeName === "Home") {
        headerTitle = (
            <Text style={{ flex: 1, textAlign: 'center', color: '#ffffff', fontSize: 18, fontWeight: 'bold' }}>智慧消防</Text>
        );
        headerRight = (
            <Text />
            // <TouchableOpacity
            //     onPress={() => navigation.navigate('OnesetUpload', {
            //         height: height,
            //         title: '隐患上传',
            //     })}
            // >
            //     <FontAwesome style={{ paddingRight: 20 }} name="camera" size={18} />
                
            // </TouchableOpacity>
        );
        headerLeft = (
            <Text />
            // <TouchableOpacity onPress={() => navigation.navigate('punchClock',{
            //     title: '考勤打卡',
            //     titleRight: '打卡记录'
            // })}>
            //     <FontAwesome style={{paddingLeft:20}} name="th" size={18} />
            // </TouchableOpacity>
        );
        headerStyle = {
            backgroundColor: '#3AA1FE',
            color:"#cccccc"
        }
    }else if (routeName === "Monitor") {
        headerTitle = (
            <Text style={{ flex: 1, textAlign: 'center', color: '#ffffff', fontSize: 18, fontWeight: 'bold' }}>监控</Text>
        ),
        headerRight = (
            <Text />
        )
        headerLeft = <View />, headerStyle = {
            backgroundColor: '#3AA1FE',
            color:"#cccccc"
        }
    }else if (routeName === "Message") {
        headerTitle = (
            <Text style={{ flex: 1, textAlign: 'center', color: '#ffffff', fontSize: 18, fontWeight: 'bold' }}>消息</Text>
        ),
        headerRight = <View />,
        headerLeft = <View />, 
        headerStyle = {
            backgroundColor: '#3AA1FE',
        }
    }else if (routeName === "Main") {
        headerTitle = (
            <Text style={{ flex: 1, textAlign: 'center', color: '#ffffff', fontSize: 18, fontWeight: 'bold' }}>我的</Text>
        ),
        headerRight = (
            <TouchableOpacity onPress={() => navigation.navigate('PaymentReminder')}>
                <FontAwesome  style={{paddingRight:20,color:'#FFFFFF'}} name="bell-o" size={18} />
            </TouchableOpacity>
        ),
        headerLeft = <View />,
        headerStyle= {
            backgroundColor: '#3AA1FE',
            color:"#cccccc"
        }
    }
    return {
        headerTitle, headerRight, headerLeft, headerStyle
    };
};


const AuthStack = createStackNavigator({
    SignIn: SignInScreen,
    register: RegisterScreen,
    ForgetPassword: ForgetPassword
});

// let status = 

export default createAppContainer(createSwitchNavigator({
        AuthLoading: AuthLoadingScreen,
        App: AppStack,//主页
        Auth: AuthStack,//登录页
    },{
        initialRouteName: 'AuthLoading',
}));
