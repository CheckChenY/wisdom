import React, {Component} from 'react';
import {
    View,Text,StyleSheet,
    TouchableOpacity, FlatList, AsyncStorage,ScrollView
} from 'react-native';
import FetchManager from '../fetch/index';
import { getAllFloor,getSigleFloor } from '../components/getSystex';
export default class DeviceMessageList extends Component {

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
            page:1,
            list:{
                page:0,
                size:6,
                noticeType:1,
            },
            index:1,
            bolRelation:false,
        }
    }

    componentDidMount(){
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            this.getData();
        });
        
        // this._getRelation();//关联动作
    }
    componentWillUnmount() {
        this._navListener.remove();
    }

    // _getRelation = () => {
    //     FetchManager.get('1/unitdeviceApi/state','', async (set) => {
    //         console.log(set)
    //         if(set&&set.msg === '成功'&&set.data === '2'){
    //             //1 是自动  2 手动
    //             this.setState({
    //                 bolRelation:true
    //             })
    //         }
    //     })
    // }

    onChangeIndex = (val) => {
        // debugger;
        const { list } = this.state;
        console.log(val)
        list.noticeType = val;
        list.page = 0;
        this.setState({
            index:val,
            data:[]
        },this.clearData)
        
        // this._getHotList(list)
    }
    
    clearData = () => {
        const { list } = this.state;
        this._getHotList(list)
    }

    getData = () => {
        const { list } = this.state;
        console.log(list)
        // getAllFloor().then(res => {
        //     this.setState({
        //         buildingDic:res,
        //     })
        // }); 

        // getSigleFloor().then(res=>{
        //     // console.log(res) 
        //     if(res.length){
        //         this.setState({
        //             floorDic:res,
        //         })
        //     }
        // })

        list.page = 0;
        this.page = 1;
        this._getHotList(list)
    }


    render() {
        const { data } = this.state;
        return (
            <View>
                <FlatList
                    // style={styles.container}
                    data={data}
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
        );
    }


    /**
     * 创建布局
     */
    _createListItem(item){
        const { navigation } = this.props;
        const { index,bolRelation } = this.state;
        // let url = index === 1 ? 'infoDetailTab' : 
        //         index === 3 ? 'NoticeAnnounce' : 
        //         index === 2 && item.satate === '1' ? 'PatrolRecordList' : 
        //         index === 2 ? 'PatrolDetaiList' : '';

        let url = index === 1 ? 'warningMessage' : 
                index === 2 ? 'patrolMessage' : 
                index === 3 && item.noticeType === '32' ? 'NoticeAnnounce' :
                index === 3 && item.noticeType === '31' ? 'noticeMessage' : //noticeMessage  NoticeAnnounce
                index === 3 && item.noticeType === '33' ? 'realyMessage' : //noticeMessage  NoticeAnnounce
                index === 4 ? 'systemMessage' : '';
        // console.log(url);
        let bol = index === 1 && item.satate === '1' ? false : true;
        let getId = index === 1 ? item.deviceAlertId : index === 3 ? item.id : item.safeTaskId

        
        return (
            <View style={styles.container}> 
                <Text style={styles.title}>{item.sendTime}</Text>
                <TouchableOpacity onPress={()=>navigation.navigate(url,{
                    data:item
                })}>
                    <View style={styles.box}>
                        <Text style={styles.box_title}>
                            {item.acceptNoticeTitle}
                        </Text>
                        {
                            item.noticeType=='1'?(
                                <Text style={styles.box_localtion_message}>{item.subordinateSystem}</Text>
                            ):item.noticeType=='2'?(
                                <Text style={styles.box_localtion_message}>{item.noticeUser}</Text>
                            ):item.noticeType=='3'?(
                                <Text style={styles.box_localtion_message}>{item.noticeUser}</Text>
                            ):(
                                <Text style={styles.box_localtion_message}>{item.noticeUser}</Text>
                            )
                        }
                        
                        <Text style={styles.box_localtion_message}>{item.acceptNoticeContent}</Text>
                        {/* <Text style={styles.status}>{item.statusType===1?'已读':'未读'}</Text> */}

                        {
                            item.statusType === 0 ? (
                                <Text style={[styles.status,{ width: 10, height: 10, 
                                    borderRadius: 15, alignItems: 'center', 
                                    backgroundColor:'#FD3E3C', 
                                    marginTop: 5 }]} />
                            ) : <Text />
                        }
                        
                    </View>
                </TouchableOpacity>
            </View>
        );
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
     * @private
     */
    _getHotList(list) {
        const {  data } = this.state;
        console.log(list);
        FetchManager.post('/notice/inner/jtlNoticeAcceptMessage/findAppMessage',list, async (set) => {
            console.log(set);
            if(set&&set.success&&set.value){
                let datas = set.value
                if(this.page === 1){
                    // data = [];
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
        })
    }

    /**
     * 下拉刷新
     * @private
     */
    _onRefresh=()=>{
        const { list,data } = this.state;
        // 不处于 下拉刷新
        if(!this.state.isRefresh && !this.state.isLoadDone && data.length > 5){
            list['page'] = this.page + 1;
            this.page = this.page + 1;
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
            list['page'] = this.page + 1;
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
    container:{
        padding:10,
        backgroundColor:"#F5FCFF"
    },
    title:{
        textAlign:'center',fontSize:13,color:"#788A93"
    },
    box:{
        backgroundColor:"#FFFFFF",padding:15,flexDirection:"column",marginTop:10,position:'relative'
    },
    status:{
        color:"#999999",fontSize:14,position:'absolute',right:10,top:10,
    },
    box_title:{fontSize:16,color:"#333333",fontWeight:"900"},
    box_localtion:{flexDirection:"row",paddingBottom:15,paddingTop:15},
    box_localtion_left:{fontSize:15,fontWeight:"600",color:"#333333",},
    box_localtion_right:{flex:1,color:"#666666",fontSize:14},
    box_localtion_message:{color:"#999999",fontSize:14,lineHeight:16},
    thumbnail: {
        width: 80,
        height: 86
    },
});