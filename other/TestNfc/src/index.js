import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer,createBottomTabNavigator } from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './tab/home';
import MainScreen from './tab/main';
import SetScreen from './tab/setting';

import HomeDetail from './home/homedetail';
import MainDetail from './main/maindetail';
import SetDetail from './setting/setdetail';


import Video from './home/testVideo';
import Rtmpview from './home/rtmpview';
import VideoPlayer from './home/testVlcPlayer';
import VideoLivePlayer from './home/videoLivePlayer';
import Nodemediaclient from './home/nodemediaclient';

import HomeIndex from './home/index';
import MainIndex from './main/index';


class SignInScreen extends React.Component {
    static navigationOptions = {
        title: 'Please sign in',
    };

    render() {
        return (
        <View style={styles.container}>
            <Button title="Sign in!" onPress={this._signInAsync} />
        </View>
        );
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };
}



class AuthLoadingScreen extends React.Component {
    constructor() {
        super();
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };

    // Render any loading content that you like here
    render() {
        return (
        <View style={styles.container}>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const TabNavigator = createBottomTabNavigator({
    home:{
        screen:HomeScreen,
        navigationOptions: {
            tabBarLabel: '首页',
            tabBarIcon: ({ tintColor, focused }) => (
                <FontAwesome name="home" size={25} color={tintColor} />
            ),
        },
    },
    maim:{
        screen:MainScreen,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({ tintColor, focused }) => (
                <FontAwesome name="user" size={25} color={tintColor} />
            ),
        },
    },
    setting:{
        screen:SetScreen,
        navigationOptions: {
            tabBarLabel: '设置',
            tabBarIcon: ({ tintColor, focused }) => (
                <FontAwesome name="gear" size={25} color={tintColor} />
            ),
        },
    }
},{
    tabBarOptions:{
        activeTintColor:"#06C1AE",
        inactiveTintColor:"#979797",
        style:{
            backgroundColor:'#FFFFFF'
        }
    }
})


const AppStack = createStackNavigator({ 
    Home: TabNavigator, 
    homedetail: HomeDetail,
    maindetail: MainDetail, 
    setdetail: SetDetail,
    homeIndex:HomeIndex,
    mainIndex:MainIndex,
    video:Video,
    rtmpview:Rtmpview,
    videoPlayer:VideoPlayer,
    videoLivePlayer:VideoLivePlayer,
    nodemediaclient:Nodemediaclient,
});
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));
