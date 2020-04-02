import React, { Component } from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Text, View, Image, TextInput, 
    KeyboardAvoidingView, TouchableOpacity, ScrollView } from "react-native";
import ModelPop from '../../components/modelPop';
import { getAllFloor,getSigleFloor } from '../../components/getSystex';
import FetchManager from '../../fetch/index';
import Select from '../../components/select/selectobj';
import patrolList from '../../components/patrolName';
import NfcManager, {Ndef} from 'react-native-nfc-manager';

class AddPatrol extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 18 }}>添加巡查</Text>
            ),
            headerRight: (
                <Text />
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
            cardCode: '',
            patrolPointName:'',
            patrolPointTypeName:'请选择',
            building:'请选择',
            floor:'请选择',
            location:'',

            patrolPointType:'',
            patrolPointTypeList:patrolList,
            buildingList:[],
            buildingId:'',
            buildName:'',
            floorName:'',
            floorList:[],
            floorId:'',
            popUp: '',
            bol:true,
            id:'',
            orgId:'',
            isModalVisible:false,
            addSuccess:false,
            nfcbool:false,
        }
    }

    componentWillMount(){
        getAllFloor().then(res=>{
            console.log(res)
            this.setState({
                buildingList:res,
            })
        })

        

        
        NfcManager.isSupported()
        .then(supported => {
            this.setState({ supported });
            if (supported) {
                this._startNfc();
            }
        })
    }


    componentDidMount(){
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            this._stopDetection();
        });
    }

    componentWillUnmount() {
        this._navListener.remove();
    }

    getSetCode = (cardCode) => {
        const { patrolPointTypeList } = this.state;
        let obj = {
            cardCode:cardCode
        }
        FetchManager.post('/safe/inner/safePoint/findPatrolCard?cardCode=' + cardCode,'', (set) => {
            console.log(set)
            // debugger;
            if(set && set.success && set.value){
                // this._stopDetection();
                let data = set.value
                let item = '';
                patrolPointTypeList.forEach(show=>{
                    if(show.value === Number(data.patrolPointType)){
                        item = show.label
                    }
                })
                this.setState({
                    cardCode:data.cardCode,
                    patrolPointName:data.patrolPointName,//巡查点名称

                    patrolPointTypeName:item,
                    patrolPointType:data.patrolPointType,//巡查点类型 id

                    buildingId:data.buildingId,
                    building:data.build,
                    floorId:data.floorId,
                    floor: data.floor,

                    location:data.location,
                    patrolTaskId:data.patrolTaskId,
                    id:data.id,

                    addSuccess:true,
                })
            }else{
                this.popUp.showPop(set.errorMsg)
                this.setState({
                    addSuccess:false
                })
            }
        })
    }

    onBlurCode = (code) => {
        // this.getSetCode(code)
        this.getSetCode('049D2F9AEC5A80')
    }

    getSupport = () => {
        NfcManager.isSupported()
            .then(supported => {
                this.setState({ 
                    supported:supported,
                 });
            })
            .catch(err => {
                console.log(err);
            })
    }


    //关闭NFC功能
    _stopDetection = () => {
        this.setState({
            nfcbool:false
        })
        NfcManager.unregisterTagEvent()
        .then(result => {
            console.log('unregisterTagEvent OK', result)
        })
        .catch(error => {
            console.warn('unregisterTagEvent fail', error)
        })
    }


    render() {
        const { addSuccess,cardCode,nfcbool,
            patrolPointTypeList,patrolPointTypeName } = this.state;
        return (
            <KeyboardAvoidingView enabled>
                <ScrollView>
                    <View style={{padding:20,paddingBottom:10}}>
                        <Image source={require('../../../img/xck.png')} style={{width:'100%',height:180,borderRadius:10}}></Image>
                    </View>
                    <View style={{ paddingLeft:26,paddingRight:26 }}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <View style={{ width: 90 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={{ color: '#FD3E3C' }}>* </Text>
                                    <Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 14 }}>巡查卡编码:</Text>
                                </View>
                            </View>
                            <View style={{ flex:1,flexDirection:'row',marginLeft:5}}>
                                <View style={{flex:1,marginRight:10}}>
                                    <TextInput placeholder="输入巡查卡编码" style={{ borderWidth: 1, borderColor: '#D9E4ED', height: 30, padding: 0, borderRadius: 3, fontSize: 14, paddingLeft: 10, color: '#999', backgroundColor: '#F2F7FB' }}
                                        onChangeText={(cardCode) => this.setState({ cardCode })}
                                        onBlur={()=>this.onBlurCode(cardCode)}
                                        value={cardCode}
                                    ></TextInput>
                                </View>
                                <View style={{width:60}}>
                                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center'}} 
                                        onPress={()=>{this.saoma()}}>
                                        <Image source = { nfcbool ? require('../../../img/home/on.png') : require('../../../img/home/off.png') } />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ width: 90 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: '#FD3E3C' }}>* </Text><Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>巡查点名称:</Text>
                                </View>
                            </View>
                            <View style={{ flex:1,flexDirection:'row',marginLeft:5 }}>
                                <TextInput 
                                    placeholder="依据硬件情况填写" 
                                    style={{ flex:1,borderWidth: 1, borderColor: '#D9E4ED', height: 30, padding: 0, borderRadius: 3, fontSize: 14, paddingLeft: 10, color: '#999', backgroundColor: '#F2F7FB' }}
                                    onChangeText={(patrolPointName) => this.setState({ patrolPointName })}
                                    value={this.state.patrolPointName}
                                ></TextInput>
                            </View>
                        </View>

                        {/* 巡查点类型 */}
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ width: 90 }}>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ color: '#FD3E3C' }}>* </Text><Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>巡查点类型:</Text>
                                </View>
                            </View>
                            <View style={{ flex:1,marginLeft:5, borderWidth: 1, borderRadius: 3, borderColor: '#D9E4ED' }}>
                                <Select
                                    options={patrolPointTypeList} 
                                    onSelect={this.selectPatrol}
                                    defaultValue={patrolPointTypeName}
                                    downMarginTop={6}
                                    dropdownWidth={130}
                                    />
                            </View>
                        </View>

                        {/* 所在建筑 */}
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ width: 90 }}>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ color: '#FD3E3C' }}>* </Text><Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>所在建筑:</Text>
                                </View>
                            </View>
                            <View style={{ flex:1,marginLeft:5, borderWidth: 1, borderRadius: 3, borderColor: '#D9E4ED' }}>
                                <Select
                                    options={this.state.buildingList}
                                    onSelect={this.selectBuild}
                                    defaultValue={this.state.building}
                                    downMarginTop={6}
                                    dropdownWidth={130}/>
                            </View>
                        </View>

                        {/* 设备楼层/区域 */}
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ width: 90 }}>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ color: '#FD3E3C' }}>* </Text>
                                    <Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>楼层/区域:</Text>
                                </View>
                            </View>
                            <View style={{ flex:1,marginLeft:5, borderWidth: 1, borderRadius: 3, borderColor: '#D9E4ED' }}>
                                <Select
                                    options={this.state.floorList} 
                                    width={190}
                                    onSelect={this.valueChange}
                                    defaultValue={this.state.floor}
                                    downMarginTop={6}
                                    dropdownWidth={130}/>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ width: 90 }}>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ color: '#FD3E3C' }}>* </Text><Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>所在位置:</Text>
                                </View>
                            </View>
                            <View style={{ flex:1,flexDirection:'row',marginLeft:5 }}>
                                <TextInput 
                                    placeholder="输入具体位置" 
                                    multiline={true} 
                                    style={{ flex:1,textAlignVertical:'top',borderWidth: 1, borderColor: '#D9E4ED', height: 60, padding: 0, borderRadius: 3, fontSize: 14, padding: 10, color: '#999', backgroundColor: '#F2F7FB' }}
                                    onChangeText={(location) => this.setState({ location })}
                                    value={this.state.location}
                                ></TextInput>
                            </View>
                        </View>
                    </View>
                    <View style={{paddingLeft:15,paddingRight:15,marginTop:45,paddingBottom:20}}>
                        {/* {
                            addSuccess ? ( */}
                                <TouchableOpacity onPress={()=>{this.submit()}}>
                                    <View style={{height:45,backgroundColor:'#3AA1FE',justifyContent:'center',alignItems:'center',borderRadius:5}}>
                                        <Text style={{color:'#fff',fontSize:18}}>确定</Text>
                                    </View>
                                </TouchableOpacity>
                        {/* //     ) : (
                        //         <TouchableOpacity onPress={()=>{this.submitPop()}}>
                        //             <View style={{height:45,backgroundColor:'#3AA1FE',justifyContent:'center',alignItems:'center',borderRadius:5}}>
                        //                 <Text style={{color:'#fff',fontSize:18}}>确定</Text>
                        //             </View>
                        //         </TouchableOpacity>
                        //     )
                        // } */}
                    </View>
                </ScrollView>
                
                <ModelPop ref={ref => this.popUp = ref}></ModelPop>
            </KeyboardAvoidingView>
        );
    }
    submit=()=>{
        const { patrolPointName,cardCode,buildingId,floorId,location,patrolPointType,id,floorName,buildName } = this.state;
        if (this.state.cardCode.length !== 14) {
            this.popUp.showPop('卡号长度为14位......')
            return
        }

        // if ( patrolPointName === '' || patrolPointType === '' || cardCode === '') {
        //     this.popUp.showPop('数据不能为空')
        //     return
        // }

        let params={
            "cardCode": cardCode,//巡查卡编码
            "patrolPointName": patrolPointName,//巡查点名称
            "patrolPointType": patrolPointType,//巡查点类型
            "buildingId": buildingId,//所在建筑
            "floorId": floorId,///所在楼层/区域
            "location": location,//位置
            id:id
        }
        console.log(params)

        FetchManager.post('/safe/inner/safePoint/save',params, (set) => {
            console.log(set)
            if(set && set.success){
                params.build = buildName;
                params.floor = floorName;
                this.setState({
                    cardCode: '',
                    patrolPointName:'',
                    patrolPointTypeName:'请选择',
                    building:'请选择',
                    floor:'请选择',
                    location:'',
                })
                this.props.navigation.navigate('AddPatrolSuccess',{
                    list:params
                })
            } else {
                this.popUp.showPop(set.msg)
            }
        })
    }

    selectPatrol = (item) =>{
        console.log(item)
        this.setState({
            patrolPointType:item.value
        })
    }
    selectBuild = (item)=>{

        getSigleFloor(item.label).then(res=>{
            console.log(res)
            this.setState({
                floorList:res,
            })
        })

        this.setState({
            buildingId:item.value,
            buildName:item.label
        })
        
    }
    valueChange=(item)=>{
        this.setState({
            floorId:item.value,
            floorName:item.label
        })
    }

    

    saoma = () => {
        const { supported } = this.state;
        this.setState({
            nfcbool:true
        })
        if ( !supported) {
            this.popUp.showPop('请开启NFC功能')
            this.setState({
                nfcbool:false
            })
            return false
        }

        NfcManager.registerTagEvent(this._onTagDiscovered)
        .then(result => {
            console.log('registerTagEvent OK', result)
        })
        .catch(error => {
            console.warn('registerTagEvent fail', error)
        })
    }

    _onTagDiscovered = tag => {
        let id = tag.id;
        console.log(id)
        this.getSetCode(id)
    }


    _startDetection = () => {

        const { supported } = this.state;
        if ( !supported) {
            this.popUp.showPop('请开启NFC功能')
            return false
        }

        NfcManager.registerTagEvent(this._onTagDiscovered)
        .then(result => {
            console.log('registerTagEvent OK', result)
        })
        .catch(error => {
            console.warn('registerTagEvent fail', error)
        })
    }
}
export default AddPatrol;