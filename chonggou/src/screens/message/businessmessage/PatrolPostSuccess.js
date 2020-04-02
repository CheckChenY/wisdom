import React, {Component} from 'react'
import {View,Text,Image,StyleSheet,TouchableOpacity,} from 'react-native'
export default class PatrolPostSuccess extends Component{
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            header:null,
        };
    };
    render(){
        return(
            <View style={{paddingLeft:44,paddingRight:44}}>
                <View style={{alignItems:'center',marginTop:80}}>
                    <View style={{width:75,height:75,borderRadius:37}}>
                        <Image style={{width:'100%',height:'100%'}} source={require('../../../img/cg.png')}/>
                    </View>
                </View>
                <View style={{alignItems:'center',marginTop:8}}>
                    <Text style={{color:'#333',fontSize:18}}>巡查提交成功</Text>
                </View>
                <View style={{alignItems:'center',marginTop:8,marginBottom:275}}>
                    <Text style={{color:'#3AA1FE',fontSize:14}}>可在【已巡查】中查看巡查记录详情</Text>
                </View>
                <TouchableOpacity onPress={()=>{this.back()}}>
                    <View style={{height:45,borderRadius:5,backgroundColor:'#3AA1FE',justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'#fff',fontSize:18}}>继续巡查</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.backlist()}}>
                    <View style={{height:45,borderRadius:5,backgroundColor:'#D9E4ED',justifyContent:'center',alignItems:'center',marginTop:20}}>
                        <Text style={{color:'#788A93',fontSize:18}}>返回</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    back=()=>{
        this.props.navigation.push('actionPatrolFrom')
    }

    backlist=()=>{
        this.props.navigation.navigate('PatrolList')
    }
}