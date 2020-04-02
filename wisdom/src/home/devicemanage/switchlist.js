import React , { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Text,View,TouchableOpacity,StyleSheet,Platform,SafeAreaView,
    FlatList,TouchableWithoutFeedback,Image,AsyncStorage} from 'react-native';
import Swipeable from 'react-native-swipeable';
import { Button } from 'react-native-elements';
import FetchManager from '../../http/http';
import ModelPop from '../../components/modelPop';
import Modal from "react-native-modal";
// import ModalDropdown from 'react-native-modal-dropdown';
import HeaderComponent from '../../components/headerTitle';

class SwitchList extends Component{
    
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            header:null
        };
    };
    constructor() {
        super()
        this.page = 0
        this.state = {
            arr: ['网关信息','修改网关','添加空开','恢复出厂设置'],
            arrDefault: '--请选择--',

            data:[],
            // 下拉刷新
            isRefresh:false,
            // 加载更多
            isLoadMore:true,
            list:{
                pageSize:10,
                page:0
            },
            menu:false,
            currentlyOpenSwipeable: null,
            isModalVisible:false,
            deviceToken:''
        }
    }

    componentDidMount(){
        this.props.navigation.addListener('didFocus',()=>{
            this.init()
        })
    }

    init=()=>{
        const { item } = this.props.navigation.state.params;
        const { list } = this.state;
        list.parDeviceId = item.deviceId;
        this._getHotList(list)
        this.onChangeToken()
    }

    onChangeToken = () => {
        AsyncStorage.getItem('deviceToken').then((deviceToken) => {
            // console.log(deviceToken)
            this.setState({
                deviceToken:deviceToken
            })
        });
        // let token = AsyncStorage.getItem('deviceToken');
        // console.log(token)
    }

    handleScroll = () => {
        const {currentlyOpenSwipeable} = this.state;
        if (currentlyOpenSwipeable) {
            currentlyOpenSwipeable.recenter();

        }
    };

    getListData = (e, i) => {
        const { navigation } = this.props,
        { item } = navigation.state.params;
        if(e === '0'){
            navigation.navigate('gatewayinfo',{
                data:item
            })
        }else if(e === '1'){
            navigation.navigate('editgateway',{
                data:item
            })
        }else if(e === '2'){
            navigation.navigate('addswitch',{
                deviceId:item.deviceId
            })
        }else if(e === '3'){
            this.setState({ 
                isModalVisible: !this.state.isModalVisible ,
            });
        }
    }


    render(){
        const { isModalVisible,arr,arrDefault,deviceToken } = this.state;
        // console.log(deviceToken)
        return(
            <View>
                <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
                <SafeAreaView style={{backgroundColor:'#467cd4'}}>
                    <HeaderComponent {...this.props} arr={arr} arrDefault={arrDefault} getListData={this.getListData}  >
                        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '500' }}>智慧空开</Text>
                    </HeaderComponent>
                </SafeAreaView>
                
                {/* <View style={{height:10,backgroundColor:'rgb(246,246,246),'}}></View> */}
                <FlatList
                    style={{marginBottom:70,}}
                    data={this.state.data}
                    //item显示的布局
                    renderItem={({item,index}) => this._createListItem(item,index)}
                    // 空布局
                    ListEmptyComponent={this._createEmptyView}
                    //下拉刷新相关
                    onRefresh={this._onRefresh}
                    refreshing={this.state.isRefresh}
                    //加载更多
                    onEndReached={() => this._onLoadMore()}
                    onEndReachedThreshold={0.1}
                    ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: '#ddd',}}/>}
                />
                <Modal 
                    isVisible={isModalVisible}
                >
                    <View style={{ flex: 1}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
                            <View style={{padding:20,backgroundColor:'#FFFFFF',width:'80%'}}>
                                <View style={{borderBottomColor:'#999',borderBottomWidth:1}}>
                                    <Text style={{textAlign:'center',fontSize:16,paddingBottom:10}}>恢复出厂设置</Text>
                                </View>
                                <View style={{height:80}}>
                                    <Text style={{padding:20,fontSize:12}}>恢复出厂设置即是将网关和下面的空开解绑</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <View style={{flex:1,alignItems:'center'}}>
                                        <TouchableOpacity onPress={this._toggleModal}>
                                            <Text style={{padding:5,fontSize:14,borderWidth:1,textAlign:'center',
                                                borderColor:'#467cd4',borderRadius:3,width:80}}>取消</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flex:1,alignItems:'center'}}> 
                                        <TouchableOpacity onPress={this.factoryReset}>
                                            <Text style={{padding:5,fontSize:14,textAlign:'center',color:"#ffffff",
                                            backgroundColor:'#4388D6',borderRadius:3,width:80}}>确定</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
    factoryReset = () => {
        const { item } = this.props.navigation.state.params;
        let obj = {
            netWorkDeviceId : item.deviceId,
            deviceToken:this.state.deviceToken
        }
        FetchManager.get('/app/acbdevice/factoryReset',obj, async (set) => {
            console.log(set)
            if(set.status === 0){
                this.setState({
                    isModalVisible:false
                },this.popUp.showPop('恢复出厂设备成功'))

                setTimeout(()=>{
                    this.props.navigation.goBack()
                },2000)
            }else{
                this.setState({
                    isModalVisible:false
                },this.popUp.showPop('失败'))
            }
        })
    }

    scan=()=>{
        this.props.navigation.navigate('submitscan')
    }
    _createEmptyView=()=>{
        return (
            <View style={{height:'100%',justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:16}}>
                    暂无列表数据
                </Text>
            </View>
        );
    }
    
    
    _onRefresh=()=>{
        const { list } = this.state;
        // 不处于 下拉刷新
        if(!this.state.isRefresh){
            list['page'] = list.page + 1;
            this.page = this.page + 1;
            this._getHotList(list)
        }
    }
    _onLoadMore=()=>{
        const { list } = this.state;
        // 不处于正在加载更多 && 有下拉刷新过，因为没数据的时候 会触发加载
        if (!this.state.isLoadMore && this.state.data.length > 0){
            list['page'] = list.page + 1;
            this.page = this.page + 1;
            this._getHotList(list)
        }
    }

    _createListItem=(item,index)=>{
        const {currentlyOpenSwipeable} = this.state;
        const itemProps = {
            onOpen: (event, gestureState, swipeable) => {
                if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
                currentlyOpenSwipeable.recenter();
                }

                this.setState({currentlyOpenSwipeable: swipeable});
            },
            onClose: () => this.setState({currentlyOpenSwipeable: null}),
            item:item,
            onPressDeleteItem:() => this.onPressDeleteItem(item,index),
            onPressItem:this.onPressItem
        };
        return (
            <View  onScroll={this.handleScroll} style={{padding:10,marginBottom:5}}>
                <SliderEdit {...itemProps}/>
            </View>
        )
    }

    onPressDeleteItem = (item,index) => {
        const { data } = this.state;
        let obj = {
            deviceId:item.deviceId
        }

        console.log(obj);
        FetchManager.get('/app/acbdevice/deleteNet',obj, async (set) => {
            console.log(set)
            this.popUp.showPop(set.msg)
            if(set.status === 0){
                let d = data.filter(f => f.id !== item.id );
                this.setState({
                    data:d
                })
            }
        })
        
    }

    onPressItem = (item) => {
        this.props.navigation.navigate('switchdetail',{
            data:item,
            refresh:()=>{
                this.init()
            }
        })
    }

    _getHotList(list) {
        
        const { data } = this.state;
        FetchManager.get('/app/acbdevice/findSwitchListPage',list, async (set) => {
            // debugger;
            console.log(set)
            //下面的就是请求来的数据
            if(Number(set.status) === 0){
                let datas = set.data.data;
                if(this.page === 0){
                    this.setState({
                        data: datas
                    })
                }else{
                    this.setState({
                        // 加载更多 这个变量不刷新
                        isLoadMore : false,
                        // 数据源刷新 add
                        data: data.concat(datas)
                    })
                }
            }
        },this.props)
    }

    _toggleModal = () =>{
        console.log(this.state.isModalVisible)
        this.setState({ 
            isModalVisible: !this.state.isModalVisible ,
        });
    }
}


