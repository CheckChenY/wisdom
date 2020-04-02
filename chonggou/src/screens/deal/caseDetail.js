import React, { Component } from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CameraComponent from '../components/cammer'
import { Text, View,Image,TextInput, KeyboardAvoidingView,StyleSheet,TouchableOpacity,ScrollView,AsyncStorage } from "react-native";
import FetchManager from '../fetch/index';
import { getAllFloor,getSigleFloor } from '../components/getSystex';
import SelectSingle from '../components/select/selectobj';
import DeviceName from '../components/deviceName';
import SystemName from '../components/systemName';
// import { getWarnMsg } from '../components/warn';
import { getWarnMsg } from '../components/warnPublic';
import StatusName from '../components/statusName';
import WarnLevelName from '../components/warnLevelName';
import { dataAnalisys } from '../components/analisys';
import ModelPop from '../components/modelPop';

class Content extends Component{
    render(){
        return(
            <View style={{ flexDirection: 'row',paddingLeft:20,marginBottom:10 }}>
                <View style={{ width:120 }}>
                    <Text style={{textAlign: 'right',fontSize:14,color:'#333' }}>{this.props.left}</Text>
                </View>
                <View style={{ flex:1}}>
                    <Text style={{ fontSize:14,color:'#666' }}>{this.props.right}</Text>
                </View>
            </View>
        )
    }
}

class CaseDeal extends Component {
    // static navigationOptions = ({ navigation, navigationOptions }) => {
    //     console.log(navigation)
        // return {
        //     headerTitle: (
        //         <Text style={{ flex: 1, textAlign: 'center',color:'#fff',fontSize:17 }}>警情处理</Text>
        //     ),
        //     headerRight:(
        //         <Text></Text>
        //     ),
        //     headerLeft:(
        //         <TouchableOpacity onPress={()=>navigation.goBack()}>
        //             <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
        //                 <FontAwesome color="#fff" name="angle-left" size={28}/>
        //                 <Text style={{color:'#fff',fontSize:16,paddingLeft:5,paddingTop:3}}>返回</Text>
        //             </View>
        //         </TouchableOpacity>
        //     ),
        //     headerStyle:{
        //         backgroundColor: '#3AA1FE',
        //         height:50
        //     }
        // };
    // };
    constructor(props){
        super(props)
        this.state={
            data:[],
            // paramList:[],//设备参数
            warnText:'',//状态描述
            warnConfirmTypeDic:[{
            label:"真实火警", value: 1
                },{
                label:"异常", value: 2
                },{
                label:"误报", value: 3
                },{
                label:"测试", value: 4
            }],
            warnLevel:{
                '0':'无报警',
                '1':'一般',
                '2':'重要',
                '3':'严重',
            }
        }
        this.selectWarnConfirm=this.selectWarnConfirm.bind(this)
    }
  
    
    componentDidMount(){
        const { deviceId,id } = this.props.navigation.state.params;
        console.log(deviceId)
        let obj = {
            deviceId:deviceId,
            param:id
        }
        FetchManager.get('/alarm/inner/jtlAlarmRecord/findDetailById',obj, (set) => {
            console.log(set)
            if(set && set.success){
                let data = set.value
                let txt = data.alarmDetails;
                let t = ''
                txt && txt.forEach(show=>{
                    t += show
                })
                this.setState({
                    data:data,
                    // paramList:data.alarmDetails,
                    warnText:t
                })
            }else{
                this.setState({
                    data:[]
                })
            }
        })
    }


    onChangeIndex = (val) => {
        // let nub = val === 0 ? Number(val) + 2 : 1;
        // console.log(val)
        // this.getData();
    }

