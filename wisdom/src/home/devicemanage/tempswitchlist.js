import React , { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Text,View,TouchableOpacity,StyleSheet,FlatList,Image} from 'react-native';
import FetchManager from '../../http/http';


class TempSwitchList extends Component{
    
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { deviceId } = navigation.state.params;
        return {
            headerLeft:(
                <TouchableOpacity onPress={()=>navigation.goBack()} style={{paddingRight:15,}}>
                    <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                        <FontAwesome color="#fff" name="angle-left" size={28}/>
                    </View>
                </TouchableOpacity>
            ),
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, color: '#fff' }}>添加开关</Text>
            ),
            headerRight: (
                <TouchableOpacity onPress={()=>navigation.navigate('addswitch',{
                    deviceId:deviceId
                })}>
                    <View style={{paddingRight:15,flexDirection:'row',alignItems:'center'}}>
                        <AntDesign color="#fff" name="plus" size={28}/>
                    </View>
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: '#467cd4',
            }
        };
    };
    constructor() {
        super()
        this.page = 0;
        this.state = {
            data:[],
            // 下拉刷新
            isRefresh:false,
            // 加载更多
            isLoadMore:true,
            list:{
                pageSize:10,
                page:0
            }
        }
    }


    componentDidMount(){
        const { list } = this.state;
        const { deviceId } = this.props.navigation.state.params;
        list.deviceId = deviceId;
        this.props.navigation.addListener('didFocus', () => {
            this._getHotList(list);
        });
    }



    render(){
        const { deviceId } = this.props.navigation.state.params;
        return(
            <View style={style.page}>
                <View style={{height:10,backgroundColor:'rgb(246,246,246),'}}></View>
                <FlatList
                    style={{marginBottom:60,}}
                    data={this.state.data}
                    //item显示的布局
                    renderItem={({item}) => this._createListItem(item)}
                    // 空布局
                    ListEmptyComponent={this._createEmptyView}
                    //下拉刷新相关
                    // onRefresh={this._onRefresh}
                    refreshing={this.state.isRefresh}
                    //加载更多
                    // onEndReached={() => this._onLoadMore()}
                    onEndReachedThreshold={0.1}
                />
                <TouchableOpacity onPress={()=>{this.scan(deviceId)}} style={{height:45,backgroundColor:'#467cd4',justifyContent:'center',alignItems:'center',position:'absolute',bottom:0,left:0,right:0,}}>
                    <Text style={{fontSize:16,color:'#fff',}}>预览</Text>
                </TouchableOpacity>
            </View>
        )
    }

    scan=(deviceId)=>{
        this.props.navigation.navigate('submitscan',{
            deviceId:deviceId
        })
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
        const { list } = this.state;
        // 不处于 下拉刷新
        if(!this.state.isRefresh){
            list['page'] = this.page + 1;
            this.page = this.page + 1;
            this._getHotList(list)
        }
    }
    _onLoadMore=()=>{
        const { list } = this.state;
        // 不处于正在加载更多 && 有下拉刷新过，因为没数据的时候 会触发加载
        if (!this.state.isLoadMore && this.state.data.length > 0){
            list['page'] = this.page + 1;
            this.page = this.page + 1;
            this._getHotList(list)
        }
    }


    _createListItem=(item)=>{
        return (
            <View style={{borderBottomColor:'#EBEBEB',borderBottomWidth:1,paddingTop:15,paddingBottom:15,backgroundColor:'#fff',}}>
                <View style={{paddingLeft:15,paddingRight:15,position:'relative',flexDirection:'row',alignItems:'center',}}>
                    <View style={{width:40,height:40,marginRight:15,justifyContent:'center',alignItems:'center'}}>
                        {
                            item.modelPhoto ? (
                                <Image style={{width:35,height:35,resizeMode:'contain'}} source={{uri:item.modelPhoto}} />
                            ) : (
                                <FontAwesome style={{color:'#2DA7FF'}} name="sliders" size={40} />
                            )
                        }
                    </View>
                    <View style={{justifyContent:'flex-start',}}>
                        <Text style={{color:'#333',marginBottom:5,fontSize:16}}>线路名称：{item.deviceName}</Text>
                        <Text style={{color:'#555',marginBottom:5,fontSize:14}}>开关 ID：{item.deviceId}</Text>
                        <Text style={{color:'#888',marginBottom:5,fontSize:14}}>开关型号：{item.deviceModel}</Text>
                        <Text style={{color:'#999',fontSize:12}}>额定电流：{item.current}A 额定电压：{item.voltage}V</Text>
                    </View>
                </View>
            </View>
        )
    }

    _getHotList(list) {
        console.log(list);
        FetchManager.get('/app/acbdevice/findSwitchPageList',list, async (set) => {
            // debugger;
            console.log(set)
            //下面的就是请求来的数据
            let date = set.content;
            if(set&&set.content){
                if(this.page === 0){
                    this.setState({
                        data: date
                    })
                }else{
                    this.setState({
                        // 加载更多 这个变量不刷新
                        isLoadMore : false,
                        // 数据源刷新 add
                        data: date.concat(date)
                    })
                }
            }else{
                // this._signOut();
            }
        },this.props)
    }
}
const style=StyleSheet.create({
    page:{
        height:'100%',
    },
})
export default TempSwitchList