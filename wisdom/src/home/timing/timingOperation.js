import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions,ScrollView,SafeAreaView,
    Platform,TouchableWithoutFeedback,FlatList,Switch,Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HeaderComponent from '../../components/headerTitle';
// import TimingComponent from '../../components/home/timeing';
import FetchManager from '../../http/http';
import Swipeable from 'react-native-swipeable';
import { Button } from 'react-native-elements';

const dimensions = require('Dimensions');
//获取屏幕的宽度和高度
const { width, height } = dimensions.get('window');

const isIphoneX = (Platform.OS === 'ios' && (Number(((height/width)+"").substr(0,4)) * 100) === 216);  

class MainDetail extends Component {

    constructor() {
        super()
        this.page = 1
        this.state = {
            arr: [],
            arrDefault: '',
            data: [],
            dataContainer: [],
            gatewayList:[],
            gatewayId:'',
            // selectSwitchId:'',
            index:0,
            deviceId: '',
            gatewayIdIndex:0,

            // 下拉刷新
            isRefresh: false,
            // 加载更多
            isLoadMore: true,
            list: {
                pageSize: 10,
                page: 0
            },
            currentlyOpenSwipeable:false,
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('didFocus',()=>{
            let index = this.props.navigation.state.params.index ? this.props.navigation.state.params.index  : this.state.index;
            
            let gatewayIdIndex = this.props.navigation.state.params.gatewayIdIndex ? this.props.navigation.state.params.gatewayIdIndex  : this.state.gatewayIdIndex;
            console.log(index)
            this.findAllNet(index,gatewayIdIndex);
        })
    }

    findAllNet = (index,gatewayIdIndex) => {
        FetchManager.get('/app/acbdevice/findAllNet', '', async (set) => {
            console.log(set)
            // debugger;
            if (set.status === 0 && set.data.length > 0) {
                let detail = set.data;
                console.log(detail)
                let arrDetail = [];
                detail.forEach((show,i)=>{
                    arrDetail.push(show.deviceName)
                })
                console.log(detail[gatewayIdIndex].deviceId)
                // console.log(detail[gatewayIdIndex].deviceId)
                this.setState({
                    arrDefault:detail[gatewayIdIndex].deviceName,
                    gatewayId:detail[gatewayIdIndex].deviceId,
                    gatewayList:detail,
                    arr:arrDetail,
                    // deviceId: detail[index].deviceId,
                })
                // console.log(detail[index].deviceId)
                this.getSwitch(detail[gatewayIdIndex].deviceId)
            }
        })
    }

    getTask=()=>{
        const { deviceId } = this.state;
        let params={
            deviceId:deviceId
        }
        FetchManager.get('/app/acbtask/page',params , async (set) => {
            console.log(set)
            if(set.status==0){
                if(set.data.length){
                    set.data.forEach(s=>{
                        s.taskTime=s.taskTime.slice(0,2)+':'+s.taskTime.slice(2)
                    })
                    this.setState({
                        dataContainer:set.data
                    })
                }else{
                    this.setState({
                        dataContainer:[]
                    })
                }
            }else{
                this.setState({
                    dataContainer:[]
                })
            }
        })
    }

    getSwitch=(id)=>{
        const { index } = this.state;
        let params={
            parDeviceId:id,
        }
        FetchManager.get('/app/acbdevice/findSwitchList',params , async (set) => {
            console.log(set)
            let data = set.data;
            if(set.status===0 && data.length > 0){
                data.forEach((show,i) => {
                    if(i === index ){
                        show.status = 0
                    }else{
                        show.status = 1
                    }
                })
                this.setState({
                    data:data,
                    // index:index,
                    deviceId:data[index].deviceId,//空开列表的第一个默认为选中的
                },this.getTask)

            }
        })
    }

    getComponent = (item, i) => {
        const { data } = this.state;
        data.forEach((show, j) => {
            if (j === i) {
                show.status = 0
            } else {
                show.status = 1
            }
        })
        this.setState({
            data: data,
            index:i,
            deviceId:item.deviceId
        },this.getTask)
    }
    //选网关 获取网关下空开列表
    getListData = (e,i) => {
        const { gatewayList } = this.state;
        gatewayList.forEach(s=>{
            if(s.deviceName==i){
                console.log(s)
                this.setState({
                    gatewayId:s.deviceId,
                    gatewayIdIndex:Number(e),
                    // index:0
                })
                this.getSwitch(s.deviceId)
            }
        })
    }

    render() {
        const { arr, arrDefault, data, dataContainer } = this.state;
        let heightScorll = height - 90;
        return (
            <View>
                <SafeAreaView style={{backgroundColor:'#467cd4'}}>
                    <HeaderComponent {...this.props} arr={arr} arrDefault={arrDefault} getListData={this.getListData}  >
                        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '500' }}>定时模式</Text>
                    </HeaderComponent>
                </SafeAreaView>
                <View style={{ padding: 5, flexDirection: "row",}}>
                    <View style={{ width: 90,height:isIphoneX ? height - 120 : height+80,backgroundColor:'#EBEBEB' }}>
                        <ScrollView>
                            {
                                data.length > 0 && data.map((item, i) => (
                                    <TouchableOpacity key={i} onPress={() => this.getComponent(item, i)} style={{width:'100%',}}>
                                        <View style={{width:'100%', height: 88, justifyContent: 'center', alignItems: 'center',
                                        backgroundColor: item.status === 0 ? '#FFFFFF' : '#EBEBEB' }}>
                                            <Text><FontAwesome style={{ paddingLeft: 20, color: '#2DA7FF' }} name="sliders" size={40} /></Text>
                                            <Text style={{ fontSize: 14, paddingTop: 5 }}>{item.deviceName}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }
                        </ScrollView>
                    </View>
                    <View style={{ flex: 1, marginLeft: 5,height:isIphoneX ? height - 120 : heightScorll, }}>
                        {/* <TimingComponent {...this.props} dataLine={dataContainer} changeSwitch={this.changeSwitch} load={this.load}/> */}
                        
                        <FlatList
                            // style={{height: '100%'}}
                            data={dataContainer}
                            //item显示的布局
                            renderItem={({ item }) => this._createListItem(item)}
                            // 空布局
                            ListEmptyComponent={this._createEmptyView}
                            //下拉刷新相关
                            onRefresh={() => this._onRefresh()}
                            refreshing={this.state.isRefresh}
                            //加载更多
                            // onEndReached={() => this._onLoadMore()}
                            onEndReachedThreshold={0.1}
                        />
                        
                        
                        <TouchableOpacity onPress={() => this.getTimingPicker()} style={{width: 28, height: 28,
                            position: 'absolute', bottom: 26, right: 15,zIndex:10000,}}>
                            <View style={{
                                backgroundColor: '#FFFFFF', height: 28,
                                justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#2DA7FF', borderRadius: 3
                            }}>
                                <AntDesign style={{  color: '#2DA7FF' }} name="plus" size={18} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </View>
        )
    }

        /**
     * 创建布局
     */
    _createListItem(item) {
        const {currentlyOpenSwipeable} = this.state;
        const { navigation } = this.props;
        // const { item, onPressItem, onPressDeleteItem, onOpen, onClose } = this.props;
        const itemProps = {
            onOpen: (event, gestureState, swipeable) => {
                if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
                    currentlyOpenSwipeable.recenter();
                }
                this.setState({ currentlyOpenSwipeable: swipeable });
            },
            onClose: () => this.setState({ currentlyOpenSwipeable: null }),
            item: item,
            data: this.state.data,
            onPressDeleteItem: () => this.onPressDeleteItem(item),
            onPressItem: () => this.onPressItem(item)
        };
        return (
            <Swipeable
                rightButtons={[
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        paddingLeft: 20,
                    }}>
                        <Button
                            icon={{
                                name: "delete",
                                size: 15,
                                color: "white"
                            }}
                            onPress={() => { itemProps.onPressDeleteItem(itemProps.item) }}
                            buttonStyle={{ backgroundColor: '#FC4A2C' }}
                            title="删除"
                        />
                    </View>
                ]}
                rightButtonWidth={100}
                onRightButtonsOpenRelease={itemProps.onOpen}
                onRightButtonsCloseRelease={itemProps.onClose}
            >
                <TouchableWithoutFeedback 
                // onPress={() => navigation.navigate('timingPicker', { 
                //         item: item,
                //         status:0
                //         // refresh:()=>{this.refresh()} 
                //     })}

