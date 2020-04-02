import React, { Component } from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class AccessScreens extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerTitle: (
                <Text style={{ fontWeight: 'bold', fontSize: 20, flex: 1, textAlign: 'center',color:'#FFFFFF' }}>接入设备</Text>
            ),
            headerRight: <Text style={{color:'#FFFFFF',paddingRight:10}}>修改参数</Text>,
            headerLeft: (
                <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                    <View style={{flex:1,justifyContent:'center'}}>
                        <Text style={{ color: '#fff', marginLeft: 12, fontSize: 15 }}>
                            <FontAwesome color="#fff" name="angle-left" size={18} /> &nbsp;&nbsp;返回
                        </Text>
                    </View>
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: '#3AA1FE',
                height: 50
            }
        }
    };

  render() {
    return (
      <View>
        <Text>接入设备</Text>
      </View>
    );
  }
}

export default AccessScreens