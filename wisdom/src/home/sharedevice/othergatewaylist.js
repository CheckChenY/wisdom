import React, { Component } from 'react';
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

    render() {
        return (
            <FlatList
                // style={styles.container}
                data={this.state.data}
                //item显示的布局
                renderItem={({item}) => this._createListItem(item)}
                // 空布局
                ListEmptyComponent={this._createEmptyView}
                //下拉刷新相关
                onRefresh={this._onRefresh}
                refreshing={this.state.isRefresh}
                //加载更多
                onEndReached={() => this._onLoadMore()}
                onEndReachedThreshold={0.1}
            />
        )
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
    sendurl=(item)=>{
        this.props.getotherurl('quitshare',item)
    }
    _createListItem=(item)=>{
        return (
            <TouchableOpacity onPress={()=>{this.sendurl(item)}} style={{borderBottomColor:'#EBEBEB',borderBottomWidth:1,paddingTop:15,paddingBottom:15,backgroundColor:'#fff',}}>
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
}

var style = StyleSheet.create({
    page: {
        height: '100%',
    }
})
export default ShareList