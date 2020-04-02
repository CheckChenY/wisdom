import React,{ Component } from 'react';
import { View,Text,ScrollView,Image,TouchableOpacity,AsyncStorage } from 'react-native'; 
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GetData from '../components/data';
import { getToday } from '../fetch/getData';
import ModelPop from '../components/modelPop';
// import TimeAxis from '../components/time';
import { getDataId,getDataTime } from '../fetch/getData';




class WorkScreens extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center',color:'#fff',fontSize:17 }}>{navigation.state.params.title}</Text>
            ),
            headerLeft:(
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                  <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                      <FontAwesome color="#fff" name="angle-left" size={28}/>
                      <Text style={{color:'#fff',fontSize:16,paddingLeft:5,paddingTop:3}}>返回</Text>
                  </View>
                </TouchableOpacity>
            ),
            headerRight: <View />,
            headerStyle:{
                backgroundColor: '#3AA1FE',
                height:50
            }
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            time:'',
            user:'木小易',
            sourceData : [],
            nub:'',
            attendanceTime:'',
        };
        this._getStorage();
    }

    componentDidMount(){
        let day = getToday(1);
        this.setState({
            time:day
        })
        this.getDataDetail({ createTime: day})
    }

    _getStorage = async () => {
        const user = await AsyncStorage.getItem('user')
        this.setState({
            user:user
        })
    }
    
    getDataDetail = (obj) => {
        getDataId(obj).then(res => {
            console.log(res)
            this.setState({
                sourceData:res
            })
        });

        getDataTime(obj).then(res => {
            console.log(res);
            if( !res.clockCount ){
                this.popUp.showPop('当日考勤为空')
            }else{
                this.setState({
                    nub:res.clockCount,
                    attendanceTime:res.attendanceTime
                })
            }
        })

    }
    
    render() {
        const { attendanceTime,time,user,sourceData,nub } = this.state;
        return (
            <ScrollView>
                <View style={{backgroundColor:'#F5FCFF'}}>
                    <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
                    <View style={{flexDirection:'row',padding:10,paddingLeft:15,paddingRight:15}}>
                        <Text style={{flex:1}}>姓名：{ user }</Text>
                        <Text style={{flex:1,textAlign:'right'}}>{time}</Text>
                    </View>
                    <GetData getDataDetail={this.getDataDetail.bind(this)} />
                    <View style={{padding:10,paddingLeft:15,paddingRight:15}}>
                        <Text>打卡记录</Text>
                    </View>
                    <View style={{flexDirection:'row',padding:10,paddingLeft:5,paddingRight:5,backgroundColor:'#FFFFFF'}}>
                        <Text style={{flex:1,marginLeft:10}}>今日打卡 {nub} 次，工时共计{attendanceTime}</Text>
                    </View>

                    {
                        sourceData.map((item,i) => (
                           
                            <View key={i} style={{ height: 150, marginLeft:15,marginRight:15,borderBottomColor:'#CCC',borderBottomWidth:1,marginTop:10 }}>
                                <View style={{flexDirection:"row"}}>
                                    <Text style={{flex:2}}>打卡时间: {item.createTime}</Text>    
                                    <Text style={{flex:1}}>{item.clockState}</Text>   
                                </View>
                                <View style={{flexDirection:'row',paddingTop:10,paddingBottom:10}}>
                                    <FontAwesome5 name="map-marker-alt" size={20} color='pink' />
                                    <Text style={{flex:1}}>{item.clockAddress}</Text>
                                </View>
                                <Image
                                    style={{width:50,height:50}}
                                    source={{uri:item.clockPhoto}}
                                />
                                <Text style={{marginTop:10}}>备注: {item.clockRemak}</Text>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        );
    } 
    
    
}

export default WorkScreens;