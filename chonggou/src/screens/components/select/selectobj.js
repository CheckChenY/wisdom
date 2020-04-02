import React, { Component } from "react";
import {StyleSheet, View} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ModalDropdown from 'react-native-modal-dropdown';

export default class Select extends Component {
    
      static defaultProps = {
        disabled: false,
        scrollEnabled: true,
        defaultIndex: -1,
        defaultValue: '请选择',
        options: null,
        animated: true,
        showsVerticalScrollIndicator: true,
        keyboardShouldPersistTaps: 'never',
        size:14,
        // width: 200,
      };
    constructor(props) {
        super(props);
        this.state = {
            iconSelect: 'caret-down',
        };
    }

    onSelect = (index,item) => {
        // debugger;
        const { onSelect,data,options } = this.props;
        
        onSelect(options[index])
        // this.setState({
        //     selectSystem: item
        // })
    }

    showRightSelect = () => {
        this.setState({
            iconSelect: 'caret-up'
        })
    }
    hideRightSelect = () => {
        this.setState({
            iconSelect: 'caret-down'
        })
    }
    render() {
        const { defaultValue,options, dropdownWidth,size,downMarginTop} = this.props;
        const {iconSelect} = this.state;
        let arr = [];
        // debugger;
        // let options = ['123'];
        if( options && options.length > 0){
            options.forEach((show)=>{
                arr.push(show.label)
            })
        }else{
            arr = [];
        }
        // debugger;
        return (
            <View style={styles.select_style}>
                <ModalDropdown 
                    options={arr} 
                    onSelect={this.onSelect}
                    onDropdownWillShow={this.showRightSelect}
                    onDropdownWillHide={this.hideRightSelect}
                    defaultValue={defaultValue}
                    style={{width: dropdownWidth,paddingTop:5,paddingBottom:5,flex:1}}
                    dropdownStyle={{width: dropdownWidth,marginTop:downMarginTop}}
                    dropdownTextStyle={{fontSize: size,color: '#333'}}
                    textStyle={{fontSize: size,color: '#333'}}/>
                    <FontAwesome color="#333" name={iconSelect} size={16} style={{width:50,textAlign:'center',justifyContent:'center',paddingTop:5,paddingBottom:5,}} />
            </View> 
        );
    }
}

var styles = StyleSheet.create({
    select_style: {
        flexDirection:'row',justifyContent:'center'
    }
});
