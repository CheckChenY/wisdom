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
            status:0
        }
    }

    wangguanselect = (e,i) => {
        const { getListData,item } = this.props;
        let detail = item[e];
        getListData(e,i,detail)
    }
    onChangeDate = (index) => {
        const { onChangeBtn } = this.props;
        this.setState({
            status:index
        },onChangeBtn(index))
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
        const { status } = this.state;
        let left_width = width / 3;
        return(
            <View style={{flexDirection:'row',backgroundColor:'#467cd4',paddingBottom:15,paddingTop:15}}>
                <View style={{flex:1,justifyContent:'center'}}>
                    <TouchableOpacity style={{width:50}} onPress={()=>navigation.goBack()}>
                        <FontAwesome style={{ paddingLeft: 20, color: '#FFFFFF' }} name="chevron-left" size={18} />
                    </TouchableOpacity>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    { 
                        children.map(({props:{title}},index)=>(
                            <Button
                                key={index}
                                primary={status === index ? false : true}
                                defaule={status === index ? true : false}
                                raised 
                                onPress={()=>this.onChangeDate(index)} text={title} />
                        ))
                    }
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