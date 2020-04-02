import React, { Component } from 'react';
import CameraComponent from './../components/camera';
import { View, Text,StyleSheet,TouchableOpacity,AsyncStorage,Image, } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FetchManager from './../http/http'
import ModelPop from '../components/modelPop';

class PersonInfo extends Component {
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
            <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, color: '#fff' }}>个人信息</Text>
        ),
        headerRight:<Text style={{color:'#fff',marginRight:15}}></Text>,
        headerStyle: {backgroundColor: '#467cd4'}
        };
    }

    constructor(){
        super()
        this.state = {
            imgBase:'',
            popUp:'',
            person:{}
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{paddingLeft:15,paddingRight:33,backgroundColor:'#fff',height:45,borderBottomColor:'#EBEBEB',borderBottomWidth:1,marginTop:15,flexDirection:'row',justifyContent:'space-between',alignItems:'center',position:'relative',}}>
                    <Text style={{fontSize:15,color:'#333',}}>头像</Text>
                    <View style={{width:34,height:34,borderRadius:17,backgroundColor:'lightblue',}}>
                        <CameraComponent  getImgBase={this.getImgBase} uri={this.state.avatar} style={{width:34,height:34,borderRadius:17,backgroundColor:'lightblue',}}></CameraComponent>
                    </View>
                    <FontAwesome color="#B1B1B1" name='angle-right' size={24} style={{position:'absolute',right:15,top:9,}}/>
                </View>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('editusername',{refresh:()=>{this.refresh()}})} style={{paddingLeft:15,paddingRight:33,backgroundColor:'#fff',height:45,borderBottomColor:'#EBEBEB',borderBottomWidth:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',position:'relative',}}>
                    <Text style={{fontSize:15,color:'#333',}}>用户名</Text>
                    <Text style={{fontSize:14,color:'#999',}}>{this.state.person.name}</Text>
                    <FontAwesome color="#B1B1B1" name='angle-right' size={24} style={{position:'absolute',right:15,top:9,}}/>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={()=>this.props.navigation.navigate('editphone')} style={{paddingLeft:15,paddingRight:33,backgroundColor:'#fff',height:45,borderBottomColor:'#EBEBEB',borderBottomWidth:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',position:'relative',}}>
                    <Text style={{fontSize:15,color:'#333',}}>手机</Text>
                    <Text style={{fontSize:14,color:'#999',}}>18595838670</Text>
                    <FontAwesome color="#B1B1B1" name='angle-right' size={24} style={{position:'absolute',right:15,top:9,}}/>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('editpassword')} style={{paddingLeft:15,paddingRight:33,backgroundColor:'#fff',height:45,flexDirection:'row',justifyContent:'space-between',alignItems:'center',position:'relative',}}>
                    <Text style={{fontSize:15,color:'#333',}}>修改密码</Text>
                    <FontAwesome color="#B1B1B1" name='angle-right' size={24} style={{position:'absolute',right:15,top:9,}}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>this.onSignOut()}
                    style={{backgroundColor:'#fff',height:45,justifyContent:'center',alignItems:'center',marginTop:70,}}>
                    <Text style={{fontSize:16,color:'#FC4A2C',}}>退出登录</Text>
                </TouchableOpacity>
                <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
            </View>
        );
    }
    componentDidMount(){
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
    refresh=()=>{
        this.getData()
    }
    onSignOut = async() => {
        let accessToken = await AsyncStorage.getItem('accessToken');
        let username = await AsyncStorage.getItem('username');
        let loginType = await AsyncStorage.getItem('loginType');
        // let userid = await AsyncStorage.getItem('userid');
        let deviceToken = await AsyncStorage.getItem('deviceToken');
        let params={
            username:username,
            accessToken:accessToken,
            loginType:loginType,
        }
        let obj = {
            // userid:userid,
            deviceToken:deviceToken
        }

        console.log(obj)
        console.log(params)

        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth')
        // debugger;
        FetchManager.get('/app/umeng/destory',obj, async (set) => {
            console.log(set)
            this.signOutUmeng(params)
        })
    }
    
    signOutUmeng = (params) => {
        FetchManager.post('/acb/login/logout',params, async (set) => {
            console.log(set)
            await AsyncStorage.clear();
            this.props.navigation.navigate('Auth')
        })

    }


    getImgBase = (val) => {
        if(val){
            this.setState({
                imgBase:'data:image/jpg;base64,' + val
            });
            let params={
                avatar:this.state.imgBase
            }
            console.log(this.state.imgBase)
            FetchManager.post('/app/acbuser/updateUserImg',params, async (set) => {
                console.log(set)
                if(set.status==0){
                    this.popUp.showPop('修改成功')
                }
            })
        }
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgb(246,246,246)',
        height:'100%',
    },
});

export default PersonInfo