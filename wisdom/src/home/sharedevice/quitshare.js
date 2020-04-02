import React , { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Text,View,TouchableOpacity,StyleSheet,FlatList,TextInput} from 'react-native';


class QuitShare extends Component{
    constructor() {
        super()
        this.state = {
            data:[
                {
                name:'智能网关 1',
                source:'18595838670',
                deviceCode:'123456789',
                joinType:'WIFI',
                position:'东走廊配电箱',
            },{
                name:'智能网关 1',
                source:'18595838670',
                deviceCode:'123456789',
                joinType:'WIFI',
                position:'东走廊配电箱',
            }
        ],
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
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, color: '#fff' }}>设置</Text>
            ),
            headerRight: <View/>,
            headerStyle: {
                backgroundColor: '#467cd4',
            }
        };
    };
    render(){
        let item=this.props.navigation.state.params.item
        return(
            <View style={style.page}>
                <View style={{height:10,backgroundColor:'rgb(246,246,246),'}}></View>
                {/* <FlatList
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
                /> */}
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('gatewayinfo')} style={{borderBottomColor:'#EBEBEB',borderBottomWidth:1,paddingTop:15,paddingBottom:15,backgroundColor:'#fff',}}>
                    <View style={{paddingLeft:15,paddingRight:15,position:'relative',flexDirection:'row',alignItems:'center',}}>
                        <View style={{width:40,height:40,marginRight:15}}>
                            <FontAwesome style={{color:'#2DA7FF'}} name="sliders" size={40} />
                        </View>
                        <View style={{justifyContent:'flex-start',}}>
                            <Text style={{color:'#333',marginBottom:5,fontSize:16}}>{item.name} （来自 {item.source} 的共享）</Text>
                            <Text style={{color:'#555',marginBottom:5,fontSize:14}}>网关标识码：{item.deviceCode}</Text>
                            <Text style={{color:'#888',marginBottom:5,fontSize:14}}>组网方式：{item.joinType}</Text>
                            <Text style={{color:'#999',fontSize:12}}>安装位置：{item.position}</Text>
                        </View>
                    </View>
                    <FontAwesome style={{color:'#B1B1B1',position:'absolute',right:15,top:45}} name="angle-right" size={28} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.quit()}} style={{height:45,backgroundColor:'#467cd4',justifyContent:'center',alignItems:'center',position:'absolute',bottom:0,left:0,right:0,}}>
                    <Text style={{fontSize:16,color:'#fff',}}>退出共享</Text>
                </TouchableOpacity>
            </View>
        )
    }
    quit=()=>{
        
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
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('gatewayinfo')} style={{borderBottomColor:'#EBEBEB',borderBottomWidth:1,paddingTop:15,paddingBottom:15,backgroundColor:'#fff',}}>
                <View style={{paddingLeft:15,paddingRight:15,position:'relative',flexDirection:'row',alignItems:'center',}}>
                    <View style={{width:40,height:40,marginRight:15}}>
                        <FontAwesome style={{color:'#2DA7FF'}} name="sliders" size={40} />
                    </View>
                    <View style={{justifyContent:'flex-start',}}>
                        <Text style={{color:'#333',marginBottom:5,fontSize:16}}>{item.name} （来自 {item.source} 的共享）</Text>
                        <Text style={{color:'#555',marginBottom:5,fontSize:14}}>网关标识码：{item.deviceCode}</Text>
                        <Text style={{color:'#888',marginBottom:5,fontSize:14}}>组网方式：{item.joinType}</Text>
                        <Text style={{color:'#999',fontSize:12}}>安装位置：{item.position}</Text>
                    </View>
                </View>
                <FontAwesome style={{color:'#B1B1B1',position:'absolute',right:15,top:45}} name="angle-right" size={28} />
            </TouchableOpacity>
        )
    }
}
const style=StyleSheet.create({
    page:{
        height:'100%',
    },
})
export default QuitShare