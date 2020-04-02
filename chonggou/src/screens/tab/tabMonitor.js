import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, ScrollView, TouchableOpacity,ImageBackground } from 'react-native';
const { height, width } = Dimensions.get('window');
import { getSystem,getDevice,getAllFloor,getSigleFloor } from '../components/getSystex';
import FetchManager from '../fetch/index';

import LocaltionImg from '../../img/monitor/img';

class MessageScreens extends Component {
    static navigationOptions = {
        headerTitleStyle: {
            elevation: 0,
        },
    };


    constructor(props) {
        super(props);
        this.state = {
            date: [],
        };
    }

    componentDidMount(){
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            this.getData();
        });
    }
    componentWillUnmount() {
        this._navListener.remove();
    }

    getData = () => {
        ///device/inner/jtlDevice/getSystem
        FetchManager.get('/device/inner/jtlDevice/getSystem', '', async (set) => {
            console.log(set)
            if(set.success){
                let content = set.value
                if(content.length > 0){
                    let data = []
                    content.forEach(item=>{
                        var obj={}
                        obj['title']=item.code
                        obj['nub']=item.id
                        obj['waring']=item.numbers
                        data.push(obj)
                    })
                    this.setState({
                        date:data
                    })
                }
            }
        })
    }

    getCompanyDevice = (item) => {
        let obj = {
            systemCode:item.nub
        }///device/inner/jtlDevice/getTypeSystemApp
        FetchManager.get('/device/inner/jtlDevice/getTypeSystemApp',obj, async (set) => {
            console.log(set)
            if(set.success){
                let data = set.value
                if(data.type === '1'){
                    this.props.navigation.navigate('infoProcessing',{
                        id:item.nub,
                        orgId:data.orgId,
                        type:data.type,
                        title:item.title
                    })
                }else if(data.type === '3'){
                    this.props.navigation.navigate('videoInformation',{
                        id:item.nub,
                        orgId:data.orgId,
                        type:data.type,
                        title:item.title
                    })
                }else{
                    this.props.navigation.navigate('deviceInformation',{
                        id:item.nub,
                        orgId:data.orgId,
                        type:data.type,
                        title:item.title
                    })
                }
            }
        })
    }

    render() {
        const { date } = this.state;
        return (
            <ScrollView>
                <ImageBackground
                    style={{width:width}}
                    source={require('../../img/video.png')}>
                    <View style={{height:180}}>
                        <Image style={{width:width,height:180}} source={require('../../img/home_banner.jpg')}></Image>
                    </View>
                    <View style={{ padding:10,flexDirection:'row' }}>
                        <View style={styles.title_btn}>
                            <View style={styles.title_btn_list}>
                                {
                                    date.map((item,i) => (
                                        
                                        <View key={i} style={styles.title_btn_list_normal}>
                                            {/* url: 'equipmentStatue',
                                            name: item.title,//系统列表区别 */}
                                            <TouchableOpacity onPress={ ()=>this.getCompanyDevice(item) } >
                                                <View style={{alignItems:'center'}}>
                                                    {/* <Image
                                                        style={styles.c_Img}
                                                        source={require('../../img/monitor/lx.png')}
                                                    /> */}
                                                    <Image
                                                            style={styles.c_Img}
                                                            source={LocaltionImg['png' + item.nub]}
                                                        />

                                                    <Text style={{fontSize:12,paddingTop:10}}>
                                                        {item.title}
                                                    </Text>
                                                    {
                                                        item.waring === 0 ? <Text /> : 
                                                        (
                                                            <Text style={styles.title_icon}>{item.waring}</Text>
                                                        )
                                                    }
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </ScrollView>
        );
    }

    _showMoreApp = () => {
        this.props.navigation.navigate('detail', {
            itemId: 86,
            otherParam: 'anything you want here',
        });
    };
}

const styles = StyleSheet.create({
    c_Img: {
        height: 60,
        width: 60,
    },
    title_icon: {
        position: 'absolute',
        top: -3, right: 0,
        width: 18, height: 18,
        borderRadius: 10, 
        backgroundColor: 'red',
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'

    },


    title_btn: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },

    title_btn_list: {
        // width: width,
        flexWrap: 'wrap',
        display: 'flex',
        flexDirection: 'row',
    },


    title_btn: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },

    title_btn_list: {
        width: width,
        flexWrap: 'wrap',
        display:'flex',
        flexDirection: 'row',
    },

    title_btn_list_normal: {
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#FFFFFF',
        width:(width-80)/3,
        margin: 10,
        borderRadius:4,
        alignItems:"center",
        paddingTop:5,
        paddingBottom:5,
        // elevation: 4,
    },

})

export default MessageScreens;