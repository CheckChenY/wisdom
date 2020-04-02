import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Text, View, TextInput, Button, StyleSheet,TouchableOpacity, } from 'react-native';
import ModelPop from '../components/modelPop';
import FetchManager from '../http/http'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            phone: '',
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
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, color: '#fff' }}>修改绑定手机号</Text>
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
                <View style={{justifyContent:'center',paddingLeft:10,paddingTop:10,}}>
                    <Text style={{fontSize:20,color:'#333',fontWeight:'900',}}>修改绑定手机号</Text>
                    <Text style={{fontSize:12,color:'#999',marginTop:5,}}>请输入您的新手机号进行绑定</Text>
                </View>
                <View style={{ height: 40, borderWidth: 1, borderColor: '#BABABC', borderRadius: 2, marginTop: 15 }}>
                    <TextInput
                        style={{ height: '100%', paddingLeft: 10, paddingRight: 10, }}
                        placeholder="请输入手机号"
                        onChangeText={(phone) => this.setState({ phone })}
                        value={this.state.phone}
                    />
                </View>
                <View style={{ height: 14, paddingLeft: 11, marginTop: 6, marginBottom: 16, }}>
                    <Text style={{ fontSize: 12, color: '#666', }}>建议使用常用手机号</Text>
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
                    {/* <TouchableOpacity style={{ height: 40, width: '25%', borderWidth:1,borderColor:'#918C8C', borderRadius: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#333', fontSize: 14, }}>获取验证码</Text>
                    </TouchableOpacity> */}
                </View>
                <TouchableOpacity>
                    <View style={{height:45,justifyContent:'center',alignItems:'center',backgroundColor:'#467cd4',borderRadius:5,marginTop:30}}>
                        <Text style={{fontSize:17,color:'#fff',}}>确认修改</Text>
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
export default Register