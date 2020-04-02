import React, { Component } from 'react';
import Select from '../../components/select/select';
import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import HeaderComponent from '../../components/header';
import { getDay,getMonth } from '../../components/home/changeTime';
import FetchManager from '../../http/http';

class SafetyScore extends Component{
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            header: null
        }
    };
    constructor(){
        super()
        this.state={
            lineList:[],
            homeData:{},
            zhscore:0
        }
    }

    getListData = (e,i) => {
        console.log(e)
        console.log(i)
    }

    render(){
        const { arr,arrDefault,n_day,n_month,n_year,bol_date } = this.state;
        return(
            <View>
                {/* 头部 */}
               
                <View style={{height:55,backgroundColor:'#467cd4',flexDirection:'row',justifyContent:'space-between',alignItems:'center',}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{paddingRight:15,}}>
                        <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                            <FontAwesome color="#fff" name="angle-left" size={28}/>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, color: '#fff' }}>安全评分</Text>
                    <TouchableOpacity onPress={()=>{this.init()}}>
                        <Text style={{ fontSize: 14, color: '#fff', paddingRight: 15, }}>刷新</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={{paddingTop:15,paddingLeft:20,paddingRight:20,}}>
                        <Text style={{fontSize:14,lineHeight:16,marginBottom:5,}}>您所检测的区域内，本周共有<Text style={{color:'red',}}>{this.state.homeData.alarmCount}</Text>次报警记录。</Text>
                        <Text style={{fontSize:14,lineHeight:16,marginBottom:5,}}>本次共检测{this.state.homeData.getwayCount}个网关{this.state.homeData.breakCount}个空开，综合评分{this.state.homeData.score}。</Text>
                        <Text style={{fontSize:14,lineHeight:16,marginBottom:5,}}>目前空开情况为{this.state.homeData.breakNormalCount}个正常，{this.state.homeData.breakOffLineCount}个离线，<Text style={{color:'red',}}>{this.state.homeData.breakAlarmCount}</Text>个正在报警。</Text>
                        {this.state.homeData.breakAlarmCount?(
                            <Text style={{fontSize:14,lineHeight:16,marginBottom:5,}}>存在一定的安全隐患，请及时处理。</Text>
                        ):(<View/>)}
                    </View>
                    <View style={{paddingLeft:15,paddingRight:15,backgroundColor:'#fff',marginTop:10,marginBottom:20,}}>
                        <View style={{borderBottomColor:'#E8E8E8',borderBottomWidth:1,height:38,flexDirection:'row',}}>
                            <View style={{justifyContent:'center',alignItems:'center',width:'25%'}}>
                                <Text style={{fontSize:12,color:'#666'}}>网关名</Text>
                            </View>
                            <View style={{justifyContent:'center',alignItems:'center',width:'25%'}}>
                                <Text style={{fontSize:12,color:'#666'}}>开关数量</Text>
                            </View>
                            <View style={{justifyContent:'center',alignItems:'center',width:'25%'}}>
                                <Text style={{fontSize:12,color:'#666'}}>异常空开</Text>
                            </View>
                            <View style={{justifyContent:'center',alignItems:'center',width:'25%'}}>
                                <Text style={{fontSize:12,color:'#666'}}>评分</Text>
                            </View>
                        </View>
                        {
                            this.state.lineList.map((item,index)=>{
                                return(
                                    <View key={index} style={{borderBottomColor:'#E8E8E8',borderBottomWidth:1,height:45,flexDirection:'row',}}>
                                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:'25%'}}>
                                            {/* <View style={{width:25,height:25,backgroundColor:'#467cd4',marginRight:10,}}></View> */}
                                            <Text style={{fontSize:12,color:'#666'}}>{item.getwayDeviceName}</Text>
                                        </View>
                                        <View style={{justifyContent:'center',alignItems:'center',width:'25%'}}>
                                            <Text style={{fontSize:12,color:'#666'}}>{item.breakCount}</Text>
                                        </View>
                                        <View style={{justifyContent:'center',alignItems:'center',width:'25%'}}>
                                            <Text style={{fontSize:12,color:'#666'}}>{item.alarmCount}</Text>
                                        </View>
                                        <View style={{justifyContent:'center',alignItems:'center',width:'25%'}}>
                                            <Text style={{fontSize:12,color:'#666'}}>{item.score}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                        <View style={{marginTop:30,paddingLeft:20,paddingRight:20,borderBottomColor:'#E8E8E8',borderTopColor:'#E8E8E8',borderBottomWidth:1,borderTopWidth:1,height:45,flexDirection:'row',justifyContent:'flex-end',alignItems:'center',}}>
                            <Text style={{fontSize:12,color:'#666'}}>综合评分: </Text><Text>{this.state.zhscore}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
    init=()=>{
        this.getData()
    }
    componentDidMount(){
        this.getData()
    }
    getData=()=>{
        FetchManager.get('/app/acbAppIndexStatistical/getInfo', '', async (set) => {
            console.log(set.data.score)
            if (set.status == 0) {
                this.setState({
                    homeData: set.data.score,
                    lineList: set.data.score.scoreDetail,
                    zhscore:  set.data.score.score,
                })
            }
        })
    }
}
const style=StyleSheet.create({
    dateselect: {
        backgroundColor: '#467cd4',
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:3,
        padding:3,
        flex:1
    },
    dateselectTexted: {
        color: '#FFFFFF',
    },
    dateselectText: {
        color: '#467cd4',
    },
    dateselected: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:3,
        padding:3,
        flex:1
    },
})


export default SafetyScore