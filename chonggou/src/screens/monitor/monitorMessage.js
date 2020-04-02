import React, { Component } from "react";

import { FlatList, StyleSheet, Text, View, AsyncStorage, TouchableOpacity, Image } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import StatusName from '../components/statusName';
import Select from '../components/select/select';
import FetchManager from '../fetch/index';
import { getDevice } from '../components/getSystex';

export default class MessageScreens extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
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
                <Text style={styles.headerMiddle}>{ title }</Text>
            ),
            headerRight:<Text />,
            headerStyle: {
                backgroundColor: 'linear-gradient(-30deg,rgba(58,161,254,1) 0%,rgba(48,191,251,1) 100%)'
            }
        };
    }
    
    constructor(props) {
        super(props);
        this.page = 1
        this.state = {
            
            data:[],
            isRefresh:false,
            isLoadMore:true,
            isLoadDone:false,
            dataTerm:['正常','报警','故障','报警&故障','离线','状态(全部)'],
            defaultTerm:'状态(全部)',

            device:['设备类别(全部)'],
            defaultDevice:"设备类别(全部)",
            deviceId:'',
            
            page:1,
            list:{
                limit:10,
                page:1,
                // warnState:'',
            },
        };
        this.onChangeDevice = this.onChangeDevice.bind(this);
    }

    componentDidMount() { //初始化的时候要判断长度 控制上拉加载

        const { list,device } = this.state;
        const { systemId } = this.props.navigation.state.params;

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
        list['systemId'] = systemId;
        this._getHotList(list)
    }

    onChangeDevice = (index,item) => {
        const { list } = this.state;
        let nub = Number(index)
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

    onChangeTerm = (index) => {
        const { list } = this.state;
        let nub = Number(index)
        list['warnState'] = nub;
        list['page'] = 1;
        this.page = 1;
        if(nub === 5){
            delete list.warnState
        }
        this.setState({
            warnState:nub
        },this._getHotList(list))
    }
    render() {
        const { device,defaultTerm,defaultDevice,data,dataTerm } = this.state;

        return (
        <View>
            <View style={styles.title_select}>
                <Select
                    options={device} 
                    onSelect={this.onChangeDevice}
                    defaultValue={defaultDevice}/>
                <Select
                    options={dataTerm} 
                    onSelect={this.onChangeTerm}
                    defaultValue={defaultTerm}/>
            </View>
            <View>
                <FlatList
                    data={ data }
                    renderItem={({item}) => this._createListItem(item)}
                     // 空布局
                     ListEmptyComponent={this._createEmptyView}
                     ListFooterComponent={this._renderFooter}
                    //  ListHeaderComponent = {this._renderHeader}
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

    // _renderHeader(){
        
    // }


    _createListItem(item){
        const { navigation } = this.props;
        if(item.deviceType === '99'){
            return
        }
        return (
            <TouchableOpacity 
                onPress={() => navigation.push('equipmentStatue',{
                    id:item.id, // 数据端id
                    deviceId:item.deviceId,
                    systemId:item.systemId,
                    nbiotId:item.nbiotId
                })}
            >
                <View style={styles.container}>
                    <View style={{width:80}}>
                        <Image
                            // source={require('../../img/img-01.png')}
                            style={styles.thumbnail}
                            source={{uri:item.surroundingPhoto}}
                        />
                    </View>
                    <View style={styles.rightContainer}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[styles.title]}>设备名称：</Text>
                            <Text style={styles.content}>{item.deviceName}</Text>
                        </View>
                        <View style={styles.containerLine}>
                            <Text style={styles.title}>当前状态：</Text>
                            <Text style={styles.content}>{StatusName[item.warnState]}</Text>
                        </View>
                        {/* <View style={styles.containerLine}>
                            <Text style={[styles.title,{width:80}]}>状态描述：</Text>
                            <View style={{flex:1}}>
                                {
                                    d.map((data,i) => (
                                        <View key={i} style={{flexDirection:"row"}}>
                                            <Text>{data.label}</Text>
                                            <Text>{data.value}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </View> */}
                        <View style={styles.containerLine}>
                            <Text style={styles.title}>设备位置：</Text>
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
        FetchManager.get('1/unitdevice/page',list, async (set) => {
            // debugger;
            console.log(set)
            //下面的就是请求来的数据
            
            if(set&&set.data){
                // set.data.createTime = set.data.createTime.replace('T',' ')
                if(this.page === 1){
                    this.setState({
                        data: set.data
                    })
                }else{
                    if(set.data.length < 6){
                        this.setState({
                            // 加载更多 这个变量不刷新
                            isLoadMore : true,
                            isLoadDone : true,
                            // 数据源刷新 add
                            data: data.concat(set.data)
                        })
                    }else{
                        this.setState({
                            // 加载更多 这个变量不刷新
                            isLoadMore : false,
                            // 数据源刷新 add
                            data: data.concat(set.data)
                        })
                    }
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
        const { list,data } = this.state;
        // 不处于 下拉刷新
        if(!this.state.isRefresh && !this.state.isLoadDone && data.length > 5){
            list['page'] = this.page + 1;
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
            list['page'] = this.page + 1;
            this.page = this.page + 1;
            this._getHotList(list)
        }
    }

    _renderFooter(){
        return(
            <View>
                <Text style={{height:85}}>&nbsp;</Text>
            </View>
        )
    }
}

var styles = StyleSheet.create({
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
        paddingLeft: 10,
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
    headerMiddle: {
        color: "rgba(255,255,255,1)",
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
        textAlign: 'center',
    },
    footer:{
        flexDirection:'row',
        height:24,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    },
    title_select:{
        flexDirection:'row',alignItems:'center',width:'100%',height:40,borderColor:'#ccc',borderRadius:4,borderWidth:1,padding:10,backgroundColor:"#F2F7FB"
    }
});
