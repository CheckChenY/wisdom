import React, {Component} from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Radio from '../components/Radio';
import CameraComponent from '../components/cammer'
import FetchManager from '../fetch/index';
import patrolList from '../components/patrolNameList';
import { getAllFloor,getSigleFloor } from '../components/getSystex';
import ModelPop from '../components/modelPop';
import NfcManager, {Ndef} from 'react-native-nfc-manager';
import Textarea from 'react-native-textarea';

import {View,Text,TextInput,StyleSheet,TouchableOpacity,KeyboardAvoidingView,PixelRatio,AsyncStorage} from 'react-native'

class Content extends Component{
    render(){
    let required=null
    if(this.props.required){
        required=<Text style={{color:"red"}}>* </Text>
    }
    return(
        <View style={{ flexDirection: 'row',marginTop:10 }}>
            <View style={{ width:100 }}>
                <Text style={{ textAlign: 'right',fontSize:14,color:'#333'}}>{required}{this.props.left}</Text>
            </View>
            <View style={{ flex:1}}>
                <Text style={{color:'#666',fontSize:14}}>{this.props.right}</Text>
            </View>
        </View>
        )
    }
}

export default class PatrolForm extends Component{
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { word } = navigation.state.params ? navigation.state.params : '';
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 18 }}>巡查任务  {word}</Text>
            ),
            headerRight: <View />,
            headerLeft: (
                <TouchableOpacity onPress={()=>navigation.navigate('PatrolList')}>
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
    constructor(props){
        super(props)
        this.state={
            SelectList:[{label:'合格',check:true},{label:'不合格',check:false}],
            istrue:true,
            data:{},
            remark:'',
            buildingDic:{},
            floorDic:{},
            popUp: '',
            patrolPhoto:'',
            actionbool:false,
            card:false,//巡查卡读取成功 可以提交数据
            imgbol:true,//未添加巡查拍照
            remarkBol:true,
            carCode:''
        }
    }

    componentWillMount(){
        // this.getSetCode('04A6299AEC5A80')
        // const { carCode,id } = this.props.navigation.state.params ? this.props.navigation.state.params : this.state;

        // if(carCode){
        //     this.getSetCode(carCode,id)
        // }

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

        NfcManager.isSupported()
        .then(supported => {
            this.setState({ supported });
            // if (supported) {
            //     this._startNfc();
            // }
        })
    }

    onChangeErr = (value) => {
        this.setState({ 
            remark: value,
            remarkBol:false
        });
    }


    render(){
        const { actionbool,data } = this.state;
        return(
            <KeyboardAvoidingView>
                <View style={{paddingRight:15,paddingTop:5}}>
                    <Content left="巡查点名称：" right={data.patrolPointName} required={false}></Content>
                    <Content left="巡查点类型：" right={patrolList[data.patrolPointType]} required={false}></Content>
                    <Content left="巡查卡编码：" right={data.cardCode} required={false}></Content>
                    <Content left="状态绑定：" right={data.bindingState === '1' ? '绑定' : data.bindingState === '2' ? '未绑定' : '' } required={false}></Content>
                    <Content left="所在建筑：" right={data.building} required={false}></Content>
                    <Content left="楼层区域：" right={data.floor} required={false}></Content>
                    <Content left="所在位置：" right={data.location} required={false}></Content>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <View style={{width:100,flexDirection:'row',justifyContent:'flex-end'}}>
                            <Text style={{color:'#FD3E3C'}}>* </Text><Text style={{color:'#333',fontSize:16}}> 是否合格：</Text>
                        </View>
                        <View style={{flex:1,height:20}}>
                            <Radio SelectList={this.state.SelectList} 
                                flx={'row'}
                            select={this.select.bind(this)}></Radio>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{width:100,flexDirection:'row',justifyContent:'flex-end'}}>
                                <Text style={{color:'#FD3E3C'}}>* </Text><Text style={{ color: '#333', fontSize: 16 }}>拍照：</Text>
                            </View>
                            <View style={{width:200}}>
                                <CameraComponent getImgBase={this.getImgBase.bind(this)}/>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{width:100,flexDirection:'row',justifyContent:'flex-end'}}>
                                <Text style={{ color: '#333', fontSize: 16 }}>备注：</Text>
                            </View>
                            <View style={{width:240}}>
                                <Textarea
                                    containerStyle={styles.textareaContainer}
                                    style={styles.textarea}
                                    onChangeText={this.onChangeErr}
                                    maxLength={300}
                                    placeholder={'请详细描述您遇到的问题(必填）'}
                                    placeholderTextColor={'#c7c7c7'}
                                    underlineColorAndroid={'transparent'}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop:10}}>
                        {
                            actionbool ? (
                                <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',marginTop:20}} onPress={()=>{this.submit()}}>
                                    <View style={{alignItems:'center',justifyContent:'center'}}>
                                        <Text style={{color:'#788A93',fontSize:18,backgroundColor:'#3AA1FE',borderRadius:4,width:100,padding:10,color:"#FFFFFF",textAlign:"center"}}>提交</Text>
                                    </View>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',marginTop:20}} onPress={()=>{this.getChange()}}>
                                    <View style={{alignItems:'center',justifyContent:'center'}}>
                                        <Text style={{color:'#788A93',fontSize:18,backgroundColor:'#3AA1FE',borderRadius:4,width:100,padding:10,color:"#FFFFFF",textAlign:"center"}}>
                                            开始巡查
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                    <ModelPop ref={ref => this.popUp = ref}></ModelPop>
                </View>
            </KeyboardAvoidingView>
        )
    }

    getChange = () => {
        const { supported } = this.state;
        this.setState({
            actionbool:!this.state.actionbool
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


    getImgBase = (val) => {
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
                        patrolPhoto: data.fileName,
                        imgbol:false
                    })
                }else{
                    this.setState({
                        imgbol:true
                    })
                }
            })
        }
    }
    submit=()=>{
        const { data,card,patrolPhoto,remark,imgbol,remarkBol } = this.state;
        let patrolResult=1 
        //巡查结果 1 合格  2 不合格
        if(this.state.istrue){
            patrolResult=1
        }else{
            patrolResult=2
        }

        let obj = {}
        obj.patrolResult = patrolResult;
        obj.patrolPhoto = patrolPhoto;
        obj.patrolRemark = remark;
        obj.id = data.id;
        obj.patrolStatus = '1';

//         patrolResult;巡查结果：1合格 2不合格
//         patrolPhoto;巡查图片
//         patrolRemark;巡查备注
//         patrolMode;巡查方式
// 这个其实就是更新，id一定要传

        // obj.delFlag = '0';
        
        
        if( !card){
            this.popUp.showPop('请读取巡查卡信息再提交')
            return false
        }
        if(imgbol){
            this.popUp.showPop('请添加图片信息再提交')
            return false
        }

        // if(remarkBol){
        //     this.popUp.showPop('请添加备注信息再提交')
        //     return false
        // }
        
        // this._stopDetection();
        this.setState({
            actionbool:!this.state.actionbool
        })
        console.log(obj)
        //
        FetchManager.post('/safe/inner/safePatrolRecord/save',obj, async (set) => {
            console.log(set)
            // debugger;
            if(set && set.success){
                this.props.navigation.navigate('PatrolPostSuccess')
            }else{
                this.props.navigation.navigate('actionPatrolFromFail')
            }
        })
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
        console.log('已关闭NFC功能')
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
    
    getSetCode = (code) => {
        let obj = {
            cardCode:code
        }
        ////safe/inner/safePatrolRecord/findPatrolCard
        FetchManager.post('/safe/inner/safePatrolRecord/findPatrolCard',obj, async (set) => {
            console.log(set)
            if(set && set.success && set.value){
                this._stopDetection();
                // if(set.value.length > 0){
                this.setState({
                    data:set.value,
                    card:true,
                    actionbool:true
                })
                // }else{
                //     this.setState({
                //         data:{
                //             cardCode:code
                //         },
                //         actionbool:false,
                //         card:true
                //     },this.popUp.showPop('未查询到此卡详情'))
                // }
            }else{
                this.setState({
                    actionbool:false
                })

                this.popUp.showPop(set.errorMsg)
            }
        })
    }

    //单选
    select=(e)=>{
        // console.log(e)
        //判断是否通过
        if(e.label=='合格'){
            this.setState({
                istrue:true
            })
        }else{
            this.setState({
                istrue:false
            })
        }
        //单选处理
        this.state.SelectList.map((item,index)=>{
            item.check=false
            if(item.label==e.label){
                item.check=true
            }
        })
        this.setState({
            SelectList:this.state.SelectList
        })
        console.log(this.state.SelectList)
    }
}
const styles=StyleSheet.create({
    
    textareaContainer: {
        height: 107,
        backgroundColor: '#fff',
        borderColor:'#D9E4ED',
        borderWidth:1,
        borderRadius:2
    },
    textarea: {
        width:120,
        textAlignVertical: 'top',  // hack android
        height: 107,
        padding:5,
        fontSize: 14,
        color: '#333',
    },
})