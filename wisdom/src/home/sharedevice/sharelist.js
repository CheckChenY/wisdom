import React, { Component } from 'react';
import TabsCompanents from '../../components/tab'
import MyGatewayList from './mygatewaylist'
import OtherGatewayList from './othergatewaylist'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Text, View, TextInput,FlatList, Button, StyleSheet,TouchableOpacity, } from 'react-native';

class ShareList extends Component {
    constructor() {
        super()
        this.state = {
            data:[{
                name:'智能网关1',
                state:'离线',
                deviceCode:'123456',
                joinType:'WIFI',
                id:1
            },{
                name:'智能网关2',
                state:'离线',
                deviceCode:'123457',
                joinType:'RS485',
                id:2
            }],
            isRefresh:false
        }
    }
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerLeft:(
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                        <FontAwesome color="#fff" name="angle-left" size={28}/>
                    </View>
                </TouchableOpacity>
            ),
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, color: '#fff' }}>网关共享</Text>
            ),
            headerRight: <View />,
            headerStyle: {
                backgroundColor: '#467cd4',
            }
        };
    };

    render() {
        return (
            <View style={style.page}>
                <TabsCompanents onChangeTab = {this.onChangeTab.bind(this)}>
                    <View title="我的网关">
                        <MyGatewayList getmyurl={this.getmyurl.bind(this)}/>
                    </View>
                    {/* Second tab */}
                    <View title="别人共享给我的">
                        <OtherGatewayList getotherurl={this.getotherurl.bind(this)}/>
                    </View>
                </TabsCompanents>
            </View>
        )
    }
    getmyurl=(url,item)=>{
        console.log(item)
        this.props.navigation.navigate(url,{item:item})
    }
    getotherurl=(url,item)=>{
        console.log(item)
        this.props.navigation.navigate(url,{item:item})
    }
    _createEmptyView=()=>{
        return (
            <View style={{height:'100%',justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:16}}>
                    暂无列表数据
                </Text>
            </View>
        );
    }
    _onRefresh=()=>{

    }
    _onLoadMore=()=>{

    }
    _createListItem=(item)=>{
        return (
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('sharedetail')} style={{borderBottomColor:'#EBEBEB',borderBottomWidth:1,paddingTop:15,paddingBottom:15,backgroundColor:'#fff',}}>
                <View style={{paddingLeft:15,paddingRight:15,position:'relative',flexDirection:'row',alignItems:'center',}}>
                    <View style={{width:40,height:40,marginRight:15}}>
                        <FontAwesome style={{color:'#2DA7FF'}} name="sliders" size={40} />
                    </View>
                    <View style={{justifyContent:'flex-start',}}>
                        <Text style={{color:'#333',marginBottom:5,fontSize:16}}>{item.name} ({item.state})</Text>
                        <Text style={{color:'#555',marginBottom:5,fontSize:14}}>网关标识码：{item.deviceCode}</Text>
                        <Text style={{color:'#888',fontSize:14}}>组网方式：{item.joinType}</Text>
                    </View>
                </View>
                <FontAwesome style={{color:'#B1B1B1',position:'absolute',right:15,top:35}} name="angle-right" size={28} />
            </TouchableOpacity>
        )
    }

    onChangeTab = (val) => {
        console.log(val)
        // let nub = Number(val) + 1
        // this.popUp.onChangeIndex(nub)
        // debugger;
    }
}

var style = StyleSheet.create({
    page: {
        height: '100%',
    }
})
export default ShareList