import React , { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Text,View,TouchableOpacity,StyleSheet,FlatList,TextInput} from 'react-native';
import FetchManager from '../../http/http';
import moment from 'moment';
import { changeTime } from './../../components/changeTime';


class WarnList extends Component{
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerLeft:(
                <TouchableOpacity onPress={()=>navigation.navigate('home')} style={{paddingRight:15,}}>
                    <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                        <FontAwesome style={{ color: '#FFFFFF' }} name="chevron-left" size={18} />
                    </View>
                </TouchableOpacity>
            ),
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, color: '#fff' }}>警情消息</Text>
            ),
            headerRight: <View/>,
            headerStyle: {
                backgroundColor: '#467cd4',
            }
        };
    };
    constructor() {
        super()
        this.state = {
            data:[],
            // 下拉刷新
            isRefresh: false,
            // 加载更多
            isLoadMore: true,
            list:{},
        }
    }


    componentDidMount(){
        this.init()
    }

    init=()=>{
        let time=new Date()
        let y=time.getFullYear()
        let m=time.getMonth()+1<10?'0'+time.getMonth()+1:time.getMonth()+1
        let d=time.getDate()<10?'0'+time.getDate():time.getDate()
        
        let endTime=y+'-'+m+'-'+d
        console.log(endTime)
        let list={
            pageSize: 10,
            page: 0,
            startTime:'2019-01-01',
            endTime:endTime
        }
        console.log(list)
        this.setState({
            list:list
        })
        this._getHotList(list)
    }

    render(){
        return(
            <FlatList
                style={{backgroundColor:'#E0E0E0'}}
                data={this.state.data}
                //item显示的布局
                renderItem={({item}) => this._createListItem(item)}
                // 空布局
                ListEmptyComponent={this._createEmptyView}
                //下拉刷新相关
                onRefresh={()=>{this._onRefresh()}}
                refreshing={this.state.isRefresh}
                //加载更多
                onEndReached={() => this._onLoadMore()}
                onEndReachedThreshold={0.1}
            />
        )
    }

    _createListItem=(item)=>{
        // let time = item.createDate ? item.createDate.substring(0,item.createDate.length - 2) : item.createDate;
        return (
            <View style={{margin:10,backgroundColor:'#FFFFFF',padding:10}}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#999',fontSize:14}}>{ item.createTime }</Text>
                    {/* <Text style={{color:'#999',fontSize:14}}>{ time }</Text> */}
                </View>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('warndetail',{
                    id:item.id,
                    createDate:item.createDate,
                    detail:item.detail
                })}>
                    <View style={{padding:5}}>
                        <View>
                            <Text style={{fontSize:14,color:'#333'}}>{item.deviceName}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:14,color:'#333'}}>报警状态：</Text>
                            <Text style={{fontSize:14,color:'#FF0000'}}>{item.detail}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:14,color:'#666'}}>报警时间：</Text>
                            <Text style={{fontSize:14,color:'#666'}}>{item.createDate.split('.')[0]}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:14,color:'#666'}}>安装位置：</Text>
                            <Text style={{fontSize:14,color:'#666'}}>{item.location}</Text>
                        </View>
                        <View>
                            <Text style={{fontSize:12,color:'#999'}}>您有新的敬请信息，请及时处理</Text>
                        </View>
                    </View>
                </TouchableOpacity>
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
        FetchManager.get('/app/acbElectricityAlarm/getAlertPage',list, async (set) => {
            // debugger;
            console.log(set)
            //下面的就是请求来的数据
            let data = set.data.data;
            if(set&&set.status === 0){
        //         // set.data.createTime = set.data.createTime.replace('T',' ')
                if(this.state.list.page === 0){
                    this.setState({
                        data: data
                    })
                }else{
                    this.setState({
                        // 加载更多 这个变量不刷新
                        isLoadMore : false,
                        // 数据源刷新 add
                        data: data.concat(data)
                    })
                }
            }else{
                // this._signOut();
            }
        },this.props)
    }

    /**
     * 下拉刷新
     * @private
     */
    _onRefresh=()=>{
        // 不处于 下拉刷新
        if(!this.state.isRefresh){
            this.init()
        }
    };

    /**
     * 加载更多
     * @private
     */
    _onLoadMore(){
        const { list } = this.state;
        console.log(list)
        list.pageSize=list.pageSize+10
        this._getHotList(list)
        // const { dataLine } = this.props;
        // // 不处于正在加载更多 && 有下拉刷新过，因为没数据的时候 会触发加载
        // if (!this.state.isLoadMore && this.state.data.length > 0){
        //     // list['page'] = this.page + 1;
        //     this.page = this.page + 1;
        //     this._getHotList(dataLine)
        // }
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
export default WarnList