import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, FlatList, Image,ScrollView,PixelRatio,Linking
} from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FetchManager from '../fetch/index';
import { getSystem,getDevice,getAllFloor,getSigleFloor } from '../components/getSystex';
import StatusName from '../components/statusName';
// import { getDialogMsg } from '../components/warnPublic';

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
            index:0,
            list:{
                pageSize:6,
                page:0,
            },
            source:{
                '1':'一键上报',
                '2':'巡查上报'
            },
            floorDic:[],
            buildingDic:[],
            // userDic:{},
            bolRelationText:'',//联动状态
        }
    }

    // pageSize=6&page=0&deviceId=WG0002
    componentDidMount(){
        const {list} = this.state;

        let deviceId = this.props.navigation.state.params.deviceId ? this.props.navigation.state.params.deviceId : '';

        list.deviceId = deviceId;
        this._getHotList(list)
    }

    // const { index } = this.props;
    onChangeIndex = (val) => {
        // const { onPressToChang } = this;
        const { list } = this.state;
        list['page'] = 0;
        this.setState({
            data:[]
        },this.clearData)

    }

    
    
    clearData = () => {
        const { list } = this.state;
        this._getHotList(list)
    }


    render() {
        const { data } = this.state;
        return (
            <View style={{backgroundColor:"#FFFFFF",margin:5}}>
                <View>
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
                        // onEndReached={() => this._onLoadMore()}
                        onEndReachedThreshold={0.1}
                    />
                </View>
            </View>
        );
    }


    /**
     * 创建布局
     */
    _createListItem(item){
        // let stausTxt = getDialogMsg(item);
        return (
            <View>
                <View style={styles.container}>
                <View style={styles.containerLine}>
                        <Text style={styles.title}>设备ID：</Text>
                        <Text style={styles.content}>{item.deviceId}</Text>
                    </View>
                    <View style={styles.containerLine}>
                        <Text style={styles.title}>设备名称：</Text>
                        <Text style={styles.content}>{item.deviceName}</Text>
                    </View>
                    <View style={styles.containerLine}>
                        <Text style={styles.title}>设备类型：</Text>
                        <Text style={styles.content}>{item.type}</Text>
                    </View>
                    <View style={styles.containerLine}>
                        <Text style={styles.title}>所属系统：</Text>
                        <Text style={styles.content}>{item.system}</Text>
                    </View>
                    <View style={styles.containerLine}>
                        <Text style={styles.title}>当前状态：</Text>
                        <Text style={styles.content}>{StatusName[item.warnState]}</Text>
                    </View>
                    {/* <View style={styles.containerLine}>
                        <Text style={styles.title}>状态描述：</Text>
                        <Text style={styles.content}>{stausTxt}</Text>
                    </View> */}
                    <View style={styles.containerLine}>
                        <Text style={styles.title}>设备位置：</Text>
                        <Text style={styles.content}>{item.location}</Text>
                    </View>
                </View> 
                <View style={{height:5,backgroundColor:'#F2F7FB'}}></View>
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
     * 
     * @private
     */
    _getHotList(list) {
        const { data } = this.state;
        console.log(list)
        FetchManager.get('/device/inner/jtlDevice/getLinkDevice',list, async (set) => {
            // debugger;
            console.log(set)
            //下面的就是请求来的数据
            if(set&&set.success&&set.value.content){
                if(this.page === 1){
                    let datas = set.value;
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
            }else{
                this.setState({
                    data: []
                })
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
    container: {
        backgroundColor: "#FFFFFF",
        padding: 5,
        marginTop:5
    },
    containerLine: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 14,
        color: "#333",
    },
    content: {
        fontSize: 14,
        color: "#666",
    },
    contentAlarm: {
        fontSize: 14,
        color: "#FD3E3C",
    },
    contentMalfunction: {
        fontSize: 14,
        color: "#FEB52E",
    },
    contentOffline: {
        fontSize: 14,
        color: "#9E9E9E",
    },
    contentNormal: {
        fontSize: 14,
        color: "#2BD957",
    },
    thumbnail: {
        width: 80,
        height: 86
    },
    list: {
        backgroundColor: "#fff",
    },
    headerMiddle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
        textAlign: 'center',
    },
});