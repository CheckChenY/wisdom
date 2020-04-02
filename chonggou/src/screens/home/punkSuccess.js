import React,{ Component } from 'react';
import { View,Text,StyleSheet,TextInput,Button,Dimensions,TouchableOpacity,Image,ScrollView,Alert } from 'react-native'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CammerComment from '../components/cammer';
import BaiduMap from '../components/baidumap';

import FetchManager from '../fetch/index';
import { date } from '../fetch/index';

const {height, width} = Dimensions.get('window');


class HeaderRight extends Component {
    render(){
        const { navigation } = this.props,
        { titleRight } = navigation.state.params;
        return(
            <TouchableOpacity onPress={() => navigation.push('workRecord',{title:'考勤记录'})}>
                <Text style={{color:'#fff',fontSize: 16,marginRight:15}}>{ titleRight }</Text>
            </TouchableOpacity>
        )
    }
}

class PunchClockScreen extends Component {

    static navigationOptions = {
        header:null
    };

    constructor(props){
        super(props)
        this.state={
            isRandom:false,
            step:0, //0未获取验证码  1，正在获取验证码  2，验证码过期重新验证
            tip:'',
            timer:'',
        }
        
    }

    componentDidMount(){

        this.setState({
            step:1,
            tip:3,
        },this.getTime())

    }
    
    getTime = () => {
        this.setState({
            timer:setInterval(()=>{
                this.setState({
                    tip:this.state.tip-1
                })
                
                if(this.state.tip===0){
                    clearInterval(this.state.timer)
                    this.props.navigation.goBack()
                }
            },1000)
        })
    }


    render() {

        const { navigation } = this.props,
        { obj,time } = navigation.state.params;
        let timestamp4 = new Date(time);
        let timeNub = timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8)
        console.log(obj)
        return (
            <ScrollView>
                <View style={{backgroundColor:'#F2F7FB',flex:1}}>
                    <View style={{textAlign:'center',alignItems:'center',paddingTop:80}}>
                        <Image style={{width:75,height:75}} source={require('../../img/cg.png')} />
                        <Text style={{fontSize:18,fontWeight:"900",paddingTop:10}}>
                            考勤打卡成功
                        </Text>
                        <Text style={{fontSize:14,paddingTop:5,color:"#1890FF"}}>
                            {this.state.tip}s后自动关闭
                        </Text>
                        <View style={{width:'75%',flexDirection:'row',alignItems:'center',marginTop:10}}>
                            <View>
                                <Text>打卡时间：</Text>
                            </View>
                            <View>
                                <Text style={{textAlign:'left',lineHeight:22}}>
                                    {timeNub? timeNub : '09:00:09' }
                                </Text>
                            </View>
                        </View>
                        <View style={{width:'75%',flexDirection:'row',marginTop:10}}>
                            <View>
                                <Text>打卡地点：</Text>
                            </View>
                            <View style={{width:'75%'}}>
                                <Text style={{textAlign:'left',lineHeight:22}}>
                                {obj.clockAddress ? obj.clockAddress : '河南省郑州市管城回族区经南四路68号大通工业园'}
                                </Text>
                            </View>
                        </View>
                        <View style={{width:'75%',flexDirection:'row',marginTop:10}}>
                            <View>
                                <Text>拍照：</Text>
                            </View>
                            <View>
                                <Image style={{width:88,height:88}} source={{uri:obj.clockPhoto ? obj.clockPhoto : ''}}/>
                            </View>
                        </View>
                        <View style={{width:'75%',flexDirection:'row',alignItems:'center',marginTop:10}}>
                            <View>
                                <Text>备注（选填）：</Text>
                            </View>
                            <View>
                                <Text style={{textAlign:'left',lineHeight:22}}>
                                    {obj.clockRemak ? obj.clockRemak : ''} 
                                </Text>
                            </View>
                        </View>
                        <View style={{width:'75%',height:45,marginTop:36}}>
                            <TouchableOpacity onPress={()=>navigation.goBack()}>
                                <View style={{height:'100%',backgroundColor:'#3AA1FE',borderRadius:5,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{color:'#fff',fontSize:18}}>返回</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }  
}

const styles = StyleSheet.create({
    c_clock_title:{
        marginTop:10,
        marginBottom:5,
        marginLeft:15,
        marginRight:15,
        backgroundColor:'#fff',
        borderRadius:2,
        padding:12,
        borderWidth:1,
        borderColor:'#E0E0E0',
        borderRadius:2
    },
    c_clock_picture:{
        marginTop:5,
        marginBottom:10,
        marginLeft:15,
        marginRight:15,
        padding:12,
        backgroundColor:'#fff',
        flexDirection: 'row',
        borderWidth:1,
        borderColor:'#E0E0E0',
        borderRadius:2
    },
    c_clock_pic_left:{
        width:50,
        justifyContent:'center'
    },
    c_clock_update:{
        flex:1,
    },
    c_clock_update_box:{
        height:60,
        borderWidth:0.5,
        width:60,
        alignItems:'center',
        justifyContent:'center',
        borderStyle:'dashed',
    }
})

export default PunchClockScreen;