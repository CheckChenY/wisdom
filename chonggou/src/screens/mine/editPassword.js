import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,TextInput,Button,AsyncStorage } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FetchManager from '../fetch/index';
import Modal from "react-native-modal";
import { encryptionpwd,encryption,randomLenNum } from '../fetch/index';

class mineScreens extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
        headerLeft: (
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <View style={{flexDirection: 'row',paddingLeft:15, alignItems: 'center'}}>
                    <FontAwesome color="#fff" name="angle-left" size={28}/>
                    <Text style={{color:'#fff', fontSize: 16, paddingLeft:5}}>返回</Text>
                </View>
            </TouchableOpacity>
        ),
        headerTitle: (
            <Text style={styles.headerMiddle}>修改密码</Text>
        ),
        headerRight:<TouchableOpacity onPress={()=>navigation.state.params.navigatePress()}>
            <Text style={{color:'#fff',marginRight:15,fontSize:16}}>提交</Text>
        </TouchableOpacity>,
        headerStyle: {backgroundColor: 'linear-gradient(-30deg,rgba(58,161,254,1) 0%,rgba(48,191,251,1) 100%)'}
        };
    }

    constructor(){
        super()
        this.state = {
            password:'',
            newPassword:'',
            isModalVisiblePassTip:false,
            tipContent:'',
            userName:''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal 
                    isVisible={this.state.isModalVisiblePassTip}
                >
                    <View style={{ flex: 1}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
                            <View style={{flexDirection:"column",width:'80%',backgroundColor:"#FFFFFF",padding:5,borderRadius:3}}>
                                <Text style={{fontWeight:"900",fontSize:18,textAlign:'center',paddingTop:10,paddingBottom:5}}>密码提示</Text>
                                <View style={{paddingLeft:33,paddingRight:33,paddingBottom:25}}>
                                    <Text style={{fontSize:15,paddingTop:5,color:"#666666"}}>{this.state.tipContent}</Text>
                                </View>
                                <View style={{width:'100%',flexDirection:"row",justifyContent:'space-around',borderTopColor:'#EBEBEB',borderTopWidth:1,paddingTop:12,paddingBottom:10}}>
                                    <View style={{backgroundColor:'#3AA1FE',borderRadius:3,width:84,height:37,justifyContent:'center',alignItems:'center'}}>
                                        <TouchableOpacity onPress={this.getKnow}>
                                            <Text style={{textAlign:"center",color:"#ffffff"}}>确定</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{backgroundColor:'#cccccc',borderRadius:3,padding:3,width:84,height:37,justifyContent:'center',alignItems:'center'}}>
                                        <TouchableOpacity onPress={this.noSetPass}>
                                            <Text style={{textAlign:"center",color:"#ffffff"}}>取消</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={{flexDirection:'row',alignItems:"center",borderBottomWidth:1,borderBottomColor:'#EBEBEB',paddingBottom:20,paddingTop:20}}>
                    <View style={{width:50,alignItems:'center'}}>
                        <FontAwesome color="#3AA1FE" name="lock" size={28}/>
                    </View>
                    <View style={{flex:1}}>
                        <TextInput 
                            style={{paddingVertical: 0,borderWidth:0}}
                            placeholder={'请输入原密码'}
                            onChangeText={(password)=>this.setState({password})}
                            value={this.state.password}
                        />
                    </View>
                </View>
                
                <View style={{flexDirection:'row',alignItems:"center",borderBottomWidth:1,borderBottomColor:'#EBEBEB',paddingBottom:20,paddingTop:20}}>
                    <View style={{width:50,alignItems:'center'}}>
                        <FontAwesome color="#3AA1FE" name="lock" size={28}/>
                    </View>
                    <View style={{flex:1}}>
                        <View style={{flexDirection:"row"}}>
                            <TextInput 
                                style={{paddingVertical: 0,borderWidth:0,flex:1}}
                                placeholder={'请输入新密码'}
                                onChangeText={(newPassword)=>this.setState({newPassword})}
                                value={this.state.newPassword}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    getKnow=()=>{
        this.setState({
            isModalVisiblePassTip:false,
            password:'',
            newPassword:''
        },this._signOut)
    }
    noSetPass=()=>{
        this.setState({
            isModalVisiblePassTip:false,
            password:'',
            newPassword:''
        })
    }
    onPressToChangPwd=()=>{
        const { password,newPassword,userName } = this.state;
        let objold = {
            code: "5d2n",
            grant_type: "password",
            loginType: 1,
            password: password,
            randomStr: randomLenNum(4,true),
            scope: "read+write",
            username: userName,
        }

        
        let objnew = {
            grant_type: "password",
            loginType: 1,
            password: newPassword,
            randomStr: randomLenNum(4,true),
            scope: "read+write",
            username: userName,
        }

        let pawMd5old = encryption({
            data:objold,
            type: 'Aes',
            key: 'jintelai12345678',
            param: ['password']
        })

        let pawMd5new = encryption({
            data:objnew,
            type: 'Aes',
            key: 'jintelai12345678',
            param: ['password']
        })
        let params={
            oldPassword:pawMd5old.password,
            newPassword:pawMd5new.password
        }
        console.log(params)
        FetchManager.post('/auth/changePasswordApp',params, async (set) => {
            console.log(set)
            if(set.success){
                this.setState({
                    isModalVisiblePassTip:true,
                    tipContent:'修改成功',
                })
            }else{
                this.setState({
                    isModalVisiblePassTip:true,
                    tipContent:set.errorMsg,
                })
            }
        })
    }


    _signOut = async () => {

        let userName = await AsyncStorage.getItem('userName');
        let deviceToken = await AsyncStorage.getItem('deviceToken');
        let password = await AsyncStorage.getItem('password');//获取密码

        let obj = {
            userName:userName,
            deviceToken:deviceToken,
            password:password
        }
        console.log(obj)
        FetchManager.get('/auth/um/destory',obj, async (set) => {
            console.log(set)
            await AsyncStorage.clear();
            this.props.navigation.navigate('SignIn');
        })

    }

    componentDidMount(){
        this.props.navigation.setParams({navigatePress:this.onPressToChangPwd})
        this.getUserName();
    }

    getUserName = async () => {
        let userName = AsyncStorage.getItem('userName')

        this.setState({
            userName:userName
        })
    }
}

const styles = StyleSheet.create({
    container:{
        padding:10
    },  
    headerMiddle: {
        color: "rgba(255,255,255,1)",
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
        textAlign: 'center',
    },
    getCode:{
        width:90,
        position:'absolute',
        top:20,
        right:10
    }
});

export default mineScreens