    render() {
        const { params } = this.props.navigation.state;
        const { data,warnText,warnConfirmTypeDic,
            warnConfirmTypeDefault } = this.state;
        return (
            <KeyboardAvoidingView enabled>
            <ScrollView>
                <View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:1}}>
                            <Content left='设备名称：' right={data.deviceName}/>
                            <Content left='设备类型：' right={data.deviceType}/>
                            <Content left='所属系统：' right={data.system}/>
                            <Content left='所在建筑：' right={data.building}/>
                            <Content left='楼层/区域：' right={data.floor}/>
                            <Content left='具体位置：' right={data.location}/>
                            <Content left='上报时间：' right={data.createTime}/>
                            <Content left='报警状态：' right={StatusName[data.linkState]}/>
                            <Content left='警情程度：' right={WarnLevelName[data.alarmLevel]}/>
                        </View>
                    </View>
                    <View style={{ paddingTop:5,paddingBottom:5 }}>
                        {/* <Content left='上报时间：' right={data.createTime}/> */}
                        <Content left='报警类型：' right={warnText}/>
                        {/* <Content left='警情程度：' right={warnLevel[data.warnLevel]}/> */}
                    </View>
                    {/* <View style={{flexDirection:'row',paddingLeft:18,}}>
                        <Text style={{width:120,fontSize:14,color:'#333',textAlign:'right'}}>视频截图：</Text>
                        <View style={{flex:1}}>
                            {
                                data.warnLocaleConfirmPhoto ?(
                                    <Image style={{width:80,height:80}} source={{uri:data.warnLocaleConfirmPhoto}} />
                                ):<Text/>
                            }
                        </View>
                    </View> */}
        
                    <View style={styles.tit}>
                        <Text style={{color:'#3AA1FE',fontSize:16}}>警情处理</Text>
                    </View>
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
                                        options={warnConfirmTypeDic} 
                                        onSelect={this.selectWarnConfirm}
                                        defaultValue={warnConfirmTypeDefault}
                                    />
                                </View>
                            ) : <Text style={{flex:1}}>{warnConfirmTypeList[Number(data.warnConfirmType) - 1]}</Text>
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
                                style={{flex:1,borderWidth: 1,borderColor:'#D9E4ED',borderRadius:3}}
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
                                :<Image
                                style={{width:80,height:60}}
                                source={{uri:data.warnDealResultPhoto}}
                                />
                            }
                        </View>
                    </View>
        
                    <View style={styles.tit}>
                        {
                            params.disabled ? 
                                <TouchableOpacity onPress={()=>{this.submit()}}>
                                    <View style={{backgroundColor:'#3AA1FE',padding:5,borderRadius:5,justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{color:'#fff',fontSize:16}}>确认</Text>
                                    </View>
                                </TouchableOpacity>
                            : <Text style={{color:'#fff',fontSize:18}}></Text>
                        }
                    </View>
                    <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
                </View>
            </ScrollView>   
            </KeyboardAvoidingView>
        );
    }
    selectWarnConfirm=(item)=>{
        this.setState({
            warnConfirmType:item.value
        })
    }
    submit=()=>{
        const { id } = this.props.navigation.state.params;
        const { warnConfirmType,warnDealResultPhoto,warnDealDes } = this.state;
    
        let obj = {}

        obj['recordId'] = id;
        obj['warnDealResultPhoto'] = warnDealResultPhoto;
        obj['warnConfirmType'] = warnConfirmType;//警情确认
        obj['warnDealDes'] = warnDealDes;//描述
    
        console.log(obj)
        // debugger;
        if(warnConfirmType === '' || warnDealResultPhoto === '' || warnDealDes === ''){
            this.popUp.showPop('请填写完整信息')
            return false
        }
        FetchManager.post('/alarm/inner/jtlAlarmProcess/insert',obj, async (set) => {
            console.log(set)
            if(set.success){ 
                // this.props.navigation.navigate('CaseDealList')
                this.popUp.showPop('发布成功')
                // this.props.navigation.goBack()
                // this.props.navigation.state.params.refresh();
            }else{
                this.popUp.showPop(set.errorMsg) 
            }
        })
    }


    getDealImgBase = (val) => {
        if (val) {
            let obj = {
                file:'data:image/jpg;base64,' + val
            }
            FetchManager.post('/pub/open/file/addImg',obj, async (set) => {
                //下面的就是请求来的数据
                console.log(set)
                if(set.success){
                    let data = set.value;
                    this.setState({
                        warnDealResultPhoto: data.fileName,
                    })
                }else{

                    this.popUp.showPop(set.errorMsg)
                    this.setState({
                        surroundingPhoto: '',
                    }) 
                }
            })
        }
    }
}
export default CaseDeal;

const styles = StyleSheet.create({
    tit: {
        padding:10,
        backgroundColor: '#F2F7FB',
    },
    logo:{
        width:105,
        height:95
    }
})