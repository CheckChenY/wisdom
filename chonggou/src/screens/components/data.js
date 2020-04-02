import React, { Component } from 'react';
import { View,Text, } from 'react-native';
import {CalendarList} from 'react-native-calendars';
import FetchManager from '../fetch/index';
import { getData,getDataId } from '../fetch/getData';

import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
    monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    monthNamesShort: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    dayNames: ['日','一','二','三','四','五','六'],
    dayNamesShort: ['日','一','二','三','四','五','六']
};

LocaleConfig.defaultLocale = 'fr';
 
export default class MyDatePicker extends Component {
    constructor(props){
        super(props)
        this.state = {};
        this.onDayPress = this.onDayPress.bind(this);
    }

    componentDidMount(){
        const { selected } = this.state;

        getData(selected).then(res => {
            // console.log(res);
            this.setState({
                selectData:res
            })
        });
        
        // console.log(selectData);
    }

    onDayPress(day) {
        const { getDataDetail } = this.props;
        let obj = {
            createTime:day.dateString
        }
        getDataDetail(obj)
    }
 
    render(){
        const { selectData } = this.state;
        return (
            <View>
                <CalendarList 
                    horizontal={true}
                    style={[{height: 300}]}
                    pastScrollRange={24} 
                    futureScrollRange={24} 
                    monthFormat={'yyyy MMMM'}
                    onDayPress={this.onDayPress}
                    markedDates={selectData}
                />
            </View>
        )
    }
}