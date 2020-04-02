import React, { Component } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, AsyncStorage, ImageBackground, NativeModules, Image } from 'react-native';
import Input from '../components/login/input';
import { Button } from 'react-native-elements';
import ModelPop from '../components/modelPop';
import FetchManager from './../http/http'
import { encryption } from '../http/http';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class input extends Component {

    static navigationOptions = {
        Header: null
    }

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            code: '',
            loginType: '3',
            lad: false,
            // deviceToken:'',
            userid: '',
        };
    }
    render() {
        const { lad } = this.state;
        return (
            <ScrollView>
                <ImageBackground source={require('../img/sign/dl.png')} style={{ width: '100%', height: 264 }} ></ImageBackground>
                <View style={{ margin: 10 }}>
                    <Text style={{ textAlign: 'center', fontSize: 20 }}>
                        智慧用电
                    </Text>
                </View>
                <View style={{ margin: 10 }}>
                    <KeyboardAvoidingView>
                        <View style={styles.container}>
                            <Input label="mobile-phone" required size={30} value={this.state.username} placeholder="手机号/用户名"
                                onChangeText={(text) => {
                                    this.setState({ username: text });
                                }} />
                            <Input label="lock" required 
                                size={25} placeholder="密码" 
                                secureTextEntry={true}
                                value={this.state.password} 
                                onChangeText={(text) => {
                                    this.setState({ password: text });
                                }} />
                        </View>
                    </KeyboardAvoidingView>
                    <View style={{ marginTop: 40 }}>
                        <View>
                            {
                                lad ? (
                                    <Button
                                        title="登录"
                                        buttonStyle={{ backgroundColor: '#467cd4' }}
                                        onPress={this._signInAsync}
                                        loading
                                    />
                                ) : (
                                        <Button
                                            title="登录"
                                            buttonStyle={{ backgroundColor: '#467cd4' }}
                                            onPress={this._signInAsync}
                                        />
                                    )
                            }
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 14, color: '#3AA1FE' }} onPress={() => { this.register() }}>注册账号</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 14, color: '#3AA1FE', textAlign: 'right' }} onPress={() => { this.forgetpas() }}>忘记密码</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <ModelPop ref={ref => this.popUp = ref}></ModelPop>
            </ScrollView>
        );
    }

    register = () => {
        this.props.navigation.navigate('registerScreen')
    }
    forgetpas = () => {
        this.props.navigation.navigate('forgetpassword')
    }

    _signInAsync = async () => {


        if (!this.state.username.trim()) {
            this.popUp.showPop('请输入手机号/用户名')
            return
        }
        if (!this.state.password.trim()) {
            this.popUp.showPop('请输入密码')
            return
        }
        this.setState({
            lad: !this.state.lad
        })
        let loginData = {
            scope: "read+write",
            grant_type: "password",
            password: this.state.password,
        };

        let pawMd5 = encryption({
            data: loginData,
            type: 'Aes',
            key: 'jintelai12345678',
            param: ['password']
        })
        console.log(pawMd5.password)


        let params = {
            loginType: this.state.loginType,
            password: pawMd5.password,
            username: this.state.username,
        }

        console.log(params)
        FetchManager.post_noauth('/acb/login/login', params, async (set) => {
            console.log(set)
            if (set.status == 0) {
                await AsyncStorage.setItem('accessToken', set.data);
                await AsyncStorage.setItem('username', this.state.username);
                await AsyncStorage.setItem('loginType', this.state.loginType);
                this.props.navigation.navigate('App')
                this.getLocationToken()
                this.initSetting()
            } else {
                this.popUp.showPop(set.msg)
                this.setState({
                    lad: !this.state.lad
                })
            }
        })
    }
    //设置新消息通知及声音
    initSetting = async () => {
        console.log('111111111')
        // AsyncStorage.removeItem('voice')
        AsyncStorage.setItem('voice', 'true')
        // AsyncStorage.removeItem('message')
        AsyncStorage.setItem('message', 'true')
    }

    getLocationToken = () => {
        NativeModules.UMPushModule.getDeviceToken(res => {
            console.log('哇哇哇哇deviceToken')
            console.log(res)
            this.getUserId(res)
            AsyncStorage.removeItem('deviceToken')
            AsyncStorage.setItem('deviceToken', res)
        })
    }

    getUserId = (deviceToken) => {
        console.log('getUserId')
        FetchManager.get('/app/acbuser/findUserById', '', async (set) => {
            console.log(set)
            if (set.status === 0) {
                this.setInit(set.data.id, deviceToken)
            }
        })
    }


    setInit = (userId, deviceToken) => {
        let obj = {
            deviceToken: deviceToken,
            userId: userId
        }
        console.log(obj);
        FetchManager.get('/app/umeng/init', obj, async (set) => {
            console.log(set)
            // this.setLocationData()
        })
    }

    // setLocationData = async () => {
    //     const { deviceToken } = this.state;
    //     console.log(deviceToken)
    //     await AsyncStorage.setItem('deviceToken',deviceToken)
    // }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});