import React,{ Component } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,PixelRatio,Image,ScrollView } from 'react-native'; 


class MessageCompany extends Component {

    render() {
        const { companyMessage } = this.props;
        return (
            <View style={styles.container}>
                <View style={{marginTop:10,backgroundColor:'#FFFFFF',paddingTop:10,paddingBottom:10,paddingLeft:5}}>
                    <Text style={{fontSize:14,color:'#333333'}}>
                        设备数量：{companyMessage.allDeviceSize}台
                    </Text>
                    <Text style={{fontSize:14,color:'#333333'}}>
                        消防设备数量：{companyMessage.fireDevice}台
                    </Text>
                    <Text style={{fontSize:14,color:'#333333'}}>
                        视频设备数量：{companyMessage.cameraSize}台
                    </Text>
                    <Text style={{fontSize:14,color:'#333333'}}>
                        正常设备数量：{companyMessage.nomalDevice}台
                    </Text>
                    <Text style={{fontSize:14,color:'#333333'}}>
                        异常设备数量：{companyMessage.notNomalDevice}台
                    </Text>
                    <Text style={{fontSize:14,color:'#333333'}}>
                        离线设备数量：{companyMessage.offLine}台
                    </Text>
                    <Text style={{fontSize:14,color:'#333333'}}>
                        未处理警情数量：{companyMessage.untreated}条
                    </Text>
                </View>

                {/* <View style={{marginTop:10,backgroundColor:'#FFFFFF',paddingTop:10,paddingBottom:10,paddingLeft:5}}>
                    <Text style={{fontSize:16,color:'#333333',fontWeight:'700',paddingBottom:10}}>消防资源信息</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:14,color:'#333333',flex:1}}>
                            灭火器数量：{deviceList.extinguisher_count}台
                        </Text>
                        <Text style={{fontSize:14,color:'#333333',flex:1}}>
                            消防电梯数量：{deviceList.staris_count}台
                        </Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:14,color:'#333333',flex:1}}>
                            应急灯数量：{0}台
                        </Text>
                        <Text style={{fontSize:14,color:'#333333',flex:1}}>
                            疏散楼梯数量：{deviceList.staircase}台
                        </Text>
                    </View>
                </View> */}
                <Text style={{marginTop:10}}></Text>
            </View> 
        );
    }  
}

const styles = StyleSheet.create({
    title_box:{
        flexDirection:'row',
        backgroundColor:'#FFFFFF',
    },
    title_box_left:{
        flex:1,
    },
    title_box_left_list:{
        fontSize:12,
        color:'#666666',
        paddingTop:5,
        paddingBottom:5,
    },
    thumbnail:{
        width:300
    }
});

export default MessageCompany;