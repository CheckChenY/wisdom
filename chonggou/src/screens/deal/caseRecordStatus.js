import React, {Component} from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';
import FetchManager from '../fetch/index';
import StatusName from '../components/statusName';

export default class HomeView extends Component {

    constructor(props){
        super(props);
        //当前页
        this.page = 1
        //状态
        this.state = {
            // 列表数据结构
            data:{},
            list:{},
        }
    }

    // pageSize=6&page=0&deviceId=WG0002
    componentDidMount(){
        // const {list} = this.state;
        let deviceId = this.props.navigation.state.params.deviceId ? this.props.navigation.state.params.deviceId : '';
        let id=this.props.navigation.state.params.id
        // list.deviceId = 'WG0002';
        // this._getHotList(list);

        this.getData(deviceId,id)
        // this.getData('1576549049183304')
    }

    getData = (deviceId,id) =>{
        let obj = {
            param: id
        },objs = {
            recordId: id
        }
        FetchManager.get('/alarm/inner/jtlAlarmRecord/findDetailById',obj, (set) => {
            console.log(set)
            if(set&&set.success){
                this.setState({
                    data:set.value ? set.value : {}
                })
            }
        })

        FetchManager.get('/alarm/inner/jtlAlarmProcess/findByRecordId',objs, (set) => {
            console.log(set)
            if(set&&set.success){
                this.setState({
                    list:set.value ? set.value : {}
                })
            }
        })
    }

    // const { index } = this.props;
    onChangeIndex = (val) => {
        // const { onPressToChang } = this;
        console.log(val)
    }

    


    render() {
        const { data,list } = this.state;
        return (
            <View style={{backgroundColor:"#FFFFFF",margin:5}}>
                <View>
                    <View style={{flexDirection:'row',borderLeftWidth:1,borderLeftColor:'#D9E4ED',}}>
                        <View style={{width:9,height:9,borderWidth:2,borderRadius:5,position:'absolute',left:-5,top:-1,
                            borderColor:'#3AA1FE',backgroundColor:'#FFFFFF'}}></View>
                        <View style={{flex:1}}>
                            <View style={{paddingLeft:10}}>
                                {/* <Text>2019-01-02  08:35:08</Text> */}
                                <Text style={{margin:10,lineHeight:20,}}>
                                    {data.createTime}
                                    {data.deviceType}位置:{data.location}
                                    {data.deviceName},报警类型:{data.alarmType==0?'正常':data.alarmType==1?'报警':data.alarmType==2?'故障':data.alarmType==3?'报警&故障':data.alarmType==4?'离线':'温湿度传感器故障'},警情程度:
                                    {data.alarmLevel==0?'无报警':data.alarmLevel==1?'一般':data.alarmLevel==2?'重要':data.alarmLevel==3?'严重':'其他'}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',borderLeftWidth:1,borderLeftColor:'#D9E4ED',}}>
                        <View style={{width:9,height:9,borderWidth:2,borderRadius:5,position:'absolute',left:-5,top:-1,
                            borderColor:'#3AA1FE',backgroundColor:'#FFFFFF'}}></View>
                        <View style={{flex:1}}>
                            <View style={{paddingLeft:10}}>
                                <Text>{list.firstViewTime}</Text>
                                <Text style={{margin:10}}>
                                    {list.firstViewer},查看警情信息
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',borderLeftWidth:1,borderLeftColor:'#D9E4ED',}}>
                        <View style={{width:9,height:9,borderWidth:2,borderRadius:5,position:'absolute',left:-5,top:-1,
                            borderColor:'#3AA1FE',backgroundColor:'#FFFFFF'}}></View>
                        <View style={{flex:1}}>
                            <View style={{paddingLeft:10}}>
                                <Text>{list.dealTime}</Text>
                                <Text style={{margin:10}}>
                                    {list.warnHandler},警情处理为:{list.warnConfirmType==1?'真实火警':list.warnConfirmType==2?'异常':list.warnConfirmType==3?'误报':'测试'},
                                    警情说明为:{list.warnDealDes}
                                </Text>
                                <View style={{flexDirection:'row'}}>
                                    <View style={{width:90}}>
                                        <Text>
                                            处理结果图:
                                        </Text>
                                    </View>
                                    <View>
                                        <Image style={{width:80,height:80}}
                                            source={{uri:'http://192.168.0.186:60080/'+list.warnDealResultPhoto}} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={{width:9,height:9,borderWidth:2,borderRadius:5,position:'absolute',
                            left:-4,top:-1,
                            borderColor:'#3AA1FE',backgroundColor:'#FFFFFF'}}></View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        padding: 5,
        marginTop:5
    },
});