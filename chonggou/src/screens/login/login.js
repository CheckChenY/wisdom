import React,{ Component } from 'react';
import { View,Text,AsyncStorage,TextInput,Image,StyleSheet,Platform,
    TouchableOpacity,Alert,NativeModules
} from 'react-native'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FetchManager from '../fetch/index';
import { encryption,decryptionWithObjects,encryptFun,randomLenNum } from '../fetch/index';
import ModelPop from '../components/modelPop';
import Sound from 'react-native-sound';

import { date } from '../fetch/index';

class SignInScreen extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            header:null
        };
    };
    constructor(props){
        super(props)
        this.state={
            isRandom:false,
            step:0, //0未获取验证码  1，正在获取验证码  2，验证码过期重新验证
            tip:'获取验证码',
            timer:'',
            codeNub:'',
            code:'',
            istiming:false,
            TelPhone:'',
            PassWord:'',
            isHide:true,
            secureTextEntry:true,
            redomStr:'',
            loginData:{
                scope:"read+write",
                grant_type:"password",
            },
            deviceToken:'',
            popUp: '',
            status:1
        }
        
    }

    
    componentDidMount(){
        this.getCodeNub();
    }


    getCodeNub = () => {
        const { loginData } = this.state;
        let reddom = randomLenNum(4,true);
        // let reddom = '97071564446948834';
        // console.log(reddom)
        let obj = {
            randomStr:reddom
        }
        
        loginData['randomStr'] = reddom;
        

        FetchManager.getCode('/auth/phoneCode',obj, async (set) => {

            if(set&&set.data){
                this.setState({
                    urlCode:'data:image/jpg;base64,' + set.data,
                    redomStr:reddom
                })
            }
        })
    }

    onChangeStatus = () => {
        this.setState({
            status:this.state.status === 1 ? 2 : 1
        },this.getchange)
    }


    getchange = () => {
        const { status } = this.state;
        console.log(status)
     }




    render() {
        const { urlCode,isRandom,secureTextEntry } = this.state;
        let baseImg=`${urlCode}`;
        // console.log(baseImg)
        return (
            <View style={styles.body}>
                <View style={styles.logobox}>
                    <Image style={styles.logo} source={require('../../img/tx.png')}/>
                    <TouchableOpacity onPress={this.onChangeStatus}>
                        <Text style={{fontSize:17,fontWeight:'600',color:'#444'}}>消防卫士</Text> 
                    </TouchableOpacity>   
                </View>
                
                <View style={styles.inputbox}>
                    <View style={styles.inputIcon}>
                        <FontAwesome color="#3AA1FE" name="mobile-phone" size={25}/>
                    </View>
                    <TextInput placeholder='手机号/账号' style={styles.inputStyle} onChangeText={(TelPhone) => this.setState({TelPhone})} value={this.state.TelPhone}></TextInput>
                </View>
                {
                    isRandom ? (
                        <View style={{flexDirection:'row',justifyContent:'space-between',position:'relative'}}>
                            <View style={styles.inputIcon}>
                                <FontAwesome color="#3AA1FE" name="envelope" size={14} />
                            </View>
                            <TextInput placeholder='验证码' onChangeText={(codeNub) => this.setState({codeNub})} style={styles.inputStyle} value={this.state.codeNub}></TextInput>
                            <View style={styles.codeBtn}>
                                <View style={{height:30,borderColor:'#788A93',borderWidth:1,borderRadius:3,paddingLeft:9,paddingRight:9,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{color:'#788A93',fontSize:14}} onPress={()=>{this.getRandom()}}>{this.state.tip}{this.state.step==1?'秒':''}</Text>
                                </View>
                            </View>
                        </View>
                    ) : (
                        <View style={{position:'relative'}}>
                            <View style={styles.inputIcon}>
                                <Ionicons color="#3AA1FE" name="ios-unlock" size={20} />
                            </View>
                            <TouchableOpacity style={styles.eyeBtn} onPress={()=>{this.HideShowPassword()}}>
                                {
                                    secureTextEntry ? (
                                        <Image source={require('../../img/xs.png')} style={{width:22,height:12}}/>
                                    ) : (
                                        <Image source={require('../../img/yc.png')} style={{width:20,height:10}}/>
                                    )
                                }
                            </TouchableOpacity>
                            <TextInput placeholder='密码' secureTextEntry = {this.state.secureTextEntry} style={styles.inputStyle} onChangeText={(PassWord) => this.setState({PassWord})} value={this.state.PassWord}></TextInput>
                            
                            
                            <View style={{flexDirection:'row'}}>
                                <View style={{flex:1}}>
                                    <View style={styles.inputIcon}>
                                        <Ionicons color="#3AA1FE" name="ios-bug" size={20} />
                                    </View>
                                    <TextInput placeholder='验证码' 
                                    // secureTextEntry = {this.state.secureTextEntry} 
                                    style={styles.inputStyle} 
                                    onChangeText={(code) => this.setState({code})} 
                                    value={this.state.code}
                                    ></TextInput>
                                </View>
                                <View style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}>
                                    <TouchableOpacity onPress={this.getCodeNub} >
                                        <Image style={{width:100,height:40}} source={{uri:baseImg}}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                        </View>
                    )
                }
                <View style={styles.loginbox}>
                    <TouchableOpacity style={{height:'100%'}} onPress={()=>{this._signInAsync()}}>
                        <View style={styles.btn}>
                            <Text style={{fontSize:18,color:'#fff'}}>登录</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.tipbox}>
                    {
                        isRandom ? (
                            <View>
                                <Text style={{color:'#3AA1FE'}} onPress={()=>{this.ZhangmiLogin()}}>账号密码登录</Text>
                            </View>
                        ) : (
                            <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={{color:'#3AA1FE'}} onPress={()=>{this.RandomLogin()}}>手机动态码登录</Text>
                                <Text style={{color:'#3AA1FE'}} onPress={()=>{this.toForgetPassword()}}>忘记密码</Text>
                            </View>
                        )
                    }
                </View>
           
                <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
            </View>
        );
    }
    HideShowPassword=()=>{
        this.setState({
            secureTextEntry:!this.state.secureTextEntry
        })
    }
    //切换至验证码登录
    RandomLogin=()=>{
        this.setState({
            isRandom:true
        })
    }
    //切换至密码登录
    ZhangmiLogin=()=>{
        this.setState({
            isRandom:false,
            step:0,
            tip:'获取验证码',
            istiming:false
        })
        clearInterval(this.state.timer)
    }
    //开始倒计时
    getRandom=()=>{
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
            phone:TelPhone,
            // loginType:2
        }
        // console.log('tokentokentokentokentokentokentoken' + this.state.TelPhone);
        // debugger
        FetchManager.getCode('/auth/check-phone',obj, async (set) => {
            //下面的就是请求来的数据
            console.log(set);
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

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        const { loginData,PassWord,TelPhone,isRandom,codeNub,code } = this.state;
        // debugger;
        // console.log(codeNub);
        let nub = isRandom ? 2 : 1;

        if(TelPhone === ''){
            this.popUp.showPop('用户名不能为空......')
            return false 
        }
        if(!isRandom){
            if(PassWord === ''){
                this.popUp.showPop('密码不能为空......')
                return false
            }
            if(code === ''){
                this.popUp.showPop('校验码不能为空......')
                return false
            }
        }else{
            if(codeNub === ''){
                this.popUp.showPop('验证码不能为空......')
                return false
            } 
        }
        // console.log(PassWord)
        // debugger;
        if(isRandom){
            delete loginData.password;
            delete loginData.username;
            loginData['seccode']= codeNub;
            loginData['phone']= TelPhone;
            loginData['username']= TelPhone;
            loginData['client']= 'phone';
        }else{
            delete loginData.seccode;
            delete loginData.phone;
            loginData['password']= PassWord;
            loginData['username']= TelPhone;
            loginData['code']= code;
            loginData['client']= 'phone';
        }

        // let str = url.password.replace(/+/g) ? url.replace(/+/g,'%2b') : url
        // console.log(unitUrl + str + '/////////////////')



        loginData['loginType'] = nub;
        
        console.log(loginData);

        let pawMd5 = encryption({
            data:loginData,
            type: 'Aes',
            key: 'jintelai12345678',
            param: ['password']
        })
        
        console.log(pawMd5)
        FetchManager.postLogin('/auth/oauth/token',pawMd5, async (set) => {
            //下面的就是请求来的数据
            console.log(set);
            // if(set.error_description){
            //     this.popUp.showPop(set.error_description)
            //     return false
            // }else if(set.msg){
            //     this.popUp.showPop(set.msg)
            //     this.getCodeNub()
            //     return false
            // }
            if(set.access_token){
                let pas = pawMd5.password;
                // console.log(pas)
                // debugger;
                await AsyncStorage.setItem('access_token', set.access_token);
                // await AsyncStorage.setItem('refresh_token', set.refresh_token);
                await AsyncStorage.setItem('password', pas);
                await AsyncStorage.setItem('userName',TelPhone);
                // debugger;
                // this.getUserInfo(set,nub)

                this.getLocationToken()
                this.props.navigation.navigate('App');
                await AsyncStorage.setItem('userToken', 'abc');
            } else {
                this.getCodeNub();
                this.popUp.showPop(set.msg ? set.msg : set.error_description)
                return false
            }
        })  
    }

    // getUserInfo = async (obj,nub) => {
        
    //     const { isRandom,status } = this.state;
    //     // debugger
    //     // let accessToken = obj.access_token;
    //     FetchManager.get('1/user/info','', async (set) => {
    //         //下面的就是请求来的数据
    //         console.log(set);
    //         // debugger;
    //         if(set&&set.data){

    //             // debugger;
    //             if( nub === 2 ){
    //                 this.popUp.showPop(set.data ? set.data : '非法操作...')
    //             }
    //             if(set.data.sysUser.userType === '1' || set.data.sysUser.userType === '5'){
    //                 if(status === 2){
    //                     await AsyncStorage.setItem('userToken', 'abcd');
    //                     this.props.navigation.navigate('Manger');
    //                 }else{
    //                     // console.log('登录成功')
    //                     this.loginSuccess()
    //                     await AsyncStorage.setItem('userToken', 'abc');
    //                     this.props.navigation.navigate('App');
    //                 }
                    
    //             }else{
    //                 this.popUp.showPop('无权限登录')
    //             }
    //         }
    //     }) 
    // }

    // loginSuccess=()=>{
    //     this.getLocationToken()
    // }

    getLocationToken = async () => {
        console.log('开始检查token是否存在')
        let tkn = await AsyncStorage.getItem('deviceToken');
        console.log(tkn)
        if(tkn){
            return false
        }

        NativeModules.UMPushModule.getDeviceToken(res => {
            console.log(res)
            return AsyncStorage.setItem('deviceToken', res)
        })

        console.log('给友盟发送deviceToken')
        let userName = await AsyncStorage.getItem('userName');
        let deviceToken = await AsyncStorage.getItem('deviceToken');
        let obj = {
            deviceToken:deviceToken,
            userName:userName,
        }
        console.log(obj);

        FetchManager.get('/auth/um/init',obj, async (set) => {
            //下面的就是请求来的数据
            console.log(set);
        })
    }

    //忘记密码
    toForgetPassword=()=>{
        this.props.navigation.navigate('ForgetPassword')
    }
}


const styles = StyleSheet.create({
    body:{
        flex:1,
        paddingTop:70,
        paddingLeft:20,
        paddingRight:20
    },
    logobox:{
        height:50,
        justifyContent:'center',
        alignItems:'center'
    },
    inputIcon: {
        marginTop:10,
        position:'absolute',
        left:5,
        height: 40,
        justifyContent:'center',
    },
    inputbox:{
        marginTop:40,
        position:'relative',
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
        marginTop:25
    },
    btn:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    logo:{
        width: 74, 
        height: 74,
        borderRadius:5
    },
    tipbox:{
        marginTop:20
    }
})
export default SignInScreen;


