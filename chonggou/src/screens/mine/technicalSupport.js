import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
            <Text style={styles.headerMiddle}>技术支持</Text>
        ),
        headerRight:<Text style={{color:'#fff',marginRight:15}}></Text>,
        headerStyle: {backgroundColor: 'linear-gradient(-30deg,rgba(58,161,254,1) 0%,rgba(48,191,251,1) 100%)'}
        };
    }

    render() {
        return (
            <View>
                <Text>技术支持</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerMiddle: {
        color: "rgba(255,255,255,1)",
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
        textAlign: 'center',
    },
});

export default mineScreens