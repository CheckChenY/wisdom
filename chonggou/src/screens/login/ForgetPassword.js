import React, { Component } from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FetchManager from '../fetch/index';
import ModelPop from '../components/modelPop';
import { encryptionpwd,encryption,randomLenNum } from '../fetch/index';

import { Text, View,Image,TextInput,StyleSheet,TouchableOpacity } from "react-native";

class ForgetPassword extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center',color:'#fff',fontSize:18 }}>忘记密码</Text>
            ),
            headerRight:(
                <Text></Text>
            ),
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
            step:0,
            tip:'获取验证码',
            istiming:false,
            secureTextEntry:true,
            PassWord:'',
            seccode:'',
            TelPhone:'',
            popUp: '',
        }
    }
    render() {
        let eye=null
        if(this.state.secureTextEntry){
            eye=<Image source={require('../../img/xs.png')} style={{width:22,height:12}}/>
        }else{
            eye=<Image source={require('../../img/yc.png')} style={{width:20,height:10}}/>
        }
        return (
        <View style={styles.box}>
            <View>
                <View style={styles.inputIcon}>
                    <FontAwesome color="#3AA1FE" name="mobile-phone" size={25}/>
                </View>
                <TextInput placeholder='手机号/用户名' style={styles.inputStyle} onChangeText={(TelPhone) => this.setState({TelPhone})} value={this.state.TelPhone}></TextInput>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',position:'relative'}}>
                <View style={styles.inputIcon}>
                    <FontAwesome color="#3AA1FE" name="envelope" size={14}/>
                </View>
                <TextInput placeholder='验证码' style={styles.inputStyle} onChangeText={(seccode) => this.setState({seccode})} value={this.state.seccode}></TextInput>
                <View style={styles.codeBtn}>
                    <View style={{height:30,borderColor:'#788A93',borderWidth:1,borderRadius:3,paddingLeft:9,paddingRight:9,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'#788A93',fontSize:14}} onPress={()=>{this.getRandom()}}>{this.state.tip}{this.state.step==1?'秒':''}</Text>
                    </View>
                </View>
            </View>
            <View style={{position:'relative'}}>
                <View style={styles.inputIcon}>
                    <Ionicons color="#3AA1FE" name="ios-unlock" size={20}/>
                </View>
                <TouchableOpacity style={styles.eyeBtn} onPress={()=>{this.HideShowPassword()}}>
                    {eye}
                </TouchableOpacity>
                <TextInput placeholder='新密码' secureTextEntry = {this.state.secureTextEntry} style={styles.inputStyle} onChangeText={(PassWord) => this.setState({PassWord})} value={this.state.PassWord}></TextInput>
            </View>
            <View style={styles.loginbox}>
                <TouchableOpacity style={{height:'100%'}} onPress={()=>{this._ResetPassword()}}>
                    <View style={styles.btn}>
                        <Text style={{fontSize:18,color:'#fff'}}>重置密码</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
        </View>
        );
    }
    //隐藏显示密码
    HideShowPassword=()=>{
        this.setState({
            secureTextEntry:!this.state.secureTextEntry
        })
    }
    //开始倒计时
    getRandom=()=>{
        console.log('111')
        const { TelPhone } = this.state;
        if(TelPhone === ''){
            this.popUp.showPop('手机号码不能为空...')
            return 
        }
        if(!this.state.istiming){
            this.getTime()
        }
    }


    getTime = () => {
        var that=this
        const { TelPhone } = this.state;
        let obj = {
            phone:TelPhone
        }
        FetchManager.getCode('/auth/check-phone',obj, async (set) => {
            //下面的就是请求来的数据
            console.log(set)
            if(set.success){
                this.setState({
                    step:1,
                    tip:60,
                    istiming:true,
                    timer:setInterval(()=>{
                        that.setState({
                            tip:that.state.tip-1
                        })
                        if(that.state.tip === 0){
                            clearInterval(that.state.timer)
                            that.setState({
                                step:2,
                                tip:'重新验证',
                                istiming:false
                            })
                        }
                    },1000)
                })
            }else{
                this.popUp.showPop(set.msg)
                this.setState({
                    istiming:false
                })
            }
        }) 
    }

    _ResetPassword=()=>{
        const { TelPhone,PassWord,seccode } = this.state;
        if(TelPhone === '' || PassWord === '' || seccode === ''){
            this.popUp.showPop('请填写完整信息...')
            return false 
        }
        let objpass = {
            code: "5d2n",
            grant_type: "password",
            loginType: 1,
            password: PassWord,
            randomStr: randomLenNum(4,true),
            scope: "read+write",
            username: TelPhone,
        }
        let pawMd5 = encryption({
            data:objpass,
            type: 'Aes',
            key: 'jintelai12345678',
            param: ['password']
        })
        let obj = {
            phone:TelPhone,
            password:pawMd5.password,
            seccode:seccode,
        }
        console.log(JSON.stringify(obj))
        FetchManager.postLogin('/auth/changePassword',obj, async (set) => {
            //下面的就是请求来的数据
            console.log(set)
            if(set&&set.success){
                this.popUp.showPop('密码重置成功')
                setTimeout(()=>{
                    this.props.navigation.navigate('SignIn')
                },3000)
            }
        }) 
        // this.props.navigation.navigate('SignIn')
    }
}
const styles=StyleSheet.create({
    box:{
        paddingTop:10,
        paddingLeft:20,
        paddingRight:20
    },
    inputIcon: {
        marginTop:10,
        position:'absolute',
        left:5,
        height: 40,
        justifyContent:'center',
    },
    input:{
        borderBottomColor:'#ccc',
        borderBottomWidth:1
    },
    inputStyle: {
        marginTop:10,
        paddingLeft:24,
        color:'#666',
        borderBottomColor:'#EBEBEB',
        borderBottomWidth:2,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    eyeBtn: {
        marginTop:10,
        position:'absolute',
        right:5,
        height: 40,
        justifyContent: 'center',
        elevation:1000,
        zIndex:1000
    },
    codeBtn: {
        marginTop:10,
        width:100,
        height:40,
        justifyContent:'center',
        position:'absolute',
        right:7,
    },
    loginbox:{
        height:45,
        borderRadius:5,
        backgroundColor:'#3AA1FE',
        marginTop:40
    },
    btn:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
export default ForgetPassword;