class SliderEdit extends Component {
    render(){
    const { item, onPressItem, onPressDeleteItem, onOpen, onClose } = this.props;
        return (
            <Swipeable
                rightButtons={[
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems:'flex-start',
                        paddingLeft: 20,
                    }}>
                        <Button
                            icon={{
                                name: "delete",
                                size: 15,
                                color: "white"
                            }}
                            onPress={() => {onPressDeleteItem(item)}}
                            buttonStyle={{backgroundColor:'#FC4A2C'}}
                            title="删除"
                        />
                    </View>
                ]}
                rightButtonWidth={100}
                onRightButtonsOpenRelease={onOpen}
                onRightButtonsCloseRelease={onClose}
            >
                <TouchableWithoutFeedback onPress={()=>{
                    onPressItem(item);
                }}>
                    <View style={styles.listItem}>
                        <View style={{width:60,justifyContent:'center',alignItems:'center',marginRight:15,}}>
                            {/* <FontAwesome style={{color:'#2DA7FF'}} name="sliders" size={40} /> */}
                            <Image style={{width:40,height:40}} source={{uri:item.modelPhoto}}/>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{color:'#333',marginBottom:5,fontSize:16}}>空开名称：{item.deviceName}</Text>
                            <Text style={{color:'#888',marginBottom:5,fontSize:14}}>空开型号：{item.deviceModel}</Text>
                            <Text style={{color:'#999',fontSize:12}}>额定电流：{item.current}A 额定电压：{item.voltage?item.voltage:'0'}V</Text>
                        </View>
                        <View style={{width:40,justifyContent:'center'}}>
                            <FontAwesome style={{color:'#B1B1B1'}} name="angle-right" size={28} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Swipeable>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },
    listItem: {
        flexDirection:'row',
        marginTop:5,
    },
    leftSwipeItem: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 20
    },
    rightSwipeItem: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20
    },

});
export default SwitchList