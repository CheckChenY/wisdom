import React,{ Component } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,PixelRatio,Image,Dimensions } from 'react-native'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FetchManager from '../fetch/index';
const {width, height} = Dimensions.get('window');

class CaseImage extends Component{
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center',color:'#fff',fontSize:17 }}>{'相关图片'}</Text>
            ),
            headerRight:<View />,
            headerLeft:(
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                    <FontAwesome color="#fff" name="angle-left" size={28}/>
                    <Text style={{color:'#fff',fontSize:16,paddingLeft:5,paddingTop:3}}>返回</Text>
                </View>
            </TouchableOpacity>
            ),
            headerStyle:{
                backgroundColor: '#3AA1FE',
                height:50
            }
        };
    };

    constructor(){
        super()
        this.state = {
            data:'',
            floorImage:'',
            left:'78.23%',
            tops:'32.34%',
            bol:false
        }
    }

    componentDidMount (){
        const { deviceId } = this.props.navigation.state.params;
        let obj = {
            deviceId:deviceId
        }
        FetchManager.get('/device/inner/jtlDeviceCUD/findDevicePicture',obj, (set) => {
            console.log(set)
            if(set&&set.success){
                let data = set.value;
                let pointSign = data.pointSign ? data.pointSign.split(',') : [];
                data.pointSign = pointSign
                let l = pointSign[0] + '%';
                let t = pointSign[1] ? pointSign[1] + '%' : '10%';
                this.setState({
                    floorImage:'http://192.168.0.186:60080/'+data.floorPicture,
                    data:data,
                    left:l,
                    tops:t,
                    bol:true
                })
            }else{
                this.setState({
                    bol:false
                }) 
            }
        })
    }



    onChangeIndex = (val) => {
        // let nub = val === 0 ? Number(val) + 2 : 1;
        console.log(val)
    }

    render(){
        const { data,floorImage,left,tops,bol } = this.state;
        console.log(bol)
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
                            <Text style={{position:'absolute',left:left,top:tops}}>
                                <FontAwesome color="red" name="flag" size={28}/>
                            </Text>
                        ) : <Text />
                    }
                </View>

                <View style={{backgroundColor:'#F2F7FB',margin:10}}>
                    <Text style={{fontSize:14}}>设备现场图:</Text>
                </View>

                <View style={{flexDirection:'row'}}>
                    <View style={{width:200}}>
                        <Image style={{width:180,padding:5,height:150,marginLeft:15}} 
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