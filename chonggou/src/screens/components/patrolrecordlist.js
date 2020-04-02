import React,{ Component } from 'react';
import { View,Text,TouchableOpacity,StyleSheet } from 'react-native'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class ListScreens extends Component {
    render() {
        const { url,navigation,item,urlStandand } = this.props;
        return (
            <TouchableOpacity onPress={()=>navigation.navigate(url,{
                ID:item.id
            })}>
                <View style={styles.container}>
                <View style={styles.rightContainer}>
                    <View style={styles.containerLine}>
                        <Text style={styles.content}>{item.patrolPointName}</Text>
                    </View>
                    <View style={styles.containerLine}>
                        <Text style={styles.title}>巡查卡编号：</Text>
                        <Text style={styles.content}>{item.cardCode}</Text>
                    </View>
                    <View style={styles.containerLine}>
                        <Text style={styles.title}>巡查状态：</Text>
                        {url == 'PatrolRecord'? (<Text style={styles.content} color="#FD3E3C">已巡查</Text>):urlStandand == 'PatrolRecordDetaiList'? (<Text style={styles.content} color="#FD3E3C">漏巡查</Text>):(<Text style={styles.content} color="#FD3E3C">待巡查</Text>)}
                    </View>
                    <View style={styles.containerLine}>
                        <Text style={styles.title}>巡查点位置：</Text>
                        <Text style={styles.content}>{item.location}</Text>
                    </View>
                </View>
                <FontAwesome color="#666666" name="chevron-right" size={16} />
                </View> 
            </TouchableOpacity>
        );
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