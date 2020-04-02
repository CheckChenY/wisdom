import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native'
export default class CommitSuccess extends Component{
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            header:null,
        };
    };
    constructor(props){
        super(props)
        this.state={
            
        }
    }
    render(){
        return(
            <View style={{paddingLeft:44,paddingRight:44}}>
                <View style={{alignItems:'center',marginTop:80}}>
                    <View style={{width:75,height:75,borderRadius:37}}>
                        <Image style={{width:'100%',height:'100%'}} source={require('../../img/cg.png')}/>
                    </View>
                </View>
                <View style={{alignItems:'center',marginTop:8}}>
                    <Text style={{color:'#333',fontSize:18}}>{this.props.navigation.state.params.res?'远程操作成功':'远程操作失败'}</Text>
                </View>
                <View style={{alignItems:'center',marginTop:8,marginBottom:275}}>
                    <Text style={{color:'#3AA1FE',fontSize:14}}>可在【操作记录】中查看操作记录</Text>
                </View>
                <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                    <View style={{height:45,borderRadius:5,backgroundColor:'#D9E4ED',justifyContent:'center',alignItems:'center',marginTop:20}}>
                        <Text style={{color:'#788A93',fontSize:18}}>返回</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    
})