import React,{ Component } from 'react';
import { View,Text,StyleSheet,FlatList,TouchableOpacity } from 'react-native'; 


class MessageList extends Component {

    render() {
        const { list} = this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    data={list}
                    renderItem={this._messageList}
                />
            </View>
        );
    }  
    
    _messageList = ({item}) => {
        const { navigation,url } = this.props;
        return(
            <View style={{paddingTop:5}}> 
                <Text style={styles.title}>{item.time}</Text>
                <TouchableOpacity onPress={()=>navigation.navigate(url)}>
                    <View style={styles.box}>
                        <Text style={styles.box_title}>{item.title}</Text>
                        <View style={styles.box_localtion}>
                            <Text style={styles.box_localtion_left}>所在位置:</Text>
                            <Text style={styles.box_localtion_right}>{item.localtion}</Text>
                        </View>
                        <Text style={styles.box_localtion_message}>{item.message}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        padding:10,
        backgroundColor:"#F5FCFF"
    },
    title:{
        textAlign:'center',fontSize:13,color:"#788A93"
    },
    box:{
        backgroundColor:"#FFFFFF",padding:15,flexDirection:"column",marginTop:10
    },
    box_title:{fontSize:16,color:"#333333",fontWeight:"900"},
    box_localtion:{flexDirection:"row",paddingBottom:15,paddingTop:15},
    box_localtion_left:{width:70,fontSize:15,fontWeight:"600",color:"#333333"},
    box_localtion_right:{flex:1,color:"#666666",fontSize:14},
    box_localtion_message:{color:"#999999",fontSize:14}
})

export default MessageList;