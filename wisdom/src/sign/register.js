import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FetchManager from './../http/http'
import ModelPop from '../components/modelPop';
import { encryption } from '../http/http';
import { Text, View, TextInput, Button, StyleSheet,TouchableOpacity, } from 'react-native';

class Register extends Component {
    constructor() {
        super()
        this.state = {
            name:'',
            password:'',
            code: '',
            username: '',
            getcodeing:false,
            time:60,
            getcodetext:'获取验证码',
            popUp: '',
        }
    }
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerLeft:(
                <TouchableOpacity onPress={()=>navigation.goBack()} style={{paddingRight:15,}}>
                    <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                        <FontAwesome color="#fff" name="angle-left" size={28}/>
                    </View>
                </TouchableOpacity>
            ),
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, color: '#fff' }}>注册</Text>
            ),
            headerRight: <View />,
            headerStyle: {
                backgroundColor: '#467cd4',
            }
        };
    };
    componentDidMount() {

    }

    render() {
        return (
            <View style={style.page}>
                <View style={{ height: 37, marginTop: 5, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 37, height: 37, borderRadius: 19, backgroundColor: '#7DC0FC',justifyContent:'center',alignItems:'center', }}>
                            <AntDesign color="#fff" name="user" size={24}/>
                        </View>
                        <Text style={{ color: '#999', fontSize: 17, marginLeft: 10 }}>欢迎注册</Text>
                    </View>
                </View>
                <View style={{ height: 40, borderWidth: 1, borderColor: '#BABABC', borderRadius: 2, marginTop: 15 }}>
                    <TextInput
                        style={{ height: '100%', paddingLeft: 10, paddingRight: 10, }}
                        placeholder="请输入手机号"
                        onChangeText={(username) => this.setState({ username })}
                        value={this.state.username}
                    />
                </View>
                <View style={{ height: 14, paddingLeft: 11, marginTop: 6, marginBottom: 16, }}>
                    <Text style={{ fontSize: 14, color: '#666', }}>建议使用常用手机号</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: '70%', height: 40, borderWidth: 1, borderColor: '#BABABC', borderRadius: 2 }}>
                        <TextInput
                            style={{ height: '100%', paddingLeft: 10, paddingRight: 10, }}
                            placeholder="请输入验证码"
                            onChangeText={(code) => this.setState({ code })}
                            value={this.state.code}
                        />
                    </View>
                    {
                        this.state.getcodeing?(
                            <View style={{ height: 40, width: '25%', backgroundColor: '#467cd4', borderRadius: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#fff', fontSize: 14, }}>{this.state.time}秒</Text>
                            </View>
                        ):(
                            <TouchableOpacity onPress={()=>this.getCode()} style={{ height: 40, width: '25%', backgroundColor: '#467cd4', borderRadius: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#fff', fontSize: 14, }}>{this.state.getcodetext}</Text>
                            </TouchableOpacity>
                        )
                    }
                    
                </View>
                <View style={{ height: 40, borderWidth: 1, borderColor: '#BABABC', borderRadius: 2, marginTop: 15, }}>
                    <TextInput
                        style={{ height: '100%', paddingLeft: 10, paddingRight: 10, }}
                        placeholder="请设置用户名"
                        onChangeText={(name) => this.setState({ name })}
                        value={this.state.name}
                    />
                </View>
                <View style={{ height: 40, borderWidth: 1, borderColor: '#BABABC', borderRadius: 2, marginTop: 15, }}>
                    <TextInput
                        style={{ height: '100%', paddingLeft: 10, paddingRight: 10, }}
                        placeholder="请设置密码"
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                    />
                </View>
                <TouchableOpacity onPress={()=>{this.register()}}>
                    <View style={{height:40,justifyContent:'center',alignItems:'center',backgroundColor:'#467cd4',borderRadius:5,marginTop:60}}>
                        <Text style={{fontSize:17,color:'#fff',}}>注册</Text>
                    </View>
                </TouchableOpacity>
                <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
            </View>
        )
    }
    returntime=()=>{
        this.setState({
            getcodeing:true,
        })
        var timer=setInterval(()=>{
            this.setState({
                time:this.state.time-1
            })
            if(this.state.time<0){
                clearInterval(timer)
                this.setState({
                    getcodeing:false,
                    getcodetext:'重新获取',
                    time:60,
                })
            }
        },1000)
    }
    getCode=()=>{
        if(!this.state.username.trim()){
            this.popUp.showPop('请输入手机号')
            return
        }
        var params={
            username:this.state.username,
        }
        console.log(params)
        FetchManager.getCode('/acb/login/check-phoneBysign',params, async (set) => {
            console.log(set)
            if(set.status==0){
                this.returntime()
            }
        })
    }
    register=()=>{


        if(!this.state.username.trim()){
            this.popUp.showPop('请输入手机号')
            return
        }
        if(!this.state.code.trim()){
            this.popUp.showPop('请输入验证码')
            return
        }
        if(!this.state.name.trim()){
            this.popUp.showPop('请输入用户名')
            return
        }
        if(!this.state.password.trim()){
            this.popUp.showPop('请输入密码')
            return
        }
        
        let loginData = {
            scope:"read+write",
            grant_type:"password",
            password:this.state.password,
        };

        let pawMd5 = encryption({
            data:loginData,
            type: 'Aes',
            key: 'jintelai12345678',
            param: ['password']
        })
        console.log(pawMd5.password)

        let params={
            code:this.state.code,
            password:pawMd5.password,
            name:this.state.name,
            username:this.state.username
        }
        console.log(params)
        FetchManager.post_noauth('/app/acbuser/saveUser',params, async (set) => {
            if(set.status==0){
                this.props.navigation.navigate('registerSuccess')
            }else{
                this.popUp.showPop(set.msg)
            }
        })
    }
}

var style = StyleSheet.create({
    page: {
        height: '100%',
        backgroundColor: 'rgb(246,246,246)',
        padding: 15,
    }
})
export default Register