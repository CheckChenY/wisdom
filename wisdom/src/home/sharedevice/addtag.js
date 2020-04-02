import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectSingle from './../../components/select/selectSingle';
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, } from 'react-native';

class AddTag extends Component {
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
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, color: '#fff' }}>添加用户</Text>
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
        return (
            <View style={style.page}>
                <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                        <View style={{ width: '25%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>备注名：</Text>
                            </View>
                        </View>
                        <View style={{ width: '73%' }}>
                            <TextInput
                                placeholder="输入备注名"
                                style={style.input_box}
                                onChangeText={(code) => this.setState({code})}
                                value={this.state.code}
                                />
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>{this.welldone()}} style={{height:45,backgroundColor:'#467cd4',justifyContent:'center',alignItems:'center',position:'absolute',bottom:0,left:0,right:0,}}>
                    <Text style={{fontSize:16,color:'#fff',}}>完成</Text>
                </TouchableOpacity>
            </View>
        )
    }
    welldone=()=>{
        this.props.navigation.navigate('sharedetail')
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
export default AddTag