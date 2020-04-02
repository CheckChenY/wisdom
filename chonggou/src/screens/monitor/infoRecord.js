import React, {Component} from 'react';
import {
    View,Text,StyleSheet,
    TouchableOpacity, FlatList, AsyncStorage,ScrollView, Platform
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Select from '../components/select/selectobj';
import FetchManager from '../fetch/index';
import SystemName from '../components/systemName';
import StatusName from '../components/statusName';
import { getSystem,getDevice } from '../components/getSystex';

//屏幕信息
const dimensions = require('Dimensions');
//获取屏幕的宽度和高度
const {width, height} = dimensions.get('window');

class Content extends Component{
    render(){
        return(
            <View style={{ flexDirection: 'row',paddingLeft:20,marginBottom:10 }}>
                <View style={{ width:120 }}>
                    <Text style={{textAlign: 'right',fontSize:14,color:'#333' }}>{this.props.left}</Text>
                </View>
                <View style={{ flex:1}}>
                    <Text style={{ fontSize:14,color:'#666' }}>{this.props.right}</Text>
                </View>
            </View>
        )
    }
}

class TableContent extends Component{
    render(){
        const { list,index } = this.props;
        return(
            <View>
                {
                    list && list.map((item,i)=>(
                        <View key={i} style={{flexDirection:'row',width:260,borderWidth:1,borderColor:'#F2F7FB',borderTopWidth:0}}>
                            <View style={{borderRightWidth:1,borderRightColor:'#F2F7FB',flex:1}}>
                                <Text style={{textAlign:'center',padding:5}}>
                                    { index === 0 ? item.dataDic : item.thresholdKey }
                                </Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={{textAlign:'center',padding:5}}>
                                    { index === 0 ? item.dataS : item.value }
                                </Text>
                            </View>
                        </View>
                    ))
                }
            </View>
        )
    }
}

export default class HomeView extends Component {
    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params;
        return {
            headerLeft: (
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={{flexDirection: 'row',paddingLeft:15, alignItems: 'center'}}>
                        <FontAwesome color="#fff" name="angle-left" size={28}/>
                        <Text style={{color:'#fff', fontSize: 16, paddingLeft:5}}>返回</Text>
                    </View>
                </TouchableOpacity>
            ),
            headerTitle: (
                <Text style={styles.headerMiddle}>{'警情记录'}</Text>
            ),
            headerRight:(
                <Text />
                // <TouchableOpacity onPress={()=>navigation.navigate('processingRecords',{
                //     warnState:warnState,
                //     name:name,//报警故障离线列表
                // })}>
                //     <Text style={{color:'#fff',marginRight:15,fontSize:16,fontWeight:'700'}}>
                //         处理记录
                //     </Text>
                // </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: 'linear-gradient(-30deg,rgba(58,161,254,1) 0%,rgba(48,191,251,1) 100%)'
            }
        };
    }

    constructor(props){
        super(props);
        //当前页
        this.page = 1
        //状态
        this.state = {
            // 列表数据结构
            data:[],
            // 下拉刷新
            isRefresh:false,
            // 加载更多
            isLoadMore:true,
            isLoadDone:false,
            list:{
                size:6,
                page:0,
                // alarmType:null,
                // startTime:null,
                // endTime:null
            },
        }
    }

    componentDidMount(){
        const { list } = this.state;
        const { deviceId } = this.props.navigation.state.params;

        list.deviceId = deviceId

        this._getHotList(list)
    }

    render() {
        const { data } = this.state;
        return (
            <FlatList
                data={data}
                //item显示的布局
                renderItem={({item}) => this._createListItem(item)}
                // 空布局
                ListEmptyComponent={this._createEmptyView}
                //下拉刷新相关
                onRefresh={() => this._onRefresh()}
                refreshing={this.state.isRefresh}
                //加载更多
                onEndReached={() => this._onLoadMore()}
                onEndReachedThreshold={0.1}
            />
        );
    }


    /**
     * 创建布局
     */
    _createListItem(item){
        return (
            <View style={{padding:5,borderTopColor:'#F2F7FB',marginTop:5,borderTopWidth:4}}>
                <View style={{ paddingTop:5,paddingBottom:5 }}>
                    <Content left='上报时间：' right={item.createTime}/>
                    <Content left='设备状态：' right={StatusName[item.alarmType]}/>
                    <Content left='报警类型：' right={item.alarmDetails}/>
                </View>
                <View style={styles.tit}>
                    <Text style={{color:'#3AA1FE',fontSize:16}}>实时数据</Text>
                </View>
                <View style={{paddingTop:5,paddingBottom:5,justifyContent:'center',alignItems:'center' }}>
                    <View style={{flexDirection:'row',width:260}}>
                        <View style={{borderWidth:1,borderColor:'#F2F7FB',flex:1,borderRightWidth:0}}>
                            <Text style={{textAlign:'center',padding:5}}>数据类型</Text>
                        </View>
                        <View style={{borderWidth:1,borderColor:'#F2F7FB',flex:1}}>
                            <Text style={{textAlign:'center',padding:5}}>实时数据</Text>
                        </View>
                    </View>
                    <TableContent index={0} list={item.nowDates} />
                </View>

                <View style={styles.tit}>
                    <Text style={{color:'#3AA1FE',fontSize:16}}>阈值数据</Text>
                </View>
                <View style={{paddingTop:5,paddingBottom:5,justifyContent:'center',alignItems:'center' }}>
                    <View style={{flexDirection:'row',width:260}}>
                        <View style={{borderWidth:1,borderColor:'#F2F7FB',flex:1,borderRightWidth:0}}>
                            <Text style={{textAlign:'center',padding:5}}>数据类型</Text>
                        </View>
                        <View style={{borderWidth:1,borderColor:'#F2F7FB',flex:1}}>
                            <Text style={{textAlign:'center',padding:5}}>实时数据</Text>
                        </View>
                    </View>
                    <TableContent index={1} list={item.thresholdDates} />
                </View>
            </View>
        );
    }

    _createLable = (item) => {
      return item
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
        const { data } = this.state;
        console.log(list)
        FetchManager.get('/alarm/inner/jtlAlarmRecord/getAlarmByDevice',list, async (set) => {
            // debugger;
            console.log(set)
            //下面的就是请求来的数据
            if(set&&set.success){
                let datas = set.value;
                if(this.page === 1){
                    this.setState({
                        data: datas.content
                    })
                }else{
                    if(datas.content.length < 6){
                        this.setState({
                            // 加载更多 这个变量不刷新
                            isLoadMore : true,
                            isLoadDone : true,
                            // 数据源刷新 add
                            data: this.state.data.concat(datas.content)
                        })
                    }else{
                        this.setState({
                            // 加载更多 这个变量不刷新
                            isLoadMore : false,
                            // 数据源刷新 add
                            data: this.state.data.concat(datas.content)
                        })
                    }
                }
            }
        },this.props)
    }

    /**
     * 下拉刷新
     * @private
     */
    _onRefresh=()=>{
        const { list,data } = this.state;
        // 不处于 下拉刷新
        if(!this.state.isRefresh && !this.state.isLoadDone && data.length > 5){
            list['page'] = list.page + 1;
            this.page = this.page + 1;
            console.log(list)
            this._getHotList(list)
        }
    };

    /**
     * 加载更多
     * @private
     */
    _onLoadMore(){
        const { list } = this.state;
        // 不处于正在加载更多 && 有下拉刷新过，因为没数据的时候 会触发加载
        if (!this.state.isLoadMore && this.state.data.length > 0 && !this.state.isLoadDone){
            list['page'] = list.page + 1;
            this.page = this.page + 1;
            this._getHotList(list)
        }
    }
}


const styles = StyleSheet.create({
    headerMiddle: {
        color: "rgba(255,255,255,1)",
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
        textAlign: 'center',
    }, 
    title_select:{
        flexDirection:'row',alignItems:'center',width:'100%',height:40,borderColor:'#ccc',
        borderRadius:4,borderWidth:1,padding:10,backgroundColor:"#F2F7FB"
    },
    container: {
        backgroundColor: "#F2F7FB",
        padding: 8,
        marginTop:5,
        flexDirection:'row'
    },
    containerLine: {
        flexDirection: "row",
    },
    title: {
        fontSize: 14,
        color: "#333",
        fontFamily: "PingFang-SC-Medium",
        fontWeight: "500",
    },
    content: {
        fontSize: 14,
        color: "#666",
        fontFamily: "PingFang-SC-Medium",
        fontWeight: "500",
    },
    thumbnail: {
        width: 80,
        height: 86
    },
    tit: {
        padding:5,
        margin:5,
        backgroundColor: '#F2F7FB',
        flexDirection:'row'
    },
});