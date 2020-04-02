import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Text, View, TextInput, Button, StyleSheet,TouchableOpacity,AsyncStorage } from 'react-native';
import FetchManager from '../http/http'
import ModelPop from '../components/modelPop';
import { encryption } from '../http/http';

class EditPassword extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            code: '',
            newPassword: '',
            newPasswordAgain:'',
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
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, color: '#fff' }}>修改密码</Text>
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
                <View style={{ height: 40, borderWidth: 1, borderColor: '#BABABC', borderRadius: 2, marginTop: 5 }}>
                    <TextInput
                        style={{ height: '100%', paddingLeft: 10, paddingRight: 10,backgroundColor:'#fff', }}
                        placeholder="请输入手机号"
                        onChangeText={(username) => this.setState({ username })}
                        value={this.state.username}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:15,}}>
                    <View style={{ width: '70%', height: 40, }}>
                        <TextInput
                            style={{ height: '100%',borderWidth: 1, borderColor: '#BABABC',borderRadius: 2,backgroundColor:'red', paddingLeft: 10, paddingRight: 10,backgroundColor:'#fff', }}
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
                    {/* <View style={{ height: 40, width: '25%', backgroundColor: '#467cd4', borderRadius: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 14, }}>获取验证码</Text>
                    </View> */}
                </View>
                <View style={{ height: 40, borderWidth: 1, borderColor: '#BABABC', borderRadius: 2, marginTop: 15, }}>
                    <TextInput
                        style={{ height: '100%', paddingLeft: 10, paddingRight: 10,backgroundColor:'#fff', }}
                        placeholder="请输入密码（6-18位）"
                        onChangeText={(newPassword) => this.setState({ newPassword })}
                        value={this.state.newPassword}
                    />
                </View>
                <View style={{ height: 40, borderWidth: 1, borderColor: '#BABABC', borderRadius: 2, marginTop: 15, }}>
                    <TextInput
                        style={{ height: '100%', paddingLeft: 10, paddingRight: 10,backgroundColor:'#fff', }}
                        placeholder="再次输入密码"
                        onChangeText={(newPasswordAgain) => this.setState({ newPasswordAgain })}
                        value={this.state.newPasswordAgain}
                    />
                </View>
                <TouchableOpacity onPress={()=>{this.sureedit()}}>
                    <View style={{height:45,justifyContent:'center',alignItems:'center',backgroundColor:'#467cd4',borderRadius:5,marginTop:30}}>
                        <Text style={{fontSize:16,color:'#fff',}}>确认修改</Text>
                    </View>
                </TouchableOpacity>
                <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
            </View>
        )
    }
    sureedit=()=>{
        if(!this.state.username.trim()){
            this.popUp.showPop('请输入手机号')
            return
        }
        if(!this.state.code.trim()){
            this.popUp.showPop('请输入验证码')
            return
        }
        if(!this.state.newPassword.trim()){
            this.popUp.showPop('请输入新密码')
            return
        }
        if(!this.state.newPasswordAgain.trim()){
            this.popUp.showPop('请再次输入新密码')
            return
        }
        if(this.state.newPassword.trim()!=this.state.newPasswordAgain.trim()){
            this.popUp.showPop('两次输入密码不一致')
            return
        }
        let loginData = {
            scope:"read+write",
            grant_type:"password",
            password:this.state.newPassword,
        };

        let pawMd5 = encryption({
            data:loginData,
            type: 'Aes',
            key: 'jintelai12345678',
            param: ['password']
        })
        console.log(pawMd5.password)
        let params={
            username:this.state.username,
            code:this.state.code,
            newPassword:pawMd5.password
        }
        FetchManager.post('/app/acbuser/updatePassword',params, async (set) => {
            console.log(set)
            if(set.status==0){
                await AsyncStorage.clear();
                this.props.navigation.navigate('Auth')
            }else{
                this.popUp.showPop(set.msg)
            }
        })
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
        FetchManager.getCode('/acb/login/check-phone',params, async (set) => {
            console.log(set)
            if(set.status==0){
                this.returntime()
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
export default EditPassword