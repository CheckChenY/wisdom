import React,{ Component } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,TextInput,Dimensions,ScrollView } from 'react-native'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";
import {Calendar,LocaleConfig} from 'react-native-calendars';


import CurveCom from '../components/curveCom';

LocaleConfig.locales['fr'] = {
    monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    monthNamesShort: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    dayNames: ['日','一','二','三','四','五','六'],
    dayNamesShort: ['日','一','二','三','四','五','六']
};
LocaleConfig.defaultLocale = 'fr';


const { height, width } = Dimensions.get('window');






class CurveScreens extends Component {
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
            <Text style={styles.headerMiddle}>参数曲线</Text>
        ),
        headerRight:<Text style={{color:'#fff',marginRight:15}}></Text>,
        headerStyle: {backgroundColor: 'linear-gradient(-30deg,rgba(58,161,254,1) 0%,rgba(48,191,251,1) 100%)'}
        };
    }

    constructor(props) {
        super(props);
        this.state = { 
            day: '',
            isModalVisible:false,
            color:'#788A93',
            index:0,
            btnBol:false,
            date:[{id:1,title:'实时压力'},
                // {id:2,title:'三项电压'},
                // {id:3,title:'三相电流'},
                // {id:4,title:'三相电流'},
                // {id:5,title:'漏电流'},
                // {id:6,title:'三相电压'},
                // {id:7,title:'三相电压'},
            ],
            deviceWaringNub:[],
            deviceWaringDate:[],
            systemId:'',
            list:{
                // page:1,
                // limit:10,
            },
            lineObj:{}
        };
        this._toggleModal = this._toggleModal.bind(this)
        this.onDayPress = this.onDayPress.bind(this);
    }


    componentDidMount(){
        const { deviceId,systemId } = this.props.navigation.state.params;
        const { list } = this.state;
        
        list['deviceId'] = deviceId;

        console.log(systemId)

        let day = new Date().getDate();
        let month = new Date().getMonth();
        let nub = Number(month) + 1;
        // debugger;
        if(nub < 10){
            nub = '0' + nub;
        }else if(day < 10){
            day = '0' + day;
        }

        let time = new Date().getFullYear()+'-'+ nub +'-'+ day;

        this.setState({
            day:time,
            systemId:systemId
        })

        
        // this.getData(time,systemId)
    }



     
    _toggleModal = () =>{
        this.setState({ isModalVisible: !this.state.isModalVisible });
    }


    onDayPress(day,obj) {
        // const { systemId } = this.state;
        this.setState({
            day: day.dateString,
            isModalVisible: !this.state.isModalVisible
        });
    }




    render() {
        const { systemId,day } = this.state;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.title}>
                        <View style={styles.title_left}>
                            <Text style={styles.title_left_word}>设备参数动态变化曲线</Text>
                        </View>
                        <View style={styles.title_right}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                                <View style={{ width:70,justifyContent: "center",alignItems:'center',fontWeight:'600',}}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>选择日期:</Text>
                                    </View>
                                </View>
                                <View style={{ flex:1, borderWidth: 1, borderRadius: 3, borderColor: '#788A93' }}>
                                    <TextInput
                                        onChangeText={(day) => this.setState({day})}
                                        value={this.state.day}
                                        style={{height: 30,padding: 0,  fontSize: 14, color: '#999', 
                                        backgroundColor: '#F2F7FB' }}>
                                    </TextInput>
                                    <TouchableOpacity style={styles.title_icon} onPress={this._toggleModal}>
                                        <FontAwesome color="#3AA1FE" name="calendar" size={16}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View>
                        {
                            day ? (
                                <CurveCom time={day} systemId={systemId} />
                            ) : <Text />
                        }
                    </View>

                    <Modal 
                        isVisible={this.state.isModalVisible}
                    >
                        <View style={{ flex: 1}}>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Calendar
                                    style={{
                                        borderWidth: 1,
                                        borderColor: 'gray',
                                        borderRadius:5,width:'80%',height:'60%',padding:5
                                    }}
                                    onDayPress={this.onDayPress}
                                />
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        );
    }
    
}



const styles = StyleSheet.create({
    container:{
        padding:10
    },
    headerMiddle: {
        color: "rgba(255,255,255,1)",
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
        textAlign: 'center',
    },
    title:{
        flexDirection:'row',
        paddingTop:5,
        paddingBottom:5,
    },
    title_left_word:{
        fontSize:16,
        fontWeight:'900',
        justifyContent:'center'
    },
    title_left:{
        flex:1,
        justifyContent: "center",
        alignItems:'center',paddingTop:7
    },
    title_right:{
        width:200,
        flexDirection:'row',
        alignItems:"flex-end",
    },
    title_right_word:{
        width:70,
        height:30,
        justifyContent: "center",
        alignItems:'center',
        fontWeight:'600',
    },
    title_icon:{
        position:'absolute',
        top:5,
        right:10,
        paddingLeft:5,
        paddingRight:5,
    },

    title_btn: {
        width: width,
        flexDirection: 'column',
        flexWrap: 'wrap',
        backgroundColor: '#dd0ff0',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },

    title_btn_list: {
        width: width,
        flexWrap: 'wrap',
        display:'flex',
        flexDirection: 'row',
        backgroundColor: '#FBFBFB',
    },
    
    title_btn_list_normal: {
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#788A93',
        padding: 9.6,
        margin: 9.6 / 4,
        borderRadius:4,
    },
    title_btn_list_action: {
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#3AA1FE',
        padding: 9.6,
        margin: 9.6 / 4,
        borderRadius:4,
    },
});


export default CurveScreens;