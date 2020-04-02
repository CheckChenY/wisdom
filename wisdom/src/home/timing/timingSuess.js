import React , { Component } from 'react';
import {Text,View,Image} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class MainDetail extends Component{
    render(){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <View style={{width:100,alignItems:'center'}}>
                    <Image style={{height:75,width:75}} resizeMethod='auto' source={require('../../img/home/cg.png')} />
                    <Text style={{fontSize:18,color:'#666666',fontWeight:'500',textAlign:'center',paddingTop:10}}>注册成功</Text>
                </View>
                <View style={{paddingLeft:10,paddingRight:10,marginTop:10}}>
                    <Button
                        icon={
                            <Icon
                                name="home"
                                size={20}
                                color="white"
                            />
                        }
                        title="进入首页"
                        onPress={()=>this.props.navigation.navigate('home')}
                    />
                </View>
            </View>
        )
    }
}

export default MainDetail