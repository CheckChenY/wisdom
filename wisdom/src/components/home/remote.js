import React, {Component} from 'react';
import {
    View,Text,StyleSheet,Switch,
    Image, FlatList, TouchableOpacity,ScrollView,PixelRatio
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FetchManager from '../../http/http';

//屏幕信息
const dimensions = require('Dimensions');
//获取屏幕的宽度和高度
const {width, height} = dimensions.get('window');

export default class HomeView extends Component {


    constructor(){
        super();
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
        }
    }

    componentDidMount(){
        const { dataLine,getComponentFun,deviceId } = this.props;
        // this.setState({
        //     data:dataLine
        // })
        console.log(deviceId);
        debugger;
        this.findSwitchList(dataLine)
    }


    findSwitchList = (id) => {
        const { deviceId } = this.state;
        let obj = {
            parDeviceId: id ? id : deviceId
        }
        console.log(obj)
        FetchManager.get('/app/acbdevice/findSwitchList',obj, async (set) => {
            console.log(set)
            if(set.status === 0 && set.data.length > 0){
                let data = set.data;
                this.setState({
                    dataContainer:data
                })
            }else{
                this.setState({
                    dataContainer:[]
                })
            }
        })
    }

    onChangeSwitch = (item,i) => {
        let obj = {
            deviceId:item.deviceId,
            status:item.commStatus
        }
        console.log(obj)
        FetchManager.get('/app/acbdevice/changeStatus',obj, async (set) => {
            console.log(set)
            if(set.status === 0){

            }
        })
    }




    render() {
        const { data } = this.state;
        return (
            <View>
                <View>
                    <FlatList
                        // style={{height: '100%'}}
                        data={data}
                        //item显示的布局
                        renderItem={({item,i}) => this._createListItem(item,i)}
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
            </View>
        );
    }


    /**
     * 创建布局
     */
    _createListItem(item,i){
        const { navigation } = this.props;
        return (
            <TouchableOpacity onPress={()=>navigation.navigate('lineDetail')}>
                <View style={styles.container}>
                    <View style={{width:50,justifyContent:'center',alignItems:'center',padding:3}}>
                        <Image
                            style={styles.thumbnail}
                            resizeMode ='contain' 
                            source={require('../../img/home/ckdt.png')}
                        />
                    </View>
                    <View style={styles.rightContainer}>
                        <View style={styles.containerLine}>
                            <Text style={styles.title}>线路名称:</Text>
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                        <View style={styles.containerLine}>
                            <Text style={styles.content}>当前状态:</Text>
                            <Text style={styles.content}>{item.warnState==1?'合闸':item.warnState==4?'离线':'分闸'}</Text>
                        </View>
                    </View>
                    <View style={{width:40,justifyContent:'center',alignItems:'center'}}>
                        <Switch
                            //动态改变value
                            value={ item.commStatus === '1' ? true : false }
                            //当切换开关室回调此方法
                            onValueChange={()=>{this.onChangeSwitch(item,i)}}
                        />
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
     * 获取360 下载列表
     * @private
     */
    _getHotList(dataLine) {
        // const { data } = this.state;
        // console.log(list)
        // FetchManager.get('1/devicealertdeal/page',list, async (set) => {
        //     // debugger;
        //     console.log('getAllDeviceByState', set)
        //     //下面的就是请求来的数据
            
        //     if(set&&set.data){
        //         // set.data.createTime = set.data.createTime.replace('T',' ')
                if(this.page === 1){
                    this.setState({
                        data: dataLine
                    })
                }else{
                    this.setState({
                        // 加载更多 这个变量不刷新
                        isLoadMore : false,
                        // 数据源刷新 add
                        data: dataLine.concat(dataLine)
                    })
                }
        //     }else{
        //         // this._signOut();
        //     }
        // },this.props)
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