import React, { Component } from 'react';
import { View, Text,AppState } from 'react-native';

class mineScreens extends Component {
  static navigationOptions = {

    headerTitle: (
      <Text style={{ fontWeight: 'bold', fontSize: 20, flex: 1, textAlign: 'center' }}>个人信息</Text>
    ),
    headerRight: <View />,
  };

  componentDidMount(){
    AppState.addEventListener('change', (state) => {
      if (state === 'active') {
          console.log('state active');
      } else if (state === 'background') {
          console.log('background');
          // BackgroundTimer.clearTimeout(intervalId);
      } else if (state === 'inactive') {
          console.log('inactive');
      }
    });
  }
  

  render() {
    return (
      <View>
        <Text>个人中心</Text>
      </View>
    );
  }
}

export default mineScreens