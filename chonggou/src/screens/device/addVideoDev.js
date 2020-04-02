import React, { Component } from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CameraComponent from '../components/cammer';
import FetchManager from '../fetch/index';
import SelectSingle from '../components/select/selectobj';
// import ModalView from "react-native-modal";
// import RadioForm from 'react-native-radio-form';
import TreeSelect from 'react-native-tree-select';

import Icon from 'react-native-vector-icons/Ionicons';
import ModelPop from '../components/modelPop';

import { getSystem,getDevice,getAllFloor,getSigleFloor } from '../components/getSystex';

import { Text, View, Alert, ImageBackground, TextInput, PanResponder, KeyboardAvoidingView, StyleSheet, TouchableOpacity, ScrollView,
    Image, Calendar,DeviceEventEmitter,Dimensions } from "react-native";


const { width,height } =Dimensions.get('window');

// let objcheck = '';

class AddVideoDev extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 17 }}>添加视频</Text>
            ),
            headerRight: (
                <TouchableOpacity 
                    onPress={()=>navigation.state.params.navigatePress()}
                >
                    <Text style={{ paddingRight: 15 }}>
                        <Text style={{ color: '#fff', fontSize: 15 }}>确定</Text>
                    </Text>
                </TouchableOpacity>
            ),
            headerLeft: (
                <TouchableOpacity onPress={() => { 
                    console.log(navigation)
                    navigation.goBack() 
                    // navigation.state.params.refresh();
                }}>
                    <View style={{ paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome color="#fff" name="angle-left" size={28} />
                        <Text style={{ color: '#fff', fontSize: 16, paddingLeft: 5, paddingTop: 3 }}>返回</Text>
                    </View>
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: '#3AA1FE',
            }
        };
    };

    constructor(props) {
        super(props)
        this.state = {
            isopen: false,
            left: 10,
            top: 10,

            deviceId:'',
            deviceCpassword:'',
            deviceCusername:'',
            deviceCaptch:'',//验证码
            devicename:'',//摄像头名称
            // defaultSystem:'请选择',
            defaultDevice:'请选择',
            defaultModal:'请选择',
            defaultBuild:'请选择',
            defaultFloor:'请选择',
            locationed:'',//位置
            pointSign:'',
            surroundingPhoto:'',

            // deviceModel:'',//设备类型

            // SystemList:[],
            // systemId:'',

            deviceList:[],
            devicetypeId:'',

            deviceModalList:[],
            deviceModel:'',

            BuildList:[],
            buildId:'',

            FloorList:[],
            floorId:'',

            bol:false,
            list:[{label:'实时视频',bol:false,id:1},{label:'报警截图',bol:false,id:2},
            {label:'录像回放',bol:false,id:3},{label:'设备状态获取',bol:false,id:4}],
            cameraFunction:'',
            objcheck:{},

            phoneStatus:'',//是否添加图片成功

        }

    }

    componentWillMount() {
        this._gestureHandlers = PanResponder.create({
            onStartShouldSetPanResponder: () => true,  //对触摸进行响应
            onMoveShouldSetPanResponder: () => true,  //对滑动进行响应
            onPanResponderGrant: (evt) => {
                console.log((evt.nativeEvent))
                // if (!this.state.HaveSelected) {
                    this.setState({
                        left: (evt.nativeEvent.locationX).toFixed(2),
                        top: (evt.nativeEvent.locationY).toFixed(2),
                        pointSign: (evt.nativeEvent.locationX).toFixed(2) + ' , ' + (evt.nativeEvent.locationY).toFixed(2),
                        HaveSelected: true
                    })
                // }
            }, //激活时做的动作
            onPanResponderMove: (evt) => { },  //移动时作出的动作
            onPanResponderRelease: (evt) => {

            }, //动作释放后做的动作
        })
    }

    
    mark = () => {
        if (!this.state.floorPhoto) {
            Alert.alert("请选择楼层")
            return
        }
        this.setState({
            isopen: !this.state.isopen
        })
    }

    
    Cancel = () => {
        this.setState({
            HaveSelected: false,
            isopen: false
        })
    }


    componentDidMount() {
        this.props.navigation.setParams({navigatePress:this.onPressSumit})
        this.props.navigation.addListener('didFocus', () => {
            this.getSystemFun();
        });
    }

    getSystemFun = () => {
        // const { code } = this.props.navigation.state.params ? this.props.navigation.state.params : this.state;
        // this.setState({
        //     code:code
        // })
        //查询视频系统
        // FetchManager.get('/pub/inner/jtlDeviceDict/findById?id=1574920051755879','', async (set) => {
        //     //下面的就是请求来的数据
        //     console.log(set)
        //     if(set&&set.success){
        //         let data = set.value;
        //         this.setState({
        //             defaultSystem:data.dataDicDesc,
        //             systemId:data.id
        //         })
        //     }
        // }) 


        //设备型号
        let obj = {
            type:2,
            id:1574920051755879
        }
        FetchManager.post('/device/inner/jtlDeviceSystemDic/findListApp',obj, async (set) => {
            //下面的就是请求来的数据
            console.log(set)
            if(set&&set.success){
                let data = set.value;
                let arr = [];
                data.forEach(show=>{
                    let obj = {};
                    obj.label = show.dataDicDesc
                    obj.value = show.id + '';
                    arr.push(obj)
                })
                this.setState({
                    deviceList:arr,
                })
            }
        }) 

        //楼层
        getAllFloor().then(res => {
            console.log(res)
            this.setState({
                BuildList:res,
            })
        });
    }

    // onChangeSystem = (item) => {
    //     this.setState({
    //         defaultSystem:item.label,
    //         systemId:item.value
    //     })
    // }

    onChangeDevice = (item) => {
        this.setState({
            devicetypeId:item.value,
            defaultDevice:item.label
        })
        let obj = {
            type:3,
            id:item.value
        }
        console.log(obj)
        FetchManager.post('/device/inner/jtlDeviceSystemDic/findListApp',obj, async (set) => {
            //下面的就是请求来的数据
            console.log(set)
            if(set&&set.success){
                let data = set.value;
                let arr = [];
                data.forEach(show=>{
                    let obj = {};
                    obj.label = show.dataDicDesc
                    obj.value = show.id + '';
                    arr.push(obj)
                })
                this.setState({
                    deviceModalList:arr,
                })
            }
        })
    }

    onChangeDeviceModal = (item) => {
        this.setState({
            deviceModel:item.value,
            defaultModal:item.label
        })
    }

    onChangeBuild = (item) => {
        getSigleFloor(item.label).then(res => {
            console.log(res)
            this.setState({
                FloorList:res,
                buildId:item.value,
                defaultBuild:item.label
            })
        })
    }

    selectFloor = (item) => {
        this.setState({
            floorId:item.value,
            defaultFloor:item.label,
            floorPhoto: 'http://192.168.0.186:60080/' + item.plan,
        })
    }

    getChangeWord = (item,val) => {
        const { deviceCaptch,deviceName,locationed,deviceModel,deviceCusername,deviceCpassword } = this.state;
        this.setState({
            deviceCaptch:item === 'deviceCaptch' ? val : deviceCaptch,
            deviceName:item === 'deviceName' ? val : deviceName,
            locationed:item === 'locationed' ? val : locationed,
            deviceCusername:item === 'deviceCusername' ? val : deviceCusername,
            deviceCpassword:item === 'deviceCpassword' ? val : deviceCpassword,
        })
    }

    onChangeCheckBox = (bol,val) => {
        const { list } = this.state;
        list.forEach(item=>{
            if(item.id === val){
                item.bol = !item.bol
            }
        })
        this.setState({
            list:list,
        })
    }


    onPressSumit = () => {
        const { deviceId,deviceCaptch,deviceName,deviceModel,buildId,devicetypeId,phoneStatus,
            floorId,locationed,list,deviceCusername,deviceCpassword,pointSign } = this.state;

            if(!phoneStatus){
                this.popUp.showPop('请重新上传图片')
                return 
            }

            let check = ''
            list.forEach(item=>{
                if(item.bol){
                    check += item.id + ','
                }
            })
            console.log(check);
        let obj = {
            deviceCaptch:deviceCaptch,
            deviceName:deviceName,
            deviceModel:deviceModel,
            deviceType:devicetypeId,
            pointSign:pointSign,
            deviceId:deviceId,
            buildingId:buildId,
            floorId:floorId,
            location:locationed,
            cameraFunction:check,
            deviceCpassword:deviceCpassword,
            deviceCusername:deviceCusername
        }
        console.log(obj)

        FetchManager.post('/camera/inner/jtlDeviceCamera/insert',obj, async (set) => {
            //下面的就是请求来的数据
            console.log(set)
            if(set&&set.success){
                this.setState({
                    deviceId:'',
                    deviceCpassword:'',
                    deviceCusername:'',
                    deviceCaptch:'',//验证码
                    devicename:'',//摄像头名称
                    // defaultSystem:'请选择',
                    defaultDevice:'请选择',
                    defaultModal:'请选择',
                    defaultBuild:'请选择',
                    defaultFloor:'请选择',
                    locationed:'',//位置
                    pointSign:'',
                    surroundingPhoto:'',
                })
                this.props.navigation.navigate('AddDevSuccess',{
                    status:2
                })
            }else{
                this.popUp.showPop('添加失败')
            }
        }) 
    }



    render() {
        // const { code } = this.props.navigation.state.params;
        const { deviceId,deviceCusername,deviceName,deviceCaptch,
            locationed,deviceCpassword,bol,list } = this.state;
        
        if (this && this.state.HaveSelected) {
            model = <View style={{ zIndex: 999, elevation: 999, width: 180, height: 120, backgroundColor: '#e5e5e5', position: 'absolute', left: '25%', top: 40 }}>
                <View style={{ height: '25%', backgroundColor: 'yellow', paddingLeft: 5, justifyContent: 'center' }}>
                    <Text>点位标注</Text>
                </View>
                <View style={{ height: '75%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
                        <Text>设备名称：烟感01</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={() => { this.Cancel() }}>
                            <View style={{ borderWidth: 1, borderColor: '#D9E4ED', borderRadius: 1, backgroundColor: 'orange', padding: 2, paddingLeft: 1, paddingRight: 1 }}>
                                <Text>取消</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.SaveDev() }}>
                            <View style={{ borderWidth: 1, borderColor: '#D9E4ED', borderRadius: 1, backgroundColor: 'yellow', padding: 2, paddingLeft: 1, paddingRight: 1 }}>
                                <Text>保存</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        }


        let tip = null
        if (this) {
            tip = <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{ lineHeight: 40, paddingLeft: 10 }}>当前标注设备：{this.state.deviceName}</Text>
                <TouchableOpacity onPress={() => { this.Cancel() }}>
                    <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 1, backgroundColor: 'orange', padding: 2, paddingLeft: 1, paddingRight: 1 }}>
                        <Text>关闭</Text>
                    </View>
                </TouchableOpacity>
            </View>
        } else {
            tip = <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{ lineHeight: 40, paddingLeft: 10 }}>未选择设备类型，请选择设备类型后再进行标注。</Text>
                <TouchableOpacity onPress={() => { this.Cancel() }}>
                    <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 2, backgroundColor: 'orange', padding: 2, paddingLeft: 1, paddingRight: 1 }}>
                        <Text>关闭</Text>
                    </View>
                </TouchableOpacity>
            </View>
        }

        let markinfo = null
        if (this.state.isopen) {
            markinfo = <View style={{ zIndex: 1000, elevation: 1000,
                    height: 250, position: 'absolute', bottom: 0, left: 0, right: 0,top:0 ,
                    borderColor: '#788A93', borderWidth: 3 }}>
                <View style={{ height: 40, backgroundColor: '#fff' }}>
                    {tip}
                </View>
                <View style={{ position: 'relative' }}>
                    <View {...this._gestureHandlers.panHandlers} style={{ height: 204, backgroundColor: 'pink' }}>
                        <Image style={{width:width - 10,height:200,backgroundColor:'#FFFFFF'}}
                            resizeMode={'contain'} 
                            source={{uri: this.state.floorPhoto}}/>
                    </View>
                    <View style={{ zIndex: 999, elevation: 999, width: 20, height: 20, backgroundColor: 'yellow', position: 'absolute', left: this.state.left - 10, top: this.state.top - 10 }}></View>
                    {/* { model } */}
                </View>
            </View>
        }

        return (
            <KeyboardAvoidingView enabled>
                <ScrollView>
                    <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
                    <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                            <View style={{ width: '30%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={{ color: '#FD3E3C' }}>* </Text><Text style={{ textAlign: 'right', color: '#333', fontSize: 15 }}>设备ID:</Text>
                                </View>
                            </View>
                            <View style={{ width: '67%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ width: '85%' }}>
                                    <TextInput placeholder="请输入设备ID" style={styles.input_box}
                                        // onBlur={this.changeDeviceId}
                                        onChangeText={
                                            (deviceId) => this.setState({ deviceId })
                                        }
                                        value={deviceId}
                                    ></TextInput>
                                </View>
                                <TouchableOpacity onPress={() => { this.saoma() }}>
                                    <FontAwesome color="#788A93" name="qrcode" size={28} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* 应用名 */}
                        <InputView 
                            label={'应用名'} 
                            name={'deviceCusername'}
                            value={deviceCusername}
                            onChangeWord = {this.getChangeWord}
                            editable={true}
                            bol={true}
                        />

                        {/* 应用密码 */}
                        <InputView 
                            label={'应用密码'} 
                            name={'deviceCpassword'}
                            value={deviceCpassword}
                            onChangeWord = {this.getChangeWord}
                            editable={true}
                            bol={true}
                        />

                        {/* 验证码 */}
                        <InputView 
                            label={'验证码'} 
                            name={'deviceCaptch'}
                            value={deviceCaptch}
                            onChangeWord = {this.getChangeWord}
                            editable={true}
                        />

                        {/* 摄像头名称 */}
                        <InputView 
                            label={'摄像头名称'} 
                            name={'deviceName'}
                            value={deviceName}
                            onChangeWord = {this.getChangeWord}
                            editable={true}
                        />
                        
                        {/* 所在系统 */}
                        {/* <InputView 
                            label={'所在系统'} 
                            name={'defaultSystem'}
                            value={defaultSystem}
                            editable={false}
                        /> */}

                        {/* 设备类型 */}
                        <SelectView 
                            label={'设备类型'}
                            opt={this.state.deviceList}
                            fun={this.onChangeDevice}
                            def={this.state.defaultDevice}
                        />
                        {/* 设备型号 */}
                        <SelectView 
                            label={'设备型号'}
                            opt={this.state.deviceModalList}
                            fun={this.onChangeDeviceModal}
                            def={this.state.defaultModal}
                        />

                        {/* 所在建筑 */}
                        <SelectView 
                            label={'所在建筑'}
                            opt={this.state.BuildList}
                            fun={this.onChangeBuild}
                            def={this.state.defaultBuild}
                        />

                        {/* 设备楼层/区域 */}
                        <SelectView 
                            label={'楼层/区域'}
                            opt={this.state.FloorList}
                            fun={this.selectFloor}
                            def={this.state.defaultFloor}
                        />

                        {/* 安装位置 */}
                        <InputView 
                            label={'安装位置'} 
                            name={'locationed'}
                            value={locationed}
                            onChangeWord = {this.getChangeWord}
                            editable={true}
                        />

                        {/* 安装时间 */}
                        {/* <InputView 
                            label={'安装时间'} 
                            name={'deviceCpassword'}
                            value={deviceCpassword}
                            onChangeWord = {this.getChangeWord}
                            editable={true}
                            bol={true}
                        /> */}

                        {/* 点位标注 */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, position: 'relative' }}>
                            <View style={{ width: '30%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={{ color: '#FD3E3C' }}>* </Text>
                                    <Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>点位标注:</Text>
                                </View>
                            </View>
                            <View style={{ width: '67%', flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => { this.mark() }} style={{ width: '100%' }}>
                                    <View style={{ borderWidth: 1, borderColor: '#D9E4ED', borderRightWidth: 0, height: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopLeftRadius: 3, borderBottomLeftRadius: 3, fontSize: 14, paddingLeft: 10, backgroundColor: '#F2F7FB' }}>
                                        <Text style={{ color: "#999" }}>{this.state.pointSign}</Text>
                                        <View style={{ width: 30, height: 42, borderWidth: 1, borderColor: '#D9E4ED', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 3, borderBottomRightRadius: 3 }}>
                                            <AntDesign name="pushpino" style={{ fontSize: 15, color: '#788A93' }} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* 设备型号 */}
                        {/* <InputView 
                            label={'设备型号'} 
                            value={deviceModel}
                            name={'deviceModel'}
                            onChangeWord = {this.getChangeWord}
                            editable={true}
                        /> */}

                        {/* 设备现场图 */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
                            <View style={{ width: '30%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={{ color: '#333', fontSize: 15 }}>设备现场图:</Text>
                                </View>
                            </View>
                            <View style={{ width: '67%' }}>
                                <CameraComponent getImgBase={this.getImgBase.bind(this)}></CameraComponent>
                            </View>
                        </View>
                        {/* 设备现场图 */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
                            <View style={{ width: '30%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={{ color: '#FD3E3C' }}>* </Text>
                                    <Text style={{ color: '#333', fontSize: 15 }}>摄像头功能:</Text>
                                </View>
                            </View>
                            <View style={{ width: '67%' }}>
                                {
                                    list.map((show,i)=>(
                                        <CheckView
                                            key={i}
                                            value={show.id} bol={show.bol} 
                                            label={show.label} 
                                            onChangeCheck={this.onChangeCheckBox} />
                                    ))
                                }
                            </View>
                        </View>

                        
                        { markinfo }
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }

    getImgBase = (val) => {
        if (val) {
            let obj = {
                file:'data:image/jpg;base64,' + val
            }
            // console.log('data:image/jpg;base64,' + val)
            FetchManager.post('/pub/open/file/addImg',obj, async (set) => {
                //下面的就是请求来的数据
                console.log(set)
                if(set.success){
                    let data = set.value;
                    this.setState({
                        surroundingPhoto: data.fileName,
                        phoneStatus:true
                    })
                }else{
                    this.setState({
                        surroundingPhoto: data.fileName,
                        phoneStatus:false
                    }) 
                }
            })
        }
    }
}
    
const styles = StyleSheet.create({
    title_icon:{
        position:'absolute',
        top:12,
        right:10
    },
    input_box: { 
        borderWidth: 1, 
        borderColor: '#D9E4ED', 
        padding: 0, 
        borderRadius: 3, 
        fontSize: 14, 
        padding: 3, 
        color: '#999', 
        backgroundColor: '#F2F7FB' 
    }
});



class SelectView extends Component{
    // {/* 所在建筑 */}
    render(){
        const { label,opt,fun,def } = this.props;
        return(
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                <View style={{ width: '30%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Text style={{ color: '#FD3E3C' }}>* </Text><Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>{label}:</Text>
                    </View>
                </View>
                <View style={{ width: '67%', borderWidth: 1, borderRadius: 3, borderColor: '#D9E4ED' }}>
                    <SelectSingle
                        options={opt} 
                        onSelect={fun}
                        downMarginTop={11}
                        dropdownWidth={120}
                        defaultValue={ def }/>
                </View>
            </View>
        )
    }
}

class InputView extends Component{
    // {/* 所在建筑 */}

    onChangeWord = (val) => {
        console.log(val)
        const { onChangeWord,name } = this.props;
        onChangeWord(name,val)
    }

    render(){
        const { label,editable,value,bol } = this.props;
        return(
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                <View style={{ width: '30%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        
                        {
                            bol ? <Text /> : <Text style={{ color: '#FD3E3C' }}>* </Text>
                        }
                        <Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>{label}:</Text>
                    </View>
                </View>
                <View style={{ width: '67%', borderWidth: 1, borderRadius: 3, borderColor: '#D9E4ED' }}>
                    <TextInput
                        editable={editable}
                        value={value}
                        onChangeText={ this.onChangeWord }
                        style={styles.input_box}></TextInput>
                </View>
            </View>
        )
    }
}


class CheckView extends Component{

    onChangeCheck = () => {
        const { bol,onChangeCheck,value } = this.props;
        onChangeCheck(bol,value)
    }

    render(){
        const { label,bol } = this.props;
        return(
            <View style={{flexDirection:'row',marginTop:5}}>
                <TouchableOpacity style={{width:24}} onPress={this.onChangeCheck}>
                    <Text style={{width:24,height:24,borderWidth:1,borderColor:'#333333',textAlign:'center',lineHeight:24}}>
                        {
                            bol ? (
                                <FontAwesome style={{padding:2}} color="#DC4C40" name="heart" size={18} />
                            ) : <Text />
                        }
                    </Text>
                </TouchableOpacity>
                <Text style={{flex:1}}>{label}</Text>
            </View>
        )
    }
}

export default AddVideoDev;