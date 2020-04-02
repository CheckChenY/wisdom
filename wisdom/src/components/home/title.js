import React , { Component } from 'react';
import {Text,View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class TitleComponent extends Component{
    render(){
        return(
            <View style={{flexDirection:'row',backgroundColor:'#F6F6F6',padding:10}}>
                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Text style={{width:3,backgroundColor:'#467cd4',marginRight:5,height:12}}></Text>
                    </View>
                    <Text style={{color:'#467cd4',fontSize:16}}>
                        {this.props.title}
                    </Text>
                </View>
                {
                    this.props.icon ? (
                        <View style={{flex:1,alignItems:'flex-end',paddingRight:15}}>
                            <AntDesign name={this.props.icon} style={{color:'#999999'}} size={18} />
                        </View>
                    ) : (
                        <View />
                    )
                }
            </View>
        )
    }
}