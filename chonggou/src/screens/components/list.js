import React,{ Component } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,Image,Alert } from 'react-native'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FetchManager from '../fetch/index';
import { getSigleFloor } from '../components/getSystex';

class ListScreens extends Component {
    constructor(props){
        super(props)
        this.state={
            warnState:{
                '0':'正常',
                '1':'报警',
                '2':'故障',
                '3':'报警&故障',
                '4':'离线',
            }
        }
    }
    render() {
        const { url,navigation,item,name } = this.props;
        let imgObj = null
        if (item.image) {
            imgObj = <Image
                source={item.image}
                style={styles.thumbnail}
            />
        }
        return (
            <TouchableOpacity onPress={()=>{this.click(url,item)}}>
                <View style={styles.container}>
                    {imgObj}
                    <View style={styles.rightContainer}>
                        {
                            name === '报警设备' || name === '处理记录' ? (
                                <View style={styles.containerLine}>
                                    <Text style={styles.title}>上报时间：</Text>
                                    <Text style={styles.content}>{item.time}</Text>
                                </View>
                            ) : null 
                        }
                        
                        <View style={styles.containerLine}>
                            <Text style={styles.title}>设备名称：</Text>
                            <Text style={styles.content}>{item.deviceName}</Text>
                        </View>
                        <View style={styles.containerLine}>
                            <Text style={styles.title}>{ name === '火灾自动报警系统' ? '当前状态：' : '所属系统：'}</Text>
                            <Text style={styles.content}>{item.sysname}</Text>
                        </View>
                        <View style={styles.containerLine}>
                            <Text style={styles.title}>{name === '报警设备' || name === '处理记录' ? '设备状态：' : name === '火灾自动报警系统' ? '状态描述：' : '服务期限：'}</Text>
                            {name === '报警设备' || name === '处理记录' || name === '火灾自动报警系统' ? (
                                <Text style={styles.content}>{item.statusDes}</Text>
                            ) : (
                                <Text style={styles.content}>{item.validityTerm}</Text>
                            )}
                        </View>
                        <View style={styles.containerLine}>
                            <Text style={styles.title}>设备位置：</Text>
                            <Text style={styles.content}>{item.location}</Text>
                        </View>
                        {
                            name === '处理记录' ? (
                                <View style={styles.containerLine}>
                                    <Text style={styles.title}>处理人：</Text>
                                    <Text style={styles.content}>{item.persion}</Text>
                                </View>
                            ) : null 
                        }
                    </View>
                    <AntDesign color="#666666" name="right" size={18} />
                </View> 
            </TouchableOpacity>
        );
    }
    click=(url,item)=>{
        if(url=='equipmentStatue'){
            var _params={
                deviceId:item.deviceId
            }
            FetchManager.get('1/unitdevice/pageAndWarnLevel',_params, (set) => {
                console.log(set)
                if(!parseInt(set.code)){
                    if(set.data[0]){
                        getSigleFloor(set.data[0].buildingId).then(res=>{
                            if(res.length){
                                res.forEach(s=>{
                                    if(parseInt(s.value)==set.data[0].floorId){
                                        set.data[0].floorId=s.label
                                    }   
                                })
                            }
                        })
                        set.data[0].createTime=set.data[0].createTime.replace('T',' ')
                        var obj=set.data[0]
                        
                        //根据deviceType判断操作类型
                        var options={
                            zijian:false,
                            fuwei:false,
                            xiaoyin:false
                        }
                        var num=parseInt(set.data[0].deviceType)
                        if(num==20||num==21||num==22||num==23||num==24||num==37||num==38||num==39){
                            options.fuwei=true
                            options.zijian=true
                        }else if(num==25||num==36||num==40||num==41||num==42||num==43){
                            options.fuwei=true
                            options.zijian=true
                            options.xiaoyin=true
                        }else if(num==26){
                            options.xiaoyin=true
                        }else if(num==34||num==35){
                            options.fuwei=true
                        }

                        //判断是否有操作记录
                        var haveRecord=false
                        for(let i in options){
                            if(options[i]){
                                haveRecord=true
                            }
                        }
                        
                        this.props.navigation.navigate(url,{
                            data:obj,
                            options:options,
                            haveRecord:haveRecord
                        })
                    }
                }
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F2F7FB",
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
    },
    rightContainer: {
        flex: 1,
        marginLeft: 10,
    },
    containerLine: {
        flexDirection: "row",
        alignItems: "center",
        height: 25,
    },
    title: {
        fontSize: 15,
        color: "#333",
        fontFamily: "PingFang-SC-Medium",
        fontWeight: "500",
    },
    content: {
        fontSize: 14,
        color: "#666",
        fontFamily: "PingFang-SC-Medium",
        fontWeight: "500",
    },
    thumbnail: {
        width: 80,
        height: 86
    },
});


export default ListScreens;