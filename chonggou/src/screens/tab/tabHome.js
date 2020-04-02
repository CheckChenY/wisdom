
import React,{ Component } from 'react';
import { View,Dimensions,Text,StyleSheet,Image,FlatList,ScrollView,
    TouchableOpacity,NativeModules,AsyncStorage,AppState } from 'react-native';
// import { NetworkInfo } from "react-native-network-info";
// import DeviceInfo from 'react-native-device-info';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BackgroundTimer from 'react-native-background-timer';
import LineEcharts from '../components/lineECharts';
import Swiper from 'react-native-swiper';
import FetchManager from '../fetch/index';
const { width } = Dimensions.get('window');
import ModelPop from '../components/modelPop';
import MenuImg from '../../img/menu';

let timeoutId = BackgroundTimer.setTimeout( async () => {
    // this will be executed every 200 ms
    // even when app is the the background
    // let userName = await AsyncStorage.getItem('userName');
    // let deviceToken = await AsyncStorage.getItem('deviceToken');
    // console.log(userName)
    // let obj = {
    //     userName:userName,
    //     deviceToken:deviceToken,
    //     // token:token
    // }
    console.log('tic');
    // FetchManager.get('3/um/cutOut',obj, async (set) => {
    //     //下面的就是请求来的数据
    //     console.log(set)
    // })
}, 1000);

class TabHome extends Component {
    constructor(){
        super()
        this.state = {
            height: 200,
            width: width,
            data: [],
            date:[],
            deviceToken:"",
            imgUrl:require('../../img/jqcl.png'),
            imgState : 1,
            // currentAppState:AppState.currentState,
            abnormalCount:[],
            dealCount:[],
            noDealCount:[],
            menu:[],
            menubol:false,
            list:{
                page: 0,
                size: 2,
                statusType:'0'

            }
        }
    }

    getData = () => {
        const { list } = this.state;
        //今日警情处理完成情况
        FetchManager.get('/alarm/inner/jtlAlarmRecord/weekAlarmCountBySupervise','', async (set) => {
            //下面的就是请求来的数据
            // debugger;
            console.log(set)
            if(set&&set.success){
                let val = set.value;
                let abn = [],dea=[],nod=[],da=[];
                val.forEach((item,i)=>{
                    abn.push(item.allCount);//警情
                    dea.push(item.untreated);
                    nod.push(item.processed);
                    da.push(item.alarmDate);
                })

                this.setState({
                    abnormalCount:abn,
                    dealCount:dea,
                    noDealCount:nod,
                    date:da
                })
            }
        })

        let obj = {
            sysCodes: 103
        }
        //消息通知GET /noticemessage/selectTwoMessage
        FetchManager.get('/menu/inner/jtlRole/findByUserId',obj, async (set) => {
            //下面的就是请求来的数据
            console.log(set)
            if(set&&set.success){
                let data = set.value;
                let num = data.length > 4 ? data.slice(0,4) : data
                if(data.length < 5){
                    this.setState({
                        menu : num,
                        menubol:false
                    })
                }else{
                    this.setState({
                        menu : num,
                        menubol:true
                    })
                }
            }
        })
        
        //消息通知GET /noticemessage/selectTwoMessage
        FetchManager.post('/notice/inner/jtlNoticeAcceptMessage/findAppMessage',list, async (set) => {
            //下面的就是请求来的数据
            console.log(set)
            if(set&&set.success&&set.value){
                let data = set.value;
                this.setState({
                    data : data.content
                })
            }
        })
    }


    componentDidMount(){
        // this._navListener = this.props.navigation.addListener('didFocus', () => {
        //     this.getData();
        // });
        let url = '/notice/inner/jtlNoticeAcceptMessage/findAppMessage?';
        const { list } = this.state;
        let paramsArray = [];
        Object.keys(list).forEach(key => {
            paramsArray.push(key + '=' + list[key])
        })

        // Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        console.log(paramsArray)

        console.log(paramsArray.join('&'))

        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }

        console.log(Object.keys(paramsArray))

        this._navListener = this.props.navigation.addListener('didFocus', () => {
            this.getData();
            this.getObj();//切入切出  删除deviceToken
        });

