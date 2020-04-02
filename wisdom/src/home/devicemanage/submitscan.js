import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, TextInput, ScrollView ,Image} from 'react-native';
import FetchManager from '../../http/http';


class SubmitScan extends Component {

    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingRight:15,}}>
                    <View style={{ paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome color="#fff" name="angle-left" size={28} />
                    </View>
                </TouchableOpacity>
            ),
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, color: '#fff' }}>提交预览</Text>
            ),
            headerRight: <View />,
            headerStyle: {
                backgroundColor: '#467cd4',
            }
        };
    };
    constructor() {
        super()
        this.page = 0;
        this.state = {
            data: [],
            // 下拉刷新
            isRefresh: false,
            // 加载更多
            isLoadMore: true,
            detail: {},
            list: {
                pageSize: 1000,
                page: 0
            }
        }
    }


    componentDidMount() {
        const { deviceId } = this.props.navigation.state.params;
        const { list } = this.state;
        list.deviceId = deviceId;

        let obj = {
            deviceId: deviceId
        }
        FetchManager.get('/app/acbdevice/findNetById', obj, async (set) => {
            console.log(set)
            if (set.status === 0) {
                this.setState({
                    detail: set.data
                }, this._getHotList(list))
            }
        })

    }

    render() {
        const { detail } = this.state;
        return (
            <ScrollView style={{ paddingTop: 10, }}>
                <View style={{ height: 38, backgroundColor: '#F6F6F6', paddingLeft: 15, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, color: '#467cd4' }}>网关信息</Text>
                </View>
                <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 20, justifyContent: 'center', position: 'relative', }}>
                    <Text style={{ fontSize: 15, color: '#333', marginTop: 5, }}>网关标识码：{detail.id}</Text>
                    {/* <Text style={{fontSize:14,color:'#666',marginTop:5,}}>网关类型：{detail.commStatus}</Text> */}
                    <Text style={{ fontSize: 14, color: '#666', marginTop: 5, }}>组网方式：{detail.deviceType === '1' ? 'RS485' : 'WIFI'}</Text>
                    <Text style={{ fontSize: 14, color: '#666', marginTop: 5, }}>网关名称：{detail.deviceName}</Text>
                    <Text style={{ fontSize: 14, color: '#666', marginTop: 5,lineHeight:18, }}>安装位置：{detail.location}</Text>
                    <FontAwesome style={{ color: '#2DA7FF', position: 'absolute', top: 35, right: 50 }} name="sliders" size={40} />
                </View>
                <View style={{ height: 38, backgroundColor: '#F6F6F6', paddingLeft: 15, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, color: '#467cd4' }}>开关信息</Text>
                </View>
                <View style={{ backgroundColor: 'rgb(246,246,246)', marginBottom: 10, }}>
                    <FlatList
                        data={this.state.data}
                        //item显示的布局
                        renderItem={({ item }) => this._createListItem(item)}
                        // 空布局
                        ListEmptyComponent={this._createEmptyView}
                        //下拉刷新相关
                        // onRefresh={() => this._onRefresh()}
                        // refreshing={this.state.isRefresh}
                        //加载更多
                        // onEndReached={() => this._onLoadMore()}
                        onEndReachedThreshold={0.1}
                    />
                </View>
            </ScrollView>
        )
    }

    _createListItem(item) {
        return (
            <View style={{ borderBottomColor: '#EBEBEB', borderBottomWidth: 1, paddingTop: 15, paddingBottom: 15, backgroundColor: '#fff', }}>
                <View style={{ paddingLeft: 15, paddingRight: 15, position: 'relative', flexDirection: 'row', alignItems: 'center', }}>
                    <Image style={{ width: 40, height: 40, marginRight: 15 }} source={{ uri: item.modelPhoto }}></Image>
                    <View style={{ justifyContent: 'flex-start', }}>
                        <Text style={{ color: '#333', marginBottom: 5, fontSize: 16 }}>线路名称：{item.deviceName}</Text>
                        <Text style={{ color: '#555', marginBottom: 5, fontSize: 14 }}>开关 ID：{item.deviceId}</Text>
                        <Text style={{ color: '#888', marginBottom: 5, fontSize: 14 }}>开关型号：{item.deviceModel}</Text>
                        <Text style={{ color: '#999', fontSize: 12 }}>额定电流：{item.current}A 额定电压：{item.voltage}V</Text>
                    </View>
                </View>
            </View>
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

    _getHotList(list) {
        FetchManager.get('/app/acbdevice/findSwitchPageList', list, async (set) => {
            console.log(set)
            //下面的就是请求来的数据
            let data = set.content;
            if (set && data) {
                if (this.page === 0) {
                    this.setState({
                        data: data
                    })
                } else {
                    this.setState({
                        // 加载更多 这个变量不刷新
                        isLoadMore: false,
                        // 数据源刷新 add
                        data: data.concat(this.state.data)
                    })
                }
            } else {
                // this._signOut();
            }
        }, this.props)
    }


    _onRefresh = () => {
        const { list } = this.state;
        // 不处于 下拉刷新
        if (!this.state.isRefresh) {
            list['page'] = this.page + 1;
            this.page = this.page + 1;
            this._getHotList(list)
        }
    }
    _onLoadMore = () => {
        const { list } = this.state;
        // 不处于正在加载更多 && 有下拉刷新过，因为没数据的时候 会触发加载
        if (!this.state.isLoadMore && this.state.data.length > 0) {
            list['page'] = this.page + 1;
            this.page = this.page + 1;
            this._getHotList(list)
        }
    }
}
const style = StyleSheet.create({

})
export default SubmitScan