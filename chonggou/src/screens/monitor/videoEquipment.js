import React, { Component } from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Text, View,Image, Dimensions,Button,
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
            id:'',
            // dateList:[],
            datas:[],
            deviceId:'',
            check:false,
            list:[
            {label:'设备信息',value:0,status:false,url:'videoDetail',type:0},
            // {label:'修改阈值',value:1,status:false,url:'EditParams',type:0},
            {label:'相关图片',value:2,status:false,url:'videoImg',type:3},
            // {label:'关联视频',value:3,status:false,url:'infoVideo',type:3},
            // {label:'联动设备',value:4,status:false,url:'infoDevice',type:0},
            // {label:'警情记录',value:5,status:false,url:'infoRecord',type:0},
            // {label:'状态分析',value:6,status:false,url:'stateanalysis'},
            // {label:'参数曲线',value:7,status:false,url:'infoVideo'},
            ],
            type:0,
            
            pushserver:'rtmp://58.200.131.2:1935/',
            stream:'livetv/hunantv',
        }
    }

    componentDidMount(){
        const { id,data } = this.props.navigation.state.params;
        this.setState({
            data:data,
            id:id
        })
        // let obj = {
        //     // deviceId:'868221987653441891'
        //     deviceCameraId:id
        // }///device
        // FetchManager.get('/camera/inner/videoHead/rtmp',obj, (set) => {
        //     console.log(set)
        //     if(set && set.success){
        //         if(set&&set.success){
        //             let data = set.value;
        //             let pushserver = data.substring(0,26);
        //             let stream = data.substring(26,data.length);
        //             self.props.navigation.push('infoVideoList',{
        //                 'pushserver': pushserver, 
        //                 'stream': stream 
        //             })
        //         }else{
        //             this.popUp.showPop('暂无视频')
        //         }
        //     }
        // })
    }


    onEnterUrl = (id) => {
        let self = this;
        let obj = {
            deviceCameraId: id
        }
        FetchManager.get('/camera/inner/videoHead/rtmp',obj, async (set) => {
            console.log(set)
            if(set&&set.success){
                let data = set.value;
                let pushserver = data.substring(0,26);
                let stream = data.substring(26,data.length);
                self.props.navigation.push('infoVideoList',{
                    'pushserver': pushserver, 
                    'stream': stream 
                })
            }else{
                this.popUp.showPop('暂无视频')
            }
        })
    }



    onChangeList = (item,i) => {
        console.log(item)
        const { deviceId,data } = this.state;
        this.props.navigation.navigate(item.url,{
            // deviceId:deviceId,
            // deviceModel:data.deviceModel,
            data:data
        })
    }

    render() {
        const { data,datas,list } = this.state;
        return (
            <KeyboardAvoidingView enabled>
                <ScrollView>
                    <View>
                        <View style={styles.title_btn_list}>
                            {
                                list.map((item,i) => {
                                    return(
                                        <View key={i} style={styles.title_btn_list_normals}>
                                            <TouchableOpacity onPress={()=>this.onChangeList(item,i)}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style={{fontSize:12,color:item.status ? '#FFFFFF' : '#3AA1FE'}}>
                                                        {item.label}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            }
                        </View>

                        <View style={styles.tit}>
                            <Text style={{color:'#3AA1FE',fontSize:16}}>设备信息</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                {/* <Content left='设备ID/标识码：' right={data.deviceId}/> */}
                                <Content left='设备名称：' right={data.deviceName}/>
                                {/* <Content left='所属系统：' right={data.system}/> */}
                                {/* <Content left='设备类型：' right={data.type}/> */}
                                {/* <Content left='设备型号：' right={data.model}/> */}
                                <Content left='所在建筑：' right={data.buildingName}/>
                                <Content left='楼层/区域：' right={data.floorName}/>
                                <Content left='安装位置：' right={data.location}/>
                            </View>
                            <View style={{width:120,justifyContent:'center',alignItems:'center'}}>
                                <Image style={{width:110,height:90}} source={{uri:data.modelPhoto}} />
                            </View>
                        </View>
                        <View style={[styles.tit,{alignItems:'center',justifyContent:'center'}]}>
                            <Button
                                onPress={ () => this.onEnterUrl(data.id) } 
                                title={data.deviceName ? data.deviceName : ''}
                            />
                        </View>
                        {/* <View style={{ paddingTop:5,paddingBottom:5 }}>
                            <Content left='上报时间：' right={data.createTime}/>
                            <Content left='当前状态：' right={StatusName[data.warnState]}/>
                            <Content left='报警类型：' right={data.alarmDicDesc?data.alarmDicDesc:'无'}/>
                        </View> */}
                        
                        {/* <View style={styles.tit}>
                            <Text style={{color:'#3AA1FE',fontSize:16}}>实时数据</Text>
                        </View>
                        <View style={{paddingTop:5,paddingBottom:5,justifyContent:'center',alignItems:'center' }}>
                            <View style={{flexDirection:'row',width:260}}>
                                <View style={{borderWidth:1,borderColor:'#F2F7FB',flex:1,borderRightWidth:0}}>
                                    <Text style={{textAlign:'center',padding:5}}>数据类型</Text>
                                </View>
                                <View style={{borderWidth:1,borderColor:'#F2F7FB',flex:1}}>
                                    <Text style={{textAlign:'center',padding:5}}>实时数据</Text>
                                </View>
                            </View>
                            <TableContent list={datas} index={0} />
                        </View> */}

                        {/* <View style={styles.tit}>
                            <Text style={{color:'#3AA1FE',fontSize:16}}>参数阈值</Text>
                        </View>
                        <View style={{paddingTop:5,paddingBottom:5,justifyContent:'center',alignItems:'center' }}>
                            <View style={{flexDirection:'row',width:260}}>
                                <View style={{borderWidth:1,borderColor:'#F2F7FB',flex:1,borderRightWidth:0}}>
                                    <Text style={{textAlign:'center',padding:5}}>数据类型</Text>
                                </View>
                                <View style={{borderWidth:1,borderColor:'#F2F7FB',flex:1}}>
                                    <Text style={{textAlign:'center',padding:5}}>阈值</Text>
                                </View>
                            </View>
                            <TableContent list={data.deviceThreshol} index={1} />
                        </View> */}


                        
                        <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }





}


// class TableContent extends Component{
//     render(){
//         const { list,index } = this.props;
//         return(
//             <View>
//                 {
//                     list && list.map((item,i)=>(
//                         <View key={i} style={{flexDirection:'row',width:260,borderWidth:1,borderColor:'#F2F7FB',borderTopWidth:0}}>
//                             <View style={{borderRightWidth:1,borderRightColor:'#F2F7FB',flex:1}}>
//                                 <Text style={{textAlign:'center',padding:5}}>
//                                     {index === 0 ? item.key : item.thresholdDesc}
//                                 </Text>
//                             </View>
//                             <View style={{flex:1}}>
//                                 <Text style={{textAlign:'center',padding:5}}>
//                                     {index === 0 ? item.value : (item.thresholdValue + item.unit)}
//                                 </Text>
//                             </View>
//                         </View>
//                     ))
//                 }
//             </View>
//         )
//     }
// }


const styles = StyleSheet.create({
    tit: {
        padding:5,
        margin:5,
        backgroundColor: '#F2F7FB',
        flexDirection:'row'
    },

    title_btn_list: {
        width: width,
        // flexWrap: 'wrap',
        // display:'flex',
        flexDirection: 'row',
    },

    // title_btn_list_normal: {
    //     flexWrap: 'wrap',
    //     flexDirection: 'column',
    //     backgroundColor: '#FFFFFF',
    //     width:(width-80)/3,
    //     margin: 10,
    //     borderWidth:1,
    //     borderRadius:4,
    //     borderColor:'#3AA1FE',
    //     alignItems:"center",
    //     justifyContent:'center',
    //     paddingTop:10,
    //     paddingBottom:10
    // },
    title_btn_list_normals: {
        flex:1,
        // flexWrap: 'wrap',
        // flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        // width:(width-80)/4,
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