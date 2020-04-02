import React,{ Component } from 'react';
import { View,Text,TouchableOpacity,StyleSheet } from 'react-native'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FetchManager from '../fetch/index';

class ListScreens extends Component {
    constructor(props){
        super(props)
        this.state={
            userDic:{}
        }
    }
    render() {
        const { url,navigation,item, label } = this.props;
        return (
            <TouchableOpacity onPress={()=>navigation.navigate(url,{urlStandand:url,paramsObj:item})}>
                <View style={styles.container}>
                <View style={styles.rightContainer}>
                    <View style={styles.containerLine}>
                    <Text style={styles.title}>巡查人：</Text>
                    <Text style={styles.content}>{this.state.userDic[item.userId]}</Text>
                    </View>
                    <View style={styles.containerLine}>
                    <Text style={styles.title}>任务名称：</Text>
                    <Text style={styles.content}>{item.patrolName}</Text>
                    </View>
                    <View style={styles.containerLine}>
                    <View>
                        <Text style={styles.title}>巡查周期：</Text>
                    </View>
                    <View>
                        <View>
                            <Text style={{color:'#666'}}>{item.startTime} - </Text>
                        </View>
                        <View>
                            <Text style={{color:'#666'}}>{item.endTime}</Text>
                        </View>
                    </View>
                    </View>
                    <View style={styles.containerLine}>
                    <Text style={styles.title}>巡查进度：</Text>
                    <Text style={styles.content}>
                        {
                            url == "PatrolDetaiList"?
                            (<Text>{item.finish}/<Text style={{color:'#3AA1FE'}}>{item.pointCount}</Text>（已巡查/<Text style={{color:'#3AA1FE'}}>应巡查</Text>）</Text>): 
                            (<Text>{item.finish}（已巡查）/<Text style={{color:'#FD3E3C'}}>{item.pointCount}</Text>（<Text style={{color:'#FD3E3C'}}>应巡查</Text>）</Text>)
                        }
                    </Text>
                    </View>
                </View>
                <FontAwesome color="#666666" name="chevron-right" size={16} />
                </View> 
            </TouchableOpacity>
        );
    }
    componentDidMount() { //初始化的时候要判断长度 控制上拉加载
        FetchManager.get('1/user/findAllUser',{}, (set) => {
            var userDic={}
            set.forEach(s=>{
                userDic[s.id]=s.realName
            })
            this.setState({
                userDic:userDic
            })
        })
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
        height: 119,
    },
    rightContainer: {
        flex: 1,
    },
    containerLine: {
        flexDirection: "row",
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
    contentAlarm: {
        fontSize: 14,
        color: "#FD3E3C",
        fontFamily: "PingFang-SC-Medium",
        fontWeight: "500",
    },
    contentMalfunction: {
        fontSize: 14,
        color: "#FEB52E",
        fontFamily: "PingFang-SC-Medium",
        fontWeight: "500",
    },
    contentOffline: {
        fontSize: 14,
        color: "#9E9E9E",
        fontFamily: "PingFang-SC-Medium",
        fontWeight: "500",
    },
    contentNormal: {
        fontSize: 14,
        color: "#2BD957",
        fontFamily: "PingFang-SC-Medium",
        fontWeight: "500",
    },
    thumbnail: {
        width: 80,
        height: 86
    },
    list: {
        backgroundColor: "#fff",
    },
    headerMiddle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
        textAlign: 'center',
    },
    footer:{
        flexDirection:'row',
        height:24,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    },
});


export default ListScreens;