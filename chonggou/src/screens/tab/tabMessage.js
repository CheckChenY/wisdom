import React,{ Component } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,PixelRatio,Image } from 'react-native'; 

// import MessageList from '../message/messageList';
import DeviceMessageList from '../message/deviceMessageList';
// import BusinessMessage from '../message/businessMessage';
// import NoticeMessage from '../message/noticeMessage';
import TabsCompanents from '../components/tabs';
// import FetchManager from '../fetch/index';

class MessageScreens extends Component {


    onChangeTab = (val) => {
        // console.log(val)
        // debugger;
        let nub = Number(val) + 1
        this.popUp.onChangeIndex(nub)
    }

    render() {
        return (

            <View style={styles.container}>
                <TabsCompanents
                    onChangeTab = {this.onChangeTab.bind(this)}
                >
                    {/* First tab */}
                    <View title="警情消息">
                        <DeviceMessageList 
                            { ...this.props }
                            ref={ ref => this.popUp = ref }/>
                    </View>
                    {/* Second tab */}
                    <View title="业务消息">
                        <DeviceMessageList 

                            { ...this.props }

                             ref={ ref => this.popUp = ref }/>
                    </View>
                    <View title="通知公告">
                        <DeviceMessageList 
                            { ...this.props }

                             ref={ ref => this.popUp = ref }/>
                    </View>
                    <View title="系统消息">
                        <DeviceMessageList 
                            { ...this.props }

                             ref={ ref => this.popUp = ref }/>
                    </View>
                </TabsCompanents>
            </View>
        );
    }
       
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});

export default MessageScreens;