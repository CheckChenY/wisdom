import React, { Component } from 'react';
import {
    View, Text, StyleSheet,
    Image, FlatList, TouchableOpacity, TouchableWithoutFeedback, ScrollView, PixelRatio, Switch
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Swipeable from 'react-native-swipeable';
import { Button } from 'react-native-elements';
import FetchManager from '../../http/http';


//屏幕信息
const dimensions = require('Dimensions');
//获取屏幕的宽度和高度
const { width, height } = dimensions.get('window');

export default class HomeView extends Component {


    constructor() {
        super();
        //当前页
        this.page = 1
        //状态
        this.state = {
            // 列表数据结构
            data: [],
            // 下拉刷新
            isRefresh: false,
            // 加载更多
            isLoadMore: true,
            list: {
                pageSize: 10,
                page: 0
            },
            dataLine: [],
            currentlyOpenSwipeable:false,
        }
    }

    componentDidMount() {
        // const { dataLine } = this.props;
        // this._getHotList(dataLine)
    }

    refresh = () => {
        console.log('111')
        this.props.load()
    }

    render() {
        const { dataLine } = this.props;
        console.log(dataLine)
        return (
            <View>
                <FlatList
                    // style={{height: '100%'}}
                    data={dataLine}
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
            </View>
        );
    }

    handleScroll = () => {
        const { currentlyOpenSwipeable } = this.state;
        if (currentlyOpenSwipeable) {
            currentlyOpenSwipeable.recenter();
        }
    };

    onPressDeleteItem = (item) => {
        let params={
            id:item.id,
        }
        console.log(params)
        FetchManager.get('/app/acbtask/delete', params, async (set) => {
            console.log(set)
            if(set.status==0){
                this.props.load()
            }
        })
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
                <TouchableWithoutFeedback onPress={() => navigation.navigate('timingPicker', { 
                        item: item,
                        status:0
                        // refresh:()=>{this.refresh()} 
                    })}>
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
                                onValueChange={() => { this.onChangeSwitch(item) }}
                            />
                            {/* <FontAwesome color="#3AA1FE" name="angle-right" size={20} /> */}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Swipeable>
        );
    }

    
    onChangeSwitch = (item) => {
        console.log(item)
        this.props.changeSwitch(item)
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
     * 获取360 下载列表
     * @private
     */
    _getHotList(dataLine) {
        // const { data } = this.state;
        // console.log(list)
        // FetchManager.get('1/devicealertdeal/page',list, async (set) => {
        //     // debugger;
        //     console.log('getAllDeviceByState', set)
        //     //下面的就是请求来的数据

        //     if(set&&set.data){
        //         // set.data.createTime = set.data.createTime.replace('T',' ')
        if (this.page === 1) {
            this.setState({
                data: dataLine
            })
        } else {
            this.setState({
                // 加载更多 这个变量不刷新
                isLoadMore: false,
                // 数据源刷新 add
                data: dataLine.concat(dataLine)
            })
        }
        //     }else{
        //         // this._signOut();
        //     }
        // },this.props)
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
            this.page = this.page + 1;
            this._getHotList(dataLine)
        }
    };

    /**
     * 加载更多
     * @private
     */
    _onLoadMore() {
        // const { list } = this.state;
        const { dataLine } = this.props;
        // 不处于正在加载更多 && 有下拉刷新过，因为没数据的时候 会触发加载
        if (!this.state.isLoadMore && this.state.data.length > 0) {
            // list['page'] = this.page + 1;
            this.page = this.page + 1;
            this._getHotList(dataLine)
        }
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