import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,FlatList } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';

class mineScreens extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
        headerLeft: (
            <TouchableOpacity onPress={()=>navigation.goBack()} style={{paddingRight:15,}}>
                <View style={{flexDirection: 'row',paddingLeft:15, alignItems: 'center'}}>
                    <FontAwesome style={{ color: '#FFFFFF' }} name="chevron-left" size={18} />
                </View>
            </TouchableOpacity>
        ),
        headerTitle: (
            <Text style={styles.headerMiddle}>使用帮助</Text>
        ),
        headerRight:<Text style={{color:'#fff',marginRight:15}}></Text>,
        headerStyle: {backgroundColor: '#467cd4'}
        };
    }

    constructor(){
        super()
        this.state = {
            data:[{
                title:'Q：如何添加网关？',container:'点击首页【网关管理】进入页面。首先添加网关信息，可以扫码或者输入网关的标识码，完善网关的信息。根据空开的通信方式选择不同的组网方式。WiFi型空开：添加时需要打开WiFi，连接空开的WiFi，配置空开的网络。RS485型空开：添加时需要扫码或手动输入空开ID，进行组网。'
            },{
                title:'Q：如何进行阈值设置？',container:"点击首页【用电监控】进入页面。选择要修改的【网关】【空开】，点击进入查看详情，点击【阈值设置】进行修改参数阈值。"
            },{
                title:'Q：如何共享设备？',container:"点击首页【共享管理】进入页面。点击【我的】选择要共享的【网关】，点击进入查看详情，点击【添加用户】，输入要共享的用户手机号（在平台注册过的）并添加备注名，共享给该用户。并配置共享的权限。"
            },]
        }
    }

    render() {
        const { data } = this.state;
        return (
            <ScrollView style={styles.container}>
                <View style={{flexDirection:"column",marginTop:10}}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{color:"#333333",fontSize:16,fontWeight:"700"}}>Q:</Text>
                        <Text style={{color:"#333333",fontSize:16,fontWeight:"700"}}>如何添加网关？</Text>
                    </View>
                    <View style={{margin:5,flexDirection:"row"}}>
                        <Text style={{flex:1,lineHeight:20}}>
                        点击首页【网关管理】进入页面。
                        </Text>
                    </View>
                    <View style={{margin:5,flexDirection:"row"}}>
                        <Text style={{flex:1,lineHeight:20}}>
                        首先添加网关信息，可以扫码或者输入网关的标识码，完善网关的信息。根据空开的通信方式选择不同的组网方式。
                        </Text>
                    </View>
                    <View style={{margin:5,flexDirection:"row"}}>
                        <Text style={{flex:1,lineHeight:20}}>
                        WiFi型空开：添加时需要打开WiFi，连接空开的WiFi，配置空开的网络。
                        </Text>
                    </View>
                    <View style={{margin:5,flexDirection:"row"}}>
                        <Text style={{flex:1,lineHeight:20}}>
                        RS485型空开：添加时需要扫码或手动输入空开ID，进行组网。
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection:"column",marginTop:10}}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{color:"#333333",fontSize:16,fontWeight:"700"}}>Q:</Text>
                        <Text style={{color:"#333333",fontSize:16,fontWeight:"700"}}>如何进行阈值设置？</Text>
                    </View>
                    <View style={{margin:5,flexDirection:"row"}}>
                        <Text style={{flex:1,lineHeight:20}}>
                        点击首页【用电监控】进入页面。
                        </Text>
                    </View>
                    <View style={{margin:5,flexDirection:"row"}}>
                        <Text style={{flex:1,lineHeight:20}}>
                        选择要修改的【网关】【空开】，点击进入查看详情，点击【阈值设置】进行修改参数阈值。
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection:"column",marginTop:10}}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{color:"#333333",fontSize:16,fontWeight:"700"}}>Q:</Text>
                        <Text style={{color:"#333333",fontSize:16,fontWeight:"700"}}>如何共享设备？</Text>
                    </View>
                    <View style={{margin:5,flexDirection:"row"}}>
                        <Text style={{flex:1,lineHeight:20}}>
                        点击首页【共享管理】进入页面。
                        </Text>
                    </View>
                    <View style={{margin:5,flexDirection:"row"}}>
                        <Text style={{flex:1,lineHeight:20}}>
                        点击【我的】选择要共享的【网关】，点击进入查看详情，点击【添加用户】，输入要共享的用户手机号（在平台注册过的）并添加备注名，共享给该用户。
                        </Text>
                    </View>
                    <View style={{margin:5,flexDirection:"row"}}>
                        <Text style={{flex:1,lineHeight:20}}>
                        并配置共享的权限。
                        </Text>
                    </View>
                </View>
                {/* <FlatList 
                    data={data}
                    renderItem={this._listQustion}
                /> */}
            </ScrollView>
        );
    }

    // _listQustion = ({item}) => {
    //     return(
            
    //     )
    // }
}

const styles = StyleSheet.create({
    container:{
        padding:10,
        backgroundColor:"#F2F7FB"
    },
    headerMiddle: {
        color: "rgba(246,246,246,1)",
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
        textAlign: 'center',
    },
});

export default mineScreens