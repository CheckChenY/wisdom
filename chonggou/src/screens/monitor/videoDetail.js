import React, { Component } from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Text, View,Image, Dimensions,Button,TextInput,AsyncStorage,
    KeyboardAvoidingView,StyleSheet,TouchableOpacity,ScrollView } from "react-native";
import Modal from "react-native-modal";
import FetchManager from '../fetch/index';
import WanrLevelName from '../components/wanrLevelName';
import ModelPop from '../components/modelPop';
import StatusName from '../components/statusName';

const { height, width } = Dimensions.get('window');

class Content extends Component{
    render(){
        return(
        <View style={{ flexDirection: 'row',paddingLeft:20,marginBottom:10, }}>
            <View style={{width:120}}>
                <Text style={{ textAlign: 'right',fontSize:14,color:'#333' }}>{this.props.left}</Text>
            </View>
            <View style={{flex:1}}>
                <Text style={{ fontSize:14,color:'#666',lineHeight:20 }}>{this.props.right}</Text>
            </View>
        </View>
        )
    }
}

class CaseDeal extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { deviceId } = navigation.state.params;
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center',color:'#fff',fontSize:17 }}>设备详情</Text>
            ),
            headerRight:<View />,
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
            data:'',
            // dateList:[],
            datas:[],
            deviceId:'',
            check:false,
            list:[
            // {label:'远程操作',value:0,status:false,url:'infoRemote',type:0},
            {label:'设备信息',value:1,status:false,url:'EditParams',type:0},
            {label:'相关图片',value:2,status:false,url:'infoImage',type:3},
            // {label:'关联视频',value:3,status:false,url:'infoVideo',type:3},
            // {label:'联动设备',value:4,status:false,url:'infoDevice',type:0},
            // {label:'警情记录',value:5,status:false,url:'infoRecord',type:0},
            // {label:'状态分析',value:6,status:false,url:'stateanalysis'},
            // {label:'参数曲线',value:7,status:false,url:'infoVideo'},
            ],
            type:0
        }
    }

    componentDidMount(){
        const { data } = this.props.navigation.state.params;
        this.setState({
            data:data,
        })
        // let obj = {
        //     // deviceId:'868221987653441891'
        //     deviceId:deviceId
        // }///device
        // FetchManager.get('/device/inner/jtlDevice/getDeviceDetailApp',obj, (set) => {
        //     console.log(set)
        //     if(set && set.success){
        //         // let list = set.value[0].order ? set.value[0].order : [];
        //         let dataList = set.value[0].datas ? set.value[0].datas : [];
        //         this.setState({
        //             data:set.value[0],
        //             datas:dataList,
        //             deviceId:deviceId
        //         })
        //     }
        // })
    }

    render() {
        const { data } = this.state;
        return (
            <KeyboardAvoidingView enabled>
                <ScrollView>
                    <View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                {/* <Content left='设备ID/标识码：' right={data.deviceId}/> */}
                                <Content left='设备名称：' right={data.deviceName}/>
                                <Content left='所属系统：' right={data.systemName}/>
                                <Content left='设备类型：' right={data.deviceType}/>
                                <Content left='设备型号：' right={data.deviceModel}/>
                                <Content left='所在建筑：' right={data.buildingName}/>
                                <Content left='楼层/区域：' right={data.floorName}/>
                                <Content left='安装位置：' right={data.location}/>
                            </View>
                        </View>
                        <View style={{justifyContent:'center',alignItems:'center',margin:15}}>
                            <Image style={{width:110,height:90}} source={{uri:'http://192.168.0.186:60080/'+data.modelPhoto}} />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}


const styles = StyleSheet.create({
    tit: {
        padding:5,
        margin:5,
        backgroundColor: '#F2F7FB',
        flexDirection:'row'
    },

    title_btn_list: {
        width: width,
        flexWrap: 'wrap',
        display:'flex',
        flexDirection: 'row',
    },

    title_btn_list_normal: {
        flexWrap: 'wrap',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        width:(width-80)/3,
        margin: 10,
        borderWidth:1,
        borderRadius:4,
        borderColor:'#3AA1FE',
        alignItems:"center",
        justifyContent:'center',
        paddingTop:10,
        paddingBottom:10
    },
    title_btn_list_normals: {
        flexWrap: 'wrap',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        width:(width-80)/4,
        margin: 10,
        borderWidth:1,
        borderRadius:4,
        borderColor:'#3AA1FE',
        alignItems:"center",
        justifyContent:'center',
        paddingTop:10,
        paddingBottom:10
    },
})
export default CaseDeal;