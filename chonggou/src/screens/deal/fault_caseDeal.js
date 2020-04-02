import React, { Component } from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CameraComponent from '../components/cammer'
import { Text, View,Image,TextInput, KeyboardAvoidingView,StyleSheet,TouchableOpacity,ScrollView,AsyncStorage } from "react-native";
import FetchManager from '../fetch/index';
import { getSystem,getDevice,getAllFloor,getSigleFloor } from '../components/getSystex';
import SelectSingle from '../components/select/selectSingle';
import DeviceName from '../components/deviceName';
import SystemName from '../components/systemName';
import { getWarnMsg } from '../components/warn';
import { dataAnalisys } from '../components/analisys';
import ModelPop from '../components/modelPop';

class Content extends Component{
    render(){
        return(
            <View style={{ flexDirection: 'row',paddingLeft:20,marginBottom:10 }}>
                <View style={{ width:'40%' }}>
                    <Text style={{textAlign: 'right',fontSize:14,color:'#333' }}>{this.props.left}</Text>
                </View>
                <View style={{ flex:1}}>
                    <Text style={{ fontSize:14,color:'#666' }}>{this.props.right}</Text>
                </View>
            </View>
        )
    }
}

class FaultCaseDeal extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center',color:'#fff',fontSize:17 }}>警情处理故障</Text>
            ),
            headerRight:(
                <Text></Text>
            ),
            headerLeft:(
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                        <FontAwesome color="#fff" name="angle-left" size={28}/>
                        <Text style={{color:'#fff',fontSize:16,paddingLeft:5,paddingTop:3}}>返回</Text>
                    </View>
                </TouchableOpacity>
            ),
            headerStyle:{
                backgroundColor: '#3AA1FE',
                height:50
            }
        };
    };
    constructor(props){
        super(props)
        this.state={
            isopen:false,
            warnConfirmType:'',
            warnConfirmTypeDefault:'请确认警情',
            obj:{},
            warnLocaleConfirmPhoto:'',
            warnDealResultPhoto:'',
            warnDealDes:'',
            warnConfirmTypeList:['真实火警','异常','误报','测试'],
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
            },
            systemDic:[],
            deviceDic:[],
            buildingDic:{},
            floorDic:{},
            data:'',
            paramList:[],
            warnText:'',
            popUp: '',
            userDic:[],
            setData:{}
        }
        this.selectWarnConfirm=this.selectWarnConfirm.bind(this)
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
            const { buildingDic } = this.state;
            // console.log(res)
            res.forEach(item=>{
                buildingDic[item.value] = item.label
            })
            // let item = res.filter(f=>f.value === set.data.buildingId)
            // set.data.buildingId = item[0].label
            
            this.setState({
                buildingDic:buildingDic
            })
        });

        getSigleFloor().then(res=>{
            // console.log(res)
            const { floorDic } = this.state;
            res.forEach(item=>{
                floorDic[item.value] = item.label
            })
            
            this.setState({
                floorDic:floorDic
            })
        })
    }
  
  
    componentDidMount(){
        // const { obj } = this.state;
        let obj = {};
        const { id,systemId } = this.props.navigation.state.params;
        FetchManager.get('1/devicealertdeal/' + id ,'', (set) => {
            console.log(set)
            if(set && set.data){
                let data = set.data
                data.createTime = data.createTime ? data.createTime.replace('T',' ') : data.createTime
                let paramList = [];//获取detailData
                let warnData = '';//获取所有warn
                if( data.detailData && data.detailData !== null ){
                    // debugger;
                    paramList = dataAnalisys(JSON.parse(set.data.detailData),systemId);
                    warnData = getWarnMsg(set.data) ? getWarnMsg(set.data) : '无'
                    this.setState({
                        paramList:paramList,
                        warnText:warnData,
                        data:set.data,
                    })
                    console.log(paramList)
                }else{
                    this.setState({
                        data:data
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

    render() {
        const { params } = this.props.navigation.state;
        const { data,warnLevel,paramList=[],warnConfirmTypeList,
            warnConfirmTypeDefault,warnText,userDic,buildingDic,floorDic } = this.state;
        return (
            <KeyboardAvoidingView enabled>
            <ScrollView>
                <View>
                    <View style={styles.tit}>
                        <Text style={{color:'#3AA1FE',fontSize:16}}>设备信息</Text>
                    </View>
                    <View style={{paddingTop:5,paddingBottom:5}}>
                        <Content left='设备名称：' right={data.deviceName}/>
                        <Content left='设备类型：' right={DeviceName[data.deviceType]}/>
                        <Content left='所属系统：' right={SystemName[data.systemId]}/>
                        <Content left='所在建筑：' right={buildingDic[data.buildingId]}/>
                        <Content left='所在楼层/区域：' right={floorDic[data.floorId]}/>
                        <Content left='具体位置：' right={data.location}/>
                    </View>
    
    
    
                    <View style={styles.tit}>
                        <Text style={{color:'#3AA1FE',fontSize:16}}>设备状态</Text>
                    </View>
                    <View style={{ paddingTop:5,paddingBottom:5 }}>
                        <Content left='上报时间：' right={data.createTime}/>
                        <Content left='状态描述：' right={warnText}/>
                        <Content left='警情程度：' right={warnLevel[data.warnLevel]}/>
                    </View>

                    <View style={styles.tit}>
                        <Text style={{color:'#3AA1FE',fontSize:16}}>设备参数</Text>
                    </View>
    
                    <View style={{ paddingTop:5,paddingBottom:5 }}>
                        { 
                            paramList.map((show,i) => (
                                <Content key={i} left={show.label} right={show.value}/>
                            ))
                        }
                    </View>
        
                    <View style={styles.tit}>
                        <Text style={{color:'#3AA1FE',fontSize:16}}>警情处理</Text>
                    </View>
    
                    {
                        params.disabled ? <Text />: 
                        (
                            <View>
                                <View style={{padding:10,flexDirection:'row'}}>
                                    <View style={{width:120,alignItems:"flex-end",justifyContent:'center'}}>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={{color:'#333',fontSize:16,textAlign:'right',justifyContent:"center"}}> 处理时间：</Text>
                                        </View>
                                    </View>
                                    <Text style={{color:'#333',fontSize:14}}>{ data.dealTime }</Text>   
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
                                        options={warnConfirmTypeList} 
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
                            <Text style={{color:'#333',fontSize:16,textAlign:'right',justifyContent:"center"}}> 现场报警图：</Text>
                            </View>
                        </View>
                        <View style={{flex:1}}>
            
            
            
                            {
                                params.disabled ? 
                                <CameraComponent getImgBase={this.getLocalImgBase.bind(this)} />
                                :<Image
                                    style={{width:80,height:60}}
                                    // source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
                                    source={{uri:data.warnLocaleConfirmPhoto}}
                                />
                            }
            
            
            
                        </View>
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
                    <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
                </View>
            </ScrollView>   
            </KeyboardAvoidingView>
        );
    }
    selectWarnConfirm=(index,item)=>{
        this.state.warnConfirmTypeDic.forEach(s=>{
            if(s.label==item){
                this.setState({
                    warnConfirmType:s.value
                })
            }
        })
    }
    submit=()=>{
        const { id } = this.props.navigation.state.params;
        const { warnConfirmType,warnLocaleConfirmPhoto,warnDealResultPhoto,warnDealDes,data,setData } = this.state;
        // { warnDealWay,firstViewer,warnConfirmDes,createTime } = data;
    
    
        data['id'] = id;
        data['warnConfirmType'] = warnConfirmType;//警情确认
        data['warnLocaleConfirmPhoto'] = warnLocaleConfirmPhoto;
        data['createTime'] = data.createTime ? data.createTime.replace(' ','T') : data.createTime;
        data['warnDealResultPhoto'] = warnDealResultPhoto;
        data['warnDealDes'] = warnDealDes;//描述
        data['warnState'] = Number(data.warnState);
        data['dealState'] = 2;
    
        console.log(data)
        // debugger;
        if(warnConfirmType === '' || warnLocaleConfirmPhoto === '' || warnDealResultPhoto === '' || warnDealDes === ''){
            this.popUp.showPop('请填写完整信息')
            return false
        }
        FetchManager.post('1/devicealertdeal',data, async (set) => {
            console.log(set)
            if(!(parseInt(set.code))){ 
                this.props.navigation.navigate('CaseDealList')
                this.props.navigation.state.params.refresh();
            }
        })
    }
    getLocalImgBase = (val) => {
        this.setState({
            warnLocaleConfirmPhoto:'data:image/jpg;base64,' + val
        });
    }
    getDealImgBase = (val) => {
        this.setState({
            warnDealResultPhoto:'data:image/jpg;base64,' + val
        });
    }
}
export default FaultCaseDeal;

const styles = StyleSheet.create({
    tit: {
        height: 41,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor: '#F2F7FB',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    logo:{
        width:105,
        height:95
    }
})