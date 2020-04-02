import React , { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Text,View,TouchableOpacity,StyleSheet,FlatList,TextInput, ScrollView} from 'react-native';


class LimitsList extends Component{
    constructor() {
        super()
        this.state = {
            limits:[{
                name:'查看、空开信息',
                select:true,
                id:1,
            },{
                name:'用电查看',
                select:true,
                id:2,
            },{
                name:'定时模式查看',
                select:false,
                id:3,
            },{
                name:'报警推送',
                select:true,
                id:4,
            },{
                name:'操作日志',
                select:false,
                id:5,
            },{
                name:'动态曲线',
                select:false,
                id:6,
            },{
                name:'统计报表',
                select:false,
                id:7,
            },{
                name:'远程控制',
                select:false,
                id:8,
            },{
                name:'定时任务管理',
                select:false,
                id:9,
            }]
        }
    }
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            header:null,
        };
    };
    render(){
        return(
            <View style={style.page}>
                <View style={{height:55,backgroundColor:'#467cd4',flexDirection:'row',justifyContent:'space-between',alignItems:'center',}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                        <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                            <FontAwesome color="#fff" name="angle-left" size={28}/>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, color: '#fff' }}>共享权限</Text>
                    <TouchableOpacity onPress={()=>this.done()}>
                        <Text style={{ fontSize: 14, color: '#fff',paddingRight:15, }}>完成</Text>
                    </TouchableOpacity>
                </View>
                <View style={{height:10,backgroundColor:'#F6F6F6',}}></View>
                <View style={{paddingLeft:15,paddingRight:15,}}>
                    {
                        this.state.limits.map((item,index)=>{
                            return(
                                <TouchableOpacity onPress={()=>this.select(item)} key={index} style={{height:44,justifyContent:'center',borderBottomColor:'#EBEBEB',borderBottomWidth:1,position:'relative',}}>
                                    <Text style={{fontSize:15,paddingLeft:15,color:'#333',}}>{item.name}</Text>
                                    {
                                        item.select?(
                                            <AntDesign color="#999" style={{position:'absolute',top:10,right:50,}} name="check" size={24}/>
                                        ):(
                                            <View></View>
                                        )
                                    }
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
    done=()=>{
        console.log(this.state.limits)
        this.props.navigation.goBack()
    }
    select=(a)=>{
        let limits=this.state.limits
        limits.forEach(s=>{
            if(a.name==s.name){
                s.select=!s.select
            }
        })
        this.setState({
            limits:limits
        })
    }
}
const style=StyleSheet.create({
    page:{
        // backgroundColor:'rgb(246,246,246)',
        height:'100%',
    },
})
export default LimitsList