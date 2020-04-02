import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/Feather';
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, } from 'react-native';

class RegisterSuccess extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            header: null
        };
    };
    componentDidMount() {

    }

    render() {
        return (
            <View style={style.page}>
                <View style={{flexDirection:'row',justifyContent:'center',marginTop:138,}}>
                    <View style={{width:75,height:75,backgroundColor:'#2BD957',borderRadius:38,justifyContent:'center',alignItems:'center'}}>
                        <FontAwesome color="#fff" name="check" size={48}/>
                    </View>
                </View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:18,color:'#333',marginTop:11,fontWeight:'900'}}>注册成功</Text>
                </View>
                <TouchableOpacity onPress={this.goHome}>
                    <View style={{height:40,justifyContent:'center',alignItems:'center',backgroundColor:'#467cd4',borderRadius:5,marginTop:90}}>
                        <Text style={{fontSize:17,color:'#fff',}}>返回登陆</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    goHome=()=>{
        this.props.navigation.navigate('SignIn')
    }
}

var style = StyleSheet.create({
    page: {
        height: '100%',
        backgroundColor: 'rgb(246,246,246)',
        paddingLeft: 45,
        paddingRight: 45,
    }
})
export default RegisterSuccess