import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FetchManager from '../../http/http'
import ModelPop from '../../components/modelPop';
import { encryption } from '../../http/http';
import { Text, View, TextInput, Button, StyleSheet,TouchableOpacity, } from 'react-native';

class EditUserPassword extends Component {
    constructor() {
        super()
        this.state = {
            popUp: '',
            userName:'',
            password:'',
            name:''
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
        this.setState({
            userName:this.props.navigation.state.params.userName,
            name:this.props.navigation.state.params.name,
        })
    }

    render() {
        return (
            <View style={style.page}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                    <View style={{ width: '20%' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>手机号：</Text>
                        </View>
                    </View>
                    <View style={{ width: '78%' }}>
                        <Text style={{color: '#333', fontSize: 15,}}>{this.state.userName}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                    <View style={{ width: '20%' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>用户名：</Text>
                        </View>
                    </View>
                    <View style={{ width: '78%' }}>
                        <TextInput
                            placeholder="输入用户名"
                            style={style.input_box}
                            onChangeText={(name) => this.setState({ name })}
                            value={this.state.name}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                    <View style={{ width: '20%' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>新密码：</Text>
                        </View>
                    </View>
                    <View style={{ width: '78%' }}>
                        <TextInput
                            placeholder="输入密码"
                            style={style.input_box}
                            onChangeText={(password) => this.setState({ password })}
                            value={this.state.password}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={()=>{this.sureedit()}} style={{height:45,backgroundColor:'#467cd4',justifyContent:'center',alignItems:'center',position:'absolute',bottom:0,left:0,right:0,}}>
                    <Text style={{fontSize:16,color:'#fff',}}>确定</Text>
                </TouchableOpacity>
                <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
            </View>
        )
    }
    sureedit=()=>{
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
            password:pawMd5.password,
            name:this.state.name,
            userName:this.state.userName
        }
        console.log(params)
        FetchManager.post('/app/acbuser/updateChildrenUser',params, async (set) => {
            console.log(set)
            if(set.status==0){
                this.props.navigation.state.params.refresh(this.state.name)
                this.props.navigation.goBack()
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
    },
    input_box: {
        borderWidth: 1,
        borderColor: '#BABABC',
        height: 40,
        padding: 0,
        borderRadius: 3,
        fontSize: 14,
        paddingLeft: 10,
        color: '#999',
        backgroundColor: '#fff'
    }
})
export default EditUserPassword