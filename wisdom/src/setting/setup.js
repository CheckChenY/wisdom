import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, AsyncStorage } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class SetUp extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingRight:15,}}>
                    <View style={{ flexDirection: 'row', paddingLeft: 15, alignItems: 'center' }}>
                        <FontAwesome color="#fff" name="angle-left" size={28} />
                    </View>
                </TouchableOpacity>
            ),
            headerTitle: (
                <Text style={styles.headerMiddle}>设置</Text>
            ),
            headerRight: <Text style={{ color: '#fff', marginRight: 15 }}></Text>,
            headerStyle: { backgroundColor: '#467cd4' }
        };
    }

    constructor() {
        super()
        this.state = {
            data: [],
            index: 0
        }

    }

    onChangeSwitch = (item) => {
        var that = this
        var data = that.state.data
        let list={
            '1':'message',
            '2':'voice',
        }
        //交互 改变switch
        function abc(n) {
            data.forEach(s => {
                if (s.id == n) {
                    s.value = !s.value
                    AsyncStorage.getItem(list[n]).then(o=>{
                        console.log(o)
                        if(o=='true'){
                            AsyncStorage.removeItem(list[n])
                            AsyncStorage.setItem(list[n],'false')
                        }else{
                            AsyncStorage.removeItem(list[n])
                            AsyncStorage.setItem(list[n],'true')
                        }
                    })
                }
                that.setState({
                    data: data
                })
            })
        }
        switch (item.id) {
            case 1:
                abc(1)
                console.log('接收新消息通知')
                break

            case 2:
                abc(2)
                console.log('声音')
                break

            // case 3:
            //     abc(3)
            //     console.log('震动')
            //     break
        }

    }

    componentDidMount() {
        let data = [{ id: 1, left: "接收新消息通知", value: false },
        { id: 2, left: "声音", value: false },
        // { id: 3, left: "震动", value: false },
    ]
        AsyncStorage.getItem('message').then(res => {
            console.log(res)
            if (res=='true') {
                data.forEach(s => {
                    if (s.id == 1) {
                        s.value = true
                    }
                })
            } else {
                data.forEach(s => {
                    if (s.id == 1) {
                        s.value = false
                    }
                })
            }
            this.setState({
                data: data
            })
        })
        AsyncStorage.getItem('voice').then(res => {
            console.log(res)
            if (res=='true') {
                data.forEach(s => {
                    if (s.id == 2) {
                        s.value = true
                    }
                })
            } else {
                data.forEach(s => {
                    if (s.id == 2) {
                        s.value = false
                    }
                })
            }
            this.setState({
                data: data
            })
        })
        
    }

    render() {
        const { data, value, index } = this.state;
        console.log(data)
        return (
            <View style={styles.container}>
                {
                    data.map((item, i) => (
                        <View style={styles.list} key={i}>
                            <Text style={styles.list_left}>
                                {item.left}
                            </Text>
                            <Switch
                                //  style={styles.list_right}
                                //动态改变value
                                value={item.value}
                                //当切换开关室回调此方法
                                onValueChange={() => { this.onChangeSwitch(item) }}
                            />
                        </View>
                    ))
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 15,
        paddingRight: 15
    },
    headerMiddle: {
        color: "rgba(255,255,255,1)",
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
        textAlign: 'center',
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EBEBEB',
        paddingTop: 17,
        paddingBottom: 17
    },
    list_left: {
        fontSize: 16,
        flex: 1,
        justifyContent: 'center',
    },
    list_right: {
    }
});

export default SetUp