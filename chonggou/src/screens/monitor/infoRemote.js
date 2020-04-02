import React,{ Component } from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Dimensions,TextInput,Button,AsyncStorage } from 'react-native'; 
import Radio from '../components/Radio';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FetchManager from '../fetch/index';
import Textarea from 'react-native-textarea';
import Modal from "react-native-modal";
import ModelPop from '../components/modelPop';
import {HttpGet,HttpTimeOut} from '../fetch/fetchData';
const { height, width } = Dimensions.get('window');


class MessageScreens extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center',color:'#fff',fontSize:17 }}>远程操作</Text>
            ),
            headerRight: (
                <Text />
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
        this.state = {
            SelectList:[{label:'检查设备情况，设备自检',check:true,id:0,bol:false},
            {label:'设备报警，消音并处理',check:false,id:1,bol:false},
            {label:'设备故障，屏蔽并处理',check:false,id:2,bol:false},
            {label:'系统更新，远程升级',check:false,id:3,bol:false},
            {label:'隐患排除，远程复位',check:false,id:4,bol:false},
            {label:'短路过载，紧急断电',check:false,id:5,bol:false},
            {label:'断电恢复，远程上电',check:false,id:6,bol:false},
            {label:'检查设备情况，设备自检',check:false,id:7,bol:false},
            {label:'其他，请填写说明',check:false,id:8,bol:false}],
            txtBol:false,
            isModalVisible:false,
            text:'',
            order:[],
            item:{},
            index:'',
            deviceToken:'',
            describe:'检查设备情况，设备自检'
        }

        this.select = this.select.bind(this)
    }

    componentDidMount(){
        const { deviceModel,order,deviceId } = this.props.navigation.state.params;
        let obj = {
            deviceModel:deviceModel
        }
        FetchManager.get('/device/inner/jtlDevice/getOrderList',obj, (set) => {
            console.log(set)
            if(set && set.success){
                let list = set.value
                this.setState({
                    order:list,
                    deviceId:deviceId
                })
            }
        },(err)=>{
            console.log(err)
        })

        // this.getDeviceToken()
    }

    // getDeviceToken = async () => {
    //     let deviceToken = await AsyncStorage.getItem('deviceToken');
    //     this.setState({
    //         deviceToken:deviceToken
    //     })
    // }

    onPressSumit = (item,i) => {
        this.setState({
          isModalVisible:true,
          item:item,
          index:i
        })
    }

    _toggleModal = () =>{
        this.setState({ 
            isModalVisible: false 
        });
    }
    
    
    _toggleModalGo = () => {
        const { text } = this.state;
        this.setState({ 
            isModalVisible: false 
        });

        let obj = {
            orderPassword:text
        }
        FetchManager.get('/device/inner/jtlCompanyPassword/getMyPassWord',obj, async (set) => {
            //下面的就是请求来的数据
            console.log(set);
            if(set.success){
                this.onChangeRemote();
                this.setState({ 
                    text:''
                });
                this.popUp.showPop('操作命令已下发')
            }else{
                this.setState({ 
                    text:''
                });
                this.popUp.showPop('请在WEB端配置初始化密码')
            }
        })
    }

    onChangeRemote = () => {
        const { item,deviceId,describe } = this.state;
        
        let num = Number(item.value).toString(16)
        let obj = {
            cmd:num,
            deviceId:deviceId,
            describe:describe
        }

        FetchManager.get('/device/inner/jtlDevice/operationApp',obj, async (set) => {
            //下面的就是请求来的数据
            console.log(set);
            if(set.success){
                this.popUp.showPop('操作成功')
            }else{
                this.popUp.showPop('操作失败')
            }
        })
    }

    select = (item) => {
        const { SelectList,problem } = this.state;
        let bol = item.id === 8 ? true : false;
        SelectList.forEach((show,i)=>{
            if(i === item.id){
                show.check = true
            }else{
                show.check = false
            }
        })

        this.setState({
            SelectList:SelectList,
            txtBol:bol,
            describe:item.id === 8 ? problem : item.label
        })
    }

    onChangeErr = (value) => {
        this.setState({ problem: value });
    }

    render() {
        const { txtBol,dateList,isModalVisible,text,order } = this.state;
        return (
            <View style={{padding:10}}>
                <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
                <View style={styles.tit}>
                    <Text style={{color:'#CF1D2D',fontSize:16}}>复位操作后，请等待30s--60s设备重新连网</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={{width:100}}>
                        <Text style={{textAlign:'right',paddingTop:5}}>
                            *操作说明
                        </Text>
                    </View>
                    <View style={{flex:1}}>
                        <Radio SelectList={this.state.SelectList} 
                            flx={'column'}
                            select={this.select.bind(this)} />
                        <View style={{marginTop:10}}>
                            {
                                txtBol ? (
                                    <Textarea
                                        containerStyle={styles.textareaContainer}
                                        style={styles.textarea}
                                        onChangeText={this.onChangeErr}
                                        maxLength={300}
                                        
                                        placeholder={'请输入操作书名'}
                                        placeholderTextColor={'#c7c7c7'}
                                        underlineColorAndroid={'transparent'}
                                    />
                                ) : <Text />
                            }
                        </View>
                    </View>
                </View>
                <View style={{flexDirection:'row',marginTop:10}}>
                    <View style={{width:100}}>
                        <Text style={{textAlign:'right',paddingTop:5}}>
                            *远程操作
                        </Text>
                    </View>
                    <View style={styles.title_btn_list}>
                        {
                            order && order.map((item,i) => (
                                <View key={i} style={[styles.title_btn_list_normal,{backgroundColor:item.check ? '#3AA1FE' : '#FFFFFF'}]}>
                                    <TouchableOpacity onPress={()=>this.onPressSumit(item,i)}>
                                        <View style={{alignItems:'center'}}>
                                            <Text style={{fontSize:12,color:item.check ? '#FFFFFF' : '#3AA1FE'}}>
                                                {item.key}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))
                        }
                    </View>
                </View>
                <Modal 
                    isVisible={isModalVisible}
                >
                    <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
                        <View style={{flexDirection:"column",padding:5,borderRadius:3,backgroundColor:"#FFFFFF",width:width-50}}>
                            <Text style={{fontWeight:"900",fontSize:18,paddingLeft:20,paddingRight:20,fontWeight:'900',marginTop:20}}>
                                请输入密码
                            </Text>
                            <View style={{flexDirection:'row',padding:10,marginLeft:10,alignItems:"center"}}>
                                <Text style={{fontWeight:"600",fontSize:16,width:50}}>密码:</Text>
                                <TextInput
                                    style={{borderColor: 'gray', borderWidth: 1,flex:1,height:30,borderRadius:3,paddingVertical: 0}}
                                    onChangeText={(text) => this.setState({text})}
                                    value={text}
                                />
                            </View>
                            <View style={{flexDirection:"row",marginTop:25,paddingBottom:25}}>
                                <View style={{flex:1}}></View>
                                <View style={{flex:1,marginright:10}}>
                                    <Button 
                                        title='取消'
                                        color='#D9E4ED'
                                        style={{width:84}}
                                        onPress={this._toggleModal}
                                    />
                                </View>
                                <View style={{flex:1,marginLeft:10}}>
                                    <Button 
                                        title='确定'
                                        style={{width:80}}
                                        onPress={this._toggleModalGo}
                                    />
                                </View>
                                <View style={{flex:1}}></View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }  
}
const styles = StyleSheet.create({
    textareaContainer: {
        height: 107,
        backgroundColor: '#fff',
        borderColor:'#D9E4ED',
        borderWidth:1,
        borderRadius:2
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 107,
        padding:5,
        fontSize: 14,
        color: '#333',
    },
    title_btn_list: {
        flex: 1,
        flexWrap: 'wrap',
        display:'flex',
        flexDirection: 'row',
    },

    title_btn_list_normal: {
        flexWrap: 'wrap',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        // width:(width-200)/3,
        margin: 5,
        borderWidth:1,
        borderRadius:4,
        borderColor:'#3AA1FE',
        alignItems:"center",
        justifyContent:'center',
        padding:5,
    },
    tit: {
        padding:10,
        backgroundColor: '#FFFFFF',
    },
});
export default MessageScreens;