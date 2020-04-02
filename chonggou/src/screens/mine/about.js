import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class mineScreens extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerLeft: (
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={{flexDirection: 'row',paddingLeft:15, alignItems: 'center'}}>
                        <FontAwesome color="#fff" name="angle-left" size={28}/>
                        <Text style={{color:'#fff', fontSize: 16, paddingLeft:5}}>返回</Text>
                    </View>
                </TouchableOpacity>
            ),
            headerTitle: (
                <Text style={styles.headerMiddle}>关于</Text>
            ),
            headerRight:<Text style={{color:'#fff',marginRight:15}}></Text>,
            headerStyle: {backgroundColor: 'linear-gradient(-30deg,rgba(58,161,254,1) 0%,rgba(48,191,251,1) 100%)'}
        };
    }

    constructor(){
        super()
        this.state = {
            data : [{id:1,left:"版本信息",right:"V5.0.3"},
            {id:2,left:"全国服务热线",right:"400-876-7899"},
            {id:3,left:"公司官网",right:"http://www.zzjtl.com"},
            {id:4,left:"邮箱",right:"jintelai@jtl.com"},
            {id:5,left:"地址",right:"河南省郑州市经济开发区经南四路68号大通工业园5号楼5层"},
        ]
        }
    }

    render() {
        const { data } = this.state;
        return (
            <View style={styles.container}>
                <View style={{justifyContent:'center',paddingTop:34,paddingBottom:40}}>
                    <View style={{alignItems:"center"}}>
                        <Image style={{width:130,height:60}} source={require('../../img/logo.png')} />
                    </View>
                    <Text style={{fontSize:20,fontWeight:'900',textAlign:'center',paddingTop:20}}>
                        金特莱智慧消防云平台
                    </Text>
                </View>
                {
                    data.map((item,i)=>(
                        <View key={i} style={styles.list}>
                            <Text style={styles.list_left}>
                                {item.left}
                            </Text>
                            <Text style={styles.list_right}>{item.right}</Text>
                        </View>
                    ))
                }
                <View style={{flexDirection:'row',justifyContent:'center',position:'absolute',bottom:25,left:0,right:0}}>
                    <Text style={{color:'#788A93',fontSize:12}}>版权声明：Copyright © 郑州金特莱科技有限公司</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        padding:10,
        flex:1
    },
    headerMiddle: {
        color: "rgba(255,255,255,1)",
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
        textAlign: 'center',
    },
    list:{
        flexDirection:'row',
        paddingBottom:15,
        borderBottomWidth:1,
        borderBottomColor:'#EBEBEB',
        marginTop:15
    },
    list_left:{
        fontSize:14,
        width:100,
        justifyContent:'center'
    },
    list_right:{
        textAlign:"right",
        flex:1,
        lineHeight:20,
        fontSize:14,
        justifyContent:'center',
    }
});

export default mineScreens