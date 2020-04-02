import React, { Component } from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CameraComponent from '../components/cammer'
import { Text, View,Alert, ImageBackground, Modal, TextInput, PanResponder, KeyboardAvoidingView, StyleSheet, TouchableOpacity, ScrollView,
    Calendar } from "react-native";
import { getSystem,getDevice,getAllFloor,getSigleFloor } from '../components/getSystex';
import FetchManager from '../fetch/index';
import SelectSingle from '../components/select/selectSingle';
import ModelPop from '../components/modelPop';
class MonitorDev extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 18 }}>视频监控</Text>
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
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                        <FontAwesome color="#fff" name="angle-left" size={28}/>
                        <Text style={{color:'#fff',fontSize:16,paddingLeft:5,paddingTop:3}}>返回</Text>
                    </View>
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: '#3AA1FE',
                height: 50
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
            BuildDic:[],
            buildingId:'',
            defaultBuild: '请选择所在建筑',
            FloorList: [],
            FloorDic:[],
            SystemList: [],
            System:'',
            SystemDic:[],
            // defaultSystem:'请选择系统类型',
            TypeList: [],
            TypeDic:[],
            initTypeDic:[],
            deviceType:'',
            defaultType: '请选择设备类型',
            useStatus:'0',
            Statusdefault: '请选择设备状态',
            StatusList: ['启用','未启用','维修','保养','报废'],
            HaveSelected:false,
            code:'',
            floorId:'',
            defaultFloor: '请选择楼层',
            location:'',
            pointSign:'在楼层图上标注',
            // manufactureDate:'2019-05-18',//生产日期
            deviceIp:'',
            devicePort:'',
            deviceCusername:'',
            // deviceModel:'',
            validityTerm:'',
            surroundingPhoto:'',
            floorPhoto: '', // 楼层图片
            isModalVisible:false,
            deviceName: '',

            data:{},
            deviceTypeDic:{},
            systemTypeDic:{},
            buildingTypeDic:{},
            floorTypeDic:{},
            deviceName:'',
        }
        
        this.onChangeBuild = this.onChangeBuild.bind(this);
        this.selectFloor = this.selectFloor.bind(this)
        this._toggleModal = this._toggleModal.bind(this)
        this.onDayPress = this.onDayPress.bind(this);
    }

    getType = () => {
        const { BuildList,FloorList } = this.state;
        let objDevice = {},objSystem = {},objBuild = {},objFloor = {};
        getDevice().then(res => {
            // console.log(res)
            res.forEach(item=>{
                objDevice[item.value] = item.label
            })
        });

        getSystem().then(res => {
            res.forEach(s=>{
                objSystem[item.value] = item.label
            })
        });
        
        getAllFloor().then(res => {
            this.setState({
                BuildDic:res
            })
            res.forEach(item=>{
                objBuild[item.value] = item.label
                BuildList.push(item.label)
            })
        });

        getSigleFloor().then(res=>{
            this.setState({
                FloorDic:res
            })
            res.forEach(item=>{
                objFloor[item.value] = item.label
                FloorList.push(item.label)
            })
        })


        this.setState({
            deviceTypeDic:objDevice,
            objSystem:objSystem,
            buildingTypeDic:objBuild,
            floorTypeDic:objFloor,
            BuildList:BuildList,
            FloorList:FloorList,
        })
    }


    changeDeviceCode = () => {
        const { codeNub } = this.state;
        this.getDeviceInfo(codeNub)
        // this.getDeviceInfo('c84415000919')
    }
    // 获取设备信息
    getDeviceInfo = (id) => {
        FetchManager.get('1/unitdevice/deviceId/' + id,'', async (set) => {
            //下面的就是请求来的数据
            console.log(set)

            if(set && !set.data){
                this.popUp.showPop('输入的设备ID不存在')
                return 
            }

            if(set && set.data && set.code === '0'){
                let data = set.data;

                if(data.orgId){
                    this.popUp.showPop('请输入正确的设备ID')
                    return 
                }

                this.setState({
                    data:data,
                    codeNub:id
                })
            }
        })
    }
    
    render() {
        const { params } = this.props.navigation.state;
        const { data,deviceTypeDic } = this.state;
        // console.log(data);
        let code = null
        if (params && params.code) {
            code = params.code
        }
        //this代表有设备
        if(this&&this.state.HaveSelected){
            model=<View style={{zIndex: 999, elevation: 999,width:180,height:120,backgroundColor:'#e5e5e5',position:'absolute',left:'25%',top:40}}>
                        <View style={{height:'25%',backgroundColor:'yellow',paddingLeft:5,justifyContent:'center'}}>
                            <Text>点位标注</Text>
                        </View>
                        <View style={{height:'75%'}}>
                            <View style={{flexDirection:'row',justifyContent:'center',marginTop:20,marginBottom:20}}>
                                <Text>设备名称：烟感01</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                                <TouchableOpacity onPress={()=>{this.Cancel()}}>
                                    <View style={{borderWidth:1,borderColor:'#ccc',borderRadius:2,backgroundColor:'orange',padding:2,paddingLeft:1,paddingRight:1}}>
                                        <Text>取消</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{this.SaveDev()}}>
                                    <View style={{borderWidth:1,borderColor:'#ccc',borderRadius:2,backgroundColor:'yellow',padding:2,paddingLeft:1,paddingRight:1}}>
                                        <Text>保存</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
        }

        let tip=null
        if(this){
            tip= <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{ lineHeight: 40, paddingLeft: 10 }}>当前标注设备：{this.state.deviceName}</Text>
                <TouchableOpacity onPress={() => { this.Cancel() }}>
                    <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 2, backgroundColor: 'orange', padding: 2, paddingLeft: 1, paddingRight: 1 }}>
                        <Text>关闭</Text>
                    </View>
                </TouchableOpacity>
            </View>
        }else{
            tip= <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
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
            markinfo = <View style={{ zIndex: 1000, elevation: 1000, height: 250, position: 'absolute', bottom: 250, left: 0, right: 0, borderColor: '#788A93', borderWidth: 3 }}>
                <View style={{ height: 40, backgroundColor: '#fff' }}>
                    {tip}
                </View>
                <View style={{ position: 'relative' }}>
                    <View {...this._gestureHandlers.panHandlers} style={{ height: 204, backgroundColor: 'pink' }}>
                        <ImageBackground style={{width:'100%',height:'100%'}} source={{uri: this.state.floorPhoto}}/>
                    </View>
                    <View style={{ zIndex: 999, elevation: 999, width: 20, height: 20, backgroundColor: 'yellow', position: 'absolute', left: this.state.left - 10, top: this.state.top - 10 }}></View>
                    {/* {model} */}
                </View>
            </View>
        }

        return (
            <KeyboardAvoidingView enabled>
                <ScrollView>
                    <View style={{ paddingLeft:15,paddingRight:15, paddingBottom:20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <View style={{ width: '30%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={{ color: '#FD3E3C' }}>* </Text><Text style={{ textAlign: 'right', color: '#333', fontSize: 15 }}>设备ID:</Text>
                                </View>
                            </View>
                            <View style={{ width: '67%',flexDirection:'row',justifyContent:'space-between',alignItems:'center' }}>
                                <View style={{width:'85%'}}>
                                    <TextInput placeholder="请输入设备ID" style={styles.input_box}
                                        onBlur={this.changeDeviceCode}
                                        onChangeText={
                                            (codeNub) => this.setState({ codeNub })
                                        }
                                        value={this.state.codeNub}
                                    ></TextInput>
                                </View>
                                <TouchableOpacity onPress={()=>{this.saoma()}}>
                                    <FontAwesome color="#788A93" name="qrcode" size={28}/>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* 设备名称 */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <View style={{ width: '30%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={{ color: 'red' }}>* </Text><Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>设备名称:</Text>
                                </View>
                            </View>
                            <View style={{ width: '67%', borderWidth: 1, borderRadius: 3, borderColor: '#D9E4ED' }}>
                                <TextInput
                                editable={false}
                                value={ data.deviceName }
                                style={styles.input_box}></TextInput>
                            </View>
                        </View>

                        {/* 设备类型 */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <View style={{ width: '30%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={{ color: 'red' }}>* </Text><Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>设备类型:</Text>
                                </View>
                            </View>
                            <View style={{ width: '67%', borderWidth: 1, borderRadius: 3, borderColor: '#D9E4ED' }}>
                                <TextInput
                                editable={false}
                                value={deviceTypeDic[data.deviceType]}
                                style={styles.input_box}></TextInput>
                            </View>
                        </View>

                        {/* 所在建筑 */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <View style={{ width: '30%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={{ color: 'red' }}>* </Text><Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>所在建筑:</Text>
                                </View>
                            </View>
                            <View style={{ width: '67%', borderWidth: 1, borderRadius: 3, borderColor: '#D9E4ED' }}>
                                <SelectSingle
                                    options={this.state.BuildList} 
                                    onSelect={this.onChangeBuild}
                                    defaultValue={this.state.defaultBuild}/>
                            </View>
                        </View>

                        {/* 设备楼层/区域 */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <View style={{ width: '30%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={{ color: 'red' }}>* </Text><Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>设备楼层/区域:</Text>
                                </View>
                            </View>
                            <View style={{ width: '67%', borderWidth: 1, borderRadius: 3, borderColor: '#D9E4ED' }}>
                                <SelectSingle
                                    options={this.state.FloorList} 
                                    onSelect={this.selectFloor}
                                    width={60}
                                    defaultValue={this.state.defaultFloor}/>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <View style={{ width: '30%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={{ color: 'red' }}>* </Text><Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>设备安装位置:</Text>
                                </View>
                            </View>
                            <View style={{ width: '67%' }}>
                                <TextInput 
                                    placeholder="输入具体位置" 
                                    style={styles.input_box}
                                    onChangeText={
                                        (location) => this.setState({ location })
                                    }
                                    value={this.state.location}
                                ></TextInput>
                            </View>
                        </View>
                        
                        {/* 点位标注 */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, position: 'relative' }}>
                            <View style={{ width: '30%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={{ color: 'red' }}>* </Text><Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>点位标注:</Text>
                                </View>
                            </View>
                            <View style={{ width: '67%', flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => { this.mark() }} style={{ width: '100%' }}>
                                    <View style={{ borderWidth: 1, borderColor: '#D9E4ED', borderRightWidth: 0, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopLeftRadius: 3, borderBottomLeftRadius: 3, fontSize: 14, paddingLeft: 10, backgroundColor: '#F2F7FB' }}>
                                        <Text style={{ color: "#999" }}>{this.state.pointSign}</Text>
                                        <View style={{ width: 30, height: 30, borderWidth: 1, borderColor: '#D9E4ED',justifyContent:'center',alignItems:'center',borderBottomRightRadius:3,borderTopRightRadius:3 }}>
                                            <AntDesign name="pushpino"  style={{fontSize:15,color:'#788A93'}}/>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            
                        </View>

                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <View style={{ width: '30%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={{ color: 'red' }}>* </Text><Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>设备型号:</Text>
                                </View>
                            </View>
                            <View style={{ width: '67%' }}>
                                <TextInput 
                                    placeholder="依据硬件情况填写" 
                                    style={styles.input_box}
                                    editable={false}
                                    value={this.state.deviceModel}
                                ></TextInput>
                            </View>
                        </View> */}

                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <View style={{ width: '30%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={{ color: 'red' }}>* </Text><Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>生产日期:</Text>
                                </View>
                            </View>
                            <View style={{ width: '67%' }}>
                                <TextInput 
                                    placeholder="输入设备生产时间。例如：2020-01-01" 
                                    style={styles.input_box}
                                    editable={false}
                                    value={this.state.manufactureDate}
                                ></TextInput>
                            </View>
                        </View> */}


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <View style={{ width: '30%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={{ color: 'red' }}>* </Text><Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>有效期:</Text>
                                </View>
                            </View>
                            <View style={{ width: '67%' }}>
                                <TextInput 
                                    placeholder="输入设备有效期。单位：年" 
                                    style={styles.input_box}
                                    editable={false}
                                    value={data.manufactureDate}
                                ></TextInput>
                            </View>
                        </View>

                        {/* 设备现场图 */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 }}>
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
                    {markinfo}
                    <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
    getImgBase = (val) => {
        // console.log(val)
        this.setState({
            surroundingPhoto:'data:image/jpg;base64,' + val
        });
    }

    selectFloor=(index,item)=>{
        this.state.FloorDic.forEach(s=>{
            if(s.label==item){
                this.setState({
                    floorId:s.value
                })
                this.getFloorInfo(s.value)
            }
        })
    }
    onChangeBuild = (index,item) => {
        this.state.BuildDic.forEach(s=>{
            if(s.label==item){
                this.setState({
                    buildingId:s.value,
                    floorId:''
                })
                console.log(s.value)
                getSigleFloor(s.value).then(res => {
                    var FloorList=[]
                    if(res.length){
                        res.forEach(s=>{
                            FloorList.push(s.label)
                        })
                    }else{
                        FloorList=['']
                    }
                    console.log(FloorList)
                    this.setState({
                        FloorDic:res,
                        FloorList:FloorList
                    })
                })
            }
        })
    }
    saoma=()=>{
        this.props.navigation.navigate('qscode',{
            item:'2'
        })
    }
    _toggleModal = () =>{
        this.setState({ isModalVisible: !this.state.isModalVisible });
    }
    onDayPress(day,obj) {
        this.setState({
            isModalVisible: !this.state.isModalVisible
        });
        // this.getData(day.dateString,this.props.navigation.state.params.deviceId)
    }
    
    // 获取设备信息
    getFloorInfo = (id) => {
        FetchManager.get('1/unitfloor/' + id,'', async (set) => {
            //下面的就是请求来的数据
            if(set){
                let data = set.data;
                this.setState({
                    floorPhoto: data.plan,
                })
            }
        })
    }
    SaveDev=()=>{
        this.setState({
            HaveSelected:false
        })
    }
    Cancel=()=>{
        this.setState({
            HaveSelected:false,
            isopen: false
        })
    }
    componentWillMount() {
        this._gestureHandlers = PanResponder.create({
            onStartShouldSetPanResponder: () => true,  //对触摸进行响应
            onMoveShouldSetPanResponder: () => true,  //对滑动进行响应
            onPanResponderGrant: (evt) => {
                console.log((evt.nativeEvent))
                // if(!this.state.HaveSelected){
                    this.setState({
                        left: (evt.nativeEvent.locationX).toFixed(2),
                        top: (evt.nativeEvent.locationY).toFixed(2),
                        pointSign: (evt.nativeEvent.locationX).toFixed(2) + ' , ' + (evt.nativeEvent.locationY).toFixed(2),
                        HaveSelected:true
                    })
                // }
            }, //激活时做的动作
            onPanResponderMove: (evt) => { },  //移动时作出的动作
            onPanResponderRelease: (evt) => {

            }, //动作释放后做的动作
        })

        this.getType();
    }

    // tab 切换调用方法
    onPressToChangPwd = () => {
        const { codeNub,buildingId,floorId,
            location,pointSign,surroundingPhoto,data
        } = this.state;
        // console.log(data);

        let obj = {
            cameraIds: [],
            deleteCameraIds: []
        };
        let query={
            id:data.id,
            deviceId: codeNub,
            deviceName:data.deviceName,
            deviceType: data.deviceType,
            buildingId: buildingId,
            floorId: floorId,
            location: location,
            pointSign: pointSign,
            manufactureDate: data.manufactureDate,
            surroundingPhoto: surroundingPhoto,
        }
        
        obj.unitDevice = query;
        obj.method = 0;
        obj.profileId = data.profileId;
        console.log(obj)
        FetchManager.post('1/unitdevice',obj, (set) => {
            //下面的就是请求来的数据
            console.log(set)

            if(!parseInt(set.code)){
                this.props.navigation.navigate('AddDevSuccess')
            }else{
                this.popUp.showPop(set.msg)
            }
        }) 
    }

    componentDidMount(){
        this.props.navigation.setParams({navigatePress:this.onPressToChangPwd})  // 使用这个来调用this

        let { params } = this.props.navigation.state;
        if ( params && params.code) {
            this.getDeviceInfo(params.code)
        }
    }
    mark = () => {
        if ( !this.state.floorPhoto) {
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
export default MonitorDev;