import React , { Component } from 'react';
import {Text,View,TouchableOpacity,Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class RemoteControl extends Component{
    static navigationOptions = ({ navigation, navigationOptions }) => {
        // debugger;
        return{
            title: '远程控制',
            headerStyle: {
              backgroundColor: '#467cd4',
              alignItems: 'center',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                textAlign: 'center',
                flex:1
            },
            headerLeft:(
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <FontAwesome style={{paddingLeft:20,color:'#FFFFFF'}} name="chevron-left" size={18} />
                </TouchableOpacity>
            ),
            headerRight: <View />
        }
    };

    constructor(){
        super()
        this.state = {
            data:[{title:'智慧空开1',id:1},{title:'智慧空开2',id:2},{title:'智慧空开3',id:3},]
        }
    }

    getComponent = (item,i) => {
        console.log(item)
        console.log(i)
    }



    render(){
        const { data } = this.state;
        return(
            <View style={{padding:5}}>
                <View style={{width:90,backgroundColor:'#EBEBEB'}}>
                    {
                        data.map((item,i)=>(
                            <TouchableOpacity key={i} onPress={()=>this.getComponent(item,i)}>
                                <View style={{height:88,justifyContent:'center',alignItems:'center'}}>
                                    <Text><FontAwesome style={{paddingLeft:20,color:'#2DA7FF'}} name="sliders" size={40} /></Text>
                                    <Text style={{fontSize:14,paddingTop:5}}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        )
    }
}

export default RemoteControl