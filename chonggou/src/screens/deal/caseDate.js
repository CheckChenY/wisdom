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
            nowDates:[],
            alarmDetails:[],
        }
    }
  
    
    componentDidMount(){
        const { id } = this.props.navigation.state.params;
        let obj = {
            recordId:id,
        }///alarm
        FetchManager.get('/alarm/inner/jtlAlarmData/getAlarmDate',obj, (set) => {
            console.log(set)
            if(set && set.success){
                let data = set.value
                // let txt = data.alarmDetails;
                // let t = ''
                // txt && txt.forEach(show=>{
                //     t += show
                // })
                this.setState({
                    data:data,
                    nowDates:data.nowDates,
                    alarmDetails:data.alarmDetails
                })
            }
        })
    }

    getData = () => {
        const { id } = this.props.navigation.state.params;
        let obj = {
            recordId:id,
        }///alarm
        FetchManager.get('/alarm/inner/jtlAlarmData/getAlarmDate',obj, (set) => {
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
                    warnText:t
                })
            }
        })
    }


    onChangeIndex = (val) => {
        // let nub = val === 0 ? Number(val) + 2 : 1;
        console.log(val)
        // if(val === 1){
        //     this.getData();
        // }
    }

    render() {
        const { data,alarmDetails,nowDates } = this.state;
        return (
            <KeyboardAvoidingView enabled>
            <ScrollView>
                <View>
                    <View style={{ paddingTop:5,paddingBottom:5 }}>
                        <Content left='上报时间：' right={data.createTime}/>
                        <Content left='设备状态：' right={SystemName[data.alarmType]}/>
                        <Content left='报警类型：' right={data.alarmDetails}/>
                    </View>
                    <View style={styles.tit}>
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
                        <TableContent index={0} list={nowDates} />
                    </View>

                    {/* <View style={styles.tit}>
                        <Text style={{color:'#3AA1FE',fontSize:16}}>阈值数据</Text>
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
                        <TableContent index={1} list={data.thresholdDates} />
                    </View> */}



                    <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
                </View>
            </ScrollView>   
            </KeyboardAvoidingView>
        );
    }
}


class TableContent extends Component{
    render(){
        const { list,index } = this.props;
        return(
            <View>
                {
                    list && list.map((item,i)=>(
                        <View key={i} style={{flexDirection:'row',width:260,borderWidth:1,borderColor:'#F2F7FB',borderTopWidth:0}}>
                            <View style={{borderRightWidth:1,borderRightColor:'#F2F7FB',flex:1}}>
                                <Text style={{textAlign:'center',padding:5}}>
                                    { index === 0 ? item.dataDic : item.thresholdKey }
                                </Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={{textAlign:'center',padding:5}}>
                                    { index === 0 ? item.dataS : item.value }
                                </Text>
                            </View>
                        </View>
                    ))
                }
            </View>
        )
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