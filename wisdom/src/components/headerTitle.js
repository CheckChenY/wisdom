import React , { Component } from 'react';
import {Text,View,Dimensions,TouchableOpacity} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Button } from 'react-native-material-ui';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const { width,height } = Dimensions.get('window')


class LineDetail extends Component{
    constructor(){
        super()
        this.state={
            iconSelect: 'caret-down',
        }
    }

    wangguanselect = (e,i) => {
        const { getListData } = this.props;
        getListData(e,i)
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

    render(){
        const { arr,arrDefault,navigation,children } = this.props;
        let left_width = width / 3;
        return(
            <View style={{flexDirection:'row',backgroundColor:'#467cd4',paddingBottom:15,paddingTop:15}}>
                <View style={{flex:1}}>
                    <TouchableOpacity onPress={()=>navigation.goBack()} style={{paddingRight:15,}}>
                        <FontAwesome style={{color:'#FFFFFF',paddingLeft:20,paddingTop:7}} name="chevron-left" size={18} />
                    </TouchableOpacity>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    {children}
                </View>
                <View style={{flex:1,flexDirection:'row'}}>
                    <ModalDropdown 
                        options={arr} 
                        onSelect={this.wangguanselect}
                        onDropdownWillShow={this.showRightSelect}
                        onDropdownWillHide={this.hideRightSelect}
                        defaultValue={arrDefault}
                        style={{fontSize:14,flex:1,marginLeft:20,justifyContent:"center"}}
                        dropdownStyle={{width: left_width,marginTop:23,marginRight:-30}}
                        dropdownTextStyle={{fontSize: 14,color: '#333',}}
                        textStyle={{fontSize: 14,color:'#FFFFFF'}}
                    />
                    <View style={{width:20,justifyContent:"center"}}>
                        <FontAwesome color={'#FFFFFF'} name={this.state.iconSelect} size={18} />
                    </View>
                </View>
            </View>
        )
    }

    
}

export default LineDetail