import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, Platform,
    StyleSheet, FlatList, SafeAreaView, AsyncStorage,Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FetchManager from '../../http/http';
import ModelPopTime from '../../components/modelPopTime';
import ModelPop from '../../components/modelPop';
import DeviceStatus from '../../components/home/deviceStatus';
const { width,height } = Dimensions.get('window');

const isIphoneX = (Platform.OS === 'ios' && (Number(((height/width)+"").substr(0,4)) * 100) === 216);  


class RemoteControl extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        // debugger;
        return {
            title: '用电监控',
            headerStyle: {
                backgroundColor: '#467cd4',
                alignItems: 'center',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                textAlign: 'center',
                flex: 1
            },
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingRight:15,}}>
                    <FontAwesome style={{ paddingLeft: 20, color: '#FFFFFF' }} name="chevron-left" size={18} />
                </TouchableOpacity>
            ),
            headerRight: <View />
        }
    };

    constructor() {
        super()
        //当前页
        this.page = 1
        this.state = {
            data: [],
            deviceId: '',
            dataContainer: [],
            // 下拉刷新
            isRefresh: false,
            // 加载更多
            isLoadMore: true,
            modelTime: 0,
            popUp: '',
            changeItem:'',
            changeI:'',
            deviceToken:'',
            index:0
        }
    }

    
    
    componentDidMount() {
        // const { index } = this.state;
        this.props.navigation.addListener('didFocus',()=>{
            let index = this.props.navigation.state.params.index ? this.props.navigation.state.params.index  : this.state.index;
            console.log(index)
            this.findAllNet(index);
        })
    }

    findAllNet = (index) => {
        FetchManager.get('/app/acbdevice/findAllNet', '', async (set) => {
            console.log(set)
            if (set.status === 0 && set.data.length > 0) {
                let detail = set.data;
                // let arr = [],deviceId = '';
                detail.forEach((show, i) => {
                    if (i === index) {
                        show.status = 0
                    } else {
                        show.status = 1
                    }
                })

                this.setState({
                    data: detail,
                    deviceId: detail[index].deviceId
                })

                this.findSwitchList(detail[index].deviceId)

            }
        })
        // const { data } = this.state;
    }

    findSwitchList = (id) => {
        const { deviceId } = this.state;
        let obj = {
            parDeviceId: id ? id : deviceId
        }
        console.log(obj)
        FetchManager.get('/app/acbdevice/findSwitchList', obj, async (set) => {
            console.log(set)
            if (set.status === 0 && set.data.length > 0) {
                let data = set.data;
                this.setState({
                    dataContainer: data
                })
            } else {
                this.setState({
                    dataContainer: []
                })
            }
        })
    }

    getItem = (key) => {
        return AsyncStorage.getItem(key).then((value) => {
            console.log(value)
            return value
        });
    }

    // onChangeSwitch = (item, i) => {
    onChangeSwitch = (item,status) => {
        AsyncStorage.getItem('deviceToken').then((deviceToken) => {
            let obj = {
                deviceId: item.deviceId,
                status: status,
                command: 'A1',
                deviceToken: deviceToken
            }
            console.log(obj)
            this.showOperation(obj,item)
            this.setState({
                deviceToken:deviceToken
            })
        });
    }

    showOperation=(obj,show)=>{
        const { deviceId } = this.state;
        // this.popUp.showPop('操作命令已下发')
        if(show.statusDes === '128'){
            this.popUp.showPop('当前手动，不可操作')
            return false
        }else if(show.statusDes === '12'){
            this.popUp.showPop('当前锁定，不可操作')
            return false
        }
        if(show.warnState === '1'){
            this.popUp.showPop('当前报警，不可操作')
            return false
        }
        console.log('发送操作请求')
        FetchManager.get('/app/acbdevice/sendCommand', obj, async (set) => {
            console.log(set)

            // AsyncStorage.getItem('CustomMessage').then((message) => {
            //     console.log(message)
            // })
            // if(set.status === 0){
            //     this.getComponentRedus()
            // }

            
            // if(set.status === 0){
            //     this.realChange('message',obj)
            //     setTimeout(()=>{
            //         this.popUp.showPop('操作成功')
            //         this.findSwitchList(deviceId)
            //     },3000)
            // }else{
            //     this.popUp.showPop('操作失败')
            //     this.changeStatusLog(obj,'失败') // 20秒未接收推送消息，调更新操作日志的失败接口
            // }

            var modelTime = 20
            // this.realChange(obj,item,i)
            var timer = setInterval(() => {
                AsyncStorage.getItem('CustomMessage').then((message) => {
                    // console.log(AsyncStorage.getItem('CustomMessage'))
                    // console.log('接收状态消息')
                    console.log(message)
                    modelTime--
                    this.setState({
                        modelTime: modelTime,
                    })
                    //友盟推送操作信息，前端展示
                    if (modelTime < 1) {
                        clearInterval(timer)
                        this.setState({
                            modelTime: 0,
                        })
                        // console.log('操作失败')
                        this.popUp.showPop('操作失败')
                        this.changeStatusLog(obj,'失败') // 20秒未接收推送消息，调更新操作日志的失败接口
                        return
                    } 
                    if(message){
                        console.log('收到推送消息，展示操作')
                        // console.log(message)
                        //成功
                        this.setState({
                            modelTime: 0,
                        })
                        clearInterval(timer)
                        //收到推送消息，发起改变状态的接口
                        this.popUp.showPop('操作成功')
                        this.realChange(message,obj)
                        this.findSwitchList(deviceId)
                    }
                });
            }, 1000)
        })
    }


    //调取霄雨接口获取状态改变  
    // getComponentRedus = () => {
    //     FetchManager.get('/app/acbdevice/changeStatus', obj, async (set) => {
    //         console.log(set)
    //         if(set.status==0){
    //             //判断手动自动
    //             AsyncStorage.removeItem('CustomMessage')
    //             this.changeStatusLog(obj,'成功') //调更新操作日志的成功接口
    //         }
    //     })
    // }

    realChange=(index,obj)=>{
        console.log(obj)
        console.log('开始操作')
        FetchManager.get('/app/acbdevice/changeStatus', obj, async (set) => {
            console.log(set)
            if(set.status==0){
                //判断手动自动
                AsyncStorage.removeItem('CustomMessage')
                this.changeStatusLog(obj,'成功') //调更新操作日志的成功接口
            }
        })
    }

    changeStatusLog=(message,result)=>{
        let params={
            status:message.status,//手动、自动状态
            deviceId:message.deviceId,//空开设备ID
            // content:'',//操作失败成功
            result:result
        }
        FetchManager.get('/app/acbdevice/changeStatusLog', params, async (set) => {
            console.log(set)
        })
    }

    getComponent = (item, i) => {
        console.log(item)
        const { data } = this.state;
        let index;
        data.forEach((show, j) => {
            if (j === i) {
                show.status = 0;
                index = j;
            } else {
                show.status = 1
            }
        })
        this.setState({
            data: data,
            deviceId:item.deviceId,
            index:index
        })
        this.findSwitchList(item.deviceId)
    }



    render() {
        const { data, dataContainer, deviceId } = this.state;
        return (
            <View>
                <View style={{ padding: 5, flexDirection: "row" }}>
                    <View style={{ width: 90,height:isIphoneX ? height - 110 : height,backgroundColor:'#EBEBEB' }}>
                        <ScrollView>
                            {
                                data.length > 0 && data.map((item, i) => (
                                    <TouchableOpacity key={i} onPress={() => this.getComponent(item, i)}>
                                        <View style={{ height: 88, justifyContent: 'center', alignItems: 'center', backgroundColor: item.status === 0 ? '#FFFFFF' : '#EBEBEB' }}>
                                            <Text><FontAwesome style={{ paddingLeft: 20, color: '#2DA7FF' }} name="sliders" size={40} /></Text>
                                            <Text style={{ fontSize: 12, paddingTop: 5 }}>{item.deviceName}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }
                        </ScrollView>
                    </View>
                    <View style={{ flex: 1, marginLeft: 5,height:isIphoneX ? height - 110 : height }}>
                        <FlatList
                            data={dataContainer}
                            //item显示的布局
                            renderItem={({item}) => this._createListItem(item)}
                            // 空布局
                            ListEmptyComponent={this._createEmptyView}
                            //下拉刷新相关
                            onRefresh={() => this._onRefresh()}
                            refreshing={this.state.isRefresh}
                            ListFooterComponent={this._footerComent}
                            //加载更多
                            // onEndReached={() => this._onLoadMore()}
                            onEndReachedThreshold={0.1}
                        />
                    </View>
                    <ModelPop ref={ref => this.popUp = ref}></ModelPop>
                    <ModelPopTime modelTime={this.state.modelTime}></ModelPopTime>
                </View>
            </View>
        )
    }

    _footerComent = () => {
        return(
            <View style={{height:80}}>

            </View>
        )
    }
    /*
    * 创建布局
    */
    _createListItem(item) {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{ flex: 1 }} onPress={()=>this.getLineDetail(item)}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 40, justifyContent: 'center', alignItems: 'center', padding: 3,marginRight:10, }}>
                            <Image
                                style={styles.thumbnail}
                                resizeMode='contain'
                                source={{uri:item.modelPhoto}}
                            />
                        </View>
                        <View style={{ flex:1 }}>
                            <View style={styles.containerLine}>
                                <Text style={styles.title}>线路名称:</Text>
                                <Text style={styles.title}>{item.deviceName}</Text>
                            </View>
                            <View style={styles.containerLine}>
                                <Text style={styles.content}>是否报警:</Text>
                                <Text style={styles.content}>
                                    {item.warnState === '0' ? '无报警' : item.warnState === '1' ? '报警' : ''}
                                </Text>
                            </View>
                            <View style={styles.containerLine}>
                                <Text style={styles.content}>当前状态:</Text>
                                <Text style={styles.content}>
                                    {
                                        DeviceStatus[item.status]
                                    }
                                    {/* {   item.status === '1' ? '远程合闸' : 
                                        item.status === '2' ? '合闸' : 
                                        item.status === '3' ? '分闸' : 
                                        item.status === '4' ? '手动复位' : 
                                        item.status === '15' ? '远程分闸' :
                                        item.status === '47' ? '报警分闸' :
                                        item.status === '49' ? '手动合闸' :
                                        item.status === '63' ? '手动分闸' : 
                                        item.status === '65' ? '合闸 正常运行' :
                                        item.status === '66' ? '按键分闸 闭锁跳闸' :
                                        item.status === '67' ? '按键试验 闭锁跳闸' :
                                        item.status === '68' ? '远程闭锁 闭锁跳闸' :
                                        item.status === '69' ? '通信闭锁 闭锁跳闸' :
                                        item.status === '70' ? '重合闸' :
                                        item.status === '71' ? '漏电闭锁 闭锁跳闸' :
                                        item.status === '72' ? '报警 闭锁跳闸' :
                                        item.status === '73' ? '参数设置更改' :
                                        item.status === '74' ? '远程试跳 闭锁跳闸' : ''
                                    } */}
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{flexDirection:'row',alignItems:'center',paddingLeft:40,marginTop:5}}>
                    <TouchableOpacity onPress={()=>{this.onChangeSwitch(item,'2')}} style={{flex:1,height:25,backgroundColor:'green',borderRadius:3,justifyContent:'center',alignItems:'center',marginRight:8,}}>
                        <Text style={{color:'#fff',fontSize:12,}}>分闸</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.onChangeSwitch(item,'1')}} style={{flex:1,height:25,backgroundColor:'red',borderRadius:3,justifyContent:'center',alignItems:'center',marginLeft:8}}>
                        <Text style={{color:'#fff',fontSize:12,}}>合闸</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    getLineDetail = (item) => {
        // console.log(item)
        const { index } = this.state;
        this.props.navigation.navigate('lineDetail', {
            deviceId: item.deviceId,
            modelPhoto:item.modelPhoto,
            index:index
        })
    }

    /**
        * 空布局
        */
    _createEmptyView() {
        return (
            <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16 }}>
                    暂无列表数据
                </Text>
            </View>
        );
    }

    /**
     * 下拉刷新
     * @private
     */
    _onRefresh = () => {
        // 不处于 下拉刷新
        if (!this.state.isRefresh) {
            // list['page'] = this.page + 1;
            // this.page = this.page + 1;
            this.findSwitchList()
        }
    };

    /**
     * 加载更多
     * @private
     */
    // _onLoadMore() {
    //     // 不处于正在加载更多 && 有下拉刷新过，因为没数据的时候 会触发加载
    //     if (!this.state.isLoadMore && this.state.data.length > 0) {
    //         // list['page'] = this.page + 1;
    //         // this.page = this.page + 1;
    //         this.findSwitchList()
    //     }
    // }
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: "row",
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: 2,
    },
    containerLine: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 15,
        color: "#333333",
        lineHeight:18,
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

export default RemoteControl