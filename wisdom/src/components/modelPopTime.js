/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { View,Text } from 'react-native';
import Modal from "react-native-modal";

export default class modelPopTime extends Component {

    constructor() {
        super();
    } 

    render() {
        const { modelTime } = this.props;
        return (
            <View>
                <Modal 
                    isVisible={modelTime?true:false}
                >
                    <View style={{ flex: 1}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
                            <View style={{width:'80%',backgroundColor:"rgba(36,36,36,0.5)",padding:5}}>
                                <View style={{padding:10,opacity:0.5}}>
                                    <Text style={{fontSize:14,color:"#FFFFFF",textAlign:'center'}}>正在操作，请等待{modelTime}秒</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
