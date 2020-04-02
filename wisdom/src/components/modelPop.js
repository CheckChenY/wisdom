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

export default class ModelPop extends Component {

    constructor() {
        super();
        this.state = {
            isModalVisible:false,
            modalText: ''
        };
    } 

    showPop = (modalText) => {
        this.setState({
            isModalVisible: !this.state.isModalVisible,
            modalText: modalText
        },this.getTimerModal())
    }
    getTimerModal = () => {
        setTimeout(() => {
            this.setState({
                isModalVisible:false
            })
        },1000)
    }
    render() {
        const { modalText } = this.state;
        return (
            <View>
                <Modal 
                    isVisible={this.state.isModalVisible}
                >
                    <View style={{ flex: 1}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
                            <View style={{width:'80%',backgroundColor:"rgba(36,36,36,0.5)",padding:5}}>
                                <View style={{padding:10,opacity:0.5}}>
                                    <Text style={{fontSize:14,color:"#FFFFFF",textAlign:'center'}}>{modalText}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
