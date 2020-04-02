import React, {Component} from 'react';
import {
    View,Text,StyleSheet,AsyncStorage,
    TouchableOpacity, FlatList, Image,ScrollView
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Select from '../components/select/select';
import FetchManager from '../fetch/index';
import SystemName from '../components/systemName';
import StatusName from '../components/statusName';
import { getSystem,getDevice } from '../components/getSystex';
import { getUserName } from '../components/getUserName';

//屏幕信息
const dimensions = require('Dimensions');
//获取屏幕的宽度和高度
const {width, height} = dimensions.get('window');

export default class HomeView extends Component {
    static navigationOptions = ({ navigation }) => {
        // const { id,name } = navigation.state.params;
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
                <Text style={styles.headerMiddle}>处理记录</Text>
            ),
            headerRight:<View></View>,
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
            system:["系统类别(全部)"],
            device:["设备类别(全部)"],
            defaultSystem:"系统类别(全部)",
            defaultDevice:"设备类别(全部)",
            systemId:'',
            deviceId:'',
            page:1,
            objName:'',
            bolRelation:false,
            list:{
                limit:6,
                page:1,
                deal_state: !0,
                // warnState:null,
                // deviceType:null,
            },
        }
        this.onChangeSystem = this.onChangeSystem.bind(this);
        this.onChangeTerm = this.onChangeTerm.bind(this);
    }

    componentDidMount(){
        const { system,list,device } = this.state;
        const { navigation } = this.props,
        { state } = navigation,
        { params } = state;
        getSystem().then(res => {
            if(res){
                res.map(item => (
                    system.push(item.label)
                ))
            }
            this.setState({
                system:system,
            })
        });
        

        //设备
        getDevice().then(res => {
            if(res){
                res.map(item => (
                    device.push(item.label)
                ))
            }
            this.setState({
                device:device,
            })
        });


        //获取所有用户名
        getUserName().then(res => {
            // console.log(res)
            this.setState({
                objName:res,
            })
        });

        list['warnState'] = params.warnState;
        this._getHotList(list)

    }

    onChangeSystem(val){
        const { list } = this.state;
        let nub = Number(val)
        list['systemId'] = nub;
        list['page'] = 1;
        this.page = 1;
        if(nub === 0){
            delete list.systemId
        }
        this.setState({
            systemId:nub
        },this._getHotList(list))
    }

    onChangeTerm(val){
        const { list } = this.state;
        let nub = Number(val)
        list['deviceType'] = nub;
        list['page'] = 1;
        this.page = 1;
        if(nub === 0){
            delete list.deviceType
        }
        this.setState({
            deviceType:nub
        },this._getHotList(list))
    }


    render() {
        const { system,device,defaultSystem,defaultDevice,data } = this.state;
        return (
            <View>
                <View style={styles.title_select}>
                    <Select
                        options={system} 
                        onSelect={this.onChangeSystem}
                        defaultValue={defaultSystem}
                        />
                    <Select
                        options={device} 
                        onSelect={this.onChangeTerm}
                        defaultValue={defaultDevice}
                        />
                </View>
                <View>
                    <FlatList
                        style={{height: '100%', marginBottom: -80}}
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
            </View>
        );
    }


    /**
     * 创建布局
     */
    _createListItem(item){
        const { navigation } = this.props;
        const { objName } = this.state;
        const { warnState } = this.props.navigation.state.params;
        // let time = item.createTime.replace('T',' ')
        let nub = item.profileId === '2' || item.profileId === '1' || item.profileId === '3' || item.profileId === '4' ? this._createLable(item.deviceAlertDeal) : item;
        let time = nub.createTime ? nub.createTime.replace('T',' ') : nub.createTime
        // console.log(objName)
        // console.log(objName[item.warnHandler])
        return (
            <TouchableOpacity onPress={() => navigation.navigate('infoDetailTab',{
                id:nub.id,
                warnState: warnState, // 此id是从监管首页传过来端ID
                name:"处理记录",
                disabled:false,
                systemId:nub.systemId,
                floorId:nub.floorId,
                deviceId:nub.deviceId,
                bolRelation:this.state.bolRelation
            })}>
                <View style={styles.container}>
                    <Image
                        // source={require('../../img/img-01.png')}
                        // style={styles.thumbnail}
                        style={styles.thumbnail}
                        source={{uri:nub.warnDealResultPhoto}}
                    />
                    <View style={styles.rightContainer}>
                        <View style={styles.containerLine}>
                            <Text style={styles.title}>上报时间：</Text>
                            <Text style={styles.content}>{time}</Text>
                        </View>
                        <View style={styles.containerLine}>
                            <Text style={styles.title}>设备名称：</Text>
                            <Text style={styles.content}>{nub.deviceName}</Text>
                        </View>
                        <View style={styles.containerLine}>
                            <Text style={styles.title}>所属系统：</Text>
                            <Text style={styles.content}>{ SystemName[nub.systemId] }</Text>
                        </View>
                        <View style={styles.containerLine}>
                            <Text style={styles.title}>设备状态：</Text>
                            <Text style={styles.content}>{StatusName[nub.warnState]}</Text>
                        </View>
                        <View style={styles.containerLine}>
                            <Text style={styles.title}>设备位置：</Text>
                            <Text style={styles.content}>{nub.location}</Text>
                        </View>
                        <View style={styles.containerLine}>
                            <Text style={styles.title}>处理人：</Text>
                            <Text style={styles.content}>{objName[nub.warnHandler]}</Text>
                        </View>
                    </View>
                    
                    <View style={{width:40,justifyContent:'center',alignItems:'center'}}>
                        <FontAwesome color="#3AA1FE" name="angle-right" size={20} />
                    </View>
                    {/* <FontAwesome color="#3AA1FE" style={{width:40,justifyContent:'center',alignItems:'center'}} name="chevron-right" size={18} /> */}
                </View>
            </TouchableOpacity>
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
     * @private
     */
    _getHotList(list) {
        const { data } = this.state;
        console.log(list)
        FetchManager.get('1/devicealertdeal/page',list, async (set) => {
            console.log(set.data)
            if(set&&set.data){
                if(this.page === 1){
                    this.setState({
                        data: set.data
                    })
                }else{
                    this.setState({
                        isLoadMore : false,
                        data: data.concat(set.data)
                    })
                }
            }else{
                // this._signOut();
            }
        },(err)=>{
            console.log(err)
            // this._signOut();
        })
    }

    // _signOut = async () => {
    //     let userName = await AsyncStorage.getItem('user');
    //     let deviceToken = await AsyncStorage.getItem('deviceToken');
  
    //     let obj = {
    //         userName:userName,
    //         deviceToken:deviceToken
    //     }
    //     FetchManager.get('1/um/destory',obj, async (set) => {
    //         console.log(set)
    //         await AsyncStorage.clear();
    //         this.props.navigation.navigate('SignIn');
    //     })
    // }

    /**
     * 下拉刷新
     * @private
     */
    _onRefresh=()=>{
        const { list } = this.state;
        // 不处于 下拉刷新
        if(!this.state.isRefresh){
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
        if (!this.state.isLoadMore && this.state.data.length > 0){
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
    title_select:{
        flexDirection:'row',alignItems:'center',width:'100%',height:40,borderColor:'#ccc',borderRadius:4,borderWidth:1,padding:10,backgroundColor:"#F2F7FB"
    },
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F2F7FB",
        // backgroundColor: "red",
        padding: 5,
        marginTop:5,
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
});