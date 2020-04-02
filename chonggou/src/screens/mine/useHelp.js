import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,FlatList } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';

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
            <Text style={styles.headerMiddle}>使用帮助</Text>
        ),
        headerRight:<Text style={{color:'#fff',marginRight:15}}></Text>,
        headerStyle: {backgroundColor: 'linear-gradient(-30deg,rgba(58,161,254,1) 0%,rgba(48,191,251,1) 100%)'}
        };
    }

    constructor(){
        super()
        this.state = {
            data:[{
                title:'首页的【考勤打卡】如何使用？',container:'点击首页左上角【考勤打卡】进入页面后，开启GPS自动定位当前位置，并拍摄自拍照上传，进行考勤打卡；考勤范围和参与考勤的人员在web端【考勤管理】页面设置。'
            },{
                title:'【隐患处理】处理的是哪些隐患？',container:"隐患来源有：拍照上传、巡查中的设备异常；隐患处理也需要遵循“隐患上报——隐患审核——隐患处理”的流程。"
            },{
                title:'【隐患处理】处理的是哪些隐患？',container:"隐患来源有：拍照上传、巡查中的设备异常；隐患处理也需要遵循“隐患上报——隐患审核——隐患处理”的流程。"
            },{
                title:'【隐患处理】处理的是哪些隐患？',container:"隐患来源有：拍照上传、巡查中的设备异常；隐患处理也需要遵循“隐患上报——隐患审核——隐患处理”的流程。"
            },{
                title:'【隐患处理】处理的是哪些隐患？',container:"隐患来源有：拍照上传、巡查中的设备异常；隐患处理也需要遵循“隐患上报——隐患审核——隐患处理”的流程。"
            },{
                title:'【隐患处理】处理的是哪些隐患？',container:"隐患来源有：拍照上传、巡查中的设备异常；隐患处理也需要遵循“隐患上报——隐患审核——隐患处理”的流程。"
            },{
                title:'【隐患处理】处理的是哪些隐患？',container:"隐患来源有：拍照上传、巡查中的设备异常；隐患处理也需要遵循“隐患上报——隐患审核——隐患处理”的流程。"
            },{
                title:'【隐患处理】处理的是哪些隐患？',container:"隐患来源有：拍照上传、巡查中的设备异常；隐患处理也需要遵循“隐患上报——隐患审核——隐患处理”的流程。"
            },{
                title:'【隐患处理】处理的是哪些隐患？',container:"隐患来源有：拍照上传、巡查中的设备异常；隐患处理也需要遵循“隐患上报——隐患审核——隐患处理”的流程。"
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
                        <Text style={{color:"#333333",fontSize:16,fontWeight:"700"}}>首页的【考勤打卡】如何使用？</Text>
                    </View>
                    <View style={{margin:5,flexDirection:"row"}}>
                        <Text style={{flex:1,lineHeight:20}}>
                        点击首页左上角【考勤打卡】进入页面后，开启GPS自动定位当前位置，并拍摄自拍照上传，进行考勤打卡；
                        </Text>
                    </View>
                    <View style={{margin:5,flexDirection:"row"}}>
                        <Text style={{flex:1,lineHeight:20}}>
                        考勤范围和参与考勤的人员在web端【考勤管理】页面设置。
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection:"column",marginTop:10}}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{color:"#333333",fontSize:16,fontWeight:"700"}}>Q:</Text>
                        <Text style={{color:"#333333",fontSize:16,fontWeight:"700"}}>首页的【拍照上传】功能如何使用？</Text>
                    </View>
                    <View style={{margin:5,flexDirection:"row"}}>
                        <Text style={{flex:1,lineHeight:20}}>
                        请点击首页右上角【拍照上传】进入页面。
                        </Text>
                    </View>
                    <View style={{margin:5,flexDirection:"row"}}>
                        <Text style={{flex:1,lineHeight:20}}>
                        如果发生火情，首先点击【一键报警】给119打电话说明火情详细信息，再返回页面进行火情内容填写并上传，为灭火救援提供多类型的数据支持；
                        </Text>
                    </View>
                    <View style={{margin:5,flexDirection:"row"}}>
                        <Text style={{flex:1,lineHeight:20}}>
                        如果遇到消防隐患，请在该页面详细描述隐患并上传。
                        </Text>
                    </View>
                    <View style={{margin:5,flexDirection:"row"}}>
                        <Text style={{flex:1,lineHeight:20}}>
                        所有上传的隐患和火情都可以在上传记录中跟踪处理进度。
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection:"column",marginTop:10}}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{color:"#333333",fontSize:16,fontWeight:"700"}}>Q:</Text>
                        <Text style={{color:"#333333",fontSize:16,fontWeight:"700"}}>【警情处理】处理的是哪些警情？</Text>
                    </View>
                    <View style={{margin:5,flexDirection:"row"}}>
                        <Text style={{flex:1,lineHeight:20}}>
                        警情来源：本单位所有接入云平台的设备；无论是报警、故障还是离线，都在该模块进行处理。
                        </Text>
                    </View>
                    <View style={{margin:5,flexDirection:"row"}}>
                        <Text style={{flex:1,lineHeight:20}}>
                        处理时需要遵循“现场查看——警情确认——处理警情”的流程。
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection:"column",marginTop:10}}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{color:"#333333",fontSize:16,fontWeight:"700"}}>Q:</Text>
                        <Text style={{color:"#333333",fontSize:16,fontWeight:"700"}}>【隐患处理】处理的是哪些隐患？</Text>
                    </View>
                    <View style={{margin:5,flexDirection:"row"}}>
                        <Text style={{flex:1,lineHeight:20}}>
                        隐患来源有：拍照上传、巡查中的设备异常；
                        </Text>
                    </View>
                    <View style={{margin:5,flexDirection:"row"}}>
                        <Text style={{flex:1,lineHeight:20}}>
                        隐患处理也需要遵循“隐患上报——隐患审核——隐患处理”的流程。
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection:"column",marginTop:10}}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{color:"#333333",fontSize:16,fontWeight:"700"}}>Q:</Text>
                        <Text style={{color:"#333333",fontSize:16,fontWeight:"700"}}>【巡查任务】如何巡查？</Text>
                    </View>
                    <View style={{margin:5,flexDirection:"row"}}>
                        <Text style={{flex:1,lineHeight:20}}>
                        点击【巡查任务】，显示的是巡查任务列表，是所有已下发、未结束的巡查任务；
                        </Text>
                    </View>
                    <View style={{margin:5,flexDirection:"row"}}>
                        <Text style={{flex:1,lineHeight:20}}>
                        任务未开始时不支持巡查，任务开始后请在规定的截止时间前完成巡查。
                        </Text>
                    </View>
                    <View style={{margin:5,flexDirection:"row"}}>
                        <Text style={{flex:1,lineHeight:20}}>
                        点击巡查任务进入任务详情，开始巡查时，找到巡查点，点击【开始巡查】，将巡查设备贴于巡查卡上，读取巡查点的信息，并填写巡查点的情况上传。
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection:"column",marginTop:10}}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{color:"#333333",fontSize:16,fontWeight:"700"}}>Q:</Text>
                        <Text style={{color:"#333333",fontSize:16,fontWeight:"700"}}>如何添加巡查点？</Text>
                    </View>
                    <View style={{margin:5,flexDirection:"row"}}>
                        <Text style={{flex:1,lineHeight:20}}>
                        点击【添加设备】>【添加巡查】，可以手动输入巡查卡编码也可以使用手机读取巡查卡编码，填写巡查点信息，保存后即可完成添加。
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection:"column",marginTop:10}}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{color:"#333333",fontSize:16,fontWeight:"700"}}>Q:</Text>
                        <Text style={{color:"#333333",fontSize:16,fontWeight:"700"}}>如何添加非摄像头设备？</Text>
                    </View>
                    <View style={{margin:5,flexDirection:"row"}}>
                        <Text style={{flex:1,lineHeight:20}}>
                        点击【添加设备】，进入页面后可以选择【手动添加】【扫码添加】两种方式添加非摄像头设备。按照页面内容进行填写，提交后即可完成添加。
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection:"column",marginTop:10}}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{color:"#333333",fontSize:16,fontWeight:"700"}}>Q:</Text>
                        <Text style={{color:"#333333",fontSize:16,fontWeight:"700"}}>如何添加摄像头设备？</Text>
                    </View>
                    <View style={{margin:5,flexDirection:"row"}}>
                        <Text style={{flex:1,lineHeight:20}}>
                        点击【添加设备】，进入页面后可以选择【视频监控】添加摄像头设备。按照页面内容进行填写，提交后即可完成添加。
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection:"column",marginTop:10,marginBottom:20}}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{color:"#333333",fontSize:16,fontWeight:"700"}}>Q:</Text>
                        <Text style={{color:"#333333",fontSize:16,fontWeight:"700"}}>如何远程修改设备参数？</Text>
                    </View>
                    <View style={{margin:5,flexDirection:"row"}}>
                        <Text style={{flex:1,lineHeight:20}}>
                        在【监控】tab页中，点击【设备信息】，查看所有的接入该平台的本单位设备，点击查看详情并点击右上角【修改参数】进行参数修改，该功能需要输入密码验证，密码可在web端【系统参数】部分设置修改。
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
        color: "rgba(255,255,255,1)",
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
        textAlign: 'center',
    },
});

export default mineScreens