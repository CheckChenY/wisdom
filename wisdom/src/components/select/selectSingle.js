import React, { Component } from "react";
import {StyleSheet, View} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ModalDropdown from 'react-native-modal-dropdown';
import PropTypes from 'prop-types';

export default class Select extends Component {
    static propTypes = {
        disabled: PropTypes.bool,
        scrollEnabled: PropTypes.bool,
        defaultIndex: PropTypes.number,
        defaultValue: PropTypes.string,
        options: PropTypes.array,
        width: PropTypes.number,
        height: PropTypes.number,
        size: PropTypes.number,
    
        accessible: PropTypes.bool,
        animated: PropTypes.bool,
        showsVerticalScrollIndicator: PropTypes.bool,
        keyboardShouldPersistTaps: PropTypes.string,
    
        adjustFrame: PropTypes.func,
        renderRow: PropTypes.func,
        renderSeparator: PropTypes.func,
        renderButtonText: PropTypes.func,
    
        onSelect: PropTypes.func
      };
    
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
    constructor() {
        super();
        this.state = {
            iconSelect: 'caret-down',
        };
    }

    onSelect = (item,index) => {
        this.setState({
            selectSystem: item
        })
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
        const {onSelect, defaultValue, options, width,height,size} = this.props;
        const {iconSelect} = this.state;
        return (
            <View style={styles.select_style}>
                <ModalDropdown 
                        options={options} 
                        onSelect={onSelect}
                        onDropdownWillShow={this.showRightSelect}
                        onDropdownWillHide={this.hideRightSelect}
                        defaultValue={defaultValue}
                        style={{width: width,paddingLeft:10,flex:1,height:height,justifyContent:'center',}}
                        dropdownStyle={{width: width,}}
                        dropdownTextStyle={{fontSize: size,color: '#333',justifyContent:'center'}}
                        textStyle={{fontSize: size,color: '#333'}}/>
                    <FontAwesome color="#333" name={iconSelect} size={16} style={{width:50,textAlign:'center',paddingTop:10,}} />
            </View> 
        );
    }
}

var styles = StyleSheet.create({
    select_style: {
        flexDirection:'row',justifyContent:'center'
    }
});
