import React, { Component } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, TextInput, ScrollView } from 'react-native';


class ShareDetail extends Component {
    constructor() {
        super()
        this.state = {
            data: {
                time: '12:25:21',
                name: 'X设备名称--X线路X',
                state: '过压报警',
                position: '东侧走廊配电箱',
                id: 1
            },
            personlist: [{
                name: '李正阳',
                tag: '中原小斑鸠',
                phone: '18595838670',
                id: 1
            }, {
                name: '杨刘彬',
                tag: '飞翔',
                phone: '18595838670',
                id: 2
            },{
                name: '杨刘彬',
                tag: '飞翔',
                phone: '18595838670',
                id: 2
            }, {
                name: '陈亚力',
                tag: '陈家二少',
                phone: '18595838670',
                id: 3
            },],
            limits: [{
                name: '查看、空开信息',
                select: true,
                id: 1,
            }, {
                name: '用电查看',
                select: true,
                id: 2,
            }, {
                name: '定时模式查看',
                select: false,
                id: 3,
            }, {
                name: '报警推送',
                select: true,
                id: 4,
            }, {
                name: '操作日志',
                select: false,
                id: 5,
            }, {
                name: '动态曲线',
                select: false,
                id: 6,
            }, {
                name: '统计报表',
                select: false,
                id: 7,
            }, {
                name: '远程控制',
                select: false,
                id: 8,
            }, {
                name: '定时任务管理',
                select: false,
                id: 9,
            }]
        }
    }
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={{ paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome color="#fff" name="angle-left" size={28} />
                    </View>
                </TouchableOpacity>
            ),
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, color: '#fff' }}>网关共享</Text>
            ),
            headerRight: <View />,
            headerStyle: {
                backgroundColor: '#467cd4',
            }
        };
    };
    render() {
        return (
            <ScrollView style={style.page}>
                <View style={{ height: 38, backgroundColor: '#F6F6F6', flexDirection: 'row', paddingLeft: 15, paddingRight: 15, alignItems: 'center' }}>
                    <View style={{ width: 3, height: 12, backgroundColor: '#467cd4', marginRight: 10 }}></View>
                    <Text style={{ fontSize: 16, color: '#467cd4' }}>我的网关</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: 25, paddingRight: 25, position: 'relative', }}>
                    <View style={{ width: '80%', paddingTop: 10, paddingBottom: 10 }}>
                        <View style={{ flexDirection: 'row', height: 24, alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, color: '#333' }}>网关名称：</Text><Text style={{ fontSize: 14, color: '#666' }}>智慧网关 1</Text>
                        </View>
                        <View style={{ flexDirection: 'row', height: 24, alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, color: '#333' }}>网关标识码：</Text><Text style={{ fontSize: 14, color: '#666' }}>18595838670</Text>
                        </View>
                        <View style={{ flexDirection: 'row', height: 24, alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, color: '#333' }}>组网方式：</Text><Text style={{ fontSize: 14, color: '#666' }}>RS485</Text>
                        </View>
                        <View style={{ flexDirection: 'row', height: 24, alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, color: '#333' }}>安装位置：</Text><Text style={{ fontSize: 14, color: '#666' }}>河南省郑州市管城区经南四路</Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: 38, backgroundColor: '#F6F6F6', flexDirection: 'row', paddingLeft: 15, paddingRight: 15, alignItems: 'center' }}>
                    <View style={{ width: 3, height: 12, backgroundColor: '#467cd4', marginRight: 10 }}></View>
                    <Text style={{ fontSize: 16, color: '#467cd4' }}>共享人员</Text>
                </View>
                <View style={{ height: 80, }}>
                    <ScrollView horizontal={true}>
                        {
                            this.state.personlist.map((item, index) => {
                                return (
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('shareperson', { person: item })} key={index} style={{ width: 60, height: 60, margin: 10, justifyContent: 'center', alignItems: 'center', }}>
                                        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'blue', }}>

                                        </View>
                                        <Text style={{ fontSize: 14, color: '#333', }}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('addshareuser')} style={{ width: 60, height: 60, margin: 10, justifyContent: 'center', alignItems: 'center', }}>
                            <View style={{ width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', }}>
                                <View style={{ width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderColor: '#467CD4', borderWidth: 1, }}>
                                    <FontAwesome color="#467CD4" name="plus" size={20} />
                                </View>
                            </View>
                            <Text style={{ fontSize: 14, color: '#333', }}>添加用户</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('deleteshare', { personlist: this.state.personlist })} style={{ width: 60, height: 60, margin: 10, justifyContent: 'center', alignItems: 'center', }}>
                            <View style={{ width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', }}>
                                <View style={{ width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderColor: '#999', borderWidth: 1, }}>
                                    <FontAwesome color="#999" name="minus" size={20} />
                                </View>
                            </View>
                            <Text style={{ fontSize: 14, color: '#333', }}>移除用户</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('limitslist')} style={{ height: 38, backgroundColor: '#F6F6F6', flexDirection: 'row', paddingLeft: 15, paddingRight: 15, alignItems: 'center', position: 'relative', }}>
                    <View style={{ width: 3, height: 12, backgroundColor: '#467cd4', marginRight: 10 }}></View>
                    <Text style={{ fontSize: 16, color: '#467cd4' }}>共享权限</Text>
                    <FontAwesome color="#999" style={{ position: 'absolute', top: 6, right: 15 }} name="angle-right" size={24} />
                </TouchableOpacity>
                <View style={{paddingLeft:15,paddingRight:15,paddingBottom:30,}}>
                    {
                        this.state.limits.map((item, index) => {
                            return (
                                <View key={index} style={{ height: 40, justifyContent: 'center', borderBottomColor: '#EBEBEB', borderBottomWidth: 1, position: 'relative', }}>
                                    <Text style={{ fontSize: 14,paddingLeft:15, color: '#555', }}>{item.name}</Text>
                                    {
                                        item.select ? (
                                            <AntDesign color="#999" style={{ position: 'absolute', top: 10, right: 50, }} name="check" size={20} />
                                        ) : (
                                                <View></View>
                                            )
                                    }
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        )
    }

}
const style = StyleSheet.create({
    page: {
        // backgroundColor:'rgb(246,246,246)',
        height: '100%',
        paddingTop: 15,
    },
})
export default ShareDetail