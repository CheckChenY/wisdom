import React, {Component} from 'react';
import {
    View,Text,StyleSheet,
    TouchableOpacity, FlatList, AsyncStorage,ScrollView
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
                <Text style={styles.headerMiddle}>{title}</Text>
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
            system:['系统类别(全部)'],
            device:['设备类别(全部)'],
            defaultSystem:"系统类别(全部)",
            defaultDevice:"设备类别(全部)",
            systemId:'',
            deviceId:'',
            bolRelation:false,
            page:1,
            list:{
                pageSize:6,
                page:0,
            },
            id:'',
            title:"设备列表"
        }
    }

    componentDidMount(){
        const { list } = this.state;
        const { id,orgId,type,title } = this.props.navigation.state.params;
        list.systemCode = id;
        list.orgId = orgId;
        list.type = type;

        this.setState({
            id:id,
            title:title
        })

        getSystem().then(res => {
            this.setState({
                system:res,
            })
        });


        //设备
        getDevice().then(res => {
            this.setState({
                device:res,
            })
        });
        
        // this._getRelation();//关联动作
        this._getHotList(list)
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


    onChangeSystem=(item)=>{
        const { list } = this.state;
        list['systemId'] = item.id;
        list['page'] = 0;
        this.page = 1;
        if(item.value === 0){
            delete list.systemId
        }
        this.setState({
            systemId:item.id
        },this._getHotList(list))
    }

    onChangeTerm=(item)=>{
        const { list } = this.state;
        list['deviceId'] = item.value;
        list['page'] = 0;
        this.page = 1;
        if(item.value === 0){
            delete list.deviceId
        }
        this.setState({
            deviceId:item.value
        },this._getHotList(list))
    }


    render() {
        const { system,device,defaultSystem,defaultDevice,data } = this.state;
        return (
            <View>
                <View style={styles.title_select}>
                    <View style={{flex:1}}>
                        <Select
                            options={system} 
                            onSelect={this.onChangeSystem}
                            defaultValue={defaultSystem}
                            downMarginTop={10}
                            dropdownWidth={130}
                            />
                    </View>
                    <View style={{flex:1}}>
                        <Select
                            options={device} 
                            onSelect={this.onChangeTerm}
                            defaultValue={defaultDevice}
                            downMarginTop={10}
                            dropdownWidth={130}
                            />
                    </View>
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
        const { navigation } = this.props,
        { id } = navigation.state.params;
        return (
            <TouchableOpacity onPress={() => navigation.navigate('deviceInformation',{
                id:id,
                orgId:item.id,//代表orgid
                type:'2',//查询公司下的设备
                title:item.orgName,
            })}>
                <View style={styles.container}>
                    <View style={{flex:1}}>
                        <View style={styles.containerLine}>
                            <View style={{flex:1}}>
                                <View style={styles.containerLine}>
                                    <Text style={styles.title}>单位名称:</Text>
                                    <Text style={styles.content}>{item.orgName}</Text>
                                </View>
                                {/* <View style={styles.containerLine}>
                                    <Text style={styles.title}>单位类型:</Text>
                                    <Text style={styles.content}>{item.orgName}</Text>
                                </View> */}
                                <View style={styles.containerLine}>
                                    <Text style={styles.title}>设备位置:</Text>
                                    <Text style={styles.content}>{item.address}</Text>
                                </View>
                            </View>
                            <View style={{width:60,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{width:30,height:30,borderRadius:15,textAlign:'center',
                                    lineHeight:30,borderWidth:1,borderColor:'#34523f'}}>{item.score}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <Text>设备数量:{item.deviceNumbers}</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text>正常设备:{item.normalDeviceNumbers}</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text>异常设备:{item.unusualDeviceNumbers}</Text>
                            </View>
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
     * 获取360 下载列表
     * @private
     */
    _getHotList(list) {
        const { data } = this.state;
        console.log(list)///device/inner/jtlDevice/getCompanyListApp
        FetchManager.get('/device/inner/jtlDevice/getCompanyListApp',list, async (set) => {
            // debugger;
            console.log(set)
            //下面的就是请求来的数据
            if(set&&set.success){
                if(this.page === 1){
                    this.setState({
                        data: set.value.content
                    })
                }else{
                    this.setState({
                        // 加载更多 这个变量不刷新
                        isLoadMore : false,
                        // 数据源刷新 add
                        // data: data.concat(set.data)
                    })
                }
            }
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
        if (!this.state.isLoadMore && this.state.data.length > 0){
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
        flexDirection:'row',alignItems:'center',width:'100%',height:40,borderColor:'#ccc',borderRadius:4,borderWidth:1,padding:10,backgroundColor:"#F2F7FB"
    },
    container: {
        backgroundColor: "#F2F7FB",
        padding: 8,
        marginTop:5,
        flexDirection:'row'
    },
    rightContainer: {
        flex: 1,
        marginLeft: 10,
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
});