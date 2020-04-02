import React, { Component } from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CameraComponent from '../components/cammer'
import { Text, View,Image,TextInput, KeyboardAvoidingView,StyleSheet,TouchableOpacity,ScrollView,AsyncStorage } from "react-native";
import FetchManager from '../fetch/index';
import { getSystem,getDevice,getAllFloor,getSigleFloor } from '../components/getSystex';
import SelectSingle from '../components/select/selectSingle';
import DeviceName from '../components/deviceName';
import SystemName from '../components/systemName';
import StatusName from '../components/statusName';
import WarnLevelName from '../components/warnLevelName';
import { dataAnalisys } from '../components/analisys';
import { getWarnMsg } from '../components/warnPublic';
import DeviceNameBol from '../components/deviceNameBol';
import Modal from "react-native-modal";
class Content extends Component{
    render(){
        return(
            <View style={{ flexDirection: 'row',paddingLeft:20,marginBottom:10 }}>
                <View style={{ width:120 }}>
                    <Text style={{textAlign: 'right',fontSize:14,color:'#333' }}>{this.props.left}</Text>
                </View>
                <View style={{ flex:1}}>
                    <Text style={{ fontSize:14,color:'#666',lineHeight:23 }}>{this.props.right}</Text>
                </View>
            </View>
        )
    }
}

class InfoDetail extends Component {
    
    constructor(props){
        super(props)
        this.state={
            isopen:false,
            warnConfirmType:'请选择',
            obj:{},
            warnLocaleConfirmPhoto:'',
            warnDealResultPhoto:'',
            warnDealDes:'',
            warnState:{
                '0':'正常',
                '1':'报警',
                '2':'故障',
                '3':'报警&故障',
                '4':'离线',
            },
            warnLevel:{
                '0':'无报警',
                '1':'一般',
                '2':'重要',
                '3':'严重',
            },
            systemDic:[],
            deviceDic:[],
            buildingDic:{},
            floorDic:{},
            
            data:'',
            paramList:[],
            isModalVisible:false,
            modalText:'',
            userDic:[],
            warnStateId:'',//从消息列表过来，替换从监控过来的warnState
        }
    }

    componentWillMount() {
        FetchManager.get('1/user/findAllUser',{}, (set) => {
            // console.log(set)
            let userDic={}
            set.forEach(s=>{
                userDic[s.id]=s.realName
            })
            this.setState({
                userDic:userDic
            })
        })


        getAllFloor().then(res => {
            console.log(res)
            const { buildingDic } = this.state;
            res.forEach(item => {
                buildingDic[item.value] = item.label
            })

            this.setState({
                buildingDic:buildingDic
            })

        });
        getSigleFloor().then(res=>{
            const { floorDic } = this.state;
            res.forEach(item => {
                floorDic[item.value] = item.label
            })

            this.setState({
                floorDic:floorDic
            })
        })
    }
    
    componentDidMount(){
        // debugger;
        const { id } = this.props.navigation.state.params;
        // this.getDeviceData(deviceId)
        FetchManager.get('1/devicealertdeal/' + id ,'', (set) => {
            console.log(set)
            if(set&&set.data){
                console.log(set.data)
                let warnData = getWarnMsg(set.data)
                console.log(warnData)
                let paramList = [];
                let data = set.data.deviceAlertDeal;
                data.createTime = data.createTime.replace('T',' ')
                data.firstViewTime = data.firstViewTime.replace('T',' ')
                if(data.detailData && data.detailData !== null){
                    let len = dataAnalisys(JSON.parse(data.detailData));
                    if(len.length > 0){
                        paramList.push(len);
                    }
                    // console.log(paramList)
    
                    this.setState({
                        paramList:paramList,
                        data:data,
                        warnText:warnData,
                        warnStateId:data.warnState
                    })
                }else{
                    this.setState({
                        data:data,
                        warnStateId:data.warnState
                    })
                }
            }else{
                // this._signOut();
            }
        },(err)=>{
            console.log(err)
            // this._signOut();
        })

    }

    // _signOut = async () => {
    //     let userName = await AsyncStorage.getItem('user');
    //     let deviceToken = await AsyncStorage.getItem('deviceToken');
  
    //     let obj = {
    //         userName:userName,
    //         deviceToken:deviceToken
    //     }
    //     FetchManager.get('1/um/destory',obj, async (set) => {
    //         console.log(set)
    //         await AsyncStorage.clear();
    //         this.props.navigation.navigate('SignIn');
    //     })
    // }

    _toggleModal = () =>{
        this.setState({ isModalVisible: !this.state.isModalVisible });
    }

