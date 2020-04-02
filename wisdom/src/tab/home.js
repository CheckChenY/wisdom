
import React , { Component } from 'react';
import { View,Text,ImageBackground,StyleSheet,Animated,Easing,Image,TouchableOpacity,FlatList,Dimensions,AsyncStorage,NativeModules } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FetchManager from '../http/http';
let bg_img1 = require('../img/home/home_header.png');
let bg_img2 = require('../img/home/home_header2.png');

let img_st = require('../img/home/road2.png');
let img_en = require('../img/home/road_en.png');

let sbgl = require('../img/home/sbgl.png');
// let sbgl = require('../img/home/sbgl.png');
let dscz = require('../img/home/dscz.png');
let jqxx = require('../img/home/jqxx.png');
let czrz = require('../img/home/czrz.png');
let gxsb = require('../img/home/gxsb.png');
let dtqx = require('../img/home/dtqx.png');
// let sbgl = require('../img/home/sbgl.png');

let { width, height } = Dimensions.get('window')

class HomeScreen extends Component {

    constructor() {
        super();
        // this.spinValue = new Animated.Value(0)
        this.state = {
            progress: 0,
            fouces: 0,
            total: 100,
            animatedValue: new Animated.Value(0),

            data: [{ index: 1 }],
            // 下拉刷新
            isRefresh:false,
            img_bg:img_st,
            imgBol:false,
            userid:'',
            deviceToken:false,
            homeData: '',
            escortTime:'',
            isChild:false
        }
        this.rotateAnimated = Animated.timing(
            this.state.animatedValue, {
            toValue: 1,
            duration: 3000,
            easing: Easing.in,
        }
        );
    }
    componentWillMount(){
    }
    
    componentDidMount() {
        this._startAnimated();
        this.getData();
        this.getDeviceToken();
    }

    getDeviceToken = async () => {
        // let token = await AsyncStorage.getItem('deviceToken');
        // console.log(token)
        // this.setState({
        //     // deviceToken:token ? true : false
        //     deviceToken:token
        // })

        // getLocationToken = () => {
            NativeModules.UMPushModule.getDeviceToken(res => {
                console.log('哇哇哇哇deviceToken')
                console.log(res)
                // this.getUserId(res)
                // AsyncStorage.removeItem('deviceToken')
                AsyncStorage.setItem('deviceToken', res)
                this.setState({
                    deviceToken:res
                })
            })
        // }
    }


    getData = () => {
        FetchManager.get('/app/acbAppIndexStatistical/getInfo', '', async (set) => {
            console.log(set)
            if (set.status == 0) {
                this.setState({
                    homeData: set.data.score,
                    fouces: set.data.score.score,
                    totalElec:set.data.totalElec,
                    totalPower:set.data.totalPower,
                    escortTime:set.data.escortTime
                },this.countDown)
            }
        })
        //判断是否为子账户
        FetchManager.get('/app/acbuser/findUserById','', async (set) => {
            console.log(set)
            if(set.status==0){
                if(set.data.parentId){
                    this.setState({
                        isChild:true
                    })
                }else{
                    this.setState({
                        isChild:false
                    })
                }
            }
        })
    }
    


    countDown() {
        const { total,homeData } = this.state;
        let scor = homeData.score;
        this.setState({
            img_bg: img_st
        })
        let seconds = 0;
        this.timer = setInterval(() => {
            seconds += 0.099;
            // console.log('seconds=',seconds);
            // console.log('progress---',this.state.progress);
            if (seconds < 3) {
                this.setState({
                    progress: seconds / 3,
                    fouces: parseInt((seconds / 3) * scor),
                });
            }
            if (seconds > 3) {
                this.setState({
                    progress: 100,
                    fouces: scor,
                    img_bg: img_en
                });
                this.timer && clearInterval(this.timer);
            }
        }, 100);
    }

    _startAnimated() {
        this.state.animatedValue.setValue(0);
        this.rotateAnimated.start();//只转一圈
    }

