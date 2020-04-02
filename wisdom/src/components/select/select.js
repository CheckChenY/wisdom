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
        color: PropTypes.string,
        fontSize: PropTypes.number,
    
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
        defaultValue: 'Please select...',
        options: null,
        animated: true,
        showsVerticalScrollIndicator: true,
        keyboardShouldPersistTaps: 'never',
        width: 150,
        color:'#000',
        fontSize:16
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
        const {onSelect, defaultValue, options,width,color,fontSize} = this.props;
        const {iconSelect} = this.state;
        return (
            <View style={styles.select_style}>
                <ModalDropdown 
                        options={options} 
                        onSelect={onSelect}
                        onDropdownWillShow={this.showRightSelect}
                        onDropdownWillHide={this.hideRightSelect}
                        defaultValue={defaultValue}
                        style={{width: width,paddingLeft: 15,fontSize:14,}}
                        dropdownStyle={{width: width,}}
                        dropdownTextStyle={{fontSize: 14,color: '#333'}}
                        textStyle={{fontSize: fontSize,color:color}}/>
                    <FontAwesome color={color} name={iconSelect} size={18} style={{width:30,textAlign: 'center'}}/>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    select_style: {
        flexDirection:'row',alignItems:'center',width:'50%',height:40,
    }
});
