import React, {Component} from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
    View,
    Text,
    Image,
    Button,
    Alert,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native'
import FetchManager from '../fetch/index';
import { getSystem,getDevice,getAllFloor,getSigleFloor,getReportUser } from '../components/getSystex';


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



export default class TroubleDealRecordDetail extends Component{
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center',color:'#fff',fontSize:18 }}>隐患处理记录</Text>
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
            source:{
                '1':'一键上报',
                '2':'巡查上报'
            },
            buildingDic:{},
            floorDic:{},
            hiddenStatus:{
                '1':'通过',
                '2':'未通过'
            },
            userDic:{}
        }
    }
    render(){
        return(
            <View style={{paddingLeft:15,paddingRight:15,paddingTop:0}}>
                <Item left="上传时间：" right={this.state.obj.createTime} isrequired={false}></Item>
                <Item left="上传人员：" right={this.state.obj.uploadName} isrequired={false}></Item>
                <Item left="隐患来源：" right={this.state.source[this.state.obj.source]} isrequired={false}></Item>
                <View style={{flexDirection:'row',marginTop:6}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'red'}}>* </Text><Text style={{color:'#333',fontSize:16}}>现场图片：</Text>
                        <Image style={{width:88,height:88,marginLeft:10}} source={{uri:'http://192.168.0.186:60080/' + this.state.obj.scenePhoto}}/>
                    </View>
                </View>
                <Item left="隐患描述：" right={this.state.obj.hiddenDesc} isrequired={true}></Item>
                <Item left="所在位置：" right={this.state.obj.buildingName+' '+this.state.obj.floorName} isrequired={true}></Item>
                <Item left="具体位置：" right={this.state.obj.position} isrequired={true}></Item>
                <Item left="审核确认：" right={this.state.hiddenStatus[this.state.obj.auditStatus]} isrequired={true}></Item>
                <Item left="处理描述：" right={this.state.obj.handDesc} isrequired={true}></Item>
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
    componentDidMount(){
        const { item } = this.props.navigation.state.params;

        const params={
            param:item.id
        }
        FetchManager.get('safe/inner/safeHiddenTrouble/findById',params, async (set) => {
            console.log(set)
            // set.data.reportTime=set.data.reportTime.replace('T',' ')
            // set.data.handTime=set.data.handTime.replace('T',' ')
            if(set.success){
                this.setState({
                    obj:set.value
                })
            }
        })
    }
}