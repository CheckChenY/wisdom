import React, { Component } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View,Text,Image,TouchableOpacity} from 'react-native'
import FetchManager from '../fetch/index';


class Content extends Component {
    render() {
        return (
            <View style={{ flexDirection: 'row',marginTop:10}}>
                <View style={{width:140}}>
                    <Text style={{fontSize:14,color:'#333',textAlign:'right'}}>{this.props.left}</Text>
                </View>
                <View style={{flex:1}}>
                    <Text style={{color:'#666',fontSize:14}}>{this.props.right}</Text>
                </View>
            </View>
        )
    }
}

export default class CompanyInfo extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 18 }}>消息详情</Text>
            ),
            headerRight: (
                <TouchableOpacity onPress={()=>navigation.navigate('PatrolList')}>
                    <View style={{paddingRight:15,flexDirection:'row',alignItems:'center'}}>
                        <Text style={{color:'#fff',fontSize:16,paddingRight:5,paddingTop:3}}>前往处理</Text>
                    </View>
                </TouchableOpacity>
            ),
            headerLeft: (
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                        <FontAwesome color="#fff" name="angle-left" size={28}/>
                        <Text style={{color:'#fff',fontSize:16,paddingLeft:5,paddingTop:3}}>返回</Text>
                    </View>
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: '#3AA1FE',
                height: 50
            }
        };
    };
    constructor(props) {
        super(props)
        this.state={
            companyInfo:{}
        }
    }

    componentDidMount(){
        const { data } = this.props.navigation.state.params;
        console.log(data)
        this.setState({
            companyInfo:data
        })


        FetchManager.post('/notice/inner/jtlNoticeAcceptMessage/updateAlreadyread ',{
            id:data.id
        }, (set) => {
            console.log(set)
            if(set && set.success){
                // this.setState({
                //     warnObj:set.value
                // })
            }
        })
    }


    render() {
        const { companyInfo, } = this.state;
        return (
            <View style={{padding:10}}>
                <Content left='发布时间:' right={companyInfo.sendTime}/>
                <Content left='标题:' right={companyInfo.acceptNoticeTitle} />
                <Content left='发布人:' right={companyInfo.noticeUser}/>
                <Content left='具体内容:' right={companyInfo.concreteContent }/>
                {/* <Content left='巡查任务:' right={companyInfo.orgName}/>
                <Content left='任务周期:' right={companyInfo.orgCode} />
                <Content left='巡查点数:' right={companyInfo.orgType}/> */}
            </View>
        )
    }
}