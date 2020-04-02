import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,AsyncStorage,Image, } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FetchManager from '../../http/http'

class UserDetail extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
        headerLeft: (
            <TouchableOpacity onPress={()=>{navigation.state.params.refresh();navigation.goBack();}} style={{paddingRight:15,}}>
                <View style={{flexDirection: 'row',paddingLeft:15, alignItems: 'center'}}>
                    <FontAwesome color="#fff" name="angle-left" size={28}/>
                </View>
            </TouchableOpacity>
        ),
        headerTitle: (
            <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, color: '#fff' }}>用户详情</Text>
        ),
        headerRight:<Text style={{color:'#fff',marginRight:15}}></Text>,
        headerStyle: {backgroundColor: '#467cd4'}
        };
    }

    constructor(){
        super()
        this.state = {
            name:'',
            userName:''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{height:10,}}></View>
                <View style={{paddingLeft:15,paddingRight:33,backgroundColor:'#fff',height:45,borderBottomColor:'#EBEBEB',borderBottomWidth:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',position:'relative',}}>
                    <Text style={{fontSize:15,color:'#333',}}>用户名</Text>
                    <Text style={{fontSize:14,color:'#999',}}>{this.state.name}</Text>
                </View>
                <View style={{paddingLeft:15,paddingRight:33,backgroundColor:'#fff',height:45,borderBottomColor:'#EBEBEB',borderBottomWidth:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',position:'relative',}}>
                    <Text style={{fontSize:15,color:'#333',}}>手机号</Text>
                    <Text style={{fontSize:14,color:'#999',}}>{this.state.userName}</Text>
                </View>
                {/* <TouchableOpacity onPress={()=>this.props.navigation.navigate('edituserpassword')} style={{paddingLeft:15,paddingRight:33,backgroundColor:'#fff',height:45,flexDirection:'row',justifyContent:'space-between',alignItems:'center',position:'relative',}}>
                    <Text style={{fontSize:15,color:'#333',}}>修改密码</Text>
                    <FontAwesome color="#B1B1B1" name='angle-right' size={24} style={{position:'absolute',right:15,top:9,}}/>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={()=>{this.edit()}} style={{height:45,backgroundColor:'#467cd4',justifyContent:'center',alignItems:'center',position:'absolute',bottom:0,left:0,right:0,}}>
                    <Text style={{fontSize:16,color:'#fff',}}>修改</Text>
                </TouchableOpacity>
            </View>
        );
    }
    componentDidMount(){
        this.setState({
            name:this.props.navigation.state.params.item.name,
            userName:this.props.navigation.state.params.item.userName,
        })
    }
    refresh=(name)=>{
        console.log('修改后的用户名')
        console.log(name)
        this.setState({
            name:name
        })
    }
    edit=()=>{
        this.props.navigation.navigate('edituserpassword',{
            userName:this.state.userName,
            name:this.state.name,
            refresh:(name)=>{this.refresh(name)}
        })
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgb(246,246,246)',
        height:'100%',
    },
});

export default UserDetail