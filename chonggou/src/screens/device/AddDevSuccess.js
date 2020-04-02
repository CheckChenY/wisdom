import React, {Component} from 'react'
import {View,Text,Image,StyleSheet,TouchableOpacity,ScrollView,} from 'react-native'
export default class AddDevSuccess extends Component{
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            header:null,
        };
    };

    static state = {
        status:1
    }

    componentDidMount(){
        const { status } = this.props.navigation.state.params;
        this.setState({
            status:status
        })
    }

    getBackSuccess = () => {
        const { status } = this.state;
        console.log(status)
        if(status===1){
            this.props.navigation.push('AddDev')
        }else{
            this.props.navigation.push('addVideoDev')
        }
    }

    render(){
        return(
            <ScrollView>
                <View style={{paddingLeft:44,paddingRight:44}}>
                    <View style={{alignItems:'center',marginTop:80}}>
                        <View style={{width:75,height:75,borderRadius:37}}>
                            <Image style={{width:'100%',height:'100%'}} source={require('../../img/cg.png')}/>
                        </View>
                    </View>
                    <View style={{alignItems:'center',marginTop:8}}>
                        <Text style={{color:'#333',fontSize:18}}>添加设备成功</Text>
                    </View>
                    <View style={{alignItems:'center',marginTop:8,marginBottom:275}}>
                        <Text style={{color:'#3AA1FE',fontSize:14}}>可在【接入设备】中查看设备详情</Text>
                    </View>
                    <TouchableOpacity onPress={this.getBackSuccess}>
                        <View style={{height:45,borderRadius:5,backgroundColor:'#3AA1FE',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'#fff',fontSize:18}}>继续添加设备</Text>
                        </View>
                    </TouchableOpacity>
                    {/* navigate('devicelist') */}
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('devicelist')}}>
                        <View style={{height:45,borderRadius:5,backgroundColor:'#D9E4ED',justifyContent:'center',alignItems:'center',marginTop:20}}>
                            <Text style={{color:'#788A93',fontSize:18}}>返回</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}