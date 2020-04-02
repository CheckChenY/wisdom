import React,{ Component } from 'react';
import { View,Text,Button } from 'react-native'; 


class MessageScreens extends Component {
    render() {
        return (
            <View>
                <Text>我是监控一页页</Text>
                <Button title="进入详情页" onPress={this._showMoreApp} />
            </View>
        );
    }  

    _showMoreApp = () => {
        this.props.navigation.navigate('MonMain');
    };
}

export default MessageScreens;