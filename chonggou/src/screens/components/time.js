import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    StyleSheet,
    ART
} from 'react-native';
 
const { Surface, Shape, Path } = ART;
 
export default class TimeAxis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowHeight: 60,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    }
 
    componentDidMount() {
        // console.log(this);
        if (this.props.direction) {
            this.props.dataSource = this.props.dataSource.reverse();
        }
        this.setState({
            rowHeight: this.props.rowHeight ? this.props.rowHeight : this.state.rowHeight,
            dataSource: this.state.dataSource.cloneWithRows(this.props.dataSource ? this.props.dataSource : [])
        })
    }
 
    _renderRow = (rowData, sectionID, rowID) => {
        // console.log(rowData);
        var item;
        if (this.props.row) {
            item = this.props.row(rowData, rowID, this.state.dataSource.getRowCount());
        } else {
            item = <Text>{rowData}</Text>
        }
        const line = new Path();
        const circle = new Path();
 
        let circleColor = "red";
        var back;

        
        if (rowID == 0) {
            line.moveTo(12, 27).lineTo(12, this.state.rowHeight).close();
 
            circle.moveTo(12, 9)
                .arc(0, 14, 7)
                .arc(0, -14, 7)
                .close();
            circleColor = "#59c93b";//内圈颜色
 
            back = <ART.Shape style={{ zoom: 999, opacity: 0.1 }} d={new Path()
                .moveTo(12, 6)
                .arc(0, 20, 10)
                .arc(0, -20, 10)
                .close()} fill="#d3e2cf"></ART.Shape>//外圈颜色
        }
        else {
            let y = this.state.rowHeight;
            if (rowID == this.state.dataSource.getRowCount() - 1) {
                y = this.state.rowHeight * 0.25;
            }
            line.moveTo(12, 0)
                .lineTo(12, y).close();
                circleColor = "#59c93b";//内圈颜色
 
            circle.moveTo(12, this.state.rowHeight * 0.25)
                .arc(0, 14, 7)
                .arc(0, -14, 7)
                .close();
                
        }
 
        var itemStyles = this.props.itemStyle ? [styles.item_content, this.props.itemStyle] : styles.item_content;
 
        return (
            <View style={[styles.item, { height: this.state.rowHeight }]}>
                <View style={[styles.item_line]}>
                    <ART.Surface width={24} height={this.state.rowHeight}>
                        <ART.Shape d={circle} fill={circleColor} stroke="#e1e1e1" strokeWidth={1}></ART.Shape>
                        <ART.Shape d={line} stroke="#e1e1e1" strokeWidth={1}></ART.Shape>
                    </ART.Surface>
                </View>
                <View style={itemStyles}>{item}</View>
            </View >
        );
    }
 
    render() {
        return (
            <ListView
                style={{ marginTop: 5, backgroundColor: '#fff' }}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
                renderFooter={this.renderFooter}
            />
        );
    }
}
const styles = StyleSheet.create({
    item: {
        marginTop: 1,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    item_line: {
        flex: 2,
        paddingLeft: 10,
    },
    item_content: {
        flex: 14,
    }
})