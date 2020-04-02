import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectSingle from './../../components/select/selectSingle';
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, } from 'react-native';

class SharePerson extends Component {
    constructor() {
        super()
        this.state = {
            code:'',
            joinTypeList:['WIFI','RS485'],
            defaultJointype:'请选择',
        }
    }
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerLeft:(
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                        <FontAwesome color="#fff" name="angle-left" size={28}/>
                    </View>
                </TouchableOpacity>
            ),
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, color: '#fff' }}>共享人员</Text>
            ),
            headerRight: <View/>,
            headerStyle: {
                backgroundColor: '#467cd4',
            }
        };
    };
    componentDidMount() {

    }

    render() { 
        const person =this.props.navigation.state.params.person
        return (
            <View style={style.page}>
                <View style={{flexDirection:'row',paddingLeft:15,paddingRight:15,backgroundColor:'#fff',}}>
                    <View style={{width:'20%',height:80,justifyContent:'center',alignItems:'center',}}>
                        <View style={{width:50,height:50,borderRadius:25,backgroundColor:'blue',}}></View>
                    </View>
                    <View style={{justifyContent:'center'}}>
                        <Text style={{fontSize:16,color:'#333',}}>{person.name}</Text>
                        <Text style={{fontSize:14,color:'#888',marginTop:5,}}>用户名：{person.tag}</Text>
                        <Text style={{fontSize:14,color:'#888',}}>手机号：{person.phone}</Text>
                    </View>
                </View>
            </View>
        )
    }
    onChangeJointype=()=>{

    }
    changeDeviceId=()=>{

    }
    saoma=()=>{
        this.props.navigation.navigate('code')
    }
}

var style = StyleSheet.create({
    page: {
        height: '100%',
        backgroundColor: 'rgb(246,246,246)',
    },
    input_box:{
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
export default SharePerson