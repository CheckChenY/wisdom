import React, { Component } from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Text, View,Image,FlatList,TextInput, PanResponder,KeyboardAvoidingView,StyleSheet,TouchableOpacity,ScrollView } from "react-native";
import FetchManager from '../fetch/index';
import { getSystem,getDevice,getAllFloor,getSigleFloor } from '../components/getSystex';

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
            <View style={{flexDirection:'row',marginTop:8}}>
                <Text style={{color:'#333',fontSize:16}}>{required}{this.props.left}</Text>
                <Text style={{fontSize:16}}>{this.props.right}</Text>
            </View>
        )
    }
}

class UploadRecordDetail extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center',color:'#fff',fontSize:17 }}>上传记录</Text>
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
      this.state={
          obj:{},
          hiddenStatusDic:{
              '1':'已处理',
              '0':'未处理'
          },
          auditStatusDic:{
              '1':'通过',
              '2':'未通过'
          },
      }
  }
  render() {
    return (
        <View style={{padding:15,paddingTop:5}}>
            <Item left="上传时间：" right={this.state.obj.createTime} isrequired={false}></Item>
            <Item left="上传人：" right={this.state.obj.uploadName} isrequired={false}></Item>
            <View style={{flexDirection:'row',marginTop:6}}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{color:'red'}}>* </Text><Text style={{color:'#333',fontSize:16}}>现场图片：</Text>
                    <Image style={{width:88,height:88,marginLeft:10}} source={{uri:'http://192.168.0.186:60080/' + this.state.obj.scenePhoto}}/>
                </View>
            </View>
            <Item left="隐患描述：" right={this.state.obj.hiddenDesc} isrequired={false}></Item>
            <Item left="所在位置：" right={this.state.obj.buildingName+' - '+this.state.obj.floorName} isrequired={false}></Item>
            <Item left="具体位置：" right={this.state.obj.position} isrequired={false}></Item>
            <Item left="处理进度：" right={this.state.hiddenStatusDic[this.state.obj.hiddenStatus]} isrequired={false}></Item>
            
            {
                this.state.obj.hiddenStatus === '0' ? <View /> :
                (
                   <View>
                       <Item left="审核确认：" right={this.state.auditStatusDic[this.state.obj.auditStatus]} isrequired={false}></Item>
                       <Item left="处理描述：" right={this.state.obj.handDesc} isrequired={false}></Item>
                       <View style={{flexDirection:'row',marginTop:6}}>
                           <View style={{flexDirection:'row'}}>
                               <Text style={{color:'red'}}>* </Text><Text style={{color:'#333',fontSize:16}}>处理结果图：</Text>
                               <Image style={{width:88,height:88,marginLeft:10}} source={{uri:'http://192.168.0.186:60080/' + this.state.obj.handPhoto}}/>
                           </View>
                       </View>
                       <Item left="处理时间：" right={this.state.obj.updateTime} isrequired={false}></Item>
                       <Item left="处理人：" right={this.state.obj.hiddenName} isrequired={false}></Item>
                   </View> 
                )
            }
            
        </View>
    )
  }
    componentWillMount(){
        const { item } = this.props.navigation.state.params;

        const params={
            param:item.id
        }
        FetchManager.get('/safe/inner/safeHiddenTrouble/findById',params, async (set) => {
            console.log(set)
            if(set.success){
                this.setState({
                    obj:set.value
                })
            }
        })
    }
}
export default UploadRecordDetail;