    render() {
        const { data, img_bg } = this.state;
        const { navigation } = this.props;
        let box = parseInt((height - 392) / 4)
        return (
            <View>
                <FlatList
                    // style={{height: '100%'}}
                    data={data}
                    //item显示的布局
                    renderItem={({ item }) => this._createListItem(item)}
                    //下拉刷新相关
                    onRefresh={() => this._onRefresh()}
                    refreshing={this.state.isRefresh}

                    onEndReachedThreshold={0.1}

                />


                <View style={{ margin: 5, paddingTop: 5 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <BoxComponent title={'设备管理'} url={'gatewaylist'} srcImg={sbgl} box={box} {...this.props} />
                        <BoxComponent title={'用电监控'} url={'remote'} srcImg={sbgl} box={box} {...this.props} />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 4 }}>
                        <BoxComponent title={'定时操作'} url={'timingOperation'} srcImg={dscz} box={box} {...this.props} />
                        <BoxComponent title={'警情信息'} url={'warnlist'} srcImg={jqxx} box={box} {...this.props} />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 4 }}>
                        <BoxComponent title={'动态曲线'} url={'activecurve'} srcImg={dtqx} box={box} {...this.props} />
                        <BoxComponent title={'查看地图'} url={'mapgetpoint'} srcImg={sbgl} box={box} {...this.props} />
                    </View>
                    <View style={this.state.isChild?styles.tablehalf:styles.table}>
                        <BoxComponent title={'操作日志'} url={'coporatelog'} srcImg={czrz} box={box} {...this.props} />
                        {
                            this.state.isChild?(
                                <View/>
                            ):(
                                <BoxComponent title={'用户管理'} url={'usermanagelist'} srcImg={gxsb} box={box} {...this.props} />
                            )
                        }
                    </View>
                </View>
            </View>
        )
    }

    onChangeImg = () => {
        this.setState({
            imgBol: !this.state.imgBol
        })
    }

    /**
     * 创建布局
     */
    _createListItem(item) {
        const { img_bg, imgBol,deviceToken } = this.state;
        const rotateZ = this.state.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg',]
        });
        return (
            <ImageBackground source={imgBol ? bg_img1 : bg_img2} style={{ height: 275 }}>
                <View style={{ padding: 10, marginTop: 5, flexDirection: 'row' }}>
                    <Text style={{ flex: 1, textAlign: 'center', fontSize: 16, color: '#FFFFFF', fontWeight: "500" }}></Text>
                    <Text style={{ flex: 1, textAlign: 'center', fontSize: 16, color: '#FFFFFF', fontWeight: "500" }}>智慧用电</Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={this.onChangeImg}>
                            <AntDesign name="retweet" size={15} color={deviceToken ? '#FFFFFF' : 'red'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('safetyscore')}}>
                    <View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ fontSize: 14, color: '#FFFFFF' }}>安全用电护航{this.state.escortTime}</Text>
                            {/* <Text>{ deviceToken }</Text> */}
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{
                                backgroundColor: 'rgba(146,130,120,0.5)', width: 135, height: 135,
                                borderRadius: 100,
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Animated.View
                                    style={{
                                        width: 128,
                                        // backgroundColor:"red",
                                        transform: [
                                            { rotateZ: rotateZ },
                                        ]
                                    }}
                                >
                                    <Image style={{ width: 128, height: 128 }}
                                        source={img_bg}>
                                    </Image>
                                </Animated.View>
                                <View style={{
                                    width: 90, height: 90, position: 'absolute', justifyContent: 'center', alignItems: 'center',
                                    top: 30, left: 20,
                                }}>
                                    <Text style={{ fontSize: 25, color: '#FEBD57', fontWeight: '500' }}>{this.state.fouces}</Text>
                                    <Text style={{ color: '#FFFFFF', fontSize: 14, textAlign: 'center' }}>用电安全评分</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ paddingLeft: 10, fontSize: 14, color: '#FFFFFF' }}>{this.state.totalElec?this.state.totalElec:0} KW·h(度)</Text>
                            <Text style={{ paddingLeft: 10, fontSize: 14, color: '#FFFFFF' }}>今日用电量</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlign: 'right', paddingRight: 10, fontSize: 14, color: '#FFFFFF' }}>{this.state.totalPower?this.state.totalPower:0} W</Text>
                            <Text style={{ textAlign: 'right', paddingRight: 10, fontSize: 14, color: '#FFFFFF' }}>实时总功率</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        );
    }

    /**
     * 下拉刷新
     * @private
     */
    _onRefresh = () => {
        // const { list } = this.state;
        // const { dataLine } = this.props;
        // 不处于 下拉刷新
        if (!this.state.isRefresh) {
            // list['page'] = this.page + 1;
            this.page = this.page + 1;
            this._startAnimated();
            this.countDown();
        }
    };

}

const styles = StyleSheet.create({
    table:{
        flexDirection: 'row',
        marginTop: 4
    },
    tablehalf:{
        width:'50%',
        flexDirection: 'row',
        marginTop: 4
    }
});


class BoxComponent extends Component {
    render() {
        const { title, srcImg, url, box, navigation } = this.props;
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => { navigation.navigate(url,{getData:()=>{this.getData}}) }}>
                <View style={{ flexDirection: 'row', height: box, borderWidth: 1, borderColor: '#EBEBEB', marginLeft: 2 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ width: 30, height: 30 }} source={srcImg} />
                    </View>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text style={{ fontSize: 14, color: "#777777" }}>
                            {title}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    getData=()=>{
        
    }
}



export default HomeScreen