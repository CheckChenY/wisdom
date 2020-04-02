import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, FlatList, Image,ScrollView
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Select from '../components/select/select';
import FetchManager from '../fetch/index';
import CompanyName from '../components/statusName';
import StatusName from '../components/statusName';
import OrderName from '../components/statusName';
import { getSystem,getDevice } from '../components/getSystex';

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
                <Text style={styles.headerMiddle}>企业信息</Text>
            ),
            headerRight:<Text />,
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
            area:['区域'],
            type:['社会单位','监管单位','总公司',' 代理商'],
            grade:['安全等级','从高到低','从低到高'],
            defaultArea:"区域",
            defaultType:"行业类型",
            defaultGrade:"安全等级",
            systemId:'',
            deviceId:'',
            page:1,
            list:{
                size:6,
                page:0,
            },
        }

        // this.onChangeArea = this.onChangeArea.bind(this);
        // this.onChangeType = this.onChangeType.bind(this);
        // this.onChangeGrade = this.onChangeGrade.bind(this);
    }

    componentDidMount(){
        const { list, } = this.state;
        this._getHotList(list)
    }


    // onChangeArea(val){
        // const { list } = this.state;
        // let nub = Number(val)
        // // debugger;
        // list['order'] = nub;
        // list['page'] = 1;
        // if(nub === 0){
        //     delete list.order
        // }
        // this.setState({
        //     order:nub
        // },this._getHotList(list))
    // }

    // onChangeType(val){
    //     // debugger;
    //     const { list } = this.state;
    //     let nub = Number(val)
    //     list['orgType'] = nub;
    //     list['page'] = 1;
    //     this.page = 1
    //     if(nub === 0){
    //         delete list.orgType
    //     }
    //     this.setState({
    //         orgType:nub
    //     },this._getHotList(list))
    // }

    // onChangeGrade(val){
    //     console.log(val);
    //     const { list } = this.state;
    //     let nub = Number(val)
    //     list['order'] = OrderName[nub];
    //     list['page'] = 1;
    //     this.page = 1
    //     this.setState({
    //         order:OrderName[nub]
    //     },this._getHotList(list))
    // }

    render() {
        const { data } = this.state;
        return (
            <View style={{backgroundColor:"#F2F7FB",height:'100%'}}>
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
                    // ListFooterComponent={this._createListFooter}
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
        const { type } = this.state;
        // console.log(navigation);
        // let time = item.createTime.replace('T',' ')
        return (
            <TouchableOpacity onPress={() => navigation.navigate('companyDetail',{
                companyId:item.company.id
            })}>
                
                <View style={styles.container}>
                    {/* <Image
                        source={require('../../img/img-01.png')}
                        style={styles.thumbnail}
                    /> */}
                    <View style={styles.rightContainer}>
                        <View style={styles.containerLine}>
                            <Text style={{fontSize:16,color:'#333333',fontWeight:'600',paddingRight:20}}>
                                {item.company.orgName}
                            </Text>
                            <Text>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                            <Text style={{width:20,height:20,borderRadius:15,textAlign:'center',fontSize:12,
                                        lineHeight:20,borderWidth:1,borderColor:'#7C7C7C'}}>{item.code}</Text>
                        </View>
                        <View style={styles.containerLine}>
                            <Text style={styles.title}>单位类型：</Text>
                            <Text style={styles.content}>{ type[item.company.orgType] }</Text>
                        </View>
                        <View style={styles.containerLine}>
                            <Text style={styles.title}>位置：</Text>
                            <Text style={styles.content}>{item.company.address}</Text>
                        </View>
                    </View>
                </View>

                <View style={{backgroundColor:'#FFFFFF',flexDirection:'row',padding:5,marginLeft:5,marginRight:5}}>
                    <View style={styles.container_bottom}>
                        {/* <FontAwesome color="#FD3E3C" name="flag" size={16}/> */}
                        <Text style={{fontSize:12,width:16,height:16,justifyContent:'center',backgroundColor:'#BDBCBC',color:'#FFFFFF',textAlign:'center',borderRadius:3}}>设</Text>
                        <Text style={{fontSize:10,color:'#666666',paddingLeft:5,justifyContent:'center'}}>设备数量{item.allDeviceSize}</Text>
                    </View>
                    <View style={styles.container_bottom}>
                        <Text style={{fontSize:12,width:16,height:16,justifyContent:'center',backgroundColor:'lightgreen',color:'#FFFFFF',textAlign:'center',borderRadius:3}}>正</Text>
                        <Text style={{fontSize:10,color:'#666666',paddingLeft:5,justifyContent:'center'}}>正常设备{item.nomalDevice}</Text>
                    </View>
                    <View style={styles.container_bottom}>
                        <Text style={{fontSize:12,width:16,height:16,justifyContent:'center',backgroundColor:'#FD3E3C',color:'#FFFFFF',textAlign:'center',borderRadius:3}}>异</Text>
                        <Text style={{fontSize:10,color:'#666666',paddingLeft:5,justifyContent:'center'}}>异常设备{item.notNomalDevice}</Text>
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

    // _createListFooter(){
    //     return (
    //         <View style={styles.footerView}>
    //             <Text style={{color:'white'}}>
    //                 底部底部
    //             </Text>
    //         </View>
    //     )
    // }

    


    /**
     * 获取360 下载列表
     * @private
     */
    _getHotList(list) {
        const { data } = this.state;
        console.log(list)

        // this.setState({
        //     data: data
        // })/device/inner/jtlDevice/getMyOrgDetailList
        FetchManager.get('/device/inner/jtlDevice/getMyOrgDetailList',list, async (set) => {
            // debugger;
            console.log(set)
            //下面的就是请求来的数据
            
            if(set&&set.success){
                // set.data.createTime = set.data.createTime.replace('T',' ')
                if(this.page === 1){
                    this.setState({
                        data: set.value
                    })
                }else{
                    if(set.value.length < 6){
                        this.setState({
                            // 加载更多 这个变量不刷新
                            isLoadMore : true,
                            isLoadDone : true,
                            // 数据源刷新 add
                            data: this.state.data.concat(set.value)
                        })
                    }else{
                        this.setState({
                            // 加载更多 这个变量不刷新
                            isLoadMore : false,
                            // 数据源刷新 add
                            data: this.state.data.concat(set.value)
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
        const { list,data } = this.state;
        // 不处于 下拉刷新
        if(!this.state.isRefresh && !this.state.isLoadDone && data.length > 5){
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
    title_select:{
        flexDirection:'row',
    },
    title_select_View:{
        flex:1,
        height:40,
        fontSize:12,
        justifyContent:'center'
    },
    container: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        margin:5,
        // backgroundColor: "red",
        // paddingLeft: 15,
        // paddingRight: 15,
        // paddingTop: 15,
        // paddingBottom: 15,
    },
    rightContainer: {
        flex: 1,
        marginLeft: 10,
        borderBottomWidth:1,
        borderBottomColor:'#EBEBEB'
    },
    containerLine: {
        flexDirection: "row",
        alignItems: "center",
        height: 25,
    },
    container_bottom:{
        flex:1,borderColor:'#ccc',
        fontSize:12,
        flexDirection:"row",
        
    },
    title: {
        fontSize: 14,
        color: "#666666",
        fontFamily: "PingFang-SC-Medium",
    },
    content: {
        fontSize: 14,
        color: "#666666",
        fontFamily: "PingFang-SC-Medium",
    },
    thumbnail: {
        width: 80,
        height: 86
    },
    thumbnail_icon:{
        width:17,
        height:19,
    },
    footerView:{
        paddingTop:30
    }
});