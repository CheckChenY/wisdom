import React , { Component } from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FetchManager from '../http/http'

import Modal from "react-native-modal";

import { Text,View,Switch,StyleSheet,TouchableOpacity,FlatList,Image } from 'react-native';
import { Button } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet'
// import { Switch } from 'react-native-switch';
import DatePicker from 'react-native-datepicker'
// import WifiManager from 'react-native-wifi';

class HomeScreen extends Component{

    constructor(){
        super()
        this.state = {
            // value: false,
            // date:"2016-05-15",
            setList:[{
                icon:'bell',
                text:'设置电价',
                color:'#467cd4',
            },{
                icon:'bell',
                text:'检查更新',
                color:'#FEB52E',
            },{
                icon:'bell',
                text:'使用帮助',
                color:'#FD3E3C',
            },{
                icon:'bell',
                text:'关于',
                color:'#09BBBA',
            },],
            person:{}
        }
    }
    componentDidMount(){
        this.getData()
    }


    render(){
        return(
            <View style={style.page}>
                <View style={{backgroundColor:'lightblue',position:'relative',marginBottom:10}}>
                    <View style={{flexDirection:'row',justifyContent:'center',marginTop:20,}}>
                        <Text style={{fontSize:17,color:'#fff',}}>个人中心</Text>
                    </View>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('personinfo',{refresh:()=>{this.refresh()}})} style={{height:85,marginTop:30,flexDirection:'row',paddingLeft:25,paddingRight:25}}>
                        <View style={{width:64,height:64,borderRadius:32,backgroundColor:'rgb(234,234,234)'}}>
                        <Image
                            style={{width:'100%',height:'100%',borderRadius:32,}}
                            source={{uri:this.state.person.avatar}}
                        />
                        </View>
                        <View style={{width:'80%',marginLeft:8,height:64,justifyContent:'center'}}>
                            <View style={{height:16}}>
                                <Text style={{fontSize:16,color:'#fff',}}>{this.state.person.name}</Text>
                            </View>
                            <View style={{height:16,marginTop:10,}}>
                                <Text style={{fontSize:16,color:'#fff',}}>{this.state.person.phone}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={{position:'absolute',top:22,right:15}} onPress={()=>this.props.navigation.navigate('warnlist')}>
                        <EvilIcons color="#fff" name="bell" size={28}/>
                    </TouchableOpacity> */}
                </View>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('setprice',{userId:this.state.person.id})}>
                    <View style={style.itemBox}>
                        <View style={{width:20,height:20,marginRight:12,justifyContent:'center',alignItems:'center'}}>
                            <AntDesign color='#467cd4' name='dashboard' size={18}/>
                        </View>
                        <Text>设置电价</Text>
                        <FontAwesome color="#B1B1B1" name='angle-right' size={24} style={{position:'absolute',right:15,}}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.onCancelUpdate()} }>
                    <View style={style.itemBox}>
                        <View style={{width:20,height:20,marginRight:12,justifyContent:'center',alignItems:'center'}}>
                            <AntDesign color='#FEB52E' name='sync' size={18}/>
                        </View>
                        <Text>检查更新</Text>
                        <FontAwesome color="#B1B1B1" name='angle-right' size={24} style={{position:'absolute',right:15,}}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('usehelp')}>
                    <View style={style.itemBox}>
                        <View style={{width:20,height:20,marginRight:12,justifyContent:'center',alignItems:'center'}}>
                            <AntDesign color='#FD3E3C' name='tool' size={18}/>
                        </View>
                        <Text>使用帮助</Text>
                        <FontAwesome color="#B1B1B1" name='angle-right' size={24} style={{position:'absolute',right:15,}}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('about')}>
                    <View style={style.itemBoxLast}>
                        <View style={{width:20,height:20,marginRight:12,justifyContent:'center',alignItems:'center'}}>
                            <AntDesign color='#09BBBA' name='folder1' size={18}/>
                        </View>
                        <Text>关于</Text>
                        <FontAwesome color="#B1B1B1" name='angle-right' size={24} style={{position:'absolute',right:15,}}/>
                    </View>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={()=>this.props.navigation.navigate('setup')}>
                    <View style={style.itemBoxSet}>
                        <View style={{width:20,height:20,marginRight:12,justifyContent:'center',alignItems:'center'}}>
                            <AntDesign color='#2294FA' name='setting' size={18}/>
                        </View>
                        <Text>设置</Text>
                        <FontAwesome color="#B1B1B1" name='angle-right' size={24} style={{position:'absolute',right:15,}}/>
                    </View>
                </TouchableOpacity> */}
            </View>
        )
    }
    refresh=()=>{
        this.getData()
    }


    getData=()=>{
        FetchManager.get('/app/acbuser/findUserById','', async (set) => {
            console.log(set)
            if(set.status==0){
                this.setState({
                    person:set.data
                })
            }
        })
    }
    onCancelUpdate = () => {
        // this.setState({ isModalUpdate: !this.state.isModalUpdate });
        this.props.navigation.navigate('checkUpdate')
    }
}
const style=StyleSheet.create({
    page:{
        height:'100%',
        backgroundColor:'rgb(246,246,246)'
    },
    itemBox:{
        borderBottomWidth:1,
        borderBottomColor:'#EBEBEB',
        height:49,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff',
        position:'relative',
        paddingLeft:15,
        paddingRight:15,
    },
    itemBoxLast:{
        borderBottomWidth:1,
        borderBottomColor:'#FFF',
        height:49,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff',
        position:'relative',
        paddingLeft:15,
        paddingRight:15,
    },
    itemBoxSet:{
        borderBottomWidth:1,
        borderBottomColor:'#EBEBEB',
        height:49,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff',
        position:'relative',
        paddingLeft:15,
        paddingRight:15,
        marginTop:15,
    },
})
export default HomeScreen