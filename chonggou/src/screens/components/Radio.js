import React, {Component} from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
    View,
    Text,
    Image,
    Button,
    FlatList,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native'

//单选组件
export default class Radio extends Component{
    constructor(props){
        super(props)
        this.state={
            ischeckedcolor:'#3AA1FE',
            nocheckedcolor:'#788A93'
        }
    }
    render(){
        const { flx } = this.props;
        var ischecked=<Text style={{width: 4, height: 4,borderWidth: 4, borderStyle: 'solid',borderColor:'#3AA1FE', borderRadius: 4}}></Text>
        var nochecked=null
        return(
            <View style={{flexDirection:flx}}>
                {this.props.SelectList.map((item,index)=>(
                    <View key={index} style={{flexDirection:'row',padding:5}}>
                        <TouchableOpacity style={{width:40,justifyContent:'center',alignItems:'center'}} 
                            onPress={()=>{this.selectson(item)}}>
                            <View style={{justifyContent:'center',alignItems:'center',
                                width:15,height:15,borderRadius:10,borderWidth:1,
                                borderColor:item.check?this.state.ischeckedcolor:this.state.nocheckedcolor,
                                backgroundColor:'#f5f5f5'}}>
                                {item.check?ischecked:nochecked}
                            </View>
                        </TouchableOpacity>
                        <Text style={{color:'#333',flex:1}}>{item.label}</Text>
                    </View>
                ))}
            </View>
        )
    }
    selectson=(item)=>{
        this.props.select(item)
    }
}