import React, {Component} from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View,Text,TouchableOpacity,} from 'react-native'
import FetchManager from '../../fetch/index';


class Content extends Component{
    render(){
      return(
        <View style={{ flexDirection: 'row',marginTop:10 }}>
            <Text style={{ textAlign: 'right', fontSize:14,color:'#333' }}>{this.props.left}</Text>
            <Text style={{ fontSize:14,color:'#666' }}>{this.props.right}</Text>
        </View>
      )
    }
}

export default class NoticeAnnounce extends Component{
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center',color:'#fff',fontSize:17 }}>通知公告</Text>
            ),
            headerRight:(
                <Text></Text>
            ),
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
    constructor(props){
        super(props)
        this.state = {
            data:"",
        }
    }

    componentDidMount(){
        const { data } = this.props.navigation.state.params;
        console.log(data)
        this.setState({
            data:data
        })
    }
    
    render(){
        const { data,userDic } = this.state;
        return(
            <View style={{paddingLeft:20,paddingRight:20,paddingTop:10}}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ textAlign: 'right', fontSize:14,color:'#333' }}>标题：</Text>
                    <Text style={{ fontSize:14,color:'#333' }}>{data.acceptNoticeTitle}</Text>
                </View>
                <Content left="发布人：" right={data.noticeUser}></Content>
                <Content left="发布时间：" right={data.sendTime}></Content>
                <Content left=" 具体内容：" right={data.concreteContent}></Content>
            </View>
        )
    }
}