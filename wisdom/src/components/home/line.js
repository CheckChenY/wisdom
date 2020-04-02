import React , { Component } from 'react';
import {Text,View} from 'react-native';


export default class ListComponent extends Component{
    render(){
        return(
            <View style={{flexDirection:'row',paddingTop:3}}>
                {/* <View style={{width:this.props.left.length > 6 ? 150 : 90}}> */}
                <View style={{width:120}}>
                    <Text style={{color:'#666666',fontSize:14,textAlign:'right'}}>{this.props.left}:</Text>
                </View>
                <View style={{flex:1,flexDirection:'row'}}>
                    <Text style={{color:'#666666',fontSize:14,paddingLeft:5}}>{this.props.right}</Text>
                    <Text style={{color:'#666666',fontSize:14,paddingLeft:5}}>{this.props.type}</Text>
                </View>
            </View>
        )
    }
}