import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/Feather';
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, } from 'react-native';

class AddDeviceSuccess extends Component {
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
                    <Text style={{fontSize:18,color:'#333',marginTop:11,fontWeight:'900'}}>添加成功</Text>
                </View>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('addgateway')} style={{height:40,justifyContent:'center',alignItems:'center',backgroundColor:'#467cd4',borderRadius:5,marginTop:90}}>
                        <Text style={{fontSize:17,color:'#fff',}}>继续添加</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('gatewaylist')} style={{height:40,justifyContent:'center',alignItems:'center',borderColor:'#BABABC',borderWidth:1,borderRadius:5,marginTop:45}}>
                        <Text style={{fontSize:17,color:'#333',}}>返回</Text>
                </TouchableOpacity>
            </View>
        )
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
export default AddDeviceSuccess