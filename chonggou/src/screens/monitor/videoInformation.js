import React, {Component} from 'react';
import {
    View,Text,StyleSheet,
    TouchableOpacity, FlatList, Image,AsyncStorage
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Select from '../components/select/selectobj';
import FetchManager from '../fetch/index';
import { getSystem } from '../components/getSystex';
import StatusName from '../components/statusName';
import SystemName from '../components/systemName';


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
            isLoadDone:false,
            term:[{label:'服务期限(全部)',value:0},{label:'有效期',value:1},{label:'即将到期',value:2},{label:'已过期',value:3}],
            system:[],
            defaultSystem:"系统类别(全部)",
            defaultTerm:"服务期限(全部)",
            systemId:'',
            termcode:"",
            list:{
                size:6,
                page:0,
                // systemId:1,
            },
        }
    }

    componentDidMount(){
        const { system,list } = this.state;
        // const { id,orgId,type } = this.props.navigation.state.params;
        // list.systemCode = id;
        // list.orgId = orgId;
        // list.type = type;

        // getSystem().then(res => {
        //     this.setState({
        //         system:res,
        //     })
        // });

        this._getHotList(list)

    }




    // onChangeSystem = (item) => {
    //     const { list } = this.state;
    //     list['systemId'] = item.id;
    //     list['page'] = 0;
    //     this.page = 1;
    //     if(item.value === 0){
    //         delete list.systemId
    //     }
    //     this.setState({
    //         systemId:item.id
    //     })
    //     console.log(list)
    //     this._getHotList(list)
    // }

    // onChangeTerm = (item) => {
    //     const { list } = this.state;
    //     list['termcode'] = item.value;
    //     list['page'] = 0;
    //     this.page = 1;
    //     if(item.value === 0){
    //         delete list.termcode
    //     }
    //     this.setState({
    //         termcode:item.value
    //     },this._getHotList(list))
    // }


    render() {
        const { system,term,defaultSystem,defaultTerm,data } = this.state;
        return (
            <View>
                {/* <View style={styles.title_select}>
                    <View style={{flex:1}}>
                        <Select
                            options={system} 
                            onSelect={this.onChangeSystem}
                            defaultValue={defaultSystem}
                            downMarginTop={15}
                            dropdownWidth={130}
                            />
                    </View>
                    <View style={{flex:1}}>
                        <Select
                            options={term} 
                            onSelect={this.onChangeTerm}
                            defaultValue={defaultTerm}
                            downMarginTop={15}
                            dropdownWidth={130}
                            />
                    </View>
                </View> */}
                <View>
                    <FlatList
                        data={data}
                        //item显示的布局
                        renderItem={({item}) => this._createListItem(item)}
                        // 空布局
                        ListEmptyComponent={this._createEmptyView}
                        ListFooterComponent={this._renderFooter}
                        //下拉刷新相关
                        onRefresh={() => this._onRefresh()}
                        //加载更多
                        onEndReached={() => this._onLoadMore()}
                        refreshing={this.state.isRefresh}
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
        // console.log(item)
        const { navigation } = this.props;
        return (
            <TouchableOpacity onPress={() => navigation.navigate('videoEquipment',{
                id:item.id,
                data:item
                // type:item.type ? Number(item.type) : 1
            })}>
                <View style={styles.container}>
                    <Image
                        style={styles.thumbnail}
                        source={{uri:'http://192.168.0.186:60080/'+item.modelPhoto}}
                    />
                    <View style={styles.rightContainer}>
                        <View style={styles.containerLine}>
                            <Text style={styles.title}>设备名称:</Text>
                            <Text style={styles.content}>{item.deviceName}</Text>
                        </View>
                        <View style={styles.containerLine}>
                            <Text style={styles.title}>设备类型:</Text>
                            <Text style={styles.content}>{ item.deviceModel }</Text>
                        </View>
                        <View style={styles.containerLine}>
                            <Text style={styles.title}>设备位置:</Text>
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
     * 获取360 下载列表
     * @private
     */
    _getHotList(list) {
        console.log(list)
        FetchManager.get('/camera/inner/jtlDeviceCamera/findCameraPageListByOrgId',list, async (set) => {
            //下面的就是请求来的数据
            console.log(set);
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
        const { list,data } = this.state;
        // 不处于 下拉刷新
        if( !this.state.isRefresh && !this.state.isLoadDone && data.length > 5){
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

    _renderFooter(){
        return(
            <View>
                <Text style={{height:55}}>&nbsp;</Text>
            </View>
        )
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
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        // height:40,
        borderColor:'#ccc',borderRadius:4,borderWidth:1,padding:10,backgroundColor:"#F2F7FB"
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
        // height: 25,
    },
    title: {
        fontSize: 15,
        color: "#333",
        fontFamily: "PingFang-SC-Medium",
        fontWeight: "500",
    },
    content: {
        fontSize: 14,
        // color: "#666",
        fontFamily: "PingFang-SC-Medium",
        fontWeight: "500",
    },
    thumbnail: {
        width: 80,
        height: 86
    },
});