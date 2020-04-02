import React,{ Component } from 'react';
import { View,Text,StyleSheet,TextInput,Button,Dimensions,TouchableOpacity,Image,ScrollView,Alert } from 'react-native'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CammerComment from '../components/cammer';
import BaiduMap from '../components/baidumap';
import Modal from "react-native-modal";
import FetchManager from '../fetch/index';
import { date } from '../fetch/index';
import ModelPop from '../components/modelPop';
import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map';
import Getlocation from 'Geolocation'
const { Marker } = Overlay;

const {height, width} = Dimensions.get('window');


class HeaderRight extends Component {
    render(){
        const { navigation } = this.props,
        { titleRight } = navigation.state.params;
        return(
            <TouchableOpacity onPress={() => navigation.push('workRecord',{title:'考勤记录'})}>
                <Text style={{color:'#fff',fontSize: 16,marginRight:15}}>{ titleRight }</Text>
            </TouchableOpacity>
        )
    }
}

class PunchClockScreen extends Component {

    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center',color:'#fff',fontSize:17 }}>{navigation.state.params.title}</Text>
            ),
            headerRight: <HeaderRight navigation={navigation} />,
            headerLeft:(
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                  <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                      <FontAwesome color="#fff" name="angle-left" size={28}/>
                      <Text style={{color:'#fff',fontSize:16,paddingLeft:5,paddingTop:3}}>返回</Text>
                  </View>
                </TouchableOpacity>
            ),
            headerStyle:{
                backgroundColor: '#3AA1FE',
                height:50
            }
        };
    };


    constructor(props) {
        super(props);
        this.state = { 
            text: '',
            desc:'',
            bool:true,
            imgBase:'',
            clockAddress:"",
            time:'',
            // check:'',
            afterTime:'',
            clockState:'',
            returnTime:'',
            isModalVisible:false,
            modalText:'',
            popUp: '',

            
            mayType: MapTypes.NORMAL,
            zoom: 18, 
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            // center: { longitude: 113.773886, latitude: 34.720032 }

        };
        this.onHandalChange = this.onHandalChange.bind(this);
    }

    componentDidMount(){
        this.getTime();
        Geolocation.getCurrentPosition().then(
            data => {
                console.log(data);
                this.getMapLocation(data.longitude,data.latitude)
                // if(data.address && data.address !== null){
                    this.setState({
                        zoom:18,
                        center:{
                            latitude:data.latitude,
                            longitude:data.longitude,
                        },
                    })
                // }else{
                //     this.popUp.showPop('请清除手机缓存获取地址信息')
                // }
            }
        ).catch(error => {
            console.warn('error locationgetlocation',error)
        })
    }

    getMapLocation = (lon,lat) => {
        let longitude = Number(lon);
        let latitude = Number(lat);
        console.log(longitude);
        console.log(latitude);

        Geolocation.reverseGeoCode(latitude,longitude)
        .then(data => {
            console.log(data);
            this.setState({
                clockAddress:data.province + data.city + data.district + data.street,
            })
            console.log('reverseGeoCode',data);
        })
        .catch(e =>{
            console.warn(e, 'error');
        }) 
    }
    
    getTime = () => {
        FetchManager.get('1/safeattendancerecord/getClockState','', async (set) => {
            //下面的就是请求来的数据
            console.log('safeattendancerecord/getClockState', set);
            if(set){
                let clockState = set.clockState;
                this.setState({
                    bool: clockState === '0' ? true : false,
                    afterTime:set.afterTime,
                    clockState:set.clockState,
                })
            }else{
                this.popUp.showPop('请前往后台考勤管理设置打卡规则，再进行考勤')
                return
            }
        }) 
    }

    _toggleModal = () =>{
        this.setState({ isModalVisible: !this.state.isModalVisible });
    }

    getTimerModal = () => {
        setTimeout(() => {
            this.setState({
                isModalVisible:false
            })
        },2000)
    }

    
    

    onHandalChange = () => {
        const { imgBase,desc,clockAddress,clockState,afterTime } = this.state;

        if(imgBase === ''){
            this.setState({
                isModalVisible: !this.state.isModalVisible,
                modalText:'请选择图片......'
            },this.getTimerModal())
            // Alert.alert('校验码不能为空......')
            return false
        }

        let obj = {
            clockAddress:clockAddress,
            // clockAddress:'郑州市金开区金南四路68号',
            clockPhoto:imgBase,
            clockRemak:desc,
            clockState:clockState,
            afterTime:afterTime
        }
        FetchManager.post('1/safeattendancerecord',obj, async (set) => {
            //下面的就是请求来的数据
            console.log(set)
            if(set.data === '添加成功'){
                
                this.setState({
                    bool: !this.state.bool,
                    // check:'下班打卡'
                },this._jumpSuccess(obj,set.timestamp))
                
            }else{
                // Alert.alert(set.data)
                this.setState({
                    isModalVisible: !this.state.isModalVisible,
                    modalText:set.data
                },this.getTimerModal())
                // Alert.alert('校验码不能为空......')
                return false
            }
        })   
    }
    _jumpSuccess = (obj,timestamp) => {
        this.props.navigation.navigate('punkSuccess',{
            obj:obj,
            time:timestamp
        })
    }


    getImgBase = (val) => {
        this.setState({
            imgBase:'data:image/jpg;base64,' + val
        });
    }

    render() {
        const { text,clockAddress,bool,afterTime,isModalVisible,modalText,center } = this.state;
        console.log(afterTime)
        return (
            <ScrollView>
                <View style={{backgroundColor:'#F2F7FB',flex:1}}>
                    <View>
                        <MapView 
                            width={ width }  
                            height={ 255 } 
                            zoom={18}
                            trafficEnabled={true}
                            zoomControlsVisible={true}
                            mapType={MapTypes.NORMAL}
                            center={center}
                            // center={{ longitude: 116.465175, latitude: 39.938522 }}
                            // markers={ this.state.markers }
                        >
                            <Marker 
                                location={center}
                                title="我是marker"
                            > 
                            </Marker>
                        </MapView>


                        <View style={styles.c_clock_title}>
                            <Text>
                                我的位置：
                            </Text>
                            <Text style={{paddingLeft:10}}>{clockAddress ? clockAddress : ''}</Text>
                        </View>
                        <View style={styles.c_clock_picture}>
                            <View style={styles.c_clock_pic_left}>
                                <Text>拍照:</Text>
                            </View>
                            <View style={styles.c_clock_update}>
                                <CammerComment  getImgBase={this.getImgBase.bind(this)} />
                            </View>
                        </View>
                        <View style={styles.remarks_c}>
                            <View style={styles.c_clock_pic_left}>
                                <Text>备注:</Text>
                            </View>
                            <View style={styles.c_clock_update}>
                                <TextInput placeholder={text} onChangeText={(desc) => this.setState({desc})} />
                            </View>
                        </View>
                        <View style={{paddingLeft:20,paddingRight:20,marginTop:25}}>
                            <View style={{width:'100%',paddingTop:5,paddingBottom:5}}>
                                <Button 
                                title={ bool ? '上班打卡' : '下班打卡' }
                                onPress={this.onHandalChange}
                                color="#3AA1FE"
                                disabled={ afterTime !== '0' ? false : true }
                                style={{fontSize:18,width:'100%'}} />
                            </View>
                            
                            {
                                bool ?  <Text /> :
                                <Text style={{fontSize:12,color:'#DC4C40',textAlign:"center"}}>
                                    打卡倒计时:
                                    { afterTime } 
                                    分钟
                                </Text> 
                            }
                        </View>
                    </View>
                    <Modal 
                        isVisible={isModalVisible}
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
                    <ModelPop ref={ref => this.popUp = ref}></ModelPop>
                </View>
            </ScrollView>
        );
    }  
}

const styles = StyleSheet.create({
    c_clock_title:{
        marginTop:10,
        // marginBottom:2,
        marginLeft:15,
        marginRight:15,
        backgroundColor:'#fff',
        borderRadius:2,
        padding:12,
        borderWidth:1,
        borderColor:'#E0E0E0',
        borderRadius:2
    },
    c_clock_picture:{
        marginTop:2,
        // marginBottom:10,
        marginLeft:15,
        marginRight:15,
        padding:12,
        backgroundColor:'#fff',
        flexDirection: 'row',
        borderWidth:1,
        borderColor:'#E0E0E0',
        borderRadius:2
    },
    c_clock_pic_left:{
        width:50,
        justifyContent:'center'
    },
    c_clock_update:{
        flex:1,
    },
    remarks_c:{
        backgroundColor:'#fff',
        flexDirection: 'row',
        borderWidth:1,
        borderColor:'#E0E0E0',
        borderRadius:2,
        marginTop:2,
        marginLeft:15,
        marginRight:15,
        paddingLeft:10,
        height: 50,
        alignItems: 'center',
    },
})

export default PunchClockScreen;