    getTimerModal = () => {
        setTimeout(() => {
            this.setState({
                isModalVisible:false
            })
        },2000)
    }


    onChangeIndex = (val) => {
        // let nub = val === 0 ? Number(val) + 2 : 1;
        console.log(val)
    }



    render() {
        const { params } = this.props.navigation.state;
                    
        const { floorDic,buildingDic,data,warnLevel,paramList=[],warnText,isModalVisible,modalText,userDic } = this.state;
        let options = ["真实火警","异常","误报","测试"]
        console.log(paramList)
        return (
            <KeyboardAvoidingView enabled>
                <ScrollView>
                    <View style={styles.tit}>
                        <Text style={{color:'#3AA1FE',fontSize:16}}>设备信息</Text>
                    </View>
                    <View>
                        <Content left='设备名称：' right={data.deviceName}/>
                        <Content left='设备类型：' right={DeviceName[data.deviceType]}/>
                        <Content left='所属系统：' right={SystemName[data.systemId]}/>
                        <Content left='所在建筑：' right={buildingDic[data.buildingId]}/>
                        <Content left='楼层/区域：' right={floorDic[data.floorId]}/>
                        <Content left='具体位置：' right={data.location}/>
                        <Content left='上报时间：' right={data.createTime}/>
                        <Content left='报警状态：' right={StatusName[data.warnState]}/>
                        <Content left='状态描述：' right={warnText}/>
                        <Content left='警情程度：' right={WarnLevelName[data.warnLevel]}/>
                    </View>
                    {/* <View style={{flexDirection:'row',paddingLeft:17,}}>
                        <Text style={{width:120,fontSize:14,color:'#333',textAlign:'right'}}>视频截图：</Text>
                        <View style={{flex:1}}>
                            <Image style={{width:80,height:80}} source={{uri:data.warnLocaleConfirmPhoto}} />
                        </View>
                    </View> */}


                    <View style={styles.tit}>
                        <Text style={{color:'#3AA1FE',fontSize:16}}>设备参数</Text>
                    </View>

                    <View style={{ paddingTop:5,paddingBottom:5 }}>
                        { 
                            paramList.length > 0 && paramList.map((show,i) => (
                                <Content key={i} left={show.label + '：'} right={show.value}/>
                            ))
                        }
                    </View>

                    <View style={[styles.tit,{marginTop:10}]}>
                        <Text style={{color:'#3AA1FE',fontSize:16}}>警情处理</Text>
                    </View>

                    {
                        params.disabled ? 
                            <Text />
                        : (
                            <View>
                                <View style={{padding:10,flexDirection:'row'}}>
                                    <View style={{width:120,alignItems:"flex-end",justifyContent:'center'}}>
                                        <View style={{flexDirection:'row'}}>
                                        <Text style={{color:'#333',fontSize:16,textAlign:'right',justifyContent:"center"}}> 处理时间：</Text>
                                        </View>
                                    </View>
                                    <Text style={{color:'#333',fontSize:14}}>{data.dealTime}</Text>   
                                </View>
                                <View style={{padding:10,flexDirection:'row'}}>
                                    <View style={{width:120,alignItems:"flex-end",justifyContent:'center'}}>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={{color:'#333',fontSize:16,textAlign:'right',justifyContent:"center"}}> 处理人：</Text>
                                        </View>
                                    </View>
                                    <Text style={{color:'#333',fontSize:14}}>{userDic[data.warnHandler]}</Text>   
                                </View>
                            </View>
                        )
                    }
                    <View style={{padding:10,flexDirection:'row'}}>
                        <View style={{width:120,alignItems:"flex-end",justifyContent:'center'}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{color:'red'}}>*</Text>
                                <Text style={{color:'#333',fontSize:16,textAlign:'right',justifyContent:"center"}}> 警情确认：</Text>
                            </View>
                        </View>
                            {
                                params.disabled ? (
                                    <View style={{flex:1,borderWidth:1,borderColor:'#D9E4ED',borderRadius:3}}>
                                        <SelectSingle
                                            options={options} 
                                            onSelect={(warnConfirmType) => this.setState({warnConfirmType: warnConfirmType})}
                                            defaultValue={this.state.warnConfirmType}
                                            // options={this.state.warnConfirmTypeList} 
                                            // onSelect={this.selectWarnConfirm}
                                            // defaultValue={this.state.warnConfirmTypeDefault}
                                        />
                                    </View>
                                ) : <Text style={{flex:1}}>{options[Number(data.warnConfirmType)]}</Text>
                            }
                    </View>

                    <View style={{padding:10,flexDirection:'row'}}>
                        <View style={{width:120,alignItems:"flex-end",justifyContent:'center'}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{color:'red'}}>*</Text>
                                <Text style={{color:'#333',fontSize:16,textAlign:'right',justifyContent:"center"}}> 处理描述：</Text>
                            </View>
                        </View>
                        {
                            params.disabled ? 
                            <TextInput 
                                multiline={true} 
                                placeholder='请输入描述' 
                                style={{flex:1,borderWidth:1,borderColor:'#D9E4ED',borderRadius:3}}
                                onChangeText={(warnDealDes) => this.setState({warnDealDes})}
                                value={this.state.warnDealDes}
                            />
                            : <Text style={{color:'#333',fontSize:14}}>{data.warnDealDes}</Text>
                        }
                    </View>
                    <View style={{padding:10,flexDirection:'row'}}>
                        <View style={{width:120,alignItems:"flex-end",justifyContent:'center'}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{color:'red'}}>*</Text>
                                <Text style={{color:'#333',fontSize:16,textAlign:'right',justifyContent:"center"}}> 处理结果图：</Text>
                            </View>
                        </View>
                        <View style={{flex:1}}>
                            {
                                params.disabled ?
                                <CameraComponent getImgBase={this.getDealImgBase.bind(this)}/>   
                                : data.warnDealResultPhoto ? <Image
                                style={{width:80,height:60}}
                                // source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
                                source={{uri:data.warnDealResultPhoto}}
                                /> : <View></View>
                            }
                        </View>
                    </View>

                    <View style={{paddingLeft:20,paddingRight:20,paddingBottom:20,marginTop:52}}>
                        {
                            params.disabled ? 
                                <TouchableOpacity onPress={()=>{this.submit()}}>
                                    <View style={{backgroundColor:'#3AA1FE',height:50,borderRadius:5,justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{color:'#fff',fontSize:18}}>确认</Text>
                                    </View>
                                </TouchableOpacity>
                            : <Text style={{color:'#fff',fontSize:18}}></Text>
                        }
                    </View>

                    <Modal 
                        isVisible={isModalVisible}
                    >
                        <View style={{ flex: 1}}>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
                                <View style={{width:'80%',backgroundColor:"rgba(36,36,36,0.5)",padding:5}}>
                                    <View style={{padding:10,opacity:0.5}}>
                                        <Text style={{fontSize:14,color:"#FFFFFF",textAlign:'center'}}>{modalText}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>   
                
            </KeyboardAvoidingView>
        );
    }
    submit=()=>{
        const { warnConfirmType,warnStateId,warnDealResultPhoto,warnDealDes,data,floorId,buildingId } = this.state,
        { warnDealWay,firstViewer,warnConfirmDes,createTime,firstViewTime } = data;
        const { id, warnState,name } = this.props.navigation.state.params;
        // debugger
        data['id'] = id;
        data['warnConfirmType'] = warnConfirmType;
        data['createTime'] = createTime.replace(' ','T');
        data['firstViewTime'] = firstViewTime.replace(' ','T');
        data['warnDealResultPhoto'] = warnDealResultPhoto;
        data['warnDealDes'] = warnDealDes;
        data['warnDealWay'] = warnDealWay;
        data['firstViewer'] = firstViewer;
        data['warnConfirmDes'] = warnConfirmDes;
        data['warnState'] = warnState ? warnState : warnStateId;
        data['floorId'] = floorId;
        data['buildingId'] = buildingId;
        data['dealState'] = 1;

        console.log(data)
        if( !warnConfirmType || !warnDealResultPhoto || !warnDealDes ){
            this.setState({
                isModalVisible: !this.state.isModalVisible,
                modalText:'请填写完成信息...'
            },this.getTimerModal())
            return false
        }

        FetchManager.post('1/devicealertdeal',data, async (set) => {
            console.log('devicealertdeal', set)
            if(!(parseInt(set.code))){
                this.props.navigation.navigate('infoProcessing',{
                    warnState:warnState ? warnState : warnStateId,
                    name:name
                })
            }
        })
    }
    getLocalImgBase = (val) => {
        // console.log(val)
        this.setState({
            warnLocaleConfirmPhoto:'data:image/jpg;base64,' + val
        });
    }
    getDealImgBase = (val) => {
        // console.log(val)
        this.setState({
            warnDealResultPhoto:'data:image/jpg;base64,' + val
        });
    }
    goBack=()=>{
        this.props.navigation.goBack()
    }
    getparams=()=>{
        this.setState({
        isopen:!this.state.isopen
        })
    }
}
export default InfoDetail;
const styles = StyleSheet.create({
    tit: {
        padding:10,
        backgroundColor: '#FFFFFF',
    },
    logo:{
        width:105,
        height:95
    }
})