import React , { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Text,View,TouchableOpacity,StyleSheet,FlatList,TextInput,Image} from 'react-native';
import FetchManager from '../../http/http';
import TypeName from '../../components/typeName';
import { changeTime } from '../../components/changeTime';
import {getDeviceModal} from '../../components/home/deviceModal';
import { EnableType } from '../../components/enableName';


class WarnDetail extends Component{
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerLeft:(
                <TouchableOpacity onPress={()=>navigation.navigate('warnlist')} style={{paddingRight:15,}}>
                    <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                        <FontAwesome color="#fff" name="angle-left" size={28}/>
                    </View>
                </TouchableOpacity>
            ),
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, color: '#fff' }}>警情详情</Text>
            ),
            headerRight: <View/>,
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
            isRefresh: false,
            // 加载更多
            isLoadMore: true,
            list: {
                id:''
            },
            obj:{},
            modelPhoto:'',
            nowtype:'',//当前模式
            devicestatus:'',//设备状态
            createDate:'',
            detail:''
        }
    }


    componentDidMount(){
        const { id,createDate,detail } = this.props.navigation.state.params
        const { list } = this.state;
        this.setState({
            id:id,
            createDate:createDate,
            detail:detail
        })
        list.id = id;
        this._getHotList(list)
    }


    render(){
        return(
            <View>
                <FlatList
                    style={{backgroundColor:'#E0E0E0'}}
                    data={this.state.data}
                    //item显示的布局
                    renderItem={({item}) => this._createListItem(item)}
                    // 空布局
                    ListEmptyComponent={this._createEmptyView}
                    //下拉刷新相关
                    onRefresh={this._onRefresh}
                    refreshing={this.state.isRefresh}
                    ListHeaderComponent = {this.headerComponent}
                    //加载更多
                    onEndReached={() => this._onLoadMore()}
                    onEndReachedThreshold={0.1}
                />
            </View>
        )
    }

    headerComponent = () => {
        const { obj,createDate,detail,devicestatus } = this.state;
        // let type = getDeviceModal(obj.deviceType);
        let createTime,tim;
        if(obj.createTime){
            createTime = obj.createTime;
            tim = createTime.substring(0,createTime.length - 2);
        }
        console.log(createTime)
        return (
            <View>
                <View style={{height:38,backgroundColor:'#F6F6F6',flexDirection:'row',paddingLeft:15,paddingRight:15,alignItems:'center'}}>
                    <View style={{width:3,height:12,backgroundColor:'#467cd4',marginRight:10}}></View>
                    <Text style={{fontSize:16,color:'#467cd4'}}>空开信息</Text>
                </View>
                <View style={{flexDirection:'row',paddingLeft:25}}>
                    <View style={{flex:1,paddingTop:10,paddingBottom:10}}>
                        <View style={{flexDirection:'row',height:24,alignItems:'center'}}>
                            <Text style={{fontSize:14,color:'#333'}}>报警时间：</Text>
                            <Text style={{fontSize:14,color:'#666'}}>{tim}</Text>
                        </View>
                        <View style={{flexDirection:'row',height:24,alignItems:'center'}}>
                            <Text style={{fontSize:14,color:'#333'}}>报警类型：</Text>
                            <Text style={{fontSize:14,color:'#666'}}>{obj.detail}</Text>
                        </View>
                        <View style={{flexDirection:'row',height:24,alignItems:'center'}}>
                            <Text style={{fontSize:14,color:'#333'}}>空开名称：</Text>
                            <Text style={{fontSize:14,color:'#666'}}>{obj.deviceName}</Text>
                        </View>
                        <View style={{flexDirection:'row',height:24,alignItems:'center'}}>
                            <Text style={{fontSize:14,color:'#333'}}>空开型号：</Text>
                            <Text style={{fontSize:14,color:'#666'}}>{obj.deviceType}</Text>
                        </View>
                        <View style={{flexDirection:'row',height:24,alignItems:'center'}}>
                            <Text style={{fontSize:14,color:'#333'}}>空开 I D：</Text>
                            <Text style={{fontSize:14,color:'#666'}}>{obj.deviceId}</Text>
                        </View>
                    </View>
                    <View style={{width:100,alignItems:'center',justifyContent:'center'}}>
                        <Image source={{uri:this.state.modelPhoto}} style={{width:40,height:40}}></Image>
                    </View>
                </View>
                <View style={{height:38,backgroundColor:'#F6F6F6',flexDirection:'row',paddingLeft:15,paddingRight:15,alignItems:'center'}}>
                    <View style={{width:3,height:12,backgroundColor:'#467cd4',marginRight:10}}></View>
                    <Text style={{fontSize:16,color:'#467cd4'}}>空开状态</Text>
                </View>
            </View>
        )
    }

    _createListItem=(item)=>{
        if(item.type === '127'){
            return
        }
        let show = EnableType(item)
        // console.log(show)
        return (
            <View style={{backgroundColor:'#FFFFFF',padding:10}}>
                <View style={{flexDirection:'row',paddingLeft:25,paddingRight:25,}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        {/* <Text style={{fontSize:14,color:'#333'}}>状态详情：</Text> */}
                        <Text style={{fontSize:14,color:'#666'}}>{item.remark} : {item.data} </Text>
                        <Text style={{fontSize:14,color:'#666'}}>
                            {TypeName[item.type]} 
                        </Text>
                    </View>
                </View>
            </View>
        )
    }


    /**
     * 空布局
     */
    _createEmptyView(){
        return (
            <View style={{height:'100%',justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:16}}>
                    暂无列表数据
                </Text>
            </View>
        );
    }

    /**
     * 获取360 下载列表
     * @private
     */
    _getHotList(list) {
        // const { data } = this.state;
        // console.log(list)
        FetchManager.get('/app/acbElectricityAlarm/findById',list, async (set) => {
            // debugger;
            console.log(set)
            //下面的就是请求来的数据
            let data = set.data;
            if(set&&set.status === 0){
                if(this.page === 0){
                    let obj = {}
                    obj.createTime = data.createTime
                    // obj.createTime = data.createTime ? data.createTime.substring(0,data.createTime.length - 2) : data.createTime;
                    obj.detail = data.detail
                    obj.deviceId = data.deviceId
                    obj.deviceName = data.deviceName
                    obj.deviceType = data.deviceType

                    this.setState({
                        data: data.map,
                        obj:obj,
                        modelPhoto:data.modelPhoto
                    })
                }else{
                    this.setState({
                        // 加载更多 这个变量不刷新
                        isLoadMore : false,
                        // 数据源刷新 add
                        data: data.map.concat(this.state.data)
                    })
                }
            }
        },this.props)
    }

    /**
     * 下拉刷新
     * @private
     */
    _onRefresh=()=>{
        // const { list } = this.state;
        const { dataLine } = this.props;
        // 不处于 下拉刷新
        if(!this.state.isRefresh){
            // list['page'] = this.page + 1;
            this.page = this.page + 1;
            this._getHotList(dataLine)
        }
    };

    /**
     * 加载更多
     * @private
     */
    _onLoadMore(){
        // const { list } = this.state;
        const { dataLine } = this.props;
        // 不处于正在加载更多 && 有下拉刷新过，因为没数据的时候 会触发加载
        if (!this.state.isLoadMore && this.state.data.length > 0){
            // list['page'] = this.page + 1;
            this.page = this.page + 1;
            this._getHotList(dataLine)
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderBottomColor:'#E2E2E2',
        borderBottomWidth:2,
    },
    rightContainer: {
        flex: 1,
        marginLeft: 10,
    },
    containerLine: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 15,
        color: "#333333",
    },
    content: {
        fontSize: 14,
        color: "#888888",
    },
    thumbnail: {
        width: 40,
        height: 36
    },
});
export default WarnDetail

