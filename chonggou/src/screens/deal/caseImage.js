import React,{ Component } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,PixelRatio,Image,Dimensions } from 'react-native'; 
import FetchManager from '../fetch/index';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const {width, height} = Dimensions.get('window');

class CaseImage extends Component{

    constructor(){
        super()
        this.state = {
            data:'',
            floorImage:'',
            left:'78.23',
            top:'32.34',
            bol:false
        }
    }

    componentDidMount (){
        const { id } = this.props.navigation.state.params;
        let obj = {
            param:id
        }
        FetchManager.get('/alarm/inner/jtlAlarmRecord/findAlarmPicture',obj, (set) => {
            console.log(set)
            if(set&&set.success){
                let data = set.value;
                let arr = data.pointSign.split(',')
                let l = arr[0] + '%';
                let t = arr[1] + '%';
                this.setState({
                    floorImage:'http://192.168.0.186:60080/'+data.floorPicture,
                    data:data,
                    left:l,
                    top:t,
                    bol:true
                })
            }else{
                this.setState({
                    bol:false
                }) 
            }
        })
    }

    render(){
        const { data,floorImage,left,top,bol } = this.state;
        
        // let pos = data.pointSign;
        // let lefts,tops;
        // if(pos){
        //     lefts = pos[0] + '%';
        //     tops = pos[1] + '%';
        // }
        return(
            <View style={{padding:5}}>
                <View style={{backgroundColor:'#F2F7FB',padding:10}}>
                    <Text style={{fontSize:14}}>设备可视化:</Text>
                </View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Image style={{width:width - 50,padding:5,height:200}}
                        resizeMode='cover'
                        resizeMethod='auto' 
                        source={{uri:floorImage}} />
                        {
                            bol ? (
                                <Text style={{position:'absolute',left:left,top:top}}>
                                    <FontAwesome color="red" name="flag" size={28}/>
                                </Text>
                            ) : <Text />
                        }
                </View>

                <View style={{backgroundColor:'#F2F7FB',padding:10}}>
                    <Text style={{fontSize:14}}>设备现场图:</Text>
                </View>

                <View style={{flexDirection:'row'}}>
                    <View style={{width:200}}>
                        <Image style={{width:180,padding:5,height:150}}
                            resizeMode='cover'
                            resizeMethod='auto' 
                            source={{uri:'http://192.168.0.186:60080/'+data.surroundingPhoto}} />
                    </View>
                    <View style={{flex:1}}>
                        <Text> </Text>
                    </View>
                </View>
            </View>
        )
    }
}


export default CaseImage;