import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Button, AsyncStorage } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FetchManager from '../fetch/index';


class MainScreens extends Component {
    static navigationOptions = ({ navigation }) => {
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
            <Text style={styles.headerMiddle}>个人信息</Text>
        ),
        headerRight:<View />,
        headerStyle: {backgroundColor: 'linear-gradient(-30deg,rgba(58,161,254,1) 0%,rgba(48,191,251,1) 100%)'}
        };
    }

    constructor(){
        super()
        this.state = {
            account:{}
        }
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

    render() {
        const { account } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.list}>
                    <Text style={styles.list_left}>
                        账号：
                    </Text>
                    <Text style={styles.list_right}>
                        {account.companyName}
                    </Text>
                </View>
                <View style={styles.list}>
                    <Text style={styles.list_left}>
                        姓名：
                    </Text>
                    <Text style={styles.list_right}>
                        {account.realName}
                    </Text>
                </View>
                <View style={styles.list}>
                    <Text style={styles.list_left}>
                        手机号/账号：
                    </Text>
                    <Text style={styles.list_right}>
                        {account.phone}
                    </Text>
                </View>
                <View style={styles.loginbox}>
                    <TouchableOpacity style={{height:'100%'}} onPress={()=>{this.editPass()}}>
                        <View style={styles.btn}>
                            <Text style={{fontSize:18,color:'#fff'}}>修改密码</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.loginbox}>
                    <TouchableOpacity style={{height:'100%'}} onPress={()=>{this._signOut()}}>
                        <View style={styles.btn}>
                            <Text style={{fontSize:18,color:'#fff'}}>退出</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    editPass=()=>{
        this.props.navigation.navigate('editPassword')
    }
    componentDidMount(){
        FetchManager.get('/auth/jtluser/getMyUserApp',{}, async (set) => {
            console.log(set)
            if(set.success){
                this.setState({
                    account:set.value
                })
            }
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
    list:{
        flexDirection:'row',
        paddingTop:10,
        paddingBottom:10,
        borderBottomWidth:1,
        borderBottomColor:'#ccc',
        marginTop:15
    },
    list_left:{
        fontSize:16,
        flex:1
    },
    list_right:{
        textAlign:"right",
        fontSize:14,
        flex:1,
        height:45,
        justifyContent:'center',
        paddingRight:25
    },
    btn:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    loginbox:{
        height:45,
        borderRadius:5,
        backgroundColor:'#3AA1FE',
        marginTop:25
    }
});

export default MainScreens