        // let obj = parseInt('242', 16);
        // console.log(obj);//输出FF
        // let num = 242;
        // console.log(num.toString(16));//输出FF

        // const { deviceToken } = this.state;
        // console.log(deviceToken)
        // AppState.addEventListener('change', (state) => {
        //     if (state === 'active') {
        //         console.log('state active111111111111111111111111');
        //     } else if (state === 'background') {
        //         console.log('background2222222222222222222222222222');
        //         // BackgroundTimer.clearTimeout(intervalId);
        //     } else if (state === 'inactive') {
        //         console.log('inactive');
        //     }
        // });
    }

    getObj = async () => {
        let userName = await AsyncStorage.getItem('userName');
        let deviceToken = await AsyncStorage.getItem('deviceToken');
        // let token = await AsyncStorage.getItem('access_token');
        console.log(userName)
        this.setState({deviceToken})
    //     let obj = {
    //         userName:userName,
    //         deviceToken:deviceToken,
    //         // token:token
    //     }
    //     AppState.addEventListener('change', (state) => {
    //         if (state === 'active') {
    //             console.log('state active');
    //             BackgroundTimer.clearTimeout(timeoutId);
    //         } else if (state === 'background') {
    //             console.log('background');
    //             timeoutId = BackgroundTimer.setTimeout(() => {
    //                 // this will be executed every 200 ms
    //                 // even when app is the the background
    //                 console.log('tic');
    //                 FetchManager.get('3/um/cutOut',obj, async (set) => {
    //                     //下面的就是请求来的数据
    //                     console.log(set)
    //                 })
    //             }, 1000);
    //             // BackgroundTimer.clearTimeout(timeoutId);
    //         } else if (state === 'inactive') {
    //             console.log('inactive');
    //         }
    //     });
    }



    render() {
        const { navigation } = this.props;
        const { abnormalCount,dealCount,noDealCount,date,menubol,menu } = this.state;
        console.log(this.state.deviceToken)
        return (
            <View style={styles.container}>
                <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
                <ScrollView>
                    {/* <TouchableOpacity onPress={()=>{navigation.navigate('HomeMap')}}> */}
                    <View style={{height:200}}>
                        {/* <Image style={{width:'100%',height:'100%'}} source={require('../../img/home_banner.png')}></Image> */}
                        <Swiper
                            style={styles.swiper}
                            height={200}
                            horizontal={true}
                            loop={true}
                            autoplay={true} 
                            autoplayTimeout={3}
                            paginationStyle={{bottom: 10}}
                            showsButtons={false}>
                            <Image source={require('../../img/banner.jpg')} style={styles.img}/>
                            <Image source={require('../../img/gs_img.jpg')} style={styles.img}/>
                            <Image source={require('../../img/sy-banner.png')} style={styles.img}/>
                        </Swiper>
                    </View>
                    {/* </TouchableOpacity> */}
                    {/* <View style={{justifyContent:'center',alignItems:"center",backgroundColor:"#FFFFFF"}}>
                        <Text style={{color:'black',fontSize:14}}>{this.state.deviceToken ? this.state.deviceToken : '123'} </Text>
                    </View> */}
                    <View style={styles.flexContainer}>
                        {
                            menu && menu.map((show,i)=>{
                                return (<View key={i} style={styles.c_title}>
                                    <TouchableOpacity onPress={()=>{navigation.navigate(show.menuPath)}}>
                                        <View style={styles.c_titleImg}>
                                            <Image
                                                style={styles.c_Img}
                                                source={MenuImg['png' + show.menuCode]}
                                            />
                                        </View>
                                        <Text style={styles.c_TitleWord}>
                                            {show.menuName}
                                        </Text>
                                    </TouchableOpacity>
                                </View>)
                            })
                        }{
                            menubol ? (
                                <View style={styles.c_title}>
                                    <TouchableOpacity onPress={()=>{navigation.navigate('moreSetting')}}>
                                        <View style={styles.c_titleImg}>
                                            <Image
                                                style={styles.c_Img}
                                                source={require('../../img/tjbb.png')}
                                            />
                                        </View>
                                        <Text style={styles.c_TitleWord}>
                                            更多设置
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ) : <Text />
                        }
                    </View>
                    <View style={styles.c_message}>
                        <View style={styles.c_message_left}>
                            <FontAwesome style={styles.c_message_left_messs} color="#3AA1FE" name="volume-up" size={16} />
                        </View>
                        <View style={styles.c_message_middle}>
                            <FlatList
                                data={this.state.data}
                                renderItem={({ item }) => this._createListItem(item)}
                                ListEmptyComponent={this._createEmptyView}
                            />
                        </View>

                        <View style={styles.c_message_right}>
                            <TouchableOpacity onPress={()=>navigation.navigate('Message')}>
                                <Text style={styles.c_message_right_word}>
                                    <FontAwesome color="#3AA1FE" name="angle-right" size={30} />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.c_echarts}>
                        <View style={styles.c_echarts_title}>
                            <Text style={{ fontSize: 16, color: "#333333" }}>
                                近一周异常分析
                            </Text>
                        </View>
                        <View style={styles.c_echarts_container}>
                            <View style={{flexDirection:'row',padding:10}}>
                                <View>
                                    {
                                        abnormalCount ? (
                                            <LineEcharts width={width - 30} height={320}
                                            abnormalCount={abnormalCount} dealCount={dealCount} 
                                            noDealCount={noDealCount} date={date} />
                                        ) : <Text />
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
    _createListItem(item) {
        // let tit = this.getChangeTitle(item.noticeTitle,item.noticeType,item.deviceAlertId) ? 
        //         this.getChangeTitle(item.noticeTitle,item.noticeType,item.deviceAlertId) : item.noticeTitle
        return (
            <View style={styles.c_message_list}>
                <View style={{ width: 10, height: 10, 
                    borderRadius: 15, alignItems: 'center', 
                    backgroundColor: item.noticeType === 1 ? '#FD3E3C' : '#FEB52E', 
                    marginTop: 5, }} />
                <Text style={styles.c_message_list_right}>
                    { item.statusType === 0 ? '未读' : '已读' }
                    {item.acceptNoticeTitle.length > 4 ? item.acceptNoticeTitle.substring(0,4) : item.acceptNoticeTitle}
                    {item.acceptNoticeContent.length > 8 ? item.acceptNoticeContent.substring(0,8) + '...' : item.acceptNoticeContent}
                </Text>
                <Text style={styles.c_message_list_right}>{item.sendTime}</Text>
            </View>
        )
    }

    /**
     * 空布局
     */
    _createEmptyView(){
        return (
            <Text style={{fontSize:16,paddingTop:5,fontSize:14}}>
                暂无消息
            </Text>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F2F7FB"
    },
    flexContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: "#ffffff"
    },
    c_title: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
    },
    c_Img: {
        height: 60,
        width: 60,
    },
    c_TitleWord: {
        fontSize: 12,
        textAlign: 'center',
        paddingTop: 10,
    },
    c_message: {
        backgroundColor: "#ffffff",
        flexDirection: 'row',
        margin: 5,
        paddingTop: 10,
        paddingBottom: 10
    },
    c_message_list: {
        // flex: 1,
        flexDirection: 'row',
        paddingLeft: 10
        // justifyContent:'center'
    },
    c_message_list_right: {
        paddingLeft: 10,
        fontSize: 12
    },
    c_message_list_left: {

    },
    c_message_left: {
        width: 30,
        justifyContent: 'center',
    },
    c_message_left_messs: {
        fontSize: 14,
        paddingLeft: 10
    },
    c_message_middle: {
        flex: 1,
    },
    c_message_right: {
        width: 50,
        justifyContent: 'center',
    },
    c_message_right_word: {
        textAlign: 'center'
    },
    // 图标信息
    c_echarts: {
        backgroundColor: '#ffffff',
    },
    c_echarts_title: {
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    },
    swiper: {},
    img: {
        width: '100%',
        resizeMode :'stretch',
        height: 200,
    }
});

export default TabHome;

