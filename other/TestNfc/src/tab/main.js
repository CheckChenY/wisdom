import React , { Component } from 'react';
import {Text,View,Button} from 'react-native';


class MainScreen extends Component{
    render(){
        return(
            <View>
                <Text>
                    我的地盘
                </Text>
                <Button title={'添加巡查点'}
                    onPress={this.getportal}
                >

                </Button>
            </View>
        )
    }

    getportal = () => {
        this.props.navigation.navigate('maindetail')
    }
}

export default MainScreen