import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Text, View, TouchableOpacity, StyleSheet, TextInput,ScrollView,Keyboard } from 'react-native';
import FetchManager from '../http/http'


class SetPrice extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            header: null
        };
    };
    constructor(props) {
        super(props)
        this.state = {
            price1: '',
            price2: '',
            price3: '',
            id1:'',
            id2:'',
            id3:'',
            value_one:'0',
            value_two:'0'
        }
    }
    render() {
        const { value_one,value_two } = this.state;
        console.log(value_two)
        return (
            <ScrollView>
                <View style={{ height: 55, backgroundColor: '#467cd4', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{paddingRight:15,}}>
                        <View style={{ paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome style={{ color: '#FFFFFF' }} name="chevron-left" size={18} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, color: '#fff' }}>电价设置</Text>
                    <TouchableOpacity onPress={()=>{this.sureset()}}>
                        <Text style={{ fontSize: 14, color: '#fff', paddingRight: 15, }}>确定</Text>
                    </TouchableOpacity>
                </View>
                <View style={{padding:15}}>
                    <View style={{ height: 38, backgroundColor: '#F6F6F6', flexDirection: 'row', paddingLeft: 15, paddingRight: 15, alignItems: 'center' }}>
                        <View style={{ width: 3, height: 12, backgroundColor: '#467cd4', marginRight: 10 }}></View>
                        <Text style={{ fontSize: 16, color: '#467cd4' }}>第一档</Text>
                    </View>
                    <View style={{ marginBottom: 10,flexDirection:'row' }}>
                        <View style={{flex:1}}><Text style={{textAlign:'right'}}>日用电量区间：0KW·h-</Text></View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <TextInput
                                style={{ borderWidth: 1, borderColor: '#BABABC', borderRadius: 2,padding:0,height:20,justifyContent:'center',fontSize:12 }}
                                onChangeText={(value_one)=>this.setState({value_one})}
                                value={value_one}
                            />
                            <Text>KW·h</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30, }}>
                        <View style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>设置电价：</Text>
                        </View>
                        <TextInput
                            style={{ width: '70%', height: 40, paddingLeft: 10, paddingRight: 10, borderWidth: 1, borderColor: '#BABABC', borderRadius: 2, marginRight: 10, }}
                            placeholder="请设置电价"
                            onChangeText={(price1) => this.setState({ price1 })}
                            value={this.state.price1}
                        />
                        <Text>元</Text>
                    </View>
                    <View style={{ height: 38, backgroundColor: '#F6F6F6', flexDirection: 'row', paddingLeft: 15, paddingRight: 15, alignItems: 'center' }}>
                        <View style={{ width: 3, height: 12, backgroundColor: '#467cd4', marginRight: 10 }}></View>
                        <Text style={{ fontSize: 16, color: '#467cd4' }}>第二档</Text>
                    </View>
                    <View style={{ marginBottom: 10,flexDirection:'row' }}>
                            <View style={{flex:1}}>
                                <Text style={{textAlign:'right'}}>日用电量区间：{value_one}KW·h-</Text>
                            </View>
                            <View style={{flex:1,flexDirection:'row'}}>
                                <TextInput
                                    style={{ borderWidth: 1, borderColor: '#BABABC', borderRadius: 2,padding:0,height:20 }}
                                    onChangeText={(value_two)=>this.setState({value_two})}
                                    value={value_two}
                                />
                                <Text>KW·h</Text>
                            </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30, }}>
                        <View style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>设置电价：</Text>
                        </View>
                        <TextInput
                            style={{ width: '70%', height: 40, paddingLeft: 10, paddingRight: 10, borderWidth: 1, borderColor: '#BABABC', borderRadius: 2, marginRight: 10, }}
                            placeholder="请设置电价"
                            onChangeText={(price2) => this.setState({ price2 })}
                            value={this.state.price2}
                        />
                        <Text>元</Text>
                    </View>
                    <View style={{ height: 38, backgroundColor: '#F6F6F6', flexDirection: 'row', paddingLeft: 15, paddingRight: 15, alignItems: 'center' }}>
                        <View style={{ width: 3, height: 12, backgroundColor: '#467cd4', marginRight: 10 }}></View>
                        <Text style={{ fontSize: 16, color: '#467cd4' }}>第三档</Text>
                    </View>
                    <View style={{ marginBottom: 10, }}>
                        <Text>日用电量区间：{value_two}KW·h</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>设置电价：</Text>
                        </View>
                        <TextInput
                            style={{ width: '70%', height: 40, paddingLeft: 10, paddingRight: 10, borderWidth: 1, borderColor: '#BABABC', borderRadius: 2, marginRight: 10, }}
                            placeholder="请设置电价"
                            onChangeText={(price3) => this.setState({ price3 })}
                            value={this.state.price3}
                        />
                        <Text>元</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
    sureset=()=>{
        const { price1,price2,price3,id1,id2,id3,value_one,value_two } = this.state;
        let listArr = [];
        let objPrice1 = {};
        objPrice1.elecLevel = '1';
        objPrice1.id = id1;
        objPrice1.price = price1;
        objPrice1.priceUnit = value_one;
        
        let objPrice2 = {};
        objPrice2.elecLevel = '2';
        objPrice2.id = id2;
        objPrice2.price = price2;
        objPrice2.priceUnit = value_two;
        
        let objPrice3 = {};
        objPrice3.elecLevel = '3';
        objPrice3.id = id3;
        objPrice3.price = price3;
        objPrice3.priceUnit = value_two;

        listArr.push(objPrice1);
        listArr.push(objPrice2);
        listArr.push(objPrice3);

        // obj.list = listArr;

        console.log(JSON.stringify(listArr))
        FetchManager.post('/app/acbelectrovalence/update', listArr, async (set) => {
            if(set.status === 0){
                this.props.navigation.navigate('setting')
            }
        })
    }
    componentDidMount() {
        let params = {
            userId: this.props.navigation.state.params.userId
        }
        FetchManager.get('/app/acbelectrovalence/getMyValence', params, async (set) => {
            console.log(set)
            if (set.status == 0) {
                if (set.data.length) {
                    set.data.forEach(s => {
                        if (s.elecLevel == 1) {
                            this.setState({
                                price1: s.price + '',
                                id1: s.id + '',
                                value_one:s.priceUnit
                            })
                        }
                        if (s.elecLevel == 2) {
                            this.setState({
                                price2: s.price + '',
                                id2: s.id + '',
                                value_two:s.priceUnit
                            })
                        }
                        if (s.elecLevel == 3) {
                            this.setState({
                                price3: s.price + '',
                                id3: s.id + '',
                            })
                        }
                    })
                }
                this.setState({
                    priceList: set.data
                })
            }
        })
    }
}
const style = StyleSheet.create({
    page: {
        backgroundColor: 'rgb(246,246,246)',
        height: '100%',
    },
})
export default SetPrice