import React, {Component} from 'react';
import {
    View,Text,StyleSheet,
    TouchableOpacity, FlatList, AsyncStorage,ScrollView
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Select from '../components/select/selectobj';
import FetchManager from '../fetch/index';
import { getUserName,getAllUserByOrgId } from '../components/getUserName';

//屏幕信息
const dimensions = require('Dimensions');
//获取屏幕的宽度和高度
const {width, height} = dimensions.get('window');

export default class HomeView extends Component {
    static navigationOptions = ({ navigation }) => {
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
                <Text style={styles.headerMiddle}>{'操作记录'}</Text>
            ),
            headerRight:<Text/>,
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
            recordList:[{label:'远程操作(全部)',value:0},{label:'消音',value:1},
            {label:'自检',value:2},{label:'复位',value:3},
            {label:'上电',value:4},{label:'断电',value:5},{label:'断电',value:6}],
            user:['操作人(全部)'],
            defaultRecord:"远程操作(全部)",
            recordId:'',
            userId:'',
            objName:{},
            userList:[{label:'远程操作(全部)',value:0}],
            defaultUser:"操作人(全部)",
            list:{
                pageSize:6,
                page:0,
            },
        }
    }

    componentDidMount(){
        const { list } = this.state;
        const { deviceId } = this.props.navigation.state.params;
        list.deviceId = deviceId

        this._getHotList(list)
    }


    // onChangeRecord(item){
    //     const { list } = this.state;
    //     list['recordId'] = item.value;
    //     list['page'] = 0;
    //     this.page = 1;
    //     if(item.value === 0){
    //         delete list.recordId
    //     }
    //     this.setState({
    //         recordId:item.value
    //     },this._getHotList(list))
    // }

    // onChangeUser(item,index){
    //     const { list,user,objName } = this.state;
    //     let nub='',label='';
    //     // debugger;
    //     if(val === '0'){
    //         delete list.userId
    //     }else{
    //         nub = objName.filter(f=>f.label === index)
    //         label = nub ? nub[0].value : 0;
    //         list['userId'] = label;
    //     }

    //     list['page'] = 1;
    //     this.page = 1;
    //     this.setState({
    //         userId:item.value
    //     },this._getHotList(list))
    // }


    render() {
        const { userList,defaultRecord,defaultUser,data,recordList } = this.state;
        // console.log(objNameDic)
        return (
            <View style={{height: '100%',}}>
                {/* <View style={styles.title_select}>
                    <View style={{flex:1}}>
                        <Select
                            options={recordList} 
                            onSelect={this.onChangeRecord}
                            defaultValue={defaultRecord}
                            downMarginTop={12}
                            dropdownWidth={130}
                        />
                    </View>
                    <View style={{flex:1}}>
                        <Select
                            options={userList} 
                            onSelect={this.onChangeUser}
                            defaultValue={defaultUser}
                            downMarginTop={12}
                            dropdownWidth={130}
                            />
                    </View>
                </View> */}
                <View style={{height: '100%',}}>
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
                        // 加载更多
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
        return (
            <View style={styles.container}>
                <View style={styles.rightContainer}>
                    <View style={styles.containerLine}>
                        <Text style={styles.title}>操作时间：</Text>
                        <Text style={styles.content}>{item.createTime}</Text>
                    </View>
                    <View style={styles.containerLine}>
                        <Text style={styles.title}>操作人：</Text>
                        <Text style={styles.content}>{item.userName}</Text>
                    </View>
                    <View style={styles.containerLine}>
                        <Text style={styles.title}>操作：</Text>
                        <Text style={styles[item.statusColor]}>{item.operationDesc}</Text>
                    </View>
                    <View style={styles.containerLine}>
                        <Text style={styles.title}>操作反馈：</Text>
                        <Text style={styles.content}>{item.operationResult}</Text>
                    </View>
                </View>
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
     * 获取360 下载列表
     * @private
     */
    _getHotList(list) {
        const { data } = this.state;
        console.log(list)
        FetchManager.get('/device/inner/jtlDeviceOperationLog/findByDeviceId',list, async (set) => {
            // debugger;
            console.log(set)
            //下面的就是请求来的数据
            
            if(set&&set.value&&set.value.content){
                if(this.page === 1){
                    this.setState({
                        data: set.value.content
                    })
                }else{
                    this.setState({
                        // 加载更多 这个变量不刷新
                        isLoadMore : false,
                        // 数据源刷新 add
                        data: data.concat(set.value.content)
                    })
                }
            }else{
                this.setState({
                    data: []
                })
            }
        },(err)=>{
            console.log(err)
            // this._signOut();
        })
    }

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
    },
    content: {
        fontSize: 14,
        color: "#666",
    },
    thumbnail: {
        width: 80,
        height: 86
    },
});