                    onPress={()=>this.getLineDetail(item)}
                    
                    >
                    <View style={styles.container}>
                        <View style={{ width: 50, justifyContent: 'center', alignItems: 'center', padding: 3 }}>
                            {/* <Image
                            style={styles.thumbnail}
                            resizeMode ='contain' 
                            source={require('../../img/home/ckdt.png')}
                        /> */}
                            <Text style={{ fontSize: 20, fontWeight: '900', color: '#333', }}>{item.isSwitch === 2 ? '分闸' : '合闸'}</Text>
                        </View>
                        <View style={styles.rightContainer}>
                            <View style={styles.containerLine}>
                                {/* <Text style={styles.title}>线路名称:</Text> */}
                                <Text style={styles.title}>{item.taskTime}</Text>
                            </View>
                            <View style={styles.containerLine}>
                                {/* <Text style={styles.content}>当前状态:</Text> */}
                                <Text style={styles.content}>{item.repeatValue==8 ? '无重复':item.repeatValue.indexOf('.')==-1?'星期'+item.repeatValue:'星期'+item.repeatValue}</Text>
                            </View>
                        </View>
                        <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
                            <Switch
                                //  style={styles.list_right}
                                //动态改变value
                                value={item.close===1 ? true : false}
                                //当切换开关室回调此方法
                                onValueChange={() => { this.changeSwitch(item) }}
                            />
                            {/* <FontAwesome color="#3AA1FE" name="angle-right" size={20} /> */}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Swipeable>
        );
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


    getLineDetail = (item) => {
        // console.log(item)
        this.props.navigation.navigate('timingPicker', {
            item: item,
            status:0
        })
    }

    /**
     * 下拉刷新
     * @private
     */
    _onRefresh = () => {
        // const { list } = this.state;
        const { dataLine } = this.props;
        // 不处于 下拉刷新
        if (!this.state.isRefresh) {
            // list['page'] = this.page + 1;
            // this.page = this.page + 1;
            this.getTask()
        }
    };


    // load=()=>{
    //     this.init()
    // }

    changeNet=(close,id)=>{
        let params={
            id:id,
            close:close
        }
        console.log(params)
        FetchManager.get('/app/acbtask/check',params , async (set) => {
            console.log(set)
        })
    }

    changeSwitch=(item)=>{
        console.log(this.state.dataContainer)
        let dataContainer=this.state.dataContainer
        dataContainer.forEach(s=>{
            if(s.id==item.id){
                s.close=s.close==1?0:1
                this.changeNet(s.close,s.id)
            }
        })
        this.setState({
            dataContainer:dataContainer
        })
    }


    onPressDeleteItem = (item) => {
        console.log(item)
        let params={
            id:item.id,
        }
        console.log(params)
        FetchManager.get('/app/acbtask/delete', params, async (set) => {
            console.log(set)
            if(set.status==0){
                this.getTask()
            }
        })
    }

    getWisdomList = (e) => {
        console.log(e)
    }

    getTimingPicker = () => {
        const { index,deviceId,gatewayIdIndex } = this.state;
        this.props.navigation.push('timingPicker',{
            // switchId:this.state.selectSwitchId,
            index:index,
            deviceId: deviceId,
            gatewayIdIndex:gatewayIdIndex,
            status:1
            // refresh:()=>{this.refresh()}
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: 2,
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
        fontSize: 12,
        color: "#888888",
    },
    thumbnail: {
        width: 40,
        height: 36
    },
});

export default MainDetail