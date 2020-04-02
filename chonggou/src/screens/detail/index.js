import React,{ Component } from 'react';
import { View,Text } from 'react-native'; 


class DetailScreens extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        console.log(navigationOptions)
        // 
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center' }}>{navigation.state.params.otherParam}</Text>
            ),
            headerRight: <View />
        };
    };

    render() {
        const self = this.props;
        console.log(self);
        return (
            <View>
                <Text>我是详情页</Text>
            </View>
        );
    }  
}

export default DetailScreens;