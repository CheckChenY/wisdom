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
// import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map';

// import Tree from './tree';

import { getSystem,getDevice,getAllFloor,getSigleFloor } from '../components/getSystex';

import { Text, View, Alert, ImageBackground, TextInput, PanResponder, KeyboardAvoidingView, StyleSheet, TouchableOpacity, ScrollView,
    Image, Calendar,DeviceEventEmitter,Dimensions } from "react-native";


let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

let SystemDic, initTypeDic;
class AddDev extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 17 }}>编辑设备</Text>
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
                    navigation.goBack() 
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
            BuildList: [],
            FloorList: [],
            SystemList: [],
            TypeList: [],
            // TypeDic:[],
            initTypeDic:[],
            Statusdefault:'请选择设备状态',
            StatusDic: [{label:'启用',value:1}, {label:'未启用',value:2}, {label:'维修',value:3}, {label:'保养',value:4}, {label:'报废',value:5}],
            HaveSelected: false,
            code: '',//设备id
            System:'',//系统类型
            deviceType:"",//设备类型
            buildingId:'',//所在区域
            floorId:'',//所在建筑
            defaultSystem:'',//系统类型显示
            defaultType:'请选择设备类型',//设备类型显示
            defaultBuild:'请选择所在建筑',//所在区域显示
            defaultFloor:'请选择设备楼层/区域',//所在建筑显示
            locationed:'',//所在位置
            pointSign:'',//点位标注
            deviceModel:'',//硬件
            createTime:'',//生产日期
            // validityTerm:'',//有效期
            surroundingPhoto:'',
            floorPhoto: '', // 楼层图片
            deviceName: '',
            DeleteId:'',

            data:'',//回显信息整合
            phoneStatus:false,//是否添加图片

            floorPhoneList:{},//楼层图片
        }
    }
    onChangeBuild=(item,id)=>{
        getSigleFloor(item.label).then(res => {
            console.log(id)
            res.forEach((show,i)=>{
                if(show.id === id){
                    this.setState({
                        FloorList:res,
                        floorPhoto: 'http://192.168.0.186:60080/' + show.plan,
                    })
                }
            })
        })
    }
    

    // 添加设备
    onPressSubmit = () => {
        const { code,System,defaultType,buildingId,floorId,
            locationed,pointSign,deviceModel,validityTerm,
            data,surroundingPhoto,relevantCamera,cameraIds,netCode,phoneStatus
        } = this.state;
        if(!phoneStatus){
            this.popUp.showPop('添加图片失败，请重新添加')
            return
        }
    
        let obj={
            // cameraIds:cameraIds,
            // method:0,
            id:data.id,
            deviceId: code,
            // systemId: System,
            deviceType: data.deviceType,
            buildingId: buildingId,
            floorId: floorId,
            location: locationed,
            pointSign:pointSign,//点位标注
            // deviceModel: deviceModel,
            // validityTerm: validityTerm,
            // relevantCamera: relevantCamera,
            surroundingPhoto: surroundingPhoto,
            // deviceCode:code + ':' + netCode
        }

        console.log(obj)
        // FetchManager.post('/device/inner/jtlDeviceDetail/insertByUser ',obj, (set) => {
        //     // 下面的就是请求来的数据
        //     console.log(set)
        //     if( set && set.success ){
        //         this.props.navigation.navigate('AddDevSuccess')
        //     }else{
        //         this.popUp.showPop(set.errorMsg)
        //     }
        // }) 
    }

    componentDidMount() {
        // debugger;
        this.props.navigation.setParams({navigatePress:this.onPressSubmit})
        getAllFloor().then(res => {
            this.setState({
                BuildList:res,
            })
        });
        this.getData();
    }

    getData = () => {
        const { id } = this.props.navigation.state.params;
        let obj = {
            deviceId:id
        }///device/inner/jtlDevice/getDetailApp   ///device/inner/jtlDevice/findByDeviceId
        FetchManager.get('/device/inner/jtlDevice/getDetailApp',obj, async (set) => {
            //下面的就是请求来的数据
            console.log(set)
            if(set&&set.success){
                let data = set.value[0];
                let buildItem = {value:data.buildingId,label:data.build}
                this.setState({
                    id:data.id,
                    code: data.deviceId,//设备id
                    defaultType:data.deviceName,//设备类型
                    defaultBuild:data.build,//所在区域显示
                    defaultFloor:data.floor,//所在建筑显示
                    
                    deviceType: data.deviceType,
                    buildingId:data.buildingId,//所在区域显示
                    floorId:data.floorId,//所在建筑显示

                    locationed:data.location,//所在位置
                    pointSign:data.pointSign,//点位标注
                    surroundingPhoto:data.surroundingPhoto,
                })
                
                this.onChangeBuild(buildItem,data.floorId)
                // this.onChangeBuild(floorItem)
            }
        }) 
    }


    //根据建筑 获取楼层点位标注图
    selectFloor=(item)=>{
        console.log(item)
        this.setState({
            floorPhoto: 'http://192.168.0.186:60080/' + item.plan,
            floorId:item.value
        })
    }



    render() {
        // const { code } = this.props.navigation.state.params;
        const { code,FloorList,BuildList } = this.state;
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
            markinfo = <View style={{ zIndex: 1000, elevation: 1000, height: 250, position: 'absolute', bottom: 0, left: 0, right: 0, borderColor: '#788A93', borderWidth: 3 }}>
                <View style={{ height: 40, backgroundColor: '#fff' }}>
                    {tip}
                </View>
                <View style={{ position: 'relative' }}>
                    <View {...this._gestureHandlers.panHandlers} style={{ height: 204, backgroundColor: 'pink' }}>
                        <ImageBackground style={{width:'100%',height:'100%'}} source={{uri: this.state.floorPhoto}}/>
                    </View>
                    <View style={{ zIndex: 999, elevation: 999, width: 20, height: 20, backgroundColor: 'yellow', position: 'absolute', left: this.state.left - 10, top: this.state.top - 10 }}></View>
                    {/* { model } */}
                </View>
            </View>
        }


        
        return (
            <KeyboardAvoidingView enabled>
                <ScrollView>
                    <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                            <View style={{ width: '30%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={{ color: '#FD3E3C' }}>* </Text><Text style={{ textAlign: 'right', color: '#333', fontSize: 15 }}>设备ID:</Text>
                                </View>
                            </View>
                            <View style={{ width: '67%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View>
                                    <TextInput placeholder="请输入设备ID" style={styles.input_box}
                                        value={code} editable={true} />
                                </View>
                            </View>
                        </View>

                        {/* 设备类型 */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <View style={{ width: '30%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={{ color: '#FD3E3C' }}>* </Text><Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>设备类型:</Text>
                                </View>
                            </View>
                            <View style={{ width: '67%', borderWidth: 1, borderRadius: 3, borderColor: '#D9E4ED' }}>
                                <TextInput
                                editable={true}
                                value={this.state.defaultType}
                                style={styles.input_box}></TextInput>
                            </View>
                        </View>

                        {/* 所在建筑 */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <View style={{ width: '30%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={{ color: '#FD3E3C' }}>* </Text><Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>所在建筑:</Text>
                                </View>
                            </View>
                            <View style={{ width: '67%', borderWidth: 1, borderRadius: 3, borderColor: '#D9E4ED' }}>
                                <SelectSingle
                                    options={BuildList} 
                                    onSelect={this.onChangeBuild}
                                    dropdownWidth={130}
                                    downMarginTop={5}
                                    defaultValue={this.state.defaultBuild}/>
                            </View>
                        </View>

                        {/* 设备楼层/区域 */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <View style={{ width: '30%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={{ color: '#FD3E3C' }}>* </Text><Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>楼层/区域:</Text>
                                </View>
                            </View>
                            <View style={{ width: '67%', borderWidth: 1, borderRadius: 3, borderColor: '#D9E4ED' }}>
                                <SelectSingle
                                    options={FloorList} 
                                    onSelect={this.selectFloor}
                                    dropdownWidth={130}
                                    downMarginTop={5}
                                    defaultValue={this.state.defaultFloor}/>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, position: 'relative' }}>
                            <View style={{ width: '30%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    {/* <Text style={{ color: '#FD3E3C' }}>* </Text> */}
                                    <Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>安装位置:</Text>
                                </View>
                            </View>
                            <View style={{ width: '67%', }}>
                                <View style={{flexDirection:'row' }}>
                                    <View style={{flex:1}}>
                                        <TextInput placeholder="输入具体位置" 
                                            onChangeText={
                                                (locationed) => this.setState({ locationed })
                                            }
                                            value={this.state.locationed}
                                            style={{borderWidth: 1, borderColor: '#D9E4ED', height: 42, padding: 0,
                                                fontSize: 14, paddingLeft: 10, color: '#999' }}></TextInput>
                                    </View>
                                    {/* <TouchableOpacity style={{width:30,backgroundColor: '#F2F7FB',}} onPress={ this.getLocation }>
                                        <View style={{ width: 30, height: 42, borderWidth: 1, borderColor: '#D9E4ED', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 3, borderBottomRightRadius: 3 }}>
                                            <AntDesign name="pushpino" style={{ fontSize: 15, color: '#788A93' }} />
                                        </View>
                                    </TouchableOpacity> */}
                                </View>
                            </View>
                        </View>

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
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <View style={{ width: '30%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={{ color: '#FD3E3C' }}>* </Text><Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>有效期:</Text>
                                </View>
                            </View>
                            <View style={{ width: '67%' }}>
                                <TextInput placeholder="输入设备到期时间" 
                                editable={false}
                                value={this.state.validityTerm}
                                style={styles.input_box}></TextInput>
                            </View>
                        </View> */}

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
                    </View>
                    { markinfo }
                    <ModelPop ref={ ref => this.popUp = ref }></ModelPop>

                </ScrollView>
            </KeyboardAvoidingView>
        );
    }


    SaveDev = () => {
        this.setState({
            HaveSelected: false,
            isopen: !this.state.isopen
        })
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
    Cancel = () => {
        this.setState({
            HaveSelected: false,
            isopen: false
        })
    }

    getLocation = () => {
        this.props.navigation.navigate('map')
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
        height: 42, 
        padding: 0, 
        borderRadius: 3, 
        fontSize: 14, 
        paddingLeft: 10, 
        color: '#999', 
        backgroundColor: '#F2F7FB' 
    }
});
export default AddDev;