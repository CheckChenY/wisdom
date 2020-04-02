import React , { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Text,View,TouchableOpacity,StyleSheet,FlatList,TextInput} from 'react-native';
import FetchManager from '../../http/http'
import { changeTime } from '../../components/changeTime';


class CoporateLog extends Component{
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerLeft:(
                <TouchableOpacity onPress={()=>navigation.goBack()} style={{paddingRight:15,}}>
                    <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                        <FontAwesome color="#fff" name="chevron-left" size={18} />  
                    </View>
                </TouchableOpacity>
            ),
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 20, color: '#fff',fontWeight:"500" }}>操作日志</Text>
            ),
            headerRight: <View/>,
            headerStyle: {
                backgroundColor: '#467cd4',
            }
        };
    };
    constructor() {
        super()
        this.page = 1;
        this.state = {
            content:[],
            // 下拉刷新
            isRefresh:false,
            // 加载更多
            isLoadMore:true,
            list:{
                page:0,
                pageSize:6
            }
        }
    }

    
    componentDidMount(){
        const { list } = this.state;
        this.getData(list)
    }
    render(){
        return(
            <View style={style.page}>
                <FlatList
                    // style={styles.container}
                    data={this.state.content}
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
            </View>
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
        const { list } = this.state;
        // 不处于 下拉刷新
        if (!this.state.isRefresh) {
            list['page'] = this.page + 1;
            this.page = this.page + 1;
            this.getData(list)
        }
    }
    _onLoadMore=()=>{
        const { list } = this.state;
        // 不处于正在加载更多 && 有下拉刷新过，因为没数据的时候 会触发加载
        if (!this.state.isLoadMore && this.state.content.length > 0) {
            list['page'] = this.page + 1;
            this.page = this.page + 1;
            this.getData(list)
        }
    }
    _createListItem=(item)=>{
        let time = changeTime(item.time);
        return (
            <View>
                <View style={{height:24,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#999',fontSize:12}}>{time}</Text>
                </View>
                <View style={{padding:15,borderWidth:1,borderColor:'#e0e0e0',borderRadius:3,backgroundColor:'#fff',marginBottom:15,}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:14,color:'#333',lineHeight:21}}>{item.deviceName}</Text>
                    </View>
                    <View style={{marginTop:5}}>
                        <Text style={{fontSize:12,color:'#999',lineHeight:21}}>{item.content}</Text>
                    </View>
                    {/* <View style={{marginTop:5}}>
                        <Text style={{fontSize:12,color:'#999',lineHeight:21}}>{item.result}</Text>
                    </View> */}
                </View>
            </View>
        )
    }
    getData=(list)=>{
        FetchManager.get('/app/acboperationlog/getPageList',list, async (set) => {
            console.log(set)
            if(this.page === 1){
                this.setState({
                    content: set.content
                })
            }else{
                this.setState({
                    // 加载更多 这个变量不刷新
                    isLoadMore : false,
                    // 数据源刷新 add
                    content: this.state.content.concat(set.content)
                })
            }
        })
    }
}
const style=StyleSheet.create({
    page:{
        backgroundColor:'rgb(246,246,246)',
        height:'100%',
        padding:15,
    },
})
export default CoporateLog