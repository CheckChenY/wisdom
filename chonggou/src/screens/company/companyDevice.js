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
                <Text style={styles.headerMiddle}>接入设备</Text>
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
            term:[{label:'服务期限(全部)',value:0},{label:'有效期',value:1},{label:'即将到期',value:2},{label:'已过期',value:3}],
            system:[],
            defaultSystem:"系统类别(全部)",
            defaultTerm:"服务期限(全部)",
            systemId:'',
            termcode:"",
            list:{
                size:6,
                page:0,
                // systemCode:'1574920051754848',
                // orgId:'1575882844347382',
                // type:'2'
            },
        }
    }

    componentDidMount(){
        const { system,list } = this.state;
        const { companyId } = this.props.navigation.state.params;
        // list.systemCode = id;
        // list.orgId = orgId;
        list.companyId = companyId;

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
            <View style={{backgroundColor:"#F2F7FB",height:'100%'}}>
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
            <TouchableOpacity onPress={() => navigation.navigate('equipmentStatue',{
                deviceId:item.deviceId
            })}>
                <View style={{flexDirection:'row',marginBottom:5,backgroundColor:"#FFFFFF"}}>
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
                            <Text style={styles.title}>设备状态:</Text>
                            {/* <Text style={styles.content}>{StatusName[item.warnState]}</Text> */}
                            <Text style={[styles.content,{
                                color:item.warnState === '0' ? '#149E5B' :
                                item.warnState === '1' || item.warnState === '3' || item.warnState === '11' ? '#DC4D41' :
                                item.warnState === '2' ? '#FFCD41' :
                                 '#666'
                            }]}>{StatusName[item.warnState]}</Text>

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
        const { data } = this.state;
        ///device/inner/jtlDeviceCUD/findDevicePage?page=0&size=4&companyId=1575882844353821
        FetchManager.get('/device/inner/jtlDeviceCUD/findDevicePage',list, async (set) => {
            //下面的就是请求来的数据
            console.log(set);
            if(set&&set.success){
                if(this.page === 1){
                    this.setState({
                        data: set.value.content
                    })
                }else{
                    console.log("加载更多")
                    this.setState({
                        // 加载更多 这个变量不刷新
                        isLoadMore : false,
                        // 数据源刷新 add
                        data: data.concat(set.value.content)
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
        if( !this.state.isRefresh){
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
        padding: 5,
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
        color: "#7C7C7C",
    },
    content: {
        fontSize: 14,
        color: "#7C7C7C",
    },
    thumbnail: {
        width: 80,
        height: 86
    },
});