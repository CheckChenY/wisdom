import React, {Component} from 'react'
import {View,Text,Image,StyleSheet,TouchableOpacity,} from 'react-native'
import NfcManager, {Ndef} from 'react-native-nfc-manager';

export default class AddPatrolSuccess extends Component{
    constructor(props){
        super(props)
        this.state={
            second:3,
            timer:'',
        }
    }
    static navigationOptions = ({ navigation, navigationOptions }) => {
        // console.log(navigationOptions)
        return {
            header:null
        };
    };

    componentDidMount(){
        this._stopDetection();
    }

    //关闭NFC功能
    _stopDetection = () => {
        console.log('已关闭NFC功能')
        this.setState({
            nfcbool:false
        })
        NfcManager.unregisterTagEvent()
        .then(result => {
            console.log('unregisterTagEvent OK', result)
        })
        .catch(error => {
            console.warn('unregisterTagEvent fail', error)
        })
    }

    render(){
        return(
            <View style={{padding:10}}>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <Image style={{width:75,height:75,marginTop:80}} source={require('../../img/sb.png')}></Image>
                </View>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <Text style={{fontSize:18,marginTop:10,color:'#333'}}>巡查遇到问题</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <Text style={{fontSize:14,marginTop:10,textAlign:'center'}}>该巡查点不在您的任务范围内,</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <Text style={{fontSize:14,marginTop:10,textAlign:'center'}}>请注意查看巡查任务</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <Text style={{marginTop:8,color:'#3AA1FE',fontSize:14}}>{this.state.second}S后自动关闭</Text>
                </View>
                <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',marginTop:20}} onPress={()=>{this.reback()}}>
                    <View style={{alignItems:'center',justifyContent:'center',width:'100%',height:45,backgroundColor:'#D9E4ED',borderRadius:4}}>
                        <Text style={{color:'#788A93',fontSize:18}}>返回</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    reback=()=>{
        clearInterval(this.state.timer)
        this.props.navigation.navigate('PatrolList')
    }
    componentDidMount(){
        this.setState({
            timer:setInterval(()=>{
                    this.setState({
                        second:parseInt(this.state.second)-1
                    })
                    if(parseInt(this.state.second)===0){
                        clearInterval(this.state.timer)
                        this.props.navigation.navigate('PatrolDetaiList')
                    }
                },1000)
        })
    }
}
const styles=StyleSheet.create({
    img:{
        width:100,
        height:100
    }
})