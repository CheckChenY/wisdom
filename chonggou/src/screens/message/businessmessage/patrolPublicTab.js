import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, FlatList, Image,ScrollView,PixelRatio,Linking
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FetchManager from '../../fetch/index';



export default class HomeView extends Component {

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
            index:2,
            list:{
                size:6,
                page:0,
                patrolStatus:1,
            },
            patrolStatus:1,
            state:2
        }
    }

    componentDidMount(){
        const {list} = this.state;
        // debugger;
        // const { patrolStatus } = this.props;
        // console.log(patrolStatus)
        // executiveCondition  执行情况 1巡查中  2待巡查
        // patrolResult 巡查结果 ：1已完成 2未完成

        this.props.navigation.addListener('didFocus', () => {
            this._getHotList(list)
        });
    }

    // const { index } = this.props;
    onChangeIndex = (val) => {
        console.log(val)
        const {list} = this.state;
        list['page'] = 0;
        list['patrolStatus'] = val+1;
        this.setState({
            data:[],
            state:val+1,
            patrolStatus:val+1
        },this.clearData)
    }
    

    clearData = () => {
        const { list } = this.state;
        this._getHotList(list)
    }


    render() {
        const { data } = this.state;

        return (
            <View style={{backgroundColor:"#F2F7FB",margin:5}}>
                <FlatList
                    // style={styles.container}
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
            </View>
        );
    }


    /**
     * 创建布局
     */
    _createListItem(item){
        const { navigation } = this.props;
        const { state,patrolStatus } = this.state;
        // let url = state === 2 ? 'actionPatrolFromDetail' : 'PatrolRecord';
        // 巡查状态：1已巡查  2待巡查  3漏巡查
        return (
            <TouchableOpacity onPress={()=>navigation.navigate('PatrolRecord',{
                id:item.id,
                code:item.cardCode,
                patrolStatus:patrolStatus
              })}>
                <View style={styles.container}>
                    <View style={styles.rightContainer}>
                        <View style={styles.containerLine}>
                            <Text style={styles.content}>{item.patrolPointName}</Text>
                        </View>
                        <View style={styles.containerLine}>
                            <Text style={styles.title}>巡查周期：</Text>
                            <Text style={styles.content}>{item.startTime}--{item.endTime}</Text>
                        </View>
                        <View style={styles.containerLine}>
                            <Text style={styles.title}>巡查卡编号：</Text>
                            <Text style={styles.content}>{item.cardCode}</Text>
                        </View>
                        <View style={styles.containerLine}>
                            <Text style={styles.title}>巡查状态：</Text>
                            <Text style={styles.content}>{item.patrolStatus === '1' ? '已巡查' : 
                                item.patrolStatus === '2' ? '待巡查' : '漏巡查'}</Text>
                        </View>
                        <View style={styles.containerLine}>
                            <Text style={styles.title}>巡查点位置：</Text>
                            <Text style={styles.content}>{item.location}</Text>
                        </View>
                    </View>
                    
                    <View style={{width:40,justifyContent:'center',alignItems:'center'}}>
                        <FontAwesome color="#3AA1FE" name="angle-right" size={20} />
                    </View>
                </View> 
            </TouchableOpacity>
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
     * 
     * @private
     */
    _getHotList(list) {
        const { data } = this.state;
        console.log(list)
        //巡查任务详情  3
        FetchManager.post('/safe/inner/safePatrolRecord/findPatrolRecord',list, async (set) => {
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
        })
    }

    /**
     * 下啦刷新
     * @private
     */
    _onRefresh=()=>{
        const { list } = this.state;
        // 不处于 下拉刷新
        if(!this.state.isRefresh && !this.state.isLoadDone){
            list['page'] = list.page + 1;
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
        // console.log(list)
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
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        marginTop:5,
    },
    rightContainer: {
        flex: 1,
        marginLeft: 10,
    },
    containerLine: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop:5
    },
    title: {
        fontSize: 14,
        color: "#333",
    },
    content: {
        fontSize: 14,
        color: "#666",
    },
});