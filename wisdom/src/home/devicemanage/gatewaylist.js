import React , { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Text,View,TouchableOpacity,StyleSheet,FlatList,TextInput,TouchableWithoutFeedback} from 'react-native';
import Swipeable from 'react-native-swipeable';
import { Button } from 'react-native-elements';
import FetchManager from '../../http/http';
import ModelPop from '../../components/modelPop';

class GatewayList extends Component{
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerLeft:(
                <TouchableOpacity onPress={()=>navigation.goBack()} style={{paddingRight:15,}}>
                    <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                        <FontAwesome style={{ color: '#FFFFFF' }} name="chevron-left" size={18} />
                    </View>
                </TouchableOpacity>
            ),
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, color: '#fff' }}>网关管理</Text>
            ),
            headerRight: (
                <TouchableOpacity onPress={()=>navigation.navigate('addgateway')}>
                    <View style={{paddingRight:15,flexDirection:'row',alignItems:'center'}}>
                        <AntDesign color="#fff" name="plus" size={28}/>
                    </View>
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: '#467cd4',
            }
        };
    };
    constructor() {
        super()
        this.page = 0;
        this.state = {
            data:[],
            isRefresh:false,
            currentlyOpenSwipeable: null,
            list:{
                pageSize:6,
                page:0
            }
        }
    }

    refresh=()=>{
        this.init()
    }

    componentDidMount(){
        this.init()
    }
    
    init=()=>{
        const { list } = this.state;
        this.props.navigation.addListener('didFocus', () => {
            this._getHotList(list);
        });
    }

    handleScroll = () => {
        const {currentlyOpenSwipeable} = this.state;
        if (currentlyOpenSwipeable) {
            currentlyOpenSwipeable.recenter();

        }
    };
    render(){
        return(
            <View>
                <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
                {/* <View style={{height:10,backgroundColor:'rgb(246,246,246),'}}></View> */}
                <FlatList
                    // style={styles.container}
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
            </View>
        )
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
            data:this.state.data,
            onPressDeleteItem:() => this.onPressDeleteItem(item,index),
            onPressItem:() => this.onPressItem(item,index)
        };

        return (
            <View  onScroll={this.handleScroll} style={{padding:10,marginBottom:5}}>
                <SliderEdit {...itemProps} />
            </View>
        )

    }


    onPressDeleteItem = (item,index) => {
        const { data } = this.state;
        let deviceId = item.deviceId;
        let obj = {deviceId:deviceId}
        FetchManager.get('/app/acbdevice/deleteNet',obj, async (set) => {
            this.popUp.showPop(set.msg)
            if(set.status === 0){
                let d = data.filter(f => f.id !== item.id );
                this.page = 0
                this.setState({
                    data:d
                })
            }
        })
    }
    


    onPressItem = (item,index) => {
        this.props.navigation.navigate('switchlist',{
            item:item
        })
    }

    _getHotList(list) {
        const { data } = this.state;
        // console.log(list)
        FetchManager.get('/app/acbdevice/findPageList',list, async (set) => {
            // debugger;
            console.log(set)
            //下面的就是请求来的数据
            let dates = set.content;
            if(set&&dates){
                // set.data.createTime = set.data.createTime.replace('T',' ')
                if(this.page === 0){
                    this.setState({
                        data: dates
                    })
                }else{
                    this.setState({
                        // 加载更多 这个变量不刷新
                        isLoadMore : false,
                        // 数据源刷新 add
                        data: data.concat(dates)
                    })
                }
            }
        },this.props)
    }
}

class SliderEdit extends Component {
    render(){
        const { item, onPressItem, onPressDeleteItem, onOpen, onClose } = this.props;
        return(
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
                        <View style={{width:60,justifyContent:'center',alignItems:'center',marginRight:10,}}>
                            <FontAwesome style={{color:'#2DA7FF'}} name="sliders" size={40} />
                        </View>
                        <View style={{flex:1,paddingLeft:5}}>
                            <Text style={{color:'#333',marginBottom:5,fontSize:16}}>{item.deviceName}</Text>
                            <Text style={{color:'#555',marginBottom:5,fontSize:14}}>网关标识码：{item.deviceId}</Text>
                            <Text style={{color:'#888',fontSize:14}}>组网方式：{Number(item.deviceType) === 1 ?'RS485':'WI-FI'}</Text>
                        </View>
                        <View style={{width:40,justifyContent:'center'}}>
                            <FontAwesome style={{color:'#B1B1B1'}} name="angle-right" size={28} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Swipeable>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },
    listItem: {
        flexDirection:'row',
        marginTop:5
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
export default GatewayList