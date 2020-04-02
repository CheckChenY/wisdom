import React, {Component} from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
    View,
    Text,
    Image,
} from 'react-native'

class Item extends Component{
    constructor(props){
        super(props)
    }
    render(){
        var required=null
        if(this.props.isrequired){
            required=<Text style={{color:'red'}}>* </Text>
        }
        return(
            <View style={{flexDirection:'row',marginTop:6}}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{color:'#333',fontSize:16}}>{required}{this.props.left}</Text>
                </View>
                <View style={{justifyContent:'center',width:'75%'}}>
                    <Text style={{color:'#666',fontSize:14,lineHeight:25}}>{this.props.right}</Text>
                </View>
            </View>
        )
    }
}



export default class TroubleDeal extends Component{
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center',color:'#fff',fontSize:18 }}>隐患处理记录</Text>
            ),
            headerRight:(
                <Text></Text>
            ),
            headerLeft:(
                <Text style={{paddingLeft:15}} onPress={()=>navigation.goBack()}>
                    <Text style={{color:'#fff',marginLeft:12,fontSize:16}}>返回</Text>
                </Text>
            ),
            headerStyle:{
                backgroundColor: '#3AA1FE',
                height:50
            }
        };
    };
    constructor(props){
        super(props)
        this.state={
            
        }
    }
    render(){
        return(
            <View style={{paddingLeft:15,paddingRight:15,paddingTop:0}}>
                <Item left="上传时间：" right="2019-01-01  12:01:12" isrequired={false}></Item>
                <Item left="上传人员：" right="XXX" isrequired={false}></Item>
                <Item left="隐患来源：" right="一键上传" isrequired={false}></Item>
                <View style={{flexDirection:'row',marginTop:6}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'red'}}>* </Text><Text style={{color:'#333',fontSize:16}}>现场图片：</Text>
                        <Image style={{width:88,height:88,marginLeft:10}} source={require('../../img/img_02.png')}/>
                    </View>
                </View>
                <Item left="隐患描述：" right="大通1号楼消防通道堵塞" isrequired={true}></Item>
                <Item left="所在位置：" right="大通1号楼1层室内消防通道" isrequired={true}></Item>
                <Item left="具体位置：" right="室内消防通道" isrequired={true}></Item>
                <Item left="审核确认：" right="通过" isrequired={true}></Item>
                <Item left="处理描述：" right="消防通道堵塞 ，消防通道堵塞，消防通道堵塞，消防通道堵塞" isrequired={true}></Item>
                <View style={{flexDirection:'row',marginTop:6}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'red'}}>* </Text><Text style={{color:'#333',fontSize:16}}>处理结果图：</Text>
                        <Image style={{width:88,height:88,marginLeft:10}} source={require('../../img/img_02.png')}/>
                    </View>
                </View>
                <Item left="处理时间：" right="2019-01-01  12:01:12" isrequired={false}></Item>
                <Item left="处理人：" right="XXX" isrequired={false}></Item>
            </View>
        )
    }
    
}